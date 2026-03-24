"use client";

import { useState } from "react";
import PocketBase from "pocketbase";
import Link from "next/link";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Authenticate the session
      await pb.collection("users").authWithPassword(email, password);
      
      // 2. Uplink established -> Send to Dashboard
      window.location.href = "/";
    } catch (err: any) {
      setError("AUTHENTICATION_FAILED: Check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen bg-background text-foreground flex items-center justify-center font-mono p-6">
      <div className="max-w-sm w-full space-y-8 bg-panel border border-border-dim p-10 rounded-3xl shadow-2xl">
        
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Stylist_OS</h1>
          <p className="text-[10px] text-text-muted tracking-[0.3em] uppercase">User_Access_Required</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-accent ml-1">User_Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ID@SECTOR.COM"
                className="w-full bg-background border border-border-subtle p-4 rounded-xl text-sm focus:border-accent outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-accent ml-1">Access_Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border-subtle p-4 rounded-xl text-sm focus:border-accent outline-none transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-500 font-bold text-center uppercase tracking-tighter">
              {error}
            </p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-bg-contrast text-background font-black italic uppercase py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "ESTABLISHING_UPLINK..." : "INITIATE_SESSION →"}
          </button>

          <p className="text-center">
            <Link href="/signup" className="text-[10px] text-text-muted hover:text-accent uppercase tracking-widest">
              No ID? Initialize_New_Locker
            </Link>
          </p>
        </form>

        <footer className="text-[8px] text-center text-text-subtle tracking-widest uppercase opacity-30">
          Terminal_ID: {typeof window !== 'undefined' ? window.location.hostname : 'LOCAL_NODE'}
        </footer>
      </div>
    </main>
  );
}