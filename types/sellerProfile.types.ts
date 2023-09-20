import { Category } from "./common.types";

export type SellerPersonalInfo = {
    fullName : string;
    displayName : string;
    profilePicture : string;
    description: string;
    languages: {
        language: ""|"Inglês" | "Português" | "Françês" | "Espanhol" | "Alemão" |  "Mandarim",
        level: ""|"Básico" | "Conversacional" | "Fluente" | "Nativo/Bilingue";
    }
}

export type SellerProfessionalInfo = {
    ocupation: {
        category: Category;
        startYear: number;
        endYear?: number;
        bestSkills?: string[];
    },
    skills:{
        skill: string;
        level: "Principiante" | "Intermédio" | "Expert";
    },
    education?: {
        educationLevel: "Ensino Secundário" | "Bacharelato" | "Mestrado" | "Doutoramento";
        institution: string;
        year: number;
        major: string;
    },
    certifications?: {
        name: string;
        institution: string;
        year: number;
    },
    personalWebsite?: string;
}

export type SellerAccountSecurity = {
    emailVerified?: boolean;
    phoneVerified?: boolean;
}

export type FullSellerProfile = {
    personalInfo: SellerPersonalInfo;
    professionalInfo: SellerProfessionalInfo;
    accountSecurity: SellerAccountSecurity;
}