"use client";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import Image from "next/image";
import { categoryLinksEN, categoryLinksPT } from "@/constants";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import FooterColumn from "./FooterColumn";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

const LoggedOutMobileNavContent = () => {
  let { setIsOpen } = useOpenModalStore();
  let { setLogin } = useLogInVariantStore();
  const { setMobileNav } = useOpenMobileNavStore();
  const pathName = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const mobileNavText = useTranslations("MobileNav.LoggedOut");
  const navLinksText = useTranslations("MobileNav.LoggedOut.navLinks");

  return (
    <>
      {/* Mobile Menu Content */}
      <div className=" flex-1">
        {/*Join Button*/}
        <span
          onClick={() => {
            setIsOpen(true);
            setLogin("register");
          }}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex max-w-[120px] cursor-pointer border-[#495057] bg-[#dee2e6] font-mono transition duration-200 ease-in-out hover:scale-105 hover:border-[#495057] hover:bg-[#dee2e6] hover:bg-opacity-75",
          )}
        >
          {mobileNavText("joinCTA")}
        </span>

        {/*Nav Links*/}
        <ul className="flex flex-col py-8 text-base font-light text-black ">
          <span
            className="cursor-pointer font-mono hover:underline"
            onClick={() => {
              setLogin("login");
              setIsOpen(true);
            }}
          >
            {navLinksText("login")}
          </span>

          <Accordion type="multiple" key="Categories">
            <AccordionItem value="1">
              <AccordionTrigger className="py-2">
                <span className="font-mono font-light">
                  {navLinksText("explore")}
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-0">
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

          <div className="flex flex-col gap-4 py-5">
            <span className="font-mono text-base font-semibold text-black">
              {" "}
              {navLinksText("generalSeparator")}
            </span>
            <div className="h-px w-full bg-slate-200" />
          </div>
          <Link
            href="/"
            className="font-mono hover:underline"
            key="Home"
            onClick={() => setMobileNav(false)}
          >
            {navLinksText("home")}
          </Link>
          <Link
            href="/search"
            className="hover:underline"
            key="Search"
            onClick={() => setMobileNav(false)}
          >
            {navLinksText("search")}
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
        </ul>
      </div>
    </>
  );
};

export default LoggedOutMobileNavContent;
