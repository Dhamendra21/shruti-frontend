import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header({ color }) {
  const [open, setOpen] = useState(false);
  
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Text-to-Sign", href: "/Text-to-sign" },
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
          border border-border1
          shadow-soft
          px-5 py-4
          flex items-center justify-between
          w-full
        "
      >
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Sign Translation with
          </p>
          <h1 className="text-2xl font-semibold">
            <span className="bg-gradient-to-r from-purpleAccent to-violet-400 bg-clip-text text-transparent">
              Shruti.Ai
            </span>
          </h1>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive ? "text-purpleAccent font-semibold" : "text-slate-200 hover:text-purpleAccent"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <a href="https://172.16.55.140:8080">Sign to Text</a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-200 text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </header>

      {/* MOBILE MENU COLLAPSE */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300
          ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav
          className="
            flex flex-col gap-3
            mt-2
            px-5 py-3
            rounded-2xl
            bg-bgHeader
            border border-border1
            shadow-soft
          "
        >
          {links.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm cursor-pointer z-50 ${isActive ? "text-purpleAccent font-semibold" : "text-slate-200 hover:text-purpleAccent"}`
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
