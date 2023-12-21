import { User } from "@prisma/client";
import { FC, lazy } from "react";
import getCurrentUser from "@/lib/actions/getCurrentUser";

interface UserProfilePageProps {
  user: User;
}

const SellerOnboardingCard = lazy(() => import("./SellerOnboardingCard"));
const ProfileInfoCard = lazy(() => import("./ProfileInfoCard"));
const SellerInfoCard = lazy(() => import("./SellerInfoCard"));

const UserProfilePage: FC<UserProfilePageProps> = async ({ user }) => {
  const currentUser = await getCurrentUser();
  const { username, image, country, createdAt, isOnline, id, isSeller } = user;

  const publicMode = currentUser?.username !== user.username;

  return (
    <div className="flex flex-row flex-wrap  desktop:min-h-[2000px] justify-between w-[100dvw] ">
      <div className="flex flex-col w-[400px] my-20 desktop:max-h-[2000px] gap-4">
        <ProfileInfoCard
          publicMode={publicMode}
          userId={id}
          username={username}
          image={image}
          country={country}
          createdAt={createdAt}
          isOnline={isOnline}
        />
        {isSeller ? (<SellerInfoCard publicMode={publicMode} user={user}/>): null}
        
      </div>
      <div className="block my-20">
        {isSeller  ? (
          <div className="flex flex-1  desktop:w-[730px] tablet:w-[500px]  h-[450px] border bg-white items-center text-center justify-center">
            To be implemented Gig showcase
          </div>
        ) : publicMode ? null : (
          <SellerOnboardingCard />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
