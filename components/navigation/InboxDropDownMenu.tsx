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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUser = useCurrentUser();

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          if (conversations.length === 0) {
            setIsLoading(true);
          }
          fetch("/api/conversations", {
            method: "GET",
          }).then((data) => {
            setIsLoading(false);
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
            className="pl-[6px] transition-all duration-150 ease-in hover:rounded-full hover:border hover:bg-[#dee2e6]"
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
          <DropdownMenuGroup className="h-[350px] w-full bg-white">
            {isLoading ? (
              <svg
                className="relative left-[45%] top-[10%] h-[32px] w-[32px] animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                fill-rule="evenodd"
                clip-rule="evenodd"
                image-rendering="optimizeQuality"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                viewBox="0 0 512000 512000"
                id="loading"
              >
                <g>
                  <g>
                    <path
                      fill="#ebecec"
                      d="M256000 2826c7527 0 13684 6157 13684 13684v68779c0 7527-6157 13685-13684 13685s-13684-6158-13684-13685V16510c0-7527 6157-13684 13684-13684z"
                    ></path>
                    <path
                      fill="#434242"
                      d="M256000 413024c7527 0 13684 6158 13684 13684v68781c0 7527-6157 13684-13684 13684s-13684-6157-13684-13684v-68781c0-7526 6157-13684 13684-13684z"
                    ></path>
                    <path
                      fill="#727271"
                      d="M2826 256000c0-7527 6157-13684 13684-13684h68779c7527 0 13685 6157 13685 13684s-6158 13684-13685 13684H16510c-7527 0-13684-6157-13684-13684z"
                    ></path>
                    <path
                      fill="#9d9e9e"
                      d="M413024 256000c0-7527 6158-13684 13684-13684h68781c7527 0 13684 6157 13684 13684s-6157 13684-13684 13684h-68781c-7526 0-13684-6157-13684-13684zM76980 76980c5322-5323 14030-5323 19352 0l48634 48633c5322 5323 5322 14032 0 19354s-14030 5322-19354 0L76979 96333c-5323-5322-5323-14030 0-19352z"
                    ></path>
                    <path
                      fill="#727271"
                      d="M367033 367033c5322-5322 14030-5322 19354 0l48633 48634c5323 5322 5323 14030 0 19352-5322 5323-14030 5323-19352 0l-48634-48633c-5322-5323-5322-14032 0-19354z"
                    ></path>
                    <path
                      fill="#c5c6c6"
                      d="M435020 76980c-5322-5323-14030-5323-19352 0l-48634 48633c-5322 5323-5322 14032 0 19354s14030 5322 19354 0l48633-48634c5323-5322 5323-14030 0-19352z"
                    ></path>
                    <path
                      fill="#434242"
                      d="M144967 367033c-5322-5322-14030-5322-19354 0l-48633 48634c-5323 5322-5323 14030 0 19352 5322 5323 14030 5323 19352 0l48634-48633c5322-5323 5322-14032 0-19354z"
                    ></path>
                    <path
                      fill="#b2b3b3"
                      d="M159115 22097c6954-2880 14999 454 17878 7407l26322 63544c2881 6954-452 15000-7407 17881-6954 2881-14999-452-17878-7407l-26322-63544c-2881-6954 452-15000 7407-17881z"
                    ></path>
                    <path
                      fill="#5b5b5b"
                      d="M316091 401072c6954-2881 14999 452 17878 7407l26322 63544c2881 6954-452 15000-7407 17881-6954 2880-14999-454-17878-7407l-26322-63544c-2881-6954 452-15000 7407-17881z"
                    ></path>
                    <path
                      fill="#d9dada"
                      d="M352885 22097c-6954-2880-14999 454-17878 7407l-26322 63544c-2881 6954 452 15000 7407 17881 6954 2881 14999-452 17878-7407l26322-63544c2881-6954-452-15000-7407-17881z"
                    ></path>
                    <path
                      fill="#2b2a29"
                      d="M195909 401072c-6954-2881-14999 452-17878 7407l-26322 63544c-2881 6954 452 15000 7407 17881 6954 2880 14999-454 17878-7407l26322-63544c2881-6954-452-15000-7407-17881z"
                    ></path>
                    <path
                      fill="#898989"
                      d="M489903 352885c2880-6954-454-14999-7407-17878l-63544-26322c-6954-2881-15000 452-17881 7407-2881 6954 452 14999 7407 17878l63544 26322c6954 2881 15000-452 17881-7407zM110928 195909c2881-6954-452-14999-7407-17878l-63544-26322c-6954-2881-15000 452-17881 7407-2880 6954 454 14999 7407 17878l63544 26322c6954 2881 15000-452 17881-7407z"
                    ></path>
                    <path
                      fill="#b2b3b3"
                      d="M489903 159115c2880 6954-454 14999-7407 17878l-63544 26322c-6954 2881-15000-452-17881-7407-2881-6954 452-14999 7407-17878l63544-26322c6954-2881 15000 452 17881 7407z"
                    ></path>
                    <path
                      fill="#5b5b5b"
                      d="M110928 316091c2881 6954-452 14999-7407 17878l-63544 26322c-6954 2881-15000-452-17881-7407-2880-6954 454-14999 7407-17878l63544-26322c6954-2881 15000 452 17881 7407z"
                    ></path>
                  </g>
                </g>
              </svg>
            ) : (
              <div className="flex h-[90px] w-full flex-col gap-2 px-2 py-2">
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
            )}
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
