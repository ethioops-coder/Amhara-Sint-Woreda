const { spawn } = require('child_process');
const path = require('path');

function startServer() {
  const child = spawn('npx', ['next', 'dev', '-p', '3000'], {
    cwd: '/home/z/my-project',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=384' },
    detached: false
  });
  
  child.stdout.on('data', d => process.stdout.write(d));
  child.stderr.on('data', d => process.stderr.write(d));
  child.on('exit', (code) => {
    console.log(`Server exited with code ${code}, restarting in 1s...`);
    setTimeout(startServer, 1000);
  });
  
  // Health check loop to keep things warm
  const http = require('http');
  setInterval(() => {
    http.get('http://localhost:3000/', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
    }).on('error', () => {});
  }, 5000);
}

startServer();
