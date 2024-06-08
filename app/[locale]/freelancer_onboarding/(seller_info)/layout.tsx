"use client";

import { Progress } from "@/components/ui/Progress";
import { useSellerOnboardingStore } from "@/lib/stores/sellerOboarding-store";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import useCurrentUser from "@/lib/hooks/useCurrentUser";

export default function SellerInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useCurrentUser();

  if (user?.isSeller) {
    redirect("/");
  }

  const { sellerOnboardingStep } = useSellerOnboardingStore();
  return (
    <section className="flex min-h-[100dvh] max-w-[100dvw] flex-col px-[24px] desktop:px-0">
      <div className="flex h-[70px] w-full justify-between border-b pt-6">
        <ul className="hidden flex-row gap-2 px-4 tablet:flex">
          <li
            key="personalInfo"
            className="flex flex-row items-center justify-center gap-4 text-center"
          >
            <i
              className={cn(
                "flex h-[40px] w-[40px] items-center justify-center rounded-full border text-white",
                sellerOnboardingStep === 1 ? "bg-sky-600" : "bg-gray-400",
              )}
            >
              1
            </i>
            <span
              className={cn(
                "text-sm",
                sellerOnboardingStep === 1 ? "text-sky-600" : "text-gray-400",
              )}
            >
              {" "}
              Personal Info
            </span>
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
            className="flex flex-row items-center justify-center gap-4 text-center"
          >
            <i
              className={cn(
                "flex h-[40px] w-[40px] items-center justify-center rounded-full border text-white",
                sellerOnboardingStep === 2 ? "bg-sky-600" : "bg-gray-400",
              )}
            >
              2
            </i>
            <span
              className={cn(
                "text-sm",
                sellerOnboardingStep === 2 ? "text-sky-600" : "text-gray-400",
              )}
            >
              {" "}
              Professional Info
            </span>
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
            className="flex flex-row items-center justify-center gap-4 text-center"
          >
            <i
              className={cn(
                "flex h-[40px] w-[40px] items-center justify-center rounded-full border text-white",
                sellerOnboardingStep === 3 ? "bg-sky-600" : "bg-gray-400",
              )}
            >
              3
            </i>
            <span
              className={cn(
                "text-sm",
                sellerOnboardingStep === 3 ? "text-sky-600" : "text-gray-400",
              )}
            >
              {" "}
              Account Security
            </span>
          </li>
        </ul>
        <div className="flex h-full w-full flex-col gap-2 px-4">
          <span className="text-sm">
            Completion Rate:{" "}
            {sellerOnboardingStep === 3 ? 100 : sellerOnboardingStep * 33}%{" "}
          </span>
          <Progress
            value={sellerOnboardingStep === 3 ? 100 : sellerOnboardingStep * 33}
            className="h-[8px] w-full"
          />
        </div>
      </div>
      <section className="px-4">{children}</section>
    </section>
  );
}
