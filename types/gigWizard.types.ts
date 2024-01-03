import { z } from "zod";

export const GigOverviewValidator = z.object({
  gigTitle: z.string().min(15,"15 characters at least").refine((str) => (str.match(/\b\w+\b/g) || []).length >= 4, "Your title should have at least 4 words"),
  gigCateogry: z.string(),
  gigSearchTags: z
    .array(
      z.string().regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed")
    )
    .max(5, "5 tags maximum"),
});

export type GigOverview = z.infer<typeof GigOverviewValidator>;

export const GigPricingValidator = z.object({
  packages: z
    .array(
      z.object({
        title: z.string().min(5, "5 characters minimum"),
        description: z.string().min(10, "10 characters minimum"),
        price: z.number().min(5, "5$ minimum"),
        deliveryTime: z.number().min(1, "1 day minimum"),
        revisions: z.number().min(0, "0 revisions minimum"),
      })
    )
    .min(1, "There needs to be at least 1 package"),
  extras: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, "Please use 3 characters at least")
          .max(20, "20 characters maximum"),
        description: z.string().min(10, "10 characters minimum"),
        price: z.number().min(5, "5$ minimum"),
      })
    )
    .optional(),
});

export type GigPricing = z.infer<typeof GigPricingValidator>;

export const GigDescriptionValidator = z.object({
  description: z.string().min(120, "Description should be at least 120 chars long."),
  faqs: z.array(
    z.object({
      question: z.string().min(10, "10 characters minimum"),
      answer: z.string().min(10, "10 characters minimum"),
    })
  ).optional()
});

export type GigDescription = z.infer<typeof GigDescriptionValidator>;

export const GigGalleryValidator = z.object({
    gigImages: z.array(z.string()).max(3, "3 images maximum"),
    gigVideo: z.string().max(1, "Only one video allowed to upload per gig").optional(),
    gigDocuments: z.array(z.string()).max(2, "2 documents maximum").optional(),
});

export type GigGallery = z.infer<typeof GigGalleryValidator>;

export type Gig = {
    overview: GigOverview;
    pricing: GigPricing;
    description: GigDescription;
    gallery: GigGallery;
}
