"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavHeader from "@/components/blocks/nav-header";
import { Starfield } from "@/components/ui/starfield-1";
import ContactFAB from "@/components/ui/floating-action-menu";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useLanguage, Language } from "@/context/language-context";

// ── Data ──
type Tattoo = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
};

const getLocalizedTattoos = (lang: Language): Tattoo[] => [
  {
    id: 1,
    title: lang === "pt" ? "Personagem Mística - Perna" : lang === "en" ? "Mystical Character - Leg" : "Mystischer Charakter - Bein",
    thumbnail: "/tattoo-1-v2.png",
    description:
      lang === "pt" ? "Personagem feminina envolta em chamas sombrias com terceiro olho e armadura estilizada em blackwork na panturrilha." : lang === "en" ? "Female character wreathed in dark flames with a third eye and stylized blackwork armor on the calf." : "Weiblicher Charakter in dunklen Flammen mit drittem Auge und stilisierter Blackwork-Rüstung auf der Wade.",
  },
  {
    id: 2,
    title: lang === "pt" ? "Justiça Vendada - Antebraço" : lang === "en" ? "Blind Justice - Forearm" : "Blinde Gerechtigkeit - Unterarm",
    thumbnail: "/tattoo-2.png",
    description:
      lang === "pt" ? "Retrato feminino vendado segurando uma espada com crucifixo, em realismo preto e cinza com contraste dramático." : lang === "en" ? "Blindfolded female portrait holding a sword with a crucifix, in black and grey realism with dramatic contrast." : "Porträt einer Frau mit verbundenen Augen, die ein Schwert mit Kruzifix hält, in Black & Grey Realismus mit dramatischem Kontrast.",
  },
  {
    id: 3,
    title: lang === "pt" ? "Samurai - Antebraço" : lang === "en" ? "Samurai - Forearm" : "Samurai - Unterarm",
    thumbnail: "/tattoo-3.jpeg",
    description:
      lang === "pt" ? "Guerreiro samurai com elmo ornamentado e lágrimas, composição com cenário de batalha em preto e cinza hiper-realista." : lang === "en" ? "Samurai warrior with an ornate helmet and tears, composition with battle scene in hyper-realistic black and grey." : "Samurai-Krieger mit verziertem Helm und Tränen, Komposition mit Kampfszene in hyperrealistischem Black & Grey.",
  },
  {
    id: 4,
    title: lang === "pt" ? "Never Sleep Again - Antebraço" : lang === "en" ? "Never Sleep Again - Forearm" : "Never Sleep Again - Unterarm",
    thumbnail: "/tattoo-4.jpeg",
    description:
      lang === "pt" ? "Composição fragmentada com rosto dividido, Estátua da Liberdade e lettering 'Never Sleep Again' e 'So Sad' em realismo preto e cinza." : lang === "en" ? "Fragmented composition with divided face, Statue of Liberty and lettering 'Never Sleep Again' and 'So Sad' in black and grey realism." : "Fragmentierte Komposition mit geteiltem Gesicht, Freiheitsstatue und Schriftzug 'Never Sleep Again' und 'So Sad' in Black & Grey Realismus.",
  },
  {
    id: 5,
    title: lang === "pt" ? "Retrato Feminino - Peito" : lang === "en" ? "Female Portrait - Chest" : "Frauenporträt - Brust",
    thumbnail: "/tattoo-5.jpeg",
    description:
      lang === "pt" ? "Retrato hiper-realista de mulher sorridente com turbante e brincos étnicos no peito, sombreamento suave e delicado." : lang === "en" ? "Hyper-realistic portrait of a smiling woman with a turban and ethnic earrings on the chest, soft and delicate shading." : "Hyperrealistisches Porträt einer lächelnden Frau mit Turban und ethnischen Ohrringen auf der Brust, weiche und zarte Schattierung.",
  },
  {
    id: 6,
    title: lang === "pt" ? "Hannya e Gueixa - Braço" : lang === "en" ? "Hannya & Geisha - Arm" : "Hannya & Geisha - Arm",
    thumbnail: "/tattoo-6.jpeg",
    description:
      lang === "pt" ? "Fusão entre rosto feminino e máscara Hannya japonesa com efeito de rachadura, em preto e cinza com profundidade escultural." : lang === "en" ? "Fusion between a female face and a Japanese Hannya mask with a cracking effect, in black and grey with sculptural depth." : "Verschmelzung eines weiblichen Gesichts mit einer japanischen Hannya-Maske mit Risseffekt, in Black & Grey mit skulpturaler Tiefe.",
  },
  {
    id: 7,
    title: lang === "pt" ? "Retrato do Ancião - Perna" : lang === "en" ? "Elder Portrait - Leg" : "Porträt eines Ältesten - Bein",
    thumbnail: "/tattoo-7.jpeg",
    description:
      lang === "pt" ? "Retrato realista de senhor idoso com expressão contemplativa, textura de pele detalhada e iluminação atmosférica na panturrilha." : lang === "en" ? "Realistic portrait of an elderly man with a contemplative expression, detailed skin texture and atmospheric lighting on the calf." : "Realistisches Porträt eines älteren Herrn mit nachdenklichem Ausdruck, detaillierter Hautstruktur und stimmungsvoller Beleuchtung auf der Wade.",
  },
  {
    id: 8,
    title: lang === "pt" ? "Arara - Antebraço" : lang === "en" ? "Macaw - Forearm" : "Ara - Unterarm",
    thumbnail: "/tattoo-8.jpeg",
    description:
      lang === "pt" ? "Arara em preto e cinza com plumagem extremamente detalhada empoleirada em galho, cobrindo todo o antebraço." : lang === "en" ? "Macaw in black and grey with extremely detailed plumage perched on a branch, covering the entire forearm." : "Ara in Black & Grey mit extrem detailliertem Gefieder, der auf einem Ast sitzt und den gesamten Unterarm bedeckt.",
  },
  {
    id: 9,
    title: lang === "pt" ? "Lobo e Águia - Braço" : lang === "en" ? "Wolf & Eagle - Arm" : "Wolf & Adler - Arm",
    thumbnail: "/tattoo-9.jpeg",
    description:
      lang === "pt" ? "Composição épica de lobo feroz com olhos azuis e águia em voo, realismo preto e cinza com toques de cor no braço completo." : lang === "en" ? "Epic composition of a fierce wolf with blue eyes and a flying eagle, black and grey realism with touches of color on the full arm." : "Epische Komposition eines wilden Wolfes mit blauen Augen und einem fliegenden Adler, Black & Grey Realismus mit Farbakzenten auf dem gesamten Arm.",
  },
  {
    id: 10,
    title: lang === "pt" ? "Retrato Expressivo - Braço" : lang === "en" ? "Expressive Portrait - Arm" : "Ausdrucksstarkes Porträt - Arm",
    thumbnail: "/tattoo-10.jpeg",
    description:
      lang === "pt" ? "Retrato feminino com expressão intensa, piercing e correntes, em preto e cinza com detalhes hiper-realistas no braço." : lang === "en" ? "Female portrait with intense expression, piercing and chains, in black and grey with hyper-realistic details on the arm." : "Frauenporträt mit intensivem Ausdruck, Piercing und Ketten, in Black & Grey mit hyperrealistischen Details am Arm.",
  },
  {
    id: 11,
    title: lang === "pt" ? "Catwoman - Antebraço" : lang === "en" ? "Catwoman - Forearm" : "Catwoman - Unterarm",
    thumbnail: "/tattoo-11.jpeg",
    description:
      lang === "pt" ? "Mulher-Gato com máscara costurada e garras de couro, realismo cinematográfico em preto e cinza no antebraço." : lang === "en" ? "Catwoman with stitched mask and leather claws, cinematic realism in black and grey on the forearm." : "Catwoman mit genähter Maske und Lederkrallen, filmischer Realismus in Black & Grey auf dem Unterarm.",
  },
  {
    id: 12,
    title: lang === "pt" ? "Harry Potter - Perna" : lang === "en" ? "Harry Potter - Leg" : "Harry Potter - Bein",
    thumbnail: "/tattoo-12.jpeg",
    description:
      lang === "pt" ? "Retrato hiper-realista de Harry Potter com óculos e uniforme de Hogwarts, sombreamento cinematográfico na panturrilha." : lang === "en" ? "Hyper-realistic portrait of Harry Potter with glasses and Hogwarts uniform, cinematic shading on the calf." : "Hyperrealistisches Porträt von Harry Potter mit Brille und Hogwarts-Uniform, filmische Schattierung auf der Wade.",
  },
];

export default function PortfolioPage() {
  const { language } = useLanguage();
  const tattoos = getLocalizedTattoos(language);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tappedId, setTappedId] = useState<number | null>(null);

  const handleTap = (id: number) => {
    setTappedId((prev) => (prev === id ? null : id));
  };

  const isActive = (id: number) => hoveredId === id || tappedId === id;

  return (
    <main className="bg-black min-h-screen relative">
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

      {/* Page Content */}
      <div className="relative z-10 pt-28 md:pt-36 pb-20 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight pirata-one-regular mb-4"
          >
            {language === "pt" ? "Portfólio" : language === "en" ? "Portfolio" : "Portfolio"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-400 text-base md:text-lg montserrat-regular max-w-2xl mx-auto"
          >
            {language === "pt" ? "Cada tatuagem é uma história única, esculpida com precisão e paixão. Explore nossos trabalhos em realismo preto e cinza." : language === "en" ? "Each tattoo is a unique story, sculpted with precision and passion. Explore our black and grey realism works." : "Jedes Tattoo ist eine einzigartige Geschichte, mit Präzision und Leidenschaft geformt. Entdecken Sie unsere Black & Grey Realismus-Werke."}
          </motion.p>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <p className="text-zinc-500 text-sm font-medium tracking-wider montserrat-regular uppercase">
            {language === "pt" ? `Exibindo ${tattoos.length} trabalhos` : language === "en" ? `Showing ${tattoos.length} works` : `Zeige ${tattoos.length} Werke`}
          </p>
        </div>

        {/* ── Tattoo Grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tattoos.map((tattoo, index) => (
            <motion.div
              key={tattoo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onMouseEnter={() => setHoveredId(tattoo.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleTap(tattoo.id)}
              className="group relative rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-950/50 backdrop-blur-sm hover:border-zinc-700/60 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src={tattoo.thumbnail}
                  alt={tattoo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-400 ${
                    isActive(tattoo.id)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Hover info overlay */}
                <AnimatePresence>
                  {isActive(tattoo.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.25 }}
                      className="absolute bottom-0 left-0 right-0 p-5 z-10"
                    >
                      <h3 className="text-white font-bold text-lg mb-1.5 pirata-one-regular leading-tight">
                        {tattoo.title}
                      </h3>
                      <p className="text-zinc-300 text-xs montserrat-regular line-clamp-3 leading-relaxed">
                        {tattoo.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


            </motion.div>
          ))}
        </motion.div>
      </div>

      <ContactFAB />
    </main>
  );
}
