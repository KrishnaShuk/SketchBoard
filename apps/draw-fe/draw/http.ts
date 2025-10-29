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
    }
  | {
     type: "pencil";
     startX: number;
     startY: number;
     endX: number;
     endY: number;
    }


export async function getExistingShapes(roomId: string) {
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