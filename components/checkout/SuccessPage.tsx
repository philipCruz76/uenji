"use client";
import { motion } from "framer-motion";
import { buttonVariants } from "@/constants/ui/button";
import { cn } from "@/lib/utils";
import { GigPricing } from "@/types/gigWizard.types";
import { Card, CardContent, CardTitle } from "../ui/Card";
import Image from "next/image";
import { Gig, User } from "@prisma/client";
import { useTranslations } from "next-intl";
type SuccessPageProps = {
  pruchasedPackage: GigPricing["packages"][0];
  purchasedGig: Gig & { user: User };
};

const SuccessPage = ({ pruchasedPackage, purchasedGig }: SuccessPageProps) => {
  const successPageText = useTranslations("Checkout.success");

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none" />
        <motion.polyline
          points="88 136 112 160 168 104"
          fill="none"
          stroke="#47a02b"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="14"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.circle
          cx="128"
          cy="128"
          r="96"
          fill="none"
          stroke="#47a02b"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="14"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      </svg>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center font-sans text-2xl font-bold"
      >
        {successPageText("heading")}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-[100dvw] px-6  text-center font-mono text-2xl font-bold"
      >
        <Card className="flex max-h-[300px] w-[300px] flex-col  items-center justify-start overflow-hidden border-none hover:cursor-pointer">
          <CardTitle>
            <Image
              alt={purchasedGig.title}
              src={purchasedGig.coverImage!}
              width={200}
              height={200}
              className="max-h-[100px] min-h-[100px] min-w-[100px]  max-w-[100px]  rounded-full border-r object-fill"
            />
          </CardTitle>
          <CardContent className="flex h-full w-full flex-col gap-1 rounded-sm border bg-[#f8f9fa] p-[8px] text-start text-sm">
            <h3 className="flex justify-between text-xl font-bold">
              {successPageText("orderCard.seller")}
              {purchasedGig.user.username}
            </h3>
            <span className="font-light">
              {successPageText("orderCard.gig")}
              {purchasedGig.title}
            </span>
            <span className="font-light">
              {successPageText("orderCard.package")}
              {pruchasedPackage.title}
            </span>
            <span className="font-light">
              {successPageText("orderCard.price")}
              {pruchasedPackage.price}.00 AOA
            </span>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3, ease: "easeIn" }}
      >
        <button
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-md border-[#7298cd] bg-[#7298cd] font-sans font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-110",
          )}
        >
          <a href="/">{successPageText("homeButton")}</a>
        </button>
      </motion.div>
    </>
  );
};

export default SuccessPage;
