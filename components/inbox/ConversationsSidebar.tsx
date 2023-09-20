"use client";
import { FullConversationType } from "@/types/common.types";
import { FC, lazy, useEffect, useMemo, useState } from "react";
import { find } from "lodash";
import { usePusherStore } from "@/lib/stores/pusher-store";

type ConversationsSidebarProps = {
  initialConversations: FullConversationType[] | [];
  currentUserEmail: string | null;
};

const UserChatList = lazy(() => import("./UserChatList"));
const InboxTypeComboBox = lazy(() => import("./InboxTypeComboBox"));

const ConversationsSidebar: FC<ConversationsSidebarProps> = ({
  initialConversations, currentUserEmail
}) => {
  const [conversations, setConversations] = useState(initialConversations);

  const pusher = usePusherStore((state)=> state.pusherClient);
  const pusherKey = useMemo(() => {
    return currentUserEmail;
  }, [currentUserEmail]);

  useEffect(() => {
    if (!pusherKey) return;

    const channel = pusher.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return { ...currentConversation, messages: conversation.messages };
          }
          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [...current, conversation];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    channel.bind("conversation:update", updateHandler);
    channel.bind("conversation:new", newHandler);
    channel.bind("conversation:remove", removeHandler);

    return () => {
      channel.unsubscribe();
      channel.unbind("conversation:update", updateHandler);
      channel.unbind("conversation:new", newHandler);
      channel.unbind("conversation:remove", removeHandler);
    }
  }, [pusherKey]);

  return (
    <aside className="flex  flex-col  w-full  h-full tablet:h-[600px] space-y-6">
      <div className=" flex flex-row w-full items-center justify-between pr-4">
        <InboxTypeComboBox />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#575b60"
          viewBox="0 0 256 256"
          className="cursor-pointer"
        >
          <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
        </svg>
      </div>

      {conversations.length !== 0 ? (
        conversations.map((conversation) => {
          const chatParner =  conversation.users.filter((user)=> {
            return user.email !== currentUserEmail
           })
          return <UserChatList data={conversation} key={conversation.id} chatPartner={chatParner[0]} />;
        })
      ) : (
        <p className="items-center justify-center text-sm text-zinc-500">
          Nothing to show here...
        </p>
      )}
    </aside>
  );
};

export default ConversationsSidebar;
