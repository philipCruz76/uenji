"use client";

import { cn } from "@/lib/utils";
import { UserOrders } from "@/types/common.types";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import OrderTask from "./OrderTask";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableOrderTask from "./SortableOrderTask";

type OrderColumnProps = {
  columnId: string;
  columnTitle: string;
  items: UserOrders;
};

const OrderColumn = ({ columnId, columnTitle, items }: OrderColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });
  return (
    <div
      className={cn(
        " relative  min-h-[500px] min-w-[300px] max-w-[300px] items-center justify-center rounded-xl bg-[#f8f9fa]   px-2 py-8 text-start",
        isOver ? "bg-green-400 bg-opacity-25" : null,
      )}
    >
      <label className=" relative top-[-20px] px-4 text-lg">
        {columnTitle}
      </label>

      {columnId === "accepted" || columnId==="late" ?   (
        <div className="flex flex-col gap-2">
          {items.length > 0
            ? items.map((item) => <OrderTask order={item} />)
            : null}
        </div>
      ): (
        <SortableContext
          items={items}
          id={columnId}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="flex flex-col gap-2">
            {items.length > 0
              ? items.map((item) => (
                  <SortableOrderTask key={item.id} id={item.id}>
                    <OrderTask order={item} />
                  </SortableOrderTask>
                ))
              : null}
          </div>
        </SortableContext>
      )}
    </div>
  );
};

export default OrderColumn;
