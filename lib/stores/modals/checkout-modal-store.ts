import { create } from "zustand";

type CheckoutModalState = {
  openCheckout: boolean;
  mobileCheckout: boolean;
  setOpenMobileCheckout: (mobileCheckout: boolean) => void;
  setOpenCheckout: (openCheckout: boolean) => void;
};

export const useCheckoutModalStore = create<CheckoutModalState>()((set) => ({
  openCheckout: false,
  mobileCheckout: false,
  setOpenMobileCheckout: (mobileCheckout: boolean) => set({ mobileCheckout }),
  setOpenCheckout: (openCheckout: boolean) => set({ openCheckout }),
}));
