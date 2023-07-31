import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";

type UserAvatarProps = AvatarProps & {
  user: Pick<User, "image" | "username">;
};

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div>
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.username}</span>
          <Image
            src="./icons/default-user.svg"
            alt="user icon"
            width={4}
            height={4}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
