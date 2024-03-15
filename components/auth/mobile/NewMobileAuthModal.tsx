"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/Drawer";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import Image from "next/image";
import MobileAuthInitial from "@/components/auth/mobile/MobileAuthInitial";
import OTPRegistrationForm from "@/components/auth/OTPRegistrationForm";
import EmailRegistrationForm from "@/components/auth/EmailRegistrationForm";

type NewMobileAuthModalProps = {};

const NewMobileAuthModal = ({}: NewMobileAuthModalProps) => {
  let { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();
  const { isOTP, setShowOTP } = useOTPStore();
  return (
    <Drawer
      open={isOpen}
      dismissible
      onOpenChange={(open) => setIsOpen(open)}
      fixed
    >
      <DrawerPortal>
        <DrawerContent className="flex h-[100dvh] w-[100dvw] px-4">
          {/* Close Button*/}
          <div className=" flex items-center justify-end ">
            <button
              className="h-6 w-6 rounded-md p-0"
              onClick={() => {
                setIsOpen(false);
                setShowEmailCredentials(false);
                setShowOTP(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center">
          <Image
            src={"/images/uenji-logo-black.png"}
            alt="Uenji Logo"
            width={200}
            height={200}
          />
          </div>
         
         {/* Modal Content */}
        {!isEmail ? (
          <MobileAuthInitial />
        ) : isOTP ? (
          <OTPRegistrationForm />
        ) : (
          <EmailRegistrationForm />
        )}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default NewMobileAuthModal;