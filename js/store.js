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
      subservices [ {id, parent, title, icon, color, img, tagline,
                   overview, features[], includes[], price, delivery} ]
      products  [ {id, name, tag, logo, img, short, overview,
                  features[], price} ]
     team      [ {id, name, role, img, bio, focus[]} ]
     ceo       { name, role, img, message[] }
      slides    [ {id, img, alt} ]
     admins    [ {id, username, password, role} ]
     stats     { visitors, pageviews, orders }
   ========================================================= */
(function () {
  "use strict";

  var KEY = "shahriar_llc_content_v1";         /* legacy key (still written for compatibility) */
  var KEY_CACHE = "shahriar_llc_cache_v1";     /* render cache, always overwritten by cloud */
  var USE_FB = !!window.SH_USE_FIREBASE;
  var FB_URL = window.SH_FIREBASE_URL || "";
  /* cloud merge flag: true once remote data has arrived */
  var CLOUD = false;

  /* ---------- default TEMPLATE content ----------
     IMPORTANT: this is intentionally EMPTY. The code ships as a
     data-free template. Every piece of content (site info, services,
     products, team, portfolio, slides, ceo, hero) is loaded from the
     cloud (Firebase) at runtime. Nothing is hard-coded in the app. */
  function seed() {
    return {
      site: {
        company: "",
        subCompany: "",
        tagline: "",
        topPhone: "",
        topEmail: "",
        phone: "",
        email: "",
        address: "",
        facebook: "#", instagram: "#", telegram: "#", linkedin: "#", youtube: "#",
        logo: ""
      },
      hero: {
        badge: "", title: "", subtitle: "",
        stat1n: "", stat1l: "", stat2n: "", stat2l: "", stat3n: "", stat3l: ""
      },
      services: [],
      subservices: [],
      products: [],
      team: [],
      testimonials: [],
      ceo: { name: "", role: "", img: "", message: [] },
      admins: [],
      slides: [],
      portfolio: [],
      stats: { visitors: 0, pageviews: 0, orders: 0 }
    };
  }

  /* ---------- load / save ---------- */
  /* Start from the empty template every fresh load. When cloud data
     arrives it fully replaces the template (see mergeRemote). A small
     localStorage cache is used ONLY as an instant first paint on
     reloads; it is always overwritten by the cloud snapshot, so a plain
     refresh shows the newest data without clearing anything. */
  function load() {
    try {
      var raw = localStorage.getItem(KEY_CACHE);
      if (raw) {
        var cached = JSON.parse(raw);
        if (cached && typeof cached === "object") return cached;
      }
    } catch (e) {}
    return seed();
  }

  var DATA = load();
  /* READY becomes true as soon as we have rendered something real
     (either cached-from-cloud or a fresh cloud snapshot). */
  var READY = false;

  function cacheWrite() {
    try { localStorage.setItem(KEY, JSON.stringify(DATA)); } catch (e) {}
    try { localStorage.setItem(KEY_CACHE, JSON.stringify(DATA)); } catch (e) {}
  }

  function save(opts) {
    cacheWrite();
    /* Push to the cloud only for real edits:
         - opts.local  -> local-only (visit tracking), never push
         - opts.remote -> applying a cloud snapshot, never push back
         - otherwise   -> an editor action (public SH.save/upsert/remove)
       A plain visitor page-load uses opts.local, so it can never
       overwrite the admin's saved content in the cloud. */
    var push = !(opts && (opts.local || opts.remote));
    if (push) {
      /* Never write orders or visit-only stats into the shared content
         node. Orders live in their own cloud node (messagesPath) and
         would otherwise be clobbered by whichever device saved last. */
      var payload = {};
      Object.keys(DATA).forEach(function (k) {
        if (k === "orders" || k === "stats") return;
        payload[k] = DATA[k];
      });
      if (window.SHDB && !(opts && opts.remote)) {
        window.SHDB.push(payload);
      } else if (USE_FB && FB_URL) {
        fetch(FB_URL.replace(/\/$/, "") + "/content.json", {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
        }).catch(function () {});
      }
    }
    try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
    return true;
  }

  /* ---------- merge a remote/cloud snapshot ----------
     The cloud is the SINGLE SOURCE OF TRUTH. Whatever the cloud says
     is exactly what the site shows, so a delete in the admin panel
     (which removes the item from the cloud) is reflected everywhere.
     - objects (site/hero/stats/ceo): start from the empty template and
       overlay the cloud fields, so removed fields do not linger.
     - arrays (services/subservices/products/team/portfolio/slides/
       admins/orders): replaced wholesale. A null/absent cloud value
       becomes an EMPTY array (this is what makes delete propagate). */
  var TEMPLATE = seed();
  /* Collections that live inside the shared cloud CONTENT node and are
     REPLACED wholesale by each snapshot (so deletes propagate).
     "orders" is intentionally NOT here: orders live in a separate cloud
     node (messagesPath) and are merged via the messages channel — if it
     were listed here every content poll would wipe locally-held orders. */
  var COLLECTIONS = ["services", "subservices", "products", "team", "portfolio", "slides", "admins", "testimonials"];
  var OBJECTS = { site: true, hero: true, stats: true, ceo: true };

  function mergeRemote(remote) {
    if (!remote || typeof remote !== "object" || remote.__message) return false;
    Object.keys(remote).forEach(function (k) {
      var val = remote[k];
      if (OBJECTS[k]) {
        DATA[k] = Object.assign({}, TEMPLATE[k] || {}, (val && typeof val === "object") ? val : {});
      } else if (COLLECTIONS.indexOf(k) !== -1) {
        DATA[k] = Array.isArray(val) ? val : [];
      } else if (val && typeof val === "object") {
        DATA[k] = val;
      }
      /* unknown scalar/null keys ignored */
    });
    /* any known collection missing from the snapshot => empty it too */
    COLLECTIONS.forEach(function (k) {
      if (!(k in remote)) DATA[k] = [];
    });
    CLOUD = true;
    READY = true;
    cacheWrite();
    try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("sh:ready")); } catch (e) {}
    return true;
  }

  /* ---------- live sync bootstrap (tabs + cloud) ---------- */
  function startLive() {
    if (!window.SHDB) {
      /* no cloud layer loaded: run local-only but still unlock the UI */
      READY = true;
      try { window.dispatchEvent(new CustomEvent("sh:ready")); } catch (e) {}
      return;
    }
    /* initial cloud read: cloud content wins if it exists */
    window.SHDB.pull(function (remote) {
      if (remote) { mergeRemote(remote); return; }
      /* cloud is empty (fresh template): mark ready so the UI can show
         its empty state and the admin can create the owner account. */
      CLOUD = true; READY = true;
      try { window.dispatchEvent(new CustomEvent("sh:ready")); } catch (e) {}
    });
    /* live updates from other tabs / polled cloud changes */
    window.SHDB.subscribe(function (msg) {
      if (!msg || !msg.data) return;
      if (msg.data.__empty) {
        /* the whole cloud content node was cleared: reset to template */
        DATA = seed();
        COLLECTIONS.forEach(function (k) { DATA[k] = []; });
        CLOUD = true; READY = true;
        cacheWrite();
        try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {}
        try { window.dispatchEvent(new CustomEvent("sh:ready")); } catch (e) {}
        return;
      }
      if (msg.data.__message) {
        var msgs = DATA.orders || (DATA.orders = []);
        var om = msg.data.__message;
        var dup = om && om.id && msgs.some(function (x) { return x && x.id === om.id; });
        if (!dup) msgs.push(om);
        cacheWrite();
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
    reset: function () { DATA = seed(); CLOUD = false; cacheWrite(); try { window.dispatchEvent(new CustomEvent("sh:change")); } catch (e) {} return DATA; },
    /* real-time helpers */
    isCloud: function () { return CLOUD; },
    ready: function () { return READY; },
    live: startLive,
    /* persist to the local cache only (no cloud push) */
    persistLocal: function () { cacheWrite(); },
    /* generic collection helpers */
    list: function (coll) { var a = DATA[coll]; return Array.isArray(a) ? a : []; },
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
      save({ local: true });
    }
    DATA.stats.pageviews = (DATA.stats.pageviews || 0) + 1;
    save({ local: true });
  } catch (e) {}

  /* ---------- go live (free real-time sync) ---------- */
  startLive();
})();
