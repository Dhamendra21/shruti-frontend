export default function LiveText({ messages }) {
  const latest = messages[messages.length - 1] || {};

  return (
    <section className="mt-4">
      <p className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-500 mb-2">
        Live Transcript
      </p>

      <div
        className="
          m-1 p-4 rounded-3xl border border-slate-300 dark:border-border2
          bg-white dark:bg-bgText/95
          h-[260px] overflow-y-auto shadow-soft
        "
      >
        {!messages.length && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 text-xs">
            <p>Waiting for gestures...</p>
            <p>Show your hand in front of the camera.</p>
          </div>
        )}

        {messages.length > 0 && (
          <div>
            <p className="text-lg font-medium">
              {latest.sentence?.join(" ") || ""}
            </p>

            <p className="text-green-600 dark:text-green-400 text-lg mt-3">
              {latest.translation || ""}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
