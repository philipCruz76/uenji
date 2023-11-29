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
