import { useEffect, useRef, useState } from "react";
import api from "../../api";

export default function Camera() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("Idle");
  const [facing, setFacing] = useState("environment");
  const [isCameraActive, setIsCameraActive] = useState(true);
  const pcRef = useRef(null);
  const streamRef = useRef(null);

  function toggleCamera() {
    try {
      if (isCameraActive) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
        if (pcRef.current) {
          pcRef.current.close();
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
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

  async function startCameraAndWebRTC() {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setStatus("Connecting · Creating WebRTC offer...");

      pcRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      stream.getTracks().forEach((track) =>
        pcRef.current.addTrack(track, stream)
      );

      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      const res = await api.post("/offer", {
        sdp: pcRef.current.localDescription.sdp,
        type: pcRef.current.localDescription.type,
      });

      const answer = res.data;
      await pcRef.current.setRemoteDescription(answer);

      setStatus("Streaming to Python backend...");
    } catch (err) {
      console.error(err);
      setStatus("Camera / WebRTC error");
    }
  }

  useEffect(() => {
    startCameraAndWebRTC();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facing]);

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

        <button
          type="button"
          onClick={toggleCamera}
          className={`
            absolute top-3 left-3
            px-4 py-2
            rounded-full
            border backdrop-blur
            flex items-center justify-center
            text-sm
            transition
            font-medium
            ${
              isCameraActive
                ? "border-red-500/70 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                : "border-green-500/70 bg-green-500/20 hover:bg-green-500/30 text-green-300"
            }
          `}
          title={isCameraActive ? "Stop camera" : "Resume camera"}
        >
          {isCameraActive ? "■ Stop" : "▶ Resume"}
        </button>

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
          <span>Camera active</span>
        </div>
      </div>

      {/* Status and Tips */}
      <div className="mt-4 flex flex-col gap-3 lg:gap-2">
        <div
          className="
            px-3 py-2.5
            rounded-2xl
            bg-[#131721]
            border border-border1
            text-sm
            flex items-start gap-2
          "
        >
          <span className="mt-1 inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <div>
            <p className="text-slate-200 font-medium">Status</p>
            <p className="text-xs text-slate-400 mt-1" id="status">
              {status}
            </p>
          </div>
        </div>

        <div
          className="
            hidden lg:flex
            px-3 py-2.5
            rounded-2xl
            bg-[#11131c]
            border border-border1/60
            text-[0.75rem]
            text-slate-400
          "
        >
          <div>
            <p className="font-semibold text-slate-200 mb-1 text-xs">
              Tips
            </p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Keep your hand centered in the frame.</li>
              <li>Avoid strong backlight for better recognition.</li>
              <li>Use a contrasting background behind your hand.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
