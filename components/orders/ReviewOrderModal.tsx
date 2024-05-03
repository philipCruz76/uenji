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

type ReviewOrderModalProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

const ReviewOrderModal = ({
  openModal,
  setOpenModal,
}: ReviewOrderModalProps) => {
  return (
    <Dialog open={openModal}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="font-sans text-2xl font-bold">
            Are you ready to deliver this order?
          </DialogTitle>
          <DialogDescription className="font-sans text-lg">
            Please write a message to the buyer and attach the items you are
            delivering.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <input
            id="link"
            type="text"
            placeholder="Write a message to the buyer"
            className="focus:ring-primary-500 w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2"
          />
        </div>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
          <X onClick={() => setOpenModal(false)} className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={() => setOpenModal(false)}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Deliver
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewOrderModal;
