# 📡 Stylist_OS // v1.1

A hyper-personalized, multi-tenant wardrobe management system. Built for the academic grind, the warehouse shifts, and everything in between.

## 🚀 The Vibe
Stylist_OS isn't just a "closet app." It’s a private Digital Valet that knows your schedule, your aesthetic, and the weather at your exact coordinates. It uses a "Locker" architecture, meaning you can host it for your friends and everyone gets their own private, AI-driven inventory.

## 🧠 Core Features
- **Digital Valet**: Visual outfit suggestions rendered directly in the chat.
- **Locker System**: Multi-user support with server-side privacy rules via PocketBase.
- **Dual-Brain Logic**: Uses **Gemini 3 Flash** for high-level cloud styling with an automatic failover to a local **Ollama (Llama 3)** instance if the API hits a limit.
- **Atmospheric Awareness**: (In Progress) Live weather integration to veto suede shoes on rainy days.

## 🛠 Tech Stack
- **Frontend**: Next.js 15+, Tailwind v4, TypeScript.
- **Backend**: PocketBase (Go-based, lightning fast).
- **AI**: Google Gemini SDK + Local Ollama Failover.
- **Theme**: Onyx / Parchment / Voltage (Dynamic CSS Variables).

## 📥 Setup Protocol

### 1. **Clone & Install**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/Stylist_OS.git](https://github.com/YOUR_USERNAME/Stylist_OS.git)
   npm install
   ```
### 2. Wake the Database
Download PocketBase and run:

   ```bash
   ./pocketbase serve
   ```
Note: Ensure you have collections for wardrobe, preferences, and messages with a user relation field.

### 3. Wake the Brain
Ensure Ollama is running locally:

```bash
ollama pull llama3
```
### 4. Environment Configuration
Create a .env.local and add your NEXT_PUBLIC_GEMINI_API_KEY.

### 5. Execute

```bash
npm run dev
```

🛡 License
MIT // Created by Gavin Mansfield
