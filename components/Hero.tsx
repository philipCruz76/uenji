import HeroCategoryExpo from "./HeroCategoryExpo";
import HeroCategorySlider from "./HeroCategorySlider";
import HeroDesktopOverlay from "./HeroDesktopOverlay";
import HeroEyeCatch from "./HeroEyeCatch";
import HeroMobileOverlay from "./HeroMobileOverlay";

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
