/* ============================================================
   MASSNAHMEN  -  Klima, Anpassung, Katastrophenschutz, Umwelt
   Bezugspunkt: Zyklon Ditwah, November 2025, rund 4,1 Mrd. USD
   Schaden, etwa 4 % des BIP, fast zwei Millionen Betroffene.
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Anpassung ---------- */
    {
      id: 'cl_adaptation_plan', cat: 'climate', sub: 'Anpassung',
      title: 'Nationales Anpassungsprogramm mit verbindlichem Budget',
      desc: 'Ohne Anpassungsmaßnahmen könnten klimabedingte Verluste laut Weltbank bis 2050 rund 3,5 Prozent des BIP jährlich erreichen. Ein Programm mit festem Anteil am Haushalt, Zuständigkeiten je Ebene und überprüfbaren Zielen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 10, lag: 6,
      fiscal: { exp: 75 },
      eff: { climateRes: 20, disasterPrep: 10, infra: 5, agriProd: 4, growth: 0.1 },
      grp: { farmers: 12, intl: 12, youth: 9, sinhalaRural: 8, tamilNE: 5 },
      risk: 'Anpassung zahlt sich erst aus, wenn der nächste Sturm kommt. Bis dahin sieht es nach Ausgaben ohne Ergebnis aus.',
      tags: ['Klima', 'Katastrophen']
    },
    {
      id: 'cl_flood_defence', cat: 'climate', sub: 'Anpassung',
      title: 'Hochwasserschutz für Kelani, Kalu und Mahaweli',
      desc: 'Rückhaltebecken, Deiche, Renaturierung von Überschwemmungsflächen und Entsiegelung in den Einzugsgebieten der großen Flüsse. Colombo und Ratnapura stehen bei jedem starken Monsun unter Wasser.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 7, lag: 8,
      fiscal: { exp: 60 }, oneoff: 65,
      eff: { climateRes: 16, disasterPrep: 7, infra: 6, housing: 4, agriProd: 3 },
      grp: { sinhalaUrban: 11, farmers: 9, business: 8, sinhalaRural: 7 },
      risk: 'Renaturierung bedeutet, Bauland aufzugeben. Grundeigentümer und Bauwirtschaft werden klagen.',
      tags: ['Klima', 'Infrastruktur']
    },
    {
      id: 'cl_landslide', cat: 'climate', sub: 'Anpassung',
      title: 'Erdrutschvorsorge im Hochland',
      desc: 'Gefahrenkartierung, Bauverbote in Risikozonen, Hangsicherung, Umsiedlungsangebote und Frühwarnsensoren in Ratnapura, Kegalle, Badulla und Nuwara Eliya.',
      party: ['NPP', 'SJB', 'CWC'], need: 'exec', pc: 6, lag: 6,
      fiscal: { exp: 26 }, oneoff: 24,
      eff: { climateRes: 11, disasterPrep: 9, housing: 5, trustHill: 6 },
      grp: { malaiyaha: 12, farmers: 8, sinhalaRural: 7 },
      risk: 'Umsiedlung aus Risikozonen trifft meist genau die Familien, die kein Ausweichgrundstück haben.',
      tags: ['Klima', 'Wohnen']
    },
    {
      id: 'cl_early_warning', cat: 'climate', sub: 'Katastrophenschutz',
      title: 'Frühwarnsystem bis auf Dorfebene ausbauen',
      desc: 'Wetterradar, automatische Pegelmessung, Warnungen per Mobilfunk in drei Sprachen, geschulte Freiwillige in jeder Kommune. Bei Ditwah kam die Warnung vielerorts zu spät oder nicht in der richtigen Sprache an.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'exec', pc: 5, lag: 4,
      fiscal: { exp: 18 }, oneoff: 22,
      eff: { disasterPrep: 20, climateRes: 8, langAccess: 4, legitimacy: 5, health: 3 },
      grp: { farmers: 13, sinhalaRural: 11, tamilNE: 8, malaiyaha: 8, intl: 7 },
      risk: 'Sehr hohe Wirkung je eingesetzter Rupie. Der schwierige Teil ist die Wartung über Jahre hinweg.',
      tags: ['Katastrophen', 'Digital']
    },
    {
      id: 'cl_local_response', cat: 'climate', sub: 'Katastrophenschutz',
      title: 'Kommunale Katastrophenhilfe aufbauen',
      desc: 'Ausrüstung, Boote, Notunterkünfte und ausgebildete Einsatzkräfte in jeder Kommune. Die ersten 48 Stunden entscheiden über Todesfälle, und in diesen Stunden ist Colombo nicht vor Ort.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 5, lag: 5,
      fiscal: { exp: 24 },
      eff: { disasterPrep: 16, climateRes: 6, legitimacy: 7, stateCap: 4, internalSec: 3 },
      grp: { sinhalaRural: 10, farmers: 9, tamilNE: 7, malaiyaha: 6, youth: 4 },
      risk: 'Ohne regelmäßige Übungen verstaubt die Ausrüstung in Lagerhallen.',
      tags: ['Katastrophen', 'Kommunal']
    },
    {
      id: 'cl_disaster_insurance', cat: 'climate', sub: 'Finanzierung',
      title: 'Katastrophenversicherung und Reservefonds',
      desc: 'Ein staatlicher Reservefonds, kombiniert mit Rückversicherung und Katastrophenanleihen, damit nicht jeder Sturm einen Nachtragshaushalt und neue Schulden erzwingt.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 9, lag: 5,
      fiscal: { exp: 34 },
      eff: { climateRes: 9, disasterPrep: 6, debtStabiliserX: 0, imfCompl: 5, socialProt: 4 },
      grp: { intl: 12, business: 7, farmers: 7, sinhalaRural: 5 },
      risk: 'Prämien fallen jedes Jahr an, der Nutzen zeigt sich nur im Katastrophenjahr. Genau deshalb wird ein solcher Fonds oft wieder geplündert.',
      tags: ['Klima', 'Finanzen']
    },
    {
      id: 'cl_climate_finance', cat: 'climate', sub: 'Finanzierung',
      title: 'Internationale Klimafinanzierung erschließen',
      desc: 'Aufbau einer Fachstelle, die Anträge für Green Climate Fund, Loss-and-Damage-Fonds und Anpassungsprogramme professionell stellt. Sri Lanka lässt hier seit Jahren Mittel liegen, weil die Antragskapazität fehlt.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 4, lag: 5,
      fiscal: { rev: 45, exp: 6 },
      eff: { climateRes: 7, relWest: 6, relJapan: 5, stateCap: 4, imfCompl: 3 },
      grp: { intl: 12, youth: 6, business: 5 },
      risk: 'Geringes Risiko, hoher Ertrag. Der Engpass ist qualifiziertes Personal, nicht Geld.',
      tags: ['Klima', 'Außenpolitik']
    },
    {
      id: 'cl_debt_for_nature', cat: 'climate', sub: 'Finanzierung',
      title: 'Schuldenumwandlung für Naturschutz',
      desc: 'Ein Teil der Auslandsschulden wird gegen verbindliche Zusagen für Meeresschutz, Wiederaufforstung und Mangrovenschutz umgewandelt. Modelle aus Belize und den Seychellen dienen als Vorbild.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 12, lag: 6,
      fiscal: { exp: 10 },
      eff: { forest: 1.6, climateRes: 8, relWest: 7, emissions: -0.8, debtGdpOneOff: -1.8, maritimeSec: 3 },
      grp: { intl: 12, youth: 8, farmers: 4, business: 3 },
      risk: 'Die Volumina sind meist kleiner als die politische Aufmerksamkeit, die sie erzeugen.',
      tags: ['Klima', 'Schulden']
    },

    /* ---------- Minderung ---------- */
    {
      id: 'cl_ev_transition', cat: 'climate', sub: 'Verkehr',
      title: 'Umstellung auf Elektromobilität fördern',
      desc: 'Niedrigere Einfuhrabgaben für Elektrofahrzeuge, Ladeinfrastruktur an Hauptstrecken, Umstellung von Bussen und Behördenfahrzeugen. Treibstoffimporte sind eine der größten Belastungen der Zahlungsbilanz.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 8, lag: 6,
      fiscal: { rev: -35, exp: 20 },
      eff: { emissions: -2.2, reserves: 0.35, renewables: 3, energyRel: -2, infra: 3 },
      grp: { sinhalaUrban: 9, business: 7, youth: 7, intl: 6, farmers: -3 },
      risk: 'Höherer Strombedarf trifft ein Netz, das schon heute knapp ist. Und die Zollmindereinnahmen sind sofort spürbar.',
      tags: ['Klima', 'Verkehr']
    },
    {
      id: 'cl_public_transport', cat: 'climate', sub: 'Verkehr',
      title: 'Bahn und Busverkehr grundlegend erneuern',
      desc: 'Elektrifizierung der Küstenstrecke, neue Triebwagen, Taktverkehr, Busspuren in Colombo und ein einheitliches Ticketsystem. Der Verkehrsstau in der Westprovinz kostet jährlich Milliarden an verlorener Arbeitszeit.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 11, lag: 8,
      fiscal: { exp: 95 }, oneoff: 90,
      eff: { emissions: -1.6, infra: 12, growth: 0.2, femaleLFP: 1.4, energyRel: -1, regionalBalance: 4 },
      grp: { sinhalaUrban: 14, unions: 8, youth: 9, business: 8, publicSector: 4 },
      risk: 'Sehr teuer und mit Bauzeiten, die über Ihre Amtszeit hinausgehen. Der Nutzen ist aber breit gestreut.',
      tags: ['Verkehr', 'Infrastruktur']
    },
    {
      id: 'cl_reforest', cat: 'climate', sub: 'Ökosysteme',
      title: 'Wiederaufforstung und Schutz der Wasserscheiden',
      desc: 'Aufforstung im Hochland zur Sicherung der Wasserversorgung, Wiederherstellung von Mangroven an der Küste als natürlicher Sturmschutz und strengere Durchsetzung gegen illegale Rodung.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 6, lag: 8,
      fiscal: { exp: 22 },
      eff: { forest: 2.4, climateRes: 9, emissions: -1.2, agriProd: 3, tourism: 0.1 },
      grp: { intl: 9, youth: 8, farmers: 5, sinhalaRural: 4, business: -3 },
      risk: 'Aufforstungsprogramme scheitern regelmäßig daran, dass niemand die Setzlinge nach dem ersten Jahr pflegt.',
      tags: ['Klima', 'Umwelt']
    },
    {
      id: 'cl_marine_protect', cat: 'climate', sub: 'Ökosysteme',
      title: 'Meeresschutzgebiete und Korallenschutz',
      desc: 'Ausweisung geschützter Zonen, Verbot zerstörerischer Fangmethoden, Wiederherstellung von Korallenriffen und Seegraswiesen, die zugleich Küstenschutz und Fischbestände sichern.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 7, lag: 8,
      fiscal: { exp: 14 },
      eff: { climateRes: 7, forest: 0.3, tourism: 0.2, maritimeSec: 4, agriProd: 3 },
      grp: { intl: 8, youth: 6, farmers: -5, business: 3 },
      risk: 'Fangverbote treffen Fischerfamilien sofort, der Bestandsaufbau dauert Jahre.',
      tags: ['Umwelt', 'Fischerei']
    },
    {
      id: 'cl_waste', cat: 'climate', sub: 'Kreislauf',
      title: 'Abfallwirtschaft und Kunststoffvermeidung',
      desc: 'Getrenntsammlung, Kompostierung, Deponiesanierung, Pfandsystem für Getränkeverpackungen und Verbot besonders schädlicher Einwegkunststoffe. Der Einsturz der Deponie Meethotamulla 2017 tötete Dutzende Menschen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 8, lag: 6,
      fiscal: { rev: 8, exp: 26 },
      eff: { housing: 7, health: 5, emissions: -0.6, climateRes: 3, tourism: 0.1 },
      grp: { sinhalaUrban: 10, youth: 8, business: -5, intl: 5 },
      risk: 'Kommunen fehlen Personal und Fahrzeuge. Ohne Investitionen bleibt es bei Vorschriften.',
      tags: ['Umwelt', 'Kommunal']
    },
    {
      id: 'cl_carbon_price', cat: 'climate', sub: 'Instrumente',
      title: 'CO2-Abgabe auf fossile Brennstoffe',
      desc: 'Eine Abgabe auf Kohle, Diesel und Schweröl in der Stromerzeugung und Industrie, deren Aufkommen zweckgebunden in Anpassung und Sozialausgleich fließt.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 15, lag: 3,
      fiscal: { rev: 60 },
      eff: { emissions: -1.8, renewables: 4, inflation: 0.7, energyRel: -2, climateRes: 4, poverty: 0.3 },
      grp: { intl: 10, youth: 6, business: -10, unions: -8, sinhalaRural: -6, farmers: -5 },
      risk: 'Jede Energiepreiserhöhung ist in Sri Lanka politisch hochexplosiv, auch wenn das Geld zurückfließt.',
      tags: ['Klima', 'Steuern']
    },
    {
      id: 'cl_green_building', cat: 'climate', sub: 'Instrumente',
      title: 'Klimafeste Bauvorschriften und Wiederaufbaustandards',
      desc: 'Verbindliche Standards für Neubauten und für den Wiederaufbau nach Ditwah: erhöhte Fundamente in Flutzonen, sturmfeste Dächer, Regenwasserrückhalt. Wiederaufbau ohne bessere Standards erzeugt die nächste Katastrophe.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 7, lag: 4,
      fiscal: { exp: 12 },
      eff: { climateRes: 13, housing: 5, disasterPrep: 5, infra: 4 },
      grp: { intl: 8, sinhalaUrban: 6, farmers: 5, business: -6 },
      risk: 'Höhere Baukosten in einem Moment, in dem Zehntausende Familien möglichst schnell ein Dach brauchen.',
      tags: ['Klima', 'Wohnen']
    },
    {
      id: 'cl_water_security', cat: 'climate', sub: 'Wasser',
      title: 'Bewässerungssysteme und alte Tanks instand setzen',
      desc: 'Sanierung der historischen Tankkaskaden in der Trockenzone, Modernisierung der Kanäle, Entschlammung und gemeinschaftliche Bewirtschaftung. Ein tausend Jahre altes System, das bei Dürren weiterhin trägt.',
      party: ['NPP', 'SJB', 'SLPP'], need: 'exec', pc: 5, lag: 6,
      fiscal: { exp: 40 },
      eff: { agriProd: 11, climateRes: 12, foodSec: 8, housing: 3, regionalBalance: 4 },
      grp: { farmers: 18, sinhalaRural: 13, tamilNE: 6, intl: 5 },
      risk: 'Politisch nahezu unangreifbar und wirtschaftlich sinnvoll. Der Engpass ist die Bauausführung.',
      tags: ['Klima', 'Landwirtschaft']
    },
    {
      id: 'cl_climate_ministry', cat: 'climate', sub: 'Struktur',
      title: 'Klimapolitik ressortübergreifend verankern',
      desc: 'Eine Stabsstelle beim Präsidenten mit Prüfrecht für alle größeren Investitionsvorhaben, verbindliche Klimafolgenabschätzung und ein Klimabudget, das den gesamten Haushalt durchleuchtet.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 6, lag: 4,
      fiscal: { exp: 7 },
      eff: { climateRes: 8, stateCap: 4, disasterPrep: 4, emissions: -0.4, imfCompl: 3 },
      grp: { intl: 8, youth: 6, business: -3 },
      risk: 'Eine weitere Prüfinstanz kann Vorhaben verlangsamen, wenn sie nicht gut ausgestattet ist.',
      tags: ['Klima', 'Verwaltung']
    },
    {
      id: 'cl_ditwah_rebuild', cat: 'climate', sub: 'Wiederaufbau',
      title: 'Wiederaufbau nach Ditwah beschleunigen',
      desc: 'Die zugesagten bis zu 5 Mio. LKR je zerstörtem Haus, Mietzuschüsse und Soforthilfen werden über ein einheitliches digitales Verfahren ausgezahlt, mit veröffentlichten Fortschrittszahlen je Distrikt.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'exec', pc: 8, lag: 2,
      fiscal: { exp: 150 },
      eff: { housing: 16, climateRes: 5, legitimacy: 9, infra: 6, poverty: -1.0, agriProd: 3 },
      grp: { farmers: 16, sinhalaRural: 14, tamilNE: 9, malaiyaha: 8, intl: 6 },
      risk: 'Zwei Millionen Betroffene erwarten sichtbare Ergebnisse. Verzögerungen schlagen unmittelbar auf Ihre Zustimmung durch.',
      tags: ['Katastrophen', 'Wiederaufbau']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
