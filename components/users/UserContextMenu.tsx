import { UserAvatar } from "./UserAvatar";
import { User } from "@prisma/client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type UserContextMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  user: Pick<User, "id" | "image" | "username" | "isSeller" | "sellerView">;
};

export default function UserContextMenu({ user }: UserContextMenuProps) {
  const router = useRouter();
  const [currentViewTitle, setCurrentViewTitle] = useState<
    "Comprador" | "Vendedor"
  >(user.sellerView ? "Comprador" : "Vendedor");
  const locale = useLocale();

  const conxtextMenuText = useTranslations("UserContextMenu");

  const switchView = () => {
    fetch("/api/seller_view", {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        setCurrentViewTitle(user.sellerView ? "Vendedor" : "Comprador");
        router.push("/");
        router.refresh();
        toast.success(
          `${conxtextMenuText("modeSuffix")} ${user.sellerView ? conxtextMenuText("buyer") : conxtextMenuText("seller")}`,
        );
      } else {
        toast.error("Error switching View");
      }
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <UserAvatar
          avatarPhoto={user.image!}
          className="h-[36px] w-[36px] cursor-pointer rounded-full border border-none bg-white pr-4 ring-transparent"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black" align="start">
        {!user.isSeller ? (
          <DropdownMenuItem className="group">
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex cursor-pointer border-[#495057] bg-[#dee2e6] transition duration-200 ease-in-out hover:border-[#495057] hover:bg-[#dee2e6] group-hover:scale-105 group-hover:bg-opacity-75",
              )}
              href="/freelancer_onboarding/overview"
            >
              <span>{conxtextMenuText("sellerCTA")}</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="group">
            <button
              onClick={switchView}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex cursor-pointer border-[#495057] bg-[#dee2e6] transition duration-200 ease-in-out hover:border-[#495057] hover:bg-[#dee2e6] group-hover:scale-105 group-hover:bg-opacity-75",
              )}
            >
              <span>
                {locale === "pt" &&
                  conxtextMenuText("modePrefix") + currentViewTitle}
                {locale === "en" &&
                  conxtextMenuText("modePrefix") +
                    (currentViewTitle === "Comprador" ? "Buyer" : "Seller") +
                    conxtextMenuText("modeSuffix")}
              </span>
            </button>
          </DropdownMenuItem>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#000000"
              viewBox="0 0 256 256"
              className="mr-2 transition duration-200 ease-in-out group-hover:scale-125"
            >
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
            <Link
              href={`/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <span className="transition duration-200 ease-in-out group-hover:scale-105 ">
                {conxtextMenuText("profile")}
              </span>
              <div
                className={cn(
                  "block h-[2px]  bg-transparent transition duration-200 ease-in-out group-hover:scale-x-150  group-hover:bg-current ",
                  locale === "pt" ? "w-[24px]" : "w-[30px]",
                )}
              />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator color="primary" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#000000"
              viewBox="0 0 256 256"
              className="mr-2 transition duration-200 ease-in-out group-hover:scale-125"
            >
              <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
            </svg>
            <Link
              href="/inbox"
              className="flex flex-col items-center justify-center"
            >
              <span className="transition duration-200 ease-in-out group-hover:scale-105 ">
                {conxtextMenuText("inbox")}
              </span>
              <div
                className={cn(
                  "block h-[2px] bg-transparent transition duration-200 ease-in-out group-hover:scale-x-150  group-hover:bg-current ",
                  locale === "pt" ? " w-[80px]" : "w-[25px]",
                )}
              />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#000000"
              viewBox="0 0 256 256"
              className="mr-2 transition duration-200 ease-in-out group-hover:scale-125"
            >
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
            </svg>
            <Link
              href="/"
              className="flex flex-col items-center justify-center"
            >
              <span className="transition duration-200 ease-in-out group-hover:scale-105 ">
                {conxtextMenuText("settings")}
              </span>
              <div
                className={cn(
                  "block h-[2px]  bg-transparent transition duration-200 ease-in-out group-hover:scale-x-150  group-hover:bg-current ",
                  locale === "pt" ? "w-[50px] " : "w-[40px]",
                )}
              />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="group"
            onSelect={(event) => {
              event.preventDefault();
              signOut({ callbackUrl: `${window.location.origin}/` });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#000000"
              viewBox="0 0 256 256"
              className="mr-2 transition duration-200 ease-in-out group-hover:scale-125"
            >
              <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path>
            </svg>
            <div className="group flex cursor-pointer flex-col items-start justify-start">
              <span className="text-start transition duration-200 ease-in-out group-hover:scale-105 ">
                {conxtextMenuText("logout")}
              </span>
              <div
                className={cn(
                  "block h-[2px] bg-transparent transition duration-200 ease-in-out group-hover:scale-x-150  group-hover:bg-current ",
                  locale === "pt" ? "w-[24px]" : "ml-2 w-[38px]",
                )}
              />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
