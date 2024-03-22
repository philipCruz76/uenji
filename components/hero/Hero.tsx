"use client";
import { useActiveNavBarStore } from "@/lib/stores/navbar-store";
import { useSession } from "next-auth/react";
import { lazy, useEffect } from "react";

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
      <div className="hidden desktop:flex">
        <HeroDesktopOverlay />
      </div>

      <div className="flex desktop:hidden">
        <HeroMobileOverlay />
      </div>

      <HeroCategorySlider />

      <div className="w-full px-[20px]">
        <HeroEyeCatch />
      </div>
      <HeroCategoryExpo />
    </section>
  );
};

export default Hero;
