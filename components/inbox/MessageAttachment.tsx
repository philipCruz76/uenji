"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface MessageAttachmentProps {
  fileUrl: string;
}

const MessageAttachment: FC<MessageAttachmentProps> = ({ fileUrl }) => {
  let isImage = false;
  const fileLink = fileUrl.match(/^[^;]+/)?.[0];
  const fileType = fileLink?.split(".").pop();
  const fileName = fileUrl.match(/fileName=([^;]+)/)?.[1];
  let fileSize = fileUrl.match(/fileSize=([^;]+)/)?.[1];

  if (!fileLink || !fileType || !fileName || !fileSize)
    return <div>Something went wrong with the file attachment {fileUrl}</div>;

  const fileSizeNumeric = parseInt(fileSize);

  if (fileSizeNumeric > 1000000000) {
    fileSize = fileSizeNumeric / 1073741824 + " GB";
  } else if (fileSizeNumeric > 1000000) {
    fileSize = (fileSizeNumeric / 1048576).toFixed(2) + " MB";
  } else if (fileSizeNumeric > 1000) {
    fileSize = (fileSizeNumeric / 1024).toFixed(2) + " KB";
  }

  if (
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg" ||
    fileType === "gif"
  )
    isImage = true;

  return isImage === true ? (
    <div className="flex flex-col gap-2">
      <Image
        src={fileLink}
        alt="Uploaded Image Attachment"
        height="160"
        width="160"
        className="object-cover hover:scale-110 transition translate rounded-md"
      />
      <Link
        href={fileLink}
        className="text-xs hover:underline flex flex-row gap-1 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#0e0e0e"
          viewBox="0 0 256 256"
        >
          <path d="M50.34,117.66a8,8,0,0,1,11.32-11.32L120,164.69V32a8,8,0,0,1,16,0V164.69l58.34-58.35a8,8,0,0,1,11.32,11.32l-72,72a8,8,0,0,1-11.32,0ZM216,208H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
        </svg>
        Download ({fileName}, {fileSize})
      </Link>
    </div>
  ) : (
    <div className="flex flex-col gap-2 h-[60px] border items-center justify-center rounded-md">
      <Link
        href={fileLink}
        className="text-xs hover:underline flex flex-row gap-1 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#0e0e0e"
          viewBox="0 0 256 256"
        >
          <path d="M50.34,117.66a8,8,0,0,1,11.32-11.32L120,164.69V32a8,8,0,0,1,16,0V164.69l58.34-58.35a8,8,0,0,1,11.32,11.32l-72,72a8,8,0,0,1-11.32,0ZM216,208H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
        </svg>
        Download ({fileName}, {fileSize})
      </Link>
    </div>
  );
};

export default MessageAttachment;
