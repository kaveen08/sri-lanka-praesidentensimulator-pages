/* ============================================================
   ANSICHTEN  -  Maßnahmenkatalog, Devolution, Parteien, Bericht
   ============================================================ */
(function (V) {
  'use strict';
  var U = SL.util, X = SL.ui, M = SL.model, E = SL.engine, G = SL.data.geo, el = U.el, svg = U.svg;

  /* Filterzustand je Ansicht */
  var FS = {};

  /* =========================================================
     Karte einer Maßnahme
     ========================================================= */
  function pcard(st, p, onChange) {
    var status = E.status(st, p);
    var need = M.NEEDS[p.need] || M.NEEDS.simple;
    var chk = E.canEnact(st, p);
    var cost = E.pcCost(st, p);
    var fis = (p.fiscal ? (p.fiscal.rev || 0) - (p.fiscal.exp || 0) : 0);
    var openRisks = SL.data.risks.openFor(st, p);

    var cls = 'pcard';
    if (status === 'enacted') cls += ' enacted';
    else if (status === 'pending') cls += ' pending';
    else if (!chk.ok) cls += ' blocked';

    var actions = [];
    if (status === 'open') {
      actions.push(el('button', {
        class: 'tiny' + (chk.ok ? '' : ' disabled'), text: 'Beschließen',
        title: chk.ok ? ('Kostet ' + cost + ' politisches Kapital') : chk.why,
        onclick: function (e) { e.stopPropagation(); doEnact(st, p, onChange); }
      }));
    } else {
      actions.push(el('button', {
        class: 'tiny danger', text: 'Zurücknehmen',
        onclick: function (e) { e.stopPropagation(); E.repeal(st, p.id); E.recomputeIndex(st); onChange(); }
      }));
    }

    var rec = st.enacted[p.id];

    return el('div', {
      class: cls,
      onclick: function () { detailModal(st, p, onChange); }
    }, [
      el('div', { class: 'pc-top' }, [
        el('div', { class: 'pc-title', text: p.title }),
        status === 'enacted' ? X.badge('beschlossen', 'green')
          : (status === 'pending' ? X.badge('umsetzung ' + (rec.lag - rec.left) + '/' + rec.lag, 'amber') : null)
      ]),
      el('div', { class: 'pc-desc', text: p.desc.length > 210 ? p.desc.slice(0, 205) + '…' : p.desc }),
      el('div', { class: 'pc-meta' }, [
        X.badge(need.short, need.color, need.desc),
        X.badge(cost + ' PK', st.pc >= cost ? 'cy' : 'red', 'Politisches Kapital'),
        fis !== 0 ? X.badge((fis > 0 ? '+' : '') + U.n0(fis) + ' Mrd.', fis > 0 ? 'green' : 'amber', 'Haushaltswirkung pro Jahr') : null,
        p.lag ? X.badge(p.lag + ' Q', '', 'Quartale bis zur vollen Wirkung') : null,
        (p.tags || []).map(function (t) { return X.badge(t, ''); })
      ]),
      X.effectChips(p.eff, 5),
      openRisks.length ? el('div', { class: 'risk-strip', title: 'Strukturelle Hindernisse dämpfen die Wirkung dieser Maßnahme' }, [
        el('span', { class: 'rs-ico', text: '⚠' }),
        el('span', { class: 'rs-txt', text: openRisks.map(function (r) { return r.short; }).join(' · ') }),
        el('span', { class: 'rs-pct', text: U.n0(SL.data.risks.factor(st, p) * 100) + ' % Wirkung' })
      ]) : null,
      el('div', { class: 'pc-foot' }, [
        X.partyBadges(p.party),
        el('div', { class: 'pc-actions' }, actions)
      ]),
      (status === 'open' && !chk.ok) ? el('div', { class: 'xsmall', style: { color: 'var(--red)' }, text: chk.why }) : null
    ]);
  }

  /* Anzeige offener Hindernisse mit Sprung zur behebenden Maßnahme */
  function riskPanel(st, p, onChange) {
    var open = SL.data.risks.openFor(st, p);
    if (!open.length) return null;
    return el('div', { class: 'risk-box' }, [
      el('div', { class: 'hud-label mb6', style: { color: 'var(--amber)' },
        text: 'Was diese Maßnahme derzeit ausbremst' }),
      el('div', { class: 'small muted', style: { marginBottom: '9px', lineHeight: '1.6' } },
        'Von der geplanten Wirkung kommen derzeit rund ' + U.n0(SL.data.risks.factor(st, p) * 100) +
        ' % an, und die politischen Kosten liegen um ' + U.n0((SL.data.risks.costMul(st, p) - 1) * 100) +
        ' % höher. Beseitigen Sie zuerst die Voraussetzung, dann wirkt die Maßnahme voll.'),
      el('div', { class: 'col gap8' }, open.map(function (r) {
        var fixes = r.fix.map(E.byId).filter(Boolean);
        return el('div', { class: 'risk-item' }, [
          el('div', { class: 'ri-head' }, [
            el('span', { class: 'ri-name', text: r.label }),
            X.badge('Wirkung ×' + U.n2(r.dampen), 'red')
          ]),
          el('div', { class: 'ri-desc', text: r.desc }),
          el('div', { class: 'row gap6 wrap', style: { marginTop: '7px' } }, [
            el('span', { class: 'hud-label', text: 'Behebbar durch' }),
            fixes.map(function (f) {
              var done = st.enacted[f.id];
              return el('button', {
                class: 'tiny' + (done ? ' disabled' : ''),
                text: f.title + (done ? ' (läuft)' : ''),
                title: done ? 'Bereits beschlossen, wirkt nach vollständiger Umsetzung' : 'Details öffnen',
                onclick: function (e) { e.stopPropagation(); detailModal(st, f, onChange); }
              });
            })
          ])
        ]);
      }))
    ]);
  }

  function doEnact(st, p, onChange) {
    /* Volksabstimmungen sind riskant und kosten das Kapital auch im Fall einer Niederlage */
    if (p.need === 'referendum' && !E.status(st, p).match(/enacted|pending/)) {
      var support = E.referendumSupport(st, p);
      var tone = support >= 58 ? 'green' : (support >= 48 ? 'amber' : 'red');
      X.modal({
        title: 'Volksabstimmung ansetzen?', tag: 'ARTIKEL 83', tagCls: 'red',
        body: el('div', { class: 'col gap12' }, [
          el('div', { style: { fontSize: '13px', lineHeight: '1.7' } },
            '„' + p.title + '“ berührt eine durch Artikel 83 der Verfassung geschützte Bestimmung. ' +
            'Neben der Zweidrittelmehrheit im Parlament ist zwingend eine Volksabstimmung erforderlich.'),
          el('div', { class: 'row gap16 center' }, [
            X.gauge({ value: support, min: 0, max: 100, label: 'Zustimmung', text: U.n0(support) + ' %',
              tone: tone === 'green' ? 'g' : (tone === 'amber' ? 'a' : 'r') }),
            el('div', { class: 'col gap6 grow' }, [
              el('div', { class: 'small muted', style: { lineHeight: '1.6' } },
                'Geschätzte Zustimmung auf Basis der aktuellen Stimmungslage. Der tatsächliche Ausgang ist offen: ' +
                'je näher der Wert an 50 liegt, desto größer das Risiko.'),
              X.note('Die ' + E.pcCost(st, p) + ' Einheiten politisches Kapital sind in jedem Fall verbraucht. ' +
                'Bei einer Niederlage verlieren Sie zusätzlich Zustimmung in allen Gruppen.', 'bad')
            ])
          ])
        ]),
        actions: function (close) {
          return [
            el('button', { class: 'ghost', text: 'Abbrechen', onclick: close }),
            el('button', { class: 'danger', text: 'Volksabstimmung ansetzen', onclick: function () {
              close(); runEnact(st, p, onChange, true);
            } })
          ];
        }
      });
      return;
    }
    runEnact(st, p, onChange, false);
  }

  function runEnact(st, p, onChange, wasReferendum) {
    var r = E.enact(st, p);
    if (!r.ok) {
      if (r.referendum) {
        X.modal({
          title: 'Volksabstimmung gescheitert', tag: 'NIEDERLAGE', tagCls: 'red',
          body: el('div', { class: 'col gap10' }, [
            el('div', { style: { fontSize: '13px', lineHeight: '1.7' } },
              'Die Wählerinnen und Wähler haben „' + p.title + '“ abgelehnt. Geschätzte Zustimmung im Vorfeld: ' +
              U.n0(r.referendum.support) + ' %. Das Vorhaben ist gescheitert, das eingesetzte politische Kapital verloren, ' +
              'und Ihre Zustimmung hat in allen Gruppen gelitten.'),
            X.note('Sie können die Abstimmung später erneut ansetzen, wenn sich die Stimmungslage gedreht hat.')
          ]),
          actions: function (close) { return [el('button', { class: 'ghost', text: 'Zur Kenntnis genommen', onclick: close })]; }
        });
      } else {
        X.toast('bad', 'Nicht möglich', r.why);
      }
    } else {
      E.recomputeIndex(st);
      X.toast('good', wasReferendum ? 'Volksabstimmung gewonnen' : 'Beschlossen', p.title);
    }
    onChange();
  }

  /* Detailfenster */
  function detailModal(st, p, onChange) {
    var need = M.NEEDS[p.need] || M.NEEDS.simple;
    var chk = E.canEnact(st, p);
    var status = E.status(st, p);
    var cost = E.pcCost(st, p);
    var dom = M.DOMAIN_BY_KEY[p.cat] || {};

    var body = el('div', { class: 'col gap12' }, [
      el('div', { class: 'row gap6 wrap' }, [
        X.badge(dom.label || p.cat, 'cy'), p.sub ? X.badge(p.sub, '') : null,
        X.badge(need.label, need.color, need.desc),
        X.badge(cost + ' politisches Kapital', st.pc >= cost ? 'cy' : 'red'),
        p.lag ? X.badge(p.lag + ' Quartale Umsetzungszeit', '') : null
      ]),
      el('div', { style: { lineHeight: '1.65', fontSize: '13px' }, text: p.desc }),
      p.risk ? X.note('Risiko: ' + p.risk, 'warn') : null,
      p.fiscal && ((p.fiscal.rev || 0) || (p.fiscal.exp || 0) || p.oneoff) ? el('div', {}, [
        el('div', { class: 'hud-label mb6', text: 'Haushaltswirkung pro Jahr' }),
        el('div', { class: 'row gap10 wrap mono small' }, [
          p.fiscal.rev ? el('span', { style: { color: p.fiscal.rev > 0 ? 'var(--green)' : 'var(--red)' },
            text: 'Einnahmen ' + U.sign(p.fiscal.rev, 0) + ' Mrd. LKR' }) : null,
          p.fiscal.exp ? el('span', { style: { color: p.fiscal.exp > 0 ? 'var(--amber)' : 'var(--cy)' },
            text: 'Ausgaben ' + U.sign(p.fiscal.exp, 0) + ' Mrd. LKR' }) : null,
          p.oneoff ? el('span', { class: 'muted', text: 'einmalig ' + U.n0(p.oneoff) + ' Mrd. LKR' }) : null
        ])
      ]) : null,
      riskPanel(st, p, onChange),
      p.eff ? el('div', {}, [el('div', { class: 'hud-label mb6', text: 'Wirkung auf Kennzahlen' }), X.effectChips(p.eff)]) : null,
      p.grp ? el('div', {}, [el('div', { class: 'hud-label mb6', text: 'Wirkung auf Zustimmung' }), X.groupChips(p.grp)]) : null,
      p.party && p.party.length ? el('div', {}, [
        el('div', { class: 'hud-label mb6', text: 'Wird vertreten von' }), X.partyBadges(p.party)
      ]) : null,
      p.excl && p.excl.length ? el('div', {}, [
        el('div', { class: 'hud-label mb6', text: 'Unvereinbar mit' }),
        el('div', { class: 'small muted' }, p.excl.map(function (id) {
          var o = E.byId(id); return el('div', { text: '· ' + (o ? o.title : id) });
        }))
      ]) : null,
      (status === 'open' && !chk.ok) ? X.note(chk.why, 'bad') : null
    ]);

    X.modal({
      title: p.title, tag: status === 'enacted' ? 'BESCHLOSSEN' : (status === 'pending' ? 'IN UMSETZUNG' : 'ENTWURF'),
      tagCls: status === 'enacted' ? 'green' : (status === 'pending' ? 'amber' : 'cy'),
      body: body,
      actions: function (close) {
        if (status === 'open') {
          return [
            el('button', { class: 'ghost', text: 'Schließen', onclick: close }),
            el('button', { class: 'primary' + (chk.ok ? '' : ' disabled'), text: 'Beschließen', onclick: function () {
              if (!chk.ok) { X.toast('bad', 'Nicht möglich', chk.why); return; }
              doEnact(st, p, onChange); close();
            } })
          ];
        }
        return [
          el('button', { class: 'ghost', text: 'Schließen', onclick: close }),
          el('button', { class: 'danger', text: 'Zurücknehmen', onclick: function () {
            E.repeal(st, p.id); E.recomputeIndex(st); onChange(); close();
          } })
        ];
      }
    });
  }
  V.detailModal = detailModal;

  /* =========================================================
     Allgemeiner Maßnahmenbrowser
     ========================================================= */
  V.makePolicyView = function (opts) {
    return function (st, host) {
      var key = opts.key;
      FS[key] = FS[key] || { q: '', sub: null, party: null, status: 'all', sort: 'ratio' };
      var f = FS[key];

      var pool = E.all().filter(function (p) { return opts.cats.indexOf(p.cat) >= 0; });
      var subs = [];
      pool.forEach(function (p) { if (p.sub && subs.indexOf(p.sub) < 0) subs.push(p.sub); });
      var parties = [];
      pool.forEach(function (p) { (p.party || []).forEach(function (x) { if (parties.indexOf(x) < 0) parties.push(x); }); });

      host.appendChild(el('div', { class: 'view-head' }, [
        el('div', {}, [
          el('h2', { text: opts.title }),
          el('div', { class: 'sub', text: opts.sub })
        ]),
        el('div', { class: 'head-actions' }, [
          el('span', { class: 'hud-label', text: pool.length + ' Maßnahmen' })
        ])
      ]));

      if (opts.extra) host.appendChild(opts.extra(st));

      var listHost = el('div', { class: 'grid g2' });

      var search = el('input', { type: 'search', placeholder: 'Suchen…', value: f.q, style: { minWidth: '190px' },
        oninput: function (e) { f.q = e.target.value; draw(); } });

      function chip(label, on, fn, title) {
        return el('button', { class: 'chip' + (on ? ' on' : ''), text: label, title: title || '', onclick: fn });
      }

      var filters = el('div', { class: 'filters' });
      function drawFilters() {
        U.clear(filters);
        U.append(filters, [
          search,
          el('span', { class: 'hud-label', text: 'Bereich' }),
          chip('alle', !f.sub, function () { f.sub = null; draw(); }),
          subs.map(function (s) { return chip(s, f.sub === s, function () { f.sub = (f.sub === s ? null : s); draw(); }); }),
          el('span', { class: 'hud-label', style: { marginLeft: '8px' }, text: 'Partei' }),
          chip('alle', !f.party, function () { f.party = null; draw(); }),
          parties.map(function (pk) {
            var pp = SL.data.parties.BY_KEY[pk];
            return chip(pp ? pp.name : pk, f.party === pk, function () { f.party = (f.party === pk ? null : pk); draw(); }, pp ? pp.full : '');
          }),
          el('span', { class: 'hud-label', style: { marginLeft: '8px' }, text: 'Status' }),
          chip('alle', f.status === 'all', function () { f.status = 'all'; draw(); }),
          chip('offen', f.status === 'open', function () { f.status = 'open'; draw(); }),
          chip('beschlossen', f.status === 'done', function () { f.status = 'done'; draw(); }),
          chip('machbar', f.status === 'possible', function () { f.status = 'possible'; draw(); }, 'Mehrheit und politisches Kapital vorhanden'),
          chip('ausgebremst', f.status === 'blocked', function () { f.status = 'blocked'; draw(); }, 'Wirkung durch strukturelle Hindernisse gedämpft'),
          el('span', { class: 'grow' }),
          el('select', { onchange: function (e) { f.sort = e.target.value; draw(); } }, [
            el('option', { value: 'ratio', text: 'empfohlen', selected: f.sort === 'ratio' }),
            el('option', { value: 'impact', text: 'nach Wirkung', selected: f.sort === 'impact' }),
            el('option', { value: 'cost', text: 'nach politischen Kosten', selected: f.sort === 'cost' }),
            el('option', { value: 'money', text: 'nach Haushaltswirkung', selected: f.sort === 'money' }),
            el('option', { value: 'az', text: 'alphabetisch', selected: f.sort === 'az' })
          ])
        ]);
      }

      function draw() {
        drawFilters();
        var q = f.q.toLowerCase().trim();
        var list = pool.filter(function (p) {
          if (f.sub && p.sub !== f.sub) return false;
          if (f.party && (p.party || []).indexOf(f.party) < 0) return false;
          var stt = E.status(st, p);
          if (f.status === 'open' && stt !== 'open') return false;
          if (f.status === 'done' && stt === 'open') return false;
          if (f.status === 'possible' && (stt !== 'open' || !E.canEnact(st, p).ok)) return false;
          if (f.status === 'blocked' && !SL.data.risks.openFor(st, p).length) return false;
          if (q) {
            var hay = (p.title + ' ' + p.desc + ' ' + (p.tags || []).join(' ') + ' ' + (p.sub || '')).toLowerCase();
            if (hay.indexOf(q) < 0) return false;
          }
          return true;
        });

        list.sort(function (a, b) {
          if (f.sort === 'az') return a.title.localeCompare(b.title, 'de');
          if (f.sort === 'cost') return (a.pc || 0) - (b.pc || 0);
          if (f.sort === 'money') return fiscalOf(b) - fiscalOf(a);
          if (f.sort === 'impact') return impactOf(b) - impactOf(a);
          return ratioOf(b) - ratioOf(a);
        });

        U.clear(listHost);
        if (!list.length) {
          U.append(listHost, el('div', { class: 'faint small', text: 'Keine Maßnahme entspricht den Filtern.' }));
        }
        list.forEach(function (p) { listHost.appendChild(pcard(st, p, function () { SL.app.render(); })); });
      }

      function impactOf(p) {
        var s = 0; for (var k in (p.eff || {})) s += Math.abs(p.eff[k]); return s;
      }
      function fiscalOf(p) { return p.fiscal ? ((p.fiscal.rev || 0) - (p.fiscal.exp || 0)) : 0; }
      /* Empfohlen: viel Wirkung je eingesetztem politischem Kapital, Machbares zuerst,
         Volksabstimmungen ans Ende, weil sie das Kapital auch im Misserfolg kosten. */
      function ratioOf(p) {
        var r = impactOf(p) / ((p.pc || 1) + 6);
        if (E.status(st, p) === 'open' && !E.canEnact(st, p).ok) r -= 6;
        if (p.need === 'referendum') r -= 3;
        if (p.need === 'twothirds') r -= 0.6;
        return r;
      }

      host.appendChild(filters);
      host.appendChild(listHost);
      draw();
    };
  };

  /* =========================================================
     DEVOLUTION  -  Karte, Kompetenzmatrix, Finanzausgleich
     ========================================================= */
  var selProv = null;

  V.devolution = function (st, host) {
    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Provinzen, Distrikte, Kommunen' }),
        el('div', { class: 'sub', text: 'Wer macht was? Verschieben Sie Zuständigkeiten zwischen Nation, Provinz, Distrikt und Kommune und legen Sie fest, nach welcher Formel Geld verteilt wird. Seit 2018 und 2019 sind alle neun Provinzräte ohne gewählte Vertretung.' })
      ])
    ]));

    var top = el('div', { class: 'grid g-main' });

    /* --- Karte --- */
    var mapHost = el('div');
    function drawMap() {
      U.clear(mapHost);
      var s = svg('svg', { class: 'lk-map', width: 252, height: 428, viewBox: G.VIEWBOX });

      /* Flächen, eingefärbt nach Entwicklungsstand */
      G.PROVINCES.forEach(function (p) {
        var ps = st.provinces[p.k];
        var t = U.clamp(ps.dev / 100, 0, 1);
        var fill = 'rgba(' + Math.round(10 + t * 20) + ',' + Math.round(40 + t * 150) + ',' + Math.round(60 + t * 160) + ',' + (0.32 + t * 0.5) + ')';
        s.appendChild(svg('path', {
          class: 'prov' + (selProv === p.k ? ' sel' : ''), d: p.path, fill: fill,
          onclick: function () { selProv = (selProv === p.k ? null : p.k); drawMap(); drawInfo(); }
        }, [svg('title', { textContent: p.name + ' — ' + p.capital })]));
      });

      /* Provinzhauptstädte */
      G.PROVINCES.forEach(function (p) {
        if (!p.cap) return;
        s.appendChild(svg('circle', { class: 'cap-dot', cx: p.cap[0], cy: p.cap[1], r: 2.1 }));
        s.appendChild(svg('text', { class: 'cap-lbl', x: p.cap[0] + 3.6, y: p.cap[1] + 2.4, textContent: p.capital }));
      });

      /* Kürzel und Entwicklungsindex */
      G.PROVINCES.forEach(function (p) {
        s.appendChild(svg('text', { class: 'pv', x: p.label[0], y: p.label[1], 'text-anchor': 'middle', textContent: p.k }));
        s.appendChild(svg('text', { class: 'pv-num', x: p.label[0], y: p.label[1] + 9, 'text-anchor': 'middle',
          textContent: U.n0(st.provinces[p.k].dev) }));
      });

      /* Maßstab und Nordpfeil */
      s.appendChild(svg('path', { class: 'map-deco', d: 'M 150 316 L 150 322 M 150 319 L 189 319 M 189 316 L 189 322' }));
      s.appendChild(svg('text', { class: 'map-scale', x: 169, y: 313, 'text-anchor': 'middle', textContent: '100 km' }));
      s.appendChild(svg('path', { class: 'map-deco', d: 'M 24 32 L 24 14 M 24 14 L 21 19 M 24 14 L 27 19' }));
      s.appendChild(svg('text', { class: 'map-scale', x: 24, y: 41, 'text-anchor': 'middle', textContent: 'N' }));

      mapHost.appendChild(s);
    }

    var infoHost = el('div', { class: 'col gap10' });
    function drawInfo() {
      U.clear(infoHost);
      if (!selProv) {
        U.append(infoHost, el('div', { class: 'small muted', style: { lineHeight: '1.6' } },
          'Klicken Sie eine Provinz an. Die Zahl unter dem Kürzel ist der Entwicklungsindex, die Einfärbung folgt ihm.'));
        var rank = G.PROVINCES.map(function (p) { return { p: p, d: st.provinces[p.k].dev }; })
          .sort(function (a, b) { return b.d - a.d; });
        U.append(infoHost, el('table', { class: 'dtable' }, [
          el('thead', {}, el('tr', {}, [el('th', { text: 'Provinz' }), el('th', { class: 'num', text: 'Entw.' }),
            el('th', { class: 'num', text: 'Vertrauen' }), el('th', { class: 'num', text: 'Unruhe' }), el('th', { class: 'num', text: 'Mittel' })])),
          el('tbody', {}, rank.map(function (r) {
            var ps = st.provinces[r.p.k];
            return el('tr', { onclick: function () { selProv = r.p.k; drawMap(); drawInfo(); }, style: { cursor: 'pointer' } }, [
              el('td', { text: r.p.name }),
              el('td', { class: 'num', style: { color: r.d > 55 ? 'var(--green)' : (r.d > 38 ? 'var(--amber)' : 'var(--red)') }, text: U.n0(r.d) }),
              el('td', { class: 'num', text: U.n0(ps.trust) }),
              el('td', { class: 'num', style: { color: ps.unrest > 55 ? 'var(--red)' : '' }, text: U.n0(ps.unrest) }),
              el('td', { class: 'num', text: U.n0(ps.funding * E.scale(st)) })
            ]);
          }))
        ]));
        return;
      }
      var p = G.PROV_BY_KEY[selProv], ps = st.provinces[selProv];
      var dists = G.DISTRICTS.filter(function (d) { return d.prov === selProv; });
      U.append(infoHost, [
        el('div', { class: 'row gap8 wrap' }, [
          el('span', { style: { fontSize: '15px', fontWeight: '700', color: 'var(--cy-bright)' }, text: p.name }),
          X.badge('Hauptstadt ' + p.capital, ''), X.badge(U.n1(p.pop) + ' Mio.', ''), X.badge(p.gdpShare + ' % BIP', '')
        ]),
        el('div', { class: 'small muted', style: { lineHeight: '1.6' }, text: p.note }),
        X.note(p.council, 'warn'),
        el('div', {}, [
          X.meter({ label: 'Entwicklungsstand', value: ps.dev, min: 0, max: 100, text: U.n0(ps.dev) }),
          X.meter({ label: 'Vertrauen in den Zentralstaat', value: ps.trust, min: 0, max: 100, text: U.n0(ps.trust) }),
          X.meter({ label: 'Unruhe', value: ps.unrest, min: 0, max: 100, inv: true, text: U.n0(ps.unrest) }),
          X.meter({ label: 'Zugewiesene Mittel', value: ps.funding, min: 0, max: 400, text: U.n0(ps.funding * E.scale(st)) + ' Mrd. LKR' })
        ]),
        el('div', { class: 'hud-label', text: 'Bevölkerung nach Gemeinschaft' }),
        el('div', { class: 'row gap6 wrap' }, [
          X.badge('Sinhala ' + p.ethnic.sinhala + ' %', 'amber'),
          X.badge('Tamilisch ' + p.ethnic.tamil + ' %', 'red'),
          X.badge('Muslimisch ' + p.ethnic.muslim + ' %', 'green')
        ]),
        el('div', { class: 'hud-label', style: { marginTop: '6px' }, text: 'Distrikte' }),
        el('div', { class: 'col gap4' }, dists.map(function (d) {
          return el('div', { class: 'small', title: d.note }, [
            el('span', { style: { color: 'var(--tx)' }, text: d.name }),
            el('span', { class: 'faint mono xsmall', text: '  ' + U.n2(d.pop) + ' Mio.' }),
            el('div', { class: 'xsmall faint', style: { lineHeight: '1.45' }, text: d.note })
          ]);
        }))
      ]);
    }

    top.appendChild(X.panel('Schematische Lagekarte', [
      el('div', { class: 'map-wrap' }, [mapHost, el('div', { class: 'grow', style: { minWidth: '260px' } }, [infoHost])])
    ]));

    /* --- Finanzausgleich --- */
    var formHost = el('div', { class: 'col gap8' });
    function drawFormulas() {
      U.clear(formHost);
      G.TRANSFER_FORMULAS.forEach(function (fm) {
        var on = st.transferFormula === fm.k;
        formHost.appendChild(el('div', {
          class: 'ev-opt' + (on ? '' : ''),
          style: on ? { borderLeftColor: 'var(--cy)', background: 'rgba(34,211,238,.10)' } : null,
          onclick: function () {
            if (st.transferFormula === fm.k) return;
            st.transferFormula = fm.k;
            st.pc = Math.max(0, st.pc - 6);
            SL.state.log(st, 'info', 'Finanzausgleich umgestellt auf: ' + fm.label + '.');
            E.recomputeIndex(st); SL.state.recomputeProvinces(st);
            SL.app.render();
          }
        }, [
          el('div', { class: 'eo-t' }, [fm.label, on ? X.badge('aktiv', 'cy') : null]),
          el('div', { class: 'eo-d', text: fm.desc }),
          X.effectChips(fm.eff, 4)
        ]));
      });
    }
    drawFormulas();

    top.appendChild(X.panel('Finanzausgleich zwischen den Ebenen', [
      X.note('Der Verteilungstopf beträgt derzeit ' + U.lkr(st.budget.exp.provinces * E.scale(st)) + ' LKR pro Jahr. Diese Summe stellen Sie im Haushalt ein, die Formel bestimmt, wer wie viel davon bekommt.'),
      formHost
    ]));

    host.appendChild(top);
    drawMap(); drawInfo();

    /* --- Kompetenzmatrix --- */
    var matrixBody = el('tbody');
    function drawMatrix() {
      U.clear(matrixBody);
      G.COMPETENCES.forEach(function (c) {
        var cur = st.competences[c.k];
        var btns = M.LEVELS.map(function (lv) {
          return el('button', {
            class: (cur === lv.k ? 'on ' + lv.cls : ''), text: lv.short, title: lv.label + ' — ' + lv.desc,
            onclick: function () {
              if (st.competences[c.k] === lv.k) return;
              var cost = c.sensitive ? 10 : 5;
              if (st.pc < cost) { X.toast('bad', 'Nicht möglich', 'Politisches Kapital reicht nicht.'); return; }
              st.pc -= cost;
              st.competences[c.k] = lv.k;
              SL.state.log(st, 'info', 'Zuständigkeit „' + c.label + '“ verlagert auf: ' + lv.label + '.');
              E.recomputeIndex(st); SL.state.recomputeProvinces(st);
              SL.app.render();
            }
          });
        });
        var e = (c.eff && c.eff[cur]) || {};
        matrixBody.appendChild(el('tr', {}, [
          el('td', {}, [
            el('div', { style: { fontWeight: '600', color: 'var(--tx-bright)' } }, [
              c.label, c.d13 ? X.badge('13. Zusatz', 'violet', 'Im 13. Verfassungszusatz den Provinzen zugewiesen, faktisch nie übertragen.') : null,
              c.sensitive ? X.badge('heikel', 'red') : null
            ]),
            el('div', { class: 'xsmall muted', style: { lineHeight: '1.5', maxWidth: '620px' }, text: c.note })
          ]),
          el('td', {}, el('div', { class: 'lvl-group' }, btns)),
          el('td', {}, X.effectChips(e, 4))
        ]));
      });
    }
    drawMatrix();

    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Kompetenzmatrix: wer erledigt welche Aufgabe?', [
        X.note('Jede Verlagerung kostet politisches Kapital (5, bei heiklen Feldern 10). Polizei, Land und Gedenkpolitik sind die drei Felder, an denen die Devolutionsdebatte seit Jahrzehnten hängt.'),
        el('div', { style: { overflowX: 'auto', marginTop: '10px' } }, [
          el('table', { class: 'matrix' }, [
            el('thead', {}, el('tr', {}, [
              el('th', { text: 'Aufgabe' }), el('th', { text: 'Ebene' }), el('th', { text: 'Wirkung der aktuellen Zuordnung' })
            ])),
            matrixBody
          ])
        ])
      ])
    ]));

    /* --- Kommunalebene --- */
    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Kommunale Ebene', [
        el('div', { class: 'row gap16 wrap' }, [
          X.tile({ label: 'Municipal Councils', value: G.LOCAL.municipal }),
          X.tile({ label: 'Urban Councils', value: G.LOCAL.urban }),
          X.tile({ label: 'Pradeshiya Sabhas', value: G.LOCAL.pradeshiya }),
          X.tile({ label: 'Distrikte', value: G.DISTRICTS.length }),
          X.tile({ label: 'Provinzen', value: G.PROVINCES.length })
        ]),
        X.note(G.LOCAL.note)
      ])
    ]));

    /* --- Maßnahmen --- */
    var polHost = el('div', { style: { marginTop: '16px' } });
    polHost.appendChild(el('div', { class: 'view-head', style: { marginBottom: '10px' } }, [
      el('div', {}, [el('h2', { style: { fontSize: '15px' }, text: 'Maßnahmen zur Devolution' })])
    ]));
    host.appendChild(polHost);
    V.makePolicyView({ key: 'devo', cats: ['devolution'], title: '', sub: '' })(st, polHost);
    /* Doppelte Kopfzeile der eingebetteten Ansicht entfernen */
    var heads = polHost.querySelectorAll('.view-head');
    if (heads.length > 1) heads[1].parentNode.removeChild(heads[1]);
  };

  /* =========================================================
     STRUKTURELLE HINDERNISSE
     ========================================================= */
  V.risks = function (st, host) {
    var RK = SL.data.risks;
    var open = RK.RISKS.filter(function (r) { return !RK.solved(st, r.k); });

    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Strukturelle Hindernisse' }),
        el('div', { class: 'sub', text: 'Manche Vorhaben scheitern nicht am Parlament, sondern daran, dass die Voraussetzung fehlt: es gibt keine zuständige Behörde, der Zoll ist käuflich, das Grundbuch hat Lücken. Solange ein Hindernis besteht, kommt nur ein Teil der Wirkung an und die politischen Kosten steigen. Jedes lässt sich beheben.' })
      ]),
      el('div', { class: 'head-actions' }, [
        X.badge(open.length + ' offen', open.length ? 'amber' : 'green'),
        X.badge((RK.RISKS.length - open.length) + ' beseitigt', 'green')
      ])
    ]));

    var rows = RK.RISKS.map(function (r) {
      var solved = RK.solved(st, r.k);
      var affected = E.all().filter(function (p) { return (p.risks || []).indexOf(r.k) >= 0; });
      var affectedEnacted = affected.filter(function (p) { return st.enacted[p.id]; });
      var fixes = r.fix.map(E.byId).filter(Boolean);
      return { r: r, solved: solved, affected: affected, affectedEnacted: affectedEnacted, fixes: fixes };
    });
    rows.sort(function (a, b) {
      if (a.solved !== b.solved) return a.solved ? 1 : -1;
      return b.affected.length - a.affected.length;
    });

    host.appendChild(el('div', { class: 'grid g2' }, rows.map(function (o) {
      var r = o.r;
      return el('div', { class: 'risk-card' + (o.solved ? ' done' : '') }, [
        el('div', { class: 'rc-top' }, [
          el('div', { class: 'rc-name', text: r.label }),
          o.solved ? X.badge('beseitigt', 'green') : X.badge('offen', 'amber')
        ]),
        el('div', { class: 'rc-desc', text: r.desc }),
        el('div', { class: 'row gap5 wrap' }, [
          X.badge(o.affected.length + ' Maßnahmen betroffen', o.affected.length > 4 ? 'red' : ''),
          o.affectedEnacted.length ? X.badge(o.affectedEnacted.length + ' davon bereits beschlossen',
            o.solved ? 'green' : 'amber',
            o.solved ? 'Diese wirken jetzt voll.' : 'Diese wirken derzeit nur gedämpft.') : null,
          !o.solved ? X.badge('Wirkung ×' + U.n2(r.dampen), 'red') : null,
          !o.solved ? X.badge('Kosten ×' + U.n2(r.costMul), 'amber') : null
        ]),
        el('div', { style: { marginTop: '4px' } }, [
          el('div', { class: 'hud-label mb6', text: o.solved ? 'Behoben durch' : 'Behebbar durch' }),
          el('div', { class: 'row gap6 wrap' }, o.fixes.map(function (f) {
            var rec = st.enacted[f.id];
            var lbl = f.title;
            if (rec && rec.active) lbl += ' ✓';
            else if (rec) lbl += ' (' + (rec.lag - rec.left) + '/' + rec.lag + ')';
            return el('button', {
              class: 'tiny' + (rec && rec.active ? ' disabled' : ''), text: lbl,
              onclick: function () { detailModal(st, f, function () { SL.app.render(); }); }
            });
          }))
        ]),
        !o.solved && o.affected.length ? el('div', {}, [
          el('div', { class: 'hud-label mb6', style: { marginTop: '4px' }, text: 'Betrifft unter anderem' }),
          el('div', { class: 'xsmall faint', style: { lineHeight: '1.55' },
            text: o.affected.slice(0, 6).map(function (p) { return p.title; }).join(' · ')
              + (o.affected.length > 6 ? ' und ' + (o.affected.length - 6) + ' weitere' : '') })
        ]) : null
      ]);
    })));
  };

  /* =========================================================
     PARTEIEN
     ========================================================= */
  V.parties = function (st, host) {
    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Parteien und ihre Vorschläge' }),
        el('div', { class: 'sub', text: 'Sitzverteilung der 2024 gewählten Legislaturperiode und die Programmpunkte, die die Parteien öffentlich vertreten. Über die Filter im Maßnahmenkatalog können Sie gezielt nach Vorschlägen einer Partei suchen.' })
      ])
    ]));

    var P = SL.data.parties.PARTIES;
    host.appendChild(el('div', { class: 'grid g2' }, P.map(function (p) {
      var pols = E.all().filter(function (x) { return (x.party || []).indexOf(p.k) >= 0; });
      var done = pols.filter(function (x) { return st.enacted[x.id]; }).length;
      return el('div', { class: 'party-card corner-frame' }, [
        el('div', { class: 'pt-bar', style: { background: p.color, boxShadow: '0 0 14px ' + p.color } }),
        el('div', { class: 'row gap8 wrap', style: { marginLeft: '6px' } }, [
          el('span', { class: 'pt-name', style: { color: p.color }, text: p.name }),
          p.gov ? X.badge('Regierung', 'green') : X.badge('Opposition', ''),
          X.badge(p.seats + ' Sitze', 'cy'),
          el('span', { class: 'grow' }),
          X.badge(done + '/' + pols.length + ' umgesetzt', done > 0 ? 'green' : '')
        ]),
        el('div', { class: 'pt-full', style: { marginLeft: '6px' }, text: p.full }),
        el('div', { class: 'xsmall', style: { marginLeft: '6px', color: 'var(--tx-faint)', marginTop: '2px' },
          text: p.lead + ' · ' + p.ideology }),
        el('div', { class: 'small muted', style: { marginLeft: '6px', marginTop: '8px', lineHeight: '1.55' }, text: p.desc }),
        el('div', { class: 'hud-label', style: { marginLeft: '6px', marginTop: '10px' }, text: 'Programmpunkte' }),
        el('ul', { style: { margin: '4px 0 0 22px', padding: 0, fontSize: '12px', lineHeight: '1.65', color: 'var(--tx-mute)' } },
          p.proposals.map(function (t) { return el('li', { text: t }); })),
        el('div', { class: 'row gap6', style: { marginLeft: '6px', marginTop: '10px' } }, [
          el('button', { class: 'tiny', text: 'Maßnahmen dieser Partei', onclick: function () {
            showPartyPolicies(st, p);
          } })
        ])
      ]);
    })));
  };

  function showPartyPolicies(st, p) {
    var pols = E.all().filter(function (x) { return (x.party || []).indexOf(p.k) >= 0; });
    var body = el('div', { class: 'col gap10' }, [
      el('div', { class: 'small muted', text: p.full + ' vertritt im Katalog ' + pols.length + ' Maßnahmen.' }),
      el('div', { class: 'col gap8' }, pols.map(function (x) {
        return pcard(st, x, function () { SL.app.render(); });
      }))
    ]);
    X.modal({ title: 'Vorschläge: ' + p.name, tag: p.seats + ' SITZE', body: body,
      actions: function (close) { return [el('button', { class: 'ghost', text: 'Schließen', onclick: close })]; } });
  }

  /* =========================================================
     MILITÄR  -  Zusatzübersicht
     ========================================================= */
  V.militaryExtra = function (st) {
    var i = st.ind;
    var defence = st.budget.exp.defence;
    return el('div', { style: { marginBottom: '14px' } }, [
      X.panel('Streitkräfte im Überblick', [
        el('div', { class: 'grid g4' }, [
          X.tile({ label: 'Verteidigungsetat', value: U.lkr(defence), unit: 'LKR',
            foot: [el('span', { class: 'mono xsmall muted', text: U.n2(defence / st.gdpN * 100) + ' % BIP' })] }),
          X.tile({ label: 'Einsatzfähigkeit', value: U.n0(i.militaryCap), unit: '/100',
            tone: i.militaryCap >= 55 ? 'g' : 'a' }),
          X.tile({ label: 'Truppenmoral', value: U.n0(i.militaryMor), unit: '/100',
            tone: i.militaryMor >= 50 ? 'g' : (i.militaryMor >= 35 ? 'a' : 'r'),
            hint: 'Fällt die Moral unter 30, steigt das Risiko offener Illoyalität.' }),
          X.tile({ label: 'Rückhalt im Militär', value: U.n0(st.approval.military), unit: '%',
            tone: st.approval.military >= 45 ? 'g' : (st.approval.military >= 30 ? 'a' : 'r') })
        ]),
        el('div', { class: 'grid g2', style: { marginTop: '12px' } }, [
          el('div', {}, [
            X.meter({ label: 'Innere Sicherheit', value: i.internalSec, min: 0, max: 100, text: U.n0(i.internalSec) }),
            X.meter({ label: 'Maritime Sicherheit', value: i.maritimeSec, min: 0, max: 100, text: U.n0(i.maritimeSec) }),
            X.meter({ label: 'Veteranenfürsorge', value: i.veteran, min: 0, max: 100, text: U.n0(i.veteran) })
          ]),
          el('div', {}, [
            X.meter({ label: 'Vertrauen im Norden und Osten', value: i.trustTamil, min: 0, max: 100, text: U.n0(i.trustTamil) }),
            X.meter({ label: 'Nationalistischer Druck', value: i.sinhalaPress, min: 0, max: 100, inv: true, text: U.n0(i.sinhalaPress) }),
            X.meter({ label: 'Nationale Versöhnung', value: i.reconcile, min: 0, max: 100, text: U.n0(i.reconcile) })
          ])
        ]),
        i.militaryMor < 32 ? X.note('Die Truppenmoral ist gefährlich niedrig. In der Geschichte Sri Lankas hat ein verstimmter Sicherheitsapparat mehr als einmal Politik gemacht.', 'bad') : null
      ])
    ]);
  };

  /* =========================================================
     ABSCHLUSSBERICHT
     ========================================================= */
  V.report = function (st, host) {
    var ev = E.evaluate(st);
    var go = st.gameOver;

    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: go ? 'Abschlussbericht' : 'Zwischenbericht' }),
        el('div', { class: 'sub', text: go ? go.text : 'Stand ' + U.qLabel(st.year, st.q) + '. So stünde Ihre Bilanz, wenn die Amtszeit heute endete.' })
      ])
    ]));

    host.appendChild(el('div', { class: 'grid g-main' }, [
      X.panel('Gesamtbewertung', [
        el('div', { class: 'row gap16 wrap center' }, [
          el('div', { class: 'col center', style: { minWidth: '150px' } }, [
            el('div', { class: 'report-grade', style: { color: ev.grade.c }, text: ev.grade.g }),
            el('div', { class: 'hud-label', style: { marginTop: '6px' }, text: U.n0(ev.total) + ' / 100' }),
            el('div', { class: 'small', style: { color: ev.grade.c, textAlign: 'center', marginTop: '4px' }, text: ev.grade.t })
          ]),
          el('div', { class: 'grow', style: { minWidth: '280px' } }, ev.parts.map(function (p) {
            return X.meter({ label: p.k, value: p.v, min: 0, max: 100, text: U.n0(p.v) });
          }))
        ]),
        go ? X.note(go.title + ': ' + go.text, go.kind === 'reelected' ? '' : 'bad') : null
      ]),
      X.panel('Bilanz in Zahlen', [
        el('table', { class: 'dtable' }, [
          el('thead', {}, el('tr', {}, [el('th', { text: 'Kennzahl' }), el('th', { class: 'num', text: '2026' }), el('th', { class: 'num', text: 'heute' })])),
          el('tbody', {}, ['growth', 'inflation', 'debtGdp', 'poverty', 'youthUnemp', 'brainDrain', 'corruption',
            'reconcile', 'trustTamil', 'climateRes', 'regionalBalance', 'privateSector', 'femaleLFP', 'skillsMatch'].map(function (k) {
            var meta = M.IND_BY_KEY[k];
            var b = SL.data.baseline.INDICATORS[k], v = st.ind[k];
            var better = meta.inv ? v < b : v > b;
            return el('tr', {}, [
              el('td', { text: meta.label }),
              el('td', { class: 'num muted', text: X.fmtInd(meta, b) }),
              el('td', { class: 'num', style: { color: Math.abs(v - b) < 0.3 ? '' : (better ? 'var(--green)' : 'var(--red)') },
                text: X.fmtInd(meta, v) })
            ]);
          }))
        ])
      ])
    ]));

    /* -----------------------------------------------------
       Internationaler Vergleich

       Die Gesamtbewertung oben enthält einen Bereich, der auf
       srilankischen Größen beruht und sich nicht vergleichen
       lässt. Hier steht deshalb eine eigene Einteilung, die für
       alle sieben Länder gleich berechnet wird, ausschließlich
       aus vergleichbaren Indikatoren. Sri Lanka wird nach
       derselben Formel bewertet wie die anderen.
       ----------------------------------------------------- */
    var BM = SL.data.benchmarks;
    var profiles = { LK: BM.profile(st, 'LK') };
    BM.COUNTRIES.forEach(function (c) { profiles[c.k] = BM.profile(st, c.k); });

    var order = [{ k: 'LK', name: 'Sri Lanka', short: 'LK', color: 'var(--cy-bright)', self: true }]
      .concat(BM.COUNTRIES);

    function cell(v, best, worst) {
      if (v === null) return el('td', { class: 'num faint', title: 'Für dieses Land nicht sinnvoll erhebbar.', text: '–' });
      var tone = v >= best - 4 ? 'var(--green)' : (v <= worst + 4 ? 'var(--red)' : '');
      return el('td', { class: 'num', style: { color: tone } }, [U.n0(v)]);
    }

    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Wo Sri Lanka im internationalen Vergleich steht', [
        el('div', { class: 'small muted', style: { marginBottom: '10px' } },
          'Acht Bereiche, für alle sieben Länder nach derselben Formel aus denselben Indikatoren berechnet. ' +
          'Die Vergleichswerte sind gerundete Größenordnungen für 2025/26 und bilden Verhältnisse ab, keine amtliche Statistik. ' +
          'Grün ist der beste Wert der Zeile, rot der schlechteste.'),
        el('div', { class: 'tscroll' }, [
          el('table', { class: 'dtable bm-table' }, [
            el('thead', {}, el('tr', {}, [el('th', { text: 'Bereich' })].concat(
              order.map(function (c) {
                return el('th', { class: 'num' + (c.self ? ' self' : ''), title: c.desc || 'Ihr laufender Stand',
                  style: { color: c.color } }, [c.short]);
              })).concat([el('th', { class: 'num', text: 'Rang' })]))),
            el('tbody', {}, BM.AREAS.map(function (a, ai) {
              var vals = order.map(function (c) { return profiles[c.k].parts[ai].v; });
              var real = vals.filter(function (v) { return v !== null; });
              var best = Math.max.apply(null, real), worst = Math.min.apply(null, real);
              var lk = profiles.LK.parts[ai].v;
              var pos = real.filter(function (v) { return v > lk; }).length + 1;
              return el('tr', {}, [el('td', { title: a.desc, text: a.k })]
                .concat(vals.map(function (v) { return cell(v, best, worst); }))
                .concat([el('td', { class: 'num' }, [
                  el('span', { class: 'bm-rank ' + (pos <= 2 ? 'g' : (pos <= 4 ? 'a' : 'r')),
                    text: pos + '/' + real.length })
                ])]));
            }).concat([
              (function () {
                var vals = order.map(function (c) { return profiles[c.k].total; });
                var best = Math.max.apply(null, vals), worst = Math.min.apply(null, vals);
                var pos = vals.filter(function (v) { return v > profiles.LK.total; }).length + 1;
                return el('tr', { class: 'bm-total' }, [el('td', { text: 'Gesamt' })]
                  .concat(vals.map(function (v) { return cell(v, best, worst); }))
                  .concat([el('td', { class: 'num' }, [
                    el('span', { class: 'bm-rank ' + (pos <= 2 ? 'g' : (pos <= 4 ? 'a' : 'r')),
                      text: pos + '/' + vals.length })
                  ])]));
              })()
            ]))
          ])
        ]),
        /* Wo Sri Lanka am weitesten vorn und am weitesten zurück liegt */
        (function () {
          var gaps = BM.AREAS.map(function (a, ai) {
            var lk = profiles.LK.parts[ai].v;
            var others = BM.COUNTRIES.map(function (c) { return profiles[c.k].parts[ai].v; })
              .filter(function (v) { return v !== null; });
            var avg = others.reduce(function (x, y) { return x + y; }, 0) / others.length;
            return { k: a.k, desc: a.desc, gap: lk - avg, lk: lk, avg: avg };
          }).sort(function (x, y) { return y.gap - x.gap; });
          var top = gaps[0], bottom = gaps[gaps.length - 1];
          return el('div', { class: 'grid g2', style: { marginTop: '12px' } }, [
            X.note((top.gap >= 0
                ? 'Stärkster Bereich: ' + top.k + '. Sri Lanka liegt mit ' + U.n0(top.lk) +
                  ' Punkten um ' + U.n0(top.gap) + ' über dem Durchschnitt der sechs Vergleichsländer (' + U.n0(top.avg) + ').'
                : 'Kleinster Rückstand: ' + top.k + '. Sri Lanka liegt bei ' + U.n0(top.lk) +
                  ' Punkten, der Durchschnitt der sechs Vergleichsländer bei ' + U.n0(top.avg) +
                  ', also ' + U.n0(-top.gap) + ' Punkte darüber. Hier ist der Abstand am kleinsten.')
              + ' ' + top.desc, top.gap >= 0 ? 'good' : ''),
            X.note('Größter Rückstand: ' + bottom.k + '. Sri Lanka liegt bei ' + U.n0(bottom.lk) +
              ' Punkten, der Durchschnitt der sechs Vergleichsländer bei ' + U.n0(bottom.avg) +
              ', also ' + U.n0(Math.abs(bottom.gap)) + ' Punkte darüber. ' + bottom.desc, 'warn')
          ]);
        })(),
        X.note('Zur Einordnung: Sri Lanka erwirtschaftet rund 4.500 USD je Kopf im Jahr. Indien liegt bei 2.900, China bei 13.400, Deutschland bei 54.000, die Schweiz bei 100.000. Ein Rückstand gegenüber der Schweiz ist nicht dasselbe wie ein Rückstand gegenüber Indien: Sri Lanka wirtschaftet mit einem Zwanzigstel der schweizerischen Mittel. Singapur war 1965 ärmer als Ceylon.', ''),
        el('div', { class: 'row right', style: { marginTop: '10px' } }, [
          el('button', { class: 'tiny ghost', text: 'Vergleich je Einzelindikator',
            onclick: function () { SL.views._bmOn = true; SL.app.go('indicators'); } })
        ])
      ])
    ]));

    var enacted = Object.keys(st.enacted).map(E.byId).filter(Boolean);
    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Beschlossene Maßnahmen (' + enacted.length + ')', [
        enacted.length ? el('div', { class: 'grid g2' }, enacted.map(function (p) {
          return el('div', { class: 'pcard enacted' }, [
            el('div', { class: 'pc-title', text: p.title }),
            el('div', { class: 'pc-meta' }, [
              X.badge((M.DOMAIN_BY_KEY[p.cat] || {}).label || p.cat, 'cy'),
              st.enacted[p.id].active ? X.badge('wirksam', 'green') : X.badge('in Umsetzung', 'amber')
            ])
          ]);
        })) : el('div', { class: 'faint small', text: 'Sie haben nichts beschlossen.' })
      ])
    ]));

    if (go) {
      host.appendChild(el('div', { class: 'row center', style: { marginTop: '18px' } }, [
        el('button', { class: 'primary', text: 'Neue Amtszeit beginnen', onclick: function () {
          SL.state.clearSave(); location.reload();
        } })
      ]));
    }
  };

})(SL.views = SL.views || {});
