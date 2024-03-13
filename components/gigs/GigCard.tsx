import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import getPopularGigs from "@/lib/actions/gigs/getPopularGigs";
import { cn } from "@/lib/utils";
import { GigPricing } from "@/types/gigWizard.types";
import Image from "next/image";
import Link from "next/link";

type GigCardProps = {
  gigToShow: NonNullable<Awaited<ReturnType<typeof getPopularGigs>>>[number];
  index: number;
  size?: "small" | "large";
};

const GigCard = ({ gigToShow, size }: GigCardProps) => {
  const parsedPackages = JSON.parse(
    gigToShow.packages!,
  ) as GigPricing["packages"];
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
          href={`/${gigToShow.user.username}`}
          className="flex w-full flex-row items-center justify-between  gap-2 "
        >
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            className="h-[32px] w-[32px]"
          >
            <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM88,160a8,8,0,1,1-8,8A8,8,0,0,1,88,160ZM48,48H80v97.38a24,24,0,1,0,16,0V115.31l48,48V208H48ZM208,208H160V160a8,8,0,0,0-2.34-5.66L96,92.69V48h32V72a8,8,0,0,0,2.34,5.66l16,16A23.74,23.74,0,0,0,144,104a24,24,0,1,0,24-24,23.74,23.74,0,0,0-10.34,2.35L144,68.69V48h64V208ZM168,96a8,8,0,1,1-8,8A8,8,0,0,1,168,96Z"></path>
          </svg>
        </Link>
        {/* Gig Title */}
        <Link
          href={`/${gigToShow.user.username}/${gigToShow.title.replace(
            /\s/g,
            "-",
          )}`}
          className="flex h-full w-full flex-col items-start justify-center gap-6 pt-[24px]"
        >
          <h3 className="w-full text-ellipsis text-sm font-medium">
            {gigToShow.title.charAt(0).toLocaleUpperCase() +
              gigToShow.title.slice(1)}
          </h3>

          {/* Gig Price */}
          <div>
            <span className="text-ellipsis text-lg font-semibold">
              Desde {parsedPackages[0].price} AKZ
            </span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default GigCard;
