"use client";
import { buttonVariants } from "@/constants/ui/button";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { useCheckoutModalStore } from "@/lib/stores/modals/checkout-modal-store";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

type GigPackageCheckoutButtonProps = {
  gigUser: string;
};

const GigPackageCheckoutButton = ({
  gigUser,
}: GigPackageCheckoutButtonProps) => {
  const { setIsOpen } = useOpenModalStore();
  const { setOpenCheckout, setOpenMobileCheckout } = useCheckoutModalStore();
  const currentUser = useCurrentUser();
  const t = useTranslations("Gigs.desktopPage");
  const openCheckoutModal = (mobile: boolean) => {
    if (!currentUser) {
      setIsOpen(true);
      return null;
    }
    if (currentUser?.username === gigUser) {
      toast.error("You can't purchase your own gig!");
      return null;
    }
    {
      mobile ? setOpenMobileCheckout(true) : setOpenCheckout(true);
    }
  };
  return (
    <>
      <button
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          " inline cursor-pointer border-[#495057] bg-[#dee2e6] text-base font-semibold transition duration-200 ease-in-out hover:scale-105 hover:border-[#495057] hover:bg-[#dee2e6] hover:bg-opacity-75",
        )}
        onClick={() => openCheckoutModal(false)}
      >
        {t("choosePackage")}
      </button>
    </>
  );
};

export default GigPackageCheckoutButton;
