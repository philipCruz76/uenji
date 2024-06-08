import db from "@/lib/db";
import { lazy } from "react";
import { redirect } from "next/navigation";

type ProfilePageProps = {
  params: {
    username: string;
  };
  searchParams: {
    publicMode?: boolean;
  };
};

const UserProfilePage = lazy(
  () => import("@/components/users/profile/UserProfilePage"),
);
const UserProfileMobilePage = lazy(
  () => import("@/components/users/profile/mobile/UserProfilePageMobile"),
);

const ProfilePage = async ({ params, searchParams }: ProfilePageProps) => {
  let publicView = searchParams.publicMode;
  const user = await db.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    return redirect("/");
  }

  const { publicMode } = searchParams;

  if (publicMode) publicView = true;
  return (
    <>
      <section className="container hidden min-h-[100dvh] max-w-[100dvw] bg-[#FFFFFF] desktop:flex">
        <UserProfilePage user={user} publicMode={publicView} />
      </section>
      <section className="flex min-h-[100dvh] max-w-[100dvw] desktop:hidden">
        <UserProfileMobilePage user={user} publicMode={publicView} />
      </section>
    </>
  );
};

export default ProfilePage;
