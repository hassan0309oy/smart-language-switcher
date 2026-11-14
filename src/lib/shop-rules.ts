export type ShopLanguage = "fr" | "en";

// One shared campaign window; never restart urgency for an individual visitor.
export const BLACK_FRIDAY_START = Date.parse("2026-11-14T21:14:06Z");
export const BLACK_FRIDAY_END = BLACK_FRIDAY_START + 48 * 60 * 60 * 1000;
export const BLACK_FRIDAY_DISCOUNT = 0.4;

export function browserLanguage(language: string): ShopLanguage {
  return language.toLowerCase().split(/[-_]/)[0] === "fr" ? "fr" : "en";
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

export function countdown(now: number): [string, string, string] {
  const seconds = Math.max(0, Math.floor((BLACK_FRIDAY_END - now) / 1000));
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map((n) => String(n).padStart(2, "0")) as [string, string, string];
}