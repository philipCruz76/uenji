import getCurrentUser from "@/lib/actions/getCurrentUser";
import getOrderById from "@/lib/actions/orders/getOrderById";
import { redirect } from "next/navigation";
import { lazy } from "react";

type pageProps = {
  params: {
    order: string;
  };
};

const BuyerOrderView = lazy(() => import("@/components/orders/BuyerOrderView"));
const SellerOrderView = lazy(() => import("@/components/orders/SellerOrderView"));
const page = async ({ params }: pageProps) => {
  const { order } = params;
  const currentUser = await getCurrentUser();
  const desiredOrder = await getOrderById(order).catch((e) => {
    console.error(e);
    redirect("/");
  });
  if (!order || !currentUser) redirect("/");

  const isBuyer = currentUser.id === desiredOrder.buyerId;
  const isSeller = currentUser.id === desiredOrder.sellerId;
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] flex-col gap-16 p-6">
      <h1 className="font-sans text-3xl font-bold">
        {desiredOrder.title.charAt(0).toLocaleUpperCase() +
          desiredOrder.title.slice(1)}
      </h1>

      
        <BuyerOrderView order={desiredOrder} />
     
    </section>
  );
};

export default page;
