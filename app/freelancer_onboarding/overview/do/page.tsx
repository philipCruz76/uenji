import { sellerOnBoardingDos } from "@/constants/sellerOnBoarding";
import { buttonVariants } from "@/constants/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="flex container py-8 max-w-screen max-h-screen min-h-screen">
      <div className="flex flex-col-reverse desktop:flex-row-reverse w-full h-full items-center justify-between  tablet:pl-[25px] ">
        <div className="flex container flex-col max-w-[900px] h-full tablet:px-[60px] items-start justify-center">
          <h1 className="flex text-[#303030] font-bold box-border tablet:max-w-[590px] tablet:pr-[80px] text-2xl">
            {" "}
            O que caracteriza um perfil Uenji bem-sucedido?
          </h1>
          <h3 className="text-sm text-gray-600 ">
            A sua primeira impressão é fundamental! Crie um perfil que se
            destaque da multidão no Uenji.
          </h3>
          <ul className="grid desktop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 min-h-[310px] box-border flex-wrap w-full h-full pt-[42px]  justify-between">
            {sellerOnBoardingDos.map((item) => (
              <li
                key={item.key}
                className="flex tablet:flex-col gap-2 flex-row box-border text-gray-600 text-sm max-w-[270px] pb-[40px]"
              >
                <Image alt={item.key} src={item.icon} width={43} height={43} />
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="flex tablet:flex-row flex-col gap-2  tablet:justify-start items-center w-full justify-center">
            <Link
              href="/freelancer_onboarding/overview/dont"
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex bg-sky-500 tablet:w-[160px] w-full text-white",
              )}
            >
              Continuar
            </Link>
            <Link
              href="/freelancer_onboarding/overview"
              className="underline text-blue-700"
            >
              {" "}
              Voltar
            </Link>
          </div>
        </div>
        <div className="hidden lg:block  h-fit max-h-screen overflow-hidden  border rounded-md ">
          <video autoPlay muted className="flex max-h-screen box-content">
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
