import { Conversation, Message } from "@prisma/client";

export interface User {
  name?: string | null;
  username?: string | null;
  email?: string | null;
  accessToken?: string;
  isSeller?: boolean | null;
  image?: string | null;
  isOnline?: boolean | null;
}

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export type Category =
  | "Fotografia"
  | "Formação"
  | "Escrita"
  | "Música"
  | "Análises"
  | "Programação"
  | "Negócios"
  | "Edição de Vídeo"
  | "Branding"
  | "Design";
