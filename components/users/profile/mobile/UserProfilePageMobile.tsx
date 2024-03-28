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
import UserGigsShowcaseMobile from "./UserGigsShowcaseMobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

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
  const { username, country, image, isSeller, createdAt, isOnline, id } = user;
  const userGigs = await getUserGigs(user.id);
  const publishedGigs = userGigs?.filter((gig) => gig.published === true);
  const draftGigs = userGigs?.filter((gig) => gig.published === false);
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
          <Tabs defaultValue="published" className="w-full px-4 py-[30px]">
            <TabsList className="w-full rounded-none  bg-white">
              <TabsTrigger
                value="published"
                className="border-none font-semibold ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
              >
                Serviços Publicados
              </TabsTrigger>
              <TabsTrigger
                value="drafts"
                className="border-none font-semibold ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
              >
                Rascunhos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="published">
              <UserGigsShowcaseMobile gigsToShow={publishedGigs} />
            </TabsContent>
            <TabsContent value="drafts">
              <UserGigsShowcaseMobile gigsToShow={draftGigs} drafts />
            </TabsContent>
          </Tabs>
        </div>
      ) : publicMode ? null : (
        <SellerOnboardingCard />
      )}
    </div>
  );
};

export default UserProfileMobilePage;
