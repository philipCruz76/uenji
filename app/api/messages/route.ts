import { NextResponse } from "next/server";

import getCurrentUser from "@/lib/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";
import { db } from "@/lib/db";
import getConversationById from "@/lib/actions/conversations/getConversationById";
import { FullMessageType } from "@/types/common.types";

export async function POST(request: Request) {
  try {
    const objectID = require("bson-objectid");

    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { text, chatId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentConversation = await getConversationById(chatId);

    if (!currentConversation) {
      return new NextResponse("Invalid conversationId", { status: 400 });
    }

    const messageToSend: FullMessageType = {
      id: objectID(),
      body: text,
      conversationId: chatId,
      senderId: currentUser.id,
      createdAt: new Date(Date.now()),
      image: null,
      seenIds: [currentUser.id],
      sender: currentUser,
      seen: [currentUser],
    };

    pusherServer.trigger(chatId, "messages:new", messageToSend);

    currentConversation?.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: chatId,
        messages: [messageToSend],
      });
    });

    const newMessage = await db.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: text,
        conversation: {
          connect: { id: chatId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await db.conversation.update({
      where: {
        id: chatId,
      },
      data: {
        updatedAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
        lastMessage: newMessage.body,
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
}
