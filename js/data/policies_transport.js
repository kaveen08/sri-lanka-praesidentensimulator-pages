/* ============================================================
   MASSNAHMEN  -  Öffentlicher Verkehr und Mobilität
   fiscal.rev / fiscal.exp in LKR Mrd. pro Jahr
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Steuerung und Organisation ---------- */
    {
      id: 'tr_transport_authority', cat: 'transport', sub: 'Steuerung',
      title: 'Nationale Verkehrsbehörde einrichten',
      desc: 'Eine Stelle, die Bahn, staatliche und private Busse, Provinzverkehre und Kommunen gemeinsam plant: ein Netz statt neun Einzelinteressen. Zuständig für Linienkonzession, Fahrplan, Tarif und Investitionsprioritäten. Ohne diese Behörde bleibt jede einzelne Verkehrsmaßnahme ein Solitär.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 15, lag: 3,
      fiscal: { exp: 5 }, oneoff: 8,
      eff: { infra: 7, stateCap: 6, digitalGov: 3, regionalBalance: 4, emissions: 2 },
      grp: { sinhalaUrban: 5, youth: 5, business: 5, unions: -4, publicSector: -3 },
      risk: 'Die bestehenden Behörden geben Zuständigkeiten nicht freiwillig ab, und die Provinzen sehen darin eine Rezentralisierung.',
      tags: ['Verkehr', 'Verwaltung', 'Schlüsselmaßnahme']
    },
    {
      id: 'tr_integrated_ticket', cat: 'transport', sub: 'Steuerung',
      title: 'Ein Ticket für Bahn, Bus und Provinzverkehr',
      desc: 'Kontaktlose Karte und App für das gesamte Netz, Umsteigen ohne neuen Fahrschein, einheitlicher Entfernungstarif. Beendet außerdem das Bargeldsystem im Bus, das eine der verlässlichsten Einnahmequellen für Schwarzgeld im Verkehrsgewerbe ist.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 12, lag: 4,
      fiscal: { rev: 14, exp: 4 }, oneoff: 18,
      eff: { infra: 5, digitalGov: 8, corruption: 4, emissions: 3, stateCap: 3 },
      grp: { youth: 8, sinhalaUrban: 7, business: 4, unions: -5 },
      risk: 'Die Buskonduktoren sind gut organisiert, und ihr Einkommen hängt am Bargeld.',
      risks: ['no_transport_authority'],
      tags: ['Verkehr', 'Digitalisierung']
    },
    {
      id: 'tr_sltb_restructure', cat: 'transport', sub: 'Steuerung',
      title: 'Staatliche Busgesellschaft sanieren',
      desc: 'Die Sri Lanka Transport Board fährt strukturell defizitär, mit überaltertem Fuhrpark und Depots, die mehr Personal binden als Fahrzeuge bewegen. Umbau in eine Anstalt mit Verkehrsvertrag: die Behörde bestellt Leistung, die SLTB erbringt sie, beides wird gemessen.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 18, lag: 5,
      fiscal: { exp: -12 }, oneoff: 16,
      eff: { soeHealth: 8, infra: 4, stateCap: 4, privateSector: 3 },
      grp: { business: 5, intl: 4, sinhalaUrban: 3, unions: -11, publicSector: -7 },
      risk: 'Die Verkehrsgewerkschaften haben in Sri Lanka schon Regierungen in die Knie gezwungen. Ein landesweiter Busstreik legt das Land in Stunden lahm.',
      tags: ['Verkehr', 'Staatsbetriebe']
    },
    {
      id: 'tr_bus_regulation', cat: 'transport', sub: 'Steuerung',
      title: 'Privatbusse: Konzession statt Wettrennen',
      desc: 'Rund 20.000 private Busse konkurrieren auf denselben Linien um Fahrgäste, was zu Rasen, Überladung und Unfällen führt. Künftig gebündelte Linienkonzessionen mit festem Fahrplan, Fahrzeugstandard und Fahrerlohn statt Tageseinnahme.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 16, lag: 4,
      fiscal: { rev: 6, exp: 3 },
      eff: { infra: 6, internalSec: 5, health: 3, emissions: 2, ruleOfLaw: 3 },
      grp: { youth: 6, sinhalaUrban: 6, farmers: 4, unions: -7, business: -3 },
      risk: 'Die Busbesitzerverbände sind über alle Parteien hinweg vernetzt und finanzieren Wahlkämpfe.',
      risks: ['no_transport_authority'],
      tags: ['Verkehr', 'Sicherheit']
    },
    {
      id: 'tr_fare_subsidy', cat: 'transport', sub: 'Steuerung',
      title: 'Sozialtarif für Schüler, Studierende und Geringverdiener',
      desc: 'Ermäßigte Zeitkarten, finanziert aus dem allgemeinen Haushalt statt aus der Quersubventionierung durch andere Fahrgäste. Für viele Haushalte im Land ist der Fahrpreis der Grund, warum Kinder die weiterführende Schule nicht besuchen.',
      party: ['NPP', 'FSP', 'SJB', 'CWC'], need: 'simple', pc: 9, lag: 2,
      fiscal: { exp: 16 },
      eff: { education: 5, poverty: -1.4, socialProt: 6, skillsMatch: 3, femaleLFP: 3, emissions: 2 },
      grp: { youth: 10, unions: 6, malaiyaha: 6, farmers: 5, sinhalaRural: 5, business: -2 },
      risk: 'Ein Sozialtarif ist leicht eingeführt und politisch fast unmöglich wieder abzuschaffen.',
      tags: ['Verkehr', 'Soziales']
    },

    /* ---------- Schiene ---------- */
    {
      id: 'tr_track_renewal', cat: 'transport', sub: 'Schiene',
      title: 'Oberbau und Signaltechnik erneuern',
      desc: 'Gleiserneuerung, Beseitigung der Langsamfahrstellen und moderne Signaltechnik auf den Hauptstrecken. Große Teile des rund 1.500 km langen Netzes stammen aus der Kolonialzeit. Ohne diesen Schritt bringt jede neue Verbindung kaum Fahrzeitgewinn.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 14, lag: 6,
      fiscal: { exp: 12 }, oneoff: 78,
      eff: { infra: 12, emissions: 4, regionalBalance: 6, privateSector: 4, internalSec: 3 },
      grp: { business: 6, youth: 5, sinhalaUrban: 5, farmers: 4, tamilNE: 3 },
      risk: 'Sechs Quartale Bauarbeiten heißt sechs Quartale Schienenersatzverkehr. Die Fahrgäste werden das früher spüren als die Verbesserung.',
      tags: ['Verkehr', 'Schiene', 'Schlüsselmaßnahme']
    },
    {
      id: 'tr_colombo_suburban', cat: 'transport', sub: 'Schiene',
      title: 'Vorortbahn im Großraum Colombo elektrifizieren',
      desc: 'Elektrifizierung und Taktverdichtung auf den Strecken nach Negombo, Panadura, Avissawella und Ragama. Der Großraum Colombo erzeugt rund 40 % der Wirtschaftsleistung und verliert nach vorliegenden Schätzungen einen erheblichen Teil davon im Stau.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 17, lag: 7,
      fiscal: { exp: 9 }, oneoff: 120,
      eff: { infra: 11, emissions: 7, renewables: 2, privateSector: 6, energyRel: -2, growth: 0 },
      grp: { sinhalaUrban: 12, business: 8, youth: 7, intl: 4, sinhalaRural: -3 },
      risk: 'Sehr kapitalintensiv und erst nach Ihrer Amtszeit fertig. Der Nutzen fällt Ihrem Nachfolger zu, die Baustelle Ihnen.',
      risks: ['rail_decay'],
      tags: ['Verkehr', 'Schiene', 'Colombo']
    },
    {
      id: 'tr_lrt_revival', cat: 'transport', sub: 'Schiene',
      title: 'Stadtbahn Colombo wiederaufnehmen',
      desc: 'Das japanisch finanzierte Stadtbahnvorhaben wurde 2020 einseitig abgesagt, was das Verhältnis zu Tokio erheblich belastet hat. Eine Wiederaufnahme wäre zugleich Verkehrspolitik und außenpolitische Wiedergutmachung.',
      party: ['SJB', 'NDF', 'NPP'], need: 'simple', pc: 20, lag: 8,
      fiscal: { exp: 7 }, oneoff: 145,
      eff: { infra: 10, emissions: 6, relJapan: 16, fdi: 0.3, privateSector: 4 },
      grp: { sinhalaUrban: 11, business: 7, intl: 6, youth: 5, sinhalaRural: -4, sangha: -2 },
      risk: 'Die Absage von 2020 wurde im Süden als Befreiung von einer Schuldenfalle verkauft. Die Rücknahme dieser Entscheidung wird als Kniefall dargestellt werden.',
      tags: ['Verkehr', 'Schiene', 'Außenpolitik']
    },
    {
      id: 'tr_north_rail', cat: 'transport', sub: 'Schiene',
      title: 'Nordstrecke und Anbindung Jaffna ausbauen',
      desc: 'Zweigleisiger Ausbau und Beschleunigung bis Jaffna, Wiederaufbau der Nebenstrecke nach Kankesanthurai und ein Güterterminal in Vavuniya. Die Nordprovinz erwirtschaftet 4 % des BIP und braucht vor allem eine belastbare Verbindung zum Rest des Landes.',
      party: ['ITAK', 'NPP', 'SJB', 'TNPF'], need: 'simple', pc: 13, lag: 6,
      fiscal: { exp: 6 }, oneoff: 52,
      eff: { infra: 7, regionalBalance: 9, trustTamil: 8, reconcile: 5, relIndia: 5, privateSector: 3 },
      grp: { tamilNE: 12, diaspora: 8, business: 4, intl: 4, sinhalaRural: -2 },
      risk: 'Wird im Süden als Vorzugsbehandlung des Nordens gelesen werden.',
      risks: ['rail_decay'],
      tags: ['Verkehr', 'Schiene', 'Regionalentwicklung']
    },
    {
      id: 'tr_rail_freight', cat: 'transport', sub: 'Schiene',
      title: 'Güterverkehr von der Straße auf die Schiene',
      desc: 'Containerterminals in Colombo, Kandy, Vavuniya und Trincomalee, feste Trassen für Güterzüge und ein Anschluss an den Hafen Colombo. Entlastet die Fernstraßen, senkt Transportkosten und verlängert die Lebensdauer des Straßennetzes.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 12, lag: 6,
      fiscal: { rev: 9, exp: 5 }, oneoff: 44,
      eff: { infra: 8, exports: 4, emissions: 5, privateSector: 6, agriProd: 3, regionalBalance: 4 },
      grp: { business: 9, farmers: 5, intl: 3, unions: -3 },
      risk: 'Das Straßentransportgewerbe wird sich wehren, und es hat kurze Wege in die Politik.',
      risks: ['rail_decay'],
      tags: ['Verkehr', 'Schiene', 'Wirtschaft']
    },

    /* ---------- Regional und ländlich ---------- */
    {
      id: 'tr_provincial_networks', cat: 'transport', sub: 'Regional',
      title: 'Provinzbusnetze mit garantiertem Grundangebot',
      desc: 'Jede Provinz erhält Mittel und Zuständigkeit für ein Grundnetz: mindestens ein Stundentakt zu jeder Distrikthauptstadt, auch auf Strecken, die sich für private Betreiber nicht rechnen. Wer keinen Bus hat, hat auch keinen Zugang zu Facharzt, Behörde und weiterführender Schule.',
      party: ['NPP', 'SJB', 'ITAK', 'CWC'], need: 'simple', pc: 13, lag: 4,
      fiscal: { exp: 22 },
      eff: { regionalBalance: 11, infra: 6, health: 4, education: 4, poverty: -1.2, femaleLFP: 4 },
      grp: { farmers: 9, sinhalaRural: 8, malaiyaha: 8, tamilNE: 6, youth: 5, business: -2 },
      risk: 'Ein Grundangebot in dünn besiedelten Gebieten ist dauerhaft defizitär. Das ist der Preis, nicht der Fehler.',
      risks: ['no_local_capacity'],
      tags: ['Verkehr', 'Regionalentwicklung']
    },
    {
      id: 'tr_rural_roads', cat: 'transport', sub: 'Regional',
      title: 'Ländliche Zubringerstraßen instand setzen',
      desc: 'Programm für die letzten Kilometer: Zufahrten zu Dörfern, Plantagensiedlungen und Sammelstellen, ganzjährig befahrbar. Ein erheblicher Teil der Ernteverluste in Sri Lanka entsteht, weil die Ware nicht rechtzeitig aus dem Dorf kommt.',
      party: ['NPP', 'SJB', 'SLPP', 'CWC'], need: 'simple', pc: 10, lag: 4,
      fiscal: { exp: 18 }, oneoff: 20,
      eff: { infra: 8, regionalBalance: 8, agriProd: 7, poverty: -1.1, foodSec: 4, trustHill: 5 },
      grp: { farmers: 11, sinhalaRural: 8, malaiyaha: 9, tamilNE: 4 },
      risk: 'Zubringerstraßen sind das klassische Feld für Vergabe nach Parteibuch.',
      risks: ['no_local_capacity'],
      tags: ['Verkehr', 'Landwirtschaft', 'Regionalentwicklung']
    },
    {
      id: 'tr_school_transport', cat: 'transport', sub: 'Regional',
      title: 'Schulverkehr im ganzen Land sicherstellen',
      desc: 'Feste Schulbuslinien dort, wo der Linienverkehr nicht passt, mit besonderem Blick auf die Plantagenregionen und den Norden. Der Schulweg ist einer der Gründe, warum Mädchen aus abgelegenen Gebieten die Oberstufe nicht erreichen.',
      party: ['NPP', 'CWC', 'SJB', 'ITAK'], need: 'simple', pc: 8, lag: 3,
      fiscal: { exp: 11 },
      eff: { education: 7, skillsMatch: 3, femaleLFP: 5, trustHill: 6, regionalBalance: 4, casteEquity: 4 },
      grp: { malaiyaha: 11, farmers: 7, tamilNE: 6, sinhalaRural: 6, youth: 5 },
      risk: 'Vergleichsweise günstig und sehr wirksam. Der Widerstand kommt eher aus dem Finanzministerium als aus der Politik.',
      tags: ['Verkehr', 'Bildung']
    },
    {
      id: 'tr_kandy_terminal', cat: 'transport', sub: 'Regional',
      title: 'Umsteigeknoten Kandy und Sekundärstädte',
      desc: 'Ein multimodaler Busbahnhof in Kandy mit direktem Bahnanschluss, dazu Knoten in Kurunegala, Batticaloa, Anuradhapura und Ratnapura. Zweitstädte werden dadurch als Arbeitsmarkt erreichbar, was den Zuzug nach Colombo dämpft.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 11, lag: 5,
      fiscal: { exp: 4 }, oneoff: 38,
      eff: { infra: 7, regionalBalance: 8, privateSector: 4, housing: 3, emissions: 2 },
      grp: { business: 5, sinhalaRural: 5, malaiyaha: 4, tamilNE: 4, youth: 4 },
      risk: 'Kandys Altstadt steht unter Denkmalschutz, jeder Eingriff dauert länger als geplant.',
      tags: ['Verkehr', 'Regionalentwicklung']
    },

    /* ---------- Stadt und Umwelt ---------- */
    {
      id: 'tr_brt_colombo', cat: 'transport', sub: 'Stadtverkehr',
      title: 'Schnellbusspuren in Colombo',
      desc: 'Eigene, baulich getrennte Busspuren auf den Hauptachsen nach Kandy, Negombo und Galle, mit Vorrang an Ampeln und erhöhten Haltestellen. Deutlich billiger und schneller umzusetzen als eine Stadtbahn, mit einem Großteil der Wirkung.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 12, lag: 4,
      fiscal: { exp: 5 }, oneoff: 34,
      eff: { infra: 8, emissions: 5, privateSector: 4, health: 3 },
      grp: { sinhalaUrban: 9, youth: 7, business: 5, unions: -2 },
      risk: 'Eine Fahrspur wegzunehmen bringt die Autofahrer gegen Sie auf, und das sind genau die Leute, die Zeitungen und Talkshows machen.',
      risks: ['no_transport_authority'],
      tags: ['Verkehr', 'Colombo', 'Klima']
    },
    {
      id: 'tr_threewheeler', cat: 'transport', sub: 'Stadtverkehr',
      title: 'Dreiräder regulieren und in das Netz einbinden',
      desc: 'Taxameterpflicht, Registrierung, Versicherung und Anbindung an die Fahrplanauskunft als Zubringer zur nächsten Haltestelle. Über eine Million Menschen leben von diesem Gewerbe, das bislang nahezu unreguliert ist.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 10, lag: 3,
      fiscal: { rev: 8, exp: 2 },
      eff: { infra: 4, taxCompl: 5, internalSec: 4, corruption: 2, unemp: 0 },
      grp: { youth: 4, sinhalaUrban: 5, business: 3, unions: -5, sinhalaRural: -3 },
      risk: 'Die Dreiradfahrer sind eine große, mobile und schnell mobilisierbare Gruppe. Sie können Colombo an einem Vormittag blockieren.',
      tags: ['Verkehr', 'Regulierung']
    },
    {
      id: 'tr_active_mobility', cat: 'transport', sub: 'Stadtverkehr',
      title: 'Gehwege und Radwege in den Städten',
      desc: 'Durchgehende, schattige Gehwege und geschützte Radspuren in Colombo, Kandy, Galle und Jaffna. In einem Land, in dem viele Wege unter drei Kilometer lang sind, ist das die günstigste Verkehrsinvestition überhaupt.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 6, lag: 3,
      fiscal: { exp: 3 }, oneoff: 12,
      eff: { infra: 4, emissions: 3, health: 5, internalSec: 3, femaleLFP: 3 },
      grp: { youth: 6, sinhalaUrban: 6, intl: 3 },
      risk: 'Gehwege werden in Sri Lanka traditionell zugeparkt und mit Ständen belegt. Ohne Durchsetzung bleibt es bei der Markierung.',
      tags: ['Verkehr', 'Klima', 'Gesundheit']
    },
    {
      id: 'tr_ev_buses', cat: 'transport', sub: 'Stadtverkehr',
      title: 'Elektrobusse für die Ballungsräume',
      desc: 'Schrittweise Umstellung der Stadtbusflotte auf Elektroantrieb, mit Ladeinfrastruktur in den Depots. Senkt die Dieselrechnung, die in Devisen bezahlt wird, und die Luftbelastung in den Innenstädten.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 11, lag: 5,
      fiscal: { exp: 6 }, oneoff: 46,
      eff: { emissions: 8, renewables: 3, health: 4, infra: 4, reserves: 0, energyRel: -3 },
      grp: { youth: 6, sinhalaUrban: 7, intl: 5, business: 3, unions: -3 },
      risk: 'Ohne gleichzeitigen Ausbau der Stromerzeugung verlagern Sie das Problem nur vom Auspuff ans Kraftwerk.',
      tags: ['Verkehr', 'Klima']
    }

  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
