import { create } from "zustand";

type SellerOnboardingStore = {
  sellerOnboardingStep: 1 | 2 | 3;
  setSellerOnboardingStep: (step: 1 | 2 | 3) => void;
};

export const useSellerOnboardingStore = create<SellerOnboardingStore>()(
  (set) => ({
    sellerOnboardingStep: 1,
    setSellerOnboardingStep(step) {
      set({ sellerOnboardingStep: step });
    },
  }),
);
