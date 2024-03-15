import getCurrentUser from "@/lib/actions/getCurrentUser";
import getGigByTitle from "@/lib/actions/gigs/getGigByTitle";
import Link from "next/link";
import { lazy } from "react";
import GigPricingCard from "./GigPricingCard";
import getSession from "@/lib/actions/getSession";
import { redirect } from "next/navigation";

type GigDesktopPageProps = {
  pageGig: Awaited<ReturnType<typeof getGigByTitle>>;
};

const GigSellerInfo = lazy(() => import("@/components/gigs/GigSellerInfo"));
const GigBasicInfo = lazy(() => import("@/components/gigs/GigBasicInfo"));
const GigDesktopPage = async ({ pageGig }: GigDesktopPageProps) => {
  if (!pageGig) redirect("/");
  const session = await getSession();
  let currentUsername = "";
  if (session !== null) {
    const currentUser = await getCurrentUser();
    currentUsername = currentUser?.username || "";
  }

  const gigUser = pageGig.user;
  const normalizedCategory = pageGig.category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return (
    <>
      <section className="flex w-[100dvw] flex-row justify-between p-[32px]">
        <div className="w-[70%]">
          <ul className="w flex flex-row items-center  justify-start gap-2">
            <li key={"home-link"}>
              <Link href="/" className=" group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#000000"
                  viewBox="0 0 256 256"
                  className="transition duration-200 ease-in-out group-hover:scale-125 "
                >
                  <path d="M240,208H224V115.55a16,16,0,0,0-5.17-11.78l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,115.55l.11-.1L128,40l79.9,75.43.11.1V208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48ZM144,208H112V160h32Z"></path>
                </svg>
              </Link>
            </li>
            <span>{`/`}</span>
            <li key={`${normalizedCategory}-link`}>
              <Link
                href={`/categorias/${normalizedCategory}`}
                className="group"
              >
                <span className="flex transition duration-200 ease-in-out group-hover:scale-105 group-hover:underline">
                  {pageGig.category}
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-[30%] items-start justify-end text-center">
          {currentUsername === gigUser.username ? (
            <a
              href={`/${gigUser.username}/manage_gigs/${pageGig.title.replace(
                /\s+/g,
                "-",
              )}/edit?step=1`}
              className="flex h-[40px] w-[200px] flex-row items-center justify-center rounded-md border border-black text-center hover:cursor-pointer hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path>
              </svg>
              <span>Editar Serviço</span>
            </a>
          ) : null}
        </div>
      </section>

      <section className="flex min-h-[100dvh] w-[100dvw] max-w-[100dvw] flex-row-reverse items-start px-[32px] pb-[32px] desktop:h-[200dvh]">
        <aside className="sticky top-10 h-full max-h-[460px] w-full max-w-[450px] items-center justify-center rounded-sm border  text-center shadow-lg">
          <GigPricingCard gig={pageGig} />
        </aside>

        <div className="flex h-full w-full flex-col items-start justify-center ">
          <GigSellerInfo user={gigUser} gigTitle={pageGig.title} />
          <GigBasicInfo gig={pageGig} />
        </div>
      </section>
    </>
  );
};

export default GigDesktopPage;
