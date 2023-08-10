import React, { lazy } from "react";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { useOpenModalStore } from "@/lib/stores/modal-store";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";

const DesktopAuthModal = lazy(() => import("./DesktopAuthModal"));
const MobileAuthModal = lazy(() => import("./MobileAuthModal"));
const SmallScreenJoinSheet = lazy(() => import("./SmallScreenJoinSheet"));

const JoinButton = () => {
  let { setIsOpen } = useOpenModalStore();
  let { setLogin } = useLogInVariantStore();

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 900 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 899 });

  const isMobile = useMediaQuery({ maxWidth: 599 });
  return (
    <>
      <span
        onClick={() => {
          setIsOpen(true);
          setLogin("register");
        }}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "hidden tablet:flex hover:bg-sky-600 hover:border-sky-600",
        )}
      >
        {" "}
        Join{" "}
      </span>
      <span
        onClick={() => {
          setIsOpen(true);
          setLogin("register");
        }}
        className="tablet:hidden flex cursor-pointer font-semibold hover:opacity-60"
      >
        {" "}
        Join{" "}
      </span>
      {/*Desktop Auth Modal*/}

      {isDesktopOrLaptop && <DesktopAuthModal />}

      {/*Tablet Auth Modal*/}

      {isTablet && <MobileAuthModal />}

      {/*Mobile Auth Modal*/}
      {isMobile && <SmallScreenJoinSheet />}
    </>
  );
};

export default JoinButton;
