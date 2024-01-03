import { cn } from "@/lib/utils";
import Image from "next/image";


type gigSteps = {
  name: string;
  href: string;
  step: number;
  current: boolean;
};

type GigWizardStepProps = {
  currentStep: gigSteps;
};

const GigWizardStep = ({ currentStep }: GigWizardStepProps) => {
  return (
    <li key={currentStep.name} className="flex items-center justify-center">
      <div
        className={cn(
          `rounded-full ${
            currentStep.current ? "bg-orange-300" : "bg-neutral-300"
          } text-center text-white w-6 h-6 items-center justify-center`
        )}
      >
        {currentStep.step}
      </div>
      <a
        href={currentStep.href}
        className={cn(
          `${
            currentStep.current ? " text-primary-500" : " text-neutral-500"
          } px-3 py-2  font-medium`
        )}
        aria-current={currentStep.current ? "page" : undefined}
      >
        {currentStep.name}
      </a>
      {currentStep.step === 6 ? null : (
        <Image
          src="/icons/arrow-circle-right.svg"
          alt="chevron right"
          width={20}
          height={20}
        />
      )}
    </li>
  );
};

export default GigWizardStep;
