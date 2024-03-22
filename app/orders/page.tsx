import DesktopOrdersPage from "@/components/orders/DesktopOrdersPage";
import MobileOrdersPage from "@/components/orders/MobileOrdersPage";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import {
  getBuyerOrders,
  getSellerOrders,
} from "@/lib/actions/orders/getUserOrders";
import { UserOrders } from "@/types/common.types";

import { redirect } from "next/navigation";
import { lazy } from "react";

type pageProps = {};

const EmptyOrderPage = lazy(() => import("@/components/orders/EmptyOrderPage"));

async function page({}: pageProps) {
  const currentUser = await getCurrentUser();
  let orders: UserOrders;

  if (!currentUser) redirect("/");

  if (!currentUser.isSeller || currentUser.sellerView === false) {
    orders = await getBuyerOrders();
  } else {
    orders = await getSellerOrders();
  }

  return (
    <>
      {orders.length === 0 ? (
        <EmptyOrderPage />
      ) : (
        <div className="flex h-full w-full max-w-[100dvw] flex-col overflow-hidden p-[24px] font-mono">
          <h1 className="text-2xl font-bold ">Pedidos</h1>
          <h3 className=" pb-[20px] font-mono text-xl font-semibold">
            Gerir os seus pedidos
          </h3>

          <div className="hidden desktop:flex">
            <DesktopOrdersPage orders={orders} currentUser={currentUser} />
          </div>

          <div className="flex w-full desktop:hidden">
            <MobileOrdersPage orders={orders} currentUser={currentUser} />
          </div>
        </div>
      )}
    </>
  );
}

export default page;