import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { lazy } from "react";

const EmptyState = lazy(() => import("@/components/inbox/EmptyState"));

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/");
  }
  return (
    <div className="hidden tablet:flex">
      <EmptyState user={currentUser} />
    </div>
  );
};

export default page;
