import { footerLinks, languageFilters } from "@/constants";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import Image from "next/image";

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
            {/* Mobile Menu Content */}
            <div className="overflow-y-auto flex-1">
              {/*Join Button*/}
              <AuthModal signIn={false} />

              {/*Nav Links*/}
              <ul className="flex flex-col text-gray-400 text-base font-light py-8 ">
                <AuthModal signIn={true} />

                <Accordion type="multiple">
                  <AccordionItem value="1">
                    <AccordionTrigger className="py-2">
                      <span className="font-light"> Browse Categories</span>
                    </AccordionTrigger>

                    <AccordionContent className="pt-0">
                      <MobileNavLinks links={footerLinks[0].links} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col py-5 gap-4">
                  <span className="text-sm text-black font-semibold">
                    General
                  </span>
                  <div className="w-full h-px bg-slate-200" />
                </div>
                <Link
                  href="/"
                  className="hover:underline"
                  onClick={() => setOpenState(false)}
                >
                  Home
                </Link>

                <Accordion type="multiple">
                  <AccordionItem value="2">
                    <AccordionTrigger className="flex flex-row gap-2 py-2">
                      <span className="font-light">English</span>
                      <Image
                        alt="Language"
                        src="./icons/globe-thin.svg"
                        width={20}
                        height={20}
                      />
                    </AccordionTrigger>

                    <AccordionContent>
                      {languageFilters.map((filter) => (
                        <ul className="flex relative flex-col items-start">
                          <Link
                            href="/"
                            key={filter}
                            className="hover:underline"
                          >
                            {filter}
                          </Link>
                        </ul>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ul>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileNav;
