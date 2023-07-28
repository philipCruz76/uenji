import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { lazy } from "react";

const inter = Inter({ subsets: ["latin"] });
const NavBar = lazy(() => import("@/components/NavBar"));
const Footer = lazy(() => import("@/components/Footer"));
const MobileFooter = lazy(() => import("@/components/MobileFooter"));

export const metadata = {
  title: "Uenji",
  description: "Professional services for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased")}>
        <NavBar />

        <main>{children}</main>
        <div className="flex flex-1 bottom-0 w-full h-px bg-gray-200" />
        <div className="tablet:flex hidden flex-1 min-w-full">
          <Footer />
        </div>
        <div className="flex flex-1 tablet:hidden min-w-full">
          <MobileFooter />
        </div>
      </body>
    </html>
  );
}
