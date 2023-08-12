import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginCredentials, LoginValidator } from "@/types/login.types";
import { useEmailCredentialsStore } from "@/lib/stores/modal-store";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "../../ui/Input";

const DesktopAuthEmail = ({}) => {
  const { setShowEmailCredentials } = useEmailCredentialsStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginValidator),
  });

  const loginHandler: SubmitHandler<LoginCredentials> = async (data) => {
    // register functionality
    axios
      .post("/api/register", data)
      .then(() =>
        signIn("credentials", {
          ...data,
          redirect: false,
        }),
      )
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials!");
        }
        if (callback?.ok) {
          router.push("/");
        }
      })
      .catch((e) => toast.error(e));

    reset();
    /* login functionality
            signIn('credentials', {
                ...data,
                redirect: false,
            })
            .then((callback)=>{
                if(callback?.error){
                    toast.error("Invalid Credentials!");
                }
                if(callback?.ok){
                    router.push("/");
                }
            })
            .finally(()=> setIsLoading(false))
            */
  };

  return (
    <>
      {/* Back Button */}
      <div
        className="flex flex-row items-center justify-center absolute top-6 left-[400px] cursor-pointer"
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
        <span className="px-[2px] font-semibold text-sm">Back</span>
      </div>

      {/* Auth form */}
      <div className="container w-[438px] flex flex-col space-y-3 text-left mt-12">
        <p className="flex text-2xl font-semibold mb-8 ">Continue with Email</p>

        {/* User input form */}
        <form
          className=" mt-8 flex flex-col space-y-3"
          onSubmit={handleSubmit(loginHandler)}
        >
          <label className="font-semibold">Email</label>
          <Input
            disabled={isSubmitting}
            {...register("email")}
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
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <label className="font-semibold">Password</label>
          <Input
            disabled={isSubmitting}
            {...register("password")}
            className={cn(
              "border border-zinc-400 rounded-sm h-[40px] px-2 focus:outline-none",
              errors.password && "border-red-500",
            )}
            required
            type="password"
            id="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[40px] border text-white bg-black border-black rounded-sm hover:bg-opacity-60"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default DesktopAuthEmail;
