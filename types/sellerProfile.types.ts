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
    category: z.string(),
    startYear: z.string(),
    endYear: z.string().optional(),
    bestSkills: z.array(z.string()).min(2, "Please choose at least 2 skills."),
  }),
  skills: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Skill name must be at least 1 character long."),
        level: z.string(),
      }),
    )
    .min(1, "Please insert at least 1 skills."),
  education: z
    .array(
      z.object({
        educationLevel: z.string(),
        country: z.string(),
        institution: z.string().regex(/^[a-zA-Z\s]+$/, {
          message: "Please enter a valid institution name.",
        }),
        year: z.string(),
        degree: z.string().regex(/^[a-zA-Z\s]+$/, {
          message: "Please enter a valid degree name.",
        }),
      }),
    )
    .max(3, "Please insert at most 3 education parameters.")
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        institution: z.string().regex(/^[a-zA-Z\s]+$/, {
          message: "Please enter a valid institution name.",
        }),
        year: z.string(),
      }),
    )
    .optional(),
  personalWebsite: z.string().optional(),
});

export type SellerProfessionalInfo = z.infer<typeof ProfessionalInfoValidator>;

export type SellerInfo = SellerPersonalInfo | SellerProfessionalInfo;

export const SellerAccountSecurityValidator = z.object({
  emailVerified: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
});

export const SellerProfileValidator = z.object({
  personalInfo: PersonalInfoValidator,
  professionalInfo: ProfessionalInfoValidator,
  accountSecurity: SellerAccountSecurityValidator,
});
export type SellerAccountSecurity = z.infer<
  typeof SellerAccountSecurityValidator
>;

export type FullSellerProfile = {
  personalInfo: SellerPersonalInfo;
  professionalInfo: SellerProfessionalInfo;
  accountSecurity: SellerAccountSecurity;
};
