import { CategoryDesciptions } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const HeroCategoryExpo = () => {
  return (
    <>
      <section className="container flex flex-col justify-center bg-white py-8 tablet:p-[100px,0px] tablet:py-14 desktop:py-24">
        <h1 className="flex py-6 text-3xl font-bold">
          Nós temos o que voçê precisa
        </h1>

        <div className="flex items-center justify-center">
          {/* Category Cards */}
          <ul className="grid min-w-full grid-cols-2 flex-wrap items-center justify-between tablet:grid-cols-3 desktop:grid-cols-5">
            {CategoryDesciptions.map((category) => (
              <li key={category.category}>
                <Link
                  href={`/categorias/${category.category}`}
                  className="group group flex h-[150px] w-[150px] cursor-pointer flex-col items-center justify-center gap-[10px] text-center"
                >
                  <Image
                    alt={category.category}
                    src={category.thumbnailIcon}
                    className=" h-[50px] w-[50px] group-hover:animate-wiggle"
                    loading="lazy"
                    width={50}
                    height={50}
                  />
                  <p className="flex text-sm font-medium">
                    {category.categoryTitle}
                  </p>
                  <div className="flex h-[3px] w-12  bg-[#dee2e6] transition duration-300 ease-in-out group-hover:scale-x-150  group-hover:bg-black " />
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
