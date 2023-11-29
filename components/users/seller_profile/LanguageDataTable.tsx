import { SellerPersonalInfo } from "@/types/sellerProfile.types";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

type LanguageDataTableProps = {
  languages: Map<string, string>;
  setTableData: Dispatch<SetStateAction<Map<string, string>>>;
  showRowEditor: Dispatch<SetStateAction<boolean>>;
  selectedLanguage: Dispatch<
    SetStateAction<{ languageName: string; languageLevel: string }>
  >;
  fieldRegister: UseFormRegister<SellerPersonalInfo>;
  formControl: Control<SellerPersonalInfo>;
};

const LanguageDataTable: FC<LanguageDataTableProps> = ({
  languages,
  setTableData,
  showRowEditor,
  selectedLanguage,
  fieldRegister,
  formControl,
}) => {
  const { remove } = useFieldArray({
    name: "languages",
    control: formControl,
  });

  return (
    <table className="flex flex-col border w-full mt-4">
      <thead className="bg-gray-100 p-2 border-b">
        <tr className="flex flex-row gap-4 ">
          <th className="w-full font-normal text-left">Language</th>
          <th className="w-full font-normal text-left">Level</th>
          <th className="w-full text-left"></th>
        </tr>
      </thead>
      <tbody>
        {languages.size > 0
          ? Array.from(languages.keys()).map((language, index) => (
              <tr className="flex text-gray-600 p-2 border-b" key={language}>
                <td
                  {...fieldRegister(`languages.${index}.name`, {
                    required: true,
                    value: language,
                  })}
                  className="flex w-full"
                >
                  {language}
                </td>
                <td
                  {...fieldRegister(`languages.${index}.level`, {
                    required: true,
                    value: languages.get(language),
                  })}
                  className="flex w-full"
                >
                  {languages.get(language)}
                </td>
                <td className="flex flex-row w-full gap-1 px-4">
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        selectedLanguage({
                          languageName: language,
                          languageLevel: languages.get(language)!,
                        });
                        showRowEditor(true);
                      }}
                    >
                      <Image
                        src="/icons/pencil.svg"
                        alt="edit"
                        width={16}
                        height={16}
                      />
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                        setTableData((prev) => {
                          prev.delete(language);
                          return new Map(prev);
                        });
                      }}
                    >
                      <Image
                        src="/icons/trash.svg"
                        alt="edit"
                        width={16}
                        height={16}
                      />
                    </button>
                  </span>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default LanguageDataTable;
