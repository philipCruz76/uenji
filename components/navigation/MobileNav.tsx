import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import LoggedInMobileNavContent from "./LoggedInMobileNavContent";
import LoggedOutMobileNavContent from "./LoggedOutMobileNavContent";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";

const MobileNav = () => {
  const session = useSession();
  let { mobileNav, setMobileNav } = useOpenMobileNavStore();
  const isClickInsideRef = useRef(false);

  useEffect(() => {
    const handleClick = () => {
      if (isClickInsideRef.current) setMobileNav(false);
      isClickInsideRef.current = false;
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <Transition appear show={mobileNav} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setMobileNav(false)}
        className="lg:hidden flex  fixed  inset-0 z-40 "
      >
        <div
          className="lg:hidden fixed translate-x-0 inset-0 bg-black bg-opacity-50 "
          onClickCapture={() => (isClickInsideRef.current = true)}
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
          <Dialog.Panel className="lg:hidden flex flex-col fixed   h-full  min-h-screen  w-[270px] px-4 py-6 bg-white border-r border-gray-200  z-50 gap-4 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500">
            {session.status === "authenticated" ? (
              <LoggedInMobileNavContent />
            ) : (
              <LoggedOutMobileNavContent />
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileNav;
