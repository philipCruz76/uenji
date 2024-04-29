"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";

const SellerCTA = () => {
  const { setIsOpen } = useOpenModalStore();
  const { setLogin } = useLogInVariantStore();
  const sellerCTAText = useTranslations("HeroSection.SellerCTA");

  return (
    <section className=" flex h-full max-w-full flex-col items-center justify-center gap-6  px-[20px] tablet:py-8 desktop:py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="col-span-3 flex w-full justify-center  font-sans text-3xl font-bold">
          {sellerCTAText("heading")}
        </h1>
        <h3 className="font-sans text-2xl font-semibold">
          {sellerCTAText("subheading")}
        </h3>
      </div>

      <div className="grid h-full min-w-full grid-cols-1 grid-rows-3 items-center justify-between  gap-6 px-12 desktop:grid-cols-3  desktop:grid-rows-1 desktop:gap-12 ">
        <div className="group relative m-auto flex h-fit w-full flex-col items-center justify-start gap-2 rounded-md border  px-2 py-6 desktop:min-h-[350px] desktop:w-[250px]">
          <h3 className="text-center font-sans font-semibold">
            {sellerCTAText("step1")}
          </h3>

          <Image
            alt="OTP Verification"
            unoptimized
            src="/animations/otp-verification.gif"
            width={200}
            height={200}
            className="top-[24%] desktop:absolute"
          />

          <h3 className="absolute left-[90%] top-[80%] font-sans text-4xl font-bold desktop:left-[80%] desktop:top-[85%]">
            1
          </h3>
          <small className="absolute top-[92%] hidden text-xs text-gray-500 group-hover:desktop:block">
            Illustration by{" "}
            <a
              className="underline"
              href="https://icons8.com/illustrations/author/VKgWUPlqQ7Ea"
            >
              AlexManokhi
            </a>{" "}
            from{" "}
            <a className="underline" href="https://icons8.com/illustrations">
              Ouch!
            </a>
          </small>
        </div>
        <div className="group relative m-auto flex h-fit max-h-[280px] w-full flex-col items-center justify-start rounded-md border  px-2 py-6  desktop:min-h-[350px] desktop:w-[250px]">
          <h3 className="min-w-full text-center font-sans font-semibold">
            {sellerCTAText("step2")}
          </h3>
          <Image
            alt="OTP Verification"
            unoptimized
            src="/animations/profile-details.gif"
            width={200}
            height={200}
            className=" top-[24%] desktop:absolute"
          />
          <h3 className="absolute left-[88%] top-[83%] font-sans text-4xl font-bold desktop:left-[80%]">
            2
          </h3>
          <small className="absolute top-[92%] hidden text-xs text-gray-500 group-hover:desktop:block">
            Illustration by{" "}
            <a
              className="underline"
              href="https://icons8.com/illustrations/author/HxMFjfKZdNq2"
            >
              Rosina Gavrilash
            </a>{" "}
            from{" "}
            <a className="underline" href="https://icons8.com/illustrations">
              Ouch!
            </a>
          </small>
        </div>
        <div className="group relative m-auto flex h-fit max-h-[280px] w-full flex-col items-center justify-start gap-2 rounded-md border  px-2 py-6 desktop:min-h-[350px] desktop:w-[250px]">
          <h3 className="text-center font-sans font-semibold">
            {sellerCTAText("step3")}
          </h3>

          <Image
            alt="Programmer coding"
            unoptimized
            src="/animations/payment.gif"
            width={200}
            height={200}
            className="top-[20%] desktop:absolute"
          />
          <h3 className="absolute left-[88%] top-[83%] font-sans text-4xl font-bold desktop:left-[80%]">
            3
          </h3>
          <small className="absolute top-[92%] hidden text-xs text-gray-500 group-hover:desktop:block">
            Illustration by{" "}
            <a
              className="underline"
              href="https://icons8.com/illustrations/author/HxMFjfKZdNq2"
            >
              Rosina Gavrilash
            </a>{" "}
            from{" "}
            <a className="underline" href="https://icons8.com/illustrations">
              Ouch!
            </a>
          </small>
        </div>
      </div>
      <button
        onClick={() => {
          setLogin("register");
          setIsOpen(true);
        }}
        className="flex h-[60px] w-[200px] items-center justify-center rounded-xl border bg-[#495057] font-mono text-lg font-bold text-[#f8f9fa] shadow-md transition duration-300 hover:scale-110"
      >
        {sellerCTAText("button")}
      </button>
    </section>
  );
};

export default SellerCTA;
