// const LANGS = [
//   { code: "en", label: "English" },
//   { code: "hi", label: "हिंदी" },
//   { code: "mr", label: "मराठी" },
//   { code: "bn", label: "বাংলা" },
// ];

// export default function LanguageRow({ activeLang, changeLang }) {
//   return (
//     <section className="mt-3 px-1">
//       <div className="flex items-center justify-between px-3 mb-1.5">
//         <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
//           Output language
//         </p>
//       </div>
//       <div className="flex gap-2 overflow-x-auto pb-1 px-1">
//         {LANGS.map((lang) => {
//           const isActive = activeLang === lang.code;
//           return (
//             <button
//               key={lang.code}
//               type="button"
//               onClick={() => changeLang(lang.code)}
//               className={`
//                 px-3.5 py-1.5
//                 rounded-full
//                 border
//                 text-xs
//                 whitespace-nowrap
//                 transition
//                 ${
//                   isActive
//                     ? "bg-purpleAccent text-white border-purpleAccent shadow-soft"
//                     : "bg-bgBox border-border2 text-slate-200 hover:border-purpleAccent/60"
//                 }
//               `}
//             >
//               <span className="font-medium mr-1 uppercase">{lang.code}</span>
//               <span className="opacity-80">{lang.label}</span>
//             </button>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
