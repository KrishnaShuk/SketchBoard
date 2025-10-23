import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./Icons";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

type Shape = "circle" | "rect" | "pencil";

export function Canvas({
    roomId,
    socket
}: {
    roomId: string
    socket: WebSocket
}) {
    const [selectedTool, setSelectedTool] = useState<"circle" | "rect" | "pencil">("circle");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if(canvasRef.current){
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);

   return <div style={{
    height: "100vh",
    background: "red",
    overflow: "hidden"
   }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Toolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
        
    </div>
}

function Toolbar({selectedTool, setSelectedTool} : {
    selectedTool: Shape,
    setSelectedTool: (s: Shape) => void
}) {
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            <div className="flex gap-t">
            <IconButton onClick={() => {
                setSelectedTool("pencil")
            }} activated={selectedTool === "pencil"} icon={<Pencil />}></IconButton>

            <IconButton onClick={() => {
                setSelectedTool("rect")
            }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />}></IconButton>

            <IconButton onClick={() => {
                setSelectedTool("circle")
            }} activated={selectedTool === "circle"} icon={<Circle />}></IconButton>
            </div>
        </div>
}