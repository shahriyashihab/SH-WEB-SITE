/* =========================================================
   Shahriar LLC — SEO engine (100% free, client-side)
   ---------------------------------------------------------
   Injects into every page:
     - canonical URL (from SH_CONFIG.PUBLIC_URL)
     - Open Graph + Twitter cards (rich link previews)
     - JSON-LD structured data (Organization, WebSite,
       LocalBusiness, BreadcrumbList, Service/Product, FAQ)
     - meta robots / geo / theme hints
   No server, no build, no paid tools required.
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.SH_CONFIG || {};
  var SITE = (CFG.PUBLIC_URL || location.origin).replace(/\/$/, "");
  var CO = CFG.COMPANY || {};
  var BRAND = CO.name || "Shahriar LLC";

  /* ---- helpers ---- */
  var $ = function (sel) { return document.querySelector(sel); };
  function meta(attr, key, val) {
    if (!val) return;
    var el = document.querySelector("meta[" + attr + '="' + key + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute("content", val);
  }
  function link(rel, href) {
    var el = document.querySelector('link[rel="' + rel + '"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
    el.setAttribute("href", href);
  }
  function jsonld(obj) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
  function abs(p) { return /^https?:/.test(p) ? p : SITE + "/" + String(p || "").replace(/^\//, ""); }
  function qs(name) { return new URLSearchParams(location.search).get(name); }

  /* ---- current page identity ----
     With clean URLs the path has no ".html" (e.g. /services). Normalise
     the file name to a bare slug so the keyword/schema switches below
     keep working for both /services and /services.html. */
  var rawFile = location.pathname.split("/").pop() || "index";
  var file = rawFile.replace(/\.html$/i, "") || "index";
  var canonical = SITE + "/" + (file === "index" ? "" : file) + (location.search || "");
  var title = document.title;
  var desc = (document.querySelector('meta[name="description"]') || {}).content || "";
  var heroImg = abs("assets/img/og-cover.jpg");
  if ($(".hero-card img")) heroImg = abs($(".hero-card img").getAttribute("src"));
  else if ($(".about-img img")) heroImg = abs($(".about-img img").getAttribute("src"));

  /* ---- core meta ---- */
  link("canonical", canonical);
  meta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1");
  meta("name", "author", BRAND);
  meta("name", "theme-color", "#0b5cab");
  meta("name", "geo.region", "BD-13");
  meta("name", "geo.placename", CO.addressLocality || "Dhaka");
  meta("name", "format-detection", "telephone=yes");

  /* ---- Open Graph ---- */
  meta("property", "og:type", "website");
  meta("property", "og:site_name", BRAND);
  meta("property", "og:title", title);
  meta("property", "og:description", desc);
  meta("property", "og:url", canonical);
  meta("property", "og:image", heroImg);
  meta("property", "og:locale", "en_US");

  /* ---- Twitter ---- */
  meta("name", "twitter:card", "summary_large_image");
  meta("name", "twitter:title", title);
  meta("name", "twitter:description", desc);
  meta("name", "twitter:image", heroImg);

  /* ---- site-level keyword groups (per page) ---- */
  var KEYWORDS = {
    "index": "software company in Bangladesh, best software company Dhaka, custom software development Bangladesh, ERP software, web development company Bangladesh",
    "services": "software development services Bangladesh, web design Dhaka, ERP CRM POS software, mobile app development Bangladesh",
    "products": "ready made software Bangladesh, ERP software price, HR payroll software, school management software, POS software Bangladesh",
    "about": "about Shahriar LLC, offshore IT company Bangladesh, software company since 2007",
    "portfolio": "software portfolio Bangladesh, ERP project case study, school management project",
    "clients": "software clients Bangladesh, government software vendor, RMG software, hospital software",
    "contact": "contact software company Dhaka, get software quote Bangladesh",
    "company-profile": "Shahriar LLC company profile, IT company Dhaka profile",
    "ceo": "Shahriar LLC CEO, Md Mofakhkharul Islam, software company leadership",
    "team": "Shahriar LLC management team, software engineers Bangladesh"
  };
  if (KEYWORDS[file]) meta("name", "keywords", KEYWORDS[file]);

  /* ---- breadcrumb trail from the visible .breadcrumb ---- */
  var crumbs = [{ name: "Home", url: SITE + "/" }];
  document.querySelectorAll(".breadcrumb a, .breadcrumb span").forEach(function (el) {
    var txt = (el.textContent || "").trim();
    if (!txt || /^\//.test(txt)) return;
    if (/^home$/i.test(txt)) return;
    var href = el.tagName === "A" ? el.getAttribute("href") : null;
    crumbs.push({ name: txt, url: href ? abs(href) : canonical });
  });

  /* ---- structured data: organization + local business ---- */
  var org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE + "/#organization",
    name: BRAND,
    legalName: CO.legalName || BRAND,
    url: SITE + "/",
    logo: abs(CO.logo || "assets/img/logo.svg"),
    image: heroImg,
    foundingDate: CO.founded || "2007",
    email: CO.email || "",
    telephone: (CO.phone || "").replace(/\s+/g, ""),
    description: desc,
    address: {
      "@type": "PostalAddress",
      addressLocality: CO.addressLocality || "Dhaka",
      addressCountry: CO.addressCountry || "BD"
    },
    areaServed: ["Bangladesh", "Worldwide"],
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: (CO.phone || "").replace(/\s+/g, ""),
      contactType: "sales",
      availableLanguage: ["en", "bn"]
    }]
  };
  if (CO.sameAs && CO.sameAs.length) org.sameAs = CO.sameAs;
  jsonld(org);

  var website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE + "/#website",
    url: SITE + "/",
    name: BRAND,
    publisher: { "@id": SITE + "/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: SITE + "/products?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  jsonld(website);

  /* basic web page + breadcrumb */
  jsonld({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical + "#webpage",
    url: canonical,
    name: title,
    description: desc,
    isPartOf: { "@id": SITE + "/#website" },
    about: { "@id": SITE + "/#organization" },
    inLanguage: "en"
  });
  if (crumbs.length > 1) {
    jsonld({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(function (c, i) {
        return { "@type": "ListItem", position: i + 1, name: c.name, item: c.url };
      })
    });
  }

  /* ---- detail.html : Service or Product schema ---- */
  if (file === "detail") {
    var name = ($("#dHeading") || {}).textContent || title;
    var type = ($("#dType") || {}).textContent || "Service";
    var overview = ($("#dOverview") || {}).textContent || desc;
    var img = ($("#dImg") || {}).src || heroImg;
    jsonld({
      "@context": "https://schema.org",
      "@type": type === "Product" ? "Product" : "Service",
      name: name,
      description: overview,
      image: img,
      category: type,
      brand: { "@type": "Brand", name: BRAND },
      provider: { "@id": SITE + "/#organization" },
      areaServed: "Bangladesh"
    });
  }

  /* ---- profile.html : Person schema ---- */
  if (file === "profile") {
    jsonld({
      "@context": "https://schema.org",
      "@type": "Person",
      name: ($("#mTitle") || {}).textContent || "",
      jobTitle: ($("#mRole") || {}).textContent || "",
      image: ($("#mImg") || {}).src || "",
      worksFor: { "@id": SITE + "/#organization" },
      description: ($("#mBio") || {}).textContent || ""
    });
  }

  /* ---- home page : FAQ schema (buys rich results for free) ---- */
  if (file === "index") {
    jsonld({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Which is the best software company in Bangladesh?",
          acceptedAnswer: { "@type": "Answer", text: BRAND + " is a diversified offshore IT services company since 2007, delivering ERP, CRM, POS, HR & payroll, web and mobile software." } },
        { "@type": "Question", name: "What software products does Shahriar LLC sell?",
          acceptedAnswer: { "@type": "Answer", text: "Sheba ERP, HR Sheba, Smart Educare, Gym Master, CRM Suite, Remit Sheba and more ready-made software, plus fully custom development." } },
        { "@type": "Question", name: "How do I get a free quote?",
          acceptedAnswer: { "@type": "Answer", text: "Call " + (CO.phone || "") + " or use the contact form on the Contact page for a free consultation and quote." } }
      ]
    });
  }
})();
