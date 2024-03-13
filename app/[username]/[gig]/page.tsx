import { lazy } from "react";
import getGigByTitle from "@/lib/actions/gigs/getGigByTitle";

const GigDesktopPage = lazy(() => import("@/components/gigs/GigDesktopPage"));
const GigMobilePage = lazy(() => import("@/components/gigs/GigMobilePage"));

type pageProps = {
  params: {
    username: string;
    gig: string;
  };
};

const page = async ({ params }: pageProps) => {
  const { username, gig } = params;
  if (!username || !gig) return null;

  const pageGig = await getGigByTitle(username, gig.replace(/-/g, " "));
  if (!pageGig) return null;

  return (
    <section>
      <div className="hidden desktop:block">
        <GigDesktopPage pageGig={pageGig} />
      </div>
      <div className="block desktop:hidden">
        <GigMobilePage pageGig={pageGig} />
      </div>
    </section>
  );
};

export default page;
