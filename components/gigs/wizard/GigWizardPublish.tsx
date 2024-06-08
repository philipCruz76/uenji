import { buttonVariants } from "@/constants/ui/button";
import { useGigWizardStepStore } from "@/lib/stores/gigWizard-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

type GigWizardPublishProps = {
  username: string;
  gigName: string;
};

const GigWizardPublish = ({ username, gigName }: GigWizardPublishProps) => {
  const { setGigWizardStepCurrent } = useGigWizardStepStore();
  const router = useRouter();

  useEffect(() => {
    setGigWizardStepCurrent(4);
  }, []);

  const publishGig = () => {
    fetch(`/api/gig/update?gigName=${gigName}&updateType=publish`, {
      method: "POST",
      body: JSON.stringify({ publish: true }),
    })
      .then((res) => {
        if (res.ok) {
          router.push(`/`);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <section className="mx-[20%] min-h-[100dvh] max-w-[100dvw] items-center justify-center px-6 py-[40px] pt-[50px]">
      <h1 className="py-[20px] text-center text-2xl font-semibold">
        Publique o seu serviço
      </h1>
      <div className="flex max-h-[80dvh] min-h-[60dvh] min-w-[60dvw] max-w-[80dvw] flex-col items-center justify-center gap-4 rounded-md border border-zinc-300">
        <Image
          src={"/icons/office-svgrepo-com.svg"}
          width={100}
          height={100}
          alt="office-svgrepo-com"
          className="h-[100px] w-[100px]"
        />

        <span className="w-full text-center font-semibold">
          O seu serviço está quase pronto ser lançado. <br />
          Certifique-se de que tudo está bem antes de o publicar.
        </span>
        <span className="text-center text-sm text-gray-500">
          Pode sempre voltar e editar o seu serviço mais tarde
        </span>
        <button
          type="button"
          onClick={publishGig}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            " border-black transition duration-300 hover:scale-110 hover:bg-[#7298cd] hover:text-white",
          )}
        >
          <span className="w-full">Publicar Serviço</span>
        </button>
        <Link
          href={`/${username}/manage_gigs/${gigName}/edit?step=4`}
          className="text-center text-sm text-sky-500 hover:underline"
        >
          Voltar
        </Link>
      </div>
    </section>
  );
};

export default GigWizardPublish;
