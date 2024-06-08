import getCurrentUser from "@/lib/actions/getCurrentUser";
import { orderEvent } from "@/types/common.types";
import { Order } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import ContactCard from "./ContactCard";
import db from "@/lib/db";
import OrderCreatedEvent from "./events/OrderCreatedEvent";
import OrderDeliveredEvent from "./events/OrderDeliveredEvent";
import Image from "next/image";

type BuyerOrderViewProps = {
  order: Order;
};

const BuyerOrderView = async ({ order }: BuyerOrderViewProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/");

  const isValidUser =
    currentUser.id === order.buyerId || currentUser.id === order.sellerId;
  if (!isValidUser) redirect("/");

  const relevantUserId = order.userIds.find((user) => user !== currentUser.id);
  const relevantUser = await db.user.findUnique({
    where: { id: relevantUserId },
    select: {
      id: true,
      username: true,
      displayName: true,
      image: true,
      isOnline: true,
    },
  });

  if (!relevantUser) redirect("/");
  const isSeller = currentUser.id === order.sellerId;
  const orderEvents = JSON.parse(order.events) as orderEvent;
  const eventText = await getTranslations("Orders.events");

  return (
    <section className="flex flex-row gap-8">
      <div className="flex min-h-[80dvh] w-[65%] flex-col items-start justify-start gap-4 overflow-y-scroll rounded-md border-2 p-6">
        {orderEvents.map((event, index) => {
          let t = "";
          switch (event.type) {
            case "order.created":
              return (
                <OrderCreatedEvent
                  key={`order-event-${index}`}
                  orderEvent={event}
                  createdAt={order.createdAt.toLocaleString("pt-pt")}
                  text={eventText("orderPlaced")}
                />
              );

            case "order.delivered":
              return (
                <div key={`${event.type}-${index}`} className="w-full h-fit">
                  <OrderDeliveredEvent orderEvent={event} />
                  {isSeller !== true && (
                    <div className="flex w-full justify-end gap-2">
                      <button
                        key={`orderRejectButton`}
                        className="bg-red-500 flex flex-row h-[45px] hover:shadow-md transition ease-in-out duration-200 hover:scale-105 hover:bg-red-600 text-white p-2 rounded-md w-[140px]"
                      >
                        <span className="w-full font-bold">Reject</span>
                        <Image
                          alt="rejectButton"
                          src={"/icons/cancel.svg"}
                          width={30}
                          height={30}
                          className="min-w-[30px] min-h-[30px]"
                        />
                      </button>
                      <button
                        key={`orderAcceptButton`}
                        className="bg-blue-500 flex flex-row h-[45px] hover:shadow-md transition ease-in-out duration-200 hover:scale-105 hover:bg-blue-600 text-white p-2 rounded-md w-[140px]"
                      >
                        <span className="w-full font-bold">Accept</span>
                        <Image
                          alt="acceptButton"
                          src={"/icons/accept.svg"}
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px]"
                        />
                      </button>

                      
                    </div>
                  )}
                </div>
              );

            case "order.rejected":
              t = eventText("orderRejected");
              break;
            case "order.delivered":
              t = eventText("orderDelivered");
              break;
            case "order.cancelled":
              t = eventText("orderCancelled");
              break;
          }
        })}
      </div>
      <div className="flex w-[25%] flex-col justify-start">
        {/* Contact Card*/}
        <div className="h-[100px] w-full text-center">
          <span className="w-full text-lg font-semibold font-mono">
            {relevantUserId === order.sellerId ? "Seller" : "Buyer"}
          </span>
          <ContactCard relevantUser={relevantUser} />
        </div>
      </div>
    </section>
  );
};

export default BuyerOrderView;
