/* =========================================================
   Shahriar LLC — Content Store
   ---------------------------------------------------------
   A single source of truth for all editable site content.
   Works out of the box with localStorage (so it runs on
   localhost immediately), and can be pointed at Firebase
   Realtime Database by setting window.SH_USE_FIREBASE = true
   and window.SH_FIREBASE_URL.

   Public pages call SH.get() to render live content.
   Admin panel calls SH.set()/SH.save() to edit everything.

   Schema:
     site      { company, tagline, subTagline, phone, email, address,
                 facebook, instagram, telegram, logo (dataURL|url) }
     services  [ {id, title, icon, color, img, short, overview,
                  features[], includes[]} ]
     products  [ {id, name, tag, logo, img, short, overview,
                  features[], price} ]
     team      [ {id, name, role, img, bio, focus[]} ]
     ceo       { name, role, img, message[] }
     admins    [ {id, username, password, role} ]
     stats     { visitors, pageviews, orders }
   ========================================================= */
(function () {
  "use strict";

  var KEY = "shahriar_llc_content_v1";
  var USE_FB = !!window.SH_USE_FIREBASE;
  var FB_URL = window.SH_FIREBASE_URL || "";
  /* cloud merge flag: true once remote data has arrived */
  var CLOUD = false;

  /* ---------- default seed content ---------- */
  function seed() {
    return {
      site: {
        company: "Shahriar LLC",
        subCompany: "BD LTD",
        tagline: "Best Software Company in Bangladesh",
        topPhone: "+880 1958-633202",
        topEmail: "info@sprint.fast-page.org",
        phone: "+880 1958-633202",
        email: "info@sprint.fast-page.org",
        address: "Dhaka, Bangladesh",
        facebook: "#", instagram: "#", telegram: "#", linkedin: "#", youtube: "#",
        logo: ""
      },
      hero: {
        badge: "Trusted Development Team",
        title: "Top 1% software company in Bangladesh since 2007",
        subtitle: "Shahriar LLC is a diversified offshore IT services company delivering software, ERP, CRM, POS, HR & payroll, web and mobile solutions.",
        stat1n: "18+", stat1l: "Years Experience",
        stat2n: "500+", stat2l: "Projects Delivered",
        stat3n: "24/7", stat3l: "Support"
      },
      services: [
        { id: "website-design-development", title: "Website Design & Development", icon: "code", color: "blue", img: "assets/img/svc-web.jpg", short: "Professional, responsive websites designed to grow your business.", overview: "We design and build fast, secure and beautiful websites.", features: ["Custom responsive design", "SEO-friendly structure", "Fast loading & secure", "Analytics integration", "Content management", "Lifetime support"], includes: ["Requirement analysis", "UI/UX design", "Development & testing", "Deployment", "Training", "Support"] },
        { id: "custom-software-development", title: "Custom Software Development", icon: "code", color: "cyan", img: "assets/img/svc-software.jpg", short: "Tailor-made software built exactly for your business.", overview: "We build custom software from the ground up.", features: ["Custom workflows", "Role-based access", "Reporting", "API integration", "Scalable architecture", "Full source ownership"], includes: ["Discovery", "Architecture", "Agile development", "QA & security", "Deployment", "Support"] },
        { id: "mobile-apps-development", title: "Mobile Apps Development", icon: "phone", color: "orange", img: "assets/img/svc-mobile.jpg", short: "Android & iOS apps your customers will love.", overview: "Native and cross-platform mobile apps.", features: ["Android & iOS", "Flutter", "Push notifications", "Offline support", "Payments", "Store deployment"], includes: ["UI/UX design", "Development", "API integration", "Testing", "Store submission", "Maintenance"] },
        { id: "erp-crm-solutions", title: "ERP & CRM Solutions", icon: "erp", color: "purple", img: "assets/img/svc-erp.jpg", short: "ERP and CRM to run your whole business.", overview: "Bring operations under one platform.", features: ["Inventory & accounts", "Sales & purchase", "HR & payroll", "Customer management", "Real-time reports", "Multi-branch"], includes: ["Business analysis", "Setup", "Data migration", "Customization", "Training", "Support"] },
        { id: "digital-marketing", title: "Digital Marketing", icon: "cloud", color: "green", img: "assets/img/svc-marketing.jpg", short: "Grow reach with SEO and campaigns.", overview: "Data-driven digital marketing.", features: ["SEO", "Social media", "Content strategy", "Paid ads", "Analytics", "Conversion optimization"], includes: ["Audit", "Keyword research", "Campaign setup", "Content", "Monitoring", "Reports"] },
        { id: "it-support-consultancy", title: "IT Support & Consultancy", icon: "shield", color: "blue", img: "assets/img/svc-support.jpg", short: "Reliable IT support and expert guidance.", overview: "Keep systems running and plan your roadmap.", features: ["24/7 support", "Infrastructure consulting", "Security audits", "Cloud migration", "Backup", "IT strategy"], includes: ["Assessment", "Recommendations", "Implementation", "Monitoring", "Maintenance", "Reports"] }
      ],
      products: [
        { id: "sheba-erp", name: "Sheba ERP", tag: "Best ERP Software in Bangladesh", logo: "ERP", img: "assets/img/prod-erp.jpg", short: "All-in-one enterprise resource planning.", overview: "Sheba ERP unifies accounts, inventory, sales and HR.", features: ["Accounts & finance", "Inventory", "Sales & purchase", "HR & payroll", "Dashboards", "Multi-branch"], price: "Contact for pricing" },
        { id: "hr-sheba", name: "HR Sheba", tag: "Best HR & Payroll Software", logo: "HR", img: "assets/img/prod-hr.jpg", short: "Complete HR and payroll automation.", overview: "HR Sheba handles employees, attendance and payroll.", features: ["Employee database", "Attendance", "Payroll", "Tax sheets", "Self-service", "Reports"], price: "Contact for pricing" },
        { id: "smart-educare", name: "Smart Educare", tag: "Best School Management System", logo: "EDU", img: "assets/img/prod-school.jpg", short: "Modern school management.", overview: "Admissions, attendance, exams, results and fees.", features: ["Admissions", "Attendance", "Exams & results", "Fees", "Parent portal", "SMS"], price: "Contact for pricing" },
        { id: "gym-master", name: "Gym Master", tag: "Best Gym Management Software", logo: "GYM", img: "assets/img/prod-gym.jpg", short: "Manage memberships and billing.", overview: "Gym Master handles members, packages and payments.", features: ["Member management", "Packages", "Payments", "Attendance", "Reminders", "Reports"], price: "Contact for pricing" },
        { id: "crm-suite", name: "CRM Suite", tag: "Best CRM Software in Bangladesh", logo: "CRM", img: "assets/img/prod-crm.jpg", short: "Manage leads and your sales pipeline.", overview: "Capture leads and track deals.", features: ["Lead management", "Pipeline", "Follow-up", "Customer history", "Automation", "Analytics"], price: "Contact for pricing" },
        { id: "remit-sheba", name: "Remit Sheba", tag: "Best Remittance Management System", logo: "RMS", img: "assets/img/prod-remit.jpg", short: "Secure remittance management.", overview: "Manage senders, beneficiaries and transactions.", features: ["Sender & beneficiary", "Exchange rates", "Transactions", "Compliance", "Outlets", "Reports"], price: "Contact for pricing" }
      ],
      team: [
        { id: "md-mofakhkharul-islam", name: "Md. Mofakhkharul Islam", role: "CEO & Managing Director", img: "assets/img/team-1.jpg", bio: "Engr. Md. Mofakhkharul Islam has led Shahriar LLC since its founding in 2007.", focus: ["Strategy", "Project management", "Technology leadership", "Client relationships"] },
        { id: "md-mohiuddin-ahmed", name: "Md. Mohiuddin Ahmed", role: "Director (Finance)", img: "assets/img/team-2.jpg", bio: "Md. Mohiuddin Ahmed leads finance, budgeting and compliance.", focus: ["Financial planning", "Budgeting", "Compliance", "Risk management"] },
        { id: "md-tariqul-azam", name: "Md Tariqul Azam", role: "Managing Partner (Business Development)", img: "assets/img/team-3.jpg", bio: "Capt. Tarique Lincoln drives business development and partnerships.", focus: ["Business development", "Partnerships", "Market expansion", "Client growth"] },
        { id: "john-henao", name: "John Henao", role: "Inter. Market Managing Partner", img: "assets/img/team-4.jpg", bio: "John Henao brings 15+ years in international marketing.", focus: ["International marketing", "Market research", "Growth strategy", "Brand"] },
        { id: "head-of-engineering", name: "Head of Engineering", role: "Software Architecture", img: "assets/img/team-5.jpg", bio: "Leads the technical architecture of every project.", focus: ["System architecture", "Code quality", "Security", "Mentoring"] },
        { id: "manager-client-success", name: "Manager, Client Success", role: "Customer Support", img: "assets/img/team-6.jpg", bio: "Ensures every customer receives prompt support.", focus: ["Client onboarding", "Support", "Delivery", "Satisfaction"] }
      ],
      ceo: {
        name: "Md. Mofakhkharul Islam",
        role: "CEO & Managing Director",
        img: "assets/img/ceo.jpg",
        message: [
          "Welcome to Shahriar LLC.",
          "Since 2007 we have grown from a small team of passionate engineers into a diversified offshore IT services company trusted by organisations across Bangladesh and beyond.",
          "In a fast-moving digital world, we believe the difference between good and great companies is accountability. Every project is owned end-to-end by a senior team.",
          "Whether you need a website, an enterprise platform, or a fully custom solution, our commitment is quality engineering, transparent delivery and lifetime-friendly support."
        ]
      },
      admins: [
        { id: "admin-1", username: "admin", password: "shahriyar123", role: "Owner" }
      ],
      stats: { visitors: 0, pageviews: 0, orders: 0 }
    };
  }

  /* ---------- load / save ---------- */
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    var s = seed();
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }

  var DATA = load();

  function save(opts) {
    try { localStorage.setItem(KEY, JSON.stringify(DATA)); } catch (e) { console.warn("save failed", e); }
    /* push to the free real-time cloud + other open tabs */
    if (window.SHDB && !(opts && opts.remote)) {
      window.SHDB.push(DATA);
    } else if (USE_FB && FB_URL) {
      fetch(FB_URL.replace(/\/$/, "") + "/content.json", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(DATA)
      }).catch(function () {});
    }
    try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
    return true;
  }

  /* ---------- merge a remote/cloud snapshot ---------- */
  function mergeRemote(remote) {
    if (!remote || typeof remote !== "object" || remote.__message) return false;
    /* shallow merge at top level, deep-merge the fixed objects */
    Object.keys(remote).forEach(function (k) {
      if (k === "site" || k === "hero" || k === "stats" || k === "ceo") {
        DATA[k] = Object.assign({}, DATA[k] || {}, remote[k] || {});
      } else {
        DATA[k] = remote[k];
      }
    });
    CLOUD = true;
    try { localStorage.setItem(KEY, JSON.stringify(DATA)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
    return true;
  }

  /* ---------- live sync bootstrap (tabs + cloud) ---------- */
  function startLive() {
    if (!window.SHDB) return;
    /* initial cloud read: cloud content wins if it exists */
    window.SHDB.pull(function (remote) { if (remote) mergeRemote(remote); });
    /* live updates from other tabs / polled cloud changes */
    window.SHDB.subscribe(function (msg) {
      if (!msg || !msg.data) return;
      if (msg.data.__message) {
        var msgs = DATA.orders || (DATA.orders = []);
        msgs.push(msg.data.__message);
        try { localStorage.setItem(KEY, JSON.stringify(DATA)); } catch (e) {}
        try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
        return;
      }
      mergeRemote(msg.data);
    });
  }

  /* ---------- public API ---------- */
  window.SH = {
    get: function () { return DATA; },
    save: save,
    reset: function () { DATA = seed(); save(); return DATA; },
    /* real-time helpers */
    isCloud: function () { return CLOUD; },
    live: startLive,
    /* generic collection helpers */
    list: function (coll) { return DATA[coll] || []; },
    getItem: function (coll, id) {
      var a = DATA[coll] || [];
      for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i];
      return null;
    },
    upsert: function (coll, obj) {
      if (!DATA[coll]) DATA[coll] = [];
      if (!obj.id) obj.id = (obj.title || obj.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36);
      var a = DATA[coll], found = false;
      for (var i = 0; i < a.length; i++) if (a[i].id === obj.id) { a[i] = obj; found = true; break; }
      if (!found) a.push(obj);
      save();
      return obj;
    },
    remove: function (coll, id) {
      DATA[coll] = (DATA[coll] || []).filter(function (x) { return x.id !== id; });
      save();
    }
  };

  /* ---------- visit tracking (live dashboard) ---------- */
  try {
    var today = new Date().toISOString().slice(0, 10);
    var vk = "sh_visit_" + today;
    if (!sessionStorage.getItem(vk)) {
      sessionStorage.setItem(vk, "1");
      DATA.stats.visitors = (DATA.stats.visitors || 0) + 1;
      save();
    }
    DATA.stats.pageviews = (DATA.stats.pageviews || 0) + 1;
    save();
  } catch (e) {}

  /* ---------- go live (free real-time sync) ---------- */
  startLive();
})();
