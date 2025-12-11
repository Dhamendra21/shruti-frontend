import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function VideoSender() {
  const webcamRef = useRef(null);
  const ws = useRef(null);

  const [sentence, setSentence] = useState([]);
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/video");

    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setSentence(data.sentence);
      setTranslation(data.translation);
    };

    const interval = setInterval(() => {
      sendFrame();
    }, 100);

    return () => {
      clearInterval(interval);
      ws.current.close();
    };
  }, []);

  const sendFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // base64 jpeg

    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(imageSrc.split(",")[1]); // remove base64 header
    }
  };

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      
      <h2>Detected Sentence:</h2>
      <div>{sentence.join(" ")}</div>

      <h2>English Translation:</h2>
      <div>{translation}</div>
    </div>
  );
}
