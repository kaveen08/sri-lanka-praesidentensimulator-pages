/* ============================================================
   INTERNATIONALER VERGLEICH

   Sechs Länder als Maßstab: Schweiz und Singapur als Spitze,
   Deutschland und die Vereinigten Staaten als große Industrie-
   staaten, Indien als Nachbar und China als der andere große
   Nachbar und wichtigste Gläubiger.

   Die Werte sind gerundete Größenordnungen für 2025/26 aus
   öffentlich berichteten Quellen (IWF, Weltbank, WHO, ILO,
   Transparency International, Reporter ohne Grenzen, Vereinte
   Nationen, World Justice Project, ND-GAIN). Sie bilden
   Verhältnisse ab, keine amtliche Statistik.

   Ehrlichkeit vor Vollständigkeit: Fünfzehn der sechzig Indikatoren
   messen etwas, das es nur in Sri Lanka gibt oder das nur für
   Sri Lanka definiert ist, etwa das Vertrauen der Malaiyaha-Tamilen
   oder das Verhältnis zu Indien. Für diese wird kein Vergleichswert
   erfunden, sie stehen in NOT_COMPARABLE mit Begründung.

   Wo eine Zahl trügt, steht eine Fußnote in NOTES daneben:
   Singapurs Schuldenquote ist keine Schuldenlast, Deutschlands
   Armutsquote misst etwas anderes als Indiens, und absolute
   Größen wie Exporte oder Emissionen sagen zwischen einem Land
   mit 6 und einem mit 1.400 Millionen Einwohnern wenig.
   ============================================================ */
(function (D) {
  'use strict';

  /* gdpPc: nominales Bruttoinlandsprodukt je Kopf in USD, gerundet.
     Ohne diese Zeile ist der Vergleich unfair: Sri Lanka wirtschaftet
     mit einem Zwanzigstel des schweizerischen Pro-Kopf-Einkommens.
     Wer damit die Lebenserwartung Osteuropas erreicht, hat mehr
     geleistet als die Rangliste zeigt. */
  D.COUNTRIES = [
    { k: 'CH', name: 'Schweiz',     short: 'CH', color: '#f43f5e', pop: 8.9, gdpPc: 100000,
      desc: 'Kleines, wohlhabendes Binnenland mit vier Amtssprachen und starkem Föderalismus. Der Maßstab, an dem sich Verwaltungsqualität messen lässt.' },
    { k: 'SG', name: 'Singapur',    short: 'SG', color: '#22d3ee', pop: 6.0, gdpPc: 85000,
      desc: 'Stadtstaat, 1965 ärmer als Ceylon, heute mit einem der höchsten Pro-Kopf-Einkommen der Welt. Der naheliegendste Vergleich für Sri Lanka und der unbequemste.' },
    { k: 'DE', name: 'Deutschland', short: 'DE', color: '#fbbf24', pop: 84, gdpPc: 54000,
      desc: 'Große Industrienation mit ausgebautem Sozialstaat, hoher Steuerquote und einer alternden Bevölkerung.' },
    { k: 'US', name: 'USA',         short: 'US', color: '#60a5fa', pop: 342, gdpPc: 86000,
      desc: 'Größte Volkswirtschaft der Welt, mit hoher Ungleichheit, niedriger sozialer Sicherung und sinkendem Institutionenvertrauen.' },
    { k: 'CN', name: 'China',       short: 'CN', color: '#f97316', pop: 1410, gdpPc: 13400,
      desc: 'Zweitgrößte Volkswirtschaft, größter bilateraler Gläubiger Sri Lankas. Hohe Verwaltungsleistung bei geschlossenem politischem System.' },
    { k: 'IN', name: 'Indien',      short: 'IN', color: '#a3e635', pop: 1450, gdpPc: 2900,
      desc: 'Direkter Nachbar, größter Handelspartner und selbst ein Land mit Kastenfrage, Mehrsprachigkeit und starkem Regionalgefälle.' }
  ];
  D.BY_KEY = {};
  D.COUNTRIES.forEach(function (c) { D.BY_KEY[c.k] = c; });

  /* ---------------------------------------------------------
     Vergleichswerte, in denselben Einheiten wie die Indikatoren
     des Spiels. undefined heißt: für dieses Land nicht sinnvoll.
     --------------------------------------------------------- */
  D.VALUES = {
    /* --- Wirtschaft und Finanzen --- */
    growth:       { CH: 1.3,  SG: 2.6,  DE: 0.8,  US: 2.0,  CN: 4.6,  IN: 6.5 },
    inflation:    { CH: 0.6,  SG: 1.4,  DE: 2.2,  US: 2.7,  CN: 0.4,  IN: 4.4 },
    debtGdp:      { CH: 38,   SG: 175,  DE: 63,   US: 122,  CN: 90,   IN: 82 },
    reserves:     { CH: 810,  SG: 385,  DE: 300,  US: 245,  CN: 3250, IN: 700 },
    unemp:        { CH: 2.9,  SG: 2.0,  DE: 6.3,  US: 4.2,  CN: 5.1,  IN: 4.9 },
    youthUnemp:   { CH: 8.0,  SG: 6.5,  DE: 6.6,  US: 9.4,  CN: 17.0, IN: 16.0 },
    fdi:          { CH: 2.4,  SG: 20.0, DE: 0.6,  US: 1.3,  CN: 0.6,  IN: 1.5 },
    exports:      { CH: 420,  SG: 480,  DE: 1700, US: 2050, CN: 3550, IN: 440 },
    tourism:      { CH: 12.0, SG: 16.5, DE: 38.0, US: 72.0, CN: 65.0, IN: 10.0 },
    remittances:  { CH: 2.0,  SG: 0.1,  DE: 20.0, US: 7.0,  CN: 18.0, IN: 130.0 },
    privateSector:{ CH: 88,   SG: 95,   DE: 80,   US: 90,   CN: 64,   IN: 62 },
    soeHealth:    { CH: 82,   SG: 92,   DE: 74,   US: 78,   CN: 58,   IN: 52 },
    infra:        { CH: 93,   SG: 95,   DE: 87,   US: 82,   CN: 80,   IN: 55 },
    regionalBalance: { CH: 85, SG: undefined, DE: 78, US: 62, CN: 48, IN: 40 },

    /* --- Soziales und Bildung --- */
    poverty:      { CH: 8.2,  SG: 5.0,  DE: 14.4, US: 11.1, CN: 1.0,  IN: 11.0 },
    inequality:   { CH: 33,   SG: 37,   DE: 32,   US: 41,   CN: 37,   IN: 33 },
    education:    { CH: 88,   SG: 97,   DE: 82,   US: 78,   CN: 82,   IN: 50 },
    skillsMatch:  { CH: 92,   SG: 90,   DE: 88,   US: 76,   CN: 68,   IN: 48 },
    health:       { CH: 87,   SG: 89,   DE: 88,   US: 84,   CN: 82,   IN: 63 },
    malnutrition: { CH: 4,    SG: 5,    DE: 6,    US: 10,   CN: 12,   IN: 55 },
    socialProt:   { CH: 92,   SG: 72,   DE: 95,   US: 76,   CN: 78,   IN: 48 },
    femaleLFP:    { CH: 62.0, SG: 62.0, DE: 57.0, US: 57.0, CN: 60.0, IN: 33.0 },
    brainDrain:   { CH: 8,    SG: 12,   DE: 22,   US: 12,   CN: 32,   IN: 55 },
    housing:      { CH: 92,   SG: 94,   DE: 88,   US: 82,   CN: 72,   IN: 52 },

    /* --- Staat und Institutionen --- */
    corruption:   { CH: 81,   SG: 84,   DE: 75,   US: 65,   CN: 43,   IN: 38 },
    stateCap:     { CH: 95,   SG: 98,   DE: 88,   US: 84,   CN: 70,   IN: 58 },
    ruleOfLaw:    { CH: 86,   SG: 78,   DE: 84,   US: 70,   CN: 47,   IN: 49 },
    digitalGov:   { CH: 86,   SG: 92,   DE: 88,   US: 91,   CN: 81,   IN: 66 },
    pressFree:    { CH: 84,   SG: 48,   DE: 82,   US: 66,   CN: 23,   IN: 32 },
    taxCompl:     { CH: 85,   SG: 82,   DE: 88,   US: 78,   CN: 62,   IN: 48 },
    legitimacy:   { CH: 82,   SG: 80,   DE: 60,   US: 42,   CN: 72,   IN: 68 },

    /* --- Zusammenhalt (nur die vergleichbaren) --- */
    religFree:    { CH: 82,   SG: 62,   DE: 80,   US: 76,   CN: 12,   IN: 32 },
    casteEquity:  { CH: 85,   SG: 80,   DE: 80,   US: 68,   CN: 62,   IN: 32 },
    langAccess:   { CH: 95,   SG: 88,   DE: 45,   US: 55,   CN: 35,   IN: 62 },

    /* --- Sicherheit --- */
    militaryCap:  { CH: 45,   SG: 55,   DE: 66,   US: 100,  CN: 95,   IN: 88 },
    internalSec:  { CH: 92,   SG: 97,   DE: 82,   US: 62,   CN: 82,   IN: 55 },
    maritimeSec:  { CH: undefined, SG: 92, DE: 78, US: 95,  CN: 88,   IN: 72 },

    /* --- Klima und Umwelt --- */
    climateRes:   { CH: 88,   SG: 82,   DE: 82,   US: 78,   CN: 58,   IN: 42 },
    disasterPrep: { CH: 88,   SG: 88,   DE: 85,   US: 82,   CN: 68,   IN: 48 },
    renewables:   { CH: 62,   SG: 5,    DE: 58,   US: 23,   CN: 33,   IN: 22 },
    energyRel:    { CH: 96,   SG: 98,   DE: 94,   US: 86,   CN: 88,   IN: 68 },
    forest:       { CH: 32,   SG: 22,   DE: 32,   US: 34,   CN: 24,   IN: 24 },
    emissions:    { CH: 40,   SG: 58,   DE: 670,  US: 6000, CN: 14500, IN: 3600 },
    agriProd:     { CH: 82,   SG: undefined, DE: 88, US: 92, CN: 72,  IN: 52 },
    foodSec:      { CH: 84,   SG: 82,   DE: 82,   US: 78,   CN: 74,   IN: 58 }
  };

  /* ---------------------------------------------------------
     Indikatoren, für die ein Ländervergleich nichts aussagt.
     Es wird kein Wert erfunden, sondern der Grund genannt.
     --------------------------------------------------------- */
  D.NOT_COMPARABLE = {
    fx:          'Ein Wechselkurs lässt sich zwischen Währungen nicht vergleichen: 308 Rupien je Dollar sagen nichts über 0,88 Franken je Dollar.',
    reconcile:   'Misst die Aufarbeitung des srilankischen Bürgerkriegs. Es gibt keine Entsprechung in anderen Ländern.',
    trustTamil:  'Vertrauen srilankischer Tamilen in die Zentralregierung in Colombo. Ohne Entsprechung anderswo.',
    trustMuslim: 'Vertrauen der muslimischen Gemeinschaft Sri Lankas nach 2019 und den Zwangseinäscherungen von 2020/21.',
    trustHill:   'Vertrauen der Malaiyaha-Tamilen im Plantagenhochland, einer Gruppe mit eigener Geschichte seit der Kolonialzeit.',
    sinhalaPress:'Mobilisierung sinhalesisch-buddhistischer Nationalisten. Nationalistischer Druck existiert überall, aber nicht in dieser Form messbar.',
    militaryMor: 'Truppenmoral wird international nicht vergleichbar erhoben.',
    veteran:     'Versorgung der Veteranen eines 2009 beendeten Bürgerkriegs.',
    relIndia:    'Sri Lankas Verhältnis zu Indien. Für andere Länder ist das keine sinnvolle Größe.',
    relChina:    'Sri Lankas Verhältnis zu China.',
    relWest:     'Sri Lankas Verhältnis zu EU, USA und Vereinigtem Königreich.',
    relJapan:    'Sri Lankas Verhältnis zu Japan.',
    relGulf:     'Sri Lankas Verhältnis zu den Golfstaaten.',
    imfCompl:    'Programmtreue gegenüber dem Währungsfonds. Nur fünf der sechs Vergleichsländer hatten je ein Programm, und keines derzeit.',
    diaspora:    'Einbindung der srilankischen Auslandsgemeinden.'
  };

  /* ---------------------------------------------------------
     Fußnoten, wo die nackte Zahl in die Irre führt
     --------------------------------------------------------- */
  D.NOTES = {
    'debtGdp.SG': 'Singapurs Schuldenquote ist keine Schuldenlast. Der Staat gibt Anleihen aus, um Pensionsgelder anzulegen, und ist netto Gläubiger, nicht Schuldner.',
    'fdi.SG': 'Ein großer Teil sind Durchleitungen über den Finanzplatz, keine Investitionen in Singapur selbst.',
    'poverty.DE': 'Deutschland weist die Armutsgefährdungsquote aus, also einen Anteil am Medianeinkommen. Sie misst relative Ungleichheit, nicht absolute Not, und ist mit Sri Lankas oder Indiens nationaler Armutsgrenze nicht direkt vergleichbar.',
    'poverty.CN': 'China hat die extreme Armut 2021 offiziell für beseitigt erklärt. Die zugrunde liegende Grenze liegt niedrig, und die Zahl ist eine amtliche Feststellung.',
    'poverty.US': 'Die amerikanische Armutsgrenze folgt einer Berechnung aus den 1960er Jahren und wird auch im Land selbst als zu niedrig kritisiert.',
    'unemp.IN': 'Indien erhebt Erwerbslosigkeit nach eigener Methodik. Bei einem informellen Sektor dieser Größe sagt die Quote wenig über Unterbeschäftigung.',
    'unemp.CN': 'Amtliche Quote der städtischen Erwerbsbevölkerung. Wanderarbeiter sind darin nur teilweise erfasst.',
    'legitimacy.CN': 'Beruht auf Umfragen in einem Land ohne freie Meinungsäußerung. Der Wert ist mit Vorsicht zu lesen.',
    'reserves.CN': 'Absolute Größe. Auf 1,4 Milliarden Einwohner gerechnet fällt der Vorsprung deutlich kleiner aus.',
    'emissions.CN': 'Absolute Emissionen. Pro Kopf liegt China etwa gleichauf mit Singapur und unter den Vereinigten Staaten.',
    'emissions.US': 'Pro Kopf mit rund 18 Tonnen der höchste Wert der Vergleichsgruppe, gut das Sechzehnfache Sri Lankas.',
    'renewables.CH': 'Überwiegend Wasserkraft. Der Rest der Stromerzeugung stammt fast vollständig aus Kernkraft, die hier nicht als erneuerbar zählt.',
    'renewables.SG': 'Ein Stadtstaat ohne Flüsse, ohne Wind und ohne Fläche für Solarparks. Der niedrige Wert ist Geografie, nicht Politik.',
    'regionalBalance.SG': 'Ein Stadtstaat hat keine Regionen, zwischen denen sich Wohlstand ungleich verteilen könnte.',
    'maritimeSec.CH': 'Die Schweiz ist ein Binnenland.',
    'agriProd.SG': 'Singapur führt über 90 Prozent seiner Nahrungsmittel ein und hat kaum Landwirtschaft.',
    'militaryCap.CH': 'Miliz- statt Berufsarmee, ausgerichtet auf Landesverteidigung, nicht auf Machtprojektion.',
    'langAccess.CH': 'Vier Amtssprachen, praktisch umgesetzt bis auf die Gemeindeebene. Der Wert, an dem Sri Lankas Zweisprachigkeit zu messen wäre.',
    'langAccess.SG': 'Vier Amtssprachen, Englisch als gemeinsame Verwaltungs- und Schulsprache.',
    'casteEquity.IN': 'Indien kennt Kastendiskriminierung wie Sri Lanka, mit einem umfangreicheren, aber ebenfalls umstrittenen System der Quotierung.',
    'pressFree.SG': 'Wirtschaftlich offen, publizistisch eng. Singapur zeigt, dass Wohlstand und Pressefreiheit nicht zusammenfallen müssen.',
    'health.IN': 'Indien liegt bei der Versorgungsabdeckung knapp vor Sri Lanka, bei Lebenserwartung und Müttersterblichkeit dagegen deutlich dahinter. Sri Lankas kostenlose Gesundheitsversorgung ist gemessen am Einkommen weiterhin außergewöhnlich, hat aber seit der Krise von 2022 erheblich gelitten.',
    'education.CN': 'Chinas Wert stützt sich stark auf die Ergebnisse einzelner reicher Küstenprovinzen, die allein an internationalen Vergleichstests teilnehmen.',
    'socialProt.SG': 'Beruht auf Pflichtsparkonten statt auf Umverteilung. Wer wenig einzahlt, bekommt wenig heraus.'
  };

  /* Absolute Größen, bei denen der Vergleich ohne Bevölkerungsbezug
     schief ist. Die Ansicht rechnet sie zusätzlich pro Kopf aus. */
  D.PER_CAPITA = { reserves: 'USD je Kopf', exports: 'USD je Kopf', remittances: 'USD je Kopf',
                   emissions: 't CO2e je Kopf', tourism: 'Gäste je Einwohner' };

  D.SRI_LANKA_POP = 22.2;
  D.SRI_LANKA_GDP_PC = 4500;

  D.gdpPc = function (countryKey) {
    return countryKey === 'LK' ? D.SRI_LANKA_GDP_PC : ((D.BY_KEY[countryKey] || {}).gdpPc || 0);
  };

  /* ---------------------------------------------------------
     Vergleichsbereiche

     Die Gesamtbewertung des Spiels enthält einen Bereich
     „Zusammenhalt“, der auf srilankischen Größen beruht und sich
     nicht vergleichen lässt. Für den Ländervergleich wird deshalb
     eine eigene, für alle sieben Länder gleich berechnete
     Einteilung verwendet, ausschließlich aus vergleichbaren
     Indikatoren. Sri Lanka wird nach derselben Formel bewertet
     wie die anderen, sonst wäre der Vergleich wertlos.

     lo/hi spannen die Skala auf, inv kehrt sie um.
     --------------------------------------------------------- */
  D.AREAS = [
    { k: 'Wirtschaft', desc: 'Wachstum, Schuldenstand, Investitionsklima und Auslandsinvestitionen.',
      parts: [
        { k: 'growth', w: 0.30, lo: -1, hi: 7 },
        { k: 'debtGdp', w: 0.25, lo: 130, hi: 40, inv: true },
        { k: 'privateSector', w: 0.30, lo: 30, hi: 96 },
        { k: 'fdi', w: 0.15, lo: 0, hi: 5 }
      ] },
    { k: 'Lebensstandard', desc: 'Armut, Preisstabilität, soziale Sicherung und Wohnverhältnisse.',
      parts: [
        { k: 'poverty', w: 0.35, lo: 30, hi: 2, inv: true },
        { k: 'inflation', w: 0.15, lo: 15, hi: 0, inv: true },
        { k: 'socialProt', w: 0.30, lo: 30, hi: 96 },
        { k: 'housing', w: 0.20, lo: 35, hi: 95 }
      ] },
    { k: 'Arbeit & Zukunft', desc: 'Jugendarbeitslosigkeit, Qualifikationspassung, Abwanderung und Erwerbsbeteiligung von Frauen.',
      parts: [
        { k: 'youthUnemp', w: 0.30, lo: 30, hi: 5, inv: true },
        { k: 'skillsMatch', w: 0.25, lo: 30, hi: 95 },
        { k: 'brainDrain', w: 0.25, lo: 80, hi: 5, inv: true },
        { k: 'femaleLFP', w: 0.20, lo: 25, hi: 68 }
      ] },
    { k: 'Bildung & Gesundheit', desc: 'Schulqualität, Gesundheitsversorgung und Ernährungslage.',
      parts: [
        { k: 'education', w: 0.35, lo: 35, hi: 97 },
        { k: 'health', w: 0.35, lo: 45, hi: 92 },
        { k: 'malnutrition', w: 0.30, lo: 60, hi: 3, inv: true }
      ] },
    { k: 'Staat & Recht', desc: 'Korruption, Verwaltungsfähigkeit, Rechtsstaatlichkeit und digitaler Staat.',
      parts: [
        { k: 'corruption', w: 0.30, lo: 20, hi: 90 },
        { k: 'stateCap', w: 0.25, lo: 30, hi: 98 },
        { k: 'ruleOfLaw', w: 0.25, lo: 30, hi: 90 },
        { k: 'digitalGov', w: 0.20, lo: 25, hi: 95 }
      ] },
    { k: 'Freiheit & Teilhabe', desc: 'Pressefreiheit, Religionsfreiheit, Gleichbehandlung nach Herkunft und sprachliche Teilhabe.',
      parts: [
        { k: 'pressFree', w: 0.30, lo: 15, hi: 88 },
        { k: 'religFree', w: 0.25, lo: 10, hi: 88 },
        { k: 'casteEquity', w: 0.20, lo: 25, hi: 90 },
        { k: 'langAccess', w: 0.25, lo: 25, hi: 96 }
      ] },
    { k: 'Klima & Vorsorge', desc: 'Klimaresilienz, Katastrophenschutz, erneuerbare Energien und Ernährungssicherheit.',
      parts: [
        { k: 'climateRes', w: 0.30, lo: 20, hi: 90 },
        { k: 'disasterPrep', w: 0.25, lo: 25, hi: 92 },
        { k: 'renewables', w: 0.20, lo: 3, hi: 70 },
        { k: 'foodSec', w: 0.25, lo: 40, hi: 88 }
      ] },
    { k: 'Ungleichheit & Ausgleich', desc: 'Einkommensungleichheit und regionale Ausgewogenheit.',
      parts: [
        { k: 'inequality', w: 0.55, lo: 48, hi: 28, inv: true },
        { k: 'regionalBalance', w: 0.45, lo: 25, hi: 88 }
      ] }
  ];

  /* Wert eines Landes für einen Indikator; 'LK' liefert den
     laufenden Spielstand. */
  D.value = function (st, countryKey, indKey) {
    if (countryKey === 'LK') return st ? st.ind[indKey] : undefined;
    var row = D.VALUES[indKey];
    return row ? row[countryKey] : undefined;
  };

  D.note = function (countryKey, indKey) { return D.NOTES[indKey + '.' + countryKey] || null; };

  D.comparable = function (indKey) {
    return !D.NOT_COMPARABLE[indKey] && !!D.VALUES[indKey];
  };

  D.pop = function (countryKey) {
    return countryKey === 'LK' ? D.SRI_LANKA_POP : ((D.BY_KEY[countryKey] || {}).pop || 0);
  };

  /* Einen Bereich für ein Land nach der gemeinsamen Formel bewerten.
     Fehlt ein Indikator (Stadtstaat ohne Regionen, Binnenland ohne
     Küste), wird sein Gewicht auf die übrigen verteilt, statt eine
     Null einzusetzen. */
  D.areaScore = function (st, countryKey, area) {
    var sum = 0, wsum = 0;
    area.parts.forEach(function (p) {
      var v = D.value(st, countryKey, p.k);
      if (v === undefined || v === null || isNaN(v)) return;
      var t = (v - p.lo) / (p.hi - p.lo);
      t = t < 0 ? 0 : (t > 1 ? 1 : t);
      sum += t * 100 * p.w; wsum += p.w;
    });
    return wsum > 0 ? sum / wsum : null;
  };

  /* Alle Bereiche für ein Land, dazu der Gesamtwert */
  D.profile = function (st, countryKey) {
    var parts = D.AREAS.map(function (a) {
      return { k: a.k, desc: a.desc, v: D.areaScore(st, countryKey, a) };
    });
    var vals = parts.filter(function (p) { return p.v !== null; });
    var total = vals.length ? vals.reduce(function (a, p) { return a + p.v; }, 0) / vals.length : 0;
    return { parts: parts, total: total };
  };

  /* Rang Sri Lankas unter allen sieben, 1 ist der beste */
  D.rank = function (st, indKey) {
    if (!D.comparable(indKey)) return null;
    var meta = SL.model.IND_BY_KEY[indKey];
    if (!meta) return null;
    var list = [{ k: 'LK', v: st.ind[indKey] }];
    D.COUNTRIES.forEach(function (c) {
      var v = D.value(st, c.k, indKey);
      if (v !== undefined) list.push({ k: c.k, v: v });
    });
    list.sort(function (a, b) { return meta.inv ? a.v - b.v : b.v - a.v; });
    var pos = 0;
    for (var i = 0; i < list.length; i++) if (list[i].k === 'LK') pos = i + 1;
    return { pos: pos, of: list.length, order: list };
  };

})(SL.data.benchmarks = SL.data.benchmarks || {});
