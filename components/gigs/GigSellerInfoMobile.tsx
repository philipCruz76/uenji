"use client";
import { User } from "@prisma/client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/Drawer";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  SellerPersonalInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/constants/ui/button";
import Link from "next/link";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import { useState } from "react";

type GigSellerInfoMobileProps = {
  gigSeller: User;
  currentUser: string;
};

const GigSellerInfoMobile = ({
  gigSeller,
  currentUser,
}: GigSellerInfoMobileProps) => {
  const {
    username,
    name,
    id,
    languages,
    country,
    skills,
    personalWebsite,
    image,
  } = gigSeller;

  const router = useRouter();
  const [openCard, setOpenCard] = useState(false);
  const { setIsOpen } = useOpenModalStore();
  const parsedLanguages = JSON.parse(
    languages!,
  ) as SellerPersonalInfo["languages"];
  const parsedSkills = JSON.parse(skills!) as SellerProfessionalInfo["skills"];

  const openChat = () => {
    if (!currentUser) {
      setIsOpen(true);
      setOpenCard(false);
      return null;
    }
    if (currentUser === username) {
      toast.error("You can't contact yourself!");
      return;
    } else {
      fetch("/api/conversations", {
        method: "POST",
        body: JSON.stringify({ id }),
      })
        .then((data) => {
          data.json().then((conversation) => {
            router.push(`/inbox/${username}?chatId=${conversation.id}`);
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <Drawer open={openCard}>
      <DrawerTrigger asChild>
        <button
          className="w-full"
          onClick={() => {
            setOpenCard((prev) => !prev);
          }}
        >
          <div className="flex flex-row gap-4">
            <Image
              width={50}
              height={50}
              src={image || "/icons/default-user.svg"}
              alt="profile picture"
              referrerPolicy="no-referrer"
              className="h-[50px] w-[50px] rounded-full border transition duration-150 ease-in-out "
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold">{name}</span>
              <span className="text-sm">{username}</span>
            </div>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="min-h-[60dvh] min-w-full px-6 py-4">
          <div className="flex flex-row gap-4">
            <Image
              width={50}
              height={50}
              src={image || "/icons/default-user.svg"}
              alt="profile picture"
              referrerPolicy="no-referrer"
              className="h-[50px] w-[50px] rounded-full border transition duration-150 ease-in-out "
            />
            <div className="flex w-full flex-col">
              <span className="text-lg font-bold">{name}</span>
              <span className="text-sm text-slate-400">@{username}</span>
            </div>
            <a
              onClick={openChat}
              className="flex w-fit items-center justify-end rounded-md border px-4 text-sm font-medium text-[#495057]"
            >
              Contact
            </a>
          </div>

          <div className="flex h-full w-full flex-col pt-[50px]">
            <span className="text-lg font-bold">User Info</span>
            <div className="flex h-[60px] w-full items-center justify-start border-b border-t">
              <span className="text-sm">{gigSeller.description}</span>
            </div>
            <div className="flex h-fit w-full flex-row items-center justify-start gap-4 border-b py-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#495057"
                viewBox="0 0 256 256"
              >
                <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
              </svg>
              <div className="flex flex-col justify-start gap-2 text-start text-xs">
                <span className="text-[#adb5bd]">From</span>
                <span className="font-semibold">
                  {!gigSeller.country ? "Unknown" : gigSeller.country}
                </span>
              </div>
            </div>
            <div className="flex h-fit w-full flex-row items-center justify-start gap-4 border-b py-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#495057"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
              </svg>
              <div className="flex flex-col justify-start gap-2 text-start text-xs">
                <span className="text-[#adb5bd]">Languages</span>
                <span className="font-semibold">
                  {parsedLanguages.length < 1
                    ? "Unknown"
                    : parsedLanguages.map((language) => {
                        return `${language.name} `;
                      })}
                </span>
              </div>
            </div>
            <div className="flex h-fit w-full flex-row items-center justify-start gap-4 border-b py-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#495057"
                viewBox="0 0 256 256"
              >
                <path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z"></path>
              </svg>
              <div className="flex flex-col justify-start gap-2 text-start text-xs">
                <span className="text-[#adb5bd]">Skills</span>
                <span className="font-semibold">
                  {parsedSkills.length < 1
                    ? "Unknown"
                    : parsedSkills.map((skill) => {
                        return `${skill.name} `;
                      })}
                </span>
              </div>
            </div>
          </div>
          <div className="group w-full items-center justify-center py-6">
            <Link
              href={`/${gigSeller.username}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex cursor-pointer border-[#495057] bg-[#dee2e6] transition duration-200 ease-in-out group-hover:scale-105 group-hover:border-[#495057] group-hover:bg-[#dee2e6] group-hover:bg-opacity-75 ",
              )}
            >
              Full Profile
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GigSellerInfoMobile;
