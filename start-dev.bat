@echo off
echo 🧹 Cleaning .next, .contentlayer...

rd /s /q .next
rd /s /q .contentlayer
rd /s /q .turbo

echo 🚀 Starting Contentlayer...
start "Contentlayer Dev" cmd /k "cd /d D:\Projects\portofolio_blog\taxonomy && pnpm contentlayer dev"

echo 🚀 Starting Next.js...
start "Next Dev" cmd /k "cd /d D:\Projects\portofolio_blog\taxonomy && pnpm next dev"
