import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import useTheme from "../../store/useTheme";

export default function Header({ color }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Sign To Text", href: "/sign-to-text" },
    { name: "Text-to-Sign", href: "/Text-to-sign" },
    { name: "Add Words", href: "/add-signs" },
    { name: "Train Your Sign", href: "/train-custom-sign" },
  ];

  return (
    <>
      {/* TOP BAR */}
      <header
        className="
          mt-4
          rounded-3xl
          z-50
          // sticky top-4
          border border-slate-200 dark:border-border1
          shadow-soft
          px-5 py-4
          flex items-center justify-between
          w-full
          bg-white dark:bg-slate-900/40
        "
      >
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Sign Translation with
          </p>
          <h1 className="text-2xl font-semibold">
            <Link to={"/"} className="bg-gradient-to-r from-purpleAccent to-violet-400 bg-clip-text text-transparent">
              Shruti.Ai
            </Link>
          </h1>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          {links.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive ? "text-purpleAccent font-semibold" : "text-slate-700 dark:text-slate-200 hover:text-purpleAccent"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>
        </nav>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>
          
          <button
            className="md:hidden text-slate-200 text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* MOBILE MENU COLLAPSE */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300
          ${open ? "max-h-50 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav
          className="
            flex flex-col gap-3
            mt-2
            px-5 py-3
            rounded-2xl
            bg-white dark:bg-bgHeader
            border border-slate-200 dark:border-border1
            shadow-soft
          "
        >
          {links.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm cursor-pointer z-50 ${isActive ? "text-purpleAccent font-semibold" : "text-slate-700 dark:text-slate-200 hover:text-purpleAccent"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
