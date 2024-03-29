import CategoriesGigCarousel from "@/components/categories/CategoriesGigCarousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import UserGigsShowcaseMobile from "@/components/users/profile/mobile/UserGigsShowcaseMobile";
import {
  CATEGORIES,
  CategoryDesciptionsPT,
  CategoryDesciptionsEN,
} from "@/constants";
import { categoryFAQs, SubCategoriesList } from "@/constants/categoryConstants";
import getPopularGigs from "@/lib/actions/gigs/getPopularGigs";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

type pageProps = {
  params: {
    category: string;
  };
};

const categorySchema = z.enum(CATEGORIES);

const page = async ({ params }: pageProps) => {
  const { category } = params;
  const valid = categorySchema.safeParse(category);
  const locale = await getLocale();
  const categoryPageText = await getTranslations("Categories");

  if (!valid.success) redirect("/");

  const CategoryDesciptions =
    locale === "pt" ? CategoryDesciptionsPT : CategoryDesciptionsEN;
  const categoryObject = CategoryDesciptions.find(
    (c) => c.categoryName === category,
  );

  const { categoryTagline, categoryTitle, titlecardImage, categoryName } =
    categoryObject!;
  const categoryGigs = await getPopularGigs(categoryName);
  const subcategory = SubCategoriesList.find(
    (c) => c.category === category,
  )?.subcategory;
  const faq = categoryFAQs.find((c) => c.category === category)?.faq;

  return (
    <section className="flex min-h-[100dvh] max-w-[100dvw] flex-col gap-6 bg-white px-[24px] py-8 ">
      <div className="flex  min-h-[240px] w-full flex-col items-center  justify-center text-center text-white">
        <Image
          src={
            !titlecardImage
              ? "https://res.cloudinary.com/dqe71igxe/image/upload/v1695893990/category%20bg.jpg"
              : titlecardImage
          }
          width={300}
          height={200}
          alt={categoryTitle}
          className=" h-[200px]  w-[300px] rounded-md object-fill"
        />
        <h1 className="  text-3xl font-bold text-black ">{categoryTitle}</h1>
        <h3 className=" items-center justify-center text-xl font-semibold text-black">
          {categoryTagline}
        </h3>
      </div>

      <div className="flex w-full flex-col ">
        <span className="w-full px-6 py-4 text-xl font-bold opacity-90 desktop:px-0">
          {categoryPageText("popularGigs")}
          {categoryTitle}
        </span>
        {categoryGigs && categoryGigs.length > 0 && (
          <div className="h-full w-full items-center justify-center px-12 text-center">
            {/* Popular Gigs Carousel */}
            <div className="hidden desktop:flex">
              <CategoriesGigCarousel categoryGigs={categoryGigs} />
            </div>
            <div className="flex desktop:hidden">
              <UserGigsShowcaseMobile gigsToShow={categoryGigs} />
            </div>
          </div>
        )}
      </div>
      <div className="flex min-w-full flex-col">
        <span className="w-full px-6 py-4  text-xl font-bold opacity-90 desktop:px-0">
          {categoryPageText("explore")}
          {categoryTitle}
        </span>
        <div className="hidden w-full flex-row gap-4 py-4 desktop:flex">
          {subcategory?.map((sub) => (
            <div key={sub.name} className="gap- flex w-full flex-col">
              <Image
                src={sub.thumbnail}
                width={300}
                height={200}
                alt={sub.name}
                className="flex max-h-[200px] max-w-[300px] rounded-lg"
              />
              <h2 className="flex w-full py-4   text-xl font-bold opacity-90">
                {sub.name}
              </h2>
              <ul className="flex w-[70%] flex-col  items-center justify-start  gap-3">
                {sub.listings.map((listing) => (
                  <Link
                    href={`/category/${category}`}
                    key={listing}
                    className="group flex w-full flex-row items-center justify-between rounded-md py-1 text-lg text-gray-600 hover:bg-gray-200"
                  >
                    {listing}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#000000"
                      viewBox="0 0 256 256"
                      className="hidden group-hover:flex "
                    >
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="desktop:hidden">
          {subcategory?.map((sub) => (
            <Accordion type="multiple" key={sub.name}>
              <AccordionItem value="Subcategory">
                <AccordionTrigger className="border-b px-6 hover:no-underline">
                  <div className="flex w-full flex-row gap-3 ">
                    <Image
                      src={sub.thumbnail}
                      width={80}
                      height={50}
                      alt={sub.name}
                      className=" max-h-[50px] max-w-[80px] rounded-lg"
                    />
                    <span className=" flex h-full w-full text-center text-lg font-bold  opacity-90">{`${sub.name}`}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col items-start gap-3  bg-gray-50 py-[20px] text-lg text-gray-600">
                    {sub.listings.map((listing) => (
                      <Link
                        href={`/category/${category}`}
                        key={listing}
                        className="px-6 hover:underline"
                      >
                        {listing}
                      </Link>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
      <div className="flex min-w-full flex-col px-6">
        <h2 className="w-full py-4  text-xl  font-bold opacity-90 desktop:text-center desktop:text-2xl">
          {categoryPageText("faq")}
        </h2>
        {faq?.map((f) => (
          <Accordion type="multiple" key={f.question} className=" border-b">
            <AccordionItem value="FAQ">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex h-full w-full text-start text-[16px] text-lg text-gray-600 opacity-90">{`${f.question}`}</span>
              </AccordionTrigger>
              <AccordionContent>
                <span className="flex w-[80%]  flex-wrap text-left text-[16px] text-gray-600 opacity-90">
                  {f.answer}
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default page;
