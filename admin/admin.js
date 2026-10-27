/* =========================================================
   Shahriar LLC — Admin Panel logic
   ========================================================= */
(function () {
  "use strict";
  var SH = window.SH;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var SESSION = "sh_admin_session";

  /* ---------- toast ---------- */
  var toastT;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 2400);
  }

  /* ---------- auth ---------- */
  function currentUser() { try { return JSON.parse(sessionStorage.getItem(SESSION)); } catch (e) { return null; } }
  function login(u, p) { try { sessionStorage.setItem(SESSION, JSON.stringify(u)); } catch (e) {} }

  $("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var u = $("lu").value.trim(), p = $("lp").value;
    var admins = SH.list("admins");
    var found = null;
    for (var i = 0; i < admins.length; i++) if (admins[i].username === u && admins[i].password === p) { found = admins[i]; break; }
    if (found) { login(found); showApp(); $("loginErr").style.display = "none"; }
    else { $("loginErr").textContent = "Invalid username or password."; $("loginErr").style.display = "block"; }
  });

  $("logoutBtn").addEventListener("click", function () {
    try { sessionStorage.removeItem(SESSION); } catch (e) {}
    location.reload();
  });
  $("viewSite").addEventListener("click", function () { window.open("../index.html", "_blank"); });

  function showApp() {
    var u = currentUser();
    $("loginWrap").style.display = "none";
    $("adminApp").style.display = "grid";
    $("meName").textContent = u ? u.username : "admin";
    $("meAv").textContent = (u ? u.username : "A").charAt(0).toUpperCase();
    refreshCounts();
    renderDashboard();
  }

  /* ---------- navigation ---------- */
  var PAGES = { dashboard: "Dashboard", company: "Company Settings", hero: "Home / Hero", services: "Services", subservices: "Sub-Services", products: "Products", team: "Management Team", ceo: "CEO Profile", admins: "Admin Users", orders: "Orders / Leads" };
  function goto(page) {
    document.querySelectorAll(".sb-link").forEach(function (l) { l.classList.toggle("active", l.getAttribute("data-page") === page); });
    document.querySelectorAll(".page").forEach(function (p) { p.classList.toggle("active", p.id === "page-" + page); });
    $("pageTitle").textContent = PAGES[page] || page;
    $("sidebar").classList.remove("open");
    if (page === "dashboard") renderDashboard();
    if (page === "services") renderServicesList();
    if (page === "subservices") renderSubServicesList();
    if (page === "products") renderProductsList();
    if (page === "team") renderTeamList();
    if (page === "admins") renderAdminsList();
    if (page === "orders") renderOrdersList();
    if (page === "company") fillCompany();
    if (page === "hero") fillHero();
    if (page === "ceo") fillCeo();
  }
  document.querySelectorAll(".sb-link[data-page]").forEach(function (l) {
    l.addEventListener("click", function () { goto(l.getAttribute("data-page")); });
  });
  document.querySelectorAll("[data-goto]").forEach(function (b) {
    b.addEventListener("click", function () { goto(b.getAttribute("data-goto")); });
  });
  $("menuToggle").addEventListener("click", function () { $("sidebar").classList.toggle("open"); });

  function refreshCounts() {
    $("cServices").textContent = SH.list("services").length;
    if ($("cSub")) $("cSub").textContent = SH.list("subservices").length;
    $("cProducts").textContent = SH.list("products").length;
    $("cTeam").textContent = SH.list("team").length;
    $("cAdmins").textContent = SH.list("admins").length;
    if ($("cOrders")) $("cOrders").textContent = (SH.get().orders || []).length;
  }

  /* ---------- dashboard ---------- */
  function renderDashboard() {
    var s = SH.get().stats || {};
    $("statVisitors").textContent = s.visitors || 0;
    $("statViews").textContent = s.pageviews || 0;
    $("statOrders").textContent = s.orders || 0;
    $("statItems").textContent = SH.list("services").length + SH.list("products").length + SH.list("team").length;
    var orders = SH.get().orders || [];
    if (orders.length) {
      $("recentOrders").innerHTML = orders.slice(-5).reverse().map(function (o) {
        return '<div class="row-item"><div class="thumb-fallback">&#9993;</div><div class="info"><b>' + esc(o.name || "Guest") + '</b><span>' + esc(o.email || o.phone || "") + " &bull; " + esc(o.subject || "") + '</span></div></div>';
      }).join("");
    } else $("recentOrders").innerHTML = '<p class="empty">No orders yet.</p>';

    /* accurate live visitor stats from Firebase (js/stats.js) */
    if (window.SHSTATS && SHSTATS.isCloud()) {
      SHSTATS.range(function (st) {
        $("statVisitors").textContent = st.todayVisitors || 0;
        $("statViews").textContent = st.todayViews || 0;
        var tv = document.getElementById("statTotalVisitors");
        if (tv) tv.textContent = st.allVisitors || 0;
        var ttl = document.getElementById("statTotalViews");
        if (ttl) ttl.textContent = st.totalViews || 0;
        var chart = document.getElementById("visitorChart");
        if (chart) {
          var days = [];
          for (var i = 6; i >= 0; i--) {
            var d = new Date(); d.setDate(d.getDate() - i);
            var key = d.toISOString().slice(0, 10);
            days.push({ day: key.slice(5), count: (st.byDay[key] || 0) });
          }
          var max = Math.max.apply(null, days.map(function (x) { return x.count; }).concat([1]));
          chart.innerHTML = days.map(function (x) {
            var h = Math.round((x.count / max) * 100);
            return '<div style="flex:1;text-align:center"><div style="height:120px;display:flex;align-items:flex-end;justify-content:center"><div style="width:60%;background:linear-gradient(180deg,#0b5cab,#3b82f6);border-radius:6px 6px 0 0;height:' + h + '%" title="' + x.count + ' views"></div></div><div style="font-size:.72rem;color:var(--muted);margin-top:6px">' + x.day + '</div><div style="font-size:.78rem;font-weight:700">' + x.count + '</div></div>';
          }).join("");
        }
      });
    }
  }

  /* ---------- image helper ---------- */
  /* Opens the crop tool so the admin can frame the photo, then returns a
     small data URL via cb. Falls back to a plain read if the cropper is
     unavailable. opts.ratio controls the crop aspect ratio. */
  function readImage(file, cb, opts) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast("Please choose an image file"); return; }
    if (window.SHCrop) {
      window.SHCrop.open(file, opts || {}, cb);
      return;
    }
    if (file.size > 3000000) { toast("Image too large (max ~3MB)"); }
    var r = new FileReader();
    r.onload = function () { cb(r.result); };
    r.readAsDataURL(file);
  }

  /* ---------- COMPANY ---------- */
  var COMPANY_FIELDS = ["company", "subCompany", "tagline", "phone", "email", "address", "facebook", "instagram", "telegram", "linkedin", "youtube"];

  function fillCompany() {
    var s = SH.get().site;
    var f = $("companyForm");
    COMPANY_FIELDS.forEach(function (k) { f[k].value = s[k] || ""; });
    if (s.logo) { $("logoPreview").src = s.logo; $("logoPreview").style.display = "block"; }
  }
  var pendingLogo = null;
  $("logoFile").addEventListener("change", function () { readImage(this.files[0], function (d) { pendingLogo = d; $("logoPreview").src = d; $("logoPreview").style.display = "block"; }, { ratio: 0, maxW: 600 }); });
  $("companyForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var s = SH.get().site, f = e.target;
    COMPANY_FIELDS.forEach(function (k) { s[k] = f[k].value.trim(); });
    if (pendingLogo) { s.logo = pendingLogo; pendingLogo = null; }
    SH.save(); toast("Company settings saved \u2014 now live on the site"); renderDashboard();
  });

  /* ---------- HERO ---------- */
  function fillHero() {
    var h = SH.get().hero, f = $("heroForm");
    Object.keys(h).forEach(function (k) { if (f[k]) f[k].value = h[k]; });
  }
  $("heroForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var h = SH.get().hero, f = e.target;
    Object.keys(h).forEach(function (k) { if (f[k]) h[k] = f[k].value; });
    SH.save(); toast("Hero section saved \u2014 now live");
  });

  /* ---------- CEO ---------- */
  var pendingCeoImg = null;
  function fillCeo() {
    var c = SH.get().ceo, f = $("ceoForm");
    f.name.value = c.name || ""; f.role.value = c.role || "";
    $("ceoMessage").value = (c.message || []).join("\n");
    $("ceoPreview").src = c.img || ""; $("ceoPreview").style.display = c.img ? "block" : "none";
  }
  $("ceoFile").addEventListener("change", function () { readImage(this.files[0], function (d) { pendingCeoImg = d; $("ceoPreview").src = d; $("ceoPreview").style.display = "block"; }, { ratio: 3 / 4, maxW: 800 }); });
  $("ceoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var c = SH.get().ceo;
    c.name = e.target.name.value; c.role = e.target.role.value;
    c.message = $("ceoMessage").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean);
    if (pendingCeoImg) { c.img = pendingCeoImg; pendingCeoImg = null; }
    SH.save(); toast("CEO profile saved");
  });

  /* ---------- SERVICES ---------- */
  function renderServicesList() {
    var list = SH.list("services");
    if (!list.length) { $("servicesList").innerHTML = '<p class="empty">No services yet. Click "Add Service".</p>'; return; }
    $("servicesList").innerHTML = list.map(function (s) {
      var thumb = s.img ? '<img src="../' + esc(s.img) + '" alt="">' : '<div class="thumb-fallback">' + esc(s.icon || "S").slice(0, 4) + '</div>';
      return '<div class="row-item">' + thumb +
        '<div class="info"><b>' + esc(s.title) + '</b><span>' + esc(s.short || "") + '</span></div>' +
        '<div class="row-actions"><button class="btn btn-outline btn-sm" data-edit-service="' + s.id + '">Edit</button>' +
        '<button class="btn btn-danger btn-sm" data-del-service="' + s.id + '">Delete</button></div></div>';
    }).join("");
    bindServiceActions();
  }
  function bindServiceActions() {
    document.querySelectorAll("[data-edit-service]").forEach(function (b) { b.addEventListener("click", function () { openServiceModal(b.getAttribute("data-edit-service")); }); });
    document.querySelectorAll("[data-del-service]").forEach(function (b) {
      b.addEventListener("click", function () { if (confirm("Delete this service?")) { SH.remove("services", b.getAttribute("data-del-service")); renderServicesList(); refreshCounts(); toast("Service deleted"); } });
    });
  }
  $("addService").addEventListener("click", function () { openServiceModal(null); });

  var modalSaveFn = null;
  function openModal(title, bodyHTML, onSave) {
    $("modalTitle").textContent = title; $("modalBody").innerHTML = bodyHTML; modalSaveFn = onSave;
    $("modalBg").classList.add("open");
  }
  function closeModal() { $("modalBg").classList.remove("open"); modalSaveFn = null; }
  $("modalClose").addEventListener("click", closeModal);
  $("modalCancel").addEventListener("click", closeModal);
  $("modalBg").addEventListener("click", function (e) { if (e.target === $("modalBg")) closeModal(); });
  $("modalSave").addEventListener("click", function () { if (modalSaveFn) modalSaveFn(); });

  function openServiceModal(id) {
    var s = id ? SH.getItem("services", id) : { title: "", icon: "code", color: "blue", img: "", short: "", overview: "", features: [], includes: [] };
    var html =
      '<div class="form-grid two"><div class="fld"><label>Title</label><input id="mTitle" value="' + esc(s.title) + '"></div>' +
      '<div class="fld"><label>Icon</label><select id="mIcon">' + ["code", "phone", "erp", "cloud", "shield", "cart", "users", "pos", "school"].map(function (i) { return '<option ' + (s.icon === i ? "selected" : "") + '>' + i + '</option>'; }).join("") + '</select></div>' +
      '<div class="fld"><label>Color</label><select id="mColor">' + ["blue", "cyan", "orange", "purple", "green"].map(function (i) { return '<option ' + (s.color === i ? "selected" : "") + '>' + i + '</option>'; }).join("") + '</select></div></div>' +
      '<div class="fld"><label>Short Description</label><input id="mShort" value="' + esc(s.short) + '"></div>' +
      '<div class="fld"><label>Overview</label><textarea id="mOverview">' + esc(s.overview) + '</textarea></div>' +
      '<div class="fld"><label>Features (one per line)</label><textarea id="mFeatures">' + esc((s.features || []).join("\n")) + '</textarea></div>' +
      '<div class="fld"><label>What\'s Included (one per line)</label><textarea id="mIncludes">' + esc((s.includes || []).join("\n")) + '</textarea></div>' +
      '<div class="fld"><label>Image</label><input type="file" id="mImgFile" accept="image/*">' +
      '<img class="img-preview" id="mImgPreview" src="' + (s.img ? ("../" + s.img) : "") + '" style="' + (s.img ? "" : "display:none") + '"></div>';
    var pending = null;
    openModal(id ? "Edit Service" : "Add Service", html, function () {
      var obj = {
        id: id || undefined,
        title: $("mTitle").value.trim(),
        icon: $("mIcon").value, color: $("mColor").value,
        short: $("mShort").value.trim(), overview: $("mOverview").value.trim(),
        features: $("mFeatures").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean),
        includes: $("mIncludes").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean),
        img: s.img || ""
      };
      if (pending) obj.img = pending;
      if (!obj.title) { toast("Title is required"); return; }
      SH.upsert("services", obj); closeModal(); renderServicesList(); refreshCounts(); toast("Service saved");
    });
    setTimeout(function () {
      var f = $("mImgFile");
      if (f) f.addEventListener("change", function () { readImage(f.files[0], function (d) { pending = d; $("mImgPreview").src = d; $("mImgPreview").style.display = "block"; }, { ratio: 4 / 3, maxW: 900 }); });
    }, 30);
  }

  /* ---------- SUB-SERVICES ---------- */
  /* Main services the admin can attach a sub-service to. Falls back to the
     built-in service list so the dropdown is never empty. */
  var BUILTIN_SERVICES = [
    { id: "website-design-development", title: "Website Design & Development" },
    { id: "custom-software-development", title: "Custom Software Development" },
    { id: "mobile-apps-development", title: "Mobile Apps Development" },
    { id: "erp-crm-solutions", title: "ERP & CRM Solutions" },
    { id: "digital-marketing", title: "Digital Marketing" },
    { id: "it-support-consultancy", title: "IT Support & Consultancy" },
    { id: "ecommerce-solution", title: "E-commerce Solution" },
    { id: "hr-payroll-management", title: "HR & Payroll Management" },
    { id: "pos-retail-software", title: "POS & Retail Software" },
    { id: "school-management-system", title: "School Management System" },
    { id: "business-process-outsourcing", title: "Business Process Outsourcing" },
    { id: "cyber-security", title: "Cyber Security" }
  ];
  function parentServices() {
    var live = SH.list("services");
    return (live && live.length) ? live.map(function (s) { return { id: s.id, title: s.title }; }) : BUILTIN_SERVICES;
  }
  function parentTitle(id) {
    var list = parentServices();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i].title;
    return id || "-";
  }

  function renderSubServicesList() {
    var list = SH.list("subservices");
    if (!list.length) { $("subServicesList").innerHTML = '<p class="empty">No sub-services yet. Click "Add Sub-Service".</p>'; return; }
    $("subServicesList").innerHTML = list.map(function (s) {
      var thumb = s.img ? '<img src="../' + esc(srcPath(s.img)) + '" alt="">' : '<div class="thumb-fallback">' + esc((s.title || "S").slice(0, 4)) + '</div>';
      return '<div class="row-item">' + thumb +
        '<div class="info"><b>' + esc(s.title) + '</b><span>' + esc(parentTitle(s.parent)) + ' &bull; ' + esc(s.tagline || s.short || "") + '</span></div>' +
        '<div class="row-actions"><button class="btn btn-outline btn-sm" data-edit-sub="' + s.id + '">Edit</button>' +
        '<button class="btn btn-danger btn-sm" data-del-sub="' + s.id + '">Delete</button></div></div>';
    }).join("");
    document.querySelectorAll("[data-edit-sub]").forEach(function (b) { b.addEventListener("click", function () { openSubServiceModal(b.getAttribute("data-edit-sub")); }); });
    document.querySelectorAll("[data-del-sub]").forEach(function (b) {
      b.addEventListener("click", function () { if (confirm("Delete this sub-service?")) { SH.remove("subservices", b.getAttribute("data-del-sub")); renderSubServicesList(); refreshCounts(); toast("Sub-service deleted"); } });
    });
  }
  $("addSubService").addEventListener("click", function () { openSubServiceModal(null); });

  function srcPath(img) {
    if (!img) return "";
    if (/^(data:|http|\.\.\/|\/)/.test(img)) return img;
    if (/^assets\//.test(img)) return img;
    return "assets/" + img;
  }

  function openSubServiceModal(id) {
    var s = id ? SH.getItem("subservices", id) : { parent: (parentServices()[0] || {}).id || "", title: "", icon: "code", color: "blue", img: "", tagline: "", overview: "", features: [], includes: [], price: "Contact for pricing", delivery: "" };
    var parents = parentServices();
    var html =
      '<div class="fld"><label>Belongs to (Main Service)</label><select id="sParent">' +
        parents.map(function (p) { return '<option value="' + esc(p.id) + '"' + (s.parent === p.id ? " selected" : "") + '>' + esc(p.title) + '</option>'; }).join("") +
      '</select></div>' +
      '<div class="form-grid two"><div class="fld"><label>Title</label><input id="sTitle" value="' + esc(s.title) + '"></div>' +
      '<div class="fld"><label>Short Tagline</label><input id="sTagline" value="' + esc(s.tagline) + '"></div></div>' +
      '<div class="fld"><label>Overview</label><textarea id="sOverview">' + esc(s.overview) + '</textarea></div>' +
      '<div class="fld"><label>Features (one per line)</label><textarea id="sFeatures">' + esc((s.features || []).join("\n")) + '</textarea></div>' +
      '<div class="fld"><label>What\'s Included (one per line)</label><textarea id="sIncludes">' + esc((s.includes || []).join("\n")) + '</textarea></div>' +
      '<div class="form-grid two"><div class="fld"><label>Price Text</label><input id="sPrice" value="' + esc(s.price) + '"></div>' +
      '<div class="fld"><label>Delivery / Timeline</label><input id="sDelivery" value="' + esc(s.delivery) + '"></div></div>' +
      '<div class="fld"><label>Image</label><input type="file" id="sImgFile" accept="image/*">' +
      '<img class="img-preview" id="sImgPreview" src="' + (s.img ? "../" + srcPath(s.img).replace(/^\.\.\//, "") : "") + '" style="' + (s.img ? "" : "display:none") + '"></div>';
    var pending = null;
    openModal(id ? "Edit Sub-Service" : "Add Sub-Service", html, function () {
      var obj = {
        id: id || undefined,
        parent: $("sParent").value,
        title: $("sTitle").value.trim(),
        tagline: $("sTagline").value.trim(),
        overview: $("sOverview").value.trim(),
        features: $("sFeatures").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean),
        includes: $("sIncludes").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean),
        price: $("sPrice").value.trim(), delivery: $("sDelivery").value.trim(),
        icon: s.icon || "code", color: s.color || "blue", img: s.img || ""
      };
      if (pending) obj.img = pending;
      if (!obj.title) { toast("Title is required"); return; }
      SH.upsert("subservices", obj); closeModal(); renderSubServicesList(); refreshCounts(); toast("Sub-service saved");
    });
    setTimeout(function () {
      var f = $("sImgFile");
      if (f) f.addEventListener("change", function () { readImage(f.files[0], function (d) { pending = d; $("sImgPreview").src = d; $("sImgPreview").style.display = "block"; }, { ratio: 4 / 3, maxW: 900 }); });
    }, 30);
  }

  /* ---------- PRODUCTS ---------- */
  function renderProductsList() {    var list = SH.list("products");
    if (!list.length) { $("productsList").innerHTML = '<p class="empty">No products yet. Click "Add Product".</p>'; return; }
    $("productsList").innerHTML = list.map(function (p) {
      var thumb = p.img ? '<img src="../' + esc(p.img) + '" alt="">' : '<div class="thumb-fallback">' + esc(p.logo || "P") + '</div>';
      return '<div class="row-item">' + thumb +
        '<div class="info"><b>' + esc(p.name) + '</b><span>' + esc(p.tag || "") + '</span></div>' +
        '<div class="row-actions"><button class="btn btn-outline btn-sm" data-edit-product="' + p.id + '">Edit</button>' +
        '<button class="btn btn-danger btn-sm" data-del-product="' + p.id + '">Delete</button></div></div>';
    }).join("");
    document.querySelectorAll("[data-edit-product]").forEach(function (b) { b.addEventListener("click", function () { openProductModal(b.getAttribute("data-edit-product")); }); });
    document.querySelectorAll("[data-del-product]").forEach(function (b) {
      b.addEventListener("click", function () { if (confirm("Delete this product?")) { SH.remove("products", b.getAttribute("data-del-product")); renderProductsList(); refreshCounts(); toast("Product deleted"); } });
    });
  }
  $("addProduct").addEventListener("click", function () { openProductModal(null); });

  function openProductModal(id) {
    var p = id ? SH.getItem("products", id) : { name: "", tag: "", logo: "", img: "", short: "", overview: "", features: [], price: "Contact for pricing" };
    var html =
      '<div class="form-grid two"><div class="fld"><label>Product Name</label><input id="pName" value="' + esc(p.name) + '"></div>' +
      '<div class="fld"><label>Short Logo Text</label><input id="pLogo" value="' + esc(p.logo) + '" maxlength="6"></div></div>' +
      '<div class="fld"><label>Tagline</label><input id="pTag" value="' + esc(p.tag) + '"></div>' +
      '<div class="fld"><label>Short Description</label><input id="pShort" value="' + esc(p.short) + '"></div>' +
      '<div class="fld"><label>Overview</label><textarea id="pOverview">' + esc(p.overview) + '</textarea></div>' +
      '<div class="fld"><label>Features (one per line)</label><textarea id="pFeatures">' + esc((p.features || []).join("\n")) + '</textarea></div>' +
      '<div class="fld"><label>Price Text</label><input id="pPrice" value="' + esc(p.price) + '"></div>' +
      '<div class="fld"><label>Product Image</label><input type="file" id="pImgFile" accept="image/*">' +
      '<img class="img-preview" id="pImgPreview" src="' + (p.img ? ("../" + p.img) : "") + '" style="' + (p.img ? "" : "display:none") + '"></div>';
    var pending = null;
    openModal(id ? "Edit Product" : "Add Product", html, function () {
      var obj = {
        id: id || undefined, name: $("pName").value.trim(), logo: $("pLogo").value.trim(),
        tag: $("pTag").value.trim(), short: $("pShort").value.trim(), overview: $("pOverview").value.trim(),
        features: $("pFeatures").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean),
        price: $("pPrice").value.trim(), img: p.img || ""
      };
      if (pending) obj.img = pending;
      if (!obj.name) { toast("Product name is required"); return; }
      SH.upsert("products", obj); closeModal(); renderProductsList(); refreshCounts(); toast("Product saved");
    });
    setTimeout(function () { var f = $("pImgFile"); if (f) f.addEventListener("change", function () { readImage(f.files[0], function (d) { pending = d; $("pImgPreview").src = d; $("pImgPreview").style.display = "block"; }, { ratio: 4 / 3, maxW: 900 }); }); }, 30);
  }

  /* ---------- TEAM ---------- */
  function renderTeamList() {
    var list = SH.list("team");
    if (!list.length) { $("teamList").innerHTML = '<p class="empty">No team members yet. Click "Add Team Member".</p>'; return; }
    $("teamList").innerHTML = list.map(function (m) {
      var thumb = m.img ? '<img src="../' + esc(m.img) + '" alt="">' : '<div class="thumb-fallback">&#128100;</div>';
      return '<div class="row-item">' + thumb +
        '<div class="info"><b>' + esc(m.name) + '</b><span>' + esc(m.role) + ' &bull; profile page</span></div>' +
        '<div class="row-actions"><button class="btn btn-outline btn-sm" data-edit-member="' + m.id + '">Edit Profile</button>' +
        '<button class="btn btn-danger btn-sm" data-del-member="' + m.id + '">Delete</button></div></div>';
    }).join("");
    document.querySelectorAll("[data-edit-member]").forEach(function (b) { b.addEventListener("click", function () { openMemberModal(b.getAttribute("data-edit-member")); }); });
    document.querySelectorAll("[data-del-member]").forEach(function (b) {
      b.addEventListener("click", function () { if (confirm("Delete this team member?")) { SH.remove("team", b.getAttribute("data-del-member")); renderTeamList(); refreshCounts(); toast("Member deleted"); } });
    });
  }
  $("addMember").addEventListener("click", function () { openMemberModal(null); });

  function openMemberModal(id) {
    var m = id ? SH.getItem("team", id) : { name: "", role: "", img: "", bio: "", focus: [] };
    var html =
      '<div class="form-grid two"><div class="fld"><label>Full Name</label><input id="tmName" value="' + esc(m.name) + '"></div>' +
      '<div class="fld"><label>Role / Designation</label><input id="tmRole" value="' + esc(m.role) + '"></div></div>' +
      '<div class="fld"><label>Photo</label><input type="file" id="tmImgFile" accept="image/*">' +
      '<img class="img-preview" id="tmImgPreview" src="' + (m.img ? ("../" + m.img) : "") + '" style="' + (m.img ? "" : "display:none") + '"></div>' +
      '<div class="fld"><label>Biography</label><textarea id="tmBio">' + esc(m.bio) + '</textarea></div>' +
      '<div class="fld"><label>Focus Areas (one per line)</label><textarea id="tmFocus">' + esc((m.focus || []).join("\n")) + '</textarea></div>';
    var pending = null;
    openModal(id ? "Edit Team Member" : "Add Team Member", html, function () {
      var obj = {
        id: id || undefined, name: $("tmName").value.trim(), role: $("tmRole").value.trim(),
        bio: $("tmBio").value.trim(),
        focus: $("tmFocus").value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean),
        img: m.img || ""
      };
      if (pending) obj.img = pending;
      if (!obj.name) { toast("Name is required"); return; }
      SH.upsert("team", obj); closeModal(); renderTeamList(); refreshCounts(); toast("Team member saved");
    });
    setTimeout(function () { var f = $("tmImgFile"); if (f) f.addEventListener("change", function () { readImage(f.files[0], function (d) { pending = d; $("tmImgPreview").src = d; $("tmImgPreview").style.display = "block"; }, { ratio: 3 / 4, maxW: 800 }); }); }, 30);
  }

  /* ---------- ADMINS ---------- */
  function renderAdminsList() {
    var list = SH.list("admins");
    $("adminsList").innerHTML = list.map(function (a) {
      return '<div class="row-item"><div class="thumb-fallback">' + esc(a.username.charAt(0).toUpperCase()) + '</div>' +
        '<div class="info"><b>' + esc(a.username) + '</b><span>' + esc(a.role || "Admin") + '</span></div>' +
        '<div class="row-actions"><button class="btn btn-outline btn-sm" data-edit-admin="' + a.id + '">Edit</button>' +
        (list.length > 1 ? '<button class="btn btn-danger btn-sm" data-del-admin="' + a.id + '">Delete</button>' : '') + '</div></div>';
    }).join("");
    document.querySelectorAll("[data-edit-admin]").forEach(function (b) { b.addEventListener("click", function () { openAdminModal(b.getAttribute("data-edit-admin")); }); });
    document.querySelectorAll("[data-del-admin]").forEach(function (b) {
      b.addEventListener("click", function () { if (confirm("Delete this admin?")) { SH.remove("admins", b.getAttribute("data-del-admin")); renderAdminsList(); refreshCounts(); toast("Admin deleted"); } });
    });
  }
  $("addAdmin").addEventListener("click", function () { openAdminModal(null); });

  function openAdminModal(id) {
    var a = id ? SH.getItem("admins", id) : { username: "", password: "", role: "Admin" };
    var html =
      '<div class="fld"><label>Username</label><input id="aUser" value="' + esc(a.username) + '"></div>' +
      '<div class="fld"><label>Password</label><input id="aPass" type="text" value="' + esc(a.password) + '"></div>' +
      '<div class="fld"><label>Role</label><select id="aRole">' + ["Owner", "Admin", "Editor"].map(function (r) { return '<option ' + (a.role === r ? "selected" : "") + '>' + r + '</option>'; }).join("") + '</select></div>';
    openModal(id ? "Edit Admin" : "Add Admin", html, function () {
      var obj = { id: id || undefined, username: $("aUser").value.trim(), password: $("aPass").value, role: $("aRole").value };
      if (!obj.username || !obj.password) { toast("Username and password required"); return; }
      var dup = SH.list("admins").some(function (x) { return x.username === obj.username && x.id !== obj.id; });
      if (dup) { toast("Username already exists"); return; }
      SH.upsert("admins", obj); closeModal(); renderAdminsList(); refreshCounts(); toast("Admin saved");
    });
  }

  /* ---------- ORDERS ---------- */
  function renderOrdersList() {
    var orders = (SH.get().orders || []).slice().reverse();
    if (!orders.length) { $("ordersList").innerHTML = '<p class="empty">No orders or leads yet.</p>'; return; }
    $("ordersList").innerHTML = orders.map(function (o, i) {
      var isNew = (o.status || "new") === "new";
      var badge = '<span class="tagpill" style="background:' + (isNew ? "#fef3c7;color:#92400e" : "#dcfce7;color:#166534") + '">' + esc(o.status || "new") + '</span>';
      var rows = '';
      if (o.country) rows += '<p style="color:var(--ink-2);font-size:.88rem;margin-top:6px">&#127758; ' + esc(o.country) + (o.budget ? ' &nbsp; <b>Budget:</b> ' + esc(o.budget) : '') + '</p>';
      rows += '<p style="color:var(--ink-2);font-size:.88rem;margin-top:6px">&#9993; ' + esc(o.email || "-") + ' &nbsp; &#128222; ' + esc(o.phone || "-") + '</p>';
      return '<div class="card" style="margin-bottom:12px">' +
        '<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center">' +
          '<b>' + esc(o.name || "Guest") + '</b>' +
          '<div class="row-actions">' + badge + '<span class="tagpill">' + esc((o.date || "").slice(0, 16).replace("T", " ")) + '</span></div>' +
        '</div>' +
        (o.subject ? '<p style="margin-top:8px"><b>' + esc(o.subject) + '</b></p>' : '') +
        rows +
        (o.message ? '<p style="color:var(--muted);font-size:.86rem;margin-top:8px">' + esc(o.message) + '</p>' : '') +
        '<div class="row-actions" style="margin-top:12px">' +
          '<a class="btn btn-outline btn-sm" href="mailto:' + esc(o.email || "") + '">Reply by Email</a>' +
          '<a class="btn btn-outline btn-sm" href="tel:' + esc(String(o.phone || "").replace(/\s+/g, "")) + '">Call</a>' +
          (isNew ? '<button class="btn btn-primary btn-sm" data-done-order="' + i + '">Mark Done</button>' : '') +
          '<button class="btn btn-danger btn-sm" data-del-order="' + i + '">Delete</button>' +
        '</div></div>';
    }).join("");
    bindOrderActions(orders);
  }

  function bindOrderActions(orders) {
    document.querySelectorAll("[data-done-order]").forEach(function (b) {
      b.addEventListener("click", function () {
        var idx = orders.length - 1 - parseInt(b.getAttribute("data-done-order"), 10);
        var all = SH.get().orders; if (all[idx]) all[idx].status = "done";
        SH.save(); renderOrdersList(); toast("Marked as done");
      });
    });
    document.querySelectorAll("[data-del-order]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (!confirm("Delete this order?")) return;
        var idx = orders.length - 1 - parseInt(b.getAttribute("data-del-order"), 10);
        SH.get().orders.splice(idx, 1); SH.save(); renderOrdersList(); toast("Order deleted");
      });
    });
  }

  var orf = document.getElementById("ordersRefresh");
  if (orf) orf.addEventListener("click", function () {
    if (window.SHDB) SHDB.pullMessages(function (list) { mergeCloudOrders(list); });
    else renderOrdersList();
    toast("Refreshed from cloud");
  });
  var oex = document.getElementById("ordersExport");
  if (oex) oex.addEventListener("click", function () {
    var orders = SH.get().orders || [];
    var head = ["date", "type", "name", "country", "phone", "email", "subject", "budget", "message", "status"];
    var csv = [head.join(",")].concat(orders.map(function (o) {
      return head.map(function (k) { return '"' + String(o[k] == null ? "" : o[k]).replace(/"/g, '""') + '"'; }).join(",");
    })).join("\r\n");
    var blob = new Blob([csv], { type: "text/csv" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "shahriar-orders.csv"; a.click();
  });

  function mergeCloudOrders(list) {
    if (!list || !list.length) { renderOrdersList(); return; }
    var orders = SH.get().orders || [];
    var seen = {}; orders.forEach(function (o) { if (o && o.id) seen[o.id] = 1; });
    var added = false;
    list.forEach(function (m) { if (m && m.id && !seen[m.id]) { orders.push(m); added = true; } });
    if (added) {
      SH.get().orders = orders;
      try { localStorage.setItem("shahriar_llc_content_v1", JSON.stringify(SH.get())); } catch (e) {}
    }
    renderOrdersList(); refreshCounts(); renderDashboard();
  }

  /* ---------- boot ---------- */
  if (currentUser()) showApp();
  else { $("loginWrap").style.display = "grid"; }

  /* ---------- live sync: refresh panel when cloud / another tab changes ---------- */
  window.addEventListener("sh:change", function () {
    try {
      if (!currentUser()) return;
      refreshCounts();
      renderDashboard();
      var active = document.querySelector(".sb-link.active");
      var page = active && active.getAttribute("data-page");
      if (page === "services") renderServicesList();
      if (page === "subservices") renderSubServicesList();
      if (page === "products") renderProductsList();
      if (page === "team") renderTeamList();
      if (page === "admins") renderAdminsList();
      if (page === "orders") renderOrdersList();
    } catch (e) {}
  });

  /* pull every cloud order into the panel listing */
  if (window.SHDB) {
    SHDB.pullMessages(function (list) { mergeCloudOrders(list); });
    /* live: new orders arrive from the cloud automatically */
    SHDB.subscribe(function (msg) {
      if (msg && msg.data && msg.data.__message) {
        var o = msg.data.__message;
        var orders = SH.get().orders || (SH.get().orders = []);
        var dup = orders.some(function (x) { return x.id === o.id; });
        if (!dup) {
          orders.push(o);
          try { localStorage.setItem("shahriar_llc_content_v1", JSON.stringify(SH.get())); } catch (e) {}
          toast("\uD83D\uDD14 New order from " + (o.name || "a visitor"));
          if (document.getElementById("page-orders").classList.contains("active")) renderOrdersList();
        }
      }
    });
  }
})();
