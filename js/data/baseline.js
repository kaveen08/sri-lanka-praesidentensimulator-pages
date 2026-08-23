/* ============================================================
   AUSGANGSLAGE  -  Sri Lanka, Stand Mitte 2026
   Alle Werte beruhen auf oeffentlich berichteten Groessenordnungen
   (IWF-Programmunterlagen, Haushalt 2026, Weltbank, CBSL, UNICEF,
   Transparency International). Sie sind fuer die Simulation
   gerundet und intern konsistent gemacht.
   ============================================================ */
(function (D) {
  'use strict';

  D.META = {
    startYear: 2026,
    startQuarter: 3,
    termEndYear: 2029,      /* Praesidentschaftswahl Herbst 2029 */
    termEndQuarter: 4,
    president: 'Anura Kumara Dissanayake',
    party: 'NPP',
    gdpNominal: 33000,      /* LKR Mrd. (rund 105 Mrd. USD) */
    population: 22.2,       /* Mio. */
    seatsTotal: 225,
    seatsGov: 159,          /* NPP nach der Parlamentswahl November 2024 */
    imfProgramQuartersLeft: 6
  };

  /* --- Quellenhinweise, im Spiel einsehbar --- */
  D.SOURCES = [
    { t: 'IWF: Kombinierte 5. und 6. Programmüberprüfung freigegeben (Mai 2026)', u: 'https://www.imf.org/en/news/articles/2026/05/27/pr26172-sri-lanka-imf-completes-combined-5th-and-6th-reviews-under-eff' },
    { t: 'IWF: Stabsvereinbarung zur 5./6. Überprüfung (April 2026)', u: 'https://www.imf.org/en/news/articles/2026/04/09/pr26113-sri-lanka-imf-staff-reaches-sla-combined-fifth-and-sixth-reviews-under-eff-arrangement' },
    { t: 'Weltbank: Schäden durch Zyklon Ditwah rund 4,1 Mrd. USD', u: 'https://www.worldbank.org/en/news/press-release/2025/12/22/damage-from-cyclone-ditwah-in-sri-lanka-estimated-at-4-1-billion' },
    { t: 'Haushalt 2026 – Kennzahlen (EconomyNext)', u: 'https://economynext.com/key-numbers-in-sri-lankas-2026-budget-247312/' },
    { t: 'Fiskalstrategie 2026, Präsident und Finanzminister Dissanayake', u: 'https://www.parliament.lk/uploads/documents/paperspresented/1759294676080148.pdf' },
    { t: 'Devisenreserven Juli 2026: 6,59 Mrd. USD', u: 'https://economynext.com/sri-lankas-foreign-reserves-up-2-1-pct-in-july-to-us6-59bn-280945/' },
    { t: 'Human Rights Watch: Weltbericht 2026, Kapitel Sri Lanka', u: 'https://www.hrw.org/world-report/2026/country-chapters/sri-lanka' },
    { t: 'International Crisis Group: Sri Lankas holpriger Weg zum politischen Neustart', u: 'https://www.crisisgroup.org/rpt/asia-pacific/sri-lanka/356-sri-lankas-bumpy-road-political-reset' },
    { t: 'Verité Research: Analyse des Haushalts 2026', u: 'https://www.publicfinance.lk/en/report/state-of-budget-2026' }
  ];

  /* ---------------------------------------------------------
     Indikator-Startwerte
     --------------------------------------------------------- */
  D.INDICATORS = {
    /* Makro */
    growth: 3.0,          /* IWF-Erwartung 2026 nach 5,0 % in 2025 */
    inflation: 6.5,       /* nationale Rate Juni 2026 */
    debtGdp: 100.0,       /* IWF: rund 100 % des BIP in 2026 */
    reserves: 6.59,       /* Ende Juli 2026 */
    fx: 308,
    unemp: 4.1,
    youthUnemp: 18.7,     /* 15-24 Jahre, Ende 2025; Frauen 21,6 % */
    fdi: 1.3,
    exports: 13.6,
    tourism: 2.6,
    remittances: 7.4,
    privateSector: 38,
    soeHealth: 34,
    infra: 44,
    regionalBalance: 30,

    /* Sozial */
    poverty: 23.8,        /* Weltbank 2024: 24,5 %, leicht ruecklaeufig */
    inequality: 40,
    education: 55,
    skillsMatch: 31,
    health: 58,
    malnutrition: 46,
    socialProt: 44,
    femaleLFP: 31.4,
    brainDrain: 68,
    housing: 45,

    /* Staat */
    corruption: 35,       /* CPI 2025: 35/100, Rang 107 */
    stateCap: 41,
    ruleOfLaw: 44,
    digitalGov: 32,
    pressFree: 55,
    taxCompl: 36,
    legitimacy: 48,

    /* Zusammenhalt */
    reconcile: 30,
    trustTamil: 26,
    trustMuslim: 38,
    trustHill: 30,
    sinhalaPress: 46,
    religFree: 52,
    casteEquity: 40,
    langAccess: 34,

    /* Sicherheit */
    militaryCap: 58,
    militaryMor: 52,
    internalSec: 47,
    maritimeSec: 44,
    veteran: 46,

    /* Klima */
    climateRes: 30,       /* Ditwah hat die Luecken schonungslos gezeigt */
    disasterPrep: 34,
    renewables: 41,
    energyRel: 52,
    forest: 29,
    emissions: 24,
    agriProd: 38,
    foodSec: 52,

    /* Aussen */
    relIndia: 66,
    relChina: 58,
    relWest: 55,
    relJapan: 60,
    relGulf: 57,
    imfCompl: 74,
    diaspora: 36
  };

  /* ---------------------------------------------------------
     Zustimmung nach Gruppen (0-100), Stand Mitte 2026.
     Die NPP hat 2024 mit grossem Vorschuss gewonnen, ein Teil
     davon ist inzwischen aufgebraucht.
     --------------------------------------------------------- */
  D.APPROVAL = {
    sinhalaRural: 51,
    sinhalaUrban: 55,
    sangha: 47,
    tamilNE: 34,
    malaiyaha: 40,
    muslim: 44,
    christian: 46,
    youth: 57,
    publicSector: 44,
    business: 45,
    farmers: 42,
    unions: 43,
    military: 43,
    diaspora: 33,
    intl: 68
  };

  /* ---------------------------------------------------------
     HAUSHALT  -  Einnahmen (LKR Mrd. pro Jahr)
     Summe 5.305 Mrd. entspricht der Haushaltsschaetzung 2026.
     --------------------------------------------------------- */
  D.REVENUE = [
    { k: 'vat',      label: 'Mehrwertsteuer (18 %)',            base: 1650, min: 900,  max: 2400, step: 10,
      note: 'Groesste Einzelquelle. Jeder Prozentpunkt Satz bringt rund 92 Mrd., trifft aber alle Haushalte.',
      elast: 0.45, strainNote: 'Breite Bemessungsgrundlage, schwer auszuweichen. Dafuer trifft jede Erhoehung sofort die Lebenshaltungskosten und damit die Strasse.',
      strain: { poverty: 2.2, inflation: 1.1, socialProt: -3, streetPressureX: 7 }, strainGrp: { sinhalaRural: -7, unions: -6, farmers: -5, youth: -4, business: -3 },
      eff: { inflation: 0.0045, poverty: 0.0055 }, grp: { sinhalaRural: -0.010, business: -0.004, intl: 0.006 } },
    { k: 'paye',     label: 'Lohn- und Einkommensteuer',        base: 480,  min: 220,  max: 1000, step: 5,
      note: 'Trifft vor allem die formell Beschaeftigten der Mittelschicht. Treiber der Auswanderung.',
      elast: 0.3, strainNote: 'Die schmalste Basis von allen: nur die formell Beschaeftigten. Wer hier zu stark zulangt, treibt genau die Fachkraefte ausser Landes, die man braucht. Auswanderung ist die einfachste Form der Steuervermeidung.',
      strain: { brainDrain: 9, skillsMatch: -5, femaleLFP: -2.5, taxCompl: -6, privateSector: -3 }, strainGrp: { sinhalaUrban: -9, youth: -8, publicSector: -6, business: -3, diaspora: -4 },
      eff: { brainDrain: 0.020, skillsMatch: -0.004 }, grp: { sinhalaUrban: -0.030, youth: -0.020, publicSector: -0.012 } },
    { k: 'corp',     label: 'Körperschaftsteuer',               base: 720,  min: 380,  max: 1300, step: 5,
      note: 'Hohe Saetze schrecken Investoren ab, niedrige Saetze reissen Loecher in den Haushalt.',
      elast: 0.32, strainNote: 'Gewinne lassen sich verlagern, Investitionen verschieben. Ueber einer bestimmten Schwelle steigt nicht das Aufkommen, sondern die Zahl der Holdinggesellschaften in Singapur.',
      strain: { fdi: -0.55, privateSector: -9, taxCompl: -5, exports: -2, unemp: 0.4 }, strainGrp: { business: -12, intl: -4, unions: 3, youth: -3 },
      eff: { fdi: -0.0016, privateSector: -0.016 }, grp: { business: -0.034, unions: 0.010 } },
    { k: 'customs',  label: 'Zölle und Einfuhrabgaben',         base: 610,  min: 300,  max: 1100, step: 5,
      note: 'Einfach einzutreiben, verteuert aber Vorprodukte und schwaecht die Exportwirtschaft.',
      elast: 0.38, strainNote: 'Hohe Saetze machen Schmuggel und Unterfakturierung lohnend. Der Zoll verdient daran mit, der Haushalt nicht.',
      strain: { exports: -3.5, inflation: 1.4, corruption: -6, privateSector: -5, taxCompl: -4 }, strainGrp: { business: -8, farmers: -3, sinhalaUrban: -3 },
      eff: { exports: -0.0035, inflation: 0.0035, privateSector: -0.012 }, grp: { business: -0.018, farmers: 0.010 } },
    { k: 'excise',   label: 'Verbrauchsteuern (Alkohol, Tabak, Kfz)', base: 940, min: 500, max: 1500, step: 5,
      note: 'Politisch vergleichsweise leicht zu erhoehen. Gesundheitlicher Nebennutzen.',
      elast: 0.42, strainNote: 'Nachfrage reagiert traege, deshalb ergiebig. Jenseits einer Schwelle wandert der Markt in den Schwarzhandel ab, besonders bei Alkohol.',
      strain: { internalSec: -5, corruption: -4, health: 2 }, strainGrp: { sinhalaRural: -6, business: -3, sangha: 3 },
      eff: { health: 0.008, inflation: 0.0018 }, grp: { sinhalaRural: -0.008, sangha: 0.010 } },
    { k: 'sscl',     label: 'Sozialabgabe SSCL (2,5 %)',        base: 320,  min: 0,    max: 620,  step: 5,
      note: 'Kaskadierende Umsatzabgabe. Oekonomen halten sie fuer eine der schaedlichsten Steuern des Landes.',
      elast: 0.3, strainNote: 'Kaskadiert ueber jede Handelsstufe, verteuert also mit jedem Schritt. Eine Erhoehung wirkt wie eine Umsatzsteuer auf Umsatzsteuer.',
      strain: { privateSector: -11, inflation: 1.3, exports: -2.5, unemp: 0.3 }, strainGrp: { business: -11, unions: -3, farmers: -3 },
      eff: { privateSector: -0.022, inflation: 0.0030 }, grp: { business: -0.026 } },
    { k: 'telco',    label: 'Telekommunikationsabgabe',         base: 95,   min: 0,    max: 240,  step: 5,
      note: 'Verteuert genau die digitale Infrastruktur, auf die die Wachstumsstrategie setzt.',
      elast: 0.45, strainNote: 'Verteuert Datentarife in einem Land, dessen Wachstumsstrategie auf Dienstleistungsexport setzt.',
      strain: { digitalGov: -9, privateSector: -4, skillsMatch: -2 }, strainGrp: { youth: -9, business: -4, sinhalaUrban: -3 },
      eff: { digitalGov: -0.030, privateSector: -0.010 }, grp: { youth: -0.030 } },
    { k: 'vehicle',  label: 'Kfz-Zulassung und Luxusabgaben',   base: 180,  min: 60,   max: 480,  step: 5,
      note: 'Nach der Aufhebung des Importverbots eine wichtige, aber devisenintensive Quelle.',
      elast: 0.5, strainNote: 'Nach der Aufhebung des Einfuhrverbots ergiebig. Bei zu hohen Saetzen wird schlicht nicht mehr eingefuehrt, dann faellt auch die Abgabe weg.',
      strain: { infra: -2, privateSector: -3 }, strainGrp: { sinhalaUrban: -7, business: -5, youth: -3 },
      eff: { reserves: -0.0022 }, grp: { sinhalaUrban: -0.016, business: -0.008 } },
    { k: 'nontax',   label: 'Nichtsteuerliche Einnahmen',       base: 270,  min: 120,  max: 620,  step: 5,
      note: 'Gebuehren, Dividenden der Staatsbetriebe, Zentralbankgewinn.',
      elast: 0.45, strainNote: 'Hoehere Gebuehren und abgeschoepfte Dividenden zehren an der Substanz der Staatsbetriebe, die ohnehin nicht investieren.',
      strain: { soeHealth: -7, privateSector: -3, stateCap: -3 }, strainGrp: { publicSector: -5, business: -4, sinhalaRural: -3 },
      eff: { soeHealth: -0.020 }, grp: { publicSector: -0.008 } },
    { k: 'grants',   label: 'Zuschüsse von Gebern',             base: 40,   min: 0,    max: 220,  step: 5,
      note: 'Haengt fast vollstaendig vom Verhaeltnis zu Gebern und der Menschenrechtsbilanz ab.',
      eff: {}, grp: {}, locked: true,
      lockNote: 'Ergibt sich aus den Aussenbeziehungen, nicht aus einer Entscheidung des Praesidenten.' }
  ];

  /* ---------------------------------------------------------
     HAUSHALT  -  Ausgaben (LKR Mrd. pro Jahr)
     Primaerausgaben 4.845 + Zinsen 2.610 = 7.455
     --------------------------------------------------------- */
  D.SPENDING = [
    { k: 'interest', label: 'Zinsen auf Staatsschulden',        base: 2610, min: 0, max: 6000, step: 10, locked: true,
      note: 'Ergibt sich aus Schuldenstand, Zinssatz und Wechselkurs. Der Praesident kann daran nicht direkt drehen.',
      lockNote: 'Folgt automatisch aus Schuldenstand und Zinsniveau.' },
    { k: 'wages',    label: 'Löhne des öffentlichen Dienstes',  base: 1100, min: 700, max: 1700, step: 5,
      note: 'Rund 1,4 Mio. Beschaeftigte. Der groesste steuerbare Ausgabenblock und politisch der heikelste.',
      cutNote: 'Reallohnverlust im Staatsdienst fuehrt zu Abwanderung, Dienst nach Vorschrift und Nebeneinkuenften.',
      cutStrain: { stateCap: -12, corruption: -6, brainDrain: 5, ruleOfLaw: -4 }, cutGrp: { publicSector: -16, unions: -12 },
      eff: { stateCap: 0.020, corruption: 0.008 }, grp: { publicSector: 0.045, unions: 0.020 } },
    { k: 'pensions', label: 'Pensionen',                        base: 400,  min: 300, max: 700,  step: 5,
      note: 'Nicht kapitalgedeckt, direkt aus dem laufenden Haushalt. Waechst mit der Alterung.',
      cutNote: 'Pensionen sind rechtlich zugesagt. Eine Kuerzung endet vor Gericht und auf der Strasse.',
      cutStrain: { poverty: 2.5, socialProt: -9 }, cutGrp: { publicSector: -15, sinhalaRural: -7, unions: -8 },
      eff: { poverty: -0.012 }, grp: { publicSector: 0.040 } },
    { k: 'social',   label: 'Sozialtransfers (Aswesuma)',       base: 280,  min: 100, max: 900,  step: 5,
      note: 'Kernprogramm gegen Armut. Die Treffsicherheit ist wichtiger als der reine Betrag.',
      cutNote: 'Aswesuma erreicht die Haushalte, die nach der Krise nichts mehr zuzusetzen haben.',
      cutStrain: { poverty: 3.5, malnutrition: 3, socialProt: -14, inequality: 1.2 }, cutGrp: { sinhalaRural: -12, malaiyaha: -12, farmers: -9, tamilNE: -8, intl: -6 },
      eff: { poverty: -0.038, socialProt: 0.075, malnutrition: -0.030 }, grp: { sinhalaRural: 0.030, malaiyaha: 0.030, farmers: 0.022 } },
    { k: 'health',   label: 'Gesundheit',                       base: 430,  min: 250, max: 1000, step: 5,
      note: 'Kostenlose Versorgung ist Sri Lankas groesste soziale Errungenschaft und nach der Krise angeschlagen.',
      cutNote: 'Medikamentenmangel und Abwanderung von Aerztinnen und Pflegekraeften setzen sofort ein.',
      cutStrain: { health: -13, malnutrition: 2.5, brainDrain: 6 }, cutGrp: { sinhalaRural: -10, malaiyaha: -8, publicSector: -7, youth: -5 },
      eff: { health: 0.075, malnutrition: -0.038, brainDrain: -0.018 }, grp: { sinhalaRural: 0.020, unions: 0.016, youth: 0.010 } },
    { k: 'education',label: 'Bildung und Hochschulen',          base: 370,  min: 200, max: 1000, step: 5,
      note: 'Sri Lanka gibt seit Jahrzehnten deutlich weniger als 4 % des BIP fuer Bildung aus.',
      cutNote: 'Kostenlose Bildung gilt als unantastbare Errungenschaft. Kuerzungen hier sind politisch teurer als anderswo.',
      cutStrain: { education: -12, skillsMatch: -7, brainDrain: 4 }, cutGrp: { youth: -11, publicSector: -8, sinhalaRural: -7, malaiyaha: -6 },
      eff: { education: 0.070, skillsMatch: 0.030, brainDrain: -0.012 }, grp: { youth: 0.030, unions: 0.014, sinhalaUrban: 0.016 } },
    { k: 'defence',  label: 'Verteidigung',                     base: 455,  min: 180, max: 700,  step: 5,
      note: 'Rund 1,4 % des BIP, siebzehn Jahre nach Kriegsende. Kuerzungen sind militaerpolitisch heikel.',
      cutNote: 'Ein verstimmter Sicherheitsapparat hat in Sri Lanka mehr als einmal Politik gemacht.',
      cutStrain: { militaryMor: -14, militaryCap: -9, internalSec: -4 }, cutGrp: { military: -16, sinhalaRural: -5 },
      eff: { militaryCap: 0.060, militaryMor: 0.055 }, grp: { military: 0.075, sinhalaRural: 0.012, tamilNE: -0.014 } },
    { k: 'police',   label: 'Polizei und innere Sicherheit',    base: 200,  min: 110, max: 420,  step: 5,
      note: 'Unterfinanziert, schlecht ausgebildet, in der Bevoelkerung wenig angesehen.',
      cutNote: 'Unterbezahlte Polizei finanziert sich anderweitig.',
      cutStrain: { internalSec: -12, ruleOfLaw: -5, corruption: -5 }, cutGrp: { business: -6, sinhalaUrban: -6, military: -5 },
      eff: { internalSec: 0.070, ruleOfLaw: 0.020 }, grp: { business: 0.014, sinhalaUrban: 0.014 } },
    { k: 'subsidies',label: 'Subventionen und Zuschüsse an Staatsbetriebe', base: 140, min: 0, max: 600, step: 5,
      note: 'Politisch niedrig gehaltene Strom- und Treibstoffpreise landen als Verlust beim Steuerzahler.',
      eff: { soeHealth: -0.030, inflation: -0.0035, energyRel: 0.012 }, grp: { sinhalaRural: 0.020, unions: 0.016, intl: -0.030 } },
    { k: 'provinces',label: 'Transfers an Provinzen und Kommunen', base: 470, min: 200, max: 1200, step: 5,
      note: 'Die Provinzraete haben kaum eigene Einnahmen. Fast alles kommt aus Colombo.',
      cutNote: 'Die Provinzen haben kaum eigene Einnahmen. Faellt der Transfer, faellt die Leistung vor Ort aus.',
      cutStrain: { regionalBalance: -11, stateCap: -6, health: -3, education: -3 }, cutGrp: { tamilNE: -9, malaiyaha: -8, farmers: -7, sinhalaRural: -6 },
      eff: { stateCap: 0.014, infra: 0.020 }, grp: { tamilNE: 0.020, malaiyaha: 0.018, farmers: 0.014 } },
    { k: 'ministries',label: 'Ministerienbetrieb und Verwaltung', base: 330, min: 180, max: 620, step: 5,
      note: 'Laufender Betrieb von 25 Ministerien und Hunderten Behoerden.',
      cutNote: 'Unter einer bestimmten Schwelle kann die Verwaltung Beschlossenes nicht mehr ausfuehren.',
      cutStrain: { stateCap: -10, digitalGov: -4, corruption: -3 }, cutGrp: { publicSector: -8, business: -4 },
      eff: { stateCap: 0.040, digitalGov: 0.014 }, grp: { publicSector: 0.020 } },
    { k: 'capital',  label: 'Öffentliche Investitionen',        base: 470,  min: 150, max: 1600, step: 5,
      note: 'Strassen, Bewaesserung, Haefen, Schulen. Wird in Krisen immer zuerst gekuerzt und raecht sich spaeter.',
      cutNote: 'Investitionskuerzungen fallen zuerst nicht auf und spaeter umso teurer.',
      cutStrain: { infra: -10, growth: -0.35, privateSector: -5, regionalBalance: -4 }, cutGrp: { business: -8, farmers: -5, sinhalaRural: -4 },
      eff: { infra: 0.055, growth: 0.0016, climateRes: 0.014 }, grp: { business: 0.026, farmers: 0.016, sinhalaRural: 0.014 } },
    { k: 'ditwah',   label: 'Wiederaufbau nach Zyklon Ditwah',  base: 200,  min: 0, max: 700,  step: 5,
      note: 'Nachtragshaushalt von 500 Mrd. LKR. Rund 4,1 Mrd. USD Schaden, etwa 4 % des BIP.',
      eff: { climateRes: 0.045, infra: 0.030, housing: 0.055 }, grp: { farmers: 0.040, sinhalaRural: 0.030, tamilNE: 0.016 } }
  ];

  /* Kennzahlen des Programmrahmens */
  D.IMF = {
    primaryTarget2026: 1.4,   /* % BIP, wegen Ditwah abgesenkt */
    primaryTargetLater: 2.3,  /* ab 2027 wieder */
    revenueFloor: 15.0,       /* % BIP */
    debtTarget2032: 95.0,
    trancheSize: 0.334        /* Mrd. USD je Ueberpruefung */
  };

})(SL.data.baseline = SL.data.baseline || {});
