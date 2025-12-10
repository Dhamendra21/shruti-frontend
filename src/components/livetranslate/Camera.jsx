import { useEffect, useRef, useState } from "react";
import api from "../../api";
import axios from "axios";

export default function Camera() {
  const videoRef = useRef(null);
  const wsRef = useRef(null);

  const pcRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus] = useState("Idle");
  const [facing, setFacing] = useState("environment");
  const [isCameraActive, setIsCameraActive] = useState(true);

  // ----------------------------------------------------
  // Toggle Camera
  // ----------------------------------------------------
  function toggleCamera() {
    try {
      if (isCameraActive) {
        stopEverything();
        setStatus("Camera stopped");
        setIsCameraActive(false);
      } else {
        setIsCameraActive(true);
        startCameraAndWebRTC();
      }
    } catch (err) {
      console.error(err);
      setStatus("Error toggling camera");
    }
  }

  // ----------------------------------------------------
  // Stop All Connections
  // ----------------------------------------------------
  function stopEverything() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (pcRef.current) {
      pcRef.current.close();
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  // ----------------------------------------------------
  // Start Camera + WebRTC + WebSocket
  // ----------------------------------------------------
  async function startCameraAndWebRTC() {
    try {
      stopEverything(); // ensure cleanup

      // 1. Camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setStatus("Camera Ready · Connecting WebRTC...");

      // 2. Create WebRTC PeerConnection
      pcRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      stream.getTracks().forEach((track) =>
        pcRef.current.addTrack(track, stream)
      );

      // 3. Create WebRTC offer
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      const res = await axios.post("https://172.16.55.140:8080/offer", {
        sdp: pcRef.current.localDescription.sdp,
        type: pcRef.current.localDescription.type,
      });

      const answer = res.data;
      await pcRef.current.setRemoteDescription(answer);

      setStatus("Streaming video to Python backend...");

      // 4. Connect WebSocket for predictions
      wsRef.current = new WebSocket("wss://172.16.55.140:8080/ws");

      wsRef.current.onopen = () => {
        console.log("WS connected");
        setStatus("Connected to WebSocket · Awaiting predictions...");
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Prediction:", data);

          setStatus(
            `Prediction: ${data.label} (Confidence: ${data.confidence})`
          );
        } catch (err) {
          console.warn("Invalid message:", event.data);
        }
      };

      wsRef.current.onerror = () => {
        setStatus("WebSocket error");
      };

      wsRef.current.onclose = () => {
        console.log("WS closed");
        setStatus("WebSocket disconnected");
      };
    } catch (err) {
      console.error(err);
      setStatus("Camera / WebRTC error");
    }
  }

  // ----------------------------------------------------
  // When the facing mode changes: restart camera
  // ----------------------------------------------------
  useEffect(() => {
    startCameraAndWebRTC();

    return () => stopEverything();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facing]);

  // ----------------------------------------------------
  // Component UI
  // ----------------------------------------------------
  return (
    <section className="mt-4">
      <div
        className="
          relative
          rounded-3xl
          border border-purpleAccent/40
          bg-gradient-to-br from-[#050509] via-[#060812] to-[#07091a]
          overflow-hidden
          shadow-soft
        "
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="
            w-full 
            h-[260px]
            sm:h-[300px]
            md:h-[360px]
            lg:h-[420px]
            object-cover
            bg-black
          "
        />

        {/* Switch camera */}
        <button
          type="button"
          onClick={() =>
            setFacing((prev) => (prev === "user" ? "environment" : "user"))
          }
          className="
            absolute top-3 right-3
            w-10 h-10
            rounded-full
            border border-purpleAccent/70
            bg-purpleAccent/20
            backdrop-blur
            flex items-center justify-center
            text-xl
            hover:bg-purpleAccent/30
            transition
          "
          title="Switch camera"
        >
          ⟳
        </button>

        {/* Toggle camera */}
        <button
          type="button"
          onClick={toggleCamera}
          className={`
            absolute top-3 left-3
            px-4 py-2
            rounded-full
            border backdrop-blur
            text-sm font-medium
            ${
              isCameraActive
                ? "border-red-500/70 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                : "border-green-500/70 bg-green-500/20 hover:bg-green-500/30 text-green-300"
            }
          `}
        >
          {isCameraActive ? "■ Stop" : "▶ Resume"}
        </button>

        {/* Status Indicator */}
        <div
          className="
            absolute bottom-3 left-3
            text-[0.7rem]
            px-2 py-1
            rounded-full
            bg-black/60
            border border-white/10
            text-slate-200
            flex items-center gap-1.5
          "
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>{isCameraActive ? "Camera active" : "Camera stopped"}</span>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-4 px-3 py-2.5 rounded-2xl bg-[#131721] border border-border1 text-sm">
        <p className="text-slate-200 font-medium">Status</p>
        <p className="text-xs text-slate-400 mt-1">{status}</p>
      </div>
    </section>
  );
}
