"use client";
import { cn } from "@/lib/utils";
import { GigPricing } from "@/types/gigWizard.types";
import {  useState } from "react";
import GigPackageCheckoutButton from "./GigPackageCheckoutButton";
import getGigByTitle from "@/lib/actions/gigs/getGigByTitle";

type GigPricingMobileProps = {
  gig: Awaited<ReturnType<typeof getGigByTitle>>;
};
type PackageType = "basic" | "standard" | "premium";

const GigPricingMobile = ({ gig }: GigPricingMobileProps) => {
  if(!gig) return null;
  const parsedPackages = JSON.parse(gig.packages!) as GigPricing["packages"];
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("basic");

  const singlePackage = Object.keys(parsedPackages).length < 2;
  return (
    <div className="h-full w-full">
      {singlePackage ? (
        <div className="grid h-[50px] w-full grid-cols-1  grid-rows-1 border-b bg-slate-50 text-lg font-medium">
          <label
            onClick={() => {
              setSelectedPackage("basic");
            }}
            className={cn(
              selectedPackage === "basic"
                ? "border-spacing-2 border-b-2 borde-br-[#495057]  bg-white text-[#495057] shadow-md"
                : null,
              "flex flex-row items-center justify-center gap-2",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill={cn(selectedPackage === "basic" ? "#495057" : "#000000")}
              viewBox="0 0 256 256"
            >
              <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
            </svg>
            {parsedPackages[0].price}.00 AKZ
          </label>
        </div>
        
      ) : (
        <div className="grid h-[50px] w-full grid-cols-3  grid-rows-1 border-b bg-slate-50 text-lg font-medium">
          <label
            onClick={() => {
              setSelectedPackage("premium");
            }}
            className={cn(
              selectedPackage === "premium"
                ? "border-spacing-2 border-b-2 border-b-[#495057] bg-white text-[#495057] shadow-md"
                : null,
              "flex flex-row items-center justify-center gap-2",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill={cn(selectedPackage === "premium" ? "#495057" : "#000000")}
              viewBox="0 0 256 256"
            >
              <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
            </svg>
            {parsedPackages[2].price}.00 AKZ
          </label>
          <label
            onClick={() => {
              setSelectedPackage("standard");
            }}
            className={cn(
              selectedPackage === "standard"
                ? "border-spacing-2 border-b-2 border-b-[#495057] bg-white text-[#495057] shadow-md"
                : null,
              "flex flex-row items-center justify-center gap-2",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill={cn(selectedPackage === "standard" ? "#495057" : "#000000")}
              viewBox="0 0 256 256"
            >
              <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
            </svg>
            {parsedPackages[1].price}.00 AKZ
          </label>
          <label
            onClick={() => {
              setSelectedPackage("basic");
            }}
            className={cn(
              selectedPackage === "basic"
                ? "border-spacing-2 border-b-2 border-b-[#495057] bg-white text-[#495057] shadow-md"
                : null,
              "flex flex-row items-center justify-center gap-2",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill={cn(selectedPackage === "basic" ? "#495057" : "#000000")}
              viewBox="0 0 256 256"
            >
              <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
            </svg>
            {parsedPackages[0].price}.00 AKZ
          </label>
        </div>
      )}

      <div className="h-full w-full">
        {selectedPackage === "basic" && (
          <div className="grid grid-cols-1 grid-rows-4 gap-8 p-4 pt-[24px] text-start">
            <h3 className=" text-xl font-semibold">
              {parsedPackages[0].title.charAt(0).toLocaleUpperCase() +
                parsedPackages[0].title.slice(1)}
            </h3>
            <span className="font-normal text-gray-500 ">
              {parsedPackages[0].description}
            </span>
            <span className="flex flex-row items-center justify-start gap-2 text-sm font-bold text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"></path>
              </svg>
              <span className="pr-[12px]">
                {parsedPackages[0].deliveryTime} Dia para entrega
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M88,104H40a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V71.85C63.47,54.4,90.61,32,128,32c42.82,0,68.58,25.27,69.66,26.34a8,8,0,0,1-11.3,11.34C186.09,69.41,163.92,48,128,48,93,48,67.77,72.65,55.44,88H88a8,8,0,0,1,0,16Zm128,48H168a8,8,0,0,0,0,16h32.56C188.23,183.35,163,208,128,208c-35.92,0-58.09-21.41-58.36-21.68a8,8,0,0,0-11.3,11.34C59.42,198.73,85.18,224,128,224c37.39,0,64.53-22.4,80-39.85V208a8,8,0,0,0,16,0V160A8,8,0,0,0,216,152Z"></path>
              </svg>
              <span>
                {!parsedPackages[0].revisions
                  ? "0"
                  : parsedPackages[0].revisions}{" "}
                revisões
              </span>
            </span>
          </div>
        )}
        {selectedPackage === "standard" && (
          <div className="grid grid-cols-1 grid-rows-4 gap-8 p-4 pt-[24px] text-start">
            <h3 className=" text-xl font-semibold">
              {parsedPackages[1].title.charAt(0).toLocaleUpperCase() +
                parsedPackages[1].title.slice(1)}
            </h3>
            <span className="font-normal text-gray-500 ">
              {parsedPackages[1].description}
            </span>
            <span className="flex flex-row items-center justify-start gap-2 text-sm font-bold text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"></path>
              </svg>
              <span className="pr-[12px]">
                {parsedPackages[1].deliveryTime} Dia para entrega
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M88,104H40a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V71.85C63.47,54.4,90.61,32,128,32c42.82,0,68.58,25.27,69.66,26.34a8,8,0,0,1-11.3,11.34C186.09,69.41,163.92,48,128,48,93,48,67.77,72.65,55.44,88H88a8,8,0,0,1,0,16Zm128,48H168a8,8,0,0,0,0,16h32.56C188.23,183.35,163,208,128,208c-35.92,0-58.09-21.41-58.36-21.68a8,8,0,0,0-11.3,11.34C59.42,198.73,85.18,224,128,224c37.39,0,64.53-22.4,80-39.85V208a8,8,0,0,0,16,0V160A8,8,0,0,0,216,152Z"></path>
              </svg>
              <span>
                {!parsedPackages[1].revisions
                  ? "0"
                  : parsedPackages[1].revisions}{" "}
                revisões
              </span>
            </span>
          </div>
        )}
        {selectedPackage === "premium" && (
          <div className="grid grid-cols-1 grid-rows-4 gap-8 p-4 pt-[24px] text-start">
            <h3 className=" text-xl font-semibold">
              {parsedPackages[2].title.charAt(0).toLocaleUpperCase() +
                parsedPackages[2].title.slice(1)}
            </h3>
            <span className="font-normal text-gray-500 ">
              {parsedPackages[2].description}
            </span>
            <span className="flex flex-row items-center justify-start gap-2 text-sm font-bold text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"></path>
              </svg>
              <span className="pr-[12px]">
                {parsedPackages[2].deliveryTime} Dia para entrega
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M88,104H40a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V71.85C63.47,54.4,90.61,32,128,32c42.82,0,68.58,25.27,69.66,26.34a8,8,0,0,1-11.3,11.34C186.09,69.41,163.92,48,128,48,93,48,67.77,72.65,55.44,88H88a8,8,0,0,1,0,16Zm128,48H168a8,8,0,0,0,0,16h32.56C188.23,183.35,163,208,128,208c-35.92,0-58.09-21.41-58.36-21.68a8,8,0,0,0-11.3,11.34C59.42,198.73,85.18,224,128,224c37.39,0,64.53-22.4,80-39.85V208a8,8,0,0,0,16,0V160A8,8,0,0,0,216,152Z"></path>
              </svg>
              <span>
                {!parsedPackages[2].revisions
                  ? "0"
                  : parsedPackages[2].revisions}{" "}
                revisões
              </span>
            </span>
          </div>
        )}
         <GigPackageCheckoutButton gigUser={gig.user.username!}/>
      </div>
     
    </div>
  );
};

export default GigPricingMobile;
