import { useState, FC, lazy } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import { useMediaQuery } from "react-responsive";

interface AuthModalProps {
  signIn: boolean;
}

const DesktopAuthModal = lazy(() => import("./DesktopAuthModal"));
const MobileAuthModal = lazy(() => import("./MobileAuthModal"));
const SmallScreenSignInSheet = lazy(() => import("./SmallScreenSignInSheet"));
const SmallScreenJoinSheet = lazy(() => import("./SmallScreenJoinSheet"));

const AuthModal: FC<AuthModalProps> = ({ signIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 900 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 899 });
  const isMobile = useMediaQuery({ maxWidth: 599 });
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {!signIn ? (
        <Link
          href="/"
          onClick={openModal}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {" "}
          Join{" "}
        </Link>
      ) : (
        <Link href="/" onClick={openModal} className="hover:underline">
          {" "}
          Sign in{" "}
        </Link>
      )}

      {/*Desktop Auth Modal*/}

      {isDesktopOrLaptop && (
        <DesktopAuthModal
          opened={isOpen}
          signedIn={signIn}
          setOpenState={setIsOpen}
        />
      )}

      {/*Tablet Auth Modal*/}

      {isTablet && (
        <MobileAuthModal
          opened={isOpen}
          signedIn={signIn}
          setOpenState={setIsOpen}
        />
      )}

      {/*Mobile Auth Modal*/}

      {isMobile && signIn && (
        <SmallScreenSignInSheet openModal={isOpen} setOpenState={setIsOpen} />
      )}

      {isMobile && !signIn && (
        <SmallScreenJoinSheet openModal={isOpen} setOpenState={setIsOpen} />
      )}
    </>
  );
};

export default AuthModal;
