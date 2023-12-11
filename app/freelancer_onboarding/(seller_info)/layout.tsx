"use client";

import { Progress } from "@/components/ui/Progress";
import Link from "next/link";
import { useSellerOnboardingStore } from "@/lib/stores/selleOboarding-store";
import { cn } from "@/lib/utils";

export default function SellerInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sellerOnboardingStep } = useSellerOnboardingStore();
  return (
    <section className="flex flex-col px-[24px] desktop:px-0 max-w-[100dvw] min-h-screen">
      <div className="flex w-full h-[70px] justify-between border-b pt-6">
        <ul className="tablet:flex hidden flex-row gap-2 px-4 cursor-pointer">
          <li
            key="personalInfo"
            className="flex flex-row gap-4 items-center justify-center text-center"
          >
            <i
              className={cn(
                "flex items-center justify-center w-[40px] h-[40px] border rounded-full text-white",
                sellerOnboardingStep === 1 ? "bg-sky-600" : "bg-gray-400",
              )}
            >
              1
            </i>
            <Link
              href={"/freelancer_onboarding/personal_info"}
              className={cn(
                "text-sm",
                sellerOnboardingStep === 1 ? "text-sky-600" : "text-gray-400",
              )}
            >
              {" "}
              Personal Info
            </Link>
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
            key="professionalInfo"
            className="flex flex-row gap-4 items-center justify-center text-center"
          >
            <i
              className={cn(
                "flex items-center justify-center w-[40px] h-[40px] border rounded-full text-white",
                sellerOnboardingStep === 2 ? "bg-sky-600" : "bg-gray-400",
              )}
            >
              2
            </i>
            <Link
              href={"/freelancer_onboarding/professional_info"}
              className={cn(
                "text-sm",
                sellerOnboardingStep === 2 ? "text-sky-600" : "text-gray-400",
              )}
            >
              {" "}
              Professional Info
            </Link>
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
            key="accountSecurity"
            className="flex flex-row gap-4 items-center justify-center text-center"
          >
            <i
              className={cn(
                "flex items-center justify-center w-[40px] h-[40px] border rounded-full text-white",
                sellerOnboardingStep === 3 ? "bg-sky-600" : "bg-gray-400",
              )}
            >
              3
            </i>
            <Link
              href={"/freelancer_onboarding/account_security"}
              className={cn(
                "text-sm",
                sellerOnboardingStep === 3 ? "text-sky-600" : "text-gray-400",
              )}
            >
              {" "}
              Account Security
            </Link>
          </li>
        </ul>
        <div className="flex flex-col gap-2 w-full h-full px-4">
          <span className="text-sm">
            Completion Rate:{" "}
            {sellerOnboardingStep === 3 ? 100 : sellerOnboardingStep * 33}%{" "}
          </span>
          <Progress
            value={sellerOnboardingStep === 3 ? 100 : sellerOnboardingStep * 33}
            className="w-full h-[8px]"
          />
        </div>
      </div>
      <section className="px-4">{children}</section>
    </section>
  );
}
