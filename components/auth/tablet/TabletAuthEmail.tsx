import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginCredentials, LoginValidator } from "@/types/login.types";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const TabletAuthEmail = () => {
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
    <section className="flex container flex-col min-w-screen">
      {/* Auth form */}
      <div className=" flex flex-col space-y-3 text-left mt-6">
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
    </section>
  );
};

export default TabletAuthEmail;
