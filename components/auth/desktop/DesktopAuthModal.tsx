import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useEmailCredentialsStore,
  useOpenModalStore,
} from "@/lib/stores/modal-store";
import DesktopAuthInitial from "./DesktopAuthInitial";
import DesktopAuthEmail from "./DesktopAuthEmail";

const DesktopAuthModal = () => {
  const { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed flex inset-0 z-10 overflow-y-auto"
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
              <Dialog.Panel className="flex flex-row max-w-[840px] transform overflow-hidden rounded-2xl bg-white  shadow-xl transition-all">
                <Dialog.Title as="div" className="flex h-[560px] ">
                  <img src="./deskWork.jpg" alt="" />
                </Dialog.Title>
                <div className="p-6">
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
                  {!isEmail ? <DesktopAuthInitial /> : <DesktopAuthEmail />}
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
