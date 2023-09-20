import getCurrentUser from "@/lib/actions/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadFileRouter = {
  fileUploader: f({ blob: { maxFileSize: "512MB", maxFileCount: 10 } })
    .middleware(async () => {
      const user = await getCurrentUser();
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type UploadFileRouter = typeof uploadFileRouter;
