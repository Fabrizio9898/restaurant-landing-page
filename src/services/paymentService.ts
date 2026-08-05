// Service de pagos. Punto de integración de Mercado Pago.
import type { PaymentIntent } from '../types/reservation';

/**
 * Crea la intención de pago por el total de la reserva.
 *
 * TODO(mp): aquí se conectará Mercado Pago.
 *   - El backend crea la preferencia (Checkout Pro) o un Payment Brick y
 *     devuelve la URL de checkout / init point.
 *   - El frontend redirige al usuario a Mercado Pago y, al volver, confirma el
 *     pago contra el backend antes de enviar la reserva.
 *
 *   const response = await fetch(`${API_BASE_URL}/payments/mp`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ amount, currency }),
 *   });
 *   if (!response.ok) throw new Error(`Error ${response.status} al iniciar el pago`);
 *   return (await response.json()) as PaymentIntent;
 */
export async function createPaymentIntent(
	amount: number,
	currency = 'ARS',
): Promise<PaymentIntent> {
	// mock: simula el pago exitoso hasta integrar Mercado Pago
	await new Promise((resolve) => setTimeout(resolve, 600));
	return { id: `mock-pago-${Date.now()}`, amount, currency, status: 'authorized' };
}
