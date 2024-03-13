import db from "@/lib/db";
import { lazy } from "react";
import { redirect } from "next/navigation";
import getSession from "@/lib/actions/getSession";

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
  () => import("@/components/users/profile/UserProfilePageMobile"),
);

const ProfilePage = async ({ params, searchParams }: ProfilePageProps) => {
  const user = await db.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    return redirect("/");
  }

  const { publicMode } = searchParams;

  return (
    <>
      <section className="container hidden min-h-[100dvh] max-w-[100dvw] bg-[#FFFFFF] tablet:flex">
        <UserProfilePage user={user} publicMode={publicMode} />
      </section>
      <section className="flex min-h-[100dvh]  max-w-[100dvw] tablet:hidden">
        <UserProfileMobilePage user={user} publicMode={publicMode} />
      </section>
    </>
  );
};

export default ProfilePage;
