import { HeroParallax } from "@/components/blocks/hero-parallax";
import NavHeader from "@/components/blocks/nav-header";
import { Starfield } from "@/components/ui/starfield-1";
import { AboutSection } from "@/components/blocks/about-section";
import FlickeringFooter from "@/components/ui/flickering-footer";
import ContactFAB from "@/components/ui/floating-action-menu";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black min-h-screen relative overflow-hidden">
      <Starfield />
      
      {/* Fixed Header: Logo and Navbar side-by-side */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 md:px-12 flex items-center justify-between gap-4">
        <Link href="/" className="block animate-fade-in">
          <div className="cursor-pointer transition-transform duration-300 ease-out hover:scale-115 active:scale-95">
            <Image
              src="/logo.png"
              alt="Logo Matheus Tattoo Arts"
              width={160}
              height={160}
              className="w-28 h-28 md:w-40 md:h-40 object-contain"
              priority
            />
          </div>
        </Link>
        <NavHeader />
      </div>
      <HeroParallax products={products} />
      <AboutSection />
      <FlickeringFooter glowColor="var(--primary)" />
      <ContactFAB />
    </main>
  );
}

const products = [
  {
    title: "Sombreado Realista",
    link: "#",
    thumbnail: "/tattoo-1.png",
  },
  {
    title: "Leão em Preto e Cinza",
    link: "#",
    thumbnail: "/tattoo-2.png",
  },
  {
    title: "Fechamento de Braço",
    link: "#",
    thumbnail: "/tattoo-3.png",
  },
  {
    title: "Retrato Realista",
    link: "#",
    thumbnail: "/tattoo-4.png",
  },
  {
    title: "Tigre Realista",
    link: "#",
    thumbnail: "/tattoo-5.png",
  },
  // Repetição para preencher os 15 espaços necessários pelo componente no layout original
  {
    title: "Sombreado Realista II",
    link: "#",
    thumbnail: "/tattoo-1.png",
  },
  {
    title: "Leão em Preto e Cinza II",
    link: "#",
    thumbnail: "/tattoo-2.png",
  },
  {
    title: "Fechamento de Braço II",
    link: "#",
    thumbnail: "/tattoo-3.png",
  },
  {
    title: "Retrato Realista II",
    link: "#",
    thumbnail: "/tattoo-4.png",
  },
  {
    title: "Tigre Realista II",
    link: "#",
    thumbnail: "/tattoo-5.png",
  },
  {
    title: "Sombreado Realista III",
    link: "#",
    thumbnail: "/tattoo-1.png",
  },
  {
    title: "Leão em Preto e Cinza III",
    link: "#",
    thumbnail: "/tattoo-2.png",
  },
  {
    title: "Fechamento de Braço III",
    link: "#",
    thumbnail: "/tattoo-3.png",
  },
  {
    title: "Retrato Realista III",
    link: "#",
    thumbnail: "/tattoo-4.png",
  },
  {
    title: "Tigre Realista III",
    link: "#",
    thumbnail: "/tattoo-5.png",
  },
];
