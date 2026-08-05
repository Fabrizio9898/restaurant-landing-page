// Service de acceso a la carta del restaurante.
import { mockMenu } from '../data/mockMenu';
import type { Dish } from '../types/reservation';

/**
 * Obtiene la carta/menú completo desde la API.
 *
 * TODO(api): reemplazar por el fetch real.
 *   const response = await fetch(`${API_BASE_URL}/menu`);
 *   if (!response.ok) throw new Error(`Error ${response.status} al obtener el menú`);
 *   return (await response.json()) as Dish[];
 */
export async function fetchMenu(): Promise<Dish[]> {
	// mock: simula latencia de red hasta conectar el backend
	await new Promise((resolve) => setTimeout(resolve, 300));
	return mockMenu;
}
