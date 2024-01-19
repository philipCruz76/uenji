import { User } from "@prisma/client";
import { lazy } from "react";
import getCurrentUser from "@/lib/actions/getCurrentUser";

type UserProfilePageProps = {
  user: User;
  publicMode?: boolean;
}

const PrivateProfileView = lazy(() => import("./PrivateProfileView"));
const PublicProfileView = lazy(() => import("./PublicProfileView"));

const UserProfilePage= async ({ user, publicMode }: UserProfilePageProps) => {
  const currentUser = await getCurrentUser();
  const { username } = user;

  publicMode !== undefined ? publicMode = publicMode : publicMode = currentUser?.username !== username;

  if (!publicMode) {
    return (<PrivateProfileView user={user} /> )
  } else{
    return (<PublicProfileView user={user}/> )
  }
};

export default UserProfilePage;
