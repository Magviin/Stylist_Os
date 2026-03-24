# SYSTEM_GOALS.md // THE OUTFIT_ENGINE OVERHAUL

## 1. Stylist_Brain // Intelligence Layer
[ ] Deterministic Grounding: Integrate the Fashionpedia Ontology (JSON schema) to serve as the absolute truth for apparel categories, fabrics, and silhouettes.

[ ] Compatibility Logic: Replace AI "guessing" with a mathematical synergy matrix based on the Fashionpedia attributes.

[ ] The Chaos Slider: Implement a "Matching Threshold" variable. 
    - 100%: High-synergy, color-theory-approved trifectas only.
    - 0%: Intentionally clashing, high-contrast disaster fits for experimental days.

[ ] Article Suggestion Engine: Logic gate where scanning a new item triggers suggestions for existing Vault pieces to complete a silhouette.

[ ] Combinatorial Logic: Script to run daily "Vault crunches" to generate five unique, unworn outfit combinations based on the current Slider setting.

## 2. Lookbook & Synthesis // Visual Layer
[ ] The Outfit Roster: Dedicated UI for "Heavy Hitters." Save favorite 3-piece combinations for high-speed access.

[ ] AI Synthesis (PNG Generator): Integrate a local Stable Diffusion or Flux node via API.
    - Goal: Generate "Flat Lay" PNGs of suggested outfits on clean backgrounds.
    - Concept Art: Use image-to-image to visualize potential purchases with current inventory.

[ ] The Matrix (Advanced Filtering):
    - Filter by: Condition (Clean/Dirty), Fabric (Cotton/Denim/Linen), Vibe (Street/Academic), and Weather-Rating.
    - Hex Search: Instant filtering by precise color hex codes.

## 3. Remote_Uplink // Global Access
[ ] Mobile Portal (APK/PWA): Use Capacitor for native Android/iOS wrapping.
    - Camera: Direct hardware integration for instant scanning and mockup overlays.

[ ] Firewall Bypass (Tunnelling): Implement Cloudflare Tunnels to bridge local AI instances to mobile devices.

[ ] Secure Uplink: Use "Locker Keys" (Auth tokens) to restrict GPU access.

## 4. Multi-Locker // Social Architecture
[ ] User Separation: Hard physical separation of data in PocketBase for privacy.

[ ] Peer Recommendations: "Guest Stylist" mode where connected users can suggest outfits for approval.

## 5. Maintenance // Real-World Sync
[ ] Laundry Tracking: Automatic "Hamper" migration when an outfit is marked as "Active/Worn."

[ ] Durability Metrics: Track wash-cycles per garment; trigger "End of Life" warnings.

## 6. Terminal_Micro // UX & Quality of Life
[ ] Integrated AI Chat: A dedicated chat screen where users can prompt for outfits, adjust the Chaos Slider, and see real-time data visualizations of the suggested fit.

[ ] Intervention_Mode: Review screen to manually correct AI-misidentified materials or brands.

[ ] Color_Hex_Picker: Dropper tool to ensure precise color matching.

[ ] Sector_Weather_Widget: Dashboard integration for real-time local temperature and precipitation data.

## 7. Lifestyle_Logic // Contextual Inputs
[ ] Sector_Travel (Packing_Mode): Generate packing lists based on destination climate.

[ ] Driving_Integration: Footwear logic for manual transmissions; flag clunky boots during long commutes in the Jetta.

[ ] Scent_Sync: Map fragrance library to outfit "Vibe Scores" (e.g., Fresh/Citrus vs. Woody/Deep).

[ ] Gym_Protocol: Categorize gear by PPL (Push/Pull/Legs) split.

[ ] Cost_Per_Wear: Divide garment price by wear-count to calculate real-world value.

## 8. Data_Visualizer // The Analytics Suite
[ ] Versatility Index: Score items based on unique outfit facilitation to identify "dead code" in the closet.

[ ] Color Palette Distribution: Dynamic pie/donut charts of hex-code breakdown across the vault.

[ ] System Gap Analysis: Logic engine to flag bottlenecks (e.g., too many jackets, zero base layers).

[ ] Compatibility Heatmap: Visual grid showing which items have the highest synergy scores.

## 9. System_Hardening // Dev-Ops
[ ] Fashionpedia Ingestion: Script to parse and seed the master ontology into PocketBase collections.

[ ] Auto_Backup: Weekly cron job for redundant physical or cloud storage.

[ ] CI/CD Pipeline: GitHub Actions for automated build checks.

## 10. Business_Pivot // Commercial Viability
[ ] Edge-First Model: Zero server overhead by utilizing user-owned hardware for inference.

[ ] Affiliate Integration: Generate revenue through "missing piece" commissions.

[ ] Insurance_Audit: Automated PDF inventory exports for asset protection.
EOF
