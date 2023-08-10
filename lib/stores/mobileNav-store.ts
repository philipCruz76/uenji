import { create } from "zustand";

type MobileNavState = {
  mobileNav: boolean;
  setMobileNav: (isOpen: boolean) => void;
};

export const useOpenMobileNavStore = create<MobileNavState>()((set) => ({
  mobileNav: false,
  setMobileNav: (mobileNav: boolean) => set({ mobileNav }),
}));
