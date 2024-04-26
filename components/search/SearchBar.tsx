"use client";

import searchGigs from "@/lib/actions/searchGigs";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

type gigSearchResults = {
  title: string;
  user: {
    username: string | null;
  };
};

const SearchBar = ({}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("HeroSection");
  const [gigs, setGigs] = useState<gigSearchResults[]>();
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    if (pathname === "/search") {
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      router.push(`/search?query=${searchTerm}`);
    }
  };
  const searchResults = useDebouncedCallback(async (query: string) => {
    if (!query) return setGigs([]);

    await searchGigs(query)
      .then((results) => {
        setGigs(results);
        setShowResults(true);
        return results;
      })
      .catch((error) => {
        setShowResults(false);
        toast.error(error.message);
      });
  }, 500);
  return (
    <div className=" hidden w-full flex-col  px-2 tablet:flex">
      <div className="absolute inset-0 top-[-20px] flex flex-row">
        <input
          type="text"
          ref={inputRef}
          placeholder={t("SearchPlaceholder")}
          defaultValue={searchParams.get("query")?.toString()}
          className="h-10 w-full rounded-l-md border-2 border-slate-300 bg-white px-5 text-sm text-black focus:border-slate-500 focus:outline-none"
          onBlur={() => setShowResults(false)}
          onKeyDown={(e) => {
            e.key === "Enter" && handleSearch(e.currentTarget.value);
            if (e.key === "Escape") {
              inputRef?.current?.blur();
            }
          }}
          onChange={(e) => {
            if (e.currentTarget.value.length > 2) {
              searchResults(e.currentTarget.value);
            } else {
              setGigs([]);
            }
          }}
        />
        <button
          type="submit"
          className=" aboslute inset-0 h-10 w-12 overflow-visible rounded-r-md border-black bg-black "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 28"
            strokeWidth="2"
            stroke="white"
            className="h-[22px] w-[28px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {Array.isArray(gigs) && gigs.length > 0 && showResults ? (
        <div className=" absolute left-[-1px] top-[20px] hidden w-full flex-col rounded-md border border-slate-300 bg-white tablet:flex">
          {gigs.map((gig) => (
            <a
              key={gig.title}
              href={`/${gig.user.username}/${gig.title.replace(/\s/g, "-")}`}
              className="block w-full p-2 hover:bg-gray-100"
            >
              <span className="font-mono text-sm font-semibold">
                {gig.title}
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
