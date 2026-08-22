/* ============================================================
   SL  -  globaler Namensraum und Hilfsfunktionen
   ============================================================ */
var SL = window.SL || {};
SL.data = SL.data || {};
SL.ui = SL.ui || {};

(function (U) {
  'use strict';

  U.clamp = function (v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); };
  U.lerp = function (a, b, t) { return a + (b - a) * t; };
  U.round = function (v, d) { var f = Math.pow(10, d || 0); return Math.round(v * f) / f; };
  U.sum = function (arr, f) { var s = 0; for (var i = 0; i < arr.length; i++) s += f ? f(arr[i], i) : arr[i]; return s; };

  /* --- deterministischer Zufall (Seed), damit Spielstaende reproduzierbar sind --- */
  U.rngFrom = function (seed) {
    var s = seed >>> 0 || 88675123;
    return function () {
      s ^= s << 13; s >>>= 0;
      s ^= s >> 17;
      s ^= s << 5;  s >>>= 0;
      return s / 4294967296;
    };
  };

  /* --- Zahlformate (deutsch) --- */
  var nf = function (d) {
    return new Intl.NumberFormat('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
  };
  var NF0 = nf(0), NF1 = nf(1), NF2 = nf(2);

  U.n0 = function (v) { return NF0.format(v || 0); };
  U.n1 = function (v) { return NF1.format(v || 0); };
  U.n2 = function (v) { return NF2.format(v || 0); };

  /** LKR Mrd. -> lesbar (ab 1000 Mrd. als Billionen) */
  U.lkr = function (v) {
    if (v === undefined || v === null || isNaN(v)) return '-';
    var a = Math.abs(v);
    if (a >= 1000) return (v < 0 ? '-' : '') + NF2.format(a / 1000) + ' Bio.';
    if (a >= 100) return NF0.format(v) + ' Mrd.';
    return NF1.format(v) + ' Mrd.';
  };
  /** mit Vorzeichen */
  U.lkrS = function (v) { return (v > 0 ? '+' : '') + U.lkr(v); };

  U.pct = function (v, d) { return NF1.format(v || 0).replace(/,0$/, d === 0 ? '' : ',0') + ' %'; };
  U.pctS = function (v, d) { return (v > 0 ? '+' : '') + U.pct(v, d); };

  U.sign = function (v, d) {
    var f = d === 2 ? NF2 : (d === 0 ? NF0 : NF1);
    return (v > 0 ? '+' : (v < 0 ? '' : '±')) + f.format(v);
  };

  /* --- DOM --- */
  U.el = function (tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'text') e.textContent = v;
        else if (k === 'style' && typeof v === 'object') { for (var s in v) e.style[s] = v[s]; }
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else if (k === 'data' && typeof v === 'object') { for (var d in v) e.dataset[d] = v[d]; }
        else e.setAttribute(k, v);
      }
    }
    if (children !== undefined && children !== null) U.append(e, children);
    return e;
  };

  U.append = function (parent, child) {
    if (child === null || child === undefined || child === false) return parent;
    if (Array.isArray(child)) { child.forEach(function (c) { U.append(parent, c); }); return parent; }
    if (typeof child === 'string' || typeof child === 'number') {
      parent.appendChild(document.createTextNode(String(child)));
      return parent;
    }
    parent.appendChild(child);
    return parent;
  };

  U.clear = function (node) { while (node && node.firstChild) node.removeChild(node.firstChild); return node; };
  U.$ = function (sel, root) { return (root || document).querySelector(sel); };
  U.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  U.svg = function (tag, attrs, children) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) for (var k in attrs) {
      if (attrs[k] === null || attrs[k] === undefined) continue;
      /* textContent ist eine Eigenschaft, kein Attribut. Über setAttribute
         gesetzt bliebe der Text unsichtbar. */
      if (k === 'textContent') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (children) U.append(e, children);
    return e;
  };

  /* --- Textbausteine --- */
  U.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  U.deepCopy = function (o) { return JSON.parse(JSON.stringify(o)); };

  /** Farbklasse fuer Wert relativ zu Schwellen (hoeher = besser, ausser inv) */
  U.tone = function (v, lo, hi, inv) {
    var t = (v - lo) / (hi - lo);
    if (inv) t = 1 - t;
    if (t >= 0.66) return 'g';
    if (t >= 0.36) return 'a';
    return 'r';
  };

  U.toneColor = function (cls) {
    return { g: 'var(--green)', a: 'var(--amber)', r: 'var(--red)', v: 'var(--violet)', c: 'var(--cy)' }[cls] || 'var(--cy)';
  };

  /* --- Quartalsrechnung --- */
  U.qLabel = function (year, q) { return 'Q' + q + '/' + year; };
  U.qMonth = function (q) { return ['Jan–Mrz', 'Apr–Jun', 'Jul–Sep', 'Okt–Dez'][q - 1]; };

  U.nextQ = function (year, q) { return q === 4 ? { year: year + 1, q: 1 } : { year: year, q: q + 1 }; };

})(SL.util = SL.util || {});
