import { User } from "@/types/common.types";
import { FC } from "react";
import SellerSalesChart from "./SellerSalesChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import SellerRecentSales from "./SellerRecentSales";

interface SellerDashboardProps {
  user: User;
}

const SellerDashboard: FC<SellerDashboardProps> = ({ user }) => {
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] max-w-[100dvw] flex-col items-center justify-center gap-4 bg-white p-[24px] text-center">
      <h1 className=" text-3xl font-bold">Olá, {user.name}</h1>
      <h3 className="text-xl font-bold">
        Eis o seu painel de controlo de vendedor
      </h3>

      <div className="grid w-full gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        <Card className="border-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">
              Receita Total
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% que no mês passado
            </p>
          </CardContent>
        </Card>
        <Card className="border-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Pedidos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% que no mês passado
            </p>
          </CardContent>
        </Card>
        <Card className="border-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Vendas</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% que no mês passado
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-7">
        <Card className="border-black desktop:col-span-4">
          <CardHeader>
            <CardTitle>Vendas</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SellerSalesChart />
          </CardContent>
        </Card>
        <Card className="border-black desktop:col-span-3 ">
          <CardHeader>
            <CardTitle>Últimas Vendas</CardTitle>
            <CardDescription>Voçê vendeu 14 serviços este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <SellerRecentSales />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SellerDashboard;
