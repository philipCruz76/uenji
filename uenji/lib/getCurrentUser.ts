import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { SessionInterface } from "@/types/common.types";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;

    return session;
}
 