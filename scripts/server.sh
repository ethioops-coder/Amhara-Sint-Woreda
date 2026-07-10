#!/bin/bash
cd /home/z/my-project
while true; do
  npx next start --port 3000 2>&1
  echo "[$(date)] Restarting..." >> /tmp/server-restart.log
  sleep 1
done
