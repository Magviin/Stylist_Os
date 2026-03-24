"use client";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

interface OutfitProps {
  outfit: {
    outfit_name: string;
    items: string[];
    reasoning: string;
  };
  wardrobe: any[];
}

export default function OutfitCard({ outfit, wardrobe }: OutfitProps) {
  // Match the IDs suggested by the AI to the full records in your state
  const suggestedItems = wardrobe.filter(item => outfit.items.includes(item.id));

  return (
    <div className="mt-4 bg-panel border border-border-dim rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="p-4 border-b border-border-dim bg-background/50">
        <h3 className="text-accent font-black italic uppercase tracking-tighter text-sm">
          {outfit.outfit_name}
        </h3>
        <p className="text-[10px] text-text-muted mt-1 italic leading-tight">
          {outfit.reasoning}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-px bg-border-dim">
        {suggestedItems.map((item) => (
          <div key={item.id} className="relative aspect-3/4 bg-background group overflow-hidden">
            <img 
              src={`${pb.baseUrl}/api/files/${item.collectionId}/${item.id}/${item.photo}`} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
              alt={item.item_name}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-[9px] font-black text-white uppercase tracking-widest">{item.item_name}</p>
              <p className="text-[7px] text-white/60 uppercase">{item.material}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}