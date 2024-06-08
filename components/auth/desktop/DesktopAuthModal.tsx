import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import DesktopAuthInitial from "@/components/auth/desktop/DesktopAuthInitial";
import DesktopAuthEmail from "@/components/auth/desktop/DesktopAuthEmail";
import DesktopAuthOTP from "@/components/auth/desktop/DesktopAuthOTP";
import Image from "next/image";

const DesktopAuthModal = () => {
  const { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();
  const { isOTP, setShowOTP } = useOTPStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 flex overflow-y-auto"
        onClose={() => {
          setIsOpen(false);
          setShowEmailCredentials(false);
          setShowOTP(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-50"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center py-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex max-w-[840px] transform flex-row overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <Dialog.Title as="div" className="flex h-[560px] min-w-[370px]">
                  <Image
                    src="/images/deskWork.jpg"
                    alt="Sign-in Modal image"
                    width={700}
                    height={560}
                  />
                </Dialog.Title>
                <div className="w-full px-6">
                  {/* Close Button */}
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
                    <DesktopAuthInitial />
                  ) : isOTP ? (
                    <DesktopAuthOTP />
                  ) : (
                    <DesktopAuthEmail />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DesktopAuthModal;
