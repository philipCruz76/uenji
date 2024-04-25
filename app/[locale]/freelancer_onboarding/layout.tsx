import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";


type layoutProps ={
    children: React.ReactNode;
}

const layout= async ({ children }: layoutProps) => {
    const currentUser = await getCurrentUser();
    if(!currentUser) redirect("/");
  return (
       <div>{children}</div>
   );
}

export default layout;