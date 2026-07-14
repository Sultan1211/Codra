// import axios from "axios";
// import { Shape } from ".";
// import { HTTP_BACKEND } from "../config";

// class Draw {
//   private canvas;
//   private ctx: CanvasRenderingContext2D | null;
//   private existingShapes: Shape[];
//   socket: WebSocket;
//   private isClicked: boolean;
//   private startX: number;
//   private startY: number;
//   private roomId: string;

//   constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext("2d");
//     this.roomId = roomId;
//     this.existingShapes = [];
//     this.socket = socket;
//     this.isClicked = false;
//     this.startX = 0;
//     this.startY = 0;
//     this.init();
//     this.initHandler();
//     this.mouseHandlers();
//   }

//   async init() {
//     this.existingShapes = await this.getExistingShapes();
//     this.clrCtx();
//   }

//   destroy() {
//     this.canvas.removeEventListener("mousedown", this.mousedownHandler);

//     this.canvas.removeEventListener("mouseup", this.mouseupHandler);

//     this.canvas.removeEventListener("mousemove", this.mousemoveHandler);
//   }

//   async getExistingShapes() {
//     const res = await axios.get(`${HTTP_BACKEND}/shapes/${this.roomId}`);
//     const messages = res.data.messages;
//     const shapes = messages.map(m => {
//       const shape: Shape = JSON.parse(m);
//       return shape;
//     });
//     return shapes;
//   }
//   async initHandler() {
//     this.socket.onmessage = event => {
//       const parsedData = JSON.parse(event.data);
//       if (parsedData.type === "chat") {
//         this.existingShapes.push(parsedData.message);
//         this.clrCtx();
//       }
//     };
//   }
//   clrCtx() {
//     this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.ctx.fillStyle = "rgba(0,0,0)";
//     this.ctx?.fillRect(0, 0, this.canvas.width, this.canvas.height);
//     this.existingShapes.forEach(element => {
//       const coordinates = element.coordinates;
//       this.ctx?.strokeStyle = "white";
//       this.ctx?.strokeRect(
//         coordinates.x,
//         coordinates.y,
//         coordinates.w,
//         coordinates.h,
//       );
//     });
//   }
//   mousedownHandler(e) {
//     this.isClicked = true;
//     this.startX = e.clientX;
//     this.startY = e.clientY;
//   }
//   mousemoveHandler(e) {
//     this.clrCtx();
//     this.ctx?.strokeStyle = "white";
//     this.ctx?.strokeRect(
//       this.startX,
//       this.startY,
//       e.clientX - this.startX,
//       e.clientY - this.startY,
//     );
//   }
//   mouseupHandler(e) {
//     this.isClicked = false;
//     const width = this.startX - e.clientX;
//     const height = this.startY - e.clientY;
//     this.socket.send(
//       JSON.stringify({
//         type: "rect",
//         coodinates: JSON.stringify({
//           x: this.startX,
//           y: this.startY,
//           w: width,
//           h: height,
//         }),
//       }),
//     );
//   }

//   mouseHandlers() {
//     this.canvas.addEventListener("mousedown", this.mousedownHandler);
//     this.canvas.addEventListener("mousemove", this.mousemoveHandler);
//     this.canvas.addEventListener("mouseup", this.mouseupHandler);
//   }
// }
