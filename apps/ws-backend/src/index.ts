import { WebSocket, WebSocketServer } from "ws";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@repo/common/common";
import { prisma } from "@repo/db";

const ws = new WebSocketServer({ port: 3003 });

interface UserObject {
  userId: string;
  ws: WebSocket;
  rooms: string[];
}
const users: UserObject[] = [];

function checkToken(token: string) {
  try {
    const decoded = jwt.verify(token, "mysecretpass123");

    if (typeof decoded === "string") {
      return;
    }
    if (!decoded || !decoded.userId) {
      return;
    }
    return decoded.userId;
  } catch (e) {
    return null;
  }
}

ws.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token");
  const userId = checkToken(token!);
  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    ws,
    rooms: [],
  });
  ws.on("message", async data => {
    const parsedData = JSON.parse(data as unknown as string);
    if (parsedData.type === "join_room") {
      const user = users.find(user => user.ws === ws);
      if (!user) {
        return null;
      }
      user.rooms.push(parsedData.roomId);
    }
    if (parsedData.type === "leave_room") {
      const user = users.find(user => user.ws === ws);
      user?.rooms.filter(room => room === parsedData.roomId);
    }
    if (parsedData.type === "chat") {
      const message = parsedData.message;
      const roomId = parsedData.roomId;
      await prisma.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId,
        },
      });
      users.forEach(user => {
        if (user.rooms.includes(parsedData.roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId: parsedData.roomId,
            }),
          );
        }
      });
    }
  });
});
