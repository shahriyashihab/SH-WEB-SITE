# Shahriar LLC — Free Setup Guide (Zero Budget)

Everything here is **100% free forever**. No paid server, no paid database,
no build tools, no paid SEO software.

---

## 1. Run it on localhost (already running)

A local server is running now:

- Website: <http://127.0.0.1:5500/index.html>
- Admin panel: <http://127.0.0.1:5500/admin/> (login `admin` / `shahriyar123`)

To start it again later, run this inside the project folder:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Then open <http://127.0.0.1:5500/>.

> Do **not** open `index.html` by double-clicking (file://). Realtime
> sync and SEO need a real server, so always use the URL above.

---

## 2. Free real-time database — the recommended way

**Use Firebase Realtime Database (free Spark plan).**

Why this one:

| Option | Free realtime? | Setup | Browser-only | Verdict |
|---|---|---|---|---|
| **Firebase Realtime DB** | Yes | 5 min | Yes (REST, no SDK) | **Use this** |
| Supabase (Postgres) | Yes | 8 min | Needs SDK | Good 2nd choice |
| PocketBase / Appwrite | Yes | needs a server | No | Needs hosting |
| localStorage | Same-PC only | instant | Yes | Default fallback |

Firebase's free Spark plan gives ~1 GB storage and 10 GB/month transfer —
far more than a company website needs.

### Steps (5 minutes, free)

1. Go to <https://console.firebase.google.com> and sign in with Google.
2. **Add project** → name it `shahriar-llc` → turn Google Analytics **off**
   → Create.
3. In the left menu choose **Build → Realtime Database → Create Database**.
4. Pick a location (e.g. Singapore / `asia-southeast1`) → start in
   **Test mode** → Enable.
5. Open **Project settings (gear) → General → Your apps** → click the
   **Web `</>`** icon → register app `Shahriar Website`.
   Copy the `apiKey` and `databaseURL` it shows you.
6. Open `js/config.js` in this project and paste them:

```js
FIREBASE: {
  apiKey: "AIzaSy....your key....",
  databaseURL: "https://shahriar-llc-default-rtdb.firebaseio.com",
  path: "shahriar-llc/site/content",
  messagesPath: "shahriar-llc/site/messages"
}
```

7. Save. Reload the site. Done — content and contact-form leads now sync
   through the cloud in real time between **every device**.

### Lock the database (do this right after testing)

Test mode allows anyone to write. Click the **Rules** tab in Realtime
Database and use this instead — it lets everyone *read*, and lets only
your two live paths *write*:

```json
{
  "rules": {
    "shahriar-llc": {
      "site": {
        "content":  { ".read": true, ".write": "auth != null || root.child('shahriar-llc/keys/masterKey').val() === 'PUT-A-LONG-SECRET-HERE'" },
        "messages": { ".read": "auth != null", ".write": true }
      }
    }
  }
}
```

Public contact messages stay write-open (visitors must be able to submit)
but read-closed, so only you see the leads.

> After this, writes from the admin panel need the secret. The admin panel
> uses the plain REST API; if you keep it in Test mode while you are the
> only editor, it just works. For a stronger free setup, enable
> **Email/Password auth** in Firebase and the admin logs in normally.

---

## 3. What already works without any database

Even with `apiKey`/`databaseURL` empty:

- The whole site runs on `localStorage` — instant, offline, free.
- Open the site and the admin panel in **two tabs**: saving in the admin
  updates the site tab live through `BroadcastChannel`. This is real
  realtime, limited to one computer.
- Google Search Console, sitemap, structured data and Open Graph all work.

Adding Firebase simply upgrades "one computer" → "every device".

---

## 4. SEO — already set up for you

Done automatically by `js/seo.js` + the files below:

- **Per-page `<title>` + meta description** (already in each HTML file).
- **Canonical URL** on every page (`SH_CONFIG.PUBLIC_URL`).
- **Open Graph + Twitter Card** → rich previews when the link is shared on
  Facebook, WhatsApp, LinkedIn, X.
- **Structured data (JSON-LD)** for: Organization, LocalBusiness contact
  point, WebSite + SearchAction, WebPage, BreadcrumbList, FAQPage (home),
  Service (service pages), Product (product pages), Person (team profiles).
  This is what earns **rich results** in Google for free.
- **`sitemap.xml`** — 34 URLs (all services + all products) so Google finds
  every page, including `detail.html?item=...`.
- **`robots.txt`** — allows crawling, blocks `/admin/`, points to sitemap.
- **FAQ section** on the home page with real keywords.

### Do these 4 free things after you publish

1. **Set your real domain.** In `js/config.js` change:
   `PUBLIC_URL: "https://sprint.fast-page.org"` to your actual domain, then fix
   the domain in `sitemap.xml` and `robots.txt` (find/replace
   `sprint.fast-page.org`).
2. **Google Search Console** (<https://search.google.com/search-console>) —
   free. Add your domain, verify, submit `sitemap.xml`. This is the single
   most important free SEO step.
3. **Bing Webmaster Tools** — free, same sitemap submission.
4. **Google Business Profile** — free. Create it for "Shahriar LLC, Dhaka".
   It puts you on Google Maps and local search, where software companies in
   Bangladesh win most of their leads.

### Free ways to get found (no ad spend)

- Write **one blog-style page per product** ("Best ERP software in
  Bangladesh", "School management system price in Bangladesh") and link it
  from `products.html`. Long-tail keywords are where a small budget wins.
- Reuse the structured data — Google shows FAQs and products from it with
  no cost.
- Share each product page on Facebook/LinkedIn; the Open Graph tags make a
  professional preview automatically.

---

## 5. Files added / changed

**New**
- `js/config.js` — your domain + Firebase keys (edit this one file)
- `js/shdb.js` — free realtime layer (Firebase REST + tab sync)
- `js/seo.js` — automatic SEO + structured data
- `assets/img/og-cover.jpg` — social share image
- `SETUP.md` — this guide

**Updated**
- `js/store.js` — pulls/pushes live content, merges cloud snapshots
- `js/main.js` — re-renders live, sends leads to cloud
- `admin/admin.js` — refreshes live, pulls cloud leads
- all `*.html` — load `config.js`, `shdb.js`, `seo.js`
- `sitemap.xml` — fixed (was broken; only had example.com URLs)
- `robots.txt` — real sitemap URL, blocks admin
- `index.html` — added FAQ section

---

## 6. Hosting (free)

When you are ready to go public, any of these are free and work with this
static site:

- **GitHub Pages** — free, custom domain supported, HTTPS included.
- **Cloudflare Pages** — free, fast global CDN, custom domain.
- **Netlify** — free tier, drag-and-drop deploy.

Just upload the whole folder as-is. Point your domain, set `PUBLIC_URL`,
submit the sitemap, and you are live — total cost: 0.
