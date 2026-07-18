"use client";
import React, { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "../config";

function Canvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({type: "join_room", roomId: roomId}))
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !socket) return;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas, roomId, socket);
    }
  }, [canvasRef, roomId, socket]);

  if (!socket) {
    return <div> Connectinggg...</div>;
  }
  return <canvas className="absolute h-full w-full" ref={canvasRef}></canvas>;
}

export default Canvas;
