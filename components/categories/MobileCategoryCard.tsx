import Image from "next/image";
import { FC } from "react";

interface MobileCategoryCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const MobileCategoryCard: FC<MobileCategoryCardProps> = ({
  title,
  description,
  image,
  alt,
}) => {
  return (
    <div className="flex m-auto items-center relative h-[280px] w-[200px] bg-white rounded-lg  cursor-pointer">
      <Image
        src={image}
        alt={alt}
        className="h-full rounded-md"
        width={200}
        height={300}
      />
      <span className="flex absolute top-[15px] left-[15px] font-light text-white text-sm">
        {" "}
        {description}
      </span>
      <span className="flex absolute top-[50px] left-[15px] font-semibold text-2xl text-white">
        {title}
      </span>
    </div>
  );
};

export default MobileCategoryCard;
