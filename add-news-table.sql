-- Run this in Neon SQL Editor to add the News, Bids, Vacancy tables

CREATE TABLE IF NOT EXISTS "News" (
  "id"        TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title"     TEXT NOT NULL DEFAULT '',
  "summary"   TEXT NOT NULL DEFAULT '',
  "content"   TEXT NOT NULL DEFAULT '',
  "category"  TEXT NOT NULL DEFAULT '',
  "author"    TEXT NOT NULL DEFAULT '',
  "imageUrl"  TEXT NOT NULL DEFAULT '',
  "featured"  BOOLEAN NOT NULL DEFAULT false,
  "status"    TEXT NOT NULL DEFAULT 'draft',
  "date"      TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Bid" (
  "id"           TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title"        TEXT NOT NULL DEFAULT '',
  "description"  TEXT NOT NULL DEFAULT '',
  "budget"       TEXT NOT NULL DEFAULT '',
  "budgetAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "deadline"     TEXT NOT NULL DEFAULT '',
  "status"       TEXT NOT NULL DEFAULT 'Open',
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Vacancy" (
  "id"           TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title"        TEXT NOT NULL DEFAULT '',
  "department"   TEXT NOT NULL DEFAULT '',
  "type"         TEXT NOT NULL DEFAULT 'Full-Time',
  "salary"       TEXT NOT NULL DEFAULT '',
  "deadline"     TEXT NOT NULL DEFAULT '',
  "description"  TEXT NOT NULL DEFAULT '',
  "requirements" TEXT NOT NULL DEFAULT '',
  "status"       TEXT NOT NULL DEFAULT 'Open',
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
