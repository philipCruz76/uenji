import { CategoryDesciptions } from "@/constants";
import { User } from "@/types/common.types";
import { lazy } from "react";

const PopularCategoryShowcaseMobile = lazy(
  () => import("@/components/dashboard/buyer/PopularCategoryShowcaseMobile"),
);
const PopularCategoryShowcase = lazy(
  () => import("@/components/dashboard/buyer/PopularCategoryShowcase"),
);
const PopularGigsShowcase = lazy(
  () => import("@/components/dashboard/buyer/PopularGigsShowcase"),
);
const PopularGigsShowCaseMobile = lazy( () => import("@/components/dashboard/buyer/PopularGigsShowCaseMobile"));

type BuyerDashboardProps = {
  user: User;
};

const BuyerDashboard = ({ user }: BuyerDashboardProps) => {
  const popularCategories = CategoryDesciptions.filter(
    (category) =>
      category.category === "programacao" || category.category === "marketing" || category.category === "fotografia",
  );

  return (
    <section className=" flex min-h-[100dvh] min-w-[100dvw] px-6 py-8">
      <div className="flex w-full flex-col space-y-6">
        <h1 className="left-0 flex items-center justify-start text-3xl font-bold">
          Olá, {user.name ? user.name : user.username}
        </h1>

        {/* Desktop View */}
        <div className="hidden gap-36 pt-[50px] desktop:flex desktop:flex-col">
          <PopularCategoryShowcase />
          <PopularGigsShowcase />
        </div>
        {/* Mobile View */}
        <div className="flex flex-col gap-8 desktop:hidden">
          <PopularCategoryShowcaseMobile
            popularCategories={popularCategories}
          />
          <div>
          <h3 className="w-full text-2xl font-semibold py-6">Serviços em destaque</h3>
          <PopularGigsShowCaseMobile />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerDashboard;
