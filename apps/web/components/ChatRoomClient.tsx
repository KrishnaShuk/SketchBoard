"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../app/hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: {message: string}[];
    id: string
}) {
    // ensure chats is always an array
    const [chats, setChats] = useState(messages ?? []);
    const [currentMessage, setCurrentMessage] = useState("");
    const {socket, loading} = useSocket();

    useEffect(() => {
        if (socket && !loading) {
            // join room
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));

            
            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);

                if (parsedData.type === "chat") {
                    setChats(c => [...c, {message: parsedData.message}])
                }
            }
        }
    }, [socket, loading, id]);

    return <div>
        {chats.map((m, index) => <div key={index}>{m.message}</div>)}

        <input
            type="text"
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
        />
        <button onClick={() => {
            if (currentMessage.trim() === "") return;

            socket?.send(JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage
            }));

            setCurrentMessage("");
        }}>Send message</button>
    </div>
}
