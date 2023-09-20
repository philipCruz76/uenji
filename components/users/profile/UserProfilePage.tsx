import { User } from "@prisma/client";
import { FC, lazy } from "react";
import getCurrentUser from "@/lib/actions/getCurrentUser";

interface UserProfilePageProps {
  user: User;
}

const EmptyStateCard = lazy(() => import("./EmptyStateCard"));
const SellerCard = lazy(() => import("./SellerCard"));

const UserProfilePage: FC<UserProfilePageProps> = async ({ user }) => {
  const currentUser = await getCurrentUser();
  const { username, image, country, createdAt, isOnline, id } = user;

  const publicMode = currentUser?.username !== user.username;

  return (
    <div className="flex flex-row flex-wrap  desktop:min-h-[2000px] justify-between w-screen ">
      <div className="block w-[400px] my-20 desktop:max-h-[2000px] ">
        <SellerCard
          publicMode={publicMode}
          userId={id}
          username={username}
          image={image}
          country={country}
          createdAt={createdAt}
          isOnline={isOnline}
        />
      </div>
      <div className="block my-20">
        {publicMode ? (
          <div className="flex flex-1  desktop:w-[730px] tablet:w-[500px]  h-[450px] border bg-white items-center text-center justify-center">
            To be implemented Gig showcase
          </div>
        ) : (
          <EmptyStateCard />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
