import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

export function useSignWebSocket() {
  const [messages, setMessages] = useState([]);
  const [wsConn, setWsConn] = useState(null);

  useEffect(() => {
    const proto = BASE_URL.startsWith("https") ? "wss" : "ws";
    const wsUrl = BASE_URL.replace(/^https?/, proto);

    const ws = new WebSocket(`${wsUrl}/ws`);
    setWsConn(ws);

    ws.onopen = () => console.log("WS connected");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.label) {
          setMessages(prev => [...prev, data.label]);
        }
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, []);

  const sendWS = (payload) => {
    if (wsConn && wsConn.readyState === WebSocket.OPEN) {
      wsConn.send(JSON.stringify(payload));
    }
  };

  return {
    messages,
    sendWS  
  };
}
