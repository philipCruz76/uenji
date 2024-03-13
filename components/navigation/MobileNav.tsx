import { FC, useEffect, useRef } from "react";
import LoggedInMobileNavContent from "./LoggedInMobileNavContent";
import LoggedOutMobileNavContent from "./LoggedOutMobileNavContent";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";

import { Session } from "next-auth";
import { Drawer } from "vaul";

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
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-50 translate-x-0 bg-black bg-opacity-50 desktop:hidden "
            onClickCapture={() => (isClickInsideRef.current = true)}
          />
          <Drawer.Content className="fixed  bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[100dvh] min-h-[100dvh] w-[240px]  flex-col  gap-4  bg-[#f8f9fa]  px-4 py-6   shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 desktop:hidden">
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
