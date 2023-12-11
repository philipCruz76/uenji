import { sellerOnBoardingDos } from "@/constants/sellerOnBoarding";
import { buttonVariants } from "@/constants/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="flex container py-8 max-w-screen min-h-screen overflow-y-scroll">
      <div className="flex flex-col-reverse desktop:flex-row-reverse w-full h-full items-center justify-between  tablet:pl-[25px] ">
        <div className="flex container flex-col max-w-[900px] h-full tablet:px-[60px] items-start justify-center">
          <h1 className="flex text-[#303030] font-bold box-border tablet:max-w-[590px] tablet:pr-[80px] text-2xl pb-[20px]">
            {" "}
            O que caracteriza um perfil Uenji bem-sucedido?
          </h1>
          <h3 className="text-sm text-gray-600 ">
            A sua primeira impressão é fundamental! Crie um perfil que se
            destaque da multidão no Uenji.
          </h3>
          <ul className="grid desktop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 min-h-[310px] box-border  max-w-full  pt-[42px]  justify-between">
            {sellerOnBoardingDos.map((item) => (
              <li
                key={item.key}
                className="tablet:px-2 justify-center max-w-[270px] pb-[40px]"
              >
                <Image alt={item.key} src={item.icon} width={43} height={43} />
                <p className="text-gray-600 text-sm text-justify">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 tablet:grid-cols-2 grid-rows-1 gap-4 tablet:justify-start items-center w-full justify-center">
            <Link
              href="/freelancer_onboarding/overview/dont"
              className={cn(
                buttonVariants({ variant: "default" }),
                "text-center bg-sky-500 tablet:w-[160px] w-full text-white"
              )}
            >
              Continuar
            </Link>
            <Link
              href="/freelancer_onboarding/overview"
              className="underline text-blue-700 text-center tablet:text-start"
            >
              {" "}
              Voltar
            </Link>
          </div>
        </div>
        <div className="hidden desktop:block  h-fit max-h-screen overflow-hidden  border rounded-md ">
          <video
            autoPlay
            muted
            className="hidden desktop:block max-h-screen box-content"
          >
            <source
              src="https://res.cloudinary.com/dqe71igxe/video/upload/f_auto:video,q_auto/v1/videos/SellerOverview"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
};

export default page;
