import { Gig } from "@prisma/client";
import ExpandableText from "../ui/ExpandableText";

type GigBasicInfoProps = {
  gig: Gig;
};

const GigBasicInfo = ({ gig }: GigBasicInfoProps) => {
  return (
    <div className=" h-full w-full  gap-4">
      <h1 className="pb-[16px] text-xl font-semibold">Sobre este serviço</h1>
      <ExpandableText desktop={true} descriptionLenght={200}>
        {gig.description}
      </ExpandableText>
    </div>
  );
};

export default GigBasicInfo;
