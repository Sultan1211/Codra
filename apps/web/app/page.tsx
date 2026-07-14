"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import Canvas from "../components/Canvas";
import MainCanvas from "./canvas/[roomId]/page";
import { CanvasTextDemo } from "../components/UI/Canvas-text-demo";
import { NavbarDemo } from "../components/UI/Navbar-demo";
import { EncryptedTextDemoSecond } from "../components/UI/Encypt-demo";
import { WorldMapDemo } from "../components/UI/WorldMap";
import { NoiseBackground } from "../components/UI/NoiseBackground";
import { NoiseBackgroundDemo } from "../components/UI/NoiseBgDemo";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  // const store = useSyncDemo({ roomId: "hi there" });
  return (
    <div className="relative h-screen w-screen">
      {/* <Tldraw store={store}></Tldraw> */}
      <NavbarDemo />
      <WorldMapDemo />
      <div className="relative z-10 h-full w-full">
        <div className="absolute inset-0 top-44 flex flex-col items-center gap-8 md:gap-12 xl:gap-24">
          <div>
          <CanvasTextDemo />
          <EncryptedTextDemoSecond />
          </div>
          <NoiseBackgroundDemo onClick={()=> router.push("/demo")}/>
        </div>
      </div>
    </div>
  );
}
