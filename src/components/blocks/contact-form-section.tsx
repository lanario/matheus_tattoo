"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";

// ─── Custom Dropdown ────────────────────────────────────────────────────────
export type SelectOption = { value: string; label: string | React.ReactNode };

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  className = "w-full",
  buttonClassName = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOption = options.find((opt) => (typeof opt === "string" ? opt : opt.value) === value);
  const displayed = selectedOption 
    ? (typeof selectedOption === "string" ? selectedOption : selectedOption.label) 
    : placeholder;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center justify-between bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-3 text-sm montserrat-regular focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200 backdrop-blur-sm ${buttonClassName || "w-full"}`}
      >
        <span className={value ? "text-white" : "text-zinc-600"}>{displayed}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-zinc-500 transition-transform duration-200 shrink-0 ml-2 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-max bg-zinc-950/95 border border-zinc-800/60 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="p-3 flex flex-wrap gap-2 max-h-64 overflow-y-auto custom-scrollbar">
            {options.map((opt) => {
              const optValue = typeof opt === "string" ? opt : opt.value;
              const optLabel = typeof opt === "string" ? opt : opt.label;
              return (
              <button
                key={optValue}
                type="button"
                onClick={() => { onChange(optValue); setOpen(false); }}
                className={`px-4 py-1.5 rounded-full text-xs montserrat-regular border transition-all duration-150 whitespace-nowrap flex items-center gap-2 ${
                  value === optValue
                    ? "bg-white text-black border-white"
                    : "bg-zinc-900/80 text-zinc-300 border-zinc-700/60 hover:border-zinc-400 hover:text-white"
                }`}
              >
                {optLabel}
              </button>
            )})}
          </div>
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const COUNTRY_CODES = [
  { code: "+55", flag: "🇧🇷", label: "BR" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+43", flag: "🇦🇹", label: "AT" },
  { code: "+41", flag: "🇨🇭", label: "CH" },
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+44", flag: "🇬🇧", label: "GB" },
  { code: "+351", flag: "🇵🇹", label: "PT" },
  { code: "+34", flag: "🇪🇸", label: "ES" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+39", flag: "🇮🇹", label: "IT" },
  { code: "+31", flag: "🇳🇱", label: "NL" },
  { code: "+46", flag: "🇸🇪", label: "SE" },
  { code: "+47", flag: "🇳🇴", label: "NO" },
  { code: "+45", flag: "🇩🇰", label: "DK" },
];

const TATTOO_REGIONS = {
  pt: [
    "Braço (inteiro)",
    "Antebraço",
    "Ombro",
    "Peito",
    "Costas",
    "Costela",
    "Abdômen",
    "Coxa",
    "Perna",
    "Pescoço",
    "Mão / Dedos",
    "Pé / Tornozelo",
    "Outro",
  ],
  en: [
    "Arm (full)",
    "Forearm",
    "Shoulder",
    "Chest",
    "Back",
    "Ribs",
    "Abdomen",
    "Thigh",
    "Leg",
    "Neck",
    "Hand / Fingers",
    "Foot / Ankle",
    "Other",
  ],
  de: [
    "Arm (gesamt)",
    "Unterarm",
    "Schulter",
    "Brust",
    "Rücken",
    "Rippen",
    "Bauch",
    "Oberschenkel",
    "Bein",
    "Hals",
    "Hand / Finger",
    "Fuß / Knöchel",
    "Sonstiges",
  ],
};

const t = {
  pt: {
    section_label: "PRÉ-ATENDIMENTO",
    title: "Vamos Começar sua Jornada",
    subtitle: "Preencha o formulário abaixo para que o Matheus possa entender melhor o que você precisa e oferecer o melhor atendimento possível.",
    full_name: "Nome Completo",
    full_name_placeholder: "Seu nome completo",
    dob: "Data de Nascimento",
    dob_note: "É necessário ser maior de 18 anos para realizar uma tatuagem.",
    pref_lang: "Idioma de Preferência",
    phone: "WhatsApp / Telefone",
    phone_placeholder: "Número com DDD",
    email: "E-mail",
    email_placeholder: "seu@email.com",
    tattoo_region: "Região da Tatuagem",
    tattoo_region_placeholder: "Selecione a região",
    tattoo_description: "Descrição da Tatuagem",
    tattoo_description_placeholder: "Descreva o estilo, tamanho, referências ou ideias que você tem em mente...",
    other_region_placeholder: "Qual parte do corpo?",
    submit: "Enviar Pré-Cadastro",
    success_title: "Recebido com sucesso!",
    success_body: "Matheus entrará em contato em breve pelo idioma selecionado.",
    lang_options: { pt: "Português", en: "English", de: "Deutsch" },
    required: "Campo obrigatório",
    invalid_email: "E-mail inválido",
    age_error: "Você precisa ter pelo menos 18 anos.",
    select_ddi: "DDI",
  },
  en: {
    section_label: "PRE-BOOKING",
    title: "Let's Start Your Journey",
    subtitle: "Fill in the form below so Matheus can better understand your needs and provide the best possible service.",
    full_name: "Full Name",
    full_name_placeholder: "Your full name",
    dob: "Date of Birth",
    dob_note: "You must be at least 18 years old to get a tattoo.",
    pref_lang: "Preferred Language",
    phone: "WhatsApp / Phone",
    phone_placeholder: "Number with area code",
    email: "E-mail",
    email_placeholder: "your@email.com",
    tattoo_region: "Tattoo Region",
    tattoo_region_placeholder: "Select a region",
    tattoo_description: "Tattoo Description",
    tattoo_description_placeholder: "Describe the style, size, references or ideas you have in mind...",
    other_region_placeholder: "Which body part?",
    submit: "Send Pre-Registration",
    success_title: "Successfully received!",
    success_body: "Matheus will contact you soon in your selected language.",
    lang_options: { pt: "Português", en: "English", de: "Deutsch" },
    required: "Required field",
    invalid_email: "Invalid email",
    age_error: "You must be at least 18 years old.",
    select_ddi: "DDI",
  },
  de: {
    section_label: "VORANMELDUNG",
    title: "Starten Sie Ihre Reise",
    subtitle: "Füllen Sie das Formular aus, damit Matheus Ihre Bedürfnisse besser verstehen und den bestmöglichen Service bieten kann.",
    full_name: "Vollständiger Name",
    full_name_placeholder: "Ihr vollständiger Name",
    dob: "Geburtsdatum",
    dob_note: "Sie müssen mindestens 18 Jahre alt sein, um ein Tattoo machen zu lassen.",
    pref_lang: "Bevorzugte Sprache",
    phone: "WhatsApp / Telefon",
    phone_placeholder: "Nummer mit Vorwahl",
    email: "E-Mail",
    email_placeholder: "ihre@email.de",
    tattoo_region: "Tattoo-Bereich",
    tattoo_region_placeholder: "Bereich auswählen",
    tattoo_description: "Tattoo-Beschreibung",
    tattoo_description_placeholder: "Beschreiben Sie den Stil, die Größe, Referenzen oder Ideen, die Sie im Sinn haben...",
    other_region_placeholder: "Welcher Körperteil?",
    submit: "Voranmeldung senden",
    success_title: "Erfolgreich empfangen!",
    success_body: "Matheus wird sich bald in Ihrer gewählten Sprache melden.",
    lang_options: { pt: "Português", en: "English", de: "Deutsch" },
    required: "Pflichtfeld",
    invalid_email: "Ungültige E-Mail",
    age_error: "Sie müssen mindestens 18 Jahre alt sein.",
    select_ddi: "DDI",
  },
};

type FormData = {
  fullName: string;
  dob: string;
  prefLang: "pt" | "en" | "de";
  countryCode: string;
  phone: string;
  email: string;
  tattooRegion: string;
  tattooRegionOther: string;
  tattooDescription: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function ContactFormSection() {
  const { language } = useLanguage();
  const tr = t[language];

  const [form, setForm] = useState<FormData>({
    fullName: "",
    dob: "",
    prefLang: language as "pt" | "en" | "de",
    countryCode: language === "de" ? "+49" : language === "en" ? "+1" : "+55",
    phone: "",
    email: "",
    tattooRegion: "",
    tattooRegionOther: "",
    tattooDescription: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = tr.required;
    if (!form.dob) {
      newErrors.dob = tr.required;
    } else {
      const birthDate = new Date(form.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge =
        monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ? age - 1
          : age;
      if (actualAge < 18) newErrors.dob = tr.age_error;
    }
    if (!form.phone.trim()) newErrors.phone = tr.required;
    if (!form.email.trim()) {
      newErrors.email = tr.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = tr.invalid_email;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build WhatsApp message with all info
    const isOther = ["Outro", "Other", "Sonstiges"].includes(form.tattooRegion);
    const regionDisplay = isOther && form.tattooRegionOther.trim()
      ? form.tattooRegionOther.trim()
      : form.tattooRegion;
    const regionLine = regionDisplay
      ? language === "pt"
        ? `\n📍 Região: ${regionDisplay}`
        : language === "en"
        ? `\n📍 Region: ${regionDisplay}`
        : `\n📍 Bereich: ${regionDisplay}`
      : "";

    const descLine = form.tattooDescription
      ? language === "pt"
        ? `\n✏️ Descrição: ${form.tattooDescription}`
        : language === "en"
        ? `\n✏️ Description: ${form.tattooDescription}`
        : `\n✏️ Beschreibung: ${form.tattooDescription}`
      : "";

    const message = encodeURIComponent(
      language === "pt"
        ? `Olá Matheus! Me chamo ${form.fullName}. Gostaria de fazer meu pré-cadastro para uma tatuagem. Prefiro ser atendido em ${tr.lang_options[form.prefLang]}. Meu e-mail é ${form.email}.${regionLine}${descLine}`
        : language === "en"
        ? `Hello Matheus! My name is ${form.fullName}. I would like to pre-register for a tattoo. I prefer to be contacted in ${tr.lang_options[form.prefLang]}. My email is ${form.email}.${regionLine}${descLine}`
        : `Hallo Matheus! Mein Name ist ${form.fullName}. Ich möchte mich für ein Tattoo voranmelden. Ich bevorzuge die Kommunikation auf ${tr.lang_options[form.prefLang]}. Meine E-Mail ist ${form.email}.${regionLine}${descLine}`
    );

    const whatsappUrl = `https://wa.me/5521965313328?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm montserrat-regular focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-200 backdrop-blur-sm";
  const labelClass = "block text-xs uppercase tracking-widest text-zinc-400 font-semibold montserrat-regular mb-2";
  const errorClass = "text-xs text-red-400 montserrat-regular mt-1";

  return (
    <section
      id="contato"
      className="relative z-10 py-20 px-6 md:px-12 max-w-7xl mx-auto w-full"
    >
      <div className="bg-zinc-950/60 border border-zinc-800/40 rounded-3xl p-8 md:p-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/3 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-neutral-900/50 rounded-full blur-[100px] pointer-events-none" />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-16 gap-6 relative z-10"
          >
            <div className="w-20 h-20 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white pirata-one-regular">{tr.success_title}</h3>
            <p className="text-zinc-400 montserrat-regular max-w-md">{tr.success_body}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs uppercase tracking-widest text-zinc-500 hover:text-white montserrat-regular transition-colors underline underline-offset-4"
            >
              {language === "pt" ? "Preencher novamente" : language === "en" ? "Fill again" : "Erneut ausfüllen"}
            </button>
          </motion.div>
        ) : (
          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs md:text-sm montserrat-regular block mb-3">
                {tr.section_label}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight pirata-one-regular mb-4">
                {tr.title}
              </h2>
              <p className="text-zinc-400 montserrat-regular text-base leading-relaxed max-w-2xl">
                {tr.subtitle}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className={labelClass}>{tr.full_name}</label>
                  <input
                    type="text"
                    placeholder={tr.full_name_placeholder}
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={`${inputClass} ${errors.fullName ? "border-red-500/60" : ""}`}
                  />
                  {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className={labelClass}>{tr.dob}</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className={`${inputClass} ${errors.dob ? "border-red-500/60" : ""} [color-scheme:dark]`}
                  />
                  <p className="text-xs text-zinc-600 montserrat-regular mt-1">{tr.dob_note}</p>
                  {errors.dob && <p className={errorClass}>{errors.dob}</p>}
                </div>

                {/* Preferred Language */}
                <div>
                  <label className={labelClass}>{tr.pref_lang}</label>
                  <CustomSelect
                    value={form.prefLang}
                    onChange={(v) => setForm({ ...form, prefLang: v as "pt" | "en" | "de" })}
                    options={[
                      { value: "pt", label: `🇧🇷 ${tr.lang_options.pt}` },
                      { value: "en", label: `🇺🇸 ${tr.lang_options.en}` },
                      { value: "de", label: `🇩🇪 ${tr.lang_options.de}` },
                    ]}
                  />
                </div>

                {/* Phone with country code */}
                <div>
                  <label className={labelClass}>{tr.phone}</label>
                  <div className="flex gap-2">
                    <CustomSelect
                      value={form.countryCode}
                      onChange={(v) => setForm({ ...form, countryCode: v })}
                      options={COUNTRY_CODES.map((c) => ({
                        value: c.code,
                        label: `${c.flag} ${c.code}`,
                      }))}
                      className="w-28 shrink-0"
                      buttonClassName="w-full px-3"
                    />
                    <input
                      type="tel"
                      placeholder={tr.phone_placeholder}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`${inputClass} flex-1 ${errors.phone ? "border-red-500/60" : ""}`}
                    />
                  </div>
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>{tr.email}</label>
                  <input
                    type="email"
                    placeholder={tr.email_placeholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputClass} ${errors.email ? "border-red-500/60" : ""}`}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                {/* Tattoo Region */}
                <div>
                  <label className={labelClass}>{tr.tattoo_region}</label>
                  <CustomSelect
                    value={form.tattooRegion}
                    onChange={(v) => {
                      setForm({ ...form, tattooRegion: v, tattooRegionOther: "" });
                    }}
                    options={TATTOO_REGIONS[language]}
                    placeholder={tr.tattoo_region_placeholder}
                  />
                  {["Outro", "Other", "Sonstiges"].includes(form.tattooRegion) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 overflow-hidden"
                    >
                      <input
                        type="text"
                        autoFocus
                        placeholder={tr.other_region_placeholder}
                        value={form.tattooRegionOther}
                        onChange={(e) => setForm({ ...form, tattooRegionOther: e.target.value })}
                        className={inputClass}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Tattoo Description */}
                <div className="md:col-span-2">
                  <label className={labelClass}>{tr.tattoo_description}</label>
                  <textarea
                    rows={4}
                    placeholder={tr.tattoo_description_placeholder}
                    value={form.tattooDescription}
                    onChange={(e) => setForm({ ...form, tattooDescription: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <div className="md:col-span-2 pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full md:w-auto group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white text-black font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] montserrat-regular text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 group-hover:opacity-100 transition-opacity">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {tr.submit}
                  </motion.button>
                </div>
              </motion.div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
