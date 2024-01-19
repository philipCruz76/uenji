import { User } from "@prisma/client";

type SellerInfoCardProps = {
  user: User;
};

type SellerLanguages = {
  name: string;
  level: string;
}[];

type SellerOccupation = {
  category: string;
  startYear: string;
  endYear: string;
  bestSkills: {
    skill: string;
  }[];
};
type SellerSkills = {
  name: string;
  level: string;
}[];

type SellerCertifications = {
  name: string;
  institution: string;
  year: string;
}[];

type SellerEducation = {
  educationLevel: string;
  country: string;
  institution: string;
  degree: string;
}[];

const SellerInfoCard = ({ user }: SellerInfoCardProps) => {
  const {
    description,
    languages,
    occupation,
    skills,
    education,
    certification,
  } = user;
  const parsedLanguages = JSON.parse(languages!) as SellerLanguages;
  const parsedOccupation = JSON.parse(occupation!) as SellerOccupation;
  const parsedSkills = JSON.parse(skills!) as SellerSkills;
  const parsedEducation = JSON.parse(education!) as SellerEducation;
  const parsedCertification = JSON.parse(
    certification!
  ) as SellerCertifications;

  return (
    <div className="flex relative bg-white  tablet:w-[400px] min-h-[450px] h-fit">
      <div className="flex flex-col gap-2 tablet:px-[30px] tablet:py-[30px] px-[20px] py-[20px]  border border-zinc-200 w-full h-fit items-center justify-center space-y-3">
        {true ? (
          <>
            {/* Seller Description */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row justify-between w-full pb-2">
                <h3 className="text-base font-semibold">Descrição</h3>

                <a className="text-xs hover:underline text-cyan-600 cursor-pointer">
                  Editar Descrição
                </a>
              </div>
              <span className="text-sm w-full text-justify">{description}</span>
            </div>
            <div className="flex w-full h-px bg-gray-200 " />

            {/* Seller Languages */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row justify-between w-full pb-2">
                <h3 className="text-base font-semibold">Línguas</h3>

                <a className="text-xs hover:underline text-cyan-600 cursor-pointer">
                  Editar Línguas
                </a>
              </div>
              {parsedLanguages.map((language) => (
                <span className="text-sm">
                  {language.name} -{" "}
                  <span className="text-slate-400 text-sm">
                    {language.level}{" "}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex w-full h-px bg-gray-200 " />

            {/* Seller Occupation */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row justify-between w-full pb-2">
                <h3 className="text-base font-semibold">Profissão</h3>

                <a className="text-xs hover:underline text-cyan-600 cursor-pointer">
                  Editar Profissão
                </a>
              </div>
              <span className="text-sm text-slate-600">
                {parsedOccupation.category} -{" "}
                <span className="text-slate-400 text-sm">
                  {parsedOccupation.startYear} - {parsedOccupation.endYear}
                </span>
              </span>
            </div>
            <div className="flex w-full h-px bg-gray-200 " />

            {/* Seller Skills */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row justify-between w-full pb-2">
                <h3 className="text-base font-semibold">Competências</h3>

                <a className="text-xs hover:underline text-cyan-600 cursor-pointer">
                  Editar Competências
                </a>
              </div>
              <ul className="flex flex-row gap-2">
                {parsedSkills.map((skill) => (
                  <li
                    key={skill.name}
                    className=" border w-[90px] text-sm text-center py-[4px] px-[4px] hover:bg-gray-200 rounded-2xl"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full h-px bg-gray-200 " />

            {/* Seller Education */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row justify-between w-full pb-2">
                <h3 className="text-base font-semibold">Educação</h3>

                <a className="text-xs hover:underline text-cyan-600 cursor-pointer">
                  Editar Educação
                </a>
              </div>
              {parsedEducation.map((education) => (
                <span className="text-sm">
                  {education.degree} -{" "}
                  <span className="text-slate-400 text-sm">
                    {education.institution}{" "}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex w-full h-px bg-gray-200 " />

            {/* Seller Certification */}
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-row justify-between w-full pb-2">
                <h3 className="text-base font-semibold">Certificações</h3>

                <a className="text-xs hover:underline text-cyan-600 cursor-pointer">
                  Editar Certificações
                </a>
              </div>
              {parsedCertification.map((certification) => (
                <span className="text-sm">
                  {certification.name} -{" "}
                  <span className="text-slate-400 text-sm">
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
