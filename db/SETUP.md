# Balance 3D — Supabase Database Setup

## 1 · Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New project**, give it a name (e.g. `balance3d`), choose a region close to Saudi Arabia (EU West or AP Southeast), set a strong DB password, click **Create project**.
3. Wait ~2 minutes for provisioning.

---

## 2 · Run the SQL schema

1. In your Supabase project, open **SQL Editor** (left sidebar).
2. Click **New query**, paste the contents of `db/schema.sql`, click **Run**.
3. You should see "Success. No rows returned."
4. Repeat with `db/seed-orders.sql` for sample orders and customers.

---

## 3 · Get your credentials

In your project → **Project Settings → API**:

| Value | Where |
|---|---|
| **Project URL** | `https://xxxxxxxxxxxx.supabase.co` |
| **anon / public key** | The `anon` key (safe to use in browser) |

---

## 4 · Add credentials to the project

Open `js/core/db.js` and replace the two placeholder values near the top:

```js
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';  // ← paste Project URL
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';                  // ← paste anon key
```

Save the file. That's it — no build step, no server required.

---

## 5 · Verify

Open the site in a browser and check the browser console. You should see products loading from Supabase instead of localStorage. Adding a product in the admin dashboard (`admin/login.html`, credentials: `admin / admin123`) should appear on the storefront immediately.

---

## 6 · Product images (Supabase Storage)

The schema already creates a public `product-images` bucket. When you upload an image in the admin dashboard after configuring the credentials, it will be:

- Compressed to ≤ 800 × 800 px client-side
- Uploaded to `product-images/<product_id>/main.<ext>`
- Stored as a public CDN URL in the `products.image_url` column

Images uploaded before Supabase was configured (stored as base64 in localStorage) continue to work via the automatic localStorage fallback in `ProductStore.resolveImage()`.

---

## 7 · Offline / demo mode (no credentials)

If `SUPABASE_URL` is still the placeholder value, `db.js` automatically falls back to the localStorage engine — exactly the same behaviour as before this integration. The site works fully offline in demo mode.

---

## 8 · Production hardening (before going live)

1. **Remove the permissive RLS policies** added for development and replace with proper auth-based policies.
2. **Set up Supabase Auth** for admin login (replace the hardcoded `admin / admin123`).
3. **Restrict the storage bucket** policies to authenticated admins only for write operations.
4. **Enable Supabase Edge Functions** if you need server-side order processing or payment webhooks.
5. **Add environment variables** — never commit your service-role key to version control.

---

## File map

```
balance3d/
├── js/core/
│   ├── db.js          ← NEW: Supabase + localStorage data layer
│   ├── data.js        ← Updated: async-aware, uses db.js
│   └── store.js       ← Kept for backward-compat (delegates to db.js)
├── admin/js/
│   ├── admin-data.js  ← Updated: thin shim, delegates to db.js
│   └── admin-sections.js ← Updated: all renders/actions are async
└── db/
    ├── schema.sql     ← Run this first in Supabase SQL Editor
    ├── seed-orders.sql← Run this second for sample data
    └── SETUP.md       ← This file
```
