import { FullConversationType } from "@/types/common.types";
import { User } from "@prisma/client";
import { BookmarkIcon, CircleEllipsisIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type HeaderProps = {
  conversation?: FullConversationType[];
  chatPartner: User;
};

const Header: FC<HeaderProps> = async ({ chatPartner }) => {
  const timeLastSeen = () => {
    if (chatPartner.isOnline) {
      return "Online";
    } else {
      const lastSeen = new Date(Date.now() - chatPartner.updatedAt.getTime());

      if (lastSeen.getHours() > 1) {
        return `Last seen: ${lastSeen.getHours()} hours ago`;
      }
      return `Last seen: ${new Date(
        Date.now() - chatPartner.updatedAt.getTime(),
      ).getMinutes()} minutes ago`;
    }
  };
  return (
    <header className="container flex w-full h-[80px] border-b py-4  items-center">
      <div className="flex w-full justify-between">
        <Link href="/inbox" className="flex tablet:hidden cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#0e0e0e"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </Link>
        <div className="flex flex-col">
          <div className="flex flex-row  min-w-fit items-center gap-2">
            <div className="rounded-full bg-gray-300 h-[14px] w-[14px]" />
            <h1 className="flex w-full">
              <Link
                href={`/${chatPartner.username}?source=inbox`}
                className="min-w-fit text-base tablet:text-lg font-bold underline hover:text-gray-500"
              >
                {chatPartner.name ? chatPartner.name : chatPartner.username}
              </Link>
              <span className="px-2 text-sm tablet:text-base text-gray-500">
                @{chatPartner.username}
              </span>
            </h1>
          </div>
          <small className="flex flex-row text-gray-500 text-xs">
            <span>{timeLastSeen()}</span>
          </small>
        </div>

        {/* Side Icons*/}
        <aside className="relative -right-5 flex flex-row items-center gap-3">
          <BookmarkIcon size={20} className="hidden desktop:flex" />
          <StarIcon size={20} className="hidden desktop:flex" />
          <CircleEllipsisIcon size={20} />
        </aside>
      </div>
    </header>
  );
};

export default Header;
