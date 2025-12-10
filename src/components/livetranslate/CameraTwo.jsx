import { useEffect, useRef, useState } from "react";

export default function CameraTwo() {
  const videoRef = useRef(null);
  const pcRef = useRef(null);

  const [connected, setConnected] = useState(false);

  // -----------------------
  // 1. CONNECT TO PYTHON SERVER (WebRTC)
  // -----------------------
  async function startWebRTC() {
    try {
      console.log("Starting WebRTC…");

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });
      pcRef.current = pc;

      // Show remote stream (not needed but useful)
      pc.ontrack = (event) => {
        console.log("Remote track received");
      };

      // Capture camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      // Display local camera preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Add stream to WebRTC
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to Python server
      const res = await fetch("https://172.16.55.140:8080/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sdp: pc.localDescription.sdp,
          type: pc.localDescription.type
        })
      });

      const data = await res.json();

      // Set Python's response
      await pc.setRemoteDescription(data);

      console.log("WebRTC connected");
      setConnected(true);

    } catch (err) {
      console.error("WebRTC error:", err);
    }
  }

  // Run on mount
  useEffect(() => {
    startWebRTC();
  }, []);

  return (
    <div className="rounded-xl overflow-hidden bg-black p-2 shadow-lg border border-slate-700">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-[380px] object-cover rounded-lg"
      />

      <p className="text-center text-sm text-slate-300 mt-2">
        {connected ? "🟢 Camera Active - Sending frames…" : "Connecting…"}
      </p>
    </div>
  );
}
