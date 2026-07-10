#!/bin/bash
cd /home/z/my-project
while true; do
  echo "$(date): Starting Next.js production server..."
  NODE_OPTIONS="--max-old-space-size=384" npx next start -p 3000 2>&1
  echo "$(date): Server exited. Restarting in 3s..."
  sleep 3
done