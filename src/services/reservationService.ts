import type { Zone, AvailabilitySlot, MenuItem, MenuCategory, ReservationResponse } from '../types/reservation';

const API_BASE = '';

const zones: Zone[] = [
	{ id: 'interior', name: 'Interior', description: 'Salón principal con calefacción y ambiente cálido.' },
	{ id: 'exterior', name: 'Exterior', description: 'Terraza al aire libre, ideal para noches templadas.' },
	{ id: 'vip', name: 'VIP', description: 'Espacio privado con servicio exclusivo y mesa reservada.' },
];

export async function fetchZones(): Promise<Zone[]> {
	return zones;
}

export async function fetchAvailability(date: string, partySize: number): Promise<Map<string, AvailabilitySlot[]>> {
	// ponytail: mock until GET /availability endpoint exists
	await new Promise((r) => setTimeout(r, 300));
	const slots: AvailabilitySlot[] = [
		{ time: '12:00', available: true },
		{ time: '12:30', available: false },
		{ time: '13:00', available: true },
		{ time: '13:30', available: true },
		{ time: '20:00', available: true },
		{ time: '20:30', available: false },
		{ time: '21:00', available: true },
		{ time: '21:30', available: true },
		{ time: '22:00', available: true },
	];
	const map = new Map<string, AvailabilitySlot[]>();
	for (const z of zones) map.set(z.id, slots);
	return map;
}

export async function submitReservation(body: {
	zoneId: string;
	reservedAt: string;
	partySize: number;
	guestName: string;
	guestEmail: string;
	guestPhone: string;
	items?: Array<{ menuItemId: string; quantity: number }>;
}): Promise<ReservationResponse> {
	// TODO(api): POST /reservations
	await new Promise((r) => setTimeout(r, 500));
	// ponytail: if items present, simulate MercadoPago init_point
	const hasItems = body.items && body.items.length > 0;
	return {
		id: `res-${Date.now()}`,
		init_point: hasItems ? `https://mp.com/checkout?pref=res-${Date.now()}` : undefined,
	};
}

export async function cancelReservation(id: string): Promise<void> {
	// TODO(api): POST /reservations/:id/cancel
	console.debug('[reservation] cancel', id);
}

const mockCategories: MenuCategory[] = [
	{ id: 'cat-entradas', name: 'Entradas' },
	{ id: 'cat-principales', name: 'Principales' },
	{ id: 'cat-postres', name: 'Postres' },
	{ id: 'cat-bebidas', name: 'Bebidas' },
];

const mockItems: MenuItem[] = [
	{ id: 'm1', categoryId: 'cat-entradas', name: 'Empanadas de la casa', description: 'Carne cortada a cuchillo, horno de barro.', price: 4500 },
	{ id: 'm2', categoryId: 'cat-entradas', name: 'Provoleta a la parrilla', description: 'Orégano, aceite de oliva y pan casero.', price: 8200 },
	{ id: 'm3', categoryId: 'cat-principales', name: 'Bife de chorizo', description: '500g, ensalada criolla y papas rústicas.', price: 22000 },
	{ id: 'm4', categoryId: 'cat-principales', name: 'Risotto de hongos', description: 'Hongos de temporada y queso reggianito.', price: 16500 },
	{ id: 'm5', categoryId: 'cat-postres', name: 'Tarta de ricota', description: 'Receta de la abuela, dulce de leche.', price: 6800 },
	{ id: 'm6', categoryId: 'cat-bebidas', name: 'Vino de la casa', description: 'Copa de tinto o blanco seleccionado.', price: 5500 },
];

export async function fetchMenuCategories(): Promise<MenuCategory[]> {
	await new Promise((r) => setTimeout(r, 200));
	return mockCategories;
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
	await new Promise((r) => setTimeout(r, 200));
	return mockItems;
}
