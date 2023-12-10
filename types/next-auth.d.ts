import { User } from "next-auth";
import "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    isSeller?: boolean | null;
    image?: string | null;
    isOnline?: boolean | null;
    isActive?: boolean | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
      isSeller?: boolean | null;
      image?: string | null;
      isOnline?: boolean | null;
      isActive?: boolean | null;
    };
  }
}
