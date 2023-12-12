import { CategoryDesciptions } from "@/constants";
import { subCategories } from "@/constants/categoryConstants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesPage = () => {
  return (
    <section className="flex flex-col gap-6 py-8 container w-[100dvw] h-[100dvh]">
      <h1 className="text-3xl font-bold text-start items-center justify-start">
        Categorias
      </h1>
      <ul
        key="categories-list"
        className="flex flex-col gap-2 w-full  h-full tablet:hidden"
      >
        {CategoryDesciptions.map((category) => {
          const subcategories = subCategories
            .find((sub) => sub.category === category.category)
            ?.subcategory.map((sub) => sub.name);
          return (
            <li key={category.category}>
              <Link
                href={`/categorias/${category.category}`}
                className="flex flex-row min-h-[60px] items-center justify-start gap-4 w-full border-2 rounded-md px-2 py-2"
              >
                <Image
                  src={category.thumbnailIcon}
                  alt={category.category}
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px]"
                />
                <aside className="flex flex-col gap-[1px] w-full">
                  <h5 className="text-slate-800 font-semibold text-lg">
                    {category.categoryTitle}
                  </h5>
                  <div className="flex flex-wrap w-full flex-row gap-1">
                    {subcategories?.map((sub) => (
                      <span className="text-gray-500 font-light text-sm w-full">
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
      <ul className="hidden tablet:grid grid-cols-3 gap-6 w-full px-8">
        {CategoryDesciptions.map((category) => (
          <li key={category.category}>
            <Link
              href={`/categorias/${category.category}`}
              className="underline text-xl text-gray-700 font-semibold"
            >
              {category.categoryTitle}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesPage;
