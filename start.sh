#!/bin/sh
echo "Running Prisma DB push..."
node_modules/.bin/prisma db push --skip-generate --accept-data-loss
echo "Starting server..."
node server.js
