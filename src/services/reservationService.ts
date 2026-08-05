// Service de creación de reservas.
import type { ReservationRequest, ReservationResult } from '../types/reservation';

/**
 * Envía la reserva al backend.
 *
 * TODO(api): reemplazar por el POST real.
 *   const response = await fetch(`${API_BASE_URL}/reservations`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(reservation),
 *   });
 *   if (!response.ok) throw new Error(`Error ${response.status} al crear la reserva`);
 *   return (await response.json()) as ReservationResult;
 *
 * El cuerpo enviado coincide con el contrato del backend:
 *   { date, time, partySize, customer: { name, phone, email }, dishes?: [{ id, quantity }] }
 */
export async function submitReservation(reservation: ReservationRequest): Promise<ReservationResult> {
	// mock: simula latencia de red hasta conectar el backend
	await new Promise((resolve) => setTimeout(resolve, 400));
	return { id: `mock-reserva-${Date.now()}`, status: 'confirmed' };
}
