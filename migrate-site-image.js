const Database = require(require('path').join(process.cwd(), 'node_modules', 'better-sqlite3'));
const path = require('path');

const db = new Database(path.join('prisma', 'db', 'custom.db'));

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "SiteImage" (
      "id"        TEXT NOT NULL PRIMARY KEY,
      "key"       TEXT NOT NULL UNIQUE,
      "url"       TEXT NOT NULL,
      "label"     TEXT NOT NULL DEFAULT '',
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedBy" TEXT
    )
  `);
  console.log('SiteImage table created (or already exists).');
} catch (e) {
  console.error('Migration error:', e.message);
}

db.close();
