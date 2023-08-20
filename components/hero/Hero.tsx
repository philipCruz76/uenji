import { lazy } from "react";

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
  return (
    <section className="overflow-x-hidden">
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
