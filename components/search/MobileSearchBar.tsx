"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

const MobileSearchBar = ({ withoutButton }: { withoutButton?: boolean }) => {
  const t = useTranslations("HeroSection");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current && inputRef.current.value.length > 2) {
          handleSearch(inputRef.current.value);
        }
      }}
      className="relative mb-4  flex h-[50px] w-full max-w-[440px] flex-col gap-4 "
    >
      <input
        type="text"
        ref={inputRef}
        placeholder={t("SearchPlaceholder")}
        className="z-4 flex-1 rounded-md border border-black bg-white p-2 text-[16px] focus:outline-none "
        onKeyDown={(e) => {
          e.key === "Enter" && handleSearch(e.currentTarget.value);
          if (e.key === "Escape") {
            inputRef?.current?.blur();
          }
        }}
      />

      {withoutButton ? null : (
        <button
          type="submit"
          className="z-4 h-[50px] w-full max-w-[440px] rounded-md border-none bg-black px-4 py-2 text-[#E2DEDB]"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="flex h-5 w-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </button>
      )}
    </form>
  );
};

export default MobileSearchBar;
