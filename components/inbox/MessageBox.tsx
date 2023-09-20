
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types/common.types";
import { format } from "date-fns";
import Image from "next/image";
import { FC, lazy } from "react";

type MessageBoxProps = {
  data: FullMessageType;
  isLast?: boolean;
}

const ChatAvatar = lazy(() => import("@/components/users/ChatAvatar"));

const MessageBox: FC<MessageBoxProps> = ({ data }) => {

  const container = cn(
    "flex container gap-3 p-4 hover:bg-gray-200 hover:bg-opacity-30"
  );
  const body = cn("flex flex-col gap-1");
  const message = cn(
    "text-sm w-full items-start text-start justify-start overflow-hidden py-2 text-slate-600"
  );

  return (
    <div className={container}>
      <ChatAvatar user={data.sender} />
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm font-semibold">
            {data.sender.name || data.sender.username}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "MMM dd, yyyy, hh:mm a")}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              className="
              object-cover 
              cursor-pointer 
              hover:scale-110 
              transition 
              translate
            "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default MessageBox;
