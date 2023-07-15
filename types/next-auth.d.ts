import { User } from "@/types/common.types";

type UserId = string;

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
