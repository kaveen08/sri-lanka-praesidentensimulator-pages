/* ============================================================
   GEOGRAFIE  -  9 Provinzen, 25 Distrikte, Kommunalebene
   Die Karte ist bewusst schematisch: sie dient der Orientierung,
   nicht der Vermessung.
   ============================================================ */
(function (G) {
  'use strict';

  /* Die Umrisse sind aus echten Geokoordinaten projiziert:
     X = (Laenge - 79,60) * 78 + 12 ,  Y = (9,90 - Breite) * 79 + 10
     Das Sichtfeld ist damit 0 0 200 340. Punkt Pedro liegt oben,
     Dondra Head unten, Mannar und die Halbinsel Kalpitiya links. */
  G.VIEWBOX = '0 0 200 340';
  G.PROVINCES = [
    {
      k: 'WP', name: 'Westprovinz', capital: 'Colombo', pop: 6.10, gdpShare: 40,
      poverty: 8, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 82, tamil: 8, muslim: 9, other: 1 },
      note: 'Der wirtschaftliche Motor. Rund 40 % der Wirtschaftsleistung auf 6 % der Fläche. Genau darin liegt das regionale Ungleichgewicht.',
      path: 'M 30 211 L 32 235 L 40 262 L 43 283 L 59 283 L 55 255 L 55 227 Z',
      label: [43, 250], cap: [34, 237], color: '#22d3ee'
    },
    {
      k: 'CP', name: 'Zentralprovinz', capital: 'Kandy', pop: 2.80, gdpShare: 11,
      poverty: 22, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 64, tamil: 25, muslim: 10, other: 1 },
      note: 'Hochland, Tee, Universitäten. Heimat eines großen Teils der Malaiyaha-Tamilen und ihrer ungelösten Lohn- und Landfragen.',
      path: 'M 76 180 L 102 172 L 125 164 L 133 212 L 117 232 L 102 251 L 82 239 L 68 219 L 78 200 Z',
      label: [107, 194], cap: [92, 206], color: '#a78bfa'
    },
    {
      k: 'SP', name: 'Südprovinz', capital: 'Galle', pop: 2.60, gdpShare: 10,
      poverty: 20, council: 'seit 2019 ohne gewählten Rat',
      ethnic: { sinhala: 95, tamil: 2, muslim: 3, other: 0 },
      note: 'Tourismus, Fischerei, der Hafen Hambantota. Politisch traditionell entscheidend für nationale Mehrheiten.',
      path: 'M 43 283 L 47 289 L 60 316 L 89 324 L 105 317 L 131 309 L 147 301 L 152 269 L 130 275 L 110 279 L 82 283 L 59 283 Z',
      label: [96, 300], cap: [60, 314], color: '#34d399'
    },
    {
      k: 'NP', name: 'Nordprovinz', capital: 'Jaffna', pop: 1.15, gdpShare: 4,
      poverty: 32, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 3, tamil: 93, muslim: 3, other: 1 },
      note: 'Kern der ungelösten politischen Frage: Militärpräsenz, Landrückgabe, Verschwundene, Devolution. Zugleich mit Indien nur 50 km entfernt ein möglicher Handelsknoten.',
      path: 'M 60 15 L 64 19 L 86 46 L 106 60 L 120 80 L 110 93 L 110 111 L 74 117 L 45 125 L 39 117 L 35 97 L 37 83 L 22 74 L 39 73 L 51 46 L 76 40 L 59 32 L 39 30 L 32 26 L 47 18 Z',
      label: [75, 88], cap: [45, 29], color: '#f43f5e'
    },
    {
      k: 'EP', name: 'Ostprovinz', capital: 'Trincomalee', pop: 1.75, gdpShare: 6,
      poverty: 27, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 23, tamil: 39, muslim: 37, other: 1 },
      note: 'Die einzige Provinz ohne Bevölkerungsmehrheit. Jede Entscheidung über Zusammenlegung mit dem Norden trifft hier drei Gemeinschaften gleichzeitig.',
      path: 'M 120 80 L 121 86 L 139 115 L 146 123 L 154 150 L 176 182 L 186 207 L 186 249 L 152 269 L 149 247 L 141 232 L 133 212 L 125 164 L 125 152 L 121 136 L 110 111 L 110 93 Z',
      label: [152, 180], cap: [138, 115], color: '#fb923c'
    },
    {
      k: 'NW', name: 'Nordwestprovinz', capital: 'Kurunegala', pop: 2.50, gdpShare: 10,
      poverty: 19, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 85, tamil: 3, muslim: 11, other: 1 },
      note: 'Kokos, Reis, Garnelenzucht. Bevölkerungsreich und deshalb bei jeder Wahl ein Schwergewicht.',
      path: 'M 39 117 L 35 132 L 24 132 L 32 152 L 30 158 L 28 193 L 30 211 L 55 227 L 68 219 L 78 200 L 76 180 L 63 160 L 51 144 L 45 125 Z',
      label: [50, 175], cap: [71, 200], color: '#60a5fa'
    },
    {
      k: 'NC', name: 'Nordzentralprovinz', capital: 'Anuradhapura', pop: 1.40, gdpShare: 5,
      poverty: 22, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 91, tamil: 2, muslim: 7, other: 0 },
      note: 'Trockenzone mit den historischen Bewässerungstanks und den buddhistischen Stätten. Chronische Nierenerkrankung unbekannter Ursache ist hier ein großes Gesundheitsproblem.',
      path: 'M 110 111 L 121 136 L 125 152 L 125 164 L 102 172 L 76 180 L 63 160 L 51 144 L 45 125 L 74 117 Z',
      label: [95, 152], cap: [75, 136], color: '#fbbf24'
    },
    {
      k: 'UV', name: 'Uva-Provinz', capital: 'Badulla', pop: 1.30, gdpShare: 5,
      poverty: 30, council: 'seit 2019 ohne gewählten Rat',
      ethnic: { sinhala: 72, tamil: 20, muslim: 7, other: 1 },
      note: 'Die ärmste Provinz nach Kopfeinkommen. Tee, Zuckerrohr, schlechte Verkehrsanbindung.',
      path: 'M 133 212 L 141 232 L 149 247 L 152 269 L 130 275 L 110 279 L 106 263 L 102 251 L 117 232 Z',
      label: [128, 258], cap: [126, 240], color: '#f472b6'
    },
    {
      k: 'SG', name: 'Sabaragamuwa', capital: 'Ratnapura', pop: 2.00, gdpShare: 7,
      poverty: 24, council: 'seit 2019 ohne gewählten Rat',
      ethnic: { sinhala: 86, tamil: 9, muslim: 5, other: 0 },
      note: 'Edelsteine, Kautschuk, Tee. Erdrutschgefährdet und bei jedem Monsun in den Katastrophenmeldungen.',
      path: 'M 68 219 L 82 239 L 102 251 L 106 263 L 110 279 L 82 283 L 59 283 L 55 255 L 55 227 Z',
      label: [78, 248], cap: [74, 264], color: '#a3e635'
    }
  ];
  G.PROV_BY_KEY = {};
  G.PROVINCES.forEach(function (p) { G.PROV_BY_KEY[p.k] = p; });

  /* --- 25 Distrikte --- */
  G.DISTRICTS = [
    { k: 'colombo',     name: 'Colombo',      prov: 'WP', pop: 2.42, note: 'Hauptstadtregion, Hafen, Finanzplatz.' },
    { k: 'gampaha',     name: 'Gampaha',      prov: 'WP', pop: 2.42, note: 'Industriegürtel, Flughafen Katunayake, Freihandelszonen.' },
    { k: 'kalutara',    name: 'Kalutara',     prov: 'WP', pop: 1.30, note: 'Kautschuk, Küstentourismus.' },
    { k: 'kandy',       name: 'Kandy',        prov: 'CP', pop: 1.47, note: 'Zahntempel, Universität Peradeniya, medizinisches Zentrum.' },
    { k: 'matale',      name: 'Matale',       prov: 'CP', pop: 0.51, note: 'Gewürze, Trockenzonenlandwirtschaft.' },
    { k: 'nuwaraeliya', name: 'Nuwara Eliya', prov: 'CP', pop: 0.75, note: 'Kernland der Malaiyaha-Tamilen und der Teeplantagen.' },
    { k: 'galle',       name: 'Galle',        prov: 'SP', pop: 1.10, note: 'Hafen, Tourismus, Fischerei.' },
    { k: 'matara',      name: 'Matara',       prov: 'SP', pop: 0.85, note: 'Tee, Fischerei, südlichster Punkt.' },
    { k: 'hambantota',  name: 'Hambantota',   prov: 'SP', pop: 0.68, note: 'Chinesisch betriebener Tiefwasserhafen, Industriezone, Salz.' },
    { k: 'jaffna',      name: 'Jaffna',       prov: 'NP', pop: 0.62, note: 'Kulturelles Zentrum der srilankischen Tamilen, starke Diaspora-Bindung.' },
    { k: 'kilinochchi', name: 'Kilinochchi',  prov: 'NP', pop: 0.13, note: 'Ehemaliges LTTE-Verwaltungszentrum, hohe Kriegsschäden.' },
    { k: 'mannar',      name: 'Mannar',       prov: 'NP', pop: 0.11, note: 'Fährverbindung nach Indien, Windkraftpotenzial, Massengräber.' },
    { k: 'vavuniya',    name: 'Vavuniya',     prov: 'NP', pop: 0.19, note: 'Verkehrsknoten zwischen Norden und Süden.' },
    { k: 'mullaitivu',  name: 'Mullaitivu',   prov: 'NP', pop: 0.10, note: 'Schauplatz der letzten Kriegsphase 2009, höchste Militärdichte.' },
    { k: 'trincomalee', name: 'Trincomalee',  prov: 'EP', pop: 0.44, note: 'Einer der besten Naturhäfen der Welt, Öltanklager, strategisch umkämpft.' },
    { k: 'batticaloa',  name: 'Batticaloa',   prov: 'EP', pop: 0.56, note: 'Lagunen, Fischerei, tamilisch geprägt.' },
    { k: 'ampara',      name: 'Ampara',       prov: 'EP', pop: 0.75, note: 'Dreigeteilt zwischen Muslimen, Tamilen und Sinhalesen, Reiskammer.' },
    { k: 'kurunegala',  name: 'Kurunegala',   prov: 'NW', pop: 1.75, note: 'Bevölkerungsreichster Distrikt außerhalb der Westprovinz.' },
    { k: 'puttalam',    name: 'Puttalam',     prov: 'NW', pop: 0.85, note: 'Salz, Garnelen, große muslimische Bevölkerung, Vertriebene von 1990.' },
    { k: 'anuradhapura',name: 'Anuradhapura', prov: 'NC', pop: 0.94, note: 'Antike Hauptstadt, Bewässerungslandwirtschaft, CKDu-Schwerpunkt.' },
    { k: 'polonnaruwa', name: 'Polonnaruwa',  prov: 'NC', pop: 0.45, note: 'Reisanbau, Welterbestätte.' },
    { k: 'badulla',     name: 'Badulla',      prov: 'UV', pop: 0.88, note: 'Tee, Bahnstrecke ins Hochland, hohe Armut.' },
    { k: 'monaragala',  name: 'Monaragala',   prov: 'UV', pop: 0.50, note: 'Ärmster Distrikt des Landes, Zuckerrohr, Mensch-Elefant-Konflikt.' },
    { k: 'ratnapura',   name: 'Ratnapura',    prov: 'SG', pop: 1.14, note: 'Edelsteine, Kautschuk, hohes Erdrutschrisiko.' },
    { k: 'kegalle',     name: 'Kegalle',      prov: 'SG', pop: 0.86, note: 'Kautschuk, Gewürze, dicht besiedeltes Hügelland.' }
  ];

  /* --- Kommunalebene (aggregiert) --- */
  G.LOCAL = {
    municipal: 29,   /* Municipal Councils */
    urban: 36,       /* Urban Councils */
    pradeshiya: 276, /* Pradeshiya Sabhas */
    total: 341,
    note: 'Kommunalwahlen fanden zuletzt im Mai 2025 statt. Die Kommunen haben Aufgaben, aber kaum eigene Einnahmen.'
  };

  /* --- Aufgabenbereiche fuer die Kompetenzmatrix --- */
  G.COMPETENCES = [
    { k: 'police', label: 'Polizei und öffentliche Ordnung', current: 'nation',
      d13: true, sensitive: true,
      note: 'Der 13. Verfassungszusatz sieht Provinzpolizeikräfte vor. Sie wurden nie eingerichtet. Für tamilische Parteien ist das der Kern der Devolutionsfrage, für nationalistische Kräfte eine rote Linie.',
      eff: { nation: { internalSec: 3, sinhalaPress: -4, trustTamil: -3 },
             province: { trustTamil: 14, reconcile: 8, sinhalaPress: 16, internalSec: -3, militaryMor: -6 },
             district: { trustTamil: 5, sinhalaPress: 6, internalSec: 1 },
             local: { internalSec: -6, corruption: -4, trustTamil: 3, sinhalaPress: 8 } } },
    { k: 'land', label: 'Landverwaltung und Landvergabe', current: 'nation',
      d13: true, sensitive: true,
      note: 'Formell devolviert, faktisch über die National Land Commission und Staatsbehörden zentral gesteuert. Landfragen im Norden und Osten sind seit Jahrzehnten Konfliktstoff.',
      eff: { nation: { sinhalaPress: -3, trustTamil: -5, reconcile: -3 },
             province: { trustTamil: 13, reconcile: 9, sinhalaPress: 14, agriProd: 2 },
             district: { trustTamil: 5, stateCap: 3, sinhalaPress: 5 },
             local: { corruption: -6, trustTamil: 4, sinhalaPress: 7 } } },
    { k: 'schoolPrimary', label: 'Grundschulen', current: 'province',
      note: 'Bereits weitgehend bei den Provinzen. Die Qualitätsunterschiede zwischen Colombo und dem Hochland sind trotzdem enorm.',
      eff: { nation: { education: 3, regionalBalance: 4, langAccess: -3 },
             province: { education: 2, langAccess: 4, trustTamil: 3 },
             district: { education: 1, stateCap: 2 },
             local: { education: -3, corruption: -3, legitimacy: 3 } } },
    { k: 'schoolSecondary', label: 'Weiterführende Schulen', current: 'nation',
      note: 'Nationale Schulen liegen beim Zentralstaat, Provinzschulen bei den Räten. Diese Zweiteilung zementiert Ungleichheit.',
      eff: { nation: { education: 4, regionalBalance: -3 },
             province: { education: 1, regionalBalance: 5, langAccess: 4 },
             district: { education: 2, regionalBalance: 3 },
             local: { education: -4, regionalBalance: 2 } } },
    { k: 'university', label: 'Hochschulen', current: 'nation',
      note: 'Zentral über die University Grants Commission. Zulassung nach Distriktquoten, was für sich schon eine Verteilungspolitik ist.',
      eff: { nation: { education: 4, skillsMatch: 2 },
             province: { education: -2, regionalBalance: 6, skillsMatch: 3 },
             district: { education: -4, regionalBalance: 4 },
             local: { education: -8, stateCap: -4 } } },
    { k: 'primaryHealth', label: 'Primärversorgung und Kliniken', current: 'province',
      note: 'Provinzsache. Personalmangel und Abwanderung von Pflegekräften treffen die Provinzen ungleich hart.',
      eff: { nation: { health: 2, regionalBalance: 3 },
             province: { health: 3, legitimacy: 3, trustTamil: 2 },
             district: { health: 2, stateCap: 2 },
             local: { health: -2, legitimacy: 4 } } },
    { k: 'hospitals', label: 'Krankenhäuser der Vollversorgung', current: 'nation',
      note: 'Teaching Hospitals zentral, Basiskrankenhäuser provinziell. Bei Ausrüstung und Medikamenten entscheidet Colombo.',
      eff: { nation: { health: 5, regionalBalance: -2 },
             province: { health: 1, regionalBalance: 5 },
             district: { health: -1, regionalBalance: 4 },
             local: { health: -7, stateCap: -4 } } },
    { k: 'roads', label: 'Straßen und Verkehrswege', current: 'nation',
      note: 'Fernstraßen national, Nebenstraßen provinziell und kommunal. Nach Ditwah ist die Zuständigkeitsfrage sehr praktisch geworden.',
      eff: { nation: { infra: 4, regionalBalance: -3 },
             province: { infra: 2, regionalBalance: 4 },
             district: { infra: 2, regionalBalance: 3, stateCap: 2 },
             local: { infra: -2, corruption: -4, legitimacy: 4 } } },
    { k: 'water', label: 'Wasser und Abwasser', current: 'nation',
      note: 'Das National Water Supply and Drainage Board ist zentral. Ländliche Versorgung hängt an Kommunen und Gemeinschaftsprojekten.',
      eff: { nation: { housing: 3, infra: 2 },
             province: { housing: 2, regionalBalance: 3 },
             district: { housing: 2, stateCap: 2 },
             local: { housing: 3, legitimacy: 4, corruption: -3 } } },
    { k: 'waste', label: 'Abfall und Stadtreinigung', current: 'local',
      note: 'Kommunale Aufgabe. Die Mülldeponie Meethotamulla stürzte 2017 ein und tötete Dutzende Menschen.',
      eff: { nation: { stateCap: -2, housing: 1 },
             province: { housing: 2 },
             district: { housing: 2 },
             local: { housing: 3, legitimacy: 3, corruption: -2 } } },
    { k: 'agriculture', label: 'Landwirtschaft und Bewässerung', current: 'province',
      note: 'Große Bewässerungssysteme national, kleinere provinziell. Die Trennung führt regelmäßig zu Zuständigkeitslücken.',
      eff: { nation: { agriProd: 3, foodSec: 3 },
             province: { agriProd: 3, farmersTrust: 0, regionalBalance: 3 },
             district: { agriProd: 2, stateCap: 2 },
             local: { agriProd: -1, legitimacy: 3 } } },
    { k: 'fisheries', label: 'Fischerei und Küstenschutz', current: 'nation',
      note: 'Konflikte mit indischen Trawlern in der Palkstraße machen daraus zugleich Außenpolitik.',
      eff: { nation: { maritimeSec: 4, relIndia: 2 },
             province: { maritimeSec: -2, trustTamil: 4, regionalBalance: 2 },
             district: { maritimeSec: -1, regionalBalance: 2 },
             local: { maritimeSec: -4, legitimacy: 3 } } },
    { k: 'business', label: 'Gewerbeaufsicht und Genehmigungen', current: 'nation',
      note: 'Ein Unternehmer braucht heute Genehmigungen von mehreren Ebenen gleichzeitig. Genau das schreckt Investoren ab.',
      eff: { nation: { privateSector: 3, corruption: 2 },
             province: { privateSector: 1, regionalBalance: 4 },
             district: { privateSector: 3, stateCap: 3 },
             local: { privateSector: -3, corruption: -5 } } },
    { k: 'disaster', label: 'Katastrophenschutz', current: 'nation',
      note: 'Das Disaster Management Centre ist zentral. Bei Ditwah zeigte sich, dass ohne lokale Kapazität die ersten 48 Stunden verloren gehen.',
      eff: { nation: { disasterPrep: 3, climateRes: 2 },
             province: { disasterPrep: 3, climateRes: 2 },
             district: { disasterPrep: 5, climateRes: 3, stateCap: 2 },
             local: { disasterPrep: 4, legitimacy: 4, climateRes: 2 } } },
    { k: 'taxation', label: 'Eigene Steuern und Abgaben', current: 'nation',
      d13: true,
      note: 'Provinzen dürfen laut Verfassung bestimmte Steuern erheben, tun es aber kaum. Ohne eigene Einnahmen bleibt Devolution eine leere Hülle.',
      eff: { nation: { taxCompl: 3, regionalBalance: -4 },
             province: { taxCompl: -2, regionalBalance: 6, trustTamil: 8, sinhalaPress: 9, stateCap: -2 },
             district: { taxCompl: -1, regionalBalance: 4 },
             local: { taxCompl: -4, corruption: -5, regionalBalance: 3, legitimacy: 3 } } },
    { k: 'housing', label: 'Wohnungsbau', current: 'nation',
      note: 'Nach Ditwah wurden bis zu 5 Mio. LKR pro zerstörtem Haus zugesagt. Die Abwicklung entscheidet über die Glaubwürdigkeit.',
      eff: { nation: { housing: 4, regionalBalance: -2 },
             province: { housing: 3, regionalBalance: 3 },
             district: { housing: 3, stateCap: 2 },
             local: { housing: 2, legitimacy: 5, corruption: -3 } } },
    { k: 'culture', label: 'Kultur, Sprache und Gedenken', current: 'nation',
      sensitive: true,
      note: 'Wer über Denkmäler, Gedenktage und Ortsnamen entscheidet, entscheidet über die Erzählung des Krieges.',
      eff: { nation: { sinhalaPress: -4, trustTamil: -6, reconcile: -4 },
             province: { trustTamil: 10, reconcile: 7, sinhalaPress: 11, langAccess: 5 },
             district: { trustTamil: 4, langAccess: 3, sinhalaPress: 4 },
             local: { trustTamil: 6, langAccess: 4, sinhalaPress: 6, legitimacy: 3 } } }
  ];

  /* --- Formeln fuer den Finanzausgleich --- */
  G.TRANSFER_FORMULAS = [
    { k: 'status', label: 'Fortschreibung wie bisher',
      desc: 'Jede Provinz erhält ungefähr das, was sie im Vorjahr bekam. Bequem, aber zementiert bestehende Ungleichheit.',
      eff: { regionalBalance: -2, stateCap: 1, sinhalaPress: 0 }, weights: null },
    { k: 'percapita', label: 'Reine Kopfpauschale',
      desc: 'Gleicher Betrag pro Kopf. Wirkt fair, benachteiligt aber dünn besiedelte und kriegszerstörte Gebiete mit hohen Stückkosten.',
      eff: { regionalBalance: 2, trustTamil: -2 }, weights: { pop: 1 } },
    { k: 'need', label: 'Bedarfsorientiert (Armut und Rückstand)',
      desc: 'Verteilung nach Armutsquote, Infrastrukturlücke und Kriegsschäden. Der Norden, der Osten und Uva gewinnen deutlich.',
      eff: { regionalBalance: 7, trustTamil: 7, trustHill: 6, sinhalaPress: 7 }, weights: { pop: 0.5, poverty: 1.4 } },
    { k: 'equalise', label: 'Finanzausgleich mit Mindestausstattung',
      desc: 'Jede Provinz erhält eine garantierte Grundausstattung pro Kopf, darüber hinaus wird nach Bedarf ausgeglichen. Vorbild sind föderale Ausgleichssysteme.',
      eff: { regionalBalance: 9, trustTamil: 8, trustHill: 7, sinhalaPress: 9, stateCap: 2 }, weights: { pop: 0.8, poverty: 1.0 } },
    { k: 'performance', label: 'Leistungsorientiert',
      desc: 'Mehr Geld für Provinzen, die Ziele erreichen und sauber abrechnen. Belohnt starke Verwaltungen und bestraft schwache doppelt.',
      eff: { regionalBalance: -4, stateCap: 6, corruption: 4, trustTamil: -4 }, weights: { pop: 0.7, gdp: 0.6 } }
  ];

})(SL.data.geo = SL.data.geo || {});
