"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PocketBase from "pocketbase";
import { runStylistChat } from "@/lib/gemini";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export default function Dashboard() {
  const router = useRouter();
  const [briefing, setBriefing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Settings State

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadSystem = async () => {
      setLoading(true);
      const authUser = pb.authStore.model;

      if (!authUser) {
        router.push("/login");
        return;
      }
      setUser(authUser);

      try {
        const [wardrobe, prefs] = await Promise.all([
          pb.collection("wardrobe").getFullList({ autoCancel: false }),
          pb.collection("preferences").getFullList({ autoCancel: false })
        ]);

        const hour = currentTime.getHours();
        const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dayStr = currentTime.toLocaleDateString([], { weekday: 'long' });
        const isNight = hour >= 20 || hour < 5;

        const prompt = `
          SYSTEM_TIME: ${timeStr}
          SYSTEM_DATE: ${dayStr}
          CURRENT_PHASE: ${isNight ? "NIGHT_PREP" : "ACTIVE_DAY"}
          USER_NAME: ${authUser.name}
          AESTHETIC: ${authUser.aesthetic}
          LIFESTYLE: ${authUser.lifestyle}
        `;

        const response = await runStylistChat(prompt, prefs, wardrobe, authUser);
        setBriefing(response);
      } catch (err) {
        console.error("Uplink Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSystem();
  }, [router]);

  const logout = () => {
    pb.authStore.clear();
    window.location.href = "/login";
  };

  return (
    <main className="h-full bg-background text-foreground p-8 font-mono flex flex-col items-center justify-center relative">
      
      {/* Settings Modal Overlay */}
      {isSettingsOpen && (
        <div className="absolute inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-panel border border-border-dim rounded-3xl p-10 space-y-8 shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black italic uppercase italic">System_Settings</h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-text-muted hover:text-accent text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] text-accent font-bold uppercase">Identity_Node</p>
                <p className="text-sm opacity-80">{user?.name} // {user?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-accent font-bold uppercase">Active_Aesthetic</p>
                <p className="text-sm opacity-80">{user?.aesthetic || "NOT_SET"}</p>
              </div>
              
              <div className="pt-4 border-t border-border-dim">
                <button 
                  onClick={logout}
                  className="w-full bg-red-900/20 border border-red-500/50 text-red-500 font-black italic uppercase py-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                >
                  Terminate_Session
                </button>
              </div>
            </div>

            <p className="text-[8px] text-center text-text-subtle tracking-widest uppercase opacity-50">
              Locker_ID: {user?.id}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl w-full space-y-8">
        {/* Header */}
        <header className="flex justify-between items-end border-b border-border-dim pb-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">Stylist_OS</h1>
            <p className="text-text-muted text-[10px] tracking-[0.4em] mt-2 uppercase">
              Authorized_User // {user?.name || "GUEST"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-accent font-bold uppercase text-xs">
              {currentTime.toLocaleDateString([], { weekday: 'long' })}
            </p>
            <p className="text-text-subtle text-[10px] uppercase">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <section className="md:col-span-2 bg-panel border border-border-dim rounded-3xl p-8 space-y-6">
            <h2 className="text-xs font-black text-accent uppercase tracking-widest">Daily_Briefing</h2>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-border-dim w-3/4 rounded" />
                <div className="h-4 bg-border-dim w-1/2 rounded" />
              </div>
            ) : (
              <p className="text-xl italic leading-relaxed">
                "{briefing?.reply || "Initializing system..."}"
              </p>
            )}
          </section>

          <nav className="space-y-4">
            <Link href="/scan" className="block bg-panel border border-border-dim p-6 rounded-3xl hover:border-accent transition-all group">
              <span className="text-sm font-black uppercase italic">Scanner</span>
              <p className="text-[9px] text-text-muted mt-2">ARCHIVE NEW GARMENTS</p>
            </Link>
            <Link href="/gallery" className="block bg-panel border border-border-dim p-6 rounded-3xl hover:border-accent transition-all group">
              <span className="text-sm font-black uppercase italic">The_Vault</span>
              <p className="text-[9px] text-text-muted mt-2">BROWSE INVENTORY</p>
            </Link>
            {/* New Settings Trigger */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-full text-left block bg-panel border border-border-dim p-6 rounded-3xl hover:border-accent transition-all group"
            >
              <span className="text-sm font-black uppercase italic">Config</span>
              <p className="text-[9px] text-text-muted mt-2">SYSTEM_SETTINGS & LOGOUT</p>
            </button>
          </nav>
        </div>

        <footer className="w-full flex flex-col items-center pt-8 opacity-20">
          <p className="text-[8px] tracking-[0.5em] uppercase font-bold text-center">
            Stylist_OS // v1.2.0 // Secure_Node
          </p>
        </footer>
      </div>
    </main>
  );
}