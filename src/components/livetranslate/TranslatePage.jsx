import { useState } from "react";
import Layout from "../../layout/Layout";
import Header from "./Header";
import Camera from "./Camera";
import TTSControl from "./TTSControl";
import LiveText from "./LiveText";
import { useSignWebSocket } from "../hooks/UsingWebsocketHook";
import QuickReplyModal from "../TextToSign/model/Quickreply"
import TextToSign from "../TextToSign/TextToSign";

export default function SignToText() {
  const { messages, sendWS } = useSignWebSocket();

  const [ttsOn, setTtsOn] = useState(false);
  const [activeLang, setActiveLang] = useState("en-IN");
  const [showReply, setShowReply] = useState(false);

  const toggleTTS = () => {
    setTtsOn(prev => {
      const next = !prev;
      sendWS({ command: next ? "tts_on" : "tts_off" });
      return next;
    });
  };

  const changeLang = (l) => {
    setActiveLang(l);
    sendWS({ command: "set_lang", lang: l });
  };

  return (
    <Layout isWide>
      <Header />

      <main className="mt-16">
        <p className="px-1 text-sm sm:text-base text-slate-200">
          Sign hand gesture recognition{" "}
          <span className="text-slate-400">·</span>{" "}
          <span className="text-slate-400">Live translation interface</span>
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">

          {/* LEFT */}
          <Camera />

          {/* RIGHT */}
          <div className="flex flex-col gap-4">
            <TTSControl
              ttsOn={ttsOn}
              toggleTTS={toggleTTS}
              activeLang={activeLang}
              onChangeLang={changeLang}
            />

            <LiveText messages={messages} />

            {/* REPLY BUTTON */}
            <button
              onClick={() => setShowReply(true)}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700
                         rounded-xl text-white text-sm font-medium"
            >
              Reply in Sign
            </button>
          </div>
        </div>

      </main>

      {/* QUICK REPLY MODAL */}
      {showReply && (
        <QuickReplyModal onClose={() => setShowReply(false)}>
          <TextToSign internalMode={true} />
        </QuickReplyModal>
      )}
    </Layout>
  );
}
