"use client";
import { useGigWizardStore } from "@/lib/stores/gigWizard-store";
import { cn } from "@/lib/utils";
import { GigPricing } from "@/types/gigWizard.types";
import { get } from "lodash";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";

type GigPricingPackagesProps = {
  packages: boolean;
  formControl: Control<GigPricing>;
  setFormValue: UseFormSetValue<GigPricing>;
  packageErrors: FieldErrors<GigPricing>;
};

function handleNumberInput(e: React.FormEvent<HTMLInputElement>) {
  e.preventDefault();
  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
}

const GigPricingPackages = ({
  packages,
  formControl,
  setFormValue,
  packageErrors,
}: GigPricingPackagesProps) => {
  const { getGigPricing, setGigPricing } = useGigWizardStore();
  const pricing = getGigPricing();

  return (
    <table className="flex max-h-[600px] min-h-fit w-full flex-col border bg-zinc-50">
      <thead>
        <tr className="grid h-[65px] grid-cols-4 grid-rows-1 justify-center  ">
          <th className="col-span-1 border-r bg-slate-50" />
          <th className="col-span-1 border-b border-r bg-gray-100 px-[20px] py-[16px] text-start font-medium">
            Básico
          </th>
          {packages ? (
            <>
              <th className="col-span-1 border-b border-r bg-gray-100 px-[20px] py-[16px] text-start font-medium">
                Standard
              </th>
              <th className="col-span-1 border-b bg-gray-100 px-[20px] py-[16px] text-start font-medium">
                Prémium
              </th>
            </>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {/* Title */}
        <tr className="grid min-h-[75px] grid-cols-4">
          <td className="col-span-1 border-b border-r bg-slate-50">
            <span className=" h-full  w-full items-center px-[8px] font-medium">
              Título <br />
              {packageErrors.packages !== undefined ? (
                <span className="text-ellipsis text-sm  text-red-500">
                  {packageErrors.packages?.[0]?.title?.message ||
                    packageErrors.packages?.[1]?.title?.message ||
                    packageErrors.packages?.[2]?.title?.message}
                </span>
              ) : null}
            </span>
          </td>
          <td
            className={cn(
              "col-span-1 border-b border-r bg-white",
              `${packageErrors.packages?.[0]?.title && "border border-red-500"}`,
            )}
          >
            <textarea
              placeholder="Pacote básico"
              maxLength={34}
              className={
                "h-full w-full text-ellipsis p-2 pr-[24px] text-start text-sm outline-none"
              }
              {...formControl.register("packages.0.title", {
                required: true,
                value: pricing.packages[0].title,
                onChange(event: React.FormEvent<HTMLTextAreaElement>) {
                  event.preventDefault();
                  setGigPricing({
                    ...pricing,
                    packages: {
                      ...pricing.packages,
                      0: {
                        ...pricing.packages[0],
                        title: event.currentTarget.value,
                      },
                    },
                  });
                },
              })}
            />
          </td>
          {packages ? (
            <>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[1]?.title && "border border-red-500"}`,
                )}
              >
                <textarea
                  maxLength={34}
                  {...(getGigPricing().packages[1]
                    ? { value: pricing.packages[1].title }
                    : null)}
                  placeholder="Pacote standard"
                  className="h-full w-full text-ellipsis  p-2 pr-[24px] text-start text-sm outline-none"
                  {...formControl.register("packages.1.title", {
                    required: false,
                    onChange(event: React.FormEvent<HTMLTextAreaElement>) {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          1: {
                            ...pricing.packages[1],
                            title: event.currentTarget.value,
                          },
                        },
                      });
                    },
                  })}
                />
              </td>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[2]?.title && "border border-red-500"}`,
                )}
              >
                <textarea
                  maxLength={34}
                  {...(getGigPricing().packages[2]
                    ? { value: pricing.packages[2].title }
                    : null)}
                  placeholder="Pacote prémium"
                  className="h-full w-full text-ellipsis  p-2 pr-[24px] text-start text-sm outline-none"
                  {...formControl.register("packages.2.title", {
                    onChange(event: React.FormEvent<HTMLTextAreaElement>) {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          2: {
                            ...pricing.packages[2],
                            title: event.currentTarget.value,
                          },
                        },
                      });
                    },
                  })}
                />
              </td>
            </>
          ) : null}
        </tr>
        {/* Description */}
        <tr className="grid min-h-[75px] grid-cols-4">
          <td className="col-span-1 border-b border-r bg-slate-50">
            <span className=" h-full  w-full items-center px-[8px]  font-medium">
              Descrição <br />
              {packageErrors.packages !== undefined ? (
                <span className="text-ellipsis text-sm  text-red-500">
                  {packageErrors.packages?.[0]?.description?.message ||
                    packageErrors.packages?.[1]?.description?.message ||
                    packageErrors.packages?.[2]?.description?.message}
                </span>
              ) : null}
            </span>
          </td>
          <td
            className={cn(
              "col-span-1 border-b border-r bg-white",
              `${packageErrors.packages?.[0]?.description && "border border-red-500"}`,
            )}
          >
            <textarea
              className="h-[125px] w-full text-ellipsis  p-2 pr-[24px] text-start text-sm outline-none"
              maxLength={100}
              placeholder="Descreva o seu pacote básico aqui..."
              {...formControl.register("packages.0.description", {
                required: true,
                value: pricing.packages[0].description,
                onChange(event: React.FormEvent<HTMLTextAreaElement>) {
                  event.preventDefault();
                  setGigPricing({
                    ...pricing,
                    packages: {
                      ...pricing.packages,
                      0: {
                        ...pricing.packages[0],
                        description: event.currentTarget.value,
                      },
                    },
                  });
                },
              })}
            />
          </td>
          {packages ? (
            <>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[1]?.description && "border border-red-500"}`,
                )}
              >
                <textarea
                  className="h-[125px] w-full text-ellipsis  p-2 pr-[24px] text-start text-sm outline-none"
                  placeholder="Descreva o seu pacote standard aqui..."
                  rows={3}
                  {...(getGigPricing().packages[1]
                    ? { value: pricing.packages[1].description }
                    : null)}
                  {...formControl.register("packages.1.description", {
                    onChange(event: React.FormEvent<HTMLTextAreaElement>) {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          1: {
                            ...pricing.packages[1],
                            description: event.currentTarget.value,
                          },
                        },
                      });
                    },
                  })}
                />
              </td>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[2]?.description && "border border-red-500"}`,
                )}
              >
                <textarea
                  className="h-[125px] w-full text-ellipsis p-2 pr-[24px] text-start text-sm outline-none"
                  placeholder="Descreva o seu pacote prémium aqui..."
                  rows={3}
                  {...(getGigPricing().packages[2]
                    ? { value: pricing.packages[2].description }
                    : null)}
                  {...formControl.register("packages.2.description", {
                    onChange(event: React.FormEvent<HTMLTextAreaElement>) {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          2: {
                            ...pricing.packages[2],
                            description: event.currentTarget.value,
                          },
                        },
                      });
                    },
                  })}
                />
              </td>
            </>
          ) : null}
        </tr>

        {/* Delivery Time */}
        <tr className="grid min-h-[75px] grid-cols-4">
          <td className="col-span-1 border-b border-r bg-slate-50">
            <span className=" h-full  w-full items-center px-[8px] font-medium">
              Tempo de entrega <br />
              {packageErrors.packages !== undefined ? (
                <span className="text-ellipsis text-sm  text-red-500">
                  {packageErrors.packages?.[0]?.deliveryTime?.message ||
                    packageErrors.packages?.[1]?.deliveryTime?.message ||
                    packageErrors.packages?.[2]?.deliveryTime?.message}
                </span>
              ) : null}
            </span>
          </td>
          <td
            className={cn(
              "col-span-1 border-b border-r bg-white",
              `${packageErrors.packages?.[0]?.deliveryTime && "border border-red-500"}`,
            )}
          >
            <div className="flex h-full w-full flex-row items-center justify-start ">
              <input
                type="text"
                maxLength={2}
                onInput={handleNumberInput}
                value={getGigPricing().packages[0].deliveryTime}
                {...formControl.register(`packages.0.deliveryTime`)}
                className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  event.preventDefault();
                  setGigPricing({
                    ...pricing,
                    packages: {
                      ...pricing.packages,
                      0: {
                        ...pricing.packages[0],
                        deliveryTime: event.currentTarget.value,
                      },
                    },
                  });
                  setFormValue(
                    `packages.0.deliveryTime`,
                    getGigPricing().packages[0].deliveryTime,
                    { shouldValidate: true },
                  );
                }}
              />
              <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                dias
              </span>
            </div>
          </td>
          {packages ? (
            <>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[1]?.deliveryTime && "border border-red-500"}`,
                )}
              >
                <div className="flex h-full w-full flex-row items-center justify-start ">
                  <input
                    type="text"
                    maxLength={2}
                    onInput={handleNumberInput}
                    defaultValue={1}
                    {...formControl.register(`packages.1.deliveryTime`)}
                    className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          1: {
                            ...pricing.packages[1],
                            deliveryTime: event.currentTarget.value,
                          },
                        },
                      });
                      setFormValue(
                        `packages.1.deliveryTime`,
                        getGigPricing().packages[1].deliveryTime,
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                    dias
                  </span>
                </div>
              </td>

              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[2]?.deliveryTime && "border border-red-500"}`,
                )}
              >
                <div className="flex h-full w-full flex-row items-center justify-start ">
                  <input
                    type="text"
                    maxLength={2}
                    onInput={handleNumberInput}
                    defaultValue={1}
                    {...formControl.register(`packages.2.deliveryTime`)}
                    className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          2: {
                            ...pricing.packages[2],
                            deliveryTime: event.currentTarget.value,
                          },
                        },
                      });
                      setFormValue(
                        `packages.2.deliveryTime`,
                        getGigPricing().packages[2].deliveryTime,
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                    dias
                  </span>
                </div>
              </td>
            </>
          ) : null}
        </tr>
        {/* Revision */}
        <tr className="grid min-h-[75px] grid-cols-4">
          <td className="col-span-1 border-b border-r bg-slate-50">
            <span className=" h-full w-full items-center px-[8px]  font-medium">
              {" "}
              Número de revisões <br />
              {packageErrors.packages !== undefined ? (
                <span className="text-ellipsis text-sm  text-red-500">
                  {packageErrors.packages?.[0]?.revisions?.message ||
                    packageErrors.packages?.[1]?.revisions?.message ||
                    packageErrors.packages?.[2]?.revisions?.message}
                </span>
              ) : null}
            </span>
          </td>
          <td
            className={cn(
              "col-span-1 border-b border-r bg-white",
              `${packageErrors.packages?.[0]?.revisions && "border border-red-500"}`,
            )}
          >
            <div className="flex h-full w-full flex-row items-center justify-start ">
              <input
                type="text"
                onInput={handleNumberInput}
                maxLength={2}
                value={getGigPricing().packages[0].revisions}
                {...formControl.register(`packages.0.revisions`)}
                className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  event.preventDefault();
                  setGigPricing({
                    ...pricing,
                    packages: {
                      ...pricing.packages,
                      0: {
                        ...pricing.packages[0],
                        revisions: event.currentTarget.value,
                      },
                    },
                  });
                  setFormValue(
                    `packages.0.revisions`,
                    getGigPricing().packages[0].revisions,
                    { shouldValidate: true },
                  );
                }}
              />
              <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                revisões
              </span>
            </div>
          </td>
          {packages ? (
            <>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[1]?.revisions && "border border-red-500"}`,
                )}
              >
                <div className="flex h-full w-full flex-row items-center justify-start ">
                  <input
                    type="text"
                    onInput={handleNumberInput}
                    maxLength={2}
                    {...formControl.register(`packages.1.revisions`)}
                    className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                    defaultValue={0}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          1: {
                            ...pricing.packages[1],
                            revisions: event.currentTarget.value,
                          },
                        },
                      });
                      setFormValue(
                        `packages.1.revisions`,
                        getGigPricing().packages[1].revisions,
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                    revisões
                  </span>
                </div>
              </td>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[2]?.revisions && "border border-red-500"}`,
                )}
              >
                <div className="flex h-full w-full flex-row items-center justify-start ">
                  <input
                    type="text"
                    onInput={handleNumberInput}
                    maxLength={2}
                    defaultValue={0}
                    {...formControl.register(`packages.2.revisions`)}
                    className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          2: {
                            ...pricing.packages[2],
                            revisions: event.currentTarget.value,
                          },
                        },
                      });
                      setFormValue(
                        `packages.2.revisions`,
                        getGigPricing().packages[2].revisions,
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                    revisões
                  </span>
                </div>
              </td>
            </>
          ) : null}
        </tr>
        {/* Price */}
        <tr className="grid min-h-[75px] grid-cols-4">
          <td className="col-span-1 border-r bg-slate-50">
            <span className=" h-full  w-full items-center px-[8px]  font-medium">
              Preço
              <br />
              {packageErrors.packages !== undefined ? (
                <span className="text-ellipsis text-sm  text-red-500">
                  {packageErrors.packages?.[0]?.price?.message ||
                    packageErrors.packages?.[1]?.price?.message ||
                    packageErrors.packages?.[2]?.price?.message}
                </span>
              ) : null}
            </span>
          </td>
          <td
            className={cn(
              "col-span-1 border-b border-r bg-white",
              `${packageErrors.packages?.[0]?.price && "border border-red-500"}`,
            )}
          >
            <div className="flex h-full w-full flex-row items-center justify-start ">
              <input
                type="text"
                maxLength={6}
                onInput={handleNumberInput}
                value={getGigPricing().packages[0].price}
                className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                {...formControl.register(`packages.0.price`)}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  event.preventDefault();
                  setGigPricing({
                    ...pricing,
                    packages: {
                      ...pricing.packages,
                      0: {
                        ...pricing.packages[0],
                        price: event.currentTarget.value,
                      },
                    },
                  });
                  setFormValue(
                    `packages.0.price`,
                    getGigPricing().packages[0].price,
                    { shouldValidate: true },
                  );
                }}
              />
              <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                AKZ
              </span>
            </div>
          </td>
          {packages ? (
            <>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[1]?.price && "border border-red-500"}`,
                )}
              >
                <div className="flex h-full w-full flex-row items-center justify-start ">
                  <input
                    type="text"
                    maxLength={6}
                    onInput={handleNumberInput}
                    defaultValue={1000}
                    {...formControl.register(`packages.1.price`)}
                    className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          1: {
                            ...pricing.packages[1],
                            price: event.currentTarget.value,
                          },
                        },
                      });
                      setFormValue(
                        `packages.1.price`,
                        getGigPricing().packages[1].price,
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                    AKZ
                  </span>
                </div>
              </td>
              <td
                className={cn(
                  "col-span-1 border-b border-r bg-white",
                  `${packageErrors.packages?.[2]?.price && "border border-red-500"}`,
                )}
              >
                <div className="flex h-full w-full flex-row items-center justify-start ">
                  <input
                    type="text"
                    maxLength={6}
                    onInput={handleNumberInput}
                    defaultValue={1000}
                    {...formControl.register(`packages.2.price`)}
                    className="h-[70px] w-full pl-[12px] text-start font-medium outline-none"
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      event.preventDefault();
                      setGigPricing({
                        ...pricing,
                        packages: {
                          ...pricing.packages,
                          2: {
                            ...pricing.packages[2],
                            price: event.currentTarget.value,
                          },
                        },
                      });
                      setFormValue(
                        `packages.2.price`,
                        getGigPricing().packages[2].price,
                        { shouldValidate: true },
                      );
                    }}
                  />
                  <span className="pr-[32px] text-sm text-gray-500 hover:cursor-default">
                    AKZ
                  </span>
                </div>
              </td>
            </>
          ) : null}
        </tr>
      </tbody>
    </table>
  );
};

export default GigPricingPackages;
