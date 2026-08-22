/* ============================================================
   MASSNAHMEN  -  Steuerverwaltung, Progression, Entlastung
   fiscal.rev / fiscal.exp in LKR Mrd. pro Jahr
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Einzugsfähigkeit der Verwaltung ---------- */
    {
      id: 'bu_ramis_rebuild', cat: 'budget', sub: 'Steuerverwaltung',
      title: 'Steuerverwaltungssystem ersetzen',
      desc: 'Das Verwaltungssystem der Steuerbehörde läuft seit seiner Einführung nicht zuverlässig, Erklärungen gehen verloren, Bescheide werden verspätet erstellt, und ein erheblicher Teil der Arbeit läuft weiterhin auf Papier. Vollständiger Neuaufbau mit erprobter Standardsoftware, Datenmigration und Schulung.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 11, lag: 5,
      fiscal: { rev: 130, exp: 6 }, oneoff: 32,
      eff: { taxCompl: 14, digitalGov: 10, stateCap: 9, corruption: 6, imfCompl: 6 },
      grp: { intl: 8, business: 6, sinhalaUrban: 4, publicSector: -5 },
      risk: 'Der Vorgänger dieses Systems hat Jahre gekostet und nie funktioniert. Es gibt keinen Grund anzunehmen, dass eine Neuausschreibung von allein besser läuft.',
      tags: ['Steuern', 'Digitalisierung', 'Schlüsselmaßnahme']
    },
    {
      id: 'bu_revenue_authority', cat: 'budget', sub: 'Steuerverwaltung',
      title: 'Steuerbehörde als eigenständige Anstalt führen',
      desc: 'Zusammenführung von Inland Revenue, Zoll und Verbrauchsteuerbehörde unter einem Dach mit eigenem Personalrecht, leistungsbezogener Vergütung und einem Vorstand, der nicht bei jedem Regierungswechsel ausgetauscht wird. Das Modell hat in mehreren vergleichbaren Ländern die Einnahmenquote deutlich gehoben.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 22, lag: 5,
      fiscal: { rev: 95, exp: 10 }, oneoff: 14,
      eff: { taxCompl: 12, stateCap: 8, corruption: 7, imfCompl: 7, privateSector: 3 },
      grp: { intl: 9, business: 6, youth: 3, publicSector: -10, unions: -6 },
      risk: 'Drei Behörden mit drei Kulturen und drei Gewerkschaften zusammenzulegen ist ein Verwaltungsvorhaben, das Ihre halbe Amtszeit binden kann.',
      tags: ['Steuern', 'Verwaltung', 'Schlüsselmaßnahme']
    },
    {
      id: 'bu_asset_register', cat: 'budget', sub: 'Steuerverwaltung',
      title: 'Nationales Vermögensregister aufbauen',
      desc: 'Zusammenführung von Grundbuch, Fahrzeugregister, Handelsregister, Wertpapierdepots und gemeldetem Auslandsvermögen zu einem abgleichbaren Bestand, verknüpft mit der Steuernummer. Voraussetzung dafür, dass Vermögen-, Erbschaft- und Grundsteuern überhaupt durchsetzbar werden.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 20, lag: 5,
      fiscal: { rev: 25, exp: 5 }, oneoff: 22,
      eff: { taxCompl: 10, digitalGov: 8, corruption: 7, stateCap: 6, inequality: -1.2 },
      grp: { intl: 7, youth: 6, unions: 5, sinhalaUrban: 4, business: -9 },
      risk: 'Ein Register, das jedes Vermögen sichtbar macht, ist auch ein Register, das jede Regierung nach Ihnen erbt. Datenschutzbedenken sind hier nicht nur vorgeschoben.',
      tags: ['Steuern', 'Vermögen', 'Schlüsselmaßnahme']
    },
    {
      id: 'bu_audit_capacity', cat: 'budget', sub: 'Steuerverwaltung',
      title: 'Betriebsprüfung für Großunternehmen aufbauen',
      desc: 'Eine eigene Einheit für die größten Steuerpflichtigen mit Branchenspezialisten, Datenanalyse und ausreichend Personal, um jeden Großbetrieb in einem festen Turnus zu prüfen. Wenige hundert Unternehmen tragen den Großteil des Aufkommens, und genau dort ist die Prüfdichte am geringsten.',
      party: ['NPP', 'SJB', 'FSP'], need: 'exec', pc: 9, lag: 4,
      fiscal: { rev: 75, exp: 5 },
      eff: { taxCompl: 10, corruption: 4, stateCap: 5, imfCompl: 4, inequality: -0.8 },
      grp: { unions: 6, youth: 5, intl: 6, business: -8 },
      risk: 'Die geprüften Unternehmen sind dieselben, die Wahlkämpfe finanzieren und Zeitungen besitzen.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Vollzug']
    },
    {
      id: 'bu_transfer_pricing', cat: 'budget', sub: 'Steuerverwaltung',
      title: 'Gewinnverlagerung ins Ausland unterbinden',
      desc: 'Verrechnungspreisdokumentation nach internationalem Standard, Zinsschranke, Quellensteuer auf konzerninterne Lizenz- und Beratungszahlungen. Der Tee-, Bekleidungs- und Telekommunikationssektor arbeitet weitgehend in Konzernstrukturen mit Auslandsbezug.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 13, lag: 4,
      fiscal: { rev: 55, exp: 3 },
      eff: { taxCompl: 8, corruption: 3, imfCompl: 5, inequality: -0.7, fdi: -0.12 },
      grp: { unions: 7, youth: 5, intl: 5, business: -9 },
      risk: 'Auslandsinvestoren lesen das als Verschlechterung des Standorts, und ein Teil von ihnen wird das auch so meinen.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Konzerne']
    },
    {
      id: 'bu_exchange_info', cat: 'budget', sub: 'Steuerverwaltung',
      title: 'Automatischen Informationsaustausch nutzen',
      desc: 'Vollständige Anbindung an den internationalen Austausch über Finanzkonten, Abgleich der eingehenden Daten mit den hiesigen Erklärungen und eine befristete Offenlegungsmöglichkeit gegen Nachzahlung. Auslandsvermögen srilankischer Steuerpflichtiger ist bisher praktisch unbesteuert.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 12, lag: 4,
      fiscal: { rev: 35, exp: 2 },
      eff: { taxCompl: 8, corruption: 5, imfCompl: 4, relWest: 4, inequality: -0.6 },
      grp: { intl: 8, unions: 5, youth: 4, business: -7, diaspora: -4 },
      risk: 'Betrifft auch Teile der Diaspora, deren Überweisungen und Investitionen Sie an anderer Stelle dringend brauchen.',
      risks: ['revenue_authority', 'no_asset_registry'],
      tags: ['Steuern', 'Außenpolitik']
    },
    {
      id: 'bu_informal_registry', cat: 'budget', sub: 'Steuerverwaltung',
      title: 'Kleingewerbe mit einfacher Pauschalabgabe erfassen',
      desc: 'Registrierung über das Mobiltelefon, eine gestaffelte Pauschalabgabe nach Umsatzklasse statt vollständiger Buchführung, und im Gegenzug Zugang zu Bankkredit, Sozialversicherung und öffentlichen Aufträgen. Der informelle Sektor umfasst einen erheblichen Teil aller Beschäftigten.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 11, lag: 5,
      fiscal: { rev: 45, exp: 4 }, oneoff: 6,
      eff: { taxCompl: 9, privateSector: 5, socialProt: 5, digitalGov: 5, stateCap: 4 },
      grp: { business: 4, youth: 4, intl: 4, farmers: -3, sinhalaRural: -4 },
      risk: 'Für den Straßenhandel und die Kleinstwerkstatt ist auch eine niedrige Pauschale eine neue Belastung, und diese Gruppe protestiert sichtbar.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Informelle Wirtschaft']
    },

    /* ---------- Progressive Besteuerung ---------- */
    {
      id: 'bu_paye_progressive', cat: 'budget', sub: 'Progression',
      title: 'Lohn- und Einkommensteuer feiner staffeln',
      desc: 'Statt weniger breiter Stufen ein Tarif mit mehr Zwischenstufen: sanfter Einstieg für kleine und mittlere Einkommen, deutlich steilerer Anstieg im oberen Bereich. Der bisherige Tarif erreicht den Höchstsatz bei einem Einkommen, das in Colombo kein Spitzeneinkommen ist.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 14, lag: 2,
      fiscal: { rev: 42 },
      eff: { inequality: -1.8, taxCompl: 3, socialProt: 3 },
      grp: { unions: 9, youth: 6, publicSector: 5, sinhalaRural: 4, business: -7, sinhalaUrban: -3 },
      risk: 'Die oberen Stufen treffen genau die Fachkräfte, die ohnehin schon über Auswanderung nachdenken.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Umverteilung']
    },
    {
      id: 'bu_top_rate', cat: 'budget', sub: 'Progression',
      title: 'Spitzensteuersatz auf 45 Prozent anheben',
      desc: 'Eine zusätzliche Tarifstufe für sehr hohe Einkommen, kombiniert mit einer Mindestbesteuerung, damit die Stufe nicht durch Gestaltung leerläuft. Zielgruppe sind einige zehntausend Steuerpflichtige, nicht die Mittelschicht.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 16, lag: 2,
      fiscal: { rev: 38 },
      eff: { inequality: -1.6, brainDrain: 2.5, fdi: -0.1 },
      grp: { unions: 10, youth: 6, sinhalaRural: 5, publicSector: 4, business: -11, sinhalaUrban: -5 },
      risk: 'Ein hoher Spitzensatz bei schwachem Vollzug bringt vor allem Gestaltung, keine Einnahmen. Ohne funktionierende Betriebsprüfung ist das eine symbolische Maßnahme.',
      risks: ['revenue_authority', 'no_asset_registry'],
      tags: ['Steuern', 'Umverteilung']
    },
    {
      id: 'bu_corporate_tiers', cat: 'budget', sub: 'Progression',
      title: 'Körperschaftsteuer nach Unternehmensgröße staffeln',
      desc: 'Ermäßigter Satz für kleine und mittlere Unternehmen bis zu einer festen Umsatzgrenze, Regelsatz darüber, erhöhter Satz für marktbeherrschende Stellungen in Bankwesen, Telekommunikation und Handel. Entlastet die Betriebe, die Beschäftigung schaffen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 13, lag: 3,
      fiscal: { rev: 26 },
      eff: { privateSector: 4, inequality: -0.9, unemp: -0.1, taxCompl: 2 },
      grp: { business: -2, unions: 6, youth: 5, farmers: 4 },
      risk: 'Größenabhängige Sätze laden dazu ein, Unternehmen auf dem Papier zu zerlegen.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Mittelstand']
    },
    {
      id: 'bu_bank_levy', cat: 'budget', sub: 'Progression',
      title: 'Sonderabgabe auf Gewinne des Bankensektors',
      desc: 'Eine befristete Abgabe auf die Gewinne der Geschäftsbanken, die während der Umschuldung und der Hochzinsphase außergewöhnlich hohe Margen erzielt haben, während die Realwirtschaft keinen Kredit bekam.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 15, lag: 1,
      fiscal: { rev: 45 },
      eff: { inequality: -1.0, privateSector: -3, fdi: -0.15 },
      grp: { unions: 9, youth: 6, sinhalaRural: 5, farmers: 5, business: -12, intl: -4 },
      risk: 'Die Banken halten einen großen Teil der Staatsanleihen. Wenn Sie deren Bilanz schwächen, verteuern Sie Ihre eigene Refinanzierung.',
      tags: ['Steuern', 'Finanzsektor']
    },
    {
      id: 'bu_windfall_tax', cat: 'budget', sub: 'Progression',
      title: 'Übergewinnabgabe bei außergewöhnlichen Margen',
      desc: 'Eine gesetzlich definierte Abgabe, die greift, wenn ein Unternehmen in einem regulierten oder konzentrierten Markt eine Rendite weit oberhalb des Branchendurchschnitts erzielt. Anwendungsfälle waren zuletzt Telekommunikation, Zement und Speiseölimport.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 14, lag: 2,
      fiscal: { rev: 30 },
      eff: { inequality: -0.8, privateSector: -3, fdi: -0.18, corruption: -2 },
      grp: { unions: 8, sinhalaRural: 6, youth: 5, business: -11, intl: -5 },
      risk: 'Was ein Übergewinn ist, entscheidet am Ende eine Behörde. Das öffnet genau die Ermessensspielräume, die Sie an anderer Stelle schließen wollen.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Regulierung']
    },
    {
      id: 'bu_gift_tax', cat: 'budget', sub: 'Progression',
      title: 'Schenkungsteuer als Ergänzung zur Erbschaftsteuer',
      desc: 'Ohne Schenkungsteuer ist jede Erbschaftsteuer in wenigen Jahren umgangen, weil Vermögen vorher übertragen wird. Gleiche Sätze, gleiche Freibeträge, Zusammenrechnung über zehn Jahre.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 12, lag: 3,
      fiscal: { rev: 14 },
      eff: { inequality: -0.7, taxCompl: 3 },
      grp: { unions: 6, youth: 4, business: -7, sinhalaRural: -3 },
      risk: 'Trifft auch die Übertragung des Familienhauses und des Familienbetriebs, wenn die Freibeträge zu niedrig ausfallen.',
      req: ['bu_inheritance'],
      risks: ['no_asset_registry'],
      tags: ['Steuern', 'Vermögen']
    },
    {
      id: 'bu_land_value_tax', cat: 'budget', sub: 'Progression',
      title: 'Bodenwertabgabe auf ungenutzte Grundstücke',
      desc: 'Eine Abgabe auf den Bodenwert unbebauter und ungenutzter Grundstücke in Städten und in erschlossenen Lagen. Trifft Spekulationsbestände, nicht bewirtschaftetes Land, und setzt Flächen frei, die für Wohnungsbau vorgesehen waren.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 15, lag: 4,
      fiscal: { rev: 34 },
      eff: { housing: 8, inequality: -0.9, regionalBalance: 3, taxCompl: 3 },
      grp: { youth: 7, unions: 6, sinhalaUrban: 5, business: -8, farmers: -3 },
      risk: 'Ohne vollständiges Grundbuch treffen Sie diejenigen, deren Eigentum ordentlich eingetragen ist, und verfehlen den Rest.',
      risks: ['no_land_registry', 'no_asset_registry'],
      tags: ['Steuern', 'Wohnen']
    },

    /* ---------- Entlastung der Arbeitnehmerschaft ---------- */
    {
      id: 'bu_paye_threshold', cat: 'budget', sub: 'Entlastung',
      title: 'Steuerfreibetrag deutlich anheben',
      desc: 'Anhebung des steuerfreien Jahreseinkommens, sodass Beschäftigte im unteren Lohnbereich vollständig aus der Einkommensteuer herausfallen. Nach der Krise sind viele Haushalte real ärmer als 2019 und zahlen trotzdem erstmals Lohnsteuer.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 10, lag: 1,
      fiscal: { rev: -55 },
      eff: { poverty: -1.3, inequality: -1.1, socialProt: 4, brainDrain: -3 },
      grp: { unions: 12, publicSector: 10, youth: 8, sinhalaRural: 7, malaiyaha: 5, intl: -5 },
      risk: 'Kostet unmittelbar Einnahmen und gefährdet damit das Primärsaldoziel. Ohne Gegenfinanzierung wird die nächste Programmüberprüfung scheitern.',
      tags: ['Steuern', 'Entlastung']
    },
    {
      id: 'bu_worker_credit', cat: 'budget', sub: 'Entlastung',
      title: 'Steuergutschrift für Geringverdiener',
      desc: 'Eine erstattungsfähige Gutschrift für Erwerbstätige unterhalb einer Einkommensgrenze, ausgezahlt auch dann, wenn keine Steuer anfällt. Belohnt Erwerbsarbeit, erreicht anders als eine Steuersenkung auch diejenigen, die ohnehin nichts zahlen.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 13, lag: 3,
      fiscal: { exp: 40 },
      eff: { poverty: -2.2, inequality: -1.5, socialProt: 8, femaleLFP: 4, unemp: -0.1 },
      grp: { unions: 11, youth: 9, malaiyaha: 9, sinhalaRural: 8, farmers: 7, business: -3, intl: -3 },
      risk: 'Setzt voraus, dass die Verwaltung Einkommen zuverlässig kennt und auszahlen kann. Beides ist derzeit nicht gegeben.',
      risks: ['revenue_authority'],
      tags: ['Steuern', 'Soziales']
    },
    {
      id: 'bu_withholding_small', cat: 'budget', sub: 'Entlastung',
      title: 'Quellensteuer auf kleine Spareinlagen abschaffen',
      desc: 'Zinserträge unterhalb einer Freigrenze bleiben steuerfrei. Die pauschale Quellensteuer trifft Rentnerinnen und Kleinsparer, deren Zinsen die Inflation ohnehin nicht ausgleichen, und bringt gemessen daran wenig.',
      party: ['NPP', 'SJB', 'SLPP'], need: 'simple', pc: 6, lag: 1,
      fiscal: { rev: -18 },
      eff: { poverty: -0.4, socialProt: 3, inequality: -0.3 },
      grp: { sinhalaRural: 7, publicSector: 6, unions: 5, farmers: 4, intl: -2 },
      risk: 'Kleiner Betrag, kleine Wirkung, aber sehr sichtbar für eine Gruppe, die verlässlich zur Wahl geht.',
      tags: ['Steuern', 'Entlastung']
    },
    {
      id: 'bu_vat_rate_cut', cat: 'budget', sub: 'Entlastung',
      title: 'Mehrwertsteuersatz von 18 auf 15 Prozent senken',
      desc: 'Die Mehrwertsteuer belastet untere Einkommen anteilig am stärksten, weil sie ihr gesamtes Einkommen verbrauchen. Eine Senkung des Regelsatzes wirkt sofort auf die Lebenshaltungskosten, reißt aber ein sehr großes Loch in den Haushalt.',
      party: ['SJB', 'SLPP', 'FSP'], need: 'simple', pc: 18, lag: 1,
      fiscal: { rev: -265 },
      eff: { inflation: -1.2, poverty: -1.8, inequality: -0.9, imfCompl: -12 },
      grp: { sinhalaRural: 12, unions: 10, youth: 8, farmers: 8, malaiyaha: 8, business: 5, intl: -14 },
      risk: 'Das ist die teuerste Einzelmaßnahme im gesamten Katalog. Ohne massive Gegenfinanzierung bricht das Programm, und der Wechselkurs folgt.',
      tags: ['Steuern', 'Entlastung', 'Hochrisiko']
    }

  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
