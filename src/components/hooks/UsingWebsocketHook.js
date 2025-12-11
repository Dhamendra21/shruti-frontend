import { useEffect, useRef, useState } from "react";

export function useSignWebSocket() {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://172.16.55.140:8080/ws");
    wsRef.current = ws;

    ws.onopen = () => console.log("WS Connected ✔");

    ws.onmessage = (msg) => {
      try {
        const parsed = JSON.parse(msg.data);

        // Expecting: { sentence: [], translation: "" }
        setMessages((prev) => [...prev.slice(-40), parsed]);
      } catch (err) {
        console.error("WS JSON error:", err);
      }
    };

    ws.onclose = () => console.log("WS Disconnected ❌");

    return () => ws.close();
  }, []);

  const sendWS = (obj) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify(obj));
    }
  };

  return { messages, sendWS };
}
