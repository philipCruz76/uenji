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
import { useEffect, useState } from "react";

import OrderTask from "./OrderTask";
import { useTranslations } from "next-intl";
import ReviewOrderModal from "./ReviewOrderModal";
import { useBoardSectionStore } from "@/lib/stores/orders/orderBoardStore";
import CancelOrderModal from "./CancelOrderModal";

type SellerOrderPageProps = {
  orders: UserOrders;
};

export type BoardSections = {
  [name: string]: UserOrders;
};
const SellerOrderPage = ({ orders }: SellerOrderPageProps) => {
  const orderTableText = useTranslations("Orders.ordersTable");
  const [showOrderReviewModal, setShowOrderReviewModal] = useState(false);
  const [prevContainer, setPrevContainer] = useState<string>("");
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [showActiveOrderModal, setShowActiveOrderModal] = useState(false);
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const activeOrders = orders.filter((order) => order.status === "active");
  const reviewOrders = orders.filter((order) => order.status === "review");
  const acceptedOrders = orders.filter((order) => order.status === "accepted");
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled",
  );
  const lateOrders = orders.filter((order) => order.status === "late");
  const {
    boardSections,
    setBoardSections,
    updateSection,
    getBoardSection,
    setCurrentOrderId,
    getCurrentOrderId,
  } = useBoardSectionStore();

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

  useEffect(() => {
    setBoardSections({
      late: lateOrders,
      active: activeOrders,
      review: reviewOrders,
      accepted: acceptedOrders,
      cancelled: cancelledOrders,
    });
  }, []);
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

    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string,
    );
    if (!activeContainer) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id,
    );
    setPrevIndex(activeIndex);
    setPrevContainer(activeContainer);
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

    const activeItems = getBoardSection(activeContainer);
    const overItems = getBoardSection(overContainer);

    const activeIndex = activeItems.findIndex((item) => item.id === active.id);
    const overIndex = overItems.findIndex((item) => item.id !== over?.id);

    updateSection(activeContainer, [
      ...activeItems.filter((item) => item.id !== active.id),
    ]);
    updateSection(overContainer, [
      ...overItems.slice(0, overIndex),
      boardSections[activeContainer][activeIndex],
      ...overItems.slice(overIndex, overItems.length),
    ]);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setCurrentOrderId(activeTaskId as string);
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
      updateSection(
        overContainer,
        arrayMove(getBoardSection(overContainer), activeIndex, overIndex),
      );

      if (overContainer === "review") {
        setShowOrderReviewModal(true);
      }
      if (overContainer === "cancelled") {
        setShowCancelOrderModal(true);
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
        prevContainer={prevContainer}
        prevPosition={prevIndex}
      />
      <CancelOrderModal
        openModal={showCancelOrderModal}
        setOpenModal={setShowCancelOrderModal}
        prevContainer={prevContainer}
        prevPosition={prevIndex}
      />
    </div>
  );
};

export default SellerOrderPage;
