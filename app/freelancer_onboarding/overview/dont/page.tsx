import { sellerOnBoardingDonts } from "@/constants/sellerOnBoarding";
import { buttonVariants } from "@/constants/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="flex container py-8 max-w-[100dvw] max-h-[100dvh] min-h-[100dvh]">
      <div className="flex flex-col-reverse desktop:flex-row-reverse w-full h-full items-center justify-between  tablet:pl-[25px] ">
        <div className="flex container flex-col max-w-[900px] h-full tablet:px-[60px] items-start justify-center">
          <h1 className="flex text-[#303030] font-bold box-border tablet:max-w-[590px] tablet:pr-[80px] text-2xl pb-[20px]">
            {" "}
            Agora, vamos falar sobre as coisas que deve evitar.
          </h1>
          <h3 className="text-sm text-gray-600 ">
            O seu sucesso no Uenji é importante para nós. Evite o seguinte para
            se manter em conformidade com as normas da nossa comunidade:
          </h3>
          <ul className="grid desktop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 min-h-[310px] box-border  max-w-full  pt-[42px]  justify-between">
            {sellerOnBoardingDonts.map((item) => (
              <li
                key={item.key}
                className="tablet:px-2 justify-center max-w-[270px] pb-[40px]"
              >
                <Image
                  alt={item.key}
                  src={item.icon}
                  width={43}
                  height={43}
                  className="items-center justify-center"
                />
                <p className="text-gray-600 text-sm text-justify">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 tablet:grid-cols-2 grid-rows-1 gap-4 tablet:justify-start items-center w-full justify-center">
            <Link
              href="/freelancer_onboarding/personal_info"
              className={cn(
                buttonVariants({ variant: "default" }),
                "text-center bg-sky-500 tablet:w-[160px] w-full text-white",
              )}
            >
              Continuar
            </Link>
            <Link
              href="/freelancer_onboarding/overview/do"
              className="underline text-blue-700 text-center tablet:text-start"
            >
              {" "}
              Voltar
            </Link>
          </div>
        </div>
        <div className="hidden desktop:flex  h-fit max-h-[100dvh] overflow-hidden  border rounded-md ">
          <video
            autoPlay
            muted
            className="hidden desktop:flex max-h-[100dvh] box-content"
          >
            <source
              src="https://res.cloudinary.com/dqe71igxe/video/upload/f_auto:video,q_auto/v1/videos/SellerDont"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
};

export default page;
