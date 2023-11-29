import BuyerDashboard from "@/components/dashboard/BuyerDashboard";
import SellerDashboard from "@/components/dashboard/SellerDashboard";
import getSession from "@/lib/actions/getSession";
import { lazy } from "react";

const Hero = lazy(() => import("@/components/hero/Hero"));
const MobileFooter = lazy(() => import("@/components/navigation/MobileFooter"));

export default async function Home() {
  const session = await getSession();

  const isSeller = session?.user.isSeller;
  return (
    <>
      {session ? (
        isSeller ? (
          <SellerDashboard user={session.user} />
        ) : (
          <BuyerDashboard user={session.user} />
        )
      ) : (
        <Hero />
      )}
      <div className="flex flex-1 tablet:hidden min-w-full">
        <MobileFooter />
      </div>
    </>
  );
}
