import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;


  const existingShapes: Shape[] = await getExistingShapes(roomId);


  clearCanvas(existingShapes, canvas, ctx);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      try {
        const parsed = JSON.parse(message.message);
        const shape = parsed.shape || parsed; 
        if (shape?.type) {
          existingShapes.push(shape);
          clearCanvas(existingShapes, canvas, ctx);
        }
      } catch (err) {
        console.error("Invalid shape data:", event.data);
      }
    }
  };


  let clicked = false;
  let startX = 0;
  let startY = 0;


  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    clicked = true;
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!clicked) return;
    clicked = false;
    const rect = canvas.getBoundingClientRect();
    const width = e.clientX - rect.left - startX;
    const height = e.clientY - rect.top - startY;

    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    };

    existingShapes.push(shape);
    clearCanvas(existingShapes, canvas, ctx);

    socket.send(
      JSON.stringify({
        type: "chat",
        roomId,
        message: JSON.stringify({ shape }),
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const rect = canvas.getBoundingClientRect();
      const width = e.clientX - rect.left - startX;
      const height = e.clientY - rect.top - startY;

      clearCanvas(existingShapes, canvas, ctx);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}


function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const shape of existingShapes) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255)";
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}


async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.message || [];

  const shapes = messages
    .map((x: { message: string }) => {
      try {
        const parsed = JSON.parse(x.message);
        return parsed.shape || parsed;
      } catch {
        return null;
      }
    })
    .filter((x: Shape | null): x is Shape => x !== null);

  return shapes;
}
