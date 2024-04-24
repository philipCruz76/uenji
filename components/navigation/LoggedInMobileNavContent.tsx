"use client";
import { signOut } from "next-auth/react";
import { UserAvatar } from "@/components/users/UserAvatar";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Image from "next/image";
import { categoryLinksEN, categoryLinksPT } from "@/constants";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import FooterColumn from "@/components/navigation/FooterColumn";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { getSellerOrders } from "@/lib/actions/orders/getUserOrders";
import { User } from "@/types/common.types";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

type LoggedInMobileNavContentProps = {
  currentUser: User;
};

const LoggedInMobileNavContent = ({
  currentUser,
}: LoggedInMobileNavContentProps) => {
  const { setMobileNav } = useOpenMobileNavStore();
  const [currentViewTitle, setCurrentViewTitle] = useState<
    "Comprador" | "Vendedor"
  >(currentUser.sellerView ? "Comprador" : "Vendedor");
  const [orders, setOrders] = useState<number>(0);

  const pathName = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const mobileNavText = useTranslations("MobileNav.LoggedIn");
  const navLinksText = useTranslations("MobileNav.LoggedIn.navLinks");

  useEffect(() => {
    if (!currentUser) return;
    const activeOrders = async () => {
      try {
        const orders = await getSellerOrders();
        const activeOrders = orders.filter(
          (order) => order.status === "active",
        );
        setOrders(activeOrders.length);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    activeOrders();
  }, [currentUser.sellerView]);

  if (!currentUser) {
    setMobileNav(false);
    return null;
  }

  const switchView = () => {
    fetch("/api/seller_view", {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        setCurrentViewTitle(currentUser.sellerView ? "Vendedor" : "Comprador");
        router.push("/");
        setMobileNav(false);
        router.refresh();
        toast.success(
          `${mobileNavText("modePrefix")} ${currentUser.sellerView ? mobileNavText("buyer") : mobileNavText("seller")}`,
        );
      } else {
        toast.error("Error switching View");
      }
    });
  };

  return (
    <>
      {/* Mobile Menu Content */}
      <div className="flex-1 overflow-y-auto">
        <Link
          href={`/${currentUser.username}`}
          className="flex w-full flex-row items-center justify-start  gap-4 py-2  font-mono font-bold text-black"
          onClick={() => setMobileNav(false)}
        >
          <UserAvatar avatarPhoto={currentUser?.image!} />
          {currentUser.username!.charAt(0).toUpperCase() +
            currentUser.username!.slice(1)}
        </Link>

        {/*Nav Links*/}
        <ul className="flex flex-col gap-[8px] py-[20px] font-mono text-base font-normal text-[#000000] ">
          {currentUser.isSeller ? (
            <div className="flex w-full items-center justify-center pb-4">
              <button
                onClick={switchView}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-[80%] cursor-pointer border-[#495057] bg-[#dee2e6] transition duration-200 ease-in-out hover:scale-105 hover:border-[#495057] hover:bg-[#dee2e6] hover:bg-opacity-75",
                )}
              >
                <span className="">
                  {locale === "pt" &&
                    mobileNavText("modeSuffix") +
                      " " +
                      (currentViewTitle === "Comprador"
                        ? mobileNavText("buyer")
                        : mobileNavText("seller"))}
                  {locale === "en" &&
                    (currentViewTitle === "Comprador"
                      ? mobileNavText("buyer")
                      : mobileNavText("seller")) +
                      " " +
                      mobileNavText("modeSuffix")}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center pb-4">
              <Link
                href="/freelancer_onboarding/overview"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-[80%] cursor-pointer border-[#495057] bg-[#dee2e6] transition duration-200 ease-in-out hover:scale-105 hover:border-[#495057] hover:bg-[#dee2e6] hover:bg-opacity-75",
                )}
                onClick={() => setMobileNav(false)}
              >
                <span> {mobileNavText("sellerCTA")} </span>
              </Link>
            </div>
          )}

          <Link
            href="/"
            className="hover:underline"
            key="Home"
            onClick={() => setMobileNav(false)}
          >
            {navLinksText("home")}
          </Link>
          <Link
            href="/inbox"
            className="hover:underline"
            key="Inbox"
            onClick={() => setMobileNav(false)}
          >
            {navLinksText("inbox")}
          </Link>
          {currentUser.isSeller ? (
            <>
              <Link
                href="/orders"
                className="flex flex-row items-center justify-start gap-1 hover:underline"
                key="Manage Orders"
                onClick={() => setMobileNav(false)}
              >
                <span>{navLinksText("orders")}</span>
                {orders > 0 && currentUser.sellerView === true && (
                  <span className=" flex h-[18px] w-[18px] items-center justify-center rounded-full border border-red-600 text-center font-mono text-xs text-red-600 ">
                    {orders}
                  </span>
                )}
              </Link>
              <Link
                href={`/${currentUser.username}/gigs`}
                className="hover:underline"
                key="Manage Orders"
                onClick={() => setMobileNav(false)}
              >
                {navLinksText("gigs")}
              </Link>
            </>
          ) : null}

          <Accordion type="multiple" key="Categories">
            <AccordionItem value="1">
              <AccordionTrigger className="py-0">
                <span className="font-normal"> {navLinksText("explore")}</span>
              </AccordionTrigger>
              <AccordionContent onClick={() => setMobileNav(false)} className="pt-0">
                <FooterColumn
                  links={
                    locale === "pt"
                      ? categoryLinksPT.links
                      : categoryLinksEN.links
                  }
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col gap-4 pt-11">
            <span className="text-sm font-semibold text-black">
              {navLinksText("generalSeparator")}
            </span>
            <div className="h-px w-full bg-slate-200" />
          </div>

          <Link href="/" className="hover:underline" key="Settings" onClick={() => setMobileNav(false)}>
            {navLinksText("settings")}
          </Link>

          <Accordion type="multiple" key="Language">
            <AccordionItem value="2">
              <AccordionTrigger className="flex flex-row gap-2 py-2">
                <span className="font-mono font-light">
                  {locale === "pt" ? "Portugês" : "English"}
                </span>
                <Image
                  alt="Language"
                  src="/icons/globe-thin.svg"
                  width={20}
                  height={20}
                />
              </AccordionTrigger>

              <AccordionContent>
                <div className="relative flex flex-col items-start">
                  <a
                    onClick={() => {
                      startTransition(() => {
                        router.replace(pathName, { locale: "pt" });
                      });
                    }}
                    className="flex cursor-pointer flex-row gap-2 font-mono hover:underline"
                  >
                    <Image
                      alt="Language"
                      src="/icons/flag-pt.svg"
                      width={20}
                      height={20}
                    />
                    Portugês
                  </a>
                  <a
                    onClick={() => {
                      startTransition(() => {
                        router.replace(pathName, { locale: "en" });
                      });
                    }}
                    className="flex cursor-pointer flex-row gap-2 font-mono hover:underline"
                  >
                    <Image
                      alt="Language"
                      src="/icons/flag-us.svg"
                      width={20}
                      height={20}
                    />
                    English
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <span
            className="flex cursor-pointer flex-row items-center justify-start gap-2 hover:underline"
            onClick={(event) => {
              event.preventDefault();
              signOut({ callbackUrl: `${window.location.origin}/` });
            }}
            key="Log Out"
          >
            {navLinksText("logout")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#333333"
              viewBox="0 0 256 256"
            >
              <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path>
            </svg>
          </span>
        </ul>
      </div>
    </>
  );
};

export default LoggedInMobileNavContent;
