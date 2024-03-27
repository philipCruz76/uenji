"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import { FC, lazy, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { Session } from "next-auth";
import { useActiveNavBarStore } from "@/lib/stores/navbar-store";
import { cn } from "@/lib/utils";
import { getSellerOrders } from "@/lib/actions/orders/getUserOrders";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/Select";
const MobileNav = lazy(() => import("@/components/navigation/MobileNav"));
const JoinButton = lazy(() => import("@/components/auth/signIn/JoinButton"));
const InboxDropDownMenu = lazy(
  () => import("@/components/navigation/InboxDropDownMenu"),
);
const UserContextMenu = lazy(
  () => import("@/components/users/UserContextMenu"),
);

type ExtendedNavBarProps = {
  session: Session | null;
};
const ExtendedNavBar: FC<ExtendedNavBarProps> = ({ session }) => {
  let { mobileNav, setMobileNav } = useOpenMobileNavStore();
  let { setIsOpen } = useOpenModalStore();
  let { setLogin } = useLogInVariantStore();
  const [orders, setOrders] = useState<number>(0);
  const pathName = usePathname();
  const localesText = useTranslations("Locales");
  const navBarText = useTranslations("Navbar");

  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    isActiveNavBar,
    activeBarStyling,
    inactiveBarStyling,
    setActiveBarStyling,
    setActiveNavBar,
  } = useActiveNavBarStore();

  useEffect(() => {
    if (!session?.user && pathName === "/") {
      setActiveNavBar(false);
      setActiveBarStyling(activeBarStyling + " fixed");
    } else {
      setActiveNavBar(true);
      setActiveBarStyling(activeBarStyling.replace(/\bfixed\b/, ""));
    }
  }, [pathName]);

  useEffect(() => {
    if (!session) return;
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
  }, [session?.user.sellerView]);

  return (
    <header>
      <nav
        className={cn(
          session?.user
            ? activeBarStyling.replace(/\bfixed\b/, "")
            : isActiveNavBar
              ? activeBarStyling
              : inactiveBarStyling,
        )}
      >
        {/*NavBar items*/}
        <div className="xl:gap-8 flex w-full items-center justify-between font-mono ">
          {/* Hambuger Menu and Logo Container */}
          <div className="flex   w-full items-center justify-between tablet:w-auto">
            {/*Mobile Nav Button*/}
            <div className=" flex px-2 focus:outline-none desktop:hidden">
              <button
                className="group flex items-center py-2 "
                onClick={() => setMobileNav(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-10 w-8 transition duration-200 ease-in-out group-hover:scale-110"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
              {mobileNav && <MobileNav session={session} />}
            </div>

            {/*Logo*/}
            <Link
              href="/"
              className="flex h-[70px] w-[150px] items-center justify-center"
            >
              <Image
                src={"/images/uenji-logo-black.png"}
                priority
                alt="Uenji Logo"
                width={200}
                height={200}
              />
            </Link>
          </div>

          <div className="hidden w-full items-end justify-end tablet:flex">
            {/*Search Bar*/}
            {isActiveNavBar ? (
              <div className=" hidden w-full px-2  tablet:flex">
                <input
                  type="text"
                  placeholder={navBarText("SearchPlaceholder")}
                  className="h-10 w-full rounded-l-md border-2 border-slate-300 bg-white px-5 text-sm text-black focus:border-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className=" w-12 overflow-visible rounded-r-md border-black bg-black "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 28"
                    strokeWidth="2"
                    stroke="white"
                    className="h-[22px] w-[28px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>

          {/* Language Selector */}

          <Select
            value={locale}
            onValueChange={(value) => {
              startTransition(() => {
                router.replace(pathName, { locale: value });
              });
            }}
          >
            <SelectTrigger className="w-[70px] border-black">
              {locale.toLocaleUpperCase()}
              <Image
                alt="Language"
                src="/icons/globe-thin.svg"
                width={20}
                height={20}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="pt">
                <div className="flex w-full flex-row justify-between">
                  <Image
                    alt="Language"
                    src="/icons/flag-pt.svg"
                    width={20}
                    height={20}
                  />
                  <span className="px-2">{localesText("pt")}</span>
                </div>
              </SelectItem>
              <SelectItem value="en">
                <div className="flex w-full flex-row items-start justify-start">
                  <Image
                    alt="Language"
                    src="/icons/flag-us.svg"
                    width={20}
                    height={20}
                    className="h-[20px] w-[20px]"
                  />
                  <span className="px-2">{localesText("en")}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/*Nav Links and Auth Button Container*/}
          <div className="flex w-full items-center justify-end text-center tablet:min-w-max tablet:gap-8">
            {/*Nav Links*/}
            {session ? (
              <ul className="hidden items-center justify-center gap-[20px] px-2 text-base font-semibold desktop:flex">
                <InboxDropDownMenu />
                <Link
                  href="/orders"
                  className="group flex flex-col items-center justify-center"
                >
                  <div className="flex flex-row items-center justify-center gap-1">
                    {" "}
                    <span>{navBarText("NavLinks.orders")}</span>
                    {orders > 0 && session.user.sellerView === true && (
                      <span className=" flex h-[16px] w-[16px] items-center justify-center rounded-full border border-black bg-black text-center font-mono text-white">
                        {orders}
                      </span>
                    )}
                  </div>

                  <div
                    className={cn(
                      orders > 0 ? "w-[66px]" : "w-[46px]",
                      "hidden h-[2px]  bg-transparent  transition duration-200 ease-in-out group-hover:block group-hover:scale-x-150  group-hover:bg-current ",
                    )}
                  />
                </Link>
                {!session.user.isSeller ? (
                  <Link
                    href="/freelancer_onboarding/overview"
                    className="group flex flex-col items-center justify-center"
                  >
                    <span> {navBarText("NavLinks.sellerCTA")}</span>
                    <div className="hidden h-[2px] w-[130px] bg-transparent  transition duration-200 ease-in-out group-hover:block group-hover:scale-x-150  group-hover:bg-current " />
                  </Link>
                ) : (
                  <Link
                    href={`/${session.user.username}/gigs`}
                    className="group flex flex-col items-center justify-center"
                  >
                    <span>{navBarText("NavLinks.gigs")}</span>
                    <div className="hidden h-[2px] w-[52px] bg-transparent  transition duration-200 ease-in-out group-hover:block group-hover:scale-x-150  group-hover:bg-current " />
                  </Link>
                )}
              </ul>
            ) : (
              <ul className="hidden gap-[20px]  px-2 text-base font-semibold desktop:flex">
                {NavLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.key}
                    className="group flex flex-col items-center justify-center"
                  >
                    <span className="flex flex-row transition duration-200 ease-in-out group-hover:scale-105">
                      {navBarText("NavLinks.explore")}
                    </span>
                    <div className="hidden h-[2px] w-[52px] bg-transparent  transition duration-200 ease-in-out group-hover:block group-hover:scale-x-150  group-hover:bg-current " />
                  </Link>
                ))}
              </ul>
            )}

            {/*Auth Button & User Avatar*/}
            {session ? (
              <div className="hidden tablet:flex">
                <UserContextMenu
                  user={{
                    id: session.user.id,
                    username: session.user.username || null,
                    image: session.user.image || null,
                    isSeller: session.user.isSeller || null,
                    sellerView: session.user.sellerView || null,
                  }}
                />
              </div>
            ) : (
              <div className="flex tablet:flex-row tablet:gap-3">
                <div className="group hidden flex-col items-center justify-center text-base font-semibold hover:cursor-pointer tablet:flex">
                  <span
                    onClick={() => {
                      setLogin("login");
                      setIsOpen(true);
                    }}
                    className="transition duration-200 ease-in-out group-hover:scale-105"
                  >
                    {navBarText("NavLinks.login")}
                  </span>
                  <div className="hidden h-[2px] w-[42px] bg-transparent  transition duration-200 ease-in-out group-hover:block group-hover:scale-x-150  group-hover:bg-current " />
                </div>

                <div className="sm:w-[80px] px-auto  hidden w-[60px] tablet:block ">
                  <JoinButton isButton />
                </div>

                <div className="sm:w-[80px] mx-auto flex w-[60px] tablet:hidden">
                  <span
                    onClick={() => {
                      setIsOpen(true);
                      setLogin("register");
                    }}
                    className="flex cursor-pointer font-semibold transition duration-200 ease-in-out hover:scale-105 hover:opacity-60"
                  >
                    {navBarText("NavLinks.join")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ExtendedNavBar;
