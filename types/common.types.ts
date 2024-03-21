import { Conversation, Gig, Message, Order } from "@prisma/client";
import { User as PrismaUser } from "@prisma/client";

export interface User {
  name?: string | null;
  username?: string | null;
  email?: string | null;
  accessToken?: string;
  isSeller?: boolean | null;
  sellerView?: boolean | null;
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

export type ExtendedGigInfo = Gig & {
  user: PrismaUser;
};

export type UserOrders = ({gig: Gig} & {users: PrismaUser[]} & Order)[];
export type UserGigs = (Gig & { user: Pick<PrismaUser, 'username' |'name'|'image'> })[] | undefined;
export type language = ["Português" | "Inglês" | "Francês"];
export type level = ["Nativo/Bilingue" | "Avançado" | "Intermédio" | "Básico"];
