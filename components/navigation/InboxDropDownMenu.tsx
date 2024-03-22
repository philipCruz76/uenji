"use client";
import { FC, lazy, useState } from "react";
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
import Link from "next/link";
import useCurrentUser from "@/lib/hooks/useCurrentUser";

interface InboxDropDownMenuProps {}

const UserChatList = lazy(() => import("@/components/inbox/UserChatList"));

const InboxDropDownMenu: FC<InboxDropDownMenuProps> = ({}) => {
  const [conversations, setConversations] = useState<FullConversationType[]>(
    [],
  );
  const currentUser = useCurrentUser();

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
            fill="#000000"
            viewBox="0 0 350 256"
            className=" pl-[6px] transition-all duration-150 ease-in hover:rounded-full hover:border hover:bg-[#dee2e6] "
          >
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="fixed right-[-1rem] flex w-[400px] flex-col bg-white">
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
          <DropdownMenuGroup className="h-[350px] w-full bg-white ">
            <div className=" flex h-[90px] w-full flex-col gap-2 px-2 py-2">
              {conversations.map((conversation) => {
                const chatParner = conversation.users.filter((user) => {
                  return user.email !== currentUser?.email;
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
          <DropdownMenuGroup className="flex w-full flex-row justify-end">
            <Link
              href="/inbox"
              className="text-sm text-blue-700 transition duration-200 ease-in-out hover:underline"
            >
              Abrir caixa de entrada
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default InboxDropDownMenu;
