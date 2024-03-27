import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { lazy } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import getSession from "@/lib/actions/getSession";
import { getLocale } from "next-intl/server";
import {
  availableLocaleCodes,
  availableLocalesMap,
  defaultLocale,
} from "@/next.locales.mjs";
import { LocaleProvider } from "@/lib/context/LocaleProvider";

const inter = Inter({ subsets: ["latin"] });
const Footer = lazy(() => import("@/components/navigation/Footer"));
const MobileFooter = lazy(() => import("@/components/navigation/MobileFooter"));
const ProvidersContext = lazy(() => import("@/lib/context/ProvidersContext"));
const ExtendedNavBar = lazy(
  () => import("@/components/navigation/ExtendedNavBar"),
);

type LayoutProps = {
  children: React.ReactNode;
};

export function generateStaticParams() {
  return availableLocaleCodes.map((locale) => ({ locale }));
}
export const metadata = {
  title: "Uenji",
  description: "Professional services for your business",
};

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getSession();
  const locale = await getLocale();

  const { langDir, hrefLang } = availableLocalesMap[locale] || defaultLocale;
  return (
    <html
      lang={hrefLang}
      dir={langDir}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={cn(inter.className, "antialiased")}>
        <ProvidersContext>
          <LocaleProvider>
            <ExtendedNavBar session={session} />
            <main>{children}</main>
            <div className="bottom-0 hidden h-px w-full flex-1 bg-gray-200 tablet:flex" />
            <div className="hidden min-w-full flex-1 tablet:flex">
              <Footer />
            </div>
            <div className="flex min-w-full flex-1 tablet:hidden">
              <MobileFooter />
            </div>
          </LocaleProvider>
        </ProvidersContext>
      </body>
    </html>
  );
}
