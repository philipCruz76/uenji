import { Input } from "@/components/ui/Input";
import { activateUser } from "@/lib/actions/auth/activateUser";
import verifyOTP from "@/lib/actions/auth/verifyOTP";
import { useNewUserStore } from "@/lib/stores/auth-store";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const DesktopAuthOTP = ({}) => {
  const { setIsOpen } = useOpenModalStore();
  const { setShowOTP } = useOTPStore();
  const { setShowEmailCredentials } = useEmailCredentialsStore();
  const { newUser } = useNewUserStore();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [validatedUser, setValidatedUser] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [failedValidation, setFailedValidation] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<number>(0);
  const buttonText = useTranslations("Authentication");
  const otpText = useTranslations("Authentication.otp");

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      if (activeInput > 0) {
        setFailedValidation(false);
        setValidatedUser(false);
        const newOTP = [...otp];
        newOTP[activeInput - 1] = "";
        setOtp(newOTP);
        setActiveInput(activeInput - 1);
      }
    }
  };

  const handleOtpChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1);

    if (!value) {
      setActiveInput(index - 1);
    } else {
      setActiveInput(index + 1);
    }

    setOtp(newOTP);
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pastedData = await e.clipboardData.getData("text");
    if (pastedData.length != 6 || pastedData.match(/[^0-9]/g)) {
      toast.error(otpText("toastError"));
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
      setActiveInput(i + 1);
    }

    setOtp(newOtp);
    const validToken = await verifyOTP(newOtp.join(""));
    if (!validToken) {
      setFailedValidation(true);
    } else {
      setFailedValidation(false);
      setValidatedUser(true);
      toast.success(otpText("toastSuccess"));
    }
  };

  const handleSubmit = async () => {
    if (!validatedUser) {
      return;
    }
    setIsValidating(true);
    const { email, password } = newUser;
    const otpString = otp.join("");
    activateUser(email, otpString)
      .then(() =>
        signIn("credentials", {
          email,
          password,
          redirect: false,
        }).then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }
          if (callback?.ok) {
            setShowOTP(false);
            setShowEmailCredentials(false);
            setIsOpen(false);
            router.refresh();
          }
        }),
      )
      .catch((e) => toast.error(e))
      .finally(() => setIsValidating(false));
  };

  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.value = event.currentTarget.value.replace(
      /[^0-9]/g,
      "",
    );
    const inputFields = document.querySelectorAll<HTMLInputElement>(
      'input[type="number"]',
    );
    const lastInput = inputFields[inputFields.length - 1];
    const newOtp = [...otp];
    newOtp[activeInput] = event.currentTarget.value;

    if (event.currentTarget === lastInput) {
      const validToken = await verifyOTP(newOtp.join(""));
      if (!validToken) {
        setFailedValidation(true);
      } else {
        setFailedValidation(false);
        setValidatedUser(true);
      }
    }
  };

  return (
    <>
      {/* Back Button */}
      <div
        className="absolute left-[400px] top-6 flex cursor-pointer flex-row items-center justify-center"
        onClick={() => {
          setShowOTP(false);
          setShowEmailCredentials(true);
        }}
      >
        <button className="h-6 w-6 p-0 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M220,128a4,4,0,0,1-4,4H49.66l65.17,65.17a4,4,0,0,1-5.66,5.66l-72-72a4,4,0,0,1,0-5.66l72-72a4,4,0,0,1,5.66,5.66L49.66,124H216A4,4,0,0,1,220,128Z"></path>
          </svg>
        </button>
        <span className="px-[2px] text-sm font-semibold">
          {buttonText("backButton")}
        </span>
      </div>

      {/* OTP form */}
      <div className="container flex h-full w-[438px] flex-col space-y-3 py-20">
        <span className="flex justify-start text-2xl font-bold">
          {otpText("heading")}
        </span>
        <div className="flex flex-col justify-start ">
          <span>{otpText("subheading")}</span>
          <span className=" text-sm font-light">{newUser.email}</span>
        </div>

        <form
          onPaste={handlePaste}
          className="flex flex-row items-center justify-between space-x-2 py-12"
        >
          {otp.map((_, index) => {
            return (
              <Fragment key={index}>
                <Input
                  ref={index === activeInput ? inputRef : null}
                  type="number"
                  className={cn(
                    "h-12 w-12 rounded-sm border border-zinc-300 text-center text-xl text-gray-400 transition-colors duration-150 ease-in-out focus:border-zinc-700 focus:text-gray-700 focus:outline-none",
                    failedValidation && "border-red-500 focus:border-red-500",
                  )}
                  onInput={handleInput}
                  onChange={(e) => handleOtpChange(e, index)}
                  value={otp[index]}
                  onKeyDown={handleKeyDown}
                />
              </Fragment>
            );
          })}
        </form>
        {failedValidation && (
          <span className="text-sm text-red-500">{otpText("otpError")}</span>
        )}
        {/*
         !! TODO : implement resend code function !!
        <span className="cursor-pointer text-sm font-semibold underline">
          Reenviar código
        </span>
        */}
        <button
          className={cn(
            "rounded-md py-2 text-lg font-semibold text-white",
            validatedUser ? "bg-zinc-700" : "bg-zinc-300",
            isValidating && "cursor-not-allowed bg-zinc-300",
          )}
          disabled={!validatedUser || isValidating === true}
          onClick={handleSubmit}
        >
          {otpText("submitButton")}
        </button>
      </div>
    </>
  );
};

export default DesktopAuthOTP;
