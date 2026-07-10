#!/bin/bash
cd /home/z/my-project
while true; do
  NODE_OPTIONS="--max-old-space-size=512" npx next start -p 3000 &
  SERVER_PID=$!
  # Keep-alive pings
  for i in $(seq 1 300); do
    sleep 2
    if ! kill -0 $SERVER_PID 2>/dev/null; then
      break
    fi
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null
  done
  kill $SERVER_PID 2>/dev/null
  wait $SERVER_PID 2>/dev/null
  echo "$(date): Restarting server..."
  sleep 1
done
