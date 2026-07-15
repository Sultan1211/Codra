"use client";
import React, { use } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function MainCanvas({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params); 
  console.log(roomId,"roomId from params")
  const store = useSyncDemo({ roomId });

  return (
    <ProtectedRoute>
      <div className=" fixed inset-0">

      <Tldraw store={store}></Tldraw>
      </div>
    </ProtectedRoute>
  );
}