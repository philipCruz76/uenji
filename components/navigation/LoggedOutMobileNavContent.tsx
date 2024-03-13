"use client";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import Image from "next/image";
import { footerLinks, languageFilters } from "@/constants";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";
import FooterColumn from "./FooterColumn";

const LoggedOutMobileNavContent = () => {
  let { setIsOpen } = useOpenModalStore();
  let { setLogin } = useLogInVariantStore();
  const { setMobileNav } = useOpenMobileNavStore();

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
          {" "}
          Adira ao Uenji{" "}
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
            Entrar
          </span>

          <Accordion type="multiple" key="Categories">
            <AccordionItem value="1">
              <AccordionTrigger className="py-2">
                <span className="font-mono font-light">
                  {" "}
                  Navegar Categorias
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-0">
                <FooterColumn links={footerLinks[0].links} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col gap-4 py-5">
            <span className="font-mono text-base font-semibold text-black">
              Geral
            </span>
            <div className="h-px w-full bg-slate-200" />
          </div>
          <Link
            href="/"
            className="font-mono hover:underline"
            key="Home"
            onClick={() => setMobileNav(false)}
          >
            Página inicial
          </Link>

          <Accordion type="multiple" key="Language">
            <AccordionItem value="2">
              <AccordionTrigger className="flex flex-row gap-2 py-2">
                <span className="font-mono font-light">Inglês</span>
                <Image
                  alt="Language"
                  src="/icons/globe-thin.svg"
                  width={20}
                  height={20}
                />
              </AccordionTrigger>

              <AccordionContent>
                <ul className="relative flex flex-col items-start">
                  {languageFilters.map((filter) => (
                    <Link
                      href="/"
                      key={filter}
                      className="font-mono hover:underline"
                    >
                      {filter}
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ul>
      </div>
    </>
  );
};

export default LoggedOutMobileNavContent;
