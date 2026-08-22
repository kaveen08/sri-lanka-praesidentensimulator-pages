/* ============================================================
   MASSNAHMEN  -  Ethnie, Religion, Kaste, Sprache, Aufarbeitung
   Die Positionen bilden reale politische Forderungen aus Sri Lanka
   ab, von tamilisch-föderalistisch bis sinhalesisch-nationalistisch.
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Sprache ---------- */
    {
      id: 'id_lang_enforce', cat: 'identity', sub: 'Sprache',
      title: 'Zweisprachigkeit in allen Behörden durchsetzen',
      desc: 'Der 13. Verfassungszusatz machte Tamilisch 1987 zur Amtssprache. Vierzig Jahre später kann ein Bürger in vielen Ämtern des Südens kein tamilisches Formular bekommen. Verbindliche Fristen, Sprachprüfungen für Beförderungen, Sanktionen bei Verstößen.',
      party: ['NPP', 'SJB', 'ITAK', 'SLMC'], need: 'simple', pc: 14, lag: 4,
      fiscal: { exp: 18 }, oneoff: 12,
      eff: { langAccess: 18, reconcile: 8, trustTamil: 9, trustMuslim: 6, trustHill: 6, stateCap: 3, sinhalaPress: 5 },
      grp: { tamilNE: 12, malaiyaha: 10, muslim: 8, publicSector: -4, sinhalaRural: -3 },
      risk: 'Ohne genügend zweisprachige Beamte bleibt es Papier. Der Engpass ist Personal, nicht Recht.',
      tags: ['Sprache', 'Verwaltung']
    },
    {
      id: 'id_lang_police', cat: 'identity', sub: 'Sprache',
      title: 'Tamilischsprachige Polizisten gezielt rekrutieren',
      desc: 'Im Norden und Osten spricht ein großer Teil der stationierten Polizei kein Tamilisch. Wer eine Anzeige nicht in seiner Sprache aufgeben kann, zeigt irgendwann nichts mehr an. Zielgröße: 6.000 zusätzliche tamilischsprachige Beamte in vier Jahren.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'exec', pc: 10, lag: 5,
      fiscal: { exp: 22 },
      eff: { langAccess: 12, trustTamil: 11, internalSec: 5, reconcile: 6, ruleOfLaw: 4 },
      grp: { tamilNE: 13, muslim: 6, malaiyaha: 4, sinhalaRural: -2 },
      risk: 'Rekrutierung dauert Jahre. Die Wirkung kommt spät, der Widerstand sofort.',
      tags: ['Sprache', 'Polizei']
    },
    {
      id: 'id_lang_anthem', cat: 'identity', sub: 'Sprache',
      title: 'Nationalhymne offiziell auch auf Tamilisch',
      desc: 'Die tamilische Fassung der Hymne wurde 2016 wieder bei Staatsfeiern gesungen, 2020 erneut zurückgedrängt. Eine gesetzliche Klarstellung beendet den Streit in beide Richtungen.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 12, lag: 1,
      fiscal: {},
      eff: { reconcile: 7, trustTamil: 8, sinhalaPress: 9, langAccess: 4 },
      grp: { tamilNE: 9, malaiyaha: 6, diaspora: 6, sangha: -8, sinhalaRural: -6 },
      risk: 'Symbolpolitik kostet fast nichts und erregt trotzdem die Gemüter maximal.',
      tags: ['Sprache', 'Symbolik']
    },
    {
      id: 'id_lang_placenames', cat: 'identity', sub: 'Sprache',
      title: 'Ortsschilder und Ortsnamen durchgängig dreisprachig',
      desc: 'Nach dem Krieg wurden im Norden und Osten tamilische Ortsnamen vielerorts durch sinhalesische ersetzt. Künftig gelten die historischen Namen in allen drei Sprachen nebeneinander.',
      party: ['ITAK', 'SLMC', 'SJB'], need: 'exec', pc: 11, lag: 3,
      fiscal: { exp: 4 }, oneoff: 7,
      eff: { langAccess: 7, trustTamil: 8, reconcile: 5, sinhalaPress: 8 },
      grp: { tamilNE: 9, muslim: 5, sangha: -6, sinhalaRural: -5, military: -3 },
      risk: 'Örtliche Auseinandersetzungen um einzelne Schilder sind fast garantiert.',
      tags: ['Sprache', 'Symbolik']
    },
    {
      id: 'id_lang_courts', cat: 'identity', sub: 'Sprache',
      title: 'Gerichtsverfahren in der Sprache der Betroffenen',
      desc: 'Vollständige Übersetzung von Anklageschriften, Urteilen und Verhandlungen, ausreichend Dolmetscher an allen Gerichten in Nord und Ost. Bislang werden Verfahren regelmäßig in einer Sprache geführt, die der Angeklagte nicht versteht.',
      party: ['ITAK', 'SJB', 'NPP'], need: 'simple', pc: 9, lag: 3,
      fiscal: { exp: 9 },
      eff: { ruleOfLaw: 7, langAccess: 9, trustTamil: 8, reconcile: 4 },
      grp: { tamilNE: 9, muslim: 6, intl: 4 },
      risk: 'Verfahren dauern länger. Die Justiz ist ohnehin überlastet.',
      tags: ['Sprache', 'Justiz']
    },

    /* ---------- Religion ---------- */
    {
      id: 'id_article9_remove', cat: 'identity', sub: 'Religion',
      title: 'Vorrangstellung des Buddhismus aus der Verfassung streichen',
      desc: 'Artikel 9 verpflichtet den Staat, dem Buddhismus den vordersten Platz zu geben. Eine Streichung würde alle Religionen formal gleichstellen. Artikel 9 ist durch Artikel 83 geschützt und damit nur mit Volksabstimmung änderbar.',
      party: ['TNPF'], need: 'referendum', pc: 65, lag: 6,
      fiscal: {},
      eff: { religFree: 20, reconcile: 12, trustTamil: 12, trustMuslim: 16, sinhalaPress: 34 },
      grp: { muslim: 18, christian: 14, tamilNE: 12, diaspora: 10, sangha: -35, sinhalaRural: -22, military: -8 },
      risk: 'Der Sangha wird geschlossen mobilisieren. Eine verlorene Volksabstimmung kann Ihre Präsidentschaft beenden.',
      tags: ['Religion', 'Hochrisiko'], excl: ['id_article9_strengthen']
    },
    {
      id: 'id_article9_strengthen', cat: 'identity', sub: 'Religion',
      title: 'Schutz des Buddhismus ausbauen',
      desc: 'Zusätzliche staatliche Mittel für Tempel und buddhistische Bildungseinrichtungen, verbindliche Anhörung des Sangha bei Gesetzen mit religiösem Bezug, stärkerer Schutz buddhistischer Stätten im Norden und Osten.',
      party: ['SLPP', 'SB'], need: 'simple', pc: 12, lag: 2,
      fiscal: { exp: 24 },
      eff: { religFree: -12, reconcile: -10, trustTamil: -10, trustMuslim: -9, sinhalaPress: -14 },
      grp: { sangha: 20, sinhalaRural: 12, military: 5, muslim: -14, tamilNE: -13, christian: -10, intl: -6 },
      risk: 'Festigt Ihre Position im Süden und verschließt gleichzeitig die Tür nach Norden.',
      tags: ['Religion', 'Nationalismus'], excl: ['id_article9_remove', 'id_secular']
    },
    {
      id: 'id_secular', cat: 'identity', sub: 'Religion',
      title: 'Gleichbehandlung aller Religionsgemeinschaften gesetzlich verankern',
      desc: 'Ohne Artikel 9 anzutasten: einheitliche Regeln für Bau, Registrierung und Förderung religiöser Einrichtungen, gleiche Feiertagsregelungen, gleicher Zugang zu staatlichen Mitteln.',
      party: ['NPP', 'SJB', 'SLMC'], need: 'simple', pc: 18, lag: 3,
      fiscal: { exp: 8 },
      eff: { religFree: 12, reconcile: 6, trustMuslim: 10, sinhalaPress: 11 },
      grp: { muslim: 12, christian: 11, tamilNE: 5, sangha: -12, sinhalaRural: -6 },
      risk: 'Der pragmatische Mittelweg. Er wird von beiden Rändern als Verrat gelesen.',
      tags: ['Religion'], excl: ['id_article9_strengthen']
    },
    {
      id: 'id_cremation_redress', cat: 'identity', sub: 'Religion',
      title: 'Zwangseinäscherungen aufarbeiten und entschädigen',
      desc: '2020 und 2021 wurden muslimische Verstorbene entgegen religiöser Gebote und ohne wissenschaftliche Grundlage zwangsweise eingeäschert. Eine förmliche Entschuldigung des Staates, Entschädigung der Familien und ein gesetzliches Verbot für die Zukunft.',
      party: ['SLMC', 'SJB', 'NPP'], need: 'exec', pc: 10, lag: 2,
      fiscal: { exp: 4 }, oneoff: 9,
      eff: { religFree: 9, trustMuslim: 18, reconcile: 6, sinhalaPress: 6 },
      grp: { muslim: 22, christian: 6, tamilNE: 4, intl: 6, sangha: -5, sinhalaRural: -3 },
      risk: 'Kostet fast nichts und wirkt stark. Der Widerstand kommt von jenen, die die Entscheidung damals mitgetragen haben.',
      tags: ['Religion', 'Aufarbeitung']
    },
    {
      id: 'id_easter_probe', cat: 'identity', sub: 'Religion',
      title: 'Osteranschläge 2019 vollständig aufklären',
      desc: 'Über 260 Tote, ein Untersuchungsbericht, dessen Empfehlungen nie vollständig umgesetzt wurden, und ein katholischer Kardinal, der bis heute politische Verwicklungen behauptet. Eine unabhängige Kommission mit voller Akteneinsicht in Geheimdienstunterlagen.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 16, lag: 4,
      fiscal: { exp: 5 }, oneoff: 8,
      eff: { ruleOfLaw: 7, legitimacy: 8, religFree: 5, internalSec: 3 },
      grp: { christian: 22, muslim: 8, sinhalaUrban: 8, youth: 6, military: -8 },
      risk: 'Die Spur führt in Sicherheitsapparate, die noch immer im Dienst sind. Rechnen Sie mit Widerstand von innen.',
      tags: ['Religion', 'Aufarbeitung', 'Sicherheit']
    },
    {
      id: 'id_interfaith', cat: 'identity', sub: 'Religion',
      title: 'Ständigen interreligiösen Rat einrichten',
      desc: 'Vertreter der vier großen Religionsgemeinschaften beraten die Regierung verbindlich vor Gesetzen mit religiösem Bezug und vermitteln bei lokalen Konflikten.',
      party: ['SJB', 'SLMC', 'NPP'], need: 'exec', pc: 5, lag: 2,
      fiscal: { exp: 2 },
      eff: { religFree: 5, reconcile: 4, internalSec: 3 },
      grp: { sangha: 4, muslim: 5, christian: 5, tamilNE: 3 },
      risk: 'Kann echte Verständigung schaffen oder zum folgenlosen Gesprächskreis werden.',
      tags: ['Religion']
    },
    {
      id: 'id_archaeology_north', cat: 'identity', sub: 'Religion',
      title: 'Archäologiebehörde im Norden zurückbinden',
      desc: 'Im Norden und Osten werden über die Archäologiebehörde und den Forest Department Flächen als buddhistische Stätten ausgewiesen und dem Zugriff tamilischer Anwohner entzogen. Künftig entscheidet ein gemischtes Gremium unter Beteiligung der Provinz.',
      party: ['ITAK', 'TNPF'], need: 'exec', pc: 22, lag: 3,
      fiscal: {},
      eff: { trustTamil: 13, reconcile: 8, religFree: 6, sinhalaPress: 18 },
      grp: { tamilNE: 15, diaspora: 10, sangha: -18, sinhalaRural: -10, military: -6 },
      risk: 'Eine der emotionalsten Fragen überhaupt. Buddhistische Organisationen werden vor Gericht ziehen und auf die Straße gehen.',
      tags: ['Religion', 'Land', 'Hochrisiko']
    },

    /* ---------- Kaste ---------- */
    {
      id: 'id_caste_crime', cat: 'identity', sub: 'Kaste',
      title: 'Kastendiskriminierung ausdrücklich unter Strafe stellen',
      desc: 'Kaste gilt offiziell als überwunden und bestimmt trotzdem im Norden und im Plantagenhochland Zugang zu Tempeln, Friedhöfen, Brunnen und Heirat. Ein eigener Straftatbestand mit Beweislastumkehr, nach indischem Vorbild.',
      party: ['NPP', 'FSP', 'CWC'], need: 'simple', pc: 13, lag: 3,
      fiscal: { exp: 5 },
      eff: { casteEquity: 16, ruleOfLaw: 4, trustHill: 8, reconcile: 4 },
      grp: { malaiyaha: 14, tamilNE: 6, unions: 6, youth: 5 },
      risk: 'Innerhalb der tamilischen Gesellschaft ist das ein Tabuthema. Auch Ihre eigenen Verbündeten im Norden werden nicht alle begeistert sein.',
      tags: ['Kaste', 'Gleichstellung']
    },
    {
      id: 'id_caste_data', cat: 'identity', sub: 'Kaste',
      title: 'Kastenbezogene Benachteiligung systematisch erheben',
      desc: 'Ohne Daten keine Politik. Eine anonymisierte Erhebung zu Bildung, Beschäftigung, Landbesitz und Zugang zu öffentlichen Einrichtungen, aufgeschlüsselt nach Gemeinschaftszugehörigkeit.',
      party: ['NPP', 'CWC'], need: 'exec', pc: 6, lag: 3,
      fiscal: { exp: 3 }, oneoff: 4,
      eff: { casteEquity: 7, stateCap: 3 },
      grp: { malaiyaha: 7, tamilNE: 3, sinhalaRural: -2 },
      risk: 'Manche befürchten, dass die Erhebung Kastenidentität eher verfestigt als abbaut.',
      tags: ['Kaste', 'Daten']
    },
    {
      id: 'id_caste_temple', cat: 'identity', sub: 'Kaste',
      title: 'Gleicher Zugang zu Tempeln und Friedhöfen erzwingen',
      desc: 'Verwaltungsrechtliche Durchsetzung des gleichen Zugangs zu religiösen Einrichtungen und Bestattungsplätzen, mit Meldestelle und Bußgeldern für Trägervereine.',
      party: ['CWC', 'FSP'], need: 'simple', pc: 11, lag: 3,
      fiscal: { exp: 2 },
      eff: { casteEquity: 12, trustHill: 6, religFree: 4 },
      grp: { malaiyaha: 11, unions: 5, tamilNE: -3 },
      risk: 'Konflikte werden lokal ausgetragen, oft gegen die Polizei vor Ort.',
      tags: ['Kaste', 'Religion']
    },
    {
      id: 'id_caste_affirm', cat: 'identity', sub: 'Kaste',
      title: 'Förderprogramm für historisch benachteiligte Gemeinschaften',
      desc: 'Stipendien, Vorbereitungskurse und Einstellungsziele im öffentlichen Dienst für Gruppen mit nachweislich niedriger Repräsentation, gemessen an Bildungs- und Beschäftigungsdaten statt an Kastennamen.',
      party: ['CWC', 'NPP'], need: 'simple', pc: 15, lag: 4,
      fiscal: { exp: 14 },
      eff: { casteEquity: 13, education: 3, trustHill: 9, socialProt: 4 },
      grp: { malaiyaha: 13, tamilNE: 4, sinhalaRural: -5, sinhalaUrban: -3 },
      risk: 'Quotendebatten haben in Sri Lanka eine lange und konfliktreiche Geschichte, siehe die Standardisierungspolitik der 1970er Jahre.',
      tags: ['Kaste', 'Bildung']
    },

    /* ---------- Malaiyaha-Tamilen ---------- */
    {
      id: 'id_plantation_wage', cat: 'identity', sub: 'Plantagen',
      title: 'Verbindlicher Tageslohn von 1.700 LKR auf Plantagen',
      desc: 'Die Lohnfrage der Malaiyaha-Tamilen ist seit Jahrzehnten ungelöst. Ein gesetzlich festgelegter Mindesttagelohn statt freiwilliger Tarifvereinbarungen, die die Plantagengesellschaften regelmäßig vor Gericht anfechten.',
      party: ['CWC', 'FSP', 'NPP'], need: 'simple', pc: 16, lag: 2,
      fiscal: { exp: 8 },
      eff: { trustHill: 20, poverty: -1.1, casteEquity: 6, inequality: -1.2, privateSector: -4 },
      grp: { malaiyaha: 24, unions: 12, business: -12, farmers: -3 },
      risk: 'Plantagengesellschaften drohen mit Flächenstilllegung und Entlassungen. Ein Teil der Drohung ist real.',
      tags: ['Löhne', 'Plantagen']
    },
    {
      id: 'id_plantation_land', cat: 'identity', sub: 'Plantagen',
      title: 'Eigentumstitel statt Line Rooms',
      desc: 'Plantagenfamilien leben teils in Reihenunterkünften aus der Kolonialzeit, sieben Quadratmeter pro Familie, ohne Eigentum am Boden. Sieben Perch Land und ein Eigentumstitel pro Familie, verbunden mit einem Wohnbauprogramm.',
      party: ['CWC', 'SJB'], need: 'simple', pc: 20, lag: 6,
      fiscal: { exp: 26 }, oneoff: 40,
      eff: { housing: 12, trustHill: 22, casteEquity: 9, poverty: -0.8, health: 4 },
      grp: { malaiyaha: 26, unions: 8, business: -8 },
      risk: 'Die Flächen gehören formell den Plantagengesellschaften über langfristige Pachtverträge. Rechtsstreitigkeiten sind sicher.',
      tags: ['Land', 'Wohnen', 'Plantagen']
    },
    {
      id: 'id_plantation_fund', cat: 'identity', sub: 'Plantagen',
      title: 'Eigener Entwicklungsfonds für das Plantagenhochland',
      desc: 'Zweckgebundene Mittel für Schulen, Gesundheitsstationen, Wasserversorgung und Straßen in den Plantagengebieten von Nuwara Eliya, Badulla und Ratnapura, verwaltet mit Beteiligung der Gemeinschaft.',
      party: ['CWC', 'SJB', 'NPP'], need: 'simple', pc: 10, lag: 4,
      fiscal: { exp: 20 },
      eff: { trustHill: 15, regionalBalance: 6, education: 3, health: 3, housing: 5 },
      grp: { malaiyaha: 18, unions: 5, sinhalaRural: -3 },
      risk: 'Zweckbindung wirkt nur, wenn die Mittelverwendung transparent ist.',
      tags: ['Regional', 'Plantagen']
    },
    {
      id: 'id_stateless', cat: 'identity', sub: 'Plantagen',
      title: 'Verbleibende Staatenlosigkeit endgültig beseitigen',
      desc: 'Die Entrechtung von 1948 wurde in mehreren Schritten korrigiert, doch einzelne Familien und deren Nachkommen haben bis heute keine vollständigen Papiere. Ein Verfahren mit Beweiserleichterung und mobilen Registrierungsteams.',
      party: ['CWC', 'SJB', 'NPP'], need: 'simple', pc: 7, lag: 3,
      fiscal: { exp: 3 },
      eff: { trustHill: 10, casteEquity: 4, legitimacy: 4, socialProt: 3 },
      grp: { malaiyaha: 12, intl: 5 },
      risk: 'Geringes Risiko, hoher symbolischer Wert für eine Gemeinschaft, die dem Staat gegenüber tief misstrauisch ist.',
      tags: ['Staatsbürgerschaft', 'Plantagen']
    },

    /* ---------- Sicherheitsgesetze ---------- */
    {
      id: 'id_pta_repeal', cat: 'identity', sub: 'Sicherheitsrecht',
      title: 'Antiterrorgesetz PTA ersatzlos aufheben',
      desc: 'Der Prevention of Terrorism Act erlaubt Haft ohne Anklage, erkennt unter Zwang erlangte Geständnisse an und wird bis heute für Taten ohne Terrorbezug eingesetzt. In den ersten fünf Monaten des Jahres gab es 49 Festnahmen nach diesem Gesetz. Aufhebung ohne Ersatzgesetz, Rückgriff auf das allgemeine Strafrecht.',
      party: ['ITAK', 'TNPF', 'FSP'], need: 'simple', pc: 24, lag: 2,
      fiscal: {},
      eff: { ruleOfLaw: 12, pressFree: 9, trustTamil: 16, trustMuslim: 12, reconcile: 9, internalSec: -6, sinhalaPress: 12 },
      grp: { tamilNE: 18, muslim: 14, diaspora: 12, intl: 10, youth: 6, military: -12, sinhalaRural: -7, sangha: -8 },
      risk: 'Sicherheitsbehörden werden argumentieren, dass ihnen jedes Instrument gegen organisierte Bedrohungen fehlt.',
      tags: ['Bürgerrechte', 'Wahlversprechen'], excl: ['id_pta_replace', 'id_pta_keep']
    },
    {
      id: 'id_pta_replace', cat: 'identity', sub: 'Sicherheitsrecht',
      title: 'PTA durch ein neues Antiterrorgesetz ersetzen',
      desc: 'Der Regierungsentwurf eines Protection of the State from Terrorism Act. Kürzere Haftfristen und richterliche Kontrolle, aber weiterhin weite Definitionen dessen, was als Terrorismus gilt. Menschenrechtsorganisationen halten den Entwurf für zu unbestimmt.',
      party: ['NPP'], need: 'simple', pc: 14, lag: 2,
      fiscal: { exp: 2 },
      eff: { ruleOfLaw: 4, pressFree: -2, trustTamil: 3, trustMuslim: 2, internalSec: 2, reconcile: 2 },
      grp: { tamilNE: 2, muslim: 1, intl: 2, military: -3, diaspora: -4 },
      risk: 'Der Kompromiss enttäuscht beide Seiten: zu wenig für Bürgerrechtler, zu viel für Sicherheitsbehörden.',
      risks: ['police_politicised'],
      tags: ['Bürgerrechte', 'Sicherheit'], excl: ['id_pta_repeal', 'id_pta_keep']
    },
    {
      id: 'id_pta_keep', cat: 'identity', sub: 'Sicherheitsrecht',
      title: 'PTA unverändert beibehalten',
      desc: 'Keine Änderung. Begründet mit fortbestehenden Sicherheitsrisiken und der Notwendigkeit, im Ernstfall schnell handeln zu können.',
      party: ['SLPP', 'SB'], need: 'exec', pc: 4, lag: 0,
      fiscal: {},
      eff: { internalSec: 3, ruleOfLaw: -6, trustTamil: -8, trustMuslim: -7, reconcile: -6, pressFree: -4 },
      grp: { military: 8, sinhalaRural: 4, tamilNE: -10, muslim: -9, intl: -9, diaspora: -8 },
      risk: 'Kostet Sie den GSP-Plus-Handelsstatus mit der EU früher oder später.',
      tags: ['Sicherheit'], excl: ['id_pta_repeal', 'id_pta_replace']
    },
    {
      id: 'id_osa_repeal', cat: 'identity', sub: 'Sicherheitsrecht',
      title: 'Online Safety Act zurücknehmen',
      desc: 'Das Gesetz von 2024 schuf eine regierungsnahe Kommission, die Inhalte als falsch einstufen und löschen lassen kann. Journalistenverbände, Technologieunternehmen und die Zivilgesellschaft laufen dagegen Sturm.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 11, lag: 1,
      fiscal: {},
      eff: { pressFree: 14, digitalGov: 4, ruleOfLaw: 6, legitimacy: 4, privateSector: 3 },
      grp: { youth: 11, sinhalaUrban: 8, business: 6, intl: 7, military: -3 },
      risk: 'Desinformationskampagnen gegen Ihre Regierung werden danach schwerer zu bremsen sein.',
      tags: ['Bürgerrechte', 'Digital']
    },
    {
      id: 'id_hate_speech', cat: 'identity', sub: 'Sicherheitsrecht',
      title: 'Gezieltes Gesetz gegen Hassrede verabschieden',
      desc: 'Enger Straftatbestand für Aufstachelung zu Gewalt gegen Gruppen, mit klaren Schwellen und Beteiligung der Justiz statt einer Verwaltungsbehörde. Nach den Ausschreitungen von Digana 2018 und Aluthgama 2014 eine wiederkehrende Forderung.',
      party: ['SLMC', 'SJB', 'NPP'], need: 'simple', pc: 13, lag: 2,
      fiscal: { exp: 3 },
      eff: { internalSec: 6, religFree: 7, trustMuslim: 9, reconcile: 5, pressFree: -3 },
      grp: { muslim: 12, christian: 8, tamilNE: 5, sangha: -6, sinhalaRural: -4 },
      risk: 'Jedes Hassredegesetz kann gegen die Minderheit gewendet werden, die es schützen soll. Die Definition entscheidet alles.',
      risks: ['police_politicised', 'court_backlog'],
      tags: ['Bürgerrechte', 'Zusammenhalt']
    },

    /* ---------- Aufarbeitung ---------- */
    {
      id: 'id_omp_strengthen', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Amt für Vermisste mit echten Befugnissen ausstatten',
      desc: 'Über 16.000 Fälle sind registriert, die große Mehrheit tamilisch. Das Office on Missing Persons erhält Akteneinsicht in militärische Unterlagen, Zeugenschutz, forensische Kapazitäten und eine Pflicht der Behörden zur Auskunft.',
      party: ['ITAK', 'SJB', 'NPP'], need: 'simple', pc: 20, lag: 4,
      fiscal: { exp: 12 }, oneoff: 10,
      eff: { reconcile: 14, trustTamil: 18, ruleOfLaw: 7, legitimacy: 5, sinhalaPress: 12 },
      grp: { tamilNE: 20, diaspora: 16, muslim: 6, intl: 10, military: -14, sinhalaRural: -6 },
      risk: 'Die Ermittlungen führen zu Offizieren, die heute noch im Dienst oder in der Politik sind.',
      tags: ['Aufarbeitung', 'Menschenrechte']
    },
    {
      id: 'id_truth_commission', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Nationale Wahrheits- und Versöhnungskommission',
      desc: 'Eine Kommission nach südafrikanischem Vorbild mit öffentlichen Anhörungen, Anerkennung des erlittenen Unrechts und Empfehlungen für Wiedergutmachung. Rein national besetzt.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 22, lag: 5,
      fiscal: { exp: 14 }, oneoff: 15,
      eff: { reconcile: 13, trustTamil: 9, legitimacy: 5, sinhalaPress: 10 },
      grp: { tamilNE: 8, muslim: 6, diaspora: 4, intl: 7, military: -8, sinhalaRural: -4 },
      risk: 'Tamilische Parteien und die Diaspora misstrauen rein nationalen Mechanismen nach mehreren gescheiterten Kommissionen seit 2002.',
      tags: ['Aufarbeitung'], excl: ['id_hybrid_court']
    },
    {
      id: 'id_hybrid_court', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Hybridgericht mit internationaler Beteiligung',
      desc: 'Ein Sondergericht mit srilankischen und internationalen Richtern, Anklägern und Ermittlern, wie es die Resolution 30/1 des UN-Menschenrechtsrats von 2015 vorsah und Sri Lanka 2020 aufkündigte.',
      party: ['ITAK', 'TNPF'], need: 'simple', pc: 45, lag: 6,
      fiscal: { exp: 18 }, oneoff: 30,
      eff: { reconcile: 20, trustTamil: 26, ruleOfLaw: 12, sinhalaPress: 32, militaryMor: -20 },
      grp: { tamilNE: 28, diaspora: 26, intl: 16, muslim: 6, military: -30, sinhalaRural: -20, sangha: -22 },
      risk: 'Das Militär betrachtet dies als existenzielle Bedrohung. Gerüchte über Illoyalität in den Streitkräften sind ein reales Szenario.',
      tags: ['Aufarbeitung', 'Hochrisiko'], excl: ['id_truth_commission']
    },
    {
      id: 'id_memorial_free', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Gedenkveranstaltungen im Norden freigeben',
      desc: 'Das Gedenken an die Toten der letzten Kriegsphase in Mullivaikkal wird jedes Jahr im Mai behindert, überwacht oder verboten. Künftig gilt die allgemeine Versammlungsfreiheit ohne Sondergenehmigung.',
      party: ['ITAK', 'TNPF', 'FSP'], need: 'exec', pc: 14, lag: 1,
      fiscal: {},
      eff: { pressFree: 8, trustTamil: 14, reconcile: 8, sinhalaPress: 14 },
      grp: { tamilNE: 16, diaspora: 14, intl: 6, military: -10, sinhalaRural: -8, sangha: -8 },
      risk: 'Bilder von Gedenkfeiern mit LTTE-Symbolik werden im Süden politisch ausgeschlachtet werden.',
      tags: ['Aufarbeitung', 'Bürgerrechte']
    },
    {
      id: 'id_memorial_common', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Gemeinsamer Gedenktag für alle Kriegsopfer',
      desc: 'Ein staatlicher Gedenktag für alle im Krieg Getöteten, gleich welcher Gemeinschaft, mit Beteiligung von Militär, Angehörigen und Religionsvertretern. Ein Versuch, aus zwei getrennten Erinnerungen eine gemeinsame zu machen.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 12, lag: 2,
      fiscal: { exp: 2 },
      eff: { reconcile: 11, trustTamil: 7, sinhalaPress: 8, legitimacy: 3 },
      grp: { tamilNE: 7, muslim: 5, christian: 4, military: -5, sinhalaRural: -4, diaspora: 3 },
      risk: 'Beide Seiten können darin eine Gleichsetzung von Opfern und Tätern sehen.',
      tags: ['Aufarbeitung', 'Symbolik']
    },
    {
      id: 'id_reparations', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Wiedergutmachungsprogramm für Kriegsbetroffene',
      desc: 'Einheitliche Entschädigung für Angehörige von Getöteten und Verschwundenen, für Kriegsversehrte und für zerstörtes Eigentum, unabhängig von Gemeinschaft und Kriegspartei. Das Office for Reparations erhält ein reales Budget.',
      party: ['SJB', 'NPP', 'ITAK'], need: 'simple', pc: 15, lag: 4,
      fiscal: { exp: 24 },
      eff: { reconcile: 12, trustTamil: 13, poverty: -0.5, veteran: 6, sinhalaPress: 5 },
      grp: { tamilNE: 14, military: 5, diaspora: 8, muslim: 5, sinhalaRural: -3 },
      risk: 'Wer entschädigt wird und wer nicht, wird zur nächsten Konfliktlinie.',
      tags: ['Aufarbeitung', 'Soziales']
    },
    {
      id: 'id_ltte_list', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Verbotsliste für Diaspora-Organisationen überprüfen',
      desc: 'Mehrere hundert Personen und Organisationen im Ausland stehen auf einer Terrorliste, oft ohne nachvollziehbare Begründung. Eine unabhängige Überprüfung mit Rechtsweg für Betroffene.',
      party: ['ITAK', 'SJB'], need: 'exec', pc: 13, lag: 2,
      fiscal: {},
      eff: { diaspora: 18, trustTamil: 8, ruleOfLaw: 5, reconcile: 5, sinhalaPress: 9 },
      grp: { diaspora: 22, tamilNE: 10, intl: 6, military: -8, sinhalaRural: -5 },
      risk: 'Kann Investitionen und Rücküberweisungen aus der Diaspora freisetzen. Kann auch Netzwerke reaktivieren, die der Sicherheitsapparat für gefährlich hält.',
      tags: ['Diaspora', 'Aufarbeitung']
    },

    /* ---------- Gleichstellung ---------- */
    {
      id: 'id_antidiscrim', cat: 'identity', sub: 'Gleichstellung',
      title: 'Umfassendes Antidiskriminierungsgesetz',
      desc: 'Ein einklagbares Verbot der Benachteiligung wegen Ethnie, Religion, Sprache, Kaste, Geschlecht, Behinderung oder Herkunft, mit Beweislastumkehr, Schlichtungsstelle und Schadenersatz.',
      party: ['SLMC', 'SJB', 'NPP', 'CWC'], need: 'simple', pc: 20, lag: 4,
      fiscal: { exp: 9 },
      eff: { religFree: 10, casteEquity: 10, langAccess: 6, reconcile: 8, trustMuslim: 10, trustHill: 8, ruleOfLaw: 6, sinhalaPress: 9 },
      grp: { muslim: 14, malaiyaha: 12, tamilNE: 9, christian: 9, youth: 6, sangha: -9, sinhalaRural: -6 },
      risk: 'Das wirksamste einzelne Instrument gegen Alltagsdiskriminierung und deshalb auch das umstrittenste.',
      risks: ['police_politicised', 'court_backlog'],
      tags: ['Gleichstellung', 'Recht']
    },
    {
      id: 'id_mmda', cat: 'identity', sub: 'Gleichstellung',
      title: 'Muslimisches Ehe- und Scheidungsrecht reformieren',
      desc: 'Der Muslim Marriage and Divorce Act von 1951 kennt kein Mindestheiratsalter und schließt Frauen vom Amt des Quazi-Richters aus. Die Reform kommt aus der Gemeinschaft selbst, ist dort aber umstritten.',
      party: ['SLMC', 'SJB', 'NPP'], need: 'simple', pc: 15, lag: 3,
      fiscal: { exp: 2 },
      eff: { religFree: 4, socialProt: 4, femaleLFP: 0.6, casteEquity: 3, education: 2 },
      grp: { muslim: 4, youth: 8, sinhalaUrban: 6, christian: 3 },
      risk: 'Ein Teil der konservativen muslimischen Führung wird das als staatlichen Eingriff in Religionsfreiheit darstellen.',
      tags: ['Gleichstellung', 'Religion']
    },
    {
      id: 'id_lgbt_decrim', cat: 'identity', sub: 'Gleichstellung',
      title: 'Gleichgeschlechtliche Beziehungen entkriminalisieren',
      desc: 'Die Paragrafen 365 und 365A des Strafgesetzbuchs aus der Kolonialzeit stellen einvernehmliche Handlungen unter Strafe. Ein Abgeordnetenentwurf zur Streichung liegt seit 2023 vor, der Oberste Gerichtshof erklärte ihn für verfassungskonform.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 14, lag: 2,
      fiscal: {},
      eff: { ruleOfLaw: 5, pressFree: 4, legitimacy: 2, brainDrain: -2 },
      grp: { youth: 10, sinhalaUrban: 8, intl: 7, sangha: -10, sinhalaRural: -7, muslim: -5 },
      risk: 'Religiöse Verbände aller Konfessionen stehen hier ausnahmsweise auf derselben Seite: dagegen.',
      tags: ['Gleichstellung', 'Recht']
    },
    {
      id: 'id_women_local', cat: 'identity', sub: 'Gleichstellung',
      title: 'Frauenquote in Kommunalvertretungen sichern',
      desc: 'Die 25-Prozent-Quote von 2016 wird bei jeder Wahl durch Listenmanöver ausgehöhlt. Verbindliche Platzierungsregeln, Nichtzulassung von Listen ohne Erfüllung, Schulungs- und Schutzprogramme gegen Anfeindungen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 8, lag: 2,
      fiscal: { exp: 3 },
      eff: { femaleLFP: 0.8, legitimacy: 4, socialProt: 3, casteEquity: 3 },
      grp: { youth: 6, sinhalaUrban: 5, unions: 3, sinhalaRural: -2 },
      risk: 'Geringer Widerstand in der Öffentlichkeit, hoher Widerstand in den Parteizentralen.',
      tags: ['Gleichstellung', 'Kommunal']
    },
    {
      id: 'id_muslim_return', cat: 'identity', sub: 'Vertreibung',
      title: 'Rückkehr der 1990 vertriebenen Nordmuslime',
      desc: 'Die LTTE vertrieb 1990 binnen 48 Stunden fast die gesamte muslimische Bevölkerung aus dem Norden. Ein Programm für Landrückgabe, Wohnungsbau und Wiedereingliederung, abgestimmt mit den heutigen tamilischen Anwohnern.',
      party: ['SLMC', 'SJB'], need: 'simple', pc: 16, lag: 5,
      fiscal: { exp: 16 }, oneoff: 22,
      eff: { trustMuslim: 16, reconcile: 9, housing: 4, trustTamil: -4 },
      grp: { muslim: 20, christian: 4, intl: 5, tamilNE: -6 },
      risk: 'Land, das damals verlassen wurde, ist heute bewohnt und bewirtschaftet. Ohne sorgfältige Vermittlung entstehen neue Konflikte.',
      tags: ['Vertreibung', 'Land']
    },
    {
      id: 'id_census_self', cat: 'identity', sub: 'Daten',
      title: 'Volkszählung mit Selbstidentifikation',
      desc: 'Ethnische und religiöse Zugehörigkeit wird künftig durch Selbstauskunft mit Mehrfachnennung erhoben, ergänzt um Sprache im Alltag. Beendet die Praxis, Menschen fremdbestimmten Kategorien zuzuordnen.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 5, lag: 4,
      fiscal: { exp: 4 }, oneoff: 9,
      eff: { stateCap: 4, langAccess: 3, casteEquity: 3, legitimacy: 2 },
      grp: { malaiyaha: 5, muslim: 4, tamilNE: 4 },
      risk: 'Politisch heikel, weil sich Bevölkerungsanteile verschieben können, an denen Sitzverteilungen hängen.',
      tags: ['Daten']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
