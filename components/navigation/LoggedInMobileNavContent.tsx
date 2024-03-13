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
import { footerLinks, languageFilters } from "@/constants";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import FooterColumn from "@/components/navigation/FooterColumn";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoggedInMobileNavContent = () => {
  const currentUser = useCurrentUser();
  const { setMobileNav } = useOpenMobileNavStore();
  const router = useRouter();
  if (!currentUser) {
    setMobileNav(false);
    return null;
  }

  const [currentViewTitle, setCurrentViewTitle] = useState<
    "Comprador" | "Vendedor"
  >(currentUser.sellerView ? "Comprador" : "Vendedor");
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
          `Visualização modo ${currentUser.sellerView ? "Comprador" : "Vendedor"}`,
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
          href={`/${currentUser?.username}`}
          className="flex w-full flex-row items-center justify-start  gap-4 py-2 font-sans font-bold text-black"
        >
          <UserAvatar avatarPhoto={currentUser?.image!} />
          {currentUser?.username}
        </Link>

        {/*Nav Links*/}
        <ul className="flex flex-col gap-[10px] py-[20px] font-mono text-base font-normal text-[#000000] ">
          {currentUser.isSeller ? (
            <div className="flex w-full items-center justify-center pb-4">
              <button
                onClick={switchView}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-[80%] cursor-pointer border-[#495057] bg-[#dee2e6] transition duration-200 ease-in-out hover:scale-105 hover:border-[#495057] hover:bg-[#dee2e6] hover:bg-opacity-75",
                )}
              >
                <span className=""> Modo {currentViewTitle} </span>
              </button>
            </div>
          ) : null}

          <Link
            href="/"
            className="hover:underline"
            key="Home"
            onClick={() => setMobileNav(false)}
          >
            Página inicial
          </Link>
          <Link
            href="/inbox"
            className="hover:underline"
            key="Inbox"
            onClick={() => setMobileNav(false)}
          >
            Caixa de entrada
          </Link>
          {currentUser.isSeller ? (
            <>
              <Link href="/" className="hover:underline" key="Manage Orders">
                Gerir Pedidos
              </Link>
              <Link
                href={`/${currentUser.username}/gigs`}
                className="hover:underline"
                key="Manage Orders"
              >
                Serviços
              </Link>
            </>
          ) : null}

          <Accordion type="multiple" key="Categories">
            <AccordionItem value="1">
              <AccordionTrigger className="py-0">
                <span className="font-normal"> Navegar Categorias</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0">
                <FooterColumn links={footerLinks[0].links} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col gap-4 pt-11">
            <span className="text-sm font-semibold text-black">Geral</span>
            <div className="h-px w-full bg-slate-200" />
          </div>

          <Link href="/" className="hover:underline" key="Settings">
            Settings
          </Link>

          <Accordion type="multiple" key="Language">
            <AccordionItem value="2">
              <AccordionTrigger className="flex h-fit flex-row gap-2">
                <span className="font-normal">Inglês</span>
                <Image
                  alt="Language"
                  src="/icons/globe-thin.svg"
                  width={20}
                  height={20}
                />
              </AccordionTrigger>

              <AccordionContent>
                {languageFilters.map((filter) => (
                  <ul className="relative flex flex-col items-start">
                    <Link href="/" key={filter} className="hover:underline">
                      {filter}
                    </Link>
                  </ul>
                ))}
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
            Sair
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
