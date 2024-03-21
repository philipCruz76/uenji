import { User } from "@prisma/client";
import { lazy } from "react";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getSession from "@/lib/actions/getSession";

type UserProfilePageProps = {
  user: User;
  publicMode?: boolean;
};

const PrivateProfileView = lazy(() => import("./PrivateProfileView"));
const PublicProfileView = lazy(() => import("./PublicProfileView"));

const UserProfilePage = async ({ user, publicMode }: UserProfilePageProps) => {
  const session = await getSession();
  const { username } = user;
  let currentUsername = "";
  if (session !== null) {
    const currentUser = await getCurrentUser();
    currentUsername = currentUser?.username || "";
  }

  if (currentUsername !== username || !session) {
    publicMode = true;
  }

  return (
    <>
      {publicMode === undefined && <PrivateProfileView user={user} />}
      {publicMode === true && <PublicProfileView user={user} />}
    </>
  );
};

export default UserProfilePage;
