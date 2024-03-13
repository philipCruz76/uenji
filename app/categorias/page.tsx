import { CategoryDesciptions } from "@/constants";
import { SubCategoriesList } from "@/constants/categoryConstants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesPage = () => {
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] flex-col items-center justify-center gap-6  bg-white px-[80px] pb-[20px] pt-[40px] tablet:p-[80px]">
      <h1 className="items-center justify-start text-start text-3xl font-bold">
        Categorias
      </h1>
      <ul className="flex h-full w-full flex-col  gap-2 tablet:hidden">
        {CategoryDesciptions.map((category, index) => {
          const subcategories = SubCategoriesList.find(
            (sub) => sub.category === category.category,
          )?.subcategory.map((sub) => sub.name);
          return (
            <li key={`category-${index}`}>
              <Link
                href={`/categorias/${category.category}`}
                className="flex min-h-[60px] w-full flex-row items-center justify-center gap-4 rounded-md border-2  border-black px-2 py-2"
              >
                <Image
                  src={category.thumbnailIcon}
                  alt={category.category}
                  width={40}
                  height={40}
                  className="h-[40px] w-[40px]"
                />
                <aside className=" w-full flex-col gap-[1px]">
                  <h5 className="text-lg font-semibold text-slate-800">
                    {category.categoryTitle}
                  </h5>
                  
                </aside>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="hidden w-full grid-cols-3 gap-6 px-8 tablet:grid">
        {CategoryDesciptions.map((category) => (
          <li key={category.category}>
            <Link
              href={`/categorias/${category.category}`}
              className="group flex flex-col items-center justify-center text-xl font-bold"
            >
              <Image
                src={
                  !category.titlecardImage
                    ? "https://res.cloudinary.com/dqe71igxe/image/upload/v1695893990/category%20bg.jpg"
                    : category.titlecardImage
                }
                width={250}
                height={250}
                alt={category.categoryTitle}
                className=" h-[100px]  w-[150px] rounded-md object-fill transition duration-200 ease-in-out group-hover:scale-105"
              />
              <span className="flex flex-row transition duration-200 ease-in-out group-hover:scale-105">
                {category.categoryTitle}
              </span>
              <div className="block h-[3px] w-[52px]  bg-transparent transition duration-200 ease-in-out group-hover:scale-x-150  group-hover:bg-current " />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesPage;
