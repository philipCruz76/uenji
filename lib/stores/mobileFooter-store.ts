import { create } from "zustand";

type MobileFooterStore = {
  mobileFooterStyling: string;
  setMobileFooterStyling: (activeBarStyling: string) => void;
};

export const useMobileFooterStore = create<MobileFooterStore>()((set) => ({
  mobileFooterStyling: "flex w-full flex-col bg-slate-50 px-6 py-6",
  setMobileFooterStyling: (mobileFooterStyling: string) =>
    set({ mobileFooterStyling }),
}));
