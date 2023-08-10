import { create } from "zustand";

type OpenModalState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useOpenModalStore = create<OpenModalState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
