import { getAuthSession } from "@/lib/auth";
import { lazy } from "react";

const Hero = lazy(() => import("@/components/hero/Hero"));

export default async function Home() {
  const session = await getAuthSession();
  return <>{session ? <Hero /> : <Hero />}</>;
}
