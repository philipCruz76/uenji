import getConversations from "@/lib/actions/conversations/getConversations";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { lazy } from "react";

const EmptyState = lazy(() => import("@/components/inbox/EmptyState"));
const ConversationsSidebar = lazy(
  () => import("@/components/inbox/ConversationsSidebar"),
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
    <>
      <div className="flex max-h-full w-full justify-start rounded-md tablet:hidden ">
        <ConversationsSidebar
          initialConversations={conversations}
          currentUserEmail={currentUser.email}
        />
      </div>
      <div className="hidden desktop:flex">
        <EmptyState user={currentUser} />
      </div>
    </>
  );
};

export default page;
