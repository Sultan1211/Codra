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
        className="fixed bottom-3 left-18 z-[1000]"
      >
        <div className="flex items-center gap-2">
          <IconHome size={16} />
          Home
        </div>
      </SketchButton>
    </div>
  );
}
