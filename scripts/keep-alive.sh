#!/bin/bash
cd /home/z/my-project
while true; do
  rm -rf .next/turbopack 2>/dev/null
  npx next dev --port 3000 2>&1 &
  CHILD=$!
  # Wait for it to die
  wait $CHILD 2>/dev/null
  echo "[$(date)] Server died, restarting in 2s..." >> /tmp/keepalive.log
  sleep 2
done
