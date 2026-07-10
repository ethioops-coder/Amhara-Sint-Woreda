#!/bin/bash
# Auto-restarting server daemon for Sint Woreda website
cd /home/z/my-project

while true; do
  echo "[$(date)] Starting Next.js server on port 8080..."
  NODE_OPTIONS="--max-old-space-size=256" node node_modules/.bin/next start -p 8080 -H 0.0.0.0
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE. Restarting in 3s..."
  sleep 3
done