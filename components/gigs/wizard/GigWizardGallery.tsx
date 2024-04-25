"use client";
import { Input } from "@/components/ui/Input";
import { cn, computeSHA256 } from "@/lib/utils";
import { GigGallery, GigGalleryValidator } from "@/types/gigWizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EmptyGigUploadCard from "./EmptyGigUploadCard";
import { getSignedURL } from "@/lib/actions/getSignedURL";
import GigDocumentCard from "./GigDocumentCard";
import {
  useGigWizardStepStore,
  useGigWizardStore,
} from "@/lib/stores/gigWizard-store";
import Link from "next/link";
import { useTranslations } from "next-intl";

type GigWizardGalleryProps = {
  username: string;
  gigName: string;
};

const GigWizardGallery = ({ username, gigName }: GigWizardGalleryProps) => {
  const router = useRouter();
  const { getGigGallery, setGigGallery } = useGigWizardStore();
  const gigGallery = getGigGallery();
  const [gigDocumentName, setGigDocumentName] = useState<string[]>([]);
  const { setGigWizardStepCurrent, setGigWizardStepCompleted } =
    useGigWizardStepStore();
  const gigGalleryText = useTranslations("GigWizard.Gallery");
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<GigGallery>({
    mode: "onChange",
    resolver: zodResolver(GigGalleryValidator),
  });

  useEffect(() => {
    setGigWizardStepCurrent(3);
    if (getGigGallery().gigImages[0] !== "")
      register(`gigImages`, { value: getGigGallery().gigImages });
    if (
      getGigGallery().gigDocuments.length > 0 &&
      getGigGallery().gigDocuments[0] !== ""
    ) {
      for (let i = 0; i < getGigGallery().gigDocuments.length; i++) {
        const jsonObject = JSON.parse(getGigGallery().gigDocuments[i]);
        setGigDocumentName([...gigDocumentName, jsonObject.documentName]);
      }
      register(`gigDocuments`, { value: getGigGallery().gigDocuments });
    }
    trigger();
  }, [gigName]);

  const handlePhotoUpload = async (file: File, photoIndex: number) => {
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
        const updatedPhotos = [...gigGallery.gigImages];
        updatedPhotos[photoIndex] = objectLocation;
        setGigGallery({ ...gigGallery, gigImages: updatedPhotos });
        setValue("gigImages", [...gigGallery.gigImages, url], {
          shouldValidate: true,
        });
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };

  const handleDocumentUpload = async (file: File, documentIndex: number) => {
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
        const updatedDocuments = [...gigGallery.gigDocuments];
        const updatedDocumentNames = [...gigDocumentName];
        updatedDocumentNames[documentIndex - 1] = file.name;
        updatedDocuments[documentIndex - 1] =
          `{"documentName":"${file.name}","documentURL":"${objectLocation}"}`;
        setGigGallery({ ...gigGallery, gigDocuments: updatedDocuments });
        setGigDocumentName(updatedDocumentNames);
        setValue("gigDocuments", [...gigGallery.gigDocuments, objectLocation], {
          shouldValidate: true,
        });
        toast.success("Document uploaded successfully");
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };
  const gigGalleryHandler: SubmitHandler<GigGallery> = (data) => {
    fetch(`/api/gig/update?gigName=${gigName}&updateType=gallery`, {
      method: "POST",
      body: JSON.stringify(getGigGallery()),
    })
      .then((res) => {
        if (res.ok) {
          setGigWizardStepCompleted(3);
          router.push(`/${username}/manage_gigs/${gigName}/edit?step=5`);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <form className="mx-[10%] flex min-h-[100dvh] max-w-[100dvw] flex-col items-center justify-center gap-4 px-6 py-[40px] pt-[50px]">
      <div className="w-full gap-4">
        <h1 className="w-full border-b-2 text-3xl font-semibold">
          {gigGalleryText("title")}
        </h1>
        <h3 className="py-[20px]">{gigGalleryText("subtitle")}</h3>
        <div className=" flex h-[70px] w-full flex-row items-center justify-center gap-2 border bg-gray-100 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#f74225"
            viewBox="0 0 256 256"
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
          </svg>
          <span className="text-ellipsis px-2 text-red-600">
            {gigGalleryText("disclaimer")}
          </span>
        </div>
      </div>

      {/* Image Upload */}
      <div className="w-full gap-4 border-b-2  pb-4 pt-[50px]">
        <h3 className="text-xl font-semibold">
          {gigGalleryText("images.title")}
        </h3>
        <span className="text-sm text-slate-500">
          {gigGalleryText("images.subtitle")}
        </span>
        <div className="flex flex-row gap-8">
          <button
            type="button"
            className=" h-[160px] w-[240px] rounded-md border-2 border-gray-300 p-4 hover:border-none hover:outline-dashed hover:outline-2 hover:outline-blue-400"
            onClick={() => {
              document.getElementById("gigImage1")?.click();
            }}
          >
            <Input
              type="file"
              id="gigImage1"
              accept="image/jpg, image/jpeg, image/png, image/webp"
              max={1}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                const target = e.target as HTMLInputElement & {
                  files: FileList;
                };
                toast.promise(handlePhotoUpload(target.files[0], 0), {
                  loading: "Uploading photo...",
                  success: "Photo uploaded successfully",
                  error: "Error uploading photo",
                })
              }}
              style={{ display: "none" }}
            />
            {getGigGallery().gigImages.length > 0 &&
            getGigGallery().gigImages[0] ? (
              <Image
                alt="gigPhoto1"
                src={getGigGallery().gigImages[0]}
                width={200}
                height={200}
                className=" h-full w-full object-cover"
              />
            ) : (
              <EmptyGigUploadCard type="photo" />
            )}
          </button>
          <button
            type="button"
            className=" h-[160px] w-[240px] rounded-md border-2 border-gray-300 p-4 text-white hover:border-none hover:outline-dashed hover:outline-2 hover:outline-blue-400"
            onClick={() => {
              document.getElementById("gigImage2")?.click();
            }}
          >
            <Input
              type="file"
              id="gigImage2"
              accept="image/jpg, image/jpeg, image/png, image/webp"
              max={1}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                const target = e.target as HTMLInputElement & {
                  files: FileList;
                };

                handlePhotoUpload(target.files[0], 1);
              }}
              style={{ display: "none" }}
            />
            {getGigGallery().gigImages.length > 0 &&
            getGigGallery().gigImages[1] ? (
              <Image
                alt="gigPhoto2"
                src={getGigGallery().gigImages[1]}
                width={200}
                height={200}
                className=" h-full w-full object-cover"
              />
            ) : (
              <EmptyGigUploadCard type="photo" />
            )}
          </button>
          <button
            type="button"
            className=" h-[160px] w-[240px] rounded-md border-2 border-gray-300 p-4 text-black hover:border-none hover:outline-dashed hover:outline-2 hover:outline-blue-400"
            onClick={() => {
              document.getElementById("gigImage3")?.click();
            }}
          >
            <Input
              type="file"
              id="gigImage3"
              accept="image/jpg, image/jpeg, image/png, image/webp"
              max={1}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                const target = e.target as HTMLInputElement & {
                  files: FileList;
                };
                handlePhotoUpload(target.files[0], 2);
              }}
              style={{ display: "none" }}
            />

            {getGigGallery().gigImages.length > 0 &&
            getGigGallery().gigImages[2] ? (
              <Image
                alt="gigPhoto3"
                src={getGigGallery().gigImages[2]}
                width={200}
                height={200}
                className=" h-full w-full object-cover"
              />
            ) : (
              <EmptyGigUploadCard type="photo" />
            )}
          </button>
        </div>
        {errors.gigImages && (
          <>
            <span className="text-red-500">{errors.gigImages.message}</span>
          </>
        )}
      </div>

      {/* Document Upload */}
      <div className="w-full gap-4 border-b-2  pb-4 pt-[20px]">
        <h3 className="text-xl font-semibold">
          {gigGalleryText("documents.title")}
        </h3>
        <span className="text-sm text-slate-500 ">
          {gigGalleryText("documents.subtitle")}
        </span>
        <div className="flex flex-row gap-8">
          <button
            type="button"
            className=" h-[160px] w-[240px] rounded-md border-2 border-gray-300 p-4 text-black hover:border-none hover:outline-dashed hover:outline-2 hover:outline-blue-400"
            onClick={() => {
              document.getElementById("gigDocument1")?.click();
            }}
          >
            <Input
              type="file"
              id="gigDocument1"
              accept="application/pdf"
              max={1}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                const target = e.target as HTMLInputElement & {
                  files: FileList;
                };
                handleDocumentUpload(target.files[0], 1);
              }}
              style={{ display: "none" }}
            />

            {getGigGallery().gigDocuments &&
            getGigGallery().gigDocuments.length > 0 &&
            getGigGallery().gigDocuments[0] ? (
              <GigDocumentCard documentName={gigDocumentName[0]} />
            ) : (
              <EmptyGigUploadCard type="document" />
            )}
          </button>
          <button
            type="button"
            className=" h-[160px] w-[240px] rounded-md border-2 border-gray-300 p-4 text-black hover:border-none hover:outline-dashed hover:outline-2 hover:outline-blue-400"
            onClick={() => {
              document.getElementById("gigDocument2")?.click();
            }}
          >
            <Input
              type="file"
              id="gigDocument2"
              accept="application/pdf"
              max={1}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                const target = e.target as HTMLInputElement & {
                  files: FileList;
                };

                handleDocumentUpload(target.files[0], 2);
              }}
              style={{ display: "none" }}
            />

            {getGigGallery().gigDocuments &&
            getGigGallery().gigDocuments.length > 0 &&
            getGigGallery().gigDocuments[1] ? (
              <GigDocumentCard documentName={gigDocumentName[1]} />
            ) : (
              <EmptyGigUploadCard type="document" />
            )}
          </button>
        </div>
        {errors.gigDocuments && (
          <>
            <span className="text-red-500">{errors.gigDocuments.message}</span>
          </>
        )}
      </div>
      <div
        className={cn(
          !gigName ? "flex w-full justify-end" : "flex w-full justify-between",
        )}
      >
        <div className="flex items-end justify-end ">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={isValid === false}
              onClick={handleSubmit(gigGalleryHandler)}
              className={cn(
                `w-[180px] justify-center ${
                  isValid
                    ? "bg-sky-500 text-white hover:bg-sky-400"
                    : "bg-gray-400 text-white"
                } rounded-md px-4 py-2 `,
              )}
            >
              {gigGalleryText("nextButton")}
            </button>
            <Link
              href={`/${username}/manage_gigs/${gigName}/edit?step=3`}
              className="text-center text-sm text-sky-500 hover:underline"
            >
              {gigGalleryText("backButton")}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GigWizardGallery;
