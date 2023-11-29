import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { CATEGORIES, CategoryDesciptions } from "@/constants";
import { categoryFAQs, subCategories } from "@/constants/categoryConstants";
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

const page = ({ params }: pageProps) => {
  const { category } = params;
  const valid = categorySchema.safeParse(category);

  if (!valid.success) redirect("/");

  const categoryObject = CategoryDesciptions.find(
    (c) => c.category === category,
  );

  const { categoryTagline, categoryTitle, titlecardImage } = categoryObject!;
  const subcategory = subCategories.find((c) => c.category === category)
    ?.subcategory;
  const faq = categoryFAQs.find((c) => c.category === category)?.faq;

  return (
    <section className="flex flex-col gap-6 py-8 tablet:container min-h-[100dvh] max-w-screen ">
      <div className="flex  w-full min-h-[240px] items-center  text-center justify-center border rounded-md  text-white">
        <Image
          src={
            !titlecardImage
              ? "https://res.cloudinary.com/dqe71igxe/image/upload/v1695893990/category%20bg.jpg"
              : titlecardImage
          }
          width={1200}
          height={800}
          alt={categoryTitle}
          className=" object-fill w-full h-[240px] rounded-md"
        />
        <h1 className="absolute  text-3xl top-[200px] text-black font-sans font-bold ">
          {categoryTitle}
        </h1>
        <h3 className="absolute  top-[240px] items-center text-xl text-black font-semibold font-sans justify-center">
          {categoryTagline}
        </h3>
      </div>

      <div className="flex flex-col w-full ">
        <span className="w-full font-sans font-bold px-6 desktop:px-0 py-4 text-xl opacity-90">
          Serviços mais populares de {categoryTitle}
        </span>
        <div className="w-full h-[100px] border items-center justify-center text-center">
          {" "}
          TO be implemented gigs carroussel <br />
          <b>!on mobile it is not a slider!</b>{" "}
        </div>
      </div>
      <div className="flex flex-col min-w-full">
        <span className="w-full font-sans font-bold px-6 desktop:px-0 py-4 text-xl opacity-90">
          Explora {categoryTitle}
        </span>
        <div className="desktop:flex flex-row gap-4 hidden w-full py-4">
          {subcategory?.map((sub) => (
            <div className="flex flex-col w-full gap-">
              <Image
                src={sub.thumbnail}
                width={300}
                height={200}
                alt={sub.name}
                className="flex max-w-[300px] max-h-[200px] rounded-lg"
              />
              <h2 className="flex w-full font-sans font-bold  py-4 text-xl opacity-90">
                {sub.name}
              </h2>
              <ul className="flex flex-col w-[70%]  items-center justify-start  gap-3">
                {sub.listings.map((listing) => (
                  <Link
                    href={`/category/${category}`}
                    key={listing}
                    className="flex flex-row justify-between group items-center w-full py-1 text-lg text-gray-600 rounded-md hover:bg-gray-200"
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
                <AccordionTrigger className="px-6 border-b hover:no-underline">
                  <div className="flex flex-row gap-3 w-full ">
                    <Image
                      src={sub.thumbnail}
                      width={80}
                      height={50}
                      alt={sub.name}
                      className=" max-w-[80px] max-h-[50px] rounded-lg"
                    />
                    <span className=" flex w-full h-full text-center font-bold text-lg  opacity-90">{`${sub.name}`}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex py-[20px] flex-col items-start  text-lg gap-3 text-gray-600 bg-gray-50">
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
      <div className="flex flex-col min-w-full px-6">
        <h2 className="desktop:text-center w-full font-sans font-bold  py-4 desktop:text-2xl text-xl opacity-90">
          {categoryTitle} FAQ
        </h2>
        <div className="">
          {faq?.map((f) => (
            <Accordion type="multiple" key={f.question} className=" border-b">
              <AccordionItem value="FAQ">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex w-full h-full text-start text-lg text-gray-600 opacity-90 text-[16px]">{`${f.question}`}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className="flex w-[80%]  flex-wrap text-left text-gray-600 opacity-90 text-[16px]">
                    {f.answer}
                  </span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
