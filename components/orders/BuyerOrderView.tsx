import { orderEvent } from "@/types/common.types";
import { Order } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

type BuyerOrderViewProps = {
  order: Order;
};

const BuyerOrderView = async ({ order }: BuyerOrderViewProps) => {
  const orderEvents = JSON.parse(order.events) as orderEvent;
  const eventText = await getTranslations("Orders.events");
  return (
    <div className="flex h-[80dvh] w-full items-start justify-center rounded-md border p-6">
      {orderEvents.map((event, index) => {
        let text: string;
        switch (event.type) {
          case "order.created":
            return (
              <div
                key={`${event.type}-${index}`}
                className="flex w-full flex-row items-center justify-start gap-2 text-xl"
              >
                <span className="">
                  {order.createdAt.toLocaleString("pt-pt")}
                </span>
                <span className=" font-semibold">{event.user}</span>
                <ArrowRight size={24} />
                <span className=" italic text-sky-500">
                  {eventText("orderPlaced")}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  enable-background="new 0 0 50 50"
                  viewBox="0 0 50 50"
                  id="celebration"
                >
                  <path
                    fill="#FFB94A"
                    d="M14.1,16.2c1.8-1.8,7.7,1.1,13.1,6.6s8.4,11.3,6.6,13.1S8.4,46.7,5.9,44.1C3.4,41.7,12.3,18,14.1,16.2z"
                  ></path>
                  <path
                    d="M33.8,35.9C32,37.7,8.4,46.7,5.9,44.1c-0.1-0.1-0.2-0.3-0.3-0.6c0,0,22.1-9,25.8-12.7C33.8,35.9,33.8,35.9,33.8,35.9z"
                    opacity=".2"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M14.1,16.2C12.3,18,3.3,41.6,5.9,44.1c0.1,0.1,0.3,0.2,0.6,0.3c0,0,9-22.1,12.7-25.8
		C14.1,16.2,14.1,16.2,14.1,16.2z"
                    opacity=".2"
                  ></path>
                  <path
                    fill="#F79911"
                    d="M33.8,35.9c-1.7,1.7-7.1-0.8-12.3-5.8c-0.3-0.3-0.5-0.5-0.8-0.8c-0.2-0.2-0.3-0.3-0.5-0.5
		c-0.1-0.1-0.2-0.2-0.3-0.3c-0.3-0.3-0.6-0.6-0.8-0.9c-0.1-0.1-0.2-0.2-0.2-0.2c-0.4-0.5-0.8-0.9-1.1-1.4c-3.5-4.3-5-8.3-3.6-9.8
		c1.1-1.1,3.8-0.4,7,1.6c0.6,0.4,1.2,0.8,1.8,1.2c0.6,0.4,1.2,0.9,1.8,1.5c0.5,0.4,1,0.9,1.5,1.4c0.3,0.3,0.6,0.6,0.9,0.9
		c1.1,1.1,2.1,2.2,3,3.3c0.5,0.6,0.9,1.2,1.4,1.8C34,31.5,35,34.7,33.8,35.9z"
                  ></path>
                  <path
                    fill="#F45145"
                    d="M33,22c-0.3,0-0.7-0.2-0.9-0.5c-1-1.6-2.1-4.8,0.3-6.4c1.7-1.1,3.3,0.3,4.4,1.2c0.4,0.3,1.1,1,1.4,1
			c0,0,0.1,0,0.1-0.1c0.4-0.4,0.3-0.7-0.2-1.9c-0.5-1.1-1.2-2.7,0.2-4.1c1.4-1.4,2.9-0.6,4-0.2c1.2,0.6,1.5,0.6,2,0.2
			c0.2-0.2,0.2-0.3,0.2-0.4c-0.1-0.9-1.8-2.3-3-3C41,7.6,40.9,7,41.1,6.5C41.4,6,42,5.9,42.5,6.1c0.6,0.4,3.7,2.3,3.9,4.5
			c0.1,0.8-0.2,1.5-0.7,2.1c-1.5,1.5-3.2,0.7-4.3,0.2c-1.1-0.5-1.4-0.6-1.7-0.2c-0.4,0.4-0.3,0.7,0.2,1.9c0.5,1.1,1.2,2.7-0.2,4.1
			c-1.6,1.6-3.2,0.1-4.2-0.8c-1-0.9-1.5-1.3-1.9-1c-1.3,0.9,0.3,3.6,0.3,3.6c0.3,0.5,0.1,1.1-0.3,1.4C33.4,22,33.2,22,33,22z"
                  ></path>
                  <path
                    fill="#5FA3E0"
                    d="M9.8 18.5c-.3 0-.7-.2-.8-.5-.3-.5-.2-1.1.3-1.4.4-.2 1.1-.9 1.2-1.4 0-.1 0-.2-.1-.4-.1-.2-.8 0-1.3.2-.9.3-2.7.8-3.4-.9-.6-1.5.5-2.5 1.1-3 .7-.6.6-.6.6-.8-.1-.2-.2-.2-1-.2-.9 0-2.4 0-3-1.6C3.3 7.9 3.3 7.2 3.6 6.7 4.5 5.3 7 5 7.8 4.9c.6-.1 1 .4 1.1.9 0 .5-.4 1-.9 1.1C6.7 7 5.5 7.4 5.3 7.7 5.5 8 5.6 8.1 6.5 8.1c.8 0 2.2 0 2.8 1.5.6 1.5-.5 2.5-1.1 3-.6.5-.6.6-.6.7.2 0 .7-.1 1-.2 1-.3 2.6-.7 3.5.7.4.6.5 1.2.4 1.9-.3 1.5-1.9 2.5-2.1 2.7C10.2 18.4 10 18.5 9.8 18.5zM35.6 45C35.6 45 35.6 45 35.6 45c-1.6 0-2.9-1.2-3.1-1.3-.4-.4-.4-.9 0-1.3.4-.4 1-.3 1.4.1.3.3 1.1 1 1.6 1 .1 0 .2 0 .3-.1.1-.1-.2-.8-.4-1.2-.4-.9-1.2-2.5.3-3.5 1.4-.9 2.5.1 3.2.6.7.5.7.5.9.4.1-.1.2-.2 0-1-.1-.9-.4-2.3 1-3.2.6-.4 1.2-.4 1.8-.2 1.5.6 2.3 3 2.5 3.8.1.5-.2 1.1-.7 1.2-.5.1-1.1-.2-1.2-.7-.3-1.2-1-2.3-1.3-2.4-.3.2-.3.3-.2 1.2.1.8.4 2.2-.9 3-1.4.9-2.5-.1-3.2-.6-.6-.5-.7-.5-.8-.5 0 .2.3.6.4.9.5.9 1.2 2.2 0 3.3C36.9 45 36.3 45 35.6 45z"
                  ></path>
                  <path
                    fill="#F45145"
                    d="M42.8,26.1c0,0.6-0.4,1-1,1c-3.6,0-7.1,0.4-10.3,0.9c-4.5,0.7-8.2,1.7-10.1,2.2c-0.3-0.3-0.5-0.5-0.8-0.8
			c-0.3-0.3-0.5-0.5-0.8-0.8c1.1-0.3,5-1.5,10.3-2.4c3.5-0.6,7.5-1,11.6-1C42.3,25.1,42.8,25.5,42.8,26.1z"
                  ></path>
                  <path
                    fill="#5FA3E0"
                    d="M31,8.2c0.1,5.3-2.2,10-4.7,13.7c-2.3,3.3-4.8,5.8-6.1,6.9c-0.1-0.1-0.2-0.2-0.3-0.3
			c-0.3-0.3-0.6-0.6-0.8-0.9c-0.1-0.1-0.2-0.2-0.2-0.2c1.2-1.1,3.8-3.5,6-6.8c2.3-3.4,4.3-7.7,4.2-12.3c0-0.5,0.4-1,1-1
			C30.5,7.2,31,7.6,31,8.2z"
                  ></path>
                  <path
                    d="M30.7,36.2c-2.7-0.7-6.5-3.2-10.1-6.9c-5.4-5.4-8.4-11.3-6.6-13.1c1.2-1.2,4.2-0.3,7.7,2c-1.4-0.4-2.4-0.3-3,0.3
		c-1.8,1.8,1.1,7.7,6.6,13.1C27.1,33.5,29,35,30.7,36.2z"
                    opacity=".2"
                  ></path>
                  <path
                    fill="#F45145"
                    d="M22.9,19.1c-0.8,3.9-3.4,7.7-3.9,8.5c-0.5-0.5-0.9-1.1-1.3-1.6c0.9-1.4,3.1-5,3.5-8.2
			c0.1-0.9,0-1.7-0.2-2.5c-0.4-1.4-1.5-2.3-3.2-2.9c-0.5-0.2-0.8-0.8-0.6-1.3c0.2-0.5,0.7-0.8,1.3-0.6c2.3,0.8,3.8,2.2,4.4,4.2
			C23.3,16.1,23.2,17.6,22.9,19.1z"
                  ></path>
                  <circle cx="15" cy="7" r="2" fill="#FDC457"></circle>
                  <circle cx="25" cy="10" r="2" fill="#5FA3E0"></circle>
                  <circle cx="37" cy="8" r="2" fill="#FDC457"></circle>
                  <circle cx="44" cy="21" r="2" fill="#FDC457"></circle>
                  <circle cx="39" cy="32" r="2" fill="#5FA3E0"></circle>
                </svg>
              </div>
            );

          case "order.accepted":
            return (
              <div
                key={`${event.type}-${index}`}
                className="flex flex-row gap-1"
              >
                <span className="text-lg font-semibold">{event.user}</span>
                <span className="text-lg text-green-500">
                  {eventText("orderAccepted")}
                </span>
              </div>
            );

          case "order.rejected":
            text = eventText("orderRejected");
            break;
          case "order.delivered":
            text = eventText("orderDelivered");
            break;
          case "order.cancelled":
            text = eventText("orderCancelled");
            break;
        }
      })}
    </div>
  );
};

export default BuyerOrderView;
