/* =========================================================
   Shahriar LLC — Free real-time cloud sync (no SDK, no build)
   ---------------------------------------------------------
   Uses TWO 100% free transports so the site works everywhere
   without a server of your own:

     1. Cloud  : Firebase Realtime Database REST API
                 (free Spark plan, browser -> cloud -> browser)
     2. Live   : BroadcastChannel + storage events
                 (instant sync between tabs/windows on this PC)

   Public API:
     SHDB.isCloud()          -> true when Firebase is configured
     SHDB.pull(cb)           -> one-time read  (cb(data|null))
     SHDB.subscribe(cb)      -> live updates   (returns unsub fn)
     SHDB.push(obj, onDone)  -> write whole content object
     SHDB.addMessage(msg, cb)-> append a lead/order
     SHDB.pullMessages(cb)   -> read all leads/orders
     SHDB.uid()              -> short unique id
   ========================================================= */
(function () {
  "use strict";

  var CFG = (window.SH_CONFIG || {});
  var FB = CFG.FIREBASE || {};
  var URL = (FB.databaseURL || "").replace(/\/$/, "");
  var KEY = FB.apiKey || "";
  var PATH = FB.path || "shahriar-llc/site/content";
  var MSG_PATH = FB.messagesPath || "shahriar-llc/site/messages";
  var CLOUD = !!(URL && KEY);
  var CH = "shahriar_llc_live_v1";

  var bc = null;
  try { bc = ("BroadcastChannel" in window) ? new BroadcastChannel(CH) : null; } catch (e) { bc = null; }
  var localSubs = [];

  function endpoint(path, bust) {
    /* Firebase REST wants a key in the query string. A `_` timestamp is
       added on reads so no proxy/browser cache ever serves stale data —
       a plain reload always fetches the newest content. */
    var u = URL + "/" + path.replace(/^\//, "") + ".json?auth=" + encodeURIComponent(KEY);
    if (bust) u += "&_=" + Date.now();
    return u;
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ---------- transport 1: local tabs (always available) ---------- */
  function emitLocal(msg) {
    for (var i = 0; i < localSubs.length; i++) { try { localSubs[i](msg); } catch (e) {} }
  }
  if (bc) {
    bc.onmessage = function (ev) { emitLocal({ local: true, data: ev.data && ev.data.data }); };
  }
  window.addEventListener("storage", function (ev) {
    if (ev.key === CH && ev.newValue) {
      try { emitLocal({ local: true, data: JSON.parse(ev.newValue) }); } catch (e) {}
    }
  });
  function broadcast(data) {
    if (bc) { try { bc.postMessage({ data: data }); } catch (e) {} }
    try { localStorage.setItem(CH, JSON.stringify(data)); } catch (e) {}
  }

  /* ---------- public API ---------- */
  window.SHDB = {
    isCloud: function () { return CLOUD; },

    uid: uid,

    /* one-time read from the cloud */
    pull: function (cb) {
      if (!CLOUD) { cb(null); return; }
      fetch(endpoint(PATH, true), { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { cb(d || null); })
        .catch(function () { cb(null); });
    },

    /* live updates: cloud polling + instant local broadcast */
    subscribe: function (cb) {
      var unsubs = [];
      if (bc) {
        var handler = function (ev) { cb({ local: true, data: ev.data && ev.data.data }); };
        bc.addEventListener("message", handler);
        unsubs.push(function () { bc.removeEventListener("message", handler); });
      }
      var sh = function (ev) {
        if (ev.key === CH && ev.newValue) {
          try { cb({ local: true, data: JSON.parse(ev.newValue) }); } catch (e) {}
        }
      };
      window.addEventListener("storage", sh);
      unsubs.push(function () { window.removeEventListener("storage", sh); });

      /* cloud: light polling keeps every visitor in sync without the SDK */
      var timer = null;
      if (CLOUD) {
        var last = "";
        var tick = function () {
          fetch(endpoint(PATH, true), { cache: "no-store" })
            .then(function (r) { return r.ok ? r.text() : ""; })
            .then(function (t) {
              /* "null" means the whole content node is empty/absent.
                 Treat it as a real (empty) snapshot so the site clears. */
              var norm = (!t || t === "null") ? "null" : t;
              if (norm !== last) {
                last = norm;
                if (norm === "null") { cb({ local: false, data: { __empty: true } }); return; }
                try { cb({ local: false, data: JSON.parse(norm) }); } catch (e) {}
              }
            })
            .catch(function () {});
        };
        tick();
        timer = setInterval(tick, 8000);
        unsubs.push(function () { clearInterval(timer); });
      }
      return function () { unsubs.forEach(function (u) { try { u(); } catch (e) {} }); };
    },

    /* write the whole content object */
    push: function (obj, onDone) {
      broadcast(obj);
      if (!CLOUD) { if (onDone) onDone(true); return; }
      fetch(endpoint(PATH), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
      }).then(function (r) { if (onDone) onDone(!!r.ok); })
        .catch(function () { if (onDone) onDone(false); });
    },

    /* append a contact-form lead / order */
    addMessage: function (msg, cb) {
      broadcast({ __message: msg });
      if (!CLOUD) { if (cb) cb(true); return; }
      fetch(endpoint(MSG_PATH), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg)
      }).then(function (r) { if (cb) cb(!!r.ok); })
        .catch(function () { if (cb) cb(false); });
    },

    /* read all leads / orders */
    pullMessages: function (cb) {
      if (!CLOUD) { cb(null); return; }
      fetch(endpoint(MSG_PATH), { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (!d) { cb([]); return; }
          var out = [];
          Object.keys(d).forEach(function (k) { out.push(d[k]); });
          out.sort(function (a, b) { return String(a.date || "").localeCompare(String(b.date || "")); });
          cb(out);
        })
        .catch(function () { cb([]); });
    }
  };
})();
