"use client";

import { useSellerOnboardingStore } from "@/lib/stores/selleOboarding-store";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const page = ({}) => {
  const user = useSession().data?.user;

  const { sellerOnboardingStep, setSellerOnboardingStep } =
    useSellerOnboardingStore();

  useEffect(() => {
    sellerOnboardingStep !== 3 && setSellerOnboardingStep(3);
  }, [sellerOnboardingStep]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full h-fit py-4 border-b">
        <h1 className="font-bold text-4xl">Account Security</h1>
        <h3 className="tablet:flex hidden flex-wrap max-w-[500px]">
          Trust and safety is a big deal in our community. Please verify your
          email and phone number so that we can keep your account secured.
        </h3>
      </div>
      <form className="flex flex-col gap-4 w-full h-fit py-4 border-b">
        <div className="flex tablet:flex-row flex-col justify-start w-full h-fit group tablet:pt-[35px] ">
          <aside className="flex flex-row gap-2  items-center justify-start flex-wrap h-fit w-full min-w-[210px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#666666"
              viewBox="0 0 256 256"
            >
              <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
            </svg>
            <h3 className="py-2">
              <span>Email</span>
              <small className="text-gray-400 px-3">
                <i>Private</i>
              </small>
            </h3>
          </aside>

          <div>
            {user?.isActive === true ? (
              <div className="flex items-center tablet:w-[150px] w-full justify-center px-4 py-2 border  rounded-md shadow-sm text-sm font-medium text-gray-500 bg-sky-200  border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                Verified
              </div>
            ) : (
              <button
                type="button"
                className="flex items-center w-[150px] justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Verify
              </button>
            )}
          </div>
        </div>

        <div className="flex tablet:flex-row flex-col justify-start w-full h-fit group tablet:pt-[35px] ">
          <aside className="flex flex-row gap-2  items-center justify-start flex-wrap h-fit w-full min-w-[210px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#666666"
              viewBox="0 0 256 256"
            >
              <path d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z"></path>
            </svg>
            <h3 className="py-2">
              <span>Phone Number</span>
              <small className="text-gray-400 px-3">
                <i>Private</i>
              </small>
            </h3>
          </aside>
        </div>
      </form>
      <div className="flex items-center justify-end py-4">
        <button
          type="submit"
          className={cn(
            " tablet:w-[100px] w-full h-[40px]  bg-sky-600 text-white rounded-sm",
          )}
        >
          Concluir
        </button>
      </div>
    </>
  );
};

export default page;
