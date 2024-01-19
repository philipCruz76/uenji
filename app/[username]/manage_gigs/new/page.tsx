"use client";

import { lazy } from "react";

const GigWizardOverview = lazy(() => import("@/components/gigs/wizard/GigWizardOverview"));

type pageProps = {
  params: {
    username: string;
  };
};

const page = ({params}:pageProps) => {
  return (
   <GigWizardOverview username={params.username}/>
  );
};

export default page;
