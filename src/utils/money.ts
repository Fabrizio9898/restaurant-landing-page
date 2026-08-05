/** Formatea un monto numérico en pesos argentinos. */
export function formatMoney(amount: number): string {
	return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
}
