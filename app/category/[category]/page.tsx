
import { Category } from "@/types/common.types";
import { FC } from "react";

type pageProps = {
  params: {
    category: Category;
  };
};

const page: FC<pageProps> = ({ params } ) => {
  const { category } = params;

  return (
    <main>
      <section className="flex w-screen h-screen">
        <h1>{category}</h1>
      </section>
    </main>
  );
};

export default page;
