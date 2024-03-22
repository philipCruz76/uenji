import getCurrentUser from "@/lib/actions/getCurrentUser";
import { lazy } from "react";

const Hero = lazy(() => import("@/components/hero/Hero"));
const BuyerDashboard = lazy(
  () => import("@/components/dashboard/buyer/BuyerDashboard"),
);
const SellerDashboard = lazy(
  () => import("@/components/dashboard/seller/SellerDashboard"),
);

export const dynamic = "force-dynamic";
export default async function Home() {
  const user = await getCurrentUser();

  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] max-w-[100dvw] overflow-hidden">
      {!user && <Hero />}

      {user && user.isSeller === true && user.sellerView === true && (
        <SellerDashboard user={user} />
      )}
      {user && !user.sellerView && <BuyerDashboard user={user} />}
    </section>
  );
}
