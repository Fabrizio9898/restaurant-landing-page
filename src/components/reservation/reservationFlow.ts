// Wiring del DOM del flujo de reserva. Toda la lógica de negocio vive en el
// store (src/lib/reservationStore.ts); aquí solo se lee estado, se renderiza y
// se traducen eventos del usuario en acciones del store.
import { ReservationStore } from '../../lib/reservationStore';
import type { ReservationState } from '../../lib/reservationStore';
import type { CustomerInfo, Selection, Step } from '../../types/reservation';
import { formatMoney } from '../../utils/money';
import { validateDetails } from '../../utils/validation';

export function initReservationFlow(root: HTMLElement): void {
	const store = new ReservationStore();

	const $ = <T extends HTMLElement>(selector: string): T => {
		const el = root.querySelector<T>(selector);
		if (!el) throw new Error(`[reservation-flow] elemento faltante: ${selector}`);
		return el;
	};

	const steps = new Map<Step, HTMLElement>();
	root.querySelectorAll<HTMLElement>('[data-step]').forEach((el) => {
		steps.set(el.dataset.step as Step, el);
	});

	// Paso 1 · formulario
	const dateInput = $<HTMLInputElement>('#rv-date');
	const timeInput = $<HTMLInputElement>('#rv-time');
	const partyInput = $<HTMLInputElement>('#rv-party-size');
	const nameInput = $<HTMLInputElement>('#rv-name');
	const phoneInput = $<HTMLInputElement>('#rv-phone');
	const emailInput = $<HTMLInputElement>('#rv-email');
	const formErrors = $<HTMLElement>('#rv-form-errors');

	// Paso 2 · platos
	const dishList = $<HTMLElement>('#rv-dish-list');
	const dishLoading = $<HTMLElement>('#rv-dish-loading');
	const dishError = $<HTMLElement>('#rv-dish-error');

	// Paso 3 · resumen
	const summaryDate = $<HTMLElement>('#rv-summary-date');
	const summaryTime = $<HTMLElement>('#rv-summary-time');
	const summaryParty = $<HTMLElement>('#rv-summary-party');
	const summaryCustomer = $<HTMLElement>('#rv-summary-customer');
	const summaryItems = $<HTMLElement>('#rv-summary-items');
	const subtotalEl = $<HTMLElement>('#rv-subtotal');
	const discountEl = $<HTMLElement>('#rv-discount');
	const totalEl = $<HTMLElement>('#rv-total');

	// Paso 4 · pago
	const payAmount = $<HTMLElement>('#rv-pay-amount');
	const payButton = $<HTMLButtonElement>('#rv-pay-button');
	const payStatus = $<HTMLElement>('#rv-pay-status');
	const payError = $<HTMLElement>('#rv-pay-error');

	// Resultado
	const resultSuccess = $<HTMLElement>('#rv-result-success');
	const resultError = $<HTMLElement>('#rv-result-error');
	const resultId = $<HTMLElement>('#rv-result-id');
	const resultErrorMessage = $<HTMLElement>('#rv-result-error-message');

	// ---------- render ----------
	const render = (s: ReservationState): void => {
		steps.forEach((el, step) => {
			el.hidden = step !== s.step;
		});
		if (s.step === 'dishes') renderDishes(s);
		if (s.step === 'summary') renderSummary(s);
		if (s.step === 'payment') renderPayment(s);
		if (s.step === 'result') renderResult(s);
	};

	const itemLine = (sel: Selection): string => {
		const lineTotal = sel.dish.price * sel.quantity;
		return `<li>${sel.dish.name} × ${sel.quantity} — ${formatMoney(lineTotal)}</li>`;
	};

	const renderDishes = (s: ReservationState): void => {
		const { dishes, loading, error } = s.menu;
		dishLoading.hidden = !loading;
		dishError.hidden = error === null;
		dishError.textContent = error ?? '';
		dishList.hidden = loading || error !== null;
		if (loading || error) {
			dishList.innerHTML = '';
			return;
		}
		dishList.innerHTML = dishes
			.filter((dish) => dish.available)
			.map((dish) => {
				const qty = s.selections.find((sel) => sel.dish.id === dish.id)?.quantity ?? 0;
				const disabled = qty === 0 ? 'disabled' : '';
				return `
					<li>
						<strong>${dish.name}</strong>
						<span>${formatMoney(dish.price)}</span>
						<p>${dish.description}</p>
						<button type="button" data-action="dec" data-dish="${dish.id}" ${disabled}>−</button>
						<span>${qty}</span>
						<button type="button" data-action="inc" data-dish="${dish.id}">+</button>
					</li>`;
			})
			.join('');
	};

	const renderSummary = (s: ReservationState): void => {
		const { date, time, partySize, customer } = s.draft;
		summaryDate.textContent = date || '—';
		summaryTime.textContent = time || '—';
		summaryParty.textContent = String(partySize);
		summaryCustomer.textContent =
			[customer.name, customer.phone, customer.email].filter(Boolean).join(' · ') || '—';
		summaryItems.innerHTML = s.selections.length
			? s.selections.map(itemLine).join('')
			: '<li>Sin platos seleccionados</li>';
		subtotalEl.textContent = formatMoney(s.totals.subtotal);
		discountEl.textContent = `-${formatMoney(s.totals.discount)}`;
		totalEl.textContent = formatMoney(s.totals.total);
	};

	const renderPayment = (s: ReservationState): void => {
		payAmount.textContent = formatMoney(s.totals.total);
		payButton.disabled = s.paymentStatus === 'processing';
		payStatus.hidden = s.paymentStatus !== 'processing';
		payError.hidden = s.paymentError === null;
		payError.textContent = s.paymentError ?? '';
	};

	const renderResult = (s: ReservationState): void => {
		const success = s.submissionStatus === 'success';
		resultSuccess.hidden = !success;
		resultError.hidden = success;
		if (success && s.lastReservation) resultId.textContent = s.lastReservation.id;
		resultErrorMessage.textContent = s.submissionError ?? '';
	};

	// ---------- eventos ----------
	const updateCustomer = (patch: Partial<CustomerInfo>) => store.updateCustomer(patch);

	dateInput.addEventListener('input', () => store.updateDraft({ date: dateInput.value }));
	timeInput.addEventListener('input', () => store.updateDraft({ time: timeInput.value }));
	partyInput.addEventListener('input', () => {
		const partySize = Math.max(1, Number(partyInput.value) || 1);
		store.updateDraft({ partySize });
	});
	nameInput.addEventListener('input', () => updateCustomer({ name: nameInput.value }));
	phoneInput.addEventListener('input', () => updateCustomer({ phone: phoneInput.value }));
	emailInput.addEventListener('input', () => updateCustomer({ email: emailInput.value }));

	const continueFromDetails = (): void => {
		const errors = validateDetails(store.getState().draft);
		if (Object.keys(errors).length > 0) {
			formErrors.textContent = Object.values(errors).join(' · ');
			formErrors.hidden = false;
			return;
		}
		formErrors.hidden = true;
		store.setStep('dishes');
	};

	const retry = (): void => {
		// Si el pago ya se confirmó, reintenta solo el envío de la reserva.
		if (store.getState().paymentStatus === 'paid') {
			void store.submit();
		} else {
			store.setStep('payment');
		}
	};

	root.addEventListener('click', (event) => {
		const target = event.target as HTMLElement | null;
		const button = target?.closest<HTMLButtonElement>('[data-action]');
		if (!button) return;
		const { action, dish } = button.dataset;

		switch (action) {
			case 'inc':
				if (dish) store.adjustQuantity(dish, +1);
				break;
			case 'dec':
				if (dish) store.adjustQuantity(dish, -1);
				break;
			case 'continue-details':
				continueFromDetails();
				break;
			case 'back-to-details':
				store.setStep('details');
				break;
			case 'continue-summary':
				store.setStep('summary');
				break;
			case 'back-to-dishes':
				store.setStep('dishes');
				break;
			case 'continue-payment':
				store.setStep('payment');
				break;
			case 'back-to-summary':
				store.setStep('summary');
				break;
			case 'pay':
				void store.pay();
				break;
			case 'retry':
				retry();
				break;
			case 'new-reservation':
				store.reset();
				break;
		}
	});

	// ---------- init ----------
	store.subscribe(render);
	render(store.getState());
	void store.loadMenu();
}
