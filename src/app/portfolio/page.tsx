"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavHeader from "@/components/blocks/nav-header";
import { Starfield } from "@/components/ui/starfield-1";
import ContactFAB from "@/components/ui/floating-action-menu";

// ── Data ──
type Project = {
  id: number;
  title: string;
  category: string;
  client: string;
  thumbnail: string;
  description: string;
  year: number;
  featured: boolean;
  tags: string[];
};

const categories = [
  "Todos",
  "Realismo",
  "Retratos",
  "Esculturas",
  "Mitologia",
  "Samurai",
  "Animais",
];

const projects: Project[] = [
  {
    id: 1,
    title: "Leão Realista - Braço Completo",
    category: "Animais",
    client: "João Pedro",
    thumbnail: "/tattoo-1.png",
    description:
      "Leão em preto e cinza com sombreamento profundo e detalhes hiper-realistas no braço completo.",
    year: 2025,
    featured: true,
    tags: ["realismo", "animais"],
  },
  {
    id: 2,
    title: "Retrato Feminino - Antebraço",
    category: "Retratos",
    client: "Lucas Silva",
    thumbnail: "/tattoo-2.png",
    description:
      "Retrato fotorrealista em preto e cinza com texturas suaves e contraste dramático.",
    year: 2025,
    featured: true,
    tags: ["retratos", "realismo"],
  },
  {
    id: 3,
    title: "Fechamento de Braço - Mitologia",
    category: "Mitologia",
    client: "Rafael Santos",
    thumbnail: "/tattoo-3.png",
    description:
      "Composição mitológica completa com referências gregas, texturas de pedra e sombreamento volumétrico.",
    year: 2024,
    featured: false,
    tags: ["mitologia", "fechamento"],
  },
  {
    id: 4,
    title: "Escultura Clássica - Costas",
    category: "Esculturas",
    client: "Felipe Oliveira",
    thumbnail: "/tattoo-4.png",
    description:
      "Escultura renascentista detalhada nas costas com efeitos de profundidade e textura em mármore.",
    year: 2024,
    featured: true,
    tags: ["esculturas", "realismo"],
  },
  {
    id: 5,
    title: "Tigre Realista - Peito",
    category: "Animais",
    client: "André Costa",
    thumbnail: "/tattoo-5.png",
    description:
      "Tigre hiper-realista no peito com pelagem detalhada e olhar penetrante em preto e cinza.",
    year: 2025,
    featured: false,
    tags: ["animais", "realismo"],
  },
  {
    id: 6,
    title: "Samurai - Braço",
    category: "Samurai",
    client: "Thiago Lima",
    thumbnail: "/tattoo-1.png",
    description:
      "Guerreiro samurai com armadura detalhada e fundo em estilo japonês adaptado para preto e cinza.",
    year: 2024,
    featured: true,
    tags: ["samurai", "oriental"],
  },
  {
    id: 7,
    title: "Retrato com Leão - Costas",
    category: "Retratos",
    client: "Diego Almeida",
    thumbnail: "/tattoo-2.png",
    description:
      "Composição de retrato feminino com leão ao fundo, simbolizando força e beleza em preto e cinza.",
    year: 2025,
    featured: false,
    tags: ["retratos", "animais"],
  },
  {
    id: 8,
    title: "Zeus - Perna Completa",
    category: "Mitologia",
    client: "Bruno Reis",
    thumbnail: "/tattoo-3.png",
    description:
      "Zeus com raios e nuvens em composição épica na perna completa, estilo realismo escultural.",
    year: 2024,
    featured: false,
    tags: ["mitologia", "esculturas"],
  },
  {
    id: 9,
    title: "Leão e Rosa - Antebraço",
    category: "Animais",
    client: "Marcos Vinícius",
    thumbnail: "/tattoo-4.png",
    description:
      "Composição de leão com rosa em preto e cinza, equilíbrio entre força e delicadeza.",
    year: 2025,
    featured: true,
    tags: ["animais", "floral"],
  },
];

// ── Grid View Icons ──
const GridIcon = ({ active }: { active: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#fff" : "#71717a"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const LargeGridIcon = ({ active }: { active: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#fff" : "#71717a"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="8" />
    <rect x="3" y="14" width="18" height="8" />
  </svg>
);

// ── Search Icon ──
const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#71717a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// ── Sort Options ──
type SortOption = "recent" | "oldest" | "name";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [gridSize, setGridSize] = useState<"normal" | "large">("normal");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    let result = projects;

    // Filter by category
    if (activeCategory !== "Todos") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "recent") {
      result = [...result].sort((a, b) => b.year - a.year);
    } else if (sortBy === "oldest") {
      result = [...result].sort((a, b) => a.year - b.year);
    } else {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const categoryCount = (cat: string) => {
    if (cat === "Todos") return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  return (
    <main className="bg-black min-h-screen relative">
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
            Portfólio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-400 text-base md:text-lg montserrat-regular max-w-2xl mx-auto"
          >
            Cada tatuagem é uma história única, esculpida com precisão e paixão.
            Explore nossos trabalhos em realismo preto e cinza.
          </motion.p>
        </div>

        {/* ── Toolbar ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search + View Toggle Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Buscar por projeto, cliente ou categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-sm bg-zinc-900/70 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all montserrat-regular backdrop-blur-sm"
              />
            </div>

            {/* View Toggle + Sort */}
            <div className="flex items-center gap-4">
              {/* Grid Toggle */}
              <div className="flex items-center gap-1 p-1 bg-zinc-900/70 border border-zinc-800 rounded-lg backdrop-blur-sm">
                <button
                  onClick={() => setGridSize("normal")}
                  className={`p-1.5 rounded-md transition-colors ${
                    gridSize === "normal"
                      ? "bg-zinc-700/60"
                      : "hover:bg-zinc-800/50"
                  }`}
                  aria-label="Grid 3 colunas"
                >
                  <GridIcon active={gridSize === "normal"} />
                </button>
                <button
                  onClick={() => setGridSize("large")}
                  className={`p-1.5 rounded-md transition-colors ${
                    gridSize === "large"
                      ? "bg-zinc-700/60"
                      : "hover:bg-zinc-800/50"
                  }`}
                  aria-label="Grid 2 colunas"
                >
                  <LargeGridIcon active={gridSize === "large"} />
                </button>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 montserrat-regular hidden sm:block">
                  Ordenar:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-9 px-3 text-xs bg-zinc-900/70 border border-zinc-800 rounded-lg text-zinc-300 outline-none focus:border-zinc-600 transition-all montserrat-regular backdrop-blur-sm cursor-pointer appearance-none"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="oldest">Mais Antigos</option>
                  <option value="name">Nome A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count = categoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium montserrat-regular transition-all duration-200 border ${
                    isActive
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  {cat}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-black/10 text-black/70"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <p className="text-xs text-zinc-500 montserrat-regular">
            Exibindo{" "}
            <span className="text-zinc-300 font-medium">
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1 ? "projeto" : "projetos"}
          </p>
        </motion.div>

        {/* ── Projects Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${gridSize}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${
              gridSize === "normal"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-950/50 backdrop-blur-sm hover:border-zinc-700/60 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    gridSize === "large" ? "aspect-[4/3]" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes={
                      gridSize === "normal"
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        : "(max-width: 640px) 100vw, 50vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-400 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-black rounded-md montserrat-regular shadow-md">
                        Destaque
                      </span>
                    </div>
                  )}

                  {/* Tags on hover */}
                  <AnimatePresence>
                    {hoveredId === project.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-3 right-3 z-10 flex gap-1.5"
                      >
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] bg-black/60 backdrop-blur-sm text-zinc-300 rounded-md montserrat-regular border border-zinc-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover info overlay */}
                  <AnimatePresence>
                    {hoveredId === project.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="absolute bottom-0 left-0 right-0 p-5 z-10"
                      >
                        <h3 className="text-white font-bold text-lg mb-1.5 pirata-one-regular leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-zinc-300 text-xs montserrat-regular line-clamp-2 mb-3 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 montserrat-regular">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                              {project.client}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  width="18"
                                  height="18"
                                  x="3"
                                  y="4"
                                  rx="2"
                                  ry="2"
                                />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                              {project.year}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Footer */}
                <div className="p-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold montserrat-regular">
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-sm pirata-one-regular leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-xs montserrat-regular">
                    {project.client}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3f3f46"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <h3 className="text-zinc-400 text-lg font-medium montserrat-regular mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-zinc-600 text-sm montserrat-regular max-w-sm">
              Tente ajustar sua busca ou selecionar outra categoria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("Todos");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 text-xs bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors montserrat-regular"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}
      </div>

      <ContactFAB />
    </main>
  );
}
