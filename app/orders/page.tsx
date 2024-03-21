import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import {
  getBuyerOrders,
  getSellerOrders,
} from "@/lib/actions/orders/getUserOrders";
import { UserOrders } from "@/types/common.types";

import Image from "next/image";
import Link from "next/link";
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

  const activeOrders = orders.filter((order) => order.status === "New");

  return (
    <>
      {orders.length === 0 ? (
        <EmptyOrderPage />
      ) : (
        <div className="flex h-full w-full flex-col p-[24px] font-mono">
          <h1 className="text-2xl font-bold ">Pedidos</h1>
          <h3 className=" pb-[20px] font-mono text-xl font-semibold">
            Gerir os seus pedidos
          </h3>

          <Tabs defaultValue="active" className="w-full py-[30px]">
            <TabsList className="flex w-full items-center justify-start rounded-none border-b-2 border-b-black bg-white">
              <TabsTrigger
                value="active"
                className="border-none font-semibold ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
              >
                Ativos
              </TabsTrigger>
              {currentUser.sellerView === true && (
                <TabsTrigger
                  value="late"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
                >
                  Em Atraso
                </TabsTrigger>
              )}
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
              >
                Entregues
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
              >
                Cancelados
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-b-black text-left text-gray-500">
                    <th className="w-[45%] font-medium">Pedido</th>
                    <th className="font-medium">Data de Pediddo</th>
                    <th className="font-medium">Data de Entrega</th>

                    <th className="font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {activeOrders.map((order) => {
                    const gig = order;

                    return (
                      <tr
                        key={`order-${order.id}`}
                        className="group border-b hover:bg-[#f8f9fa]"
                      >
                        <td className="h flex h-[70px] min-w-[45%] flex-row items-center gap-4 text-left">
                          <Image
                            src={order.gig.coverImage!}
                            alt={`${order.gig.coverImage}`}
                            width={80}
                            height={80}
                          />
                          <Link href={`/`}>{order.title}</Link>
                        </td>
                        <td className="text-left">
                          {order.createdAt.toLocaleDateString()}
                        </td>
                        <td className="text-left">
                          {order.gigDeliveryTime.toLocaleDateString()}
                        </td>

                        <td className="text-left">{order.price}.00 AOA</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="completed">
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <span className="text-2xl font-bold">
                  Nenhum pedido completado
                </span>
                <span className="text-lg text-slate-400">
                  Você ainda não tem pedidos completados
                </span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}

export default page;
