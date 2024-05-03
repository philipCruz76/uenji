"use client";
import { UserOrders } from "@/types/common.types";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
  TouchSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import OrderColumn from "./OrderColumn";
import { useState } from "react";

import OrderTask from "./OrderTask";
import { useTranslations } from "next-intl";
import ReviewOrderModal from "./ReviewOrderModal";

type SellerOrderPageProps = {
  orders: UserOrders;
};

export type BoardSections = {
  [name: string]: UserOrders;
};
const SellerOrderPage = ({ orders }: SellerOrderPageProps) => {
  const orderTableText = useTranslations("Orders.ordersTable");
  const [showOrderReviewModal, setShowOrderReviewModal] = useState(false);
  const [showActiveOrderModal, setShowActiveOrderModal] = useState(false);
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const activeOrders = orders.filter((order) => order.status === "active");
  const reviewOrders = orders.filter((order) => order.status === "review");
  const acceptedOrders = orders.filter((order) => order.status === "accepted");
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled",
  );
  const lateOrders = orders.filter((order) => order.status === "late");
  const [boardSections, setBoardSections] = useState<BoardSections>({
    late: lateOrders,
    active: activeOrders,
    review: reviewOrders,
    accepted: acceptedOrders,
    cancelled: cancelledOrders,
  });
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findBoardSectionContainer = (
    boardSections: BoardSections,
    id: string,
  ) => {
    if (id in boardSections) {
      return id;
    }

    const container = Object.keys(boardSections).find((key) =>
      boardSections[key].find((item) => item.id === id),
    );
    return container;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id,
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id,
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length,
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id,
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id,
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
      if(overContainer === "review"){
        setShowOrderReviewModal(true);
      }
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const findOrderById = (orders: UserOrders, id: string) => {
    return orders.find((order) => order.id === id);
  };

  const task = activeTaskId ? findOrderById(orders, activeTaskId) : null;
  return (
    <div className="flex h-full w-full flex-col overflow-x-scroll pt-[14px]">
      <button
        onClick={() => {
          console.log("clicked");
        }}
        className="group flex h-[50px] w-full items-center justify-center gap-4 rounded-lg border-[#495057]  bg-[#dee2e6] text-center font-mono font-semibold transition duration-200 ease-in-out hover:scale-105 tablet:absolute tablet:right-8 tablet:top-[150px] tablet:w-[200px]"
      >
        <span className="text-ellipsis tablet:w-[60%]">
          {orderTableText("saveButton")}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM168,208H88V152h80Zm40,0H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h56A8,8,0,0,1,160,72Z"></path>
        </svg>
      </button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-row gap-2">
          {Object.keys(boardSections).map((section) => (
            <OrderColumn
              key={section}
              items={boardSections[section]}
              columnId={section}
              columnTitle={orderTableText(section)}
            />
          ))}

          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <OrderTask order={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
      <ReviewOrderModal
        openModal={showOrderReviewModal}
        setOpenModal={setShowOrderReviewModal}
        />
    </div>
  );
};

export default SellerOrderPage;
