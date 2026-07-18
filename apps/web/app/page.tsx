"use client";

import { CanvasTextDemo } from "../components/UI/Canvas-text-demo";
import { NavbarDemo } from "../components/UI/Navbar-demo";
import { EncryptedTextDemoSecond } from "../components/UI/Encypt-demo";
import { WorldMapDemo } from "../components/UI/WorldMap";
import { NoiseBackgroundDemo } from "../components/UI/NoiseBgDemo";
import { useRouter } from "next/navigation";
import { CtxProvider } from "../lib/context";

export default function Home() {
  const router = useRouter();
  return (
    <CtxProvider>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <NavbarDemo />
        <WorldMapDemo />
        <div className="relative z-10 h-full w-full">
          <div className="absolute inset-0 top-24 sm:top-32 md:top-44 flex flex-col items-center gap-4 px-4 sm:gap-8 sm:px-6 md:gap-12 xl:gap-24 overflow-y-auto pb-8">
            <div className="w-full text-center">
              <CanvasTextDemo />
              <EncryptedTextDemoSecond />
            </div>
            <NoiseBackgroundDemo onClick={() => router.push("/demo")} />
          </div>
        </div>
      </div>
    </CtxProvider>
  );
}