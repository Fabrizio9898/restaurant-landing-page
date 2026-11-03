// Fixed offset: the restaurant is always Argentina time, regardless of the visitor's browser timezone.
const RESTAURANT_UTC_OFFSET = '-03:00';

const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000';

export interface ReservationPayload {
  name: string;
  email?: string;
  phone?: string;
  partySize: number;
  startAt: string;
  notes?: string;
}

export interface Reservation {
  id: string;
  kind: 'REGULAR' | 'VIP';
  customer_name: string;
  party_size: number;
  start_at: string;
  end_at: string;
  status: string;
}

export interface AvailabilityBlock {
  kind: 'VIP' | 'EVENT';
  startAt: string;
  endAt: string;
}

export class ReservationError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// date: "YYYY-MM-DD", time: "HH:MM" (from <input type="date"/"time">).
export function toStartAt(date: string, time: string): string {
  return `${date}T${time.slice(0, 5)}:00${RESTAURANT_UTC_OFFSET}`;
}

export async function createReservation(
  payload: ReservationPayload,
): Promise<Reservation> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'REGULAR', ...payload }),
    });
  } catch {
    throw new ReservationError(
      'No pudimos conectar con el servidor. Revisá tu conexión e intentá de nuevo.',
      0,
    );
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const raw = body?.message;
    const message = Array.isArray(raw)
      ? raw.join(' ')
      : raw || 'No pudimos procesar la reserva. Intentá de nuevo.';
    throw new ReservationError(message, response.status);
  }

  return body as Reservation;
}

// Public blocks (VIP + EVENT) in range; used to grey out full days/slots on the calendar.
// Failures are non-fatal for this call: the calendar still works, just without that hint.
export async function getAvailability(
  fromISO: string,
  toISO: string,
): Promise<AvailabilityBlock[]> {
  try {
    const response = await fetch(
      `${API_URL}/availability?from=${encodeURIComponent(fromISO)}&to=${encodeURIComponent(toISO)}`,
    );
    if (!response.ok) return [];
    return (await response.json()) as AvailabilityBlock[];
  } catch {
    return [];
  }
}
