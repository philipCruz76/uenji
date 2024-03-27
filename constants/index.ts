import { Category, CategoryFilter } from "@/types/common.types";

export const NavLinks = [
  { href: "/categorias", key: "Explorar", text: "Explorar" },
];

export const MobileNavLinks = [
  { href: "/", key: "Explar", text: "Explar" },
  { href: "/", key: "Home", text: "Home" },
];

export const categoryLinksPT = {
  links: [
    { name: "Fotografia", href: "/categorias/fotografia" },
    { name: "Formação", href: "/categorias/formacao" },
    { name: "Escrita", href: "/categorias/escrita" },
    { name: "Edição de Vídeo", href: "/categorias/video" },
    { name: "Música", href: "/categorias/musica" },
    { name: "Análises", href: "/categorias/analises" },
    { name: "Design", href: "/categorias/design" },
    { name: "Negócios", href: "/categorias/negocios" },
    { name: "Marketing", href: "/categorias/Marketing" },
    { name: "Programação", href: "/categorias/programacao" },
  ],
};

export const categoryLinksEN = {
  links: [
    { name: "Photography", href: "/categorias/fotografia" },
    { name: "Tutoring", href: "/categorias/formacao" },
    { name: "Writing", href: "/categorias/escrita" },
    { name: "Video Editing", href: "/categorias/video" },
    { name: "Music", href: "/categorias/musica" },
    { name: "Analysis", href: "/categorias/analises" },
    { name: "Design", href: "/categorias/design" },
    { name: "Business", href: "/categorias/negocios" },
    { name: "Marketing", href: "/categorias/Marketing" },
    { name: "Programming", href: "/categorias/programacao" },
  ],
};

export const catCards = [
  {
    title: "Fotografia",
    description: "Captura o momento certo",
    image: "/images/camera.jpg",
    href: "/categorias/fotografia",
    alt: "Fotografia",
  },
  {
    title: "Formação",
    description: "Aprende novos conceitos",
    image: "/images/formacao.jpg",
    href: "/categorias/formacao",
    alt: "Formação",
  },
  {
    title: "Escrita",
    description: "Elabora documentação",
    image: "/images/writing-pen.jpg",
    href: "/categorias/escrita",
    alt: "Escrita",
  },
  {
    title: "Música",
    description: "Cria a tua música",
    image: "/images/music.jpg",
    href: "/categorias/musica",
    alt: "Música",
  },
  {
    title: "Análises",
    description: "Encontra os KPIs certos",
    image: "/images/analytics.jpg",
    href: "/categorias/analise",
    alt: "Análises",
  },
  {
    title: "Programação",
    description: "Dá vida ao teu projecto",
    image: "/images/coding.jpg",
    href: "/categorias/programacao",
    alt: "Programação",
  },
  {
    title: "Negócios",
    description: "Aumenta o teu valor",
    image: "/images/business.jpg",
    href: "/categorias/negocios",
    alt: "Business",
  },
  {
    title: "Edição de Vídeo",
    description: "Cria o teu vídeo",
    image: "/images/video-editing.jpg",
    href: "/categorias/video",
    alt: "Vídeo Editing",
  },
  {
    title: "Marketing",
    description: "Aumenta a tua audiência",
    image: "/images/design-stock.jpg",
    href: "/categorias/marketing",
    alt: "Marketing",
  },
  {
    title: "Design",
    description: "Constrói a tua marca",
    image: "/images/design-sketch.jpg",
    href: "/categorias/design",
    alt: "Design",
  },
];

export const categoryFilters = [
  "Fotografia",
  "Formação",
  "Escrita",
  "Edição de Vídeo",
  "Música",
  "Análises",
  "Design",
  "Negócios",
  "Marketing",
  "Programação",
];

export const CategoriesMap: CategoryFilter[] = [
  {
    category: {
      pt: "Fotografia",
      en: "Photography",
      name: "fotografia",
    },
  },
  {
    category: {
      pt: "Formação",
      en: "Tutoring",
      name: "formacao",
    },
  },
  {
    category: {
      pt: "Escrita",
      en: "Writing",
      name: "escrita",
    },
  },
  {
    category: {
      pt: "Música",
      en: "Music",
      name: "musica",
    },
  },
  {
    category: {
      pt: "Análises",
      en: "Analysis",
      name: "analises",
    },
  },
  {
    category: {
      pt: "Programação",
      en: "Programming",
      name: "programacao",
    },
  },
  {
    category: {
      pt: "Negócios",
      en: "Business",
      name: "negocios",
    },
  },
  {
    category: {
      pt: "Edição de Vídeo",
      en: "Video Editing",
      name: "video",
    },
  },
  {
    category: {
      pt: "Marketing",
      en: "Marketing",
      name: "marketing",
    },
  },
  {
    category: {
      pt: "Design",
      en: "Design",
      name: "design",
    },
  },
];

export const footerLinksPT = [
  {
    title: "Categorias",
    links: [
      { name: "Fotografia", href: "/categorias/fotografia" },
      { name: "Formação", href: "/categorias/formacao" },
      { name: "Escrita", href: "/categorias/escrita" },
      { name: "Edição de Vídeo", href: "/categorias/video" },
      { name: "Música", href: "/categorias/musica" },
      { name: "Análises", href: "/categorias/analises" },
      { name: "Design", href: "/categorias/design" },
      { name: "Negócios", href: "/categorias/negocios" },
      { name: "Marketing", href: "/categorias/Marketing" },
      { name: "Programação", href: "/categorias/programacao" },
    ],
  },
  {
    title: "Sobre nós",
    links: [
      { name: "Política de Privacidade", href: "/" },
      { name: "Contacte-nos", href: "/" },
    ],
  },
  {
    title: "Comunidade",
    links: [
      { name: "Testemunho de clientes", href: "/" },
      { name: "Convida um Amigo", href: "/" },
      {
        name: "Torne-se num Freelancer",
        href: "/freelancer_onboarding/overview",
      },
    ],
  },
];

export const footerLinksEN = [
  {
    title: "Categories",
    links: [
      { name: "Photography", href: "/categorias/fotografia" },
      { name: "Tuturing", href: "/categorias/formacao" },
      { name: "Writing", href: "/categorias/escrita" },
      { name: "Video Editing", href: "/categorias/video" },
      { name: "Music", href: "/categorias/musica" },
      { name: "Analysis", href: "/categorias/analises" },
      { name: "Design", href: "/categorias/design" },
      { name: "Business", href: "/categorias/negocios" },
      { name: "Marketing", href: "/categorias/Marketing" },
      { name: "Programming", href: "/categorias/programacao" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Privacy Policy", href: "/" },
      { name: "Contact Us", href: "/" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Client Testimonials", href: "/" },
      { name: "Invite a friend", href: "/" },
      {
        name: "Become a Seller",
        href: "/freelancer_onboarding/overview",
      },
    ],
  },
];

export const CATEGORIES = [
  "fotografia",
  "formacao",
  "escrita",
  "musica",
  "analises",
  "programacao",
  "negocios",
  "video",
  "marketing",
  "design",
] as const;

export const CategoryDesciptionsEN: Category[] = [
  {
    category: "programacao",
    categoryTitle: "Programming",
    titlecardImage: "/category-banners/software-dev.svg",
    thumbnailIcon: "/icons/laptop-duotone.svg",
    categoryTagline: "Give life to your project",
  },
  {
    category: "formacao",
    categoryTitle: "Tutoring",
    titlecardImage: "/category-banners/tutoring.svg",
    thumbnailIcon: "/icons/graduation-cap-duotone.svg",
    categoryTagline: "Learn new concepts",
  },
  {
    category: "marketing",
    categoryTitle: "Marketing",
    titlecardImage: "",
    thumbnailIcon: "/icons/copyright-duotone.svg",
    categoryTagline: "Increase your reach",
  },
  {
    category: "analises",
    categoryTitle: "Analysis",
    titlecardImage: "/category-banners/analytics-graphic.svg",
    thumbnailIcon: "/icons/chart-line-duotone.svg",
    categoryTagline: "Find the right KPIs",
  },
  {
    category: "negocios",
    categoryTitle: "Business",
    titlecardImage: "/category-banners/agile-project.svg",
    thumbnailIcon: "/icons/briefcase-duotone.svg",
    categoryTagline: "Increase your value",
  },
  {
    category: "design",
    categoryTitle: "Design",
    titlecardImage: "/category-banners/graphic-design.svg",
    thumbnailIcon: "/icons/paint-brush-duotone.svg",
    categoryTagline: "Build your brand",
  },
  {
    category: "fotografia",
    categoryTitle: "Photography",
    titlecardImage: "/category-banners/pro-photography.svg",
    thumbnailIcon: "/icons/camera-duotone.svg",
    categoryTagline: "Capture the right moment",
  },
  {
    category: "escrita",
    categoryTitle: "Writing",
    titlecardImage: "/category-banners/copy-writing.svg",
    thumbnailIcon: "/icons/article-medium-duotone.svg",
    categoryTagline: "Draft documentation",
  },
  {
    category: "musica",
    categoryTitle: "Music",
    titlecardImage: "/category-banners/live-music.jpg",
    thumbnailIcon: "/icons/microphone-duotone.svg",
    categoryTagline: "Create your soundscape",
  },

  {
    category: "video",
    categoryTitle: "Video",
    titlecardImage: "/category-banners/video-editing.svg",
    thumbnailIcon: "/icons/video-duotone.svg",
    categoryTagline: "Make your video",
  },
];

export const CategoryDesciptionsPT: Category[] = [
  {
    category: "programacao",
    categoryTitle: "Programação",
    titlecardImage: "/category-banners/software-dev.svg",
    thumbnailIcon: "/icons/laptop-duotone.svg",
    categoryTagline: "Dá vida ao teu projecto",
  },
  {
    category: "formacao",
    categoryTitle: "Formação",
    titlecardImage: "/category-banners/tutoring.svg",
    thumbnailIcon: "/icons/graduation-cap-duotone.svg",
    categoryTagline: "Aprende novos conceitos",
  },
  {
    category: "marketing",
    categoryTitle: "Marketing",
    titlecardImage: "",
    thumbnailIcon: "/icons/copyright-duotone.svg",
    categoryTagline: "Aumenta a tua audiência",
  },
  {
    category: "analises",
    categoryTitle: "Análises",
    titlecardImage: "/category-banners/analytics-graphic.svg",
    thumbnailIcon: "/icons/chart-line-duotone.svg",
    categoryTagline: "Encontra os KPIs certos",
  },
  {
    category: "negocios",
    categoryTitle: "Negócios",
    titlecardImage: "/category-banners/agile-project.svg",
    thumbnailIcon: "/icons/briefcase-duotone.svg",
    categoryTagline: "Aumenta o teu valor",
  },
  {
    category: "design",
    categoryTitle: "Design",
    titlecardImage: "/category-banners/graphic-design.svg",
    thumbnailIcon: "/icons/paint-brush-duotone.svg",
    categoryTagline: "Constrói a tua marca",
  },
  {
    category: "fotografia",
    categoryTitle: "Fotografia",
    titlecardImage: "/category-banners/pro-photography.svg",
    thumbnailIcon: "/icons/camera-duotone.svg",
    categoryTagline: "Captura o momento certo",
  },
  {
    category: "escrita",
    categoryTitle: "Escrita",
    titlecardImage: "/category-banners/copy-writing.svg",
    thumbnailIcon: "/icons/article-medium-duotone.svg",
    categoryTagline: "Elabora documentação",
  },
  {
    category: "musica",
    categoryTitle: "Música",
    titlecardImage: "/category-banners/live-music.jpg",
    thumbnailIcon: "/icons/microphone-duotone.svg",
    categoryTagline: "Cria a tua música",
  },

  {
    category: "video",
    categoryTitle: "Vídeo",
    titlecardImage: "/category-banners/video-editing.svg",
    thumbnailIcon: "/icons/video-duotone.svg",
    categoryTagline: "Cria o teu vídeo",
  },
];

const ISO3166a2 = require("iso-3166-1-alpha-2");
export const ISOCountries = ISO3166a2.getCountries();
