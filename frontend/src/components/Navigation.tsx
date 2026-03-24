"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const THEMES = [
  { id: "default", name: "ONYX_AMBER", icon: "🌑" },
  { id: "parchment", name: "ACADEMIA", icon: "📜" },
  { id: "voltage", name: "VOLTAGE", icon: "📟" },
  { id: "blood", name: "SANGUINE", icon: "🩸" },
  { id: "vault", name: "VAULT", icon: "💎" },
  { id: "neon", name: "CYBER", icon: "🧬" },
  { id: "ghost", name: "PHANTOM", icon: "👻" },
  { id: "forest", name: "MOSS", icon: "🌲" },
  { id: "sand", name: "DESERT", icon: "🏜️" }
];

export default function Navigation() {
  const pathname = usePathname();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [isLight, setIsLight] = useState(false);

  // Apply Theme & Mode
  const updateVisuals = (themeId: string, lightMode: boolean) => {
    const selected = THEMES.find(t => t.id === themeId) || THEMES[0];
    document.documentElement.setAttribute("data-theme", themeId);
    document.documentElement.setAttribute("data-mode", lightMode ? "light" : "dark");
    
    localStorage.setItem("stylist-theme", themeId);
    localStorage.setItem("stylist-mode", lightMode ? "light" : "dark");
    
    setCurrentTheme(selected);
    setIsLight(lightMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("stylist-theme") || "default";
    const savedMode = localStorage.getItem("stylist-mode") === "light";
    updateVisuals(savedTheme, savedMode);
  }, []);

  return (
    <nav className="w-full border-t border-border-dim bg-background/80 backdrop-blur-md fixed bottom-0 z-50 font-mono">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-2xl font-black italic tracking-tighter uppercase">Stylist_OS</Link>
          <div className="flex space-x-8">
            {[{ name: "SCAN", path: "/scan" }, { name: "VAULT", path: "/gallery" }, { name: "COMMAND", path: "/chat" }].map((link) => (
              <Link key={link.path} href={link.path} className={`text-[11px] font-bold tracking-[0.3em] uppercase transition-all hover:text-accent ${pathname === link.path ? "text-accent" : "text-text-muted"}`}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative">
          {isThemeOpen && (
            <div className="absolute bottom-full right-0 mb-4 w-72 bg-panel border border-border-dim rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              {/* TINY TOGGLE HEADER */}
              <div className="p-3 bg-background/50 border-b border-border-dim flex justify-between items-center">
                <p className="text-[8px] text-text-muted font-bold tracking-[0.4em] uppercase">Phase_Control</p>
                <button 
                  onClick={() => updateVisuals(currentTheme.id, !isLight)}
                  className="flex items-center gap-2 bg-card border border-border-dim px-2 py-1 rounded-lg hover:border-accent transition-all"
                >
                  <span className={`text-[9px] font-black ${!isLight ? 'text-accent' : 'opacity-30'}`}>DARK</span>
                  <div className="w-6 h-3 bg-border-subtle rounded-full relative">
                    <div className={`absolute top-0.5 w-2 h-2 rounded-full bg-accent transition-all ${isLight ? 'left-3.5' : 'left-0.5'}`} />
                  </div>
                  <span className={`text-[9px] font-black ${isLight ? 'text-accent' : 'opacity-30'}`}>LIGHT</span>
                </button>
              </div>
              
              <div className="max-h-[260px] overflow-y-auto">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateVisuals(t.id, isLight)}
                    className="w-full text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-colors flex justify-between items-center border-b border-border-dim/30 last:border-0"
                  >
                    <span className="flex items-center gap-3">
                      <span className="opacity-60">{t.icon}</span> {t.name}
                    </span>
                    {currentTheme.id === t.id && <span className="text-[7px] text-accent">●</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="flex items-center space-x-3 bg-panel border border-border-dim px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-accent transition-all active:scale-95"
          >
            <span className="opacity-50 text-accent">{isLight ? '🔆' : '🌙'}</span>
            <span>{currentTheme.name}</span>
            <span className={`transition-transform duration-300 ${isThemeOpen ? "rotate-180" : ""}`}>▲</span>
          </button>
        </div>
      </div>
      {isThemeOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setIsThemeOpen(false)} />}
    </nav>
  );
}