"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "de", label: "DE", flag: "🇩🇪" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/90 hover:bg-white/10 hover:text-white transition-all montserrat-regular text-xs md:text-sm shadow-xl",
          isOpen && "bg-white/10 border-white/20"
        )}
      >
        <span className="text-sm md:text-base">{activeLang.flag}</span>
        <span className="font-medium tracking-wide">{activeLang.label}</span>
        <ChevronDown
          className={cn("w-3 h-3 md:w-4 md:h-4 opacity-70 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 md:left-0 mt-2 w-auto min-w-[90px] rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden shadow-2xl animate-fade-in origin-top-right md:origin-top-left flex flex-col p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm montserrat-regular transition-all text-left",
                language === lang.code
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="tracking-wide">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
