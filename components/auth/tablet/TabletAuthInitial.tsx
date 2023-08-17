import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { useCallback } from "react";
import { signInText, signUpText } from "@/constants/auth/signInConstants";
import AppleButton from "../signIn/AppleButton";
import EmailCredentialsButton from "../signIn/EmailCredentialsButton";
import FacebookButton from "../signIn/FacebookButton";
import GoogleButton from "../signIn/GoogleButton";

const TabletAuthInitial = () => {
  let { isLogin, setLogin } = useLogInVariantStore();

  const toggleVariant = useCallback(() => {
    if (isLogin === "login") {
      setLogin("register");
    } else {
      setLogin("login");
    }
  }, [isLogin]);

  return (
    <div className="flex flex-col space-y-3 text-left mt-12 px-3">
      <p className="text-2xl font-semibold">
        {isLogin === "login" ? signInText.title : signUpText.title}
      </p>
      <div className="flex text-base font-extralight text-slate-500 space-x-1">
        <p>{isLogin === "login" ? signInText.subtext : signUpText.subtext}</p>
        <a className="underline cursor-pointer" onClick={toggleVariant}>
          {isLogin === "login"
            ? signInText.hyperlinkText
            : signUpText.hyperlinkText}
        </a>
      </div>

      {/* Auth buttons */}
      <div className="flex flex-col py-10 space-y-2 items-start font-semibold text-sm">
        <EmailCredentialsButton />

        <GoogleButton />

        <div className="flex w-full py-4 items-center justify-center text-center font-extralight text-slate-400">
          <p>OR</p>
        </div>

        <div className="flex flex-row space-x-2 justify-center items-center mx-2 ">
          <FacebookButton />

          <AppleButton />
        </div>
      </div>
    </div>
  );
};

export default TabletAuthInitial;
