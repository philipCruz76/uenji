"use client";

import { cn } from "@/lib/utils";
import { UserOrders } from "@/types/common.types";
import Image from "next/image";
import Link from "next/link";

type OrderTaskProps = {
  order: UserOrders[0];
};

const OrderTask = ({ order }: OrderTaskProps) => {
  const buyer = order.users.find((user) => user.id === order.buyerId);
  return (
    <Link
      href={`/orders/${order.id}`}
      className={cn(
        "grid h-[100px] max-w-full cursor-pointer grid-cols-3 grid-rows-1 gap-4 rounded-xl border border-transparent bg-white p-2 shadow-md hover:border-gray-200",
      )}
    >
      <Image
        src={order.gig.coverImage!}
        alt={`${order.gig.coverImage}`}
        width={80}
        height={80}
        className="col-span-1 row-span-1 h-full w-full rounded-md"
      />

      <div className="col-span-2 row-span-1 flex h-full w-full flex-col gap-2 overflow-hidden">
        <span className="text-start text-sm">{order.title.slice(0, 20)}</span>
        <div className="flex flex-row gap-2">
          <Image
            src={buyer?.image!}
            alt={buyer?.username!}
            width={20}
            height={20}
            className="rounded-full border"
          />
          <span className="text-sm">{buyer?.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default OrderTask;
