import { useEffect, useRef, useState } from "react";

export function useSignWebSocket() {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss:/172.16.55.140:8080/ws");
    wsRef.current = ws;

    ws.onopen = () => console.log("WS connected ✔");

    ws.onmessage = (msg) => {
      try {
        console.log(msg.data)
        const data = JSON.parse(msg.data); // { label, confidence }
        setMessages((prev) => [...prev, data.label]);
      } catch (e) {
        console.error("WS parse error", e);
      }
    };

    ws.onclose = () => console.log("WS disconnected ❌");

    return () => ws.close();
  }, []);

  const sendWS = (obj) => {
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify(obj));
    }
  };

  return { messages, sendWS };
}
