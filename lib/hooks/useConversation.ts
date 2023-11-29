import { redirect, useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const searchParams = useSearchParams();
  if (!searchParams) {
    redirect("inbox");
  }
  const chatId = useMemo(() => {
    if (!searchParams.get("chatId")) {
      return "";
    }

    return searchParams.get("chatId") as string;
  }, [searchParams.get("chatId")]);

  const isOpen = useMemo(() => !!chatId, [chatId]);

  return useMemo(
    () => ({
      isOpen,
      chatId,
    }),
    [isOpen, chatId],
  );
};

export default useConversation;
