/* ============================================================
   MASSNAHMEN  -  Dienstpflicht, Wehrpflicht, Freiwilligendienste

   Sri Lanka hat nie eine Wehrpflicht gehabt. Die Streitkräfte sind
   eine Freiwilligenarmee, die während des Krieges auf über 200.000
   Mann anwuchs und seither kaum geschrumpft ist. Die Debatte, was
   mit einer Armee dieser Größe siebzehn Jahre nach Kriegsende
   anzufangen ist, wird in jedem Wahlkampf geführt.

   Die Vorschläge hier reichen von einer klassischen Wehrpflicht
   über eine allgemeine Dienstpflicht mit Wahlrecht zwischen Militär
   und Zivildienst bis zu einem rein freiwilligen Jahr. Sie schließen
   einander aus: Ein Land kann nur eines davon haben.

   fiscal.rev / fiscal.exp in LKR Mrd. pro Jahr
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* ---------- Wehrpflicht und Dienstpflicht ---------- */
    {
      id: 'sv_conscription', cat: 'military', sub: 'Dienstpflicht',
      title: 'Allgemeine Wehrpflicht einführen',
      desc: 'Zwölf Monate Militärdienst für alle Männer ab 18, mit den üblichen Ausnahmen für Studium und Gesundheit. Befürworter versprechen sich Disziplin, Zusammenhalt und eine Antwort auf die Jugendarbeitslosigkeit. Gegner verweisen darauf, dass ein Land, das gerade siebzehn Jahre Krieg hinter sich hat und dessen Armee im Norden als Besatzung wahrgenommen wird, jeden Jahrgang durch eine Uniform schicken würde. Für die Minderheiten ist die Vorstellung, ihre Söhne in genau die Streitkräfte einzuziehen, die sie fürchten, eine Zumutung.',
      party: ['SLPP', 'SB'], need: 'simple', pc: 42, lag: 5,
      fiscal: { exp: 145 },
      eff: {
        militaryCap: 10, militaryMor: -6, internalSec: 5,
        youthUnemp: -3.2, unemp: -0.5, skillsMatch: -4, education: -3,
        brainDrain: 7, femaleLFP: -1.2, sinhalaPress: 8,
        trustTamil: -12, trustMuslim: -9, reconcile: -10, growth: -0.25
      },
      grp: { military: 14, sinhalaRural: 8, sangha: 6, sinhalaUrban: -9, youth: -16,
             tamilNE: -15, muslim: -12, malaiyaha: -8, business: -6, intl: -7 },
      risk: 'Ein ganzer Jahrgang verliert ein Jahr Ausbildung oder Erwerbstätigkeit, und der Staat zahlt dafür. Im Norden und Osten gilt der Zwangsdienst als Fortsetzung der Militarisierung mit anderen Mitteln. Fachkräfte gehen früher ins Ausland, um dem Dienst zu entgehen.',
      tags: ['Wehrpflicht', 'Jugend', 'umstritten'],
      excl: ['sv_national_service', 'sv_voluntary_year', 'sv_civil_only']
    },
    {
      id: 'sv_national_service', cat: 'military', sub: 'Dienstpflicht',
      title: 'Allgemeine Dienstpflicht mit freier Wahl zwischen Militär und Zivildienst',
      desc: 'Ein Pflichtjahr für alle jungen Menschen, Männer wie Frauen, mit echter Wahlfreiheit: Streitkräfte, Katastrophenschutz, Pflege, Schulen, Umwelt- und Küstenschutz oder kommunale Verwaltung. Wer sich für den zivilen Zweig entscheidet, muss das nicht begründen. Die Dienststellen werden bewusst außerhalb der Heimatprovinz vergeben, damit ein Jahrgang aus Jaffna, Galle und Nuwara Eliya sich zum ersten Mal begegnet. Das Modell orientiert sich an europäischen Vorbildern und ist der Versuch, den Zusammenhalt herzustellen, den die Wehrpflicht nur behauptet.',
      party: ['SJB', 'NDF', 'NPP'], need: 'simple', pc: 46, lag: 6,
      fiscal: { exp: 175 },
      eff: {
        reconcile: 12, langAccess: 9, casteEquity: 6, trustTamil: 4, trustMuslim: 4, trustHill: 5,
        health: 6, disasterPrep: 10, climateRes: 4, education: 4, socialProt: 4,
        skillsMatch: 7, youthUnemp: -4.5, unemp: -0.6, femaleLFP: 3.5,
        stateCap: 5, legitimacy: 6, militaryCap: 3, sinhalaPress: 3, growth: -0.15
      },
      grp: { youth: -6, sinhalaRural: 6, tamilNE: 5, muslim: 5, malaiyaha: 7, christian: 5,
             military: -4, business: -5, unions: 4, sangha: -3, intl: 6 },
      risk: 'Ein Pflichtjahr bleibt ein Pflichtjahr: Die Jugend, die diese Regierung gewählt hat, wird als Erstes gefragt, warum sie ein Jahr abgeben soll. Und ein Programm dieser Größe braucht Unterkünfte, Ausbilder und eine Verwaltung, die es koordiniert. Ohne funktionierende Kommunen entsteht Beschäftigungstherapie statt Dienst.',
      tags: ['Dienstpflicht', 'Zivildienst', 'Zusammenhalt', 'Jugend'],
      excl: ['sv_conscription', 'sv_voluntary_year', 'sv_civil_only'],
      risks: ['no_local_capacity']
    },
    {
      id: 'sv_civil_only', cat: 'military', sub: 'Dienstpflicht',
      title: 'Zivile Dienstpflicht ohne militärischen Zweig',
      desc: 'Ein Pflichtjahr ausschließlich im zivilen Bereich: Pflege, Schulen, Katastrophenschutz, Wiederaufforstung, Deichbau, Bewässerung. Die Streitkräfte bleiben außen vor. Damit entfällt der Vorwurf der Militarisierung, und der Norden und Osten können sich beteiligen, ohne dass jemand eine Uniform der srilankischen Armee tragen muss. Für die Streitkräfte ist es eine Kränkung, für die Kommunen ein Personalgewinn, den sie seit Jahrzehnten nicht hatten.',
      party: ['NPP', 'FSP', 'ITAK'], need: 'simple', pc: 38, lag: 5,
      fiscal: { exp: 128 },
      eff: {
        reconcile: 9, trustTamil: 7, trustMuslim: 6, trustHill: 7, casteEquity: 5,
        health: 8, education: 6, socialProt: 5, disasterPrep: 11, climateRes: 6, forest: 1.4,
        skillsMatch: 6, youthUnemp: -3.8, femaleLFP: 4, stateCap: 6, regionalBalance: 5,
        militaryMor: -5, sinhalaPress: 5, growth: -0.1
      },
      grp: { tamilNE: 9, muslim: 8, malaiyaha: 9, christian: 6, unions: 6, publicSector: 5,
             youth: -5, military: -11, sinhalaRural: -3, sangha: -4, business: -4 },
      risk: 'Der Sicherheitsapparat liest das als Misstrauensvotum. Ein Präsident, der die Streitkräfte von einem nationalen Jugendprogramm ausschließt, sollte wissen, dass die Armee in Sri Lanka schon aus geringerem Anlass Politik gemacht hat.',
      tags: ['Dienstpflicht', 'Zivildienst', 'Kommunen'],
      excl: ['sv_conscription', 'sv_national_service', 'sv_voluntary_year'],
      risks: ['no_local_capacity']
    },
    {
      id: 'sv_voluntary_year', cat: 'military', sub: 'Dienstpflicht',
      title: 'Freiwilliges Jahr mit Ausbildungsanspruch',
      desc: 'Kein Zwang, sondern ein Angebot: Wer ein Jahr im Katastrophenschutz, in der Pflege, an Schulen oder im Umweltschutz dient, bekommt danach einen garantierten Ausbildungsplatz, einen Bonus bei der Hochschulzulassung und eine Aufwandsentschädigung. Kostet einen Bruchteil einer Dienstpflicht, erreicht aber nur, wer will. Erfahrungsgemäß sind das vor allem die, die ohnehin einen Weg gefunden hätten.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 16, lag: 3,
      fiscal: { exp: 42 },
      eff: {
        skillsMatch: 6, education: 3, youthUnemp: -1.6, femaleLFP: 1.8,
        disasterPrep: 6, health: 3, climateRes: 3, socialProt: 2, reconcile: 3, legitimacy: 3
      },
      grp: { youth: 10, unions: 4, sinhalaRural: 4, malaiyaha: 3, tamilNE: 3, publicSector: 3 },
      risk: 'Freiwilligkeit erreicht die Falschen: Wer sich ein unbezahltes Jahr leisten kann, hat meistens schon eine Perspektive. Die Wirkung auf Zusammenhalt und Jugendarbeitslosigkeit bleibt deutlich unter dem, was eine allgemeine Pflicht erreichen würde.',
      tags: ['Freiwilligendienst', 'Jugend'],
      excl: ['sv_conscription', 'sv_national_service', 'sv_civil_only']
    },
    {
      id: 'sv_women_included', cat: 'military', sub: 'Dienstpflicht',
      title: 'Dienstpflicht auf Frauen ausweiten',
      desc: 'Was für Männer gilt, gilt für Frauen. In einem Land mit einer der niedrigsten Erwerbsquoten von Frauen in Südasien ist ein Pflichtjahr auch ein Türöffner: Es bringt junge Frauen in Ausbildung, in Verantwortung und in Berufe, die ihnen die Familie sonst ausredet. Konservative Kreise und ein Teil des Klerus halten dagegen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 20, lag: 3,
      req: ['sv_national_service'],
      fiscal: { exp: 62 },
      eff: { femaleLFP: 6.5, skillsMatch: 4, education: 3, casteEquity: 3, socialProt: 2, reconcile: 2, sinhalaPress: 3 },
      grp: { youth: -4, sinhalaUrban: 6, business: 4, intl: 6, sangha: -6, sinhalaRural: -5, muslim: -6 },
      risk: 'In konservativen Milieus, sinhalesisch wie muslimisch, gilt das als Übergriff auf die Familie. Rechnen Sie mit organisiertem Widerstand und mit Ausnahmeanträgen in einer Größenordnung, die das Programm aushöhlt.',
      tags: ['Dienstpflicht', 'Gleichstellung']
    },
    {
      id: 'sv_service_credit', cat: 'military', sub: 'Dienstpflicht',
      title: 'Dienstzeit auf Rente und Hochschulzulassung anrechnen',
      desc: 'Das Dienstjahr zählt als Beitragsjahr für die Alterssicherung und bringt Punkte bei der Hochschulzulassung. Damit wird aus einer Pflicht ein Tausch, und der Widerstand der Betroffenen sinkt messbar.',
      party: ['NPP', 'SJB', 'CWC'], need: 'simple', pc: 12, lag: 2,
      req: ['sv_national_service'],
      fiscal: { exp: 34 },
      eff: { socialProt: 5, education: 3, skillsMatch: 3, legitimacy: 3 },
      grp: { youth: 11, unions: 5, malaiyaha: 4, publicSector: 3, intl: -2 },
      risk: 'Die Anrechnung auf die Rente belastet ein Alterssicherungssystem, das ohnehin nicht kapitalgedeckt ist. Die Rechnung kommt in zwanzig Jahren.',
      tags: ['Dienstpflicht', 'Soziales']
    },
    {
      id: 'sv_service_north', cat: 'military', sub: 'Dienstpflicht',
      title: 'Dienststellen bewusst über Sprachgrenzen hinweg vergeben',
      desc: 'Wer im Süden aufgewachsen ist, dient im Norden oder Osten, und umgekehrt. Dienststellen werden zweisprachig geführt, jeder Dienstleistende lernt die jeweils andere Sprache auf Alltagsniveau. Der teuerste und der wirksamste Teil des ganzen Programms: Die meisten jungen Sinhalesen haben noch nie mit einem tamilischen Gleichaltrigen gesprochen, und umgekehrt.',
      party: ['NPP', 'ITAK', 'SLMC'], need: 'simple', pc: 18, lag: 4,
      req: ['sv_national_service'],
      fiscal: { exp: 48 },
      eff: { reconcile: 11, langAccess: 12, trustTamil: 8, trustMuslim: 6, trustHill: 5,
             casteEquity: 4, regionalBalance: 4, sinhalaPress: 6 },
      grp: { tamilNE: 12, muslim: 8, malaiyaha: 7, christian: 5, diaspora: 6, youth: 3,
             sangha: -7, sinhalaRural: -6, military: -3 },
      risk: 'Nationalistische Kreise nennen das Umerziehung und werden Einzelfälle suchen, an denen sich das Programm skandalisieren lässt. Sie werden welche finden.',
      tags: ['Dienstpflicht', 'Sprache', 'Versöhnung']
    },

    /* ---------- Was mit der bestehenden Armee geschieht ---------- */
    {
      id: 'sv_army_to_service', cat: 'military', sub: 'Struktur',
      title: 'Teile der Armee in ein Technisches Hilfswerk überführen',
      desc: 'Pionier-, Sanitäts- und Logistikeinheiten werden aus den Streitkräften herausgelöst und zu einer zivilen Katastrophenschutzorganisation umgebaut, mit eigener Führung, eigenem Auftrag und eigenem Haushalt. Die Fähigkeiten bleiben dem Land erhalten, die Uniform ändert sich, und im Norden erscheint dieselbe Einheit nicht mehr als Armee.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 26, lag: 5,
      fiscal: { exp: 24 },
      eff: { disasterPrep: 16, climateRes: 8, militaryCap: -5, militaryMor: -4,
             trustTamil: 7, reconcile: 5, stateCap: 5, infra: 4, veteran: 3 },
      grp: { tamilNE: 9, farmers: 8, sinhalaRural: 6, malaiyaha: 5, military: -8, intl: 6 },
      risk: 'Die Streitkräfte verlieren genau die Einheiten, mit denen sie sich nach dem Krieg öffentliche Zustimmung erarbeitet haben. Die Führung wird das als Angriff auf die Institution verstehen.',
      tags: ['Streitkräfte', 'Katastrophenschutz']
    },
    {
      id: 'sv_professional_army', cat: 'military', sub: 'Struktur',
      title: 'Kleinere Berufsarmee mit besserer Besoldung',
      desc: 'Die Truppenstärke sinkt deutlich, die verbleibenden Soldaten werden anständig bezahlt, ausgebildet und ausgerüstet. Das ist die Gegenthese zur Wehrpflicht: nicht mehr Menschen in Uniform, sondern weniger und bessere. Wer geht, bekommt eine Abfindung und einen Ausbildungsplatz.',
      party: ['NPP', 'NDF'], need: 'simple', pc: 30, lag: 6,
      fiscal: { exp: -55 },
      eff: { militaryCap: 8, militaryMor: 6, veteran: 5, soeHealth: 3,
             trustTamil: 5, reconcile: 4, imfCompl: 5, unemp: 0.35, skillsMatch: 3 },
      grp: { military: -3, intl: 9, business: 7, sinhalaUrban: 6, tamilNE: 6, sinhalaRural: -6 },
      risk: 'Jeder entlassene Soldat ist ein Wähler mit Familie, und viele kommen aus genau den ländlichen Wahlkreisen, die diese Regierung tragen. Ohne belastbares Übergangsprogramm wird aus dem Truppenabbau ein Arbeitslosenprogramm.',
      tags: ['Streitkräfte', 'Haushalt'],
      excl: ['sv_conscription']
    }
  ];

  SL.data.policies = (SL.data.policies || []).concat(P);
})();
