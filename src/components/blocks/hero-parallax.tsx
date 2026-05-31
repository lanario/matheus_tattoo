"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TextDisperse } from "@/components/ui/text-disperse";
import { MorphingText } from "@/components/ui/liquid-text";




export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return <HeroParallaxContent key={isMobile ? "mobile" : "desktop"} products={products} isMobile={isMobile} />;
};

const HeroParallaxContent = ({
  products,
  isMobile,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  isMobile: boolean;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, isMobile ? 250 : 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, isMobile ? -250 : -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.4], [isMobile ? 5 : 15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.4], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.4], [isMobile ? 5 : 20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.4], [isMobile ? -150 : -700, isMobile ? 50 : 200]), springConfig);

  const [activeCardTitle, setActiveCardTitle] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isMobile) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".product-card-container")) {
        setActiveCardTitle(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMobile]);

  return (
    <div
      ref={ref}
      className="h-[130vh] md:h-[175vh] py-10 md:py-24 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-transparent text-white"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20 mb-8 md:mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              priority={idx < 3}
              isMobile={isMobile}
              isActive={activeCardTitle === product.title}
              onClick={() => setActiveCardTitle(activeCardTitle === product.title ? null : product.title)}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 md:mb-20 space-x-8 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              isMobile={isMobile}
              isActive={activeCardTitle === product.title}
              onClick={() => setActiveCardTitle(activeCardTitle === product.title ? null : product.title)}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isMobile={isMobile}
              isActive={activeCardTitle === product.title}
              onClick={() => setActiveCardTitle(activeCardTitle === product.title ? null : product.title)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

import { useLanguage, Language } from "@/context/language-context";

const getLocalizedSlogans = (lang: Language) => {
  if (lang === "en") {
    return [
      "Sculpting Reality on Skin",
      "Bringing Your Stories to Life on Skin",
      "Capturing Essence in Ink",
    ];
  }
  if (lang === "de") {
    return [
      "Realität auf der Haut formen",
      "Ihre Geschichten auf der Haut zum Leben erwecken",
      "Die Essenz in Tinte einfangen",
    ];
  }
  return [
    "Esculpindo Realidade em Pele",
    "Dando Vida às Suas Histórias na Pele",
    "Capturando a Essência em Tinta",
  ];
};

export const Header = () => {
  const { language } = useLanguage();
  const slogans = getLocalizedSlogans(language);

  return (
    <div className="max-w-7xl relative mx-auto pt-44 pb-12 md:py-28 px-4 w-full left-0 top-0 text-center">
      <h1 className="text-5xl sm:text-6xl md:text-9xl font-bold text-white tracking-tight leading-tight flex flex-col items-center justify-center translate-x-0 md:-translate-x-28">
        <TextDisperse
          className="pirata-one-regular block mb-4 cursor-default select-none justify-center gap-[0.05em] md:gap-[0.08em] text-5xl sm:text-6xl md:text-9xl w-full"
        >
          Matheus Tattoo Arts
        </TextDisperse>
        <MorphingText
          texts={slogans}
          cooldownTime={5}
          morphTime={1}
          className="text-neutral-400 text-2xl sm:text-3xl md:text-5xl pirata-one-regular font-normal normal-case h-10 sm:h-14 md:h-20"
        />
      </h1>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  priority = false,
  isMobile,
  isActive,
  onClick,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  priority?: boolean;
  isMobile: boolean;
  isActive: boolean;
  onClick: () => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      if (!isActive) {
        e.preventDefault();
        onClick();
      } else {
        if (product.link === "#") {
          e.preventDefault();
          onClick();
        }
      }
    }
  };

  return (
    <motion.div
      style={{
        x: translate,
      }}
      animate={isMobile ? { y: isActive ? -20 : 0 } : { y: 0 }}
      whileHover={!isMobile ? { y: -20 } : undefined}
      transition={{ duration: 0.3 }}
      key={product.title}
      className="product-card-container group/product h-60 w-[18rem] md:h-96 md:w-[30rem] relative flex-shrink-0 rounded-2xl overflow-hidden border border-neutral-800"
    >
      <Link href={product.link} onClick={handleClick} className="block group-hover/product:shadow-2xl h-full w-full">
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center absolute h-full w-full inset-0"
          alt={product.title}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </Link>
      <div
        className={`absolute inset-0 h-full w-full bg-black/60 pointer-events-none transition-opacity duration-300 ${
          isActive ? "opacity-80" : "opacity-0 group-hover/product:opacity-80"
        }`}
      ></div>
      <h2
        className={`pirata-one-regular absolute bottom-6 left-6 text-white font-normal text-xl md:text-2xl transition-opacity duration-300 pointer-events-none ${
          isActive ? "opacity-100" : "opacity-0 group-hover/product:opacity-100"
        }`}
      >
        {product.title}
      </h2>
    </motion.div>
  );
};
