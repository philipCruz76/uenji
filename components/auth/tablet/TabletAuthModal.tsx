import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import TabletAuthInitial from "./TabletAuthInitial";
import { cn } from "@/lib/utils";
import EmailRegistrationForm from "../EmailRegistrationForm";
import OTPRegistrationForm from "../OTPRegistrationForm";
import Image from "next/image";

const MobileAuthModal = () => {
  let { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();
  const { isOTP, setShowOTP } = useOTPStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 flex"
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-x-hidden overflow-y-scroll">
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
              <Dialog.Panel className="flex h-[560px] max-w-[400px] transform flex-col items-center overflow-hidden overflow-y-scroll rounded-2xl bg-white px-2 shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className={cn(
                    "relative flex px-8 py-5 text-3xl font-bold",
                    isEmail && "justify-between",
                  )}
                >
                  {/* Title */}
                  <span
                    className={cn(
                      isEmail &&
                        "relative flex w-full items-center  justify-center",
                    )}
                  >
                    <Image
                      src={"/images/uenji-logo-black.png"}
                      alt="Uenji Logo"
                      width={200}
                      height={200}
                    />
                  </span>
                </Dialog.Title>

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
                  <TabletAuthInitial />
                ) : isOTP ? (
                  <OTPRegistrationForm />
                ) : (
                  <EmailRegistrationForm />
                )}

                {/* Footer */}
                <div className="mx-4 mt-12 py-4">
                  <h2 className="text-xs font-normal text-gray-500">
                    Ao aderir, o utilizador concorda com os Termos de Serviço da
                    Uenji e em receber ocasionalmente mensagens de correio
                    eletrónico da nossa parte. Por favor, leia a nossa Política
                    de Privacidade para saber como utilizamos os seus dados
                    pessoais.
                  </h2>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileAuthModal;
