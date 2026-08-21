import type { ReservationDraft, CustomerInfo } from '../types/reservation';

export interface FieldErrors {
	[field: string]: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStep1(draft: ReservationDraft, customer: CustomerInfo): FieldErrors {
	const errors: FieldErrors = {};
	if (!draft.date) errors.date = 'Elegí una fecha';
	if (!draft.zoneId) errors.zoneId = 'Elegí una zona';
	if (!draft.timeSlot) errors.timeSlot = 'Elegí un horario';
	if (!Number.isInteger(draft.partySize) || draft.partySize < 1) {
		errors.partySize = 'Indicá la cantidad de personas';
	}
	if (!customer.name.trim()) errors.name = 'Escribí tu nombre';
	if (customer.email && !EMAIL_RE.test(customer.email.trim())) {
		errors.email = 'Ingresá un email válido';
	}
	return errors;
}
