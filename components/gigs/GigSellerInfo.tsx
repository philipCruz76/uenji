"use client";

import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { useOpenModalStore } from "@/lib/stores/modals/modal-store";
import {
  SellerPersonalInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type GigSellerInfoProps = {
  user: User;
  gigTitle: string;
};

const GigSellerInfo = ({ user, gigTitle }: GigSellerInfoProps) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { setIsOpen } = useOpenModalStore();
  const { displayName, image, country, languages, id, username, skills, name } = user;
  const parsedLanguages = JSON.parse(
    languages!,
  ) as SellerPersonalInfo["languages"];
  const parsedSkills = JSON.parse(skills!) as SellerProfessionalInfo["skills"];

  const openChat = () => {
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
  };
  return (
    <div className="mr-[10%] flex h-[500px] w-full flex-col gap-4">
      <h1 className="pb-[16px] text-3xl font-bold">
        {gigTitle.charAt(0).toUpperCase() + gigTitle.slice(1)}
      </h1>
      <div className="flex flex-row items-center justify-start gap-6">
        <Link href={`/${username}`}>
        <Image
          width={150}
          height={150}
          src={image! || "/icons/default-user.svg"}
          alt="profile picture"
          referrerPolicy="no-referrer"
          className="h-[100px] w-[100px] rounded-full border transition duration-150 ease-in-out "
        />
        </Link>
        {/* user info */}
        <div className="flex flex-col items-start justify-start gap-3 ">
        <Link href={`/${username}`}>
          <h3
            className="text-2xl font-bold text-gray-800"
            aria-label="Public Name"
          >
            { !displayName? name : displayName}
          </h3>
          </Link>
          {/*User Location*/}
          <span
            className="flex flex-row items-center justify-start gap-2 text-sm text-gray-600"
            aria-label="Location"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
            </svg>
            <span className="mr-[6px]">
              {country ? `${country}, ` : "Unknown Location"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
            </svg>
            <span>
              Sei falar{" "}
              {parsedLanguages.map((language, index) => {
                if (index === parsedLanguages.length - 1) return language.name;
                return `${language.name}, `;
              })}
            </span>
          </span>

          <button
            className="h-[36px] w-[150px] border text-sm font-semibold transition duration-200 ease-in-out hover:scale-105 hover:bg-gray-200"
            onClick={openChat}
          >
            Entrar em contacto
          </button>
        </div>
      </div>

      {/* user description */}
      <div className="flex-wrap text-justify">{user.description}</div>

      {/* user skills */}
      <ul className="flex flex-row gap-2">
        {parsedSkills.map((skill) => (
          <li
            key={skill.name}
            className=" w-fit rounded-2xl border bg-gray-100 px-[6px] py-[6px] text-center text-sm"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GigSellerInfo;
