import React, { FC, lazy } from "react";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";

const DesktopAuthModal = lazy(
  () => import("@/components/auth/desktop/DesktopAuthModal"),
);
const TabletAuthModal = lazy(
  () => import("@/components/auth/tablet/TabletAuthModal"),
);
const MobileAuthModal = lazy(
  () => import("@/components/auth/mobile/MobileAuthModal"),
);

type JoinButtonProps = {
  isButton?: boolean;
};

const JoinButton: FC<JoinButtonProps> = ({ isButton }) => {
  let { setIsOpen } = useOpenModalStore();
  let { setLogin } = useLogInVariantStore();

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 900 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 899 });

  const isMobile = useMediaQuery({ maxWidth: 599 });
  return (
    <>
      {isButton ? (
        <span
          onClick={() => {
            setIsOpen(true);
            setLogin("register");
          }}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex max-w-[100px] cursor-pointer rounded-lg  border-[#495057] bg-[#495057] text-[#f8f9fa] transition-all duration-150 ease-in hover:scale-110 hover:border-[#495057] hover:bg-[#495057] hover:text-[#f8f9fa]",
          )}
        >
          {" "}
          Aderir{" "}
        </span>
      ) : (
        <span
          onClick={() => {
            setIsOpen(true);
            setLogin("register");
          }}
          className="flex cursor-pointer font-semibold hover:opacity-60"
        >
          {" "}
          Join{" "}
        </span>
      )}

      {/*Desktop Auth Modal*/}

      {isDesktopOrLaptop && <DesktopAuthModal />}

      {/*Tablet Auth Modal*/}

      {isTablet && <TabletAuthModal />}

      {/*Mobile Auth Modal*/}
      {isMobile && <MobileAuthModal />}
    </>
  );
};

export default JoinButton;
