import { lazy } from "react";

const HeroCategoryExpo = lazy(() => import("@/components/HeroCategoryExpo"));
const HeroCategorySlider = lazy(
  () => import("@/components/HeroCategorySlider"),
);
const HeroDesktopOverlay = lazy(
  () => import("@/components/HeroDesktopOverlay"),
);
const HeroEyeCatch = lazy(() => import("@/components/HeroEyeCatch"));
const HeroMobileOverlay = lazy(() => import("@/components/HeroMobileOverlay"));

const Hero = () => {
  return (
    <section>
      <div className="desktop:flex hidden">
        <HeroDesktopOverlay />
      </div>

      <div className="desktop:hidden flex">
        <HeroMobileOverlay />
      </div>
      <HeroCategorySlider />
      <HeroEyeCatch />
      <HeroCategoryExpo />
    </section>
  );
};

export default Hero;
