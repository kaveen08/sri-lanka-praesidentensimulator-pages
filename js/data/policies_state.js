/* ============================================================
   MASSNAHMEN  -  Staatsform, Verfassung, Wahlrecht
   fiscal.rev / fiscal.exp in LKR Mrd. pro Jahr
   need: exec | simple | twothirds | referendum
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Regierungsform ---------- */
    {
      id: 'st_abolish_exec', cat: 'state', sub: 'Regierungsform',
      title: 'Exekutivpräsidentschaft abschaffen',
      desc: 'Übergang zu einem parlamentarischen System. Der Präsident wird zum Staatsoberhaupt mit repräsentativen Aufgaben, die Regierungsgewalt geht auf den Premierminister und das Kabinett über. Seit 1994 verspricht das jede Regierung, keine hat es umgesetzt.',
      party: ['NPP', 'SJB', 'FSP'], need: 'referendum', pc: 55, lag: 6,
      fiscal: { exp: 12 }, oneoff: 40,
      eff: { ruleOfLaw: 9, legitimacy: 10, corruption: 5, stateCap: -4, reconcile: 4 },
      grp: { youth: 8, sinhalaUrban: 7, unions: 5, tamilNE: 4, military: -6, sinhalaRural: -2 },
      risk: 'Sie geben genau die Macht ab, mit der Sie alles andere durchsetzen. Ab sofort kostet jede Maßnahme mehr politisches Kapital.',
      special: 'presidential_power_down',
      tags: ['Verfassung', 'Wahlversprechen'], excl: ['st_strengthen_exec']
    },
    {
      id: 'st_trim_exec', cat: 'state', sub: 'Regierungsform',
      title: 'Präsidialbefugnisse beschneiden ohne Abschaffung',
      desc: 'Der Präsident verliert das Recht, das Parlament vorzeitig aufzulösen, Minister eigenmächtig zu entlassen und Behördenspitzen ohne Zustimmung des Verfassungsrats zu ernennen. Der Kern des 19. Verfassungszusatzes, diesmal dauerhaft verankert.',
      party: ['NPP', 'SJB', 'NDF'], need: 'twothirds', pc: 30, lag: 3,
      fiscal: {}, oneoff: 8,
      eff: { ruleOfLaw: 7, legitimacy: 6, corruption: 4, stateCap: -1 },
      grp: { sinhalaUrban: 5, youth: 5, business: 3, military: -3 },
      risk: 'Ein Kompromiss, der niemanden ganz zufriedenstellt.',
      tags: ['Verfassung']
    },
    {
      id: 'st_strengthen_exec', cat: 'state', sub: 'Regierungsform',
      title: 'Präsidialbefugnisse ausweiten',
      desc: 'Rückkehr zur Logik des 18. und 20. Verfassungszusatzes: direkte Ernennungshoheit über Kommissionen, Justizspitze und Behörden. Begründet wird das mit Handlungsfähigkeit in der Krise.',
      party: ['SLPP'], need: 'twothirds', pc: 34, lag: 2,
      fiscal: {},
      eff: { ruleOfLaw: -14, corruption: -9, stateCap: 5, legitimacy: -8, pressFree: -7 },
      grp: { military: 7, sinhalaRural: 3, sinhalaUrban: -9, youth: -11, intl: -12, business: -5 },
      risk: 'Genau dieser Weg führte 2022 in die Staatskrise. Die Straße erinnert sich.',
      special: 'presidential_power_up',
      tags: ['Verfassung', 'Risiko'], excl: ['st_abolish_exec']
    },
    {
      id: 'st_new_constitution', cat: 'state', sub: 'Regierungsform',
      title: 'Verfassunggebende Versammlung einberufen',
      desc: 'Das Parlament konstituiert sich als verfassunggebende Versammlung und beginnt die Arbeit an einer vollständig neuen Verfassung. Wahlkampfversprechen der NPP, das nach der ursprünglichen Ankündigung um drei Jahre verschoben wurde.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 26, lag: 4,
      fiscal: { exp: 6 }, oneoff: 25,
      eff: { legitimacy: 6, reconcile: 5, stateCap: -3 },
      grp: { youth: 7, sinhalaUrban: 5, tamilNE: 6, sangha: -4 },
      risk: 'Öffnet alle Fragen gleichzeitig: Einheitsstaat, Artikel 9, Sprache, Devolution. Erwarten Sie Gegenwind aus allen Richtungen.',
      special: 'constitution_process',
      tags: ['Verfassung', 'Wahlversprechen']
    },
    {
      id: 'st_federal', cat: 'state', sub: 'Regierungsform',
      title: 'Föderale Staatsordnung einführen',
      desc: 'Der Einheitsstaatsbegriff in Artikel 2 wird ersetzt. Provinzen erhalten verfassungsrechtlich geschützte, nicht rücknehmbare Zuständigkeiten und eine eigene Finanzausstattung.',
      party: ['ITAK', 'TNPF'], need: 'referendum', pc: 70, lag: 8,
      fiscal: { exp: 140 }, oneoff: 60,
      eff: { reconcile: 22, trustTamil: 30, trustHill: 12, trustMuslim: 8, sinhalaPress: 30, regionalBalance: 12, stateCap: -6 },
      grp: { tamilNE: 26, diaspora: 22, malaiyaha: 12, muslim: 8, sinhalaRural: -20, sangha: -26, military: -18 },
      risk: 'Die Volksabstimmung ist bei aktueller Stimmungslage kaum zu gewinnen. Eine Niederlage würde Sie politisch schwer beschädigen.',
      tags: ['Verfassung', 'Devolution', 'Hochrisiko'], excl: ['dv_abolish_pc']
    },
    {
      id: 'st_unitary_lock', cat: 'state', sub: 'Regierungsform',
      title: 'Einheitsstaat zusätzlich verfassungsfest machen',
      desc: 'Artikel 2 wird um eine Klausel ergänzt, die jede Form von Föderalisierung ausdrücklich ausschließt und den Provinzräten dauerhaft nachgeordneten Status zuweist.',
      party: ['SLPP', 'SB'], need: 'referendum', pc: 45, lag: 4,
      fiscal: {},
      eff: { reconcile: -18, trustTamil: -22, sinhalaPress: -20, stateCap: 2 },
      grp: { sinhalaRural: 14, sangha: 16, military: 10, tamilNE: -24, diaspora: -20, muslim: -8, intl: -10 },
      risk: 'Beendet die Devolutionsdebatte für eine Generation. Und mit ihr jede Aussicht auf Versöhnung.',
      tags: ['Verfassung', 'Nationalismus'], excl: ['st_federal', 'dv_13a_full']
    },

    /* ---------- Wahlrecht ---------- */
    {
      id: 'st_mmp', cat: 'state', sub: 'Wahlrecht',
      title: 'Gemischtes Wahlsystem einführen',
      desc: 'Kombination aus Direktmandaten in Wahlkreisen und Verhältnisausgleich, ähnlich dem deutschen Modell. Beendet den ruinösen Präferenzstimmenwettbewerb innerhalb derselben Partei, der Wahlkämpfe teuer und korrupt macht.',
      party: ['NPP', 'SJB'], need: 'twothirds', pc: 28, lag: 4,
      fiscal: { exp: 4 }, oneoff: 15,
      eff: { corruption: 6, legitimacy: 5, ruleOfLaw: 3 },
      grp: { sinhalaUrban: 5, youth: 4, tamilNE: -3, muslim: -4, malaiyaha: -3 },
      risk: 'Kleine Parteien und Minderheitenvertretungen verlieren Sitze. Ihre potenziellen Koalitionspartner wissen das.',
      tags: ['Wahlrecht'], excl: ['st_fptp']
    },
    {
      id: 'st_fptp', cat: 'state', sub: 'Wahlrecht',
      title: 'Rückkehr zum reinen Mehrheitswahlrecht',
      desc: 'Ein Wahlkreis, ein Abgeordneter, relative Mehrheit gewinnt. Erzeugt klare Regierungsmehrheiten, verzerrt aber das Stimmenverhältnis massiv.',
      party: ['SLPP'], need: 'twothirds', pc: 30, lag: 4,
      fiscal: {}, oneoff: 12,
      eff: { legitimacy: -4, reconcile: -6 },
      grp: { sinhalaRural: 6, tamilNE: -10, muslim: -9, malaiyaha: -8, sinhalaUrban: -3 },
      risk: 'Minderheiten verlieren nahezu jede Chance auf angemessene Vertretung.',
      tags: ['Wahlrecht'], excl: ['st_mmp']
    },
    {
      id: 'st_anti_defection', cat: 'state', sub: 'Wahlrecht',
      title: 'Überlaufverbot für Abgeordnete',
      desc: 'Wer die Fraktion wechselt, verliert das Mandat. Der Kauf von Abgeordneten hat in Sri Lanka wiederholt Regierungen gestürzt und Regierungen gerettet.',
      party: ['NPP', 'SJB'], need: 'twothirds', pc: 18, lag: 2,
      fiscal: {},
      eff: { corruption: 5, legitimacy: 4, stateCap: 3 },
      grp: { youth: 4, sinhalaUrban: 3 },
      risk: 'Zementiert auch die Macht der Parteizentralen über einzelne Abgeordnete.',
      special: 'anti_defection',
      tags: ['Wahlrecht', 'Antikorruption']
    },
    {
      id: 'st_campaign_finance', cat: 'state', sub: 'Wahlrecht',
      title: 'Wahlkampffinanzierung offenlegen und deckeln',
      desc: 'Verpflichtende Veröffentlichung aller Spenden über 100.000 LKR, Obergrenzen für Wahlkampfausgaben, Sanktionen bis zur Mandatsaberkennung.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 12, lag: 2,
      fiscal: { exp: 3 },
      eff: { corruption: 7, legitimacy: 4, ruleOfLaw: 3 },
      grp: { youth: 6, sinhalaUrban: 5, business: -4 },
      risk: 'Die Kontrolle ist nur so gut wie die Wahlkommission, die sie durchführt.',
      tags: ['Antikorruption', 'Wahlrecht']
    },
    {
      id: 'st_term_limit', cat: 'state', sub: 'Wahlrecht',
      title: 'Amtszeitbegrenzung auf zwei Perioden festschreiben',
      desc: 'Kein Präsident darf mehr als zwei Amtszeiten ausüben. Die Aufhebung dieser Grenze durch den 18. Verfassungszusatz gilt vielen als Beginn des institutionellen Verfalls.',
      party: ['NPP', 'SJB', 'NDF'], need: 'twothirds', pc: 14, lag: 1,
      fiscal: {},
      eff: { ruleOfLaw: 5, legitimacy: 5 },
      grp: { youth: 5, sinhalaUrban: 4, intl: 4 },
      risk: 'Gilt auch für Sie.',
      tags: ['Verfassung']
    },
    {
      id: 'st_vote16', cat: 'state', sub: 'Wahlrecht',
      title: 'Wahlalter auf 16 senken',
      desc: 'Rund 700.000 zusätzliche Wahlberechtigte. Begründet mit der Rolle junger Menschen in der Protestbewegung von 2022 und der hohen Alphabetisierung.',
      party: ['NPP', 'FSP'], need: 'twothirds', pc: 16, lag: 2,
      fiscal: { exp: 2 },
      eff: { legitimacy: 3 },
      grp: { youth: 11, sangha: -4, sinhalaRural: -3 },
      risk: 'Ob junge Wähler dann tatsächlich für Sie stimmen, ist eine andere Frage.',
      tags: ['Wahlrecht']
    },
    {
      id: 'st_quota_women', cat: 'state', sub: 'Wahlrecht',
      title: 'Frauenquote von 30 Prozent im Parlament',
      desc: 'Sri Lanka hatte die erste Regierungschefin der Welt und liegt beim Frauenanteil im Parlament heute unter 10 Prozent. Verbindliche Listenquote mit Reißverschlussverfahren.',
      party: ['NPP', 'SJB'], need: 'twothirds', pc: 20, lag: 3,
      fiscal: { exp: 2 },
      eff: { legitimacy: 5, femaleLFP: 1.5, socialProt: 3 },
      grp: { youth: 6, sinhalaUrban: 6, unions: 3, sangha: -5, sinhalaRural: -3 },
      risk: 'Widerstand kommt quer durch alle Parteien, meist informell und selten offen.',
      tags: ['Gleichstellung', 'Wahlrecht']
    },
    {
      id: 'st_ec_budget', cat: 'state', sub: 'Institutionen',
      title: 'Wahlkommission mit eigenem Haushalt ausstatten',
      desc: 'Die Kommission wird finanziell und personell unabhängig von der Regierung. Der jahrelange Aufschub der Provinzratswahlen wurde regelmäßig mit fehlenden Mitteln begründet.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 10, lag: 1,
      fiscal: { exp: 9 },
      eff: { ruleOfLaw: 5, legitimacy: 5, corruption: 3 },
      grp: { sinhalaUrban: 4, tamilNE: 5, intl: 5 },
      risk: 'Nimmt Ihnen ein bequemes Argument, unliebsame Wahlen zu verschieben.',
      tags: ['Institutionen']
    },

    /* ---------- Unabhängige Institutionen ---------- */
    {
      id: 'st_commissions', cat: 'state', sub: 'Institutionen',
      title: 'Unabhängige Kommissionen dauerhaft absichern',
      desc: 'Polizei-, Justiz-, Beamten- und Menschenrechtskommission werden über einen paritätisch besetzten Verfassungsrat besetzt, mit fester Amtszeit und Abberufung nur durch qualifizierte Mehrheit.',
      party: ['NPP', 'SJB', 'NDF'], need: 'twothirds', pc: 24, lag: 3,
      fiscal: { exp: 14 },
      eff: { ruleOfLaw: 10, corruption: 8, stateCap: 5, legitimacy: 7, pressFree: 4 },
      grp: { sinhalaUrban: 6, youth: 6, intl: 8, business: 4 },
      risk: 'Unabhängige Kommissionen ermitteln irgendwann auch gegen die eigene Regierung.',
      tags: ['Institutionen', 'Antikorruption']
    },
    {
      id: 'st_constitutional_court', cat: 'state', sub: 'Institutionen',
      title: 'Eigenständiges Verfassungsgericht errichten',
      desc: 'Bisher prüft der Oberste Gerichtshof Gesetze nur innerhalb einer Woche nach Einbringung und nie nach Inkrafttreten. Ein eigenes Verfassungsgericht mit nachträglicher Normenkontrolle würde das ändern.',
      party: ['SJB', 'ITAK'], need: 'twothirds', pc: 26, lag: 5,
      fiscal: { exp: 11 }, oneoff: 20,
      eff: { ruleOfLaw: 12, legitimacy: 6, corruption: 3, stateCap: -2 },
      grp: { sinhalaUrban: 5, tamilNE: 6, muslim: 5, intl: 7 },
      risk: 'Ein Gericht, das Ihre Gesetze kippen kann, ist genau dann unbequem, wenn Sie es eilig haben.',
      tags: ['Institutionen', 'Justiz']
    },
    {
      id: 'st_rti', cat: 'state', sub: 'Institutionen',
      title: 'Informationsfreiheitsgesetz schärfen',
      desc: 'Kürzere Fristen, Sanktionen bei Verweigerung, proaktive Veröffentlichung aller Verträge über 500 Mio. LKR. Sri Lankas RTI-Gesetz von 2016 gilt als gut, wird aber schwach angewendet.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 9, lag: 2,
      fiscal: { exp: 4 },
      eff: { corruption: 6, pressFree: 6, legitimacy: 4, digitalGov: 3 },
      grp: { youth: 5, sinhalaUrban: 5, business: 3, publicSector: -3 },
      risk: 'Auch Ihre eigenen Vergabeentscheidungen werden öffentlich.',
      tags: ['Antikorruption', 'Transparenz']
    },
    {
      id: 'st_cope_power', cat: 'state', sub: 'Institutionen',
      title: 'Parlamentsausschüsse mit Sanktionsrechten ausstatten',
      desc: 'COPE und COPF können bislang Missstände feststellen, aber nichts erzwingen. Künftig erhalten sie Vorladungsrecht unter Strafandrohung und die Befugnis, Zahlungen zu sperren.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 12, lag: 2,
      fiscal: { exp: 3 },
      eff: { corruption: 7, soeHealth: 4, stateCap: 3, ruleOfLaw: 4 },
      grp: { sinhalaUrban: 4, youth: 4, intl: 4, publicSector: -4 },
      risk: 'Funktioniert nur, wenn der Ausschussvorsitz auch an die Opposition gehen darf.',
      tags: ['Antikorruption', 'Institutionen']
    },
    {
      id: 'st_civil_service', cat: 'state', sub: 'Institutionen',
      title: 'Beamtenernennungen entpolitisieren',
      desc: 'Sekretäre, Behördenleitungen und Botschafterposten werden nach Ausschreibung und Eignung besetzt, nicht nach Parteibuch. Der Wechsel Tausender Posten nach jeder Wahl kostet das Land Kontinuität.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 20, lag: 4,
      fiscal: { exp: 5 },
      eff: { stateCap: 10, corruption: 7, ruleOfLaw: 5 },
      grp: { business: 6, intl: 6, sinhalaUrban: 4, publicSector: -6 },
      risk: 'Sie verlieren ein Instrument, mit dem sich Loyalität sonst sehr direkt belohnen lässt.',
      tags: ['Verwaltung', 'Antikorruption']
    },
    {
      id: 'st_emergency_limit', cat: 'state', sub: 'Institutionen',
      title: 'Notstandsbefugnisse befristen',
      desc: 'Ausnahmezustand nur noch für 14 Tage ohne Parlamentsbeschluss, danach monatliche Verlängerung mit Zweidrittelmehrheit. Der Einsatz von Notstandsverordnungen gegen Streiks wäre damit beendet.',
      party: ['SJB', 'ITAK', 'FSP'], need: 'twothirds', pc: 22, lag: 2,
      fiscal: {},
      eff: { ruleOfLaw: 8, pressFree: 7, internalSec: -3, legitimacy: 4 },
      grp: { unions: 8, youth: 6, tamilNE: 6, muslim: 5, military: -6, business: -3 },
      risk: 'Bei der nächsten Streikwelle im Hafen oder im Stromnetz fehlt Ihnen dieses Werkzeug.',
      tags: ['Bürgerrechte']
    },
    {
      id: 'st_immunity', cat: 'state', sub: 'Institutionen',
      title: 'Präsidentielle Immunität aufheben',
      desc: 'Artikel 35 schützt den Präsidenten während der Amtszeit vor jeder gerichtlichen Verfolgung. Diese Regel fällt.',
      party: ['NPP', 'FSP'], need: 'twothirds', pc: 24, lag: 2,
      fiscal: {},
      eff: { ruleOfLaw: 9, legitimacy: 8, corruption: 4 },
      grp: { youth: 9, sinhalaUrban: 7, unions: 5, intl: 6 },
      risk: 'Sie machen sich selbst angreifbar, auch für politisch motivierte Klagen.',
      tags: ['Verfassung', 'Antikorruption']
    },
    {
      id: 'st_open_parliament', cat: 'state', sub: 'Institutionen',
      title: 'Offenes Parlament und digitale Gesetzgebung',
      desc: 'Alle Gesetzentwürfe, Ausschussprotokolle, Abstimmungsergebnisse und Anwesenheitslisten werden maschinenlesbar veröffentlicht. Öffentliche Konsultationsfristen von mindestens 30 Tagen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 7, lag: 2,
      fiscal: { exp: 3 }, oneoff: 6,
      eff: { digitalGov: 6, corruption: 4, legitimacy: 4, pressFree: 3 },
      grp: { youth: 6, sinhalaUrban: 4, business: 3 },
      risk: 'Geringes Risiko, aber auch keine sofort sichtbare Wirkung im Alltag der Menschen.',
      tags: ['Digital', 'Transparenz']
    },
    {
      id: 'st_referendum_right', cat: 'state', sub: 'Institutionen',
      title: 'Volksinitiative und Referendumsrecht einführen',
      desc: 'Ab 500.000 Unterschriften wird ein Gesetzentwurf zwingend im Parlament behandelt, ab einer Million kommt es zur Volksabstimmung.',
      party: ['NPP', 'FSP'], need: 'twothirds', pc: 24, lag: 4,
      fiscal: { exp: 5 },
      eff: { legitimacy: 7, ruleOfLaw: 2, stateCap: -3 },
      grp: { youth: 8, sinhalaRural: 5, unions: 5, sinhalaUrban: 4, tamilNE: -4, muslim: -5 },
      risk: 'Direkte Demokratie schneidet für Minderheitenrechte fast überall schlecht ab. Rechnen Sie mit Initiativen gegen genau Ihre Reformen.',
      tags: ['Verfassung', 'Direktdemokratie']
    },
    {
      id: 'st_ombuds', cat: 'state', sub: 'Institutionen',
      title: 'Bürgerbeauftragten stärken',
      desc: 'Der Parliamentary Commissioner for Administration erhält Ermittlungsbefugnisse, ein eigenes Budget und Vertretungen in allen 25 Distrikten.',
      party: ['SJB', 'NPP'], need: 'simple', pc: 8, lag: 2,
      fiscal: { exp: 6 },
      eff: { stateCap: 4, corruption: 4, legitimacy: 5 },
      grp: { sinhalaRural: 4, tamilNE: 4, malaiyaha: 4, publicSector: -2 },
      risk: 'Wirkt nur, wenn Behörden die Empfehlungen auch umsetzen müssen.',
      tags: ['Verwaltung']
    },
    {
      id: 'st_senate', cat: 'state', sub: 'Regierungsform',
      title: 'Zweite Kammer als Provinzvertretung schaffen',
      desc: 'Ein Senat mit Vertretern aller neun Provinzen erhält aufschiebendes Veto bei Gesetzen, die Provinzkompetenzen berühren. Ein Weg, Devolution zu verankern, ohne den Einheitsstaat formell aufzugeben.',
      party: ['SJB', 'ITAK'], need: 'twothirds', pc: 34, lag: 6,
      fiscal: { exp: 22 }, oneoff: 18,
      eff: { reconcile: 10, trustTamil: 12, regionalBalance: 7, sinhalaPress: 13, stateCap: -3, legitimacy: 4 },
      grp: { tamilNE: 12, malaiyaha: 8, muslim: 7, sinhalaRural: -7, sangha: -9 },
      risk: 'Nationalistische Kräfte lesen jede zweite Kammer als Föderalismus durch die Hintertür.',
      tags: ['Verfassung', 'Devolution']
    },
    {
      id: 'st_local_recall', cat: 'state', sub: 'Institutionen',
      title: 'Abwahlrecht auf kommunaler Ebene',
      desc: 'Bürgermeister und Ratsmitglieder können nach der Hälfte der Amtszeit durch ein Bürgerbegehren abgewählt werden.',
      party: ['NPP'], need: 'simple', pc: 10, lag: 3,
      fiscal: { exp: 4 },
      eff: { corruption: 4, legitimacy: 4, stateCap: -2 },
      grp: { youth: 5, sinhalaRural: 4 },
      risk: 'Kann lokale Politik in Dauerwahlkampf verwandeln.',
      tags: ['Kommunal']
    },
    {
      id: 'st_asset_declare', cat: 'state', sub: 'Institutionen',
      title: 'Vermögenserklärungen öffentlich machen',
      desc: 'Alle Abgeordneten, Minister, Behördenleitungen und ihre engsten Angehörigen veröffentlichen jährlich Vermögen und Einkünfte. Der Anti-Corruption Act von 2023 sieht das bereits vor, die Umsetzung stockt.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 14, lag: 1,
      fiscal: { exp: 2 },
      eff: { corruption: 8, legitimacy: 6, ruleOfLaw: 3 },
      grp: { youth: 8, sinhalaUrban: 6, intl: 6, business: -3 },
      risk: 'Es wird Fälle in den eigenen Reihen geben. Wie Sie damit umgehen, entscheidet über Ihre Glaubwürdigkeit.',
      tags: ['Antikorruption']
    },
    {
      id: 'st_devolve_referendum', cat: 'state', sub: 'Regierungsform',
      title: 'Volksabstimmung über die Devolutionsfrage',
      desc: 'Statt weiter zu vertagen, wird die Grundsatzfrage der Machtverteilung zwischen Zentrum und Provinzen direkt zur Abstimmung gestellt.',
      party: [], need: 'simple', pc: 30, lag: 4,
      fiscal: { exp: 3 }, oneoff: 22,
      eff: { legitimacy: 5, sinhalaPress: 12 },
      grp: { tamilNE: 5, sinhalaRural: -4 },
      risk: 'Ein Referendum zu dieser Frage kann die Gesellschaft dauerhaft spalten. Der Ausgang ist offen und hängt stark von Ihrer Zustimmung ab.',
      special: 'devolution_referendum',
      tags: ['Verfassung', 'Hochrisiko']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
