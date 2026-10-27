# Deploy Guide — GitHub → InfinityFree (Automatic)

এই ফাইলটা পড়লে আপনি একবার setup করবেন, তারপর **শুধু GitHub এ push করবেন** — InfinityFree তে নিজে নিজে update হবে।

---

## কীভাবে কাজ করে (এক লাইনে)

আপনি code বদলে `git push` দেবেন → GitHub robot (Actions) নিজে scan করবে কোন file বদলেছে → শুধু ওই file গুলো FTPS দিয়ে InfinityFree (`htdocs`) এ upload করবে।

- প্রথমবার: পুরো site upload হবে।
- এরপর প্রতিবার: শুধু বদলানো file upload হবে। কোনো delete নেই, re-upload নেই।

---

## ধাপ ১ — Git ইনস্টল (একবার)

PowerShell এ চালান:
```powershell
git --version
```
না থাকলে <https://git-scm.com/download/win> থেকে ইনস্টল করুন।

---

## ধাপ ২ — Project কে Git repo বানান (একবার)

Project folder এ (যেখানে `index.html` আছে):
```powershell
git init
git add .
git commit -m "Initial commit"
```

---

## ধাপ ৩ — GitHub এ repository + push (একবার)

1. <https://github.com> এ login → **New repository**
2. নাম: `shahriar-llc-site` → **Private** → Create
3. এরপর PowerShell এ:
```powershell
git branch -M main
git remote add origin https://github.com/YOURNAME/shahriar-llc-site.git
git push -u origin main
```
(`YOURNAME` = আপনার GitHub username)

---

## ধাপ ৪ — FTP Password বদলান (জরুরি)

আপনার আগের password পাবলিক chat এ leak হয়েছে। InfinityFree control panel →
**FTP Accounts** → password **change** করুন। নতুন password কোথাও পোস্ট করবেন না।

---

## ধাপ ৫ — GitHub Secrets বসান (একবার)

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

এই ৫টা যোগ করুন (নাম হুবহু একই রাখতে হবে):

| Secret name | Value |
|---|---|
| `FTP_SERVER` | `ftpupload.net` |
| `FTP_USERNAME` | `if0_43131621` |
| `FTP_PASSWORD` | আপনার **নতুন** FTP password |
| `FTP_PORT` | `21` |
| `FTP_SERVER_DIR` | `/htdocs/` |

> `FTP_SERVER_DIR` = আপনার site server এর কোন folder এ আছে।
> `htdocs` root হলে `/htdocs/`। ভিতরে subfolder থাকলে `/htdocs/subfolder/`।

---

## ধাপ ৬ — প্রথম auto deploy চালান

Secrets বসানোর পর যেকোনো একটা push করলেই robot চলে যাবে।
অথবা হাতে চালাতে: repo → **Actions** tab → **Deploy to InfinityFree** → **Run workflow**.

প্রথমবার সব file upload হবে (একটু সময় লাগবে)। শেষ হলে দেখবেন:
- সব file `htdocs` এ আছে
- server এ একটা `.ftp-deploy-sync-state.json` file তৈরি হয়েছে (এটাই মনে রাখে কোন file গেছে)

---

## ধাপ ৭ — এখন থেকে প্রতিদিন

Code বদলান → PowerShell এ:
```powershell
git add .
git commit -m "update"
git push
```
ব্যস। Robot নিজেই শুধু বদলানো file upload করে দেবে। **InfinityFree এ হাত দিতে হবে না।**

---

## ভবিষ্যতে অন্য site এ ব্যবহার করতে

এই ৩টা file অন্য project এ copy করবেন:
- `.gitignore`
- `.github/workflows/deploy.yml`

তারপর ওই repo এর Secrets এ ওই site এর FTP তথ্য বসাবেন। ক্ষেত্রে script টাই same কাজ করবে।

---

## মনে রাখবেন

- Password কখনো chat / code / commit এ লিখবেন না — শুধু GitHub Secrets এ।
- `✕` ভুল folder target করলে site দেখাবে না — `FTP_SERVER_DIR` ঠিক আছে কিনা দেখবেন।
- `sitemap.xml` / `robots.txt` এ domain বদলাতে হলে `js/config.js` এর `PUBLIC_URL` ও update করবেন।
