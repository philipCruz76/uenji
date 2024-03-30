import getConversationById from "@/lib/actions/conversations/getConversationById";
import getMessages from "@/lib/actions/conversations/getMessages";
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

  const chatPartner = conversation.users.filter(
    (user) => user.username === username,
  )[0];
  const messages = await getMessages(chatId);
  return (
    <div className=" flex h-[90dvh] w-[800px]  max-w-[100dvw] flex-col rounded-3xl border tablet:h-[80dvh]">
      <Header chatPartner={chatPartner} />
      <Body initialMessages={messages} />
      <ChatInput chatPartner={chatPartner} chatId={chatId} />
    </div>
  );
};

export default page;