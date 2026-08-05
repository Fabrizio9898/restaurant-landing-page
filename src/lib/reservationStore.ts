// Store del flujo de reserva: única fuente de verdad del estado en el cliente.
// La UI (reservationFlow.ts) solo se suscribe y dispara acciones.
import { computeTotals } from '../utils/pricing';
import { createPaymentIntent } from '../services/paymentService';
import { fetchMenu } from '../services/menuService';
import { submitReservation } from '../services/reservationService';
import type {
	CustomerInfo,
	Dish,
	ReservationDraft,
	ReservationRequest,
	ReservationResult,
	Selection,
	Step,
	Totals,
} from '../types/reservation';

export interface MenuState {
	dishes: Dish[];
	loading: boolean;
	error: string | null;
}

export interface ReservationState {
	step: Step;
	menu: MenuState;
	draft: ReservationDraft;
	selections: Selection[];
	totals: Totals;
	paymentStatus: 'idle' | 'processing' | 'paid';
	paymentError: string | null;
	submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
	submissionError: string | null;
	lastReservation: ReservationResult | null;
}

const initialState = (): ReservationState => ({
	step: 'details',
	menu: { dishes: [], loading: false, error: null },
	draft: { date: '', time: '', partySize: 2, customer: { name: '', phone: '', email: '' } },
	selections: [],
	totals: { subtotal: 0, discount: 0, total: 0 },
	paymentStatus: 'idle',
	paymentError: null,
	submissionStatus: 'idle',
	submissionError: null,
	lastReservation: null,
});

type Listener = (state: ReservationState) => void;

const errorMessage = (err: unknown, fallback: string): string =>
	err instanceof Error ? err.message : fallback;

export class ReservationStore {
	private state: ReservationState = initialState();
	private listeners = new Set<Listener>();

	getState(): ReservationState {
		return this.state;
	}

	subscribe(listener: Listener): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private set(patch: Partial<ReservationState>): void {
		this.state = { ...this.state, ...patch };
		this.listeners.forEach((listener) => listener(this.state));
	}

	/** Reinicia el flujo conservando el menú ya cargado. */
	reset(): void {
		const { menu } = this.state;
		this.state = { ...initialState(), menu };
		this.listeners.forEach((listener) => listener(this.state));
	}

	setStep(step: Step): void {
		this.set({ step });
	}

	updateDraft(patch: Partial<ReservationDraft>): void {
		this.set({ draft: { ...this.state.draft, ...patch } });
	}

	updateCustomer(patch: Partial<CustomerInfo>): void {
		this.set({
			draft: { ...this.state.draft, customer: { ...this.state.draft.customer, ...patch } },
		});
	}

	/** Suma/resta una unidad de un plato y recalcula totales. qty <= 0 lo remueve. */
	adjustQuantity(dishId: string, delta: number): void {
		const current = this.state.selections.find((sel) => sel.dish.id === dishId);
		const next = Math.max(0, (current?.quantity ?? 0) + delta);

		if (next === 0) {
			const selections = this.state.selections.filter((sel) => sel.dish.id !== dishId);
			this.set({ selections, totals: computeTotals(selections) });
			return;
		}

		const dish = this.state.menu.dishes.find((d) => d.id === dishId);
		if (!dish) return;

		const selections = current
			? this.state.selections.map((sel) =>
					sel.dish.id === dishId ? { ...sel, quantity: next } : sel,
				)
			: [...this.state.selections, { dish, quantity: next }];

		this.set({ selections, totals: computeTotals(selections) });
	}

	/** Carga la carta del menú desde la API. */
	async loadMenu(): Promise<void> {
		this.set({ menu: { ...this.state.menu, loading: true, error: null } });
		try {
			const dishes = await fetchMenu();
			this.set({ menu: { dishes, loading: false, error: null } });
		} catch (err) {
			this.set({
				menu: {
					...this.state.menu,
					loading: false,
					error: errorMessage(err, 'No se pudo cargar el menú.'),
				},
			});
		}
	}

	/**
	 * Procesa el pago y, al confirmarse, envía la reserva.
	 *
	 * TODO(mp): en la integración real, tras crear la preferencia se redirige al
	 * checkout de Mercado Pago y se espera su confirmación antes de continuar.
	 */
	async pay(): Promise<void> {
		if (this.state.paymentStatus === 'processing') return;
		this.set({ paymentStatus: 'processing', paymentError: null });
		try {
			const intent = await createPaymentIntent(this.state.totals.total);
			console.debug('[reservation] payment intent:', intent.id);
			this.set({ paymentStatus: 'paid' });
			await this.submit();
		} catch (err) {
			this.set({
				paymentStatus: 'idle',
				paymentError: errorMessage(err, 'No se pudo procesar el pago.'),
			});
		}
	}

	/** Envía la reserva al backend. */
	async submit(): Promise<void> {
		if (this.state.paymentStatus !== 'paid') {
			this.set({
				submissionStatus: 'error',
				submissionError: 'El pago debe completarse antes de confirmar la reserva.',
			});
			return;
		}
		this.set({ submissionStatus: 'submitting' });
		try {
			const result = await submitReservation(this.toRequest());
			this.set({ submissionStatus: 'success', lastReservation: result, step: 'result' });
		} catch (err) {
			this.set({
				submissionStatus: 'error',
				submissionError: errorMessage(err, 'No se pudo enviar la reserva.'),
				step: 'result',
			});
		}
	}

	private toRequest(): ReservationRequest {
		const { date, time, partySize, customer } = this.state.draft;
		const dishes = this.state.selections.map((sel) => ({ id: sel.dish.id, quantity: sel.quantity }));
		return { date, time, partySize, customer, dishes: dishes.length > 0 ? dishes : undefined };
	}
}
