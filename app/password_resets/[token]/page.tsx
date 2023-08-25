import { FC } from "react";
import { redirect } from "next/navigation";
import { PasswordResetLinkValidator } from "@/types/passwordReset.types";
import { db } from "@/lib/db";
import PasswordResetForm from "@/components/auth/PasswordResetForm";

interface PasswordResetPageProps {
  params: {
    token: string;
  };
  searchParams: {
    email: string;
  };
}

const PasswordResetPage: FC<PasswordResetPageProps> = async ({
  params,
  searchParams,
}: PasswordResetPageProps) => {
  const token = params.token;
  const email = searchParams.email;

  const findToken = async () => {
    "use server";
    const resetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
        userEmail: email,
        createdAt: {
          gte: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours
        },
      },
    });
    if (!resetToken) {
      return false;
    } else {
      return true;
    }
  };

  const isValid = PasswordResetLinkValidator.parseAsync({ token, email })
    .then(async () => await findToken())
    .catch((e) => {
      return false;
    });

  return (
    <section className="flex flex-col container w-screen h-screen overflow-x-hidden bg-neutral-100">
      {(await isValid) ? (
        <PasswordResetForm userEmail={email} />
      ) : (
        redirect("/")
      )}
    </section>
  );
};

export default PasswordResetPage;
