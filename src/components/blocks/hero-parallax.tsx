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
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [isMobile ? 5 : 15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [isMobile ? 5 : 20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [isMobile ? -150 : -700, isMobile ? 50 : 200]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[200vh] py-20 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-transparent text-white"
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
            <ProductCard product={product} translate={translateX} key={product.title} priority={idx < 3} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 md:mb-20 space-x-8 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const SLOGANS = [
  "Esculpindo Realidade em Pele",
  "Dando Vida às Suas Histórias na Pele",
  "Capturando a Essência em Tinta",
];

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-16 md:py-28 px-4 w-full left-0 top-0 text-center">
      <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-tight flex flex-col items-center justify-center -translate-x-8 md:-translate-x-28">
        <TextDisperse
          className="pirata-one-regular block mb-4 cursor-default select-none justify-center gap-[0.05em] md:gap-[0.08em] text-5xl md:text-8xl w-full"
        >
          Matheus Tattoo Arts
        </TextDisperse>
        <MorphingText
          texts={SLOGANS}
          className="text-neutral-400 text-xl md:text-3xl lg:text-4xl satisfy-regular font-normal normal-case h-8 md:h-12 lg:h-16"
        />
      </h1>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  priority = false,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  priority?: boolean;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-60 w-[18rem] md:h-96 md:w-[30rem] relative flex-shrink-0 rounded-2xl overflow-hidden border border-neutral-800"
    >
      <Link href={product.link} className="block group-hover/product:shadow-2xl h-full w-full">
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center absolute h-full w-full inset-0"
          alt={product.title}
          priority={priority}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black/60 pointer-events-none transition-opacity duration-300"></div>
      <h2 className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 text-white font-bold text-lg md:text-xl transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};
