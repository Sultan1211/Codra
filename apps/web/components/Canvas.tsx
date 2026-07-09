"use client";
import React, { useEffect, useRef } from "react";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      let startX: number, startY: number, clicked: boolean;
      canvas.addEventListener("mousedown", e => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });
      canvas.addEventListener("mousemove", e => {
        if (clicked) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "blue";
          ctx.strokeRect(
            startX,
            startY,
            e.clientX - startX,
            e.clientY - startY,
          );
        }
      });
      canvas.addEventListener("mouseup", e => {
        clicked = false;
        console.log(startX, startY, e.clientX - startX, e.clientY - startY);
      });
    }
  }, []);
  return <canvas className="absolute h-full w-full" ref={canvasRef}></canvas>;
}

export default Canvas;
