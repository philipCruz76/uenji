import { db } from "@/lib/db";
import { FC, lazy } from "react";
import { redirect } from "next/navigation";
import getSession from "@/lib/actions/getSession";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

const UserProfilePage = lazy(() => import("@/components/users/profile/UserProfilePage"));
const UserProfileMobilePage = lazy(() => import("@/components/users/profile/UserProfilePageMobile"));

const ProfilePage: FC<ProfilePageProps> = async ({
  params,
}: ProfilePageProps) => {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }
  const user = await db.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <section className="tablet:flex hidden container bg-neutral-100 w-screen min-h-screen">
        <UserProfilePage user={user} />
      </section>
      <section className="tablet:hidden flex  bg-neutral-100 w-screen h-screen">
        <UserProfileMobilePage user={user} />
      </section>
    </>
  );
};

export default ProfilePage;
