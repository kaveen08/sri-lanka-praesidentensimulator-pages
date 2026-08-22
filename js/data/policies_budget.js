/* ============================================================
   MASSNAHMEN  -  Haushalt: einzelne Einnahme- und Sparmaßnahmen
   Ergänzt die Regler im Haushaltssimulator um konkrete
   Einzelentscheidungen mit festen Beträgen.
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Einnahmen: Steuern auf Vermögen und hohe Einkommen ---------- */
    {
      id: 'bu_wealth_tax', cat: 'budget', sub: 'Vermögen',
      title: 'Vermögensteuer auf große Vermögen',
      desc: 'Eine jährliche Abgabe von 1 Prozent auf Nettovermögen über 500 Mio. LKR, ausgenommen selbstgenutztes Wohneigentum und Betriebsvermögen unter einer Schwelle. Erfordert ein funktionierendes Vermögensregister.',
      party: ['FSP', 'NPP'], need: 'simple', pc: 18, lag: 4,
      fiscal: { rev: 95 },
      eff: { inequality: -1.6, taxCompl: -3, fdi: -0.15, privateSector: -4 },
      grp: { unions: 14, youth: 10, sinhalaRural: 8, business: -18, sinhalaUrban: -6, intl: 4 },
      risk: 'Ohne Vermögensregister ist die Steuer kaum durchsetzbar. Kapitalflucht ist eine reale Reaktion.',
      risks: ['no_asset_registry', 'revenue_authority'],
      tags: ['Steuern', 'Umverteilung']
    },
    {
      id: 'bu_property_tax', cat: 'budget', sub: 'Vermögen',
      title: 'Bundesweite Grundsteuer auf Basis aktueller Werte',
      desc: 'Eine wertbasierte Grundsteuer mit Freibetrag für kleine Wohnhäuser, erhoben durch die Kommunen und mit ihnen geteilt. Der IWF fordert seit Jahren eine echte Immobilienbesteuerung.',
      party: ['NDF', 'SJB', 'NPP'], need: 'simple', pc: 20, lag: 6,
      fiscal: { rev: 130 },
      eff: { taxCompl: 10, inequality: -1.0, digitalGov: 3, regionalBalance: 4, privateSector: -2 },
      grp: { intl: 16, sinhalaUrban: -12, business: -8, sinhalaRural: -5, youth: 3 },
      risk: 'Grundsteuern sind überall unbeliebt, weil sie sichtbar und jährlich fällig sind. Politisch die teuerste Steuer, ökonomisch eine der besten.',
      risks: ['no_land_registry', 'no_asset_registry'],
      tags: ['Steuern', 'IWF']
    },
    {
      id: 'bu_capital_gains', cat: 'budget', sub: 'Vermögen',
      title: 'Kapitalertragsteuer auf Aktien und Grundstücke',
      desc: 'Besteuerung realisierter Gewinne aus dem Verkauf von Wertpapieren und Immobilien, mit Haltefristen und Freibeträgen für kleine Anleger.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 12, lag: 3,
      fiscal: { rev: 55 },
      eff: { inequality: -0.8, taxCompl: 5, fdi: -0.1 },
      grp: { business: -12, sinhalaUrban: -5, unions: 8, youth: 5, intl: 6 },
      risk: 'Die Börse in Colombo ist klein und reagiert empfindlich. Kurzfristig fallen die Kurse.',
      risks: ['revenue_authority', 'no_asset_registry'],
      tags: ['Steuern']
    },
    {
      id: 'bu_inheritance', cat: 'budget', sub: 'Vermögen',
      title: 'Erbschaftsteuer wieder einführen',
      desc: 'Die Erbschaftsteuer wurde 2002 abgeschafft. Wiedereinführung mit hohem Freibetrag, Stundungsregeln für Betriebe und landwirtschaftliche Flächen.',
      party: ['FSP', 'NPP'], need: 'simple', pc: 16, lag: 4,
      fiscal: { rev: 38 },
      eff: { inequality: -1.2, taxCompl: 3 },
      grp: { unions: 10, youth: 7, business: -12, sinhalaUrban: -8, farmers: -5 },
      risk: 'Trifft auch mittelständische Familienbetriebe, wenn die Freibeträge zu niedrig ausfallen.',
      risks: ['no_asset_registry', 'revenue_authority'],
      tags: ['Steuern', 'Umverteilung']
    },

    /* ---------- Einnahmen: Verbrauch und Verhalten ---------- */
    {
      id: 'bu_sugar_tax', cat: 'budget', sub: 'Verbrauch',
      title: 'Abgabe auf zuckergesüßte Getränke',
      desc: 'Gestaffelte Abgabe nach Zuckergehalt, mit Zweckbindung für Schulmahlzeiten und Vorsorgeprogramme. Doppelter Nutzen für Haushalt und Gesundheit.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 7, lag: 2,
      fiscal: { rev: 28 },
      eff: { health: 6, malnutrition: -2, inflation: 0.15 },
      grp: { business: -8, intl: 5, sinhalaUrban: 3, youth: 3 },
      risk: 'Die Getränkeindustrie ist gut vernetzt und wird eine Kampagne über Arbeitsplätze führen.',
      tags: ['Steuern', 'Gesundheit']
    },
    {
      id: 'bu_tobacco_alcohol', cat: 'budget', sub: 'Verbrauch',
      title: 'Tabak- und Alkoholsteuern deutlich anheben',
      desc: 'Anhebung um 25 Prozent mit automatischer Inflationsanpassung. Sri Lanka verliert bei diesen Steuern regelmäßig real an Wert, weil die Sätze nicht angepasst werden.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 8, lag: 1,
      fiscal: { rev: 115 },
      eff: { health: 8, inflation: 0.3, internalSec: -2 },
      grp: { sangha: 10, intl: 8, sinhalaRural: -8, unions: -5, business: -6 },
      risk: 'Zu hohe Sätze fördern Schmuggel und illegale Brennerei, was schon Todesfälle verursacht hat.',
      risks: ['customs_graft'],
      tags: ['Steuern', 'Gesundheit']
    },
    {
      id: 'bu_casino_levy', cat: 'budget', sub: 'Verbrauch',
      title: 'Abgabe auf Kasinos und Glücksspiel erhöhen',
      desc: 'Höhere Lizenzgebühren und Umsatzabgabe für Kasinos und Wettanbieter, verbunden mit schärferer Aufsicht gegen Geldwäsche.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 6, lag: 2,
      fiscal: { rev: 22 },
      eff: { corruption: 3, internalSec: 2, tourism: -0.05 },
      grp: { sangha: 12, sinhalaRural: 6, business: -6 },
      risk: 'Kasinolizenzen sind in Sri Lanka historisch eng mit politischen Netzwerken verflochten.',
      tags: ['Steuern']
    },
    {
      id: 'bu_luxury_import', cat: 'budget', sub: 'Verbrauch',
      title: 'Sonderabgabe auf Luxusimporte',
      desc: 'Höhere Abgaben auf Fahrzeuge der Oberklasse, Yachten, hochwertige Elektronik und Luxusgüter. Schont Devisen und trifft überwiegend hohe Einkommen.',
      party: ['NPP', 'FSP', 'SB'], need: 'exec', pc: 5, lag: 1,
      fiscal: { rev: 42 },
      eff: { reserves: 0.15, inequality: -0.5, privateSector: -2 },
      grp: { sinhalaRural: 8, unions: 7, business: -8, sinhalaUrban: -6 },
      risk: 'Hohe Sätze führen zu Unterfakturierung und Schmuggel.',
      risks: ['customs_graft'],
      tags: ['Steuern', 'Devisen']
    },

    /* ---------- Einnahmen: Struktur ---------- */
    {
      id: 'bu_vat_exempt_cut', cat: 'budget', sub: 'Struktur',
      title: 'Ausnahmen bei der Mehrwertsteuer streichen',
      desc: 'Die lange Liste befreiter Waren und Dienstleistungen wird auf Grundnahrungsmittel, Gesundheit und Bildung begrenzt. Verbreitert die Basis, ohne den Satz zu erhöhen.',
      party: ['NDF', 'NPP'], need: 'simple', pc: 14, lag: 2,
      fiscal: { rev: 145 },
      eff: { taxCompl: 8, inflation: 0.8, poverty: 0.5, privateSector: -2 },
      grp: { intl: 14, business: -8, sinhalaRural: -9, farmers: -7 },
      risk: 'Wirtschaftlich sauberer als eine Satzerhöhung, im Alltag aber genauso spürbar.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'IWF']
    },
    {
      id: 'bu_tax_holidays_end', cat: 'budget', sub: 'Struktur',
      title: 'Steuerbefreiungen für Großinvestoren beenden',
      desc: 'Auslaufen der pauschalen Befreiungen im Rahmen des Strategic Development Projects Act, künftig nur noch zeitlich befristete und veröffentlichte Vergünstigungen mit Nachweispflicht.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 14, lag: 3,
      fiscal: { rev: 68 },
      eff: { taxCompl: 6, corruption: 5, fdi: -0.35, privateSector: -3 },
      grp: { youth: 9, unions: 9, intl: 6, business: -14 },
      risk: 'Einige Investoren werden abspringen. Studien zeigen aber, dass Steuerbefreiungen selten der entscheidende Faktor sind.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Antikorruption']
    },
    {
      id: 'bu_customs_reform', cat: 'budget', sub: 'Struktur',
      title: 'Zollverwaltung gegen Unterfakturierung wappnen',
      desc: 'Referenzpreisdatenbank, Scannerkontrollen, Rotation des Personals und Abgleich mit Ausfuhrdaten der Handelspartner. Die Lücke zwischen gemeldeten Importen und Exportstatistiken der Partner ist erheblich.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 9, lag: 4,
      fiscal: { rev: 85, exp: 10 },
      eff: { corruption: 8, taxCompl: 8, privateSector: 2, stateCap: 4 },
      grp: { intl: 12, business: 4, youth: 6, publicSector: -8 },
      risk: 'Der Zoll gehört zu den korruptionsanfälligsten Behörden. Der Widerstand von innen ist beträchtlich.',
      risks: ['customs_graft'],
      tags: ['Steuern', 'Antikorruption']
    },
    {
      id: 'bu_professional_tax', cat: 'budget', sub: 'Struktur',
      title: 'Freiberufler und Selbständige wirksam besteuern',
      desc: 'Ärzte, Anwälte, Architekten und andere Freiberufler zahlen im Verhältnis zu ihrem Einkommen sehr wenig. Meldepflichten für Verbände, Abgleich mit Zahlungsdaten und Mindestbesteuerung.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 15, lag: 4,
      fiscal: { rev: 72 },
      eff: { taxCompl: 12, inequality: -0.7, brainDrain: 4 },
      grp: { intl: 10, unions: 8, sinhalaRural: 6, business: -8, sinhalaUrban: -10 },
      risk: 'Genau diese Berufsgruppen sind international mobil. Ein Teil wandert ab.',
      risks: ['revenue_authority'],
      tags: ['Steuern']
    },
    {
      id: 'bu_sscl_abolish', cat: 'budget', sub: 'Struktur',
      title: 'Kaskadierende Sozialabgabe SSCL abschaffen',
      desc: 'Die Abgabe wird auf jeder Handelsstufe erhoben und verteuert Vorprodukte mehrfach. Ökonomen halten sie für eine der schädlichsten Steuern des Landes. Abschaffung mit Gegenfinanzierung über die Mehrwertsteuerbasis.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 10, lag: 2,
      fiscal: { rev: -320 },
      eff: { privateSector: 12, exports: 0.8, inflation: -0.6, growth: 0.25, fdi: 0.2 },
      grp: { business: 20, sinhalaUrban: 6, intl: -4 },
      risk: 'Reißt sofort ein großes Loch in den Haushalt. Ohne Gegenfinanzierung ist das IWF-Programm gefährdet.',
      tags: ['Steuern', 'Wirtschaft']
    },
    {
      id: 'bu_paye_relief', cat: 'budget', sub: 'Entlastung',
      title: 'Lohnsteuer für mittlere Einkommen senken',
      desc: 'Höherer Grundfreibetrag und flachere Progression im mittleren Bereich. Die Steuerreform von 2022 traf die formell Beschäftigten hart und gilt als Treiber der Auswanderung.',
      party: ['SJB', 'NPP', 'SB'], need: 'simple', pc: 8, lag: 2,
      fiscal: { rev: -135 },
      eff: { brainDrain: -8, skillsMatch: 3, privateSector: 3, taxCompl: -3 },
      grp: { sinhalaUrban: 18, youth: 12, publicSector: 10, business: 6, intl: -12 },
      risk: 'Der IWF wird auf der Einnahmenuntergrenze von rund 15 Prozent des BIP bestehen. Sie brauchen eine Gegenfinanzierung.',
      tags: ['Steuern', 'Entlastung']
    },
    {
      id: 'bu_vat_food_relief', cat: 'budget', sub: 'Entlastung',
      title: 'Grundnahrungsmittel von der Mehrwertsteuer befreien',
      desc: 'Reis, Mehl, Milchpulver, Gemüse und Speiseöl werden vollständig befreit, um die Lebenshaltungskosten für ärmere Haushalte zu senken.',
      party: ['SJB', 'FSP', 'SB'], need: 'simple', pc: 7, lag: 1,
      fiscal: { rev: -95 },
      eff: { poverty: -1.4, inflation: -0.9, malnutrition: -3, taxCompl: -4 },
      grp: { sinhalaRural: 16, malaiyaha: 12, farmers: 10, unions: 10, intl: -10 },
      risk: 'Befreiungen kommen anteilig auch wohlhabenden Haushalten zugute und sind teuer je erreichtem armen Haushalt.',
      tags: ['Steuern', 'Armut'], excl: ['bu_vat_exempt_cut']
    },

    /* ---------- Ausgaben: Einsparungen ---------- */
    {
      id: 'bu_fuel_subsidy_cut', cat: 'budget', sub: 'Sparen',
      title: 'Treibstoffsubventionen vollständig streichen',
      desc: 'Preise folgen der Weltmarktformel ohne staatliche Abfederung. Gezielte Ausgleichszahlungen an Fischer und Landwirte ersetzen die pauschale Verbilligung.',
      party: ['NDF'], need: 'exec', pc: 14, lag: 1,
      fiscal: { exp: -95 },
      eff: { soeHealth: 10, inflation: 1.2, imfCompl: 8, poverty: 0.6, emissions: -0.5 },
      grp: { intl: 14, business: -3, farmers: -14, sinhalaRural: -12, unions: -10 },
      risk: 'Preiserhöhungen bei Treibstoff sind in Sri Lanka der klassische Auslöser von Protesten und Blockaden.',
      tags: ['Sparen', 'IWF']
    },
    {
      id: 'bu_ministry_merge', cat: 'budget', sub: 'Sparen',
      title: 'Ministerien und Behörden zusammenlegen',
      desc: 'Reduzierung auf 20 Ministerien, Auflösung von rund 60 Behörden mit überlappenden Aufgaben, Zusammenlegung von Auslandsvertretungen mit geringer Auslastung.',
      party: ['NPP', 'NDF', 'SJB'], need: 'exec', pc: 16, lag: 5,
      fiscal: { exp: -85 },
      eff: { stateCap: 5, corruption: 4, digitalGov: 2 },
      grp: { business: 10, intl: 10, youth: 6, publicSector: -16 },
      risk: 'Jede Behörde hat einen Minister, der sie verteidigt, und Beschäftigte, die um ihre Stellen fürchten.',
      tags: ['Sparen', 'Verwaltung']
    },
    {
      id: 'bu_vehicle_fleet', cat: 'budget', sub: 'Sparen',
      title: 'Dienstwagenflotte und Repräsentationsausgaben kürzen',
      desc: 'Halbierung der Dienstfahrzeuge für Ministerien und Behörden, Streichung von Zulagen für Fahrer und Begleitfahrzeuge, Fahrtenbuchpflicht. Symbolisch stark, finanziell überschaubar.',
      party: ['NPP', 'FSP'], need: 'exec', pc: 4, lag: 2,
      fiscal: { exp: -22 },
      eff: { corruption: 5, legitimacy: 7, emissions: -0.1 },
      grp: { youth: 12, sinhalaRural: 10, sinhalaUrban: 9, publicSector: -10 },
      risk: 'Der Betrag ist klein, die Wirkung auf die Glaubwürdigkeit groß. Umgekehrt fällt es auf, wenn Sie es nicht tun.',
      tags: ['Sparen', 'Symbolik']
    },
    {
      id: 'bu_pension_reform', cat: 'budget', sub: 'Sparen',
      title: 'Beamtenpensionen auf ein Beitragssystem umstellen',
      desc: 'Neu eingestellte Beschäftigte erhalten eine beitragsfinanzierte Altersvorsorge statt der aus dem laufenden Haushalt gezahlten Pension. Bestehende Ansprüche bleiben unberührt.',
      party: ['NDF', 'NPP'], need: 'simple', pc: 22, lag: 6,
      fiscal: { exp: -35 },
      eff: { debtStabiliserX: 0, socialProt: -3, stateCap: -2, imfCompl: 6 },
      grp: { intl: 14, business: 8, publicSector: -20, unions: -14, youth: -4 },
      risk: 'Die Entlastung kommt erst in Jahrzehnten, der Konflikt sofort. Trotzdem unvermeidlich für die langfristige Tragfähigkeit.',
      tags: ['Sparen', 'Pensionen']
    },
    {
      id: 'bu_soe_transfer_stop', cat: 'budget', sub: 'Sparen',
      title: 'Zuschüsse an Staatsbetriebe hart deckeln',
      desc: 'Verbindliche Obergrenze für Transfers, darüber hinaus keine staatlichen Garantien mehr. Betriebe müssen Kosten decken oder ihr Geschäftsmodell ändern.',
      party: ['NDF', 'NPP'], need: 'simple', pc: 16, lag: 3,
      fiscal: { exp: -70 },
      eff: { soeHealth: 14, imfCompl: 8, energyRel: -3, inflation: 0.5 },
      grp: { intl: 14, business: 8, unions: -16, publicSector: -10, sinhalaRural: -6 },
      risk: 'Wenn Betriebe stattdessen bei Staatsbanken Kredite aufnehmen, verlagern Sie das Problem nur in die Bilanzen der Banken.',
      risks: ['soe_opacity'],
      tags: ['Sparen', 'Staatsbetriebe']
    },
    {
      id: 'bu_capex_freeze', cat: 'budget', sub: 'Sparen',
      title: 'Neue Großprojekte vorerst aussetzen',
      desc: 'Kein Baubeginn neuer Prestigeprojekte für zwei Jahre, laufende Vorhaben werden priorisiert und teilweise gestoppt. Der klassische Notnagel jeder Haushaltskrise.',
      party: ['NDF'], need: 'exec', pc: 8, lag: 1,
      fiscal: { exp: -120 },
      eff: { infra: -8, growth: -0.35, climateRes: -3, unemp: 0.4 },
      grp: { intl: 10, business: -12, sinhalaRural: -6, unions: -8 },
      risk: 'Investitionskürzungen sind kurzfristig schmerzlos und langfristig teuer. Genau so entstand Sri Lankas Infrastrukturrückstand.',
      tags: ['Sparen', 'Risiko']
    },
    {
      id: 'bu_fertiliser_subsidy_cut', cat: 'budget', sub: 'Sparen',
      title: 'Pauschale Düngersubvention durch Direktzahlung ersetzen',
      desc: 'Statt verbilligtem Dünger für alle erhalten registrierte Betriebe eine feste Direktzahlung pro Hektar, die sie frei verwenden können.',
      party: ['NPP', 'NDF', 'SJB'], need: 'exec', pc: 9, lag: 3,
      fiscal: { exp: -32 },
      eff: { agriProd: 3, emissions: -0.3, digitalGov: 3, taxCompl: 2 },
      grp: { intl: 8, farmers: -6, sinhalaRural: -4 },
      risk: 'Kleinbauern ohne Registrierung fallen durch das Raster. Die Erfassung muss vorher stehen.',
      tags: ['Sparen', 'Landwirtschaft']
    },
    {
      id: 'bu_defence_cut', cat: 'budget', sub: 'Sparen',
      title: 'Verteidigungsetat auf 1 Prozent des BIP begrenzen',
      desc: 'Der Verteidigungshaushalt liegt bei rund 455 Mrd. LKR. Eine Deckelung bei etwa 1 Prozent der Wirtschaftsleistung würde etwa 125 Mrd. LKR jährlich freisetzen.',
      party: ['FSP', 'ITAK', 'NPP'], need: 'simple', pc: 22, lag: 4,
      fiscal: { exp: -125 },
      eff: { militaryCap: -12, militaryMor: -14, reconcile: 7, trustTamil: 9 },
      grp: { military: -24, tamilNE: 12, intl: 9, youth: 7, sinhalaRural: -9, sangha: -8 },
      risk: 'Siebzehn Jahre nach Kriegsende ökonomisch naheliegend, politisch eine der heikelsten Entscheidungen überhaupt.',
      tags: ['Sparen', 'Militär']
    },

    /* ---------- Ausgaben: Investitionen ---------- */
    {
      id: 'bu_capex_boost', cat: 'budget', sub: 'Investitionen',
      title: 'Öffentliche Investitionen auf 4 Prozent des BIP anheben',
      desc: 'Sri Lanka investiert seit der Krise zu wenig in Straßen, Bewässerung, Schulen und Netze. Eine Anhebung auf 4 Prozent der Wirtschaftsleistung mit Vorrang für Instandhaltung statt Neubau.',
      party: ['SJB', 'NPP'], need: 'simple', pc: 12, lag: 6,
      fiscal: { exp: 340 },
      eff: { infra: 16, growth: 0.55, climateRes: 6, unemp: -0.6, regionalBalance: 5 },
      grp: { business: 14, farmers: 9, sinhalaRural: 9, unions: 7, intl: -8 },
      risk: 'Ohne strenge Projektauswahl finanzieren Sie erneut Prestigebauten mit geringer Rendite.',
      tags: ['Investitionen', 'Wachstum']
    },
    {
      id: 'bu_maintenance_first', cat: 'budget', sub: 'Investitionen',
      title: 'Instandhaltung vor Neubau festschreiben',
      desc: 'Ein fester Anteil des Investitionshaushalts wird für Erhaltung reserviert und darf nicht für Neubauten umgewidmet werden. Erhaltung kostet einen Bruchteil eines Neubaus.',
      party: ['NPP', 'NDF', 'SJB'], need: 'exec', pc: 5, lag: 3,
      fiscal: { exp: 25 },
      eff: { infra: 10, climateRes: 5, stateCap: 3, growth: 0.12 },
      grp: { business: 8, farmers: 6, intl: 7, sinhalaRural: 4 },
      risk: 'Instandhaltung liefert keine Einweihungsfotos. Genau deshalb wird sie überall vernachlässigt.',
      tags: ['Investitionen', 'Verwaltung']
    },
    {
      id: 'bu_fiscal_rule', cat: 'budget', sub: 'Regeln',
      title: 'Gesetzliche Schuldenbremse einführen',
      desc: 'Verbindliche Obergrenzen für Defizit und Schuldenstand mit klar geregelten Ausnahmen für Naturkatastrophen, überwacht von einem unabhängigen Fiskalrat.',
      party: ['NDF', 'NPP', 'SJB'], need: 'simple', pc: 14, lag: 3,
      fiscal: { exp: 4 },
      eff: { imfCompl: 12, debtStabiliserX: 0, stateCap: 5, corruption: 3, legitimacy: 4 },
      grp: { intl: 18, business: 12, sinhalaUrban: 5, unions: -8 },
      risk: 'Bindet Sie und alle Nachfolger. In einer Rezession kann eine starre Regel prozyklisch wirken.',
      tags: ['Haushalt', 'IWF']
    },
    {
      id: 'bu_fiscal_council', cat: 'budget', sub: 'Regeln',
      title: 'Unabhängigen Fiskalrat einrichten',
      desc: 'Ein Gremium, das Haushaltsentwürfe und Wahlversprechen unabhängig durchrechnet und veröffentlicht. Vorbilder gibt es in Irland, den Niederlanden und Chile.',
      party: ['NDF', 'SJB', 'NPP'], need: 'simple', pc: 7, lag: 3,
      fiscal: { exp: 4 },
      eff: { imfCompl: 7, corruption: 4, legitimacy: 5, stateCap: 4 },
      grp: { intl: 12, business: 8, sinhalaUrban: 5 },
      risk: 'Der Rat wird auch Ihre eigenen Zahlen prüfen und öffentlich kommentieren.',
      tags: ['Haushalt', 'Transparenz']
    },
    {
      id: 'bu_arrears_clear', cat: 'budget', sub: 'Regeln',
      title: 'Zahlungsrückstände des Staates abbauen',
      desc: 'Der Staat schuldet Lieferanten, Bauunternehmen und Krankenhauszulieferern erhebliche Beträge. Ein Tilgungsplan und ein Verbot, Verpflichtungen ohne gesicherte Mittel einzugehen.',
      party: ['NPP', 'NDF'], need: 'exec', pc: 6, lag: 3,
      fiscal: { exp: 60 },
      eff: { privateSector: 8, stateCap: 5, health: 3, corruption: 3, imfCompl: 4 },
      grp: { business: 14, intl: 8, unions: 4 },
      risk: 'Einmalig teuer, aber ohne diesen Schritt kalkulieren Lieferanten den Zahlungsverzug in ihre Preise ein.',
      tags: ['Haushalt', 'Wirtschaft']
    },
    {
      id: 'bu_relief_package', cat: 'budget', sub: 'Entlastung',
      title: 'Befristetes Entlastungspaket für Haushalte',
      desc: 'Einmalzahlungen an einkommensschwache Haushalte, befristete Zuschüsse zu Strom- und Wasserrechnungen und eine Aufstockung der Schulmahlzeiten für ein Jahr.',
      party: ['NPP', 'SJB', 'FSP'], need: 'exec', pc: 6, lag: 1,
      fiscal: { exp: 120 },
      eff: { poverty: -2.2, socialProt: 8, malnutrition: -4, inflation: 0.3 },
      grp: { sinhalaRural: 14, malaiyaha: 11, unions: 9, farmers: 9, youth: 6, intl: -8 },
      risk: 'Befristete Hilfen laufen selten wirklich aus. Rechnen Sie damit, dass die Verlängerung politisch erzwungen wird.',
      tags: ['Armut', 'Entlastung']
    },
    {
      id: 'bu_public_wage_rise', cat: 'budget', sub: 'Entlastung',
      title: 'Gehälter im öffentlichen Dienst erhöhen',
      desc: 'Eine spürbare Anhebung der Grundgehälter, um den Reallohnverlust seit 2022 teilweise auszugleichen und Abwanderung zu bremsen.',
      party: ['NPP', 'FSP', 'SJB'], need: 'exec', pc: 8, lag: 1,
      fiscal: { exp: 165 },
      eff: { brainDrain: -5, stateCap: 5, corruption: 3, inflation: 0.5 },
      grp: { publicSector: 22, unions: 16, sinhalaRural: 6, intl: -14, business: -5 },
      risk: 'Der größte dauerhafte Ausgabenblock. Der IWF wird sofort nach der Gegenfinanzierung fragen.',
      tags: ['Löhne', 'Haushalt']
    },
    {
      id: 'bu_debt_reprofile', cat: 'budget', sub: 'Schulden',
      title: 'Gespräche über eine Streckung der Rückzahlungen',
      desc: 'Verhandlungen mit bilateralen Gläubigern über längere Laufzeiten und tilgungsfreie Jahre, ohne den Nennwert anzutasten. Verschafft Luft, ohne einen erneuten Zahlungsausfall auszulösen.',
      party: ['SJB', 'NPP'], need: 'exec', pc: 14, lag: 5,
      fiscal: { exp: -60 },
      eff: { debtGdpOneOff: -1.0, imfCompl: -3, relChina: 3, relJapan: 3, fdi: -0.1 },
      grp: { intl: -5, business: 4, unions: 6, sinhalaRural: 5 },
      risk: 'Die Restrukturierung von 2023 bis 2025 war mühsam. Ein erneutes Aufschnüren belastet das Vertrauen der Gläubiger.',
      tags: ['Schulden']
    },
    {
      id: 'bu_default', cat: 'budget', sub: 'Schulden',
      title: 'Schuldendienst einseitig aussetzen',
      desc: 'Zahlungen an Auslandsgläubiger werden ausgesetzt, bis eine als gerecht empfundene Regelung erreicht ist. Forderung linker und nationalistischer Kräfte.',
      party: ['FSP'], need: 'exec', pc: 20, lag: 1,
      fiscal: { exp: -700 },
      eff: { imfCompl: -55, reserves: -2.2, fx: 85, inflation: 9.0, fdi: -0.9, growth: -3.2, privateSector: -18, relWest: -20, relChina: -12, relJapan: -18 },
      grp: { unions: 12, youth: 4, intl: -45, business: -30, sinhalaUrban: -14 },
      risk: 'Sri Lanka hat 2022 erlebt, was ein Zahlungsausfall bedeutet: Warteschlangen, Stromabschaltungen, fehlende Medikamente. Dieser Weg führt sehr wahrscheinlich dorthin zurück.',
      tags: ['Schulden', 'Hochrisiko']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
