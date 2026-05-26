# Planejamento do Projeto: Landing Page - Matheus Tattoo Arts

Este documento detalha o planejamento em fases e as diretrizes técnicas para a implementação da landing page do Matheus Tattoo Arts, um tatuador especialista em Realismo sediado no Rio de Janeiro. O objetivo é criar uma experiência "UI/UX Pro Max" focada em alto impacto visual e performance.

## 🛠 Stack Tecnológica

*   **Core:** Next.js 14 (App Router), React 18+.
*   **Linguagem:** TypeScript (Tipagem estática rigorosa, proibido o uso de `any`).
*   **Estilização:** TailwindCSS.
*   **Componentes base:** Radix UI (foco em acessibilidade) + estrutura shadcn/ui.
*   **Animações:** Framer Motion (para o Hero Parallax) e GSAP (para animações avançadas nas próximas seções).
*   **Ícones:** Lucide React.
*   **Performance:** Imagens otimizadas nativamente pelo Next.js com a biblioteca `sharp`.
*   **Qualidade:** ESLint e Prettier obrigatoriamente configurados e ativos.

---

## 🗺️ Fases de Implementação e Arquitetura

### Fase 1: Setup Inicial e Configuração Base (shadcn/ui)
*   **Inicialização:** Criar projeto Next.js com suporte nativo a Tailwind e TypeScript.
*   **Ferramentas de Qualidade:** Configurar ESLint e Prettier.
*   **shadcn/ui:** Inicializar a CLI do shadcn/ui.
*   **Arquitetura de Pastas:**
    *   `components/ui`: Reservada EXCLUSIVAMENTE para componentes genéricos (botões, inputs). Elementos visuais isolados, sem lógica de negócio.
    *   `components/blocks`: Criar esta pasta para componentes compostos e seções inteiras da página, como o `Hero Parallax`.

### Fase 2: Instalação de Dependências
Instalar as dependências externas necessárias para os blocos e animações antes da integração:
*   `framer-motion`: Motor de animação principal do bloco Hero Parallax.
*   `lucide-react`: Para os ícones da seção de contato e/ou header.
*   `gsap`: Para futuras animações avançadas em outras dobras.
*   `sharp`: Para otimização de imagens no Next.js.

### Fase 3: Adaptação do Componente Hero Parallax
*   **Integração:** Inserir o código do `hero-parallax.tsx` na pasta `/components/blocks`.
*   **Refatoração do `<Header />`:**
    *   *Novo Título:* Matheus Tattoo Arts - Especialista em Realismo.
    *   *Nova Descrição:* Atuação no Rio de Janeiro, foco em arte realista (transformando a pele numa tela), e incluir o contato: +55 21 96531-3328.
*   **Refatoração dos Dados (`products`):**
    *   Substituir as referências de ferramentas SaaS por temas de tatuagens (ex: "Fechamento de Braço", "Sombreado Realista", "Leão em Preto e Cinza").
*   **Assets Visuais (Imagens Locais):**
    *   As imagens de referência já estão disponíveis na pasta `public/` do projeto (`/tattoo-1.png`, `/tattoo-2.png`, `/tattoo-3.png`, `/tattoo-4.png`, `/tattoo-5.png`).
    *   Utilizar os caminhos relativos dessas imagens para preencher as thumbnails.
    *   **Nota de Preenchimento:** Como o componente possui muitos espaços, está **autorizada a repetição** dessas imagens na lista para preencher todo o array de dados (fase de teste).

### Fase 4: Otimização de Imagens e Performance
*   **next.config.mjs:** Como as imagens estão locais na pasta `public`, não é necessário configurar `remotePatterns` nesta etapa. Apenas prepare para futuras configurações de bucket (ex: AWS S3 ou Instagram).
*   **Performance:** Validar o LCP (Largest Contentful Paint). As imagens locais devem ser rigorosamente otimizadas pelo `<Image />` nativo do Next.js para garantir carregamento rápido.

### Fase 5: Responsividade e Comportamento
*   **Props:** O componente principal do Hero Parallax deve receber APENAS a lista de imagens/trabalhos (`products`). A lógica de animação (`useScroll` e `useSpring`) já é interna.
*   **Mobile First & Testes:**
    *   Analisar e testar intensamente o comportamento das classes de `perspective:1000px` e translações 3D em telas menores.
    *   Prevenir e corrigir qualquer problema de performance, quebra de layout ou *overflow* gerado por animações baseadas em scroll no mobile.

---

**Diretriz Fundamental:** A primeira impressão deve gerar o efeito "WOW". Toda alteração de design deve priorizar o visual premium e a fluidez das interações.
