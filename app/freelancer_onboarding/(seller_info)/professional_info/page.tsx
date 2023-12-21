"use client";
import { Input } from "@/components/ui/Input";
import { useSellerOnboardingStore } from "@/lib/stores/selleOboarding-store";
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
import { ISOCountries } from "@/constants";
import { useSellerProfileStore } from "@/lib/stores/sellerProfile-store";

const OccupationFields = [
  "Fotografía",
  "Formação",
  "Escrita",
  "Música",
  "Design",
  "Análises",
  "Programação",
  "Vídeo",
  "Negócios",
  "Branding",
];

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
      <div className="flex flex-col gap-4 w-full h-fit py-4 border-b">
        <h1 className="font-bold text-4xl">Dados Profissionais</h1>
        <h3 className="tablet:flex hidden flex-wrap max-w-[500px]">
          Este é o seu momento para brilhar. Deixe que os potenciais clientes
          saibam o que faz melhor e como adquiriu as suas competências,
          certificações e experiência.
        </h3>
        {/* DEBUG ONLY
        <h3>Watched values: {JSON.stringify(watchForm)}</h3>
        */}
        <h3 className="text-end text-gray-400">
          {" "}
          <i>* Campos obrigatórios</i>
        </h3>
      </div>

      <form
        className="flex flex-col gap-[60px] h-full box-content py-6"
        onSubmit={handleSubmit(professionalInfoHandler)}
      >
        {/* Occupation field */}
        <div className="flex tablet:flex-row flex-col justify-start w-full h-fit group tablet:pt-[35px] ">
          <aside className="block flex-col flex-wrap h-fit w-full min-w-[210px]">
            <h3 className="py-2">
              <span>
                Profissão <span className="text-red-500">*</span>
              </span>
            </h3>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%]">
            <div className="flex tablet:flex-row flex-col gap-4 w-full py-[10px]">
              <select
                className="tablet:w-[200px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
                {...register("occupation.category")}
                onChange={() => {
                  setShowYearsOfExperience(true);
                }}
              >
                <option value="" disabled>
                  Selecionar Ramo
                </option>
                {OccupationFields.map((occupation) => (
                  <option value={occupation} key={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>

              {showYearsOfExperience ? (
                <div className="flex flex-row justify-center items-center pl-3 gap-3">
                  <span className="text-gray-400 ">De</span>
                  <select
                    value={startYear}
                    className="tablet:w-[100px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
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
                    className="tablet:w-[100px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
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
                    {" "}
                    Escolha entre <b>duas a cinco</b> das suas melhores
                    competências neste ramo
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
                            className="w-[20px] h-[20px] "
                            {...register("occupation.bestSkills")}
                          />
                          <span className="font-sans text-slate-700">
                            Skill {skill}
                          </span>
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
                <span className="text-red-500 text-sm">
                  {errors.occupation?.category?.message}
                </span>
                <span className="text-red-500 text-sm">
                  {errors.occupation?.bestSkills?.message}
                </span>
                <span className="text-red-500 text-sm">
                  {errors.occupation?.endYear?.message}
                </span>
                <span className="text-red-500 text-sm">
                  {errors.occupation?.startYear?.message}
                </span>
              </>
            ) : null}
          </div>
        </div>

        {/* Skills field */}
        <div className="flex tablet:flex-row flex-col justify-start w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap h-fit  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>
                Competências <span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="tablet:hidden tablet:group-hover:flex flex text-xs text-gray-400 py-2">
              Indique as competências relacionadas com os serviços que irá
              oferecer e inclua o seu nível de experiência.
            </div>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%]">
            {/* Insert Skills input here */}
            {showAddSkillInput && (
              <div className="flex tablet:flex-row flex-col gap-2 tablet:p-0 p-[12px]">
                <input
                  type="text"
                  className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2 focus:outline-none "
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
                  className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2"
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
                      "w-[150px]  h-[40px] ",
                      `${
                        errors.skills || currentSelectedSkill.fieldName === ""
                          ? "bg-gray-400"
                          : "bg-sky-600"
                      }`,
                      "text-white font-semibold hover:opacity-50 rounded-sm",
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
                    Atualizar
                  </button>
                  <button
                    type="button"
                    className="w-[150px] h-[40px] bg-gray-200 text-gray-400 hover:opacity-50 font-semibold rounded-sm"
                    onClick={() => {
                      setCurrentSelectedSkill({
                        fieldName: "",
                        fieldLevel: "Beginner",
                      });
                      setShowAddSkillInput(false);
                      clearErrors("skills");
                    }}
                  >
                    Cancelar
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
                className="flex min-w-[200px] hover:opacity-50 text-sky-500"
                onClick={() => {
                  setShowAddSkillInput(true);
                }}
              >
                Adicionar Nova
              </button>
            ) : null}
          </div>
        </div>

        {/* Education field */}
        <div className="flex tablet:flex-row flex-col justify-start w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap h-fit  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>Educação</span>
            </h3>
            <div className="tablet:hidden tablet:group-hover:flex flex text-xs text-gray-400 py-2">
              Adicione quaisquer informações relevantes sobre educação que
              ajudem os clientes a a conhecê-lo melhor.
            </div>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%] gap-2">
            {/* Insert Education input here */}
            {showAddEducationInput && (
              <>
                <div className="flex tablet:flex-row flex-col gap-2 tablet:p-0 p-[12px]">
                  <select
                    value={currentSelectedEducationInfo.educationCountry}
                    className="tablet:w-[200px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedEducationInfo({
                        ...currentSelectedEducationInfo,
                        educationCountry: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled>
                      País de Formação
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
                    className="tablet:w-[400px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2 focus:outline-none "
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
                    className="tablet:w-[150px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
                    value={currentSelectedEducationInfo.educationLevel}
                    onChange={(e) => {
                      e.preventDefault();
                      setCurrentSelectedEducationInfo({
                        ...currentSelectedEducationInfo,
                        educationLevel: e.target.value,
                      });
                    }}
                  >
                    <option value={"Bacharelado"}>Bacharelado</option>
                    <option value={"Pós-graduação"}>Pós-graduação</option>
                    <option value={"Mestrado"}>Mestrado</option>
                    <option value={"Doutoramento"}>Doutoramento</option>
                  </select>
                </div>

                <div className="flex tablet:flex-row flex-col items-center gap-2 tablet:p-0 p-[12px]">
                  <input
                    type="text"
                    className="tablet:w-[400px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2 focus:outline-none "
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
                  <span className="tablet:block hidden text-gray-400">em</span>
                  <select
                    className="tablet:w-[100px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
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
                  <div className="flex flex-row justify-start items-center gap-1  ">
                    <button
                      type="button"
                      disabled={
                        errors.education ||
                        currentSelectedEducationInfo.fieldName === ""
                          ? true
                          : false
                      }
                      className={cn(
                        "tablet:w-[100px] w-[150px] h-[40px] ",
                        `${
                          errors.education ||
                          currentSelectedEducationInfo.fieldName === ""
                            ? "bg-gray-400"
                            : "bg-sky-600"
                        }`,
                        "text-white font-semibold rounded-sm hover:opacity-50",
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
                      Atualizar
                    </button>
                    <button
                      type="button"
                      className="tablet:w-[100px] w-[150px] h-[40px] bg-gray-200 text-gray-400 font-semibold hover:opacity-50 rounded-sm"
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
                      Cancelar
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
                className="flex min-w-[200px] hover:opacity-50 text-sky-500"
                onClick={() => {
                  setShowAddEducationInput(true);
                }}
              >
                Adicionar Nova
              </button>
            ) : null}
          </div>
        </div>

        {/* Certification field */}
        <div className="flex tablet:flex-row flex-col justify-start w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap h-fit  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>Certificações</span>
            </h3>
            <div className="tablet:hidden tablet:group-hover:flex flex text-xs text-gray-400 py-2">
              Inclua todos os certificados ou prémios que sejam relevantes para
              os serviços que irá oferecer.
            </div>
          </aside>
          <div className="flex flex-col gap-2 tablet:min-w-[60%]">
            {/* Insert Certification input here */}
            {showAddCertificationInput && (
              <>
                <div className="flex tablet:flex-row items-center flex-col gap-2 tablet:p-0 p-[12px]">
                  <input
                    type="text"
                    className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2 focus:outline-none "
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
                    className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2 focus:outline-none "
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
                  <span className="tablet:block hidden text-gray-400">em</span>
                  <select
                    className="tablet:w-[100px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2"
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
                <div className="flex flex-row justify-start items-center gap-1  ">
                  <button
                    type="button"
                    disabled={
                      errors.certifications ||
                      currentSelectedCertification.fieldName === ""
                        ? true
                        : false
                    }
                    className={cn(
                      "w-[150px]  h-[40px] ",
                      `${
                        errors.certifications ||
                        currentSelectedCertification.fieldName === ""
                          ? "bg-gray-400"
                          : "bg-sky-600"
                      }`,
                      "text-white font-semibold rounded-sm hover:opacity-50",
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
                    Atualizar
                  </button>
                  <button
                    type="button"
                    className="w-[150px] h-[40px] bg-gray-200 text-gray-400 font-semibold hover:opacity-50 rounded-sm"
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
                    Cancelar
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
                className="flex min-w-[200px] hover:opacity-50 text-sky-500"
                onClick={() => {
                  setShowAddCertificationInput(true);
                }}
              >
                Adicionar Nova
              </button>
            ) : null}
          </div>
        </div>

        {/* Private Website field */}
        <div className="flex tablet:flex-row flex-col justify-start w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap h-fit  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>Private Website</span>
              <small className="text-gray-400">
                <i>Private</i>
              </small>
            </h3>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%]">
            <input
              type="text"
              placeholder="Provide a link to your own professional website"
              {...register("personalWebsite")}
              className=" w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className={cn(
            `w-[200px] h-[40px] ${
              isValid ? " bg-sky-600" : "bg-gray-400"
            } text-white rounded-sm`,
          )}
        >
          Continuar
        </button>
      </form>
    </>
  );
};

export default page;
