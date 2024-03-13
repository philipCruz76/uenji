"use client";

import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

import { useOpenModalStore } from "@/lib/stores/modals/modal-store";

type ProfileContactButtonProps = {
  username: string;
  id: string;
};

const ProfileContactButton = ({ username, id }: ProfileContactButtonProps) => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const { setIsOpen } = useOpenModalStore();

  const handleClick = useCallback(() => {
    if (!currentUser) {
      setIsOpen(true);
      return null;
    }
    if (currentUser?.username === username) {
      toast.error("You can't contact yourself!");
      return;
    }
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
  }, [currentUser]);
  return (
    <a
      onClick={handleClick}
      className="h-fit w-full transform cursor-pointer rounded-sm border border-black  bg-black px-4 py-2 text-center text-sm font-semibold text-white transition-colors duration-300  ease-in-out  hover:bg-opacity-80 hover:text-white"
    >
      Contact Me
    </a>
  );
};

export default ProfileContactButton;
