import { CategoryDesciptionsEN, CategoryDesciptionsPT } from "@/constants";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

type PopularCategoryShowcaseProps = {};

const PopularCategoryShowcase = async ({}: PopularCategoryShowcaseProps) => {
  const locale = await getLocale();

  const CategoryDescriptions =
    locale === "pt" ? CategoryDesciptionsPT : CategoryDesciptionsEN;

  const popularCategories = CategoryDescriptions.filter(
    (category) =>
      category.categoryName === "programacao" ||
      category.categoryName === "fotografia" ||
      category.categoryName === "negocios" ||
      category.categoryName === "design",
  );
  return (
    <section className="h-full w-full">
      <h1 className="text-2xl font-semibold">
        Consulte estas categorias populares
      </h1>

      <ul className=" grid w-full grid-cols-5 grid-rows-1 gap-6 py-8">
        {popularCategories.map((category) => (
          <li key={category.categoryName}>
            <Link
              href={`/categorias/${category.categoryName}`}
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

export default PopularCategoryShowcase;
