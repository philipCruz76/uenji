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
} from "@/lib/stores/modal-store";
import { Fragment, useEffect, useRef, useState } from "react";
import verifyOTP from "@/lib/actions/auth/verifyOTP";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      if (activeInput > 0) {
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeInput]);

  const handleSubmit = async () => {
    if (!validatedUser) {
      return;
    }
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
          }
        }),
      )
      .catch((e) => toast.error(e));
  };
  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const inputFields = document.querySelectorAll<HTMLInputElement>(
      'input[type="number"]',
    );
    const lastInput = inputFields[inputFields.length - 1];
    if (event.currentTarget === lastInput) {
      setIsValidating(true);
      const validToken = await verifyOTP(otp.join(""));

      if (!validToken) {
        setFailedValidation(true);
      } else {
        setFailedValidation(false);
        setValidatedUser(true);
      }
      setIsValidating(false);
    }
  };

  return (
    <>
      {/* Back Button */}
      <div
        className="flex flex-row items-center justify-center absolute top-6 left-8 cursor-pointer"
        onClick={() => {
          setShowOTP(false);
          setShowEmailCredentials(true);
        }}
      >
        <button className="h-6 p-0 w-6 ">
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
      <div className="container h-full w-fit flex flex-col space-y-3 py-20">
        <span className="flex justify-start font-bold text-2xl">
          Confirm your email
        </span>
        <div className="flex flex-col justify-start pb-14">
          <span>Enter the verification code we emailed to: </span>
          <span className=" text-sm font-light">{newUser.email}</span>
        </div>
        <form className="flex flex-row justify-between items-center space-x-2">
          {otp.map((_, index) => {
            return (
              <Fragment key={index}>
                <Input
                  ref={index === activeInput ? inputRef : null}
                  type="number"
                  className={cn(
                    "w-12 h-12 text-center text-xl text-gray-400 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-700 focus:text-gray-700 transition-colors duration-150 ease-in-out",
                    failedValidation && "border-red-500 focus:border-red-500",
                  )}
                  onChange={(e) => handleOtpChange(e, index)}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      "",
                    );
                  }}
                  value={otp[index]}
                  onKeyDown={handleKeyDown}
                  onInputCapture={handleInput}
                />
              </Fragment>
            );
          })}
        </form>
        {failedValidation && !isValidating && (
          <span className="text-red-500 text-sm">
            You've entered the wrong code. Try again
          </span>
        )}
        {isValidating && (
          <div className="flex flex-row space-x-4 relative">
            <div
              className="flex  h-[16px] w-[16px] animate-spin rounded-full border-2 border-solid border-zinc-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
            <span className="flex font-semibold text-sm ">Checking code</span>
          </div>
        )}
        <span className="font-semibold underline text-sm cursor-pointer">
          Resend code
        </span>
        <button
          className="rounded-md bg-zinc-700 text-white font-semibold text-lg py-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default OTPRegistrationForm;
