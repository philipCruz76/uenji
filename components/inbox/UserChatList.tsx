'use client'
import { FC, lazy, useMemo } from "react";
import { FullConversationType, User } from "@/types/common.types";


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
        <a
          href={`/inbox/${chatPartner.username}?chatId=${data?.id}`}
          className="flex flex-1 mx-2 w-full h-full items-center justify-start flex-row gap-2 "
        >
          <ChatAvatar user={chatPartner} />
          
          <div className="flex flex-col ">
            <span className="flex relative -top-[6px] text-sm font-semibold">
              {chatPartner.name ? chatPartner.name : chatPartner.username}
            </span>
            <span className="flex relative text-sm text-slate-600">
              {lastMessage?.body || "No messages yet"}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default UserChatList;
