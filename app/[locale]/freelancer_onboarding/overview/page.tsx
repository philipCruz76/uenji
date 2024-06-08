import {
  sellerOnboardingEN,
  sellerOnboardingPT,
} from "@/constants/sellerOnBoarding";
import { buttonVariants } from "@/constants/ui/button";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { cn } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async ({}) => {
  const locale = await getLocale();
  const isSeller = await getCurrentUser().then((user) => user?.isSeller);
  if (isSeller?.valueOf() === true) redirect("/");

  const sellerOnboarding =
    locale === "pt" ? sellerOnboardingPT : sellerOnboardingEN;

  return (
    <section className="container flex min-h-[100dvh] max-w-[100dvw]">
      <div className="flex h-full w-full flex-col-reverse items-center justify-between py-8 tablet:pl-[25px] desktop:flex-row">
        <div className="flex h-full w-full flex-col px-[2rem]">
          <h1 className="box-border flex w-full pb-[25px] text-xl font-bold text-[#303030] tablet:max-w-[590px] tablet:pr-[80px] tablet:text-2xl">
            {" "}
            {locale === "pt"
              ? "Pronto para começar a vender no Uenji? Aqui está o resumo:"
              : "Ready to start selling on Uenji? Here's the overview:"}
          </h1>

          <ul className="flex h-full w-full flex-col gap-8 border-t py-4">
            {sellerOnboarding.map((item) => (
              <li
                key={item.key}
                className="flex-row text-xs text-gray-600 tablet:text-sm"
              >
                <Image alt={item.key} src={item.icon} height={43} width={43} />
                <h3 className="text-sm font-bold text-black tablet:text-base">
                  {item.title}
                </h3>
                {item.subtext}
              </li>
            ))}
          </ul>
          <Link
            href="/freelancer_onboarding/overview/do"
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex w-full bg-sky-500 text-white tablet:w-[160px]",
            )}
          >
            {locale === "pt" ? "Continuar" : "Continue"}
          </Link>
        </div>
        <div className="flex w-full flex-col items-center py-[20px] text-center">
          <video controls muted className="box-content flex min-w-full">
            <source
              src="https://res.cloudinary.com/dqe71igxe/video/upload/f_auto:video,q_auto/v1/videos/WorkingStockVideo"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
};

export default page;
