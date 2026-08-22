/* ============================================================
   UI-BAUSTEINE
   ============================================================ */
(function (X) {
  'use strict';
  var U = SL.util, M = SL.model, el = U.el, svg = U.svg;

  /* ---------- Panel ---------- */
  X.panel = function (title, body, opts) {
    opts = opts || {};
    var head = title ? el('div', { class: 'panel-head' }, [
      el('span', { class: 'dot' }),
      el('span', { class: 'hud-title', text: title }),
      opts.right ? el('div', { class: 'row gap6', style: { marginLeft: 'auto' } }, opts.right) : null
    ]) : null;
    return el('div', { class: 'panel corner-frame' + (opts.class ? ' ' + opts.class : '') }, [
      head, el('div', { class: 'panel-body' + (opts.bodyClass ? ' ' + opts.bodyClass : ''), style: opts.bodyStyle || null }, body)
    ]);
  };

  /* ---------- Kennzahlen-Kachel ---------- */
  X.tile = function (o) {
    var cls = 'tile';
    if (o.tone === 'r') cls += ' crit'; else if (o.tone === 'a') cls += ' warn'; else if (o.tone === 'g') cls += ' good';
    return el('div', { class: cls, title: o.hint || '' }, [
      el('div', { class: 't-lbl' }, [o.icon ? el('span', { text: o.icon }) : null, o.label]),
      el('div', { class: 't-val' }, [o.value, o.unit ? el('small', { text: o.unit }) : null]),
      o.foot ? el('div', { class: 't-foot' }, o.foot) : null
    ]);
  };

  /* ---------- Balken ---------- */
  X.meter = function (o) {
    var min = o.min !== undefined ? o.min : 0, max = o.max !== undefined ? o.max : 100;
    var pct = U.clamp((o.value - min) / (max - min) * 100, 0, 100);
    var tone = o.tone || U.tone(o.value, min, max, o.inv);
    var track = el('div', { class: 'm-track' }, [
      el('div', { class: 'm-fill ' + tone, style: { width: pct + '%' } }),
      o.target !== undefined ? el('div', {
        class: 'm-target',
        title: 'Ziel: ' + U.n1(o.target),
        style: { left: U.clamp((o.target - min) / (max - min) * 100, 0, 100) + '%' }
      }) : null
    ]);
    return el('div', { class: 'meter', title: o.hint || '' }, [
      el('div', { class: 'm-top' }, [
        el('span', { class: 'm-name', text: o.label }),
        el('span', { class: 'm-val' }, [o.text !== undefined ? o.text : U.n1(o.value),
          o.delta !== undefined && Math.abs(o.delta) > 0.04
            ? el('span', { class: 'm-delta ' + (o.delta > 0 ? (o.inv ? 'neg' : 'pos') : (o.inv ? 'pos' : 'neg')), text: ' ' + U.sign(o.delta, 1) })
            : null])
      ]), track
    ]);
  };

  /* ---------- Rundinstrument ---------- */
  X.gauge = function (o) {
    var size = o.size || 108, r = size / 2 - 9, cx = size / 2, cy = size / 2;
    var min = o.min !== undefined ? o.min : 0, max = o.max !== undefined ? o.max : 100;
    var t = U.clamp((o.value - min) / (max - min), 0, 1);
    var start = 135, sweep = 270;
    var C = 2 * Math.PI * r;
    var arcLen = C * (sweep / 360);
    var tone = o.tone || U.tone(o.value, min, max, o.inv);
    var color = U.toneColor(tone);

    var s = svg('svg', { width: size, height: size, viewBox: '0 0 ' + size + ' ' + size }, [
      svg('circle', {
        cx: cx, cy: cy, r: r, fill: 'none', stroke: 'rgba(56,189,248,0.13)', 'stroke-width': 7,
        'stroke-dasharray': arcLen + ' ' + C, 'stroke-linecap': 'round',
        transform: 'rotate(' + start + ' ' + cx + ' ' + cy + ')'
      }),
      svg('circle', {
        cx: cx, cy: cy, r: r, fill: 'none', stroke: color, 'stroke-width': 7,
        'stroke-dasharray': (arcLen * t) + ' ' + C, 'stroke-linecap': 'round',
        transform: 'rotate(' + start + ' ' + cx + ' ' + cy + ')',
        style: 'filter: drop-shadow(0 0 6px ' + color + '); transition: stroke-dasharray .6s ease'
      })
    ]);
    return el('div', { class: 'gauge', style: { width: size + 'px', height: size + 'px' }, title: o.hint || '' }, [
      s,
      el('div', { class: 'g-center' }, [
        el('div', { class: 'g-num', text: o.text !== undefined ? o.text : U.n0(o.value) }),
        el('div', { class: 'g-cap', text: o.label })
      ])
    ]);
  };

  /* ---------- Verlaufskurve ---------- */
  X.spark = function (values, o) {
    o = o || {};
    var w = o.w || 220, h = o.h || 46, pad = 3;
    if (!values || values.length < 2) return el('div', { class: 'faint xsmall', text: 'noch keine Daten' });
    var min = Math.min.apply(null, values), max = Math.max.apply(null, values);
    if (max - min < 0.0001) { max = min + 1; }
    var pts = values.map(function (v, idx) {
      var x = pad + idx / (values.length - 1) * (w - pad * 2);
      var y = h - pad - (v - min) / (max - min) * (h - pad * 2);
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    var color = o.color || 'var(--cy)';
    return svg('svg', { class: 'spark', width: w, height: h, viewBox: '0 0 ' + w + ' ' + h }, [
      svg('polyline', { points: pts, fill: 'none', stroke: color, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        style: 'filter: drop-shadow(0 0 4px ' + color + ')' }),
      svg('circle', { cx: (pad + (w - pad * 2)), cy: (h - pad - (values[values.length - 1] - min) / (max - min) * (h - pad * 2)),
        r: 2.4, fill: color })
    ]);
  };

  /* ---------- Badge ---------- */
  X.badge = function (text, cls, title) {
    return el('span', { class: 'badge ' + (cls || ''), text: text, title: title || '' });
  };

  X.partyBadges = function (list) {
    if (!list || !list.length) return null;
    var P = SL.data.parties;
    return el('span', { class: 'row gap4 wrap' }, list.map(function (k) {
      var p = P.BY_KEY[k];
      return el('span', {
        class: 'badge', text: p ? p.name : k,
        title: p ? (p.full + ' — ' + p.ideology) : k,
        style: { color: p ? p.color : '', borderColor: p ? p.color + '66' : '', background: p ? p.color + '15' : '' }
      });
    }));
  };

  /* ---------- Effekt-Chips ---------- */
  X.effectChips = function (eff, limit) {
    if (!eff) return null;
    var keys = Object.keys(eff).filter(function (k) { return M.IND_BY_KEY[k]; });
    keys.sort(function (a, b) { return Math.abs(eff[b]) - Math.abs(eff[a]); });
    if (limit) keys = keys.slice(0, limit);
    return el('div', { class: 'efx' }, keys.map(function (k) {
      var meta = M.IND_BY_KEY[k];
      var v = eff[k];
      var good = meta.inv ? v < 0 : v > 0;
      return el('span', {
        class: 'e ' + (good ? 'up' : 'down'),
        text: meta.label + ' ' + U.sign(v, Math.abs(v) < 1 ? 2 : 1),
        title: meta.desc
      });
    }));
  };

  X.groupChips = function (grp, limit) {
    if (!grp) return null;
    var keys = Object.keys(grp).filter(function (k) { return M.GROUP_BY_KEY[k]; });
    keys.sort(function (a, b) { return Math.abs(grp[b]) - Math.abs(grp[a]); });
    if (limit) keys = keys.slice(0, limit);
    return el('div', { class: 'efx' }, keys.map(function (k) {
      var g = M.GROUP_BY_KEY[k], v = grp[k];
      return el('span', {
        class: 'e ' + (v > 0 ? 'up' : 'down'),
        text: g.short + ' ' + U.sign(v, 0), title: g.label
      });
    }));
  };

  /* ---------- Gruppenzustimmung ---------- */
  X.groupRow = function (g, value) {
    var tone = value >= 55 ? 'var(--green)' : (value >= 42 ? 'var(--amber)' : 'var(--red)');
    return el('div', { class: 'grp-row', title: g.desc }, [
      el('div', { class: 'gr-name', text: g.label }),
      el('div', { class: 'gr-bar' }, [
        el('div', { class: 'gr-fill', style: { width: U.clamp(value, 0, 100) + '%', background: tone, boxShadow: '0 0 8px ' + tone } })
      ]),
      el('div', { class: 'gr-num mono', style: { color: tone }, text: U.n0(value) })
    ]);
  };

  /* ---------- Sitzverteilung ---------- */
  X.seatmap = function (gov, total) {
    var seats = [];
    for (var i = 0; i < total; i++) {
      seats.push(el('div', { class: 'seat ' + (i < gov ? 'gov' : 'opp') }));
    }
    return el('div', { class: 'seatmap' }, seats);
  };

  X.parliamentChart = function (st, selected, onSelect) {
    var defs = SL.data.parties.PARTIES || [];
    var dynamic = st.parliament && st.parliament.seats ? st.parliament.seats : {};
    var seatOwners = [];
    defs.forEach(function (p) {
      for (var n = 0; n < (dynamic[p.k] === undefined ? p.seats : dynamic[p.k]); n++) seatOwners.push(p);
    });
    var rows = [33, 39, 45, 51, 57], dots = [], idx = 0;
    rows.forEach(function (count, row) {
      var radius = 74 + row * 27;
      for (var i = 0; i < count; i++) {
        var angle = Math.PI - (i / (count - 1)) * Math.PI;
        var owner = seatOwners[idx++] || defs[defs.length - 1];
        var cx = 220 + Math.cos(angle) * radius;
        var cy = 222 - Math.sin(angle) * radius;
        dots.push(svg('circle', {
          class: 'parl-seat' + (selected === owner.k ? ' selected' : ''),
          cx: cx.toFixed(2), cy: cy.toFixed(2), r: selected === owner.k ? 4.3 : 3.55,
          fill: owner.color, 'data-party': owner.k,
          tabindex: '0', role: 'button', 'aria-label': owner.name + ', Sitz ' + idx,
          onclick: (function (k) { return function () { if (onSelect) onSelect(k); }; })(owner.k),
          onkeydown: (function (k) { return function (e) { if ((e.key === 'Enter' || e.key === ' ') && onSelect) onSelect(k); }; })(owner.k)
        }, [svg('title', { text: owner.full })]));
      }
    });
    return el('div', { class: 'parliament-wrap' }, [
      svg('svg', { class: 'parliament-chart', viewBox: '0 0 440 236', role: 'img', 'aria-label': 'Interaktive Sitzverteilung im Parlament' }, [
        svg('path', { class: 'parl-floor', d: 'M123 222 A97 97 0 0 1 317 222' }),
        dots,
        svg('text', { x: 220, y: 187, class: 'parl-number', 'text-anchor': 'middle', textContent: String(st.seatsGov) }),
        svg('text', { x: 220, y: 204, class: 'parl-caption', 'text-anchor': 'middle', textContent: 'REGIERUNGSSITZE' }),
        svg('line', { x1: 220, y1: 210, x2: 220, y2: 225, class: 'parl-majority-line' })
      ])
    ]);
  };

  /* ---------- Modal ---------- */
  X.modal = function (o) {
    var back = el('div', { class: 'modal-back' });
    var close = function () { if (back.parentNode) back.parentNode.removeChild(back); if (o.onClose) o.onClose(); };
    back.addEventListener('click', function (e) { if (e.target === back && !o.sticky) close(); });
    var m = el('div', { class: 'modal corner-frame' }, [
      el('div', { class: 'modal-head' }, [
        el('span', { class: 'dot' }),
        el('h3', { text: o.title }),
        o.tag ? X.badge(o.tag, o.tagCls || 'cy') : null,
        o.sticky ? null : el('button', { class: 'ghost tiny', text: '✕', style: { marginLeft: 'auto' }, onclick: close })
      ]),
      el('div', { class: 'modal-body' }, o.body),
      o.actions ? el('div', { class: 'modal-foot' }, o.actions(close)) : null
    ]);
    back.appendChild(m);
    document.body.appendChild(back);
    return { close: close, node: m };
  };

  /* ---------- Toast ---------- */
  X.toast = function (kind, title, text, ms) {
    var host = U.$('#toasts');
    if (!host) return;
    var t = el('div', { class: 'toast ' + (kind || 'info') }, [
      el('div', { class: 't-title', text: title }),
      el('div', { text: text })
    ]);
    host.appendChild(t);
    setTimeout(function () {
      t.style.transition = 'opacity .3s, transform .3s';
      t.style.opacity = '0'; t.style.transform = 'translateX(20px)';
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 320);
    }, ms || 4200);
  };

  /* ---------- Hinweis ---------- */
  X.note = function (text, cls) {
    return el('div', { class: 'note ' + (cls || '') }, text);
  };

  /* ---------- Indikatorwert formatieren ---------- */
  X.fmtInd = function (meta, v) {
    switch (meta.fmt) {
      case 'pct': return U.n1(v) + ' %';
      case 'usd': return U.n2(v);
      case 'mt': return U.n1(v);
      case 'idx': return U.n0(v);
      default: return U.n1(v);
    }
  };

  /* ---------- Fortschrittsschritte ---------- */
  X.steps = function (done, total) {
    var arr = [];
    for (var i = 0; i < total; i++) {
      arr.push(el('div', { class: 'st ' + (i < done ? 'done' : (i === done ? 'now' : '')) }));
    }
    return el('div', { class: 'steps' }, arr);
  };

})(SL.ui = SL.ui || {});
