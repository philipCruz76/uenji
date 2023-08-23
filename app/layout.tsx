import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { lazy } from "react";
import ProvidersContext from "@/lib/context/ProvidersContext";
import ToasterContext from "@/lib/context/ToasterContext";
import { Analytics } from "@vercel/analytics/react";
import ExtendedNavBar from "@/components/navigation/ExtendedNavBar";
import getSession from "@/lib/actions/getSession";

const inter = Inter({ subsets: ["latin"] });
const NavBar = lazy(() => import("@/components/navigation/NavBar"));
const Footer = lazy(() => import("@/components/navigation/Footer"));
const MobileFooter = lazy(() => import("@/components/navigation/MobileFooter"));

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
          <ToasterContext />
          {session ? <ExtendedNavBar /> : <NavBar />}
          <main>{children}</main>
          <div className="flex flex-1 bottom-0 w-full h-px bg-gray-200" />
          <div className="tablet:flex hidden flex-1 min-w-full">
            <Footer />
          </div>
          <div className="flex flex-1 tablet:hidden min-w-full">
            <MobileFooter />
          </div>
          <Analytics />
        </ProvidersContext>
      </body>
    </html>
  );
}
