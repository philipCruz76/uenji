"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import { FC, lazy, useEffect } from "react";
import Image from "next/image";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { Session } from "next-auth";
import { useActiveNavBarStore } from "@/lib/stores/navbar-store";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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
  const pathName = usePathname();

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
                  placeholder="Encontre o serviço que precisa aqui"
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

          {/*Nav Links and Auth Button Container*/}
          <div className="flex w-full items-center justify-end text-center tablet:min-w-max tablet:gap-8">
            {/*Nav Links*/}
            {session ? (
              <ul className="hidden items-center justify-center gap-[20px] px-2 text-base font-semibold desktop:flex">
                <InboxDropDownMenu />
                <Link
                  href="/"
                  className="group flex flex-col items-center justify-center"
                >
                  <span>Pedidos</span>
                  <div className="hidden h-[2px] w-[46px] bg-transparent  transition duration-200 ease-in-out group-hover:block group-hover:scale-x-150  group-hover:bg-current " />
                </Link>
                {!session.user.isSeller ? (
                  <Link
                    href="/freelancer_onboarding/overview"
                    className="group flex flex-col items-center justify-center"
                  >
                    <span> Torne-se um vendedor</span>
                    <div className="hidden h-[2px] w-[130px] bg-transparent  transition duration-200 ease-in-out group-hover:block group-hover:scale-x-150  group-hover:bg-current " />
                  </Link>
                ) : (
                  <Link
                    href={`/${session.user.username}/gigs`}
                    className="group flex flex-col items-center justify-center"
                  >
                    <span>Serviços</span>
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
                      {link.text}
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
                    Entrar
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
                    {" "}
                    Aderir{" "}
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
