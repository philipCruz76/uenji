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

type BuyerDashboardProps = {
  user: User;
};

const BuyerDashboard = ({ user }: BuyerDashboardProps) => {
  const popularCategories = CategoryDesciptions.filter(
    (category) =>
      category.category === "fotografia" || category.category === "design",
  );

  return (
    <section className="container flex min-h-[100dvh] min-w-[100dvw] px-12 py-8">
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
        <div className="flex desktop:hidden">
          <PopularCategoryShowcaseMobile
            popularCategories={popularCategories}
          />
        </div>
      </div>
    </section>
  );
};

export default BuyerDashboard;
