@echo off
title STYLIST_OS // SYSTEM_BOOT
echo [SYSTEM] INITIALIZING STYLIST_OS UPLINK...
echo [SYSTEM] STARTING BACKEND (POCKETBASE)...

:: Starts PocketBase in a separate minimized window
start "Stylist_Backend" /min cmd /c "pocketbase.exe serve"

echo [SYSTEM] STARTING FRONTEND (NEXT.JS)...
:: Navigate to frontend and start the dev server
cd frontend
npm run dev