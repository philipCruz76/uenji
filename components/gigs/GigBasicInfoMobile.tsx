"use client";

import ExpandableText from "@/components/ui/ExpandableText";

type GigBasicInfoMobileProps = {
  gigTitle: string;
  gigDescription: string | null;
};

const GigBasicInfoMobile = ({
  gigTitle,
  gigDescription,
}: GigBasicInfoMobileProps) => {
  // {!gigDescription ? "Random lorem ipsum gibberish": gigDescription}
  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <span className="w-full text-2xl font-bold ">
        {gigTitle.charAt(0).toLocaleUpperCase() + gigTitle.slice(1)}
      </span>

      <ExpandableText desktop={false} descriptionLenght={20}>
        {gigDescription}
      </ExpandableText>
    </div>
  );
};

export default GigBasicInfoMobile;
