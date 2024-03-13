import { S3Client } from "@aws-sdk/client-s3";

const s3Singleton = () => {
  return new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
  });
};

declare global {
  // eslint-disable-next-line  no-var, no-unused-vars
  var chachedS3: undefined | ReturnType<typeof s3Singleton>;
}

const s3 = globalThis.chachedS3 ?? s3Singleton();

export default s3;

if (process.env.NODE_ENV === "development") {
  globalThis.chachedS3 = s3;
}
