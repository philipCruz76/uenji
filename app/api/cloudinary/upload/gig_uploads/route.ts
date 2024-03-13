import getCurrentUser from "@/lib/actions/getCurrentUser";
import { reject } from "lodash";
import { NextResponse } from "next/server";

type UploadResult = {
  url: string;
};
export async function POST(request: Request) {
  try {
    const cloudinary = require("cloudinary").v2;
    const searchParams = new URL(request.url).searchParams;

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });

    const user = await getCurrentUser();
    const gigName = searchParams.get("gigName");
    const photoNumber = searchParams.get("photoNumber");
    if (!user || !user.username || !gigName || !photoNumber) {
      throw new Error(
        "Error: User not found or gigName or photoNumber not provided.",
      );
    }

    const userName = user.username;

    const arrayBuffer = await request.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const result: UploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "gig_uploads",
            upload_preset: "ml_default",
            overwrite: true,
            public_id: userName + "/" + gigName + "_gig_picture_" + photoNumber,
          },
          function (error: any, result: any) {
            if (error) {
              return reject(error);
            }

            return resolve({
              url: cloudinary.url(result.public_id, {
                version: result.version,
                secure: true,
                fetch_format: "auto",
                sign_url: true,
              }),
            });
          },
        )
        .end(buffer);
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("Cloudinary upload error: ", error);
  }
}
