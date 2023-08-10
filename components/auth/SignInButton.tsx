import Link from "next/link";
import React, { lazy } from "react";
import { useOpenModalStore } from "@/lib/stores/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { useMediaQuery } from "react-responsive";

const DesktopAuthModal = lazy(() => import("./DesktopAuthModal"));
const MobileAuthModal = lazy(() => import("./MobileAuthModal"));
const SmallScreenJoinSheet = lazy(() => import("./SmallScreenJoinSheet"));

const SignInButton = () => {
  let { setIsOpen } = useOpenModalStore();
  let { setLogin } = useLogInVariantStore();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 900 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 899 });
  const isMobile = useMediaQuery({ maxWidth: 599 });
  return (
    <>
      <Link
        href="/"
        onClick={() => {
          setIsOpen(true);
          setLogin("login");
        }}
        className="hover:underline"
      >
        {" "}
        Sign in{" "}
      </Link>

      {/*Desktop Auth Modal*/}

      {isDesktopOrLaptop && <DesktopAuthModal />}

      {/*Tablet Auth Modal*/}

      {isTablet && <MobileAuthModal />}

      {/*Mobile Auth Modal*/}
      {isMobile && <SmallScreenJoinSheet />}
    </>
  );
};

export default SignInButton;
