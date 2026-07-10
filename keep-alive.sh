#!/bin/bash
while true; do
  cd /home/z/my-project
  npx next start -p 3000
  echo "$(date): Server died, restarting in 2s..."
  sleep 2
done
