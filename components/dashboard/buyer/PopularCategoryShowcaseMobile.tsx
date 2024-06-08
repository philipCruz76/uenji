import { Category } from "@/types/common.types";
import { SubCategoriesList } from "@/constants/categoryConstants";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type PopularCategoryShowcaseMobileProps = {
  popularCategories: Category[];
};

const PopularCategoryShowcaseMobile = async ({
  popularCategories,
}: PopularCategoryShowcaseMobileProps) => {
  const t = await getTranslations("Dashboard.buyer");
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex h-fit w-full flex-row justify-between">
        <h2 className="text-xl font-bold"> {t("popularCategories")}</h2>

        <Link
          href={"/categorias"}
          className="flex flex-row items-center justify-center gap-[4px] text-sm text-[#0000CC] underline"
        >
          {t("seeAll")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#0000CC"
            viewBox="0 0 256 256"
          >
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
        </Link>
      </div>
      <ul key="categories-list" className="flex h-full w-full flex-col gap-2">
        {popularCategories.map((category) => {
          const subcategories = SubCategoriesList.find(
            (sub) => sub.category === category.categoryName,
          )?.subcategory.map((sub) => sub.name);
          return (
            <li key={category.categoryTitle}>
              <Link
                href={`/categorias/${category.categoryName}`}
                className="flex w-full flex-row items-center justify-start gap-4 rounded-md border-2 px-2 py-2"
                key={category.categoryName}
              >
                <Image
                  src={category.thumbnailIcon}
                  alt={category.categoryName}
                  width={40}
                  height={40}
                  className="h-[40px] w-[40px]"
                />
                <aside className="flex w-full flex-col gap-[1px]">
                  <h5 className="text-lg font-semibold text-slate-800">
                    {category.categoryTitle}
                  </h5>
                  <div className="flex w-full flex-row flex-wrap gap-1">
                    {subcategories?.map((sub) => (
                      <span
                        key={sub}
                        className="w-full text-sm font-light text-gray-500"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </aside>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularCategoryShowcaseMobile;
