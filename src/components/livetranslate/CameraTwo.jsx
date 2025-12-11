import { useEffect, useRef, useState } from "react";

export default function CameraTwo() {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const [connected, setConnected] = useState(false);

  async function startWebRTC() {
    try {
      console.log("Starting WebRTC…");

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });
      pcRef.current = pc;

      pc.ontrack = (event) => {
        console.log("Remote track received");
      };

      pc.onicecandidate = (event) => {
        if (!event.candidate) {
          console.log("ICE Gathering complete");
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      if (videoRef.current) videoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const res = await fetch("https://localhost:8080/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pc.localDescription)
      });

      const data = await res.json();
      await pc.setRemoteDescription(data);

      console.log("WebRTC connected");
      setConnected(true);
    } catch (err) {
      console.error("WebRTC error:", err);
    }
  }

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
        className="w-full h-[380px] object-cover rounded-lg scale-x-[-1]"
      />
      <p className="text-center text-sm text-slate-300 mt-2">
        {connected ? "🟢 Camera Active - Sending frames…" : "Connecting…"}
      </p>
    </div>
  );
}
