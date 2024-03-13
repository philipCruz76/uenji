import { sellerOnBoardingDos } from "@/constants/sellerOnBoarding";
import { buttonVariants } from "@/constants/ui/button";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const isSeller = await getCurrentUser().then((user) => user?.isSeller);
  if (isSeller?.valueOf() === true) redirect("/");
  return (
    <section className="container flex min-h-[100dvh] max-w-[100dvw] overflow-y-scroll py-8">
      <div className="flex h-full w-full flex-col-reverse items-center justify-between tablet:pl-[25px]  desktop:flex-row-reverse ">
        <div className="container flex h-full max-w-[900px] flex-col items-start justify-center tablet:px-[60px]">
          <h1 className="box-border flex pb-[20px] text-2xl font-bold text-[#303030] tablet:max-w-[590px] tablet:pr-[80px]">
            {" "}
            O que caracteriza um perfil Uenji bem-sucedido?
          </h1>
          <h3 className="text-sm text-gray-600 ">
            A sua primeira impressão é fundamental! Crie um perfil que se
            destaque da multidão no Uenji.
          </h3>
          <ul className="box-border grid min-h-[310px] max-w-full grid-cols-1 justify-between  pt-[42px]  tablet:grid-cols-2  desktop:grid-cols-3">
            {sellerOnBoardingDos.map((item) => (
              <li
                key={item.key}
                className="max-w-[270px] justify-center pb-[40px] tablet:px-2"
              >
                <Image alt={item.key} src={item.icon} width={43} height={43} />
                <p className="text-justify text-sm text-gray-600">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="grid w-full grid-cols-1 grid-rows-1 items-center justify-center gap-4 tablet:grid-cols-2 tablet:justify-start">
            <Link
              href="/freelancer_onboarding/overview/dont"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-sky-500 text-center text-white tablet:w-[160px]",
              )}
            >
              Continuar
            </Link>
            <Link
              href="/freelancer_onboarding/overview"
              className="text-center text-blue-700 underline tablet:text-start"
            >
              {" "}
              Voltar
            </Link>
          </div>
        </div>
        <div className="hidden h-fit  max-h-[100dvh] overflow-hidden rounded-md  border desktop:block ">
          <video
            autoPlay
            muted
            className="box-content hidden max-h-[100dvh] desktop:block"
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
