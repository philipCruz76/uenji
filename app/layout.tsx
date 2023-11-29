import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import getSession from "@/lib/actions/getSession";

const inter = Inter({ subsets: ["latin"] });
const Footer = lazy(() => import("@/components/navigation/Footer"));
const ProvidersContext = lazy(() => import("@/lib/context/ProvidersContext"));
const ExtendedNavBar = lazy(
  () => import("@/components/navigation/ExtendedNavBar"),
);

export const metadata = {
  title: "Uenji",
  description: "Professional services for your business",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased")}>
        <ProvidersContext>
          <ExtendedNavBar session={session} />
          <main>{children}</main>
          <div className="flex flex-1 bottom-0 w-full h-px bg-gray-200" />
          <div className="tablet:flex hidden flex-1 min-w-full">
            <Footer />
          </div>
          <Analytics />
        </ProvidersContext>
      </body>
    </html>
  );
}
