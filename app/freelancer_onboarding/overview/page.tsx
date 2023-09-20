import { sellerOnboarding } from "@/constants/sellerOnBoarding";
import { buttonVariants } from "@/constants/ui/button";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  const isSeller = await getCurrentUser().then((user)=> user?.isSeller);
  if(isSeller?.valueOf() === true ) redirect("/")
    
  return (
    <section className="flex container max-w-screen max-h-screen overflow-y-scroll">
      <div className="flex flex-col-reverse desktop:flex-row  w-full h-full items-center justify-between py-8 tablet:pl-[25px] ">
        <div className="flex px-[2rem] flex-col w-full h-full">
          <h1 className="flex text-[#303030] w-full font-bold box-border tablet:max-w-[590px] tablet:pr-[80px] pb-[25px] tablet:text-2xl text-xl">
            {" "}
            Ready to start selling on Uenji?
            Here's the breakdown:
          </h1>

          <ul className="flex flex-col border-t gap-8 w-full h-full py-4">
            {sellerOnboarding.map((item) => (
              <li key={item.key} className="text-gray-600 tablet:text-sm text-xs flex-row">
              <Image alt={item.key} src={item.icon} height={43} width={43}/>
              <h3 className="font-bold tablet:text-base text-sm text-black">
                {item.title}
              </h3>
              {item.subtext}
            </li>
            ))}
          </ul>
          <Link href="/freelancer_onboarding/overview/do" className={cn(buttonVariants({variant: "default"}), "flex bg-sky-500 tablet:w-[160px] w-full text-white")}>Continue</Link>
        </div>
        <div className="flex flex-col w-full max-h-[300px] py-[60px] items-center text-center border ">
          overview video here
        </div>
      </div>
    </section>
  );
};

export default page;
