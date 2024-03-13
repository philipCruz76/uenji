import { create } from "zustand";

type OpenModalState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useOpenModalStore = create<OpenModalState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

type EmailCredentialsState = {
  isEmail: boolean;
  setShowEmailCredentials: (isEmail: boolean) => void;
};

export const useEmailCredentialsStore = create<EmailCredentialsState>()(
  (set) => ({
    isEmail: false,
    setShowEmailCredentials: (isEmail: boolean) => set({ isEmail }),
  }),
);

type OTPState = {
  isOTP: boolean;
  setShowOTP: (isOTP: boolean) => void;
};

export const useOTPStore = create<OTPState>()((set) => ({
  isOTP: false,
  setShowOTP: (isOTP: boolean) => set({ isOTP }),
}));
