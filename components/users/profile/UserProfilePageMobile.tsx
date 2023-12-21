import { User } from "@prisma/client";
import { FC, lazy } from "react";
import getCurrentUser from "@/lib/actions/getCurrentUser";

interface UserProfilePageMobileProps {
  user: User;
}
const EmptyStateCard = lazy(() => import("./SellerOnboardingCard"));
const SellerCard = lazy(() => import("./ProfileInfoCard"));

const UserProfileMobilePage: FC<UserProfilePageMobileProps> = async ({
  user,
}) => {
  const currentUser = await getCurrentUser();
  const {
    username,
    email,
    country,
    image,
    name,
    isSeller,
    createdAt,
    isOnline,
  } = user;

  const publicMode = currentUser?.username !== user.username;
  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh]">
      <SellerCard
        userId={user.id}
        username={username}
        image={image}
        country={country}
        createdAt={createdAt}
        isOnline={isOnline}
      />
      {!publicMode ? (
        <EmptyStateCard />
      ) : (
        <div className="w-full h-full"> To be implemented Gig showcase</div>
      )}
    </div>
  );
};

export default UserProfileMobilePage;
