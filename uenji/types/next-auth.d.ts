import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserID = string;

declare module "next-auth/jwt" {
    interface JWT {
        id: UserID;
        name?: string;
        email?: string;
        username?: string | null;
        image?: string | null;
        isSeller?: boolean;
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: UserID;
            name?: string;
            email?: string;
            username?: string | null;
            image?: string | null;
            isSeller?: boolean;
        };
    }
}