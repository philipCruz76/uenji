import GigWizardSteps from "@/components/gigs/wizard/GigWizardSteps";
import getCurrentUserWithExtraInfo from "@/lib/actions/getCurrentUserWithExtraInfo";
import Image from "next/image";
import { redirect } from "next/navigation";

type newGigLayoutProps = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

async function newGigLayout({ params, children }: newGigLayoutProps) {
  const currentUser = await getCurrentUserWithExtraInfo();
  const { username } = params;
  if (
    !currentUser ||
    currentUser?.isSeller === false ||
    currentUser?.username !== username
  ) {
    redirect("/");
  }
  if (currentUser.Gig.length >= 4) redirect("/");

  return (
    <>
      <section className="hidden min-h-[100dvh] min-w-[100dvw] bg-zinc-50 desktop:flex">
        <div className="h-full w-full">
          <nav className="h-[60px] w-full border-b">
            <GigWizardSteps />;
            <div className="w-full  border-b border-gray-200 bg-white" />
          </nav>
          {children}
        </div>
      </section>
      <section className="flex min-h-[100dvh] min-w-[100dvw] items-center  justify-center bg-zinc-50 desktop:hidden">
        <div className="flex max-h-[40dvh] min-h-[40dvh] min-w-[70dvw] max-w-[70dvw] flex-col items-center justify-center rounded-lg border bg-white px-4">
          <Image
            src={"/icons/computer.svg"}
            width={100}
            height={100}
            alt="computer icon"
            className="h-[100px] w-[100px]"
          />
          <span className=" flex w-full text-center flex-wrap text-lg font-semibold">
            Por fazor visitar site através de um computador para poder criar ou
            editar um serviço
          </span>
        </div>
      </section>
    </>
  );
}

export default newGigLayout;
