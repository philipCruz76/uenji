"use client";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";

type SellerRecentSalesProps = {};

const SellerRecentSales = ({}: SellerRecentSalesProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex min-w-full items-center justify-between">
        <Avatar className="h-9 w-9">
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 text-start">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-xs text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <span className="ml-auto font-medium text-green-600">+$1,999.00</span>
      </div>
      <div className="flex min-w-full items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 text-start">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-xs text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <span className="ml-auto font-medium text-green-600">+$39.00</span>
      </div>
      <div className="flex min-w-full items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 text-start">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-xs text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
        <span className="ml-auto font-medium text-green-600">+$299.00</span>
      </div>
      <div className="flex min-w-full items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 text-start">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-xs text-muted-foreground">will@email.com</p>
        </div>
        <span className="ml-auto font-medium text-green-600">+$99.00</span>
      </div>
      <div className="flex min-w-full items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1 text-start">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-xs text-muted-foreground">sofia.davis@email.com</p>
        </div>
        <span className="ml-auto font-medium text-green-600">+$39.00</span>
      </div>
    </div>
  );
};

export default SellerRecentSales;
