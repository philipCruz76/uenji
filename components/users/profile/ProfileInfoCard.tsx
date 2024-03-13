"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type SellerCardProps = {
  userId: string | null;
  username: string | null;
  image: string | null;
  country: string | null;
  createdAt: Date | null;
  isOnline: boolean | null;
};

const ProfileInfoCard: FC<SellerCardProps> = ({
  username,
  image,
  country,
  createdAt,
  isOnline,
}) => {
  const memberSince = new Date(createdAt!).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative flex h-[450px]  bg-white tablet:w-[400px]">
      <div className=" max-h-full w-full flex-col  items-center justify-center space-y-3 border border-[#dee2e6] px-[30px] py-[30px]">
        {/* user profile info */}

        <div className="container absolute right-0 flex flex-row">
          {isOnline ? (
            <div className=" z-1 absolute right-[30px] flex max-h-[20px] w-[68px] flex-row items-center justify-center rounded-xl border border-green-400 text-green-400">
              <p className="absolute left-1 top-1/2 -translate-y-[70%] transform">
                .
              </p>
              <span>Online</span>
            </div>
          ) : (
            <div className=" z-1 absolute right-[30px] flex max-h-[20px] w-[68px] flex-row items-center justify-center rounded-xl border border-zinc-400 text-zinc-400">
              <span>Offline</span>
            </div>
          )}
        </div>
        <div className="flex w-full items-center justify-center text-center">
          <Image
            width={200}
            height={200}
            src={image! || "./icons/default-user.svg"}
            alt="profile picture"
            referrerPolicy="no-referrer"
            className="h-[200px] w-[200px] cursor-pointer rounded-full transition duration-150 ease-in-out hover:opacity-80"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-x-2 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
          <p className="text-sm text-zinc-600">@{username}</p>
        </div>
        <div className="flex  h-auto">
          <Link
            href={`/${username}?publicMode=true`}
            className="h-fit w-full transform cursor-pointer rounded-sm border  border-zinc-600 px-4 py-2 text-center text-sm font-semibold text-zinc-600 transition-colors duration-300  ease-in-out  hover:bg-zinc-600 hover:text-white"
          >
            Preview Uenji Profile
          </Link>
        </div>

        {/* user stats */}
        <div className="flex flex-col space-y-2 border-t-2 py-4 text-sm font-normal">
          <div className="flex w-full justify-between">
            <p className="flex flex-row">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#575b60"
                viewBox="0 0 256 256"
                className="mr-4"
              >
                <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
              </svg>
              From
            </p>
            <p className="font-bold">{country ? ` ${country}` : " Unknown"}</p>
          </div>
          <div className="flex w-full justify-between">
            <p className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#575b60"
                viewBox="0 0 256 256"
                className="mr-4"
              >
                <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
              </svg>
              Member since
            </p>
            <p className="font-bold">{memberSince}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
