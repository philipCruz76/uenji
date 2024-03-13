type GigWizardPricingColumnProps = {};

const GigWizardPricingColumn = ({}: GigWizardPricingColumnProps) => {
  return (
    <table className="flex flex-col border bg-zinc-50 desktop:h-fit desktop:w-[800px]">
      <thead>
        <tr className="grid h-[65px] grid-cols-4 grid-rows-1 justify-center  ">
          <th className="col-span-1 bg-slate-50" />
          <th className="col-span-1 border-[0.5px]  border-gray-300 bg-gray-100 px-[20px] py-[16px] text-start font-medium">
            Basic
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Title */}
        <tr className="grid h-[70px] grid-cols-4 ">
          <td className="col-span-1 border-b bg-slate-50">
            <span className="flex h-full  w-full items-center px-[8px]  text-sm">
              Title{" "}
            </span>
          </td>
          <td className="col-span-1">
            <input
              type="text"
              placeholder="Basic package"
              className="h-full w-full rounded-md text-sm outline-none"
            />
          </td>
        </tr>

        {/* Description */}
        <tr className="grid h-[70px] grid-cols-4 ">
          <td className="col-span-1 w-full border-b bg-slate-50">
            <span className="flex h-full  w-full items-center px-[8px]  text-sm">
              Description{" "}
            </span>
          </td>
          <td className="col-span-1">
            <textarea
              className="h-full w-full rounded-md text-sm outline-none"
              placeholder="Describe your basic package here..."
              rows={3}
            />
          </td>
        </tr>

        {/* Delivery Time */}
        <tr className="grid h-[70px] grid-cols-4 ">
          <td className="col-span-1 border-b bg-slate-50">
            <span className="flex h-full  w-full items-center px-[8px]  text-sm">
              Delivery Time{" "}
            </span>
          </td>
          <td className="col-span-1">
            <input
              type="number"
              className="h-full w-full rounded-md  outline-none"
            />
          </td>
        </tr>
        {/* Revision */}
        <tr className="grid h-[70px] grid-cols-4 ">
          <td className="col-span-1 border-b bg-slate-50">
            <span className="flex h-full  w-full items-center px-[8px]  text-sm">
              {" "}
              Number of Revisions{" "}
            </span>
          </td>
          <td className="col-span-1">
            <input
              type="number"
              className="h-full w-full rounded-md  outline-none"
            />
          </td>
        </tr>
        {/* Price */}
        <tr className="grid h-[70px] grid-cols-4">
          <td className="col-span-1 border-b bg-slate-50 ">
            <span className="flex h-full  w-full items-center px-[8px]  text-sm">
              Price
            </span>
          </td>
          <td className="col-span-1">
            <input
              type="number"
              className="h-full w-full rounded-md  outline-none"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GigWizardPricingColumn;
