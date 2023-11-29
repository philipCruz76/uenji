"use client";
import { FullMessageType } from "@/types/common.types";
import { FC, lazy, useEffect, useState } from "react";
import { find } from "lodash";
import useConversation from "@/lib/hooks/useConversation";
import { usePusherStore } from "@/lib/stores/pusher-store";

const MessageBox = lazy(() => import("./MessageBox"));

type BodyProps = {
  initialMessages: FullMessageType[];
};

const Body: FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const pusher = usePusherStore((state) => state.pusherClient);
  const { chatId } = useConversation();

  useEffect(() => {
    const channel = pusher.subscribe(chatId);
    const div = document.getElementById("MessageBox");
    if (div) div.scrollTop = div.scrollHeight;

    const messageHandler = (message: FullMessageType) => {
      if (div) div.scrollTop = div.scrollHeight;
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
    };

    channel.bind("messages:new", messageHandler);
    return () => {
      channel.unbind("messages:new", messageHandler);
    };
  }, [messages]);

  return (
    <div id="MessageBox" className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
    </div>
  );
};

export default Body;
