import { lazy } from "react";
import { User } from "@prisma/client";

type PrivateProfileViewProps = {
  user: User;
};

const SellerOnboardingCard = lazy(() => import("./SellerOnboardingCard"));
const ProfileInfoCard = lazy(() => import("./ProfileInfoCard"));
const SellerInfoCard = lazy(() => import("./SellerInfoCard"));
const GigShowCaseSection = lazy(() => import("./GigShowCaseSection"));

const PrivateProfileView = ({ user }: PrivateProfileViewProps) => {
  const { username, image, country, createdAt, isOnline, id, isSeller } = user;

  return (
    <div className="my-20 flex min-h-[100dvh] max-w-[100dvw] flex-row flex-wrap justify-start gap-4">
      <div className="w-[400px] gap-4 desktop:max-h-[200dvh]">
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
      <div className="max-h-[500px] rounded-md border border-[#dee2e6] tablet:min-w-[680px]">
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
