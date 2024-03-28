"use client";

import { cn } from "@/lib/utils";
import { CategoriesMap } from "@/constants";
import {
  GigDescription,
  GigOverview,
  GigOverviewValidator,
  GigPricing,
} from "@/types/gigWizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useGigWizardStepStore,
  useGigWizardStore,
} from "@/lib/stores/gigWizard-store";
import toast from "react-hot-toast";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { Gig } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";

type GigWizardOverviewProps = {
  username: string;
  gigName?: string;
};

const GigWizardOverview = ({ username, gigName }: GigWizardOverviewProps) => {
  const router = useRouter();
  const user = useCurrentUser();
  const locale = useLocale();
  const gigOverViewText = useTranslations("GigWizard.Overview");

  const {
    getFullGig,
    setGigOverview,
    getGigOverview,
    setFullGig,
    setGigPricing,
    setGigGallery,
    setGigDescription,
  } = useGigWizardStore();
  const { setGigWizardStepCurrent, setGigWizardStepCompleted } =
    useGigWizardStepStore();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GigOverview>({
    mode: "onChange",
    resolver: zodResolver(GigOverviewValidator),
  });

  const gigOverview = getGigOverview();

  useEffect(() => {
    setGigWizardStepCurrent(0);
    if (gigName && user) {
      fetch(`/api/gig/retrieve?gigName=${gigName}`, {
        method: "GET",
      })
        .then(async (res) => {
          const desiredGig = (await res.json()) as Gig;
          let parsedPackages = {} as GigPricing["packages"];
          let parsedFaqs = {} as GigDescription["faqs"];
          if (desiredGig) {
            if (desiredGig.packages !== null) {
              parsedPackages = JSON.parse(
                desiredGig.packages,
              ) as GigPricing["packages"];
              setGigPricing({
                ...getFullGig().pricing,
                packages: parsedPackages,
              });
            }

            if (desiredGig.coverImage !== "") {
              setGigGallery({
                ...getFullGig().gallery,
                gigImages: desiredGig.images,
              });
              if (desiredGig.documents[0] !== "") {
                setGigGallery({
                  ...getFullGig().gallery,
                  gigDocuments: desiredGig.documents,
                });
              }
            }
            if (desiredGig.description !== "") {
              setGigDescription({
                ...getFullGig().description,
                description: desiredGig.description
                  ? desiredGig.description
                  : "",
              });
              if (desiredGig.faq !== null) {
                parsedFaqs = JSON.parse(
                  desiredGig.faq || "",
                ) as GigDescription["faqs"];
                setGigDescription({
                  ...getFullGig().description,
                  faqs: parsedFaqs,
                });
              }
            }
            setFullGig({
              ...getFullGig(),
              overview: {
                ...getFullGig().overview,
                gigTitle: desiredGig.title,
                gigCategory: desiredGig.category,
                gigSearchTags: [...desiredGig.features],
              },
            });
            console.log(getFullGig());
            setGigWizardStepCompleted(0);
            setValue("gigTitle", desiredGig.title, { shouldValidate: true });
            setValue("gigCategory", desiredGig.category, {
              shouldValidate: true,
            });
            setValue("gigSearchTags", [...desiredGig.features], {
              shouldValidate: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (event.key === "Enter" && event.currentTarget.value) {
      setGigOverview({
        ...gigOverview,
        gigSearchTags: [...gigOverview.gigSearchTags, value.toUpperCase()],
      });
      setValue(
        "gigSearchTags",
        [...gigOverview.gigSearchTags, value.toUpperCase()],
        {
          shouldValidate: true,
        },
      );

      event.currentTarget.value = "";
    }
    if (event.key === "Backspace" && !event.currentTarget.value) {
      setGigOverview({
        ...gigOverview,
        gigSearchTags: gigOverview.gigSearchTags.slice(
          0,
          gigOverview.gigSearchTags.length - 1,
        ),
      });

      setValue(
        "gigSearchTags",
        gigOverview.gigSearchTags.slice(
          0,
          gigOverview.gigSearchTags.length - 1,
        ),
        {
          shouldValidate: true,
        },
      );
      event.currentTarget.value = "";
    }
    return;
  };

  const handleDelete = () => {
    fetch(`/api/gig/delete?gigName=${gigName}`, {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Gig deleted successfully");
          router.push(`/`);
          router.refresh();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onSubmit: SubmitHandler<GigOverview> = (data) => {
    setGigOverview(data);
    if (gigName) {
      fetch(`/api/gig/update?gigName=${gigName}&updateType=overview`, {
        method: "POST",
        body: JSON.stringify(getGigOverview()),
      })
        .then((res) => {
          if (res.ok) {
            setGigWizardStepCompleted(0);
            router.push(
              `/${username}/manage_gigs/${getGigOverview()
                .gigTitle.replace(/\s+/g, "-")
                .toLowerCase()}/edit?step=2`,
            );
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      fetch("/api/gig/create", {
        method: "POST",
        body: JSON.stringify(getGigOverview()),
      }).then((res) => {
        if (res.ok) {
          setGigWizardStepCompleted(0);
          router.push(
            `/${username}/manage_gigs/${getGigOverview()
              .gigTitle.replace(/\s+/g, "-")
              .toLowerCase()}/edit?step=2`,
          );
        }
      });
    }
  };

  return (
    <section className="flex min-h-full min-w-full justify-center bg-gray-100 py-[40px]">
      <form
        className="relative flex h-[70%] w-[70%] flex-col gap-4 rounded-md border bg-white p-[28px] pb-[40px]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* Title */}
        <div className="flex w-full  flex-row justify-between">
          <div className="flex min-w-[245px] max-w-[245px] flex-col gap-2 pr-[32px]">
            <span className="text-lg font-semibold">
              {gigOverViewText("title.heading")}
            </span>
            <span className="text-sm text-gray-500">
              {gigOverViewText("title.subheadingPart1")}
              <b>{gigOverViewText("title.subheadingBold")}</b>{" "}
              {gigOverViewText("title.subheadingPart2")}
            </span>
          </div>
          <div className="flex w-full flex-col gap-2">
            <textarea
              role="textbox"
              value={gigOverview.gigTitle}
              required
              className="min-h-[80px] justify-items-start rounded-md border-[2px] p-2 text-lg font-bold focus:outline-none"
              maxLength={80}
              {...register("gigTitle", {
                required: gigOverViewText("title.inputValidation"),
                onChange: (e) => {
                  e.preventDefault();
                  setGigOverview({ ...gigOverview, gigTitle: e.target.value });
                },
              })}
            />
            <div className="flex w-full flex-row-reverse justify-between">
              <span className=" text-xs text-gray-500">
                {gigOverview.gigTitle.length}/80 max
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
        <div className="flex w-full  flex-row justify-between">
          <div className="flex min-w-[245px] max-w-[245px] flex-col gap-2 pr-[32px]">
            <span className="text-lg font-semibold">{gigOverViewText("category.heading")}</span>
            <span className="text-sm text-gray-500">
            {gigOverViewText("category.subheadingPart1")} <b>{gigOverViewText("category.subheadingBold")}</b> {gigOverViewText("category.subheadingPart2")}
            </span>
          </div>
          <div className="flex w-full flex-col gap-2">
            <select
              value={gigOverview.gigCategory}
              className="h-[40px] w-[300px] rounded-sm border border-gray-300 bg-white px-2 text-gray-600"
              {...register("gigCategory", {
                required: gigOverViewText("category.inputValidation"),
                onChange: (e) => {
                  e.preventDefault();
                  setGigOverview({
                    ...gigOverview,
                    gigCategory: e.target.value,
                  });
                },
              })}
            >
              <option value="" disabled>
                {gigOverViewText("category.selectPlaceholder")}
              </option>
              {CategoriesMap.map((category) => {
                const categoryObject = category.category;
                const localizedName =
                  locale === "pt" ? categoryObject.pt : categoryObject.en;
                return (
                  <option value={categoryObject.name} key={categoryObject.name}>
                    {localizedName.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
          {errors.gigCategory && (
            <span className="text-xs text-red-500">
              {errors.gigCategory.message}
            </span>
          )}
        </div>
        {/* Search Tags */}
        <div className="flex max-w-full  flex-row justify-between">
          <div className="flex min-w-[245px] max-w-[245px] flex-col gap-2 pr-[32px]">
            <span className="text-lg font-semibold">{gigOverViewText("searchTags.heading")}</span>
            <span className="text-sm text-gray-500">
            {gigOverViewText("searchTags.subheading")}
            </span>
          </div>
          <div className="flex w-full max-w-full  flex-col gap-2">
            <span className="text-lg font-semibold">{gigOverViewText("searchTags.keywordsHeading")}</span>
            <span className="text-sm text-gray-500">
            {gigOverViewText("searchTags.keywordsSubheading")}
            </span>

            <div
              className={cn(
                "flex h-[50px] max-w-[593px] flex-row gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {gigOverview.gigSearchTags.map((tag, index) => (
                <button
                  type="button"
                  className=" flex max-h-full max-w-full items-center justify-center justify-items-center gap-1 rounded-md bg-slate-100 px-[8px] py-[8px] text-center "
                  key={index}
                >
                  <span className="h-full w-full  font-semibold text-gray-500 hover:cursor-default">
                    {tag.toUpperCase()}
                  </span>

                  <svg
                    onClick={(e) => {
                      e.preventDefault();
                      setGigOverview({
                        ...gigOverview,
                        gigSearchTags: gigOverview.gigSearchTags.filter(
                          (_, i) => i !== index,
                        ),
                      });

                      setValue(
                        "gigSearchTags",
                        gigOverview.gigSearchTags.filter((_, i) => i !== index),
                        { shouldValidate: true },
                      );
                    }}
                    className=" h-full w-full hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                  </svg>
                </button>
              ))}
              <input
                type="text"
                id="gigTagsInput"
                className="bg-white outline-none"
                placeholder={gigOverViewText("searchTags.tagsPlaceholder")}
                onKeyDown={handleKeyDown}
              />
            </div>

            {errors.gigSearchTags && (
              <span className="text-xs text-red-500">
                {errors.gigSearchTags.message}
              </span>
            )}
          </div>
        </div>

        <div
          className={cn(
            !gigName
              ? "flex w-full justify-end"
              : "flex w-full justify-between",
          )}
        >
          {!gigName ? null : (
            <button
              type="button"
              className={cn(
                isValid ? "bg-red-600 hover:bg-red-500" : "bg-gray-400",
                "rounded-md px-4 py-2 text-white ",
              )}
              onClick={handleDelete}
            >
               {gigOverViewText("deleteButton")}
            </button>
          )}
          <button
            type="button"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            className={cn(
              `w-[180px] justify-center ${
                isValid ? "bg-sky-500 text-white" : "bg-gray-400 text-white"
              } rounded-md px-4 py-2 hover:bg-sky-400`,
            )}
          >
            {gigOverViewText("nextButton")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default GigWizardOverview;
