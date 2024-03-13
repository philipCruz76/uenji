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
          className="cursor-pointer rounded-full border transition duration-150 ease-in-out hover:opacity-80"
        />
      </div>
    </Avatar>
  );
}
