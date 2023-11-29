import getConversations from "@/lib/actions/conversations/getConversations";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { lazy } from "react";

const ConversationsSidebar = lazy(
  () => import("@/components/inbox/ConversationsSidebar"),
);

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <section className="flex tablet:container max-w-screen max-h-screen flex-row   text-center py-6 px-6">
      <div className="flex w-full tablet:pr-4 rounded-md max-h-full justify-start tablet:max-w-[350px]">
        <ConversationsSidebar
          initialConversations={conversations}
          currentUserEmail={currentUser.email}
        />
      </div>
      {children}
    </section>
  );
}
