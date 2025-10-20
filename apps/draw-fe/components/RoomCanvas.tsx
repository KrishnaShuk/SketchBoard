"use client"

import { WS_SERVER } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}) {
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const [socket, setSocket] = useState<WebSocket | null>(null);

     useEffect(() => {
        const ws = new WebSocket(`${WS_SERVER}?token${}`);
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
     }, [])

    if(!socket) {
        return <div>
            Connecting to server...
        </div>
    }


    return <div>
        <Canvas roomId={roomId} socket={socket}/>
    </div>
}