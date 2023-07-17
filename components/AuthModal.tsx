import { useState, FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import DesktopAuthModal from "./DesktopAuthModal";
import MobileAuthModal from "./MobileAuthModal";
import SmallScreenJoinSheet from "./SmallScreenJoinSheet";
import SmallScreenSignInSheet from "./SmallScreenSignInSheet";

interface AuthModalProps {
  signIn: boolean;
}

const AuthModal: FC<AuthModalProps> = ({ signIn }) => {

  const [isOpen, setIsOpen] = useState(false);

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
      <div className="hidden desktop:flex">
        <DesktopAuthModal
          opened={isOpen}
          signedIn={signIn}
          setOpenState={setIsOpen}
        />
      </div>

      {/*Tablet Auth Modal*/}
      <div className="desktop:hidden tablet:flex hidden">
        <MobileAuthModal
          opened={isOpen}
          signedIn={signIn}
          setOpenState={setIsOpen}
        />
      </div>


      {/*Mobile Auth Modal*/}
      <div className="tablet:hidden flex ">
        {signIn && (
          <SmallScreenSignInSheet openModal={isOpen} setOpenState={setIsOpen} />
        )}

        {!signIn && (
          <SmallScreenJoinSheet openModal={isOpen} setOpenState={setIsOpen} />
        )}
      </div>

    </>
  );
};

export default AuthModal;
