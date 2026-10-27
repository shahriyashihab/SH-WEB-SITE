/* =========================================================
   Shahriar LLC corporate site — shared logic
   ========================================================= */
(function () {
  "use strict";

  /* ---------- icons ---------- */
  var ICONS = {
    code: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1.5 1.5 0 001.5 1.1h9.2a1.5 1.5 0 001.5-1.2L21 7H6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/></svg>',
    window: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg>',
    erp: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V8l8-5 8 5v12"/><path d="M4 14h16M9 20v-6h6v6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2 21c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"/><path d="M17 6.5a3 3 0 010 5.6M22 21c0-2.6-1.6-4.4-4-5"/></svg>',
    pos: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="10" rx="2"/><path d="M7 20h10M12 14v6"/></svg>',
    school: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a4 4 0 000-8 6 6 0 00-11.6 1.5A3.5 3.5 0 006 18z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 7l9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };
  function icon(n) { return ICONS[n] || ICONS.code; }

  var PRODUCTS = [
    { name: "Sheba ERP", tag: "Best ERP Software in Bangladesh", img: "img/prod-erp.jpg", logo: "ERP", slug: "sheba-erp" },
    { name: "HR Sheba", tag: "Best HR & Payroll Software", img: "img/prod-hr.jpg", logo: "HR", slug: "hr-sheba" },
    { name: "Smart Educare", tag: "Best School Management System", img: "img/prod-school.jpg", logo: "EDU", slug: "smart-educare" },
    { name: "Gym Master", tag: "Best Gym Management Software", img: "img/prod-gym.jpg", logo: "GYM", slug: "gym-master" },
    { name: "CRM Suite", tag: "Best CRM Software in Bangladesh", img: "img/prod-crm.jpg", logo: "CRM", slug: "crm-suite" },
    { name: "Remit Sheba", tag: "Best Remittance Management System", img: "img/prod-remit.jpg", logo: "RMS", slug: "remit-sheba" }
  ];

  /* ---------- tech marquee builder (two rows, opposite directions) ---------- */
  function chipHTML(t) {
    var inner = t[1]
      ? '<img src="assets/img/tech/' + t[1] + '" alt="' + esc(t[0]) + '" loading="lazy">'
      : '<span class="fab">AWS</span>';
    return '<div class="logo-chip">' + inner + '<span class="lname">' + esc(t[0]) + '</span></div>';
  }
  function buildMarquee() {
    /* split logos into two rows */
    var half = Math.ceil(TECH_LOGOS.length / 2);
    var rowA = TECH_LOGOS.slice(0, half);
    var rowB = TECH_LOGOS.slice(half);
    /* repeat each set REPEAT times so the row always overflows the widest
       screen; the track translates by exactly one set (-33.333%) -> seamless */
    var REPEAT = 3;
    var makeRow = function (list, dir) {
      var one = list.map(chipHTML).join("");
      var many = new Array(REPEAT).fill(one).join("");
      return '<div class="logo-row"><div class="logo-track ' + dir + '">' + many + '</div></div>';
    };
    return '<div class="logo-marquee">' + makeRow(rowA, "ltr") + makeRow(rowB, "rtl") + '</div>';
  }
  /* [title, icon, image, color, slug] */
  var SERVICE_LIST = [
    ["Website Design & Development", "code", "img/svc-web.jpg", "blue", "website-design-development"],
    ["Custom Software Development", "code", "img/svc-software.jpg", "cyan", "custom-software-development"],
    ["Mobile Apps Development", "phone", "img/svc-mobile.jpg", "orange", "mobile-apps-development"],
    ["ERP & CRM Solutions", "erp", "img/svc-erp.jpg", "purple", "erp-crm-solutions"],
    ["Digital Marketing", "cloud", "img/svc-marketing.jpg", "green", "digital-marketing"],
    ["IT Support & Consultancy", "shield", "img/svc-support.jpg", "blue", "it-support-consultancy"],
    ["E-commerce Solution", "cart", "img/svc-web.jpg", "cyan", "ecommerce-solution"],
    ["HR & Payroll Management", "users", "img/svc-erp.jpg", "orange", "hr-payroll-management"],
    ["POS & Retail Software", "pos", "img/svc-software.jpg", "purple", "pos-retail-software"],
    ["School Management System", "school", "img/svc-support.jpg", "green", "school-management-system"],
    ["Business Process Outsourcing", "cloud", "img/svc-marketing.jpg", "blue", "business-process-outsourcing"],
    ["Cyber Security", "shield", "img/svc-software.jpg", "cyan", "cyber-security"]
  ];
  var INDUSTRIES = ["Government Sector", "Private Sector", "Education Sector", "Offshore Client", "RMG Sector", "Healthcare", "Banking & Finance", "Retail & Super Shop", "Real Estate", "NGO & Development", "ISP & Telecom", "Hospitality & Travel"];
  var TECH = ["PHP / Laravel", "CodeIgniter", "Node.js", "React", "Vue.js", "Next.js", "Flutter", "Android (Kotlin)", "iOS (Swift)", "Python / Django", "ASP.NET", "MySQL", "PostgreSQL", "MongoDB", "AWS", "Docker"];

  /* tech logos (local SVG files) for the scrolling marquee */
  var TECH_LOGOS = [
    ["PHP", "php.svg"], ["Laravel", "laravel.svg"], ["CodeIgniter", "codeigniter.svg"],
    ["Node.js", "nodejs.svg"], ["JavaScript", "javascript.svg"], ["React", "react.svg"],
    ["Vue.js", "vue.svg"], ["Next.js", "nextjs.svg"], ["Python", "python.svg"],
    ["Django", "django.svg"], ["Flutter", "flutter.svg"], ["Android", "android.svg"],
    ["iOS", "ios.svg"], [".NET", "dotnet.svg"], ["MySQL", "mysql.svg"],
    ["PostgreSQL", "postgresql.svg"], ["MongoDB", "mongodb.svg"], ["WordPress", "wordpress.svg"],
    ["Docker", "docker.svg"], ["AWS", ""]
  ];
  var TESTIMONIALS = [
    { q: "Shahriar LLC delivered our ERP ahead of schedule and the support has been outstanding ever since.", n: "Managing Director", r: "Manufacturing Group" },
    { q: "Their school management system transformed how we run admissions, results and billing.", n: "Principal", r: "Education Institute" },
    { q: "A dependable offshore partner. Clear communication and truly senior engineering.", n: "CTO", r: "Offshore Client" }
  ];
  var PORTFOLIO = [
    { cat: "ERP", t: "Enterprise Resource Planning", d: "Full ERP with inventory, accounts, HR and reporting for a manufacturing group." },
    { cat: "Education", t: "School Management System", d: "Admissions, attendance, results, fees and parent portal for 10,000+ students." },
    { cat: "Retail", t: "Super Shop Management", d: "POS, stock, supplier and loyalty system across multiple outlets." },
    { cat: "HR", t: "HR & Payroll Platform", d: "Payroll, leave, attendance and HR workflow for enterprise clients." },
    { cat: "E-commerce", t: "E-commerce Solution", d: "Multi-vendor store with payments, delivery and dashboard." },
    { cat: "Government", t: "E-Governance Solution", d: "Citizen services portal with secure workflow and reporting." }
  ];

  /* ---------- helpers ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- store-aware data getters ---------- */
  function livePhone() {
    if (window.SH) { var s = SH.get().site || {}; if (s.phone) return s.phone; }
    return "+880 1958-633202";
  }
  function livePhoneDial() { return String(livePhone()).replace(/[^\d+]/g, ""); }
  function liveEmail() {
    if (window.SH) { var s = SH.get().site || {}; if (s.email) return s.email; }
    return "info@sprint.fast-page.org";
  }

  function servicesData() {
    if (window.SH && SH.list("services").length) {
      return SH.list("services").map(function (s) { return [s.title, s.icon, s.img, s.color, s.id, s.short]; });
    }
    return SERVICE_LIST;
  }
  function productsData() {
    if (window.SH && SH.list("products").length) {
      return SH.list("products").map(function (p) { return { name: p.name, tag: p.tag, img: p.img, logo: p.logo, slug: p.id }; });
    }
    return PRODUCTS;
  }

  /* ---------- render a service card (image + floating icon) ---------- */
  function svcCard(s, i) {
    var delay = (i % 3) * 110;
    var slug = s[4] || "";
    var link = slug ? "service?item=" + encodeURIComponent(slug) : "services";
    var img = s[2] || "img/svc-web.jpg";
    var src = /^(assets\/|data:|http)/.test(img) ? img : ("assets/" + img);
    return '<article class="service-card reveal" style="--d:' + delay + 'ms">' +
      '<div class="sc-img"><img src="' + esc(src) + '" alt="' + esc(s[0]) + '" loading="lazy" /></div>' +
      '<div class="sc-body">' +
      '<span class="sc-ic icon-' + (s[3] || "blue") + '">' + icon(s[1]) + '</span>' +
      '<h3>' + esc(s[0]) + '</h3>' +
      '<p>' + esc(s[5] || ("Robust, scalable and efficient " + String(s[0]).toLowerCase() + " delivered by our senior team.")) + '</p>' +
      '<a class="btn-service" href="' + link + '">View Details</a>' +
      '</div></article>';
  }

  /* ---------- page-specific renderers ---------- */
  function renderHome() {
    if ($("homeServices")) {
      $("homeServices").innerHTML = servicesData().slice(0, 9).map(svcCard).join("");
    }
    if ($("homeProducts")) {
      $("homeProducts").innerHTML = productsData().slice(0, 6).map(function (p, i) {
        var src = /^(assets\/|data:|http)/.test(p.img || "") ? p.img : ("assets/" + p.img);
        return '<article class="product-card reveal" style="--d:' + ((i % 3) * 110) + 'ms">' +
          '<a href="detail?item=' + p.slug + '" style="display:contents">' +
          '<div class="pc-logo">' + esc(p.logo) + '</div>' +
          '<h3 class="pc-tag">' + esc(p.name) + '</h3>' +
          '<p class="pc-sub">' + esc(p.tag) + '</p>' +
          '<div class="pc-frame"><img src="' + esc(src) + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
          '</a>' +
          '<div class="pc-actions">' +
          '<a href="tel:' + livePhoneDial() + '" class="btn-product btn-call">&#128222; Call Now</a>' +
          '<a href="detail?item=' + p.slug + '" class="btn-product btn-demo">&#128433; Try Demo</a>' +
          '</div></article>';
      }).join("");
    }
    if ($("homeIndustries")) {
      $("homeIndustries").innerHTML = INDUSTRIES.slice(0, 8).map(function (n, i) {
        return '<a class="ind reveal" style="--d:' + (i * 80) + 'ms" href="clients"><span class="dot"></span>' + esc(n) + '</a>';
      }).join("");
    }
    if ($("homeTech")) {
      $("homeTech").innerHTML = buildMarquee();
    }
    if ($("homeTestimonials")) {
      $("homeTestimonials").innerHTML = TESTIMONIALS.map(function (t, i) {
        return '<blockquote class="quote reveal" style="--d:' + (i * 120) + 'ms"><p>&ldquo;' + esc(t.q) + '&rdquo;</p>' +
          '<div class="who">' + esc(t.n) + '<span>' + esc(t.r) + '</span></div></blockquote>';
      }).join("");
    }
  }

  function renderServicesPage() { if ($("allServices")) $("allServices").innerHTML = servicesData().map(svcCard).join(""); }
  function renderPortfolioPage() {
    if ($("pfGrid")) {
      $("pfGrid").innerHTML = PORTFOLIO.map(function (p, i) {
        return '<article class="pf-card reveal" style="--d:' + ((i % 3) * 110) + 'ms"><div class="pf-thumb">' + esc(p.cat) + '</div>' +
          '<div class="pf-body"><span class="cat">' + esc(p.cat) + '</span>' +
          '<h3>' + esc(p.t) + '</h3><p>' + esc(p.d) + '</p></div></article>';
      }).join("");
    }
  }
  function renderClientsPage() {
    if ($("clientGrid")) {
      $("clientGrid").innerHTML = INDUSTRIES.map(function (n, i) {
        return '<a class="ind reveal" style="--d:' + ((i % 4) * 80) + 'ms" href="portfolio"><span class="dot"></span>' + esc(n) + '</a>';
      }).join("");
    }
  }
  function renderTechPage() {
    if ($("techPageGrid")) {
      $("techPageGrid").outerHTML = buildMarquee();
    }
  }

  /* ---------- header / mobile menu ---------- */
  function setupHeader() {
    var header = document.querySelector(".site-header");
    window.addEventListener("scroll", function () {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });

    var open = function () {
      $("mobileMenu").classList.add("open");
      $("mmOverlay").classList.add("open");
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
      try { history.pushState({ shMenu: true }, ""); } catch (e) {}
    };
    var close = function (fromHistory) {
      $("mobileMenu").classList.remove("open");
      $("mmOverlay").classList.remove("open");
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      /* if the user closed it with a button/overlay, drop our history entry
         so the browser Back button behaves normally next time */
      if (!fromHistory) {
        try { if (history.state && history.state.shMenu) history.back(); } catch (e) {}
      }
    };
    if ($("menuBtn")) $("menuBtn").addEventListener("click", open);
    if ($("mmClose")) $("mmClose").addEventListener("click", function () { close(false); });
    if ($("mmOverlay")) $("mmOverlay").addEventListener("click", function () { close(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(false); });
    /* close the menu when a menu link is tapped (navigates to a new page) */
    var mmMenu = $("mobileMenu");
    if (mmMenu) mmMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mmMenu.classList.remove("open");
        if ($("mmOverlay")) $("mmOverlay").classList.remove("open");
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      });
    });
    /* phone/tablet Back button: if the menu is open, close it instead of
       leaving the site */
    window.addEventListener("popstate", function () {
      if (document.body.classList.contains("menu-open")) close(true);
    });
  }

  /* ---------- contact form (saves a lead/order) ---------- */
  function setupForm() {
    var f = $("contactForm");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = ($("cName") || {}).value || "";
      var phone = ($("cPhone") || $("cMobile") || {}).value || "";
      var email = ($("cEmail") || {}).value || "";
      var subject = ($("cSubject") || {}).value || "";
      var msg = ($("cMsg") || $("cMessage") || {}).value || "";
      var lead = { id: "o-" + Date.now().toString(36), name: name, phone: phone, email: email, subject: subject, message: msg, date: new Date().toISOString().slice(0, 10) };
      if (window.SH) {
        var orders = SH.get().orders || [];
        orders.push(lead);
        SH.get().orders = orders;
        var st = SH.get().stats || {}; st.orders = (st.orders || 0) + 1; SH.get().stats = st;
        SH.save();
      }
      /* send the lead straight to the free cloud database */
      if (window.SHDB) SHDB.addMessage(lead);
      alert("Thank you" + (name ? ", " + name : "") + "! Your message has been received. Our team will contact you shortly.");
      f.reset();
    });
  }

  /* ---------- reveal (AOS-style, robust) ---------- */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- init ---------- */
  function renderAll() {
    applyLiveContent();
    renderHome();
    renderServicesPage();
    renderPortfolioPage();
    renderClientsPage();
    renderTechPage();
    setupReveal();
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* apply live content from the store (admin panel) if present */
    renderAll();
    setupHeader();
    setupForm();
  });

  /* re-render whenever live content changes (admin save, cloud, another tab) */
  window.addEventListener("sh:change", function () {
    try { renderAll(); } catch (e) {}
  });

  /* ---------- live content binding ---------- */
  /* Built-in seed values that appear hard-coded in the HTML.
     They are the initial "from" side of every search-and-replace so
     admin edits propagate to every page (topbar, footer, contact
     blocks). CURRENT remembers the last value we wrote so a second
     admin edit replaces the previous value, not just the seed. */
  var SEED = {
    phone: "+880 1958-633202",
    email: "info@sprint.fast-page.org",
    address: "Dhaka, Bangladesh",
    company: "Shahriar LLC",
    subCompany: "BD LTD"
  };
  var CURRENT = { phone: SEED.phone, email: SEED.email, address: SEED.address, company: SEED.company };

  /* Replace a literal text value inside text nodes only (keeps markup). */
  function replaceText(oldVal, newVal) {
    if (!oldVal || !newVal || oldVal === newVal) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.indexOf(oldVal) !== -1) {
        node.nodeValue = node.nodeValue.split(oldVal).join(newVal);
      }
    }
  }

  /* Swap an old live value for a new one, trying both the seed text and
     whatever value is currently displayed. Returns nothing. */
  function swapField(key, newVal) {
    if (!newVal) return;
    var from = [];
    if (SEED[key] && SEED[key] !== newVal) from.push(SEED[key]);
    if (CURRENT[key] && CURRENT[key] !== newVal && from.indexOf(CURRENT[key]) === -1) from.push(CURRENT[key]);
    from.forEach(function (oldVal) { replaceText(oldVal, newVal); });
    CURRENT[key] = newVal;
  }

  /* Point every tel: link at the live phone number. */
  function syncTelLinks(phone) {
    if (!phone) return;
    var dial = String(phone).replace(/[^\d+]/g, "");
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.setAttribute("href", "tel:" + dial);
    });
  }

  /* Point every mailto: link and plain email text at the live email. */
  function syncMailLinks(email) {
    if (!email) return;
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.setAttribute("href", "mailto:" + email);
    });
  }

  /* Keep JSON-LD "telephone" values at the live phone number. */
  function syncSchemaPhone(phone) {
    if (!phone) return;
    var dial = String(phone).replace(/[^\d+]/g, "");
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (sc) {
      try {
        var obj = JSON.parse(sc.textContent);
        var changed = false;
        (function walk(node) {
          if (!node || typeof node !== "object") return;
          if (typeof node.telephone === "string") { node.telephone = dial; changed = true; }
          Object.keys(node).forEach(function (k) { walk(node[k]); });
        })(obj);
        if (changed) sc.textContent = JSON.stringify(obj);
      } catch (e) {}
    });
  }

  /* Fill any element that opts in with data-sh="phone|email|address|company".
     Optional data-sh-href="tel:|mailto:" turns it into a working link. */
  function syncDataAttrs(s) {
    document.querySelectorAll("[data-sh]").forEach(function (el) {
      var k = el.getAttribute("data-sh");
      var v = s[k];
      if (v == null || v === "") return;
      var scheme = el.getAttribute("data-sh-href");
      if (scheme) {
        var hrefVal = scheme === "tel:" ? String(v).replace(/[^\d+]/g, "") : String(v);
        el.setAttribute("href", scheme + hrefVal);
        if (!el.textContent.trim()) el.textContent = v;
      } else if (el.tagName === "IMG") {
        el.setAttribute("src", v);
        el.setAttribute("alt", s.company || "");
      } else {
        el.textContent = v;
      }
    });
  }

  /* Resolve an image path to a src usable from any page depth. */
  function imgSrc(img) {
    if (!img) return "";
    return /^(assets\/|data:|http|\.\.\/|\/)/.test(img) ? img : ("assets/" + img);
  }

  /* Fill CEO name / role / photo / message wherever hooks exist. */
  function bindCeo(c) {
    if (!c) return;
    var name = c.name || "";
    var role = c.role || "";
    var msg = c.message || [];

    document.querySelectorAll("[data-ceo='photo'], .ceo-photo > img").forEach(function (el) {
      if (el.tagName === "IMG" && c.img) { el.src = imgSrc(c.img); el.alt = name || el.alt; }
    });
    document.querySelectorAll("[data-ceo='name'], .ceo-name > strong").forEach(function (el) {
      if (name) el.textContent = name.toUpperCase();
    });
    document.querySelectorAll("[data-ceo='role'], .ceo-name > span").forEach(function (el) {
      if (role) el.textContent = role;
    });
    /* CEO message paragraphs (ceo.html + about.html#ceo) */
    document.querySelectorAll("[data-ceo='message']").forEach(function (wrap) {
      if (!msg.length) return;
      wrap.innerHTML = msg.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    });
    document.querySelectorAll(".ceo-sign").forEach(function (el) {
      if (name && role) el.innerHTML = "&mdash; " + esc(name) + ", " + esc(role);
    });
  }

  /* Build a team card grid for both about.html and team.html. */
  var TEAM_FALLBACK = [
    { id: "md-mofakhkharul-islam", name: "Md. Mofakhkharul Islam", role: "CEO & Managing Director", img: "assets/img/team-1.jpg" },
    { id: "md-mohiuddin-ahmed", name: "Md. Mohiuddin Ahmed", role: "Director (Finance)", img: "assets/img/team-2.jpg" },
    { id: "md-tariqul-azam", name: "Md Tariqul Azam", role: "Managing Partner (Business Development)", img: "assets/img/team-3.jpg" },
    { id: "john-henao", name: "John Henao", role: "Inter. Market Managing Partner", img: "assets/img/team-4.jpg" },
    { id: "head-of-engineering", name: "Head of Engineering", role: "Software Architecture", img: "assets/img/team-5.jpg" },
    { id: "manager-client-success", name: "Manager, Client Success", role: "Customer Support", img: "assets/img/team-6.jpg" }
  ];
  function teamData() {
    if (window.SH && SH.list("team").length) return SH.list("team");
    return TEAM_FALLBACK;
  }
  function slugOf(m) {
    return m.id || String(m.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function renderTeamGrids(team) {
    var list = (team && team.length) ? team : teamData();
    var html = list.map(function (m, i) {
      return '<a class="member reveal in" href="profile?m=' + esc(slugOf(m)) + '" style="--d:' + ((i % 4) * 90) + 'ms;text-decoration:none">' +
        '<div class="member-photo"><img src="' + esc(imgSrc(m.img)) + '" alt="' + esc(m.name || "") + '" loading="lazy"></div>' +
        '<div class="mb"><h3>' + esc(m.name || "") + '</h3><span>' + esc(m.role || "") + '</span></div></a>';
    }).join("");
    document.querySelectorAll("#teamGrid, #homeTeam").forEach(function (g) { g.innerHTML = html; });
  }

  /* ---- hero slider: slides the picture in the hero card ----
     The container keeps the exact same box as the old single image.
     With 0 or 1 slide it just shows that image (no timer). */
  var heroTimer = null;
  function renderHeroSlider(slides) {
    var host = document.getElementById("heroSlider");
    if (!host) return;
    if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
    var list = (slides || []).filter(function (sl) { return sl && sl.img; });
    /* No slides configured yet: keep whatever static image is already in
       the markup so the hero picture never disappears. */
    if (!list.length) return;

    host.innerHTML = list.map(function (sl, i) {
      return '<img class="hero-slide' + (i === 0 ? " is-active" : "") + '" src="' + esc(imgSrc(sl.img)) + '" alt="' + esc(sl.alt || "") + '"' +
        (i === 0 ? "" : ' loading="lazy"') + ' />';
    }).join("");

    if (list.length < 2) return;   /* single image: nothing to slide */

    var imgs = host.querySelectorAll(".hero-slide");
    var idx = 0;
    heroTimer = setInterval(function () {
      imgs[idx].classList.remove("is-active");
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add("is-active");
    }, 2000);
  }

  /* Apply live content from the store to every visible element. */
  function applyLiveContent() {
    if (!window.SH) return;
    var d = SH.get();
    var s = d.site || {};

    /* ---- brand / company name (logo alt, footer copyright, etc.) ---- */
    if (s.company) {
      swapField("company", s.company);
    }

    /* ---- phone: literal text + tel: links + schema telephone ---- */
    if (s.phone) {
      swapField("phone", s.phone);
      /* the spaceless form (+8801958... / 01863...) also appears in tel:
         links and JSON-LD; swap it too so a phone change never leaves a
         stale number behind. */
      var spaced = SEED.phone;
      var bare = SEED.phone.replace(/[^\d+]/g, "");
      var curBare = (CURRENT.phone || "").replace(/[^\d+]/g, "");
      var newBare = String(s.phone).replace(/[^\d+]/g, "");
      [bare, curBare].forEach(function (oldBare) {
        if (oldBare && oldBare !== newBare) replaceText(oldBare, String(s.phone));
      });
      syncTelLinks(s.phone);
      syncSchemaPhone(s.phone);
    }

    /* ---- email: literal text + mailto: links ---- */
    if (s.email) {
      swapField("email", s.email);
      syncMailLinks(s.email);
    }

    /* ---- address ---- */
    if (s.address) {
      swapField("address", s.address);
    }

    /* ---- social links (footer Fb / Ig / Tg / In / Yt + profile-social) ---- */
    var social = { Facebook: s.facebook, Instagram: s.instagram, Telegram: s.telegram, LinkedIn: s.linkedin, YouTube: s.youtube };
    document.querySelectorAll(".social a, .profile-social a").forEach(function (a) {
      var label = (a.getAttribute("aria-label") || a.textContent || "").trim().toLowerCase();
      var url = null;
      if (/facebook|^fb$/.test(label)) url = social.Facebook;
      else if (/instagram|^ig$/.test(label)) url = social.Instagram;
      else if (/telegram|^tg$/.test(label)) url = social.Telegram;
      else if (/linkedin|^in$/.test(label)) url = social.LinkedIn;
      else if (/youtube|^yt$/.test(label)) url = social.YouTube;
      if (url && url !== "#") { a.setAttribute("href", url); a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
    });

    /* ---- contact summary line in the topbar ---- */
    var topContact = document.querySelector(".topbar span");
    if (topContact && (s.phone || s.email)) {
      topContact.innerHTML = "&#128222; " + esc(s.phone || SEED.phone) + " &nbsp;|&nbsp; &#9993; " + esc(s.email || SEED.email);
    }

    /* ---- footer "Get In Touch" list ---- */
    document.querySelectorAll(".footer-links").forEach(function (ul) {
      var head = ul.previousElementSibling;
      if (!head || (head.textContent || "").trim().toLowerCase() !== "get in touch") return;
      var lis = ul.querySelectorAll("li");
      if (lis[0] && s.phone) lis[0].innerHTML = "&#128222; " + esc(s.phone);
      if (lis[1] && s.email) lis[1].innerHTML = "&#9993; " + esc(s.email);
      if (lis[2] && s.address) lis[2].innerHTML = "&#127968; " + esc(s.address);
    });

    /* ---- contact / order page info cards ---- */
    document.querySelectorAll(".ci").forEach(function (ci) {
      var p = ci.querySelector("p");
      var label = ((ci.querySelector("span") || {}).textContent || "").toLowerCase();
      if (!p) return;
      if (/phone|whatsapp|mobile/.test(label) && s.phone) p.textContent = s.phone;
      else if (/email|mail/.test(label) && s.email) p.textContent = s.email;
      else if (/location|address|office/.test(label) && s.address) p.textContent = s.address;
    });

    /* ---- explicit opt-in bindings ---- */
    syncDataAttrs(s);

    /* ---- hero ---- */
    if (d.hero && document.querySelector(".hero h1")) {
      var h = d.hero;
      document.querySelectorAll(".hero h1").forEach(function (el) {
        if (h.title) el.innerHTML = esc(h.title).replace(/(software company)/i, '<span style="color:var(--accent)">$1</span>').replace(/(Top 1%)/i, '<span style="color:var(--accent)">$1</span>');
      });
      /* hero lead paragraph (index uses a bare <p>, older pages use .lead) */
      document.querySelectorAll(".hero .lead, .hero p").forEach(function (el) {
        if (el.closest(".hero-badges") || el.closest(".hero-cta")) return;
        if (h.subtitle) el.textContent = h.subtitle;
      });
      document.querySelectorAll(".hero-badges").forEach(function (wrap) {
        wrap.innerHTML = '<div><strong>' + esc(h.stat1n || "") + '</strong><span>' + esc(h.stat1l || "") + '</span></div>' +
          '<div><strong>' + esc(h.stat2n || "") + '</strong><span>' + esc(h.stat2l || "") + '</span></div>' +
          '<div><strong>' + esc(h.stat3n || "") + '</strong><span>' + esc(h.stat3l || "") + '</span></div>';
      });
      /* badge pill (may not exist on every hero) */
      document.querySelectorAll(".hero .badge-pill, .hero .hero-badge").forEach(function (badge) {
        if (h.badge) badge.innerHTML = '<span class="dot"></span>' + esc(h.badge);
      });
    }

    /* ---- tagline (footer brand line) ---- */
    if (s.tagline) {
      document.querySelectorAll(".footer-tagline").forEach(function (el) { el.textContent = s.tagline; });
    }

    /* ---- footer copyright: show company + sub-company ---- */
    if (s.company) {
      var co = s.company + (s.subCompany ? " " + s.subCompany : "");
      document.querySelectorAll(".footer-bottom span").forEach(function (el) {
        if (/all rights reserved/i.test(el.textContent)) {
          el.innerHTML = "&copy; " + new Date().getFullYear() + " " + esc(co) + ". All rights reserved.";
        }
      });
    }

    /* ---- logo image (if admin uploaded one) ---- */
    if (s.logo) {
      document.querySelectorAll("img[src*='logo.svg']").forEach(function (im) { im.src = s.logo; });
    }

    /* ---- CEO profile (ceo.html + about.html #ceo) ---- */
    bindCeo(d.ceo || {});

    /* ---- management team grids (about.html, team.html) ---- */
    renderTeamGrids(d.team || []);

    /* ---- hero slider (index.html hero picture) ---- */
    renderHeroSlider(d.slides || []);

    /* ---- document title / brand text in browser tab ---- */
    if (s.company) {
      [SEED.company, CURRENT.company].forEach(function (oldName) {
        if (oldName && oldName !== s.company) document.title = document.title.split(oldName).join(s.company);
      });
    }
  }
})();
