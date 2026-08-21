import type { CartItem, CartTotals } from '../types/reservation';

export const RESERVATION_DISCOUNT = 0.1;

const roundCents = (v: number) => Math.round(v * 100) / 100;

export function computeCartTotals(items: CartItem[]): CartTotals {
	const subtotal = items.reduce((s, c) => s + c.item.price * c.quantity, 0);
	const discount = roundCents(subtotal * RESERVATION_DISCOUNT);
	return { subtotal, discount, total: roundCents(subtotal - discount) };
}
