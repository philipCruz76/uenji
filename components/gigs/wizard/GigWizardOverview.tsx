import { FC } from 'react';

import { cn } from "@/lib/utils";
import { categoryFilters } from "@/constants";
import { GigOverview, GigOverviewValidator } from "@/types/gigWizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGigWizardStore } from "@/lib/stores/gigWizard-store";

interface GigWizardOverviewProps {
    username  : string;
}

const GigWizardOverview: FC<GigWizardOverviewProps> = ({ username }) => {
    const router = useRouter();
  const [gigTitle, setGigTitle] = useState<string>("");
  const [gigCategory, setGigCategory] = useState<string>("");
  const [gigTags, setGigTags] = useState<string[]>([]);
  const { setGigOverview, getGigOverview } = useGigWizardStore();
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GigOverview>({
    mode: "onChange",
    resolver: zodResolver(GigOverviewValidator),
  });

  const watchForm = watch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (event.key === "Enter" && event.currentTarget.value) {
      setGigTags([...gigTags, value.toUpperCase()]);
      setValue("gigSearchTags", [...gigTags, value.toUpperCase()]);
      trigger("gigSearchTags");
      event.currentTarget.value = "";
    }
    if (event.key === "Backspace" && !event.currentTarget.value) {
      setGigTags(gigTags.slice(0, gigTags.length - 1));
      setValue("gigSearchTags", gigTags.slice(0, gigTags.length - 1));
      event.currentTarget.value = "";
    }
    return;
  };

  const onSubmit: SubmitHandler<GigOverview> = (data) => {
    setGigOverview(data);
    console.log(getGigOverview());
    router.push(
      `/${username}/manage_gigs/${getGigOverview().gigTitle.replace(
        /\s+/g,
        "-"
      )}/edit?step=2`
    );
  };

  return (
    <section className="flex py-[40px] justify-center min-w-full min-h-full bg-gray-100">
    <form
      className="flex flex-col gap-4 w-[70%] h-[70%] border bg-white rounded-md relative p-[28px] pb-[40px]"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* Title */}
      <div className="flex flex-row  justify-between w-full">
        <div className="flex flex-col gap-2 min-w-[245px] max-w-[245px] pr-[32px]">
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
        <div className="flex flex-col gap-2 min-w-[245px] max-w-[245px] pr-[32px]">
          <span className="text-lg font-semibold">Category</span>
          <span className="text-sm text-gray-500">
            Choose the <b>category</b> most suitable for your Gig.
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <select
            value={gigCategory}
            className="w-[300px] h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
            {...register("gigCategory", {
              required: "Category is required",
              onChange: (e) => {
                e.preventDefault();
                setGigCategory(e.target.value);
              },
            })}
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
        {errors.gigCategory && (
          <span className="text-xs text-red-500">
            {errors.gigCategory.message}
          </span>
        )}
      </div>
      {/* Search Tags */}
      <div className="flex flex-row  justify-between max-w-full">
        <div className="flex flex-col gap-2 min-w-[245px] max-w-[245px] pr-[32px]">
          <span className="text-lg font-semibold">Search tags</span>
          <span className="text-sm text-gray-500">
            Tag your Gig with buzz words that are relevant to the services you
            offer. Use all 5 tags to get found.
          </span>
        </div>
        <div className="flex flex-col gap-2  max-w-full w-full">
          <span className="text-lg font-semibold">Positive Keywords</span>
          <span className="text-sm text-gray-500">
            {" "}
            Enter search terms you feel your buyers will use when looking for
            your service.
          </span>

          <div
            className={cn(
              "flex flex-row max-w-[593px] overflow-x-scroll gap-2 h-[50px] rounded-md border border-input overflow-scroll bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            )}
            {...register("gigSearchTags", {
              required: "Search tags are required",
              value: gigTags,
            })}
          >
            {gigTags.map((tag, index) => (
              <button
                type="button"
                className="bg-slate-100 flex items-center justify-center  gap-1 px-[8px] py-[8px] rounded-md "
                key={index}
              >
                <span className="text-center font-semibold text-gray-500 items-center justify-center">
                  {tag.toUpperCase()}
                </span>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    setGigTags(gigTags.filter((_, i) => i !== index));
                    setValue(
                      "gigSearchTags",
                      gigTags.filter((_, i) => i !== index)
                    );
                  }}
                  className="h-[20px] w-[20px] text-gray-400 font-bold inline-flex max-w-full justify-center items-center text-lg overflow-x-scroll"
                >
                  &times;
                </span>
              </button>
            ))}
            <input
              type="text"
              className=" outline-none  bg-transparent"
              placeholder="Type something..."
              onKeyDown={handleKeyDown}
            />
          </div>

          {errors.gigSearchTags && (
            <span className="text-xs text-red-500">
              {errors.gigSearchTags.message}
            </span>
          )}

          <span className="text-xl font-bold text-gray-500">
            {watchForm.gigTitle}
            <br />
            {watchForm.gigCategory}
            <br />
            {watchForm.gigSearchTags}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-end ">
        <button
          type="button"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
          className={cn(
            `justify-center w-[180px] ${
              isValid ? " bg-sky-500 text-white" : "bg-gray-400 text-white"
            } rounded-md px-4 py-2`
          )}
        >
          Save & Continue{" "}
        </button>
      </div>
    </form>
  </section>
   );
}

export default GigWizardOverview;