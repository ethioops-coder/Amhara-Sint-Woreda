# Amhara Sayint Woreda — Official Portal

Official government portal for **Amhara Sayint Woreda**, South Wollo Zone, Amhara Region, Ethiopia.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Storage**: JSON files (`data/` directory)
- **Admin**: Password-protected admin panel at `/admin`

---

## 🚀 Deploy to Railway (Recommended)

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Ready for Railway deployment"
git remote add origin https://github.com/YOUR_USERNAME/amhara-sayint-woreda.git
git push -u origin main
```

### Step 2 — Create Railway Project

1. Go to [railway.app](https://railway.app) and sign up/login (free with GitHub)
2. Click **New Project → Deploy from GitHub repo**
3. Select your repository
4. Railway auto-detects the `Dockerfile` — click **Deploy**

### Step 3 — Set Environment Variables

In Railway dashboard → your service → **Variables**, add:

| Variable | Value |
|---|---|
| `ADMIN_PASSWORD` | `YourSecurePassword123` |
| `NODE_ENV` | `production` |
| `NEXTAUTH_SECRET` | *(generate: `openssl rand -base64 32`)* |
| `DATABASE_URL` | `file:./db/custom.db` |

### Step 4 — Get Your URL

Railway assigns a domain like `amhara-sayint-xxx.railway.app`.  
Go to **Settings → Networking → Generate Domain**.

---

## 🔑 Admin Panel

- URL: `https://your-domain.railway.app/admin`
- Password: whatever you set in `ADMIN_PASSWORD`
- Default (dev only): `admin123`

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Data Storage

All content is stored in the `data/` directory as JSON:

| File | Content |
|---|---|
| `data/news.json` | News articles |
| `data/bids.json` | Bids & tenders |
| `data/vacancies.json` | Job vacancies |
| `data/announcements.json` | Announcements |
| `data/gallery.json` | Gallery items |
| `data/content.json` | Site settings & hero content |
| `data/menu.json` | Navigation menu |

File uploads go to `public/uploads/`.

---

*Developed by Meseret Akalu — +251 912 465 247*
