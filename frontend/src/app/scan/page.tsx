"use client";

import { useState } from "react";
import Link from "next/link";
import { analyzeClothing } from "@/lib/gemini";
import PocketBase from "pocketbase";

// Connect to your local PocketBase instance
const pb = new PocketBase("http://127.0.0.1:8090");

export default function WardrobeScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // 1. Handle image selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 2. Send the image to your Gemini Vision engine
  const handleScan = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // Remove the base64 header for the AI
      const base64Data = image.split(",")[1];
      const result = await analyzeClothing(base64Data);
      setAiResult(result);
    } catch (err) {
      console.error(err);
      alert("AI Scan failed. Check your console for details.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Save the photo and AI metadata to PocketBase
  const handleSave = async () => {
    if (!file || !aiResult) return;
    
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("item_name", aiResult.item_name);
    formData.append("material", aiResult.material);
    formData.append("vibe", aiResult.vibe);
    formData.append("size", aiResult.size);
    formData.append("notes", aiResult.notes);
    // Tags are sent as a JSON string for PocketBase to parse
    formData.append("tags", JSON.stringify(aiResult.tags));

    try {
      await pb.collection("wardrobe").create(formData);
      alert("Item successfully archived in your local vault.");
      setAiResult(null);
      setImage(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Save failed. Ensure PocketBase is running and the 'wardrobe' collection exists.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-6 font-mono">
      <div className="max-w-xl mx-auto space-y-10">
        
        <header className="border-b border-border-dim pb-6 flex justify-between items-end gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">Stylist_OS // v1.0</h1>
            <p className="text-text-muted text-xs mt-1">LOCAL_HOST / WARDROBE_SCANNER</p>
          </div>
          <Link
            href="/gallery"
            prefetch={false}
            className="text-xs hover:text-accent transition-colors border border-border-dim px-4 py-2 rounded-full shrink-0"
          >
            THE_VAULT →
          </Link>
        </header>

        {/* Upload Zone */}
        <section className="relative group border-2 border-dashed border-border-dim rounded-2xl p-8 transition-all hover:border-border-strong bg-panel">
          <input type="file" onChange={handleFileChange} className="hidden" id="wardrobe-upload" />
          <label htmlFor="wardrobe-upload" className="cursor-pointer block">
            {image ? (
              <img src={image} alt="Preview" className="max-h-80 mx-auto rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all" />
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="text-4xl">＋</div>
                <p className="text-sm font-bold opacity-40">SELECT GARMENT PHOTO</p>
              </div>
            )}
          </label>
        </section>

        {image && !aiResult && (
          <button 
            onClick={handleScan}
            disabled={loading}
            className="w-full bg-bg-contrast text-background py-5 rounded-xl font-black uppercase tracking-widest hover:bg-interactive-highlight disabled:opacity-20 transition-all"
          >
            {loading ? "Initializing Vision..." : "Identify Garment"}
          </button>
        )}

        {/* AI Results Display */}
        {aiResult && (
          <div className="bg-panel border border-border-dim rounded-2xl p-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start border-b border-border-dim pb-4">
              <h2 className="text-lg font-bold text-accent/80">GARMENT_METADATA</h2>
              <span className="text-[10px] bg-card px-2 py-1 rounded text-text-muted">MATCH_CONFIRMED</span>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-xs">
              <div><p className="text-text-subtle mb-1">IDENTIFIER</p><p className="font-bold">{aiResult.item_name}</p></div>
              <div><p className="text-text-subtle mb-1">COMPOSITION</p><p className="font-bold">{aiResult.material}</p></div>
              <div><p className="text-text-subtle mb-1">AESTHETIC</p><p className="font-bold uppercase">{aiResult.vibe}</p></div>
              <div><p className="text-text-subtle mb-1">DIMENSIONS</p><p className="font-bold">{aiResult.size}</p></div>
              
              <div className="col-span-2">
                <p className="text-text-subtle mb-2">CLASSIFICATION_TAGS</p>
                <div className="flex flex-wrap gap-2">
                  {aiResult.tags.map((tag: string) => (
                    <span key={tag} className="border border-border-subtle px-3 py-1 rounded-full text-[9px] uppercase tracking-tighter bg-card text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-2 pt-2">
                <p className="text-text-subtle mb-1">CURATOR_NOTES</p>
                <p className="italic text-text-muted leading-relaxed">{aiResult.notes}</p>
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="w-full border border-accent/20 bg-accent/5 py-4 rounded-xl text-accent font-bold hover:bg-accent/10 transition-all"
            >
              ARCHIVE TO LOCAL DATABASE
            </button>
          </div>
        )}
      </div>
    </main>
  );
}