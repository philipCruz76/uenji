import Image from "next/image";
import { FC } from "react";

interface SellerCardProps {
  username: string | null;
  profilePicture: string | null;
  country?: string | null;
  joinedDate: Date | null;
  isOnline: boolean | null;
}

const SellerCard: FC<SellerCardProps> = ({
  username,
  profilePicture,
  country,
  joinedDate,
  isOnline,
}) => {
  const memberSince = new Date(joinedDate!).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="flex relative bg-white my-40  w-[400px] h-[450px]">
      <div className=" flex-col px-[30px] py-[30px]  border border-zinc-200 w-full max-h-full items-center justify-center space-y-3">
        {/* user profile info */}

        <div className="flex container flex-row absolute right-0">
          {isOnline ? (
            <div className=" flex w-[68px] max-h-[20px] flex-row absolute right-[30px] z-1 border border-green-400 text-green-400 rounded-xl justify-center items-center">
              <p className="absolute left-1 top-1/2 transform -translate-y-[70%]">
                .
              </p>
              <span>Online</span>
            </div>
          ) : (
            <div className=" flex w-[68px] max-h-[20px] flex-row absolute right-[30px] z-1 border border-zinc-400 text-zinc-400 rounded-xl justify-center items-center">
              <span>Offline</span>
            </div>
          )}
        </div>
        <div className="flex w-full items-center justify-center text-center">
          <Image
            width={150}
            height={150}
            src={profilePicture! || "./icons/default-user.svg"}
            alt="profile picture"
            referrerPolicy="no-referrer"
            className="rounded-full hover:opacity-80 transition duration-150 ease-in-out cursor-pointer"
          />
        </div>
        <div className="flex flex-col space-x-2 items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
          <p className="text-sm text-zinc-600">@{username}</p>
        </div>
        <div className="flex h-auto">
          <a className="border border-zinc-600 text-zinc-600 px-4 py-2 rounded-sm  cursor-pointer hover:bg-zinc-600 hover:text-white transform transition-colors ease-in-out duration-300 w-full h-fit  font-semibold  text-sm text-center">
            Preview Uenji Profile
          </a>
        </div>

        {/* user stats */}
        <div className="flex flex-col border-t-2 space-y-2 text-sm font-normal py-4">
          <div className="flex justify-between w-full">
            <p className="flex-row flex">
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
          <div className="flex justify-between w-full">
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

export default SellerCard;
