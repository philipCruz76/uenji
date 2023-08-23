import { User } from "@prisma/client";
import { FC } from "react";
import SellerCard from "./SellerCard";
import EmptyStateCard from "./EmptyStateCard";

interface UserProfilePageProps {
  user: User;
}

const UserProfilePage: FC<UserProfilePageProps> = ({ user }) => {
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
  return (
    <div className="flex flex-row flex-wrap  desktop:min-h-[2000px] justify-between w-screen ">
      <div className="block w-[400px] my-20 desktop:max-h-[2000px] ">
        <SellerCard
          username={username}
          profilePicture={image}
          country={country}
          joinedDate={createdAt}
          isOnline={isOnline}
        />
      </div>
      <div className="block my-20">
        <EmptyStateCard />
      </div>
    </div>
  );
};

export default UserProfilePage;
