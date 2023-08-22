
import { db } from "@/lib/db";
import { FC } from "react";
import { redirect } from "next/navigation";
import { ActivateLinkParamsValidator } from "@/types/activateLink.types";

type ActivateLinkPageProps = {
    params: {
        token: string
    },
    searchParams: {
        email: string
    }
}

const ActivateLinkPage: FC<ActivateLinkPageProps>= async({
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

    console.log("starting validation");
    const { token, email } = activateLinkParams;
    console.log("token", token);
    console.log("email", email);
    const user = await db.user.findUnique({
      where: {
        email,
        ActivateToken: {
          some: {
            activationLink: token,
            activatedAt: null,
            createdAt: {
              gte: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
            },
            userEmail: email,
          },
        },
      },
    });

    console.log("user", user);

    if (!user) {
        console.log("ACTIVATE_IVALID_LINK_ERROR")
      redirect("/")
    } else {
      console.log("user found");
    }
  }
  const isValid =
    ActivateLinkParamsValidator.parseAsync(activateLinkParams).then(()=> {
        return true;
    }).catch((e)=> {
        redirect("/");
    });

  
  return (
    <section>
      {await isValid ? (
        <div className="flex container py-20">
          <h1>Activate your account</h1>
          <p>Enter the code we sent to {activateLinkParams.email}</p>
          <form action={activateViaLink}>
            <input type="text" name="code" />
            <button type="submit">Activate</button>
          </form>
        </div>
      ) : null}
    </section>
  );
}

export default ActivateLinkPage;