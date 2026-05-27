"use client";

import { HeroParallax } from "@/components/blocks/hero-parallax";
import NavHeader from "@/components/blocks/nav-header";
import { Starfield } from "@/components/ui/starfield-1";
import { AboutSection } from "@/components/blocks/about-section";
import FlickeringFooter from "@/components/ui/flickering-footer";
import ContactFAB from "@/components/ui/floating-action-menu";
import Image from "next/image";
import Link from "next/link";

import { LanguageSelector } from "@/components/ui/language-selector";
import { useLanguage, Language } from "@/context/language-context";

export default function Home() {
  const { language } = useLanguage();
  const products = getLocalizedProducts(language);

  return (
    <main className="bg-black min-h-screen relative overflow-hidden">
      <Starfield />
      
      {/* Fixed Header: Logo, Navbar, and Language Selector side-by-side */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 md:px-12 flex items-center justify-between gap-2 md:gap-4">
        <Link href="/" className="block animate-fade-in shrink-0">
          <div className="cursor-pointer transition-transform duration-300 ease-out hover:scale-115 active:scale-95">
            <Image
              src="/logo-v4.png"
              alt="Logo Matheus Tattoo Arts"
              width={160}
              height={160}
              className="w-20 h-20 md:w-40 md:h-40 object-contain"
              priority
            />
          </div>
        </Link>
        <div className="flex items-center gap-2 md:gap-6 ml-auto">
          <div className="hidden md:block">
            <NavHeader />
          </div>
          <LanguageSelector />
        </div>
      </div>
      <HeroParallax products={products} />
      <AboutSection />
      <FlickeringFooter glowColor="var(--primary)" />
      <ContactFAB />
    </main>
  );
}

const getLocalizedProducts = (lang: Language) => [
  // ── Row 1 (5 items) ──
  {
    title: lang === "pt" ? "Personagem Mística" : lang === "en" ? "Mystical Character" : "Mystischer Charakter",
    link: "#",
    thumbnail: "/tattoo-1-v2.png",
  },
  {
    title: lang === "pt" ? "Justiça Vendada" : lang === "en" ? "Blind Justice" : "Blinde Gerechtigkeit",
    link: "#",
    thumbnail: "/tattoo-2.png",
  },
  {
    title: "Samurai",
    link: "#",
    thumbnail: "/tattoo-3.jpeg",
  },
  {
    title: "Never Sleep Again",
    link: "#",
    thumbnail: "/tattoo-4.jpeg",
  },
  {
    title: lang === "pt" ? "Retrato Feminino" : lang === "en" ? "Female Portrait" : "Frauenporträt",
    link: "#",
    thumbnail: "/tattoo-5.jpeg",
  },
  // ── Row 2 (5 items) ──
  {
    title: lang === "pt" ? "Hannya e Gueixa" : lang === "en" ? "Hannya & Geisha" : "Hannya & Geisha",
    link: "#",
    thumbnail: "/tattoo-6.jpeg",
  },
  {
    title: lang === "pt" ? "Retrato do Ancião" : lang === "en" ? "Elder Portrait" : "Porträt eines Ältesten",
    link: "#",
    thumbnail: "/tattoo-7.jpeg",
  },
  {
    title: lang === "pt" ? "Arara" : lang === "en" ? "Macaw" : "Ara",
    link: "#",
    thumbnail: "/tattoo-8.jpeg",
  },
  {
    title: lang === "pt" ? "Lobo e Águia" : lang === "en" ? "Wolf & Eagle" : "Wolf & Adler",
    link: "#",
    thumbnail: "/tattoo-9.jpeg",
  },
  {
    title: lang === "pt" ? "Retrato Expressivo" : lang === "en" ? "Expressive Portrait" : "Ausdrucksstarkes Porträt",
    link: "#",
    thumbnail: "/tattoo-10.jpeg",
  },
  // ── Row 3 (5 items) ──
  {
    title: "Catwoman",
    link: "#",
    thumbnail: "/tattoo-11.jpeg",
  },
  {
    title: "Harry Potter",
    link: "#",
    thumbnail: "/tattoo-12.jpeg",
  },
  {
    title: lang === "pt" ? "Personagem Mística" : lang === "en" ? "Mystical Character" : "Mystischer Charakter",
    link: "#",
    thumbnail: "/tattoo-1-v2.png",
  },
  {
    title: lang === "pt" ? "Justiça Vendada" : lang === "en" ? "Blind Justice" : "Blinde Gerechtigkeit",
    link: "#",
    thumbnail: "/tattoo-2.png",
  },
  {
    title: "Samurai",
    link: "#",
    thumbnail: "/tattoo-3.jpeg",
  },
];
