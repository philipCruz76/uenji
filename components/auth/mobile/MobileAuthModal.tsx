import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  useEmailCredentialsStore,
  useOpenModalStore,
} from "@/lib/stores/modal-store";
import MobileAuthInitial from "./MobileAuthInitial";
import MobileAuthEmail from "./MobileAuthEmail";

const SmallScreenSignInSheet = () => {
  let { isOpen, setIsOpen } = useOpenModalStore();
  const { isEmail, setShowEmailCredentials } = useEmailCredentialsStore();

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
        onClose={() => setIsOpen(false)}
      >
        {/* Back Button */}
        {isEmail && (
          <div
            className="flex flex-row items-center justify-center absolute top-6 left-8 cursor-pointer"
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
        {!isEmail ? <MobileAuthInitial /> : <MobileAuthEmail />}
      </Dialog>
    </Transition>
  );
};

export default SmallScreenSignInSheet;
