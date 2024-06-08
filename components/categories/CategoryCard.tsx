"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  alt: string;
}

const CategoryCard: FC<CategoryCardProps> = ({
  title,
  description,
  image,
  href,
  alt,
}) => {
  return (
    <Link
      href={href}
      className="relative m-auto flex h-[344px] w-[252px] cursor-pointer items-center rounded-lg bg-white font-mono text-white"
    >
      <Image
        src={image}
        alt={alt}
        className="h-full w-full rounded-md object-fill"
        width={600}
        height={600}
      />
      <span className="absolute bottom-[15px] left-[15px] flex w-full text-base">
        {" "}
        {description}
      </span>
      <span className="absolute bottom-[40px] left-[15px] flex text-2xl font-semibold">
        {title}
      </span>
    </Link>
  );
};

export default CategoryCard;
