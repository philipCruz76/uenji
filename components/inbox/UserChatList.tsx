"use client";
import { FC, lazy, useMemo } from "react";
import { FullConversationType, User } from "@/types/common.types";
import Link from "next/link";

type UserChatListProps = {
  data: FullConversationType;
  chatPartner: User;
};

const ChatAvatar = lazy(() => import("@/components/users/ChatAvatar"));

const UserChatList: FC<UserChatListProps> = ({ data, chatPartner }) => {
  const lastMessage = useMemo(() => {
    const messages = data?.messages || [];
    return messages[messages.length - 1];
  }, [data?.messages]);

  if (!chatPartner) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="h-[80px] w-[95%] rounded-md pr-4  transition duration-200 ease-in-out hover:scale-105 hover:bg-zinc-100">
        <Link
          href={`/inbox/${chatPartner.username}?chatId=${data?.id}`}
          className="mx-2 flex h-full w-full flex-1 flex-row items-center justify-start gap-2 "
        >
          <ChatAvatar user={chatPartner} />
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-row justify-between">
              <span className="flex w-full text-sm font-semibold">
                {chatPartner.name ? chatPartner.name : chatPartner.username}
              </span>
              <span className="flex w-full text-xs text-black">
                {data?.messages?.length > 0 &&
                data?.messages[data?.messages.length - 1]?.createdAt
                  ? new Date(
                      data?.messages[data?.messages.length - 1]?.createdAt,
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </span>
            </div>
            <span className="relative flex text-sm text-gray-600">
              {lastMessage?.sender?.username === chatPartner.username
                ? `${
                    !chatPartner.name ? chatPartner.username : chatPartner.name
                  }: `
                : "Me: "}

              {lastMessage?.body?.match(/^https:\/\/utfs\.io\/f\/.*/)
                ? "File attachment"
                : (lastMessage?.body?.length! > 25
                    ? `${lastMessage?.body?.slice(0, 25)}...`
                    : lastMessage?.body) || "No messages yet"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserChatList;
