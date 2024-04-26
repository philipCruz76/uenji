import MobileSearchBar from "@/components/search/MobileSearchBar";
import SearchBar from "@/components/search/SearchBar";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import searchGigsFull from "@/lib/actions/searchGigsExtended";
import { GigPricing } from "@/types/gigWizard.types";
import Image from "next/image";
import Link from "next/link";

type pageProps = {
  searchParams?: {
    query: string;
    filters?: string;
  };
};

const searchPage = async ({ searchParams }: pageProps) => {
  const query = searchParams?.query || "";

  const searchResults = await searchGigsFull(query).catch((error) => {
    console.error(error);
  });
  if (!searchResults)
    return (
      <div className="flex min-h-[100dvh] min-w-[100dvw] items-center justify-center">
        <h1 className="text-3xl">No results found</h1>
      </div>
    );
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] flex-col justify-start p-6">
      <div className="block py-8 tablet:hidden">
        <MobileSearchBar withoutButton />
      </div>

      <h1 className="text-3xl">
        Results for <b>{query}</b>
      </h1>

      {/* This is where the search results will be displayed */}
      <div className=" m-auto grid w-full grid-cols-1 items-center justify-center gap-4 p-8 tablet:grid-cols-2 desktop:grid-cols-4 desktop:grid-rows-4">
        {searchResults.map((gig, index) => {
          const gigPackage = JSON.parse(
            gig.packages!,
          ) as GigPricing["packages"];
          return (
            <Link
              key={`gig-${index}`}
              href={`/${gig.user.username}/${gig.title.replace(/\s/g, "-")}`}
              className="group col-span-1 flex flex-shrink pr-2"
            >
              <Card className="flex h-[240px] w-full flex-col rounded-md border bg-[#f8f9fa] font-mono shadow-md transition duration-200 group-hover:scale-105 tablet:w-[250px]">
                <CardTitle className="max-h-[50%] min-w-full border-b">
                  <Image
                    src={gig.coverImage!}
                    alt={`${gig.title}`}
                    width={250}
                    height={120}
                    className="h-full w-full rounded-se-md rounded-ss-md bg-white"
                  />
                </CardTitle>
                <CardContent className="max-h-[50%] min-w-full p-[4px]">
                  <div className="flex h-full w-full flex-col ">
                    <div className="flex w-full flex-row items-center justify-start gap-2">
                      <Image
                        src={gig.user.image!}
                        alt={`${gig.user.username} Profile picture`}
                        width={30}
                        height={30}
                        className="max-h-[30px] min-h-[30px] max-w-[30px] rounded-full border bg-white"
                      />
                      <span className=" text-sm font-semibold">
                        {!gig.user.displayName
                          ? gig.user.username
                          : gig.user.displayName}
                      </span>
                    </div>
                    <div className="h-full w-full items-start justify-between p-2">
                      <span className="flex h-full flex-wrap font-sans text-xs font-semibold">
                        {gig.title.charAt(0).toUpperCase() + gig.title.slice(1)}
                      </span>

                      <span className=" flex items-end  text-sm font-semibold">
                        {gigPackage[0].price}.00 AOA
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default searchPage;
