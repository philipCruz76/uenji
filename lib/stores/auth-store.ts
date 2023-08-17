import { create } from "zustand";

type LogInVariantState = {
  isLogin: "login" | "register";
  setLogin: (login: "login" | "register") => void;
};

export const useLogInVariantStore = create<LogInVariantState>()((set) => ({
  isLogin: "login",
  setLogin: (login: "login" | "register") => set({ isLogin: login }),
}));

type NewUserCredentials = {
  email: string;
  password: string;
};

type NewUserState = {
  newUser: NewUserCredentials;
  setNewUser: (newUser: NewUserCredentials) => void;
};

export const useNewUserStore = create<NewUserState>()((set) => ({
  newUser: {
    email: "",
    password: "",
  },
  setNewUser: (newUser: NewUserCredentials) => set({ newUser }),
}));
