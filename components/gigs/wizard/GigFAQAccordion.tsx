"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { buttonVariants } from "@/constants/ui/button";
import { cn } from "@/lib/utils";
import { GigDescription } from "@/types/gigWizard.types";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormUnregister } from "react-hook-form";

type GigFAQAccordionProps = {
  question: string;
  answer: string;
  index: number;
  setInput: Dispatch<SetStateAction<Map<string, string>>>;
  removeInput: UseFormUnregister<GigDescription>;
  setCount: Dispatch<SetStateAction<number>>;
};

const GigFAQAccordion = ({
  question,
  answer,
  index,
  setInput,
  removeInput,
  setCount,
}: GigFAQAccordionProps) => {
  const [currentFAQ, setCurrentFAQ] = useState({
    question: question,
    answer: answer,
  });
  return (
    <Accordion
      type="multiple"
      className="flex min-h-[60px] w-full flex-col justify-start border bg-white px-4 py-[2.5px] text-start"
    >
      <AccordionItem value="1">
        <AccordionTrigger className="flex h-full w-full flex-row items-center justify-between text-start hover:no-underline ">
          <div className="flex w-full items-center justify-start gap-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
            <span className="text-lg font-bold text-black ">{question}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className=" flex w-full flex-col gap-4">
            <input
              type="text"
              value={currentFAQ.question}
              className="h-[40px] w-full rounded-md border-2 border-gray-300 p-4 focus:outline-none"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setCurrentFAQ({
                  ...currentFAQ,
                  question: e.currentTarget.value,
                });
              }}
            />
            <textarea
              className="text-elipsis max-h-[85px] min-h-[85px] w-full rounded-md border-2 border-gray-300 p-4 focus:outline-none"
              maxLength={300}
              value={currentFAQ.answer}
              placeholder="Add an Answer"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.preventDefault();
                setCurrentFAQ({
                  ...currentFAQ,
                  answer: e.currentTarget.value,
                });
              }}
            />
            <span className=" w-full text-end">
              {currentFAQ.answer.length} / 300{" "}
              <span className="text-gray-400">caracteres</span>
            </span>
            <div className=" flex w-full flex-row justify-between">
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  " px-[-1px] text-red-800",
                )}
                onClick={() => {
                  setInput((prev) => {
                    const newInput = new Map(prev);
                    newInput.delete(question);
                    return newInput;
                  });
                  removeInput(`faqs.${index}`);
                  setCount((count) => count - 1);
                }}
              >
                Apagar
              </button>
              <div className="flex flex-row justify-end gap-2">
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-[80px] rounded-md border hover:border-black",
                  )}
                  onClick={() => {}}
                >
                  {" "}
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={false}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-[60px] rounded-md hover:text-white focus:outline-none",
                  )}
                  onClick={() => {}}
                >
                  {" "}
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default GigFAQAccordion;
