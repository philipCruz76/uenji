import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

const DesktopFooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex min-w-max flex-1 flex-col gap-3 text-sm">
    <h4 className="text-lg font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className="transition duration-200 ease-in-out hover:scale-105 hover:underline"
        >
          {link.name}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <>
      <div className="flex h-px w-full bg-gray-200 " />

      <footer className=" flex h-fit min-w-full bg-[#f8f9fa] text-black">
        <div className=" flex flex-col justify-between gap-6 px-5 py-6 desktop:px-20">
          <div className="w-full gap-12">
            <Image
              src={"/images/uenji-logo-black.png"}
              alt="Uenji Logo"
              className="h-auto  w-auto items-start"
              width={150}
              height={150}
            />

            <div className="flex w-full flex-wrap items-start justify-between gap-[50px] text-start">
              <DesktopFooterColumn
                title={footerLinks[0].title}
                links={footerLinks[0].links}
              />

              <DesktopFooterColumn
                title={footerLinks[1].title}
                links={footerLinks[1].links}
              />

              <DesktopFooterColumn
                title={footerLinks[2].title}
                links={footerLinks[2].links}
              />
            </div>
          </div>

          <div className="my-0.5 h-px w-full bg-gray-200" />
          <div className="max-sm:flex-col flex w-full items-center justify-between text-sm font-normal">
            <span className="text-white-500 font-semibold">
              © 2023 Uenji. All rights reserved
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
