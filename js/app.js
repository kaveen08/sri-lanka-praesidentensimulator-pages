/* ============================================================
   ANWENDUNG  -  Rahmen, Navigation, Rundenlauf
   ============================================================ */
(function (A) {
  'use strict';
  var U = SL.util, X = SL.ui, M = SL.model, E = SL.engine, St = SL.state, V = SL.views, el = U.el;

  var st = null;
  var current = 'dashboard';

  /* ---------------------------------------------------------
     Ansichtsregister
     --------------------------------------------------------- */
  var VIEWS = {};

  function buildViews() {
    VIEWS.dashboard = V.dashboard;
    VIEWS.problems = V.problems;
    VIEWS.indicators = V.indicators;
    VIEWS.log = V.log;
    VIEWS.budget = V.budget;
    VIEWS.devolution = V.devolution;
    VIEWS.parties = V.parties;
    VIEWS.risks = V.risks;
    VIEWS.report = V.report;

    VIEWS.p_budget = V.makePolicyView({
      key: 'budget', cats: ['budget'],
      title: 'Steuern und Haushaltsmaßnahmen',
      sub: 'Einzelentscheidungen mit festen Beträgen, ergänzend zu den Reglern im Haushalt. Der Staat braucht mehr Einnahmen, kann eine Bevölkerung nach einer extremen Krise aber nicht beliebig stärker belasten. Die eigentliche Aufgabe ist eine breitere Basis, weniger Hinterziehung und eine digitalisierte Verwaltung.'
    });
    VIEWS.p_state = V.makePolicyView({
      key: 'state', cats: ['state'],
      title: 'Staatsform, Verfassung, Wahlrecht',
      sub: 'Von der Abschaffung der Exekutivpräsidentschaft über das Wahlsystem bis zur föderalen Ordnung. Beachten Sie die Mehrheitserfordernisse: Verfassungsänderungen brauchen 150 Sitze, die durch Artikel 83 geschützten Bestimmungen zusätzlich eine Volksabstimmung.'
    });
    VIEWS.p_identity = V.makePolicyView({
      key: 'identity', cats: ['identity'],
      title: 'Ethnie, Religion, Kaste, Sprache',
      sub: 'Der Krieg endete 2009, der politische Konflikt nicht. Hier finden Sie Vorschläge von tamilisch-föderalistisch bis sinhalesisch-nationalistisch, dazu Kaste, Plantagenarbeiterschaft, Religionsrecht und Aufarbeitung.'
    });
    VIEWS.p_military = V.makePolicyView({
      key: 'military', cats: ['military'],
      title: 'Verteidigung und Sicherheit',
      sub: 'Rund 200.000 Soldaten siebzehn Jahre nach Kriegsende, militärische Wirtschaftsbetriebe, Präsenz im Norden, Polizeireform und Veteranenfürsorge.',
      extra: V.militaryExtra
    });
    VIEWS.p_justice = V.makePolicyView({
      key: 'justice', cats: ['justice'],
      title: 'Judikative, Justizministerium, Integrität',
      sub: 'Gerichte, Richterernennung, Strafvollzug, Anklagebehörde und Korruptionsbekämpfung. Viele dieser Maßnahmen sind Voraussetzung dafür, dass Vorhaben in anderen Ressorts überhaupt wirken: ohne einzugsfähige Verwaltung keine Steuer, ohne Grundbuch keine Landreform, ohne Anklagebehörde kein Korruptionsverfahren.'
    });
    VIEWS.p_transport = V.makePolicyView({
      key: 'transport', cats: ['transport'],
      title: 'Öffentlicher Verkehr und Mobilität',
      sub: 'Bahn, Bus und Stadtverkehr, landesweit wie regional. Rund 1.500 km Schienennetz aus der Kolonialzeit, eine defizitäre staatliche Busgesellschaft und rund 20.000 private Busse ohne gemeinsamen Fahrplan. Wer keinen Bus hat, erreicht weder Facharzt noch Oberstufe noch Arbeitsmarkt.'
    });
    VIEWS.p_climate = V.makePolicyView({
      key: 'climate', cats: ['climate'],
      title: 'Klima, Anpassung, Katastrophenschutz',
      sub: 'Zyklon Ditwah verursachte im November 2025 rund 4,1 Mrd. USD Schaden, etwa 4 % des BIP. Ohne Anpassung könnten klimabedingte Verluste bis 2050 rund 3,5 % des BIP jährlich erreichen. Klimapolitik ist hier Wirtschaftspolitik.'
    });
    VIEWS.p_education = V.makePolicyView({
      key: 'education', cats: ['education'],
      title: 'Bildung',
      sub: 'Kostenlose Schulbildung und hohe Alphabetisierung sind Sri Lankas größtes Kapital. Trotzdem passen Abschlüsse und Arbeitsmarkt kaum zusammen, Englisch bleibt ein Klassenmerkmal, und die Universitäten nehmen nur einen Bruchteil der Qualifizierten auf.'
    });
    VIEWS.p_health = V.makePolicyView({
      key: 'health', cats: ['health'],
      title: 'Gesundheit und Ernährung',
      sub: 'Ein kostenloses staatliches System mit guten Kennzahlen, das seit der Krise an Medikamentenmangel, Abwanderung von Fachpersonal und Unterfinanzierung leidet. Dazu Mangelernährung bei Kindern und die chronische Nierenerkrankung unbekannter Ursache in der Trockenzone.'
    });
    VIEWS.p_social = V.makePolicyView({
      key: 'social', cats: ['social'],
      title: 'Soziales und Gleichberechtigung',
      sub: 'Aswesuma erreicht einen Teil der Bedürftigen, aber Zielgenauigkeit und Höhe sind umstritten. Dazu Alterssicherung ohne Beitragsbasis, eine der niedrigsten Erwerbsquoten von Frauen in Südasien und der Schutz der Arbeitsmigrantinnen im Golfraum.'
    });
    VIEWS.p_economy = V.makePolicyView({
      key: 'economy', cats: ['economy'],
      title: 'Wirtschaft und Arbeit',
      sub: 'Bürokratieabbau, Arbeitsrecht, Exportzonen, Tourismus, IT-Dienstleistungen, Mittelstandsfinanzierung, Handelspolitik gegenüber Indien und Mindestlohn. Der Privatsektor ist nach der Krise vorsichtig und investiert wenig.'
    });
    VIEWS.p_agri = V.makePolicyView({
      key: 'agri', cats: ['agri'],
      title: 'Landwirtschaft und Fischerei',
      sub: 'Ein Viertel der Beschäftigten, aber ein deutlich kleinerer Anteil der Wertschöpfung. Düngerpolitik, Lagerhaltung und Wertschöpfungsketten, Landtitel, Teesektor, indische Fischereiflotten in srilankischen Gewässern und der Mensch-Elefant-Konflikt.'
    });
    VIEWS.p_energy = V.makePolicyView({
      key: 'energy', cats: ['energy'],
      title: 'Energie und Staatsbetriebe',
      sub: 'Die Verluste von Elektrizitätsbehörde und Erdölgesellschaft haben die Staatsfinanzen mit in die Zahlungsunfähigkeit getragen. Kostendeckende Tarife, Entflechtung, Erneuerbare, die Stromverbindung nach Indien und die Frage, was verkauft wird und was nicht.'
    });
    VIEWS.p_digital = V.makePolicyView({
      key: 'digital', cats: ['digital'],
      title: 'Digitalisierung',
      sub: 'Digitale Identität, Datenschutz, Steuerdigitalisierung, Breitband und elektronische Verwaltung. Kleiner Bereich mit großer Hebelwirkung: mehrere Vorhaben hier lösen strukturelle Hindernisse in anderen Ressorts.'
    });
    VIEWS.p_foreign = V.makePolicyView({
      key: 'foreign', cats: ['foreign'],
      title: 'Außenpolitik und Diaspora',
      sub: 'Zwischen Indien, China, Japan und dem Westen, mit einem laufenden IWF-Programm, offenen Fragen im Menschenrechtsrat und einer Diaspora, deren Überweisungen die Zahlungsbilanz tragen. Blockfreiheit ist hier weniger Haltung als Notwendigkeit.'
    });
  }

  /* ---------------------------------------------------------
     Navigation
     --------------------------------------------------------- */
  var NAV = [
    { group: 'Lage', items: [
      { k: 'dashboard', ico: '◈', label: 'Lagezentrum' },
      { k: 'problems', ico: '⚠', label: 'Lagebild' },
      { k: 'risks', ico: '⛓', label: 'Hindernisse' },
      { k: 'indicators', ico: '≡', label: 'Indikatoren' },
      { k: 'log', ico: '❯', label: 'Protokoll' }
    ] },
    { group: 'Haushalt', items: [
      { k: 'budget', ico: '₨', label: 'Haushaltsplan' },
      { k: 'p_budget', ico: '%', label: 'Steuern & Sparen', cat: 'budget' }
    ] },
    { group: 'Staat & Recht', items: [
      { k: 'p_state', ico: '⚖', label: 'Staatsform', cat: 'state' },
      { k: 'p_justice', ico: '§', label: 'Justiz', cat: 'justice' },
      { k: 'p_identity', ico: '☮', label: 'Identität & Recht', cat: 'identity' },
      { k: 'devolution', ico: '⬒', label: 'Provinzen', cat: 'devolution' },
      { k: 'p_military', ico: '⬢', label: 'Verteidigung', cat: 'military' }
    ] },
    { group: 'Ressorts', items: [
      { k: 'p_education', ico: '✎', label: 'Bildung', cat: 'education' },
      { k: 'p_health', ico: '✚', label: 'Gesundheit', cat: 'health' },
      { k: 'p_social', ico: '♁', label: 'Soziales', cat: 'social' },
      { k: 'p_economy', ico: '⚙', label: 'Wirtschaft & Arbeit', cat: 'economy' },
      { k: 'p_agri', ico: '❦', label: 'Landwirtschaft', cat: 'agri' },
      { k: 'p_energy', ico: '⚡', label: 'Energie & Betriebe', cat: 'energy' },
      { k: 'p_transport', ico: '⇄', label: 'Verkehr & ÖV', cat: 'transport' },
      { k: 'p_digital', ico: '⌘', label: 'Digitalisierung', cat: 'digital' },
      { k: 'p_climate', ico: '❖', label: 'Klima', cat: 'climate' },
      { k: 'p_foreign', ico: '⌖', label: 'Außenpolitik', cat: 'foreign' }
    ] },
    { group: 'Politik', items: [
      { k: 'parties', ico: '⌘', label: 'Parteien' },
      { k: 'report', ico: '★', label: 'Bericht' }
    ] }
  ];

  function countOpen(item) {
    var cats = item.cats || (item.cat ? [item.cat] : null);
    if (!cats) return null;
    var all = E.all().filter(function (p) { return cats.indexOf(p.cat) >= 0; });
    var done = all.filter(function (p) { return st.enacted[p.id]; }).length;
    return done + '/' + all.length;
  }

  function renderRail() {
    var rail = U.$('#rail');
    U.clear(rail);
    NAV.forEach(function (g) {
      var box = el('div', { class: 'nav-group' }, [el('span', { class: 'hud-label', text: g.group })]);
      g.items.forEach(function (it) {
        var c = countOpen(it);
        box.appendChild(el('div', {
          class: 'nav-item' + (current === it.k ? ' active' : ''),
          onclick: function () { A.go(it.k); }
        }, [
          el('span', { class: 'ico', text: it.ico }),
          el('span', { class: 'lbl', text: it.label }),
          c ? el('span', { class: 'nav-count', text: c }) : null
        ]));
      });
      rail.appendChild(box);
    });
  }

  /* ---------------------------------------------------------
     Kopfzeile
     --------------------------------------------------------- */
  function renderHeader() {
    var h = U.$('#header');
    U.clear(h);
    var i = st.ind, bud = E.budget(st);

    function stat(label, value, delta, tone, hint) {
      return el('div', { class: 'hstat', title: hint || '' }, [
        el('span', { class: 'hud-label', text: label }),
        el('span', { class: 'v', style: { color: tone || '' } }, [value]),
        delta !== undefined && delta !== null ? el('span', { class: 'd', style: { color: delta > 0 ? 'var(--green)' : (delta < 0 ? 'var(--red)' : 'var(--tx-faint)') }, text: delta === 0 ? '' : U.sign(delta, 1) }) : el('span', { class: 'd' })
      ]);
    }

    U.append(h, [
      el('div', { id: 'clock-block' }, [
        el('span', { class: 'qtr', text: U.qLabel(st.year, st.q) }),
        el('span', { class: 'hud-label', text: U.qMonth(st.q) + ' · Quartal ' + (st.turn + 1) })
      ]),
      el('div', { class: 'hsep' }),
      stat('Zustimmung', U.n1(st.approvalOverall) + ' %', null,
        st.approvalOverall >= 50 ? 'var(--green)' : (st.approvalOverall >= 40 ? 'var(--amber)' : 'var(--red)'),
        'Gewichtete Zustimmung über alle Gruppen'),
      stat('Pol. Kapital', U.n0(st.pc), null, st.pc > 40 ? 'var(--cy-bright)' : 'var(--amber)',
        'Wird jedes Quartal neu zugeteilt und für Maßnahmen ausgegeben'),
      stat('Sitze', st.seatsGov + '/225', null, st.seatsGov >= 150 ? 'var(--green)' : (st.seatsGov >= 113 ? 'var(--amber)' : 'var(--red)'),
        'Ab 113 einfache, ab 150 Zweidrittelmehrheit'),
      el('div', { class: 'hsep' }),
      stat('Wachstum', U.n1(i.growth) + ' %', null, i.growth >= 3 ? 'var(--green)' : 'var(--amber)'),
      stat('Inflation', U.n1(i.inflation) + ' %', null, i.inflation <= 7 ? 'var(--green)' : 'var(--red)'),
      stat('Schulden', U.n0(i.debtGdp) + ' %', null, i.debtGdp <= 95 ? 'var(--green)' : 'var(--amber)', 'in Prozent des BIP'),
      stat('Reserven', U.n2(i.reserves), null, i.reserves >= 5 ? 'var(--green)' : 'var(--red)', 'Mrd. USD'),
      stat('Primärsaldo', U.n1(bud.primaryPct) + ' %', null,
        bud.primaryPct >= E.primaryTarget(st) ? 'var(--green)' : 'var(--red)',
        'Ziel ' + U.n1(E.primaryTarget(st)) + ' % des BIP'),
      stat('Straße', U.n0(st.streetPressure), null,
        st.streetPressure <= 40 ? 'var(--green)' : (st.streetPressure <= 65 ? 'var(--amber)' : 'var(--red)'),
        'Protestdruck. Ab 88 wird es gefährlich.'),
      el('div', { id: 'turn-actions' }, [
        el('button', { class: 'ghost tiny', text: 'Speichern', onclick: function () {
          St.saveNow(st).then(function (result) {
            if (result.backend) {
              X.toast('good', 'Gespeichert', 'Spielstand dauerhaft auf diesem Gerät abgelegt.');
            } else if (result.local) {
              X.toast('warn', 'Nur im Browser gespeichert', 'Das lokale Backend ist derzeit nicht erreichbar.');
            } else {
              X.toast('bad', 'Fehler', 'Speichern nicht möglich.');
            }
          });
        } }),
        el('button', {
          class: 'primary', text: st.gameOver ? 'Amtszeit beendet' : 'Quartal abschließen ▸',
          disabled: !!st.gameOver,
          onclick: endTurn
        })
      ])
    ]);
  }

  /* ---------------------------------------------------------
     Laufband
     --------------------------------------------------------- */
  function renderTicker() {
    var t = U.$('#ticker');
    U.clear(t);
    var i = st.ind;
    var items = [
      'BIP-Wachstum <b>' + U.n1(i.growth) + ' %</b>',
      'Inflation <b>' + U.n1(i.inflation) + ' %</b>',
      'Rupie <b>' + U.n0(i.fx) + ' LKR/USD</b>',
      'Reserven <b>' + U.n2(i.reserves) + ' Mrd. USD</b>',
      'Schuldenquote <b>' + U.n1(i.debtGdp) + ' %</b>',
      'Armut <b>' + U.n1(i.poverty) + ' %</b>',
      'Jugendarbeitslosigkeit <b>' + U.n1(i.youthUnemp) + ' %</b>',
      'Erwerbsquote Frauen <b>' + U.n1(i.femaleLFP) + ' %</b>',
      'Korruptionsindex <b>' + U.n0(i.corruption) + '/100</b>',
      'Versöhnung <b>' + U.n0(i.reconcile) + '/100</b>',
      'Vertrauen Norden/Osten <b>' + U.n0(i.trustTamil) + '/100</b>',
      'Klimaresilienz <b>' + U.n0(i.climateRes) + '/100</b>',
      'Erneuerbare <b>' + U.n0(i.renewables) + ' %</b>',
      'IWF-Programmtreue <b>' + U.n0(i.imfCompl) + '/100</b>',
      'Tourismus <b>' + U.n1(i.tourism) + ' Mio.</b>',
      'Abwanderungsdruck <b>' + U.n0(i.brainDrain) + '/100</b>'
    ];
    var track = el('div', { class: 'tk-track', html: items.join('&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;') });
    U.append(t, [el('div', { class: 'tk-tag', text: 'LIVE' }), track]);
  }

  /* ---------------------------------------------------------
     Rundenlauf
     --------------------------------------------------------- */
  function endTurn() {
    if (st.pendingEvent) { showEvent(); return; }
    var res = E.nextTurn(st);
    St.save(st);
    A.render();
    (res.messages || []).forEach(function (m) { X.toast(m.kind, m.title, m.text); });
    if (st.gameOver) { A.go('report'); showGameOver(); return; }
    if (res.event) showEvent();
  }

  function showEvent() {
    var ev = st.pendingEvent;
    if (!ev) return;
    var body = el('div', { class: 'col gap12' }, [
      el('div', { style: { fontSize: '13px', lineHeight: '1.7' }, text: ev.text }),
      el('div', { class: 'ev-opts' }, ev.options.map(function (o, idx) {
        return el('div', { class: 'ev-opt', onclick: function () {
          E.resolveEvent(st, ev, idx);
          St.save(st);
          if (modal) modal.close();
          A.render();
        } }, [
          el('div', { class: 'eo-t', text: o.t }),
          el('div', { class: 'eo-d', text: o.d }),
          el('div', { class: 'row gap6 wrap', style: { marginTop: '7px' } }, [
            X.effectChips(o.eff, 4),
            o.pc ? X.badge(U.sign(o.pc, 0) + ' PK', 'amber') : null,
            o.fiscal && o.fiscal.exp ? X.badge('Kosten ' + U.n0(o.fiscal.exp) + ' Mrd.', 'amber') : null,
            o.fiscal && o.fiscal.rev ? X.badge('Mittel ' + U.n0(o.fiscal.rev) + ' Mrd.', 'green') : null
          ])
        ]);
      }))
    ]);
    var modal = X.modal({ title: ev.title, tag: ev.cat, tagCls: 'amber', body: body, sticky: true });
  }

  function showGameOver() {
    var go = st.gameOver;
    var ev = E.evaluate(st);
    X.modal({
      title: go.title, tag: 'AMTSZEIT BEENDET', tagCls: go.kind === 'reelected' ? 'green' : 'red', sticky: true,
      body: el('div', { class: 'col gap12' }, [
        el('div', { style: { fontSize: '13px', lineHeight: '1.7' }, text: go.text }),
        el('div', { class: 'row gap16 center' }, [
          el('div', { class: 'report-grade', style: { color: ev.grade.c }, text: ev.grade.g }),
          el('div', { class: 'col' }, [
            el('div', { class: 'hud-label', text: 'Gesamtbewertung' }),
            el('div', { class: 'mono', style: { fontSize: '18px' }, text: U.n0(ev.total) + ' / 100' }),
            el('div', { class: 'small', style: { color: ev.grade.c }, text: ev.grade.t })
          ])
        ])
      ]),
      actions: function (close) {
        return [
          el('button', { class: 'ghost', text: 'Bericht ansehen', onclick: close }),
          el('button', { class: 'primary', text: 'Neue Amtszeit', onclick: function () { St.clearSave(); location.reload(); } })
        ];
      }
    });
  }

  /* ---------------------------------------------------------
     Rendern
     --------------------------------------------------------- */
  A.go = function (k) {
    if (!VIEWS[k]) return;
    current = k;
    A.render();
    var v = U.$('#view'); if (v) v.scrollTop = 0;
  };

  A.render = function () {
    if (!st) return;
    renderHeader();
    renderRail();
    renderTicker();
    var host = U.$('#view');
    U.clear(host);
    try {
      VIEWS[current](st, host);
    } catch (err) {
      host.appendChild(X.note('Fehler beim Aufbau der Ansicht: ' + err.message, 'bad'));
      if (window.console) console.error(err);
    }
  };

  A.state = function () { return st; };

  /* ---------------------------------------------------------
     Startbildschirm
     --------------------------------------------------------- */
  function briefing() {
    var B = SL.data.baseline;
    X.modal({
      title: 'Amtsübernahme', tag: 'LAGEBERICHT', sticky: true,
      body: el('div', { class: 'col gap12' }, [
        el('div', { style: { fontSize: '13px', lineHeight: '1.75' } },
          'Sie übernehmen im dritten Quartal 2026 die Amtsgeschäfte des Präsidenten der Demokratischen Sozialistischen Republik Sri Lanka. ' +
          'Die Regierungspartei verfügt über ' + B.META.seatsGov + ' der 225 Parlamentssitze, also über eine Zweidrittelmehrheit. Noch.'),
        X.note('Das Land ist nicht mehr im Zusammenbruch von 2022. Die Wirtschaft wuchs 2025 um 5 %, das IWF-Programm läuft, die Reserven liegen bei 6,59 Mrd. USD. ' +
          'Aber: rund 100 % Schuldenquote, ein Viertel der Bevölkerung unter der Armutsgrenze, 18,7 % Jugendarbeitslosigkeit, ' +
          'ein Korruptionsindex von 35 von 100 und 4,1 Mrd. USD Schäden aus Zyklon Ditwah.'),
        el('div', { class: 'grid g2 gap12' }, [
          el('div', {}, [
            el('div', { class: 'hud-label mb6', text: 'Ihre Instrumente' }),
            el('ul', { style: { margin: '0 0 0 20px', padding: 0, fontSize: '12px', lineHeight: '1.7', color: 'var(--tx-mute)' } }, [
              el('li', { text: 'Der Haushalt: Regler für Einnahmen und Ausgaben, dazu einzelne Steuer- und Sparmaßnahmen.' }),
              el('li', { text: E.all().length + ' Gesetzes- und Verwaltungsmaßnahmen aus allen Ressorts, dazu 17 verschiebbare Zuständigkeiten und 23 Haushaltsposten.' }),
              el('li', { text: 'Die Kompetenzmatrix: Wer erledigt welche Aufgabe, Nation, Provinz, Distrikt oder Kommune?' }),
              el('li', { text: 'Politisches Kapital: die eigentliche Währung. Es wächst mit Zustimmung und Mehrheit.' })
            ])
          ]),
          el('div', {}, [
            el('div', { class: 'hud-label mb6', text: 'Woran Sie scheitern können' }),
            el('ul', { style: { margin: '0 0 0 20px', padding: 0, fontSize: '12px', lineHeight: '1.7', color: 'var(--tx-mute)' } }, [
              el('li', { text: 'Leere Devisenreserven: erneute Zahlungsunfähigkeit.' }),
              el('li', { text: 'Druck der Straße über 88: Rücktritt wie 2022.' }),
              el('li', { text: 'Verlust der Mehrheit und der Zustimmung: Amtsenthebung.' }),
              el('li', { text: 'Und ganz normal: die Wahl im Herbst 2029.' })
            ])
          ])
        ]),
        el('div', { class: 'small muted', style: { lineHeight: '1.6' } },
          'Die Simulation bildet reale Positionen srilankischer Parteien ab, von tamilisch-föderalistisch bis sinhalesisch-nationalistisch. ' +
          'Sie ist ein Modell, keine Prognose, und stellt keine politische Empfehlung dar.')
      ]),
      actions: function (close) {
        return [el('button', { class: 'primary', text: 'Amt antreten', onclick: close })];
      }
    });
  }

  function renderStartScreen(available) {
    var saved = available.state;
    X.modal({
      title: 'Sri Lanka Präsidentensimulator', tag: '2026–2029', sticky: true,
      body: el('div', { class: 'col gap12' }, [
        el('div', { style: { fontSize: '13px', lineHeight: '1.7' } },
          'Sri Lanka hat außergewöhnlich gute Voraussetzungen: hohe Alphabetisierung, kostenlose Bildung und Gesundheitsversorgung, ' +
          'eine strategische Lage an den wichtigsten Schifffahrtsrouten, Häfen, eine große Diaspora. ' +
          'Und es verwandelt diese Vorteile zu schlecht in Produktivität, Wohlstand und einen gemeinsamen Staat. Ändern Sie das.'),
        el('div', { class: 'row gap10 wrap' }, [
          X.badge('Haushalt', 'cy'), X.badge('Verfassung', 'blue'), X.badge('Ethnie, Religion, Kaste, Sprache', 'red'),
          X.badge('Provinzen & Kommunen', 'violet'), X.badge('Militär', ''), X.badge('Ministerien', 'lime'), X.badge('Klima', 'green')
        ]),
        el('div', { class: 'row gap8 wrap' }, [
          available.backend
            ? X.badge('Lokales Backend verbunden', 'green')
            : X.badge('Backend offline · Browser-Speicher aktiv', 'amber'),
          saved ? X.badge(available.source === 'backend' ? 'Gerätespeicher gefunden' : 'Browser-Spielstand gefunden', 'cy') : null
        ])
      ]),
      actions: function (close) {
        var btns = [];
        if (saved) {
          btns.push(el('button', { text: 'Gespeicherten Stand fortsetzen', onclick: function () {
            st = saved;
            if (!st) { st = St.create({}); }
            E.recomputeIndex(st);
            close(); A.render();
          } }));
        }
        if (!available.backend) {
          btns.push(el('button', { class: 'ghost', text: 'Backend erneut verbinden', onclick: function () {
            close(); startScreen();
          } }));
        }
        btns.push(el('button', { class: 'primary', text: 'Neue Amtszeit beginnen', onclick: function () {
          St.clearSave();
          st = St.create({});
          E.recomputeIndex(st);
          St.log(st, 'info', 'Amtsübernahme. Das IWF-Programm läuft, die kombinierte fünfte und sechste Überprüfung wurde im Mai 2026 freigegeben.');
          close(); A.render(); briefing();
        } }));
        return btns;
      }
    });
  }

  function startScreen() {
    St.loadAvailable().then(renderStartScreen, function () {
      renderStartScreen({ state: St.load(), backend: false, source: St.hasSave() ? 'browser' : null });
    });
  }

  /* ---------------------------------------------------------
     Startvorgang
     --------------------------------------------------------- */
  function boot() {
    var lines = [
      'ORACLE Lagesystem wird initialisiert',
      'Makrodaten geladen: IWF, Weltbank, Zentralbank',
      'Haushalt 2026 eingelesen: 5.305 Mrd. LKR Einnahmen',
      'Schadensbilanz Zyklon Ditwah: 4,1 Mrd. USD',
      'Parlament: 225 Sitze, Regierungsfraktion 159',
      'Maßnahmenkatalog: ' + E.all().length + ' Einträge',
      'Verbindung zum Präsidialsekretariat hergestellt'
    ];
    var box = U.$('#boot .bt-lines');
    var idx = 0;
    var tick = setInterval(function () {
      if (idx < lines.length) {
        box.appendChild(el('div', { html: '<b>›</b> ' + U.esc(lines[idx]) }));
        box.scrollTop = box.scrollHeight;
        idx++;
      } else {
        clearInterval(tick);
        var b = U.$('#boot');
        b.classList.add('done');
        setTimeout(function () { b.style.display = 'none'; }, 520);
        startScreen();
      }
    }, 210);
  }

  window.addEventListener('DOMContentLoaded', function () {
    buildViews();
    boot();
  });

})(SL.app = SL.app || {});
