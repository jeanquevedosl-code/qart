export const WA_LINK = "https://wa.me/message/TV3EKHETGUFIE1";
export const EMAIL = "ola@jeanqart.design";
export const INSTAGRAM = "https://instagram.com/jeanqart";
export const BEHANCE = "https://behance.net/jeanqart";

export const IMG = {
  nebula:
    "https://framerusercontent.com/images/7zfj9XoSEFhpbb7b0nyLUI5FY.jpg?width=1100",
  vertigem:
    "https://framerusercontent.com/images/w28vKCWs82TmYB6UgTgxl9UbpUk.jpg?width=900",
  aurora:
    "https://framerusercontent.com/images/kM4ZtMTdvIrmPrjJSO1KVtbVzg.jpg?width=1100",
  vetro:
    "https://framerusercontent.com/images/l5Z02Vb00Mo3mkXsGEldmnFQrQ.jpg?width=1100",
  orbita:
    "https://image.qwenlm.ai/generated-images/63d155c2-0ad1-4c01-9f81-c27dae9c7447/_result.png",
  lumen:
    "https://image.qwenlm.ai/generated-images/b0251200-a79f-468d-a611-3d3f06d05482/_result.png",
};

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  img: string;
  portrait?: boolean;
  span: string;
  aspect: string | null;
  accent: string;
  tags: string[];
  role: string;
  stack: string;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    id: "nebula",
    index: "01",
    title: "Nébula Records",
    category: "Identidade Visual",
    year: "2025",
    img: IMG.nebula,
    span: "lg:col-span-7",
    aspect: "aspect-[16/10]",
    accent: "var(--color-flame)",
    tags: ["Identidade", "Tipografia", "Print"],
    role: "Direção de arte & design",
    stack: "Illustrator · Photoshop · Figma",
    description:
      "Sistema visual completo para um selo musical independente — logotipo, capa de lançamento e linguagem gráfica que se estende do vinil ao feed.",
  },
  {
    id: "vertigem",
    index: "02",
    title: "Vertigem",
    category: "Poster Editorial",
    year: "2024",
    img: IMG.vertigem,
    portrait: true,
    span: "lg:col-span-5",
    aspect: null,
    accent: "var(--color-butter)",
    tags: ["Editorial", "Ilustração", "Cartaz"],
    role: "Ilustração & diagramação",
    stack: "Photoshop · Procreate",
    description:
      "Série de cartazes para uma mostra de cinema autoral. Composições verticais que traduzem tensão e movimento em camadas de cor e ruído.",
  },
  {
    id: "aurora",
    index: "03",
    title: "Café Aurora",
    category: "Ilustração & Embalagem",
    year: "2025",
    img: IMG.aurora,
    span: "lg:col-span-5",
    aspect: "aspect-[4/5]",
    accent: "var(--color-lilac)",
    tags: ["Embalagem", "Ilustração", "Marca"],
    role: "Ilustração & identidade",
    stack: "Illustrator · Photoshop",
    description:
      "Ilustrações autorais para a linha de cafés especiais Aurora — rótulos que contam a origem do grão com traço quente e paleta torrada.",
  },
  {
    id: "vetro",
    index: "04",
    title: "Studio Vetro",
    category: "Web Design & Front-end",
    year: "2026",
    img: IMG.vetro,
    span: "lg:col-span-7",
    aspect: null,
    accent: "var(--color-flame)",
    tags: ["Website", "Animação", "Código"],
    role: "Design & desenvolvimento",
    stack: "Figma · React · Tailwind",
    description:
      "Site institucional para estúdio de arquitetura: grid editorial, tipografia ampliada e microinterações que imitam a transparência do vidro.",
  },
  {
    id: "orbita",
    index: "05",
    title: "Órbita",
    category: "3D & Motion",
    year: "2026",
    img: IMG.orbita,
    span: "lg:col-span-6",
    aspect: "aspect-[4/3]",
    accent: "var(--color-butter)",
    tags: ["3D", "Render", "Motion"],
    role: "Modelagem & direção",
    stack: "Blender · After Effects",
    description:
      "Estudo de formas em equilíbrio — chrome líquido, cerâmica fosca e luz de estúdio. Base para vinhetas e assets de marca em movimento.",
  },
  {
    id: "lumen",
    index: "06",
    title: "Plataforma Lumen",
    category: "UX/UI · Produto",
    year: "2026",
    img: IMG.lumen,
    span: "lg:col-span-6",
    aspect: null,
    accent: "var(--color-lilac)",
    tags: ["UX/UI", "Protótipo", "Design system"],
    role: "UX/UI & prototipação",
    stack: "Figma · FigJam · Maze",
    description:
      "Dashboard de gestão de energia para pequenos negócios: pesquisa, fluxo, design system e protótipo de alta fidelidade pronto para o dev.",
  },
];

export const SERVICES = [
  {
    n: "01",
    title: "Ilustração",
    desc: "Ilustrações editoriais, digitais e técnicas — do traço autoral ao vetorial limpo. Imagens que carregam a voz da marca, não apenas decoram a página.",
    chips: ["Editorial", "Digital", "Vetorial", "Print"],
  },
  {
    n: "02",
    title: "Web Design & Front-end",
    desc: "Sites que unem intenção visual e código: landing pages, portfólios e experiências com animação sob medida — desenhados já pensando em como serão implementados.",
    chips: ["Landing pages", "Portfólios", "React", "Animações"],
  },
  {
    n: "03",
    title: "UX/UI Design",
    desc: "Interfaces pensadas para funcionalidade primeiro: pesquisa, arquitetura de informação, wireframes e protótipos de alta fidelidade que conversam fluentemente com o time de desenvolvimento.",
    chips: ["Pesquisa", "Wireframes", "Protótipos", "Design system"],
  },
  {
    n: "04",
    title: "Identidade Visual",
    desc: "Sistemas de marca com lógica interna: logotipo, tipografia, paleta e aplicações que se mantêm coerentes do cartão de visita ao outdoor digital.",
    chips: ["Logotipo", "Tipografia", "Paleta", "Brand book"],
  },
  {
    n: "05",
    title: "3D & Motion",
    desc: "Renders, vinhetas e microinterações que dão peso e presença à marca — do asset estático ao loop perfeito para redes e produtos digitais.",
    chips: ["Blender", "Renders", "Microinterações", "Loops"],
  },
];

export const STATS = [
  { value: 40, suffix: "+", label: "Projetos entregues" },
  { value: 12, suffix: "", label: "Marcas atendidas" },
  { value: 3, suffix: "", label: "Anos de prática" },
  { value: 100, suffix: "%", label: "Intenção visual" },
];

export const TESTIMONIALS = [
  {
    quote:
      "O Jean traduziu uma ideia confusa numa identidade que a gente tem orgulho de estampar em tudo.",
    name: "Marina Lopes",
    role: "Fundadora · Café Aurora",
    accent: "var(--color-flame)",
    offset: "lg:mt-0",
  },
  {
    quote:
      "Raro encontrar quem desenha bem e ainda fala a língua do dev. O handoff veio impecável, no detalhe.",
    name: "Rafael Teixeira",
    role: "CTO · Plataforma Lumen",
    accent: "var(--color-butter)",
    offset: "lg:mt-14",
  },
  {
    quote:
      "Cada entrega vinha com uma intenção clara por trás. Não é decoração — é estratégia visual.",
    name: "Paula Andrade",
    role: "Diretora · Studio Vetro",
    accent: "var(--color-lilac)",
    offset: "lg:mt-28",
  },
];

export const SKILLS = [
  "Figma",
  "Illustrator",
  "Photoshop",
  "Blender",
  "After Effects",
  "HTML / CSS",
  "React",
  "Tailwind",
  "TypeScript",
  "Procreate",
];

export const TIMELINE = [
  {
    year: "2023",
    title: "Primeiros traços",
    desc: "A ilustração entra como linguagem principal — estudos diários, cartazes e identidade para projetos pessoais.",
  },
  {
    year: "2024",
    title: "Início em TI",
    desc: "A graduação em TI abre a ponte entre o desenho e o código: interfaces deixam de ser imagem e viram produto.",
  },
  {
    year: "2025",
    title: "Freelance & marcas",
    desc: "Primeiros clientes reais: embalagens, identidades e sites — a prática que afiou o processo do estúdio.",
  },
  {
    year: "2026",
    title: "Q’ART",
    desc: "A prática criativa ganha nome: direção de arte, UX/UI e web sob o mesmo teto, com intenção do pixel ao deploy.",
  },
];

export const TICKER_ITEMS = [
  "Ilustração",
  "Web Design",
  "UX/UI",
  "3D & Motion",
  "Identidade Visual",
  "Direção de Arte",
];

export const STRIP_IMAGES = [IMG.nebula, IMG.aurora, IMG.vertigem, IMG.vetro];
