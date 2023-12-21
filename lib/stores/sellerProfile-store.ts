import {
  FullSellerProfile,
  SellerAccountSecurity,
  SellerPersonalInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";
import { create } from "zustand";
import { produce } from "immer";

type SellerProfileStore = {
  sellerProfile: FullSellerProfile;
  setSellerPersonalInfo: (personalInfo: SellerPersonalInfo) => void;
  setSellerProfessionalInfo: (professionalInfo: SellerProfessionalInfo) => void;
  setSellerAccountSecurity: (accountSecurity: SellerAccountSecurity) => void;
  getSellerPersonalInfo: () => SellerPersonalInfo;
  getSellerProfessionalInfo: () => SellerProfessionalInfo;
  getSellerAccountSecurity: () => SellerAccountSecurity;
  getSellerProfile: () => FullSellerProfile;
};

export const useSellerProfileStore = create<SellerProfileStore>()(
  (set, get) => ({
    sellerProfile: {
      personalInfo: {
        fullName: "",
        displayName: "",
        profilePicture: "",
        description: "",
        languages: [
          {
            name: "",
            level: "",
          },
        ],
      },
      professionalInfo: {
        occupation: {
          category: "Fotografia",
          bestSkills: [""],
          startYear: "2023",
        },
        skills: [
          {
            name: "",
            level: "Principiante",
          },
        ],
      },
      accountSecurity: {
        emailVerified: false,
        phoneVerified: false,
      },
    },
    setSellerPersonalInfo: (personalInfo) =>
      set(
        produce((state) => {
          state.sellerProfile.personalInfo = personalInfo;
        })
      ),
    setSellerProfessionalInfo: (professionalInfo) =>
      set(
        produce((state) => {
          state.sellerProfile.professionalInfo = professionalInfo;
        })
      ),
    setSellerAccountSecurity: (accountSecurity) =>
      set(
        produce((state) => {
          state.sellerProfile.accountSecurity = accountSecurity;
        })
      ),
    getSellerPersonalInfo: () => {
      return get().sellerProfile.personalInfo;
    },
    getSellerProfessionalInfo: () => {
      return get().sellerProfile.professionalInfo;
    },
    getSellerAccountSecurity: () => {
      return get().sellerProfile.accountSecurity;
    },
    getSellerProfile: () => {
      return get().sellerProfile;
    },
  })
);
