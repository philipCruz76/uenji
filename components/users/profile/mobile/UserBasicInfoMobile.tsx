import {
  SellerPersonalInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";
import { User } from "@prisma/client";

type UserBasicInfoMobileProps = {
  user: User;
};

const UserBasicInfoMobile = ({ user }: UserBasicInfoMobileProps) => {
  const {
    description,
    languages,
    country,
    skills,

    createdAt,
  } = user;
  const parsedLanguages = JSON.parse(
    languages!,
  ) as SellerPersonalInfo["languages"];
  const parsedSkills = JSON.parse(skills!) as SellerProfessionalInfo["skills"];

  const memberSince = new Date(createdAt).toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "2-digit",
  });
  return (
    <div className="flex h-full w-full flex-col ">
      <span className="text-lg font-bold">Informações do usuário</span>
      <div className="flex h-[60px] w-full items-center justify-start border-b border-t">
        <span className="text-sm">{description}</span>
      </div>
      <div className="flex h-fit w-full flex-row items-center justify-start gap-4 border-b py-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#495057"
          viewBox="0 0 256 256"
        >
          <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
        </svg>
        <div className="flex flex-col justify-start gap-2 text-start text-xs">
          <span className="text-[#adb5bd]">De</span>
          <span className="font-semibold">
            {!country ? "Informação não disponível" : country}
          </span>
        </div>
      </div>
      <div className="flex h-fit w-full flex-row items-center justify-start gap-4 border-b py-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#495057"
          viewBox="0 0 256 256"
        >
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
        </svg>
        <div className="flex flex-col justify-start gap-2 text-start text-xs">
          <span className="text-[#adb5bd]">Membro desde</span>
          <span className="font-semibold">{memberSince}</span>
        </div>
      </div>
      <div className="flex h-fit w-full flex-row items-center justify-start gap-4 border-b py-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#495057"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
        </svg>
        <div className="flex flex-col justify-start gap-2 text-start text-xs">
          <span className="text-[#adb5bd]">Idiomas</span>
          <span className="font-semibold">
            {parsedLanguages.length < 1
              ? "Nenhuma informação disponível"
              : parsedLanguages.map((language) => {
                  return (
                    <span key={language.name}>
                      {language.name}{" "}
                      <span className="font-normal text-[#adb5bd]">
                        {"("}
                        {language.level}
                        {")"}{" "}
                      </span>
                    </span>
                  );
                })}
          </span>
        </div>
      </div>
      <div className="flex h-fit w-full flex-row items-center justify-start gap-4 border-b py-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#495057"
          viewBox="0 0 256 256"
        >
          <path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z"></path>
        </svg>
        <div className="flex flex-col justify-start gap-2 text-start text-xs">
          <span className="text-[#adb5bd]">Habilidades</span>
          <span className="font-semibold">
            {parsedSkills.length < 1
              ? "Unknown"
              : parsedSkills.map((skill) => {
                  return `${skill.name} `;
                })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserBasicInfoMobile;
