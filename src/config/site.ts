// Central content config: prices, purchase links, covers, texts, videos, testimonials.
import logo from "@/assets/logo.png";
const v1 = { url: "/media/videos/recette-1.mp4" };
const v2 = { url: "/media/videos/recette-2.mp4" };
const v3 = { url: "/media/videos/recette-3.mp4" };
const v4 = { url: "/media/videos/recette-4.mp4" };
const v5 = { url: "/media/videos/recette-5.mp4" };
const v6 = { url: "/media/videos/recette-6.mp4" };
const v7 = { url: "/media/videos/recette-7.mp4" };
const v8 = { url: "/media/videos/recette-8.mp4" };
const v9 = { url: "/media/videos/recette-9.mp4" };
const v10 = { url: "/media/videos/recette-10.mp4" };
import a1 from "@/assets/avatar-1.jpg";
import a2 from "@/assets/avatar-2.jpg";
import a3 from "@/assets/avatar-3.jpg";
import a4 from "@/assets/avatar-4.jpg";
import a5 from "@/assets/avatar-5.jpg";
import a6 from "@/assets/avatar-6.jpg";
import a7 from "@/assets/avatar-7.jpg";
import a8 from "@/assets/avatar-8.jpg";
import a9 from "@/assets/avatar-9.jpg";
const c20fr = { url: "/media/cover-20-fr.png" };
const c20en = { url: "/media/cover-20-en.png" };
const c40fr = { url: "/media/cover-40-fr.png" };
const c40en = { url: "/media/cover-40-en.png" };
const c60fr = { url: "/media/cover-60-fr.png" };
const c60en = { url: "/media/cover-60-en.png" };

export type Lang = "fr" | "en";
export const LOGO_URL = logo;

export type Pack = {
  id: string;
  count: number;
  price: string;
  basePrice: number;
  oldPrice?: string; // only set if a real discount is confirmed
  cover: Record<Lang, string>;
  link: Record<Lang, string>;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  benefits: Record<Lang, string[]>;
  cta: Record<Lang, string>;
  featured?: boolean;
};

export const PACKS: Pack[] = [
  {
    id: "pack-20", count: 20, price: "11,00 $", basePrice: 11,
    cover: { fr: c20fr.url, en: c20en.url },
    link: {
      fr: "https://shop.beacons.ai/delices.maison/999d248fb6f4-4f92-8c7c-c0b95e38968a",
      en: "https://shop.beacons.ai/delices.maison/9d89f4fd-fbec-4b3e-b461-eed147d0e30a",
    },
    name: { fr: "20 Recettes Gourmandes", en: "20 Delicious Recipes" },
    description: {
      fr: "L'essentiel pour se régaler chaque semaine : des plats réconfortants, simples et savoureux, prêts en un clin d'œil.",
      en: "The essentials to treat yourself every week: comforting, simple and tasty dishes, ready in no time.",
    },
    benefits: {
      fr: ["Recettes rapides du quotidien", "Ingrédients faciles à trouver", "Parfait pour débuter"],
      en: ["Quick everyday recipes", "Easy-to-find ingredients", "Perfect to get started"],
    },
    cta: { fr: "🍳 Prendre mes recettes", en: "🍳 Grab my recipes" },
  },
  {
    id: "pack-40", count: 40, price: "19,85 $", basePrice: 19.85,
    cover: { fr: c40fr.url, en: c40en.url },
    link: {
      fr: "https://shop.beacons.ai/delices.maison/b56fe518-96c8-4c7d-9046-5d3b32f62824",
      en: "https://shop.beacons.ai/delices.maison/93588ae7-2264-4e8c-a143-35f39b2c8eef",
    },
    name: { fr: "40 Recettes Délicieuses", en: "40 Delicious Recipes" },
    description: {
      fr: "Variez les plaisirs : entrées, plats et douceurs pour surprendre toute la famille sans passer des heures en cuisine.",
      en: "Mix it up: starters, mains and sweet treats to delight the whole family without spending hours in the kitchen.",
    },
    benefits: {
      fr: ["Deux fois plus d'idées", "Plats familiaux & desserts", "Pour varier les repas"],
      en: ["Twice as many ideas", "Family meals & desserts", "More variety every day"],
    },
    cta: { fr: "🧁 Récupérer mes recettes", en: "🧁 Get my recipes" },
  },
  {
    id: "pack-60", count: 60, price: "22,99 $", basePrice: 22.99, featured: true,
    cover: { fr: c60fr.url, en: c60en.url },
    link: {
      fr: "https://shop.beacons.ai/delices.maison/4cec94e4-278e-45c9-ae48-1b2f18d49d15",
      en: "https://shop.beacons.ai/delices.maison/02b4f25d-28fe-447f-b04a-e0950c441025",
    },
    name: { fr: "60 Recettes Exceptionnelles", en: "60 Exceptional Recipes" },
    description: {
      fr: "La collection complète pour cuisiner comme un chef : des recettes raffinées et gourmandes pour toutes les occasions.",
      en: "The complete collection to cook like a chef: refined, mouth-watering recipes for every occasion.",
    },
    benefits: {
      fr: ["La collection la plus complète", "Recettes raffinées & festives", "Des mois d'inspiration"],
      en: ["The most complete collection", "Refined & festive recipes", "Months of inspiration"],
    },
    cta: { fr: "👨‍🍳 Je passe en cuisine", en: "👨‍🍳 Let's get cooking" },
  },
];

// Recipe videos: autoplay, muted, looping marquee.
export const VIDEOS: string[] = [v1.url, v2.url, v3.url, v4.url, v5.url, v6.url, v7.url, v8.url, v9.url, v10.url];

// Customer reviews: shown three at a time.
export const TESTIMONIALS: { name: string; flag: string; avatar: string; rating: number; text: Record<Lang, string> }[] = [
  { name: "Sophie L.", flag: "🇫🇷", avatar: a1, rating: 5, text: { fr: "Un site incroyable ! Les recettes sont simples et délicieuses. Je recommande à 100 %.", en: "An amazing site! The recipes are simple and delicious. I recommend it 100%." } },
  { name: "Mamadou D.", flag: "🇸🇳", avatar: a2, rating: 5, text: { fr: "Enfin des recettes faciles à suivre. Toute la famille en redemande, merci Délices Maison !", en: "Finally, recipes that are easy to follow. The whole family wants more, thank you Délices Maison!" } },
  { name: "Emma R.", flag: "🇫🇷", avatar: a8, rating: 5, text: { fr: "Parfait pour toute la famille. Les recettes sont un vrai régal, mes enfants adorent !", en: "Perfect for the whole family. The recipes are a real treat, my kids love them!" } },
  { name: "Nadia B.", flag: "🇲🇦", avatar: a3, rating: 5, text: { fr: "Rapport qualité-prix imbattable. Je ne me demande plus jamais quoi cuisiner, un vrai bonheur.", en: "Unbeatable value. I never wonder what to cook anymore, pure joy." } },
  { name: "Thomas G.", flag: "🇨🇦", avatar: a4, rating: 5, text: { fr: "E-book reçu en deux minutes. Les photos donnent faim et j'ai tout réussi du premier coup.", en: "Got the e-book in two minutes. The photos make you hungry and I nailed everything first try." } },
  { name: "Aïcha K.", flag: "🇨🇮", avatar: a6, rating: 5, text: { fr: "Chaque recette fonctionne, les quantités sont justes. Le meilleur achat de l'année !", en: "Every recipe works and the quantities are spot on. Best purchase of the year!" } },
  { name: "Julien M.", flag: "🇧🇪", avatar: a5, rating: 5, text: { fr: "Je ne savais pas cuisiner, maintenant je prépare de vrais repas le soir. Ma femme est bluffée !", en: "I couldn't cook, now I make real dinners every night. My wife is amazed!" } },
  { name: "Samuel N.", flag: "🇨🇲", avatar: a7, rating: 5, text: { fr: "Des recettes généreuses qui rappellent la cuisine de famille. Je les ai offertes à ma sœur !", en: "Generous recipes that taste like family cooking. I gifted them to my sister!" } },
  { name: "Camille R.", flag: "🇫🇷", avatar: a9, rating: 5, text: { fr: "Magnifique mise en page. Les desserts du pack 60 ont fait sensation à l'anniversaire de ma mère.", en: "Beautiful layout. The desserts from the 60 pack were a hit at my mum's birthday." } },
];

export const T = {
  fr: {
    title: "Délices Maison — E-books de recettes gourmandes",
    metaDesc: "Des recettes délicieuses à portée de clic : e-books de recettes faciles, rapides et gourmandes, livrés instantanément.",
    tagline: "Recettes · Faciles · Gourmandes",
    slogan: "Des recettes délicieuses à portée de clic !",
    sub: "Rapides, gourmandes, faciles et accessibles : des e-books pensés pour régaler toute la maison.",
    discover: "Découvrir nos recettes",
    packsTitle: "Nos e-books de recettes",
    packsSub: "Choisissez votre pack et recevez-le instantanément par e-mail.",
    recipes: "recettes",
    popular: "Meilleur prix par recette",
    videosTitle: "En cuisine avec nous",
    videosEmpty: "Nos vidéos de recettes arrivent très bientôt !",
    testiTitle: "Ils nous font confiance !",
    testiNote: "",
    trust: ["Livraison instantanée par e-mail", "Paiement 100 % sécurisé", "Recettes simples & testées", "Support client à l'écoute"],
    footer: "Fait avec amour, pour les gourmands.",
    change: "English",
  },
  en: {
    title: "Délices Maison — Delicious recipe e-books",
    metaDesc: "Delicious recipes just a click away: easy, quick and mouth-watering recipe e-books, delivered instantly.",
    tagline: "Recipes · Easy · Delicious",
    slogan: "Delicious recipes just a click away!",
    sub: "Quick, tasty, easy and affordable: e-books designed to delight the whole household.",
    discover: "Discover our recipes",
    packsTitle: "Our recipe e-books",
    packsSub: "Pick your pack and get it instantly by email.",
    recipes: "recipes",
    popular: "Best price per recipe",
    videosTitle: "In the kitchen with us",
    videosEmpty: "Our recipe videos are coming very soon!",
    testiTitle: "Loved by our customers!",
    testiNote: "",
    trust: ["Instant delivery by email", "100% secure payment", "Simple, tested recipes", "Friendly customer support"],
    footer: "Made with love, for food lovers.",
    change: "Français",
  },
} as const;
