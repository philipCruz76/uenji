"use client";

import { GigPricing } from "@/types/gigWizard.types";
import toast from "react-hot-toast";

type CheckoutButtonProps = {
  gigId: string | undefined;
  packageIdx: number;
  selectedPackage?: GigPricing["packages"][0];
};

const CheckoutButton = ({ gigId, packageIdx }: CheckoutButtonProps) => {
  const onCheckout = async () => {
    try {
      const response = await fetch(
        `/api/stripe?gigId=${gigId}&gigPackage=${packageIdx}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json());

      window.location.href = response.url;
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <button
      onClick={onCheckout}
      className="h-[50px] w-full rounded-lg border-[#495057] bg-[#7298cd] font-mono text-[#f8f9fa] transition duration-200 ease-in-out hover:scale-105"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
