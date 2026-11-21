export type ShopLanguage = "fr" | "en";

// One shared campaign for everyone; never restart urgency for an individual visitor.
// The general counter runs from Nov 18 2026 20:00 Paris until Nov 30 2026 at midnight
// (end of the day, Dec 1 00:00 Paris = Nov 30 23:00 UTC). Inside it, the 72-hour
// timer restarts automatically each time it reaches zero; the last cycle is cut at the end.
export const BLACK_FRIDAY_START = Date.parse("2026-11-18T19:00:00Z");
export const BLACK_FRIDAY_END = Date.parse("2026-11-30T23:00:00Z");
export const CYCLE_MS = 72 * 60 * 60 * 1000;
export const BLACK_FRIDAY_DISCOUNT = 0.4;

export function browserLanguage(language: string): ShopLanguage {
  return language.toLowerCase().trim().split(/[-_,;\s]/)[0] === "fr" ? "fr" : "en";
}

export function promotionActive(now: number): boolean {
  return now >= BLACK_FRIDAY_START && now < BLACK_FRIDAY_END;
}

export function packPrice(basePrice: number, count: number, now: number): number {
  return promotionActive(now) && (count === 40 || count === 60)
    ? Math.round(basePrice * (1 - BLACK_FRIDAY_DISCOUNT) * 100) / 100
    : basePrice;
}

export function money(value: number, lang: ShopLanguage): string {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", {
    style: "currency", currency: "USD", currencyDisplay: "narrowSymbol",
  }).format(value);
}

/** End of the 72-hour cycle running at `now`, never later than the general end. */
export function cycleEnd(now: number): number {
  if (now < BLACK_FRIDAY_START) return Math.min(BLACK_FRIDAY_START + CYCLE_MS, BLACK_FRIDAY_END);
  const n = Math.floor((now - BLACK_FRIDAY_START) / CYCLE_MS) + 1;
  return Math.min(BLACK_FRIDAY_START + n * CYCLE_MS, BLACK_FRIDAY_END);
}

export function countdown(now: number): [string, string, string] {
  const seconds = Math.max(0, Math.floor((cycleEnd(now) - now) / 1000));
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map((n) => String(n).padStart(2, "0")) as [string, string, string];
}