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
      className="group flex h-fit w-full transform cursor-pointer  items-center justify-center gap-3 rounded-sm border  border-black bg-black px-4 py-2 text-center text-sm font-semibold text-white duration-200 ease-in-out  hover:scale-105"
    >
      Contact Me
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#FFFFFF"
        viewBox="0 0 256 256"
        className="group-hover:animate-wiggle"
      >
        <path d="M88,104a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,104Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,56V184a16,16,0,0,1-16,16H156.53l-14.84,24.29a16,16,0,0,1-27.41-.06L99.47,200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V184H99.47a16.08,16.08,0,0,1,13.7,7.73L128,216l14.82-24.32A16.07,16.07,0,0,1,156.53,184H216Z"></path>
      </svg>
    </a>
  );
};

export default ProfileContactButton;
