"use client";
import { useCheckoutModalStore } from "@/lib/stores/modals/checkout-modal-store";
import { Drawer, DrawerContent, DrawerPortal } from "@/components/ui/Drawer";
import { XIcon } from "lucide-react";
import { GigPricing } from "@/types/gigWizard.types";

import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

type GigCheckoutModalProps = {
  selectedPackage: GigPricing["packages"][0];
};

type DrawerOrientation = "left" | "right" | "top" | "bottom";

const GigCheckoutModal = ({ selectedPackage }: GigCheckoutModalProps) => {
  const {
    openCheckout,
    setOpenCheckout,
    mobileCheckout,
    setOpenMobileCheckout,
  } = useCheckoutModalStore();
  const [drawerStyling, setDrawerStyling] = useState<string>(
    "h-[100dvh] w-[35dvw]",
  );
  const [drawerOrientation, setDrawerOrientation] =
    useState<DrawerOrientation>("left");

  const handleCheckout = () => {
    setOpenCheckout(false);
    setOpenMobileCheckout(false);
  };

  const isTablet = useMediaQuery({ minWidth: 601, maxWidth: 899 });
  const isMobile = useMediaQuery({ maxWidth: 600 });

  useEffect(() => {
    if (isMobile) {
      setDrawerStyling("h-[100dvh] w-[100dvw]");
      setDrawerOrientation("left");
    } else if (isTablet) {
      setDrawerStyling("h-[80dvh] w-[100dvw]");
      setDrawerOrientation("bottom");
    } else {
      setDrawerStyling("h-[100dvh] w-[35dvw]");
      setDrawerOrientation("left");
    }
  }, [isMobile, isTablet]);
  return (
    <>
      {/* Desktop Checkout Modal */}
      <div className="hidden desktop:block">
        <Drawer
          open={openCheckout}
          dismissible
          onOpenChange={(open) => setOpenCheckout(open)}
          direction={drawerOrientation}
          fixed
        >
          <DrawerPortal>
            <DrawerContent className={drawerStyling}>
              <div className="flex h-full w-full flex-col items-center justify-start  p-4">
                <div className=" flex h-[50px] w-full flex-row items-center justify-between border-b border-t">
                  <h1 className="font-sans text-base font-medium">
                    Checkout do pedido
                  </h1>
                  <XIcon
                    className="transition duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
                    onClick={() => setOpenCheckout(false)}
                  />
                </div>
                <div className="my-4 flex h-[200px] w-full flex-col items-center justify-start gap-6 rounded-lg border-2 border-black p-4">
                  <div className="flex w-full flex-row justify-between  font-mono font-semibold ">
                    <h3 className="w-[55%] text-start  uppercase">
                      {selectedPackage.title}
                    </h3>
                    <span className=" w-[45%] text-end text-lg text-zinc-600 ">
                      {selectedPackage.price}.00 AOA
                    </span>
                  </div>
                  <span>{selectedPackage?.description}</span>
                </div>
                <button
                  className="h-[50px] w-full  rounded-lg border-[#495057] bg-[#7298cd] font-mono text-[#f8f9fa] transition duration-200 ease-in-out hover:scale-105"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
    </>
  );
};

export default GigCheckoutModal;
