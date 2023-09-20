import { User } from "@/types/common.types";
import { FC } from "react";

interface BuyerDashboardProps {
  user: User;
}

const BuyerDashboard: FC<BuyerDashboardProps> = ({ user }) => {
  return (
    <section className="flex container w-screen h-screen py-8">
      <div className="flex w-full flex-col space-y-6">
        <h1 className="flex text-3xl left-0 justify-start items-center font-bold">
          Hello, {user.name ? user.name : user.username}
        </h1>
        <p className="flex items-center justify-center text-center">
          Here is your Buyer dashboard
        </p>

        <div className="w-full border rounded-lg h-[200px] items-center justify-center text-center font-semibold text-2xl">
          Recommendations Placeholder
        </div>
      </div>
    </section>
  );
};

export default BuyerDashboard;
