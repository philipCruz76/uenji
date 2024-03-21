import getCurrentUser from "@/lib/actions/getCurrentUser";
import { lazy } from "react";

const Hero = lazy(() => import("@/components/hero/Hero"));
const BuyerDashboard = lazy(
  () => import("@/components/dashboard/buyer/BuyerDashboard"),
);
const SellerDashboard = lazy(
  () => import("@/components/dashboard/seller/SellerDashboard"),
);

export const dynamic = 'force-dynamic';
export default async function Home() {
  const user = await getCurrentUser();

  if (!user) return <Hero />;

  return (
    <>
      {user.isSeller === true && user.sellerView === true ? (
        <SellerDashboard user={user} />
      ) : (
        <BuyerDashboard user={user} />
      )}
    </>
  );
}
