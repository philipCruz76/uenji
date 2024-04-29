"use client";
import { Input } from "@/components/ui/Input";
import DataTable from "@/components/users/seller_profile/DataTable";
import { getSignedURL } from "@/lib/actions/getSignedURL";
import { useSellerOnboardingStore } from "@/lib/stores/sellerOboarding-store";
import { useSellerProfileStore } from "@/lib/stores/sellerProfile-store";
import { cn, computeSHA256 } from "@/lib/utils";
import {
  PersonalInfoValidator,
  SellerInfo,
  SellerPersonalInfo,
} from "@/types/sellerProfile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Control,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";

const LanguagesPT = ["Português", "Inglês", "Francês"] as const;
const LanguagesEN = ["Portuguese", "English", "French"] as const;
const LanguageLevelsPT = [
  "Nativo/Bilingue",
  "Avançado",
  "Intermédio",
  "Básico",
] as const;
const LanguageLevelsEN = [
  "Native/Bi-lingual",
  "Advanced",
  "Intermediate",
  "Basic",
] as const;

const page = ({}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [profilePictureSrc, setProfilePictureSrc] = useState<string>("");
  const [charNumber, setCharNumber] = useState<number>(0);
  const [languages, setLanguages] = useState<Map<string, string>>(new Map());
  const [showLanguageSelector, setShowLanguageSelector] =
    useState<boolean>(true);
  const [currentSelectedLanguage, setCurrentSelectedLanguage] = useState({
    fieldName: "Português",
    fieldLevel: "Nativo/Bilingue",
  });
  const { sellerOnboardingStep, setSellerOnboardingStep } =
    useSellerOnboardingStore();
  const personalInfoText = useTranslations("FreelancerOnboarding.personalInfo");
  const locale = useLocale();
  useEffect(() => {
    sellerOnboardingStep !== 1 && setSellerOnboardingStep(1);
  }, [sellerOnboardingStep]);

  const router = useRouter();
  const Languages = locale === "pt" ? LanguagesPT : LanguagesEN;
  const LanguageLevels = locale === "pt" ? LanguageLevelsPT : LanguageLevelsEN;
  const { setSellerPersonalInfo, getSellerPersonalInfo } =
    useSellerProfileStore();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<SellerPersonalInfo>({
    mode: "onChange",
    resolver: zodResolver(PersonalInfoValidator),
  });

  const personalInfoHandler: SubmitHandler<SellerPersonalInfo> = (data) => {
    setSellerPersonalInfo(data);
    console.log(getSellerPersonalInfo());
    router.push("/freelancer_onboarding/professional_info");
  };

  const handleProfilePicture = async (file: File) => {
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
        setProfilePictureSrc(objectLocation);
        setValue("profilePicture", objectLocation);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };
  return (
    <>
      <div className="flex h-fit w-full flex-col gap-4 border-b py-4">
        <h1 className="text-4xl font-bold"> {personalInfoText("heading")}</h1>
        <h3 className="hidden max-w-[500px] flex-wrap tablet:flex">
          {personalInfoText("subheading")}
        </h3>
        <h3 className="text-end text-gray-400">
          {" "}
          <i>{personalInfoText("mandatoryFields")}</i>
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(personalInfoHandler)}
        className="box-content flex h-full w-full flex-col gap-[60px] py-6"
      >
        {/* Full Name */}
        <div className="group flex min-h-[60px] w-full flex-col justify-start tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block h-fit w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>
                {personalInfoText("fullName.heading")}
                <span className="text-red-500">*</span>
              </span>
              <small className="text-gray-400">
                <i>{personalInfoText("private")}</i>
              </small>
            </h3>
            <div className="flex py-2 text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              {personalInfoText("fullName.subheading")}
            </div>
          </aside>
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col gap-4 tablet:flex-row">
              <Input
                type="text"
                id="firstName"
                onChange={(e) => {
                  const regex = /^[a-zA-Z]+$/;
                  if (regex.test(e.target.value)) {
                    setFirstName(e.target.value);
                  } else {
                    setError("fullName", {
                      message: "Please enter a valid name.",
                    });
                  }
                }}
                className="h-[40px] w-full rounded-sm border border-gray-300"
              />

              <Input
                type="text"
                id="lastName"
                {...register("fullName", {
                  setValueAs(value) {
                    return firstName + " " + value;
                  },
                  validate: (value) => {
                    const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
                    if (!regex.test(value)) {
                      return "Please enter a valid name.";
                    }
                    if (value.split(" ").length < 2) {
                      return "Please enter your full name.";
                    }
                    return true;
                  },
                  required: true,
                })}
                className="h-[40px] w-full rounded-sm border border-gray-300"
              />
            </div>
            {errors.fullName ? (
              <span className="text-red-500">{errors.fullName.message}</span>
            ) : null}
          </div>
        </div>

        {/* Display Name */}
        <div className="group flex min-h-[60px] w-full flex-col tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>
                {personalInfoText("displayName.heading")}
                <span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex py-2 text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              <span className="flex flex-wrap">
                {personalInfoText("displayName.subheading")}
              </span>
            </div>
          </aside>
          <div className="flex w-full flex-col gap-4">
            <Input
              type="text"
              {...register("displayName", {
                required: true,
                validate: (value) => {
                  const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
                  if (value.length < 3) {
                    return "O nome de apresentação deve ter pelo menos 3 caracteres.";
                  }
                  if (!regex.test(value)) {
                    return "Introduza um nome de apresentação válido.";
                  }

                  return true;
                },
              })}
              name="displayName"
              id="displayName"
              className="h-[40px] w-full rounded-sm border border-gray-300 tablet:w-[300px]"
            />
            {errors.displayName ? (
              <span className="text-red-500">{errors.displayName.message}</span>
            ) : null}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="group flex w-full flex-col tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>
                {personalInfoText("profilePhoto.heading")}
                <span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              {personalInfoText("profilePhoto.subheading")}
            </div>
          </aside>
          <div className="flex w-full items-start justify-start ">
            <button
              type="button"
              className=" group/uploadButton h-[150px] w-[150px] overflow-hidden rounded-full border border-gray-300 text-white hover:bg-gray-700 hover:bg-opacity-50"
              onClick={() => {
                document.getElementById("profilePicture")?.click();
              }}
            >
              <Input
                id="profilePicture"
                type="file"
                accept="image/png, image/jpeg"
                max={1}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  const target = e.target as HTMLInputElement & {
                    files: FileList;
                  };

                  handleProfilePicture(target.files[0]);
                }}
                style={{ display: "none" }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="#000000"
                viewBox="0 0 256 256"
                className={cn(
                  `hidden `,
                  profilePictureSrc === ""
                    ? "group-hover/uploadButton:flex"
                    : null,
                  ` z-1 relative w-full items-center justify-center object-cover`,
                )}
              >
                <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
              </svg>

              {profilePictureSrc !== "" ? (
                <Image
                  alt="profile_picture"
                  src={profilePictureSrc}
                  width={200}
                  height={200}
                  className=" h-full w-full object-cover"
                />
              ) : null}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="group flex w-full flex-col tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>
                {personalInfoText("description.heading")}
                <span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              {personalInfoText("description.subheading")}
            </div>
          </aside>
          <div className="flex w-full flex-col items-start justify-start ">
            <textarea
              className="h-[150px] w-full rounded-sm border border-gray-300"
              {...register("description", {
                onChange: (e: React.FormEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setCharNumber(e.currentTarget.value.length);
                },
                validate: (value) => {
                  if (value.length < 50) {
                    return "Descrição deve ter pelo menos 50 caracteres.";
                  }
                  return true;
                },
                required: true,
              })}
              name="description"
              id="description"
              maxLength={600}
            />
            <small className="text-end text-gray-400">{charNumber}/600</small>

            {errors.description ? (
              <span className="text-red-500">{errors.description.message}</span>
            ) : null}
          </div>
        </div>

        {/* Languages */}
        <div className="group flex max-w-full flex-col tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block w-full min-w-[210px]  flex-col flex-wrap py-4 ">
            <h3 className="py-2">
              <span>
                {personalInfoText("languages.heading")}
                <span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              {personalInfoText("languages.subheading")}
            </div>
          </aside>
          <div className=" w-full max-w-[855px] flex-col items-start justify-start">
            {showLanguageSelector && (
              <div className="flex flex-col border p-[12px] tablet:flex-row tablet:p-2">
                <select
                  className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[300px]"
                  name="language"
                  id="language"
                  value={currentSelectedLanguage.fieldName}
                  onChange={(e) => {
                    e.preventDefault();
                    setCurrentSelectedLanguage({
                      ...currentSelectedLanguage,
                      fieldName: e.currentTarget.value,
                    });
                  }}
                >
                  {Languages.map((language) => {
                    return (
                      <option value={language} key={language}>
                        {language}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="h-[40px] w-full rounded-sm border border-gray-300 bg-white  px-2 text-gray-600 tablet:w-[300px]"
                  name="proficiency"
                  id="proficiency"
                  value={currentSelectedLanguage.fieldLevel}
                  onChange={(e) => {
                    e.preventDefault();
                    setCurrentSelectedLanguage({
                      ...currentSelectedLanguage,
                      fieldLevel: e.target.value,
                    });
                  }}
                >
                  {LanguageLevels.map((level) => (
                    <option value={level} key={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <div className="flex flex-row justify-between gap-1 px-2 ">
                  <button
                    type="button"
                    className="h-[40px]  w-[150px] rounded-sm bg-sky-600 font-semibold text-white hover:opacity-50"
                    onClick={() => {
                      setLanguages(
                        languages.set(
                          currentSelectedLanguage.fieldName,
                          currentSelectedLanguage.fieldLevel,
                        ),
                      );
                      setShowLanguageSelector(false);
                    }}
                  >
                    {locale === "pt" ? "Atualizar" : "Update"}
                  </button>
                  <button
                    type="button"
                    className="h-[40px] w-[150px] rounded-sm bg-gray-200 font-semibold text-gray-400 hover:opacity-50"
                    onClick={() => {
                      setCurrentSelectedLanguage({
                        fieldName: "",
                        fieldLevel: "Nativo/Bilingue",
                      });
                      setShowLanguageSelector(false);
                    }}
                  >
                    {locale === "pt" ? "Cancelar" : "Cancel"}
                  </button>
                </div>
              </div>
            )}

            {errors.languages ? (
              <span className="text-xs text-red-500">
                {errors.languages.message}
              </span>
            ) : null}

            <DataTable
              initialInput={languages}
              setTableData={setLanguages}
              showRowEditor={setShowLanguageSelector}
              selectedField={setCurrentSelectedLanguage}
              fieldRegister={register as UseFormRegister<SellerInfo>}
              formControl={control as Control<SellerInfo>}
              fieldName="languages"
            />
            <button
              type="button"
              className="flex min-w-[200px] text-sky-500 hover:opacity-50"
              onClick={() => {
                setShowLanguageSelector(true);
              }}
            >
              {locale === "pt" ? "Adicionar nova" : "Add new"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || languages.size === 0}
          className={cn(
            `h-[40px] w-[200px] ${
              isValid && languages.size > 0 ? " bg-sky-600" : "bg-gray-400"
            } rounded-sm text-white`,
          )}
          onClick={handleSubmit(personalInfoHandler)}
        >
          {locale === "pt" ? "Continuar" : "Continue"}
        </button>
      </form>
    </>
  );
};

export default page;
