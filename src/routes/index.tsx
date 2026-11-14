import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LANG_KEY, LOGO_URL, type Lang } from "@/config/site";
import { browserLanguage } from "@/lib/shop-rules";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Délices Maison — Homemade recipes in your language" },
    { name: "description", content: "Délices Maison recipe e-books, automatically in French or English. Discover our 20, 40 and 60 recipe packs." },
    { property: "og:title", content: "Délices Maison — Homemade recipes in your language" },
    { property: "og:description", content: "Delicious homemade recipe e-books, in French or English." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LanguagePage,
});

function LanguagePage() {
  const navigate = useNavigate();
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch { /* Browser language works without storage. */ }
    const lang = saved === "fr" || saved === "en" ? saved : browserLanguage(navigator.language);
    navigate({ to: lang === "fr" ? "/fr" : "/en", replace: true });
  }, [navigate]);
  const pick = (l: Lang) => { try { localStorage.setItem(LANG_KEY, l); } catch { /* Storage is optional. */ } navigate({ to: l === "fr" ? "/fr" : "/en" }); };
  const btn = "group flex h-auto w-full items-center justify-center gap-4 rounded-full bg-caramel-grad px-8 py-5 text-xl font-extrabold text-cream shadow-cover transition duration-300 hover:-translate-y-1 hover:scale-[1.03]";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <div className="absolute inset-0 bg-sand-grad" />
      <div className="relative flex flex-col items-center">
        <img src={LOGO_URL} alt="Délices Maison" width={512} height={512} className="animate-floaty h-44 w-44 rounded-full shadow-cover ring-4 ring-cream md:h-56 md:w-56" />
        <h1 className="mt-6 font-script text-5xl text-cream text-glow md:text-7xl">Délices Maison</h1>
        <p className="mt-2 font-script text-xl text-cream">Cuisinez. Savourez. Recommencez !</p>
        <p className="mt-12 font-script text-3xl text-cream text-glow md:text-4xl">Choose your language</p>
        <div className="mt-6 flex w-full max-w-xs flex-col gap-4">
          <Button className={btn} onClick={() => pick("fr")}><span className="emoji">🇫🇷</span> Français</Button>
          <Button className={btn} onClick={() => pick("en")}><span className="emoji">🇬🇧</span> English</Button>
        </div>
      </div>
    </main>
  );
}
