import { User } from "@prisma/client";
import { FC, lazy } from "react";
import getCurrentUser from "@/lib/actions/getCurrentUser";

interface UserProfilePageMobileProps {
  user: User;
}
const SellerOnboardingCard = lazy(() => import("./SellerOnboardingCard"));
const ProfileInfoCard = lazy(() => import("./ProfileInfoCard"));
const SellerInfoCard = lazy(() => import("./SellerInfoCard"));

const UserProfileMobilePage: FC<UserProfilePageMobileProps> = async ({
  user,
}) => {
  const currentUser = await getCurrentUser();
  const { username, country, image, isSeller, createdAt, isOnline } = user;

  const publicMode = currentUser?.username !== user.username;
  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh]">
      <ProfileInfoCard
        userId={user.id}
        username={username}
        image={image}
        country={country}
        createdAt={createdAt}
        isOnline={isOnline}
      />
      {isSeller ? (
        <div className="gap-2 w-[100dvw] h-[100dvh]">
          <SellerInfoCard publicMode={publicMode} user={user} />
          <div className="w-full text-center py-10 h-fit">
            {" "}
            To be implemented Gig showcase
          </div>
        </div>
      ) : publicMode ? null : (
        <SellerOnboardingCard />
      )}
    </div>
  );
};

export default UserProfileMobilePage;
