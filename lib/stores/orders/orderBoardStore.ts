import { UserOrders } from "@/types/common.types";
import { produce } from "immer";
import { create } from "zustand";

type BoardSections = {
  [name: string]: UserOrders;
};

type BoardSectionStore = {
  boardSections: BoardSections;
  currentOrderId: string;
  getCurrentOrderId: () => string;
  setCurrentOrderId: (orderId: string) => void;
  setBoardSections: (boardSections: BoardSections) => void;
  getBoardSection: (section: string) => UserOrders;
  updateSection: (section: string, orders: UserOrders) => void;
};

export const useBoardSectionStore = create<BoardSectionStore>()((set, get) => ({
  boardSections: {
    late: [],
    active: [],
    review: [],
    accepted: [],
    cancelled: [],
  },
  currentOrderId: "",
  getCurrentOrderId: () => get().currentOrderId,
  setCurrentOrderId: (orderId) =>
    set(
      produce((state) => {
        state.currentOrderId = orderId;
      }),
    ),
  setBoardSections: (boardSections: BoardSections) =>
    set(
      produce((state) => {
        state.boardSections = boardSections;
      }),
    ),
  getBoardSection: (section) => get().boardSections[section],
  updateSection: (section, orders) =>
    set(
      produce((state) => {
        state.boardSections[section] = orders;
      }),
    ),
}));
