import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useBoardSectionStore } from "@/lib/stores/orders/orderBoardStore";

type CancelOrderModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  prevContainer: string;
  prevPosition: number;
};

const CancelOrderModal = ({
  openModal,
  setOpenModal,
  prevContainer,
  prevPosition,
}: CancelOrderModalProps) => {
  const { boardSections, updateSection, getBoardSection, getCurrentOrderId } =
    useBoardSectionStore();

  const handleCancel = () => {
    toast.success(prevContainer + " " + prevPosition);
    if (prevContainer === "cancelled") {
      setOpenModal(false);
      return;
    }
    const newArray = [
      ...getBoardSection(prevContainer).slice(0, prevPosition),
      boardSections.cancelled.find(
        (order) => order.id === getCurrentOrderId(),
      )!,
      ...getBoardSection(prevContainer).slice(prevPosition),
    ];
    updateSection(
      "cancelled",
      getBoardSection("cancelled").filter(
        (order) => order.id !== getCurrentOrderId(),
      ),
    );

    updateSection(prevContainer, newArray);

    setOpenModal(false);
  };
  return (
    <Dialog open={openModal}>
      <DialogContent className="rounded-md">
        <DialogTitle className="flex flex-row items-center justify-center gap-2 text-start font-sans text-2xl font-bold">
          <svg
            className="h-[80px] w-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            id="warning"
          >
            <g>
              <path
                fill="#fc6d6d"
                d="M21,14l-2.8,5c-0.7,1.3-2,2-3.5,2H9.3c-1.4,0-2.8-0.8-3.5-2l-0.3-0.5L3,14c-0.7-1.2-0.7-2.7,0-3.9l2.8-5
		c0.7-1.3,2-2,3.5-2h5.5c1.4,0,2.8,0.8,3.5,2l0.3,0.5L21,10C21.7,11.3,21.7,12.8,21,14z"
              ></path>
              <path
                fill="#fff"
                d="M12,14c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1v5C13,13.6,12.6,14,12,14z"
              ></path>
              <circle cx="12" cy="16" r="1" fill="#fff"></circle>
              <path
                d="M21,14l-2.8,5c-0.7,1.3-2,2-3.5,2H9.3c-1.4,0-2.8-0.8-3.5-2l-0.3-0.5l13-13L21,10C21.7,11.3,21.7,12.8,21,14z"
                opacity=".1"
              ></path>
            </g>
          </svg>
          <h3>Are you sure you would like to cancel this order?</h3>
        </DialogTitle>
        <DialogHeader>
          <DialogDescription className="font-sans text-lg">
            Please write why you want to cancel this order. This message will be
            sent to the buyer and the money will be returned to them.
          </DialogDescription>
        </DialogHeader>
        <form className="flex items-center space-x-2">
          <textarea
            id="deliveryMessage"
            onInput={(e) => {
              toast.success(e.currentTarget.value);
            }}
            placeholder="Write a message to the buyer"
            className="focus:ring-primary-500 w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2"
          />
        </form>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
          <X
            onClick={() => setOpenModal(false)}
            className="h-4 w-4 hover:scale-110"
          />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogFooter className="sm:justify-start gap-2">
          <DialogClose asChild>
            <Button
              onClick={handleCancel}
              type="button"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                " hover:bg-slate-200 hover:shadow-md",
              )}
            >
              Close
            </Button>
          </DialogClose>
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-red-500 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-md",
            )}
          >
            Cancel Order
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderModal;
