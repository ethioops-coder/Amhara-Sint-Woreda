const fs = require('fs');

const people = [
  // Mayor & top leaders
  { file: 'mayor-photo',         initials: 'SM', bg: '#0d4a28', accent: '#c8a415' },
  { file: 'official-deputy',     initials: 'GH', bg: '#1a3a5c', accent: '#4a9fd4' },
  { file: 'official-speaker',    initials: 'TM', bg: '#5c1a3a', accent: '#d44a9f' },
  { file: 'official-manager',    initials: 'YT', bg: '#3a2a0d', accent: '#d4a044' },
  // Cabinet page
  { file: 'cabinet_samuel',      initials: 'SM', bg: '#0d4a28', accent: '#c8a415' },
  { file: 'cabinet_ashenafi',    initials: 'AA', bg: '#1a4a2e', accent: '#4ad48a' },
  { file: 'cabinet_shemels',     initials: 'SG', bg: '#2a1a4a', accent: '#9a4ad4' },
  { file: 'cabinet_seid',        initials: 'SK', bg: '#4a2a1a', accent: '#d48a4a' },
  // Department heads
  { file: 'official_abebe',      initials: 'AK', bg: '#1a4a3a', accent: '#4ad4b0' },
  { file: 'official_hiwot',      initials: 'HA', bg: '#4a3a1a', accent: '#d4b04a' },
  { file: 'official_dawit',      initials: 'DA', bg: '#1a2a4a', accent: '#4a70d4' },
  { file: 'official_mekdes',     initials: 'MT', bg: '#4a1a2a', accent: '#d44a70' },
  { file: 'official_tadesse',    initials: 'TG', bg: '#2a4a1a', accent: '#90d44a' },
  { file: 'official_selamawit',  initials: 'SB', bg: '#4a1a4a', accent: '#d44ad4' },
  { file: 'official_yonas',      initials: 'YT', bg: '#1a3a4a', accent: '#4abcd4' },
  { file: 'official_tigist',     initials: 'TM', bg: '#3a4a1a', accent: '#bcd44a' },
  { file: 'official_fitsum',     initials: 'FB', bg: '#4a3a2a', accent: '#d4904a' },
  { file: 'official_nardos',     initials: 'NT', bg: '#2a3a4a', accent: '#4a90d4' },
  { file: 'official_henok',      initials: 'HM', bg: '#1a4a4a', accent: '#4ad4d4' },
  { file: 'official_bethlehem',  initials: 'BH', bg: '#4a4a1a', accent: '#d4d44a' },
];

function makeSVG(initials, bg, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0.9"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <circle cx="200" cy="200" r="188" fill="none" stroke="${accent}" stroke-width="0.6" opacity="0.25"/>
  <circle cx="200" cy="200" r="150" fill="${accent}" opacity="0.06"/>
  <ellipse cx="200" cy="460" rx="130" ry="80" fill="${accent}" opacity="0.18"/>
  <ellipse cx="200" cy="310" rx="88" ry="56" fill="${accent}" opacity="0.18"/>
  <circle cx="200" cy="170" r="72" fill="${accent}" opacity="0.18"/>
  <circle cx="200" cy="170" r="65" fill="${bg}"/>
  <text x="200" y="193" font-family="Arial,sans-serif" font-size="54" font-weight="800"
        fill="${accent}" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">${initials}</text>
  <rect x="0" y="390" width="133" height="10" fill="#1a6b3c" opacity="0.9"/>
  <rect x="133" y="390" width="134" height="10" fill="#c8a415" opacity="0.9"/>
  <rect x="267" y="390" width="133" height="10" fill="#c62828" opacity="0.9"/>
</svg>`;
}

let count = 0;
people.forEach(p => {
  const path = 'public/' + p.file + '.png';
  // Only write if file doesn't already exist as a real PNG (> 1KB means it's a real photo)
  const exists = fs.existsSync(path);
  const size = exists ? fs.statSync(path).size : 0;
  if (!exists || size < 2000) {
    fs.writeFileSync(path, makeSVG(p.initials, p.bg, p.accent));
    console.log('Written: ' + path);
    count++;
  } else {
    console.log('Skipped (real photo exists): ' + path + ' (' + size + ' bytes)');
  }
});
console.log('Done. ' + count + ' avatars written.');
