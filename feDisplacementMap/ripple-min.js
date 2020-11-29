var dataDisplacementImg = (function () {
  var t = document.createElement("canvas");
  if (!t.getContext) {
    return;
  }
  var e = t.getContext("2d");
  var r = 512,
    a = 512,
    i = 250,
    n = 100;
  var o = i - n;
  t.width = r;
  t.height = a;
  var l = function (t, r, a, o) {
    var l = (2 * Math.PI) / o.length;
    var f = 0;
    var s = null;
    var c = null,
      u = null;
    for (var d = 0; d < o.length; d++) {
      c = o[d];
      u = o[(d + 1) % o.length];
      var p = t + Math.cos(f) * a;
      var g = t + Math.cos(f + l) * a;
      var v = r + Math.sin(f) * a;
      var h = r + Math.sin(f + l) * a;
      e.beginPath();
      s = e.createLinearGradient(p, v, g, h);
      s.addColorStop(0, c);
      s.addColorStop(1, u);
      e.strokeStyle = s;
      e.arc(t, r, a, f, f + l);
      e.lineWidth = i - n;
      e.stroke();
      e.closePath();
      f += l;
    }
  };
  e.beginPath();
  e.arc(r / 2, a / 2, i, 0, Math.PI * 2);
  e.fillStyle = "#7f7f7f";
  e.fill();
  l(r / 2, a / 2, n + o / 2, [
    "rgb(255,0,0)",
    "rgb(0, 255, 0)",
    "rgb(255,0,0)",
    "rgb(0, 255, 0)",
  ]);
  var f = e.createRadialGradient(r / 2, a / 2, n, r / 2, a / 2, i);
  f.addColorStop(0, "rgba(127,127,127,1)");
  f.addColorStop(17 / o, "rgba(115,115,115,.8)");
  f.addColorStop(25 / o, "rgba(115,115,115,0.1)");
  f.addColorStop(28 / o, "rgba(115,115,115,0.1)");
  f.addColorStop(37 / o, "rgba(115,104,104,.8)");
  f.addColorStop(43 / o, "rgba(115,104,104,1)");
  f.addColorStop(44 / o, "rgba(127,127,127,1)");
  f.addColorStop(50 / o, "rgba(127,127,127,.6)");
  f.addColorStop(54 / o, "rgba(127,127,127,0)");
  f.addColorStop(61 / o, "rgba(0,0,0,0)");
  f.addColorStop(67 / o, "rgba(0,0,0,1)");
  f.addColorStop(78 / o, "rgba(0,0,0,1)");
  f.addColorStop(88 / o, "rgba(0,0,0,0)");
  f.addColorStop(100 / o, "rgba(0,0,0,0)");
  f.addColorStop(108 / o, "rgba(0,0,0,1)");
  f.addColorStop(117 / o, "rgba(0,0,0,1)");
  f.addColorStop(136 / o, "rgba(0,0,0,0)");
  f.addColorStop(1, "rgba(0,0,0,0)");
  e.beginPath();
  e.arc(r / 2, a / 2, i, 0, Math.PI * 2);
  e.fillStyle = f;
  e.fill();
  console.log(t.toDataURL())
  return t.toDataURL();
})();
if (!window.Tween) {
  Tween = {};
}
if (!Tween.Linear) {
  Tween.Linear = function (t, e, r, a) {
    return (r * t) / a + e;
  };
}
if (!Math.animation) {
  Math.animation = function (t, e, r, a, i) {
    var n = function (t) {
      return typeof t == "undefined";
    };
    var o = function (t) {
      return typeof t == "function";
    };
    var l = function (t) {
      return typeof t == "number";
    };
    var f = function (t) {
      return typeof t == "string";
    };
    var s = function (t) {
      if (l(t)) {
        return t;
      } else if (f(t)) {
        if (/\d+m?s$/.test(t)) {
          if (/ms/.test(t)) {
            return 1 * t.replace("ms", "");
          }
          return 1e3 * t.replace("s", "");
        } else if (/^\d+$/.test(t)) {
          return +t;
        }
      }
      return -1;
    };
    var c = window.Tween;
    var u = { duration: 300, easing: "Linear", callback: function () {} };
    var d = function (t) {
      if (o(t)) {
        u.callback = t;
      } else if (s(t) != -1) {
        u.duration = s(t);
      } else if (f(t)) {
        u.easing = t;
      }
    };
    d(r);
    d(a);
    d(i);
    if (!window.requestAnimationFrame) {
      requestAnimationFrame = function (t) {
        return setTimeout(t, 17);
      };
    }
    var p = 0;
    var g = Math.ceil(u.duration / 17);
    var v = null;
    u.easing = u.easing.slice(0, 1).toUpperCase() + u.easing.slice(1);
    var h = u.easing.split(".");
    var m;
    if (h.length == 1) {
      m = c[h[0]];
    } else if (h.length == 2) {
      m = c[h[0]] && c[h[0]][h[1]];
    }
    var b = function () {
      var r = m(p, t, e - t, g);
      p++;
      if (p <= g) {
        u.callback(r);
        v = requestAnimationFrame(b);
      } else {
        u.callback(e, true);
      }
    };
    b();
    return function () {
      return v;
    };
  };
}
var E_ONLY = null;
var rippleEffect = function (t) {
  if (!t || !history.pushState) {
    return;
  }
  var e = navigator.userAgent;
  if (/Safari|iPhone/i.test(e) && /chrome/i.test(e) == false) {
    window.console && console.info("Safari support but bug, so avoid!");
    return;
  }
  if (typeof t == "string") {
    [].slice.call(document.querySelectorAll(t)).forEach(function (t) {
      rippleEffect(t);
    });
    return;
  }
  var r = "filterRipple";
  var a = document.getElementById(r);
  if (!a) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<svg style="position:absolute;height:0;clip:rect(0 0 0 0);"><defs><filter id="' +
        r +
        '"><feImage xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' +
        dataDisplacementImg +
        '" x="0" y="0" width="512" height="512" result="ripple"></feImage><feDisplacementMap xChannelSelector="G" yChannelSelector="R" color-interpolation-filters="sRGB" in="SourceGraphic" in2="ripple" scale="0"></feDisplacementMap><feComposite operator="in" in2="ripple"></feComposite><feComposite in2="SourceGraphic"></feComposite></filter></defs></svg>'
    );
  }
  var i = document.querySelector("#" + r + " feImage");
  var n = document.querySelector("#" + r + " feDisplacementMap");
  var o = null;
  var l = null;
  t.addEventListener("click", function (e) {
    if (o) {
      cancelAnimationFrame(o());
    }
    if (l) {
      cancelAnimationFrame(l());
    }
    if (E_ONLY && E_ONLY != this) {
      E_ONLY.style.filter = "";
    }
    t.style.filter = "url(#" + r + ")";
    var a = t.offsetWidth;
    var f = t.offsetHeight;
    var s = e.clientX;
    var c = e.clientY;
    var u = t.getBoundingClientRect();
    var d = u.left;
    var p = u.top;
    var g = s - d;
    var v = c - p;
    i.setAttribute("x", g);
    i.setAttribute("y", v);
    i.setAttribute("width", 0);
    i.setAttribute("height", 0);
    var h = Math.min(512, Math.max(a, f) * 2);
    var m = (30 * h) / 512;
    var b = (2e3 * h) / 512,
      w = (2100 * h) / 512;
    l = Math.animation(m, 0, b, function (t) {
      n.setAttribute("scale", t);
    });
    o = Math.animation(0, h, w, function (e, r) {
      i.setAttribute("x", g - e / 2);
      i.setAttribute("y", v - e / 2);
      i.setAttribute("width", e);
      i.setAttribute("height", e);
      if (r) {
        t.style.filter = "";
      }
    });
    E_ONLY = this;
  });
};
