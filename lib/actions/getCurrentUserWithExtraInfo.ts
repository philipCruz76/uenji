import db from "@/lib/db";
import getSession from "./getSession";
import { redirect } from "next/navigation";

const getCurrentUserWithExtraInfo = async () => {
  try {
    const session = await getSession();

    if (!session?.user.email) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        Gig: true,
        conversations: true,
      },
    });

    if (!currentUser) {
      return redirect("/");
    }

    return currentUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getCurrentUserWithExtraInfo;
