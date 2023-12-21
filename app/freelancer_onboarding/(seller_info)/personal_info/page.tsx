"use client";
import { Input } from "@/components/ui/Input";
import DataTable from "@/components/users/seller_profile/DataTable";
import { useSellerOnboardingStore } from "@/lib/stores/selleOboarding-store";
import { useSellerProfileStore } from "@/lib/stores/sellerProfile-store";
import { cn } from "@/lib/utils";
import {
  PersonalInfoValidator,
  SellerInfo,
  SellerPersonalInfo,
} from "@/types/sellerProfile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { revalidatePath, revalidateTag } from "next/cache";
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

const Languages = ["Português", "Inglês", "Francês"] as const;
const LanguageLevels = [
  "Nativo/Bilingue",
  "Avançado",
  "Intermédio",
  "Básico",
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

  useEffect(() => {
    sellerOnboardingStep !== 1 && setSellerOnboardingStep(1);
  }, [sellerOnboardingStep]);

  const router = useRouter();
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

  const handleProfilePicture = (file: File) => {
    fetch("/api/cloudinary/upload", {
      method: "POST",
      body: file,
      next: {
        revalidate: 1,
      },
    })
      .then(async (response) => {
        toast.success("Profile picture updated successfully");
        const { url } = await response.json();
        setProfilePictureSrc(url);
        setValue("profilePicture", url);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-full h-fit py-4 border-b">
        <h1 className="font-bold text-4xl"> Personal Info</h1>
        <h3 className="tablet:flex hidden flex-wrap max-w-[500px]">
          Tell us a bit about yourself. This information will appear on your
          public profile, so that potential buyers can get to know you better.
        </h3>
        <h3 className="text-end text-gray-400">
          {" "}
          <i>* Mandatory fields</i>
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(personalInfoHandler)}
        className="flex flex-col gap-[60px] w-full h-full box-content py-6"
      >
        {/* Full Name */}
        <div className="flex tablet:flex-row flex-col justify-start w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap h-fit  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>
                Full Name <span className="text-red-500">*</span>
              </span>
              <small className="text-gray-400">
                <i>Private</i>
              </small>
            </h3>
            <div className="tablet:hidden tablet:group-hover:flex flex text-xs text-gray-400 py-2">
              Ex. José António
            </div>
          </aside>
          <div className="flex flex-col w-full">
            <div className="flex tablet:flex-row flex-col gap-4 w-full">
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
                className="w-full h-[40px] border border-gray-300 rounded-sm"
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
                className="w-full h-[40px] border border-gray-300 rounded-sm"
              />
            </div>
            {errors.fullName ? (
              <span className="text-red-500">{errors.fullName.message}</span>
            ) : null}
          </div>
        </div>

        {/* Display Name */}
        <div className="flex tablet:flex-row flex-col w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>
                Display Name<span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex tablet:hidden tablet:group-hover:flex text-xs text-gray-400 py-2">
              <span className="flex flex-wrap">
                To help build credible and authentic connections with customers,
                they{"’"}ll now see your display name.
                <br />
                We suggest using your first name and first initial of your last
                name.
              </span>
            </div>
          </aside>
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              {...register("displayName", {
                required: true,
                validate: (value) => {
                  const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
                  if (value.length < 3) {
                    return "Display name must be at least 3 characters long.";
                  }
                  if (!regex.test(value)) {
                    return "Please enter a valid display name.";
                  }

                  return true;
                },
              })}
              name="displayName"
              id="displayName"
              className="tablet:w-[300px] w-full h-[40px] border border-gray-300 rounded-sm"
            />
            {errors.displayName ? (
              <span className="text-red-500">{errors.displayName.message}</span>
            ) : null}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex tablet:flex-row flex-col w-full tablet:pt-[35px] tablet:pb-[95px] group">
          <aside className="block flex-col flex-wrap  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>
                Profile Picture<span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex tablet:hidden tablet:group-hover:flex text-xs text-gray-400">
              Add a profile picture of yourself so customers will know exactly
              who {"they’ll"} be working with.
            </div>
          </aside>
          <div className="flex items-start justify-start w-full ">
            <button
              type="button"
              className=" w-[150px] h-[150px] border text-white border-gray-300 rounded-full group/uploadButton hover:bg-gray-700 hover:bg-opacity-50 overflow-hidden"
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
                  ` relative z-1 object-cover items-center justify-center w-full`,
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
                  className=" w-full h-full object-cover"
                />
              ) : null}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex tablet:flex-row flex-col w-full tablet:pt-[35px] tablet:pb-[95px] group">
          <aside className="block flex-col flex-wrap  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>
                Description<span className="text-red-500">*</span>
              </span>
            </h3>
          </aside>
          <div className="flex flex-col items-start justify-start w-full ">
            <textarea
              className="w-full h-[150px] border border-gray-300 rounded-sm"
              {...register("description", {
                onChange: (e: React.FormEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setCharNumber(e.currentTarget.value.length);
                },
                validate: (value) => {
                  if (value.length < 50) {
                    return "Description must be at least 50 characters long.";
                  }
                  return true;
                },
                required: true,
              })}
              name="description"
              id="description"
              maxLength={600}
            />
            <small className="text-gray-400 text-end">{charNumber}/600</small>

            {errors.description ? (
              <span className="text-red-500">{errors.description.message}</span>
            ) : null}
          </div>
        </div>

        {/* Languages */}
        <div className="flex tablet:flex-row flex-col max-w-full tablet:pt-[35px] tablet:pb-[95px] group">
          <aside className="block flex-col flex-wrap  min-w-[210px] w-full py-4 ">
            <h3 className="py-2">
              <span>
                Languages<span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex tablet:hidden tablet:group-hover:flex text-xs text-gray-400">
              Select which languages you can communicate in and your proficiency
              level.
            </div>
          </aside>
          <div className=" flex-col items-start justify-start w-full max-w-[855px]">
            {showLanguageSelector && (
              <div className="flex tablet:flex-row flex-col border tablet:p-2 p-[12px]">
                <select
                  className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
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
                  className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2"
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
                    className="w-[150px]  h-[40px] bg-sky-600 text-white font-semibold hover:opacity-50 rounded-sm"
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
                    Update
                  </button>
                  <button
                    type="button"
                    className="w-[150px] h-[40px] bg-gray-200 text-gray-400 hover:opacity-50 font-semibold rounded-sm"
                    onClick={() => {
                      setCurrentSelectedLanguage({
                        fieldName: "",
                        fieldLevel: "Nativo/Bilingue",
                      });
                      setShowLanguageSelector(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {errors.languages ? (
              <span className="text-red-500 text-xs">
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
              className="flex min-w-[200px] hover:opacity-50 text-sky-500"
              onClick={() => {
                setShowLanguageSelector(true);
              }}
            >
              Add New
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || languages.size === 0}
          className={cn(
            `w-[200px] h-[40px] ${
              isValid && languages.size > 0 ? " bg-sky-600" : "bg-gray-400"
            } text-white rounded-sm`,
          )}
          onClick={handleSubmit(personalInfoHandler)}
        >
          Continuar
        </button>
      </form>
    </>
  );
};

export default page;
