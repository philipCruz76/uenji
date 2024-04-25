"use server";
import { CategoryDesciptionsEN, CategoryDesciptionsPT } from "@/constants";
import { Category, User } from "@/types/common.types";
import { getLocale } from "next-intl/server";
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
const PopularGigsShowCaseMobile = lazy(
  () => import("@/components/dashboard/buyer/PopularGigsShowCaseMobile"),
);

type BuyerDashboardProps = {
  user: User;
};

const BuyerDashboard = async ({ user }: BuyerDashboardProps) => {
  const locale = await getLocale();

  let CategoryDesciptions: Category[];

  if (locale === "pt") {
    CategoryDesciptions = CategoryDesciptionsPT;
  } else {
    CategoryDesciptions = CategoryDesciptionsEN;
  }

  const popularCategories = CategoryDesciptions.filter(
    (category) =>
      category.categoryName === "programacao" ||
      category.categoryName === "marketing" ||
      category.categoryName === "fotografia",
  );

  return (
    <section className=" flex min-h-[100dvh] min-w-[100dvw] px-6 py-8">
      <div className="flex w-full flex-col space-y-6">
        <h1 className="left-0 flex items-center justify-start text-3xl font-bold">
          {`${locale === "pt" ? "Olá, " : "Hi, "}`}
          {user.name ? user.name : user.username}
        </h1>

        {/* Desktop View */}
        <div className="hidden gap-16 pt-[50px] desktop:flex desktop:flex-col">
          <PopularCategoryShowcase />
          <PopularGigsShowcase />
        </div>
        {/* Mobile View */}
        <div className="flex flex-col gap-8 desktop:hidden">
          <PopularCategoryShowcaseMobile
            popularCategories={popularCategories}
          />
          <div>
            <h3 className="w-full py-6 text-2xl font-semibold">
              Serviços em destaque
            </h3>
            <PopularGigsShowCaseMobile />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerDashboard;
