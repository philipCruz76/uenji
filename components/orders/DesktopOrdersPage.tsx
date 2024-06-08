import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { User } from "@prisma/client";
import { UserOrders } from "@/types/common.types";
import { getTranslations } from "next-intl/server";

type DesktopOrdersPageProps = {
  currentUser: User;
  orders: UserOrders;
};

const DesktopOrdersPage = async ({
  currentUser,
  orders,
}: DesktopOrdersPageProps) => {
  const activeOrders = orders.filter(
    (order) => order.status === "active" || order.status === "review",
  );
  const orderTableText = await getTranslations("Orders.ordersTable");
  return (
    <Tabs defaultValue="active" className="w-full py-[30px]">
      <TabsList className="flex w-full items-center justify-start rounded-none border-b-2 border-b-black bg-white">
        <TabsTrigger
          value="active"
          className="border-none font-semibold ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
        >
          {orderTableText("active")}
        </TabsTrigger>
        {currentUser.sellerView === true && (
          <TabsTrigger
            value="late"
            className="data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
          >
            {orderTableText("late")}
          </TabsTrigger>
        )}
        <TabsTrigger
          value="delivered"
          className="data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
        >
          {orderTableText("accepted")}
        </TabsTrigger>
        <TabsTrigger
          value="cancelled"
          className="data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:underline"
        >
          {orderTableText("cancelled")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <table className="w-full pb-10">
          <thead>
            <tr className="border-b border-b-black text-left text-gray-500">
              <th className="w-[45%] font-medium">{orderTableText("order")}</th>
              <th className="font-medium">{orderTableText("orderDate")}</th>
              <th className="font-medium">{orderTableText("orderDelivery")}</th>

              <th className="font-medium">{orderTableText("orderPrice")}</th>
            </tr>
          </thead>
          <tbody>
            {activeOrders.map((order) => {
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
                    <Link href={`/orders/${order.id}`}>{order.title}</Link>
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
          <span className="text-2xl font-bold">Nenhum pedido completado</span>
          <span className="text-lg text-slate-400">
            Você ainda não tem pedidos completados
          </span>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DesktopOrdersPage;
