import { FC, useEffect, useRef } from "react";
import LoggedInMobileNavContent from "./LoggedInMobileNavContent";
import LoggedOutMobileNavContent from "./LoggedOutMobileNavContent";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import { Drawer } from "vaul";
import { Session } from "next-auth";

type MobileNavProps = {
  session: Session | null;
};
const MobileNav: FC<MobileNavProps> = ({ session }) => {
  let { mobileNav, setMobileNav } = useOpenMobileNavStore();
  const isClickInsideRef = useRef(false);

  useEffect(() => {
    const handleClick = () => {
      if (isClickInsideRef.current) setMobileNav(false);
      isClickInsideRef.current = false;
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Drawer.Root open={mobileNav} dismissible={false}>
        <Drawer.Trigger asChild onClick={() => setMobileNav(true)}>
          <button className="flex items-center py-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </Drawer.Trigger>
        <Drawer.Portal className="lg:hidden flex  fixed  inset-0">
          <Drawer.Overlay
            className="lg:hidden fixed z-50 translate-x-0 inset-0 bg-black bg-opacity-50 "
            onClickCapture={() => (isClickInsideRef.current = true)}
          />
          <Drawer.Content className="bg-white  mt-24 z-50 bottom-0 left-0 right-0 lg:hidden flex flex-col fixed  max-h-[100dvh]  min-h-[100dvh]  w-[240px] px-4 py-6  border-r border-gray-200   gap-4 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500">
            {session ? (
              <LoggedInMobileNavContent />
            ) : (
              <LoggedOutMobileNavContent />
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default MobileNav;
