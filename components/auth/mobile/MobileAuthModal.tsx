import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modal-store";
import MobileAuthInitial from "./MobileAuthInitial";
import EmailRegistrationForm from "../EmailRegistrationForm";
import OTPRegistrationForm from "../OTPRegistrationForm";

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
        className="container flex flex-col  overflow-hidden fixed top-0 left-0 right-0 bottom-0 z-20 border text-black border-white bg-white rounded-2xl overflow-y-scroll"
        onClose={() => {
          setIsOpen(false);
          setShowEmailCredentials(false);
          setShowOTP(false);
        }}
      >
        <div className="flex relative items-start mx-auto px-4 py-4  font-bold text-3xl">
          Uenji
        </div>
        {/* Close Button*/}
        <div className="absolute top-6 right-6">
          <button
            className="h-6 p-0 w-6 rounded-md"
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
              className="w-6 h-6"
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
