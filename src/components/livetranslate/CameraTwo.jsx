import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useSignWebSocket } from "../hooks/UsingWebsocketHook";

export default function CameraTwo() {
  const webcamRef = useRef(null);
  const { sendWS } = useSignWebSocket();

  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 120); // 8 FPS

    return () => clearInterval(interval);
  }, []);

  const captureFrame = () => {
    if (!webcamRef.current) return;

    const img = webcamRef.current.getScreenshot();
    if (!img) return;

    const base64 = img.split(",")[1]; // strip header

    // backend expects ONLY the raw base64 string
    sendWS(base64);
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-white dark:bg-black p-2 shadow-lg border border-slate-300 dark:border-slate-700">
      <Webcam
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
        className="w-full object-cover rounded-lg"
      />

      <p className="text-center text-sm text-slate-700 dark:text-slate-300 mt-2">
        🟢 Camera Active – Sending frames…
      </p>
    </div>
  );
}
