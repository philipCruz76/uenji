import { db } from "@/lib/db";
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
  () => import("@/components/users/profile/UserProfilePage")
);
const UserProfileMobilePage = lazy(
  () => import("@/components/users/profile/UserProfilePageMobile")
);

const ProfilePage = async ({ params, searchParams }: ProfilePageProps) => {
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

  const { publicMode } = searchParams;

  return (
    <>
      <section className="tablet:flex hidden container bg-neutral-100 w-[100dvw] min-h-[100dvh]">
        <UserProfilePage user={user} publicMode={publicMode} />
      </section>
      <section className="tablet:hidden flex  bg-neutral-100 w-[100dvw] h-[100dvh]">
        <UserProfileMobilePage user={user} publicMode={publicMode} />
      </section>
    </>
  );
};

export default ProfilePage;
