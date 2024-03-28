"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { UserGigs } from "@/types/common.types";
import { GigPricing } from "@/types/gigWizard.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserGigsShowcaseMobileProps = {
  gigsToShow: UserGigs;
  drafts?: boolean;
};

export default function UserGigsShowcaseMobile({
  gigsToShow,
  drafts,
}: UserGigsShowcaseMobileProps) {
  const router = useRouter();
  if (!gigsToShow) return null;
  return (
    <div className="h-full w-full space-y-2">
      {gigsToShow.map((gig) => {
        const parsedPackages = JSON.parse(
          gig.packages!,
        ) as GigPricing["packages"];
        return (
          <Card
            key={`gig-${gig.id}`}
            className="flex h-[100px] w-full flex-row hover:cursor-pointer"
            onClick={() => {
              if (drafts) {
                router.push(
                  `/${gig.user.username}/manage_gigs/${gig.title.replace(/\s/g, "-")}/edit?step=1`,
                );
              } else {
                router.push(
                  `/${gig.user.username}/${gig.title.split(" ").join("-")}/`,
                );
              }
            }}
          >
            {!drafts && (
              <CardTitle className="h-full min-w-[120px]">
                <Image
                  alt={gig.title}
                  src={gig.coverImage!}
                  width={120}
                  height={120}
                  className="h-full w-[120px] rounded-s-md border-r object-fill"
                />
              </CardTitle>
            )}

            <CardContent className="flex h-full w-full flex-col items-start bg-[#f8f9fa] p-[8px] text-sm">
              <span className="flex flex-row items-center justify-center gap-[4px] text-[#ffcf00]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#ffcf00"
                  viewBox="0 0 256 256"
                >
                  <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                </svg>
                5.0{" "}
                <span className="text-xs font-light text-slate-500">
                  {"(5)"}
                </span>
              </span>
              <span className="font-mono ">{gig.title}</span>
              {gig.published ? (
                <div className="flex h-full w-full items-end justify-end text-end">
                  <span className=" w-full text-end">
                    {" "}
                    De{" "}
                    <span className="px-[4px] font-bold">
                      {parsedPackages[0].price}.00 AOA
                    </span>
                  </span>
                </div>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
