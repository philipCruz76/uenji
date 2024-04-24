import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { CategoryDesciptionsEN, CategoryDesciptionsPT } from "@/constants";
import { cn } from "@/lib/utils";
import { Category, UserGigs } from "@/types/common.types";
import { GigPricing } from "@/types/gigWizard.types";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

type GigCardProps = {
  gigToShow: NonNullable<UserGigs>[number];
  index: number;
  size?: "small" | "large";
};

const GigCard = async({ gigToShow, size }: GigCardProps) => {
  const parsedPackages = JSON.parse(
    gigToShow.packages!,
  ) as GigPricing["packages"];
  const locale = await getLocale();

  let CategoryDescriptions: Category[];

  if (locale === "en") {
    CategoryDescriptions = CategoryDesciptionsEN;
  } else {
    CategoryDescriptions = CategoryDesciptionsPT;
  }

   const category = CategoryDescriptions.find(
    (category) => category.categoryName === gigToShow.category,
  )!;
  return (
    <Card
      className={cn(
        size && size === "small"
          ? "max-h-[320px] min-h-[320px] max-w-[200px]"
          : "max-h-[360px] min-h-[280px] min-w-[260px] max-w-[260px]",
        "flex  flex-col gap-2 overflow-hidden rounded-lg border transition duration-200 ease-in-out hover:scale-105",
      )}
    >
      <CardHeader
        className={cn(
          size && size === "small"
            ? "max-h-[100px]"
            : "  max-h-[160px] min-h-[160px] ",
          "max-w-full  rounded-md p-1",
        )}
      >
        {/* Gig Image */}
        <Link
          className="h-full min-w-full"
          href={`/${gigToShow.user.username}/${gigToShow.title.replace(
            /\s/g,
            "-",
          )}`}
        >
          <Image
            src={gigToShow.coverImage!}
            width={260}
            height={100}
            alt={`${gigToShow.title} image`}
            className="h-full w-full rounded-md object-contain"
          />
        </Link>
      </CardHeader>
      <CardContent className="ml-[-10px] min-h-full min-w-full gap-2 pt-[10px]">
        {/* Gig Seller */}
        <Link
          href={`/${gigToShow.user.username}/${gigToShow.title.replace(
            /\s/g,
            "-",
          )}`}
        >
          <div className="flex w-full flex-row items-center justify-between  gap-2 ">
            <Image
              src={gigToShow.user.image!}
              width={40}
              height={40}
              alt={`${gigToShow.user.username}'s profile picture`}
              className="h-[40px] w-[40px] rounded-full"
            />
            <span className=" text-ellipsis text-sm font-semibold ">
              {gigToShow.user.name}
            </span>
            <Image
              alt={category.categoryName}
              src={category.thumbnailIcon}
              width={32}
              height={32}
              className="h-[32px] w-[32px]"
            />
          </div>
          {/* Gig Title */}
          <div className="flex h-full w-full flex-col items-start justify-center gap-6 pt-[24px]">
            <h3 className="w-full text-ellipsis text-sm font-medium">
              {gigToShow.title.charAt(0).toLocaleUpperCase() +
                gigToShow.title.slice(1)}
            </h3>

            {/* Gig Price */}
            <div>
              <span className="text-ellipsis text-lg font-semibold">
                Desde {parsedPackages[0].price} AOA
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default GigCard;
