"use client";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";

const SellerCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const { setIsOpen } = useOpenModalStore();
  const { setLogin } = useLogInVariantStore();
  const eyeCatchText = useTranslations("HeroSection.CTA");

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  const transition = {
    duration: 1,
    delay: 0.5,
  };

  useEffect(() => {
    if (isInView) {
      controls.start(variants.visible);
    }
  }, [isInView]);
  return (
    <section className=" flex h-full max-w-full flex-col items-center justify-center gap-6  px-[20px] tablet:py-8 desktop:py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="col-span-3 flex w-full justify-center  font-sans text-3xl font-bold">
          {" "}
          Become a Seller with Uenji today!
        </h1>
        <h3 className="font-sans text-2xl font-semibold">
          It's easy as one, two three!{" "}
        </h3>
      </div>

      <div className="grid grid-cols-1 grid-rows-3 desktop:grid-cols-3 desktop:grid-rows-1 h-full min-w-full  items-center justify-between desktop:gap-12  gap-6 px-12 ">
        <div className="group w-full flex border rounded-md h-fit desktop:w-[250px] flex-col items-center justify-start gap-2  px-2 py-6 m-auto desktop:min-h-[350px]">
          <h3 className="text-center font-sans font-semibold">
            Create a free account
          </h3>

          <Image
            alt="OTP Verification"
            src="/animations/otp-verification.gif"
            width={200}
            height={200}
            className="top-10 desktop:relative"
          />

          <h3 className="relative font-sans font-bold left-[100px] top-[20px] tablet:top-[10px] tablet:left-[170px] desktop:top-[80px] desktop:left-[80px] text-4xl">1</h3>
          <small className="relative top-[65px] hidden text-xs text-gray-500 group-hover:desktop:block">
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
        <div className="group flex border rounded-md h-fit max-h-[280px] w-full desktop:w-[250px] flex-col items-center justify-start  px-2 py-6  m-auto desktop:min-h-[350px]">
          <h3 className="text-center min-w-full font-sans font-semibold">
            Fill-in the details to become a seller
          </h3>
          <Image
            alt="OTP Verification"
            src="/animations/profile-details.gif"
            width={200}
            height={200}
            className="top-4 desktop:relative"
          />
          <h3 className="relative font-sans font-bold top-[-40px] left-[100px] tablet:top-[-20px] tablet:left-[170px] desktop:top-[20px] desktop:left-[80px] text-4xl">2</h3>
          <small className="relative top-[4px] hidden text-xs text-gray-500 group-hover:desktop:block">
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
        <div className="group flex border rounded-md h-fit max-h-[280px] w-full desktop:w-[250px] flex-col items-center justify-start gap-2  px-2 py-6 m-auto desktop:min-h-[350px]">
          <h3 className="text-center font-sans font-semibold">
            Publish your gigs and make money!
          </h3>

          <Image
            alt="Programmer coding"
            src="/animations/payment.gif"
            width={200}
            height={200}
            className="top-4 desktop:relative"
          />
          <h3 className="relative font-sans font-bold top-[-60px] left-[100px] tablet:top-[-40px] tablet:left-[170px] desktop:top-[1px] desktop:left-[80px] text-4xl">3</h3>
          <small className="relative desktop:top-[-22px] hidden text-xs text-gray-500 group-hover:desktop:block">
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
        Start Now!
      </button>
    </section>
  );
};

export default SellerCTA;
