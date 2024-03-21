import { User } from "@prisma/client";
import { FC, lazy } from "react";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import GigCard from "@/components/gigs/GigCard";
import getUserGigs from "@/lib/actions/gigs/getUserGigs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import getSession from "@/lib/actions/getSession";
import PublicProfileViewMobile from "./PublicProfileViewMobile";

type UserProfilePageMobileProps = {
  user: User;
  publicMode?: boolean;
};

const SellerOnboardingCard = lazy(() => import("../SellerOnboardingCard"));
const ProfileInfoCard = lazy(() => import("../ProfileInfoCard"));
const SellerInfoCard = lazy(() => import("../SellerInfoCard"));

const UserProfileMobilePage = async ({
  user,
  publicMode,
}: UserProfilePageMobileProps) => {
  const session = await getSession();
  let currentUsername = "";
  if (session !== null) {
    const currentUser = await getCurrentUser();
    currentUsername = currentUser?.username || "";
  }
  const { username, country, image, isSeller, createdAt, isOnline } = user;
  const userGigs = await getUserGigs(user.id);
  publicMode !== undefined
    ? (publicMode = publicMode)
    : (publicMode = currentUsername !== username || !session);

  if (publicMode === true || publicMode === undefined) {
    return <PublicProfileViewMobile user={user} />;
  }
  return (
    <div className="h-full w-full">
      <ProfileInfoCard
        userId={user.id}
        username={username}
        image={image}
        country={country}
        createdAt={createdAt}
        isOnline={isOnline}
      />
      {isSeller ? (
        <div className=" w-full gap-4">
          <SellerInfoCard user={user} />

          <Carousel
            className="px-4 pb-[20px] pt-[10px]"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="  w-full ">
              {userGigs && userGigs.length > 0
                ? userGigs.map((userGig, index) => (
                    <CarouselItem
                      key={`popular-gig-${index}`}
                      className="pl-[16dvw]"
                    >
                      <GigCard gigToShow={userGig} index={index} />
                    </CarouselItem>
                  ))
                : null}
            </CarouselContent>
            {userGigs && userGigs.length > 1 ? (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            ) : null}
          </Carousel>
        </div>
      ) : publicMode ? null : (
        <SellerOnboardingCard />
      )}
    </div>
  );
};

export default UserProfileMobilePage;
