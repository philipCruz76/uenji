import { sellerOnboarding } from "@/constants/sellerOnBoarding";
import { buttonVariants } from "@/constants/ui/button";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async ({}) => {
  const isSeller = await getCurrentUser().then((user) => user?.isSeller);
  if (isSeller?.valueOf() === true) redirect("/");

  return (
    <section className="flex container max-w-screen max-h-screen min-h-screen ">
      <div className="flex flex-col-reverse desktop:flex-row  w-full h-full items-center justify-between py-8 tablet:pl-[25px] ">
        <div className="flex px-[2rem] flex-col w-full h-full">
          <h1 className="flex text-[#303030] w-full font-bold box-border tablet:max-w-[590px] tablet:pr-[80px] pb-[25px] tablet:text-2xl text-xl">
            {" "}
            Pronto para começar a vender no Uenji? Aqui está o resumo:
          </h1>

          <ul className="flex flex-col border-t gap-8 w-full h-full py-4">
            {sellerOnboarding.map((item) => (
              <li
                key={item.key}
                className="text-gray-600 tablet:text-sm text-xs flex-row"
              >
                <Image alt={item.key} src={item.icon} height={43} width={43} />
                <h3 className="font-bold tablet:text-base text-sm text-black">
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
              "flex bg-sky-500 tablet:w-[160px] w-full text-white",
            )}
          >
            Continuar
          </Link>
        </div>
        <div className="flex flex-col w-full  py-[20px] items-center text-center  ">
          <video controls muted className="flex min-w-full box-content">
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
