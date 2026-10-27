/* =========================================================
   Shahriar LLC — Site + Backend configuration
   ---------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT TO GO LIVE.

   1) PUBLIC_URL  -> your real domain, used for SEO
                     (canonical links, sitemap, Open Graph,
                     structured data). No trailing slash.

   2) FIREBASE    -> optional FREE real-time database.
                     See SETUP.md. Leave apiKey/dbUrl empty
                     to keep running 100% offline on this
                     computer (localStorage + live tabs).
   ========================================================= */
window.SH_CONFIG = {
  /* ---- your production domain (CHANGE THIS) ---- */
  PUBLIC_URL: "https://sprint.fast-page.org",

  /* ---- company info reused for SEO / structured data ---- */
  COMPANY: {
    name: "Shahriar LLC",
    legalName: "Shahriar LLC",
    founded: "2007",
    phone: "+880 1958-633202",
    email: "info@sprint.fast-page.org",
    addressLocality: "Dhaka",
    addressCountry: "BD",
    logo: "assets/img/logo.svg",
    sameAs: []
  },

  /* ---- FREE real-time database (Firebase Realtime Database) ----
     Create a free project at console.firebase.google.com,
     add a Realtime Database, then paste the two values here.
     The REST endpoint works straight from the browser with
     NO SDK and NO build step.                                    */
  FIREBASE: {
    apiKey: "AIzaSyCPX3nbaHDTap7AAu_BGFmidwWp1ZXY3xw",
    databaseURL: "https://sh-big-web-default-rtdb.firebaseio.com",
    authDomain: "sh-big-web.firebaseapp.com",
    projectId: "sh-big-web",
    storageBucket: "sh-big-web.firebasestorage.app",
    messagingSenderId: "338140087315",
    appId: "1:338140087315:web:ff65932e8c50b9e1ceebe6",
    /* where the site content is stored inside the database */
    path: "shahriar-llc/site/content",
    /* where customer orders / leads are stored */
    messagesPath: "shahriar-llc/site/messages"
  }
};

/* Bridge the config into the store's runtime flags. */
(function () {
  var c = window.SH_CONFIG || {};
  var fb = c.FIREBASE || {};
  window.SH_USE_FIREBASE = !!(fb.apiKey && fb.databaseURL);
  window.SH_FIREBASE_URL = fb.databaseURL || "";
})();
