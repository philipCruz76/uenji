"use client";
import { Progress } from "@/components/ui/Progress";
import { useSession } from "next-auth/react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> =  ({}) => {
  const {data} = useSession();
  data?.user

  return (
    <section className="flex flex-col container w-screen h-screen">
      <div className="flex w-full h-[70px] justify-between border-b pt-6">
        <ul className="flex flex-row gap-2 px-4 cursor-pointer">
          <li
            key="personalInfo"
            className="flex flex-row gap-4 items-center justify-center text-center"
          >
            <i className="flex items-center justify-center w-[40px] h-[40px] border rounded-full bg-sky-600 text-white">
              1
            </i>
            <span className="text-sky-600 text-sm "> Personal Info</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="#676869"
              viewBox="0 0 256 256"
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </li>
          <li
            key="personalInfo"
            className="flex flex-row gap-4 items-center justify-center text-center"
          >
            <i className="flex items-center justify-center w-[40px] h-[40px] border rounded-full bg-gray-400 text-white">
              2
            </i>
            <span className="text-gray-400 text-sm"> Professional Info</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="#676869"
              viewBox="0 0 256 256"
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </li>
          <li
            key="personalInfo"
            className="flex flex-row gap-4 items-center justify-center text-center"
          >
            <i className="flex items-center justify-center w-[40px] h-[40px] border rounded-full bg-gray-400 text-white">
              3
            </i>
            <span className="text-gray-400 text-sm"> Account Security</span>
          </li>
        </ul>

        <div className="flex flex-col gap-2 w-fit h-full px-4">
          <span className="text-sm">Completion Rate: 33% </span>
          <Progress value={33} className="w-full h-[8px]" />
        </div>
      </div>

      <form>
        <div className="flex flex-col gap-4 w-full h-full py-4 border-b">
          <h1 className="font-bold text-4xl"> Personal Info</h1>
          <h3 className="flex flex-wrap max-w-[500px]">
            Tell us a bit about yourself. This information will appear on your
            public profile, so that potential buyers can get to know you better.
          </h3>
          <h3 className="text-end"> * Mandatory fields</h3>
        </div>

        {/* Full Name */}
        <div>

        </div>

        {/* Display Name */}
        <div>

        </div>

        {/* Profile Picture */}
        <div>

        </div>

{/* Description */}
        <div>

        </div>

        {/* Languages */}
        <div>

        </div>

        <button> Continue</button>
      </form>
    </section>
  );
};

export default page;
