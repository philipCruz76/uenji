"use client";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import toast from "react-hot-toast";
type OrderDownloadCardProps = {
  downloadFile: string;
};

const OrderDownloadCard = ({ downloadFile }: OrderDownloadCardProps) => {
  return (
    <Card>
      <CardContent className="w-[100px] h-[100px] gap-2 p-2 overflow-hidden">
        <button
          onClick={() => {
            fetch(`${downloadFile.split(";")[0]}`, {
              method: "GET",
              headers: {
                "Content-Type": "blob",
              },
            }).then(async (response) => {
              const result = await response.blob();
              const resultLink = document.createElement("a");
              resultLink.href = URL.createObjectURL(result);
              resultLink.setAttribute("download", downloadFile.split(";")[1]);
              resultLink.click();
            }).catch((error)=> {
                toast.error("Failed to download file");
            });
          }}
          className="flex flex-col gap-2 items-center justify-center w-full h-full"
        >
          <span className="text-sm text-blue-500 underline text-center">
            {" "}
            {downloadFile.split(";")[1]}
          </span>
          <Image
            alt="download-icon"
            src={"/icons/download.svg"}
            width={30}
            height={30}
            className="w-[30px] h-[30px]"
          />
        </button>
      </CardContent>
    </Card>
  );
};

export default OrderDownloadCard;
