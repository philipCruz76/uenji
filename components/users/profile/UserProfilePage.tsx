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
  let currentUsername = "";
  if (session !== null) {
    const currentUser = await getCurrentUser();
    currentUsername = currentUser?.username || "";
  }

  const { username } = user;

  publicMode !== undefined
    ? (publicMode = publicMode)
    : (publicMode = currentUsername !== username || !session);

  if (publicMode === false) {
    return <PrivateProfileView user={user} />;
  } else if (publicMode === true || publicMode === undefined) {
    return <PublicProfileView user={user} />;
  }
};

export default UserProfilePage;
