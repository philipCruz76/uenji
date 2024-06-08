"use client";

import { User } from "@prisma/client";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProfileContactButton from "../users/profile/ProfileContactButton";

type ContactCardProps = {
  relevantUser: Pick<
    User,
    "id" | "username" | "displayName" | "image" | "isOnline"
  >;
};

const ContactCard = ({ relevantUser }: ContactCardProps) => {
  return (
    <Card>
      <CardHeader className="flex w-full flex-row items-center justify-center gap-2">
        <Image
          alt="User Profile Photo"
          src={relevantUser.image!}
          width={80}
          height={80}
          className="max-h-[80px] min-h-[80px] min-w-[80px] max-w-[80px] rounded-full border"
        />
        <span className="font-bold">{relevantUser.username}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill={cn(relevantUser.isOnline ? "#3ADF1E" : "#929292")}
          viewBox="0 0 256 256"
        >
          <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path>
        </svg>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-center">
        <ProfileContactButton
          username={relevantUser.username!}
          id={relevantUser.id}
        />
      </CardContent>
    </Card>
  );
};

export default ContactCard;
