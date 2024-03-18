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
} from "@/lib/stores/modals/modal-store";
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
    formState: { errors, isSubmitting, isValid, isValidating },
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
    <section className=" flex flex-col ">
      {/* Back button */}
      <div
        className="absolute left-8 top-6 flex cursor-pointer flex-row items-center justify-center"
        onClick={() => setShowEmailCredentials(false)}
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

      {/* Auth form */}
      <div className=" mt-6 flex flex-col text-left">
        <p className=" text-xl font-semibold ">Continuar com o e-mail</p>

        {/* User input form */}
        <form
          className=" mt-8 flex h-full w-full flex-col gap-2 text-[16px]"
          onSubmit={handleSubmit(loginHandler)}
        >
          <label className="font-semibold">Email</label>
          <div className="relative flex">
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
                  message: "Por favor introduza um endereço de e-mail válido.",
                },
              })}
              className={cn(
                "h-[40px] rounded-sm border border-zinc-400 px-2 text-[16px] focus:outline-none",
                errors.email && "border-red-500",
              )}
              required
              type="email"
              id="email"
              data-lpignore="true"
              placeholder="name@email.com"
            />
            {isValidating && (
              <div
                className="absolute right-10 top-[12px] flex h-[16px] w-[16px] animate-spin rounded-full border-2 border-solid border-zinc-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            )}
            {errors.email && !isValidating ? (
              <Image
                className="absolute right-10 top-[12px] flex"
                src="/icons/error-warning.svg"
                alt="error"
                height={16}
                width={16}
              />
            ) : null}
          </div>
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}

          <label className="font-semibold">Password</label>
          <Input
            disabled={isSubmitting}
            {...register("password", {
              required: true,
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              maxLength: {
                value: 20,
                message: "A password só pode ter até 20 caracteres.",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                message:
                  "A palavra-passe deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número",
              },
            })}
            className={cn(
              "h-[40px] rounded-sm border border-zinc-400 px-2 text-[16px] focus:outline-none",
            )}
            required
            data-lpignore="true"
            type="password"
            id="password"
          />
          {isLogin === "register" && errors.password && (
            <>
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            </>
          )}
          {isLogin === "login" ? (
            <a
              className="flex cursor-pointer items-center justify-end text-end text-sm underline"
              onClick={async () => {
                await sendPasswordResetEmail(getValues("email"));
                setIsOpen(false);
                setShowEmailCredentials(false);
                toast.success("Password reset email sent");
              }}
            >
              Esqueceu-se da palavra-passe?
            </a>
          ) : null}

          <button
            type="submit"
            disabled={isValid}
            className={cn(
              isValid
                ? "border-black bg-black text-white"
                : "bg-zinc-100 text-gray-400",
              "h-[40px] rounded-md border  font-semibold hover:bg-opacity-60",
            )}
          >
            {isLogin === "register" ? "Continuar" : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailRegistrationForm;
