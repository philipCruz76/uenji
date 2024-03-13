"use client";

import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { useSellerOnboardingStore } from "@/lib/stores/sellerOboarding-store";
import { useSellerProfileStore } from "@/lib/stores/sellerProfile-store";
import { cn } from "@/lib/utils";
import {
  SellerAccountSecurity,
  SellerAccountSecurityValidator,
  SellerProfileValidator,
} from "@/types/sellerProfile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const page = ({}) => {
  const user = useCurrentUser();
  const router = useRouter();
  const { sellerOnboardingStep, setSellerOnboardingStep } =
    useSellerOnboardingStore();
  const { setSellerAccountSecurity, getSellerProfile } =
    useSellerProfileStore();

  const accountSecurityHandler: SubmitHandler<SellerAccountSecurity> = (
    data: SellerAccountSecurity,
  ) => {
    setSellerAccountSecurity(data);
    if (SellerProfileValidator.safeParse(getSellerProfile()).success) {
      console.log(getSellerProfile());
      fetch("/api/activate/seller/", {
        method: "POST",
        body: JSON.stringify(getSellerProfile()),
      })
        .then((res) => {
          if (res.ok) {
            router.push("/");
            router.refresh();
            toast.success("Seller profile created successfully.");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("Please return and fill in previous steps.");
    }
  };

  const {
    formState: { isValid },
    handleSubmit,
    register,
  } = useForm<SellerAccountSecurity>({
    mode: "onChange",
    resolver: zodResolver(SellerAccountSecurityValidator),
  });

  useEffect(() => {
    sellerOnboardingStep !== 3 && setSellerOnboardingStep(3);
  }, [sellerOnboardingStep]);

  return (
    <>
      <div className="flex h-fit w-full flex-col gap-4 border-b py-4">
        <h1 className="text-4xl font-bold">Account Security</h1>
        <h3 className="hidden max-w-[500px] flex-wrap tablet:flex">
          Trust and safety is a big deal in our community. Please verify your
          email and phone number so that we can keep your account secured.
        </h3>
      </div>
      <form
        className="flex h-fit w-full flex-col gap-4 border-b py-4"
        onSubmit={handleSubmit(accountSecurityHandler)}
      >
        <div className="group flex h-fit w-full flex-col justify-start tablet:flex-row tablet:pt-[35px] ">
          <aside className="flex h-fit w-full  min-w-[210px] flex-row flex-wrap items-center justify-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#666666"
              viewBox="0 0 256 256"
            >
              <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
            </svg>
            <h3 className="py-2">
              <span>Email</span>
              <small className="px-3 text-gray-400">
                <i>Private</i>
              </small>
            </h3>
          </aside>

          <div>
            <a
              {...register("emailVerified", {
                required: true,
                value: user?.isActive!,
              })}
              className="flex w-full items-center justify-center rounded-md border border-slate-400 bg-sky-200  px-4 py-2 text-sm font-medium text-gray-500 shadow-sm  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 tablet:w-[150px]"
            >
              Verified
            </a>
          </div>
        </div>

        <div className="group flex h-fit w-full flex-col justify-start tablet:flex-row tablet:pt-[35px] ">
          <aside className="flex h-fit w-full  min-w-[210px] flex-row flex-wrap items-center justify-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#666666"
              viewBox="0 0 256 256"
            >
              <path d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z"></path>
            </svg>
            <h3 className="py-2">
              <span>Phone Number</span>
              <small className="px-3 text-gray-400">
                <i>Private</i>
              </small>
            </h3>
          </aside>
          <div>
            <a
              {...register("phoneVerified", {
                required: true,
                value: false,
              })}
              className="flex w-full items-center justify-center rounded-md border border-slate-400 bg-sky-200  px-4 py-2 text-sm font-medium text-gray-500 shadow-sm  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 tablet:w-[150px]"
            >
              Unverified
            </a>
          </div>
        </div>
        <div className="flex items-center justify-end py-4">
          <button
            disabled={!isValid}
            type="submit"
            className={cn(
              `h-[40px] w-full tablet:w-[100px]  ${
                isValid ? "bg-sky-600" : "bg-gray-400"
              }  rounded-sm text-white`,
            )}
          >
            Concluir
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
