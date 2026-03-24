"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "DASHBOARD", path: "/", icon: "🏠" },
    { name: "SCANNER", path: "/scan", icon: "📸" },
    { name: "THE_VAULT", path: "/gallery", icon: "📂" },
    { name: "COMMAND", path: "/chat", icon: "📡" },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-3 pb-6 bg-background border-t border-border-dim pt-4 z-50 shrink-0">
      
      {/* The Expanding Container (CSS Grid Trick for smooth height animation) */}
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <nav className="overflow-hidden">
          <div className="flex items-center gap-2 bg-panel/90 backdrop-blur-md border border-border-dim p-2 rounded-2xl shadow-2xl mb-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? "bg-accent text-background font-black italic shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]" 
                      : "hover:bg-card text-text-muted hover:text-foreground"
                  }`}
                >
                  <span className={`text-sm ${isActive ? "grayscale-0" : "grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0"}`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold tracking-tighter uppercase">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* The Toggle Arrow (Mobile-Friendly Pill) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-32 py-2 flex justify-center items-center bg-panel border border-border-dim text-text-muted hover:text-accent rounded-full shadow-lg transition-all active:scale-95"
        aria-label="Toggle Navigation"
      >
        <span className={`block text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▲
        </span>
      </button>
    </div>
  );
}