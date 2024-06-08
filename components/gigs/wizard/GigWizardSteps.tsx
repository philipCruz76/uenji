"use client";
import { useGigWizardStepStore } from "@/lib/stores/gigWizard-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type GigWizardStepsProps = {};

const GigWizardSteps = ({}: GigWizardStepsProps) => {
  const { gigWizardSteps } = useGigWizardStepStore();

  return (
    <ul className="flex h-full w-full flex-row justify-center gap-2">
      {gigWizardSteps.map((step) => (
        <li key={step.name} className="flex items-center justify-center">
          <div
            className={cn(
              `rounded-full ${
                step.current ? "bg-orange-300" : "bg-neutral-300"
              } h-6 w-6 items-center justify-center text-center text-white`,
            )}
          >
            {step.hasBeenCompleted === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
            ) : (
              step.step
            )}
          </div>
          <Link
            href={!step.hasBeenCompleted ? "" : `${step.href}`}
            className={cn(
              `${
                step.current ? " text-primary-500" : " text-neutral-500"
              } px-3 py-2  font-medium ${!step.hasBeenCompleted ? "cursor-default" : "cursor-pointer"}`,
            )}
            aria-current={step.current ? "page" : undefined}
          >
            {step.name}
          </Link>
          {step.step === 5 ? null : (
            <Image
              src="/icons/arrow-circle-right.svg"
              alt="chevron right"
              width={20}
              height={20}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default GigWizardSteps;
