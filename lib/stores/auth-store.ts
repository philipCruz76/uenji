import { create } from "zustand";

type LogInVariantState = {
  isLogin: "login" | "register";
  setLogin: (login: "login" | "register") => void;
};

export const useLogInVariantStore = create<LogInVariantState>()((set) => ({
  isLogin: "login",
  setLogin: (login: "login" | "register") => set({ isLogin: login }),
}));
