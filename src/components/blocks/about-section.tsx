"use client";

import Image from "next/image";
import { useState } from "react";

export function AboutSection() {
  const [isColored, setIsColored] = useState(false);

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
                O ARTISTA
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight pirata-one-regular">
                Matheus Tattoo Arts
              </h2>
            </div>
            
            <div className="space-y-6 text-zinc-300 font-light leading-relaxed text-base md:text-lg montserrat-regular">
              <p>
                Matheus Tattoo Arts, um refúgio para amantes da arte em preto e cinza no Rio de Janeiro. 
                Aqui, acreditamos que sua pele é a tela mais importante. Sob a visão de{" "}
                <span className="text-white font-medium italic satisfy-regular text-lg md:text-xl whitespace-nowrap">
                  'Esculpindo Realidade em Pele'
                </span>
                , Matheus e sua equipe transformam histórias e ideias em tatuagens fotorrealistas de alta complexidade.
              </p>
              <p>
                Nosso trabalho é um tributo ao detalhe e à emoção, visível em nossos retratos, leões, 
                esculturas clássicas, samurai e temas mitológicos. Oferecemos mais do que uma tatuagem; 
                oferecemos uma jornada colaborativa, onde sua visão é respeitada e nossa expertise é 
                aplicada para criar uma peça exclusiva, segura e de alta qualidade. Agende sua consulta 
                e comece a sua transformação.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/5521965313328"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black font-semibold tracking-wide transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 montserrat-regular text-sm md:text-base"
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
