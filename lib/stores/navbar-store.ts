import { create } from "zustand";

type ActiveNavBarState = {
  isActiveNavBar: boolean;
  setActiveNavBar: (isOpen: boolean) => void;
};

export const useActiveNavBarStore = create<ActiveNavBarState>()((set) => ({
  isActiveNavBar: false,
  setActiveNavBar: (isActiveNavBar: boolean) => set({ isActiveNavBar }),
}));
