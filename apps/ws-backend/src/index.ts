import { WebSocketServer } from "ws";

const ws = new WebSocketServer({ port: 3003 });

ws.on("connection", function connection(ws) {
  ws.on("message", msg => {
    ws.send("pong123: " + msg);
  });
});
