import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/Avatar";
import Image from "next/image";

type UserAvatarProps = AvatarProps & {
  avatarPhoto: string;
};

export function UserAvatar({ avatarPhoto, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <div>
        <Image
          fill
          src={avatarPhoto}
          alt="profile picture"
          referrerPolicy="no-referrer"
          className="border rounded-full hover:opacity-80 transition duration-150 ease-in-out cursor-pointer"
        />
      </div>
    </Avatar>
  );
}
