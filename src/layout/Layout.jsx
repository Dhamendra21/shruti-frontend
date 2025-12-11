export default function Layout({ children, isWide = false }) {
  return (
    <div
      className="
        min-h-screen 
        mx-auto 
        bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100
        px-3
        flex
        justify-center
      "
    >
      <div
        className={`
          w-full
          ${isWide ? "max-w-[480px] md:max-w-[960px] lg:max-w-[1200px]" : "max-w-[480px] md:max-w-[640px] lg:max-w-[760px]"}
          pb-6
        `}
      >
        {children}
      </div>
    </div>
  );
}
