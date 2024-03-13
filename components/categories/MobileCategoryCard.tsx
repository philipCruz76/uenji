import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface MobileCategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  alt: string;
}

const MobileCategoryCard: FC<MobileCategoryCardProps> = ({
  title,
  description,
  image,
  href,
  alt,
}) => {
  return (
    <Link
      href={href}
      className="relative m-auto flex h-[280px] w-[200px] cursor-pointer items-center rounded-lg  bg-white font-mono text-white"
    >
      <Image
        src={image}
        alt={alt}
        className="h-full rounded-md"
        width={200}
        height={300}
      />
      <span className="absolute bottom-[15px] left-[15px] flex w-full text-sm">
        {" "}
        {description}
      </span>
      <span className="absolute bottom-[40px] left-[15px] flex text-2xl font-semibold ">
        {title}
      </span>
    </Link>
  );
};

export default MobileCategoryCard;
