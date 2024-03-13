import { User } from "@/types/common.types";
import Image from "next/image";
import React, { FC } from "react";

type ChatAvatarProps = {
  user: User;
};

const ChatAvatar: FC<ChatAvatarProps> = ({ user }) => {
  const { image, isOnline } = user;

  return (
    <div className="relative">
      <div
        className="
        md:h-11 
        md:w-11 
        relative 
        inline-block
        h-9 
        w-9 
        overflow-hidden 
        rounded-full
      "
      >
        <Image fill src={image!} alt="Avatar" />
      </div>
      {isOnline ? (
        <span
          className="
            md:h-3 
            md:w-3 
            absolute 
            right-0 
            top-0 
            block 
            h-2 
            w-2
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white
          "
        />
      ) : (
        <span
          className="
            absolute 
            right-0 
            top-[-4px] 
            block 
            h-[15px] 
            w-[15px]
            rounded-full
            border-[2px]
            border-white 
            bg-gray-400
          "
        />
      )}
    </div>
  );
};

export default ChatAvatar;
