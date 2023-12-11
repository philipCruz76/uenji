import { FullCategoryType } from "./common.types";
import { z } from "zod";

export const PersonalInfoValidator = z.object({
  fullName: z
    .string()
    .regex(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Please enter your full name."),
  displayName: z
    .string()
    .regex(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Please enter a valid display name.")
    .min(3, "Display name must be at least 3 characters long."),
  profilePicture: z.string(),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters long."),
  languages: z.array(
    z.object({
      name: z.string(),
      level: z.string(),
    }),
  ),
});

export type SellerPersonalInfo = z.infer<typeof PersonalInfoValidator>;

export const ProfessionalInfoValidator = z.object({
  occupation: z.object({
    category: z.object({
      name: z.string(),
      subCategory: z.string(),
    }),
    startYear: z.number(),
    endYear: z.optional(z.number()),
    bestSkills: z.array(z.string()).optional(),
  }),
  skills: z.array(
    z.object({
      name: z.string().min(1, "Skill name must be at least 1 character long."),
      level: z.string(),
    }),
  ),
  education: z
    .array(
      z.object({
        educationLevel: z.string(),
        institution: z.string(),
        year: z.number(),
        degree: z.string(),
      }),
    )
    .optional(),
  certifications: z.optional(
    z.array(
      z.object({
        name: z.string(),
        institution: z.string(),
        year: z.number(),
      }),
    ),
  ),
  personalWebsite: z.optional(z.string()),
});

export type SellerProfessionalData = z.infer<typeof ProfessionalInfoValidator>;

export type SellerProfessionalInfo = {
  occupation: {
    category: FullCategoryType;
    startYear: number;
    endYear?: number;
    bestSkills?: string[];
  };
  skills: {
    name: string;
    level: string;
  }[];
  education?: {
    educationLevel: string;
    institution: string;
    year: number;
    degree: string;
  }[];
  certifications?: {
    name: string;
    institution: string;
    year: number;
  }[];
  personalWebsite?: string;
};

export type SellerInfo = SellerPersonalInfo | SellerProfessionalInfo;

export type SellerAccountSecurity = {
  emailVerified?: boolean;
  phoneVerified?: boolean;
};

export type FullSellerProfile = {
  personalInfo: SellerPersonalInfo;
  professionalInfo: SellerProfessionalInfo;
  accountSecurity: SellerAccountSecurity;
};
