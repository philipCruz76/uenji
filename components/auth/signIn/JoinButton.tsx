import React, { FC, lazy } from "react";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { useOpenModalStore } from "@/lib/stores/modal-store";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";

const DesktopAuthModal = lazy(() => import("../desktop/DesktopAuthModal"));
const TabletAuthModal = lazy(() => import("../tablet/TabletAuthModal"));
const MobileAuthModal = lazy(() => import("../mobile/MobileAuthModal"));

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
            "flex hover:bg-amber-600 hover:border-amber-600 max-w-[80px] cursor-pointer",
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

      {isTablet && <TabletAuthModal />}

      {/*Mobile Auth Modal*/}
      {isMobile && <MobileAuthModal />}
    </>
  );
};

export default JoinButton;
