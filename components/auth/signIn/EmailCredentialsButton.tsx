import { signInText, signUpText } from "@/constants/auth/signInConstants";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { useEmailCredentialsStore } from "@/lib/stores/modal-store";
import React from "react";

const EmailCredentialsButton = () => {
  const { isLogin } = useLogInVariantStore();
  const { setShowEmailCredentials } = useEmailCredentialsStore();
  return (
    <>
      <button
        className="flex flex-row mx-auto border w-[350px] h-[60px] items-center space-x-4"
        onClick={() => setShowEmailCredentials(true)}
      >
        <div className="pl-2">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <rect x="8" y="12" width="48" height="40"></rect>
              <polyline points="56 20 32 36 8 20"></polyline>
            </g>
          </svg>
        </div>

        <p className={isLogin === "login" ? "pl-10" : "pl-16"}>
          {isLogin === "login"
            ? signInText.credentialsText
            : signUpText.credentialsText}
        </p>
      </button>
    </>
  );
};

export default EmailCredentialsButton;
