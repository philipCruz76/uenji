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
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
      >
        <Image fill src={image!} alt="Avatar" />
      </div>
      {isOnline ? (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
        />
      ) : (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-gray-400 
            top-[-4px] 
            right-0
            border-white
            border-[2px]
            h-[15px] 
            w-[15px]
          "
        />
      )}
    </div>
  );
};

export default ChatAvatar;
