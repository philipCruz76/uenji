import { Gig } from "@prisma/client";
import ExpandableText from "../ui/ExpandableText";
import { getTranslations } from "next-intl/server";

type GigBasicInfoProps = {
  gig: Gig;
};

const GigBasicInfo = async({ gig }: GigBasicInfoProps) => {
  const t = await getTranslations("Gigs.desktopPage");
  return (
    <div className=" h-full w-full  gap-4">
      <h1 className="pb-[16px] text-xl font-semibold">{t("about")}</h1>
      <ExpandableText desktop={true} descriptionLenght={200}>
        {gig.description}
      </ExpandableText>
    </div>
  );
};

export default GigBasicInfo;
