import { sellerOnBoardingDonts } from "@/constants/sellerOnBoarding";
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
    <section className="container flex min-h-[100dvh] max-w-[100dvw] py-8">
      <div className="flex h-full w-full flex-col-reverse items-center justify-between tablet:pl-[25px]  desktop:flex-row-reverse ">
        <div className="container flex h-full max-w-[900px] flex-col items-start justify-center tablet:px-[60px]">
          <h1 className="box-border flex pb-[20px] text-2xl font-bold text-[#303030] tablet:max-w-[590px] tablet:pr-[80px]">
            {" "}
            Agora, vamos falar sobre as coisas que deve evitar.
          </h1>
          <h3 className="text-sm text-gray-600 ">
            O seu sucesso no Uenji é importante para nós. Evite o seguinte para
            se manter em conformidade com as normas da nossa comunidade:
          </h3>
          <ul className="box-border grid min-h-[310px] max-w-full grid-cols-1 justify-between  pt-[42px]  tablet:grid-cols-2  desktop:grid-cols-3">
            {sellerOnBoardingDonts.map((item) => (
              <li
                key={item.key}
                className="max-w-[270px] justify-center pb-[40px] tablet:px-2"
              >
                <Image
                  alt={item.key}
                  src={item.icon}
                  width={43}
                  height={43}
                  className="items-center justify-center"
                />
                <p className="text-justify text-sm text-gray-600">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="grid w-full grid-cols-1 grid-rows-1 items-center justify-center gap-4 tablet:grid-cols-2 tablet:justify-start">
            <Link
              href="/freelancer_onboarding/personal_info"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-sky-500 text-center text-white tablet:w-[160px]",
              )}
            >
              Continuar
            </Link>
            <Link
              href="/freelancer_onboarding/overview/do"
              className="text-center text-blue-700 underline tablet:text-start"
            >
              {" "}
              Voltar
            </Link>
          </div>
        </div>
        <div className="hidden h-fit  max-h-[100dvh] overflow-hidden rounded-md  border desktop:flex ">
          <video
            autoPlay
            muted
            className="box-content hidden max-h-[100dvh] desktop:flex"
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
