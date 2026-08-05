import type { Selection, Totals } from '../types/reservation';

/** Descuento aplicado sobre los platos seleccionados al reservar. */
export const RESERVATION_DISCOUNT = 0.1;

const roundCents = (value: number) => Math.round(value * 100) / 100;

export function computeTotals(selections: Selection[]): Totals {
	const subtotal = selections.reduce((sum, sel) => sum + sel.dish.price * sel.quantity, 0);
	const discount = roundCents(subtotal * RESERVATION_DISCOUNT);
	return { subtotal, discount, total: roundCents(subtotal - discount) };
}
