/* ============================================================
   MASSNAHMEN  -  Wirtschaft, Arbeit, Landwirtschaft, Energie,
                  Staatsbetriebe, Justiz, Digitales, Außenpolitik
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* =============== WIRTSCHAFT & ARBEIT =============== */
    {
      id: 'ec_onestop', cat: 'economy', sub: 'Bürokratie',
      title: 'Zentrale Anlaufstelle für Unternehmensgründung und Genehmigungen',
      desc: 'Firmengründung, Grundstückserwerb, Baugenehmigung, Import und Steuernummer über ein digitales Verfahren mit gesetzlicher Genehmigungsfiktion nach 30 Tagen. Heute läuft ein Investor durch mehrere Behörden mit widersprüchlichen Regeln.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 10, lag: 5,
      fiscal: { exp: 12 }, oneoff: 18,
      eff: { privateSector: 15, fdi: 0.55, corruption: 7, digitalGov: 8, growth: 0.28, stateCap: 4 },
      grp: { business: 20, youth: 7, sinhalaUrban: 6, publicSector: -6 },
      risk: 'Jede weggefallene Genehmigung ist auch eine weggefallene Gelegenheit für ein Schmiergeld. Der Widerstand ist leise, aber zäh.',
      tags: ['Wirtschaft', 'Antikorruption']
    },
    {
      id: 'ec_labour_law', cat: 'economy', sub: 'Arbeitsrecht',
      title: 'Arbeitsrecht vereinheitlichen und flexibilisieren',
      desc: 'Sri Lanka hat über 40 teils widersprüchliche Arbeitsgesetze. Ein einheitliches Gesetzbuch mit klaren Kündigungsregeln, Teilzeit, befristeter Beschäftigung und Abfindungsanspruch statt des heutigen Genehmigungsverfahrens vor dem Arbeitsgericht.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 24, lag: 5,
      fiscal: {},
      eff: { privateSector: 12, fdi: 0.4, unemp: -0.5, femaleLFP: 1.4, growth: 0.22, socialProt: -4 },
      grp: { business: 18, intl: 8, youth: 4, unions: -20, publicSector: -6 },
      risk: 'Die Gewerkschaften werden das als Angriff auf Arbeitsplatzsicherheit lesen. Streiks in Häfen und Energiewirtschaft sind wahrscheinlich.',
      tags: ['Arbeitsmarkt', 'Umstritten']
    },
    {
      id: 'ec_labour_protect', cat: 'economy', sub: 'Arbeitsrecht',
      title: 'Arbeitsrecht modernisieren mit stärkerem Schutz',
      desc: 'Einheitliches Arbeitsgesetzbuch, aber mit Arbeitslosenversicherung, verbindlichen Tarifverhandlungen und Schutz für Beschäftigte in Plattformarbeit und informeller Beschäftigung.',
      party: ['NPP', 'FSP', 'CWC'], need: 'simple', pc: 18, lag: 5,
      fiscal: { exp: 34 },
      eff: { socialProt: 10, privateSector: 3, femaleLFP: 1.0, unemp: -0.2, inequality: -1.0 },
      grp: { unions: 18, youth: 8, malaiyaha: 8, business: -8 },
      risk: 'Erhöht die Lohnnebenkosten in einem Land, das gerade um Investoren wirbt.',
      tags: ['Arbeitsmarkt'], excl: ['ec_labour_law']
    },
    {
      id: 'ec_export_zones', cat: 'economy', sub: 'Industrie',
      title: 'Exportorientierte Industriezonen ausbauen',
      desc: 'Neue Zonen in Trincomalee, Hambantota und Jaffna mit vorbereiteter Infrastruktur, verlässlicher Stromversorgung und einheitlichem Genehmigungsrecht. Ziel ist eine Verbreiterung über Textil hinaus in Elektronik, Pharma und Logistik.',
      party: ['SJB', 'NDF', 'NPP'], need: 'simple', pc: 12, lag: 8,
      fiscal: { exp: 70 }, oneoff: 55,
      eff: { exports: 2.2, fdi: 0.7, privateSector: 10, unemp: -0.7, growth: 0.4, regionalBalance: 7, emissions: 0.7 },
      grp: { business: 16, youth: 9, tamilNE: 6, unions: -5 },
      risk: 'Sonderzonen mit Steuerbefreiungen kosten Einnahmen und schaffen nicht immer die versprochenen Arbeitsplätze.',
      tags: ['Industrie', 'Export']
    },
    {
      id: 'ec_tourism_upmarket', cat: 'economy', sub: 'Tourismus',
      title: 'Tourismus auf höherwertige Segmente ausrichten',
      desc: 'Statt reiner Ankunftszahlen zählt der Ertrag pro Gast. Qualitätsstandards, Ausbildung, Naturschutzabgaben, Erschließung von Kulturtourismus im Norden und Osten und ein einheitlicher Marktauftritt.',
      party: ['SJB', 'NDF', 'NPP'], need: 'exec', pc: 7, lag: 6,
      fiscal: { rev: 22, exp: 16 },
      eff: { tourism: 0.7, reserves: 0.5, privateSector: 7, exports: 0.5, regionalBalance: 5, forest: 0.4 },
      grp: { business: 12, youth: 7, tamilNE: 5, farmers: 3 },
      risk: 'Der Tourismus reagiert empfindlich auf Unruhen, Anschläge und Reisewarnungen. Er ist Ihre verwundbarste Devisenquelle.',
      tags: ['Tourismus', 'Devisen']
    },
    {
      id: 'ec_it_services', cat: 'economy', sub: 'Dienstleistungen',
      title: 'Digitale Dienstleistungsexporte auf 5 Mrd. USD ausbauen',
      desc: 'Softwareentwicklung, Buchhaltung, Rechtsdienstleistungen und Designarbeit für den Weltmarkt. Braucht Breitband, Englisch, verlässliche Zahlungswege und ein Datenschutzrecht, das internationale Auftraggeber akzeptieren.',
      party: ['SJB', 'NPP', 'NDF'], need: 'exec', pc: 8, lag: 8,
      fiscal: { exp: 24 },
      eff: { exports: 1.6, privateSector: 9, skillsMatch: 7, youthUnemp: -2.4, brainDrain: -6, digitalGov: 5 },
      grp: { youth: 14, business: 13, sinhalaUrban: 8, tamilNE: 4 },
      risk: 'Genau diese Fachkräfte können auch von Colombo aus für ausländische Firmen arbeiten und später ganz gehen.',
      tags: ['Digital', 'Export']
    },
    {
      id: 'ec_sme_credit', cat: 'economy', sub: 'Mittelstand',
      title: 'Kreditzugang für kleine und mittlere Betriebe',
      desc: 'Bürgschaftsfonds, Bewertung nach Zahlungsverhalten statt nur nach Grundbesitz, Umschuldungsprogramm für Betriebe, die die Krise überlebt haben, aber noch unter Altlasten leiden.',
      party: ['SJB', 'NPP'], need: 'simple', pc: 8, lag: 4,
      fiscal: { exp: 40 },
      eff: { privateSector: 11, unemp: -0.6, growth: 0.25, poverty: -0.5, regionalBalance: 4 },
      grp: { business: 14, farmers: 9, youth: 6, sinhalaRural: 7 },
      risk: 'Bürgschaftsprogramme können teuer werden, wenn die Auswahl der Betriebe politisch beeinflusst wird.',
      tags: ['Mittelstand', 'Wachstum']
    },
    {
      id: 'ec_trade_india', cat: 'economy', sub: 'Handel',
      title: 'Wirtschaftsabkommen mit Indien vertiefen',
      desc: 'Ausbau des bestehenden Freihandelsabkommens auf Dienstleistungen und Investitionen, gegenseitige Anerkennung von Standards, Landbrücke und Stromverbund. Indien ist der nächstgelegene große Markt und bereits wichtigster Handelspartner.',
      party: ['SJB', 'NDF', 'NPP'], need: 'simple', pc: 20, lag: 6,
      fiscal: { rev: -18 },
      eff: { exports: 1.8, fdi: 0.5, relIndia: 14, growth: 0.32, privateSector: 6, energyRel: 4 },
      grp: { business: 14, tamilNE: 6, intl: 7, sinhalaRural: -9, sangha: -8, farmers: -8 },
      risk: 'In Sri Lanka gibt es tiefsitzende Vorbehalte gegen wirtschaftliche Abhängigkeit von Indien. Die Proteste gegen ETCA und ECTA waren erheblich.',
      risks: ['customs_graft'],
      tags: ['Handel', 'Außenpolitik']
    },
    {
      id: 'ec_trade_protect', cat: 'economy', sub: 'Handel',
      title: 'Schutzzölle für heimische Produktion',
      desc: 'Höhere Einfuhrzölle auf Agrarprodukte und Konsumgüter, die im Land hergestellt werden können, verbunden mit Aufbauhilfen für die betroffenen Branchen.',
      party: ['SB', 'SLPP'], need: 'simple', pc: 10, lag: 3,
      fiscal: { rev: 65 },
      eff: { exports: -0.8, inflation: 1.1, privateSector: -6, agriProd: 3, foodSec: 3, growth: -0.2, relIndia: -5 },
      grp: { farmers: 14, sinhalaRural: 8, business: -10, sinhalaUrban: -7, intl: -8 },
      risk: 'Verteuert Lebenshaltung und Vorprodukte gleichzeitig. Genau diese Politik hat in der Vergangenheit die Exportwirtschaft geschwächt.',
      tags: ['Handel', 'Protektionismus'], excl: ['ec_trade_india']
    },
    {
      id: 'ec_port_city', cat: 'economy', sub: 'Finanzplatz',
      title: 'Colombo Port City als Finanzplatz entwickeln',
      desc: 'Eigenes Regelwerk für Finanzdienstleistungen, Streitbeilegung nach internationalem Standard, Ansiedlung von Vermögensverwaltung und Rückversicherung auf dem aufgeschütteten Gelände vor Colombo.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 16, lag: 8,
      fiscal: { rev: 20, exp: 10 },
      eff: { fdi: 0.8, privateSector: 8, growth: 0.3, exports: 0.6, corruption: -4, inequality: 0.7, relChina: 6 },
      grp: { business: 16, sinhalaUrban: 5, intl: 5, unions: -10, youth: -4, sinhalaRural: -5 },
      risk: 'Kritiker sehen ein Rechtsgebiet außerhalb srilankischen Rechts und ein Einfallstor für Geldwäsche. Das Gelände ist zudem chinesisch finanziert.',
      risks: ['customs_graft'],
      tags: ['Finanzen', 'Umstritten']
    },
    {
      id: 'ec_min_wage', cat: 'economy', sub: 'Löhne',
      title: 'Nationalen Mindestlohn deutlich anheben',
      desc: 'Anhebung des gesetzlichen Mindestlohns und automatische jährliche Anpassung an die Inflation, damit Reallöhne nicht wieder von Preissteigerungen aufgezehrt werden.',
      party: ['FSP', 'CWC', 'NPP'], need: 'simple', pc: 14, lag: 2,
      fiscal: { exp: 18 },
      eff: { poverty: -1.6, inequality: -1.4, privateSector: -6, unemp: 0.4, inflation: 0.6 },
      grp: { unions: 18, malaiyaha: 12, youth: 8, sinhalaRural: 8, business: -16 },
      risk: 'In einem Land mit sehr großem informellem Sektor erreicht ein Mindestlohn nur einen Teil der Beschäftigten und kann formelle Jobs verdrängen.',
      tags: ['Löhne', 'Armut']
    },
    {
      id: 'ec_public_wage_freeze', cat: 'economy', sub: 'Staatsdienst',
      title: 'Einstellungsstopp und Verschlankung im Staatsdienst',
      desc: 'Sri Lanka beschäftigt rund 1,4 Millionen Menschen im öffentlichen Dienst, gemessen an der Bevölkerung außergewöhnlich viele. Keine Neueinstellungen außer in Bildung und Gesundheit, Nachbesetzung nur jeder dritten frei werdenden Stelle.',
      party: ['NDF', 'NPP'], need: 'exec', pc: 20, lag: 6,
      fiscal: { exp: -110 },
      eff: { stateCap: -5, corruption: 3, unemp: 0.5, youthUnemp: 1.4, taxCompl: 2 },
      grp: { publicSector: -22, unions: -14, youth: -8, business: 10, intl: 14 },
      risk: 'Der Staatsdienst ist für viele Familien die einzige sichere Beschäftigung. Der Erwartungsdruck, dass der Staat Arbeit gibt, ist tief verwurzelt.',
      tags: ['Staatsdienst', 'Haushalt']
    },
    {
      id: 'ec_informal_formalise', cat: 'economy', sub: 'Arbeitsmarkt',
      title: 'Informelle Beschäftigung schrittweise formalisieren',
      desc: 'Vereinfachte Registrierung für Kleinstbetriebe, pauschale Abgaben statt komplexer Steuererklärungen, Zugang zu Sozialversicherung und Krediten als Gegenleistung.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 9, lag: 6,
      fiscal: { rev: 55, exp: 22 },
      eff: { taxCompl: 12, socialProt: 7, privateSector: 5, inequality: -0.8, stateCap: 3 },
      grp: { business: 6, unions: 6, farmers: 4, sinhalaRural: 4, intl: 8 },
      risk: 'Wenn die Gegenleistung ausbleibt, wird daraus nur eine neue Steuer für die Ärmsten.',
      risks: ['revenue_authority'],
      tags: ['Arbeitsmarkt', 'Steuern']
    },

    /* =============== LANDWIRTSCHAFT & FISCHEREI =============== */
    {
      id: 'ag_modernise', cat: 'agri', sub: 'Produktivität',
      title: 'Landwirtschaft technisch modernisieren',
      desc: 'Mechanisierung, Bodenanalyse, verbesserte Saatgutsorten, Tröpfchenbewässerung und Beratungsdienste. Ziel ist nicht, dass mehr Menschen Bauern werden, sondern dass weniger Menschen mehr erzeugen und dabei besser verdienen.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 8, lag: 8,
      fiscal: { exp: 55 },
      eff: { agriProd: 18, foodSec: 9, growth: 0.22, poverty: -0.8, exports: 0.5, emissions: -0.3 },
      grp: { farmers: 16, business: 6, sinhalaRural: 9, intl: 5 },
      risk: 'Modernisierung setzt Arbeitskräfte frei. Ohne Alternativen wandern sie in Städte oder ins Ausland ab.',
      tags: ['Landwirtschaft', 'Wachstum']
    },
    {
      id: 'ag_storage', cat: 'agri', sub: 'Wertschöpfung',
      title: 'Lager, Kühlketten und Vermarktung aufbauen',
      desc: 'Ein erheblicher Teil der Ernte verdirbt zwischen Feld und Markt. Kühlhäuser in den Anbauregionen, Sammelstellen, digitale Preisinformation und Direktvermarktung an der Zwischenhändlerkette vorbei.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 6, lag: 6,
      fiscal: { exp: 32 }, oneoff: 28,
      eff: { agriProd: 12, foodSec: 8, inflation: -0.5, poverty: -0.5, exports: 0.4 },
      grp: { farmers: 18, sinhalaRural: 9, business: 4, sinhalaUrban: 5 },
      risk: 'Die Zwischenhändler sind lokal gut vernetzt und politisch nicht einflusslos.',
      tags: ['Landwirtschaft', 'Preise']
    },
    {
      id: 'ag_fertiliser_smart', cat: 'agri', sub: 'Betriebsmittel',
      title: 'Zielgenaue Düngerförderung statt Gießkanne',
      desc: 'Förderung an Bodenanalyse und tatsächlichen Bedarf gekoppelt, ausgezahlt digital direkt an die Betriebe. Das abrupte Düngerverbot von 2021 führte zu Ernteeinbrüchen und trug zur Krise bei.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 7, lag: 4,
      fiscal: { exp: 26 },
      eff: { agriProd: 9, foodSec: 6, forest: 0.2, emissions: -0.4, digitalGov: 3 },
      grp: { farmers: 12, sinhalaRural: 6, intl: 5 },
      risk: 'Jede Änderung an der Düngerpolitik weckt Erinnerungen an 2021. Kommunikation entscheidet.',
      tags: ['Landwirtschaft']
    },
    {
      id: 'ag_organic_ban', cat: 'agri', sub: 'Betriebsmittel',
      title: 'Umstellung auf ökologischen Landbau erzwingen',
      desc: 'Verbot chemischer Dünge- und Pflanzenschutzmittel mit dem Ziel einer vollständig ökologischen Landwirtschaft. Genau dieser Schritt wurde 2021 ohne Übergangszeit versucht.',
      party: [], need: 'exec', pc: 8, lag: 2,
      fiscal: { exp: -30 },
      eff: { agriProd: -22, foodSec: -18, inflation: 3.2, poverty: 2.4, forest: 0.5, emissions: -1.2, growth: -0.8 },
      grp: { farmers: -26, sinhalaRural: -16, business: -8, intl: -10 },
      risk: 'Historisch belegt gescheitert. Ernteeinbrüche, Importbedarf, Preissprünge und massiver Vertrauensverlust.',
      tags: ['Landwirtschaft', 'Hochrisiko'], excl: ['ag_fertiliser_smart']
    },
    {
      id: 'ag_land_titles', cat: 'agri', sub: 'Land',
      title: 'Landtitel klären und handelbar machen',
      desc: 'Ein großer Teil des Bodens liegt unter staatlichen Zuteilungsurkunden ohne volles Eigentum. Ohne klare Titel gibt es keine Kreditsicherheit und keine Investitionen. Digitales Grundbuch und Umwandlung in echtes Eigentum.',
      party: ['NDF', 'SJB', 'NPP'], need: 'simple', pc: 18, lag: 8,
      fiscal: { rev: 14, exp: 20 },
      eff: { agriProd: 8, privateSector: 8, digitalGov: 5, growth: 0.2, inequality: 0.6 },
      grp: { business: 10, farmers: 6, sinhalaRural: -5, unions: -6 },
      risk: 'Handelbares Land führt in armen Regionen häufig zu Verkäufen unter Wert und Landkonzentration.',
      risks: ['no_land_registry'],
      tags: ['Land', 'Wirtschaft']
    },
    {
      id: 'ag_fisheries', cat: 'agri', sub: 'Fischerei',
      title: 'Fischereiwirtschaft modernisieren',
      desc: 'Ausbau der Fischereihäfen in Jaffna, Trincomalee und Negombo, Kühlketten, Motoren mit geringerem Verbrauch, Aquakultur und Exportzertifizierung für den EU-Markt.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'exec', pc: 6, lag: 6,
      fiscal: { exp: 26 },
      eff: { agriProd: 6, exports: 0.6, foodSec: 5, regionalBalance: 5, trustTamil: 5, maritimeSec: 3 },
      grp: { farmers: 14, tamilNE: 9, muslim: 6, business: 5 },
      risk: 'Ohne Bestandsmanagement führt höhere Fangkapazität zur Überfischung.',
      tags: ['Fischerei', 'Export']
    },
    {
      id: 'ag_tea_reform', cat: 'agri', sub: 'Plantagen',
      title: 'Teesektor neu aufstellen',
      desc: 'Wiederbepflanzung überalterter Felder, Markenaufbau statt Massenexport, Weiterverarbeitung im Land und ein neues Modell der Flächenbewirtschaftung mit Beteiligung der Arbeiterfamilien.',
      party: ['CWC', 'SJB', 'NPP'], need: 'simple', pc: 12, lag: 8,
      fiscal: { exp: 30 },
      eff: { exports: 0.8, agriProd: 7, trustHill: 8, regionalBalance: 4, privateSector: 3 },
      grp: { malaiyaha: 12, business: 6, unions: 8, farmers: 5 },
      risk: 'Die Plantagengesellschaften halten langfristige Pachtverträge und werden jede Änderung juristisch prüfen lassen.',
      tags: ['Plantagen', 'Export']
    },
    {
      id: 'ag_elephant', cat: 'agri', sub: 'Konflikte',
      title: 'Mensch-Elefant-Konflikt entschärfen',
      desc: 'Jedes Jahr sterben Menschen und Hunderte Elefanten. Elektrozäune nach saisonalen Wanderwegen, Frühwarnsysteme, Entschädigung für Ernteschäden und Wiederherstellung von Wanderkorridoren.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 4, lag: 5,
      fiscal: { exp: 14 },
      eff: { agriProd: 4, forest: 0.6, legitimacy: 3, foodSec: 2 },
      grp: { farmers: 13, sinhalaRural: 9, intl: 4 },
      risk: 'Zäune allein haben bisher nie funktioniert. Ohne Korridore verschiebt sich das Problem nur.',
      tags: ['Landwirtschaft', 'Umwelt']
    },

    /* =============== ENERGIE & STAATSBETRIEBE =============== */
    {
      id: 'en_cost_reflective', cat: 'energy', sub: 'Preise',
      title: 'Kostendeckende Strom- und Treibstoffpreise',
      desc: 'Preise decken die tatsächlichen Kosten, mit automatischer Anpassungsformel und einem Sozialtarif für einkommensschwache Haushalte. Eine der zentralen Forderungen des IWF-Programms.',
      party: ['NDF', 'NPP'], need: 'exec', pc: 16, lag: 2,
      fiscal: { exp: -120 },
      eff: { soeHealth: 16, inflation: 1.4, imfCompl: 10, poverty: 0.7, energyRel: 4, privateSector: -3 },
      grp: { intl: 16, business: 4, sinhalaRural: -12, unions: -12, youth: -7, farmers: -8 },
      risk: 'Strompreiserhöhungen sind in Sri Lanka der klassische Auslöser für Straßenproteste.',
      tags: ['Energie', 'IWF']
    },
    {
      id: 'en_soe_reform', cat: 'energy', sub: 'Staatsbetriebe',
      title: 'Staatsbetriebe reformieren statt privatisieren',
      desc: 'Professionelle Aufsichtsräte statt politischer Ernennungen, veröffentlichte Jahresabschlüsse, verbindliche Zielvereinbarungen und harte Budgetgrenzen, aber Eigentum bleibt beim Staat. Die Linie der Regierungspartei.',
      party: ['NPP'], need: 'simple', pc: 14, lag: 6,
      fiscal: { exp: -60, rev: 12 },
      eff: { soeHealth: 18, corruption: 6, stateCap: 5, energyRel: 4, privateSector: 2 },
      grp: { unions: 4, publicSector: -4, business: 6, intl: 8 },
      risk: 'Ohne Wettbewerbsdruck bleibt der Reformdruck begrenzt. Frühere Anläufe versandeten nach dem Regierungswechsel.',
      risks: ['soe_opacity'],
      tags: ['Staatsbetriebe'], excl: ['en_privatise']
    },
    {
      id: 'en_privatise', cat: 'energy', sub: 'Staatsbetriebe',
      title: 'Verlustreiche Staatsbetriebe teilprivatisieren',
      desc: 'Verkauf von Minderheits- oder Mehrheitsanteilen an SriLankan Airlines, Hotelbeteiligungen und Teilen der Energiewirtschaft, mit Beschäftigungsgarantien für eine Übergangszeit.',
      party: ['NDF'], need: 'simple', pc: 30, lag: 6,
      fiscal: { rev: 90, exp: -80 },
      eff: { soeHealth: 22, debtGdpOneOff: -1.5, privateSector: 9, fdi: 0.5, corruption: -3, energyRel: 3 },
      grp: { business: 16, intl: 16, unions: -26, publicSector: -16, sinhalaRural: -8, youth: -6 },
      risk: 'Privatisierung ist in Sri Lanka historisch mit Korruptionsvorwürfen belastet. Gewerkschaften in Häfen und Energie können das Land lahmlegen.',
      risks: ['soe_opacity'],
      tags: ['Staatsbetriebe', 'Umstritten'], excl: ['en_soe_reform']
    },
    {
      id: 'en_renewables', cat: 'energy', sub: 'Erzeugung',
      title: 'Erneuerbare Energien massiv ausbauen',
      desc: 'Wind in Mannar und Puttalam, Solar auf Dächern und Freiflächen, Netzausbau und Speicher. Ziel ist ein Anteil von 70 Prozent an der Stromerzeugung, verbunden mit geringerer Abhängigkeit von Brennstoffimporten.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 10, lag: 8,
      fiscal: { exp: 85 }, oneoff: 70,
      eff: { renewables: 22, emissions: -3.4, energyRel: 9, reserves: 0.6, climateRes: 6, fdi: 0.4, growth: 0.18 },
      grp: { business: 10, youth: 11, intl: 12, farmers: 4, tamilNE: 5 },
      risk: 'Windparks in Mannar berühren Vogelzugrouten und lokale Landfragen. Netzstabilität braucht Investitionen, die oft vergessen werden.',
      tags: ['Klima', 'Energie']
    },
    {
      id: 'en_grid_india', cat: 'energy', sub: 'Erzeugung',
      title: 'Stromverbund mit Indien herstellen',
      desc: 'Eine Seekabelverbindung nach Tamil Nadu erlaubt Import bei Engpässen und Export von überschüssigem Wind- und Solarstrom. Technisch seit Jahren geprüft, politisch immer wieder verschoben.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 16, lag: 8,
      fiscal: { exp: 30 }, oneoff: 60,
      eff: { energyRel: 14, renewables: 5, relIndia: 12, reserves: 0.3, emissions: -1.0 },
      grp: { business: 10, intl: 8, sinhalaRural: -8, sangha: -7, military: -5 },
      risk: 'Abhängigkeit von Indien in der Grundversorgung ist innenpolitisch hochsensibel.',
      tags: ['Energie', 'Außenpolitik']
    },
    {
      id: 'en_lng', cat: 'energy', sub: 'Erzeugung',
      title: 'Umstellung von Kohle und Öl auf Flüssigerdgas',
      desc: 'Ein Importterminal und die Umrüstung bestehender Kraftwerke senken Emissionen und Kosten gegenüber Schweröl, schaffen aber eine neue Importabhängigkeit.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 9, lag: 8,
      fiscal: { exp: 24 }, oneoff: 55,
      eff: { emissions: -1.8, energyRel: 8, renewables: -2, reserves: -0.25, soeHealth: 4 },
      grp: { business: 8, intl: 5, youth: -3 },
      risk: 'Bindet das Land für Jahrzehnte an fossile Importe, gerade wenn erneuerbare Alternativen günstiger werden.',
      tags: ['Energie']
    },
    {
      id: 'en_ceb_unbundle', cat: 'energy', sub: 'Struktur',
      title: 'Stromversorger entflechten und Regulierer stärken',
      desc: 'Trennung von Erzeugung, Netz und Vertrieb, unabhängige Regulierungsbehörde mit Preisfestsetzungsrecht, diskriminierungsfreier Netzzugang für private Erzeuger.',
      party: ['NDF', 'SJB', 'NPP'], need: 'simple', pc: 20, lag: 6,
      fiscal: { exp: -25 },
      eff: { soeHealth: 12, energyRel: 8, renewables: 6, privateSector: 6, corruption: 4 },
      grp: { business: 12, intl: 10, unions: -18, publicSector: -8 },
      risk: 'Die Gewerkschaft der Stromversorger gehört zu den kampfstärksten des Landes und hat Reformen mehrfach gestoppt.',
      risks: ['soe_opacity'],
      tags: ['Energie', 'Staatsbetriebe']
    },
    {
      id: 'en_fuel_market', cat: 'energy', sub: 'Struktur',
      title: 'Treibstoffmarkt für weitere Anbieter öffnen',
      desc: 'Zusätzliche Lizenzen für Import und Vertrieb, Ende des faktischen Monopols der staatlichen Ölgesellschaft, transparente Preisformel.',
      party: ['NDF'], need: 'exec', pc: 12, lag: 4,
      fiscal: { exp: -30, rev: 8 },
      eff: { soeHealth: 9, energyRel: 6, privateSector: 5, inflation: -0.3, fdi: 0.2 },
      grp: { business: 10, intl: 8, unions: -14, publicSector: -8 },
      risk: 'Erinnert viele an die Warteschlangen von 2022, als der Staat allein die Versorgung nicht sichern konnte.',
      tags: ['Energie']
    },

    /* =============== JUSTIZ & KORRUPTION =============== */
    {
      id: 'ju_anticorruption_unit', cat: 'justice', sub: 'Korruption',
      title: 'Antikorruptionsbehörde mit eigenen Ermittlern',
      desc: 'Die Commission to Investigate Allegations of Bribery or Corruption erhält eigene Ermittler, Finanzfahnder, Zugang zu Kontodaten und ein Budget, das nicht jedes Jahr neu verhandelt wird.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 14, lag: 4,
      fiscal: { exp: 16 },
      eff: { corruption: 14, ruleOfLaw: 8, legitimacy: 8, stateCap: 3, fdi: 0.2 },
      grp: { youth: 14, sinhalaUrban: 11, intl: 10, business: 6, publicSector: -8 },
      risk: 'Ermittlungen werden irgendwann auch Ihre eigenen Leute treffen. Wie Sie dann reagieren, entscheidet alles.',
      risks: ['weak_anticorruption', 'no_prosecution_service'],
      tags: ['Antikorruption']
    },
    {
      id: 'ju_asset_recovery', cat: 'justice', sub: 'Korruption',
      title: 'Rückführung von Vermögen aus dem Ausland',
      desc: 'Rechtshilfeabkommen, Beweislastumkehr bei unerklärlichem Vermögen, Zusammenarbeit mit Dubai, Singapur und der Schweiz. Ein zentrales Wahlversprechen, dessen Umsetzung juristisch außerordentlich langwierig ist.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 16, lag: 8,
      fiscal: { rev: 35, exp: 8 },
      eff: { corruption: 9, legitimacy: 9, ruleOfLaw: 5, relWest: 4 },
      grp: { youth: 16, sinhalaUrban: 12, sinhalaRural: 10, intl: 6, business: -5 },
      risk: 'Die Erwartungen sind riesig, die Verfahren dauern Jahre. Ausbleibende Ergebnisse werden Ihnen als Versagen ausgelegt.',
      risks: ['no_prosecution_service', 'no_asset_registry'],
      tags: ['Antikorruption', 'Wahlversprechen']
    },
    {
      id: 'ju_court_backlog', cat: 'justice', sub: 'Justiz',
      title: 'Verfahrensstau in der Justiz abbauen',
      desc: 'Zusätzliche Richterstellen, elektronische Aktenführung, Mediation für Zivilsachen und Fristen für Urteile. Verfahren dauern in Sri Lanka regelmäßig über zehn Jahre.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 10, lag: 6,
      fiscal: { exp: 28 }, oneoff: 18,
      eff: { ruleOfLaw: 14, privateSector: 6, corruption: 4, legitimacy: 6, digitalGov: 4 },
      grp: { business: 12, sinhalaUrban: 8, youth: 6, tamilNE: 5, muslim: 5 },
      risk: 'Wenig sichtbar im Alltag, aber Grundlage für Investitionen und Vertrauen.',
      tags: ['Justiz']
    },
    {
      id: 'ju_procurement', cat: 'justice', sub: 'Korruption',
      title: 'Öffentliche Vergabe vollständig digitalisieren',
      desc: 'Alle Ausschreibungen, Angebote, Zuschläge und Vertragsänderungen über eine öffentliche Plattform, einschließlich der wirtschaftlich Berechtigten der Bieter.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 9, lag: 4,
      fiscal: { exp: -45, oneoffX: 0 }, oneoff: 14,
      eff: { corruption: 12, digitalGov: 8, stateCap: 5, privateSector: 5 },
      grp: { business: 12, youth: 9, intl: 9, publicSector: -8 },
      risk: 'Trifft die verbreitetste Form politischer Korruption unmittelbar. Der Widerstand kommt aus allen Parteien.',
      risks: ['weak_anticorruption'],
      tags: ['Antikorruption', 'Digital']
    },
    {
      id: 'ju_whistleblower', cat: 'justice', sub: 'Korruption',
      title: 'Hinweisgeberschutz gesetzlich verankern',
      desc: 'Schutz vor Kündigung und Verfolgung, anonyme Meldewege, Prämien bei nachgewiesenen Fällen für Personen, die Korruption in Behörden und Staatsbetrieben melden.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 8, lag: 3,
      fiscal: { exp: 5 },
      eff: { corruption: 8, ruleOfLaw: 5, pressFree: 5, stateCap: 2 },
      grp: { youth: 8, sinhalaUrban: 6, intl: 6, publicSector: -5 },
      risk: 'Ohne funktionierenden Schutz melden Menschen nichts. Der erste Fall, der schiefgeht, beendet das Programm faktisch.',
      risks: ['no_prosecution_service'],
      tags: ['Antikorruption']
    },
    {
      id: 'ju_legal_aid', cat: 'justice', sub: 'Justiz',
      title: 'Prozesskostenhilfe flächendeckend ausbauen',
      desc: 'Rechtsbeistand für einkommensschwache Personen in allen Distrikten, in Sinhala und Tamil, insbesondere für Untersuchungshäftlinge und Landstreitigkeiten.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'exec', pc: 5, lag: 4,
      fiscal: { exp: 12 },
      eff: { ruleOfLaw: 8, langAccess: 4, trustTamil: 6, poverty: -0.2, legitimacy: 4 },
      grp: { tamilNE: 8, malaiyaha: 7, muslim: 6, unions: 4 },
      risk: 'Gering. Der Engpass sind ausgebildete zweisprachige Juristen.',
      risks: ['court_backlog'],
      tags: ['Justiz', 'Teilhabe']
    },

    /* =============== DIGITALISIERUNG =============== */
    {
      id: 'di_digital_id', cat: 'digital', sub: 'Infrastruktur',
      title: 'Digitale Identität für alle Bürger einführen',
      desc: 'Eine überprüfbare digitale Identität als Grundlage für Sozialleistungen, Steuerverwaltung, Bankzugang und Behördengänge. Indien hat mit Aadhaar gezeigt, was möglich ist, und auch, welche Risiken entstehen.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 12, lag: 6,
      fiscal: { exp: 22 }, oneoff: 45,
      eff: { digitalGov: 20, taxCompl: 9, socialProt: 7, corruption: 5, stateCap: 7, privateSector: 4 },
      grp: { business: 10, youth: 10, intl: 8, sinhalaUrban: 6, muslim: -5, tamilNE: -4 },
      risk: 'Ohne starkes Datenschutzrecht entsteht ein Überwachungsinstrument. Minderheiten haben historisch gute Gründe, Registern zu misstrauen.',
      tags: ['Digital', 'Verwaltung'], req: []
    },
    {
      id: 'di_data_protection', cat: 'digital', sub: 'Recht',
      title: 'Datenschutzrecht mit unabhängiger Aufsicht',
      desc: 'Das Gesetz von 2022 tritt vollständig in Kraft, die Aufsichtsbehörde wird personell und finanziell unabhängig. Voraussetzung dafür, dass europäische Auftraggeber Daten nach Sri Lanka geben dürfen.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 7, lag: 4,
      fiscal: { exp: 8 },
      eff: { digitalGov: 8, privateSector: 6, exports: 0.4, ruleOfLaw: 5, relWest: 5, pressFree: 4 },
      grp: { business: 9, youth: 8, intl: 7, muslim: 5, tamilNE: 5 },
      risk: 'Gering. Bremst allerdings staatliche Datensammlung, was Sicherheitsbehörden nicht gefallen wird.',
      tags: ['Digital', 'Bürgerrechte']
    },
    {
      id: 'di_tax_digital', cat: 'digital', sub: 'Verwaltung',
      title: 'Steuerverwaltung vollständig digitalisieren',
      desc: 'Verpflichtende elektronische Rechnungen, automatischer Datenabgleich zwischen Zoll, Banken, Grundbuch und Finanzamt, Risikoanalyse für Prüfungen. Der wirksamste Hebel gegen Steuerhinterziehung.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 11, lag: 6,
      fiscal: { rev: 210, exp: 18 },
      eff: { taxCompl: 20, corruption: 7, digitalGov: 11, stateCap: 6, privateSector: -2 },
      grp: { intl: 14, sinhalaUrban: 5, business: -8, publicSector: -5 },
      risk: 'Der ehrlichere Weg zu höheren Einnahmen als jede Steuererhöhung. Aber er dauert und trifft Menschen, die bisher nichts gezahlt haben.',
      tags: ['Digital', 'Steuern']
    },
    {
      id: 'di_broadband', cat: 'digital', sub: 'Infrastruktur',
      title: 'Breitband bis in jede Kommune',
      desc: 'Glasfaseranbindung aller Verwaltungszentren, Schulen und Gesundheitsstationen, Universaldienstverpflichtung für Anbieter und günstige Basisrate.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 7, lag: 8,
      fiscal: { exp: 34 }, oneoff: 50,
      eff: { digitalGov: 10, regionalBalance: 8, education: 5, privateSector: 6, skillsMatch: 4, exports: 0.3 },
      grp: { youth: 12, business: 9, tamilNE: 6, sinhalaRural: 7, malaiyaha: 5 },
      risk: 'Verlegte Leitungen ohne bezahlbare Tarife nützen niemandem.',
      tags: ['Digital', 'Regional']
    },
    {
      id: 'di_egov', cat: 'digital', sub: 'Verwaltung',
      title: 'Behördengänge digital und papierlos',
      desc: 'Geburtsurkunden, Grundbuchauszüge, Gewerbeanmeldungen, Führerscheine und Rentenanträge vollständig online, mit einheitlichem Zugang und gesetzlicher Bearbeitungsfrist.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 8, lag: 6,
      fiscal: { exp: 18 }, oneoff: 26,
      eff: { digitalGov: 14, stateCap: 8, corruption: 8, privateSector: 5, legitimacy: 5 },
      grp: { youth: 11, business: 10, sinhalaUrban: 8, publicSector: -7 },
      risk: 'Digitalisierung ohne Prozessreform digitalisiert nur das Chaos.',
      tags: ['Digital', 'Verwaltung']
    },

    /* =============== AUSSENPOLITIK =============== */
    {
      id: 'fo_nonaligned', cat: 'foreign', sub: 'Strategie',
      title: 'Gleichgewichtige Außenpolitik als Doktrin festlegen',
      desc: 'Eine schriftlich festgelegte Linie: wirtschaftliche Zusammenarbeit mit allen, militärische Bindung an niemanden, gleiche Regeln für alle Partner. Sri Lankas Lage an den wichtigsten Schifffahrtsrouten ist Chance und Risiko zugleich.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 8, lag: 3,
      fiscal: {},
      eff: { relIndia: 6, relChina: 6, relWest: 6, relJapan: 5, legitimacy: 4, maritimeSec: 3 },
      grp: { intl: 8, business: 6, sinhalaRural: 4, military: 3 },
      risk: 'Gleichgewicht funktioniert nur, solange alle Seiten glauben, dass Sie es ernst meinen.',
      tags: ['Außenpolitik']
    },
    {
      id: 'fo_gsp_plus', cat: 'foreign', sub: 'Handel',
      title: 'GSP-Plus-Handelsstatus mit der EU sichern',
      desc: 'Der zollfreie Zugang zum europäischen Markt ist an 27 Menschenrechts- und Arbeitsübereinkommen geknüpft, insbesondere an die Abschaffung des PTA. Für die Textilindustrie geht es um Hunderttausende Arbeitsplätze.',
      party: ['SJB', 'NDF', 'NPP'], need: 'exec', pc: 10, lag: 4,
      fiscal: {},
      eff: { exports: 1.4, relWest: 12, privateSector: 6, unemp: -0.35, reserves: 0.4 },
      grp: { business: 15, unions: 8, intl: 10, youth: 5, sangha: -4 },
      risk: 'Bedingt praktisch die Abschaffung des PTA und Fortschritte bei Menschenrechten. Ohne diese Schritte ist der Status gefährdet.',
      tags: ['Handel', 'Menschenrechte']
    },
    {
      id: 'fo_debt_transparency', cat: 'foreign', sub: 'Schulden',
      title: 'Alle Kreditverträge offenlegen',
      desc: 'Veröffentlichung sämtlicher Staatskreditverträge einschließlich Nebenabreden und Sicherheiten. Mehrere bilaterale Verträge enthalten Vertraulichkeitsklauseln, die eine öffentliche Debatte bislang verhindern.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 12, lag: 2,
      fiscal: {},
      eff: { corruption: 8, legitimacy: 7, relWest: 5, relChina: -8, imfCompl: 5 },
      grp: { youth: 11, sinhalaUrban: 8, intl: 7, business: 4 },
      risk: 'Verstößt gegen Vertraulichkeitszusagen gegenüber einzelnen Gläubigern und wird diplomatisch Kosten haben.',
      tags: ['Schulden', 'Transparenz']
    },
    {
      id: 'fo_debt_audit', cat: 'foreign', sub: 'Schulden',
      title: 'Unabhängige Prüfung der Staatsschulden',
      desc: 'Eine Kommission untersucht, wie einzelne Kredite zustande kamen, ob Projekte wirtschaftlich waren und ob Teile der Schulden auf Korruption beruhen. Forderung IWF-kritischer Kräfte.',
      party: ['SB', 'FSP'], need: 'simple', pc: 18, lag: 5,
      fiscal: { exp: 6 },
      eff: { corruption: 6, legitimacy: 5, imfCompl: -8, relChina: -10, reserves: -0.3, fdi: -0.2 },
      grp: { youth: 10, unions: 10, sinhalaRural: 8, intl: -14, business: -8 },
      risk: 'Märkte und Gläubiger lesen eine Schuldenprüfung als Vorbereitung eines Zahlungsstopps. Die Refinanzierungskosten steigen sofort.',
      risks: ['no_prosecution_service'],
      tags: ['Schulden', 'Risiko']
    },
    {
      id: 'fo_diaspora_bonds', cat: 'foreign', sub: 'Diaspora',
      title: 'Diaspora-Anleihen und Investitionskanäle',
      desc: 'Anleihen mit attraktiver Verzinsung für Auslandssrilanker, vereinfachte Investitionswege und ein Beirat, der sinhalesische und tamilische Auslandsgemeinden einbezieht.',
      party: ['SJB', 'NPP'], need: 'exec', pc: 9, lag: 5,
      fiscal: { rev: 12 },
      eff: { diaspora: 14, reserves: 0.8, fdi: 0.25, remittances: 0.3, reconcile: 4 },
      grp: { diaspora: 16, business: 8, tamilNE: 6, intl: 4 },
      risk: 'Funktioniert nur, wenn die tamilische Diaspora Vertrauen fasst. Ohne Fortschritte bei der Aufarbeitung bleibt der Zufluss gering.',
      tags: ['Diaspora', 'Devisen']
    },
    {
      id: 'fo_china_projects', cat: 'foreign', sub: 'Investitionen',
      title: 'Chinesische Investitionen gezielt ausweiten',
      desc: 'Neue Vorhaben in Hambantota, Colombo und der Energiewirtschaft, verbunden mit Umschuldungsgesprächen. China ist der größte einzelne bilaterale Gläubiger.',
      party: ['SLPP', 'SB'], need: 'exec', pc: 12, lag: 6,
      fiscal: { rev: 20, exp: 10 },
      eff: { relChina: 16, fdi: 0.6, infra: 6, relIndia: -12, relWest: -8, debtGdpOneOff: 1.2, growth: 0.2 },
      grp: { business: 8, sinhalaRural: 5, intl: -6, tamilNE: -4 },
      risk: 'Verschiebt das außenpolitische Gleichgewicht sichtbar und belastet die Beziehungen zu Indien und dem Westen.',
      tags: ['Außenpolitik', 'Investitionen']
    },
    {
      id: 'fo_unhrc_engage', cat: 'foreign', sub: 'Menschenrechte',
      title: 'Zusammenarbeit mit dem UN-Menschenrechtsrat wieder aufnehmen',
      desc: 'Rückkehr an den Verhandlungstisch in Genf, Zugang für Sonderberichterstatter, freiwillige Berichterstattung über Fortschritte bei Aufarbeitung und Bürgerrechten.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'exec', pc: 14, lag: 3,
      fiscal: { exp: 4 },
      eff: { relWest: 12, reconcile: 7, trustTamil: 8, ruleOfLaw: 4, sinhalaPress: 12 },
      grp: { intl: 12, tamilNE: 12, diaspora: 10, muslim: 6, military: -12, sinhalaRural: -8, sangha: -9 },
      risk: 'Wird im Süden als Einmischung dargestellt. Zugleich Voraussetzung für viele Handels- und Finanzierungsvorteile.',
      tags: ['Menschenrechte', 'Außenpolitik']
    },
    {
      id: 'fo_regional_trade', cat: 'foreign', sub: 'Handel',
      title: 'Beitritt zu regionalen Handelsabkommen prüfen und vollziehen',
      desc: 'Anschluss an größere asiatische Wertschöpfungsketten über regionale Abkommen, mit Übergangsfristen für empfindliche Branchen.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 16, lag: 8,
      fiscal: { rev: -25 },
      eff: { exports: 1.5, fdi: 0.5, growth: 0.3, privateSector: 7, relChina: 5, relJapan: 5 },
      grp: { business: 14, intl: 8, farmers: -10, unions: -8, sinhalaRural: -6 },
      risk: 'Landwirtschaft und Kleinindustrie geraten unter Importdruck. Der Ausgleich muss vorher stehen, nicht nachher.',
      tags: ['Handel']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
