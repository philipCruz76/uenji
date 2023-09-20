"use server";
import { db } from "@/lib/db";
import getSession from "./getSession";
import { redirect } from "next/navigation";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user.email) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
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

export default getCurrentUser;
