export const NavLinks = [
  { href: "/", key: "Explorar", text: "Explorar" },
  { href: "/", key: "English", text: "English" },
];

export const MobileNavLinks = [
  { href: "/", key: "Explar", text: "Explar" },
  { href: "/", key: "Home", text: "Home" },
];

export const catCards = [
  {
    title: "Fotografia",
    description: "Captura o momento certo",
    image: "/camera.jpg",
    alt: "Fotografia",
  },
  {
    title: "Formação",
    description: "Aprende novos conceitos",
    image: "/formacao.jpg",
    alt: "Formação",
  },
  {
    title: "Escrita",
    description: "Elabora documentação",
    image: "/writing-pen.jpg",
    alt: "Escrita",
  },
  {
    title: "Música",
    description: "Cria a tua música",
    image: "/music.jpg",
    alt: "Música",
  },
  {
    title: "Análises",
    description: "Descobre os KPIs",
    image: "/analytics.jpg",
    alt: "Análises",
  },
  {
    title: "Programação",
    description: "Executa os teus projectos",
    image: "/coding.jpg",
    alt: "Programação",
  },
  {
    title: "Negócios",
    description: "Aumenta a tua audiência",
    image: "/business.jpg",
    alt: "Business",
  },
  {
    title: "Edição de Vídeo",
    description: "Cria o teu vídeo",
    image: "/video-editing.jpg",
    alt: "Vídeo Editing",
  },
  {
    title: "Branding",
    description: "Constrói a tua marca",
    image: "/design-stock.jpg",
    alt: "Branding",
  },
  {
    title: "Design",
    description: "Traduz o teu conteúdo",
    image: "/design-sketch.jpg",
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
  "Branding",
  "Programação",
];

export const languageFilters = ["English", "Português"];

export const footerLinks = [
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
      { name: "Branding", href: "/categorias/branding" },
      { name: "Programação", href: "/categorias/programacao" },
    ],
  },
  {
    title: "Sobre nós",
    links: [
      { name: "Carreiras", href: "/" },
      { name: "Imprensa e Notícias", href: "/" },
      { name: "Parcerias", href: "/" },
      { name: "Política de Privacidade", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Support", href: "/" },
      { name: "Vender na Uenji", href: "/" },
      { name: "Comprar na Uenji", href: "/" },
      { name: "Guias da Uenji", href: "/" },
    ],
  },
  {
    title: "Comunidade",
    links: [
      { name: "Customer Success Stories", href: "/" },
      { name: "Convida um Amigo", href: "/" },
      { name: "Become a Seller", href: "/freelancer_onboarding/overview" },
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
  "branding",
  "design",
] as const;

export const CategoryDesciptions = [
  {
    category: "fotografia",
    categoryTitle: "Fotografia",
    titlecardImage: "/category-banners/banner.png",
    thumbnailIcon: "/icons/camera-duotone.svg",
    categoryTagline: "Captura o momento certo",
  },
  {
    category: "formacao",
    categoryTitle: "Formação",
    titlecardImage: "/category-banners/banner2.png",
    thumbnailIcon: "/icons/graduation-cap-duotone.svg",
    categoryTagline: "Aprende novos conceitos",
  },
  {
    category: "escrita",
    categoryTitle: "Escrita",
    titlecardImage: "/category-banners/banner2.png",
    thumbnailIcon: "/icons/article-medium-duotone.svg",
    categoryTagline: "Elabora documentação",
  },
  {
    category: "musica",
    categoryTitle: "Música",
    titlecardImage: "/category-banners/banner3.png",
    thumbnailIcon: "/icons/microphone-duotone.svg",
    categoryTagline: "Cria a tua música",
  },
  {
    category: "analises",
    categoryTitle: "Análises",
    titlecardImage: "/category-banners/banner4.png",
    thumbnailIcon: "/icons/chart-line-duotone.svg",
    categoryTagline: "Descobre os KPIs",
  },
  {
    category: "programacao",
    categoryTitle: "Programação",
    titlecardImage: "/category-banners/banner5.png",
    thumbnailIcon: "/icons/laptop-duotone.svg",
    categoryTagline: "Executa os teus projectos",
  },
  {
    category: "negocios",
    categoryTitle: "Negócios",
    titlecardImage: "/category-banners/banner5.png",
    thumbnailIcon: "/icons/briefcase-duotone.svg",
    categoryTagline: "Aumenta a tua audiência",
  },
  {
    category: "video",
    categoryTitle: "Vídeo",
    titlecardImage: "/category-banners/banner.png",
    thumbnailIcon: "/icons/video-duotone.svg",
    categoryTagline: "Cria o teu vídeo",
  },
  {
    category: "branding",
    categoryTitle: "Branding",
    titlecardImage: "/category-banners/banner2.png",
    thumbnailIcon: "/icons/copyright-duotone.svg",
    categoryTagline: "Constrói a tua marca",
  },
  {
    category: "design",
    categoryTitle: "Design",
    titlecardImage: "/category-banners/banner4.png",
    thumbnailIcon: "/icons/paint-brush-duotone.svg",
    categoryTagline: "Traduz o teu conteúdo",
  },
];

const ISO3166a2 = require("iso-3166-1-alpha-2");
export const ISOCountries = ISO3166a2.getCountries();
