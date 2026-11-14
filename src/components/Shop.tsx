import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap, ShieldCheck, Search, Heart, ChevronDown, ArrowRight, ArrowUp, Star, Gift, CircleHelp, PlayCircle, ChefHat, ClipboardCheck, Mail, Smartphone, Headphones, Plus, BookOpen } from "lucide-react";
import hero from "@/assets/hero-plate-ref.jpg";
import bookFr from "@/assets/preview-book-fr.jpg";
import bookEn from "@/assets/preview-book-en.jpg";
import { LOGO_URL, PACKS, TESTIMONIALS, VIDEOS, type Lang } from "@/config/site";
import { FinalOffer, OfferModal, PackLabel, TimerBar, gift } from "@/components/BlackFriday";
import { money, packPrice, promotionActive } from "@/lib/shop-rules";

const X = {
  fr: {
    nav: ["Accueil", "Recettes", "Avis", "FAQ"], pill: "Découvrez le plaisir de cuisiner", motto1: "Cuisinez. Savourez.", motto2: "Recommencez !",
    heroSub: "Des recettes délicieuses, faciles et rapides à préparer, dans vos e-books exclusifs.", discover: "Découvrir nos recettes",
    trust: ["Livraison instantanée", "Paiement sécurisé", "Support 7j/7"], packsTitle: "Nos Packs de Recettes", packsSub: "Choisissez le pack qui vous convient",
    popular: "Le plus populaire", pack: "Pack", recipes: "Recettes", buy: "Acheter maintenant", proof: "Des recettes gourmandes, testées et approuvées par des milliers de passionnés de cuisine !",
    videosTitle: "Nos Recettes en Vidéo", videosSub: "Découvrez nos recettes en action", giftTitle: "Offrez le plaisir de cuisiner !", giftSub: "Un cadeau parfait pour vos proches", giftCta: "Offrir un e-book",
    testiTitle: "Témoignages de Nos Clients", testiSub: "Ils adorent Délices Maison !", guarTitle: "Notre Garantie", guarSub: "Satisfait ou remboursé pendant 14 jours !", guarText: "Essayez nos recettes sans risque. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.", days: "Jours", guarantee: "Garantie",
    faqTitle: "Questions Fréquentes", faqSub: "Trouvez rapidement vos réponses",
    faq: [
      ["Comment recevoir mon e-book ?", "Immédiatement après le paiement, vous recevez un e-mail avec le lien de téléchargement de votre e-book en PDF. Pensez à vérifier vos spams si vous ne le voyez pas."],
      ["Est-ce un paiement sécurisé ?", "Oui. Le paiement est traité par une plateforme sécurisée et chiffrée. Nous n'avons jamais accès à vos coordonnées bancaires."],
      ["Puis-je être remboursé ?", "Oui, vous bénéficiez de notre garantie satisfait ou remboursé de 14 jours. Écrivez-nous simplement et nous vous remboursons."],
      ["Les recettes sont-elles faciles à réaliser ?", "Absolument ! Chaque recette est expliquée étape par étape, avec des ingrédients faciles à trouver en supermarché. Parfait même pour les débutants."],
      ["Peut-on utiliser ces recettes pour toute la famille ?", "Bien sûr ! Les recettes sont pensées pour régaler petits et grands, avec des quantités adaptables selon le nombre de personnes."],
      ["Sur quels appareils puis-je lire mon e-book ?", "Sur tous vos appareils : téléphone, tablette, ordinateur ou liseuse. Vous pouvez aussi l'imprimer pour l'avoir en cuisine."],
      ["Quel pack choisir ?", "Le pack 20 est idéal pour découvrir. Les packs 40 et 60 offrent le plus de variété et le meilleur prix par recette, surtout avec -40 % pendant le Black Friday."],
      ["Combien de temps dure l'offre Black Friday ?", "L'offre est limitée dans le temps : le minuteur en haut de la page indique exactement le temps restant. Ensuite, les prix reviennent à la normale."],
      ["Puis-je offrir un e-book en cadeau ?", "Oui ! Achetez le pack de votre choix et transférez simplement l'e-book à la personne de votre choix. Un cadeau gourmand et instantané."],
      ["Y a-t-il un abonnement ou des frais cachés ?", "Non. C'est un paiement unique : l'e-book est à vous pour toujours, sans abonnement ni frais supplémentaires."],
      ["Comment contacter le support ?", "Notre équipe répond 7j/7 par e-mail. Répondez simplement à l'e-mail de confirmation de commande et nous revenons vers vous rapidement."],
    ],
    whyTitle: "Pourquoi Choisir Délices Maison ?", why: ["Recettes testées et approuvées", "Accès immédiat après achat", "Compatible sur tous vos appareils", "Support client réactif"],
    readyTitle: "Prêt à régaler toute votre famille ?", readySub: "Rejoignez des milliers de passionnés de cuisine dès aujourd'hui !", readyCta: "Découvrir nos packs",
    rights: "Tous droits réservés.", top: "Retour en haut", previewTitle: "Aperçu des E-books", previewSub: "Feuilletez une recette avant de craquer", previewNote: "Chaque recette tient sur deux pages : la présentation et les ingrédients, puis la préparation pas à pas.", more: "Voir plus", less: "Voir moins", prev: "Précédent", next: "Suivant",
  },
  en: {
    nav: ["Home", "Recipes", "Reviews", "FAQ"], pill: "Discover the joy of cooking", motto1: "Cook. Savour.", motto2: "Repeat!",
    heroSub: "Delicious, easy and quick recipes, in your exclusive e-books.", discover: "Discover our recipes",
    trust: ["Instant delivery", "Secure payment", "Support 7/7"], packsTitle: "Our Recipe Packs", packsSub: "Choose the pack that suits you",
    popular: "Most popular", pack: "Pack", recipes: "Recipes", buy: "Buy now", proof: "Mouth-watering recipes, tested and approved by thousands of cooking lovers!",
    videosTitle: "Our Recipes on Video", videosSub: "See our recipes in action", giftTitle: "Give the joy of cooking!", giftSub: "The perfect gift for your loved ones", giftCta: "Gift an e-book",
    testiTitle: "Our Customers' Reviews", testiSub: "They love Délices Maison!", guarTitle: "Our Guarantee", guarSub: "14-day money-back guarantee!", guarText: "Try our recipes risk-free. If you're not satisfied, we'll refund you in full.", days: "Days", guarantee: "Guarantee",
    faqTitle: "Frequently Asked Questions", faqSub: "Find your answers quickly",
    faq: [
      ["How do I receive my e-book?", "Right after payment you receive an email with the download link to your PDF e-book. Check your spam folder if you don't see it."],
      ["Is the payment secure?", "Yes. Payment is processed by a secure, encrypted platform. We never have access to your card details."],
      ["Can I get a refund?", "Yes, you're covered by our 14-day money-back guarantee. Just write to us and we'll refund you."],
      ["Are the recipes easy to make?", "Absolutely! Every recipe is explained step by step, with ingredients you can find in any supermarket. Perfect even for beginners."],
      ["Can I use these recipes for the whole family?", "Of course! The recipes are designed to delight kids and adults, with quantities you can adjust to the number of people."],
      ["Which devices can I read my e-book on?", "All of them: phone, tablet, computer or e-reader. You can also print it to keep in your kitchen."],
      ["Which pack should I choose?", "The 20 pack is ideal to get started. The 40 and 60 packs offer the most variety and the best price per recipe, especially with -40% during Black Friday."],
      ["How long does the Black Friday offer last?", "The offer is time-limited: the timer at the top of the page shows exactly how much time is left. After that, prices go back to normal."],
      ["Can I give an e-book as a gift?", "Yes! Buy the pack of your choice and simply forward the e-book to whoever you like. A delicious, instant gift."],
      ["Is there a subscription or hidden fees?", "No. It's a one-time payment: the e-book is yours forever, with no subscription or extra fees."],
      ["How do I contact support?", "Our team answers 7 days a week by email. Just reply to your order confirmation email and we'll get back to you quickly."],
    ],
    whyTitle: "Why Choose Délices Maison?", why: ["Tested & approved recipes", "Instant access after purchase", "Works on all your devices", "Responsive customer support"],
    readyTitle: "Ready to delight your whole family?", readySub: "Join thousands of cooking lovers today!", readyCta: "Discover our packs",
    rights: "All rights reserved.", top: "Back to top", previewTitle: "E-book Preview", previewSub: "Flip through a recipe before you treat yourself", previewNote: "Each recipe fits on two pages: the presentation and ingredients, then the step-by-step method.", more: "See more", less: "See less", prev: "Previous", next: "Next",
  },
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Title({ icon: I, children, sub }: { icon: typeof Heart; children: string; sub: string }) {
  return (
    <div className="px-4 text-center">
      <h2 className="flex items-center justify-center gap-2.5 font-script text-[1.75rem] leading-tight text-cocoa md:text-5xl"><I className="h-7 w-7 shrink-0 text-cocoa md:h-9 md:w-9" strokeWidth={2} />{children}</h2>
      <p className="mt-1 text-sm font-semibold text-cocoa/80 md:text-base">{sub}</p>
    </div>
  );
}

function Dots({ n, i, onPick }: { n: number; i: number; onPick: (k: number) => void }) {
  return <div className="mt-4 flex justify-center gap-1.5">{Array.from({ length: n }, (_, k) => <button key={k} aria-label={`${k + 1}`} onClick={() => onPick(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-cocoa" : "w-2 bg-cocoa/25"}`} />)}</div>;
}

function Videos({ lang }: { lang: Lang }) {
  const x = X[lang];
  return (
    <section id="recettes" className="reveal mt-14 scroll-mt-24">
      <Title icon={PlayCircle} sub={x.videosSub}>{x.videosTitle}</Title>
      <div className="mt-6 overflow-hidden">
        <div className="flex w-max animate-video-marquee">
          {[...VIDEOS, ...VIDEOS].map((v, i) => (
            <div key={i} className="w-[32vw] max-w-[15rem] shrink-0 px-1 sm:px-2" aria-hidden={i >= VIDEOS.length}>
              <div className="overflow-hidden rounded-2xl bg-cocoa shadow-cover">
                <video src={v} autoPlay muted loop playsInline preload="metadata" className="pointer-events-none aspect-[3/4] w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews({ lang }: { lang: Lang }) {
  const x = X[lang]; const pages = Math.ceil(TESTIMONIALS.length / 3); const [page, setPage] = useState(0);
  useEffect(() => { const id = setInterval(() => setPage(p => (p + 1) % pages), 6000); return () => clearInterval(id); }, [pages]);
  const shown = TESTIMONIALS.slice(page * 3, page * 3 + 3);
  return (
    <section id="avis" className="reveal scroll-mt-24 pt-10">
      <Title icon={Heart} sub={x.testiSub}>{x.testiTitle}</Title>
      <div key={page} className="mx-auto mt-6 grid max-w-4xl grid-cols-3 gap-2 px-3 animate-fade-up sm:gap-5">
        {shown.map((r) => (
          <figure key={r.name} className="flex flex-col items-center rounded-2xl bg-card px-2 py-4 text-center shadow-soft ring-1 ring-border sm:px-5 sm:py-6">
            <img src={r.avatar} alt={r.name} width={160} height={160} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-2 ring-sun sm:h-20 sm:w-20" />
            <div className="mt-2 flex gap-0.5">{Array.from({ length: r.rating }, (_, k) => <Star key={k} className="h-3 w-3 fill-sun text-sun sm:h-4 sm:w-4" />)}</div>
            <blockquote className="mt-2 flex-1 text-[0.68rem] leading-snug text-cocoa sm:text-sm">“{r.text[lang]}”</blockquote>
            <figcaption className="mt-3 text-[0.7rem] font-extrabold text-cocoa sm:text-sm">{r.name} <span className="emoji">{r.flag}</span></figcaption>
          </figure>
        ))}
      </div>
      <Dots n={pages} i={page} onPick={setPage} />
    </section>
  );
}

export function Shop({ lang }: { lang: Lang }) {
  const x = X[lang]; const ref = useReveal();
  const [now, setNow] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [faqAll, setFaqAll] = useState(false);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const active = now !== null && promotionActive(now);
  const trustIcons = [Zap, ShieldCheck, Search];
  const whyIcons = [ClipboardCheck, Mail, Smartphone, Headphones];
  const navIds = ["#top", "#packs", "#avis", "#faq"];

  return (
    <div ref={ref} id="top" className="overflow-x-hidden">
      <OfferModal lang={lang} now={now} />
      <TimerBar lang={lang} now={now} />

      {/* HERO */}
      <section className="relative -mt-[4.5rem] overflow-hidden rounded-b-[2.5rem] bg-cocoa pb-28 pt-[4.5rem] md:pb-36">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-hero-fade" />
        <header className="relative mx-auto mt-2 flex max-w-6xl items-center justify-between gap-2 rounded-b-3xl bg-cream/95 px-3 py-2 shadow-soft md:mt-4 md:rounded-full md:px-6">
          <a href="#top" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Délices Maison" width={512} height={512} className="h-12 w-12 rounded-full md:h-14 md:w-14" />
            <span className="hidden font-script text-xl text-cocoa sm:block">Délices Maison</span>
          </a>
          <nav className="flex items-center gap-2.5 text-[0.7rem] font-bold text-cocoa sm:gap-5 sm:text-sm">
            {x.nav.map((n, i) => <a key={n} href={navIds[i]} className="hover:text-accent">{n}</a>)}
          </nav>
        </header>
        <div className="relative mx-auto max-w-6xl px-5 pt-16 md:pt-24">
          <div className="max-w-xl animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-cocoa/60 px-4 py-2 text-xs font-bold text-cream ring-1 ring-sun backdrop-blur-sm sm:text-sm"><ChefHat className="h-4 w-4 text-sun" />{x.pill}</p>
            <h1 className="mt-5 font-script text-6xl leading-none text-cream text-glow md:text-8xl">Délices Maison</h1>
            <p className="mt-3 text-2xl font-extrabold text-cream text-glow md:text-3xl">{x.motto1} <span className="text-sun">{x.motto2}</span></p>
            <p className="mt-4 max-w-sm text-base font-semibold text-cream text-glow md:text-lg">{x.heroSub}</p>
            <a href="#packs" className="mt-7 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-4 text-base font-extrabold text-cocoa shadow-gold transition hover:scale-105">{x.discover} <ArrowRight className="h-5 w-5" /></a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="relative z-10 mx-auto -mt-16 max-w-3xl px-4">
        <div className="grid grid-cols-3 divide-x divide-border rounded-3xl bg-card/95 py-4 shadow-soft ring-1 ring-border">
          {x.trust.map((label, i) => { const I = trustIcons[i]!; return (
            <div key={label} className="flex flex-col items-center gap-1.5 px-2 text-center text-xs font-bold text-cocoa sm:text-sm"><I className="h-6 w-6 text-accent" />{label}</div>
          ); })}
        </div>
      </div>

      {/* PACKS */}
      <section id="packs" className="reveal mt-12 scroll-mt-24">
        <Title icon={ChefHat} sub={x.packsSub}>{x.packsTitle}</Title>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-3 items-end gap-2 px-2 sm:gap-6 sm:px-5">
          {PACKS.map((p) => {
            const price = packPrice(p.basePrice, p.count, now ?? 0); const promo = active && price < p.basePrice; const mid = p.count === 40;
            return (
              <article key={p.id} className={`relative flex flex-col items-center rounded-2xl bg-card px-2 pb-4 pt-4 text-center shadow-soft ring-1 sm:px-5 ${mid ? "ring-2 ring-sun sm:-translate-y-3" : "ring-border"}`}>
                {mid && <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-3 py-1 text-[0.6rem] font-extrabold text-cocoa shadow-soft sm:text-xs">{x.popular} <span className="emoji">🔥</span></span>}
                <a href={p.link[lang]} target="_blank" rel="noopener noreferrer" className="relative block w-full">
                  <img src={p.cover[lang]} alt={p.name[lang]} width={1160} height={1355} loading="lazy" className="w-full rounded-lg shadow-cover transition duration-500 hover:scale-105" />
                </a>
                {promo ? <PackLabel lang={lang} /> : <div className="mt-3 h-[1.9rem] sm:h-[2.6rem]" aria-hidden />}
                <h3 className="mt-3 font-sans text-xs font-extrabold text-cocoa sm:text-lg">{x.pack} {p.count} {x.recipes}</h3>
                <div className="my-2 h-px w-full bg-border" />
                <div className="flex flex-wrap items-baseline justify-center gap-x-1.5">
                  {promo && <s className="font-price text-xs text-muted-foreground sm:text-base">{money(p.basePrice, lang)}</s>}
                  <span className="font-price text-xl font-bold text-cocoa sm:text-3xl">{money(price, lang)}</span>
                </div>
                <a href={p.link[lang]} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full bg-sun px-1.5 py-2 text-[0.6rem] font-extrabold leading-tight text-cocoa shadow-soft transition hover:scale-105 sm:text-sm">{p.cta[lang]}</a>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-6 max-w-3xl px-4">
          <p className="flex items-center gap-3 rounded-2xl bg-secondary px-5 py-4 text-sm font-semibold text-cocoa shadow-soft"><Star className="h-6 w-6 shrink-0 fill-sun text-accent" />{x.proof}</p>
        </div>
      </section>

      {/* PREVIEW */}
      <section id="apercu" className="reveal mt-14 scroll-mt-24">
        <Title icon={BookOpen} sub={x.previewSub}>{x.previewTitle}</Title>
        <div className="mx-auto mt-6 max-w-4xl px-3">
          <img src={lang === "fr" ? bookFr : bookEn} alt={x.previewTitle} width={1600} height={1180} loading="lazy" className="w-full rounded-2xl" />
          <p className="mt-2 text-center text-xs font-semibold text-cocoa/70 sm:text-sm">{x.previewNote}</p>
        </div>
      </section>

      <Videos lang={lang} />

      {/* GIFT */}
      <section className="reveal mx-auto mt-12 max-w-5xl px-3">
        <div className="relative overflow-visible rounded-[2rem] bg-gift-grad px-5 py-7 shadow-cover md:px-10">
          <div className="relative z-10 max-w-[62%]">
            <p className="flex items-center gap-2 font-script text-2xl leading-tight text-cream md:text-4xl"><Gift className="h-7 w-7 shrink-0 text-sun" />{x.giftTitle}</p>
            <p className="mt-1 text-xs font-semibold text-cream/85 md:text-base">{x.giftSub} <span className="emoji">🎁</span></p>
            <a href="#packs" className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold text-cream ring-1 ring-cream/70 transition hover:bg-cream hover:text-cocoa">{x.giftCta} <ArrowRight className="h-4 w-4" /></a>
          </div>
          <img src={gift} alt="" width={816} height={816} loading="lazy" className="absolute -top-6 right-2 h-36 w-36 animate-gift drop-shadow-2xl md:h-48 md:w-48" />
        </div>
      </section>

      <Reviews lang={lang} />

      {/* GUARANTEE */}
      <section className="reveal mx-auto mt-10 max-w-3xl px-4">
        <div className="flex items-center gap-4 rounded-3xl bg-secondary p-5 shadow-soft ring-1 ring-border">
          <div className="flex-1">
            <p className="flex items-center gap-2 font-script text-2xl text-cocoa"><ShieldCheck className="h-7 w-7 fill-cocoa text-cream" />{x.guarTitle}</p>
            <p className="mt-1 text-sm font-extrabold text-cocoa">{x.guarSub}</p>
            <p className="mt-2 text-xs text-cocoa/80 sm:text-sm">{x.guarText}</p>
          </div>
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-sun text-center text-cocoa shadow-gold ring-4 ring-gold">
            <div className="leading-none"><p className="text-2xl font-black">14</p><p className="text-[0.55rem] font-extrabold uppercase">{x.days}</p><p className="text-[0.5rem] font-bold uppercase">{x.guarantee}</p></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="reveal mt-14 scroll-mt-24">
        <Title icon={CircleHelp} sub={x.faqSub}>{x.faqTitle}</Title>
        <div className="mx-auto mt-6 max-w-3xl px-4"><div className="flex flex-col gap-2 rounded-3xl bg-secondary p-3 shadow-soft ring-1 ring-border">
          {x.faq.slice(0, faqAll ? undefined : 5).map(([q, a], i) => (
            <div key={q} className="animate-fade-up rounded-2xl bg-card shadow-soft ring-1 ring-border">
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i} className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm font-bold text-cocoa">
                {q}<Plus className={`h-4 w-4 shrink-0 transition-transform ${faqOpen === i ? "rotate-45" : ""}`} />
              </button>
              {faqOpen === i && <p className="animate-fade-up px-5 pb-4 text-sm text-cocoa/80">{a}</p>}
            </div>
          ))}
          <button onClick={() => { setFaqAll(v => !v); if (faqAll && faqOpen !== null && faqOpen >= 5) setFaqOpen(null); }} aria-expanded={faqAll} className="mx-auto mt-1 inline-flex items-center gap-1.5 rounded-full bg-sun px-5 py-2 text-sm font-extrabold text-cocoa shadow-soft transition hover:scale-105">
            {faqAll ? x.less : x.more}<ChevronDown className={`h-4 w-4 transition-transform ${faqAll ? "rotate-180" : ""}`} />
          </button>
        </div></div>
      </section>

      {active && <FinalOffer lang={lang} now={now} />}

      {/* WHY */}
      <section className="reveal mt-14">
        <div className="relative mx-auto h-32 max-w-6xl overflow-hidden wave-bottom">
          <img src={hero} alt="" width={1920} height={1088} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="mt-8"><Title icon={ChefHat} sub="">{x.whyTitle}</Title></div>
        <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-2.5 px-4">
          {x.why.map((w, i) => { const I = whyIcons[i]!; return (
            <div key={w} className="flex items-center gap-4 rounded-2xl bg-card px-5 py-3.5 text-sm font-bold text-cocoa shadow-soft ring-1 ring-border"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cocoa text-cream shadow-soft"><I className="h-4 w-4" /></span>{w}</div>
          ); })}
        </div>
        <div className="mx-auto mt-10 max-w-2xl px-4">
          <div className="relative rounded-[2rem] bg-peach px-6 py-8 text-center shadow-cover ring-1 ring-border">
            <ChefHat className="absolute -right-2 -top-6 h-12 w-12 rotate-12 text-cocoa" />
            <Heart className="mx-auto h-9 w-9 text-tomato" />
            <h2 className="mt-3 font-script text-3xl leading-tight text-cocoa md:text-4xl">{x.readyTitle}</h2>
            <p className="mt-3 text-sm font-semibold text-cocoa/80">{x.readySub}</p>
            <a href="#packs" className="mt-5 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-extrabold text-cocoa shadow-gold transition hover:scale-105">{x.readyCta} <ArrowRight className="h-5 w-5" /></a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative mt-14 rounded-t-[3rem] bg-cocoa-grad px-5 pb-10 pt-12 text-center text-cream">
        <img src={LOGO_URL} alt="Délices Maison" width={512} height={512} loading="lazy" className="mx-auto h-28 w-28 rounded-full ring-4 ring-gold" />
        <p className="mt-4 font-script text-3xl">Délices Maison</p>
        <p className="mt-1 text-sm font-semibold">{x.motto1} {x.motto2}</p>
        <div className="mx-auto my-7 h-px max-w-md bg-cream/20" />
        <nav className="flex items-center justify-center gap-3 text-sm font-semibold">
          {x.nav.map((n, i) => <span key={n} className="flex items-center gap-3">{i > 0 && <span className="text-cream/40">|</span>}<a href={navIds[i]} className="hover:text-sun">{n}</a></span>)}
        </nav>
        <p className="mt-6 text-xs text-cream/70">© {new Date().getFullYear()} Délices Maison. {x.rights}</p>
        <a href="#top" aria-label={x.top} className="absolute bottom-6 right-5 grid h-11 w-11 place-items-center rounded-full bg-cream/15 ring-1 ring-cream/30 hover:bg-cream/25"><ArrowUp className="h-5 w-5" /></a>
      </footer>
    </div>
  );
}
