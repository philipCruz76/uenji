import { create } from "zustand";

export type MessageAttachment = {
  name: string;
  size: number;
  url: string;
};

type MessageAttachmentState = {
    file: MessageAttachment;
    setFile: (file: MessageAttachment ) => void;
};

export const useMessageAttachmentStore = create<MessageAttachmentState>()((set) => ({
    file: {} as MessageAttachment,
    setFile: (file: MessageAttachment ) => set({ file }),
}));
