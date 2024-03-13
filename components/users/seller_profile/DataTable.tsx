import { SellerInfo } from "@/types/sellerProfile.types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

type DataTableProps = {
  initialInput: Map<string, string>;
  setTableData: Dispatch<SetStateAction<Map<string, string>>>;
  showRowEditor: Dispatch<SetStateAction<boolean>>;
  selectedField: Dispatch<
    SetStateAction<{
      fieldName: string;
      institutionName?: string;
      educationCountry?: string;
      educationLevel?: string;
      fieldLevel: string;
    }>
  >;
  fieldRegister: UseFormRegister<SellerInfo>;
  formControl: Control<SellerInfo>;
  fieldName: string;
};

function DataTable({
  initialInput,
  setTableData,
  showRowEditor,
  selectedField,
  fieldRegister,
  formControl,
  fieldName,
}: DataTableProps) {
  let fieldToRegister: "languages" | "skills" | "education" | "certifications";
  let column1Name = "";
  let column2Name = "";

  switch (fieldName) {
    case "languages":
      fieldToRegister = "languages";
      column1Name = "Language";
      column2Name = "Level";
      break;
    case "skills":
      fieldToRegister = "skills";
      column1Name = "Skill";
      column2Name = "Level";
      break;
    case "education":
      fieldToRegister = "education";
      column1Name = "Education";
      column2Name = "Year";
      break;
    case "certifications":
      fieldToRegister = "certifications";
      column1Name = "Certification";
      column2Name = "Year";
      break;
    default:
      break;
  }

  const { remove } = useFieldArray({
    name:
      fieldName === "languages"
        ? "languages"
        : fieldName === "skills"
          ? "skills"
          : fieldName === "education"
            ? "education"
            : "certifications",
    control: formControl,
  });

  return (
    <table className="mt-4 flex w-full flex-col border">
      <thead className="border-b bg-gray-100 p-2">
        <tr className="flex flex-row gap-4 ">
          <th className="w-full text-left font-normal">{column1Name}</th>
          <th className="w-full text-left font-normal">{column2Name}</th>
          <th className="w-full text-left"></th>
        </tr>
      </thead>
      <tbody>
        {initialInput.size > 0
          ? Array.from(initialInput.keys()).map((input, index) => (
              <tr className="flex border-b p-2 text-gray-600" key={input}>
                {fieldToRegister === "education" ? (
                  <td
                    {...fieldRegister(`${fieldToRegister}.${index}.degree`, {
                      required: true,
                      value: input,
                    })}
                    className="flex w-full"
                  >
                    {input}
                  </td>
                ) : (
                  <td
                    {...fieldRegister(`${fieldToRegister}.${index}.name`, {
                      required: true,
                      value: input,
                    })}
                    className="flex w-full"
                  >
                    {input}
                  </td>
                )}

                {fieldToRegister === "certifications" ? (
                  <td
                    {...fieldRegister(
                      `${fieldToRegister}.${index}.institution`,
                      {
                        required: true,
                        value: initialInput.get(input)?.split(";")[1],
                      },
                    )}
                    {...fieldRegister(`${fieldToRegister}.${index}.year`, {
                      required: true,
                      value: initialInput.get(input)?.split(";")[0],
                    })}
                    className="flex w-full"
                  >
                    {initialInput.get(input)?.split(";")[0]}
                  </td>
                ) : fieldToRegister === "education" ? (
                  <td
                    {...fieldRegister(
                      `${fieldToRegister}.${index}.educationLevel`,
                      {
                        required: true,
                        value: initialInput.get(input)?.split(";")[3],
                      },
                    )}
                    {...fieldRegister(
                      `${fieldToRegister}.${index}.institution`,
                      {
                        required: true,
                        value: initialInput.get(input)?.split(";")[1],
                      },
                    )}
                    {...fieldRegister(`${fieldToRegister}.${index}.country`, {
                      required: true,
                      value: initialInput.get(input)?.split(";")[2],
                    })}
                    {...fieldRegister(`${fieldToRegister}.${index}.year`, {
                      required: true,
                      value: initialInput.get(input)?.split(";")[0],
                    })}
                    className="flex w-full"
                  >
                    {initialInput.get(input)?.split(";")[0]}
                  </td>
                ) : (
                  <td
                    {...fieldRegister(`${fieldToRegister}.${index}.level`, {
                      required: true,
                      value: initialInput.get(input),
                    })}
                    className="flex w-full"
                  >
                    {initialInput.get(input)}
                  </td>
                )}

                <td className="flex w-full flex-row gap-1 px-4">
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        if (fieldToRegister === "certifications") {
                          const [certificationYear, institutionName] =
                            initialInput.get(input)!.split(";");

                          selectedField({
                            fieldName: input,
                            institutionName: institutionName,
                            fieldLevel: certificationYear,
                          });
                        } else if (fieldToRegister === "education") {
                          const [
                            educationYear,
                            institutionName,
                            educationCountry,
                            educationLevel,
                          ] = initialInput.get(input)!.split(";");
                          selectedField({
                            fieldName: input,
                            institutionName: institutionName,
                            educationCountry: educationCountry,
                            educationLevel: educationLevel,
                            fieldLevel: educationYear,
                          });
                        } else {
                          selectedField({
                            fieldName: input,
                            fieldLevel: initialInput.get(input)!,
                          });
                        }

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
                          prev.delete(input);
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
}

export default DataTable;
