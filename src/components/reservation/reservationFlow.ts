import { ReservationStore } from '../../lib/reservationStore';
import type { FlowState } from '../../lib/reservationStore';
import { formatMoney } from '../../utils/money';

export function initReservationFlow(root: HTMLElement): void {
	const store = new ReservationStore();

	const $ = <T extends HTMLElement>(sel: string): T => {
		const el = root.querySelector<T>(sel);
		if (!el) throw new Error(`[reservation-flow] missing: ${sel}`);
		return el;
	};

	const stepEls = new Map<string, HTMLElement>();
	root.querySelectorAll<HTMLElement>('[data-step]').forEach(el => {
		stepEls.set(el.dataset.step!, el);
	});

	// step 1
	const dateInput = $<HTMLInputElement>('#rv-date');
	const partyInput = $<HTMLInputElement>('#rv-party-size');
	const nameInput = $<HTMLInputElement>('#rv-name');
	const phoneInput = $<HTMLInputElement>('#rv-phone');
	const emailInput = $<HTMLInputElement>('#rv-email');
	const zonesList = $<HTMLElement>('#rv-zones-list');
	const zoneError = $<HTMLElement>('#rv-zone-error');
	const availabilitySection = $<HTMLElement>('#rv-availability-section');
	const availabilityLoading = $<HTMLElement>('#rv-availability-loading');
	const slotsList = $<HTMLElement>('#rv-slots-list');
	const slotError = $<HTMLElement>('#rv-slot-error');
	const step1Errors = $<HTMLElement>('#rv-step1-errors');

	// step 3
	const menuLoading = $<HTMLElement>('#rv-menu-loading');
	const categoryTabs = $<HTMLElement>('#rv-category-tabs');
	const menuList = $<HTMLElement>('#rv-menu-list');
	const stickySummary = $<HTMLElement>('#rv-sticky-summary');
	const stickyCount = $<HTMLElement>('#rv-sticky-count');
	const stickySubtotal = $<HTMLElement>('#rv-sticky-subtotal');
	const stickyTotal = $<HTMLElement>('#rv-sticky-total');
	const stickyBtn = $<HTMLButtonElement>('.rv-sticky-btn');
	const stickyHint = $<HTMLElement>('#rv-sticky-hint');

	// step 4
	const confirmView = $<HTMLElement>('#rv-confirm-view');
	const confirmDate = $<HTMLElement>('#rv-confirm-date');
	const confirmTime = $<HTMLElement>('#rv-confirm-time');
	const confirmZone = $<HTMLElement>('#rv-confirm-zone');
	const confirmParty = $<HTMLElement>('#rv-confirm-party');
	const confirmCustomer = $<HTMLElement>('#rv-confirm-customer');
	const confirmMenuSection = $<HTMLElement>('#rv-confirm-menu-section');
	const confirmItems = $<HTMLElement>('#rv-confirm-items');
	const confirmSubtotal = $<HTMLElement>('#rv-confirm-subtotal');
	const confirmDiscount = $<HTMLElement>('#rv-confirm-discount');
	const confirmTotal = $<HTMLElement>('#rv-confirm-total');
	const submitError = $<HTMLElement>('#rv-submit-error');
	const submitBtn = $<HTMLButtonElement>('#rv-submit-btn');
	const resultSuccess = $<HTMLElement>('#rv-result-success');
	const resultFailure = $<HTMLElement>('#rv-result-failure');
	const resultId = $<HTMLElement>('#rv-result-id');
	const resultSummary = $<HTMLElement>('#rv-result-summary');
	const resultFailureMsg = $<HTMLElement>('#rv-result-failure-msg');

	// ---- render ----
	const render = (s: FlowState) => {
		stepEls.forEach((el, key) => { el.hidden = key !== s.step; });
		if (s.step === 'step1') renderStep1(s);
		if (s.step === 'step3') renderStep3(s);
		if (s.step === 'step4') renderStep4(s);
	};

	const renderStep1 = (s: FlowState) => {
		zonesList.innerHTML = s.zones.map(z => `
			<label class="rv-zone-option ${s.draft.zoneId === z.id ? 'rv-zone-option--selected' : ''}">
				<input type="radio" name="zone" value="${z.id}" ${s.draft.zoneId === z.id ? 'checked' : ''} />
				<span class="rv-zone-name">${z.name}</span>
				<span class="rv-zone-desc">${z.description}</span>
			</label>
		`).join('');

		const hasDate = !!s.draft.date;
		availabilitySection.hidden = !hasDate;
		if (hasDate) {
			availabilityLoading.hidden = !s.loadingAvailability;
			const slots = s.availability.get(s.draft.zoneId) ?? [];
			slotsList.hidden = s.loadingAvailability;
			if (!s.loadingAvailability && slots.length > 0) {
				slotsList.innerHTML = slots.map(sl => `
					<button type="button" class="rv-slot-btn ${sl.available ? '' : 'rv-slot-btn--unavailable'} ${s.draft.timeSlot === sl.time ? 'rv-slot-btn--selected' : ''}"
						data-time="${sl.time}" ${!sl.available ? 'disabled' : ''}>
						${sl.time}
					</button>
				`).join('');
			} else if (!s.loadingAvailability) {
				slotsList.innerHTML = '<p class="rv-no-slots">No hay horarios disponibles para esta fecha.</p>';
			}
		}

		const errs = s.step1Errors;
		const errTexts = Object.values(errs);
		if (errTexts.length > 0) {
			step1Errors.textContent = errTexts.join(' · ');
			step1Errors.hidden = false;
		} else {
			step1Errors.hidden = true;
		}
		zoneError.hidden = !errs.zoneId;
		if (errs.zoneId) zoneError.textContent = errs.zoneId;
		slotError.hidden = !errs.timeSlot;
		if (errs.timeSlot) slotError.textContent = errs.timeSlot;
	};

	const renderStep3 = (s: FlowState) => {
		menuLoading.hidden = !s.menuLoading;
		categoryTabs.hidden = s.menuLoading || s.categories.length === 0;
		menuList.hidden = s.menuLoading;
		stickySummary.hidden = s.menuLoading;

		if (s.menuLoading) return;

		categoryTabs.innerHTML = s.categories.map(c => `
			<button type="button" class="rv-cat-tab ${s.activeCategoryId === c.id ? 'rv-cat-tab--active' : ''}"
				data-cat="${c.id}">${c.name}</button>
		`).join('');

		const items = s.menuItems.filter(i => i.categoryId === s.activeCategoryId);
		menuList.innerHTML = items.map(item => {
			const qty = s.cart.find(c => c.item.id === item.id)?.quantity ?? 0;
			return `
				<li class="rv-menu-item">
					<div class="rv-menu-item-info">
						<strong class="rv-menu-item-name">${item.name}</strong>
						<p class="rv-menu-item-desc">${item.description}</p>
						<span class="rv-menu-item-price">${formatMoney(item.price)}</span>
					</div>
					<div class="rv-menu-item-qty">
						<button type="button" class="rv-qty-btn" data-item="${item.id}" data-delta="-1" ${qty === 0 ? 'disabled' : ''}>−</button>
						<span class="rv-qty-val">${qty}</span>
						<button type="button" class="rv-qty-btn" data-item="${item.id}" data-delta="1">+</button>
					</div>
				</li>
			`;
		}).join('');

		const totalItems = s.cart.reduce((n, c) => n + c.quantity, 0);
		stickyCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
		stickySubtotal.textContent = formatMoney(s.cartTotals.subtotal);
		stickyTotal.textContent = formatMoney(s.cartTotals.total);
		stickyBtn.disabled = totalItems === 0;
		stickyHint.hidden = totalItems > 0;
	};

	const renderStep4 = (s: FlowState) => {
		const isConfirm = s.paymentStatus === 'idle' || s.paymentStatus === 'redirecting';
		confirmView.hidden = !isConfirm;
		resultSuccess.hidden = s.paymentStatus !== 'success';
		resultFailure.hidden = s.paymentStatus !== 'failure';

		if (!isConfirm) return;

		const { draft, customer, zones, cart, choseMenu, cartTotals } = s;
		confirmDate.textContent = draft.date ? new Date(draft.date + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }) : '—';
		confirmTime.textContent = draft.timeSlot || '—';
		const zone = zones.find(z => z.id === draft.zoneId);
		confirmZone.textContent = zone?.name ?? '—';
		confirmParty.textContent = String(draft.partySize);
		const contactParts = [customer.name];
		if (customer.phone) contactParts.push(`+54 9 ${customer.phone}`);
		if (customer.email) contactParts.push(customer.email);
		confirmCustomer.textContent = contactParts.join(' · ') || '—';

		if (choseMenu && cart.length > 0) {
			confirmMenuSection.hidden = false;
			confirmItems.innerHTML = cart.map(c =>
				`<li>${c.item.name} × ${c.quantity} — ${formatMoney(c.item.price * c.quantity)}</li>`
			).join('');
			confirmSubtotal.textContent = formatMoney(cartTotals.subtotal);
			confirmDiscount.textContent = `-${formatMoney(cartTotals.discount)}`;
			confirmTotal.textContent = formatMoney(cartTotals.total);
		} else {
			confirmMenuSection.hidden = true;
		}

		submitBtn.disabled = s.submitting;
		submitBtn.textContent = s.submitting ? 'Procesando…' : 'Confirmar reserva';
		submitError.hidden = !s.submitError;
		if (s.submitError) submitError.textContent = s.submitError;

		if (s.paymentStatus === 'success') {
			resultId.textContent = s.reservationId ?? '—';
			const dateStr = draft.date ? new Date(draft.date + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
			resultSummary.innerHTML = `
				<dl class="rv-confirm-dl">
					<dt>Fecha</dt><dd>${dateStr}</dd>
					<dt>Horario</dt><dd>${draft.timeSlot}</dd>
					<dt>Zona</dt><dd>${zone?.name ?? ''}</dd>
					<dt>Personas</dt><dd>${draft.partySize}</dd>
				</dl>
			`;
		}
		if (s.paymentStatus === 'failure') {
			resultFailureMsg.textContent = 'El pago fue cancelado o no se completó. Podés intentar de nuevo.';
		}
	};

	// ---- events ----
	dateInput.addEventListener('input', () => {
		store.updateDraft({ date: dateInput.value, timeSlot: '' });
		void store.loadAvailability();
	});

	partyInput.addEventListener('input', () => {
		const v = Math.max(1, Number(partyInput.value) || 1);
		store.updateDraft({ partySize: v });
	});

	nameInput.addEventListener('input', () => store.updateCustomer({ name: nameInput.value }));
	phoneInput.addEventListener('input', () => store.updateCustomer({ phone: phoneInput.value }));
	emailInput.addEventListener('input', () => store.updateCustomer({ email: emailInput.value }));

	root.addEventListener('click', (e) => {
		const target = e.target as HTMLElement | null;
		const btn = target?.closest<HTMLButtonElement>('[data-action]');
		if (!btn) return;
		const { action } = btn.dataset;

		switch (action) {
			case 'continue-step1':
				store.continueFromStep1();
				break;
			case 'choose-menu-yes':
				store.chooseMenu(true);
				break;
			case 'choose-menu-no':
				store.chooseMenu(false);
				break;
			case 'continue-step3':
				store.continueFromStep3();
				break;
			case 'submit-reservation':
				void store.submitReservation();
				break;
			case 'new-reservation':
				store.reset();
				break;
			case 'go-back':
				store.goBack();
				break;
		}
	});

	root.addEventListener('change', (e) => {
		const target = e.target as HTMLElement | null;
		const radio = target?.closest<HTMLInputElement>('input[name="zone"]');
		if (radio) store.updateDraft({ zoneId: radio.value, timeSlot: '' });
	});

	root.addEventListener('click', (e) => {
		const target = e.target as HTMLElement | null;
		const slotBtn = target?.closest<HTMLButtonElement>('.rv-slot-btn');
		if (slotBtn && slotBtn.dataset.time) {
			store.selectTimeSlot(slotBtn.dataset.time);
			return;
		}
		const catBtn = target?.closest<HTMLButtonElement>('.rv-cat-tab');
		if (catBtn && catBtn.dataset.cat) {
			store.setActiveCategory(catBtn.dataset.cat);
			return;
		}
		const qtyBtn = target?.closest<HTMLButtonElement>('.rv-qty-btn');
		if (qtyBtn && qtyBtn.dataset.item && qtyBtn.dataset.delta) {
			store.updateCart(qtyBtn.dataset.item, Number(qtyBtn.dataset.delta));
		}
	});

	// check URL for payment return
	const params = new URLSearchParams(window.location.search);
	const mpStatus = params.get('payment_status') || params.get('status');
	if (mpStatus === 'approved') store.handlePaymentReturn('success');
	else if (mpStatus === 'pending' || mpStatus === 'failure') store.handlePaymentReturn('failure');

	// init
	store.subscribe(render);
	render(store.getState());
	void store.loadZones();
}
