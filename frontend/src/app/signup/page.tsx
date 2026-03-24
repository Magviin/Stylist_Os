"use client";

import { useState } from "react";
import PocketBase from "pocketbase";
import Link from "next/link";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    aesthetic: "",
    lifestyle: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create the user in the 'users' collection
      await pb.collection("users").create({
        ...formData,
        emailVisibility: true,
      });

      // 2. Immediately log them in
      await pb.collection("users").authWithPassword(formData.email, formData.password);
      
      // 3. Redirect to Dashboard
      window.location.href = "/";
    } catch (err: any) {
      setError("UPLINK_DENIED: Registration failed. Check requirements.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono p-6">
      <div className="max-w-md w-full space-y-8 bg-panel border border-border-dim p-10 rounded-3xl shadow-2xl">
        
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Stylist_OS</h1>
          <p className="text-[10px] text-text-muted tracking-[0.3em] uppercase">Initialize_New_User_Locker</p>
        </header>

        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] uppercase font-bold text-accent ml-1">Identity_Name</label>
            <input 
              type="text" 
              placeholder="USER_NAME"
              className="w-full bg-background border border-border-subtle p-3 rounded-xl text-sm focus:border-accent outline-none"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] uppercase font-bold text-accent ml-1">Email_Address</label>
            <input 
              type="email" 
              placeholder="ID@STYLOS.NETWORK"
              className="w-full bg-background border border-border-subtle p-3 rounded-xl text-sm focus:border-accent outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-accent ml-1">Access_Key</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-background border border-border-subtle p-3 rounded-xl text-sm focus:border-accent outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-accent ml-1">Verify_Key</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-background border border-border-subtle p-3 rounded-xl text-sm focus:border-accent outline-none"
              onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-accent ml-1">Aesthetic_ID</label>
            <input 
              type="text" 
              placeholder="e.g. MINIMALIST"
              className="w-full bg-background border border-border-subtle p-3 rounded-xl text-sm focus:border-accent outline-none"
              onChange={(e) => setFormData({...formData, aesthetic: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-accent ml-1">Daily_Context</label>
            <input 
              type="text" 
              placeholder="e.g. DAILY_ROUTINE"
              className="w-full bg-background border border-border-subtle p-3 rounded-xl text-sm focus:border-accent outline-none"
              onChange={(e) => setFormData({...formData, lifestyle: e.target.value})}
              required
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-bg-contrast text-background font-black italic uppercase py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "CREATING_LOCKER..." : "CREATE_LOCKER →"}
            </button>
            <p className="mt-4 text-center">
              <Link href="/login" className="text-[10px] text-text-muted hover:text-accent uppercase tracking-widest">
                Existing_Account // Login
              </Link>
            </p>
          </div>
        </form>

        {error && (
          <p className="text-[10px] text-red-500 font-bold text-center uppercase mt-4">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}