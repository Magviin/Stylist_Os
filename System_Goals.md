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