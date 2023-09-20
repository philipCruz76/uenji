import { FullSellerProfile } from "@/types/sellerProfile.types";
import { create } from "zustand";

type SellerProfileStore = {
  sellerProfile: FullSellerProfile;
  setSellerProfile: (sellerProfile: FullSellerProfile) => void;
};

export const useSellerProfileStore = create<SellerProfileStore>()((set) => ({
  sellerProfile: {
    personalInfo: {
      fullName: "",
      displayName: "",
      profilePicture: "",
      description: "",
      languages: {
        language: "Português",
        level: "Nativo/Bilingue",
      },
    },
    professionalInfo: {
      ocupation: {
        category: "Fotografia",
        startYear: 2023,
      },
      skills: {
        skill: "",
        level: "Principiante",
      },
    },
    accountSecurity: {
      emailVerified: false,
      phoneVerified: false,
    },
  },
  setSellerProfile: (sellerProfile: FullSellerProfile) =>
    set(() => ({ sellerProfile })),
}));
