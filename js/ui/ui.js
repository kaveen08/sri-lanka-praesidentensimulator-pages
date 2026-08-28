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

  /* ---------- Internationaler Vergleich ----------
     Eine Skala, auf der Sri Lanka und die sechs Vergleichsländer
     nebeneinander stehen. Die Skala wird nach den tatsächlich
     vorkommenden Werten aufgespannt, nicht nach den Grenzen des
     Indikators: Sonst drängen sich bei absoluten Größen wie den
     Emissionen alle sieben Länder in dieselbe Ecke.              */
  X.benchmarkBar = function (st, meta) {
    var BM = SL.data.benchmarks;
    if (!BM.comparable(meta.k)) {
      return el('div', { class: 'bm-none', title: BM.NOT_COMPARABLE[meta.k] || '' },
        ['kein Ländervergleich möglich']);
    }

    var pts = [{ k: 'LK', name: 'Sri Lanka', short: 'LK', color: 'var(--cy-bright)', v: st.ind[meta.k], self: true }];
    BM.COUNTRIES.forEach(function (c) {
      var v = BM.value(st, c.k, meta.k);
      if (v === undefined || v === null || isNaN(v)) return;
      pts.push({ k: c.k, name: c.name, short: c.short, color: c.color, v: v, note: BM.note(c.k, meta.k) });
    });
    if (pts.length < 2) return el('div', { class: 'bm-none' }, ['kein Ländervergleich möglich']);

    var vals = pts.map(function (p) { return p.v; });
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);

    /* Bei absoluten Größen liegen Welten zwischen den Ländern: Sri Lankas
       Reserven sind 6,6 Mrd., Chinas 3.250. Linear gezeichnet drängen sich
       sechs Länder in der linken Ecke. Ab einem Verhältnis von 20 zu 1 wird
       deshalb logarithmisch skaliert, damit die Abstände lesbar bleiben. */
    var logScale = lo > 0 && hi / lo > 20;
    var pos;
    if (logScale) {
      var l0 = Math.log(lo), l1 = Math.log(hi), lpad = (l1 - l0) * 0.08;
      l0 -= lpad; l1 += lpad;
      pos = function (v) { return U.clamp((Math.log(Math.max(v, 1e-6)) - l0) / (l1 - l0) * 100, 0, 100); };
    } else {
      var pad = (hi - lo) * 0.08 || Math.abs(hi) * 0.08 || 1;
      lo -= pad; hi += pad;
      pos = function (v) { return U.clamp((v - lo) / (hi - lo) * 100, 0, 100); };
    }

    /* Reihenfolge von gut nach schlecht, damit die Legende die
       Rangfolge zeigt und nicht die Datenreihenfolge. */
    var ranked = pts.slice().sort(function (a, b) { return meta.inv ? a.v - b.v : b.v - a.v; });
    var perCap = SL.data.benchmarks.PER_CAPITA[meta.k];

    var track = el('div', { class: 'bm-track' }, pts.map(function (p) {
      var tip = p.name + ': ' + X.fmtInd(meta, p.v) + (meta.unit ? ' ' + meta.unit : '');
      if (perCap) tip += '  (' + U.n1(p.v / BM.pop(p.k) * (meta.k === 'emissions' ? 1 : 1000)) + ' ' + perCap + ')';
      if (p.note) tip += '\n\n' + p.note;
      return el('div', {
        class: 'bm-pin' + (p.self ? ' self' : ''),
        style: { left: pos(p.v) + '%', '--pin': p.color },
        title: tip
      }, [el('span', { class: 'bm-lbl', text: p.short })]);
    }));

    return el('div', { class: 'bm' }, [
      track,
      logScale ? el('div', { class: 'bm-scalenote',
        title: 'Die Werte liegen um mehr als das Zwanzigfache auseinander. Linear gezeichnet wären sechs der sieben Marken nicht mehr zu unterscheiden.',
        text: 'logarithmische Skala' }) : null,
      el('div', { class: 'bm-legend' }, ranked.map(function (p, i) {
        return el('span', {
          class: 'bm-leg' + (p.self ? ' self' : ''),
          style: { color: p.color },
          title: (p.note || p.name) + '\n' + X.fmtInd(meta, p.v) + (meta.unit ? ' ' + meta.unit : '')
        }, [
          el('b', { text: p.short }), ' ', X.fmtInd(meta, p.v),
          p.note ? el('sup', { text: '*', style: { opacity: '.8' } }) : null
        ]);
      }))
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
  X.seatmap = function (gov, total, coalition) {
    var seats = [];
    coalition = coalition || 0;
    for (var i = 0; i < total; i++) {
      seats.push(el('div', { class: 'seat ' + (i < gov ? 'gov' : (i < gov + coalition ? 'coal' : 'opp')) }));
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
        svg('text', { x: 220, y: 204, class: 'parl-caption', 'text-anchor': 'middle', textContent: 'NPP-SITZE' }),
        svg('line', { x1: 220, y1: 210, x2: 220, y2: 225, class: 'parl-majority-line' })
      ])
    ]);
  };

  /* ---------- Wiederverwendbare Provinzkarte ---------- */
  X.provinceMap = function (st, opts) {
    opts = opts || {};
    var G = SL.data.geo, selected = opts.selected || null;
    var s = svg('svg', {
      class: 'lk-map' + (opts.compact ? ' compact' : ''),
      width: opts.compact ? 210 : 252, height: opts.compact ? 356 : 428,
      viewBox: G.VIEWBOX, role: 'img',
      'aria-label': 'Interaktive Karte Sri Lankas mit neun Provinzen'
    });
    var gradientId = 'lk-map-glow-' + (opts.id || 'main');
    var defs = svg('defs');
    defs.appendChild(svg('radialGradient', { id: gradientId, cx: '50%', cy: '47%', r: '58%' }, [
      svg('stop', { offset: '0%', 'stop-color': '#22d3ee', 'stop-opacity': '.12' }),
      svg('stop', { offset: '72%', 'stop-color': '#22d3ee', 'stop-opacity': '.035' }),
      svg('stop', { offset: '100%', 'stop-color': '#22d3ee', 'stop-opacity': '0' })
    ]));
    s.appendChild(defs);
    s.appendChild(svg('ellipse', { class: 'map-glow', cx: 102, cy: 169, rx: 99, ry: 166, fill: 'url(#' + gradientId + ')' }));

    G.PROVINCES.forEach(function (p) {
      var ps = st.provinces[p.k], t = U.clamp(ps.dev / 100, 0, 1);
      var fill = 'rgba(' + Math.round(10 + t * 20) + ',' + Math.round(40 + t * 150) + ',' + Math.round(60 + t * 160) + ',' + (0.32 + t * 0.5) + ')';
      function choose(e) {
        if (e && e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        if (e && e.preventDefault) e.preventDefault();
        if (opts.onSelect) opts.onSelect(selected === p.k && opts.toggle ? null : p.k);
      }
      s.appendChild(svg('path', {
        class: 'prov' + (selected === p.k ? ' sel' : ''), d: p.path, fill: fill,
        'fill-rule': 'evenodd', 'data-province': p.k, tabindex: '0', role: 'button',
        'aria-label': p.name + ', Entwicklung ' + U.n0(ps.dev) + ', Vertrauen ' + U.n0(ps.trust) + ', Unruhe ' + U.n0(ps.unrest),
        onclick: choose, onkeydown: choose
      }, [svg('title', { textContent: p.name + ' — Hauptstadt ' + p.capital })]));
    });
    G.PROVINCES.forEach(function (p) {
      if (p.cap) {
        s.appendChild(svg('circle', { class: 'cap-dot', cx: p.cap[0], cy: p.cap[1], r: 2.1 }));
        if (!opts.compact) s.appendChild(svg('text', { class: 'cap-lbl', x: p.cap[0] + 3.6, y: p.cap[1] + 2.4, textContent: p.capital }));
      }
      s.appendChild(svg('text', { class: 'pv', x: p.label[0], y: p.label[1], 'text-anchor': 'middle', textContent: p.k }));
      s.appendChild(svg('text', { class: 'pv-num', x: p.label[0], y: p.label[1] + 9, 'text-anchor': 'middle', textContent: U.n0(st.provinces[p.k].dev) }));
    });
    s.appendChild(svg('path', { class: 'map-deco', d: 'M 111 329 L 111 335 M 111 332 L 181 332 M 181 329 L 181 335' }));
    s.appendChild(svg('text', { class: 'map-scale', x: 146, y: 326, 'text-anchor': 'middle', textContent: '100 km' }));
    s.appendChild(svg('path', { class: 'map-deco', d: 'M 24 32 L 24 14 M 24 14 L 21 19 M 24 14 L 27 19' }));
    s.appendChild(svg('text', { class: 'map-scale', x: 24, y: 41, 'text-anchor': 'middle', textContent: 'N' }));
    return s;
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
