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
    <div className="flex flex-1 flex-col">
      <div className="w-full h-[80px] hover:bg-zinc-100 rounded-md pr-4">
        <Link
          href={`/inbox/${chatPartner.username}?chatId=${data?.id}`}
          className="flex flex-1 mx-2 w-full h-full items-center justify-start flex-row gap-2 "
        >
          <ChatAvatar user={chatPartner} />
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between w-full">
              <span className="flex w-full text-sm font-semibold">
                {chatPartner.name ? chatPartner.name : chatPartner.username}
              </span>
              <span className="flex w-full text-xs text-gray-400">
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
            <span className="flex relative text-sm text-slate-600">
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
