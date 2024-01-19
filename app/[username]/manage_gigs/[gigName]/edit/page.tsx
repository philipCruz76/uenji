"use client";

import GigWizardOverview from "@/components/gigs/wizard/GigWizardOverview";
import { useGigWizardStore } from "@/lib/stores/gigWizard-store";
import { GigPricing, GigPricingValidator } from "@/types/gigWizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type gigPricingProps = {
  params: {
    username: string;
  };
  searchParams: {
    step: number;
  };
};
const page = ({ params, searchParams }: gigPricingProps) => {
  const { username } = params;
  const { step } = searchParams;

  switch (step) {
    case 1:
      return <GigWizardOverview username={username} />;
    case 2:
        return // TODO <GigWizardPricing username={username} />;
    case 3:
        return // TODO <GigWizardDescription username={username} />;
    case 4:
        return // TODO <GigWizardGallery username={username} />;
    case 5:
        return // TODO <GigWizardPublish username={username} />;
    default:
        return null;
  }
};

export default page;
