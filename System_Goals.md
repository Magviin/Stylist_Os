SYSTEM_GOALS.md // THE OUTFIT_ENGINE OVERHAUL
1. The "Stylist_Brain" Recommender (Hyper-Intelligence)
[ ] Article Suggestion Engine: If you scan a pair of vintage cargos, the AI shouldn't just say "nice." It should suggest specific pieces (shoes/tees) from your vault—or even online—that complete the silhouette.

[ ] Combinatorial Outfit Logic: A script that runs every night to "crunch" your entire wardrobe and generate 5 new, unique outfit combos you’ve never worn before.

[ ] Aesthetic Alignment: Every recommendation is weighted by your active theme. (e.g., if you're in "SANGUINE_RED" mode, it prioritizes black/red contrast over neutral tones).

2. The "Lookbook" & Synthesis (Visual_Layer)
[ ] The Outfit Roster: A dedicated page for "Heavy Hitters." Save your favorite 3-piece combos so you can grab them in 10 seconds when you're running late for that 8:30 AM Physics lab.

[ ] AI Synthesis (PNG Generator): Integrate a Stable Diffusion or Flux node (local or API).

Goal: Generate a "Flat Lay" PNG of a suggested outfit. The AI "dreams" the outfit onto a clean background so you can see the vibe before you even get out of bed.

Concept Art: Use image-to-image to see how a piece you don't own yet would look with your current favorites.

[ ] Wardrobe Filtering (The Matrix):

Filter by Condition (Clean/Dirty), Fabric (Cotton/Denim), Vibe (Streetwear/Academic), and Weather-Rating.

Search by Hex Code (Find all "Midnight Blue" items instantly).

3. The "Remote_Uplink" (Mobile & Global Access)
[ ] Mobile Portal (APK/PWA): Use Capacitor to turn this into a real app.

Camera Integration: Instant scanning and "Outfit Mockup" overlays.

[ ] Firewall Bypass (Tunnelling): Use Cloudflare Tunnels to make your local Ollama/Stable Diffusion server available on your phone at school.

Safety: Secure it with a "Locker Key" (Auth token) so only your authorized friends can ping your GPU.

4. Social & Multi-User (The Locker Network)
[ ] Multi-User Separation: Ensure every "Locker" is physically separated in PocketBase. Jameson and Alex shouldn't see your stuff unless you hit the "Public Vault" toggle.

[ ] Friend Recommendations: Allow friends to "style" each other. Alex could look at your shared vault and build a "Friday Night" fit for you to approve.

5. Maintenance & Real-World Sync
[ ] Laundry Tracking: Items move to "The Hamper" automatically when you mark an outfit as "Worn."

[ ] Durability Stats: Track how many washes a shirt has had. The AI warns you when a piece is nearing its "End of Life."

6. Terminal_Micro (Quality of Life & Hotfixes)
[ ] Intervention_Mode (Scanner Override):

After the AI analyzes the image, show a "Review_Data" screen.

Allow manual editing of Material, Brand, and Primary_Color before the final save.

[ ] Color_Hex_Picker: Add a small color-dropper so you can select the exact shade of the garment if the AI calls "Navy" something that is clearly "Royal Blue."

[ ] Haptic_Uplink (Mobile): If the APK is active, trigger a small vibration when a scan is successfully archived.

[ ] The "Locker_Star": A single-tap "Favorite" icon on the gallery view to immediately whitelist an item for the Outfit Roster.

[ ] Batch_Laundry_Update: A "Select Multiple" mode in the Vault to move an entire weekend's worth of fits into the "Dirty" state at once.

[ ] Sector_Weather_Widget: A tiny, 1-line text display on the dashboard showing current Lake Tapps temperature and precip (e.g., NW_SECTOR: 48°F // LIGHT_RAIN).

[ ] Custom_Tag_Inject: A text field during scanning to add custom metadata like "Thrifted," "Work_Uniform," or "Gift_From_GF."
7. Advanced_Architecture (The "Lifestyle" Logic)
[ ] Sector_Travel (Packing_Mode):

Generate a "Packing Cube" layout based on your destination.

Example: "10-Day Costa Rica Logic"—prioritize linen, moisture-wicking, and swim gear. Cross-reference with the weight limit for a carry-on.

[ ] The "Jetta_Pilot" Integration:

Footwear-specific logic for manual driving. The AI flags "Clunky Boots" when you have a long commute to Green River, suggesting flexible soles for better clutch feel.

[ ] Scent_Sync (Fragrance_Mapping):

Create a "Scent Library" for your Nautica and English Laundry collections.

The AI suggests a fragrance based on the outfit's "Vibe Score" (e.g., "Parchment_Light + English Laundry = Sophisticated Academic").

[ ] Gym_Protocol (PPL_Vault):

Categorize workout gear by "Push," "Pull," or "Legs."

The AI tracks "Compression_Level" and "Sweat_History" to ensure you aren't wearing deadlift socks on chest day.

[ ] Semantic_Vault_Search:

Implement vector embeddings (using Ollama) so you can search by feeling instead of keywords.

Search: "Something that feels like a rainy night in Seattle" → returns your darkest hoodie and waterproof boots.

[ ] Cost_Per_Wear (The "Warehouse" Metric):

Input the price of a garment. The app divides by "Wear Count" to show you the real value.

Goal: Identify "High-Value" staples vs. "Vault Rot" (items you bought but never wear).

[ ] Dynamic_Dashboard_Ambience:

The UI background subtly shifts colors based on the time of day and local Lake Tapps weather. If it’s sunset at the lake, the "Onyx_Amber" theme glows a bit warmer.

8. System_Hardening (The Dev Ops)
[ ] Auto_Backup_Sequence: A cron job that exports your PocketBase pb_data to a private Google Drive or a physical HDD every Sunday.

[ ] Image_Compression_Pipeline: Automatically downscale 4K phone photos to 1080p before saving to PocketBase to keep the "Vault" from bloating your SSD.

[ ] CI/CD for Stylist_OS: Set up a GitHub Action so when you git push, the app automatically builds and checks for errors before you even open your phone.

9. Business? (The Commercial Pivot)
[ ] The "Edge-First" Model (Zero Server Overhead):

Instead of hosting massive models, the app runs the "Heavy Thinking" on the user's local hardware (like your Ollama setup). You sell the Interface and the Workflow, not the compute.

Profitability: You don't have a $5,000/month AWS bill if the user is the one spinning the fans.

[ ] Affiliate Integration (The "Missing Piece" Commission):

When the AI suggests an outfit but realizes you are missing a "Cream Linen Shirt" to complete the look, it provides a direct link to buy one.

Revenue: You take a 5–15% cut of every sale generated through the "Stylist Suggestion."

[ ] B2B: The "Smart Mirror" White-Label:

Sell the API to mid-tier clothing brands. Their customers upload their current closet, and the brand's website shows them exactly how new arrivals would "fit" into their existing roster.

Value: It slashes return rates for retailers because people actually know what they can wear the item with before they buy it.

[ ] The "Trend-Watcher" Data Aggregator:

Anonymize the data (e.g., "In the PNW Sector, 40% of users are pivoting from Dark Academia to Gorpcore this month").

Revenue: Brands pay six figures for real-time, "In-The-Closet" data that isn't just based on what people buy, but what they actually wear.

[ ] "Pro" Features (The One-Time Buy):

Avoid the monthly sub. Offer a $20 "Lifetime License" for the PNG Generation engine, unlimited friends in a "Locker Group," and advanced travel packing logic.

[ ] Wardrobe Valuation for Insurance:

Automate a PDF export of the entire "Vault" with estimated values. People with high-end collections (or just a lot of vintage) will pay for an easy way to prove their inventory to an insurance company in case of a fire or theft.