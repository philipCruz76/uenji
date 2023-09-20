import { User } from "@/types/common.types";
import { FC } from "react";

type EmptyStateProps = {
  user: User;
}

const EmptyState: FC<EmptyStateProps> = ({user}) => {
    return ( 
      <div className="flex flex-col w-[800px] border rounded-3xl h-[80dvh] items-center justify-center">
      <h1 className="text-xl font-semibold">
        {user?.name ? user.name : user?.username?.toLocaleUpperCase()} pick up
        where you left off
      </h1>
      <p className="text-gray-600">Select a conversation and chat away.</p>
    </div>
    );
  }
   
  export default EmptyState;