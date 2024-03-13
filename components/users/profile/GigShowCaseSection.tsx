import GigCard from "@/components/gigs/GigCard";
import getUserGigs from "@/lib/actions/gigs/getUserGigs";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type GigShowCaseSectionProps = {
  profileUser: User;
  publicMode: boolean;
};

const GigShowCaseSection = async ({
  profileUser,
  publicMode,
}: GigShowCaseSectionProps) => {
  const gigs = await getUserGigs(profileUser.id);

  if (!gigs) return null;
  return (
    <>
      <h3 className="text-center text-2xl font-semibold">
        {publicMode === true ? "My Gigs" : "Your Gigs"}
      </h3>
      <div className="grid h-[450px] min-w-full grid-cols-3 grid-rows-1 items-center justify-center gap-4 bg-white px-6">
        {gigs.map((gig, index) => (
          <div key={`gig-${index}`} className="col-span-1">
            <GigCard gigToShow={gig} index={index} size="small" />
          </div>
        ))}
        <div className="flex flex-col items-center justify-center gap-2">
          <Link
            href={`/${profileUser.username}/manage_gigs/new?step=1`}
            className="flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-black"
          >
            <Image
              alt="Create new Gig"
              src="/icons/plus-sign.svg"
              width={50}
              height={50}
            />
          </Link>
          <span className="text-sm">Create new Gig</span>
        </div>
      </div>
    </>
  );
};

export default GigShowCaseSection;
