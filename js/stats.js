/* =========================================================
   Shahriar LLC — Accurate visitor analytics (free)
   ---------------------------------------------------------
   Every visit is written to Firebase as its own record, so the
   count is always accurate no matter how many devices/tabs.

   Storage in Firebase:
     shahriar-llc/site/visits/{pushId} = {
        d: "2026-10-25",           day
        m: "2026-10",              month
        t: <timestamp>,
        p: "/order.html",          page
        r: "<referrer host>",      where they came from
        v: "<visitor id>",         same person (per browser/day)
        n: <1 or 0>                new visitor today?
     }

   Usage:
     SHSTATS.track()            -> call once per page load
     SHSTATS.today(cb)          -> { visitors, views }
     SHSTATS.range(days, cb)    -> array of daily counts
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.SH_CONFIG || {};
  var FB = CFG.FIREBASE || {};
  var URL = (FB.databaseURL || "").replace(/\/$/, "");
  var KEY = FB.apiKey || "";
  var VISITS = "shahriar-llc/site/visits";
  var CLOUD = !!(URL && KEY);

  function uid() {
    var k = "sh_uid";
    try {
      var v = localStorage.getItem(k);
      if (!v) { v = Date.now().toString(36) + Math.random().toString(36).slice(2, 8); localStorage.setItem(k, v); }
      return v;
    } catch (e) { return "anon-" + Math.random().toString(36).slice(2, 8); }
  }

  function page() { return location.pathname + (location.search || ""); }
  function refHost() {
    try { return document.referrer ? new URL(document.referrer).hostname : "direct"; }
    catch (e) { return "direct"; }
  }

  function push(rec, cb) {
    if (!CLOUD) { if (cb) cb(false); return; }
    fetch(URL + "/" + VISITS + ".json?auth=" + encodeURIComponent(KEY), {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rec)
    }).then(function (r) { if (cb) cb(!!r.ok); }).catch(function () { if (cb) cb(false); });
  }

  function read(cb) {
    if (!CLOUD) { cb({}); return; }
    fetch(URL + "/" + VISITS + ".json?auth=" + encodeURIComponent(KEY) + "&shallow=false", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { cb(d || {}); })
      .catch(function () { cb({}); });
  }

  window.SHSTATS = {
    isCloud: function () { return CLOUD; },

    /* record one page view (once per page load) */
    track: function () {
      if (!CLOUD) return;
      var d = new Date();
      var day = d.toISOString().slice(0, 10);
      var month = d.toISOString().slice(0, 7);
      var newKey = "sh_seen_" + day;
      var isNew = false;
      try { if (!sessionStorage.getItem(newKey)) { sessionStorage.setItem(newKey, "1"); isNew = true; } } catch (e) { isNew = true; }
      push({ d: day, m: month, t: d.getTime(), p: page(), r: refHost(), v: uid(), n: isNew ? 1 : 0 });
    },

    /* fetch all visit records and compute stats */
    _compute: function (data) {
      var today = new Date().toISOString().slice(0, 10);
      var recs = [];
      Object.keys(data || {}).forEach(function (k) { recs.push(data[k]); });
      var todayViews = 0, todayVisitors = {}, allVisitors = {}, byDay = {};
      recs.forEach(function (r) {
        if (!r) return;
        if (r.d === today) { todayViews++; if (r.v) todayVisitors[r.v] = 1; }
        if (r.v) allVisitors[r.v] = 1;
        byDay[r.d] = (byDay[r.d] || 0) + 1;
      });
      return {
        todayVisitors: Object.keys(todayVisitors).length,
        todayViews: todayViews,
        allVisitors: Object.keys(allVisitors).length,
        totalViews: recs.length,
        byDay: byDay
      };
    },

    today: function (cb) { read(function (d) { cb(window.SHSTATS._compute(d)); }); },
    range: function (cb) { read(function (d) { cb(window.SHSTATS._compute(d)); }); }
  };

  /* auto-track this page load */
  window.SHSTATS.track();
})();
