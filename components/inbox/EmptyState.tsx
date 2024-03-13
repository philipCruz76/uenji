import { User } from "@/types/common.types";
import { FC } from "react";

type EmptyStateProps = {
  user: User;
};

const EmptyState: FC<EmptyStateProps> = ({ user }) => {
  return (
    <div className="flex h-[80dvh] w-[800px] flex-col items-center justify-center rounded-3xl border">
      <h1 className="text-xl font-semibold">
        {user?.name ? user.name : user?.username?.toLocaleUpperCase()} pick up
        where you left off
      </h1>
      <p className="text-gray-600">Select a conversation and chat away.</p>
    </div>
  );
};

export default EmptyState;
