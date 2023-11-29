"use client";
import { FC, lazy, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { FullConversationType } from "@/types/common.types";
import { useSession } from "next-auth/react";

interface InboxDropDownMenuProps {}

const UserChatList = lazy(() => import("@/components/inbox/UserChatList"));

const InboxDropDownMenu: FC<InboxDropDownMenuProps> = ({}) => {
  const [conversations, setConversations] = useState<FullConversationType[]>(
    [],
  );
  const session = useSession();

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          fetch("/api/conversations", {
            method: "GET",
          }).then((data) => {
            data.json().then((data) => {
              setConversations(data);
            });
          });
        }
      }}
    >
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button aria-label="Inbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#575b60"
            viewBox="0 0 350 256"
            className=" hover:border hover:rounded-full hover:bg-zinc-300 hover:bg-opacity-20 pl-[6px]"
          >
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="flex flex-col fixed w-[400px] right-[-1rem]">
          <DropdownMenuLabel className="flex flex-row items-center justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="#575b60"
              viewBox="0 0 350 256"
            >
              <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
            </svg>
            <span>Inbox</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="w-full h-[350px] bg-white ">
            <div className=" flex flex-col gap-2 w-full h-[90px] py-2 px-2">
              {conversations.map((conversation) => {
                const chatParner = conversation.users.filter((user) => {
                  return user.email !== session.data?.user?.email;
                });
                return (
                  <UserChatList
                    data={conversation}
                    key={conversation.id}
                    chatPartner={chatParner[0]}
                  />
                );
              })}
            </div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-row w-full justify-end">
            <a href="/inbox" className="text-xs hover:underline text-blue-700">
              See All in Inbox
            </a>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default InboxDropDownMenu;
