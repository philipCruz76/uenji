import db from "@/lib/db";
import { FC } from "react";
import { redirect } from "next/navigation";
import { ActivateLinkParamsValidator } from "@/types/activateLink.types";
import { activateUser } from "@/lib/actions/auth/activateUser";

type ActivateLinkPageProps = {
  params: {
    token: string;
  };
  searchParams: {
    email: string;
  };
};

const ActivateLinkPage: FC<ActivateLinkPageProps> = async ({
  params,
  searchParams,
}: ActivateLinkPageProps) => {
  const activateLinkParams = {
    token: params.token,
    email: searchParams.email,
  };

  async function activateViaLink() {
    "use server";

    if (!activateLinkParams.token || !activateLinkParams.email) {
      return;
    }

    const { token, email } = activateLinkParams;
    const user = await db.user.findUnique({
      where: {
        email,
        active: false,
        activateToken: {
          some: {
            activationLink: token,
            userEmail: email,
            activatedAt: null,
            createdAt: {
              gte: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
            },
          },
        },
      },
    });

    if (!user) {
      console.error("USER_ACTIVATION_LINK_ERROR");
    } else {
      activateUser(email, token, true);
    }
    redirect("/");
  }
  const isValid = ActivateLinkParamsValidator.parseAsync(activateLinkParams)
    .then(() => {
      activateViaLink();
      return true;
    })
    .catch((e) => {
      redirect("/");
    });

  return (
    <section className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center">
      {(await isValid) ? redirect("/") : null}
    </section>
  );
};

export default ActivateLinkPage;
