import GigCard from "@/components/gigs/GigCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import getUserGigs from "@/lib/actions/gigs/getUserGigs";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UserGigsShowcaseMobile from "./mobile/UserGigsShowcaseMobile";

type GigShowCaseSectionProps = {
  profileUser: User;
  publicMode: boolean;
};

const GigShowCaseSection = async ({
  profileUser,
  publicMode,
}: GigShowCaseSectionProps) => {
  const gigs = await getUserGigs(profileUser.id);
  if (!gigs) return null;
  const publishedGigs = gigs.filter((gig) => gig.published === true);
  const draftGigs = gigs.filter((gig) => gig.published === false);
  return (
    <>
      <h3 className="text-center text-2xl font-semibold">
        {publicMode === true ? "Os meus Serviços" : "Os teus Serviços"}
      </h3>
      <Tabs defaultValue="published" className="w-full py-4">
        <TabsList className="flex w-full justify-center gap-4">
          <TabsTrigger
            value="published"
            className="border-none font-semibold ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
          >
            Publicados
          </TabsTrigger>
          <TabsTrigger
            value="drafts"
            className="border-none font-semibold ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
          >
            Rascunhos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="published">
          <div className="grid max-h-[450px] min-w-full grid-cols-3 grid-rows-1 items-center justify-center gap-4 bg-white px-6">
            {publishedGigs.map((gig, index) => (
              <div key={`gig-${index}`} className="col-span-1">
                <GigCard gigToShow={gig} index={index} size="small" />
              </div>
            ))}
            <div className="flex flex-col items-center justify-center gap-2">
              <Link
                href={`/${profileUser.username}/manage_gigs/new?step=1`}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-black"
              >
                <Image
                  alt="Create new Gig"
                  src="/icons/plus-sign.svg"
                  width={50}
                  height={50}
                />
              </Link>
              <span className="text-sm">Create new Gig</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="drafts">
          <div className="grid max-h-[450px] min-w-full min-h-full grid-cols-3 grid-rows-1 items-center justify-center gap-4 bg-white px-6">
            <div className="col-span-3">
              <UserGigsShowcaseMobile gigsToShow={draftGigs} drafts />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default GigShowCaseSection;
