"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import { FC, lazy, useEffect } from "react";
import Image from "next/image";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import { useOpenModalStore } from "@/lib/stores/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { Session } from "next-auth";
import { useMediaQuery } from "react-responsive";
import { useActiveNavBarStore } from "@/lib/stores/navbar-store";

const activeNavBar =
  "fixed  top-0 z-10 flex  max-w-full w-full mx-auto px-4 py-4 bg-white text-black shadow-md transition duration-500 ease-in-out";

const inactiveNavBar =
  " fixed top-0 z-10 flex max-w-full w-full mx-auto px-4 py-4 bg-transparent text-white transition duration-500 ease-in-out";

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
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const { isActiveNavBar, setActiveNavBar } = useActiveNavBarStore();

  const changeBackground = () => {
    if (window.scrollY >= 60) {
      setActiveNavBar(true);
    } else {
      setActiveNavBar(false);
    }
  };

  useEffect(() => {
    if (!isMobile && !session) {
      window.addEventListener("scroll", changeBackground);

      return () => {
        window.removeEventListener("scroll", changeBackground);
      };
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setActiveNavBar(true);
    } else {
      setActiveNavBar(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (session) {
      setActiveNavBar(true);
    } else {
      setActiveNavBar(false);
    }
  }, [session]);

  return (
    <header>
      <nav
        className={
          session
            ? activeNavBar.replace(/\bfixed\b/, "")
            : isActiveNavBar
            ? activeNavBar
            : inactiveNavBar
        }
      >
        {/*NavBar items*/}
        <div className="flex w-full items-center justify-between xl:gap-8 ">
          {/* Hambuger Menu and Logo Container */}
          <div className="flex tablet:px-2  tablet:w-auto w-full justify-between items-center">
            {/*Mobile Nav Button*/}
            <div className=" flex lg:hidden focus:outline-none px-2">
              <button
                className="flex items-center py-2 "
                onClick={() => setMobileNav(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-8 h-10"
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
              className="tablet:w-full w-[40px] justify-center text-center font-sans font-bold text-[34px] "
            >
              Uenji
            </Link>
          </div>

          <div className="tablet:flex hidden items-end justify-end w-full">
            {/*Search Bar*/}
            {isActiveNavBar && (
              <div className=" tablet:flex hidden w-full  px-2">
                <input
                  type="text"
                  placeholder="Encontre o serviço que precisa aqui"
                  className="border-2 border-slate-300 bg-white h-10 px-5 w-full rounded-l-md text-sm text-black focus:outline-none focus:border-slate-500"
                />
                <button
                  type="submit"
                  className=" w-12 border-black bg-black rounded-r-md overflow-visible "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 28"
                    strokeWidth="2"
                    stroke="white"
                    className="w-[28px] h-[22px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/*Nav Links and Auth Button Container*/}
          <div className="flex w-full tablet:min-w-max items-center text-center justify-end tablet:gap-8">
            {/*Nav Links*/}
            {session ? (
              <ul className="desktop:flex hidden items-center justify-center text-base font-semibold px-2 gap-[20px]">
                <InboxDropDownMenu />
                <Link href="/" className="flex hover:underline text-zinc-600">
                  {" "}
                  Orders
                </Link>
                {!session.user.isSeller ? (
                  <Link
                    href="/freelancer_onboarding/overview"
                    className="flex hover:underline text-zinc-600"
                  >
                    {" "}
                    Become a Seller
                  </Link>
                ) : null}
              </ul>
            ) : (
              <ul className="desktop:flex hidden  text-base font-semibold px-2 gap-[20px]">
                {NavLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.key}
                    className="flex flex-row hover:underline"
                  >
                    {link.text}
                    {link.key === "English" && (
                      <Image
                        alt="Language"
                        src="./icons/globe-thin.svg"
                        width={20}
                        height={20}
                      />
                    )}
                  </Link>
                ))}
              </ul>
            )}

            {/*Auth Button & User Avatar*/}
            {session ? (
              <div className="hidden tablet:flex">
                <UserContextMenu
                  user={{
                    username: session.user.username || null,
                    image: session.user.image || null,
                    isSeller: session.user.isSeller || null,
                  }}
                />
              </div>
            ) : (
              <div className="flex tablet:flex-row tablet:gap-3">
                <div className="text-center items-center hidden tablet:flex font-semibold text-base focus:border-none focus:outline-none cursor-pointer">
                  <span
                    className="hover:underline"
                    onClick={() => {
                      setLogin("login");
                      setIsOpen(true);
                    }}
                  >
                    Sign In
                  </span>
                </div>

                <div className="tablet:flex hidden  mx-auto sm:w-[80px] w-[60px] ">
                  <JoinButton isButton />
                </div>

                <div className="tablet:hidden flex mx-auto sm:w-[80px] w-[60px]">
                  <span
                    onClick={() => {
                      setIsOpen(true);
                      setLogin("register");
                    }}
                    className="flex cursor-pointer font-semibold hover:opacity-60"
                  >
                    {" "}
                    Join{" "}
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
