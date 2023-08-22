import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import Image from "next/image";
import { footerLinks, languageFilters } from "@/constants";
import { useOpenModalStore } from "@/lib/stores/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import { useOpenMobileNavStore } from "@/lib/stores/mobileNav-store";

const MobileNavLinks = ({ links }: { links: string[] }) => (
  <ul className="flex flex-col items-start">
    {links.map((link) => (
      <Link href="/" key={link} className="hover:underline">
        {link}
      </Link>
    ))}
  </ul>
);

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
            "flex bg-sky-500 border-sky-500 hover:bg-sky-600 hover:border-sky-600 max-w-[120px] cursor-pointer text-white font-semibold",
          )}
        >
          {" "}
          Join Uenji{" "}
        </span>

        {/*Nav Links*/}
        <ul className="flex flex-col text-[#62646a] text-base font-light py-8 ">
          <span
            className="cursor-pointer hover:underline hover:text-[#4e5055]"
            onClick={() => {
              setLogin("login");
              setIsOpen(true);
            }}
          >
            Sign In
          </span>

          <Accordion type="multiple" key="Categories">
            <AccordionItem value="1">
              <AccordionTrigger className="py-2">
                <span className="font-light"> Browse Categories</span>
              </AccordionTrigger>

              <AccordionContent className="pt-0">
                <MobileNavLinks links={footerLinks[0].links} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col py-5 gap-4">
            <span className="text-sm text-black font-semibold">General</span>
            <div className="w-full h-px bg-slate-200" />
          </div>
          <Link
            href="/"
            className="hover:underline"
            key="Home"
            onClick={() => setMobileNav(false)}
          >
            Home
          </Link>

          <Accordion type="multiple" key="Language">
            <AccordionItem value="2">
              <AccordionTrigger className="flex flex-row gap-2 py-2">
                <span className="font-light">English</span>
                <Image
                  alt="Language"
                  src="./icons/globe-thin.svg"
                  width={20}
                  height={20}
                />
              </AccordionTrigger>

              <AccordionContent>
                {languageFilters.map((filter) => (
                  <ul className="flex relative flex-col items-start">
                    <Link href="/" key={filter} className="hover:underline">
                      {filter}
                    </Link>
                  </ul>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ul>
      </div>
    </>
  );
};

export default LoggedOutMobileNavContent;
