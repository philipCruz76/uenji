import { SellerInfo } from "@/types/sellerProfile.types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

type DataTableProps = {
  initialInput: Map<string, string>;
  setTableData: Dispatch<SetStateAction<Map<string, string>>>;
  showRowEditor: Dispatch<SetStateAction<boolean>>;
  selectetField: Dispatch<
    SetStateAction<{ fieldName: string; fieldLevel: string }>
  >;
  fieldRegister: UseFormRegister<SellerInfo>;
  formControl: Control<SellerInfo>;
  fieldName: string;
};

function DataTable({
  initialInput,
  setTableData,
  showRowEditor,
  selectetField,
  fieldRegister,
  formControl,
  fieldName,
}: DataTableProps) {
  let fieldToRegister: "languages" | "skills";
  let tableTitle: string;

  switch (fieldName) {
    case "languages":
      fieldToRegister = "languages";
      tableTitle = "Language";
      break;
    case "skills":
      fieldToRegister = "skills";
      tableTitle = "Skill";
      break;
    default:
      break;
  }

  const { remove } = useFieldArray({
    name: fieldName === "languages" ? "languages" : "skills",
    control: formControl,
  });

  return (
    <table className="flex flex-col border w-full mt-4">
      <thead className="bg-gray-100 p-2 border-b">
        <tr className="flex flex-row gap-4 ">
          <th className="w-full font-normal text-left">
            {fieldName === "languages" ? "Language" : "Skill"}
          </th>
          <th className="w-full font-normal text-left">Level</th>
          <th className="w-full text-left"></th>
        </tr>
      </thead>
      <tbody>
        {initialInput.size > 0
          ? Array.from(initialInput.keys()).map((input, index) => (
              <tr className="flex text-gray-600 p-2 border-b" key={input}>
                <td
                  {...fieldRegister(`${fieldToRegister}.${index}.name`, {
                    required: true,
                    value: input,
                  })}
                  className="flex w-full"
                >
                  {input}
                </td>
                <td
                  {...fieldRegister(`${fieldToRegister}.${index}.level`, {
                    required: true,
                    value: initialInput.get(input),
                  })}
                  className="flex w-full"
                >
                  {initialInput.get(input)}
                </td>
                <td className="flex flex-row w-full gap-1 px-4">
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        selectetField({
                          fieldName: input,
                          fieldLevel: initialInput.get(input)!,
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
