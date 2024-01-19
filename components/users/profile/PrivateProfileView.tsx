import { lazy } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type PrivateProfileViewProps = {
  user: User;
};

const SellerOnboardingCard = lazy(() => import("./SellerOnboardingCard"));
const ProfileInfoCard = lazy(() => import("./ProfileInfoCard"));
const SellerInfoCard = lazy(() => import("./SellerInfoCard"));

const PrivateProfileView = ({ user }: PrivateProfileViewProps) => {
  const { username, image, country, createdAt, isOnline, id, isSeller } = user;

  return (
    <div className="flex flex-row flex-wrap  desktop:min-h-[2000px] justify-between w-[100dvw] ">
      <div className="flex flex-col w-[400px] my-20 desktop:max-h-[2000px] gap-4">
        <ProfileInfoCard
         
          userId={id}
          username={username}
          image={image}
          country={country}
          createdAt={createdAt}
          isOnline={isOnline}
        />
        {isSeller ? (
          <SellerInfoCard user={user} />
        ) : null}
      </div>
      <div className="block my-20">
        {isSeller ? (
          <div className="flex flex-1 flex-col gap-6 desktop:w-[730px] tablet:w-[500px]  h-[450px] border bg-white items-center text-center justify-center">
            <span>To be implemented Gig showcase</span>
            <Link
              href={`/${username}/manage_gigs/new?step=1`}
              className="flex items-center justify-center rounded-xl border-black border w-[60px] h-[60px]"
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
        ) : (
          <SellerOnboardingCard />
        )}
      </div>
    </div>
  );
};

export default PrivateProfileView;
