export interface Zone {
	id: string;
	name: string;
	description: string;
}

export interface AvailabilitySlot {
	time: string;
	available: boolean;
}

export interface MenuItem {
	id: string;
	categoryId: string;
	name: string;
	description: string;
	price: number;
}

export interface MenuCategory {
	id: string;
	name: string;
}

export interface CustomerInfo {
	name: string;
	phone: string;
	email: string;
}

export interface CartItem {
	item: MenuItem;
	quantity: number;
}

export interface CartTotals {
	subtotal: number;
	discount: number;
	total: number;
}

export type FlowStep = 'step1' | 'step2' | 'step3' | 'step4';

export interface ReservationDraft {
	date: string;
	partySize: number;
	zoneId: string;
	timeSlot: string;
}

export interface ReservationResponse {
	id: string;
	init_point?: string;
}

export type PaymentStatus = 'idle' | 'redirecting' | 'success' | 'failure';
