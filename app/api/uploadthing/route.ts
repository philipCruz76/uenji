import { createNextRouteHandler } from "uploadthing/next";
import { uploadFileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createNextRouteHandler({
  router: uploadFileRouter,
});
