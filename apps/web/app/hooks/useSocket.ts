import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();
  
  useEffect(() => {
     const ws = new WebSocket(`${WS_URL}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NDcwZWY2Ny1iNWExLTQ0MTktYTY5ZS0zMTEwZjdkZWI2MGUiLCJpYXQiOjE3NjA2NDE4MTB9.1w6pJniY6e-8ZeRJIFeonQLkpbMMFWASysK7Ez7LdyM`)
     ws.onopen = () => {
        setSocket(ws);
        setLoading(false);
     }
  }, [])

  return {
    socket,
    loading
  }
}