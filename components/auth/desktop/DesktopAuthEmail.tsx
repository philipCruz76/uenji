import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";

import {
  useEmailCredentialsStore,
  useOTPStore,
  useOpenModalStore,
} from "@/lib/stores/modals/modal-store";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { useLogInVariantStore, useNewUserStore } from "@/lib/stores/auth-store";
import { checkIfUserExists } from "@/lib/actions/auth/checkIfUserExists";
import registerNewUser from "@/lib/actions/auth/registerNewUser";
import { sendPasswordResetEmail } from "@/lib/actions/sentPasswordResetEmail";
import { LoginCredentials } from "@/types/login.types";

const DesktopAuthEmail = ({}) => {
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
      await registerNewUser(data)
        .then(() => {
          setShowOTP(true);
        })
        .catch((e) => toast.error(e));
    }

    reset();
  };

  return (
    <>
      {/* Back Button */}
      <div
        className="absolute left-[400px] top-6 flex cursor-pointer flex-row items-center justify-center"
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
        <span className="px-[2px] text-sm font-semibold">Voltar</span>
      </div>

      {/* Auth form */}
      <div className="container mt-12 flex w-[438px] flex-col space-y-3 text-left">
        <p className="mb-8 flex text-2xl font-semibold ">
          Continuar com o e-mail
        </p>

        {/* User input form */}
        <form
          className=" mt-8 flex flex-col space-y-3"
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
                "h-[40px] rounded-sm border border-zinc-400 px-2 focus:outline-none",
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
              "h-[40px] rounded-sm border border-zinc-400 px-2 focus:outline-none",
            )}
            required
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
                await sendPasswordResetEmail(getValues("email"))
                  .then(() => {
                    setIsOpen(false);
                    setShowEmailCredentials(false);
                    toast.success("Password reset email sent");
                  })
                  .catch((e) => {
                    toast.error(e.message);
                  });
              }}
            >
              Esqueceu-se da palavra-passe?
            </a>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[40px] rounded-sm border border-black bg-black text-white hover:bg-opacity-60"
          >
            {isLogin === "register" ? "Continuar" : "Entrar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default DesktopAuthEmail;
