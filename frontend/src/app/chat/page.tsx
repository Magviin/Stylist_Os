"use client";

import { useState, useEffect, useRef } from "react";
import PocketBase from "pocketbase";
import { runStylistChat } from "@/lib/gemini";
import OutfitCard from "@/components/OutfitCard";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export default function CommandCenter() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [prefs, setPrefs] = useState<any[]>([]);
  const [wardrobe, setWardrobe] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Initial Load: Rules, Wardrobe, AND Chat History
  // src/app/chat/page.tsx

useEffect(() => {
    const init = async () => {
      try {
        // Add { autoCancel: false } to EVERY request inside Promise.all
        const [p, w, m] = await Promise.all([
          pb.collection("preferences").getFullList({ 
            sort: "-importance", 
            autoCancel: false // <--- Add this
          }),
          pb.collection("wardrobe").getFullList({ 
            autoCancel: false // <--- Add this
          }),
          pb.collection("messages").getFullList({ 
            sort: "created", 
            autoCancel: false // <--- Add this
          })
        ]);
        setPrefs(p);
        setWardrobe(w);
        setMessages(m);
      } catch (err) {
        // Ignore AbortErrors so they don't clutter your console
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error("Initialization Failed:", err);
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    try {
      // 2. Save User Message to PocketBase
      const userRecord = await pb.collection("messages").create({
        role: "user",
        content: userText,
      });
      setMessages((prev) => [...prev, userRecord]);

      // 3. Get AI Response
      const aiResponse = await runStylistChat(userText, prefs, wardrobe);

      // 4. Handle Preferences if AI updated them
      if (aiResponse.action === "ADD_PREFERENCE") {
        await pb.collection("preferences").create(aiResponse.actionData);
        const updatedPrefs = await pb.collection("preferences").getFullList({ sort: "-importance" });
        setPrefs(updatedPrefs);
      }

      // 5. Save AI Message to PocketBase (including outfit data if present)
      const aiRecord = await pb.collection("messages").create({
        role: "assistant",
        content: aiResponse.reply,
        outfit: aiResponse.action === "OUTFIT_SUGGESTION" ? aiResponse.actionData : null
      });

      setMessages((prev) => [...prev, aiRecord]);
    } catch (err) {
      console.error("Chat Loop Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (confirm("Wipe all logs from local memory?")) {
      const allMsgs = await pb.collection("messages").getFullList();
      await Promise.all(allMsgs.map(m => pb.collection("messages").delete(m.id)));
      setMessages([]);
    }
  };

  return (
    <main className="h-full bg-background text-foreground p-6 font-mono flex flex-col">
      <header className="flex justify-between items-center border-b border-border-dim pb-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tighter italic uppercase">Command_Center // v1.1</h1>
          <p className="text-[10px] text-text-subtle uppercase tracking-widest">Status: Memory_Locked</p>
        </div>
        <button onClick={clearHistory} className="text-[10px] border border-destructive-border text-destructive-text px-4 py-2 rounded-full hover:bg-destructive-surface transition-all">
          PURGE_LOGS
        </button>
      </header>

      <div className="flex flex-1 gap-8 overflow-hidden">
        {/* Sidebar: Preferences */}
        <section className="w-80 flex flex-col border-r border-border-dim pr-6">
          <h2 className="text-sm font-black uppercase tracking-tighter mb-4">Style_Protocol</h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {prefs.map((p) => (
              <div key={p.id} className="bg-panel p-3 rounded-lg border border-border-dim relative group">
                <p className="text-[10px] text-accent font-bold uppercase mb-1">{p.key}</p>
                <p className="text-[11px] italic text-text-muted leading-tight">"{p.value}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main: Chat View */}
        <section className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-6 p-6 bg-card rounded-2xl border border-border-dim scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  m.role === "user" 
                  ? "bg-bg-contrast text-background font-bold text-sm shadow-xl" 
                  : "bg-panel border border-border-subtle text-foreground text-sm"
                }`}>
                  <p className="text-[8px] uppercase font-black opacity-30 mb-2 tracking-widest">
                    {m.role === "user" ? "Gavin" : "Stylist_OS"}
                  </p>
                  <p>{m.content}</p>
                  
                  {/* Outfit Rendering Logic */}
                  {m.outfit && <OutfitCard outfit={m.outfit} wardrobe={wardrobe} />}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] italic opacity-40 animate-pulse">Syncing with Stylist_OS...</div>}
          </div>

          <div className="flex gap-3 bg-panel p-2 rounded-2xl border border-border-dim focus-within:border-accent/50 transition-all">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Query the vault..."
              className="flex-1 bg-transparent p-4 text-sm focus:outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-accent text-background px-8 rounded-xl font-black uppercase italic text-xs hover:bg-interactive-highlight transition-all"
            >
              Execute
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}