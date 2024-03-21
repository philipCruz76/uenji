import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { User } from "@prisma/client";
import { UserOrders } from "@/types/common.types";

type DesktopOrdersPageProps = {
  currentUser: User;
  orders: UserOrders;
};

const DesktopOrdersPage = ({ currentUser, orders }: DesktopOrdersPageProps) => {
  const activeOrders = orders.filter((order) => order.status === "active");
  return (
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
