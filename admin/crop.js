/* =========================================================
   Shahriar LLC — Admin image cropper (no library, canvas only)
   ---------------------------------------------------------
   SHCrop.open(file, opts, cb):
     opts.ratio -> width/height. 0 = free (any shape).
     opts.maxW  -> max output width in px (default 900).

   Interaction is pointer-based and reliable on mouse + touch:
     - drag inside the box to move it anywhere
     - drag any white corner handle to resize
     - pick a ratio button to lock the shape
   Result is a compact data URL safe to store in Firebase.
   ========================================================= */
(function () {
  "use strict";

  var root, stage, wrap, imgEl, box;
  var img = null, opts = { ratio: 0, maxW: 900 }, done = null;
  var ptr = null;                 /* active pointer gesture */
  var MIN = 48;                   /* min box side in px */

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function build() {
    root = el("div", "crop-bg");
    var panel = el("div", "crop-panel");
    var head = el("div", "crop-head", "<h3>Crop image</h3>");
    var close = el("button", "crop-x", "&times;"); close.type = "button";
    close.addEventListener("click", cancel);
    head.appendChild(close);

    stage = el("div", "crop-stage");
    wrap = el("div", "crop-canvas");
    imgEl = el("img", "crop-img"); imgEl.alt = ""; imgEl.draggable = false;
    box = el("div", "crop-box");
    ["tl", "tr", "bl", "br"].forEach(function (c) {
      var h = el("span", "crop-h " + c); h.setAttribute("data-corner", c);
      box.appendChild(h);
    });
    wrap.appendChild(imgEl);
    wrap.appendChild(box);
    stage.appendChild(wrap);

    var foot = el("div", "crop-foot");
    var ratios = el("div", "crop-ratios");
    [["Free", 0], ["1:1", 1], ["4:3", 4 / 3], ["3:4", 3 / 4], ["16:9", 16 / 9]].forEach(function (r) {
      var b = el("button", "crop-rbtn", r[0]); b.type = "button";
      b.addEventListener("click", function () {
        opts.ratio = r[1];
        ratios.querySelectorAll(".crop-rbtn").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        applyRatio();
      });
      ratios.appendChild(b);
    });
    var cancelBtn = el("button", "btn btn-outline", "Cancel"); cancelBtn.type = "button";
    cancelBtn.addEventListener("click", cancel);
    var ok = el("button", "btn btn-primary", "Crop & use"); ok.type = "button";
    ok.addEventListener("click", commit);
    foot.appendChild(ratios); foot.appendChild(cancelBtn); foot.appendChild(ok);

    panel.appendChild(head); panel.appendChild(stage); panel.appendChild(foot);
    root.appendChild(panel);
    document.body.appendChild(root);

    bindPointer();
    window.addEventListener("resize", function () { if (root.style.display === "flex") layout(); });
  }

  function open(file, o, cb) {
    opts.ratio = (o && o.ratio) || 0;
    opts.maxW = (o && o.maxW) || 900;
    done = cb;
    var rd = new FileReader();
    rd.onload = function () {
      img = new Image();
      img.onload = function () {
        if (!root) build();
        root.style.display = "flex";
        imgEl.src = img.src;
        /* let the browser lay out the stage, then place the box */
        requestAnimationFrame(function () {
          layout();
          requestAnimationFrame(function () { resetBox(); });
        });
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(file);
  }

  function cancel() { if (root) root.style.display = "none"; done = null; }

  /* Fit the image inside the stage; the wrapper hugs the image exactly so
     the crop box (its child) counts pixels from the image's own corner. */
  function layout() {
    if (!img || !stage) return;
    var maxW = stage.clientWidth - 16;
    var maxH = stage.clientHeight - 16;
    var r = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
    var w = Math.round(img.naturalWidth * r);
    var h = Math.round(img.naturalHeight * r);
    wrap.style.width = w + "px";
    wrap.style.height = h + "px";
    imgEl.style.width = w + "px";
    imgEl.style.height = h + "px";
  }

  /* Centre a default box in the image (60% of the shorter side). */
  function resetBox() {
    var w = imgEl.clientWidth, h = imgEl.clientHeight;
    var base = Math.min(w, h);
    var bw = opts.ratio ? (base * 0.7) : (w * 0.6);
    var bh = opts.ratio ? (bw / opts.ratio) : (h * 0.6);
    if (bh > h * 0.9) { bh = h * 0.9; bw = opts.ratio ? bh * opts.ratio : bw; }
    if (bw > w * 0.9) { bw = w * 0.9; bh = opts.ratio ? bw / opts.ratio : bh; }
    box.style.width = Math.round(bw) + "px";
    box.style.height = Math.round(bh) + "px";
    box.style.left = Math.round((w - bw) / 2) + "px";
    box.style.top = Math.round((h - bh) / 2) + "px";
  }

  function applyRatio() {
    if (!opts.ratio) return;
    var w = box.offsetWidth, h = box.offsetHeight;
    var nh = w / opts.ratio;
    var maxH = imgEl.clientHeight;
    if (nh > maxH) { nh = maxH; w = nh * opts.ratio; }
    box.style.width = Math.round(w) + "px";
    box.style.height = Math.round(nh) + "px";
    clampBox();
  }

  function clampBox() {
    var l = box.offsetLeft, t = box.offsetTop;
    var w = box.offsetWidth, h = box.offsetHeight;
    var W = imgEl.clientWidth, H = imgEl.clientHeight;
    if (l < 0) l = 0;
    if (t < 0) t = 0;
    if (l + w > W) l = W - w;
    if (t + h > H) t = H - h;
    box.style.left = Math.max(0, l) + "px";
    box.style.top = Math.max(0, t) + "px";
  }

  function bindPointer() {
    box.addEventListener("pointerdown", function (e) {
      var corner = e.target.getAttribute && e.target.getAttribute("data-corner");
      ptr = {
        corner: corner || null,
        startX: e.clientX, startY: e.clientY,
        l: box.offsetLeft, t: box.offsetTop,
        w: box.offsetWidth, h: box.offsetHeight
      };
      box.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
    });

    box.addEventListener("pointermove", function (e) {
      if (!ptr) return;
      var dx = e.clientX - ptr.startX;
      var dy = e.clientY - ptr.startY;
      var W = imgEl.clientWidth, H = imgEl.clientHeight;

      if (!ptr.corner) {
        /* move the whole box */
        var nl = ptr.l + dx, nt = ptr.t + dy;
        nl = Math.max(0, Math.min(nl, W - ptr.w));
        nt = Math.max(0, Math.min(nt, H - ptr.h));
        box.style.left = nl + "px";
        box.style.top = nt + "px";
        return;
      }

      /* resize from the grabbed corner */
      var l = ptr.l, t = ptr.t, w = ptr.w, h = ptr.h;
      if (ptr.corner === "br") { w = ptr.w + dx; h = ptr.h + dy; }
      if (ptr.corner === "tr") { w = ptr.w + dx; h = ptr.h - dy; t = ptr.t + dy; }
      if (ptr.corner === "bl") { w = ptr.w - dx; h = ptr.h + dy; l = ptr.l + dx; }
      if (ptr.corner === "tl") { w = ptr.w - dx; h = ptr.h - dy; l = ptr.l + dx; t = ptr.t + dy; }

      if (opts.ratio) {
        h = w / opts.ratio;
        if (ptr.corner === "tl" || ptr.corner === "tr") t = ptr.t + ptr.h - h;
      }

      if (w < MIN) { w = MIN; if (ptr.corner === "tl" || ptr.corner === "bl") l = ptr.l + ptr.w - w; }
      if (h < MIN) { h = MIN; if (ptr.corner === "tl" || ptr.corner === "tr") t = ptr.t + ptr.h - h; }
      if (l < 0) { w += l; l = 0; }
      if (t < 0) { h += t; t = 0; }
      if (l + w > W) { w = W - l; }
      if (t + h > H) { h = H - t; }
      if (w < MIN || h < MIN) return;

      box.style.left = l + "px";
      box.style.top = t + "px";
      box.style.width = w + "px";
      box.style.height = h + "px";
    });

    function end(e) {
      if (ptr) { try { box.releasePointerCapture(e.pointerId); } catch (x) {} }
      ptr = null;
    }
    box.addEventListener("pointerup", end);
    box.addEventListener("pointercancel", end);
    box.addEventListener("lostpointercapture", function () { ptr = null; });
  }

  function commit() {
    if (!img) return;
    var scale = img.naturalWidth / imgEl.clientWidth;
    var sx = box.offsetLeft * scale;
    var sy = box.offsetTop * scale;
    var sw = box.offsetWidth * scale;
    var sh = box.offsetHeight * scale;

    var outW = Math.min(opts.maxW, Math.max(1, Math.round(sw)));
    var outH = Math.max(1, Math.round(sh * (outW / sw)));
    var out = document.createElement("canvas");
    out.width = outW; out.height = outH;
    var ctx = out.getContext("2d");
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

    var isPng = /^data:image\/png/i.test(img.src);
    var url = out.toDataURL(isPng ? "image/png" : "image/jpeg", 0.86);
    if (root) root.style.display = "none";
    var cb = done; done = null;
    if (cb) cb(url);
  }

  window.SHCrop = { open: open };
})();
