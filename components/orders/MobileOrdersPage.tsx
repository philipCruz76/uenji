"use client";
import { UserOrders } from "@/types/common.types";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/Select";
import { SelectTrigger } from "@radix-ui/react-select";
import toast from "react-hot-toast";
import { Card, CardContent, CardTitle } from "../ui/Card";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MobileOrdersPageProps = {
  currentUser: User;
  orders: UserOrders;
};

type OrderType = "active" | "late" | "completed" | "cancelled";

const MobileOrdersPage = ({ currentUser, orders }: MobileOrdersPageProps) => {
  const [selectedOrderType, setSelectedOrderType] =
    useState<OrderType>("active");
  const activeOrders = orders.filter((order) => order.status === "active");

  return (
    <section className="flex h-full w-full flex-col gap-2">
      <Select
        value={selectedOrderType}
        onValueChange={(value) => {
          toast.success("Order type changed to " + value);
          setSelectedOrderType(value as OrderType);
        }}
      >
        <SelectTrigger className=" h-[35px] w-full rounded-md border font-semibold underline focus:outline-none data-[state=active]:bg-transparent data-[state=active]:text-base">
          <SelectValue placeholder="Pedidos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Ativos</SelectItem>
          <SelectItem value="late">Em Atraso</SelectItem>
          <SelectItem value="completed">Entregues</SelectItem>
          <SelectItem value="cancelled">Cancelados</SelectItem>
        </SelectContent>
      </Select>
      {selectedOrderType === "active" &&
        activeOrders.map((order) => {
          const seller = order.users.filter(
            (user) => user.id === order.sellerId,
          )[0];
          return (
            <Card
              key={order.id}
              className="flex h-[160px] w-full flex-col bg-[#f8f9fa] hover:cursor-pointer"
            >
              <CardTitle className="flex h-[80px] w-full flex-row gap-2 p-2">
                <Image
                  alt={order.title}
                  src={order.gig.coverImage!}
                  width={120}
                  height={120}
                  className="h-full w-[90px] rounded-md object-fill"
                />
                <div className="flex h-full w-full flex-col">
                  <h3 className="text-base font-bold">{order.price}.00 AOA</h3>
                  <h3 className="text-xs ">{order.title}</h3>
                </div>
              </CardTitle>
              <CardContent className="w-full p-2">
                <div className="flex h-full w-full flex-col gap-2">
                  <div className="flex w-full flex-row items-center justify-between gap-2 py-1">
                    <div className="flex flex-row  items-center justify-start gap-2">
                      <Image
                        src={seller.image!}
                        alt={`${seller.username} Profile picture`}
                        width={30}
                        height={30}
                        className="max-h-[30px] min-h-[30px] max-w-[30px] rounded-full border"
                      />
                      <span className="text-sm text-gray-500">
                        {seller.username}
                      </span>
                    </div>
                    <span
                      className={cn(
                        order.status === "active"
                          ? "bg-green-500"
                          : order.status === "cancelled"
                            ? "bg-red-500"
                            : "bg-[#425664]",
                        "flex h-[25px] w-[80px] items-center justify-center rounded-md  border text-xs text-white ",
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex w-full flex-row justify-between">
                    <span className="text-xs font-semibold">
                      {order.createdAt.toLocaleDateString("pt-PT")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </section>
  );
};

export default MobileOrdersPage;
