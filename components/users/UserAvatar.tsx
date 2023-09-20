import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/Avatar";
import Image from "next/image";

type UserAvatarProps = AvatarProps & {
  user: Pick<User, "image" | "username">;
};

export function UserAvatar({ user, ...props }: UserAvatarProps) {

  const {image} = user;
 
  return (
    <Avatar {...props}>
      
        <div>
          <Image
            fill
            src={ image!}
            alt="profile picture"
            referrerPolicy="no-referrer"
            className="border rounded-full hover:opacity-80 transition duration-150 ease-in-out cursor-pointer"
          />
        </div>
      
    </Avatar>
  );
}
