import { lazy } from "react";

const Hero = lazy(() => import("@/components/Hero"));

export default function Home() {
  return <Hero />;
}
