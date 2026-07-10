#!/bin/bash
cd /home/z/my-project
exec node --max-old-space-size=256 node_modules/.bin/next start -p 3000 -H 0.0.0.0