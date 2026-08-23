/* ============================================================
   MASSNAHMEN  -  Provinzen, Distrikte, Kommunen, Devolution
   ============================================================ */
(function () {
  'use strict';
  var P = [
    {
      id: 'dv_pc_elections', cat: 'devolution', sub: 'Wahlen',
      title: 'Provinzratswahlen unverzüglich ansetzen',
      desc: 'Seit 2018 und 2019 sind alle neun Provinzräte ohne gewählte Vertretung und werden von Gouverneuren verwaltet, die der Präsident ernennt. Die Wahlen wurden immer wieder mit Verweis auf Wahlrechtsfragen und Geldmangel verschoben. Mehrere Partner, darunter Indien, das Vereinigte Königreich und Kanada, drängen auf einen Termin.',
      party: ['ITAK', 'SJB', 'SLMC', 'CWC'], need: 'simple', pc: 18, lag: 3,
      fiscal: { exp: 6 }, oneoff: 26,
      eff: { legitimacy: 12, trustTamil: 14, trustHill: 9, reconcile: 9, regionalBalance: 6, stateCap: 2, sinhalaPress: 7 },
      grp: { tamilNE: 16, malaiyaha: 10, muslim: 9, intl: 8, sinhalaRural: -4, sangha: -6 },
      risk: 'Sie könnten mehrere Provinzen an die Opposition verlieren und hätten dann gewählte Gegenspieler mit eigenem Mandat.',
      special: 'pc_elections',
      tags: ['Devolution', 'Wahlen'], excl: ['dv_abolish_pc']
    },
    {
      id: 'dv_abolish_pc', cat: 'devolution', sub: 'Struktur',
      title: 'Provinzratssystem abschaffen',
      desc: 'Die Provinzräte gelten vielen als teure Zwischenebene ohne erkennbaren Nutzen. Ihre Aufgaben gingen an Distriktverwaltungen und Kommunen über. Erfordert eine Verfassungsänderung und würde das Abkommen mit Indien von 1987 einseitig aufkündigen.',
      party: ['SB'], need: 'twothirds', pc: 40, lag: 5,
      fiscal: { rev: 0, exp: -70 },
      eff: { trustTamil: -30, reconcile: -22, regionalBalance: -10, relIndia: -22, stateCap: 3, sinhalaPress: -12 },
      grp: { sinhalaRural: 10, sangha: 12, military: 6, tamilNE: -32, malaiyaha: -14, muslim: -14, intl: -16, diaspora: -20 },
      risk: 'Indien betrachtet den 13. Verfassungszusatz als Bestandteil eines zwischenstaatlichen Abkommens. Erwarten Sie eine ernsthafte diplomatische Krise.',
      tags: ['Devolution', 'Hochrisiko'], excl: ['dv_pc_elections', 'dv_13a_full', 'st_federal']
    },
    {
      id: 'dv_13a_full', cat: 'devolution', sub: 'Struktur',
      title: '13. Verfassungszusatz vollständig umsetzen',
      desc: 'Alle in der Nebenliste vorgesehenen Kompetenzen gehen tatsächlich an die Provinzen, einschließlich Land und Polizei. Seit 1987 wurde das nie vollzogen. Die NPP spricht von einer kraftvollen Inbetriebnahme des Provinzratssystems, ohne den 13. Zusatz ausdrücklich zu nennen.',
      party: ['ITAK', 'SJB', 'CWC'], need: 'simple', pc: 34, lag: 6,
      fiscal: { exp: 95 },
      eff: { trustTamil: 22, reconcile: 16, trustHill: 10, trustMuslim: 8, regionalBalance: 10, relIndia: 12, sinhalaPress: 22, stateCap: -4 },
      grp: { tamilNE: 22, malaiyaha: 12, muslim: 9, diaspora: 14, intl: 10, sinhalaRural: -14, sangha: -18, military: -12 },
      risk: 'Der Polizeianteil ist die eigentliche Bruchstelle. Ohne ihn bleibt die Umsetzung unvollständig, mit ihm wird der Widerstand maximal.',
      risks: ['no_local_capacity'],
      tags: ['Devolution', '13. Zusatz'], excl: ['dv_abolish_pc', 'st_unitary_lock']
    },
    {
      id: 'dv_13a_minus_police', cat: 'devolution', sub: 'Struktur',
      title: '13. Zusatz umsetzen, Polizei aber beim Zentralstaat',
      desc: 'Land, Bildung, Gesundheit, Landwirtschaft und Verkehr gehen an die Provinzen, die Polizeigewalt bleibt national. Der Kompromiss, den mehrere Regierungen erwogen und keine umgesetzt hat.',
      party: ['SJB', 'NPP'], need: 'simple', pc: 22, lag: 5,
      fiscal: { exp: 70 },
      eff: { trustTamil: 11, reconcile: 8, regionalBalance: 8, relIndia: 7, sinhalaPress: 12, stateCap: -2 },
      grp: { tamilNE: 9, malaiyaha: 8, muslim: 6, intl: 6, sinhalaRural: -7, sangha: -9, military: -4 },
      risk: 'Tamilische Parteien lehnen genau diese Halbheit seit Jahrzehnten ab.',
      tags: ['Devolution'], excl: ['dv_13a_full', 'dv_abolish_pc']
    },
    {
      id: 'dv_ne_merger', cat: 'devolution', sub: 'Struktur',
      title: 'Zusammenlegung von Nord- und Ostprovinz zur Abstimmung stellen',
      desc: 'Beide Provinzen waren von 1988 bis 2006 vereint, bis der Oberste Gerichtshof die Zusammenlegung für unwirksam erklärte. Eine erneute Vereinigung setzt laut Verfassung eine Volksabstimmung in der Ostprovinz voraus, in der keine Gemeinschaft die Mehrheit hat.',
      party: ['ITAK', 'TNPF'], need: 'simple', pc: 38, lag: 5,
      fiscal: { exp: 8 }, oneoff: 14,
      eff: { trustTamil: 15, reconcile: 4, trustMuslim: -12, sinhalaPress: 26 },
      grp: { tamilNE: 20, diaspora: 18, muslim: -18, sinhalaRural: -14, sangha: -16, military: -10 },
      risk: 'Muslime und Sinhalesen im Osten fürchten, zur Minderheit in einer tamilisch dominierten Großprovinz zu werden. Der SLMC hat das als rote Linie bezeichnet.',
      tags: ['Devolution', 'Hochrisiko']
    },
    {
      id: 'dv_finance_commission', cat: 'devolution', sub: 'Finanzen',
      title: 'Finanzkommission mit verbindlicher Zuteilungsformel',
      desc: 'Die Finanzkommission empfiehlt bisher, die Regierung entscheidet frei. Künftig ist die nach einer offengelegten Formel berechnete Zuteilung bindend und wird direkt überwiesen.',
      party: ['SJB', 'ITAK', 'CWC'], need: 'simple', pc: 20, lag: 4,
      fiscal: { exp: 30 },
      eff: { regionalBalance: 12, trustTamil: 9, trustHill: 7, stateCap: 4, corruption: 4, sinhalaPress: 8 },
      grp: { tamilNE: 10, malaiyaha: 9, muslim: 6, farmers: 5, sinhalaRural: -3 },
      risk: 'Sie verlieren die Möglichkeit, Provinzen über die Mittelzuteilung politisch zu disziplinieren.',
      tags: ['Devolution', 'Finanzen']
    },
    {
      id: 'dv_prov_tax', fline: 'nontax', cat: 'devolution', sub: 'Finanzen',
      title: 'Provinzen echte eigene Steuern zugestehen',
      desc: 'Grundsteuer, Fahrzeugsteuer, Gewerbeabgaben und ein Anteil an der Mehrwertsteuer werden zu Provinzeinnahmen. Ohne eigene Einnahmen bleibt jede Devolution eine Verwaltungsübung.',
      party: ['ITAK', 'SJB'], need: 'twothirds', pc: 30, lag: 6,
      fiscal: { rev: -120, exp: -60 },
      eff: { regionalBalance: 11, trustTamil: 12, taxCompl: -3, stateCap: 3, sinhalaPress: 15 },
      grp: { tamilNE: 13, malaiyaha: 8, business: -4, sinhalaRural: -8, sangha: -10 },
      risk: 'Reiche Provinzen wie die Westprovinz gewinnen, arme verlieren, solange kein Ausgleich dazukommt.',
      risks: ['no_local_capacity', 'revenue_authority'],
      tags: ['Devolution', 'Steuern']
    },
    {
      id: 'dv_district_capacity', cat: 'devolution', sub: 'Verwaltung',
      title: 'Distriktsekretariate personell und fachlich stärken',
      desc: 'Die 25 Distriktsekretariate und die darunterliegenden Divisional Secretariats sind die eigentliche Verwaltungsmaschine des Landes. Fachpersonal, Planungsbudgets und Entscheidungsbefugnisse vor Ort statt Rückfragen nach Colombo.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 8, lag: 4,
      fiscal: { exp: 26 },
      eff: { stateCap: 11, regionalBalance: 6, disasterPrep: 5, digitalGov: 3, corruption: 2 },
      grp: { publicSector: 8, farmers: 6, sinhalaRural: 5, tamilNE: 4 },
      risk: 'Stärkt eine nicht gewählte Ebene. Tamilische Parteien sehen darin einen Umweg an den Provinzräten vorbei.',
      tags: ['Verwaltung']
    },
    {
      id: 'dv_local_finance', cat: 'devolution', sub: 'Finanzen',
      title: 'Kommunen eigene Einnahmen und Planungshoheit geben',
      desc: 'Die 341 Kommunalvertretungen erhalten einen festen Anteil an der Grundsteuer, Gebührenhoheit und einen eigenen Investitionshaushalt. Kommunalwahlen fanden zuletzt im Mai 2025 statt, die Gremien sind also handlungsfähig.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 14, lag: 4,
      fiscal: { exp: 40 },
      eff: { legitimacy: 8, regionalBalance: 7, housing: 5, infra: 4, corruption: -3, stateCap: 2 },
      grp: { sinhalaRural: 7, farmers: 6, tamilNE: 5, malaiyaha: 5, youth: 3 },
      risk: 'Kommunale Korruption ist real. Ohne Prüfstrukturen verlagern Sie das Problem nur nach unten.',
      risks: ['no_local_capacity'],
      tags: ['Kommunal', 'Finanzen']
    },
    {
      id: 'dv_local_audit', cat: 'devolution', sub: 'Verwaltung',
      title: 'Verpflichtende Rechnungsprüfung für alle Kommunen',
      desc: 'Jede Kommunalvertretung legt einen geprüften Jahresabschluss vor, der online veröffentlicht wird. Bei Verstößen werden Zuweisungen ausgesetzt.',
      party: ['NPP', 'NDF'], need: 'simple', pc: 8, lag: 3,
      fiscal: { exp: 7 },
      eff: { corruption: 7, stateCap: 4, legitimacy: 4 },
      grp: { youth: 5, business: 4, sinhalaUrban: 4 },
      risk: 'Viele kleine Pradeshiya Sabhas haben schlicht niemanden, der einen Abschluss erstellen kann.',
      tags: ['Kommunal', 'Antikorruption']
    },
    {
      id: 'dv_growth_poles', cat: 'devolution', sub: 'Regionalentwicklung',
      title: 'Fünf regionale Wirtschaftszentren aufbauen',
      desc: 'Statt alles auf Colombo zu konzentrieren: Hambantota als Hafen- und Industriestandort, Trincomalee für Energie und Schwerindustrie, Jaffna für Informationstechnologie und Indienhandel, Kandy für Bildung und Medizin, Galle für Tourismus und Dienstleistungen.',
      party: ['SJB', 'NPP', 'NDF'], need: 'simple', pc: 16, lag: 8,
      fiscal: { exp: 95 }, oneoff: 60,
      eff: { regionalBalance: 16, growth: 0.35, infra: 9, privateSector: 8, fdi: 0.35, brainDrain: -5, unemp: -0.4 },
      grp: { business: 12, youth: 9, tamilNE: 8, farmers: 5, sinhalaUrban: -2 },
      risk: 'Regionalzentren brauchen ein Jahrzehnt. In Ihrer Amtszeit sehen Sie vor allem die Kosten.',
      tags: ['Regional', 'Wachstum']
    },
    {
      id: 'dv_north_dev', cat: 'devolution', sub: 'Regionalentwicklung',
      title: 'Sonderprogramm Norden und Osten',
      desc: 'Gezielte Investitionen in Straßen, Strom, Bewässerung, Fischereihäfen und digitale Anbindung in den fünf Nord- und drei Ostdistrikten, wo die Armutsquoten deutlich über dem Landesdurchschnitt liegen.',
      party: ['ITAK', 'SJB', 'SLMC'], need: 'simple', pc: 12, lag: 5,
      fiscal: { exp: 55 },
      eff: { regionalBalance: 11, trustTamil: 12, trustMuslim: 7, poverty: -0.9, infra: 6, sinhalaPress: 8 },
      grp: { tamilNE: 15, muslim: 9, diaspora: 8, sinhalaRural: -5 },
      risk: 'Im Süden wird jede Mark für den Norden als Bevorzugung dargestellt werden.',
      tags: ['Regional']
    },
    {
      id: 'dv_uva_hill', cat: 'devolution', sub: 'Regionalentwicklung',
      title: 'Aufholprogramm für Uva und das Hochland',
      desc: 'Monaragala und Badulla gehören zu den ärmsten Distrikten des Landes. Straßen, Schulen, Gesundheitsstationen, Kühlketten für Gemüse und Anbindung an die Bahnstrecke.',
      party: ['CWC', 'SJB', 'NPP'], need: 'simple', pc: 9, lag: 5,
      fiscal: { exp: 38 },
      eff: { regionalBalance: 8, trustHill: 12, poverty: -0.7, agriProd: 4, infra: 4 },
      grp: { malaiyaha: 14, farmers: 8, sinhalaRural: 4 },
      risk: 'Geringes politisches Risiko, hoher sozialer Ertrag, aber wenig Sichtbarkeit in den nationalen Medien.',
      tags: ['Regional']
    },
    {
      id: 'dv_governor_limit', cat: 'devolution', sub: 'Struktur',
      title: 'Befugnisse der Gouverneure beschneiden',
      desc: 'Solange keine Räte gewählt sind, regieren vom Präsidenten ernannte Gouverneure die Provinzen. Ihre Befugnisse werden auf laufende Geschäfte begrenzt, größere Entscheidungen brauchen Zustimmung der Distriktversammlungen.',
      party: ['ITAK', 'SJB'], need: 'simple', pc: 12, lag: 2,
      fiscal: {},
      eff: { legitimacy: 6, trustTamil: 8, corruption: 3, stateCap: -2 },
      grp: { tamilNE: 9, muslim: 5, malaiyaha: 5 },
      risk: 'Sie geben Einfluss ab, den Ihre Vorgänger sehr gezielt genutzt haben.',
      tags: ['Devolution']
    },
    {
      id: 'dv_capital_move', cat: 'devolution', sub: 'Struktur',
      title: 'Behörden aus Colombo verlagern',
      desc: 'Zehn nachgeordnete Behörden werden vollständig in Provinzstädte verlegt, mit Wohnraum- und Umzugshilfen für die Beschäftigten. Entlastet Colombo und schafft qualifizierte Arbeitsplätze in der Fläche.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 10, lag: 6,
      fiscal: { exp: 12 }, oneoff: 28,
      eff: { regionalBalance: 9, brainDrain: -3, infra: 2, stateCap: -3 },
      grp: { sinhalaRural: 7, tamilNE: 4, publicSector: -8, sinhalaUrban: -4 },
      risk: 'Beamte wehren sich gegen Versetzungen. Rechnen Sie mit Klagen und Krankmeldungen.',
      tags: ['Verwaltung', 'Regional']
    },
    {
      id: 'dv_village_budget', cat: 'devolution', sub: 'Beteiligung',
      title: 'Bürgerhaushalte auf Dorfebene',
      desc: 'Jede Grama Niladhari Division erhält ein kleines eigenes Budget, über dessen Verwendung eine Dorfversammlung entscheidet. In Indien und Brasilien hat das die Zufriedenheit mit dem Staat messbar erhöht.',
      party: ['NPP', 'FSP'], need: 'exec', pc: 7, lag: 4,
      fiscal: { exp: 22 },
      eff: { legitimacy: 9, corruption: 3, housing: 3, regionalBalance: 4, disasterPrep: 3 },
      grp: { sinhalaRural: 10, farmers: 8, tamilNE: 6, malaiyaha: 6, youth: 4 },
      risk: 'Lokale Eliten können Versammlungen dominieren. Ohne Quoten profitieren dieselben wie immer.',
      risks: ['no_local_capacity'],
      tags: ['Kommunal', 'Beteiligung']
    },
    {
      id: 'dv_land_return', cat: 'devolution', sub: 'Land',
      title: 'Militärisch besetztes Zivilland zurückgeben',
      desc: 'In den Hochsicherheitszonen des Nordens und Ostens stehen weiterhin private Grundstücke unter militärischer Kontrolle. Im August 2026 erklärte die Regierung, dass ziviles Land unter Militärkontrolle bleibt. Diese Entscheidung würde umgekehrt: verbindlicher Zeitplan, Vermessung, Entschädigung, Rückgabe.',
      party: ['ITAK', 'TNPF', 'SJB'], need: 'exec', pc: 26, lag: 5,
      fiscal: { exp: 14 }, oneoff: 20,
      eff: { trustTamil: 22, reconcile: 14, agriProd: 3, housing: 4, militaryMor: -12, sinhalaPress: 18 },
      grp: { tamilNE: 26, diaspora: 18, intl: 10, muslim: 4, military: -18, sinhalaRural: -8, sangha: -8 },
      risk: 'Das Militär begründet die Nutzung mit Sicherheitsinteressen und Camps, die dort seit Jahren stehen. Erwarten Sie offenen Widerstand der Führung.',
      risks: ['no_land_registry'],
      tags: ['Land', 'Militär', 'Versöhnung']
    },
    {
      id: 'dv_land_commission', cat: 'devolution', sub: 'Land',
      title: 'Nationale Landkommission mit Provinzbeteiligung',
      desc: 'Der 13. Zusatz sieht eine Landkommission mit Vertretern aller Provinzen vor. Sie wurde nie eingerichtet. Staatliches Land würde künftig nach einer gemeinsam beschlossenen Politik vergeben statt durch Erlass aus Colombo.',
      party: ['ITAK', 'SJB'], need: 'simple', pc: 18, lag: 4,
      fiscal: { exp: 6 },
      eff: { trustTamil: 13, reconcile: 8, regionalBalance: 5, agriProd: 2, sinhalaPress: 13 },
      grp: { tamilNE: 14, malaiyaha: 7, muslim: 6, sinhalaRural: -8, sangha: -9 },
      risk: 'Landvergabe in der Trockenzone war historisch ein Instrument der Bevölkerungspolitik. Genau deshalb ist die Kommission so umstritten.',
      risks: ['no_land_registry'],
      tags: ['Land', 'Devolution']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
