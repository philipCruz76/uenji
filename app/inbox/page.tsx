import getConversations from "@/lib/actions/conversations/getConversations";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { lazy } from "react";

const EmptyState = lazy(() => import("@/components/inbox/EmptyState"));
const ConversationsSidebar = lazy(
  () => import("@/components/inbox/ConversationsSidebar")
);

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/");
  }
  const conversations = await getConversations().then((result) => {
    if (!result) {
      return [];
    }
    return result;
  });
  return (
    <section className="flex tablet:container max-w-screen max-h-screen flex-row items-center justify-center text-center py-6 px-6">
      <div className="flex w-full tablet:pr-4 rounded-md h-full justify-start tablet:w-[350px]">
        <ConversationsSidebar
          initialConversations={conversations}
          currentUserEmail={currentUser.email}
        />
      </div>
      <div className="hidden tablet:flex">
        <EmptyState user={currentUser} />
      </div>
    </section>
  );
};

export default page;
