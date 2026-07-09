"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import Canvas from "../components/Canvas";

export default function Home() {
  // const store = useSyncDemo({ roomId: "hi there" });
  return (
    <div className="h-screen w-screen">
      {/* <Tldraw store={store}></Tldraw> */}
      <Canvas />
    </div>
  );
}
