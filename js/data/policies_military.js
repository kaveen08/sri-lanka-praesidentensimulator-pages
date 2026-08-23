/* ============================================================
   MASSNAHMEN  -  Streitkräfte, innere Sicherheit, Veteranen
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Truppenstärke ---------- */
    {
      id: 'mil_downsize_soft', cat: 'military', sub: 'Struktur',
      title: 'Truppenstärke schrittweise auf 150.000 senken',
      desc: 'Sri Lanka unterhält siebzehn Jahre nach Kriegsende rund 200.000 Soldaten, mehr als vor dem Krieg. Kein Zwangsabbau, sondern Einstellungsstopp, Altersabgang und freiwillige Übergangsprogramme über vier Jahre.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 18, lag: 8,
      fiscal: { exp: -75 },
      eff: { militaryCap: -6, militaryMor: -8, reconcile: 6, trustTamil: 8, veteran: -4 },
      grp: { military: -14, intl: 8, sinhalaUrban: 5, tamilNE: 9, business: 5, sinhalaRural: -5 },
      risk: 'Für viele ländliche Familien ist der Militärdienst die einzige verlässliche Beschäftigung. Ein Abbau ohne Anschlussperspektive erzeugt genau dort Unmut, wo Ihre Wählerbasis liegt.',
      tags: ['Militär', 'Haushalt'], excl: ['mil_downsize_hard', 'mil_expand']
    },
    {
      id: 'mil_downsize_hard', cat: 'military', sub: 'Struktur',
      title: 'Truppenstärke rasch auf 100.000 halbieren',
      desc: 'Ein Abbau im großen Stil innerhalb von drei Jahren, mit Abfindungen und Umschulung. Setzt jährlich rund 190 Mrd. LKR für andere Zwecke frei.',
      party: ['FSP', 'TNPF'], need: 'exec', pc: 40, lag: 6,
      fiscal: { exp: -190 }, oneoff: 90,
      eff: { militaryCap: -22, militaryMor: -26, reconcile: 12, trustTamil: 16, veteran: -12, internalSec: -5, unemp: 0.6 },
      grp: { military: -34, tamilNE: 18, diaspora: 14, intl: 10, sinhalaRural: -13, sangha: -12 },
      risk: 'Ein zu schneller Abbau setzt Zehntausende junge Männer ohne Perspektive frei und verstimmt eine Institution, die sich als Retter des Staates versteht.',
      tags: ['Militär', 'Hochrisiko'], excl: ['mil_downsize_soft', 'mil_expand']
    },
    {
      id: 'mil_expand', cat: 'military', sub: 'Struktur',
      title: 'Streitkräfte modernisieren und aufstocken',
      desc: 'Neue Ausrüstung, höhere Sold- und Zulagensätze, zusätzliche Einheiten für Küsten- und Grenzschutz. Begründet mit der strategischen Lage im Indischen Ozean.',
      party: ['SLPP'], need: 'simple', pc: 14, lag: 4,
      fiscal: { exp: 120 },
      eff: { militaryCap: 16, militaryMor: 18, maritimeSec: 8, reconcile: -8, trustTamil: -10 },
      grp: { military: 24, sinhalaRural: 7, sangha: 5, tamilNE: -13, intl: -8, youth: -5 },
      risk: 'Jede Rupie hier fehlt bei Schulen und Krankenhäusern, und der IWF wird nach der Gegenfinanzierung fragen.',
      tags: ['Militär'], excl: ['mil_downsize_soft', 'mil_downsize_hard']
    },
    {
      id: 'mil_north_reduce', cat: 'military', sub: 'Präsenz',
      title: 'Truppenpräsenz im Norden deutlich verringern',
      desc: 'In Mullaitivu und Kilinochchi kommt rechnerisch ein Soldat auf wenige Dutzend Einwohner. Verlegung von Verbänden aus dem Norden, Auflösung von Kontrollposten, Rückzug aus Wohngebieten.',
      party: ['ITAK', 'TNPF', 'SJB'], need: 'exec', pc: 24, lag: 4,
      fiscal: { exp: -22 },
      eff: { trustTamil: 20, reconcile: 13, militaryMor: -10, internalSec: -3, sinhalaPress: 16 },
      grp: { tamilNE: 24, diaspora: 16, intl: 8, military: -16, sinhalaRural: -9, sangha: -10 },
      risk: 'Sicherheitsbehörden warnen vor einem Wiederaufleben von Netzwerken. Belege dafür gibt es seit Jahren nicht.',
      tags: ['Militär', 'Versöhnung']
    },
    {
      id: 'mil_civil_admin', cat: 'military', sub: 'Präsenz',
      title: 'Militär aus der Zivilverwaltung zurückziehen',
      desc: 'Offiziere leiten im Norden und Osten weiterhin zivile Behörden, Schulen, Vorschulen und Entwicklungsprojekte. Diese Aufgaben gehen vollständig an gewählte und zivile Stellen zurück.',
      party: ['ITAK', 'SJB', 'NPP'], need: 'exec', pc: 14, lag: 3,
      fiscal: {},
      eff: { trustTamil: 15, reconcile: 10, stateCap: 3, legitimacy: 5, militaryMor: -6, sinhalaPress: 9 },
      grp: { tamilNE: 17, muslim: 6, diaspora: 8, military: -10, sinhalaRural: -4 },
      risk: 'Praktisch unstrittig sinnvoll, symbolisch heikel: das Militär versteht es als Misstrauensvotum.',
      tags: ['Militär', 'Versöhnung']
    },
    {
      id: 'mil_business_exit', fline: 'nontax', cat: 'military', sub: 'Struktur',
      title: 'Militärische Wirtschaftsbetriebe abwickeln',
      desc: 'Die Streitkräfte betreiben Hotels, Restaurants, Golfplätze, Reisebüros, Farmen und Baufirmen. Sie verzerren den Wettbewerb, entziehen dem Fiskus Einnahmen und binden Soldaten in fachfremden Aufgaben.',
      party: ['NPP', 'SJB', 'NDF', 'ITAK'], need: 'simple', pc: 20, lag: 5,
      fiscal: { rev: 18, exp: -12 },
      eff: { privateSector: 7, corruption: 5, militaryMor: -9, trustTamil: 6, soeHealth: 3 },
      grp: { business: 14, tamilNE: 8, sinhalaUrban: 6, military: -18 },
      risk: 'Die Erträge dieser Betriebe finanzieren informell Zulagen und Wohlfahrtsleistungen für die Truppe. Fällt das weg, muss der Haushalt einspringen.',
      tags: ['Militär', 'Wirtschaft']
    },

    /* ---------- Reform und Aufsicht ---------- */
    {
      id: 'mil_civilian_control', cat: 'military', sub: 'Aufsicht',
      title: 'Zivile Kontrolle über das Verteidigungsressort',
      desc: 'Das Verteidigungsministerium wird von einer zivilen Beamtenschaft geführt statt von pensionierten Offizieren. Ein Parlamentsausschuss für Verteidigung erhält Akteneinsicht und Haushaltskontrolle.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 16, lag: 4,
      fiscal: { exp: 4 },
      eff: { ruleOfLaw: 7, corruption: 5, stateCap: 4, militaryMor: -5, legitimacy: 4 },
      grp: { sinhalaUrban: 6, intl: 7, youth: 4, military: -12 },
      risk: 'Der Sicherheitsapparat hat in Sri Lanka schon Regierungen überdauert. Er wird sich nicht kampflos beaufsichtigen lassen.',
      tags: ['Militär', 'Institutionen']
    },
    {
      id: 'mil_procure_transparent', cat: 'military', sub: 'Aufsicht',
      title: 'Rüstungsbeschaffung offenlegen',
      desc: 'Alle Beschaffungen über 100 Mio. LKR werden ausgeschrieben und veröffentlicht, Zwischenhändler ausgeschlossen. Waffengeschäfte gehörten historisch zu den korruptionsanfälligsten Vorgängen des Staates.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 12, lag: 2,
      fiscal: { exp: -14 },
      eff: { corruption: 8, militaryCap: 2, ruleOfLaw: 4 },
      grp: { youth: 6, sinhalaUrban: 5, intl: 6, military: -6, business: 3 },
      risk: 'Es werden alte Fälle ans Licht kommen, die Menschen betreffen, die heute noch Einfluss haben.',
      tags: ['Militär', 'Antikorruption']
    },
    {
      id: 'mil_vetting', cat: 'military', sub: 'Aufsicht',
      title: 'Überprüfung von Offizieren mit Menschenrechtsvorwürfen',
      desc: 'Offiziere, gegen die glaubhafte Vorwürfe schwerer Menschenrechtsverletzungen vorliegen, werden von Beförderungen, Auslandsverwendungen und Kommandoposten ausgeschlossen, bis die Vorwürfe geklärt sind.',
      party: ['ITAK', 'TNPF', 'FSP'], need: 'exec', pc: 30, lag: 3,
      fiscal: { exp: 3 },
      eff: { ruleOfLaw: 9, reconcile: 11, trustTamil: 14, relWest: 8, militaryMor: -18, sinhalaPress: 18 },
      grp: { tamilNE: 16, diaspora: 16, intl: 12, military: -26, sinhalaRural: -10, sangha: -10 },
      risk: 'Betrifft auch Offiziere, die im Süden als Kriegshelden gelten. Die Reaktion in den Kasernen ist schwer vorhersehbar.',
      tags: ['Militär', 'Menschenrechte', 'Hochrisiko']
    },
    {
      id: 'mil_un_peacekeeping', fline: 'grants', cat: 'military', sub: 'Einsatz',
      title: 'Beteiligung an UN-Friedensmissionen ausbauen',
      desc: 'Mehr srilankische Kontingente in Blauhelmeinsätzen. Bringt Devisen, internationale Ausbildung und Ansehen, setzt aber eine saubere Überprüfung der Entsandten voraus.',
      party: ['NDF', 'SJB', 'NPP'], need: 'exec', pc: 6, lag: 4,
      fiscal: { rev: 14, exp: 6 },
      eff: { militaryMor: 7, relWest: 5, militaryCap: 4, reserves: 0.08 },
      grp: { military: 10, intl: 5, sinhalaRural: 3 },
      risk: 'Nach früheren Missbrauchsvorwürfen in Haiti steht Sri Lanka bei den Vereinten Nationen unter besonderer Beobachtung.',
      tags: ['Militär', 'Außenpolitik']
    },

    /* ---------- Maritime Sicherheit ---------- */
    {
      id: 'mil_coastguard', cat: 'military', sub: 'Maritim',
      title: 'Küstenwache ausbauen und aus der Marine ausgliedern',
      desc: 'Eine eigenständige zivile Küstenwache für Fischereischutz, Seenotrettung, Umweltschutz und Schmuggelbekämpfung. Entlastet die Marine und schafft klare Zuständigkeiten in der Palkstraße.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 9, lag: 5,
      fiscal: { exp: 26 }, oneoff: 30,
      eff: { maritimeSec: 16, internalSec: 5, relIndia: -3, agriProd: 2, foodSec: 3 },
      grp: { farmers: 10, tamilNE: 6, business: 4, military: -3 },
      risk: 'Härtere Kontrollen gegen indische Trawler in der Palkstraße belasten das Verhältnis zu Delhi und zu Tamil Nadu.',
      tags: ['Maritim', 'Fischerei']
    },
    {
      id: 'mil_trawler_deal', cat: 'military', sub: 'Maritim',
      title: 'Fischereiabkommen mit Indien aushandeln',
      desc: 'Verbindliche Regeln für die Palkstraße: Verbot der Grundschleppnetzfischerei, gemeinsame Überwachung, Entschädigungsfonds und ein Verfahren für festgesetzte Boote und Besatzungen.',
      party: ['SJB', 'NPP', 'ITAK'], need: 'exec', pc: 12, lag: 4,
      fiscal: { exp: 6 },
      eff: { relIndia: 9, maritimeSec: 7, agriProd: 3, trustTamil: 7, foodSec: 3 },
      grp: { farmers: 12, tamilNE: 11, intl: 4 },
      risk: 'Tamil Nadu wird jeden Kompromiss innenpolitisch bekämpfen. Delhi hat dort begrenzten Spielraum.',
      tags: ['Maritim', 'Außenpolitik']
    },
    {
      id: 'mil_eez_surveillance', cat: 'military', sub: 'Maritim',
      title: 'Seeraumüberwachung digitalisieren',
      desc: 'Radar, Satellitendaten und ein gemeinsames Lagebild für Marine, Küstenwache und Hafenbehörden. Sri Lanka liegt an einer der wichtigsten Schifffahrtsrouten der Welt und sieht davon bislang wenig.',
      party: ['NDF', 'NPP'], need: 'exec', pc: 6, lag: 4,
      fiscal: { exp: 12 }, oneoff: 22,
      eff: { maritimeSec: 12, digitalGov: 4, internalSec: 4, relWest: 4, relIndia: 4 },
      grp: { military: 8, business: 5, intl: 5 },
      risk: 'Wer die Technik liefert, sieht die Daten mit. Zwischen Indien, China und dem Westen ist das eine strategische Entscheidung.',
      tags: ['Maritim', 'Digital']
    },
    {
      id: 'mil_port_neutral', cat: 'military', sub: 'Strategie',
      title: 'Verbindliche Regeln für ausländische Militärbesuche',
      desc: 'Ein transparentes, für alle Staaten gleiches Verfahren für Hafenbesuche, Forschungsschiffe und Überflüge. Beendet die Praxis, jede einzelne Anfrage zum diplomatischen Kraftakt werden zu lassen.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 10, lag: 2,
      fiscal: {},
      eff: { relIndia: 5, relChina: 4, relWest: 5, maritimeSec: 4, legitimacy: 3 },
      grp: { intl: 7, business: 4, military: 3 },
      risk: 'Gleichbehandlung heißt, dass Sie niemanden mehr bevorzugen können, wenn es gerade nützlich wäre.',
      tags: ['Außenpolitik', 'Maritim']
    },

    /* ---------- Innere Sicherheit ---------- */
    {
      id: 'mil_police_reform', cat: 'military', sub: 'Polizei',
      title: 'Polizeireform mit unabhängiger Beschwerdestelle',
      desc: 'Neue Ausbildungsordnung, verpflichtende Dokumentation von Festnahmen, eine von der Polizei unabhängige Beschwerdestelle und Körperkameras bei Einsätzen. Todesfälle in Polizeigewahrsam sind ein wiederkehrendes Thema in Menschenrechtsberichten.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 15, lag: 5,
      fiscal: { exp: 24 }, oneoff: 18,
      eff: { internalSec: 9, ruleOfLaw: 11, legitimacy: 7, trustTamil: 7, trustMuslim: 7, corruption: 5 },
      grp: { youth: 9, sinhalaUrban: 7, tamilNE: 8, muslim: 7, intl: 6 },
      risk: 'Die Polizeigewerkschaften und ein Teil der Führung werden bremsen. Ohne bessere Bezahlung bleibt die Reform Papier.',
      tags: ['Polizei', 'Menschenrechte']
    },
    {
      id: 'mil_drugs_health', cat: 'military', sub: 'Innere Sicherheit',
      title: 'Drogenpolitik auf Gesundheitsansatz umstellen',
      desc: 'Konsum wird entkriminalisiert und als Gesundheitsproblem behandelt, mit Entzugsplätzen und Substitutionstherapie. Die Ressourcen der Strafverfolgung konzentrieren sich auf Handel und Geldwäsche. Die Massenrazzien der Operation Yukthiya füllten vor allem Gefängnisse.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 16, lag: 5,
      fiscal: { exp: 18 },
      eff: { internalSec: 8, health: 6, ruleOfLaw: 7, malnutrition: -2 },
      grp: { youth: 10, sinhalaUrban: 6, intl: 5, sinhalaRural: -6, sangha: -8, military: -4 },
      risk: 'Wird von Gegnern als Kapitulation vor dem Verbrechen dargestellt. Die Wirkung zeigt sich erst nach Jahren.',
      risks: ['court_backlog'],
      tags: ['Innere Sicherheit', 'Gesundheit']
    },
    {
      id: 'mil_prison_reform', cat: 'military', sub: 'Innere Sicherheit',
      title: 'Überfüllung der Gefängnisse abbauen',
      desc: 'Sri Lankas Gefängnisse sind mehr als doppelt belegt, ein großer Teil der Insassen wartet nur auf einen Prozesstermin. Kautionsreform, elektronische Fußfesseln, Schnellverfahren für geringe Delikte.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 10, lag: 4,
      fiscal: { exp: 9 },
      eff: { ruleOfLaw: 8, internalSec: 3, health: 3, legitimacy: 3 },
      grp: { youth: 5, intl: 5, muslim: 4, tamilNE: 4 },
      risk: 'Ein einziger Rückfall mit Schlagzeilen kann die Reform politisch beenden.',
      risks: ['court_backlog'],
      tags: ['Justiz', 'Innere Sicherheit']
    },
    {
      id: 'mil_cyber', cat: 'military', sub: 'Innere Sicherheit',
      title: 'Nationale Cyberabwehr aufbauen',
      desc: 'Ein eigenes Zentrum für die Sicherheit kritischer Infrastruktur: Stromnetz, Häfen, Zahlungsverkehr, Melderegister. Mit der Digitalisierung wächst die Angriffsfläche schneller als die Verteidigung.',
      party: ['NPP', 'NDF', 'SJB'], need: 'exec', pc: 6, lag: 4,
      fiscal: { exp: 11 }, oneoff: 14,
      eff: { internalSec: 6, digitalGov: 8, privateSector: 4, stateCap: 3 },
      grp: { business: 8, youth: 6, intl: 4 },
      risk: 'Ohne klare Grenzen kann dieselbe Behörde auch zur Überwachung im Inneren genutzt werden.',
      risks: ['police_politicised'],
      tags: ['Digital', 'Sicherheit']
    },

    /* ---------- Veteranen ---------- */
    {
      id: 'mil_veteran_transition', cat: 'military', sub: 'Veteranen',
      title: 'Übergangsprogramm für ausscheidende Soldaten',
      desc: 'Berufliche Umschulung, Anerkennung militärischer Qualifikationen im zivilen Arbeitsmarkt, Gründungsdarlehen und Vermittlung in Bau, Logistik und Sicherheitsgewerbe. Voraussetzung dafür, dass ein Truppenabbau überhaupt funktioniert.',
      party: ['NPP', 'SJB', 'SLPP'], need: 'exec', pc: 6, lag: 4,
      fiscal: { exp: 28 },
      eff: { veteran: 16, militaryMor: 9, unemp: -0.25, skillsMatch: 3 },
      grp: { military: 18, sinhalaRural: 8, youth: 3 },
      risk: 'Teuer, aber ohne dieses Programm wird jeder Truppenabbau politisch unmöglich.',
      tags: ['Veteranen', 'Arbeitsmarkt']
    },
    {
      id: 'mil_veteran_mental', cat: 'military', sub: 'Veteranen',
      title: 'Psychische Gesundheit für Veteranen und Betroffene',
      desc: 'Traumatherapie für Soldaten und Zivilisten aus den Kriegsgebieten, in Sinhala und Tamil, mit dezentralen Anlaufstellen. Sri Lanka hat eine der höchsten Suizidraten der Region.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'exec', pc: 4, lag: 4,
      fiscal: { exp: 12 },
      eff: { veteran: 11, health: 5, militaryMor: 6, reconcile: 5, trustTamil: 5 },
      grp: { military: 12, tamilNE: 8, sinhalaRural: 5, intl: 4 },
      risk: 'Der Bedarf ist deutlich größer als jedes realistische Angebot.',
      tags: ['Veteranen', 'Gesundheit']
    },
    {
      id: 'mil_war_widows', cat: 'military', sub: 'Veteranen',
      title: 'Programm für Kriegswitwen und alleinstehende Frauen',
      desc: 'Im Norden und Osten führen Zehntausende Haushalte Frauen allein. Einkommensprogramme, Landtitel, Kinderbetreuung und rechtliche Beratung, unabhängig davon, auf welcher Seite die Angehörigen standen.',
      party: ['ITAK', 'SJB', 'NPP'], need: 'exec', pc: 7, lag: 4,
      fiscal: { exp: 16 },
      eff: { poverty: -0.5, femaleLFP: 0.9, trustTamil: 10, veteran: 5, reconcile: 6, socialProt: 5 },
      grp: { tamilNE: 12, military: 6, malaiyaha: 4, intl: 5 },
      risk: 'Politisch kaum umstritten und trotzdem seit Jahren unterfinanziert.',
      tags: ['Veteranen', 'Soziales']
    },
    {
      id: 'mil_conscript_service', cat: 'military', sub: 'Struktur',
      title: 'Freiwilliger nationaler Dienst für junge Menschen',
      desc: 'Ein einjähriger ziviler oder militärischer Dienst mit Ausbildungsanteil, Bezahlung und anrechenbaren Qualifikationen. Zielt auf Jugendarbeitslosigkeit und gesellschaftlichen Zusammenhalt zugleich.',
      party: ['SLPP', 'NPP'], need: 'simple', pc: 12, lag: 5,
      fiscal: { exp: 46 },
      eff: { youthUnemp: -2.2, skillsMatch: 5, reconcile: 4, militaryCap: 3, internalSec: 3 },
      grp: { youth: 4, sinhalaRural: 8, military: 8, tamilNE: -5, unions: -4 },
      risk: 'Wenn der Dienst faktisch nur im Süden angenommen wird, verstärkt er die Trennung, die er überwinden soll.',
      tags: ['Jugend', 'Militär']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
