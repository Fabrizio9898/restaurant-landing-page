// Tipos del flujo de reservas.

/** Platos de la carta cargados desde la API del menú. */
export interface Dish {
	id: string;
	name: string;
	description: string;
	/** Precio en la moneda local (ej: ARS). */
	price: number;
	category: string;
	available: boolean;
}

export interface CustomerInfo {
	name: string;
	phone: string;
	email: string;
}

/** Estado editable durante el flujo, antes de enviar al backend. */
export interface ReservationDraft {
	/** YYYY-MM-DD (value de <input type="date">). */
	date: string;
	/** HH:mm (value de <input type="time">). */
	time: string;
	partySize: number;
	customer: CustomerInfo;
}

/** Platos seleccionados por el cliente (denormalizados para el resumen). */
export interface Selection {
	dish: Dish;
	quantity: number;
}

export interface Totals {
	subtotal: number;
	discount: number;
	total: number;
}

export type Step = 'details' | 'dishes' | 'summary' | 'payment' | 'result';

/** Payload final que recibirá el backend. */
export interface ReservationRequest {
	date: string;
	time: string;
	partySize: number;
	customer: CustomerInfo;
	dishes?: Array<{ id: string; quantity: number }>;
}

export interface ReservationResult {
	id: string;
	status: 'confirmed' | 'pending';
}

export interface PaymentIntent {
	id: string;
	amount: number;
	currency: string;
	status: string;
}
