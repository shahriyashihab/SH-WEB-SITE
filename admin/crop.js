/* =========================================================
   Shahriar LLC — Admin image cropper (no library, canvas only)
   ---------------------------------------------------------
   Usage:
     SHCrop.open(file, opts, function (dataURL) { ... });
       opts.ratio  -> aspect ratio (width/height). 0 = free.
       opts.maxW   -> max output width in px (default 900)

   The user drags the box, moves it, resizes from any corner,
   and clicks "Crop & use". The result is a JPEG/PNG data URL
   that is small enough to store in Firebase.
   ========================================================= */
(function () {
  "use strict";

  var root = null;         /* overlay element */
  var stage, canvas, box;
  var img = null;
  var opts = { ratio: 0, maxW: 900 };
  var done = null;
  var drag = null;

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
    var close = el("button", "crop-x", "&times;");
    close.type = "button";
    close.addEventListener("click", cancel);
    head.appendChild(close);

    stage = el("div", "crop-stage");
    canvas = el("img", "crop-img");
    canvas.alt = "";
    box = el("div", "crop-box", '<span class="crop-h tl"></span><span class="crop-h tr"></span><span class="crop-h bl"></span><span class="crop-h br"></span>');
    stage.appendChild(canvas);
    stage.appendChild(box);

    var foot = el("div", "crop-foot");
    var ratioWrap = el("div", "crop-ratios");
    [["Free", 0], ["1:1", 1], ["4:3", 4 / 3], ["3:4", 3 / 4], ["16:9", 16 / 9]].forEach(function (r) {
      var b = el("button", "crop-rbtn", r[0]);
      b.type = "button";
      b.setAttribute("data-ratio", r[1]);
      b.addEventListener("click", function () {
        opts.ratio = r[1];
        ratioWrap.querySelectorAll(".crop-rbtn").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        applyRatioConstraint(true);
      });
      ratioWrap.appendChild(b);
    });
    var cancelBtn = el("button", "btn btn-outline", "Cancel");
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", cancel);
    var ok = el("button", "btn btn-primary", "Crop & use");
    ok.type = "button";
    ok.addEventListener("click", function () { commit(); });
    foot.appendChild(ratioWrap);
    foot.appendChild(cancelBtn);
    foot.appendChild(ok);

    panel.appendChild(head);
    panel.appendChild(stage);
    panel.appendChild(foot);
    root.appendChild(panel);
    document.body.appendChild(root);

    bindDrag();
    window.addEventListener("resize", layout);
  }

  function open(file, o, cb) {
    opts.ratio = (o && o.ratio) || 0;
    opts.maxW = (o && o.maxW) || 900;
    done = cb;
    var reader = new FileReader();
    reader.onload = function () {
      img = new Image();
      img.onload = function () {
        if (!root) build();
        root.style.display = "flex";
        canvas.src = img.src;
        layout();
        /* default box: centre, 60% of the smaller side */
        setTimeout(function () {
          var w = stage.clientWidth, h = stage.clientHeight;
          box.style.left = (w * 0.2) + "px";
          box.style.top = (h * 0.2) + "px";
          box.style.width = (w * 0.6) + "px";
          box.style.height = (h * 0.6) + "px";
          applyRatioConstraint(true);
        }, 40);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function cancel() {
    if (root) root.style.display = "none";
    done = null;
  }

  /* Keep the crop image displayed at natural size inside the stage. */
  function layout() {
    if (!img || !stage) return;
    var maxW = stage.clientWidth - 20;
    var maxH = stage.clientHeight - 20;
    var r = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
    canvas.style.width = Math.round(img.naturalWidth * r) + "px";
    canvas.style.height = Math.round(img.naturalHeight * r) + "px";
  }

  function applyRatioConstraint(fromCurrent) {
    if (!opts.ratio) return;
    var w = box.offsetWidth, h = box.offsetHeight;
    var nw = w, nh = w / opts.ratio;
    var maxH = stage.clientHeight, maxW = stage.clientWidth;
    if (nh > maxH) { nh = maxH; nw = nh * opts.ratio; }
    if (nw > maxW) { nw = maxW; nh = nw / opts.ratio; }
    var maxLeft = stage.clientWidth - nw, maxTop = stage.clientHeight - nh;
    var left = Math.min(parseFloat(box.style.left) || 0, maxLeft);
    var top = Math.min(parseFloat(box.style.top) || 0, maxTop);
    box.style.width = nw + "px";
    box.style.height = nh + "px";
    box.style.left = Math.max(0, left) + "px";
    box.style.top = Math.max(0, top) + "px";
  }

  function bindDrag() {
    var resizing = false;
    function pt(e) {
      var t = e.touches ? e.touches[0] : e;
      return { x: t.clientX, y: t.clientY };
    }
    function onDown(e) {
      var handle = e.target.classList.contains("crop-h");
      var start = pt(e);
      drag = {
        handle: handle,
        corner: e.target.className.replace("crop-h ", ""),
        sx: start.x, sy: start.y,
        sl: box.offsetLeft, st: box.offsetTop,
        sw: box.offsetWidth, sh: box.offsetHeight
      };
      e.preventDefault();
      if (!handle) { box.style.cursor = "grabbing"; }
    }
    function onMove(e) {
      if (!drag) return;
      var p = pt(e);
      var r = canvas.getBoundingClientRect();
      var minX = 0, minY = 0, maxX = canvas.clientWidth, maxY = canvas.clientHeight;
      var dx = p.x - drag.sx, dy = p.y - drag.sy;

      if (!drag.handle) {
        var nl = Math.min(Math.max(drag.sl + dx, minX), maxX - drag.sw);
        var nt = Math.min(Math.max(drag.st + dy, minY), maxY - drag.sh);
        box.style.left = nl + "px"; box.style.top = nt + "px";
        return;
      }
      /* corner resize */
      var l = drag.sl, t = drag.st, w = drag.sw, h = drag.sh;
      if (drag.corner.indexOf("r") > -1) w = drag.sw + dx;
      if (drag.corner.indexOf("l") > -1) { w = drag.sw - dx; l = drag.sl + dx; }
      if (drag.corner.indexOf("b") > -1) h = drag.sh + dy;
      if (drag.corner.indexOf("t") > -1) { h = drag.sh - dy; t = drag.st + dy; }
      w = Math.max(40, w); h = Math.max(40, h);
      if (opts.ratio) {
        /* keep ratio: width drives height (top-left anchored for right/bottom) */
        var ratioH = w / opts.ratio;
        if (drag.corner.indexOf("t") > -1) t = drag.st + (drag.sh - ratioH);
        h = ratioH;
      }
      if (l < minX) { w += (l - minX); l = minX; }
      if (t < minY) { h += (t - minY); t = minY; }
      if (l + w > maxX) w = maxX - l;
      if (t + h > maxY) h = maxY - t;
      box.style.left = l + "px"; box.style.top = t + "px";
      box.style.width = w + "px"; box.style.height = h + "px";
    }
    function onUp() { drag = null; box.style.cursor = "move"; }

    box.addEventListener("mousedown", onDown);
    box.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
  }

  function commit() {
    if (!img) return;
    /* map the on-screen box back to natural image pixels */
    var scale = img.naturalWidth / canvas.clientWidth;
    var sx = box.offsetLeft * scale;
    var sy = box.offsetTop * scale;
    var sw = box.offsetWidth * scale;
    var sh = box.offsetHeight * scale;

    var outW = Math.min(opts.maxW, Math.round(sw));
    var outH = Math.round(sh * (outW / sw));
    var out = document.createElement("canvas");
    out.width = outW; out.height = outH;
    var ctx = out.getContext("2d");
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

    var type = /png/i.test(img.src.slice(0, 30)) ? "image/png" : "image/jpeg";
    var url = out.toDataURL(type, 0.86);
    if (root) root.style.display = "none";
    var cb = done; done = null;
    if (cb) cb(url);
  }

  window.SHCrop = { open: open };
})();
