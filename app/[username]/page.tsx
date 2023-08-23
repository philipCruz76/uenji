import { db } from "@/lib/db";
import { FC } from "react";
import { redirect } from "next/navigation";
import UserProfilePage from "@/components/users/profile/UserProfilePage";
import getSession from "@/lib/actions/getSession";
import UserProfileMobilePage from "@/components/users/profile/UserProfilePageMobile";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

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
