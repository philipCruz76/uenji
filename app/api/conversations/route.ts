import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { id } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Unauthorized", { status: 400 });
    }

    const singleConversation = await db.conversation.findFirst({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, id],
            },
          },
          {
            userIds: {
              equals: [id, currentUser.id],
            },
          },
        ],
      },
    });

    if (singleConversation) {
      return Response.json(singleConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: id,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    // Update all connections with new conversation
    newConversation.users.map(async (user) => {
      if (user.email) {
        await pusherServer.trigger(
          user.email,
          "conversation:new",
          newConversation,
        );
      }
    });

    return Response.json(newConversation);
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Unauthorized", { status: 400 });
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return Response.json(existingConversations);
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}
