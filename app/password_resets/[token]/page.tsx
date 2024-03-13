import { FC, lazy } from "react";
import { redirect } from "next/navigation";
import getPasswordResetToken from "@/lib/actions/getPasswordResetToken";

type PasswordResetPageProps = {
  params: {
    token: string;
  };
  searchParams: {
    email: string;
  };
};
const PasswordResetForm = lazy(
  () => import("@/components/auth/PasswordResetForm"),
);

const PasswordResetPage: FC<PasswordResetPageProps> = async ({
  params,
  searchParams,
}: PasswordResetPageProps) => {
  const token = params.token;
  const email = searchParams.email;

  const isValid = await getPasswordResetToken(token, email);

  return (
    <section className="container flex h-[100dvh] w-[100dvw] flex-col overflow-x-hidden bg-neutral-100">
      {(await isValid) ? (
        <PasswordResetForm userEmail={email} />
      ) : (
        redirect("/")
      )}
    </section>
  );
};

export default PasswordResetPage;
