import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { User } from "@prisma/client";
import Image from "next/image";
import UserBasicInfoMobile from "./UserBasicInfoMobile";
import UserGigsShowcaseMobile from "./UserGigsShowcaseMobile";
import ProfileContactButton from "../ProfileContactButton";
import getUserGigs from "@/lib/actions/gigs/getUserGigs";

type PublicProfileViewMobileProps = {
  user: User;
};

const PublicProfileViewMobile = async ({
  user,
}: PublicProfileViewMobileProps) => {
  const { username, id, name, isSeller, image } = user;
  const userGigs = await getUserGigs(user.id);
  const publishedGigs = userGigs?.filter((gig) => gig.published === true);
  return (
    <div className="flex min-h-[100dvh] min-w-full flex-col items-center justify-start px-6 py-4">
      <Image
        width={100}
        height={100}
        src={image || "/icons/default-user.svg"}
        alt="profile picture"
        referrerPolicy="no-referrer"
        className="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px] rounded-full border transition duration-150 ease-in-out"
      />

      <span className="text-lg font-bold">{name}</span>
      <span className="text-sm text-slate-400">@{username}</span>

      <div className="flex w-[160px] py-4">
        <ProfileContactButton username={username!} id={id} />
      </div>

      <Tabs defaultValue="about" className="w-full py-[30px]">
        <TabsList className="w-full rounded-none border-b-2 border-b-black bg-white">
          <TabsTrigger
            value="about"
            className="border-none font-semibold ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
          >
            Sobre
          </TabsTrigger>
          {isSeller && (
            <TabsTrigger
              value="gigs"
              className="data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
            >
              Serviços
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="about">
          <UserBasicInfoMobile user={user} />
        </TabsContent>
        {isSeller && (
          <TabsContent value="gigs">
            <UserGigsShowcaseMobile gigsToShow={publishedGigs} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default PublicProfileViewMobile;
