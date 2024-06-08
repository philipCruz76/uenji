import { User } from "@prisma/client";
import {
  SellerPersonalInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";

type SellerInfoCardProps = {
  user: User;
};

const SellerInfoCard = ({ user }: SellerInfoCardProps) => {
  const {
    description,
    languages,
    occupation,
    skills,
    education,
    certification,
  } = user;
  const parsedLanguages = JSON.parse(
    languages!,
  ) as SellerPersonalInfo["languages"];
  const parsedOccupation = JSON.parse(
    occupation!,
  ) as SellerProfessionalInfo["occupation"];
  const parsedSkills = JSON.parse(skills!) as SellerProfessionalInfo["skills"];
  const parsedEducation = JSON.parse(
    education!,
  ) as SellerProfessionalInfo["education"];
  const parsedCertification = JSON.parse(
    certification!,
  ) as SellerProfessionalInfo["certifications"];

  return (
    <div className="relative flex h-fit min-h-[450px] bg-white tablet:w-[400px]">
      <div className="flex h-fit w-full flex-col items-center justify-center gap-2 space-y-3 border border-zinc-200 px-[20px] py-[20px] tablet:px-[30px] tablet:py-[30px]">
        {true ? (
          <>
            {/* Seller Description */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row justify-between pb-2">
                <h3 className="text-base font-semibold">Descrição</h3>

                <a className="cursor-pointer text-xs text-cyan-600 hover:underline">
                  Editar Descrição
                </a>
              </div>
              <span className="w-full text-justify text-sm">{description}</span>
            </div>
            <div className="flex h-px w-full bg-gray-200" />

            {/* Seller Languages */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row justify-between pb-2">
                <h3 className="text-base font-semibold">Línguas</h3>

                <a className="cursor-pointer text-xs text-cyan-600 hover:underline">
                  Editar Línguas
                </a>
              </div>
              {parsedLanguages.map((language) => (
                <span className="text-sm">
                  {language.name} -{" "}
                  <span className="text-sm text-slate-400">
                    {language.level}{" "}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex h-px w-full bg-gray-200" />

            {/* Seller Occupation */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row justify-between pb-2">
                <h3 className="text-base font-semibold">Profissão</h3>

                <a className="cursor-pointer text-xs text-cyan-600 hover:underline">
                  Editar Profissão
                </a>
              </div>
              <span className="text-sm text-slate-600">
                {parsedOccupation.category} -{" "}
                <span className="text-sm text-slate-400">
                  {parsedOccupation.startYear} - {parsedOccupation.endYear}
                </span>
              </span>
            </div>
            <div className="flex h-px w-full bg-gray-200" />

            {/* Seller Skills */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row justify-between pb-2">
                <h3 className="text-base font-semibold">Competências</h3>

                <a className="cursor-pointer text-xs text-cyan-600 hover:underline">
                  Editar Competências
                </a>
              </div>
              <ul className="flex flex-row gap-2">
                {parsedSkills.map((skill) => (
                  <li
                    key={skill.name}
                    className="w-[90px] rounded-2xl border px-[4px] py-[4px] text-center text-sm hover:bg-gray-200"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex h-px w-full bg-gray-200" />

            {/* Seller Education */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row justify-between pb-2">
                <h3 className="text-base font-semibold">Educação</h3>

                <a className="cursor-pointer text-xs text-cyan-600 hover:underline">
                  Editar Educação
                </a>
              </div>
              {parsedEducation?.map((education) => (
                <span className="text-sm">
                  {education.degree} -{" "}
                  <span className="text-sm text-slate-400">
                    {education.institution}{" "}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex h-px w-full bg-gray-200" />

            {/* Seller Certification */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row justify-between pb-2">
                <h3 className="text-base font-semibold">Certificações</h3>

                <a className="cursor-pointer text-xs text-cyan-600 hover:underline">
                  Editar Certificações
                </a>
              </div>
              {parsedCertification?.map((certification) => (
                <span className="text-sm">
                  {certification.name} -{" "}
                  <span className="text-sm text-slate-400">
                    {certification.institution} {"("}
                    {certification.year}
                    {")"}
                  </span>
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SellerInfoCard;
