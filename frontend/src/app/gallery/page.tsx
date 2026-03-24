"use client";

import { useEffect, useState } from "react";
import PocketBase, { ClientResponseError } from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function WardrobeGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await pb.collection("wardrobe").delete(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    // Fetch all garments from your local PocketBase
    const fetchItems = async () => {
      try {
        const records = await pb.collection("wardrobe").getFullList({
          sort: "-created",
          // Avoid auto-cancel when React Strict Mode or Link prefetch fires a second
          // overlapping GET; see https://github.com/pocketbase/js-sdk#auto-cancellation
          requestKey: null,
        });
        setItems(records);
      } catch (err) {
        if (err instanceof ClientResponseError && err.isAbort) return;
        console.error("Failed to fetch wardrobe:", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground p-8 font-mono">
      <header className="max-w-6xl mx-auto mb-12 border-b border-border-dim pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">The_Vault</h1>
          <p className="text-text-muted text-xs">ARCHIVED_INVENTORY / TOTAL_ITEMS: {items.length}</p>
        </div>
        <a href="/" className="text-xs hover:text-accent transition-colors border border-border-dim px-4 py-2 rounded-full">
          ← BACK_TO_SCANNER
        </a>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group bg-panel border border-border-dim rounded-2xl overflow-hidden hover:border-accent/30 transition-all">
            {/* PocketBase Image URL Construction */}
            <div className="aspect-3/4 overflow-hidden bg-background">
              <img 
                src={`${pb.baseUrl}/api/files/${item.collectionId}/${item.id}/${item.photo}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                alt={item.item_name}
              />
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-bold truncate uppercase">{item.item_name}</h3>
              <div className="flex flex-wrap gap-1">
                {/* Safe Tag Handling: Only parse if it's a string, otherwise use as-is */}
                {(Array.isArray(item.tags) ? item.tags : JSON.parse(item.tags || "[]")).map((tag: string) => (
                    <span key={tag} className="text-[8px] bg-card text-text-muted px-2 py-0.5 rounded-full uppercase">
                        {tag}
                    </span>
                ))}
              </div>
              <p className="text-[10px] text-text-subtle italic line-clamp-2">{item.notes}</p>
              <button
                type="button"
                disabled={deletingId === item.id}
                onClick={() => handleDelete(item.id)}
                className="w-full text-[10px] uppercase tracking-wider border border-destructive-border/60 text-destructive-text/90 hover:border-destructive-hover-border/40 hover:bg-destructive-surface/30 disabled:opacity-40 disabled:pointer-events-none py-2 rounded-lg transition-colors"
              >
                {deletingId === item.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}