"use client";
import { useState } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const user = pb.authStore.model;

  const logout = () => {
    pb.authStore.clear();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Floating Gear Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-panel border border-border-dim p-4 rounded-full text-foreground hover:border-accent transition-all shadow-2xl"
      >
        <span className="text-xl">⚙️</span>
      </button>

      {/* Slide-over Menu */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-panel border-l border-border-dim z-100 p-8 text-foreground transition-transform duration-500 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-xs uppercase font-bold text-foreground opacity-40 hover:opacity-100">[Close]</button>
        
        <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8 text-foreground">System_Settings</h2>

        {/* Identity Section */}
        <section className="space-y-4 mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Identity_Context</p>
          <div className="bg-card p-4 rounded border border-border-dim space-y-3 text-foreground">
            <div>
              <p className="text-[8px] uppercase text-text-muted">Active_Node</p>
              <p className="text-xs font-bold">{user?.name || "GAVIN_DEV"}</p>
            </div>
            <div>
              <p className="text-[8px] uppercase text-text-muted">Aesthetic_Profile</p>
              <p className="text-xs font-bold italic uppercase">{user?.aesthetic || "MINIMALIST"}</p>
            </div>
          </div>
        </section>

        {/* Action Section */}
        <section className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">System_Actions</p>
          <button 
            onClick={logout}
            className="w-full bg-destructive-surface border border-destructive-border text-destructive-text font-black italic uppercase py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
          >
            Terminate_Session
          </button>
        </section>

        <footer className="absolute bottom-8 left-8 right-8 text-center">
          <p className="text-[8px] text-text-muted uppercase font-bold tracking-[0.3em] opacity-40">Stylist_OS // Locker_ID: {user?.id || "NULL"}</p>
        </footer>
      </div>

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-background/60 z-99 backdrop-blur-sm" />}
    </>
  );
}