import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

type layoutProps = {
  children: React.ReactNode;
};

export default async function layout({ children }: layoutProps) {
  const currentUser = getCurrentUser();
  if (!currentUser) redirect("/");
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw] ">
      {children}
    </section>
  );
}
