"use server";

import { db } from "../../db";
import getCurrentUser from "../getCurrentUser";

const getChatPartners = async () => {
  const currentUser = await getCurrentUser();

  try {
    const chats = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: currentUser?.email,
        },
      },
    });
    return chats;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getChatPartners;
