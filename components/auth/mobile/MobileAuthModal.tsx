"use client";
import { Drawer, DrawerContent } from "@/components/ui/Drawer";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import Image from "next/image";
import MobileAuthInitial from "@/components/auth/mobile/MobileAuthInitial";
import OTPRegistrationForm from "@/components/auth/OTPRegistrationForm";
import EmailRegistrationForm from "@/components/auth/EmailRegistrationForm";
import { useEffect, useRef } from "react";

type MobileAuthModalProps = {};

const MobileAuthModal = ({}: MobileAuthModalProps) => {
  let { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();
  const { isOTP, setShowOTP } = useOTPStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      dismissible
      onOpenChange={(open) => setIsOpen(open)}
      fixed
    >
      <DrawerContent
        ref={drawerRef}
        autoFocus
        className="absolute left-0 top-[-14dvh] flex min-h-[100dvh] w-[100dvw] grow px-4 focus:outline-none"
      >
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
        {isEmail === true ? null : (
          <div className="flex items-center justify-center">
            <Image
              src={"/images/uenji-logo-black.png"}
              alt="Uenji Logo"
              width={200}
              height={200}
            />
          </div>
        )}

        {/* Modal Content */}
        {!isEmail ? (
          <MobileAuthInitial />
        ) : isOTP ? (
          <OTPRegistrationForm />
        ) : (
          <EmailRegistrationForm />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileAuthModal;
