"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PocketBase from "pocketbase";
import { runStylistChat } from "@/lib/gemini";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export default function Dashboard() {
  const [briefing, setBriefing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadSystem = async () => {
      setLoading(true);
      
      // 1. Get the authenticated user from the local store
      const authUser = pb.authStore.model;
      
      if (!authUser) {
        console.warn("No active session. Please log in.");
        // You can redirect to /login here later
        return;
      }
      
      setUser(authUser);

      try {
        // 2. These fetches now ONLY return data where user == authUser.id 
        // because of the API Rules you set in PocketBase
        const [wardrobe, prefs] = await Promise.all([
          pb.collection("wardrobe").getFullList({ autoCancel: false }),
          pb.collection("preferences").getFullList({ autoCancel: false })
        ]);

        // 3. Create a dynamic prompt using the users collection data
        const prompt = `Generate a morning briefing for ${authUser.name}. 
                        Current vibe: ${authUser.aesthetic}. 
                        Daily goal: ${authUser.lifestyle}. 
                        Give a short, witty update and an outfit recommendation.`;

        // 4. Pass the authUser as the profile argument
        const response = await runStylistChat(prompt, prefs, wardrobe, authUser);
        setBriefing(response);
      } catch (err) {
        console.error("Dashboard failed to sync:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSystem();
  }, []);

  return (
    <main className="h-full bg-background text-foreground p-8 font-mono flex flex-col items-center justify-center overflow-y-auto">
      <div className="max-w-5xl w-full space-y-8 pb-24">
        
        {/* Header Section */}
        <header className="flex justify-between items-end border-b border-border-dim pb-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">Stylist_OS</h1>
            <p className="text-text-muted text-[10px] tracking-[0.4em] mt-2 uppercase">
              NODE_ID // {user?.name || "LOG_IN_REQUIRED"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-accent font-bold uppercase text-xs">LOCAL_CHRONOS</p>
            <p className="text-text-subtle text-[10px] uppercase">ACTIVE_SESSION</p>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <section className="md:col-span-2 bg-panel border border-border-dim rounded-3xl p-8 space-y-6">
            <h2 className="text-xs font-black text-accent uppercase tracking-widest">Daily_Briefing</h2>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-border-dim w-3/4 rounded" />
                <div className="h-4 bg-border-dim w-1/2 rounded" />
              </div>
            ) : (
              <p className="text-xl italic leading-relaxed">
                "{briefing?.reply || "Standby for system uplink..."}"
              </p>
            )}
          </section>

          <nav className="space-y-4">
            <Link href="/scan" className="block bg-panel border border-border-dim p-6 rounded-3xl hover:border-accent transition-all">
              <span className="text-sm font-black uppercase italic">Scanner</span>
            </Link>
            <Link href="/gallery" className="block bg-panel border border-border-dim p-6 rounded-3xl hover:border-accent transition-all">
              <span className="text-sm font-black uppercase italic">The_Vault</span>
            </Link>
            <Link href="/chat" className="block bg-bg-contrast text-background p-6 rounded-3xl hover:opacity-90 transition-all">
              <span className="text-sm font-black uppercase italic">Command</span>
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}