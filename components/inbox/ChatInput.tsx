"use client";
import { UploadFileRouter } from "@/app/api/uploadthing/core";
import { MessageAttachment, useMessageAttachmentStore } from "@/lib/stores/messageAttachement-store";
import { User } from "@prisma/client";
import { generateComponents } from "@uploadthing/react";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutoSize from "react-textarea-autosize";

type ChatInputProps = {
  chatPartner: User;
  chatId: string;
  onChange?: (url?: string) => void;
};
const { UploadButton } = generateComponents<UploadFileRouter>();

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const sendMessage = (fileURL?: string, filename?:string, fileSize?:number) => {
    if(fileURL) {
      const message =fileURL.concat(";fileName=", filename!, ";fileSize=", fileSize!.toString());
      fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ text: message, chatId }),
      }).catch((error) => {
        toast.error(error.message);
      });
      setInput("");
      textareaRef.current?.focus();
      return;
    }

    if (!input) return;

    fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ text: input, chatId }),
    }).catch((error) => {
      toast.error(error.message);
    });

    setInput("");
    textareaRef.current?.focus();
  };
  return (
    <div className="flex flex-row border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex flex-1 overflow-hidden rounded-lg ">
        <TextareaAutoSize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message @${chatPartner.username}`}
          className="flex w-full h-full p-2 border-0 outline-none resize-none"
        />
        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
        <button className="flex flex-row relative max-w-[35px] max-h-[35px] desktop:max-w-full desktop:max-h-full desktop:top-0 top-[8px]">
          <div className="hidden desktop:flex flex-wrap flex-row  items-center text-center justify-center text-xs cursor-text text-gray-500">
            <span>Files up to 1GB,</span>
            <span> max 10 files</span>
          </div>
          <UploadButton
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              toast.success("Upload complete!");
              res?.map((attachment) => {
                sendMessage(attachment.url, attachment.name, attachment.size);
              });
            }}
            onUploadError={(err) => toast.error(err.message)}
            className=" w-fit flex flex-row-reverse overflow-auto ut-button:bg-none ut-allowed-content:cursor-text ut-button:px-2 ut-button:hover:bg-gray-200 ut-button:hover:rounded-full ut-allowed-content:hidden ut-button:hover:shadow-sm "
            content={{
              button({ isUploading }) {
                return !isUploading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="#98979b"
                    viewBox="0 0 256 256"
                    className=" hover:fill-black"
                  >
                    <path d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#767874"
                    viewBox="0 0 256 256"
                    className="animate-spin"
                  >
                    <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
                  </svg>
                );
              },
            }}
          />
        </button>
        <button
          name="send message"
          className="flex relative h-[40px] top-[8px] rounded-full  items-center  hover:bg-gray-200 hover:rounded-full hover:shadow-sm px-2  cursor-pointer "
          onClick={() => sendMessage()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="#ccc"
            viewBox="0 0 256 256"
            transform="scale(-1, 1)"
            className=" hover:fill-black"
          >
            <path d="M229.33,98.21,53.41,33l-.16-.05A16,16,0,0,0,32.9,53.25a1,1,0,0,0,.05.16L98.21,229.33A15.77,15.77,0,0,0,113.28,240h.3a15.77,15.77,0,0,0,15-11.29l23.56-76.56,76.56-23.56a16,16,0,0,0,.62-30.38ZM224,113.3l-76.56,23.56a16,16,0,0,0-10.58,10.58L113.3,224h0l-.06-.17L48,48l175.82,65.22.16.06Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
