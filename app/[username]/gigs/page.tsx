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

  if (
    !currentUser ||
    currentUser.username !== params.username ||
    !currentUser.isSeller
  )
    redirect("/");

  const userGigs = await getUserGigs(currentUser.id);
  if (!userGigs) return null;

  return (
    <section className="flex max-h-[100dvh] min-h-[100vh] min-w-[100vw] max-w-[100dvw] flex-col gap-2 overflow-hidden p-6">
      <h1 className="text-3xl font-bold">Serviços</h1>
      <div className=" flex h-full min-w-full max-w-full flex-row  items-center  justify-start overflow-y-hidden overflow-x-scroll py-[10px] pt-[50px]">
        {userGigs.map((gig, index) => (
          <div key={`gig-${index}`} className="px-2">
            <GigCard gigToShow={gig} index={index} />
          </div>
        ))}
      </div>
      <Link
        href={`/${currentUser.username}/manage_gigs/new?step=1`}
        className="group flex h-[50px] w-full items-center justify-center gap-4 rounded-lg border-[#495057]  bg-[#dee2e6] text-center font-mono font-semibold transition duration-200 ease-in-out hover:scale-105 hover:animate-pulse tablet:absolute tablet:right-8 tablet:top-[150px] tablet:w-[200px]"
      >
        <span className="tablet:w-[60%]">Novo serviço</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="#000000"
          viewBox="0 0 256 256"
          className="group-hover:animate-bounce "
        >
          <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
        </svg>
      </Link>
    </section>
  );
};

export default page;
