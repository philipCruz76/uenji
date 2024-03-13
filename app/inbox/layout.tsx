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
    <section className="flex max-h-[100dvh] max-w-[100dvw] flex-row bg-white px-6  py-6 text-center tablet:container">
      <div className="hidden max-h-full w-full justify-start rounded-md tablet:flex tablet:max-w-[350px] tablet:pr-4">
        <ConversationsSidebar
          initialConversations={conversations}
          currentUserEmail={currentUser.email}
        />
      </div>
      {children}
    </section>
  );
}
