"use client";

import { categoryFilters } from "@/constants";
import { GigOverview, GigOverviewValidator } from "@/types/gigWizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TagsInput from "react-tagsinput";
import "./gigTags.css";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [gigTitle, setGigTitle] = useState<string>("");
  const [gigTags, setGigTags] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<GigOverview>({
    mode: "onChange",
    resolver: zodResolver(GigOverviewValidator),
  });

  const gigOverviewHandler: SubmitHandler<GigOverview> = (data) => {
    console.log(data);
  };
  return (
    <section className="flex py-[40px] justify-center min-w-full min-h-full bg-gray-100">
      <form
        className="flex flex-col gap-4 w-[70%] h-[70%] border bg-white rounded-md relative p-[28px] pb-[40px]"
        onSubmit={handleSubmit(gigOverviewHandler)}
      >
        {/* Title */}
        <div className="flex flex-row  justify-between w-full">
          <div className="flex flex-col gap-2 max-w-[245px] pr-[32px]">
            <span className="text-lg font-semibold">Gig Title</span>
            <span className="text-sm text-gray-500">
              As your Gig storefront,{" "}
              <b>your title is the most important place</b> to include keywords
              that buyers would likely use to search for a service like yours.
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <textarea
              role="textbox"
              value={gigTitle}
              required
              className="text-lg font-bold border-[2px] focus:outline-none rounded-md p-2 min-h-[80px] justify-items-start"
              maxLength={80}
              {...register("gigTitle", {
                required: "Gig title is required",
                onChange: (e) => {
                  e.preventDefault();
                  setGigTitle(e.target.value);
                },
              })}
            />
            <div className="flex flex-row-reverse w-full justify-between">
              <span className=" text-xs text-gray-500">
                {gigTitle.length}/80 max
              </span>
              {errors.gigTitle && (
                <span className="text-xs text-red-500">
                  {errors.gigTitle.message}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Category */}
        <div className="flex flex-row  justify-between w-full">
          <div className="flex flex-col gap-2 max-w-[245px] pr-[32px]">
            <span className="text-lg font-semibold">Category</span>
            <span className="text-sm text-gray-500">
              Choose the <b>category</b> most suitable for your Gig.
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <select
              className="w-[300px] h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
              defaultValue={""}
            >
              <option value="" disabled>
                Selecionar Ramo
              </option>
              {categoryFilters.map((occupation) => (
                <option value={occupation} key={occupation}>
                  {occupation.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Search Tags */}
        <div className="flex flex-row  justify-between w-full">
          <div className="flex flex-col gap-2 max-w-[245px] pr-[32px]">
            <span className="text-lg font-semibold">Search tags</span>
            <span className="text-sm text-gray-500">
              Tag your Gig with buzz words that are relevant to the services you
              offer. Use all 5 tags to get found.
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="text-lg font-semibold">Positive Keywords</span>
            <span className="text-sm text-gray-500">
              {" "}
              Enter search terms you feel your buyers will use when looking for
              your service.
            </span>
            <TagsInput
              value={gigTags}
              {...register("gigSearchTags")}
              onChange={(tags) => {
                setGigTags(tags.map((tag) => tag.toUpperCase()));
              }}
              onlyUnique
              maxTags={5}
              validationRegex={/^[a-zA-Z0-9]+$/}
            />
          </div>
        </div>
        <div className="flex items-end justify-end ">
        <button type="submit"
        onClick={handleSubmit(gigOverviewHandler)}
        className="justify-center w-[180px] bg-black text-white rounded-md px-4 py-2">
          Save & Continue{" "}
        </button>
        </div>
        
      </form>
    </section>
  );
};

export default page;
