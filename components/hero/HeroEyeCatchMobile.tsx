import { useTranslations } from "next-intl";
import Image from "next/image";

const HeroEyeCatchMobile = () => {
  const eyeCatchText = useTranslations("HeroSection.CTA");
  return (
    <section className="grip-rows-2 grid h-full max-w-full rounded-md border bg-[#f8f9fa] px-[20px] py-8 tablet:py-14 desktop:grid-cols-2 desktop:py-24">
      <div className="flex flex-wrap items-center text-[#000000]">
        <div className="flex flex-col">
          {/*Title*/}
          <h2 className="flex text-2xl font-bold tablet:text-3xl">
            {eyeCatchText("titlePrefix")} <br /> {eyeCatchText("titleSuffix")}
          </h2>

          {/* Selling Proposition*/}
          <ul className="flex max-w-[100dvw] flex-row flex-wrap items-start justify-start gap-4 py-6 pr-6 text-start">
            <li>
              <h6 className="flex flex-row gap-2 text-base font-semibold tablet:text-lg">
                <span className="h-[24px] w-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                {eyeCatchText("tagline1.title")}
              </h6>
              <span className="text-base text-[#0b4141] tablet:text-lg">
                {eyeCatchText("tagline1.text")}
              </span>
            </li>

            <li>
              <h6 className="flex flex-row gap-2 text-base font-semibold tablet:text-lg">
                <span className="h-[24px] w-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                {eyeCatchText("tagline2.title")}
              </h6>
              <span className="text-base text-[#0b4141] tablet:text-lg">
                {eyeCatchText("tagline2.text")}
              </span>
            </li>

            <li>
              <h6 className="flex flex-row gap-2 text-base font-semibold tablet:text-lg">
                <span className="h-[24px] w-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                {eyeCatchText("tagline3.title")}
              </h6>
              <span className="text-base text-[#0b4141] tablet:text-lg">
                {eyeCatchText("tagline3.text")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Demo Video*/}
      <div className="box-border flex min-w-full">
        <video controls muted className="box-content flex min-w-full">
          <source
            src="https://res.cloudinary.com/dqe71igxe/video/upload/f_auto:video,q_auto/v1/videos/WorkingStockVideo"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
};

export default HeroEyeCatchMobile;
