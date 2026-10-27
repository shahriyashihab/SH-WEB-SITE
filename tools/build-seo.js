/* =========================================================
   SEO page generator — builds all 110 static pages into /seo/
   Run:  node tools/build-seo.js
   ========================================================= */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "seo");
const SITE = "https://sprint.fast-page.org";
/* bump this whenever you want every browser to refetch JS/CSS */
const VERSION = process.env.SH_VERSION || "20261028a";

// load catalog
global.window = {};
require(path.join(ROOT, "js", "seo-pages.js"));
const PAGES = global.window.SEO_PAGES;

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const CAT_LABEL = {
  services: "Services", products: "Products", sectors: "Industries",
  locations: "Locations", guides: "Guides", solutions: "Solutions", comparison: "Comparisons"
};

function header() {
  return `<div class="topbar">
  <div class="container">
    <span>&#128222; +880 1958-633202 &nbsp;|&nbsp; &#9993; info@sprint.fast-page.org</span>
    <div class="tb-right"><a href="../company-profile">Company Profile</a><a href="../products">Products</a><a href="../order">Order Now</a></div>
  </div>
</div>

<header class="site-header">
  <div class="container header-inner">
    <a href="../" class="logo"><img src="../assets/img/logo.svg" alt="Shahriar LLC" style="height:38px;width:auto" /></a>
    <nav class="main-nav" aria-label="Main navigation">
      <a class="nav-link" href="../">Home</a>
      <div class="has-drop"><a class="nav-link" href="../about">About Us &#9662;</a><div class="drop"><a href="../ceo">CEO Profile</a><a href="../team">Management Team</a><a href="../about">About Us</a><a href="../company-profile">Company Profile</a></div></div>
      <a class="nav-link" href="../services">Services</a>
      <a class="nav-link" href="../products">Products</a>
      <a class="nav-link" href="../portfolio">Portfolio</a>
      <a class="nav-link" href="../clients">Clients</a>
      <div class="nav-cta"><a href="../order" class="btn btn-primary btn-sm">Order Now</a></div>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
</header>

<div class="mm-overlay" id="mmOverlay"></div>
<nav class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
  <div class="mm-head"><span class="logo"><img src="../assets/img/logo.svg" alt="Shahriar LLC" style="height:34px;width:auto" /></span><button class="mm-close" id="mmClose" aria-label="Close">&times;</button></div>
  <a class="mm-link" href="../">Home</a>
  <a class="mm-link" href="../about">About Us</a>
  <a class="mm-link mm-sub" href="../ceo">CEO Profile</a>
  <a class="mm-link mm-sub" href="../team">Management Team</a>
  <a class="mm-link" href="../services">Services</a>
  <a class="mm-link" href="../products">Products</a>
  <a class="mm-link" href="../portfolio">Portfolio</a>
  <a class="mm-link" href="../clients">Clients</a>
  <a class="mm-link" href="../order">Order Now</a>
  <a class="mm-link" href="../contact">Contact</a>
</nav>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <div class="logo"><img src="../assets/img/logo.svg" alt="Shahriar LLC" style="height:38px;width:auto" /></div>
      <p>Shahriar LLC is a diversified offshore IT services company established in 2007.</p>
      <div class="social"><a href="#">Fb</a><a href="#">In</a><a href="#">Yt</a></div>
    </div>
    <div><h4>Company</h4><ul class="footer-links"><li><a href="../about">About Us</a></li><li><a href="../ceo">CEO Profile</a></li><li><a href="../team">Management Team</a></li><li><a href="../company-profile">Company Profile</a></li><li><a href="../contact">Contact</a></li></ul></div>
    <div><h4>Services</h4><ul class="footer-links"><li><a href="../services">Web Development</a></li><li><a href="../services">Enterprise Solutions</a></li><li><a href="../services">Mobile Apps</a></li><li><a href="../products">Products</a></li><li><a href="../order">Order Now</a></li></ul></div>
    <div><h4>Get In Touch</h4><ul class="footer-links"><li>&#128222; +880 1958-633202</li><li>&#9993; info@sprint.fast-page.org</li><li>&#127968; Dhaka, Bangladesh</li></ul></div>
  </div>
  <div class="container footer-bottom"><span>&copy; 2026 Shahriar LLC. All rights reserved.</span><span>Best Software Company in Bangladesh</span></div>
</footer>`;
}

function page(p) {
  const url = SITE + "/seo/" + p.slug;

  /* ---- SEO title: keep total under ~60 chars including the brand ---- */
  const BRAND = " | Shahriar LLC";
  let h1 = p.h1;
  let title = h1 + BRAND;
  if (title.length > 60) title = h1.slice(0, 60 - BRAND.length - 1).replace(/\s+\S*$/, "") + BRAND;

  /* ---- meta description: prefer 70-158 chars.
     Build from intro; if too short, append the first sentence of body. ---- */
  function firstSentence(t) {
    t = String(t || "").replace(/\s+/g, " ").trim();
    const m = t.match(/^(.+?[.!?])\s/);
    return m ? m[1] : t;
  }
  let desc = (p.intro || "").replace(/\s+/g, " ").trim();
  if (desc.length < 70 && p.body) {
    const add = firstSentence(p.body);
    if (add && desc.indexOf(add.slice(0, 20)) === -1) desc = (desc + " " + add).trim();
  }
  if (desc.length < 70 && p.kw) desc = (desc + " " + p.kw + " by Shahriar LLC.").trim();
  if (desc.length > 158) desc = desc.slice(0, 155).replace(/\s+\S*$/, "") + "...";

  const cat = CAT_LABEL[p.cat] || "Info";
  const points = (p.points || []).map(x => `<li>${esc(x)}</li>`).join("");
  const related = PAGES.filter(x => x.cat === p.cat && x.slug !== p.slug).slice(0, 6)
    .map(x => `<a class="tag" href="${x.slug}">${esc(x.h1.replace(/^Best |^How to |^Why /,"").slice(0,42))}</a>`).join("");

  const jsonld = JSON.stringify([
    { "@context": "https://schema.org", "@type": "WebPage", name: p.h1, description: desc, url: url,
      isPartOf: { "@type": "WebSite", name: "Shahriar LLC", url: SITE + "/" },
      about: { "@type": "Organization", name: "Shahriar LLC", url: SITE + "/" } },
    { "@context": "https://schema.org", "@type": "Service", name: p.h1, description: desc,
      provider: { "@type": "Organization", name: "Shahriar LLC", telephone: "+8801958633202", email: "info@sprint.fast-page.org",
        address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" } },
      areaServed: ["Bangladesh", "Worldwide"] },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: cat, item: SITE + "/seo/" },
      { "@type": "ListItem", position: 3, name: p.h1, item: url } ] }
  ], null, 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<meta name="keywords" content="${esc(p.kw)}, software company Bangladesh, Shahriar LLC, Dhaka" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<link rel="canonical" href="${url}" />
<meta name="theme-color" content="#0b5cab" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(p.h1)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="Shahriar LLC" />
<meta property="og:image" content="${SITE}/assets/img/og-cover.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(p.h1)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<link rel="icon" type="image/svg+xml" href="../assets/img/logo.svg" />
<link rel="stylesheet" href="../css/style.css?v=${VERSION}" />
<script type="application/ld+json">${jsonld}</script>
</head>
<body>

${header()}

<main>
  <section class="page-hero">
    <div class="container">
      <h1>${esc(p.h1)}</h1>
      <div class="breadcrumb"><a href="../">Home</a> / <a href="/">${esc(cat)}</a> / <span>${esc(p.h1)}</span></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="detail-layout">
        <div class="detail-main">
          <span class="detail-badge">${esc(cat)}</span>
          <h2>${esc(p.intro)}</h2>
          <p class="detail-overview">${esc(p.body)}</p>

          <h3 class="detail-sub">What you get</h3>
          <ul class="detail-features">${points}</ul>

          <h3 class="detail-sub">Shahriar LLC — trusted since 2007</h3>
          <p class="detail-overview">Shahriar LLC is a diversified offshore IT services company in Dhaka, Bangladesh. Since 2007 we have delivered software, ERP, CRM, POS, HR &amp; payroll, web and mobile solutions to government and private clients across Bangladesh and worldwide. Every project is owned end-to-end by a senior team, with transparent delivery and ongoing support.</p>

          <h3 class="detail-sub">Get started</h3>
          <p class="detail-overview">Tell us your requirement and our team will contact you within 24 hours with a free consultation, timeline and quote. No obligation.</p>
          <p>
            <a class="btn btn-primary" href="../order">Place an Order</a>
            <a class="btn btn-outline" href="../contact" style="margin-left:10px">Contact Us</a>
          </p>

          <h3 class="detail-sub">Related pages</h3>
          <div class="tags">${related}</div>
        </div>

        <aside class="detail-side">
          <div class="detail-card">
            <h3>Get a free quote</h3>
            <p class="detail-side-text">Talk to our team about ${esc(p.kw)}. Free consultation, no obligation.</p>
            <a class="btn btn-primary" style="width:100%" href="../order">Order Now</a>
            <a class="btn btn-outline" style="width:100%;margin-top:10px" href="tel:+8801958633202">&#128222; +880 1958-633202</a>
          </div>
          <div class="detail-card">
            <h3>Why Shahriar LLC</h3>
            <ul class="feat-list">
              <li>Established 2007</li>
              <li>500+ projects delivered</li>
              <li>Government &amp; private clients</li>
              <li>Local support, global quality</li>
              <li>Free consultation</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="cta-band cta-img">
    <div class="container">
      <h2>Ready to start?</h2>
      <p>Share your requirement and we'll respond within 24 hours.</p>
      <a href="../order" class="btn btn-accent btn-lg">Place an Order</a>
    </div>
  </section>
</main>

${footer()}

<script src="../js/config.js?v=${VERSION}"></script>
<script src="../js/shdb.js?v=${VERSION}"></script>
<script src="../js/store.js?v=${VERSION}"></script>
<script src="../js/main.js?v=${VERSION}"></script>
</body>
</html>
`;
}

// ---- generate all pages ----
let n = 0;
PAGES.forEach(p => {
  fs.writeFileSync(path.join(OUT, p.slug + ".html"), page(p), "utf8");
  n++;
});

// ---- generate the SEO directory index (/seo/) ----
(function buildIndex() {
  const groups = {};
  PAGES.forEach(p => { (groups[p.cat] = groups[p.cat] || []).push(p); });
  let sections = "";
  Object.keys(groups).forEach(cat => {
    sections += `<h2 class="section-head" style="margin:34px 0 14px;font-size:1.4rem">${CAT_LABEL[cat] || cat} (${groups[cat].length})</h2><div class="grid grid-3">`;
    groups[cat].forEach(p => {
      sections += `<a class="card" style="text-decoration:none" href="${p.slug}"><h3>${esc(p.h1)}</h3><p>${esc(p.intro)}</p><span class="more">Read more &rarr;</span></a>`;
    });
    sections += `</div>`;
  });
  const index = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Resources &amp; Solutions | Shahriar LLC</title>
<meta name="description" content="Guides, solutions, products, industries and locations served by Shahriar LLC — a software company in Bangladesh since 2007." />
<link rel="canonical" href="${SITE}/seo/" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Shahriar LLC" />
<meta property="og:title" content="Resources &amp; Solutions | Shahriar LLC" />
<meta property="og:description" content="Guides, solutions, products, industries and locations served by Shahriar LLC — a software company in Bangladesh since 2007." />
<meta property="og:url" content="${SITE}/seo/" />
<meta property="og:image" content="${SITE}/assets/img/og-cover.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Resources &amp; Solutions | Shahriar LLC" />
<meta name="twitter:description" content="Guides, solutions, products, industries and locations served by Shahriar LLC." />
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Resources & Solutions", url: SITE + "/seo/", isPartOf: { "@type": "WebSite", name: "Shahriar LLC", url: SITE + "/" }, about: { "@type": "Organization", name: "Shahriar LLC", url: SITE + "/" } })}</script>
<link rel="icon" type="image/svg+xml" href="../assets/img/logo.svg" />
<link rel="stylesheet" href="../css/style.css?v=${VERSION}" />
</head>
<body>
${header()}
<main>
  <section class="page-hero"><div class="container"><h1>Resources &amp; Solutions</h1><div class="breadcrumb"><a href="../">Home</a> / Resources</div></div></section>
  <section class="section"><div class="container">
    <div class="section-head"><span class="eyebrow">Explore</span><h2>${PAGES.length} pages about our services, products and industries</h2><p>Find the solution, product or guide that fits your business.</p></div>
    ${sections}
  </div></section>
</main>
${footer()}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, "index.html"), index, "utf8");
})();

// ---- generate the mega sitemap ----
(function buildSitemap() {
  const CORE = ["", "services", "products", "contact", "order", "about",
    "ceo", "team", "portfolio", "clients", "company-profile"];
  let urls = CORE.map(u => `  <url><loc>${SITE}/${u}</loc><lastmod>2026-10-25</lastmod><changefreq>weekly</changefreq><priority>${u === "" ? "1.0" : "0.8"}</priority></url>`).join("\n");
  urls += "\n" + PAGES.map(p => `  <url><loc>${SITE}/seo/${p.slug}</loc><lastmod>2026-10-25</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("\n");
  urls += `\n  <url><loc>${SITE}/seo/</loc><lastmod>2026-10-25</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`;

  /* ---- product & service detail pages (query URLs, matching their
     self-referential canonical) so Google can discover every product
     and service. Sub-services are admin-driven and intentionally left
     to normal crawling. ---- */
  try {
    global.window = {};
    require(path.join(ROOT, "js", "catalog.js"));
    const CAT = global.window.CATALOG || {};
    const products = Object.keys(CAT).filter(k => CAT[k].type === "Product");
    const svcSlugs = Object.keys(CAT).filter(k => CAT[k].type === "Service");
    urls += "\n" + products.map(k => `  <url><loc>${SITE}/detail?item=${k}</loc><lastmod>2026-10-25</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
    urls += "\n" + svcSlugs.map(k => `  <url><loc>${SITE}/service?item=${k}</loc><lastmod>2026-10-25</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
  } catch (e) { /* catalog optional */ }

  const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sm, "utf8");
})();

// ---- generate InfinityFree-safe robots.txt (crawl-delay) ----
(function buildRobots() {
  const rb = `# Shahriar LLC — robots.txt
User-agent: *
Allow: /
Disallow: /admin/

# ---- Free-hosting safety: ask crawlers to go slowly ----
# InfinityFree has CPU/hit limits; a slow crawl prevents suspension.
User-agent: Googlebot
Crawl-delay: 6

User-agent: Bingbot
Crawl-delay: 6

User-agent: Googlebot-Image
Crawl-delay: 6

User-agent: AhrefsBot
Crawl-delay: 20
User-agent: SemrushBot
Crawl-delay: 20
User-agent: DotBot
Crawl-delay: 20

Sitemap: ${SITE}/sitemap.xml
`;
  fs.writeFileSync(path.join(ROOT, "robots.txt"), rb, "utf8");
})();

console.log("Generated " + n + " SEO pages + index + sitemap + robots into the project.");

