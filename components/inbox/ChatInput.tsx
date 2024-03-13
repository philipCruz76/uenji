"use client";
import { getSignedURL } from "@/lib/actions/getSignedURL";
import { User } from "@prisma/client";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutoSize from "react-textarea-autosize";
import { Input } from "../ui/Input";
import { computeSHA256 } from "@/lib/utils";

type ChatInputProps = {
  chatPartner: User;
  chatId: string;
  onChange?: (url?: string) => void;
};

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const sendMessage = (
    fileURL?: string,
    filename?: string,
    fileSize?: number,
  ) => {
    if (fileURL) {
      const message = fileURL.concat(
        ";fileName=",
        filename!,
        ";fileSize=",
        fileSize!.toString(),
      );
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

  const handleSendFile = async (file: File) => {
    toast("Sending message...");

    const checksum = await computeSHA256(file);
    const signedURL = await getSignedURL(file.type, file.size, checksum);

    if (signedURL.error !== undefined) {
      toast.error(signedURL.error);
      return;
    }
    const url = signedURL.success.url;
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    })
      .then((res) => {
        const resultURL = new URL(res.url);
        const objectLocation = resultURL.origin + resultURL.pathname;

        sendMessage(objectLocation, file.name, file.size);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    toast.success("Message Sent!");
  };
  return (
    <form className="sm:mb-0 mb-2 flex flex-row border-t border-gray-200 px-4 pt-4">
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
          className="flex h-full w-full resize-none border-0 p-2 outline-none"
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
        <div className="relative top-[8px] flex max-h-[35px] max-w-[35px] flex-row desktop:top-0 desktop:max-h-full desktop:max-w-full">
          <div className="hidden cursor-text flex-row flex-wrap  items-center justify-center text-center text-xs text-gray-500 desktop:flex">
            <span>Files up to 1GB,</span>
            <span> max 10 files</span>
          </div>
          <button
            type="button"
            onClick={() => {
              document.getElementById("messageAttachment")?.click();
            }}
            className="flex  h-full items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="#98979b"
              viewBox="0 0 256 256"
              className=" hover:fill-black"
            >
              <title>Attach media</title>
              <path d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z"></path>
            </svg>
            <Input
              type="file"
              id="messageAttachment"
              accept="blob"
              max={10}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                const target = e.target as HTMLInputElement & {
                  files: FileList;
                };
                handleSendFile(target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </button>
        </div>
        <button
          name="send message"
          className="relative top-[8px] flex h-[40px] cursor-pointer  items-center  rounded-full px-2 hover:rounded-full hover:bg-gray-200  hover:shadow-sm "
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
    </form>
  );
};

export default ChatInput;
