import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
          className=" relative right-0 flex h-fit w-[fit] justify-end object-fill"
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
        className="z-1 container absolute inset-0 mt-56 flex flex-col items-start justify-start px-6 "
      >
        {/*Slogan*/}
        <div className=" min-h-[100px] gap-[4px] tablet:w-[440px] tablet:gap-2 desktop:w-[640px] desktop:gap-4">
          <span className="text-3xl font-bold text-black tablet:text-4xl desktop:text-5xl ">
            {t("SloganPreFix")}
            <div className="h-[48px] overflow-hidden  font-serif text-[42px] font-medium uppercase  leading-[48px]">
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
        <div className="flex py-2 tablet:w-[500px] desktop:w-[600px] desktop:py-6">
          <input
            type="text"
            placeholder={t("SearchPlaceholder")}
            className="h-12 rounded-l-md border-2 border-slate-600 bg-white px-5 text-sm text-black focus:border-slate-500 focus:outline-none desktop:w-[600px]"
          />
          <button
            type="submit"
            className="flex  w-[50px] items-center justify-between rounded-r-md border-black bg-black text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-16 0 50 24"
              strokeWidth="1.5"
              stroke="white"
              className="flex h-12 w-10 items-center justify-between"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default HeroDesktopOverlay;
