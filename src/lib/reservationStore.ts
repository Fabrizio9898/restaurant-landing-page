import type {
	FlowStep,
	ReservationDraft,
	CustomerInfo,
	Zone,
	AvailabilitySlot,
	MenuItem,
	MenuCategory,
	CartItem,
	CartTotals,
	ReservationResponse,
	PaymentStatus,
} from '../types/reservation';
import { computeCartTotals, RESERVATION_DISCOUNT } from '../utils/pricing';
import {
	fetchZones,
	fetchAvailability,
	submitReservation,
	fetchMenuCategories,
	fetchMenuItems,
} from '../services/reservationService';
import { validateStep1 } from '../utils/validation';

export interface FlowState {
	step: FlowStep;
	zones: Zone[];
	availability: Map<string, AvailabilitySlot[]>;
	loadingAvailability: boolean;
	draft: ReservationDraft;
	customer: CustomerInfo;
	step1Errors: Record<string, string>;
	choseMenu: boolean | null;
	categories: MenuCategory[];
	menuItems: MenuItem[];
	menuLoading: boolean;
	activeCategoryId: string | null;
	cart: CartItem[];
	cartTotals: CartTotals;
	submitting: boolean;
	submitError: string | null;
	paymentStatus: PaymentStatus;
	reservationId: string | null;
}

const initialState = (): FlowState => ({
	step: 'step1',
	zones: [],
	availability: new Map(),
	loadingAvailability: false,
	draft: { date: '', partySize: 2, zoneId: '', timeSlot: '' },
	customer: { name: '', phone: '', email: '' },
	step1Errors: {},
	choseMenu: null,
	categories: [],
	menuItems: [],
	menuLoading: false,
	activeCategoryId: null,
	cart: [],
	cartTotals: { subtotal: 0, discount: 0, total: 0 },
	submitting: false,
	submitError: null,
	paymentStatus: 'idle',
	reservationId: null,
});

type Listener = (state: FlowState) => void;

const errMsg = (err: unknown, fb: string) => err instanceof Error ? err.message : fb;

export class ReservationStore {
	private state: FlowState = initialState();
	private listeners = new Set<Listener>();

	getState(): FlowState { return this.state; }

	subscribe(fn: Listener) {
		this.listeners.add(fn);
		return () => this.listeners.delete(fn);
	}

	private emit() {
		this.listeners.forEach(fn => fn(this.state));
	}

	private set(patch: Partial<FlowState>) {
		this.state = { ...this.state, ...patch };
		this.emit();
	}

	reset() {
		const { zones, categories, menuItems } = this.state;
		this.state = { ...initialState(), zones, categories, menuItems };
		this.emit();
	}

	goTo(step: FlowStep) { this.set({ step }); }

	goBack() {
		const { step, choseMenu } = this.state;
		const order: FlowStep[] = ['step1', 'step2', 'step3', 'step4'];
		const idx = order.indexOf(step);
		if (idx <= 0) return;
		let prev = order[idx - 1];
		if (prev === 'step3' && choseMenu === false) prev = 'step2';
		this.set({ step: prev });
	}

	updateDraft(patch: Partial<ReservationDraft>) {
		this.set({ draft: { ...this.state.draft, ...patch }, step1Errors: {} });
	}

	updateCustomer(patch: Partial<CustomerInfo>) {
		this.set({ customer: { ...this.state.customer, ...patch }, step1Errors: {} });
	}

	async loadZones() {
		try {
			const zones = await fetchZones();
			this.set({ zones });
		} catch { /* ponytail: zones are static for now */ }
	}

	async loadAvailability() {
		const { draft } = this.state;
		if (!draft.date || draft.partySize < 1) return;
		this.set({ loadingAvailability: true });
		try {
			const availability = await fetchAvailability(draft.date, draft.partySize);
			this.set({ availability, loadingAvailability: false });
		} catch {
			this.set({ loadingAvailability: false });
		}
	}

	selectTimeSlot(time: string) {
		this.set({ draft: { ...this.state.draft, timeSlot: time }, step1Errors: {} });
	}

	continueFromStep1() {
		const errors = validateStep1(this.state.draft, this.state.customer);
		if (Object.keys(errors).length > 0) {
			this.set({ step1Errors: errors });
			return;
		}
		this.set({ step: 'step2' });
	}

	chooseMenu(yes: boolean) {
		this.set({ choseMenu: yes, step: yes ? 'step3' : 'step4' });
		if (yes && this.state.categories.length === 0) void this.loadMenu();
	}

	async loadMenu() {
		this.set({ menuLoading: true });
		try {
			const [categories, items] = await Promise.all([fetchMenuCategories(), fetchMenuItems()]);
			this.set({
				categories,
				menuItems: items,
				menuLoading: false,
				activeCategoryId: categories[0]?.id ?? null,
			});
		} catch (err) {
			this.set({ menuLoading: false });
		}
	}

	setActiveCategory(id: string) {
		this.set({ activeCategoryId: id });
	}

	updateCart(itemId: string, delta: number) {
		const { cart, menuItems } = this.state;
		const existing = cart.find(c => c.item.id === itemId);
		const next = Math.max(0, (existing?.quantity ?? 0) + delta);
		let newCart: CartItem[];
		if (next === 0) {
			newCart = cart.filter(c => c.item.id !== itemId);
		} else if (existing) {
			newCart = cart.map(c => c.item.id === itemId ? { ...c, quantity: next } : c);
		} else {
			const item = menuItems.find(i => i.id === itemId);
			if (!item) return;
			newCart = [...cart, { item, quantity: next }];
		}
		this.set({ cart: newCart, cartTotals: computeCartTotals(newCart) });
	}

	continueFromStep3() {
		if (this.state.cart.length === 0) return;
		this.set({ step: 'step4' });
	}

	async submitReservation() {
		const { draft, customer, cart, choseMenu } = this.state;
		this.set({ submitting: true, submitError: null });
		try {
			const items = choseMenu
				? cart.map(c => ({ menuItemId: c.item.id, quantity: c.quantity }))
				: undefined;
			const reservedAt = `${draft.date}T${draft.timeSlot}`;
			const response = await submitReservation({
				zoneId: draft.zoneId,
				reservedAt,
				partySize: draft.partySize,
				guestName: customer.name,
				guestEmail: customer.email,
				guestPhone: customer.phone ? `+549${customer.phone}` : '',
				items,
			});
			if (response.init_point) {
				window.location.href = response.init_point;
				this.set({ paymentStatus: 'redirecting', reservationId: response.id });
			} else {
				this.set({
					step: 'step4',
					paymentStatus: 'success',
					reservationId: response.id,
					submitting: false,
				});
			}
		} catch (err) {
			this.set({ submitting: false, submitError: errMsg(err, 'No se pudo procesar la reserva.') });
		}
	}

	handlePaymentReturn(status: 'success' | 'failure') {
		this.set({ step: 'step4', paymentStatus: status });
	}
}
