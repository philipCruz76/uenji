import HeroCategoryExpo from "./HeroCategoryExpo";
import HeroDesktopOverlay from "./HeroDesktopOverlay";
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

      <HeroCategoryExpo />
    </section>
  );
};

export default Hero;
