import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import MobileAuthInitial from "@/components/auth/mobile/MobileAuthInitial";
import EmailRegistrationForm from "@/components/auth/EmailRegistrationForm";
import OTPRegistrationForm from "@/components/auth/OTPRegistrationForm";
import Image from "next/image";

const SmallScreenSignInSheet = () => {
  let { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();
  const { isOTP, setShowOTP } = useOTPStore();

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      enter="transition ease-out duration-450 transform"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transition ease-in duration-0 transform"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
    >
      <Dialog
        as="div"
        className="container fixed bottom-0  left-0 right-0 top-0 z-20 flex flex-col overflow-hidden overflow-y-scroll rounded-2xl border border-white bg-white text-black"
        onClose={() => {
          setIsOpen(false);
          setShowEmailCredentials(false);
          setShowOTP(false);
        }}
      >
        <div className="relative mx-auto flex items-start px-4 py-4  text-3xl font-bold">
          <Image
            src={"/images/uenji-logo-black.png"}
            alt="Uenji Logo"
            width={200}
            height={200}
          />
        </div>
        {/* Close Button*/}
        <div className="absolute right-6 top-6">
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

        {/* Modal Content */}
        {!isEmail ? (
          <MobileAuthInitial />
        ) : isOTP ? (
          <OTPRegistrationForm />
        ) : (
          <EmailRegistrationForm />
        )}
      </Dialog>
    </Transition>
  );
};

export default SmallScreenSignInSheet;
