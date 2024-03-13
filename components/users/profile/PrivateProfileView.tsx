import { lazy } from "react";
import { User } from "@prisma/client";
import GigShowCaseSection from "./GigShowCaseSection";

type PrivateProfileViewProps = {
  user: User;
};

const SellerOnboardingCard = lazy(() => import("./SellerOnboardingCard"));
const ProfileInfoCard = lazy(() => import("./ProfileInfoCard"));
const SellerInfoCard = lazy(() => import("./SellerInfoCard"));

const PrivateProfileView = ({ user }: PrivateProfileViewProps) => {
  const { username, image, country, createdAt, isOnline, id, isSeller } = user;

  return (
    <div className="flex max-w-[100dvw] flex-row  flex-wrap justify-between desktop:min-h-[2000px] ">
      <div className="my-20  w-[400px]  gap-4 desktop:max-h-[2000px]">
        <ProfileInfoCard
          userId={id}
          username={username}
          image={image}
          country={country}
          createdAt={createdAt}
          isOnline={isOnline}
        />
        {isSeller ? <SellerInfoCard user={user} /> : null}
      </div>
      <div className="my-20 max-h-[500px] rounded-md border border-[#dee2e6] tablet:max-w-[600px] desktop:max-w-[60%]">
        {isSeller ? (
          <GigShowCaseSection profileUser={user} publicMode={false} />
        ) : (
          <SellerOnboardingCard />
        )}
      </div>
    </div>
  );
};

export default PrivateProfileView;
