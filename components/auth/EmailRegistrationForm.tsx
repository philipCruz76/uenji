import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import { useLogInVariantStore, useNewUserStore } from "@/lib/stores/auth-store";
import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modal-store";
import { LoginCredentials } from "@/types/login.types";
import { SubmitHandler, useForm } from "react-hook-form";
import registerNewUser from "@/lib/actions/auth/registerNewUser";
import { checkIfUserExists } from "@/lib/actions/auth/checkIfUserExists";
import { sendPasswordResetEmail } from "@/lib/actions/sentPasswordResetEmail";
import { useRouter } from "next/navigation";

const EmailRegistrationForm = () => {
  const { setIsOpen } = useOpenModalStore();
  const { setShowEmailCredentials } = useEmailCredentialsStore();
  const { isLogin, setLogin } = useLogInVariantStore();
  const { setNewUser } = useNewUserStore();
  const { setShowOTP } = useOTPStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValidating },
    reset,
  } = useForm<LoginCredentials>({
    mode: "onChange",
  });

  const loginHandler: SubmitHandler<LoginCredentials> = async (data) => {
    // login functionality
    setNewUser({
      email: data.email,
      password: data.password,
    });

    if (isLogin === "login") {
      await signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }
          if (callback?.ok) {
            router.refresh();
            setShowEmailCredentials(false);
            setIsOpen(false);
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error(e);
        });
    } else {
      setShowOTP(true);
      await registerNewUser(data).catch((e) => toast.error(e));
    }

    reset();
  };

  return (
    <section className="flex container flex-col ">
      {/* Back button */}
      <div
        className="flex flex-row items-center justify-center absolute top-6 left-8 cursor-pointer"
        onClick={() => setShowEmailCredentials(false)}
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

      {/* Auth form */}
      <div className=" flex flex-col space-y-3 text-left mt-6">
        <p className="flex text-2xl font-semibold mb-8 ">Continue with Email</p>

        {/* User input form */}
        <form
          className=" mt-8 flex flex-col space-y-3"
          onSubmit={handleSubmit(loginHandler)}
        >
          <label className="font-semibold">Email</label>
          <div className="flex relative">
            <Input
              disabled={isSubmitting}
              {...register("email", {
                required: true,
                validate: async (value) =>
                  checkIfUserExists(value).then((res) => {
                    if (res) {
                      setLogin("login");
                    } else {
                      setLogin("register");
                    }
                    return true;
                  }),
                pattern: {
                  value: /^\S+@\S+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              className={cn(
                "border border-zinc-400 rounded-sm h-[40px] px-2 focus:outline-none",
                errors.email && "border-red-500",
              )}
              required
              type="email"
              id="email"
              autoFocus
              placeholder="name@email.com"
            />
            {isValidating && (
              <div
                className="flex absolute right-10 top-[12px] h-[16px] w-[16px] animate-spin rounded-full border-2 border-solid border-zinc-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            )}
            {errors.email && !isValidating ? (
              <Image
                className="flex absolute right-10 top-[12px]"
                src="/icons/error-warning.svg"
                alt="error"
                height={16}
                width={16}
              />
            ) : null}
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <label className="font-semibold">Password</label>
          <Input
            disabled={isSubmitting}
            {...register("password", {
              required: true,
              minLength: { value: 8, message: "At least 8 characters long." },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters long.",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter and one number",
              },
            })}
            className={cn(
              "border border-zinc-400 rounded-sm h-[40px] px-2 focus:outline-none",
            )}
            required
            type="password"
            id="password"
          />
          {isLogin === "register" && errors.password && (
            <>
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            </>
          )}
          {isLogin === "login" ? (
            <a
              className="flex cursor-pointer text-sm underline text-end justify-end items-center"
              onClick={async () => {
                await sendPasswordResetEmail(getValues("email"));
                setIsOpen(false);
                setShowEmailCredentials(false);
                toast.success("Password reset email sent");
              }}
            >
              Forgot password?
            </a>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[40px] border text-white bg-black border-black rounded-sm hover:bg-opacity-60"
          >
            {isLogin === "register" ? "Continue" : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailRegistrationForm;
