import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { username } = params;
  const session = await getAuthSession();

  const dbUsername = await db.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!dbUsername) {
    return notFound();
  }

  return (
    <>
      <div className="flex w-full h-[800px]">
        This will be the User page for user {username} !!
      </div>
    </>
  );
};
