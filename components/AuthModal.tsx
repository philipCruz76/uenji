import { useState, FC, use } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import { useMediaQuery } from "react-responsive";
import DesktopAuthModal from "./DesktopAuthModal";
import MobileAuthModal from "./MobileAuthModal";
import SmallScreenJoinSheet from "./SmallScreenJoinSheet";
import SmallScreenSignInSheet from "./SmallScreenSignInSheet";

interface AuthModalProps {
  signIn: boolean;
}

const AuthModal: FC<AuthModalProps> = ({ signIn }) => {

  const [isOpen, setIsOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({ minWidth:900 });
  const isTablet = useMediaQuery({minWidth: 600, maxWidth: 899})
  const isMobile = useMediaQuery({maxWidth: 599})
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {!signIn ? (
        <Link
          href="/"
          onClick={openModal}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          {" "}Join{" "}
        </Link>
      ) : (
        <Link href="/" onClick={openModal}>
          {" "}Sign in{" "}
        </Link>
      )}

      {/*Desktop Auth Modal*/}

      {isDesktopOrLaptop && <DesktopAuthModal
        opened={isOpen}
        signedIn={signIn}
        setOpenState={setIsOpen}
      />}


      {/*Tablet Auth Modal*/}

      {isTablet && <MobileAuthModal
        opened={isOpen}
        signedIn={signIn}
        setOpenState={setIsOpen} />}



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
