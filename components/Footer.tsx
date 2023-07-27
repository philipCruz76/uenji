import { footerLinks } from "@/constants";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex-1 flex flex-col gap-3 text-sm min-w-max">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link} className="hover:underline">
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <>
      <div className="flex w-full h-px bg-gray-200 " />

      <footer className="container flex min-w-full bg-slate-50">
        <div className="container justify-between flex flex-col lg:px-20 py-6 px-5 gap-6">
          <div className="flex flex-col gap-12 w-full">
            <h1 className="items-start">Uenji</h1>

            <div className="flex flex-wrap items-start justify-between text-start gap-[50px] w-full">
              <FooterColumn
                title={footerLinks[0].title}
                links={footerLinks[0].links}
              />

              <FooterColumn
                title={footerLinks[1].title}
                links={footerLinks[1].links}
              />

              <FooterColumn
                title={footerLinks[2].title}
                links={footerLinks[2].links}
              />
              <FooterColumn
                title={footerLinks[3].title}
                links={footerLinks[3].links}
              />
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-0.5" />
          <div className="flex justify-between items-center max-sm:flex-col w-full text-sm font-normal">
            <span className="text-gray-500">
              © 2023 Uenji. All rights reserved
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
