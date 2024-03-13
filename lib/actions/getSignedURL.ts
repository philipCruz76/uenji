"use server";

import getCurrentUser from "@/lib/actions/getCurrentUser";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateRnadomFileName } from "@/lib/utils";
import s3 from "@/lib/s3";

const maxFileSize = 1024 * 1024 * 1024; // 1GB
const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "image/svg",
  "image/webp",
  "image/tiff",
  "image/bmp",
  "image/ico",
  "image/cur",
  "video/mp4",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",
  "video/x-flv",
  "video/x-matroska",
  "video/mpeg",
  "video/x-m4v",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/x-rar-compressed",
  "application/x-gzip",
];

export async function getSignedURL(
  fileType: string,
  fileSize: number,
  checksum: string,
) {
  const user = await getCurrentUser();
  const currentDate = new Date(Date.now()).toISOString().split("T")[0];

  if (!user) {
    return { error: "Unauthorized" };
  }
  if (!acceptedTypes.includes(fileType)) {
    return { error: "File type not accepted" };
  }
  if (fileSize > maxFileSize) {
    return { error: "Maximum file size exceeded" };
  }

  const putObjectS3 = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: `uploads/${user.username}/${currentDate}/${await generateRnadomFileName()}`,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });

  const signedURL = await getSignedUrl(s3, putObjectS3, { expiresIn: 60 });

  return { success: { url: signedURL } };
}
