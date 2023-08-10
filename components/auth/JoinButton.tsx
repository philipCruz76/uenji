import React, { FC, lazy } from "react";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { useOpenModalStore } from "@/lib/stores/modal-store";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";

const DesktopAuthModal = lazy(() => import("./DesktopAuthModal"));
const MobileAuthModal = lazy(() => import("./MobileAuthModal"));
const SmallScreenSignInSheet = lazy(() => import("./SmallScreenSignInSheet"));

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
            "flex hover:bg-sky-600 hover:border-sky-600 max-w-[80px]",
          )}
        >
          {" "}
          Join{" "}
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

      {isTablet && <MobileAuthModal />}

      {/*Mobile Auth Modal*/}
      {isMobile && <SmallScreenSignInSheet />}
    </>
  );
};

export default JoinButton;
