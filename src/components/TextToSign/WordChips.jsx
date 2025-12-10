// src/components/textToSign/WordChips.jsx
export default function WordChips({ words }) {
  if (!words.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {words.map((w, idx) => (
        <span
          key={`${w}-${idx}`}
          className="
            px-3 py-1
            rounded-full
            bg-black/70
            border border-white/10
            text-[0.75rem]
            text-slate-100
          "
        >
          {w}
        </span>
      ))}
    </div>
  );
}
