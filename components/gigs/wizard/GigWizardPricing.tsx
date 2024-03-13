"use client";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import {
  useGigWizardStepStore,
  useGigWizardStore,
} from "@/lib/stores/gigWizard-store";
import { GigPricing, GigPricingValidator } from "@/types/gigWizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import GigPricingPackages from "./GigPricingPackages";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

type GigWizardPricingProps = {
  username: string;
  gigName: string;
};

const GigWizardPricing = ({ username, gigName }: GigWizardPricingProps) => {
  const { setGigWizardStepCurrent, setGigWizardStepCompleted } =
    useGigWizardStepStore();
  const { getGigPricing, setGigPricing } = useGigWizardStore();
  const pricing = getGigPricing();
  const [packageView, setPackageView] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: { isValid, errors },
  } = useForm<GigPricing>({
    mode: "onChange",
    resolver: zodResolver(GigPricingValidator),
  });

  useEffect(() => {
    setGigWizardStepCurrent(1);
    trigger();
    if (pricing.packages[1]) {
      setPackageView(true);
    }
  }, []);

  const gigPricingHandler: SubmitHandler<GigPricing> = (data) => {
    fetch(`/api/gig/update?gigName=${gigName}&updateType=pricing`, {
      method: "POST",
      body: JSON.stringify(getGigPricing()),
    })
      .then((res) => {
        if (res.ok) {
          setGigWizardStepCompleted(1);
          router.push(`/${username}/manage_gigs/${gigName}/edit?step=3`);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-[20%]  min-h-[100dvh] max-w-[100dvw]  items-center justify-center  px-6 py-[40px] pt-[50px]"
    >
      <div className="flex min-w-[60dvw] flex-col gap-4">
        <div className="flex w-full flex-row justify-between">
          <h3 className=" text-2xl "> Âmbito e Preço</h3>
          <div className="flex items-center justify-center gap-2">
            <Label htmlFor="offer-packages" className=" text-sm">
              Oferecer Pacotes
            </Label>
            <Switch
              id="offer-packages"
              checked={packageView}
              onCheckedChange={(checked) => {
                setPackageView(checked);
                if (checked === false) {
                  const singlePackage = [pricing.packages[0]];
                  setGigPricing({
                    ...pricing,
                    packages: singlePackage,
                  });
                  setValue(`packages`, singlePackage, { shouldValidate: true });
                }
              }}
            />
          </div>
        </div>

        <GigPricingPackages
          packages={packageView}
          formControl={control}
          setFormValue={setValue}
          packageErrors={errors}
        />
        <div className="flex items-end justify-end ">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={!isValid}
              onClick={handleSubmit(gigPricingHandler)}
              className={cn(
                `w-[180px] justify-center ${
                  isValid ? " bg-sky-500 text-white" : "bg-gray-400 text-white"
                } rounded-md px-4 py-2`,
              )}
            >
              Gravar e continuar
            </button>
            <Link
              href={`/${username}/manage_gigs/${gigName}/edit?step=1`}
              className="text-center text-sm text-sky-500 hover:underline"
            >
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GigWizardPricing;
