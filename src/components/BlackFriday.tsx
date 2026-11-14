import { useEffect, useState } from "react";
import { ChefHat, Timer, X, ArrowRight } from "lucide-react";
import type { Lang } from "@/config/site";
import { countdown, promotionActive } from "@/lib/shop-rules";
import badgeFr from "@/assets/bf-badge-fr.png";
import badgeEn from "@/assets/bf-badge-en.png";
import gift from "@/assets/gift.png";
import pancakes from "@/assets/offer-pancakes.jpg";

const L = {
  fr: { special: "Offre spéciale", packs: "sur les packs 40 & 60", limited: "Offre limitée dans :", units: ["Heures", "Minutes", "Secondes"], close: "Fermer l'offre", cta: "Découvrir maintenant", modalCta: "Voir les packs en promo", enjoy: "Profitez de", enjoy2: "sur les packs 40 & 60 recettes !" },
  en: { special: "Special offer", packs: "on 40 & 60 packs", limited: "Offer ends in:", units: ["Hours", "Minutes", "Seconds"], close: "Close offer", cta: "Discover now", modalCta: "See the discounted packs", enjoy: "Enjoy", enjoy2: "on the 40 & 60 recipe packs!" },
};

export const badgeFor = (lang: Lang) => (lang === "fr" ? badgeFr : badgeEn);

function Boxes({ now, lang, size = "md" }: { now: number | null; lang: Lang; size?: "sm" | "md" | "lg" }) {
  const v = now === null ? ["--", "--", "--"] : countdown(now);
  const box = size === "sm" ? "min-w-[2.6rem] px-1.5 py-1" : size === "lg" ? "min-w-[4.6rem] px-3 py-3" : "min-w-[3.6rem] px-2 py-2";
  const num = size === "sm" ? "text-lg" : size === "lg" ? "text-4xl" : "text-3xl";
  const lab = size === "sm" ? "text-[0.55rem]" : "text-xs";
  return (
    <div className="flex gap-1.5 sm:gap-2" role="timer" aria-live="off">
      {v.map((n, i) => (
        <div key={i} className={`${box} rounded-xl bg-cream text-center text-cocoa shadow-soft ring-1 ring-gold/40`}>
          <span key={n} className={`block animate-tick font-black leading-none tabular-nums ${num}`}>{n}</span>
          <span className={`mt-0.5 block font-semibold ${lab}`}>{L[lang].units[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Sticky countdown bar shown on every shop page. */
export function TimerBar({ lang, now }: { lang: Lang; now: number | null }) {
  if (now !== null && !promotionActive(now)) return null;
  const t = L[lang];
  return (
    <div className="sticky top-0 z-40 px-2 pt-2">
      <a href="#packs" className="relative mx-auto flex max-w-5xl items-center justify-between gap-2 overflow-hidden rounded-2xl bg-cocoa-grad px-3 py-2 shadow-cover sm:px-5">
        <span className="absolute inset-x-0 bottom-0 h-1 bg-gold-rim" />
        <div className="flex min-w-0 items-center gap-2">
          <ChefHat className="hidden h-9 w-9 shrink-0 text-cream sm:block" />
          <div className="leading-none">
            <p className="text-[0.55rem] font-extrabold uppercase tracking-wider text-cream sm:text-xs">{t.special}</p>
            <p className="font-script text-xl text-cream sm:text-3xl">Black <span className="text-gold-grad">Friday</span></p>
          </div>
          <div className="bg-brush shrink-0 px-2.5 py-1 text-center text-cocoa sm:px-4">
            <p className="text-lg font-black leading-none sm:text-3xl">-40%</p>
            <p className="text-[0.45rem] font-extrabold uppercase sm:text-[0.6rem]">{t.packs}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden h-12 w-px bg-gold/50 md:block" />
          <div>
            <p className="mb-1 hidden items-center gap-1.5 text-xs font-extrabold uppercase text-cream md:flex"><Timer className="h-4 w-4 text-sun" />{t.limited}</p>
            <Boxes now={now} lang={lang} size="sm" />
          </div>
          <img src={gift} alt="" width={816} height={816} className="hidden h-14 w-14 animate-gift lg:block" />
        </div>
      </a>
    </div>
  );
}

/** Opening offer: animates for four seconds, then stays until closed. */
export function OfferModal({ lang, now }: { lang: Lang; now: number | null }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("bf-offer-seen") === "1"; } catch { /* optional */ }
    if (!seen) setOpen(true);
  }, []);
  const close = () => { setOpen(false); try { sessionStorage.setItem("bf-offer-seen", "1"); } catch { /* optional */ } };
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  if (!open || (now !== null && !promotionActive(now))) return null;
  const t = L[lang];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-cocoa/75 p-4 backdrop-blur-sm animate-fade-up" role="dialog" aria-modal="true" aria-label="Black Friday" onClick={close}>
      <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} aria-label={t.close} className="absolute -top-2 right-0 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream text-cocoa shadow-cover transition hover:scale-110"><X className="h-5 w-5" /></button>
        <div className="animate-offer-in relative overflow-hidden">
          <img src={badgeFor(lang)} alt={`Black Friday -40% ${t.packs}`} width={1536} height={1024} className="w-full drop-shadow-2xl" />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-shine bg-cream/30 blur-md" />
        </div>
        <div className="mt-2 flex flex-col items-center gap-4 animate-fade-up [animation-delay:1.2s]">
          <p className="flex items-center gap-1.5 text-sm font-extrabold uppercase text-cream"><Timer className="h-4 w-4 text-sun" />{t.limited}</p>
          <Boxes now={now} lang={lang} />
          <a href="#packs" onClick={close} className="inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-extrabold text-cocoa shadow-gold transition hover:scale-105">{t.modalCta} <ArrowRight className="h-5 w-5" /></a>
        </div>
      </div>
    </div>
  );
}

/** Small promotional label stuck on the 40 and 60 packs. */
export function PackLabel({ lang }: { lang: Lang }) {
  return (
    <div className="mt-3 flex animate-badge items-stretch overflow-hidden rounded-lg shadow-soft ring-1 ring-gold" aria-label="Black Friday -40%">
      <span className="grid place-items-center bg-tomato px-1.5 text-sm font-black leading-none text-cream sm:px-2.5 sm:text-xl">-40%</span>
      <span className="flex flex-col justify-center bg-cocoa-grad px-1.5 py-1 text-left leading-none sm:px-2.5">
        <span className="text-[0.45rem] font-extrabold uppercase tracking-wide text-sun sm:text-[0.6rem]">{lang === "fr" ? "Spécial" : "Special"}</span>
        <span className="font-script text-[0.7rem] text-cream sm:text-base">Black Friday</span>
      </span>
    </div>
  );
}

/** Closing offer section before the footer. */
export function FinalOffer({ lang, now }: { lang: Lang; now: number | null }) {
  const t = L[lang];
  return (
    <section className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-[2rem] bg-cocoa md:mx-5 lg:mx-auto">
      <img src={pancakes} alt="" width={1024} height={1536} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-bottom" />
      <div className="absolute inset-0 bg-offer-fade" />
      <div className="relative flex flex-col items-start gap-5 px-6 pb-72 pt-10 md:px-12 md:pb-56">
        <p className="font-script text-3xl text-cream text-glow md:text-4xl"><span className="emoji">🔥</span> {t.special}</p>
        <h2 className="-mt-3 font-script text-5xl text-cream text-glow md:text-7xl">Black <span className="text-gold-grad">Friday</span></h2>
        <p className="text-lg font-extrabold text-cream">{t.enjoy} <span className="text-sun">-40%</span> {t.enjoy2}</p>
        <Boxes now={now} lang={lang} size="lg" />
        <a href="#packs" className="inline-flex items-center gap-2 rounded-full bg-sun px-8 py-4 text-lg font-extrabold text-cocoa shadow-gold transition hover:scale-105">{t.cta} <ArrowRight className="h-5 w-5" /></a>
      </div>
    </section>
  );
}

export { gift };
