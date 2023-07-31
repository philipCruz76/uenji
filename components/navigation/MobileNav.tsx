import { footerLinks, languageFilters } from "@/constants";
import Link from "next/link";
import AuthModal from "../auth/AuthModal";
import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { UserAvatar } from "../users/UserAvatar";
import LoggedInMobileNavContent from "./LoggedInMobileNavContent";
import LoggedOutMobileNavContent from "./LoggedOutMobileNavContent";

interface MobileNavProps {
  sidebarOpen: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavLinks = ({ links }: { links: string[] }) => (
  <ul className="flex flex-col items-start">
    {links.map((link) => (
      <Link href="/" key={link} className="hover:underline">
        {link}
      </Link>
    ))}
  </ul>
);

const MobileNav: FC<MobileNavProps> = ({ sidebarOpen, setOpenState }) => {
  const session = useSession();

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
