import { MobileNavLinks } from "@/constants";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface MobileNavProps {
  sidebarOpen: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: FC<MobileNavProps> = ({ sidebarOpen, setOpenState }) => {
  
  return (
    <Transition appear show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setOpenState(false)}
        className="lg:hidden flex  fixed  inset-0 z-40 overflow-y-auto"
      >
        <div
          className="lg:hidden fixed z-38 translate-x-0 inset-0 bg-black bg-opacity-50 "
          onClick={() => setOpenState(false)}
        />

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-500 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in duration-200 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="lg:hidden flex flex-col fixed   h-full  min-h-screen  w-72 px-4 py-6 bg-white border-r border-gray-200  z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500">
            {/* Mobile Menu Content */}
            <div className="overflow-y-auto flex-1">
              {/*Join Button*/}
              <AuthModal signIn={false} />

              {/*Nav Links*/}
              <ul className="flex flex-col text-gray-400 text-base font-light py-8 gap-[20px]">
                <AuthModal signIn={true} />

                {MobileNavLinks.map((link) => (
                  <Link href={link.href} key={link.key}>
                    {link.text}
                  </Link>
                ))}
              </ul>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileNav;
