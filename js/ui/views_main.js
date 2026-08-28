/* ============================================================
   ANSICHTEN  -  Lagezentrum, Lagebild, Haushalt, Indikatoren
   ============================================================ */
(function (V) {
  'use strict';
  var U = SL.util, X = SL.ui, M = SL.model, E = SL.engine, B = SL.data.baseline, G = SL.data.geo, el = U.el;

  function hist(st, key) { return st.history.map(function (h) { return h[key]; }).filter(function (v) { return v !== undefined; }); }
  function delta(st, key) {
    var h = hist(st, key);
    if (h.length < 2) return 0;
    return h[h.length - 1] - h[h.length - 2];
  }

  /* =========================================================
     LAGEZENTRUM
     ========================================================= */
  V.dashboard = function (st, host) {
    var i = st.ind, bud = E.budget(st);

    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Lagezentrum' }),
        el('div', { class: 'sub', text: 'Amtssitz des Präsidenten der Demokratischen Sozialistischen Republik Sri Lanka. Alle Werte beziehen sich auf ' + U.qLabel(st.year, st.q) + ' (' + U.qMonth(st.q) + ').' })
      ])
    ]));

    /* --- Kennzahlenreihe --- */
    var tiles = el('div', { class: 'grid g4', style: { marginBottom: '14px' } }, [
      X.tile({
        label: 'Zustimmung gesamt', value: U.n1(st.approvalOverall), unit: '%',
        tone: st.approvalOverall >= 52 ? 'g' : (st.approvalOverall >= 42 ? 'a' : 'r'),
        foot: [X.spark(hist(st, 'approval'), { w: 120, h: 22 })],
        hint: 'Gewichteter Durchschnitt über alle Bevölkerungsgruppen.'
      }),
      X.tile({
        label: 'BIP-Wachstum real', value: U.n1(i.growth), unit: '%',
        tone: i.growth >= 4 ? 'g' : (i.growth >= 1.5 ? 'a' : 'r'),
        foot: [X.spark(hist(st, 'growth'), { w: 120, h: 22, color: 'var(--green)' })],
        hint: '2025 lag das Wachstum bei 5,0 %, der IWF erwartet für 2026 rund 3 %.'
      }),
      X.tile({
        label: 'Inflation', value: U.n1(i.inflation), unit: '%',
        tone: i.inflation <= 6 ? 'g' : (i.inflation <= 12 ? 'a' : 'r'),
        foot: [X.spark(hist(st, 'inflation'), { w: 120, h: 22, color: 'var(--amber)' })],
        hint: 'Zielband der Zentralbank: 5 %.'
      }),
      X.tile({
        label: 'Staatsverschuldung', value: U.n1(i.debtGdp), unit: '% BIP',
        tone: i.debtGdp <= 92 ? 'g' : (i.debtGdp <= 105 ? 'a' : 'r'),
        foot: [X.spark(hist(st, 'debtGdp'), { w: 120, h: 22, color: 'var(--red)' })],
        hint: 'IWF-Zielpfad: unter 95 % des BIP bis 2032.'
      }),
      X.tile({
        label: 'Armutsquote', value: U.n1(i.poverty), unit: '%',
        tone: i.poverty <= 16 ? 'g' : (i.poverty <= 24 ? 'a' : 'r'),
        foot: [X.spark(hist(st, 'poverty'), { w: 120, h: 22, color: 'var(--orange)' })],
        hint: 'Weltbank 2024: 24,5 %, etwa doppelt so hoch wie vor der Krise.'
      }),
      X.tile({
        label: 'Jugendarbeitslosigkeit', value: U.n1(i.youthUnemp), unit: '%',
        tone: i.youthUnemp <= 12 ? 'g' : (i.youthUnemp <= 20 ? 'a' : 'r'),
        foot: [X.spark(hist(st, 'youthUnemp'), { w: 120, h: 22, color: 'var(--violet)' })],
        hint: '15 bis 24 Jahre. Ende 2025: 18,7 %, junge Frauen 21,6 %.'
      }),
      X.tile({
        label: 'Devisenreserven', value: U.n2(i.reserves), unit: 'Mrd. USD',
        tone: i.reserves >= 6 ? 'g' : (i.reserves >= 3.5 ? 'a' : 'r'),
        foot: [el('span', { class: 'mono xsmall muted', text: U.n0(i.fx) + ' LKR/USD' })],
        hint: 'Ende Juli 2026 lagen die Reserven bei 6,59 Mrd. USD.'
      }),
      X.tile({
        label: 'Druck der Straße', value: U.n0(st.streetPressure), unit: '/100',
        tone: st.streetPressure <= 35 ? 'g' : (st.streetPressure <= 60 ? 'a' : 'r'),
        foot: [X.spark(hist(st, 'street'), { w: 120, h: 22, color: 'var(--red)' })],
        hint: 'Ab 88 wird die Lage unhaltbar. Zur Erinnerung: die Aragalaya von 2022.'
      })
    ]);
    host.appendChild(tiles);

    /* --- Hauptbereich --- */
    var left = el('div', { class: 'col gap12' });
    var right = el('div', { class: 'col gap12' });

    /* Haushaltslage */
    var target = E.primaryTarget(st);
    left.appendChild(X.panel('Haushaltslage', [
      el('div', { class: 'row gap16 wrap center', style: { justifyContent: 'space-around' } }, [
        X.gauge({ value: bud.primaryPct, min: -4, max: 5, label: 'Primärsaldo', text: U.n1(bud.primaryPct) + '%',
          tone: bud.primaryPct >= target ? 'g' : (bud.primaryPct >= target - 0.8 ? 'a' : 'r'),
          hint: 'IWF-Ziel für ' + st.year + ': ' + U.n1(target) + ' % des BIP.' }),
        X.gauge({ value: bud.revPct, min: 8, max: 22, label: 'Einnahmen', text: U.n1(bud.revPct) + '%',
          tone: bud.revPct >= B.IMF.revenueFloor ? 'g' : 'r',
          hint: 'Untergrenze des Programms: ' + U.n1(B.IMF.revenueFloor) + ' % des BIP.' }),
        X.gauge({ value: -bud.balancePct, min: 0, max: 14, label: 'Defizit', text: U.n1(-bud.balancePct) + '%', inv: true }),
        X.gauge({ value: i.imfCompl, min: 0, max: 100, label: 'IWF-Treue' })
      ]),
      el('div', { class: 'row gap10 wrap', style: { marginTop: '12px' } }, [
        el('div', { class: 'small muted grow' },
          'Zinsen ' + U.lkr(bud.interest) + ' LKR pro Jahr, das sind ' + U.n0(bud.interest / bud.totalRev * 100) + ' % der Staatseinnahmen. ' +
          'Nächste IWF-Überprüfung in ' + Math.max(0, st.imf.nextReviewTurn - st.turn) + ' Quartal(en).'),
        el('button', { class: 'tiny', text: 'Zum Haushalt', onclick: function () { SL.app.go('budget'); } })
      ])
    ]));

    /* Interaktive Provinzkarte direkt im Lagezentrum */
    var selectedProvince = V.selectedProvince || 'WP';
    V.selectedProvince = selectedProvince;
    var province = G.PROV_BY_KEY[selectedProvince], provinceState = st.provinces[selectedProvince];
    left.appendChild(X.panel('Sri Lanka · Provinzlage', [
      el('div', { class: 'dashboard-map' }, [
        X.provinceMap(st, {
          id: 'dashboard', compact: true, selected: selectedProvince,
          onSelect: function (key) { V.selectedProvince = key; SL.app.render(); }
        }),
        el('div', { class: 'dashboard-map-info' }, [
          el('div', { class: 'row gap6 wrap' }, [
            el('strong', { style: { color: 'var(--cy-bright)' }, text: province.name }),
            X.badge(province.capital, ''), X.badge(U.n1(province.pop) + ' Mio.', '')
          ]),
          X.meter({ label: 'Entwicklung', value: provinceState.dev, min: 0, max: 100, text: U.n0(provinceState.dev) }),
          X.meter({ label: 'Vertrauen', value: provinceState.trust, min: 0, max: 100, text: U.n0(provinceState.trust) }),
          X.meter({ label: 'Unruhe', value: provinceState.unrest, min: 0, max: 100, inv: true, text: U.n0(provinceState.unrest) }),
          el('div', { class: 'row between wrap gap6', style: { marginTop: '8px' } }, [
            el('span', { class: 'mono xsmall muted', text: U.n0(provinceState.funding * E.scale(st)) + ' Mrd. LKR zugewiesen' }),
            el('button', { class: 'tiny', text: 'Provinz verwalten', onclick: function () { SL.app.go('devolution'); } })
          ])
        ])
      ])
    ]));

    /* Lagebild kompakt */
    var probs = SL.data.problems.PROBLEMS.map(function (p) { return { p: p, v: p.score(st) }; })
      .sort(function (a, b) { return a.v - b.v; });
    left.appendChild(X.panel('Dringlichste Baustellen', [
      el('div', {}, probs.slice(0, 7).map(function (r) {
        return X.meter({ label: r.p.label, value: r.v, min: 0, max: 100, text: U.n0(r.v) + '/100', hint: r.p.desc });
      })),
      el('div', { class: 'row right', style: { marginTop: '8px' } }, [
        el('button', { class: 'tiny ghost', text: 'Vollständiges Lagebild', onclick: function () { SL.app.go('problems'); } })
      ])
    ]));

    /* Protokoll */
    left.appendChild(X.panel('Protokoll', [
      el('div', { class: 'log-list' }, st.log.slice(0, 12).map(function (l) {
        return el('div', { class: 'log-item ' + l.kind }, [
          el('span', { class: 'lg-time', text: l.t }),
          el('span', { text: l.text })
        ]);
      })),
      st.log.length ? null : el('div', { class: 'faint small', text: 'Noch keine Einträge.' })
    ]));

    /* Zustimmung nach Gruppen */
    right.appendChild(X.panel('Zustimmung nach Gruppen', [
      el('div', {}, M.GROUPS.map(function (g) { return X.groupRow(g, st.approval[g.k]); }))
    ]));

    /* Parlament */
    var need = E.governmentSeats(st), ownSeats = st.seatsGov, coalitionSeats = need - ownSeats;
    right.appendChild(X.panel('Parlament', [
      el('div', { class: 'row between', style: { marginBottom: '8px' } }, [
        el('span', { class: 'mono', style: { fontSize: '20px', color: 'var(--cy-bright)' }, text: ownSeats + (coalitionSeats ? ' +' + coalitionSeats : '') + ' / 225' }),
        el('div', { class: 'col', style: { alignItems: 'flex-end' } }, [
          el('span', { class: 'xsmall', style: { color: need >= 150 ? 'var(--green)' : 'var(--red)' },
            text: need >= 150 ? 'Zweidrittelmehrheit vorhanden' : 'keine Zweidrittelmehrheit' }),
          el('span', { class: 'xsmall', style: { color: need >= 113 ? 'var(--green)' : 'var(--red)' },
            text: need >= 113 ? 'einfache Mehrheit vorhanden' : 'keine einfache Mehrheit' })
        ])
      ]),
      X.seatmap(ownSeats, 225, coalitionSeats),
      coalitionSeats ? el('div', { class: 'row gap10 wrap xsmall muted', style: { marginTop: '7px' } }, [
        el('span', {}, [el('span', { class: 'seat-key gov' }), ' NPP ' + ownSeats]),
        el('span', {}, [el('span', { class: 'seat-key coal' }), ' Koalition ' + coalitionSeats]),
        el('span', { text: 'Partnersitze zählen nur bei unterstützten Maßnahmen.' })
      ]) : null,
      el('div', { class: 'row gap10', style: { marginTop: '10px' } }, [
        el('div', { class: 'grow' }, [
          el('div', { class: 'hud-label', text: 'Politisches Kapital' }),
          X.meter({ label: '', value: st.pc, min: 0, max: 200, text: U.n0(st.pc) })
        ])
      ]),
      st.presidentialPower !== 100 ? X.note(st.presidentialPower < 100
        ? 'Die Exekutivgewalt ist beschnitten. Maßnahmen kosten rund ' + U.n0((100 - st.presidentialPower) / 1.1) + ' % mehr politisches Kapital.'
        : 'Erweiterte Präsidialbefugnisse: Maßnahmen sind günstiger, aber der Druck der Straße wächst.', 'warn') : null
    ]));

    /* Außenbeziehungen */
    right.appendChild(X.panel('Außenbeziehungen', [
      el('div', {}, ['relIndia', 'relChina', 'relWest', 'relJapan', 'relGulf', 'diaspora'].map(function (k) {
        var meta = M.IND_BY_KEY[k];
        return X.meter({ label: meta.label, value: i[k], min: 0, max: 100, text: U.n0(i[k]), hint: meta.desc });
      }))
    ]));

    host.appendChild(el('div', { class: 'grid g-main' }, [left, right]));
  };

  /* =========================================================
     LAGEBILD  -  Strukturprobleme
     ========================================================= */
  V.problems = function (st, host) {
    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Lagebild' }),
        el('div', { class: 'sub', text: 'Die strukturellen Probleme des Landes, an denen Ihre Amtszeit gemessen wird. Der Wert zeigt, wie weit ein Problem gelöst ist: 0 bedeutet ungelöst, 100 bedeutet erledigt.' })
      ])
    ]));

    var rows = SL.data.problems.PROBLEMS.map(function (p) { return { p: p, v: p.score(st) }; })
      .sort(function (a, b) { return a.v - b.v; });

    host.appendChild(el('div', { class: 'grid g2' }, rows.map(function (r) {
      var stt = SL.data.problems.status(r.v);
      var sevCls = r.p.sev >= 3 ? 'red' : 'amber';
      return el('div', { class: 'panel corner-frame' }, [
        el('div', { class: 'panel-body col gap8' }, [
          el('div', { class: 'row gap8 wrap' }, [
            el('span', { style: { fontSize: '13px', fontWeight: '600', color: 'var(--tx-bright)' }, text: r.p.label }),
            el('span', { class: 'grow' }),
            X.badge(r.p.sev >= 3 ? 'sehr hoch' : 'hoch', sevCls, 'Schweregrad'),
            X.badge(r.p.horizon, '', 'Zeithorizont')
          ]),
          el('div', { class: 'small muted', style: { lineHeight: '1.55' }, text: r.p.desc }),
          X.meter({ label: stt.label, value: r.v, min: 0, max: 100, text: U.n0(r.v) + '/100', tone: stt.cls }),
          el('div', { class: 'row gap6 wrap' }, r.p.keys.map(function (k) {
            var meta = M.IND_BY_KEY[k];
            if (!meta) return null;
            return X.badge(meta.label + ': ' + X.fmtInd(meta, st.ind[k]), '', meta.desc);
          }))
        ])
      ]);
    })));

    host.appendChild(el('div', { style: { marginTop: '16px' } }, [
      X.panel('Quellen der Ausgangslage', [
        el('div', { class: 'col gap6' }, B.SOURCES.map(function (s) {
          return el('div', { class: 'src' }, [el('a', { href: s.u, target: '_blank', rel: 'noopener', text: s.t })]);
        })),
        X.note('Die Zahlen sind für die Simulation gerundet und intern konsistent gemacht. Sie bilden Größenordnungen ab, keine amtliche Statistik.')
      ])
    ]));
  };

  /* =========================================================
     HAUSHALT
     ========================================================= */
  V.budget = function (st, host) {
    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Haushalt ' + st.year }),
        el('div', { class: 'sub', text: 'Alle Beträge in Milliarden Rupien pro Jahr. Verschieben Sie die Regler, um Einnahmen und Ausgaben zu verändern. Der Primärsaldo muss das Programmziel erreichen, sonst platzt die nächste IWF-Überprüfung.' })
      ]),
      el('div', { class: 'head-actions' }, [
        el('button', { class: 'ghost tiny', text: 'Zurücksetzen', onclick: function () {
          B.REVENUE.forEach(function (r) { st.budget.rev[r.k] = r.base; });
          B.SPENDING.forEach(function (e) { st.budget.exp[e.k] = e.base; });
          SL.app.render();
        } })
      ])
    ]));

    var shareUpdaters = [];
    var summary = el('div', { class: 'budget-summary', style: { marginBottom: '14px' } });
    var gapNote = el('div', { style: { marginBottom: '10px' } });
    var strainBox = el('div', { style: { marginBottom: '14px' } });

    function refresh() {
      E.recomputeIndex(st);
      shareUpdaters.forEach(function (f) { f(); });
      var bud = E.budget(st);
      var target = E.primaryTarget(st);
      var gap = (target - bud.primaryPct) / 100 * st.gdpN;   /* fehlender Betrag in LKR Mrd. */

      U.clear(summary);
      U.append(summary, [
        X.tile({ label: 'Einnahmen', value: U.lkr(bud.totalRev), unit: 'LKR',
          foot: [el('span', { class: 'mono xsmall muted', text: U.n1(bud.revPct) + ' % BIP' })],
          tone: bud.revPct >= B.IMF.revenueFloor ? 'g' : 'r' }),
        X.tile({ label: 'Ausgaben', value: U.lkr(bud.totalExp), unit: 'LKR',
          foot: [el('span', { class: 'mono xsmall muted', text: U.n1(bud.expPct) + ' % BIP' })] }),
        X.tile({ label: 'Zinslast', value: U.lkr(bud.interest), unit: 'LKR',
          foot: [el('span', { class: 'mono xsmall muted', text: U.n0(bud.interest / bud.totalRev * 100) + ' % der Einnahmen' })],
          tone: bud.interest / bud.totalRev > 0.55 ? 'r' : 'a' }),
        X.tile({ label: 'Primärsaldo', value: U.n1(bud.primaryPct), unit: '% BIP',
          foot: [el('span', { class: 'mono xsmall', style: { color: 'var(--amber)' }, text: 'Ziel ' + U.n1(target) + ' %' })],
          tone: bud.primaryPct >= target ? 'g' : (bud.primaryPct >= target - 0.8 ? 'a' : 'r') }),
        X.tile({ label: 'Gesamtsaldo', value: U.n1(bud.balancePct), unit: '% BIP',
          foot: [el('span', { class: 'mono xsmall muted', text: U.lkr(bud.balance) + ' LKR' })],
          tone: bud.balancePct > -5 ? 'a' : 'r' }),
        X.tile({ label: 'Schuldenquote', value: U.n1(st.ind.debtGdp), unit: '% BIP',
          foot: [el('span', { class: 'mono xsmall muted', text: 'Ziel < 95 % bis 2032' })],
          tone: st.ind.debtGdp <= 95 ? 'g' : 'a' })
      ]);

      U.clear(gapNote);
      if (gap > 1) {
        U.append(gapNote, X.note(
          'Haushaltsloch: Ihnen fehlen ' + U.lkr(gap) + ' LKR, um das Primärsaldoziel von ' + U.n1(target) +
          ' % des BIP zu erreichen. Ohne Gegenfinanzierung scheitert die nächste IWF-Überprüfung, und mit ihr die Tranche von 334 Mio. USD.', 'bad'));
      } else if (gap > -300) {
        U.append(gapNote, X.note('Das Primärsaldoziel ist erreicht. Der Spielraum darüber hinaus beträgt ' + U.lkr(-gap) + ' LKR.', ''));
      } else {
        U.append(gapNote, X.note('Sie übererfüllen das Ziel um ' + U.lkr(-gap) + ' LKR. Der IWF wäre zufrieden, aber ein zu harter Sparkurs bremst Wachstum und erhöht Armut und Druck auf der Straße.', 'warn'));
      }

      /* Ausweichreaktion und Unterversorgung zusammengefasst */
      U.clear(strainBox);
      var det = E.revDetail(st);
      var lostTotal = 0;
      for (var rk in det) lostTotal += det[rk].lost;
      var strain = E.budgetStrain(st);
      var af = E.adminFactor(st);

      if (lostTotal > 3 || strain.total > 0) {
        var items = strain.lines.slice(0, 5).map(function (o) {
          return el('div', { class: 'strain-row' }, [
            el('span', { class: 'sr-name', text: o.line.label }),
            X.badge(o.kind === 'rev' ? 'überdehnt' : 'unterversorgt', o.w > 1.2 ? 'red' : 'amber'),
            el('span', { class: 'sr-note', text: (o.kind === 'rev' ? o.line.strainNote : o.line.cutNote) || '' })
          ]);
        });
        U.append(strainBox, X.panel('Reaktion auf die Haushaltspolitik', [
          el('div', { class: 'row gap16 wrap', style: { marginBottom: '10px' } }, [
            X.tile({ label: 'Nicht einholbar', value: U.lkr(lostTotal * sc), unit: 'LKR',
              tone: lostTotal > 120 ? 'r' : (lostTotal > 30 ? 'a' : 'g'),
              hint: 'Differenz zwischen eingestellten Sätzen und dem, was der Staat tatsächlich einnimmt.',
              foot: [el('span', { class: 'mono xsmall muted', text: 'durch Ausweichen und Hinterziehung' })] }),
            X.tile({ label: 'Einzugsfähigkeit', value: U.n0(af * 100), unit: '%',
              tone: af > 1.15 ? 'g' : (af > 0.85 ? 'a' : 'r'),
              hint: 'Hängt an Steuermoral, Steuerverwaltung, Zollintegrität und Abwanderung. Je höher, desto mehr lässt sich überhaupt erheben.',
              foot: [el('span', { class: 'mono xsmall muted', text: 'Steuermoral ' + U.n0(st.ind.taxCompl) + ', Abwanderung ' + U.n0(st.ind.brainDrain) })] }),
            X.tile({ label: 'Überdehnte Posten', value: strain.lines.length,
              tone: strain.total > 1.2 ? 'r' : (strain.total > 0 ? 'a' : 'g'),
              foot: [el('span', { class: 'mono xsmall muted', text: strain.total > 0 ? 'lösen Ereignisse aus' : 'im Rahmen' })] })
          ]),
          items.length ? el('div', { class: 'col gap6' }, items) : null,
          strain.rev > 0.8 ? X.note('Die Steuerlast ist so weit über den Ausgangswert geschoben, dass Ausweichen lohnt: Fachkräfte wandern ab, Gewinne werden verlagert, Umsätze laufen bar. Jede weitere Erhöhung bringt weniger als die vorige.', 'bad') : null,
          strain.exp > 0.8 ? X.note('Die Kürzungen sind so tief, dass Leistungen ausfallen. Das trifft zuerst die Provinzen und die Grundversorgung, und es kommt als Protest zurück.', 'bad') : null,
          (lostTotal > 30 && strain.rev < 0.8) ? X.note('Ein besserer Vollzug wäre der billigere Weg: Steuerverwaltungssystem, eigenständige Steuerbehörde, Betriebsprüfung und Zollintegrität heben die Einzugsfähigkeit deutlich an, ohne einen einzigen Satz zu erhöhen.', 'warn') : null
        ]));
      }
    }

    host.appendChild(summary);
    host.appendChild(gapNote);
    host.appendChild(strainBox);

    var sc = E.scale(st);

    function lineRow(line, kind) {
      var cur = kind === 'rev' ? st.budget.rev[line.k] : st.budget.exp[line.k];
      var nowEl = el('div', { class: 'bl-now mono' });
      var shareEl = el('div', { class: 'bl-share mono' });
      var warnEl = el('div', { class: 'bl-warn' });
      var row;

      /* Anteil dieses Postens an der jeweiligen Gesamtsumme und am BIP.
         Ein absoluter Betrag sagt wenig, solange man nicht weiß, ob er
         ein Zwanzigstel oder ein Drittel des Haushalts ausmacht. */
      var setShare = function () {
        var bud = E.budget(st);
        var mine = kind === 'rev' ? bud.revLines[line.k] : bud.expLines[line.k];
        var pol = E.policyLineDeltas(st);
        var extra = (kind === 'rev' ? pol.rev[line.k] : pol.exp[line.k]) || 0;
        var n = (kind === 'rev' ? pol.count.rev[line.k] : pol.count.exp[line.k]) || 0;
        var total = kind === 'rev' ? bud.totalRev : bud.totalExp;
        mine = (mine || 0) + extra;
        var share = total ? mine / total * 100 : 0;
        var gdp = mine / st.gdpN * 100;

        U.clear(shareEl);
        U.append(shareEl, [
          el('span', { class: 'bs-pct', title: 'Anteil an den ' + (kind === 'rev' ? 'Gesamteinnahmen' : 'Gesamtausgaben'),
            text: U.n1(share) + ' %' }),
          el('span', { class: 'bs-gdp', title: 'Anteil am Bruttoinlandsprodukt', text: U.n1(gdp) + ' % BIP' }),
          n ? el('span', {
            class: 'bs-pol',
            style: { color: (kind === 'rev' ? (extra > 0 ? 'var(--green)' : 'var(--red)') : 'var(--violet)') },
            title: n + ' beschlossene Maßnahme' + (n > 1 ? 'n' : '') + ' aus den Ressorts wirken auf diesen Posten.',
            text: U.sign(extra, 0) + ' aus ' + n + ' Maßnahme' + (n > 1 ? 'n' : '')
          }) : null
        ]);
      };

      /* Zeigt neben dem eingestellten Wert an, was davon tatsächlich
         ankommt, und warnt, sobald der Posten überdehnt wird. */
      var setNow = function (v) {
        var d = v - line.base;
        nowEl.style.color = Math.abs(d) < 0.5 ? 'var(--tx)' : (
          kind === 'rev' ? (d > 0 ? 'var(--green)' : 'var(--red)') : (d > 0 ? 'var(--amber)' : 'var(--cy)'));
        U.clear(warnEl);
        if (row) row.classList.remove('strained');

        if (kind === 'rev' && line.elast) {
          var yield_ = E.revYield(st, line, v);
          var lost = v - yield_;
          nowEl.textContent = U.n0(yield_ * sc);
          var w = E.revStrainWeight(line, v);
          if (lost > 2) {
            U.append(warnEl, el('span', { class: 'bw-lost',
              title: 'Eingestellt ' + U.n0(v * sc) + ' Mrd., davon gehen ' + U.n0(lost * sc) +
                     ' Mrd. durch Hinterziehung, Verlagerung und Ausweichen verloren.' },
              [U.n0(v * sc) + ' eingestellt, davon ' + U.n0(lost * sc) + ' Mrd. nicht einholbar']));
          }
          if (w > 0) {
            if (row) row.classList.add('strained');
            U.append(warnEl, el('span', { class: 'bw-strain', title: line.strainNote || '',
              text: '⚠ überdehnt um ' + U.n0(((v - line.base) / line.base - 0.25) * 100) + ' Punkte' }));
          }
        } else {
          nowEl.textContent = U.n0(v * sc);
          var c = E.expCutWeight(line, v);
          if (c > 0) {
            if (row) row.classList.add('strained');
            U.append(warnEl, el('span', { class: 'bw-strain', title: line.cutNote || '',
              text: '⚠ Unterversorgung: ' + U.n0((line.base - v) / line.base * 100) + ' % gekürzt' }));
          }
        }
      };

      var slider;
      if (line.locked) {
        slider = el('div', { class: 'xsmall faint', text: line.lockNote || 'nicht direkt steuerbar' });
      } else {
        slider = el('input', {
          type: 'range', min: line.min, max: line.max, step: line.step || 5, value: cur,
          oninput: function (e) {
            var v = parseFloat(e.target.value);
            if (kind === 'rev') st.budget.rev[line.k] = v; else st.budget.exp[line.k] = v;
            setNow(v); refresh();
          }
        });
      }

      row = el('div', { class: 'bline' + (line.locked ? ' locked' : ''), title: line.note || '' }, [
        el('div', { class: 'bl-name' }, [line.label, line.locked ? el('span', { class: 'lock', text: '⊘' }) : null]),
        el('div', { class: 'bl-base mono', text: U.n0(line.base * sc) }),
        slider,
        nowEl,
        shareEl,
        warnEl
      ]);
      setNow(cur);
      setShare();
      shareUpdaters.push(setShare);
      if (line.k === 'interest') { nowEl.textContent = U.n0(E.interest(st)); nowEl.style.color = 'var(--red)'; }
      return row;
    }

    function headRow() {
      return el('div', { class: 'bline bl-head' }, [
        el('div', { class: 'hud-label', text: 'Position' }),
        el('div', { class: 'hud-label', style: { textAlign: 'right' }, text: 'Basis' }),
        el('div', { class: 'hud-label', text: 'Regler' }),
        el('div', { class: 'hud-label', style: { textAlign: 'right' }, text: 'Neu' }),
        el('div', { class: 'hud-label', text: 'Anteil · Ressorts' })
      ]);
    }

    /* Was sich keinem einzelnen Posten zuordnen lässt, wird
       ausgewiesen statt stillschweigend untergebracht. */
    function otherRow(kind) {
      var pol = E.policyLineDeltas(st);
      var v = kind === 'rev' ? pol.revOther : pol.expOther;
      if (Math.abs(v) < 0.5) return null;
      return el('div', { class: 'bline bl-other' }, [
        el('div', { class: 'bl-name', text: 'Aus Ressortentscheidungen, ohne festen Posten' }),
        el('div', { class: 'bl-base mono', text: '–' }),
        el('div', { class: 'xsmall faint', text: 'ergibt sich aus beschlossenen Maßnahmen' }),
        el('div', { class: 'bl-now mono', style: { color: v > 0 ? 'var(--green)' : 'var(--amber)' }, text: U.sign(v, 0) }),
        el('div', { class: 'bl-share mono' })
      ]);
    }

    var revPanel = X.panel('Einnahmen', [headRow()]
      .concat(B.REVENUE.map(function (r) { return lineRow(r, 'rev'); }))
      .concat([otherRow('rev')]), { bodyStyle: { padding: '4px 6px 10px' } });

    var expPanel = X.panel('Ausgaben', [headRow()]
      .concat(B.SPENDING.map(function (e) { return lineRow(e, 'exp'); }))
      .concat([otherRow('exp')]), { bodyStyle: { padding: '4px 6px 10px' } });

    /* Untereinander statt nebeneinander: Mit Anteil, BIP-Quote und der
       Wirkung der Ressortentscheidungen braucht eine Haushaltszeile die
       volle Breite, sonst wird die rechte Spalte abgeschnitten. */
    host.appendChild(el('div', { class: 'col gap12' }, [revPanel, expPanel]));

    /* Nachvollziehbare finanzielle Wirkung aller Entscheidungen */
    var finance = E.decisionFinanceSummary(st);
    var recurringRows = (st.decisionFinance || []).filter(function (entry) {
      return entry.active !== false && ((entry.recurringPlus || 0) || (entry.recurringMinus || 0));
    });
    var oneoffRows = (st.decisionFinance || []).filter(function (entry) {
      return (entry.oneoffPlus || 0) || (entry.oneoffMinus || 0);
    }).slice().reverse();
    var fiscalPolicies = Object.keys(st.enacted).map(E.byId).filter(function (p) {
      return p && p.fiscal && ((p.fiscal.rev || 0) !== 0 || (p.fiscal.exp || 0) !== 0);
    });

    function balanceCards(summary, suffix) {
      return el('div', { class: 'decision-balance' }, [
        el('div', { class: 'db-card plus' }, [
          el('span', { class: 'hud-label', text: '+ gemacht' }),
          el('strong', { text: '+ ' + U.lkr(summary.plus) }),
          el('small', { text: suffix })
        ]),
        el('div', { class: 'db-card minus' }, [
          el('span', { class: 'hud-label', text: '− gemacht' }),
          el('strong', { text: '− ' + U.lkr(summary.minus) }),
          el('small', { text: suffix })
        ]),
        el('div', { class: 'db-card total ' + (summary.total >= 0 ? 'positive' : 'negative') }, [
          el('span', { class: 'hud-label', text: 'Total' }),
          el('strong', { text: U.lkrS(summary.total) }),
          el('small', { text: suffix })
        ])
      ]);
    }

    function financeTable(rows, recurring) {
      return rows.length ? el('table', { class: 'dtable decision-finance-table' }, [
        el('thead', {}, el('tr', {}, [
          el('th', { text: 'Entscheidung' }), el('th', { text: 'Zeitpunkt' }),
          el('th', { class: 'num', text: '+' }), el('th', { class: 'num', text: '−' }),
          el('th', { class: 'num', text: 'Total' })
        ])),
        el('tbody', {}, rows.map(function (entry) {
          var plus = (recurring ? entry.recurringPlus * sc : entry.oneoffPlus) || 0;
          var minus = (recurring ? entry.recurringMinus * sc : entry.oneoffMinus) || 0;
          var total = plus - minus;
          return el('tr', {}, [
            el('td', {}, [el('strong', { text: entry.title }), entry.decision ? el('div', { class: 'xsmall faint', text: entry.decision }) : null]),
            el('td', { class: 'mono xsmall', text: entry.year && entry.q ? U.qLabel(entry.year, entry.q) : ('Q' + ((entry.turn || 0) + 1)) }),
            el('td', { class: 'num', style: { color: plus ? 'var(--green)' : '' }, text: plus ? ('+' + U.lkr(plus)) : '–' }),
            el('td', { class: 'num', style: { color: minus ? 'var(--red)' : '' }, text: minus ? ('−' + U.lkr(minus)) : '–' }),
            el('td', { class: 'num', style: { color: total >= 0 ? 'var(--green)' : 'var(--red)' }, text: U.lkrS(total) })
          ]);
        }))
      ]) : el('div', { class: 'faint small', text: 'Noch keine finanzwirksamen Entscheidungen in dieser Kategorie.' });
    }

    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Entscheidungsbilanz · laufende Jahreswirkung', [
        balanceCards(finance.recurring, 'LKR pro Jahr'),
        financeTable(recurringRows, true),
        el('div', { class: 'decision-once-head' }, [
          el('div', {}, [
            el('div', { class: 'hud-title', text: 'Einmalige Wirkungen bisher' }),
            el('div', { class: 'xsmall faint', text: 'Kosten, Zuschüsse, Hilfen und Erlöse aus Maßnahmen und Ereignisentscheidungen.' })
          ])
        ]),
        balanceCards(finance.oneoff, 'LKR einmalig'),
        financeTable(oneoffRows, false),
        el('div', { style: { marginTop: '10px' } }, [
          el('button', { class: 'tiny', text: 'Haushaltsmaßnahmen durchsehen', onclick: function () { SL.app.go('p_budget'); } })
        ])
      ])
    ]));

    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Haushaltswirkung beschlossener Maßnahmen', [
        fiscalPolicies.length ? el('table', { class: 'dtable' }, [
          el('thead', {}, el('tr', {}, [
            el('th', { text: 'Maßnahme' }), el('th', { text: 'Bereich' }), el('th', { text: 'Haushaltsposten' }),
            el('th', { class: 'num', text: 'Einnahmen' }), el('th', { class: 'num', text: 'Ausgaben' }),
            el('th', { class: 'num', text: 'Saldo' })
          ])),
          el('tbody', {}, fiscalPolicies.map(function (p) {
            var r = (p.fiscal.rev || 0) * sc, x = (p.fiscal.exp || 0) * sc, s = r - x;
            var lineLabels = [];
            if (p.fiscal.rev && p.fline) {
              var rl = B.REVENUE.filter(function (line) { return line.k === p.fline; })[0];
              if (rl) lineLabels.push(rl.label);
            }
            if (p.fiscal.exp) {
              var xk = (p.fline && st.budget.exp[p.fline] !== undefined) ? p.fline : E.expLineFor(p.cat);
              var xl = B.SPENDING.filter(function (line) { return line.k === xk; })[0];
              if (xl && lineLabels.indexOf(xl.label) < 0) lineLabels.push(xl.label);
            }
            return el('tr', {}, [
              el('td', { text: p.title }),
              el('td', {}, [X.badge((M.DOMAIN_BY_KEY[p.cat] || {}).label || p.cat, '')]),
              el('td', { class: 'xsmall', style: { color: 'var(--violet)' },
                text: lineLabels.length ? lineLabels.join(' · ') : 'ohne festen Posten' }),
              el('td', { class: 'num', style: { color: r > 0 ? 'var(--green)' : (r < 0 ? 'var(--red)' : '') }, text: r ? U.sign(r, 0) : '–' }),
              el('td', { class: 'num', style: { color: x > 0 ? 'var(--amber)' : (x < 0 ? 'var(--cy)' : '') }, text: x ? U.sign(x, 0) : '–' }),
              el('td', { class: 'num', style: { color: s >= 0 ? 'var(--green)' : 'var(--red)' }, text: U.sign(s, 0) })
            ]);
          }))
        ]) : el('div', { class: 'faint small', text: 'Bislang wirkt keine beschlossene Maßnahme auf den Haushalt.' })
      ])
    ]));

    refresh();
  };

  /* =========================================================
     SOFORTMASSNAHMEN

     Alles, was in den vergangenen Quartalen schiefgelaufen ist,
     steht hier als offener Missstand, zusammen mit den Mitteln,
     die dagegen helfen. Solange nichts geschieht, richtet jeder
     offene Punkt weiter Schaden an.
     ========================================================= */
  V.setbacks = function (st, host) {
    var open = E.openSetbacks(st);

    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Sofortmaßnahmen' }),
        el('div', { class: 'sub', text: 'Was in den vergangenen Quartalen schiefgelaufen ist, steht hier so lange, bis Sie etwas dagegen tun. Jeder offene Punkt richtet weiter Schaden an. Sofortmaßnahmen wirken ohne Umsetzungsfrist, kosten politisches Kapital und haben Folgen, die Sie mit einplanen sollten.' })
      ]),
      el('div', { class: 'head-actions' }, [
        el('div', { class: 'col', style: { textAlign: 'right' } }, [
          el('div', { class: 'hud-label', text: 'Politisches Kapital' }),
          el('div', { class: 'mono', style: { fontSize: '17px', color: 'var(--cy-bright)' }, text: U.n0(st.pc) })
        ])
      ])
    ]));

    if (!open.length) {
      host.appendChild(X.panel('Lage', [
        X.note('Zurzeit ist kein Missstand offen. Wenn ein Quartal schlecht ausgeht, erscheinen die Gegenmaßnahmen hier.', 'good'),
        st.setbackSeen && Object.keys(st.setbackSeen).length
          ? el('div', { style: { marginTop: '12px' } }, [
              el('div', { class: 'hud-label', style: { marginBottom: '6px' }, text: 'Im Lauf der Amtszeit bereits bewältigt' }),
              el('div', { class: 'row gap6 wrap' }, Object.keys(st.setbackSeen).map(function (k) {
                var m = SL.data.setbacks.BY_KEY[k];
                return m ? X.badge(m.label + ' ×' + st.setbackSeen[k], '') : null;
              }))
            ])
          : null
      ]));
      return;
    }

    /* Überblick über den laufenden Schaden */
    var sev3 = open.filter(function (o) { return o.meta.sev >= 3; }).length;
    host.appendChild(el('div', { class: 'budget-summary', style: { marginBottom: '14px' } }, [
      X.tile({ label: 'Offene Missstände', value: open.length,
        tone: sev3 ? 'r' : 'a',
        foot: [el('span', { class: 'mono xsmall muted', text: sev3 ? sev3 + ' davon dringend' : 'keiner dringend' }) ] }),
      X.tile({ label: 'Ältester Punkt', value: (function () {
          var oldest = open.reduce(function (a, b) { return a.rec.since < b.rec.since ? a : b; });
          return (st.turn - oldest.rec.since) + ' Q';
        })(), unit: 'offen',
        tone: (st.turn - open.reduce(function (a, b) { return a.rec.since < b.rec.since ? a : b; }).rec.since) > 3 ? 'r' : 'a',
        foot: [el('span', { class: 'mono xsmall muted', text: 'je länger offen, desto teurer' })] }),
      X.tile({ label: 'Laufender Schaden', value: (function () {
          var n = 0; open.forEach(function (o) { n += Object.keys(o.meta.drift || {}).length; });
          return n;
        })(), unit: 'Indikatoren',
        tone: 'a',
        foot: [el('span', { class: 'mono xsmall muted', text: 'verschlechtern sich jedes Quartal' })] })
    ]));

    open.forEach(function (o) {
      var s = o.meta, age = st.turn - o.rec.since;

      var driftChips = Object.keys(s.drift || {}).map(function (k) {
        var meta = M.IND_BY_KEY[k];
        var v = s.drift[k];
        var bad = meta ? (meta.inv ? v > 0 : v < 0) : v < 0;
        return X.badge((meta ? meta.label : k) + ' ' + U.sign(v, 2) + '/Q', bad ? 'red' : 'green');
      });

      var fixes = s.fix.map(function (f, idx) {
        var chk = E.canRemedy(st, s.k, idx);
        var used = E.remedyUsed(st, s.k, idx);
        var costs = [];
        costs.push(X.badge(f.pc + ' PK', st.pc >= f.pc ? 'cy' : 'red'));
        if (f.fiscal && f.fiscal.exp) costs.push(X.badge('einmalig ' + U.n0(f.fiscal.exp) + ' Mrd.', 'amber'));
        if (f.fiscal && f.fiscal.rev) costs.push(X.badge('bringt ' + U.n0(f.fiscal.rev) + ' Mrd.', 'green'));
        if (f.budget) {
          if (f.budget.revScale) costs.push(X.badge('Einnahmen dauerhaft ' + U.sign((f.budget.revScale - 1) * 100, 0) + ' %', f.budget.revScale > 1 ? 'amber' : 'green'));
          if (f.budget.expScale) costs.push(X.badge('Ausgaben dauerhaft ' + U.sign((f.budget.expScale - 1) * 100, 0) + ' %', f.budget.expScale < 1 ? 'amber' : 'green'));
          if (f.budget.lines) {
            Object.keys(f.budget.lines).forEach(function (lk) {
              var line = B.REVENUE.concat(B.SPENDING).filter(function (x) { return x.k === lk; })[0];
              if (line) costs.push(X.badge(line.label + ' ' + U.sign((f.budget.lines[lk] - 1) * 100, 0) + ' %', 'violet'));
            });
          }
        }
        if (f.chance !== undefined) costs.push(X.badge('Erfolgsaussicht ' + U.n0(f.chance * 100) + ' %', f.chance > 0.7 ? 'amber' : 'red'));
        if (f.once) costs.push(X.badge(used ? 'verbraucht' : 'nur einmal', used ? 'red' : ''));

        return el('div', { class: 'ev-opt' + (chk.ok ? '' : ' disabled'),
          style: chk.ok ? null : { opacity: '.5', cursor: 'not-allowed' },
          onclick: chk.ok ? function () {
            var r = E.applyRemedy(st, s.k, idx);
            SL.state.save(st);
            if (r.ok && r.failed) X.toast('bad', 'Gescheitert', r.note);
            else if (r.ok) X.toast('good', 'Sofortmaßnahme ergriffen', f.t);
            SL.app.render();
          } : null }, [
          el('div', { class: 'eo-t', text: f.t }),
          el('div', { class: 'eo-d', text: f.d }),
          el('div', { class: 'row gap6 wrap', style: { marginTop: '7px' } },
            [X.effectChips(f.eff, 4)].concat(costs).concat(f.grp ? [X.groupChips(f.grp, 3)] : [])),
          chk.ok ? null : el('div', { class: 'xsmall', style: { color: 'var(--red)', marginTop: '6px' }, text: chk.why })
        ]);
      });

      host.appendChild(el('div', { style: { marginBottom: '14px' } }, [
        X.panel(s.label, [
          el('div', { class: 'row gap6 wrap', style: { marginBottom: '8px' } }, [
            X.badge(s.cat, 'cy'),
            X.badge(s.sev >= 3 ? 'dringend' : 'ernst', s.sev >= 3 ? 'red' : 'amber'),
            X.badge(age === 0 ? 'neu in diesem Quartal' : 'seit ' + age + ' Quartal' + (age > 1 ? 'en' : '') + ' offen',
              age > 3 ? 'red' : '')
          ]),
          el('div', { style: { fontSize: '13px', lineHeight: '1.7', marginBottom: '10px' }, text: s.desc }),
          driftChips.length ? el('div', { style: { marginBottom: '10px' } }, [
            el('div', { class: 'hud-label', style: { marginBottom: '5px' }, text: 'Schaden je Quartal, solange nichts geschieht' }),
            el('div', { class: 'row gap6 wrap' }, driftChips)
          ]) : null,
          el('div', { class: 'hud-label', style: { marginBottom: '6px' }, text: 'Was Sie dagegen tun können' }),
          el('div', { class: 'ev-opts' }, fixes)
        ], { class: s.sev >= 3 ? 'crit-frame' : null })
      ]));
    });
  };

  /* =========================================================
     INDIKATOREN
     ========================================================= */
  V.indicators = function (st, host) {
    var BM = SL.data.benchmarks;
    /* Der Vergleich bleibt über Ansichtswechsel hinweg an- oder
       ausgeschaltet, damit man nicht bei jedem Aufruf neu klickt. */
    if (V._bmOn === undefined) V._bmOn = true;

    var head = el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Indikatoren' }),
        el('div', { class: 'sub', text: 'Vollständige Übersicht aller Kennzahlen, gruppiert nach Bereichen. Der Pfeil zeigt die Veränderung gegenüber dem Vorquartal. Darunter steht, wo Sri Lanka im Vergleich zu sechs anderen Ländern liegt.' })
      ]),
      el('div', { class: 'head-actions' }, [
        el('button', {
          class: V._bmOn ? 'tiny' : 'tiny ghost',
          text: V._bmOn ? 'Ländervergleich ausblenden' : 'Ländervergleich einblenden',
          onclick: function () { V._bmOn = !V._bmOn; SL.app.render(); }
        })
      ])
    ]);
    host.appendChild(head);

    if (V._bmOn) {
      /* Legende: wer verglichen wird und warum gerade diese sechs */
      host.appendChild(el('div', { style: { marginBottom: '14px' } }, [
        X.panel('Verglichen wird mit', [
          el('div', { class: 'bm-countries' }, BM.COUNTRIES.map(function (c) {
            return el('div', { class: 'bm-country', title: c.desc }, [
              el('span', { class: 'bm-dot', style: { background: c.color } }),
              el('span', { class: 'bm-cname', text: c.name }),
              el('span', { class: 'bm-cgdp', title: 'Bruttoinlandsprodukt je Kopf, gerundet', text: U.n0(c.gdpPc / 1000) + 'k $' }),
              el('span', { class: 'bm-cdesc', text: c.desc })
            ]);
          }).concat([
            el('div', { class: 'bm-country self' }, [
              el('span', { class: 'bm-dot', style: { background: 'var(--cy-bright)' } }),
              el('span', { class: 'bm-cname', text: 'Sri Lanka' }),
              el('span', { class: 'bm-cgdp', title: 'Bruttoinlandsprodukt je Kopf, gerundet', text: '4,5k $' }),
              el('span', { class: 'bm-cdesc', text: 'Ihr laufender Stand, ' + U.qLabel(st.year, st.q) + '. Der Balken bewegt sich mit jedem Quartal.' })
            ])
          ])),
          X.note('Die Vergleichswerte sind gerundete Größenordnungen für 2025/26 aus öffentlich berichteten Quellen und bilden Verhältnisse ab, keine amtliche Statistik. Ein Stern hinter einem Wert bedeutet, dass die nackte Zahl in die Irre führt: Fahren Sie mit der Maus darüber. Fünfzehn der sechzig Indikatoren messen etwas, das es nur in Sri Lanka gibt, etwa das Vertrauen der Malaiyaha-Tamilen oder das Verhältnis zu Indien. Für die wird kein Vergleichswert erfunden.', '')
        ])
      ]));
    }

    var grid = el('div', { class: V._bmOn ? 'col gap12' : 'grid g2' });
    M.IND_GROUPS.forEach(function (g) {
      var list = M.INDICATORS.filter(function (m) { return m.g === g.k; });
      grid.appendChild(X.panel(g.icon + '  ' + g.label, [
        el('div', { class: V._bmOn ? 'bm-list' : '' }, list.map(function (meta) {
          var v = st.ind[meta.k];
          var base = B.INDICATORS[meta.k];
          var rank = V._bmOn ? BM.rank(st, meta.k) : null;

          var m = X.meter({
            label: meta.label, value: v, min: meta.min, max: meta.max, inv: meta.inv,
            text: X.fmtInd(meta, v) + ' ' + (meta.unit && meta.fmt !== 'pct' ? meta.unit.replace('Index', '') : ''),
            delta: v - base, hint: meta.desc + '  |  Ausgangswert 2026: ' + X.fmtInd(meta, base)
          });
          if (!V._bmOn) return m;

          return el('div', { class: 'bm-row' }, [
            el('div', { class: 'bm-row-top' }, [
              el('div', { class: 'grow' }, [m]),
              rank ? el('span', {
                class: 'bm-rank ' + (rank.pos <= 2 ? 'g' : (rank.pos <= 4 ? 'a' : 'r')),
                title: 'Rang ' + rank.pos + ' von ' + rank.of + ' im Vergleich: ' +
                       rank.order.map(function (o) { return o.k; }).join(' › '),
                text: rank.pos + '. von ' + rank.of
              }) : null
            ]),
            X.benchmarkBar(st, meta)
          ]);
        }))
      ]));
    });
    host.appendChild(grid);
  };

  /* =========================================================
     PROTOKOLL
     ========================================================= */
  V.log = function (st, host) {
    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Protokoll' }),
        el('div', { class: 'sub', text: 'Chronik Ihrer Amtszeit.' })
      ])
    ]));
    host.appendChild(X.panel(null, [
      el('div', { class: 'log-list' }, st.log.map(function (l) {
        return el('div', { class: 'log-item ' + l.kind }, [
          el('span', { class: 'lg-time', text: l.t }),
          el('span', { text: l.text })
        ]);
      })),
      st.log.length ? null : el('div', { class: 'faint small', text: 'Noch keine Einträge.' })
    ]));
  };

  /* =========================================================
     KABINETT UND BEHÖRDEN
     ========================================================= */
  V.cabinetOverview = function (st, host) {
    var Gov = SL.data.governance;

    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Kabinett und Behörden' }),
        el('div', { class: 'sub', text: 'Sie regieren nicht selbst, sondern durch Ministerien und nachgeordnete Behörden. Jedes Quartal arbeitet eines davon sichtbar ab — gut oder schlecht. Ein schwaches Haus kostet dauerhaft Wirkung, und dagegen hilft nur eine Entlassung. Die Namen sind erfunden.' })
      ]),
      el('div', { class: 'head-actions' }, [
        el('div', { class: 'col', style: { textAlign: 'right' } }, [
          el('div', { class: 'hud-label', text: 'Politisches Kapital' }),
          el('div', { class: 'mono', style: { fontSize: '17px', color: 'var(--cy-bright)' }, text: U.n0(st.pc) })
        ])
      ])
    ]));

    var ministers = Gov.MINISTRIES.map(function (m) { return { def: m, c: st.cabinet[m.k] }; })
      .filter(function (x) { return x.c; });
    var weak = ministers.filter(function (x) { return x.c.performance < 38; }).length;
    var scandals = ministers.filter(function (x) { return x.c.scandal; }).length;
    var avg = ministers.length
      ? ministers.reduce(function (a, x) { return a + x.c.performance; }, 0) / ministers.length : 0;

    host.appendChild(el('div', { class: 'budget-summary', style: { marginBottom: '14px' } }, [
      X.tile({ label: 'Durchschnittliche Leistung', value: U.n0(avg), unit: 'von 100',
        tone: avg < 45 ? 'r' : (avg < 58 ? 'a' : 'g'),
        foot: [el('span', { class: 'mono xsmall muted', text: 'wirkt auf jedes Quartalsergebnis' })] }),
      X.tile({ label: 'Schwache Ressorts', value: weak, unit: 'von ' + ministers.length,
        tone: weak ? 'r' : 'g',
        foot: [el('span', { class: 'mono xsmall muted', text: weak ? 'unter 38 Punkten' : 'keines unter 38' })] }),
      X.tile({ label: 'Offene Skandale', value: scandals,
        tone: scandals ? 'r' : 'g',
        foot: [el('span', { class: 'mono xsmall muted', text: scandals ? 'Entlassung möglich' : 'derzeit keiner' })] })
    ]));

    /* --- Kabinett --- */
    host.appendChild(X.panel('Kabinett', ministers.map(function (x) {
      var c = x.c, def = x.def;
      var chk = E.canDismissMinister(st, def.k);
      var tone = c.performance < 38 ? 'red' : (c.performance < 55 ? 'amber' : 'green');

      return el('div', { class: 'ev-opt', style: { cursor: 'default' } }, [
        el('div', { class: 'row', style: { justifyContent: 'space-between', alignItems: 'baseline' } }, [
          el('div', { class: 'eo-t', text: c.name + ' — ' + def.office }),
          el('div', { class: 'mono', style: { color: 'var(--' + (tone === 'red' ? 'red' : (tone === 'amber' ? 'amber' : 'green')) + ')' },
            text: U.n0(c.performance) })
        ]),
        el('div', { class: 'eo-d', text: def.ministry }),
        el('div', { class: 'row gap6 wrap', style: { marginTop: '7px' } }, [
          X.badge('Erfolge ' + c.successes, c.successes ? 'green' : ''),
          X.badge('Fehlschläge ' + c.failures, c.failures >= 2 ? 'red' : ''),
          c.generation ? X.badge(c.generation + '. Besetzung', 'violet') : null,
          c.scandal ? X.badge('Skandal', 'red') : null
        ]),
        c.scandal ? el('div', { class: 'xsmall', style: { color: 'var(--red)', marginTop: '6px' }, text: c.scandal.text }) : null,
        el('div', { style: { marginTop: '8px' } }, [
          el('button', {
            class: chk.ok ? 'danger' : 'disabled',
            disabled: chk.ok ? null : 'disabled',
            text: 'Entlassen (6 PK)',
            onclick: chk.ok ? function () {
              var r = E.dismissMinister(st, def.k);
              SL.state.save(st);
              if (r.ok) X.toast('good', 'Kabinett umgebildet', r.oldName + ' geht, ' + r.newName + ' übernimmt.');
              else X.toast('bad', 'Nicht möglich', r.why);
              SL.app.render();
            } : null
          }),
          chk.ok ? null : el('div', { class: 'xsmall muted', style: { marginTop: '5px' }, text: chk.why })
        ])
      ]);
    })));

    /* --- Behörden --- */
    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Nachgeordnete Behörden', [
        X.note('Behörden lassen sich nicht entlassen. Ihre Leistung hängt an der Verwaltungskraft des Staates — sie steigt mit Maßnahmen, die den Staatsapparat stärken.', ''),
        el('div', { style: { marginTop: '10px' } }, Gov.INSTITUTIONS.map(function (def) {
          var a = st.institutions[def.k];
          if (!a) return null;
          var tone = a.performance < 38 ? 'red' : (a.performance < 55 ? 'amber' : 'green');
          return el('div', { class: 'row', style: { justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--line)' } }, [
            el('div', { style: { fontSize: '13px' }, text: def.name }),
            el('div', { class: 'row gap6' }, [
              X.badge('Erfolge ' + a.successes, a.successes ? 'green' : ''),
              X.badge('Fehlschläge ' + a.failures, a.failures >= 2 ? 'red' : ''),
              el('span', { class: 'mono', style: { color: 'var(--' + (tone === 'red' ? 'red' : (tone === 'amber' ? 'amber' : 'green')) + ')', minWidth: '28px', textAlign: 'right' },
                text: U.n0(a.performance) })
            ])
          ]);
        }))
      ])
    ]));

    /* --- Was der Apparat zuletzt geliefert hat --- */
    var histRows = (st.governanceHistory || []).slice(0, 12);
    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Zuletzt aus dem Regierungsapparat', histRows.length ? histRows.map(function (o) {
        return el('div', { style: { padding: '8px 0', borderBottom: '1px solid var(--line)' } }, [
          el('div', { class: 'row gap6', style: { marginBottom: '3px' } }, [
            X.badge('Q' + (o.turn + 1), ''),
            X.badge(o.kind === 'good' ? 'Erfolg' : 'Fehlschlag', o.kind === 'good' ? 'green' : 'red'),
            o.scandal ? X.badge('Skandal', 'red') : null
          ]),
          el('div', { style: { fontSize: '13px' }, text: o.title }),
          el('div', { class: 'xsmall muted', text: o.text })
        ]);
      }) : [el('div', { class: 'faint small', text: 'Noch nichts. Nach dem ersten Quartalswechsel steht hier, was die Ministerien geliefert haben.' })])
    ]));
  };

})(SL.views = SL.views || {});
