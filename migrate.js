#!/usr/bin/env node
/**
 * Database setup script — runs at container startup.
 * Uses raw SQL to create tables if they don't exist.
 * This avoids needing the prisma CLI binary.
 */

const { PrismaClient } = require(".prisma/client");
const prisma = new PrismaClient();

async function setup() {
  console.log("Setting up database tables...");
  try {
    // Create all tables using raw SQL
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "VisitorStat" (
        "id"             TEXT NOT NULL PRIMARY KEY,
        "totalVisits"    INTEGER NOT NULL DEFAULT 0,
        "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
        "pageViews"      INTEGER NOT NULL DEFAULT 0,
        "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "VisitLog" (
        "id"        TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "page"      TEXT NOT NULL DEFAULT '/',
        "ip"        TEXT NOT NULL DEFAULT '',
        "country"   TEXT NOT NULL DEFAULT 'Unknown',
        "city"      TEXT NOT NULL DEFAULT 'Unknown',
        "browser"   TEXT NOT NULL DEFAULT 'Unknown',
        "os"        TEXT NOT NULL DEFAULT 'Unknown',
        "device"    TEXT NOT NULL DEFAULT 'Desktop',
        "isNew"     BOOLEAN NOT NULL DEFAULT true,
        "referrer"  TEXT NOT NULL DEFAULT 'Direct',
        "daily"     TEXT NOT NULL DEFAULT '',
        "monthly"   TEXT NOT NULL DEFAULT ''
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Application" (
        "id"                TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "vacancyId"         TEXT NOT NULL DEFAULT '',
        "vacancyTitle"      TEXT NOT NULL DEFAULT '',
        "fullName"          TEXT NOT NULL DEFAULT '',
        "email"             TEXT NOT NULL DEFAULT '',
        "phone"             TEXT NOT NULL DEFAULT '',
        "dob"               TEXT NOT NULL DEFAULT '',
        "gender"            TEXT NOT NULL DEFAULT '',
        "address"           TEXT NOT NULL DEFAULT '',
        "education"         TEXT NOT NULL DEFAULT '',
        "institution"       TEXT NOT NULL DEFAULT '',
        "yearGraduated"     TEXT NOT NULL DEFAULT '',
        "experienceYears"   TEXT NOT NULL DEFAULT '',
        "currentEmployer"   TEXT NOT NULL DEFAULT '',
        "currentPosition"   TEXT NOT NULL DEFAULT '',
        "keyQualifications" TEXT NOT NULL DEFAULT '',
        "cvName"            TEXT NOT NULL DEFAULT '',
        "cvFile"            TEXT NOT NULL DEFAULT '',
        "coverLetterName"   TEXT NOT NULL DEFAULT '',
        "coverLetterFile"   TEXT NOT NULL DEFAULT '',
        "status"            TEXT NOT NULL DEFAULT 'Under Review',
        "notes"             TEXT NOT NULL DEFAULT '',
        "appliedAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "createdAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ContactMessage" (
        "id"        TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "name"      TEXT NOT NULL DEFAULT '',
        "email"     TEXT NOT NULL DEFAULT '',
        "phone"     TEXT NOT NULL DEFAULT '',
        "subject"   TEXT NOT NULL DEFAULT '',
        "message"   TEXT NOT NULL DEFAULT '',
        "status"    TEXT NOT NULL DEFAULT 'unread',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Subscriber" (
        "id"           TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "email"        TEXT NOT NULL UNIQUE,
        "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert initial visitor stat row
    await prisma.$executeRawUnsafe(`
      INSERT INTO "VisitorStat" ("id", "totalVisits", "uniqueVisitors", "pageViews")
      VALUES ('main', 0, 0, 0)
      ON CONFLICT ("id") DO NOTHING;
    `);

    console.log("✅ Database tables ready.");
  } catch (err) {
    console.error("❌ Database setup error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

setup().then(() => {
  console.log("Starting Next.js server...");
  require("./server.js");
});
