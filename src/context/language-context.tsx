"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "pt" | "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getWhatsAppLink: (lang?: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("app-language") as Language;
    if (savedLanguage && ["pt", "en", "de"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "pt" || browserLang === "en" || browserLang === "de") {
        setLanguageState(browserLang as Language);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const getWhatsAppLink = (lang: Language = language) => {
    const number = "5521965313328";
    let text = "";
    if (lang === "pt") {
      text = "Olá Matheus! Gostaria de fazer um orçamento de tatuagem. (Origem: Brasil / Idioma: Português)";
    } else if (lang === "en") {
      text = "Hello Matheus! I'd like to get a tattoo quote. (Origin: Europe/International / Language: English)";
    } else if (lang === "de") {
      text = "Hallo Matheus! Ich möchte ein Tattoo-Angebot anfordern. (Herkunft: Europa / Sprache: Deutsch)";
    }
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getWhatsAppLink }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
