import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { activateUser } from "@/lib/actions/auth/activateUser";
import { useNewUserStore } from "@/lib/stores/auth-store";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import { Fragment, useEffect, useRef, useState } from "react";
import verifyOTP from "@/lib/actions/auth/verifyOTP";
import { useRouter } from "next/navigation";

const OTPRegistrationForm = () => {
  const { setIsOpen } = useOpenModalStore();
  const { setShowOTP } = useOTPStore();
  const { setShowEmailCredentials } = useEmailCredentialsStore();
  const { newUser } = useNewUserStore();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [validatedUser, setValidatedUser] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [failedValidation, setFailedValidation] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<number>(0);
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
      toast.error("Código inserido inválido");
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
        className="absolute left-8 top-6 flex cursor-pointer flex-row items-center justify-center"
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
      </div>

      {/* OTP form */}
      <div className=" absolute mt-20 flex-col  px-4 text-left">
        <span className="flex justify-start text-2xl font-bold">
          Valide o seu email
        </span>
        <div className="flex flex-col justify-start ">
          <span>
            Introduza o código de validação que foi enviado para o email:{" "}
          </span>
          <span className=" text-sm font-light">{newUser.email}</span>
        </div>
        <form
          onPaste={handlePaste}
          className="flex flex-row items-center justify-between space-x-2 py-8 text-[16px]"
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
                  onChange={(e) => handleOtpChange(e, index)}
                  onInput={handleInput}
                  value={otp[index]}
                  onKeyDown={handleKeyDown}
                />
              </Fragment>
            );
          })}
        </form>
        {failedValidation && !isValidating && (
          <span className="text-sm text-red-500">
            Código de validação introduzido inválido. Por favor, tente
            novamente.
          </span>
        )}
        {isValidating && (
          <div className="relative flex flex-row space-x-4">
            <div
              className="flex  h-[16px] w-[16px] animate-spin rounded-full border-2 border-solid border-zinc-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
            <span className="flex text-sm font-semibold ">Checking code</span>
          </div>
        )}
        {/*
         !! TODO : implement resend code function !!
        <span className="cursor-pointer text-sm font-semibold underline">
          Reenviar código
        </span>
        */}
        <button
          className={cn(
            "w-full rounded-md py-2 text-lg font-semibold text-white",
            validatedUser ? "bg-zinc-700" : "bg-zinc-300",
            isValidating && "cursor-not-allowed bg-zinc-300",
          )}
          disabled={!validatedUser || isValidating === true}
          onClick={handleSubmit}
        >
          Submeter
        </button>
      </div>
    </>
  );
};

export default OTPRegistrationForm;
