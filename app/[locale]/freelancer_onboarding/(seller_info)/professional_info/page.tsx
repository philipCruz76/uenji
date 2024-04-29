"use client";
import { Input } from "@/components/ui/Input";
import { useSellerOnboardingStore } from "@/lib/stores/sellerOboarding-store";
import { cn } from "@/lib/utils";
import {
  ProfessionalInfoValidator,
  SellerInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";
import { lazy, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Control,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISOCountries, categoryFilters } from "@/constants";
import { useSellerProfileStore } from "@/lib/stores/sellerProfile-store";
import { useLocale, useTranslations } from "next-intl";

type SellerCeritifcation = {
  fieldName: string;
  institutionName?: string;
  fieldLevel: string;
};

type SellerEducationInfo = {
  fieldName: string;
  institutionName?: string;
  educationCountry?: string;
  educationLevel?: string;
  fieldLevel: string;
};

const DataTable = lazy(
  () => import("@/components/users/seller_profile/DataTable"),
);
const SkillLevels = ["Beginner", "Intermediate", "Expert"];

const page = ({}) => {
  const locale = useLocale();
  const professionalInfoText = useTranslations(
    "FreelancerOnboarding.professionalInfo",
  );
  const router = useRouter();
  const [startYear, setStartYear] = useState<number>(2023);
  const [endYear, setEndYear] = useState<number>(2023);
  const [showAddSkillInput, setShowAddSkillInput] = useState(true);
  const [showYearsOfExperience, setShowYearsOfExperience] = useState(true);
  const [showAddCertificationInput, setShowAddCertificationInput] =
    useState(true);
  const [showAddEducationInput, setShowAddEducationInput] = useState(true);
  const currentYear = new Date(Date.now()).getFullYear();
  const [years, setYears] = useState<number[]>([]);
  const [occupationYears, setOccupationYears] = useState<number[]>([]);
  const [skills, setSkills] = useState<Map<string, string>>(new Map());
  const [education, setEducation] = useState<Map<string, string>>(new Map());
  const [certifications, setCertifications] = useState<Map<string, string>>(
    new Map(),
  );
  const [currentSelectedSkill, setCurrentSelectedSkill] = useState({
    fieldName: "",
    fieldLevel: "Beginner",
  });

  const [currentSelectedEducationInfo, setCurrentSelectedEducationInfo] =
    useState<SellerEducationInfo>({
      educationCountry: "Angola",
      institutionName: "",
      educationLevel: "Bacharelado",
      fieldName: "",
      fieldLevel: "2023",
    } as SellerEducationInfo);

  const [currentSelectedCertification, setCurrentSelectedCertification] =
    useState<SellerCeritifcation>({
      fieldName: "",
      institutionName: "",
      fieldLevel: "2023",
    } as SellerCeritifcation);

  const { sellerOnboardingStep, setSellerOnboardingStep } =
    useSellerOnboardingStore();
  const { setSellerProfessionalInfo, getSellerProfessionalInfo } =
    useSellerProfileStore();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    //DEBUG ONLY -> watch,
    formState: { errors, isValid },
  } = useForm<SellerProfessionalInfo>({
    mode: "onChange",
    resolver: zodResolver(ProfessionalInfoValidator),
  });

  // DEBUG ONLY const watchForm = watch();

  useEffect(() => {
    sellerOnboardingStep !== 2 && setSellerOnboardingStep(2);
  }, [sellerOnboardingStep]);

  useEffect(() => {
    const initialYear = 1970;
    const yearsArray = Array.from(
      { length: currentYear - initialYear + 1 },
      (_, i) => initialYear + i,
    );
    yearsArray.reverse();
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    const occupationYearArray = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i,
    );
    occupationYearArray.reverse();
    setOccupationYears(occupationYearArray);
  }, [startYear]);

  const professionalInfoHandler: SubmitHandler<SellerProfessionalInfo> = (
    data: SellerProfessionalInfo,
  ) => {
    setSellerProfessionalInfo(data);
    console.log(getSellerProfessionalInfo());
    router.push("/freelancer_onboarding/account_security");
  };

  return (
    <>
      <div className="flex h-fit w-full flex-col gap-4 border-b py-4">
        <h1 className="text-4xl font-bold">
          {professionalInfoText("heading")}
        </h1>
        <h3 className="hidden max-w-[500px] flex-wrap tablet:flex">
          {professionalInfoText("subheading")}
        </h3>
        {/* DEBUG ONLY
        <h3>Watched values: {JSON.stringify(watchForm)}</h3>
        */}
        <h3 className="text-end text-gray-400">
          <i>{professionalInfoText("mandatoryFields")}</i>
        </h3>
      </div>

      <form
        className="box-content flex h-full flex-col gap-[60px] py-6"
        onSubmit={handleSubmit(professionalInfoHandler)}
      >
        {/* Occupation field */}
        <div className="group flex h-fit w-full flex-col justify-start tablet:flex-row tablet:pt-[35px] ">
          <aside className="block h-fit w-full min-w-[210px] flex-col flex-wrap">
            <h3 className="py-2">
              <span>
                {professionalInfoText("occupation.heading")}{" "}
                <span className="text-red-500">*</span>
              </span>
            </h3>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%]">
            <div className="flex w-full flex-col gap-4 py-[10px] tablet:flex-row">
              <select
                className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[200px]"
                {...register("occupation.category")}
                onChange={() => {
                  setShowYearsOfExperience(true);
                }}
              >
                <option value="" disabled>
                  {locale === "pt" ? "Selecionar Ramo" : "Choose Field"}
                </option>
                {categoryFilters.map((occupation) => (
                  <option value={occupation} key={occupation}>
                    {occupation.toUpperCase()}
                  </option>
                ))}
              </select>

              {showYearsOfExperience ? (
                <div className="flex flex-row items-center justify-center gap-3 pl-3">
                  <span className="text-gray-400 ">De</span>
                  <select
                    value={startYear}
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[100px]"
                    {...register("occupation.startYear")}
                    onChange={(e) => {
                      e.preventDefault();
                      setStartYear(parseInt(e.target.value));
                    }}
                  >
                    {years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                  <span className="text-gray-400 ">a</span>
                  <select
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[100px]"
                    {...register("occupation.endYear")}
                    value={endYear}
                    onChange={(e) => {
                      e.preventDefault();
                      setEndYear(parseInt(e.target.value));
                    }}
                  >
                    {occupationYears.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
            {showYearsOfExperience ? (
              <>
                <div className="flex flex-col gap-3">
                  <small>
                    {professionalInfoText("occupation.subheadingPart1")}
                    <b>
                      {professionalInfoText("occupation.subheadingPart2")}
                    </b>{" "}
                    {professionalInfoText("occupation.subheadingPart3")}
                  </small>
                  <div className="grid grid-cols-2 tablet:grid-cols-3 ">
                    {Array.from({ length: 8 }, (_: number, i) => i + 1).map(
                      (skill) => (
                        <div
                          className="flex flex-row items-center gap-2"
                          key={skill}
                        >
                          <Input
                            type="checkbox"
                            value={skill}
                            className="h-[20px] w-[20px] "
                            {...register("occupation.bestSkills")}
                          />
                          <span className=" text-slate-700">Skill {skill}</span>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="h-[1px] bg-slate-200" />
                </div>
              </>
            ) : null}
            {errors.occupation ? (
              <>
                <span className="text-sm text-red-500">
                  {errors.occupation?.category?.message}
                </span>
                <span className="text-sm text-red-500">
                  {errors.occupation?.bestSkills?.message}
                </span>
                <span className="text-sm text-red-500">
                  {errors.occupation?.endYear?.message}
                </span>
                <span className="text-sm text-red-500">
                  {errors.occupation?.startYear?.message}
                </span>
              </>
            ) : null}
          </div>
        </div>

        {/* Skills field */}
        <div className="group flex min-h-[60px] w-full flex-col justify-start tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block h-fit w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>
                {professionalInfoText("skills.heading")}{" "}
                <span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="flex py-2 text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              {professionalInfoText("skills.subheading")}
            </div>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%]">
            {/* Insert Skills input here */}
            {showAddSkillInput && (
              <div className="flex flex-col gap-2 p-[12px] tablet:flex-row tablet:p-0">
                <input
                  type="text"
                  className="h-[40px] w-full rounded-sm border border-gray-300 bg-white  px-2 text-gray-600 focus:outline-none tablet:w-[300px] "
                  placeholder="Skill"
                  value={currentSelectedSkill.fieldName}
                  onChange={(e) => {
                    e.preventDefault();
                    if (e.target.value.length < 2) {
                      setError("skills", {
                        type: "manual",
                        message:
                          "Skill name must be at least 2 characters long",
                      });
                    } else {
                      clearErrors("skills");
                    }
                    setCurrentSelectedSkill({
                      ...currentSelectedSkill,
                      fieldName: e.target.value,
                    });
                  }}
                />
                <select
                  className="h-[40px] w-full rounded-sm border border-gray-300 bg-white  px-2 text-gray-600 tablet:w-[300px]"
                  id="proficiency"
                  value={currentSelectedSkill.fieldLevel}
                  onChange={(e) => {
                    e.preventDefault();
                    setCurrentSelectedSkill({
                      ...currentSelectedSkill,
                      fieldLevel: e.target.value,
                    });
                  }}
                >
                  {SkillLevels.map((level) => (
                    <option value={level} key={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <div className="flex flex-row justify-between gap-1 px-2 ">
                  <button
                    type="button"
                    disabled={
                      errors.skills || currentSelectedSkill.fieldName === ""
                        ? true
                        : false
                    }
                    className={cn(
                      "h-[40px]  w-[150px] ",
                      `${
                        errors.skills || currentSelectedSkill.fieldName === ""
                          ? "bg-gray-400"
                          : "bg-sky-600"
                      }`,
                      "rounded-sm font-semibold text-white hover:opacity-50",
                    )}
                    onClick={() => {
                      if (skills.size < 10) {
                        setSkills(
                          skills.set(
                            currentSelectedSkill.fieldName,
                            currentSelectedSkill.fieldLevel,
                          ),
                        );
                        setShowAddSkillInput(false);
                        setCurrentSelectedSkill({
                          fieldName: "",
                          fieldLevel: "Beginner",
                        });
                      } else {
                        setError("skills", {
                          type: "manual",
                          message: "You can only add up to 10 skills",
                        });
                      }
                    }}
                  >
                    {locale === "pt" ? "Atualizar" : "Update"}
                  </button>
                  <button
                    type="button"
                    className="h-[40px] w-[150px] rounded-sm bg-gray-200 font-semibold text-gray-400 hover:opacity-50"
                    onClick={() => {
                      setCurrentSelectedSkill({
                        fieldName: "",
                        fieldLevel: "Beginner",
                      });
                      setShowAddSkillInput(false);
                      clearErrors("skills");
                    }}
                  >
                    {locale === "pt" ? "Cancelar" : "Cancel"}
                  </button>
                </div>
              </div>
            )}
            {errors.skills ? (
              <span className="text-red-500">{errors.skills.message}</span>
            ) : null}
            <DataTable
              initialInput={skills}
              setTableData={setSkills}
              showRowEditor={setShowAddSkillInput}
              selectedField={setCurrentSelectedSkill}
              fieldRegister={register as UseFormRegister<SellerInfo>}
              formControl={control as Control<SellerInfo>}
              fieldName="skills"
            />
            {skills.size < 10 ? (
              <button
                type="button"
                disabled={skills.size === 10}
                className="flex min-w-[200px] text-sky-500 hover:opacity-50"
                onClick={() => {
                  setShowAddSkillInput(true);
                }}
              >
                {locale === "pt" ? "Adicionar Nova" : "Add New"}
              </button>
            ) : null}
          </div>
        </div>

        {/* Education field */}
        <div className="group flex min-h-[60px] w-full flex-col justify-start tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block h-fit w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>{professionalInfoText("education.heading")}</span>
            </h3>
            <div className="flex py-2 text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              {professionalInfoText("education.subheading")}
            </div>
          </aside>
          <div className="flex flex-col gap-2 tablet:min-w-[60%]">
            {/* Insert Education input here */}
            {showAddEducationInput && (
              <>
                <div className="flex flex-col gap-2 p-[12px] tablet:flex-row tablet:p-0">
                  <select
                    value={currentSelectedEducationInfo.educationCountry}
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[200px]"
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedEducationInfo({
                        ...currentSelectedEducationInfo,
                        educationCountry: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled>
                      {locale === "pt"
                        ? "País de Formação"
                        : "Education Country"}
                    </option>
                    {ISOCountries.map((country: string) => (
                      <option value={country} key={country}>
                        {country}
                      </option>
                    ))}
                    <option value={"Angola"}>Angola</option>
                  </select>
                  <input
                    type="text"
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white  px-2 text-gray-600 focus:outline-none tablet:w-[400px] "
                    placeholder="Colégio/Universidade"
                    value={currentSelectedEducationInfo.institutionName}
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedEducationInfo({
                        ...currentSelectedEducationInfo,
                        institutionName: e.target.value,
                      });
                    }}
                  />
                  <select
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[150px]"
                    value={currentSelectedEducationInfo.educationLevel}
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedEducationInfo({
                        ...currentSelectedEducationInfo,
                        educationLevel: e.target.value,
                      });
                    }}
                  >
                    <option value={"Bacharelado"}>
                      {" "}
                      {professionalInfoText("education.bachelors")}
                    </option>
                    <option value={"Pós-graduação"}>
                      {professionalInfoText("education.postGrad")}
                    </option>
                    <option value={"Mestrado"}>
                      {professionalInfoText("education.masters")}
                    </option>
                    <option value={"Doutoramento"}>
                      {professionalInfoText("education.phd")}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col items-center gap-2 p-[12px] tablet:flex-row tablet:p-0">
                  <input
                    type="text"
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white  px-2 text-gray-600 focus:outline-none tablet:w-[400px] "
                    placeholder="Formação"
                    value={currentSelectedEducationInfo.fieldName}
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedEducationInfo({
                        ...currentSelectedEducationInfo,
                        fieldName: e.target.value,
                      });
                    }}
                  />
                  <span className="hidden text-gray-400 tablet:block">em</span>
                  <select
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[100px]"
                    value={currentSelectedEducationInfo.fieldLevel}
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedEducationInfo({
                        ...currentSelectedEducationInfo,
                        fieldLevel: e.target.value,
                      });
                    }}
                  >
                    {years.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-row items-center justify-start gap-1  ">
                    <button
                      type="button"
                      disabled={
                        errors.education ||
                        currentSelectedEducationInfo.fieldName === ""
                          ? true
                          : false
                      }
                      className={cn(
                        "h-[40px] w-[150px] tablet:w-[100px] ",
                        `${
                          errors.education ||
                          currentSelectedEducationInfo.fieldName === ""
                            ? "bg-gray-400"
                            : "bg-sky-600"
                        }`,
                        "rounded-sm font-semibold text-white hover:opacity-50",
                      )}
                      onClick={() => {
                        setEducation(
                          education.set(
                            currentSelectedEducationInfo.fieldName,
                            currentSelectedEducationInfo.fieldLevel +
                              ";" +
                              currentSelectedEducationInfo.institutionName +
                              ";" +
                              currentSelectedEducationInfo.educationCountry +
                              ";" +
                              currentSelectedEducationInfo.educationLevel,
                          ),
                        );
                        setShowAddEducationInput(false);
                        setCurrentSelectedEducationInfo({
                          educationCountry: "Angola",
                          educationLevel: "Bacharelado",
                          fieldName: "",
                          institutionName: "",
                          fieldLevel: "2023",
                        });
                      }}
                    >
                      {locale === "pt" ? "Atualizar" : "Update"}
                    </button>
                    <button
                      type="button"
                      className="h-[40px] w-[150px] rounded-sm bg-gray-200 font-semibold text-gray-400 hover:opacity-50 tablet:w-[100px]"
                      onClick={() => {
                        setCurrentSelectedEducationInfo({
                          educationCountry: "Angola",
                          educationLevel: "Bacharelado",
                          fieldName: "",
                          institutionName: "",
                          fieldLevel: "2023",
                        });
                        setShowAddEducationInput(false);
                        clearErrors("education");
                      }}
                    >
                      {locale === "pt" ? "Cancelar" : "Cancel"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {errors.education ? (
              <span className="text-red-500">{errors.education.message}</span>
            ) : null}

            <DataTable
              initialInput={education}
              setTableData={setEducation}
              showRowEditor={setShowAddEducationInput}
              selectedField={setCurrentSelectedEducationInfo}
              fieldRegister={register as UseFormRegister<SellerInfo>}
              formControl={control as Control<SellerInfo>}
              fieldName="education"
            />

            {education.size < 3 ? (
              <button
                type="button"
                disabled={education.size === 3}
                className="flex min-w-[200px] text-sky-500 hover:opacity-50"
                onClick={() => {
                  setShowAddEducationInput(true);
                }}
              >
                {locale === "pt" ? "Adicionar Nova" : "Add New"}
              </button>
            ) : null}
          </div>
        </div>

        {/* Certification field */}
        <div className="group flex min-h-[60px] w-full flex-col justify-start tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block h-fit w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>{professionalInfoText("certifications.heading")}</span>
            </h3>
            <div className="flex py-2 text-xs text-gray-400 tablet:hidden tablet:group-hover:flex">
              {professionalInfoText("certifications.subheading")}
            </div>
          </aside>
          <div className="flex flex-col gap-2 tablet:min-w-[60%]">
            {/* Insert Certification input here */}
            {showAddCertificationInput && (
              <>
                <div className="flex flex-col items-center gap-2 p-[12px] tablet:flex-row tablet:p-0">
                  <input
                    type="text"
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white  px-2 text-gray-600 focus:outline-none tablet:w-[300px] "
                    placeholder="Certificado"
                    value={currentSelectedCertification.fieldName}
                    onChange={(e) => {
                      e.preventDefault();
                      if (e.target.value.length < 2) {
                        setError("certifications", {
                          type: "manual",
                          message:
                            "Nome de certificação deve ter pelo menos 2 caracteres",
                        });
                      }
                      setCurrentSelectedCertification({
                        ...currentSelectedCertification,
                        fieldName: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white  px-2 text-gray-600 focus:outline-none tablet:w-[300px] "
                    placeholder="Atribuído por"
                    value={currentSelectedCertification.institutionName}
                    onChange={(e) => {
                      e.preventDefault();
                      if (e.target.value.length < 2) {
                        setError("certifications", {
                          type: "manual",
                          message:
                            "Nome de entidade deve ter pelo menos 2 caracteres",
                        });
                      } else if (
                        /^[a-zA-Z\s]+$/.test(e.target.value) === false
                      ) {
                        setError("certifications", {
                          type: "manual",
                          message: "Nome de entidade inválido",
                        });
                      } else {
                        clearErrors("certifications");
                      }
                      setCurrentSelectedCertification({
                        ...currentSelectedCertification,
                        institutionName: e.target.value,
                      });
                    }}
                  />
                  <span className="hidden text-gray-400 tablet:block">
                    {locale === "pt" ? "em" : "in"}
                  </span>
                  <select
                    className="h-[40px] w-full rounded-sm border border-gray-300 bg-white px-2 text-gray-600 tablet:w-[100px]"
                    value={currentSelectedCertification.fieldLevel}
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedCertification({
                        ...currentSelectedCertification,
                        fieldLevel: e.target.value,
                      });
                    }}
                  >
                    {years.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row items-center justify-start gap-1  ">
                  <button
                    type="button"
                    disabled={
                      errors.certifications ||
                      currentSelectedCertification.fieldName === ""
                        ? true
                        : false
                    }
                    className={cn(
                      "h-[40px]  w-[150px] ",
                      `${
                        errors.certifications ||
                        currentSelectedCertification.fieldName === ""
                          ? "bg-gray-400"
                          : "bg-sky-600"
                      }`,
                      "rounded-sm font-semibold text-white hover:opacity-50",
                    )}
                    onClick={() => {
                      setCertifications(
                        certifications.set(
                          currentSelectedCertification.fieldName,
                          currentSelectedCertification.fieldLevel +
                            ";" +
                            currentSelectedCertification.institutionName,
                        ),
                      );
                      setShowAddCertificationInput(false);
                      setCurrentSelectedCertification({
                        fieldName: "",
                        institutionName: "",
                        fieldLevel: "2023",
                      });
                    }}
                  >
                    {locale === "pt" ? "Atualizar" : "Update"}
                  </button>
                  <button
                    type="button"
                    className="h-[40px] w-[150px] rounded-sm bg-gray-200 font-semibold text-gray-400 hover:opacity-50"
                    onClick={() => {
                      setCurrentSelectedCertification({
                        fieldName: "",
                        institutionName: "",
                        fieldLevel: "2023",
                      });
                      setShowAddCertificationInput(false);
                      clearErrors("certifications");
                    }}
                  >
                    {locale === "pt" ? "Cancelar" : "Cancel"}
                  </button>
                </div>
              </>
            )}

            {errors.certifications ? (
              <span className="text-red-500">
                {errors.certifications.message}
              </span>
            ) : null}
            <DataTable
              initialInput={certifications}
              setTableData={setCertifications}
              showRowEditor={setShowAddCertificationInput}
              selectedField={setCurrentSelectedCertification}
              fieldRegister={register as UseFormRegister<SellerInfo>}
              formControl={control as Control<SellerInfo>}
              fieldName="certifications"
            />
            {certifications.size < 5 ? (
              <button
                type="button"
                disabled={certifications.size === 5}
                className="flex min-w-[200px] text-sky-500 hover:opacity-50"
                onClick={() => {
                  setShowAddCertificationInput(true);
                }}
              >
                {locale === "pt" ? "Adicionar Nova" : "Add New"}
              </button>
            ) : null}
          </div>
        </div>

        {/* Private Website field */}
        <div className="group flex min-h-[60px] w-full flex-col justify-start tablet:flex-row tablet:pb-[95px] tablet:pt-[35px]">
          <aside className="block h-fit w-full min-w-[210px]  flex-col flex-wrap ">
            <h3 className="py-2">
              <span>{professionalInfoText("personalWebsite")}</span>
              <small className="text-gray-400">
                <i>{locale === "pt" ? "Privado" : "Private"}</i>
              </small>
            </h3>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%]">
            <input
              type="text"
              placeholder="Provide a link to your own professional website"
              {...register("personalWebsite")}
              className=" h-[40px] w-full rounded-sm border border-gray-300  bg-white px-2 text-gray-600 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className={cn(
            `h-[40px] w-[200px] ${
              isValid ? " bg-sky-600" : "bg-gray-400"
            } rounded-sm text-white`,
          )}
        >
          {locale === "pt" ? "Continuar" : "Continue"}
        </button>
      </form>
    </>
  );
};

export default page;
