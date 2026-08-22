/* ============================================================
   MASSNAHMEN  -  Judikative, Justizministerium, Integrität
   fiscal.rev / fiscal.exp in LKR Mrd. pro Jahr
   risks: strukturelle Hindernisse, die die Wirkung dämpfen
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Judikative ---------- */
    {
      id: 'ju_court_capacity', cat: 'justice', sub: 'Judikative',
      title: 'Richterstellen und Gerichtsgebäude ausbauen',
      desc: 'Rund 120 zusätzliche Richterstellen an den Magistrates- und District Courts, dazu Gerichtssäle, Schreibkräfte und Archive. Sri Lanka hat im regionalen Vergleich auffallend wenige Richterinnen und Richter je Einwohner, und die vorhandenen sitzen in Gebäuden aus der Kolonialzeit.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 16, lag: 4,
      fiscal: { exp: 14 }, oneoff: 22,
      eff: { ruleOfLaw: 9, stateCap: 4, corruption: 3, privateSector: 3 },
      grp: { business: 5, sinhalaUrban: 4, youth: 3, publicSector: 3 },
      risk: 'Neue Stellen ohne bessere Verfahrensabläufe verlängern nur die Warteschlange an anderer Stelle.',
      tags: ['Justiz', 'Kapazität']
    },
    {
      id: 'ju_case_management', cat: 'justice', sub: 'Judikative',
      title: 'Elektronische Aktenführung und Terminverwaltung',
      desc: 'Schluss mit handschriftlichen Sitzungsprotokollen. Digitale Akte, automatische Ladungen, Terminplanung nach Verfahrensalter statt nach Zuruf, öffentlich einsehbare Verfahrensstände. Der größte Einzelhebel gegen den Verfahrensstau.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 12, lag: 4,
      fiscal: { exp: 6 }, oneoff: 30,
      eff: { ruleOfLaw: 11, digitalGov: 8, corruption: 5, stateCap: 5, privateSector: 3 },
      grp: { business: 6, sinhalaUrban: 5, youth: 4, publicSector: -2 },
      risk: 'Digitalisierungsvorhaben im srilankischen Staatsdienst sind schon mehrfach an Widerstand aus der Verwaltung gescheitert.',
      tags: ['Justiz', 'Digitalisierung']
    },
    {
      id: 'ju_commercial_courts', cat: 'justice', sub: 'Judikative',
      title: 'Handelsgerichte mit verbindlichen Fristen',
      desc: 'Eigene Kammern für Wirtschaftssachen mit gesetzlicher Höchstdauer, spezialisierten Richtern und beschleunigter Vollstreckung. Vertragsdurchsetzung ist einer der Gründe, warum ausländische Investoren Sri Lanka meiden.',
      party: ['SJB', 'NDF', 'NPP'], need: 'simple', pc: 14, lag: 4,
      fiscal: { exp: 5 }, oneoff: 12,
      eff: { ruleOfLaw: 7, privateSector: 8, fdi: 0.35, corruption: 2 },
      grp: { business: 9, intl: 5, sinhalaUrban: 3, unions: -2 },
      risk: 'Schnelle Gerichte für Unternehmen, langsame für alle anderen: das wird als Zweiklassenjustiz kritisiert werden.',
      risks: ['court_backlog'],
      tags: ['Justiz', 'Wirtschaft']
    },
    {
      id: 'ju_judicial_appointments', cat: 'justice', sub: 'Judikative',
      title: 'Richterernennung an feste Kriterien binden',
      desc: 'Ernennungen zum Obersten Gerichtshof und zum Court of Appeal nur auf Vorschlag der Judicial Service Commission, mit veröffentlichten Kriterien und Anhörung im Verfassungsrat. Beendet die Praxis, Spitzenposten nach politischer Nähe zu vergeben.',
      party: ['NPP', 'SJB', 'FSP'], need: 'twothirds', pc: 24, lag: 3,
      fiscal: {},
      eff: { ruleOfLaw: 12, corruption: 6, legitimacy: 7, stateCap: 2 },
      grp: { sinhalaUrban: 7, youth: 6, intl: 7, business: 4, tamilNE: 4 },
      risk: 'Sie geben eine Personalhoheit ab, die jede Regierung vor Ihnen genutzt hat.',
      req: ['st_commissions'],
      tags: ['Justiz', 'Unabhängigkeit']
    },
    {
      id: 'ju_judge_pay', cat: 'justice', sub: 'Judikative',
      title: 'Richterbesoldung anheben, Nebeneinkünfte verbieten',
      desc: 'Deutlich höhere Grundbezüge, dafür ein striktes Verbot von Nebentätigkeiten und ein Wechselverbot in politische Ämter für drei Jahre nach Amtsende. Schlecht bezahlte Richter sind angreifbare Richter.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 12, lag: 2,
      fiscal: { exp: 9 },
      eff: { ruleOfLaw: 7, corruption: 5, stateCap: 2 },
      grp: { publicSector: 4, business: 3, sinhalaUrban: 2, unions: -3 },
      risk: 'Höhere Gehälter für Richter, während Lehrerinnen und Pflegekräfte auf ihre Anpassung warten: das erklärt sich schlecht.',
      tags: ['Justiz', 'Integrität']
    },
    {
      id: 'ju_court_interpreters', cat: 'justice', sub: 'Judikative',
      title: 'Verfahren in der eigenen Sprache sicherstellen',
      desc: 'Feste Dolmetscherstellen an allen Gerichten, tamilischsprachige Verfahren im Norden und Osten, Urteile in der Verfahrenssprache. Nach der Verfassung ist Tamilisch Amtssprache, vor Gericht ist es das vielerorts bis heute nicht.',
      party: ['ITAK', 'SLMC', 'NPP', 'CWC'], need: 'simple', pc: 11, lag: 3,
      fiscal: { exp: 4 }, oneoff: 6,
      eff: { langAccess: 14, ruleOfLaw: 6, trustTamil: 7, trustMuslim: 5, reconcile: 5 },
      grp: { tamilNE: 10, malaiyaha: 8, muslim: 7, intl: 4, sinhalaRural: -3 },
      risk: 'Sprachenrechte vor Gericht gelten manchen als Einfallstor für Separatismus.',
      tags: ['Justiz', 'Sprache']
    },
    {
      id: 'ju_judicial_review', cat: 'justice', sub: 'Judikative',
      title: 'Nachträgliche Normenkontrolle einführen',
      desc: 'Bisher können Gesetze nur innerhalb einer Woche nach Vorlage im Parlament auf Verfassungsmäßigkeit geprüft werden. Danach sind sie unangreifbar, egal wie sie sich auswirken. Künftig soll jedes Gericht eine Vorlage an den Obersten Gerichtshof richten können.',
      party: ['SJB', 'NPP', 'ITAK', 'TNPF'], need: 'twothirds', pc: 30, lag: 4,
      fiscal: { exp: 2 },
      eff: { ruleOfLaw: 14, legitimacy: 8, corruption: 3, religFree: 5, stateCap: -3 },
      grp: { sinhalaUrban: 7, youth: 6, tamilNE: 8, muslim: 7, intl: 8, sangha: -5 },
      risk: 'Ihre eigenen Gesetze werden angreifbar. Auch die, an denen Ihnen liegt.',
      tags: ['Justiz', 'Verfassung']
    },
    {
      id: 'ju_small_claims', cat: 'justice', sub: 'Rechtszugang',
      title: 'Schlichtungsstellen und Bagatellverfahren ausbauen',
      desc: 'Die Mediation Boards gibt es seit 1988 in jedem Wahlkreis, sie sind unterfinanziert und wenig bekannt. Ausbau auf Kommunalebene, verbindliche Vorschaltung bei Nachbarschafts-, Miet- und Kleinforderungssachen.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 8, lag: 3,
      fiscal: { exp: 3 }, oneoff: 4,
      eff: { ruleOfLaw: 6, stateCap: 3, casteEquity: 3 },
      grp: { sinhalaRural: 5, farmers: 4, malaiyaha: 3, youth: 2 },
      risk: 'In Dorfstrukturen setzen sich in Schlichtungsverfahren oft die durch, die ohnehin schon Einfluss haben.',
      risks: ['no_local_capacity'],
      tags: ['Justiz', 'Rechtszugang']
    },

    /* ---------- Justizministerium ---------- */
    {
      id: 'ju_legal_draftsman', cat: 'justice', sub: 'Justizministerium',
      title: 'Gesetzgebungsabteilung personell verstärken',
      desc: 'Das Legal Draftsman\'s Department ist der Flaschenhals der gesamten Gesetzgebung: jeder Entwurf muss dort durch, und dort sitzen zu wenige Leute. Verdopplung der Stellen, Fachreferate für Steuer-, Umwelt- und Wirtschaftsrecht.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 6, lag: 2,
      fiscal: { exp: 3 },
      eff: { stateCap: 8, ruleOfLaw: 4, digitalGov: 2 },
      grp: { publicSector: 3, business: 3, intl: 2 },
      risk: 'Unspektakulär. Niemand gewinnt damit eine Wahl, aber ohne diese Abteilung bleibt jede Reform Entwurf.',
      tags: ['Verwaltung', 'Kapazität']
    },
    {
      id: 'ju_law_commission', cat: 'justice', sub: 'Justizministerium',
      title: 'Rechtsbereinigung: Kolonialrecht aufräumen',
      desc: 'Ein Teil des geltenden Rechts stammt aus dem 19. Jahrhundert, teils auf Englisch, teils nie übersetzt, teils längst überholt. Eine Kommission sichtet den Bestand, hebt Totes auf und konsolidiert den Rest in einer amtlichen Sammlung in allen drei Sprachen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 9, lag: 5,
      fiscal: { exp: 2 }, oneoff: 8,
      eff: { ruleOfLaw: 7, stateCap: 5, langAccess: 6, digitalGov: 3 },
      grp: { business: 4, sinhalaUrban: 3, tamilNE: 3, intl: 3 },
      risk: 'Beim Aufräumen fällt auf, wie viele Bestimmungen bewusst vage gehalten wurden. Nicht alle wollen das ändern.',
      tags: ['Justiz', 'Verwaltung']
    },
    {
      id: 'ju_court_stats', cat: 'justice', sub: 'Justizministerium',
      title: 'Justizstatistik öffentlich machen',
      desc: 'Verfahrensdauer, Erledigungsquoten und Rückstände je Gericht werden quartalsweise veröffentlicht. Wer messen kann, wo es hakt, kann steuern. Und Öffentlichkeit wirkt auf säumige Kammern besser als jede Dienstaufsicht.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 5, lag: 2,
      fiscal: { exp: 1 },
      eff: { ruleOfLaw: 5, digitalGov: 4, corruption: 3, stateCap: 3, pressFree: 3 },
      grp: { sinhalaUrban: 4, intl: 4, business: 3, publicSector: -3 },
      risk: 'Die ersten Zahlen werden schlecht aussehen, und sie werden Ihnen zugerechnet.',
      tags: ['Transparenz']
    },

    /* ---------- Strafvollzug ---------- */
    {
      id: 'ju_bail_reform', cat: 'justice', sub: 'Strafvollzug',
      title: 'Untersuchungshaft begrenzen, Kautionsrecht reformieren',
      desc: 'Die Gefängnisse sind zu deutlich mehr als dem Doppelten ihrer Kapazität belegt, und die Mehrheit der Insassen ist nicht verurteilt, sondern wartet auf ein Verfahren. Höchstdauer der Untersuchungshaft, Regelvermutung für Haftverschonung bei leichteren Delikten.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 14, lag: 3,
      fiscal: { exp: -3 },
      eff: { ruleOfLaw: 9, internalSec: -3, casteEquity: 4, legitimacy: 3 },
      grp: { youth: 6, sinhalaUrban: 4, malaiyaha: 4, tamilNE: 4, intl: 5, sinhalaRural: -4 },
      risk: 'Wenn ein Freigelassener eine Straftat begeht, steht es am nächsten Tag auf allen Titelseiten und wird Ihnen persönlich angelastet.',
      risks: ['court_backlog'],
      tags: ['Strafvollzug', 'Menschenrechte']
    },
    {
      id: 'ju_prison_reform_deep', cat: 'justice', sub: 'Strafvollzug',
      title: 'Haftplätze sanieren und Resozialisierung aufbauen',
      desc: 'Neubau und Sanierung von Anstalten, getrennte Unterbringung von Untersuchungs- und Strafgefangenen, Ausbildungsangebote, Suchtbehandlung. Sri Lankas Rückfallquoten sind hoch, weil Haft hier fast nichts anderes ist als Verwahrung.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 12, lag: 5,
      fiscal: { exp: 8 }, oneoff: 26,
      eff: { internalSec: 6, ruleOfLaw: 5, health: 2, casteEquity: 3 },
      grp: { intl: 5, youth: 3, sinhalaUrban: 3, sinhalaRural: -2 },
      risk: 'Geld für Gefängnisse ist der unbeliebteste Haushaltsposten überhaupt.',
      tags: ['Strafvollzug']
    },
    {
      id: 'ju_probation', cat: 'justice', sub: 'Strafvollzug',
      title: 'Bewährungshilfe statt kurzer Freiheitsstrafen',
      desc: 'Gemeinnützige Arbeit, Bewährungsaufsicht und Auflagen ersetzen Haftstrafen unter sechs Monaten. Entlastet die Anstalten, ist billiger und wirkt gegen Rückfall besser als ein halbes Jahr in einer überfüllten Zelle.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 9, lag: 3,
      fiscal: { exp: 2 },
      eff: { internalSec: 4, ruleOfLaw: 4, casteEquity: 3, stateCap: 2 },
      grp: { youth: 5, intl: 4, sinhalaUrban: 3, sinhalaRural: -3 },
      risk: 'Wird als Nachsicht gegenüber Straftätern ausgelegt werden.',
      tags: ['Strafvollzug']
    },

    /* ---------- Integrität und Korruption ---------- */
    {
      id: 'ju_ciaboc_strengthen', cat: 'justice', sub: 'Korruption',
      title: 'Antikorruptionskommission verselbständigen',
      desc: 'Die CIABOC bekommt nach dem Antikorruptionsgesetz von 2023 eigene Ermittler, Finanzforensiker und ein Budget direkt aus dem Konsolidierten Fonds, das die Regierung nicht jährlich kürzen kann. Ohne das bleibt sie eine Beschwerdestelle mit Briefkopf.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 18, lag: 3,
      fiscal: { exp: 7 }, oneoff: 9,
      eff: { corruption: 13, ruleOfLaw: 8, stateCap: 4, legitimacy: 6, taxCompl: 4 },
      grp: { youth: 9, sinhalaUrban: 8, intl: 8, business: 4, publicSector: -5 },
      risk: 'Eine wirklich unabhängige Kommission ermittelt irgendwann auch gegen Ihre eigenen Leute.',
      tags: ['Antikorruption', 'Wahlversprechen', 'Schlüsselmaßnahme']
    },
    {
      id: 'ju_independent_dpp', cat: 'justice', sub: 'Korruption',
      title: 'Anklagebehörde vom Generalstaatsanwalt trennen',
      desc: 'Das Attorney General\'s Department berät die Regierung und erhebt zugleich Anklage. Ist die Regierung selbst betroffen, prüft es sich damit faktisch selbst. Eine eigenständige Behörde für die Strafverfolgung, mit festem Amtsinhaber und eigener Personalhoheit, löst den Konflikt auf.',
      party: ['NPP', 'SJB', 'FSP'], need: 'twothirds', pc: 26, lag: 4,
      fiscal: { exp: 6 }, oneoff: 10,
      eff: { corruption: 11, ruleOfLaw: 13, legitimacy: 7, stateCap: 2 },
      grp: { sinhalaUrban: 8, youth: 8, intl: 9, tamilNE: 5, business: 4, military: -4 },
      risk: 'Sie verlieren jede Möglichkeit, ein Verfahren gegen Ihre eigene Seite zu bremsen. Auch ein politisch motiviertes.',
      tags: ['Antikorruption', 'Justiz', 'Schlüsselmaßnahme']
    },
    {
      id: 'ju_judicial_integrity', cat: 'justice', sub: 'Korruption',
      title: 'Verhaltenskodex und Vermögenserklärung für Richter',
      desc: 'Verbindlicher Verhaltenskodex, jährliche Vermögenserklärung gegenüber der Judicial Service Commission, ein geordnetes Disziplinarverfahren und eine Beschwerdestelle für Verfahrensbeteiligte.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 13, lag: 3,
      fiscal: { exp: 1 },
      eff: { corruption: 7, ruleOfLaw: 8, legitimacy: 4 },
      grp: { sinhalaUrban: 5, youth: 4, intl: 5, business: 3 },
      risk: 'Die Richterschaft wird das als Eingriff in ihre Unabhängigkeit zurückweisen. Teilweise zu Recht.',
      tags: ['Antikorruption', 'Justiz']
    },
    {
      id: 'ju_customs_integrity', cat: 'justice', sub: 'Korruption',
      title: 'Zoll: Rotation, Vermögensprüfung, Risikoauswahl',
      desc: 'Pflichtrotation auf allen Abfertigungsposten, jährliche Vermögensprüfung für Zollbedienstete, computergestützte Risikoauswahl statt Ermessen bei der Kontrolle, Kameras an allen Abfertigungslinien und eine interne Revision, die dem Ministerium und nicht der Behördenleitung berichtet.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 20, lag: 4,
      fiscal: { rev: 95, exp: 5 }, oneoff: 8,
      eff: { corruption: 12, taxCompl: 9, ruleOfLaw: 6, privateSector: 5, stateCap: 4, exports: 2 },
      grp: { business: 8, intl: 6, sinhalaUrban: 5, youth: 4, publicSector: -9 },
      risk: 'Der Zoll ist gut organisiert und hat Verbündete im Parlament. Erwarten Sie Dienst nach Vorschrift an den Häfen, genau dann, wenn es am meisten schadet.',
      tags: ['Antikorruption', 'Einnahmen', 'Schlüsselmaßnahme']
    },
    {
      id: 'ju_single_window', cat: 'justice', sub: 'Korruption',
      title: 'Digitales Handelsfenster für den gesamten Außenhandel',
      desc: 'Ein einziges elektronisches Portal für alle Einfuhr- und Ausfuhrgenehmigungen, über alle beteiligten Behörden hinweg, mit nachvollziehbaren Bearbeitungszeiten. Wo kein Schalter mehr ist, gibt es auch nichts mehr über den Schalter zu schieben.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 14, lag: 5,
      fiscal: { rev: 70, exp: 4 }, oneoff: 24,
      eff: { corruption: 9, digitalGov: 11, privateSector: 7, exports: 4, taxCompl: 6, fdi: 0.25 },
      grp: { business: 10, intl: 6, youth: 3, publicSector: -6 },
      risk: 'Ein IT-Vorhaben dieser Größe in fünf Quartalen ist ambitioniert. Vergleichbare Projekte sind hier schon gescheitert.',
      tags: ['Antikorruption', 'Digitalisierung', 'Handel']
    },
    {
      id: 'ju_beneficial_owners', cat: 'justice', sub: 'Korruption',
      title: 'Register der wirtschaftlich Berechtigten',
      desc: 'Wer hinter einer Gesellschaft wirklich steht, wird eintragungspflichtig und für Behörden, Banken und Journalisten einsehbar. Voraussetzung dafür, Scheinfirmen bei öffentlichen Aufträgen und bei der Vermögensbesteuerung überhaupt zu erkennen.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 15, lag: 4,
      fiscal: { rev: 30, exp: 2 }, oneoff: 7,
      eff: { corruption: 9, taxCompl: 7, ruleOfLaw: 5, digitalGov: 4 },
      grp: { intl: 7, youth: 5, sinhalaUrban: 5, business: -5 },
      risk: 'Ein Teil der Wirtschaft, auch ein Teil Ihrer Geldgeber, hat gute Gründe, anonym zu bleiben.',
      tags: ['Antikorruption', 'Transparenz']
    },
    {
      id: 'ju_soe_audit', cat: 'justice', sub: 'Korruption',
      title: 'Staatsbetriebe zu testierten Abschlüssen zwingen',
      desc: 'Jedes Staatsunternehmen legt binnen sechs Monaten nach Geschäftsjahresende einen geprüften Abschluss vor, sonst werden Vorstandsbezüge und Transfers gesperrt. Bei mehreren großen Betrieben fehlen testierte Zahlen seit Jahren, und ohne Zahlen ist jede Sanierung ein Blindflug.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 13, lag: 3,
      fiscal: { rev: 20, exp: 2 },
      eff: { corruption: 8, soeHealth: 9, stateCap: 5, digitalGov: 3, imfCompl: 4 },
      grp: { intl: 7, business: 6, sinhalaUrban: 4, unions: -6, publicSector: -5 },
      risk: 'Die ersten Abschlüsse werden offenlegen, wie schlecht es tatsächlich steht. Das wird teuer und unangenehm.',
      tags: ['Antikorruption', 'Staatsbetriebe']
    },
    {
      id: 'ju_political_finance_audit', cat: 'justice', sub: 'Korruption',
      title: 'Parteifinanzen vom Rechnungshof prüfen lassen',
      desc: 'Alle Parteien legen geprüfte Jahresrechnungen vor, der Auditor General prüft, die Wahlkommission veröffentlicht. Verstöße führen zur Streichung staatlicher Mittel und im Wiederholungsfall zum Verlust der Registrierung.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 16, lag: 3,
      fiscal: { exp: 1 },
      eff: { corruption: 8, legitimacy: 6, ruleOfLaw: 4, pressFree: 2 },
      grp: { youth: 7, sinhalaUrban: 6, intl: 5, business: -4 },
      risk: 'Sie legen auch Ihre eigene Kasse offen. Alle Parteien werden dagegen sein, auch die eigene.',
      req: ['st_campaign_finance'],
      tags: ['Antikorruption', 'Transparenz']
    },
    {
      id: 'ju_land_titles_complete', cat: 'justice', sub: 'Rechtszugang',
      title: 'Titelregistrierung Bim Saviya zu Ende bringen',
      desc: 'Das 1998 begonnene Programm zur Umstellung von Urkunden- auf Titelregistrierung deckt nach über zwei Jahrzehnten nur einen Bruchteil der Grundstücke ab. Vollständige Vermessung, digitales Kataster, beschleunigte Streitschlichtung, vorrangig im Norden und Osten und im Plantagensektor.',
      party: ['NPP', 'SJB', 'ITAK', 'CWC'], need: 'simple', pc: 19, lag: 6,
      fiscal: { rev: 25, exp: 9 }, oneoff: 34,
      eff: { ruleOfLaw: 9, housing: 7, privateSector: 5, casteEquity: 5, trustTamil: 6, trustHill: 8, agriProd: 4, taxCompl: 4 },
      grp: { farmers: 8, malaiyaha: 10, tamilNE: 7, business: 5, sinhalaRural: 4 },
      risk: 'Jede Vermessung legt einen Streit offen, der jahrzehntelang ruhte. Rechnen Sie mit Konflikten in jedem zweiten Dorf.',
      tags: ['Land', 'Justiz', 'Schlüsselmaßnahme']
    }

  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
