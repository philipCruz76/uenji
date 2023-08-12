import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useEmailCredentialsStore,
  useOpenModalStore,
} from "@/lib/stores/modal-store";
import TabletAuthInitial from "./TabletAuthInitial";
import TabletAuthEmail from "./TabletAuthEmail";
import { cn } from "@/lib/utils";

const MobileAuthModal = () => {
  let { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed flex inset-0 z-10 "
        onClose={() => setIsOpen(false)}
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
        <div className="fixed inset-0 overflow-y-scroll">
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
              <Dialog.Panel className="flex flex-col max-w-[400px] transform overflow-y-scroll rounded-2xl bg-white shadow-xl transition-all h-[560px] px-2">
                <Dialog.Title
                  as="div"
                  className={cn(
                    "flex relative px-8 py-5 font-bold text-3xl",
                    isEmail && "justify-between",
                  )}
                >
                  {/* Back Button */}
                  {isEmail && (
                    <div
                      className="flex flex-row items-center justify-center absolute top-6 left-2 cursor-pointer"
                      onClick={() => setShowEmailCredentials(false)}
                    >
                      <button className="h-6 p-0 w-6 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M220,128a4,4,0,0,1-4,4H49.66l65.17,65.17a4,4,0,0,1-5.66,5.66l-72-72a4,4,0,0,1,0-5.66l72-72a4,4,0,0,1,5.66,5.66L49.66,124H216A4,4,0,0,1,220,128Z"></path>
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Title */}
                  <span
                    className={cn(
                      isEmail &&
                        "flex w-full relative items-center  justify-center text-center",
                    )}
                  >
                    Uenji
                  </span>
                </Dialog.Title>

                {/* Close Button */}
                <div className="absolute top-6 right-6">
                  <button
                    className="h-6 p-0 w-6 rounded-md"
                    onClick={() => {
                      setIsOpen(false);
                      setShowEmailCredentials(false);
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
                {!isEmail ? <TabletAuthInitial /> : <TabletAuthEmail />}

                {/* Footer */}
                <div className="mx-4 py-4 mt-12">
                  <h2 className="text-xs font-normal text-gray-500">
                    By joining, you agree to the Uenji Terms of Service and to
                    occasionally receive emails from us. Please read our Privacy
                    Policy to learn how we use your personal data.
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
