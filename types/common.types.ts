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

export type FullCategoryType =
  | "Fotografia"
  | "Formação"
  | "Escrita"
  | "Música"
  | "Análises"
  | "Programação"
  | "Negócios"
  | "Vídeo"
  | "Marketing"
  | "Design";

export type Category = {
  category: string;
  categoryTitle: string;
  titlecardImage: string;
  thumbnailIcon: string;
  categoryTagline: string;
};

export type LanguageProficiency = {
  languageName: string;
  languageLevel: string;
};

export type language = ["Português" | "Inglês" | "Francês"];
export type level = ["Nativo/Bilingue" | "Avançado" | "Intermédio" | "Básico"];
