export default function LiveText({ messages }) {
  const hasMessages = messages && messages.length > 0;

  return (
    <section className="mt-4">
      <div className="flex items-center justify-between px-1 mb-2">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Live transcript
        </p>
      </div>

      <div
        className="
          m-1
          p-4
          rounded-3xl
          border border-border2
          bg-bgText/95
          h-[210px]
          sm:h-[240px]
          md:h-[280px]
          lg:h-[320px]
          overflow-y-auto
          text-sm
          text-scroll
          shadow-soft
        "
      >
        {!hasMessages && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs">
            <p className="mb-1">Waiting for gestures...</p>
            <p>Point your camera at your hand to begin translation.</p>
          </div>
        )}

        {hasMessages && (
          <div className="space-y-1.5">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="
                  rounded-2xl
                  px-3 py-1.5
                  bg-slate-900/80
                  border border-slate-700/70
                  text-slate-100
                  text-15
                "
              >
                {msg}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
