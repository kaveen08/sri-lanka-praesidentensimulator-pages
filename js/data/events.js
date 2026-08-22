/* ============================================================
   EREIGNISSE  -  Lagemeldungen, die eine Entscheidung verlangen
   cond(s) darf auf den Spielzustand zugreifen.
   ============================================================ */
(function (E) {
  'use strict';

  var I = function (s, k) { return s.ind[k]; };

  E.EVENTS = [

    /* ---------- IWF und Finanzen ---------- */
    {
      id: 'ev_imf_review', cat: 'Finanzen', weight: 10, repeatAfter: 4,
      title: 'IWF-Überprüfung steht an',
      text: 'Eine Delegation des Internationalen Währungsfonds prüft die Einhaltung der Programmziele. Entscheidend sind der Primärsaldo, die Einnahmenquote und die Fortschritte bei den Staatsbetrieben. Von der Freigabe hängt eine Tranche von rund 334 Mio. USD ab, und mit ihr das Signal an alle anderen Geldgeber.',
      options: [
        { t: 'Zahlen offenlegen und Abweichungen erklären',
          d: 'Volle Transparenz, verbunden mit einem glaubwürdigen Nachbesserungsplan.',
          eff: { imfCompl: 6, legitimacy: 3 }, grp: { intl: 6 }, pc: -4 },
        { t: 'Zusätzliche Sparmaßnahmen zusagen',
          d: 'Ein Nachtragspaket mit Kürzungen, um die Tranche sicher zu bekommen.',
          eff: { imfCompl: 12, poverty: 0.5, growth: -0.15 }, grp: { intl: 12, unions: -8, sinhalaRural: -6 }, pc: -8 },
        { t: 'Auf Aufweichung der Ziele drängen',
          d: 'Verweis auf Ditwah und externe Schocks, um niedrigere Vorgaben zu erreichen.',
          eff: { imfCompl: -6, poverty: -0.3 }, grp: { intl: -8, unions: 6, sinhalaRural: 5 }, pc: -6 }
      ]
    },
    {
      id: 'ev_bond_pressure', cat: 'Finanzen', weight: 6, minQ: 3,
      cond: function (s) { return I(s, 'debtGdp') > 96 || I(s, 'imfCompl') < 60; },
      title: 'Anleihemärkte reagieren nervös',
      text: 'Die Risikoaufschläge auf srilankische Staatsanleihen steigen. Eine Ratingagentur kündigt eine Überprüfung des Ausblicks an. Die Zentralbank meldet Druck auf die Rupie.',
      options: [
        { t: 'Klares Bekenntnis zur Konsolidierung',
          d: 'Öffentliche Zusage, am Primärüberschussziel festzuhalten.',
          eff: { imfCompl: 7, fx: -4, growth: -0.1 }, grp: { intl: 9, unions: -5 }, pc: -3 },
        { t: 'Zentralbank stützt die Währung',
          d: 'Devisenverkäufe aus den Reserven, um den Kurs zu stabilisieren.',
          eff: { reserves: -0.55, fx: -10, inflation: -0.3 }, grp: { business: 5, intl: -2 }, pc: -2 },
        { t: 'Nichts tun und den Markt laufen lassen',
          d: 'Keine Intervention. Die Rupie findet ihren Kurs selbst.',
          eff: { fx: 14, inflation: 0.9, reserves: 0.1, exports: 0.2 }, grp: { business: -6, sinhalaUrban: -6 }, pc: 0 }
      ]
    },
    {
      id: 'ev_remittance_surge', cat: 'Finanzen', weight: 4,
      title: 'Rücküberweisungen über den Erwartungen',
      text: 'Die Überweisungen von Auslandssrilankern liegen deutlich über der Prognose. Die Zentralbank konnte im laufenden Jahr netto Devisen zukaufen, die Reserven steigen.',
      options: [
        { t: 'Devisen in die Reserven legen',
          d: 'Puffer aufbauen, statt den Spielraum sofort auszugeben.',
          eff: { reserves: 0.55, fx: -5 }, grp: { intl: 7, business: 4 }, pc: 0 },
        { t: 'Spielraum für Importerleichterungen nutzen',
          d: 'Einfuhrbeschränkungen weiter lockern, das erhöht Auswahl und Investitionsgüterimporte.',
          eff: { reserves: 0.1, privateSector: 5, inflation: -0.3, growth: 0.12 }, grp: { business: 9, sinhalaUrban: 6 }, pc: 0 },
        { t: 'Programm für Angehörige von Arbeitsmigranten auflegen',
          d: 'Bildungs- und Betreuungsangebote für zurückgelassene Kinder.',
          eff: { socialProt: 5, education: 3, remittances: 0.2 }, grp: { unions: 6, muslim: 5, sinhalaRural: 6 }, pc: -2 }
      ]
    },

    /* ---------- Klima und Katastrophen ---------- */
    {
      id: 'ev_monsoon_flood', cat: 'Katastrophe', weight: 8, repeatAfter: 6,
      title: 'Schwere Überschwemmungen im Südwesten',
      text: 'Ein außergewöhnlich starker Monsun setzt Teile von Ratnapura, Kalutara und Colombo unter Wasser. Zehntausende sind in Notunterkünften, Straßen und Bahnstrecken sind unterbrochen.',
      options: [
        { t: 'Sofortiges Hilfspaket ohne Deckung im Haushalt',
          d: 'Schnelle Auszahlung an Betroffene, finanziert über einen Nachtragshaushalt.',
          fiscal: { exp: 55 }, eff: { housing: 5, legitimacy: 7, disasterPrep: 2 },
          grp: { sinhalaRural: 10, farmers: 8, intl: -3 }, pc: -3 },
        { t: 'Hilfe aus dem laufenden Haushalt umschichten',
          d: 'Andere Vorhaben werden verschoben, das Defizit bleibt unverändert.',
          eff: { housing: 3, infra: -3, legitimacy: 2 }, grp: { sinhalaRural: 4, business: -3, intl: 4 }, pc: -2 },
        { t: 'Internationale Hilfe anfordern',
          d: 'Formeller Hilfsappell an Geber und UN-Organisationen.',
          fiscal: { rev: 22 }, eff: { relWest: 4, relJapan: 4, legitimacy: -2, housing: 4 },
          grp: { intl: 6, sinhalaRural: 3, sangha: -3 }, pc: -1 }
      ]
    },
    {
      id: 'ev_cyclone', cat: 'Katastrophe', weight: 4, minQ: 5,
      title: 'Zyklonwarnung für die Ostküste',
      text: 'Das Meteorologische Amt warnt vor einem tropischen Wirbelsturm, der auf Trincomalee und Batticaloa zuläuft. Die Erinnerung an Ditwah, der 4,1 Mrd. USD Schaden verursachte, ist frisch.',
      options: [
        { t: 'Großflächige Vorsorgeevakuierung anordnen',
          d: 'Kostet Geld und Vertrauen, falls der Sturm abdreht, rettet aber Leben, falls nicht.',
          fiscal: { exp: 18 }, eff: { disasterPrep: 8, legitimacy: 4, climateRes: 3 },
          grp: { tamilNE: 9, muslim: 7, farmers: 5 }, pc: -2, special: 'evacuate' },
        { t: 'Nur Warnungen aussprechen',
          d: 'Warnmeldungen über Rundfunk und Mobilfunk, keine erzwungene Evakuierung.',
          eff: { disasterPrep: 1 }, grp: {}, pc: 0, special: 'warn_only' },
        { t: 'Streitkräfte in Bereitschaft versetzen',
          d: 'Militärische Katastrophenhilfe vorbereiten, ohne Zivilverwaltung zu übergehen.',
          fiscal: { exp: 8 }, eff: { disasterPrep: 5, militaryMor: 4, internalSec: 2 },
          grp: { military: 7, sinhalaRural: 5, tamilNE: -2 }, pc: -1 }
      ]
    },
    {
      id: 'ev_drought', cat: 'Katastrophe', weight: 5,
      title: 'Dürre in der Trockenzone',
      text: 'Ausbleibender Regen lässt die Tanks in Anuradhapura und Polonnaruwa auf kritische Stände fallen. Die Reisernte ist gefährdet, die Wasserkraftwerke drosseln die Erzeugung.',
      options: [
        { t: 'Bewässerungswasser vorrangig für die Landwirtschaft',
          d: 'Ernte sichern, dafür mehr thermische Stromerzeugung mit höheren Kosten.',
          fiscal: { exp: 26 }, eff: { agriProd: 4, foodSec: 5, energyRel: -5, emissions: 0.4 },
          grp: { farmers: 13, sinhalaRural: 8, business: -5 }, pc: -2 },
        { t: 'Stromversorgung sichern, Bewässerung drosseln',
          d: 'Industrie und Haushalte behalten Strom, die Bauern tragen die Last.',
          eff: { energyRel: 4, agriProd: -6, foodSec: -5, inflation: 0.5 },
          grp: { business: 8, sinhalaUrban: 5, farmers: -15, sinhalaRural: -8 }, pc: -3 },
        { t: 'Nahrungsmittel importieren und Preise stützen',
          d: 'Reisimporte auf Staatskosten, um Preissprünge zu verhindern.',
          fiscal: { exp: 45 }, eff: { foodSec: 7, inflation: -0.5, reserves: -0.3 },
          grp: { sinhalaUrban: 8, sinhalaRural: 6, farmers: -8 }, pc: -2 }
      ]
    },

    /* ---------- Straße und Proteste ---------- */
    {
      id: 'ev_protest_cost', cat: 'Innenpolitik', weight: 9,
      cond: function (s) { return s.streetPressure > 45; },
      title: 'Proteste gegen die Lebenshaltungskosten',
      text: 'Vor dem Präsidialsekretariat versammeln sich Zehntausende. Gewerkschaften, Studentenverbände und die außerparlamentarische Linke haben gemeinsam aufgerufen. Die Bilder erinnern an die Aragalaya von 2022.',
      options: [
        { t: 'Vertreter empfangen und Zugeständnisse machen',
          d: 'Gespräch statt Konfrontation, verbunden mit einer befristeten Entlastung.',
          fiscal: { exp: 45 }, eff: { legitimacy: 6, poverty: -0.5, pressFree: 3 },
          grp: { unions: 10, youth: 9, sinhalaRural: 6, intl: -4 }, pc: -5, special: 'calm_street' },
        { t: 'Proteste zulassen, Polizei zurückhalten',
          d: 'Versammlungsfreiheit respektieren, keine Räumung.',
          eff: { pressFree: 6, legitimacy: 3, internalSec: -2 },
          grp: { youth: 6, unions: 5, business: -4, military: -3 }, pc: -2, special: 'calm_street_soft' },
        { t: 'Versammlungsverbot und Räumung anordnen',
          d: 'Polizei und Sondereinheiten lösen die Kundgebung auf.',
          eff: { pressFree: -14, legitimacy: -10, internalSec: 3, ruleOfLaw: -8 },
          grp: { youth: -16, unions: -14, sinhalaUrban: -10, intl: -12, military: 6 }, pc: -6, special: 'crackdown' }
      ]
    },
    {
      id: 'ev_strike_energy', cat: 'Innenpolitik', weight: 6,
      cond: function (s) { return s.approval.unions < 42; },
      title: 'Streik im Energiesektor angekündigt',
      text: 'Die Gewerkschaften der staatlichen Stromversorger und der Ölgesellschaft kündigen einen unbefristeten Ausstand an. Bei einem Streik drohen Stromabschaltungen und Engpässe an den Tankstellen innerhalb weniger Tage.',
      options: [
        { t: 'Verhandeln und Zugeständnisse machen',
          d: 'Gespräche mit Zusagen zu Beschäftigung und Zulagen.',
          fiscal: { exp: 32 }, eff: { energyRel: 2, soeHealth: -5 },
          grp: { unions: 12, publicSector: 8, intl: -6, business: -4 }, pc: -4 },
        { t: 'Notstandsverordnung erlassen und Streik untersagen',
          d: 'Der Energiesektor wird zum wesentlichen Dienst erklärt, Streikende riskieren Entlassung.',
          eff: { energyRel: 4, ruleOfLaw: -8, pressFree: -8, internalSec: -3 },
          grp: { unions: -20, publicSector: -12, business: 8, intl: -4, military: 4 }, pc: -6 },
        { t: 'Streik aussitzen und Notversorgung organisieren',
          d: 'Militär und Reservekapazitäten halten die Grundversorgung, Verhandlungen erst danach.',
          eff: { energyRel: -6, growth: -0.2, internalSec: -2, militaryMor: 3 },
          grp: { unions: -12, business: -8, sinhalaUrban: -7, military: 5 }, pc: -3 }
      ]
    },
    {
      id: 'ev_corruption_own', cat: 'Innenpolitik', weight: 7, minQ: 4,
      title: 'Korruptionsverdacht in den eigenen Reihen',
      text: 'Ein Untersuchungsbericht legt nahe, dass ein Staatssekretär aus Ihrem engsten Umfeld Aufträge an ein Unternehmen vergeben hat, an dem seine Familie beteiligt ist. Die Presse hat die Unterlagen bereits.',
      options: [
        { t: 'Sofortige Suspendierung und Strafanzeige',
          d: 'Keine Ausnahme für eigene Leute, Übergabe an die Antikorruptionsbehörde.',
          eff: { corruption: 8, legitimacy: 8, ruleOfLaw: 6, stateCap: -3 },
          grp: { youth: 12, sinhalaUrban: 10, intl: 8, publicSector: -4 }, pc: -4 },
        { t: 'Interne Prüfung ohne Öffentlichkeit',
          d: 'Der Fall wird verwaltungsintern geklärt, ohne Anzeige.',
          eff: { corruption: -6, legitimacy: -8, pressFree: -3 },
          grp: { youth: -12, sinhalaUrban: -9, intl: -7 }, pc: -2 },
        { t: 'Vorwürfe als politische Kampagne zurückweisen',
          d: 'Öffentliche Verteidigung des Mitarbeiters, Angriff auf die Berichterstattung.',
          eff: { corruption: -10, legitimacy: -12, pressFree: -7 },
          grp: { youth: -16, sinhalaUrban: -12, intl: -10, publicSector: 4 }, pc: -1 }
      ]
    },
    {
      id: 'ev_sangha_pressure', cat: 'Innenpolitik', weight: 6,
      cond: function (s) { return s.approval.sangha < 46 || I(s, 'sinhalaPress') > 55; },
      title: 'Mahanayaka-Theros äußern Besorgnis',
      text: 'Die Oberhäupter der wichtigsten buddhistischen Orden veröffentlichen eine gemeinsame Erklärung. Sie warnen vor einer Aushöhlung des Einheitsstaates und der Stellung des Buddhismus und laden Sie zu einem Gespräch nach Kandy.',
      options: [
        { t: 'Persönlich nach Kandy reisen',
          d: 'Respektbezeugung ohne inhaltliche Zusagen. In Sri Lanka ein wichtiges Signal.',
          eff: { sinhalaPress: -6, legitimacy: 2 },
          grp: { sangha: 12, sinhalaRural: 7, tamilNE: -4, muslim: -3 }, pc: -2 },
        { t: 'Schriftlich antworten und den Kurs verteidigen',
          d: 'Höflich, aber ohne Kurskorrektur und ohne Besuch.',
          eff: { sinhalaPress: 4 },
          grp: { sangha: -6, sinhalaRural: -3, youth: 4, tamilNE: 3 }, pc: -1 },
        { t: 'Konkrete Zusagen zum Schutz buddhistischer Stätten',
          d: 'Zusätzliche Mittel und ein Vetorecht bei Bauvorhaben im Umfeld von Tempeln.',
          fiscal: { exp: 14 }, eff: { sinhalaPress: -12, religFree: -6, trustTamil: -6, reconcile: -5 },
          grp: { sangha: 18, sinhalaRural: 10, tamilNE: -10, muslim: -8, intl: -5 }, pc: -3 }
      ]
    },
    {
      id: 'ev_defection', cat: 'Innenpolitik', weight: 5, minQ: 6,
      cond: function (s) { return s.seatsGov > 120 && s.approvalOverall < 45; },
      title: 'Abgeordnete drohen mit Fraktionswechsel',
      text: 'Eine Gruppe von Hinterbänklern Ihrer Partei ist unzufrieden mit dem Reformkurs. Sie fordern Kabinettsposten und Zusagen für ihre Wahlkreise, andernfalls wollen sie die Fraktion verlassen.',
      options: [
        { t: 'Posten und Wahlkreismittel zusagen',
          d: 'Die klassische Lösung. Sie funktioniert, aber sie hat einen Preis.',
          fiscal: { exp: 24 }, eff: { corruption: -6, legitimacy: -5 },
          grp: { youth: -8, sinhalaUrban: -6 }, pc: -3, special: 'keep_seats' },
        { t: 'Standhaft bleiben und Abgang hinnehmen',
          d: 'Keine Zugeständnisse, auch wenn die Mehrheit schrumpft.',
          eff: { legitimacy: 6, corruption: 4 },
          grp: { youth: 9, sinhalaUrban: 7, intl: 4 }, pc: -1, special: 'lose_seats' },
        { t: 'Parteiausschluss androhen',
          d: 'Konfrontation innerhalb der Partei, mit Verweis auf das Wahlmandat von 2024.',
          eff: { legitimacy: 2, stateCap: -3 },
          grp: { youth: 5, publicSector: -4 }, pc: -4, special: 'lose_seats_half' }
      ]
    },

    /* ---------- Ethnische und religiöse Spannungen ---------- */
    {
      id: 'ev_communal_incident', cat: 'Zusammenhalt', weight: 6,
      cond: function (s) { return I(s, 'sinhalaPress') > 50 || I(s, 'internalSec') < 45; },
      title: 'Gewalt zwischen Gemeinschaften in einer Kleinstadt',
      text: 'Nach einem Streit auf einem Markt kommt es zu Übergriffen auf muslimische Geschäfte. Ein Toter, mehrere Verletzte, brennende Läden. In sozialen Netzwerken kursieren Aufrufe zu weiteren Aktionen. Ähnliche Vorfälle in Aluthgama 2014 und Digana 2018 eskalierten binnen Tagen.',
      options: [
        { t: 'Sofortige Ausgangssperre und Strafverfolgung der Täter',
          d: 'Harte Reaktion gegen die Angreifer, unabhängig von deren Zugehörigkeit.',
          eff: { internalSec: 6, ruleOfLaw: 7, trustMuslim: 10, sinhalaPress: 6 },
          grp: { muslim: 14, christian: 6, intl: 7, sinhalaRural: -6, sangha: -5 }, pc: -3 },
        { t: 'Sperrung sozialer Netzwerke anordnen',
          d: 'Zeitweise Abschaltung der Plattformen, wie es frühere Regierungen taten.',
          eff: { internalSec: 3, pressFree: -12, digitalGov: -4, privateSector: -3 },
          grp: { youth: -12, business: -8, intl: -8, muslim: 3 }, pc: -2 },
        { t: 'Lokale Schlichtung durch Religionsvertreter',
          d: 'Deeskalation über den interreligiösen Rat und lokale Autoritäten.',
          eff: { internalSec: 2, reconcile: 5, religFree: 4, trustMuslim: 5 },
          grp: { muslim: 7, sangha: 5, christian: 5 }, pc: -1 }
      ]
    },
    {
      id: 'ev_mullivaikkal', cat: 'Zusammenhalt', weight: 5,
      title: 'Gedenkveranstaltungen im Mai',
      text: 'Im Norden sind Gedenkfeiern für die Toten der letzten Kriegsphase angekündigt. Gleichzeitig begeht der Süden den Jahrestag des Kriegsendes als Siegesfeier. Beide Termine fallen auf denselben Tag.',
      options: [
        { t: 'Beide Veranstaltungen zulassen',
          d: 'Gedenken im Norden ohne Behinderung, Feier im Süden ohne militärische Zurschaustellung.',
          eff: { reconcile: 9, trustTamil: 11, pressFree: 5, sinhalaPress: 9 },
          grp: { tamilNE: 13, diaspora: 10, intl: 6, sinhalaRural: -6, military: -6 }, pc: -3 },
        { t: 'Gedenkfeiern im Norden einschränken',
          d: 'Auflagen und Polizeipräsenz, Verbot bestimmter Symbole.',
          eff: { reconcile: -8, trustTamil: -12, pressFree: -7, internalSec: 2 },
          grp: { tamilNE: -14, diaspora: -12, intl: -8, military: 7, sinhalaRural: 5 }, pc: -2 },
        { t: 'Gemeinsame staatliche Gedenkfeier ausrichten',
          d: 'Ein Staatsakt für alle Opfer, mit Vertretern aller Gemeinschaften.',
          eff: { reconcile: 12, trustTamil: 7, sinhalaPress: 7, legitimacy: 4 },
          grp: { tamilNE: 6, muslim: 5, christian: 4, military: -5, sinhalaRural: -4 }, pc: -4 }
      ]
    },
    {
      id: 'ev_mass_grave', cat: 'Zusammenhalt', weight: 4, minQ: 3,
      title: 'Massengrab bei Bauarbeiten entdeckt',
      text: 'Bei Erdarbeiten werden menschliche Überreste gefunden. Erste Untersuchungen deuten auf eine größere Zahl von Toten aus der Kriegszeit hin. Angehörigenorganisationen fordern internationale Forensiker, das Verteidigungsministerium mahnt zur Zurückhaltung.',
      options: [
        { t: 'Internationale Forensiker hinzuziehen',
          d: 'Unabhängige Untersuchung mit ausländischer Fachexpertise und offener Berichterstattung.',
          fiscal: { exp: 6 }, eff: { reconcile: 12, trustTamil: 16, ruleOfLaw: 6, relWest: 7, sinhalaPress: 14, militaryMor: -10 },
          grp: { tamilNE: 18, diaspora: 16, intl: 12, military: -16, sinhalaRural: -8 }, pc: -5 },
        { t: 'Nationale Untersuchung ohne ausländische Beteiligung',
          d: 'Srilankische Gerichtsmediziner unter Aufsicht des zuständigen Magistrats.',
          eff: { reconcile: 4, trustTamil: 3, ruleOfLaw: 2 },
          grp: { tamilNE: 2, diaspora: -3, military: -4 }, pc: -2 },
        { t: 'Bauarbeiten fortsetzen lassen',
          d: 'Die Fundstelle wird dokumentiert und das Projekt weitergeführt.',
          eff: { reconcile: -10, trustTamil: -16, ruleOfLaw: -8, relWest: -8 },
          grp: { tamilNE: -18, diaspora: -18, intl: -12, military: 8 }, pc: -1 }
      ]
    },

    /* ---------- Außenpolitik ---------- */
    {
      id: 'ev_chinese_vessel', cat: 'Außenpolitik', weight: 6,
      title: 'Chinesisches Forschungsschiff beantragt Hafenzugang',
      text: 'Ein chinesisches Vermessungsschiff bittet um Erlaubnis zum Anlaufen in Hambantota. Indien hat auf diplomatischem Weg deutliche Bedenken angemeldet und verweist auf frühere Fälle. Peking erinnert an offene Umschuldungsgespräche.',
      options: [
        { t: 'Zugang gewähren',
          d: 'Genehmigung mit Auflagen zur Datenerhebung.',
          eff: { relChina: 12, relIndia: -14, relWest: -6, maritimeSec: -3 },
          grp: { intl: -4, business: 3, sinhalaRural: 3 }, pc: -3 },
        { t: 'Zugang verweigern',
          d: 'Ablehnung unter Verweis auf ein laufendes Moratorium für Forschungsschiffe.',
          eff: { relChina: -12, relIndia: 12, relWest: 6 },
          grp: { intl: 5, tamilNE: 3, business: -3 }, pc: -3 },
        { t: 'Allgemeines Verfahren für alle Staaten anwenden',
          d: 'Entscheidung nach einheitlichen, veröffentlichten Kriterien statt nach Einzelfall.',
          eff: { relChina: -3, relIndia: 4, relWest: 5, legitimacy: 5, maritimeSec: 3 },
          grp: { intl: 7, business: 4 }, pc: -4 }
      ]
    },
    {
      id: 'ev_indian_fishermen', cat: 'Außenpolitik', weight: 6,
      title: 'Festnahme indischer Fischer in der Palkstraße',
      text: 'Die Marine hat mehrere indische Trawler mit Grundschleppnetzen in srilankischen Gewässern aufgebracht. Tamil Nadu fordert die sofortige Freilassung, nordsrilankische Fischer verlangen eine harte Linie: Die Trawler zerstören ihre Netze und die Fanggründe.',
      options: [
        { t: 'Boote beschlagnahmen, Besatzungen freilassen',
          d: 'Der Mittelweg: Sanktion gegen die Ausrüstung, keine Haft für die Menschen.',
          eff: { maritimeSec: 5, relIndia: -4, trustTamil: 6, agriProd: 2 },
          grp: { farmers: 9, tamilNE: 9, intl: 2 }, pc: -2 },
        { t: 'Alles freigeben zur Schonung der Beziehungen',
          d: 'Diplomatische Rücksicht auf Delhi und Chennai.',
          eff: { relIndia: 8, maritimeSec: -6, trustTamil: -8, agriProd: -2 },
          grp: { farmers: -12, tamilNE: -11, business: 4 }, pc: -2 },
        { t: 'Strafverfahren gegen die Besatzungen einleiten',
          d: 'Konsequente Anwendung des Fischereirechts mit Haftstrafen.',
          eff: { maritimeSec: 8, relIndia: -12, trustTamil: 8 },
          grp: { farmers: 13, tamilNE: 11, sinhalaRural: 5, intl: -5 }, pc: -3 }
      ]
    },
    {
      id: 'ev_unhrc_resolution', cat: 'Außenpolitik', weight: 5, minQ: 4,
      title: 'Neue Resolution im UN-Menschenrechtsrat',
      text: 'Eine Staatengruppe bringt in Genf eine Resolution zu Rechenschaft und Aufarbeitung in Sri Lanka ein. Sie sieht die Fortsetzung der Beweissicherung durch das Hochkommissariat vor. GSP-Plus und mehrere Kreditlinien stehen indirekt mit auf dem Spiel.',
      options: [
        { t: 'Mitwirken und eigene Fortschritte einbringen',
          d: 'Kooperativer Kurs mit einem eigenen Zeitplan für Aufarbeitung.',
          eff: { relWest: 12, reconcile: 8, trustTamil: 9, sinhalaPress: 12 },
          grp: { intl: 12, tamilNE: 12, diaspora: 8, military: -10, sinhalaRural: -7, sangha: -8 }, pc: -5 },
        { t: 'Resolution ablehnen und Souveränität betonen',
          d: 'Zurückweisung als Einmischung, Bündnissuche mit gleichgesinnten Staaten.',
          eff: { relWest: -14, relChina: 6, reconcile: -8, trustTamil: -10, exports: -0.3 },
          grp: { military: 12, sinhalaRural: 8, sangha: 9, tamilNE: -14, intl: -12 }, pc: -3 },
        { t: 'Enthaltung und stilles Verhandeln',
          d: 'Keine öffentliche Konfrontation, dafür Zusagen hinter verschlossenen Türen.',
          eff: { relWest: 2, reconcile: 2, sinhalaPress: 3 },
          grp: { intl: 2, tamilNE: 1, military: -3 }, pc: -2 }
      ]
    },
    {
      id: 'ev_gulf_labour', cat: 'Außenpolitik', weight: 4,
      title: 'Golfstaat beschränkt Arbeitsvisa',
      text: 'Ein wichtiges Zielland kündigt an, Visa für Hausangestellte drastisch zu begrenzen, nachdem Fälle von Ausbeutung öffentlich geworden sind. Zehntausende srilankische Arbeitsplätze und ein Teil der Rücküberweisungen stehen auf dem Spiel.',
      options: [
        { t: 'Abkommen mit Mindeststandards aushandeln',
          d: 'Musterverträge, Beschwerdestelle und verpflichtende Vorabschulung.',
          fiscal: { exp: 8 }, eff: { relGulf: 8, remittances: 0.2, socialProt: 5 },
          grp: { muslim: 7, unions: 8, sinhalaRural: 6, intl: 5 }, pc: -2 },
        { t: 'Auf andere Zielmärkte ausweichen',
          d: 'Anwerbeabkommen mit Japan, Südkorea und europäischen Pflegemärkten.',
          fiscal: { exp: 12 }, eff: { remittances: 0.3, relJapan: 6, skillsMatch: 4, brainDrain: 4 },
          grp: { youth: 7, unions: 5, business: 4 }, pc: -2 },
        { t: 'Entsendung vorübergehend aussetzen',
          d: 'Schutz vor Ausbeutung, aber sofortiger Einkommensverlust für viele Familien.',
          eff: { remittances: -0.6, reserves: -0.3, socialProt: 4, poverty: 0.5 },
          grp: { unions: 6, intl: 4, sinhalaRural: -9, muslim: -6 }, pc: -3 }
      ]
    },

    /* ---------- Wirtschaft ---------- */
    {
      id: 'ev_investor', cat: 'Wirtschaft', weight: 6,
      title: 'Großinvestor prüft Standort Sri Lanka',
      text: 'Ein internationaler Elektronikkonzern erwägt ein Werk mit 8.000 Arbeitsplätzen. Bedingung sind eine zehnjährige Steuerbefreiung, garantierte Stromversorgung und ein beschleunigtes Genehmigungsverfahren.',
      options: [
        { t: 'Bedingungen akzeptieren',
          d: 'Steuerbefreiung gewähren, um die Investition zu sichern.',
          fiscal: { rev: -18 }, eff: { fdi: 0.5, exports: 0.7, unemp: -0.35, privateSector: 6, corruption: -3 },
          grp: { business: 12, youth: 9, intl: -3 }, pc: -2 },
        { t: 'Nur befristete und öffentlich einsehbare Vergünstigung',
          d: 'Fünf Jahre statt zehn, mit Nachweispflicht über Arbeitsplätze.',
          fiscal: { rev: -8 }, eff: { fdi: 0.3, exports: 0.4, unemp: -0.2, corruption: 3, privateSector: 4 },
          grp: { business: 6, intl: 5, youth: 5 }, pc: -2 },
        { t: 'Keine Sonderkonditionen',
          d: 'Gleiche Regeln für alle. Der Investor geht möglicherweise nach Vietnam.',
          eff: { taxCompl: 4, corruption: 4, fdi: -0.15 },
          grp: { intl: 4, unions: 6, business: -9 }, pc: 0 }
      ]
    },
    {
      id: 'ev_tourism_boom', cat: 'Wirtschaft', weight: 4,
      cond: function (s) { return I(s, 'internalSec') > 45 && s.streetPressure < 55; },
      title: 'Tourismus über den Erwartungen',
      text: 'Mehrere internationale Reisemedien führen Sri Lanka unter den Zielen des Jahres. Die Buchungen steigen deutlich, die Kapazitäten an der Süd- und Ostküste stoßen an Grenzen.',
      options: [
        { t: 'Ausbau der Kapazitäten fördern',
          d: 'Kredite für Hotels und Ausbildungsprogramme im Gastgewerbe.',
          fiscal: { exp: 16 }, eff: { tourism: 0.5, unemp: -0.3, privateSector: 5, forest: -0.2 },
          grp: { business: 11, youth: 7 }, pc: -1 },
        { t: 'Auf Qualität statt Masse setzen',
          d: 'Naturschutzabgabe, Besucherobergrenzen an sensiblen Orten, höherwertige Angebote.',
          fiscal: { rev: 14 }, eff: { tourism: 0.2, forest: 0.4, climateRes: 3, reserves: 0.2 },
          grp: { intl: 6, business: 4, farmers: 4 }, pc: -1 },
        { t: 'Norden und Osten gezielt einbeziehen',
          d: 'Erschließung von Jaffna, Trincomalee und Batticaloa für den Tourismus.',
          fiscal: { exp: 12 }, eff: { tourism: 0.3, regionalBalance: 6, trustTamil: 6, infra: 3 },
          grp: { tamilNE: 11, muslim: 6, business: 6 }, pc: -2 }
      ]
    },
    {
      id: 'ev_brain_drain_report', cat: 'Wirtschaft', weight: 5,
      cond: function (s) { return I(s, 'brainDrain') > 60; },
      title: 'Bericht über Fachkräfteabwanderung',
      text: 'Eine Analyse zeigt, dass in den nächsten zehn Jahren rund eine Million junger Menschen auf den formellen Arbeitsmarkt drängen, während bei unveränderten Trends nur etwa 300.000 formelle Stellen entstehen. Gleichzeitig verlassen Ärzte, Ingenieure und IT-Fachkräfte das Land.',
      options: [
        { t: 'Nationale Beschäftigungsoffensive ausrufen',
          d: 'Ein Bündel aus Berufsbildung, Gründungsförderung und Investitionsanreizen.',
          fiscal: { exp: 65 }, eff: { youthUnemp: -2.6, skillsMatch: 8, brainDrain: -8, privateSector: 6 },
          grp: { youth: 14, business: 8, unions: 5, intl: -4 }, pc: -4 },
        { t: 'Ausreise qualifizierter Kräfte erschweren',
          d: 'Bindungsfristen für staatlich ausgebildete Ärzte und Ingenieure.',
          eff: { brainDrain: -3, pressFree: -6, ruleOfLaw: -5, health: 3 },
          grp: { youth: -14, unions: -10, intl: -8, sinhalaRural: 4 }, pc: -3 },
        { t: 'Auswanderung als Devisenquelle akzeptieren',
          d: 'Gezielte Ausbildung für den Export von Arbeitskräften, Fokus auf Rücküberweisungen.',
          eff: { remittances: 0.5, brainDrain: 6, health: -4, skillsMatch: -3, reserves: 0.2 },
          grp: { business: 4, sinhalaRural: 5, unions: -6, youth: -5 }, pc: -1 }
      ]
    },
    {
      id: 'ev_soe_loss', cat: 'Wirtschaft', weight: 5,
      cond: function (s) { return I(s, 'soeHealth') < 45; },
      title: 'Staatsbetrieb meldet erneut Milliardenverlust',
      text: 'Der Jahresabschluss eines großen Staatsbetriebs weist einen weiteren erheblichen Verlust aus. Die Staatsbanken haben bereits hohe Forderungen gegen das Unternehmen, der IWF drängt auf eine Lösung.',
      options: [
        { t: 'Sanierungsplan mit harter Budgetgrenze',
          d: 'Neue Führung, Zielvereinbarung, keine weiteren Garantien.',
          fiscal: { exp: 20 }, eff: { soeHealth: 12, imfCompl: 6, corruption: 3 },
          grp: { intl: 10, business: 6, unions: -8, publicSector: -6 }, pc: -3 },
        { t: 'Verluste erneut aus dem Haushalt decken',
          d: 'Zuschuss zur Vermeidung von Entlassungen und Versorgungsproblemen.',
          fiscal: { exp: 75 }, eff: { soeHealth: -6, imfCompl: -8, energyRel: 3 },
          grp: { unions: 10, publicSector: 8, intl: -12, business: -4 }, pc: -2 },
        { t: 'Teilverkauf an strategische Investoren',
          d: 'Minderheitsbeteiligung mit Beschäftigungsgarantie für drei Jahre.',
          fiscal: { rev: 55 }, eff: { soeHealth: 16, fdi: 0.3, privateSector: 5 },
          grp: { business: 12, intl: 12, unions: -18, publicSector: -12, sinhalaRural: -5 }, pc: -5 }
      ]
    },
    {
      id: 'ev_oil_shock', cat: 'Wirtschaft', weight: 5,
      title: 'Ölpreis springt nach geopolitischer Eskalation',
      text: 'Eine Zuspitzung im Nahen Osten treibt die Rohölnotierungen deutlich nach oben. Die Treibstoffrechnung des Landes steigt sprunghaft, die Rupie gerät unter Druck.',
      options: [
        { t: 'Preise vollständig weitergeben',
          d: 'Die Anpassungsformel greift ohne Abfederung.',
          eff: { inflation: 1.6, soeHealth: 6, poverty: 0.6, imfCompl: 6 },
          grp: { intl: 8, farmers: -10, unions: -9, sinhalaRural: -9 }, pc: -3 },
        { t: 'Preise befristet deckeln',
          d: 'Der Staat übernimmt die Differenz für sechs Monate.',
          fiscal: { exp: 85 }, eff: { inflation: -0.2, soeHealth: -8, imfCompl: -7 },
          grp: { sinhalaRural: 10, farmers: 9, unions: 8, intl: -12 }, pc: -2 },
        { t: 'Gezielte Ausgleichszahlungen an Betroffene',
          d: 'Preise steigen, aber Fischer, Landwirte und Busbetriebe erhalten Direkthilfen.',
          fiscal: { exp: 34 }, eff: { inflation: 0.9, poverty: 0.2, socialProt: 5, imfCompl: 2 },
          grp: { farmers: 6, unions: 3, intl: 2, sinhalaRural: 3 }, pc: -3 }
      ]
    },

    /* ---------- Gesundheit und Gesellschaft ---------- */
    {
      id: 'ev_dengue', cat: 'Gesundheit', weight: 5,
      title: 'Schwere Dengue-Welle',
      text: 'Nach den Regenfällen steigen die Fallzahlen stark. Krankenhäuser in der Westprovinz melden Überlastung, mehrere Todesfälle sind bestätigt.',
      options: [
        { t: 'Nationale Bekämpfungskampagne',
          d: 'Brutstättenbeseitigung, zusätzliche Betten, Aufklärung in drei Sprachen.',
          fiscal: { exp: 18 }, eff: { health: 7, malnutrition: -1, legitimacy: 4 },
          grp: { sinhalaUrban: 9, unions: 6, sinhalaRural: 6 }, pc: -1 },
        { t: 'Kommunen in die Pflicht nehmen',
          d: 'Bußgelder für Grundstücke mit Brutstätten, Durchsetzung durch die Kommunen.',
          fiscal: { exp: 5 }, eff: { health: 4, legitimacy: 2, housing: 2 },
          grp: { sinhalaUrban: 3, business: -4 }, pc: -1 },
        { t: 'Militär zur Unterstützung einsetzen',
          d: 'Soldaten bei Reinigungsaktionen und Logistik.',
          fiscal: { exp: 8 }, eff: { health: 5, militaryMor: 4, stateCap: -2 },
          grp: { military: 8, sinhalaRural: 6, tamilNE: -3 }, pc: -1 }
      ]
    },
    {
      id: 'ev_medicine_shortage', cat: 'Gesundheit', weight: 5,
      cond: function (s) { return I(s, 'health') < 55 || I(s, 'reserves') < 5; },
      title: 'Engpass bei lebenswichtigen Medikamenten',
      text: 'Krankenhäuser melden fehlende Präparate für Krebs-, Herz- und Dialysebehandlungen. Ärzteverbände warnen öffentlich, Angehörige organisieren Spendenaktionen. Die Erinnerung an 2022 ist präsent.',
      options: [
        { t: 'Notbeschaffung mit Devisenzuteilung',
          d: 'Vorrangige Zuteilung von Devisen und beschleunigte Vergabe.',
          fiscal: { exp: 30 }, eff: { health: 9, reserves: -0.2, corruption: -3 },
          grp: { unions: 9, sinhalaRural: 9, sinhalaUrban: 8 }, pc: -2 },
        { t: 'Spendenangebote aus dem Ausland annehmen',
          d: 'Hilfslieferungen von Gebern und der Diaspora.',
          eff: { health: 6, diaspora: 8, legitimacy: -3, relIndia: 4 },
          grp: { diaspora: 9, intl: 5, sangha: -4 }, pc: -1 },
        { t: 'Preisregulierung lockern, damit Importeure liefern',
          d: 'Höhere Preise sichern die Versorgung, belasten aber die Haushalte.',
          eff: { health: 5, inflation: 0.3, poverty: 0.3, privateSector: 4 },
          grp: { business: 8, unions: -8, sinhalaRural: -6 }, pc: -2 }
      ]
    },
    {
      id: 'ev_exam_results', cat: 'Gesellschaft', weight: 4,
      title: 'Prüfungsergebnisse zeigen wachsende Kluft',
      text: 'Die Ergebnisse der Abschlussprüfungen fallen im Hochland, im Norden und in ländlichen Distrikten deutlich schlechter aus als in Colombo. Der Unterschied hat sich seit der Krise vergrößert.',
      options: [
        { t: 'Förderprogramm für schwache Schulen',
          d: 'Zusätzliche Lehrkräfte, Nachhilfe und Lernmaterial in den betroffenen Distrikten.',
          fiscal: { exp: 26 }, eff: { education: 7, regionalBalance: 5, inequality: -0.6, trustHill: 5 },
          grp: { malaiyaha: 10, tamilNE: 8, sinhalaRural: 7, unions: 5 }, pc: -1 },
        { t: 'Prüfungssystem grundlegend überarbeiten',
          d: 'Weniger Auswendiglernen, mehr Anwendung und Projektarbeit.',
          fiscal: { exp: 12 }, eff: { education: 6, skillsMatch: 7 },
          grp: { youth: 8, business: 6, unions: -5 }, pc: -3 },
        { t: 'Ergebnisse zur Kenntnis nehmen',
          d: 'Keine gesonderte Maßnahme.',
          eff: { education: -2, inequality: 0.3 }, grp: { malaiyaha: -5, tamilNE: -4 }, pc: 0 }
      ]
    },
    {
      id: 'ev_press_case', cat: 'Gesellschaft', weight: 4,
      title: 'Journalistin nach kritischem Bericht verhört',
      text: 'Eine Reporterin, die über Beschaffungsvorgänge im Verteidigungsressort berichtet hat, wurde von der Kriminalpolizei stundenlang befragt. Presseverbände sprechen von Einschüchterung.',
      options: [
        { t: 'Vorgang öffentlich missbilligen und einstellen lassen',
          d: 'Klare Ansage an die Behörden, Verfahren wird eingestellt.',
          eff: { pressFree: 12, legitimacy: 6, corruption: 3, internalSec: -2 },
          grp: { youth: 10, sinhalaUrban: 9, intl: 8, military: -6 }, pc: -2 },
        { t: 'Auf laufende Ermittlungen verweisen',
          d: 'Keine Stellungnahme, Verweis auf die Unabhängigkeit der Polizei.',
          eff: { pressFree: -6, legitimacy: -4 },
          grp: { youth: -7, sinhalaUrban: -6, intl: -5 }, pc: 0 },
        { t: 'Quellenschutz gesetzlich verankern',
          d: 'Ein Gesetz, das Journalisten vor Offenlegungspflichten schützt.',
          fiscal: { exp: 2 }, eff: { pressFree: 15, ruleOfLaw: 6, corruption: 4 },
          grp: { youth: 11, sinhalaUrban: 10, intl: 9, military: -8 }, pc: -4 }
      ]
    },
    {
      id: 'ev_drug_bust', cat: 'Gesellschaft', weight: 4,
      title: 'Große Drogenlieferung vor der Küste abgefangen',
      text: 'Die Marine stellt mehrere hundert Kilogramm Heroin und Methamphetamin sicher. Die Ermittlungen deuten auf Verbindungen zu Personen mit politischem Rückhalt.',
      options: [
        { t: 'Ermittlungen ohne Rücksicht führen lassen',
          d: 'Sonderermittlungsgruppe mit Zugang zu allen Akten.',
          eff: { internalSec: 8, corruption: 7, ruleOfLaw: 6 },
          grp: { youth: 9, sinhalaUrban: 8, intl: 6, publicSector: -4 }, pc: -3 },
        { t: 'Massenrazzien in Wohnvierteln anordnen',
          d: 'Breit angelegte Polizeieinsätze wie bei früheren Kampagnen.',
          eff: { internalSec: 3, ruleOfLaw: -8, pressFree: -5, health: -3 },
          grp: { sinhalaRural: 7, military: 5, youth: -9, muslim: -7, intl: -7 }, pc: -1 },
        { t: 'Auf Entzugs- und Präventionsangebote setzen',
          d: 'Ausbau der Behandlung statt weiterer Festnahmen.',
          fiscal: { exp: 14 }, eff: { health: 6, internalSec: 4, ruleOfLaw: 4 },
          grp: { youth: 8, unions: 4, sangha: -5, sinhalaRural: -4 }, pc: -2 }
      ]
    },
    {
      id: 'ev_plantation_strike', cat: 'Gesellschaft', weight: 4,
      cond: function (s) { return s.approval.malaiyaha < 45; },
      title: 'Streik auf den Teeplantagen',
      text: 'Zehntausende Pflückerinnen legen die Arbeit nieder und fordern den zugesagten Tageslohn. Die Plantagengesellschaften verweisen auf Weltmarktpreise und drohen mit Flächenstilllegungen.',
      options: [
        { t: 'Gesetzlichen Mindesttagelohn durchsetzen',
          d: 'Der Staat setzt den Lohn fest, unabhängig von den Tarifverhandlungen.',
          fiscal: { exp: 8 }, eff: { trustHill: 16, poverty: -0.6, privateSector: -4, casteEquity: 4 },
          grp: { malaiyaha: 20, unions: 12, business: -12 }, pc: -3 },
        { t: 'Vermitteln und Kompromiss suchen',
          d: 'Schlichtung mit einer moderaten Erhöhung und Produktivitätszusagen.',
          fiscal: { exp: 3 }, eff: { trustHill: 6, poverty: -0.2 },
          grp: { malaiyaha: 8, unions: 5, business: -3 }, pc: -2 },
        { t: 'Streik als Angelegenheit der Tarifparteien behandeln',
          d: 'Keine staatliche Einmischung.',
          eff: { trustHill: -10, casteEquity: -3 },
          grp: { malaiyaha: -14, unions: -8, business: 6 }, pc: 0 }
      ]
    },
    {
      id: 'ev_pc_election_result', cat: 'Innenpolitik', weight: 0, hidden: true,
      title: 'Ergebnisse der Provinzratswahlen',
      text: 'Zum ersten Mal seit 2013 sind alle neun Provinzräte gewählt. Die Beteiligung war hoch, besonders im Norden und Osten.',
      options: [
        { t: 'Zusammenarbeit mit allen Provinzräten suchen',
          d: 'Regelmäßige Konferenz von Zentralregierung und Provinzen, auch mit oppositionell geführten.',
          eff: { legitimacy: 8, regionalBalance: 6, trustTamil: 8, stateCap: 3 },
          grp: { tamilNE: 10, malaiyaha: 6, muslim: 6, intl: 6 }, pc: -3 },
        { t: 'Gouverneure als Gegengewicht einsetzen',
          d: 'Die vom Präsidenten ernannten Gouverneure behalten weitreichende Befugnisse.',
          eff: { legitimacy: -6, trustTamil: -10, reconcile: -6, stateCap: 2 },
          grp: { tamilNE: -12, muslim: -6, sinhalaRural: 4, intl: -6 }, pc: -2 }
      ]
    }
  ];

  E.BY_ID = {};
  E.EVENTS.forEach(function (e) { E.BY_ID[e.id] = e; });

})(SL.data.events = SL.data.events || {});
