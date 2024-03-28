"use client";
import { useGigWizardStepStore } from "@/lib/stores/gigWizard-store";
import { useRouter } from "next/navigation";
import { lazy, useEffect, useMemo } from "react";
import { useLocale } from "use-intl";

type pageProps = {
  params: { username: string; gigName: string };
  searchParams: { step: string };
};

const GigWizardOverview = lazy(
  () => import("@/components/gigs/wizard/GigWizardOverview"),
);
const GigWizardPricing = lazy(
  () => import("@/components/gigs/wizard/GigWizardPricing"),
);
const GigWizardDescription = lazy(
  () => import("@/components/gigs/wizard/GigWizardDescription"),
);
const GigWizardGallery = lazy(
  () => import("@/components/gigs/wizard/GigWizardGallery"),
);
const GigWizardPublish = lazy(
  () => import("@/components/gigs/wizard/GigWizardPublish"),
);

const page = ({ params, searchParams }: pageProps) => {
  const { username, gigName } = params;
  const router = useRouter();
  const locale = useLocale();
  const { setGigWizardStepHrefs, getCurrentGigWizardStep } =
    useGigWizardStepStore();
  let { step } = searchParams;

  if (step === null) {
    step = "1";
  }

  useMemo(() => {
    setGigWizardStepHrefs([
      `/${locale}/${username}/manage_gigs/${gigName}/edit?step=1`,
      `/${locale}/${username}/manage_gigs/${gigName}/edit?step=2`,
      `/${locale}/${username}/manage_gigs/${gigName}/edit?step=3`,
      `/${locale}/${username}/manage_gigs/${gigName}/edit?step=4`,
      `/${locale}/${username}/manage_gigs/${gigName}/edit?step=5`,
    ]);
  }, [gigName]);

  if (step !== "1" && getCurrentGigWizardStep(0).hasBeenCompleted === false) {
    router.push(`/${username}/manage_gigs/${gigName}/edit?step=1`);
  }
  switch (step) {
    case "1":
      return (
        <GigWizardOverview username={username.toString()} gigName={gigName} />
      );
    case "2":
      return (
        <GigWizardPricing username={username.toString()} gigName={gigName} />
      );
    case "3":
      return (
        <GigWizardDescription
          username={username.toString()}
          gigName={gigName}
        />
      );
    case "4":
      return (
        <GigWizardGallery username={username.toString()} gigName={gigName} />
      );
    case "5":
      return (
        <GigWizardPublish username={username.toString()} gigName={gigName} />
      );
    default:
      return router.push("/");
  }
};

export default page;
