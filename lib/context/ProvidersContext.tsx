"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, FC } from "react";

type ProvidersContextProps = {
  children: ReactNode;
};

const ProvidersContext: FC<ProvidersContextProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ProvidersContext;
