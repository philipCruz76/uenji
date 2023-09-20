import getConversationById from "@/lib/actions/conversations/getConversationById";
import getConversations from "@/lib/actions/conversations/getConversations";
import getMessages from "@/lib/actions/conversations/getMessages";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { FC, lazy } from "react";

type PageProps = {
  params: {
    username: string;
  };
  searchParams: {
    chatId: string;
  };
};

const Body = lazy(() => import("@/components/inbox/Body"));
const ChatInput = lazy(() => import("@/components/inbox/ChatInput"));
const Header = lazy(() => import("@/components/inbox/Header"));
const ConversationsSidebar = lazy(
  () => import("@/components/inbox/ConversationsSidebar")
);

const page: FC<PageProps> = async ({ params, searchParams }: PageProps) => {
  const { username } = params;
  const { chatId } = searchParams;
  if (!chatId) {
    redirect("/inbox");
  }
  const conversation = await getConversationById(chatId);
  if (!conversation) {
    redirect("/inbox");
  }
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

  const chatPartner = conversation.users.filter(
    (user) => user.username === username
  )[0];
  const messages = await getMessages(chatId);
  return (
    <section className="flex tablet:container max-w-screen max-h-screen flex-row items-center justify-center text-center tablet:py-6 tablet:px-6">
      <div className="tablet:flex hidden w-full tablet:pr-4 rounded-md h-[80dvh] justify-start tablet:w-[350px] ">
        <ConversationsSidebar
          initialConversations={conversations}
          currentUserEmail={currentUser.email}
        />
      </div>
      <div className=" max-w-screen w-[800px] h-[90dvh]  tablet:h-[80dvh] flex flex-col border rounded-3xl">
        <Header chatPartner={chatPartner} />
        <Body initialMessages={messages} />
        <ChatInput chatPartner={chatPartner} chatId={chatId} />
      </div>
    </section>
  );
};

export default page;
