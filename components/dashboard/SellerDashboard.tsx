import { User } from "@/types/common.types";
import { FC } from "react";

interface SellerDashboardProps {
  user: User;
}

const SellerDashboard: FC<SellerDashboardProps> = ({ user }) => {
  return (
    <section className="flex container w-[100dvw] h-[100dvh]">
      <div className="flex w-full flex-col items-center justify-center text-center">
        <h1>Welcome, {user.username}</h1>
        <p>Here is your seller dashboard</p>
      </div>
    </section>
  );
};

export default SellerDashboard;
