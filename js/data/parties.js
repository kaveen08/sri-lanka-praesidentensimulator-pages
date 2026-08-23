/* ============================================================
   PARTEIEN  -  Stand der 10. Legislaturperiode (gewählt Nov. 2024)
   Sitze: NPP 159 von 225. Die Positionen fassen die öffentlich
   vertretenen Programme der Parteien zusammen.
   ============================================================ */
(function (P) {
  'use strict';

  P.PARTIES = [
    {
      k: 'NPP', name: 'NPP', full: 'National People’s Power / Jathika Jana Balawegaya',
      lead: 'Anura Kumara Dissanayake', seats: 159, color: '#f43f5e', gov: true,
      ideology: 'Linkspopulistisch, JVP-geführt, antikorruptiv',
      base: ['youth', 'sinhalaRural', 'sinhalaUrban', 'unions'],
      stance: { austerity: -1, devolution: 0, market: -1, nationalism: 0, climate: 1, military: 0 },
      desc: 'Kam 2024 mit einem beispiellosen Antikorruptionsmandat und einer Zweidrittelmehrheit ins Amt. Muss seither die Quadratur des Kreises schaffen: Bruch mit dem alten System, aber Einhaltung des IWF-Programms.',
      proposals: [
        'Neue Verfassung mit Abschaffung der Exekutivpräsidentschaft',
        'Konsequente Verfolgung von Korruption und Rückführung von Vermögen',
        'Staatsbetriebe reformieren statt privatisieren',
        'Digitalisierung von Steuerverwaltung und Behördengängen',
        'Kostenlose Bildung und Gesundheit als unantastbare Grundsätze',
        'Ersetzung des Antiterrorgesetzes PTA'
      ]
    },
    {
      k: 'SJB', name: 'SJB', full: 'Samagi Jana Balawegaya', lead: 'Sajith Premadasa',
      seats: 40, color: '#22d3ee', gov: false,
      ideology: 'Sozialdemokratisch, soziale Marktwirtschaft',
      base: ['sinhalaUrban', 'malaiyaha', 'muslim', 'christian'],
      stance: { austerity: 0, devolution: 1, market: 1, nationalism: -1, climate: 1, military: 0 },
      desc: 'Größte Oppositionspartei. Fordert Nachverhandlungen mit dem IWF zu Gunsten der Beschäftigten, gleichzeitig eine exportorientierte Industriepolitik und eine digitale Wirtschaft von 30 Mrd. USD bis 2030.',
      proposals: [
        'IWF-Bedingungen zugunsten von Arbeitnehmern nachverhandeln',
        'Exportorientierte Industrialisierung und Sonderwirtschaftszonen',
        'Armutsbekämpfung mit deutlich höheren Transfers',
        'Digitale Wirtschaft von 30 Mrd. USD bis 2030',
        'Vollständige Umsetzung des 13. Verfassungszusatzes',
        'Unabhängige Kommissionen stärken'
      ]
    },
    {
      k: 'NDF', name: 'NDF/UNP', full: 'United National Party und Verbündete',
      lead: 'Ranil Wickremesinghe (Umfeld)', seats: 5, color: '#a3e635', gov: false,
      ideology: 'Marktliberal, außenpolitisch westorientiert',
      base: ['business', 'sinhalaUrban'],
      stance: { austerity: 1, devolution: 1, market: 2, nationalism: -1, climate: 1, military: -1 },
      desc: 'Trägt die Verantwortung für die Stabilisierung nach 2022 und für das IWF-Programm. Warnt davor, die Konsolidierung aufzuweichen, hat aber kaum noch parlamentarisches Gewicht.',
      proposals: [
        'Am IWF-Programm ohne Abstriche festhalten',
        'Verlustbringende Staatsbetriebe teilprivatisieren',
        'Colombo Port City als Finanzplatz ausbauen',
        'Handelsabkommen mit Indien, China und Südostasien',
        'Verwaltung verschlanken, Stellen abbauen'
      ]
    },
    {
      k: 'SLPP', name: 'SLPP', full: 'Sri Lanka Podujana Peramuna', lead: 'Namal Rajapaksa',
      seats: 3, color: '#a78bfa', gov: false,
      ideology: 'Sinhalesisch-buddhistisch, entwicklungsstaatlich',
      base: ['sinhalaRural', 'sangha', 'military'],
      stance: { austerity: -1, devolution: -2, market: 0, nationalism: 2, climate: -1, military: 2 },
      desc: 'Nach dem Zusammenbruch von 2022 auf drei Sitze geschrumpft, aber im ländlichen Raum noch immer organisationsfähig. Verteidigt den Einheitsstaat und die Streitkräfte kompromisslos.',
      proposals: [
        'Einheitsstaat und Artikel 9 unangetastet lassen',
        'Große Infrastrukturprojekte wieder aufnehmen',
        'Keine internationale Untersuchung von Kriegsverbrechen',
        'Verteidigungsetat mindestens halten',
        'Nationale Selbstversorgung bei Grundnahrungsmitteln'
      ]
    },
    {
      k: 'ITAK', name: 'ITAK', full: 'Ilankai Tamil Arasu Kachchi (Föderale Partei)',
      lead: 'Sivagnanam Shritharan', seats: 8, color: '#fb923c', gov: false,
      ideology: 'Tamilisch-föderalistisch',
      base: ['tamilNE', 'diaspora'],
      stance: { austerity: 0, devolution: 3, market: 0, nationalism: -2, climate: 1, military: -2 },
      desc: 'Wichtigste tamilische Partei. Fordert eine föderale Lösung, die Zusammenlegung von Nord und Ost, die Rückgabe militärisch besetzten Landes und internationale Beteiligung an der Aufarbeitung.',
      proposals: [
        'Föderale Verfassung mit echten Provinzbefugnissen',
        'Sofortige Provinzratswahlen',
        'Rückgabe des militärisch besetzten Zivillands',
        'Vollständige Aufhebung des PTA ohne Ersatzgesetz gleicher Art',
        'Aufklärung des Schicksals der über 16.000 registrierten Verschwundenen',
        'Erhebliche Reduzierung der Truppenpräsenz im Norden'
      ]
    },
    {
      k: 'SLMC', name: 'SLMC', full: 'Sri Lanka Muslim Congress', lead: 'Rauff Hakeem',
      seats: 3, color: '#34d399', gov: false,
      ideology: 'Minderheitenvertretung, Mitte',
      base: ['muslim'],
      stance: { austerity: 0, devolution: 2, market: 0, nationalism: -2, climate: 0, military: -1 },
      desc: 'Vertritt vor allem die muslimische Bevölkerung im Osten und in Puttalam. Zentrale Themen sind Schutz vor Diskriminierung, die Aufarbeitung der Zwangseinäscherungen von 2020/21 und die Entwicklung des Ostens.',
      proposals: [
        'Antidiskriminierungsgesetz mit einklagbaren Rechten',
        'Keine Zusammenlegung von Nord und Ost ohne muslimische Zustimmung',
        'Entschädigung für die Zwangseinäscherungen während der Pandemie',
        'Rückkehrprogramm für die 1990 aus dem Norden vertriebenen Muslime',
        'Reform des muslimischen Ehe- und Scheidungsrechts aus der Gemeinschaft heraus'
      ]
    },
    {
      k: 'CWC', name: 'CWC', full: 'Ceylon Workers’ Congress', lead: 'Senthil Thondaman',
      seats: 2, color: '#f472b6', gov: false,
      ideology: 'Gewerkschaftlich, Plantagenarbeiterschaft',
      base: ['malaiyaha', 'unions'],
      stance: { austerity: -2, devolution: 1, market: -1, nationalism: -1, climate: 0, military: 0 },
      desc: 'Gewerkschaft und Partei zugleich. Kämpft seit Jahrzehnten um Tageslöhne, Landrechte und menschenwürdige Unterkünfte für die Malaiyaha-Tamilen, deren Vorfahren als Vertragsarbeiter ins Land gebracht wurden.',
      proposals: [
        'Verbindlicher Tageslohn von mindestens 1.700 LKR auf den Plantagen',
        'Eigentumsrechte statt Line Rooms für Plantagenfamilien',
        'Eigener Entwicklungsfonds für das Plantagenhochland',
        'Gleicher Zugang zu Schulen und Krankenhäusern im Hochland'
      ]
    },
    {
      k: 'SB', name: 'Sarvajana B.', full: 'Sarvajana Balaya (nationalistischer Block)',
      lead: 'Dilith Jayaweera / Wimal Weerawansa', seats: 3, color: '#fbbf24', gov: false,
      ideology: 'Wirtschaftsnationalistisch, IWF-kritisch',
      base: ['sinhalaRural', 'sangha'],
      stance: { austerity: -2, devolution: -2, market: -1, nationalism: 2, climate: 0, military: 1 },
      desc: 'Sammelbecken nationalistischer und IWF-kritischer Kräfte. Fordert eine Prüfung der Staatsschulden, die Ablehnung von Auflagen und den Schutz heimischer Produktion.',
      proposals: [
        'Unabhängige Prüfung der Staatsschulden und Streichung illegitimer Anteile',
        'IWF-Programm aussetzen und neu verhandeln',
        'Keine Privatisierung strategischer Staatsbetriebe',
        'Schutzzölle für heimische Landwirtschaft und Industrie'
      ]
    },
    {
      k: 'FSP', name: 'FSP', full: 'Frontline Socialist Party / Peratugami',
      lead: 'Kumar Gunaratnam', seats: 0, color: '#f87171', gov: false,
      ideology: 'Marxistisch, außerparlamentarisch',
      base: ['unions', 'youth'],
      stance: { austerity: -3, devolution: 1, market: -3, nationalism: -1, climate: 1, military: -1 },
      desc: 'Ohne Parlamentssitze, aber mobilisierungsstark in Gewerkschaften und an Universitäten. Wichtigster Treiber von Straßenprotesten gegen Sparmaßnahmen.',
      proposals: [
        'Zahlungen an Auslandsgläubiger einstellen',
        'Vermögensteuer für die reichsten Haushalte',
        'Rücknahme aller Steuererhöhungen für Beschäftigte',
        'Verstaatlichung von Schlüsselsektoren'
      ]
    },
    {
      k: 'TNPF', name: 'TNPF', full: 'Tamil National People’s Front',
      lead: 'Gajendrakumar Ponnambalam', seats: 1, color: '#fda4af', gov: false,
      ideology: 'Tamilisch-nationalistisch, kompromisslos',
      base: ['tamilNE', 'diaspora'],
      stance: { austerity: 0, devolution: 3, market: 0, nationalism: -3, climate: 0, military: -3 },
      desc: 'Lehnt den 13. Verfassungszusatz als unzureichend ab und setzt auf internationale Mechanismen statt auf innerstaatliche Lösungen.',
      proposals: [
        'Verweisung an den Internationalen Strafgerichtshof',
        'Referendum über das Selbstbestimmungsrecht',
        'Vollständige Entmilitarisierung des Nordens',
        'Ablehnung innerstaatlicher Wahrheitskommissionen ohne internationale Beteiligung'
      ]
    },
    {
      k: 'OTH', name: 'Übrige', full: 'Unabhängige und kleinere Listen',
      lead: 'verschiedene', seats: 1, color: '#64748b', gov: false,
      ideology: 'Unabhängig / regional', base: [],
      stance: { austerity: 0, devolution: 0, market: 0, nationalism: 0, climate: 0, military: 0 },
      desc: 'Ein einzelnes Mandat außerhalb der größeren Fraktionen. Bei knappen Mehrheiten können auch unabhängige Abgeordnete entscheidend werden.',
      proposals: []
    }
  ];

  P.BY_KEY = {};
  P.PARTIES.forEach(function (p) { P.BY_KEY[p.k] = p; });

  /* Farbe fuer Partei-Badge */
  P.color = function (k) { return (P.BY_KEY[k] && P.BY_KEY[k].color) || 'var(--tx-mute)'; };

})(SL.data.parties = SL.data.parties || {});
