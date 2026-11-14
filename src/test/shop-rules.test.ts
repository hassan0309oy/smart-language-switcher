import { describe, expect, it } from "vitest";
import { PACKS } from "@/config/site";
import { BLACK_FRIDAY_START, BLACK_FRIDAY_END, browserLanguage, countdown, packPrice, promotionActive } from "@/lib/shop-rules";

describe("Shop rules", () => {
  it("discounts the 40 pack by 40 percent", () => expect(packPrice(19.85, 40, BLACK_FRIDAY_START)).toBe(11.91));
  it("discounts the 60 pack by 40 percent", () => expect(packPrice(22.99, 60, BLACK_FRIDAY_START)).toBe(13.79));
  it("does not discount the 20 pack", () => expect(packPrice(11, 20, BLACK_FRIDAY_START)).toBe(11));
  it("sells the 20 pack at 11 dollars", () => expect(PACKS[0]?.basePrice).toBe(11));
  it("runs for exactly 72 hours for everyone", () => expect(BLACK_FRIDAY_END - BLACK_FRIDAY_START).toBe(72 * 60 * 60 * 1000));
  it("starts on November 15 2026 at midnight Paris time", () => expect(BLACK_FRIDAY_START).toBe(Date.parse("2026-11-14T23:00:00Z")));
  it("ends without restarting or negative time", () => {
    expect(promotionActive(BLACK_FRIDAY_END)).toBe(false);
    expect(countdown(BLACK_FRIDAY_END + 10000)).toEqual(["00", "00", "00"]);
    expect(packPrice(22.99, 60, BLACK_FRIDAY_END)).toBe(22.99);
  });
  it("uses French for French browsers", () => { expect(browserLanguage("fr-FR")).toBe("fr"); expect(browserLanguage("fr-CA")).toBe("fr"); });
  it("uses English for other browsers", () => { expect(browserLanguage("en-GB")).toBe("en"); expect(browserLanguage("de-DE")).toBe("en"); expect(browserLanguage("es-ES,es;q=0.9")).toBe("en"); expect(browserLanguage("it")).toBe("en"); });
  it("reads French from a browser language header", () => expect(browserLanguage("fr,en;q=0.8")).toBe("fr"));
  it("gives the 60 pack the lowest unit price", () => {
    const prices = PACKS.map(p => packPrice(p.basePrice, p.count, BLACK_FRIDAY_START) / p.count);
    expect(prices[2]).toBeLessThan(prices[0] ?? 0);
    expect(prices[2]).toBeLessThan(prices[1] ?? 0);
  });
  it("keeps distinct French and English checkout links for every pack", () => {
    expect(PACKS.map(p => p.link.fr)).toEqual([
      "https://shop.beacons.ai/delices.maison/999d248fb6f4-4f92-8c7c-c0b95e38968a",
      "https://shop.beacons.ai/delices.maison/b56fe518-96c8-4c7d-9046-5d3b32f62824",
      "https://shop.beacons.ai/delices.maison/4cec94e4-278e-45c9-ae48-1b2f18d49d15",
    ]);
    expect(PACKS.map(p => p.link.en)).toEqual([
      "https://shop.beacons.ai/delices.maison/9d89f4fd-fbec-4b3e-b461-eed147d0e30a",
      "https://shop.beacons.ai/delices.maison/93588ae7-2264-4e8c-a143-35f39b2c8eef",
      "https://shop.beacons.ai/delices.maison/02b4f25d-28fe-447f-b04a-e0950c441025",
    ]);
  });
});