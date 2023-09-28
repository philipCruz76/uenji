import { CategoryDesciptions } from "@/constants";
import { subCategories } from "@/constants/categoryConstants";
import { User } from "@/types/common.types";
import Image from "next/image";
import Link from "next/link";

type BuyerDashboardProps = {
  user: User;
}

const BuyerDashboard= ({ user } : BuyerDashboardProps) => {
  const popularCategories = CategoryDesciptions.filter((category) => ( category.category === "fotografia" || category.category === "design"))

  return (
    <section className="flex container w-screen h-screen py-8">
      <div className="flex w-full flex-col space-y-6">
        <h1 className="flex text-3xl left-0 justify-start items-center font-bold">
          Olá, {user.name ? user.name : user.username}
        </h1>

        <div className="flex flex-col gap-6 w-full  desktop:hidden">
          <div className="flex flex-row w-full justify-between h-fit ">
            <h2 className=" font-bold text-xl"> Categorias Populares</h2>
            <Link
              href={"/categorias"}
              className="flex flex-row gap-[4px] items-center justify-center text-sm  underline text-[#0000CC]"
            >
              {" "}
              Ver todas{" "}
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
          <ul key="categories-list" className="flex flex-col gap-2 w-full  h-full">
            {popularCategories.map((category) => {
              const subcategories = subCategories
                .find((sub) => sub.category === category.category)
                ?.subcategory.map((sub) => sub.name);
              return (
                <li >
                  <Link
                    href={`/categorias/${category.category}`}
                    className="flex flex-row  items-center justify-start gap-4 w-full border-2 rounded-md px-2 py-2" key={category.category}
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
        </div>
      </div>
    </section>
  );
};

export default BuyerDashboard;
