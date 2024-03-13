import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const session = useSession();
  return session.data ? session.data.user : null;
};

export default useCurrentUser;
