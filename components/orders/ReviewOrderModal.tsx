"use client";
import { cn, computeSHA256 } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useBoardSectionStore } from "@/lib/stores/orders/orderBoardStore";
import { orderEvent } from "@/types/common.types";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderDeliveryValidator } from "@/lib/validators/orders";
import { z } from "zod";
import Image from "next/image";
import { Input } from "../ui/Input";
import { getSignedURL } from "@/lib/actions/getSignedURL";
import updateOrderEvents from "@/lib/actions/orders/updateOrderEvents";
import { useRouter } from "next/navigation";

type ReviewOrderModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  prevContainer: string | null;
  prevPosition: number;
};

type OrderDelivery = z.infer<typeof OrderDeliveryValidator>;

const ReviewOrderModal = ({
  openModal,
  setOpenModal,
  prevContainer,
  prevPosition,
}: ReviewOrderModalProps) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [deliveryFiles, setDeliveryFiles] = useState<string[]>([]);
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const { boardSections, updateSection, getBoardSection, getCurrentOrderId } =
    useBoardSectionStore();

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<OrderDelivery>({
    mode: "onChange",
    resolver: zodResolver(OrderDeliveryValidator),
  });

  useEffect(() => {
    if (deliveryFiles.length === 0) {
      unregister("deliveryFiles");
      trigger("deliveryFiles");
    }
  }, [deliveryFiles]);
  const handleCancel = () => {
    if (prevContainer === "review") {
      setOpenModal(false);
      return;
    }
    const newArray = [
      ...getBoardSection(prevContainer!).slice(0, prevPosition),
      boardSections.review.find((order) => order.id === getCurrentOrderId())!,
      ...getBoardSection(prevContainer!).slice(prevPosition),
    ];
    updateSection(
      "review",
      getBoardSection("review").filter(
        (order) => order.id !== getCurrentOrderId(),
      ),
    );

    updateSection(prevContainer!, newArray);

    setOpenModal(false);
  };

  const handleDocumentUpload = async (file: File) => {
    const checksum = await computeSHA256(file);
    const signedURL = await getSignedURL(file.type, file.size, checksum);

    if (signedURL.error !== undefined) {
      toast.error(signedURL.error);
      throw new Error(signedURL.error);
    }
    const url = signedURL.success.url;
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    })
      .then((res) => {
        const resultURL = new URL(res.url);
        const objectLocation = resultURL.origin + resultURL.pathname;
        setDeliveryFiles([...deliveryFiles, objectLocation + ";" + file.name]);
        setFileNames([...fileNames, file.name]);
        deliveryFiles.length

        setValue("deliveryFiles", [...deliveryFiles, objectLocation], {
          shouldValidate: true,
        });
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };

  const removeDocument = async (index: number) => {
    setDeliveryFiles(deliveryFiles.filter((_, i) => i !== index));
    setFileNames(fileNames.filter((_, i) => i !== index));
    setValue("deliveryFiles", deliveryFiles, {
      shouldValidate: true,
    });
  };

  const orderDeliveryHandler: SubmitHandler<OrderDelivery> = async (data) => {
    const order = getBoardSection("review").find(
      (order) => order.id === getCurrentOrderId(),
    );
    if (!order) return;

    const eventObject = {
      eventCaption: "Has delivered the order!",
      sellerMessage: data.deliveryMessage,
      files: deliveryFiles,
    };
    const newOrderEvent: orderEvent[0] = {
      type: "order.delivered",
      createdAt: new Date(Date.now()),
      user: currentUser?.username!,
      event: JSON.stringify(eventObject),
    };
    await updateOrderEvents(order.id, newOrderEvent, true, "review")
      .then((res) => {
        if (res.success) {
          toast.success("Order delivered to buyer for review!");
          setOpenModal(false);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error delivering order");
      });
    router.refresh();
    setOpenModal(false);
  };
  return (
    <Dialog open={openModal}>
      <DialogContent className="rounded-md">
        <DialogTitle className="flex flex-row items-center justify-center gap-2 text-start font-sans text-2xl font-bold">
          <svg
            className="h-[80px] w-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            id="warning"
          >
            <g>
              <path
                fill="#f1b01b"
                d="M21.2,19.5c-0.5,0.9-1.5,1.5-2.6,1.5H5.4c-0.7,0-1.3-0.2-1.8-0.6c-0.3-0.2-0.6-0.5-0.8-0.9
		c-0.5-0.9-0.6-2,0-3L9.4,4.7c0.5-1,1.5-1.5,2.6-1.5s2.1,0.6,2.6,1.5l1.7,3l4.9,8.8C21.8,17.5,21.7,18.6,21.2,19.5z"
              ></path>
              <path
                fill="#fff"
                d="M12,14c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C13,13.6,12.6,14,12,14z"
              ></path>
              <circle cx="12" cy="16" r="1" fill="#fff"></circle>
              <path
                d="M21.2,19.5c-0.5,0.9-1.5,1.5-2.6,1.5H5.4c-0.7,0-1.3-0.2-1.8-0.6L11,13l5.3-5.3l4.9,8.8
		C21.8,17.5,21.7,18.6,21.2,19.5z"
                opacity=".1"
              ></path>
            </g>
          </svg>
          <h3> Are you ready to deliver this order?</h3>
        </DialogTitle>
        <DialogHeader>
          <DialogDescription className="font-sans text-base">
            Please write a message to the buyer and attach the items you are
            delivering. Maximum of 3 files may be uploaded per delivery.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex w-full flex-col items-center gap-2 space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex w-full flex-row gap-2">
            <div className="flex w-full flex-col gap-2">
              <textarea
                id="deliveryMessage"
                {...(register("deliveryMessage"),
                {
                  value: deliveryMessage,
                  onChange: (e) =>
                    setDeliveryMessage(e.currentTarget.value),
                })}
                maxLength={300}
                placeholder="Write a message to the buyer"
                className="focus:ring-primary-500 w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2"
              />
              <span className="w-full absolute top-[250px] left-[-110px] text-end text-sm text-gray-400 ">
                {deliveryMessage.length}
                / 300 characters
              </span>
            </div>

            <button
              type="button"
              disabled={deliveryFiles.length > 2}
              onClick={() => {
                document.getElementById("deliveryFiles")?.click();
              }}
              className={cn(
                "group flex w-[80px] items-center justify-center rounded-md border hover:shadow-md",
                deliveryFiles.length > 2 && "cursor-not-allowed opacity-50",
              )}
            >
              <Input
                type="file"
                id="deliveryFiles"
                max={1}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  const target = e.target as HTMLInputElement & {
                    files: FileList;
                  };
                  toast.promise(handleDocumentUpload(target.files[0]), {
                    loading: "Uploading file...",
                    success: "File uploaded successfully!",
                    error: "Error uploading file",
                  });
                }}
                style={{ display: "none" }}
              />
              <Image
                alt="upload button"
                src="/icons/upload.svg"
                width={30}
                height={30}
                className="duration-350 transition ease-in-out group-hover:scale-125"
              />
            </button>
          </div>
          <div className="grid h-[35px] w-full grid-cols-3 grid-rows-1 items-center justify-start gap-2">
            {fileNames.length > 0 &&
              fileNames.map((fileName, index) => (
                <div className="flex flex-row items-center gap-2 rounded-md border p-2">
                  <a
                    key={index}
                    href={deliveryFiles[index].split(";")[0]}
                    className="flex h-full items-center text-center text-indigo-400 underline"
                  >
                    <span className="text-center">{fileName}</span>
                  </a>
                  <X
                    onClick={async () => {
                      await removeDocument(index);
                    }}
                    className="h-4 w-4 hover:scale-110"
                  />
                </div>
              ))}
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
            <X
              onClick={() => {
                handleCancel();
              }}
              className="h-4 w-4 hover:scale-110"
            />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogFooter className="sm:justify-start w-full gap-2">
            <DialogClose asChild>
              <Button
                onClick={handleCancel}
                type="button"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  " hover:bg-slate-200 hover:shadow-md",
                )}
              >
                Close
              </Button>
            </DialogClose>
            <button
              type="button"
              disabled={isValid === false}
              onClick={handleSubmit(orderDeliveryHandler)}
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-sky-500 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-sky-600 hover:shadow-md",
                isValid === false && "cursor-not-allowed opacity-50",
              )}
            >
              Deliver Order
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewOrderModal;
