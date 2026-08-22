/* ============================================================
   MODELL  -  Indikatorregister, Bevoelkerungsgruppen, Ressorts
   ============================================================ */
(function (M) {
  'use strict';

  /* ---------------------------------------------------------
     Indikatoren
     inv = true  -> niedriger ist besser
     fmt: pct | num | idx | usd | rate | mt
     --------------------------------------------------------- */
  M.INDICATORS = [
    /* --- Makrooekonomie --- */
    { k: 'growth',      g: 'makro', label: 'BIP-Wachstum (real)',      unit: '%',        min: -8, max: 9,   fmt: 'pct',  desc: 'Reales Wirtschaftswachstum im Jahresvergleich.' },
    { k: 'inflation',   g: 'makro', label: 'Inflation (CCPI)',         unit: '%',        min: -3, max: 60,  fmt: 'pct',  inv: true, desc: 'Verbraucherpreisinflation. Zielband der Zentralbank: 5 %.' },
    { k: 'debtGdp',     g: 'makro', label: 'Staatsverschuldung',       unit: '% BIP',    min: 40, max: 145, fmt: 'pct',  inv: true, desc: 'Oeffentliche Gesamtverschuldung. IWF-Ziel: unter 95 % bis 2032.' },
    { k: 'reserves',    g: 'makro', label: 'Devisenreserven',          unit: 'Mrd. USD', min: 0,  max: 16,  fmt: 'usd',  desc: 'Bruttoreserven der Zentralbank. Unter 3 Mrd. wird es kritisch.' },
    { k: 'fx',          g: 'makro', label: 'Wechselkurs',              unit: 'LKR/USD',  min: 180, max: 700, fmt: 'num', inv: true, desc: 'Rupie zum US-Dollar.' },
    { k: 'unemp',       g: 'makro', label: 'Arbeitslosigkeit',         unit: '%',        min: 1,  max: 18,  fmt: 'pct',  inv: true, desc: 'Offizielle Arbeitslosenquote.' },
    { k: 'youthUnemp',  g: 'makro', label: 'Jugendarbeitslosigkeit',   unit: '%',        min: 3,  max: 45,  fmt: 'pct',  inv: true, desc: 'Arbeitslosigkeit der 15- bis 24-Jaehrigen.' },
    { k: 'fdi',         g: 'makro', label: 'Auslandsinvestitionen',    unit: '% BIP',    min: 0,  max: 7,   fmt: 'pct',  desc: 'Auslaendische Direktinvestitionen als Anteil am BIP.' },
    { k: 'exports',     g: 'makro', label: 'Warenexporte',             unit: 'Mrd. USD', min: 4,  max: 30,  fmt: 'usd',  desc: 'Warenexporte pro Jahr.' },
    { k: 'tourism',     g: 'makro', label: 'Tourismus',                unit: 'Mio. Gäste', min: 0, max: 6,  fmt: 'num',  desc: 'Internationale Ankuenfte pro Jahr.' },
    { k: 'remittances', g: 'makro', label: 'Rücküberweisungen',        unit: 'Mrd. USD', min: 2,  max: 12,  fmt: 'usd',  desc: 'Ueberweisungen von Auslandssrilankern.' },
    { k: 'privateSector', g: 'makro', label: 'Privatsektor-Stärke',    unit: 'Index',    min: 0,  max: 100, fmt: 'idx',  desc: 'Investitionsklima, Unternehmensgruendungen, Wettbewerb.' },
    { k: 'soeHealth',   g: 'makro', label: 'Staatsunternehmen',        unit: 'Index',    min: 0,  max: 100, fmt: 'idx',  desc: 'Finanzielle Gesundheit der Staatsbetriebe (CEB, CPC, SriLankan u.a.).' },
    { k: 'infra',       g: 'makro', label: 'Infrastruktur',            unit: 'Index',    min: 0,  max: 100, fmt: 'idx',  desc: 'Strassen, Haefen, Bahn, Wasser, Netzanbindung.' },
    { k: 'regionalBalance', g: 'makro', label: 'Regionale Ausgewogenheit', unit: 'Index', min: 0, max: 100, fmt: 'idx', desc: 'Wie stark haengt Wohlstand am Grossraum Colombo? Hohe Werte bedeuten mehrere funktionierende Wirtschaftszentren.' },

    /* --- Soziales --- */
    { k: 'poverty',     g: 'sozial', label: 'Armutsquote',             unit: '%',        min: 3,  max: 45,  fmt: 'pct', inv: true, desc: 'Anteil unter der nationalen Armutsgrenze (Weltbank 2024: 24,5 %).' },
    { k: 'inequality',  g: 'sozial', label: 'Ungleichheit (Gini)',     unit: 'Index',    min: 20, max: 65,  fmt: 'idx', inv: true, desc: 'Einkommensungleichheit.' },
    { k: 'education',   g: 'sozial', label: 'Bildungsqualität',        unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Schul- und Hochschulqualitaet.' },
    { k: 'skillsMatch', g: 'sozial', label: 'Qualifikationspassung',   unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Passt die Ausbildung zu dem, was Arbeitgeber suchen?' },
    { k: 'health',      g: 'sozial', label: 'Gesundheitssystem',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Leistungsfaehigkeit der kostenlosen Gesundheitsversorgung.' },
    { k: 'malnutrition',g: 'sozial', label: 'Mangelernährung',         unit: 'Index',    min: 0,  max: 100, fmt: 'idx', inv: true, desc: 'Unter- und Fehlernaehrung, v.a. bei Kindern.' },
    { k: 'socialProt',  g: 'sozial', label: 'Soziale Sicherung',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Treffsicherheit und Hoehe von Aswesuma und anderen Transfers.' },
    { k: 'femaleLFP',   g: 'sozial', label: 'Erwerbsquote Frauen',     unit: '%',        min: 20, max: 70,  fmt: 'pct', desc: 'Erwerbsbeteiligung von Frauen (2025: rund 31 %).' },
    { k: 'brainDrain',  g: 'sozial', label: 'Abwanderungsdruck',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', inv: true, desc: 'Wie stark Fachkraefte das Land verlassen.' },
    { k: 'housing',     g: 'sozial', label: 'Wohnen & Versorgung',     unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Wohnraum, Wasser, Sanitaerversorgung.' },

    /* --- Staat & Institutionen --- */
    { k: 'corruption',  g: 'staat', label: 'Korruptionsindex (CPI)',   unit: '/100',     min: 0,  max: 100, fmt: 'idx', desc: 'Transparency International: 2025 = 35/100, Rang 107.' },
    { k: 'stateCap',    g: 'staat', label: 'Verwaltungsfähigkeit',     unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Kann der Staat Beschlossenes auch umsetzen?' },
    { k: 'ruleOfLaw',   g: 'staat', label: 'Rechtsstaatlichkeit',      unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Unabhaengigkeit der Justiz, Gleichheit vor dem Gesetz.' },
    { k: 'digitalGov',  g: 'staat', label: 'Digitaler Staat',          unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Digitale ID, e-Government, digitale Steuerverwaltung.' },
    { k: 'pressFree',   g: 'staat', label: 'Presse- & Meinungsfreiheit', unit: 'Index',  min: 0,  max: 100, fmt: 'idx', desc: 'Medienfreiheit, Versammlungsfreiheit, Zivilgesellschaft.' },
    { k: 'taxCompl',    g: 'staat', label: 'Steuermoral & Erfassung',  unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Wie breit ist die Steuerbasis, wie gut die Compliance?' },
    { k: 'legitimacy',  g: 'staat', label: 'Institutionenvertrauen',   unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Vertrauen der Bevoelkerung in staatliche Institutionen.' },

    /* --- Gesellschaftlicher Zusammenhalt --- */
    { k: 'reconcile',   g: 'zusammen', label: 'Nationale Versöhnung',  unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Fortschritt bei Aufarbeitung, Gerechtigkeit und gemeinsamem Staatsverstaendnis.' },
    { k: 'trustTamil',  g: 'zusammen', label: 'Vertrauen Norden/Osten',unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Vertrauen srilankischer Tamilen in die Zentralregierung.' },
    { k: 'trustMuslim', g: 'zusammen', label: 'Vertrauen Muslime',     unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Vertrauen der muslimischen Gemeinschaft.' },
    { k: 'trustHill',   g: 'zusammen', label: 'Vertrauen Malaiyaha',   unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Vertrauen der Malaiyaha-Tamilen im Plantagenhochland.' },
    { k: 'sinhalaPress',g: 'zusammen', label: 'Nationalistischer Druck', unit: 'Index',  min: 0,  max: 100, fmt: 'idx', inv: true, desc: 'Mobilisierung sinhalesisch-buddhistischer Nationalisten gegen Reformen.' },
    { k: 'religFree',   g: 'zusammen', label: 'Religionsfreiheit',     unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Gleichbehandlung der Religionsgemeinschaften.' },
    { k: 'casteEquity', g: 'zusammen', label: 'Kastengleichheit',      unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Abbau von Kastendiskriminierung, besonders im Norden und im Hochland.' },
    { k: 'langAccess',  g: 'zusammen', label: 'Sprachliche Teilhabe',  unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Praktische Umsetzung der Zweisprachigkeit in Behoerden, Polizei, Justiz.' },

    /* --- Sicherheit --- */
    { k: 'militaryCap', g: 'sicher', label: 'Militärische Fähigkeit',  unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Einsatzfaehigkeit von Armee, Marine, Luftwaffe.' },
    { k: 'militaryMor', g: 'sicher', label: 'Truppenmoral',            unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Zufriedenheit und Loyalitaet der Streitkraefte.' },
    { k: 'internalSec', g: 'sicher', label: 'Innere Sicherheit',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Kriminalitaet, Drogen, organisierte Bandenstrukturen.' },
    { k: 'maritimeSec', g: 'sicher', label: 'Maritime Sicherheit',     unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Kontrolle der Seewege und der ausschliesslichen Wirtschaftszone.' },
    { k: 'veteran',     g: 'sicher', label: 'Veteranenfürsorge',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Versorgung von Kriegsveteranen und Hinterbliebenen.' },

    /* --- Klima & Umwelt --- */
    { k: 'climateRes',  g: 'klima', label: 'Klimaresilienz',           unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Widerstandsfaehigkeit gegen Fluten, Duerren, Zyklone.' },
    { k: 'disasterPrep',g: 'klima', label: 'Katastrophenschutz',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Fruehwarnung, Evakuierung, Wiederaufbaufaehigkeit.' },
    { k: 'renewables',  g: 'klima', label: 'Erneuerbare Energie',      unit: '% Strom',  min: 0,  max: 100, fmt: 'pct', desc: 'Anteil erneuerbarer Energien an der Stromerzeugung.' },
    { k: 'energyRel',   g: 'klima', label: 'Energieversorgung',        unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Verlaesslichkeit und Bezahlbarkeit der Stromversorgung.' },
    { k: 'forest',      g: 'klima', label: 'Waldbedeckung',            unit: '%',        min: 10, max: 45,  fmt: 'pct', desc: 'Anteil der Landflaeche mit Waldbedeckung.' },
    { k: 'emissions',   g: 'klima', label: 'Treibhausgase',            unit: 'Mt CO2e',  min: 8,  max: 45,  fmt: 'mt',  inv: true, desc: 'Jaehrliche Emissionen.' },
    { k: 'agriProd',    g: 'klima', label: 'Agrarproduktivität',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Ertrag, Lagerung, Bewaesserung, Vermarktung.' },
    { k: 'foodSec',     g: 'klima', label: 'Ernährungssicherheit',     unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Verfuegbarkeit und Bezahlbarkeit von Grundnahrungsmitteln.' },

    /* --- Aussenbeziehungen --- */
    { k: 'relIndia',    g: 'aussen', label: 'Verhältnis Indien',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Beziehungen zum wichtigsten Nachbarn und Handelspartner.' },
    { k: 'relChina',    g: 'aussen', label: 'Verhältnis China',        unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Beziehungen zum groessten bilateralen Glaeubiger.' },
    { k: 'relWest',     g: 'aussen', label: 'Verhältnis Westen',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'EU, USA, Vereinigtes Koenigreich: Exportmaerkte, GSP+, Menschenrechte.' },
    { k: 'relJapan',    g: 'aussen', label: 'Verhältnis Japan',        unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Wichtiger Geber und Infrastrukturpartner.' },
    { k: 'relGulf',     g: 'aussen', label: 'Verhältnis Golfstaaten',  unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Arbeitsmigration, Energie, Investitionen.' },
    { k: 'imfCompl',    g: 'aussen', label: 'IWF-Programmtreue',       unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Erfuellung der Auflagen des Kreditprogramms.' },
    { k: 'diaspora',    g: 'aussen', label: 'Diaspora-Einbindung',     unit: 'Index',    min: 0,  max: 100, fmt: 'idx', desc: 'Kapital, Wissen und politische Haltung der Auslandsgemeinden.' }
  ];

  M.IND_BY_KEY = {};
  M.INDICATORS.forEach(function (i) { M.IND_BY_KEY[i.k] = i; });

  M.IND_GROUPS = [
    { k: 'makro',    label: 'Wirtschaft & Finanzen', icon: '◈' },
    { k: 'sozial',   label: 'Soziales & Bildung',    icon: '◇' },
    { k: 'staat',    label: 'Staat & Institutionen', icon: '⬡' },
    { k: 'zusammen', label: 'Zusammenhalt',          icon: '◎' },
    { k: 'sicher',   label: 'Sicherheit',            icon: '⬢' },
    { k: 'klima',    label: 'Klima & Umwelt',        icon: '❖' },
    { k: 'aussen',   label: 'Außenbeziehungen',      icon: '⌖' }
  ];

  /* ---------------------------------------------------------
     Bevoelkerungs- und Interessengruppen
     w = Stimmengewicht bei Wahlen (Summe ~ 1)
     --------------------------------------------------------- */
  M.GROUPS = [
    { k: 'sinhalaRural', label: 'Sinhalesische Landbevölkerung', short: 'Sinh. Land',  w: 0.235, color: '#f59e0b',
      desc: 'Groesste Waehlergruppe. Preissensibel, wertkonservativ, empfindlich bei Devolution und Sicherheitsfragen.' },
    { k: 'sinhalaUrban', label: 'Sinhalesische Städter', short: 'Sinh. Stadt', w: 0.145, color: '#38bdf8',
      desc: 'Mittelschicht in Colombo, Kandy, Galle. Reformoffen, aber steuersensibel.' },
    { k: 'sangha',       label: 'Buddhistischer Klerus (Sangha)', short: 'Sangha', w: 0.045, color: '#fbbf24',
      desc: 'Mahanayaka-Thero und Tempelnetzwerke. Grosser moralischer Einfluss, Wächter von Artikel 9.' },
    { k: 'tamilNE',      label: 'Tamilen in Norden & Osten', short: 'Tamilen N/O', w: 0.098, color: '#f43f5e',
      desc: 'Fordern Devolution, Landrueckgabe, Aufklaerung des Verbleibs Verschwundener, Entmilitarisierung.' },
    { k: 'malaiyaha',    label: 'Malaiyaha-Tamilen (Plantagen)', short: 'Malaiyaha', w: 0.042, color: '#fb7185',
      desc: 'Hochland-Plantagenarbeiter. Loehne, Landrechte, Wohnraum, Staatsbuergerschaftsfolgen.' },
    { k: 'muslim',       label: 'Muslimische Gemeinschaft', short: 'Muslime', w: 0.096, color: '#34d399',
      desc: 'Ost, Colombo, Puttalam. Nach 2019 und den Zwangseinaescherungen von 2020/21 misstrauisch.' },
    { k: 'christian',    label: 'Christen & Burgher', short: 'Christen', w: 0.062, color: '#a78bfa',
      desc: 'Konfessionsuebergreifend. Osteranschlaege 2019 bis heute nicht vollstaendig aufgeklaert.' },
    { k: 'youth',        label: 'Junge Wähler (18–29)', short: 'Jugend', w: 0.100, color: '#22d3ee',
      desc: 'Traeger der Aragalaya 2022. Jobs, Perspektiven, Auswanderung, digitale Wirtschaft.' },
    { k: 'publicSector', label: 'Öffentlicher Dienst', short: 'Beamte', w: 0.062, color: '#60a5fa',
      desc: 'Rund 1,4 Mio. Beschaeftigte plus Angehoerige. Gehaelter, Pensionen, Stellenabbau.' },
    { k: 'business',     label: 'Unternehmen & Investoren', short: 'Wirtschaft', w: 0.038, color: '#a3e635',
      desc: 'Export, Tourismus, IT, Handel. Wollen Planbarkeit, weniger Buerokratie, stabile Steuern.' },
    { k: 'farmers',      label: 'Bauern & Fischer', short: 'Bauern', w: 0.052, color: '#84cc16',
      desc: 'Duenger, Bewaesserung, Aufkaufpreise, Wetterschaeden, Importkonkurrenz.' },
    { k: 'unions',       label: 'Gewerkschaften & Arbeiter', short: 'Gewerkschaften', w: 0.045, color: '#f472b6',
      desc: 'Bahn, Haefen, Gesundheit, Energie, Lehrer. Streikfaehig und gut organisiert.' },
    { k: 'military',     label: 'Streitkräfte & Veteranen', short: 'Militär', w: 0.035, color: '#94a3b8',
      desc: 'Rund 200.000 Aktive plus Veteranen. Sensibel bei Truppenabbau und Kriegsverbrechensfragen.' },
    { k: 'diaspora',     label: 'Diaspora', short: 'Diaspora', w: 0.010, color: '#c084fc',
      desc: 'Tamilische und sinhalesische Auslandsgemeinden. Kapital, Lobbyarbeit, internationale Aufmerksamkeit.' },
    { k: 'intl',         label: 'IWF, Geber & Märkte', short: 'International', w: 0.000, color: '#67e8f9',
      desc: 'Kein Wahlgewicht, aber entscheidend fuer Tranchen, Ratings und Kapitalzugang.' }
  ];
  M.GROUP_BY_KEY = {};
  M.GROUPS.forEach(function (g) { M.GROUP_BY_KEY[g.k] = g; });

  /* ---------------------------------------------------------
     Ressorts / Politikfelder
     --------------------------------------------------------- */
  M.DOMAINS = [
    { k: 'budget',     label: 'Haushalt & Steuern',        icon: '₨', color: '#22d3ee' },
    { k: 'state',      label: 'Staatsform & Verfassung',   icon: '⚖', color: '#60a5fa' },
    { k: 'identity',   label: 'Identität & Gleichstellung',icon: '☮', color: '#f43f5e' },
    { k: 'devolution', label: 'Provinzen & Kommunen',      icon: '⬒', color: '#a78bfa' },
    { k: 'military',   label: 'Verteidigung & Sicherheit', icon: '⬢', color: '#94a3b8' },
    { k: 'education',  label: 'Bildung',                   icon: '✎', color: '#fbbf24' },
    { k: 'health',     label: 'Gesundheit & Ernährung',    icon: '✚', color: '#34d399' },
    { k: 'economy',    label: 'Wirtschaft & Arbeit',       icon: '⚙', color: '#a3e635' },
    { k: 'agri',       label: 'Landwirtschaft & Fischerei',icon: '❦', color: '#84cc16' },
    { k: 'energy',     label: 'Energie & Staatsbetriebe',  icon: '⚡', color: '#fb923c' },
    { k: 'justice',    label: 'Justiz & Korruption',       icon: '§', color: '#f472b6' },
    { k: 'transport',  label: 'Verkehr & Mobilität',       icon: '⇄', color: '#38bdf8' },
    { k: 'digital',    label: 'Digitalisierung',           icon: '⌘', color: '#67e8f9' },
    { k: 'social',     label: 'Soziales & Gleichberechtigung', icon: '♁', color: '#c084fc' },
    { k: 'climate',    label: 'Klima & Katastrophenschutz',icon: '❖', color: '#2dd4bf' },
    { k: 'foreign',    label: 'Außenpolitik & Diaspora',   icon: '⌖', color: '#818cf8' }
  ];
  M.DOMAIN_BY_KEY = {};
  M.DOMAINS.forEach(function (d) { M.DOMAIN_BY_KEY[d.k] = d; });

  /* ---------------------------------------------------------
     Mehrheitserfordernisse
     --------------------------------------------------------- */
  M.NEEDS = {
    exec:       { label: 'Exekutiverlass',       short: 'ERLASS',      seats: 0,   color: 'cy',
                  desc: 'Praesidialdekret oder Kabinettsbeschluss. Kein Parlament noetig.' },
    simple:     { label: 'Einfache Mehrheit',    short: '113 SITZE',   seats: 113, color: 'blue',
                  desc: 'Mehrheit der 225 Abgeordneten.' },
    twothirds:  { label: 'Zweidrittelmehrheit',  short: '150 SITZE',   seats: 150, color: 'violet',
                  desc: 'Verfassungsaenderung: 150 der 225 Sitze erforderlich.' },
    referendum: { label: '2/3 + Volksabstimmung', short: '150 + REF.', seats: 150, color: 'red',
                  desc: 'Artikel 83 der Verfassung: zusaetzlich zwingend eine Volksabstimmung.' }
  };

  /* ---------------------------------------------------------
     Verwaltungsebenen fuer die Kompetenzmatrix
     --------------------------------------------------------- */
  M.LEVELS = [
    { k: 'nation',   label: 'Nation',   short: 'NAT',  cls: 'nat',
      desc: 'Zentralregierung in Colombo. Einheitliche Standards, aber weit weg von der Lebensrealitaet.' },
    { k: 'province', label: 'Provinz',  short: 'PROV', cls: 'prov',
      desc: '9 Provinzraete nach dem 13. Verfassungszusatz. Politisch der Kern der Devolutionsfrage.' },
    { k: 'district', label: 'Distrikt', short: 'DIST', cls: 'dist',
      desc: '25 Distriktsekretariate. Verwaltungsstark, aber nicht gewaehlt.' },
    { k: 'local',    label: 'Kommune',  short: 'KOM',  cls: 'loc',
      desc: '339 Kommunalvertretungen. Buergernah, aber oft ohne Geld und Fachpersonal.' }
  ];
  M.LEVEL_BY_KEY = {};
  M.LEVELS.forEach(function (l) { M.LEVEL_BY_KEY[l.k] = l; });

})(SL.model = SL.model || {});
