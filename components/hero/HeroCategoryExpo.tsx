import { CategoryDesciptions } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const HeroCategoryExpo = () => {
  return (
    <>
      <section className="container flex flex-col justify-center tablet:p-[100px,0px] desktop:py-24 tablet:py-14 py-8 bg-white">
        <h1 className="flex py-6 text-3xl font-bold">
          Voçê precisa, nós temos
        </h1>

        <div className="flex items-center justify-center">
          {/* Category Cards */}
          <ul className="grid desktop:grid-cols-5 tablet:grid-cols-3 grid-cols-2 min-w-full items-center justify-between flex-wrap">
            {CategoryDesciptions.map((category) => (
              <li key={category.category}>
                <Link
                  href={`/categorias/${category.category}`}
                  className="flex flex-col group gap-[10px] w-[150px] h-[150px] cursor-pointer items-center justify-center text-center"
                >
                  <Image
                    alt={category.category}
                    src={category.thumbnailIcon}
                    className=" w-[50px] h-[50px]"
                    loading="lazy"
                    width={50}
                    height={50}
                  />
                  <p className="flex text-sm font-medium">
                    {category.categoryTitle}
                  </p>
                  <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default HeroCategoryExpo;
