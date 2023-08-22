import { db } from "@/lib/db";
import { FC } from "react";
import { redirect } from "next/navigation";
import UserProfilePage from "@/components/users/profile/UserProfilePage";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

const ProfilePage: FC<ProfilePageProps> = async ({
  params,
}: ProfilePageProps) => {
  const user = await db.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <section className="flex container bg-neutral-100 min-w-screen min-h-screen">
      <UserProfilePage user={user} />
    </section>
  );
};

export default ProfilePage;
