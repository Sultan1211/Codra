import axios from "axios";
import { HTTP_BACKEND } from "../config";

export interface shapeCo {
  x: number;
  y: number;
  w: number;
  h: number;
}
export type Shape = {
  type: "rect";
  coordinates: shapeCo;
};
export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
) {
  const existingShapes: Shape[] = await getExistingShapes(roomId);
  // const existingShapes: Shape[] = [];
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  socket.onmessage = event => {
    const message = JSON.parse(event.data);

    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape);
      clrCtx(existingShapes, canvas, ctx);
    }
  };
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let startX: number, startY: number, clicked: boolean;
  canvas.addEventListener("mousedown", e => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener("mousemove", e => {
    if (clicked) {
      clrCtx(existingShapes, canvas, ctx);
      ctx.strokeStyle = "white";
      ctx.strokeRect(startX, startY, e.clientX - startX, e.clientY - startY);
    }
  });
  canvas.addEventListener("mouseup", e => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const co = {
      x: startX,
      y: startY,
      w: width,
      h: height,
    };
    const shape: Shape = { type: "rect", coordinates: co };
     if (!shape) {
            return;
        }
    existingShapes.push(shape);
    socket?.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId,
      }),
    );
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/shapes/${roomId}`);
  const data = res.data.messages;

  const shapes = data.map((s: { message: string }) => {
    const shape = JSON.parse(s.message);
    return shape;
  });
  return shapes;
}
function clrCtx(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  existingShapes.map(shape => {
    const coordinates = shape.coordinates;
    ctx.strokeStyle = "white";
    ctx.strokeRect(coordinates.x, coordinates.y, coordinates.w, coordinates.h);
  });
}
