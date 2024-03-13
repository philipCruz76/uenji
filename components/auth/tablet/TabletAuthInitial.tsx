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
    <div className="mt-12 flex flex-col space-y-3 px-3 text-left">
      <p className="text-2xl font-semibold">
        {isLogin === "login" ? signInText.title : signUpText.title}
      </p>
      <div className="flex space-x-1 text-base font-extralight text-slate-500">
        <p>{isLogin === "login" ? signInText.subtext : signUpText.subtext}</p>
        <a
          className="cursor-pointer rounded-md border border-[#495057] bg-[#495057] px-2 font-medium text-white shadow-md"
          onClick={toggleVariant}
        >
          {isLogin === "login"
            ? signInText.hyperlinkText
            : signUpText.hyperlinkText}
        </a>
      </div>

      {/* Auth buttons */}
      <div className="flex w-full flex-col items-start space-y-2 py-10 text-sm font-semibold">
        <EmailCredentialsButton />

        <GoogleButton />

        <div className="flex w-full items-center justify-center py-4 text-center font-extralight text-black">
          <p>OU</p>
        </div>

        <div className="mx-2 flex flex-row items-center justify-center space-x-2 ">
          <FacebookButton />

          <AppleButton />
        </div>
      </div>
    </div>
  );
};

export default TabletAuthInitial;
