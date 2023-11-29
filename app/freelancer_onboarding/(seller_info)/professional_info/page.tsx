"use client";
import { Input } from "@/components/ui/Input";
import DataTable from "@/components/users/seller_profile/DataTable";
import { cn } from "@/lib/utils";
import {
  SellerInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Control,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";

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

const SkillLevels = ["Beginner", "Intermediate", "Expert"];

const page = ({}) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<SellerProfessionalInfo>({
    mode: "onChange",
  });

  const [showYearsOfExperience, setShowYearsOfExperience] = useState(false);
  const [showAddSkillInput, setShowAddSkillInput] = useState(true);
  const [showAddCertificationInput, setShowAddCertificationInput] =
    useState(true);
  const [skills, setSkills] = useState<Map<string, string>>(new Map());
  const [years, setYears] = useState<number[]>([]);
  const [currentSelectedSkill, setCurrentSelectedSkill] = useState({
    fieldName: "",
    fieldLevel: "Beginner",
  });
  const currentYear = new Date(Date.now()).getFullYear();
  const router = useRouter();

  useEffect(() => {
    const startYear = 1970;
    const yearsArray = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i,
    );
    yearsArray.reverse();
    setYears(yearsArray);
  }, []);

  const professionalInfoHandler: SubmitHandler<SellerProfessionalInfo> = async (
    data,
  ) => {
    console.log(data);
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
        <h3 className="text-end text-gray-400">
          {" "}
          <i>* Campos obrigatórios</i>
        </h3>
      </div>

      <form className="flex flex-col gap-[60px] h-full box-content py-6">
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
                name="occupation"
                id="occupation"
                defaultValue=""
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
                  <select className="tablet:w-[100px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2">
                    {years.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-400 ">a</span>
                  <select className="tablet:w-[100px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2">
                    <option value={currentYear}>{currentYear}</option>
                  </select>
                </div>
              ) : null}
            </div>
            {showYearsOfExperience ? (
              <>
                <div className="flex flex-col gap-3">
                  <small>
                    {" "}
                    Escolha entre<b>duas a cinco</b> das suas melhores
                    competências neste ramo
                  </small>
                  <div className="grid grid-cols-1 tablet:grid-cols-3 ">
                    {Array.from({ length: 14 }, (_, i) => i + 1).map(
                      (skill) => (
                        <div
                          className="flex flex-row items-center gap-2"
                          key={skill}
                        >
                          <Input
                            type="checkbox"
                            className="w-[20px] h-[20px] "
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
              <span className="text-red-500 text-sm">
                {errors.occupation.message}
              </span>
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

                    setCurrentSelectedSkill({
                      ...currentSelectedSkill,
                      fieldName: e.target.value,
                    });
                  }}
                />
                <select
                  className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2"
                  name="proficiency"
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
                    disabled={isValid === false}
                    className={cn(
                      "w-[150px]  h-[40px] ",
                      `${isValid === false ? "bg-gray-400" : "bg-sky-600"}`,
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
              selectetField={setCurrentSelectedSkill}
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
              <span>
                Educação <span className="text-red-500">*</span>
              </span>
            </h3>
            <div className="tablet:hidden tablet:group-hover:flex flex text-xs text-gray-400 py-2">
              Adicione quaisquer informações relevantes sobre educação que
              ajudem os clientes a a conhecê-lo melhor.
            </div>
          </aside>
          <div className="flex flex-col tablet:min-w-[60%]">
            {/* Insert Education input here */}
          </div>
        </div>

        {/* Certification field */}
        <div className="flex tablet:flex-row flex-col justify-start w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap h-fit  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>
                Certificações <span className="text-red-500">*</span>
              </span>
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
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                  />
                  <input
                    type="text"
                    className="tablet:w-[300px] w-full h-[40px] border border-gray-300 bg-white  rounded-sm text-gray-600 px-2 focus:outline-none "
                    placeholder="Atribuído por"
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                  />
                  <span className="text-gray-400">em</span>
                  <select className="tablet:w-[100px] w-full h-[40px] border border-gray-300 bg-white rounded-sm text-gray-600 px-2">
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
                    disabled={isValid === false}
                    className={cn(
                      "w-[150px]  h-[40px] ",
                      `${isValid === false ? "bg-gray-400" : "bg-sky-600"}`,
                      "text-white font-semibold rounded-sm hover:opacity-50",
                    )}
                    onClick={() => {}}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="w-[150px] h-[40px] bg-gray-200 text-gray-400 font-semibold hover:opacity-50 rounded-sm"
                    onClick={() => {}}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Private Website field */}
        <div className="flex tablet:flex-row flex-col justify-start w-full min-h-[60px] group tablet:pt-[35px] tablet:pb-[95px]">
          <aside className="block flex-col flex-wrap h-fit  min-w-[210px] w-full ">
            <h3 className="py-2">
              <span>
                Private Website <span className="text-red-500">*</span>
              </span>
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
          disabled={!isValid || skills.size === 0}
          className={cn(
            `w-[200px] h-[40px] ${
              isValid && skills.size > 0 ? " bg-sky-600" : "bg-gray-400"
            } text-white rounded-sm`,
          )}
          onClick={handleSubmit(professionalInfoHandler)}
        >
          Continuar
        </button>
      </form>
    </>
  );
};

export default page;
