"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/language-context";

export function AboutSection() {
  const [isColored, setIsColored] = useState(false);
  const { language } = useLanguage();

  return (
    <section id="sobre" className="-mt-16 mb-16 pt-6 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
      <div className="bg-zinc-950/60 border border-zinc-800/40 rounded-3xl p-8 md:p-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Decorative backdrop light glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-900/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image of the professional */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => setIsColored(!isColored)}
              className="relative group w-full max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/50 bg-black cursor-pointer"
            >
              <Image
                src="/matheus.png"
                alt="Matheus - Tatuador Profissional"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={`object-cover object-center transition-all duration-700 ease-out ${
                  isColored
                    ? "scale-105 grayscale-0"
                    : "group-hover:scale-105 grayscale group-hover:grayscale-0"
                }`}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Biography/Trajectory text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            <div className="space-y-2">
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs md:text-sm montserrat-regular block">
                {language === "pt" ? "O ARTISTA" : language === "en" ? "THE ARTIST" : "DER KÜNSTLER"}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight pirata-one-regular">
                Matheus Tattoo Arts
              </h2>
            </div>
            
            <div className="space-y-6 text-zinc-300 font-light leading-relaxed text-base md:text-lg montserrat-regular">
              <p>
                {language === "pt"
                  ? "Olá, eu sou Matheus tatuador profissional há 8 anos, especializado em realismo preto e cinza. Ao longo da minha carreira, desenvolvi um trabalho focado em transformar ideias e referências em tatuagens com alto nível de detalhe, profundidade e expressão, sempre buscando entregar uma arte única e personalizada para cada cliente."
                  : language === "en"
                  ? "Hello, I'm Matheus, a professional tattoo artist for 8 years, specializing in black and grey realism. Throughout my career, I've developed work focused on transforming ideas and references into tattoos with a high level of detail, depth, and expression, always seeking to deliver unique and personalized art for each client."
                  : "Hallo, ich bin Matheus, seit 8 Jahren professioneller Tätowierer, spezialisiert auf Black & Grey Realismus. Im Laufe meiner Karriere habe ich mich darauf konzentriert, Ideen und Referenzen in Tattoos mit hohem Detailgrad, Tiefe und Ausdruck zu verwandeln, wobei ich stets bestrebt bin, jedem Kunden eine einzigartige und personalisierte Kunst zu liefern."}
              </p>
              <p>
                {language === "pt"
                  ? "Minha especialidade é o realismo em preto e cinza, com atenção aos contrastes, texturas e riqueza de detalhes que tornam cada projeto exclusivo e atemporal. Para mim, tatuagem vai além da estética — cada trabalho carrega significado e precisa representar com autenticidade a história de quem a escolhe."
                  : language === "en"
                  ? "My specialty is black and grey realism, with attention to contrasts, textures, and richness of detail that make each project exclusive and timeless. For me, a tattoo goes beyond aesthetics — each work carries meaning and needs to authentically represent the story of whoever chooses it."
                  : "Meine Spezialität ist der Black & Grey Realismus, mit besonderem Augenmerk auf Kontraste, Texturen und Detailreichtum, die jedes Projekt exklusiv und zeitlos machen. Für mich geht ein Tattoo über die Ästhetik hinaus – jedes Werk hat eine Bedeutung und muss authentisch die Geschichte desjenigen repräsentieren, der es wählt."}
              </p>
              <p>
                {language === "pt"
                  ? "Durante minha trajetória como tatuador, tive a oportunidade de levar minha arte além das fronteiras, tatuando em três países, incluindo o Brasil. Essas experiências internacionais ampliaram minha visão artística, fortaleceram minha conexão com diferentes culturas e contribuíram para aperfeiçoar ainda mais minha técnica e meu estilo."
                  : language === "en"
                  ? "During my trajectory as a tattoo artist, I've had the opportunity to take my art beyond borders, tattooing in three countries, including Brazil. These international experiences broadened my artistic vision, strengthened my connection with different cultures, and contributed to further perfecting my technique and style."
                  : "Während meiner Laufbahn als Tätowierer hatte ich die Möglichkeit, meine Kunst über die Grenzen hinaus zu bringen und in drei Ländern zu tätowieren, darunter Brasilien. Diese internationalen Erfahrungen erweiterten meine künstlerische Vision, stärkten meine Verbindung zu verschiedenen Kulturen und trugen dazu bei, meine Technik und meinen Stil weiter zu perfektionieren."}
              </p>
              <p>
                {language === "pt"
                  ? "Hoje sigo dedicado a criar tatuagens realistas marcantes, com técnica, personalidade e compromisso em oferecer uma experiência única em cada projeto."
                  : language === "en"
                  ? "Today I remain dedicated to creating striking realistic tattoos, with technique, personality, and a commitment to offering a unique experience in every project."
                  : "Heute widme ich mich weiterhin der Schaffung beeindruckender realistischer Tattoos, mit Technik, Persönlichkeit und dem Engagement, bei jedem Projekt ein einzigartiges Erlebnis zu bieten."}
              </p>
            </div>

            {/* Removed Agendar Consulta button */}
          </div>
        </div>
      </div>
    </section>
  );
}
