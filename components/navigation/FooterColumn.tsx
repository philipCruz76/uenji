import Link from "next/link";

const FooterColumn = ({
  links,
}: {
  links: { name: string; href: string }[];
}) => (
  <ul className="flex flex-col items-start">
    {links.map((link) => (
      <Link href={link.href} key={link.name} className="hover:underline">
        {link.name}
      </Link>
    ))}
  </ul>
);

export default FooterColumn;
