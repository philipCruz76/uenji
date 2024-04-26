"use client";
import { useActiveNavBarStore } from "@/lib/stores/navbar-store";
import { useSession } from "next-auth/react";
import { lazy, useEffect } from "react";
import HeroEyeCatchMobile from "./HeroEyeCatchMobile";
import SellerCTA from "./SellerCTA";

const HeroCategoryExpo = lazy(
  () => import("@/components/hero/HeroCategoryExpo"),
);
const HeroCategorySlider = lazy(
  () => import("@/components/hero/HeroCategorySlider"),
);
const HeroDesktopOverlay = lazy(
  () => import("@/components/hero/HeroDesktopOverlay"),
);
const HeroEyeCatch = lazy(() => import("@/components/hero/HeroEyeCatch"));
const HeroMobileOverlay = lazy(
  () => import("@/components/hero/HeroMobileOverlay"),
);

const Hero = () => {
  const { setActiveNavBar, setActiveBarStyling, activeBarStyling } =
    useActiveNavBarStore();
  const { data: userLogged } = useSession();

  useEffect(() => {
    setActiveNavBar(false);
    setActiveBarStyling(activeBarStyling + " fixed");
    const changeBackground = () => {
      if (window.scrollY >= 60) {
        setActiveNavBar(true);
      } else {
        setActiveNavBar(false);
      }
    };

    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
      setActiveNavBar(true);
      setActiveBarStyling(activeBarStyling.replace(/\bfixed\b/, ""));
    };
  }, [userLogged]);

  return (
    <section className="max-w-[100dvw] overflow-hidden">
      <div className="hidden border-b desktop:flex">
        <HeroDesktopOverlay />
      </div>

      <div className="flex desktop:hidden">
        <HeroMobileOverlay />
      </div>

      <div className="w-full py-8">
        <HeroCategorySlider />
      </div>
      <div className="hidden w-full px-[20px] desktop:block">
        <HeroEyeCatch />
      </div>

      <div className="block w-full px-[20px] desktop:hidden">
        <HeroEyeCatchMobile />
      </div>
      <HeroCategoryExpo />

      <div className="block px-[20px] pb-24">
        <SellerCTA />
      </div>
    </section>
  );
};

export default Hero;
