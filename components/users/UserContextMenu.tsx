import { UserAvatar } from "./UserAvatar";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

type UserContextMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  user: Pick<User, "image" | "username" | "isSeller">;
};

export default function UserContextMenu({ user }: UserContextMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          avatarPhoto={user.image!}
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-[#62646a]" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Image
              src="/icons/default-user.svg"
              alt="user icon"
              width={12}
              height={12}
              className="mr-2"
            />
            <Link href={`/${user.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Image
              src="/icons/friends.svg"
              alt="Settings"
              width={12}
              height={12}
              className="mr-2"
            />
            <Link href="/" className="text-sky-500">
              Refer a Friend
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!user.isSeller ? (
            <DropdownMenuItem>
              <Link href="/freelancer_onboarding/overview">
                Become a Seller
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem>
            <Image
              src="/icons/settings.svg"
              alt="Settings"
              width={12}
              height={12}
              className="mr-2"
            />
            <Link href="/">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signOut({ callbackUrl: `${window.location.origin}/` });
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
