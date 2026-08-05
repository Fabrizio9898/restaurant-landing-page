import type { ReservationDraft } from '../types/reservation';

export interface FieldErrors {
	[field: string]: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Valida el paso 1 (datos de la reserva y del cliente). */
export function validateDetails(draft: ReservationDraft): FieldErrors {
	const errors: FieldErrors = {};
	if (!draft.date) errors.date = 'Elegí una fecha';
	if (!draft.time) errors.time = 'Elegí un horario';
	if (!Number.isInteger(draft.partySize) || draft.partySize < 1) {
		errors.partySize = 'Indicá la cantidad de personas';
	}
	if (!draft.customer.name.trim()) errors.name = 'Escribí tu nombre';
	if (!draft.customer.phone.trim()) errors.phone = 'Escribí tu teléfono';
	if (!EMAIL_RE.test(draft.customer.email.trim())) errors.email = 'Ingresá un email válido';
	return errors;
}
