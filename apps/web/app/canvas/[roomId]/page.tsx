"use client";
import React, { use } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import { useRouter } from "next/navigation";
import { IconHome } from "@tabler/icons-react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import SketchButton from "../../../components/UI/Sketch-button";

export default function MainCanvas({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  const store = useSyncDemo({ roomId });
  const router = useRouter();

  return (
    <div className="fixed inset-0">
      <Tldraw store={store}></Tldraw>
      <SketchButton
        onClick={() => router.push("/")}
        className="fixed top-3 left-3 z-[1000] sm:bottom-3 sm:top-auto sm:left-18"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <IconHome size={16} />
          <span className="hidden sm:inline">Home</span>
        </div>
      </SketchButton>
    </div>
  );
}
