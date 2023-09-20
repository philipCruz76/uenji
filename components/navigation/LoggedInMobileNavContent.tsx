import { signOut, useSession } from "next-auth/react";
import { UserAvatar } from "../users/UserAvatar";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import Image from "next/image";
import { footerLinks, languageFilters } from "@/constants";
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

const LoggedInMobileNavContent = () => {
  const session = useSession();
  const { setMobileNav } = useOpenMobileNavStore();

  return (
    <>
      {/* Mobile Menu Content */}
      <div className="overflow-y-auto flex-1">
        <div className="flex flex-row gap-4">
          <UserAvatar
            user={{
              username: session.data?.user.username || null,
              image: session.data?.user.image || null,
            }}
          />

          <a
            href={`/${session.data?.user.username}`}
            className="text-black font-bold py-2"
          >
            {session.data?.user.username}
          </a>
        </div>

        {/*Nav Links*/}
        <ul className="flex flex-col text-[#62646a] text-base gap-[20px] font-normal py-8 ">
          <Link
            href="/"
            className="hover:underline"
            key="Home"
            onClick={() => setMobileNav(false)}
          >
            Home
          </Link>
          <Link
            href="/inbox"
            className="hover:underline"
            key="Inbox"
            onClick={() => setMobileNav(false)}
          >
            Inbox
          </Link>
          <Link href="/" className="hover:underline" key="Manage Orders">
            Manage Orders
          </Link>
          <Accordion type="multiple" key="Categories">
            <AccordionItem value="1">
              <AccordionTrigger className="py-0">
                <span className="font-normal"> Browse Categories</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0">
                <MobileNavLinks links={footerLinks[0].links} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col pt-11 gap-4">
            <span className="text-sm text-black font-semibold">General</span>
            <div className="w-full h-px bg-slate-200" />
          </div>

          <Link href="/" className="hover:underline" key="Settings">
            Settings
          </Link>

          <Link href="/" className="hover:underline" key="Billings">
            Billings and payments
          </Link>

          <span
            className="hover:underline cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              signOut({ callbackUrl: `${window.location.origin}/` });
            }}
            key="Log Out"
          >
            Log Out
          </span>

          <Accordion type="multiple" key="Language">
            <AccordionItem value="2">
              <AccordionTrigger className="flex flex-row gap-2 py-2">
                <span className="font-normal">English</span>
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

export default LoggedInMobileNavContent;
