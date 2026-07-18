"use client";

import { CanvasTextDemo } from "../components/UI/Canvas-text-demo";
import { NavbarDemo } from "../components/UI/Navbar-demo";
import { EncryptedTextDemoSecond } from "../components/UI/Encypt-demo";
import { WorldMapDemo } from "../components/UI/WorldMap";
import { NoiseBackgroundDemo } from "../components/UI/NoiseBgDemo";
import { useRouter } from "next/navigation";
import { CtxProvider } from "../lib/context";
import HowItWorks from "../components/Guide";

export default function Home() {
  const router = useRouter();
  return (
    <CtxProvider>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <NavbarDemo />

        {/* Background layer only */}
        <div className="absolute inset-0 -z-10">
          <WorldMapDemo />
        </div>

        {/* Content flows normally, page scrolls natively */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 pt-24 pb-12 sm:gap-8 sm:px-6 sm:pt-32 md:gap-12 md:pt-44 xl:gap-24">
          <div className="w-full text-center">
            <CanvasTextDemo />
            <EncryptedTextDemoSecond />
          </div>
          <NoiseBackgroundDemo onClick={() => router.push("/demo")} />

          <HowItWorks />
        </div>
      </div>
    </CtxProvider>
  );
}
