import { create } from "zustand";

type ActiveNavBarStore = {
  isActiveNavBar: boolean;
  activeBarStyling: string;
  inactiveBarStyling: string;
  setActiveNavBar: (isOpen: boolean) => void;
  setActiveBarStyling: (activeBarStyling: string) => void;
};

export const useActiveNavBarStore = create<ActiveNavBarStore>()((set) => ({
  isActiveNavBar: true,
  activeBarStyling:
    " top-0 z-10 flex  max-w-[100dvw] w-[100dvw] px-4 py-4 bg-[#f8f9fa] text-black shadow-md transition duration-500 ease-in-out",
  inactiveBarStyling:
    " fixed top-0 z-10 flex max-w-[100dvw] w-[100dvw]  px-4 py-4 bg-transparent text-black transition duration-500 ease-in-out",
  setActiveNavBar: (isActiveNavBar: boolean) => set({ isActiveNavBar }),
  setActiveBarStyling: (activeBarStyling: string) => set({ activeBarStyling }),
}));
