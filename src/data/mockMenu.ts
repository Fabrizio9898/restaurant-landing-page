// Datos de prueba usados por los services mientras no exista la API del backend.
// TODO(api): eliminar cuando menuService.fetchMenu() consuma la API real.
import type { Dish } from '../types/reservation';

export const mockMenu: Dish[] = [
	{
		id: 'd1',
		name: 'Empanadas de la casa',
		description: 'Carne cortada a cuchillo, horno de barro.',
		price: 4500,
		category: 'Entradas',
		available: true,
	},
	{
		id: 'd2',
		name: 'Provoleta a la parrilla',
		description: 'Orégano, aceite de oliva y pan casero.',
		price: 8200,
		category: 'Entradas',
		available: true,
	},
	{
		id: 'd3',
		name: 'Bife de chorizo',
		description: '500g, ensalada criolla y papas rústicas.',
		price: 22000,
		category: 'Principales',
		available: true,
	},
	{
		id: 'd4',
		name: 'Risotto de hongos',
		description: 'Hongos de temporada y queso reggianito.',
		price: 16500,
		category: 'Principales',
		available: true,
	},
	{
		id: 'd5',
		name: 'Tarta de ricota',
		description: 'Receta de la abuela, dulce de leche.',
		price: 6800,
		category: 'Postres',
		available: true,
	},
	{
		id: 'd6',
		name: 'Vino de la casa',
		description: 'Copa de tinto o blanco seleccionado.',
		price: 5500,
		category: 'Bebidas',
		available: false,
	},
];
