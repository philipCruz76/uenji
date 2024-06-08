import { Order } from "@prisma/client";

type SellerOrderViewProps = {
  order: Order;
};

const SellerOrderView = ({ order }: SellerOrderViewProps) => {
  return <div>SellerOrderView</div>;
};

export default SellerOrderView;
