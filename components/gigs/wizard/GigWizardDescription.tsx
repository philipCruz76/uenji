"use client";

import { buttonVariants } from "@/constants/ui/button";
import {
  useGigWizardStepStore,
  useGigWizardStore,
} from "@/lib/stores/gigWizard-store";
import { cn } from "@/lib/utils";
import {
  GigDescription,
  GigDescriptionValidator,
} from "@/types/gigWizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import GigFAQAccordion from "./GigFAQAccordion";
import toast from "react-hot-toast";
import Link from "next/link";
import { useTranslations } from "next-intl";

type GigWizardDescriptionProps = {
  username: string;
  gigName: string;
};

const GigWizardDescription = ({
  username,
  gigName,
}: GigWizardDescriptionProps) => {
  const [showFAQ, setShowFAQ] = useState(false);

  const [faqs, setFAQs] = useState<Map<string, string>>(new Map());
  const [currentFAQ, setCurrentFAQ] = useState({
    question: "",
    answer: "",
  });
  const [faqCount, setFaqCount] = useState<number>(0);
  const { setGigDescription, getGigDescription } = useGigWizardStore();
  const { setGigWizardStepCurrent, setGigWizardStepCompleted } =
    useGigWizardStepStore();
  const gigDescription = getGigDescription();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    trigger,
    unregister,
    formState: { errors, isValid },
  } = useForm<GigDescription>({
    mode: "onChange",
    resolver: zodResolver(GigDescriptionValidator),
  });

  const gigDescriptionText = useTranslations("GigWizard.Description");

  useEffect(() => {
    setGigWizardStepCurrent(2);
    if (gigDescription.faqs)
      gigDescription.faqs.map((faq) => {
        setFAQs(faqs.set(faq.question, faq.answer));
      });
  }, []);

  const gigDescriptionHandler: SubmitHandler<GigDescription> = (data) => {
    setGigDescription({ ...gigDescription, faqs: data.faqs });
    fetch(`/api/gig/update?gigName=${gigName}&updateType=description`, {
      method: "POST",
      body: JSON.stringify(getGigDescription()),
    })
      .then((res) => {
        if (res.ok) {
          setGigWizardStepCompleted(2);
          router.push(`/${username}/manage_gigs/${gigName}/edit?step=4`);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-[20%] flex min-h-[100dvh] max-w-[100dvw] flex-col items-center justify-center gap-4 px-6 py-[40px] pt-[50px]"
    >
      <div className="w-full text-start text-gray-600">
        <h1 className="w-full border-b-2 text-2xl font-medium">
          {gigDescriptionText("description.title")}
        </h1>
        <h3 className="pt-[20px]">
          {gigDescriptionText("description.subtitle")}
        </h3>
      </div>
      <div className="group flex w-full flex-row items-start justify-center">
        <textarea
          {...register("description", {
            required: gigDescriptionText("description.inputValidation"),
            value: gigDescription.description,
            onChange: (e) =>
              setGigDescription({
                ...gigDescription,
                description: e.target.value,
              }),
          })}
          maxLength={1200}
          className="max-h-[300px] min-h-[300px] w-full rounded-md border-2 border-gray-300 p-4"
          placeholder={gigDescriptionText("description.descriptionPlaceholder")}
        />
        <span className="absolute right-[70px] hidden w-[200px] text-ellipsis group-hover:flex">
          {gigDescriptionText("description.hoverTextPart1")}
          <br /> <br /> {gigDescriptionText("description.hoverTextPart2")}
        </span>
      </div>
      <div className="flex w-full flex-row justify-between pb-[20px] text-start text-sm">
        {errors.description && (
          <span className="w-full text-red-500">
            {errors.description.message}
          </span>
        )}
        <span className="w-full text-end">
          {gigDescription.description.length} / 1200{" "}
          <span className="text-gray-400">characters</span>
        </span>
      </div>
      {/*Gig FAQs */}
      <div className="w-full text-gray-600">
        <h1 className="border-b-2 text-2xl font-medium">
          {gigDescriptionText("faq.title")}
        </h1>
        <h3 className="pt-[20px]">{gigDescriptionText("faq.subtitle")}</h3>
        {/*FAQs List */}
        <div className="w-full border-b-2 py-[15px]">
          {!showFAQ ? (
            <button
              className="text-sm text-sky-500"
              onClick={() => {
                if (faqCount < 3) {
                  setShowFAQ((value) => !value);
                } else {
                  toast.error(gigDescriptionText("faq.toastError"));
                }
              }}
            >
              {gigDescriptionText("faq.addFaq")}
            </button>
          ) : (
            <div className="flex w-full flex-col gap-4">
              <input
                type="text"
                className="h-[40px] w-full rounded-md border-2 border-gray-300 p-4"
                placeholder={gigDescriptionText("faq.questionPlaceholder")}
                {...register(`faqs.${faqCount}.question`, {
                  value: currentFAQ.question,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setCurrentFAQ({
                      ...currentFAQ,
                      question: e.currentTarget.value,
                    });
                  },
                })}
              />
              <textarea
                className="text-elipsis max-h-[85px] min-h-[85px] w-full rounded-md border-2 border-gray-300 p-4"
                maxLength={300}
                placeholder={gigDescriptionText("faq.answerPlaceholder")}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCurrentFAQ({
                    ...currentFAQ,
                    answer: e.currentTarget.value,
                  });
                }}
              />
              <div className="flex flex-row justify-between">
                {errors.faqs && errors.faqs.length && errors.faqs.length > 0 ? (
                  <span className="w-full text-xs text-red-500">
                    {errors.faqs[faqCount]?.question?.message} <br />
                  </span>
                ) : null}
                <span className="w-full text-end">
                  {currentFAQ.answer.length} / 300{" "}
                  <span className="text-gray-400">characters</span>
                </span>
              </div>

              <div className="flex flex-row justify-end gap-2">
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-[80px] rounded-md border hover:border-black",
                  )}
                  onClick={() => {
                    unregister(`faqs.${faqCount}.question`);
                    unregister(`faqs.${faqCount}.answer`);
                    setCurrentFAQ({
                      question: "",
                      answer: "",
                    });
                    setShowFAQ((value) => !value);
                  }}
                >
                  {gigDescriptionText("faq.cancelButton")}
                </button>
                <button
                  type="button"
                  disabled={
                    errors.faqs && errors.faqs.length && errors.faqs.length > 0
                      ? true
                      : false
                  }
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-[80px] rounded-md hover:text-white",
                  )}
                  onClick={() => {
                    if (!currentFAQ.question || !currentFAQ.answer) return;
                    if (
                      currentFAQ.question.length < 1 ||
                      currentFAQ.answer.length < 1
                    )
                      trigger("faqs");
                    setFAQs(faqs.set(currentFAQ.question, currentFAQ.answer));
                    setFaqCount((count) => count + 1);
                    Array.from(faqs.keys()).map((input, index) => {
                      if (!faqs.get(input)) return null;
                      control.register(`faqs.${index}.answer`, {
                        value: faqs.get(input!),
                      });
                    });
                    setCurrentFAQ({
                      question: "",
                      answer: "",
                    });
                    setShowFAQ((value) => !value);
                  }}
                >
                  {gigDescriptionText("faq.addButton")}
                </button>
              </div>
            </div>
          )}
        </div>
        {faqs.size > 0
          ? Array.from(faqs.keys()).map((input, index) => {
              return (
                <GigFAQAccordion
                  key={`faq-filled-${index}`}
                  question={input}
                  answer={faqs.get(input)!}
                  index={index}
                  setInput={setFAQs}
                  removeInput={unregister}
                  setCount={setFaqCount}
                />
              );
            })
          : null}
      </div>

      <div
        className={cn(
          !gigName ? "flex w-full justify-end" : "flex w-full justify-between",
        )}
      >
        {!gigName ? null : (
          <button
            type="button"
            className={cn(
              false ? "bg-red-600 hover:bg-red-500" : "bg-gray-400",
              "max-h-[40px] rounded-md px-4 py-2 text-white ",
            )}
            onClick={() => {}}
          >
            {gigDescriptionText("deleteButton")}
          </button>
        )}

        <div className="flex items-end justify-end">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={isValid === false}
              onClick={handleSubmit(gigDescriptionHandler)}
              className={cn(
                `w-[180px] justify-center ${
                  isValid
                    ? "bg-sky-500 text-white hover:bg-sky-400"
                    : "bg-gray-400 text-white"
                } rounded-md px-4 py-2 `,
              )}
            >
              {gigDescriptionText("nextButton")}
            </button>
            <Link
              href={`/${username}/manage_gigs/${gigName}/edit?step=2`}
              className="text-center text-sm text-sky-500 hover:underline"
            >
              {gigDescriptionText("backButton")}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GigWizardDescription;
