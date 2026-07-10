-- Run this in Neon SQL Editor to create all tables

CREATE TABLE IF NOT EXISTS "VisitorStat" (
  "id"             TEXT NOT NULL PRIMARY KEY,
  "totalVisits"    INTEGER NOT NULL DEFAULT 0,
  "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
  "pageViews"      INTEGER NOT NULL DEFAULT 0,
  "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE IF NOT EXISTS "Application" (
  "id"                TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "vacancyId"         TEXT NOT NULL,
  "vacancyTitle"      TEXT NOT NULL,
  "fullName"          TEXT NOT NULL,
  "email"             TEXT NOT NULL,
  "phone"             TEXT NOT NULL,
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

CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id"        TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name"      TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "phone"     TEXT NOT NULL DEFAULT '',
  "subject"   TEXT NOT NULL DEFAULT '',
  "message"   TEXT NOT NULL,
  "status"    TEXT NOT NULL DEFAULT 'unread',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Subscriber" (
  "id"           TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "email"        TEXT NOT NULL UNIQUE,
  "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "News" (
  "id"        TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title"     TEXT NOT NULL,
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
  "title"        TEXT NOT NULL,
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
  "title"        TEXT NOT NULL,
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

-- Add initial visitor stat row
INSERT INTO "VisitorStat" ("id", "totalVisits", "uniqueVisitors", "pageViews")
VALUES ('main', 0, 0, 0)
ON CONFLICT ("id") DO NOTHING;
