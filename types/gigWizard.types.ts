import { z } from "Zod";

export const GigOverviewValidator = z.object({
  gigTitle: z
    .string()
    .min(15, "Mínimo 15 caracteres")
    .regex(/^[a-zA-Z0-9\s]+$/, "Apenas letras e números são permitidas")
    .refine(
      (str) => (str.match(/\b\w+\b/g) || []).length >= 4,
      "O seu título deve ter pelo menos 4 palavras",
    ),
  gigCategory: z.string().min(1, "Por favor selecione uma categoria"),
  gigSearchTags: z
    .array(
      z
        .string()
        .regex(/^[a-zA-Z0-9]+$/, "Apenas letras e números são permitidas"),
    )
    .min(1, "Pelo menos um tag é necessário")
    .max(5, "Máximo 5 tags permitidos"),
});

export type GigOverview = z.infer<typeof GigOverviewValidator>;

export const GigPricingValidator = z.object({
  packages: z.array(
    z.object({
      title: z
        .string()
        .min(3, "Mínimo 3 caracteres")
        .max(34, "Máximo 34 caracteres"),
      description: z.string().min(10, "Mínimo 10 caracteres"),
      price: z
        .string()
        .refine(
          (value) => parseInt(value) >= 1000 && parseInt(value) % 500 === 0,
          "Preço mínimo não pode ser abaixo dos 1,000.00 AKZ e em incrementos de 500.00 AKZ",
        ),
      deliveryTime: z
        .string()
        .refine(
          (value) => parseInt(value) > 0 && parseInt(value) < 90,
          "Tempo de entrega de serviço tem que ser entre 1 a 90 dias ",
        ),
      revisions: z
        .string()
        .refine((value) => {
          if (value === "") {
            return (value = "0");
          } else {
            return value;
          }
        })
        .optional(),
    }),
  ),
  extras: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, "Please use 3 characters at least")
          .max(20, "20 characters maximum"),
        description: z.string().min(10, "10 characters minimum"),
        price: z.number().min(5, "5$ minimum"),
      }),
    )
    .optional(),
});

export type GigPricing = z.infer<typeof GigPricingValidator>;

export const GigDescriptionValidator = z.object({
  description: z
    .string()
    .min(120, "Descrição deve ter pelo menos 120 caracteres")
    .max(1200, "Descrição deve ter no máximo 1200 caracteres"),
  faqs: z
    .array(
      z.object({
        question: z
          .string()
          .min(1, "")
          .regex(
            /^(?=.*\b\w+\b.*\b\w+\b.*)([a-zA-Z0-9\s]+)\?$/,
            "Pergunta deve ter pelo menos 2 palavras e terminar com um ponto de interrogação",
          ),
        answer: z.string().min(1, "").max(300, "Máximo 300 caracteres"),
      }),
    )
    .optional(),
});

export type GigDescription = z.infer<typeof GigDescriptionValidator>;

export const GigGalleryValidator = z.object({
  gigImages: z
    .array(z.string())
    .max(3, "Máximo 3 imagens")
    .min(1, "Obrigatório pelo menos 1 imagem"),
  gigVideo: z.string().max(1, "Apenas um vídeo pode ser adicionado").optional(),
  gigDocuments: z
    .array(z.string())
    .min(1)
    .max(2, "Apenas 2 documentos podem ser adicionados"),
});

export type GigGallery = z.infer<typeof GigGalleryValidator>;

export type Gig = {
  overview: GigOverview;
  pricing: GigPricing;
  description: GigDescription;
  gallery: GigGallery;
};

export type GigWizardStep = {
  name: string;
  href?: string;
  step: number;
  current?: boolean;
  hasBeenCompleted?: boolean;
};

export type GigWizardSteps = {
  name: string;
  href: string;
  step: number;
  current?: boolean;
}[];
