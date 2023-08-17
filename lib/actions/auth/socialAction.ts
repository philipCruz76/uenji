import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export const socialAction = (action: string) => {
  signIn(action, { redirect: false }).then((callback) => {
    if (callback?.error) {
      toast.error("Invalid Credentials");
    }
  });
};
