import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const socialAction = (action: string) => {
  const router = useRouter();
  signIn(action, { redirect: false }).then((callback) => {
    if (callback?.error) {
      toast.error("Invalid Credentials");
    }

    if (callback?.ok) {
      router.push("/");
    }
  });
};
