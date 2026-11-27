# Implementation Plan

## Context Summary (from codebase exploration)

- **Stack**: Next.js 16, TypeScript, Tailwind CSS, file-based JSON storage via `src/lib/storage.ts`
- **Build command**: `npm run build` (also `next build`)
- **Dev command**: `npm run dev`
- **No test runner configured** — verify by running `npm run build` (TypeScript compile) and manually checking browser behavior
- **Storage rule**: All data is in `data/*.json`. Use `src/lib/storage.ts` exclusively. No Prisma.
- **Prisma is still wired into**: `news/route.ts`, `applications/route.ts`, `applications-admin/route.ts` (and unrelated routes: `subscribers`, `visitors`, `contact-messages`, `stats` — do NOT touch those)
- **`/admin/api/gallery/route.ts`** already exists and already uses `storage.ts` — just needs a UI
- **`/admin/api/content/route.ts`** already exists with GET/PUT using `fs` directly — no changes needed
- **`admin-content.tsx`** already has `ApplicationsPageV2` (fetches from `/admin/api/applications-admin`) and `ContentManagerPage` (fetches from `/admin/api/content`). The router already maps `applications` → `ApplicationsPageV2` and `content` → `ContentManagerPage`.
- **The vacancy form (`VacancyForm`)** is missing: `salary`, `location`, `postedBy`, `status` — all present in `data/vacancies.json`
- **Status types in `storage.ts`**: `NewsItem.status` is `"published"|"draft"`, `BidItem.status` is `"Open"|"Closed"|"Awarded"`, `VacancyItem.status` is `"Open"|"Closed"|"Awarded"` — all need maker-checker states added
- **`vacancy-page.tsx` `handleSubmit`**: saves to `localStorage` only; needs to POST to `/admin/api/applications`
- The `AdminPage` type already includes `"gallery"` and `"slider"` are **not** present — need adding
- The sidebar does **not** have Gallery or Hero Slider items — needs them

---

## Implementation Plan

- [ ] 1. Extend status union types in `src/lib/storage.ts`

  Add `'pending_review' | 'rejected'` to `NewsItem.status`, and `'pending_review' | 'rejected'` to `BidItem.status` and `VacancyItem.status`. Also add `location`, `postedBy`, `salary` fields to `VacancyItem` interface (all three are optional strings, as they already appear in `data/vacancies.json` but are missing from the TypeScript interface).

  **Files**: `src/lib/storage.ts`

  **Changes**:
  - `NewsItem.status`: change from `"published" | "draft"` to `"published" | "draft" | "pending_review" | "rejected"`
  - `BidItem.status`: change from `"Open" | "Closed" | "Awarded"` to `"Open" | "Closed" | "Awarded" | "pending_review" | "rejected"`
  - `VacancyItem.status`: same as BidItem
  - `VacancyItem`: add `salary?: string; location?: string; postedBy?: string;`

  **Verify**: `npm run build` — TypeScript compiles with no errors.

---

- [ ] 2. Fix `src/app/admin/api/news/route.ts` — replace Prisma with storage.ts

  Remove all `prisma` imports and usage. Replace every handler with direct calls to `getNews`, `createNews`, `updateNews`, `deleteNews` from `@/lib/storage`. The fallback seeding logic can be removed (data already lives in `data/news.json`). Keep the same HTTP interface: GET returns all news, POST creates, PUT updates by id, DELETE removes by id.

  **Files**: `src/app/admin/api/news/route.ts`

  **Changes**:
  - Delete `import prisma from "@/lib/prisma"` and `import { getNews } from "@/lib/storage"`
  - Replace with `import { getNews, createNews, updateNews, deleteNews } from "@/lib/storage"`
  - `GET`: `return NextResponse.json(getNews())`
  - `POST`: `const item = createNews(data); return NextResponse.json(item, { status: 201 })`
  - `PUT`: extract `{ id, ...fields }`, call `updateNews(id, fields)`, return 404 if null
  - `DELETE`: call `deleteNews(id)`, return 404 if false

  **Verify**: `npm run build` — no Prisma references remain in news route. Test in browser: news list loads, creating/editing/deleting a news item persists to `data/news.json`.

---

- [ ] 3. Fix `src/app/admin/api/applications/route.ts` and `src/app/admin/api/applications-admin/route.ts` — replace Prisma with storage.ts

  Both files currently call `prisma.application.*`. Replace with `getApplications`, `getApplicationById`, `getApplicationsByVacancyId`, `createApplication`, `updateApplication`, `deleteApplication` from `@/lib/storage`. The public-facing `applications/route.ts` also needs a `POST` handler added for the vacancy apply form.

  **Files**:
  - `src/app/admin/api/applications/route.ts`
  - `src/app/admin/api/applications-admin/route.ts`

  **Changes to `applications/route.ts`**:
  - Remove `import prisma` and `import { cookies }`
  - Import `getApplications, getApplicationsByVacancyId, getApplicationById, createApplication, updateApplication, deleteApplication` from `@/lib/storage`
  - `GET`: same query-param logic (`id` → `getApplicationById`, `vacancyId` → `getApplicationsByVacancyId`, else `getApplications()`)
  - `POST` (new handler): read body fields `{ fullName, email, phone, education, experience, coverLetter, vacancyId, vacancyTitle }`, call `createApplication({ ...fields, cvPath: "", cvOriginalName: "", status: "Pending", notes: "" })`, return 201
  - `PUT`: call `updateApplication(id, data)`
  - `DELETE`: call `deleteApplication(id)`

  **Changes to `applications-admin/route.ts`**:
  - Same Prisma → storage.ts swap; no POST needed here (admin read/update/delete only)
  - `GET`: same query-param logic
  - `PUT`: `updateApplication(id, { ...(status && { status }), ...(notes !== undefined && { notes }) })`
  - `DELETE`: `deleteApplication(id)`

  **Verify**: `npm run build` — no Prisma references in either applications route.

---

- [ ] 4. Fix `src/components/vacancy-page.tsx` — POST application to server instead of localStorage

  The `handleSubmit` function currently builds a custom `ApplicationData` object and saves it to `localStorage`. Replace this with a `fetch` POST to `/admin/api/applications` with the flat fields the API now accepts. Keep the CV/cover-letter file upload flow (upload to `/admin/api/upload` first, get back URL, then include as `cvPath`/`coverLetterPath`). The existing success/error state rendering stays unchanged.

  **Files**: `src/components/vacancy-page.tsx`

  **Changes in `handleSubmit`**:
  - Remove the `localStorage.setItem` and `setApplications` calls that write to localStorage
  - After uploading files, POST to `/admin/api/applications` with body:
    ```json
    {
      "vacancyId": selectedVacancy.id,
      "vacancyTitle": selectedVacancy.title,
      "fullName": fd.get("fullName"),
      "email": fd.get("email"),
      "phone": fd.get("phone"),
      "education": fd.get("education"),
      "experience": fd.get("totalExp"),
      "coverLetter": fd.get("address"),
      "cvPath": cvStoredName || "",
      "cvOriginalName": cvFile?.name || ""
    }
    ```
  - On non-OK response throw an error (triggers `setFormStatus("error")`)
  - Remove the `useEffect` block that reads from `localStorage.getItem("amharasayint_applications")` for application count. The count is no longer needed from localStorage; remove the `applications` state or fetch count from API.
  - Remove the `localStorage.getItem("amharasayint_vacancies")` fallback in the vacancies fetch `useEffect` — if the API returns empty fall straight to `DEFAULT_VACANCIES`

  **Verify**: `npm run build`. In browser: submit the form for a vacancy; confirm a new entry appears in `data/applications.json` and also shows in the admin Applications page.

---

- [ ] 5. Add Maker-Checker workflow to News in `admin-content.tsx`

  **Decision**: Add `pending_review` / `rejected` to the existing inline status dropdown rather than a separate publish step, plus a Review Queue panel above the news list. Writers set status to `pending_review` ("Submit for Review"); reviewers approve (→ `published`) or reject (→ `rejected` + note).

  **Files**: `src/app/admin/admin-content.tsx`

  **Changes**:

  a. **`NewsItem` interface** (line ~25): extend `status` to `"published" | "draft" | "pending_review" | "rejected"`.

  b. **`NewsForm` component**:
  - Change `form.status` initial type/value to include the new statuses
  - In the Settings section, change the `<select>` for status to include all 4 options:
    - `draft` → `📄 Draft`
    - `pending_review` → `⏳ Submit for Review`
    - `published` → `✅ Published`
    - `rejected` → `❌ Rejected`
  - Add a separate "Submit for Review" button in the action bar: clicking it sets `form.status = "pending_review"` then calls `handleSubmit`

  c. **`NewsListPage` component**:
  - Add a Review Queue section at the top: render an amber-highlighted panel listing all items where `status === "pending_review"`. Each entry has:
    - "Approve" button: calls `fetch PUT /admin/api/news` with `{ id, status: "published" }`, reloads list
    - "Reject" button: shows an inline `<input>` for a rejection note, then calls `fetch PUT /admin/api/news` with `{ id, status: "rejected" }`, reloads list
  - In the status badge column, add cases for `pending_review` (amber: `bg-amber-50 text-amber-700`, label `⏳ Pending Review`) and `rejected` (red: `bg-red-50 text-red-600`, label `❌ Rejected`)

  **Verify**: `npm run build`. In browser: create a news item, set status to "Submit for Review", save. Confirm it appears in the Review Queue. Click Approve; confirm it shows as Published.

---

- [ ] 6. Add Maker-Checker workflow to Bids in `admin-content.tsx`

  Same pattern as news but for the Bids section.

  **Files**: `src/app/admin/admin-content.tsx`

  **Changes**:

  a. **`BidItem` interface**: extend `status` to `"Open" | "Closed" | "Awarded" | "pending_review" | "rejected"`.

  b. **`BidForm` component**:
  - Extend the status `<select>` to include `pending_review` ("⏳ Submit for Review") and `rejected` ("❌ Rejected")
  - Add "Submit for Review" button in the action bar (sets status to `pending_review`, submits)

  c. **`BidsListPage` component**:
  - Add Review Queue panel (amber) at top for `pending_review` bids, with Approve (→ `"Open"`) and Reject (→ `"rejected"` + note) buttons
  - Extend `statusColor` helper to cover `pending_review` (amber) and `rejected` (red)

  **Verify**: `npm run build`. In browser: create a bid with Submit for Review; confirm Review Queue shows it; approve → shows "Open".

---

- [ ] 7. Add Maker-Checker workflow to Vacancies in `admin-content.tsx`

  Same pattern as bids.

  **Files**: `src/app/admin/admin-content.tsx`

  **Changes**:

  a. **`VacancyItem` interface** in admin-content.tsx: extend `status` field to include `pending_review | rejected`; also add `salary?: string; location?: string; postedBy?: string;` to match `data/vacancies.json`.

  b. **`VacancyForm` component**:
  - Add state fields: `salary: ""`, `location: ""`, `postedBy: ""`, `status: "Open"` (all missing from the current form state)
  - Add form inputs for Salary (`text`), Location (`text`), Posted By (`text`), and a Status `<select>` with options: `Open`, `Closed`, `pending_review` ("⏳ Submit for Review"), `rejected` ("❌ Rejected")
  - In the `useEffect` load, populate the new fields from the fetched item
  - In the `handleSubmit`, include the new fields in the PUT/POST body
  - Add "Submit for Review" button (sets `status = "pending_review"`, submits)

  c. **`VacancyListPage` component**:
  - Add Review Queue panel (amber) at top for `pending_review` vacancies, with Approve (→ `"Open"`) and Reject (→ `"rejected"` + note) buttons
  - Add a Status column to the list table (currently missing); show color-coded badge

  **Verify**: `npm run build`. In browser: create a vacancy with salary/location/postedBy filled in, verify fields persist to `data/vacancies.json`. Test Submit for Review → Approve flow.

---

- [ ] 8. Add Gallery admin page to `admin-content.tsx`

  The gallery API (`/admin/api/gallery`) already exists and already uses `storage.ts`. We just need the UI in admin-content.tsx.

  **Files**: `src/app/admin/admin-content.tsx`

  **Changes**:

  a. **`AdminPage` type**: add `"gallery"` to the union.

  b. **`Sidebar` items array**: add `{ label: "Gallery", key: "gallery", icon: "🖼️" }` between Vacancies and Menu Manager.

  c. **New `GalleryPage` component** (add before the main `export default AdminPage`):
  - `useState` for items (fetched from `GET /admin/api/gallery`), `showForm` boolean, uploading state, search string
  - Item list: show each `GalleryItem` as a card with thumbnail (`imageUrl`), title, category badge, and a 🗑️ delete button (calls `DELETE /admin/api/gallery?id=`)
  - Add form panel (shown when `showForm` is true):
    - Image upload via `/admin/api/upload` (same pattern as `NewsForm.handleCoverUpload`) OR URL paste input
    - `title` text input (required)
    - `category` text input (e.g. "Culture", "Infrastructure")
    - `description` textarea
    - On submit: POST `{ imageUrl, title, category, description }` to `/admin/api/gallery`, reload list, hide form

  d. **Main render router**: add `{page === "gallery" && <GalleryPage />}` alongside existing page cases.

  **Verify**: `npm run build`. In browser: navigate to Gallery in sidebar, add an image, confirm it appears in `data/gallery.json` and in the gallery grid. Delete an item and confirm it's removed.

---

- [ ] 9. Upgrade `ContentManagerPage` in `admin-content.tsx` to full Hero Slider management

  The existing `ContentManagerPage` already manages hero slides (add/remove/edit image URL, title, subtitle). It needs: image upload support (not just URL paste), `buttonText`/`buttonHref` fields per slide, and up/down reorder buttons. The existing `data/content.json` uses `{ image, title, subtitle }` per slide — extend to `{ id, imageUrl, title, subtitle, buttonText, buttonHref }`.

  **Decision**: Migrate slide shape from `{ image }` to `{ imageUrl }` during save (keep backward compat on read by normalizing: `slide.imageUrl || slide.image`). Assign an `id` (UUID or timestamp) to each slide on add.

  **Files**: `src/app/admin/admin-content.tsx`

  **Changes in `ContentManagerPage`**:
  - On load, normalize each slide: `{ ...slide, imageUrl: slide.imageUrl || slide.image || "" }` so old `image` keys are handled
  - `uSlide`: already works; keep as-is
  - `addSlide`: set `id: Date.now().toString()`, `imageUrl: ""`, `buttonText: ""`, `buttonHref: ""`
  - Per-slide editor: replace the single `image` URL input with `imageUrl` input; add an upload button (same `handleCoverUpload` pattern — reuse or inline); add `buttonText` and `buttonHref` inputs
  - Add up/down reorder buttons per slide (swap `content.heroSlides[i]` with `[i-1]`/`[i+1]`, use `setSaved(false)`)
  - Rename sidebar label from "Content" to "Content / Slider" or keep "Content" — no change needed

  **Files**: `src/app/admin/admin-content.tsx`

  **Verify**: `npm run build`. In browser: add a slide with upload, fill in buttonText/buttonHref, reorder slides. Save. Confirm `data/content.json` heroSlides array is updated with the new shape.

---

- [ ] 10. Ensure the public site only displays `published` news and `Open` bids/vacancies

  Verify that all public-facing fetch calls filter by status correctly. If the news API route already returns all news (which it will after step 2), the homepage/news components must filter client-side. Find where the public news/bids/vacancies are consumed on the public pages and confirm the filter.

  **Files to check** (read-only unless a fix is needed):
  - Any file importing from `/admin/api/news` or directly from `storage.ts` for public display
  - `src/components/vacancy-page.tsx` already filters with `vacancies.filter(v => !isExpired(v.deadline))` — also add `v.status === "Open"` to this filter
  - Public news display: find where news items are rendered and confirm only `status === "published"` items are shown (add client-side filter if missing)
  - Public bids: same — only `status === "Open"` items shown

  **Files**: `src/components/vacancy-page.tsx` (confirmed change); public news/bids components (read and patch if needed)

  **Changes in `vacancy-page.tsx`**:
  - `const activeVacancies = vacancies.filter(v => v.status === "Open" && !isExpired(v.deadline));`

  **Verify**: `npm run build`. After adding a vacancy with status `pending_review`, confirm it does not appear on the public vacancy page. Only `Open` vacancies appear.

---

## File Summary

| File | Action | What changes |
|---|---|---|
| `src/lib/storage.ts` | Modify | Extend status unions for News/Bid/Vacancy; add `salary?`, `location?`, `postedBy?` to `VacancyItem` |
| `src/app/admin/api/news/route.ts` | Rewrite | Remove Prisma; use `getNews/createNews/updateNews/deleteNews` |
| `src/app/admin/api/applications/route.ts` | Rewrite | Remove Prisma; use storage functions; add POST handler |
| `src/app/admin/api/applications-admin/route.ts` | Rewrite | Remove Prisma; use storage functions |
| `src/app/admin/admin-content.tsx` | Modify heavily | (1) Extend interfaces; (2) Add Maker-Checker Review Queues for News/Bids/Vacancies; (3) VacancyForm new fields; (4) GalleryPage new component + sidebar; (5) Upgrade ContentManagerPage slider with upload + reorder + buttonText/buttonHref |
| `src/components/vacancy-page.tsx` | Modify | POST to API instead of localStorage; add `status === "Open"` filter |
| `src/app/admin/api/content/route.ts` | No change | Already correct |
| `src/app/admin/api/gallery/route.ts` | No change | Already correct |

## Dependency Order

Steps 1 → 2 → 3 (storage types must be widened before routes compile)  
Step 4 depends on step 3 (needs the POST handler)  
Steps 5, 6, 7 depend on step 1 (need the extended status unions in storage.ts types)  
Steps 8, 9, 10 are independent of each other and of steps 5–7  

## Notes / Assumptions

- **`data/gallery.json`** already exists (confirmed in `data/` directory listing).
- **No new packages** are installed; all upload/image handling reuses the existing `/admin/api/upload` route.
- The `subscribers`, `visitors`, `contact-messages`, and `stats` routes also use Prisma but are **not** in scope — do not touch them.
- The `ApplicationsPage` (old localStorage version at line ~875 in admin-content.tsx) can be left in place as dead code — it is already shadowed by `ApplicationsPageV2` which the router uses. Optionally delete it to reduce confusion.
- For the rejection note in the Review Queue: use a small inline controlled `<input>` per item with a "Confirm Reject" button. No separate modal needed.
- `data/content.json` heroSlides currently use `{ image }` key; normalize on read with `slide.imageUrl ?? slide.image` to avoid breaking existing slides.
