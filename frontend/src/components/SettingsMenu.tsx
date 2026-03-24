"use client";
import { useState, useEffect } from "react";

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("default");

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("stylist-theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("stylist-theme") || "default";
    changeTheme(savedTheme);
  }, []);

  return (
    <>
      {/* Toggle Button (Floating Gear) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-100 bg-panel border border-border-dim p-4 rounded-full text-foreground hover:border-accent transition-all shadow-2xl"
      >
        <span className="text-xl">⚙️</span>
      </button>

      {/* Slide-over Menu */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-panel border-l border-border-dim z-101 p-8 text-foreground transition-transform duration-500 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-xs uppercase font-bold text-foreground opacity-40 hover:opacity-100">[Close]</button>
        
        <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8 text-foreground">System_Settings</h2>

        {/* Theme Customizer */}
        <section className="mb-10 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Visual_Protocol</p>
          <div className="grid grid-cols-1 gap-2">
            {['default', 'parchment', 'voltage'].map((t) => (
              <button 
                key={t}
                onClick={() => changeTheme(t)}
                className={`w-full p-3 rounded text-left text-xs uppercase font-bold border transition-all ${theme === t ? 'border-accent bg-accent-muted text-accent' : 'border-border-dim text-foreground opacity-60'}`}
              >
                {t === 'default' ? '🌑 Onyx_Amber' : t === 'parchment' ? '📜 Academia_Parchment' : '📟 Voltage_Green'}
              </button>
            ))}
          </div>
        </section>

        {/* User Profile / Meta-Data */}
        <section className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Identity_Context</p>
          <div className="bg-card p-4 rounded border border-border-dim space-y-3 text-foreground">
            <div>
              <p className="text-[8px] uppercase text-text-muted">Current_User</p>
              <p className="text-xs font-bold">GAVIN_DEV</p>
            </div>
            <div>
              <p className="text-[8px] uppercase text-text-muted">Geographic_Lock</p>
              <p className="text-xs font-bold italic">LAKE TAPPS, WA</p>
            </div>
            <div>
              <p className="text-[8px] uppercase text-text-muted">Active_Schedules</p>
              <p className="text-[10px] leading-tight">PHYSICS (M-TH 8:30AM)<br/>CS (M/W 1:00PM)</p>
            </div>
          </div>
        </section>

        <footer className="absolute bottom-8 left-8 right-8 text-center">
          <p className="text-[8px] text-text-muted uppercase font-bold tracking-[0.3em] opacity-60">Stylist_OS // Unified_Frontend</p>
        </footer>
      </div>

      {/* Backdrop */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-background/60 z-99 backdrop-blur-sm" />}
    </>
  );
}