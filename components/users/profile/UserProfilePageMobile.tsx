import { User } from "@prisma/client";
import { FC } from "react";
import SellerCard from "./SellerCard";
import EmptyStateCard from "./EmptyStateCard";

interface UserProfilePageMobileProps {
  user: User;
}

const UserProfileMobilePage: FC<UserProfilePageMobileProps> = ({ user }) => {
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
    <div className="flex flex-col w-screen h-screen">
      <SellerCard
        username={username}
        profilePicture={image}
        country={country}
        joinedDate={createdAt}
        isOnline={isOnline}
      />
      <EmptyStateCard />
    </div>
  );
};

export default UserProfileMobilePage;
