import GigCard from "@/components/gigs/GigCard";
import { Card, CardContent } from "@/components/ui/Card";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUserGigs from "@/lib/actions/gigs/getUserGigs";
import Link from "next/link";
import { redirect } from "next/navigation";

type pageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: pageProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.username !== params.username) redirect("/");

  const userGigs = await getUserGigs(currentUser.id);
  if (!userGigs) return null;

  return (
    <section className="flex max-h-[100dvh] min-h-[100vh] min-w-[100vw] max-w-[100dvw] flex-col gap-2 overflow-hidden p-6">
      <h1 className="text-3xl font-bold">Gigs</h1>
      <div className=" flex overflow-x-scroll overflow-y-hidden py-[10px] flex-row  min-w-full  items-center justify-start h-full max-w-full pt-[50px]">
        {userGigs.map((gig, index) => (
          <div key={`gig-${index}`} className="px-2" >
            <GigCard gigToShow={gig} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
