/* ============================================================
   ANSICHTEN  -  Lagezentrum, Lagebild, Haushalt, Indikatoren
   ============================================================ */
(function (V) {
  'use strict';
  var U = SL.util, X = SL.ui, M = SL.model, E = SL.engine, B = SL.data.baseline, el = U.el;

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
    var need = st.seatsGov;
    right.appendChild(X.panel('Parlament', [
      el('div', { class: 'row between', style: { marginBottom: '8px' } }, [
        el('span', { class: 'mono', style: { fontSize: '20px', color: 'var(--cy-bright)' }, text: need + ' / 225' }),
        el('div', { class: 'col', style: { alignItems: 'flex-end' } }, [
          el('span', { class: 'xsmall', style: { color: need >= 150 ? 'var(--green)' : 'var(--red)' },
            text: need >= 150 ? 'Zweidrittelmehrheit vorhanden' : 'keine Zweidrittelmehrheit' }),
          el('span', { class: 'xsmall', style: { color: need >= 113 ? 'var(--green)' : 'var(--red)' },
            text: need >= 113 ? 'einfache Mehrheit vorhanden' : 'keine einfache Mehrheit' })
        ])
      ]),
      X.seatmap(need, 225),
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

    var summary = el('div', { class: 'budget-summary', style: { marginBottom: '14px' } });
    var gapNote = el('div', { style: { marginBottom: '10px' } });
    var strainBox = el('div', { style: { marginBottom: '14px' } });

    function refresh() {
      E.recomputeIndex(st);
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
      var warnEl = el('div', { class: 'bl-warn' });
      var row;

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
        warnEl
      ]);
      setNow(cur);
      if (line.k === 'interest') { nowEl.textContent = U.n0(E.interest(st)); nowEl.style.color = 'var(--red)'; }
      return row;
    }

    var revPanel = X.panel('Einnahmen', [
      el('div', { class: 'bline', style: { borderBottom: '1px solid var(--line-soft)' } }, [
        el('div', { class: 'hud-label', text: 'Position' }),
        el('div', { class: 'hud-label', style: { textAlign: 'right' }, text: 'Basis' }),
        el('div', { class: 'hud-label', text: 'Regler' }),
        el('div', { class: 'hud-label', style: { textAlign: 'right' }, text: 'Neu' })
      ])
    ].concat(B.REVENUE.map(function (r) { return lineRow(r, 'rev'); })), { bodyStyle: { padding: '4px 6px 10px' } });

    var expPanel = X.panel('Ausgaben', [
      el('div', { class: 'bline', style: { borderBottom: '1px solid var(--line-soft)' } }, [
        el('div', { class: 'hud-label', text: 'Position' }),
        el('div', { class: 'hud-label', style: { textAlign: 'right' }, text: 'Basis' }),
        el('div', { class: 'hud-label', text: 'Regler' }),
        el('div', { class: 'hud-label', style: { textAlign: 'right' }, text: 'Neu' })
      ])
    ].concat(B.SPENDING.map(function (e) { return lineRow(e, 'exp'); })), { bodyStyle: { padding: '4px 6px 10px' } });

    host.appendChild(el('div', { class: 'grid g2' }, [revPanel, expPanel]));

    /* Wirkung beschlossener Maßnahmen auf den Haushalt */
    var fiscalPolicies = Object.keys(st.enacted).map(E.byId).filter(function (p) {
      return p && p.fiscal && ((p.fiscal.rev || 0) !== 0 || (p.fiscal.exp || 0) !== 0);
    });
    host.appendChild(el('div', { style: { marginTop: '14px' } }, [
      X.panel('Haushaltswirkung beschlossener Maßnahmen', [
        fiscalPolicies.length ? el('table', { class: 'dtable' }, [
          el('thead', {}, el('tr', {}, [
            el('th', { text: 'Maßnahme' }), el('th', { text: 'Bereich' }),
            el('th', { class: 'num', text: 'Einnahmen' }), el('th', { class: 'num', text: 'Ausgaben' }),
            el('th', { class: 'num', text: 'Saldo' })
          ])),
          el('tbody', {}, fiscalPolicies.map(function (p) {
            var r = (p.fiscal.rev || 0) * sc, x = (p.fiscal.exp || 0) * sc, s = r - x;
            return el('tr', {}, [
              el('td', { text: p.title }),
              el('td', {}, [X.badge((M.DOMAIN_BY_KEY[p.cat] || {}).label || p.cat, '')]),
              el('td', { class: 'num', style: { color: r > 0 ? 'var(--green)' : (r < 0 ? 'var(--red)' : '') }, text: r ? U.sign(r, 0) : '–' }),
              el('td', { class: 'num', style: { color: x > 0 ? 'var(--amber)' : (x < 0 ? 'var(--cy)' : '') }, text: x ? U.sign(x, 0) : '–' }),
              el('td', { class: 'num', style: { color: s >= 0 ? 'var(--green)' : 'var(--red)' }, text: U.sign(s, 0) })
            ]);
          }))
        ]) : el('div', { class: 'faint small', text: 'Bislang wirkt keine beschlossene Maßnahme auf den Haushalt.' }),
        el('div', { style: { marginTop: '10px' } }, [
          el('button', { class: 'tiny', text: 'Haushaltsmaßnahmen durchsehen', onclick: function () { SL.app.go('p_budget'); } })
        ])
      ])
    ]));

    refresh();
  };

  /* =========================================================
     INDIKATOREN
     ========================================================= */
  V.indicators = function (st, host) {
    host.appendChild(el('div', { class: 'view-head' }, [
      el('div', {}, [
        el('h2', { text: 'Indikatoren' }),
        el('div', { class: 'sub', text: 'Vollständige Übersicht aller Kennzahlen, gruppiert nach Bereichen. Der Pfeil zeigt die Veränderung gegenüber dem Vorquartal.' })
      ])
    ]));

    var grid = el('div', { class: 'grid g2' });
    M.IND_GROUPS.forEach(function (g) {
      var list = M.INDICATORS.filter(function (m) { return m.g === g.k; });
      grid.appendChild(X.panel(g.icon + '  ' + g.label, [
        el('div', {}, list.map(function (meta) {
          var v = st.ind[meta.k];
          var base = B.INDICATORS[meta.k];
          var d = v - base;
          return X.meter({
            label: meta.label, value: v, min: meta.min, max: meta.max, inv: meta.inv,
            text: X.fmtInd(meta, v) + ' ' + (meta.unit && meta.fmt !== 'pct' ? meta.unit.replace('Index', '') : ''),
            delta: d, hint: meta.desc + '  |  Ausgangswert 2026: ' + X.fmtInd(meta, base)
          });
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

})(SL.views = SL.views || {});
