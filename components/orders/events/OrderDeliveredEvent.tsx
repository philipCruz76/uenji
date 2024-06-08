import { orderEvent } from "@/types/common.types";
import Image from "next/image";
import OrderDownloadCard from "./OrderDownloadCard";

type OrderDeliveredEventProps = {
  orderEvent: orderEvent[0];
};

type orderDeliveryEvent = {
  eventCaption: string;
  sellerMessage: string;
  files: string[];
};
const OrderDeliveredEvent = async ({
  orderEvent,
}: OrderDeliveredEventProps) => {
  const parsedEvent = JSON.parse(orderEvent.event) as orderDeliveryEvent;
  const parsedDate = new Date(orderEvent.createdAt).toLocaleString("pt-pt");
  return (
    <>
      <span className="flex text-lg font-sans text-gray-400 justify-end">
        {parsedDate}
      </span>
      <div className="flex flex-col gap-4 items-center justify-center w-full p-4">
        <Image
          alt="download-icon"
          src={"/icons/presents.svg"}
          width={120}
          height={120}
        />
        <h3 className="text-xl font-semibold">
          {" "}
          {orderEvent.user}{" "}
          <span className="text-green-500">{parsedEvent.eventCaption}</span>{" "}
        </h3>

        <p className="text-base italic min-w-full h-[140px] p-3 font-mono outline outline-1 font-medium text-gray-500 overflow-scroll">
          {parsedEvent.sellerMessage}
        </p>
        {parsedEvent.files.length > 0 &&
          parsedEvent.files.map((file, index) => (
            <OrderDownloadCard key={`file-${index}`} downloadFile={file} />
          ))}
      </div>
    </>
  );
};

export default OrderDeliveredEvent;
