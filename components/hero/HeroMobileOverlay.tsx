import MobileSearchBar from "../search/MobileSearchBar";
import { useTranslations } from "next-intl";

const HeroMobileOverlay = () => {
  const t = useTranslations("HeroSection");
  const keys = ["programming", "photography", "business", "marketing"];

  return (
    <div className="flex h-[620px] w-full flex-col items-center justify-center bg-[#f8f9fa] px-4">
      {/*Slogan*/}
      <div className="w-full max-w-[440px] py-6">
        <div className="flex gap-[4px] tablet:gap-2 desktop:gap-4">
          <span className=" text-3xl font-bold text-black ">
            {t("SloganPreFix")}
            <div className="h-[38px] overflow-hidden  font-serif text-[32px] font-medium  leading-[38px]">
              <span className="relative animate-rotating-text-mobile text-black">
                {keys.map((key) => (
                  <i key={key}>
                    {t(`SloganCategories.${key}`)}
                    <br />
                  </i>
                ))}
              </span>
            </div>
            {t("SloganSuffix")}
          </span>
        </div>
      </div>

      {/*Search Bar*/}
      <MobileSearchBar />
    </div>
  );
};

export default HeroMobileOverlay;
