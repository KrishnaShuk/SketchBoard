import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: number[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return typeof decoded === 'object' && decoded.userId ? decoded.userId : null;
  } catch {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || '';
  const userId = checkUser(token);
  if (!userId) {
    ws.close();
    return;
  }

  users.push({ userId, rooms: [], ws });

  ws.on('message', async function message(raw) {
    let parsedData;
    try {
      parsedData = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (parsedData.type === 'join_room') {
      const user = users.find(x => x.ws === ws);
      const roomIdInt = parseInt(parsedData.roomId, 10);
      if (!isNaN(roomIdInt)) user?.rooms.push(roomIdInt);
    }

    if (parsedData.type === 'leave_room') {
      const user = users.find(x => x.ws === ws);
      if (!user) return;
      const roomIdInt = parseInt(parsedData.roomId, 10);
      if (!isNaN(roomIdInt)) user.rooms = user.rooms.filter(x => x !== roomIdInt);
    }

    if (parsedData.type === 'chat') {
      const roomIdInt = parseInt(parsedData.roomId, 10);
      if (isNaN(roomIdInt)) return;
      const message = parsedData.message;

      users.forEach(u => {
        if (u.rooms.includes(roomIdInt)) {
          try {
            u.ws.send(JSON.stringify({ type: 'chat', message, roomId: roomIdInt }));
          } catch {}
        }
      });

      await prisma.chat.create({
        data: { roomId: roomIdInt, message, userId }
      });
    }
  });

  ws.on('close', () => {
    const index = users.findIndex(u => u.ws === ws);
    if (index !== -1) users.splice(index, 1);
  });
});
