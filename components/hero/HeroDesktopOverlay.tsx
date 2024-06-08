import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import HeroSearchBar from "../search/HeroSearchBar";

const HeroDesktopOverlay = () => {
  const t = useTranslations("HeroSection");
  const keys = ["programming", "photography", "business", "marketing"];
  return (
    <>
      {/*Background Image*/}
      <div className="mt-[40px] flex min-h-[100dvh] min-w-[100dvw] items-end justify-end bg-transparent px-36">
        <Image
          alt="backgroung image"
          src="/images/bg-work-image.png"
          className="relative right-0 flex h-fit w-[fit] justify-end object-fill"
          width={300}
          height={600}
        />
      </div>

      {/*Overlay*/}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.25 }}
        className="z-1 container absolute inset-0 mt-56 flex flex-col items-start justify-start px-6"
      >
        {/*Slogan*/}
        <div className="min-h-[100px] gap-[4px] tablet:w-[440px] tablet:gap-2 desktop:w-[640px] desktop:gap-4">
          <span className="text-3xl font-bold text-black tablet:text-4xl desktop:text-5xl">
            {t("SloganPreFix")}
            <div className="h-[48px] overflow-hidden font-serif text-[42px] font-medium uppercase leading-[48px]">
              <span className="relative animate-rotating-text-desktop text-[#425664]">
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

        {/*Search Bar*/}
        <HeroSearchBar />
      </motion.div>
    </>
  );
};

export default HeroDesktopOverlay;
