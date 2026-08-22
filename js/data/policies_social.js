/* ============================================================
   MASSNAHMEN  -  Bildung, Gesundheit, Soziales, Gleichberechtigung
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* =============== BILDUNG =============== */
    {
      id: 'ed_spending_4pct', cat: 'education', sub: 'Finanzierung',
      title: 'Bildungsausgaben auf 4 Prozent des BIP anheben',
      desc: 'Sri Lanka gibt seit Jahrzehnten deutlich weniger für Bildung aus als vergleichbare Länder. Der Weg auf 4 Prozent des BIP bedeutet über 900 Mrd. LKR jährlich statt der heutigen Größenordnung.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 16, lag: 6,
      fiscal: { exp: 320 },
      eff: { education: 20, skillsMatch: 8, brainDrain: -6, humanCapitalX: 0, growth: 0.18 },
      grp: { youth: 14, unions: 10, sinhalaUrban: 9, sinhalaRural: 8, intl: -6 },
      risk: 'Der größte einzelne Ausgabenblock, den Sie freiwillig aufmachen können. Der IWF wird nach der Gegenfinanzierung fragen.',
      tags: ['Bildung', 'Haushalt']
    },
    {
      id: 'ed_english', cat: 'education', sub: 'Lehrplan',
      title: 'Englisch ab Klasse 1 mit ausgebildeten Lehrkräften',
      desc: 'Englischkenntnisse entscheiden in Sri Lanka über den Zugang zu gut bezahlten Jobs und wirken damit als soziale Trennlinie. Flächendeckender Unterricht ab der ersten Klasse, mit einem eigenen Ausbildungsprogramm für 15.000 Lehrkräfte.',
      party: ['SJB', 'NPP', 'NDF'], need: 'exec', pc: 8, lag: 8,
      fiscal: { exp: 34 },
      eff: { education: 9, skillsMatch: 14, privateSector: 4, inequality: -1.0, brainDrain: 3 },
      grp: { youth: 12, business: 10, sinhalaUrban: 8, malaiyaha: 6, sangha: -4 },
      risk: 'Bessere Englischkenntnisse erhöhen kurzfristig auch die Auswanderungsfähigkeit. Das ist der Preis.',
      tags: ['Bildung', 'Arbeitsmarkt']
    },
    {
      id: 'ed_vocational', cat: 'education', sub: 'Berufsbildung',
      title: 'Duale Berufsausbildung nach deutschem Vorbild',
      desc: 'Betriebliche Ausbildung mit Berufsschule, gemeinsam getragen von Kammern und Staat, mit anerkannten Abschlüssen. Zielt genau auf die Lücke zwischen 25.000 bis 30.000 Hochschulabsolventen pro Jahr und Unternehmen, die keine Fachkräfte finden.',
      party: ['SJB', 'NPP', 'NDF'], need: 'simple', pc: 12, lag: 8,
      fiscal: { exp: 42 }, oneoff: 25,
      eff: { skillsMatch: 20, youthUnemp: -3.4, education: 7, privateSector: 7, unemp: -0.5, brainDrain: -5 },
      grp: { youth: 15, business: 14, unions: 5, sinhalaRural: 6 },
      risk: 'Funktioniert nur, wenn Unternehmen wirklich Ausbildungsplätze schaffen. Ohne Anreiz bleibt es bei Absichtserklärungen.',
      tags: ['Bildung', 'Arbeitsmarkt']
    },
    {
      id: 'ed_university_expand', cat: 'education', sub: 'Hochschulen',
      title: 'Studienplätze deutlich ausweiten',
      desc: 'Nur ein kleiner Teil der für ein Studium qualifizierten Schulabgänger erhält einen staatlichen Studienplatz. Ausbau bestehender Universitäten und neue Standorte in Jaffna, Batticaloa und Badulla.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 10, lag: 8,
      fiscal: { exp: 58 }, oneoff: 40,
      eff: { education: 10, regionalBalance: 6, youthUnemp: -1.2, skillsMatch: -2 },
      grp: { youth: 14, tamilNE: 7, malaiyaha: 5, sinhalaRural: 6 },
      risk: 'Mehr Absolventen ohne passende Studiengänge verschärfen das Problem arbeitsloser Akademiker.',
      tags: ['Bildung']
    },
    {
      id: 'ed_private_uni', cat: 'education', sub: 'Hochschulen',
      title: 'Private Hochschulen regulieren und zulassen',
      desc: 'Ein klarer Akkreditierungsrahmen für private Universitäten, verbunden mit Stipendienpflichten für einkommensschwache Studierende. Studentenverbände und die JVP-Tradition lehnen private Hochschulbildung grundsätzlich ab.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 22, lag: 6,
      fiscal: { rev: 12, exp: 6 },
      eff: { education: 6, skillsMatch: 8, privateSector: 5, brainDrain: -5, inequality: 0.8 },
      grp: { business: 12, sinhalaUrban: 7, unions: -14, youth: -8 },
      risk: 'Studentenproteste sind bei diesem Thema in Sri Lanka historisch garantiert und teils gewalttätig verlaufen.',
      tags: ['Bildung', 'Umstritten']
    },
    {
      id: 'ed_teacher_pay', cat: 'education', sub: 'Personal',
      title: 'Lehrergehälter und Laufbahnstruktur reformieren',
      desc: 'Ein eigenes Besoldungsschema mit Leistungsstufen, Zulagen für schwierige Standorte im Hochland, im Norden und in der Trockenzone sowie verpflichtende Fortbildung.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 12, lag: 4,
      fiscal: { exp: 78 },
      eff: { education: 13, regionalBalance: 5, brainDrain: -4, skillsMatch: 4 },
      grp: { unions: 16, youth: 6, publicSector: 8, sinhalaRural: 5, intl: -3 },
      risk: 'Der Lehrerstreik von 2021 legte den Fernunterricht monatelang lahm. Diese Gruppe ist streikfähig und gut organisiert.',
      tags: ['Bildung', 'Personal']
    },
    {
      id: 'ed_digital_school', cat: 'education', sub: 'Ausstattung',
      title: 'Digitale Ausstattung für alle Schulen',
      desc: 'Breitband, Endgeräte, Lernplattform und Fortbildung. Während der Pandemie und nach Ditwah zeigte sich, wie viele Kinder ohne Anbindung schlicht keinen Unterricht mehr hatten.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 6, lag: 6,
      fiscal: { exp: 28 }, oneoff: 45,
      eff: { education: 8, digitalGov: 6, skillsMatch: 6, regionalBalance: 5 },
      grp: { youth: 11, sinhalaRural: 6, tamilNE: 5, business: 4 },
      risk: 'Geräte ohne Wartung und Lehrerfortbildung landen erfahrungsgemäß im Schrank.',
      tags: ['Bildung', 'Digital']
    },
    {
      id: 'ed_meal', cat: 'education', sub: 'Soziales',
      title: 'Warme Schulmahlzeit für alle Grundschulkinder',
      desc: 'Eine tägliche Mahlzeit erhöht nachweislich Anwesenheit und Lernerfolg und wirkt unmittelbar gegen Mangelernährung. Nach der Krise ist der Bedarf deutlich größer als vorher.',
      party: ['NPP', 'SJB', 'CWC'], need: 'exec', pc: 5, lag: 2,
      fiscal: { exp: 46 },
      eff: { malnutrition: -13, education: 6, poverty: -0.6, health: 5, agriProd: 2 },
      grp: { sinhalaRural: 12, malaiyaha: 12, farmers: 8, youth: 6, tamilNE: 8 },
      risk: 'Sehr sichtbar, sehr beliebt, laufende Kosten dauerhaft im Haushalt.',
      tags: ['Bildung', 'Ernährung']
    },
    {
      id: 'ed_quota_reform', cat: 'education', sub: 'Zugang',
      title: 'Hochschulzulassung nach Distriktquoten überarbeiten',
      desc: 'Die Quotenregelung soll benachteiligte Distrikte fördern, führt aber zu sehr unterschiedlichen Aufnahmegrenzen für dieselben Studiengänge. Eine Reform ersetzt starre Quoten durch einen sozialen Nachteilsausgleich auf Schulebene.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 18, lag: 5,
      fiscal: { exp: 4 },
      eff: { education: 5, inequality: -0.8, skillsMatch: 4, regionalBalance: -2 },
      grp: { sinhalaUrban: 8, tamilNE: 5, youth: 5, sinhalaRural: -9, farmers: -6 },
      risk: 'Die Standardisierungspolitik der 1970er Jahre gilt als Mitauslöser des tamilischen Aufstands. Jede Änderung an Zulassungsregeln ist historisch aufgeladen.',
      tags: ['Bildung', 'Umstritten']
    },
    {
      id: 'ed_stem', cat: 'education', sub: 'Lehrplan',
      title: 'Schwerpunktprogramm für Technik, Daten und Naturwissenschaften',
      desc: 'Ausbau von Laboren, Lehrstühlen und Stipendien in Informatik, Ingenieurwesen und Datenwissenschaft, verbunden mit einer Bleibeprämie für Absolventen, die im Land arbeiten.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 7, lag: 8,
      fiscal: { exp: 32 },
      eff: { skillsMatch: 11, education: 6, privateSector: 6, brainDrain: -6, fdi: 0.2 },
      grp: { youth: 10, business: 11, sinhalaUrban: 6 },
      risk: 'Genau diese Absolventen sind international am gefragtesten. Ohne Perspektive im Land beschleunigen Sie die Abwanderung.',
      tags: ['Bildung', 'Wirtschaft']
    },
    {
      id: 'ed_preschool', cat: 'education', sub: 'Frühkindlich',
      title: 'Flächendeckende frühkindliche Bildung',
      desc: 'Ausbau der Vorschulen mit ausgebildetem Personal, besonders im Plantagenhochland und in der Trockenzone. Frühkindliche Förderung hat von allen Bildungsinvestitionen die höchste Rendite.',
      party: ['NPP', 'SJB', 'CWC'], need: 'exec', pc: 5, lag: 8,
      fiscal: { exp: 26 },
      eff: { education: 9, malnutrition: -5, femaleLFP: 1.6, casteEquity: 4, inequality: -0.9 },
      grp: { malaiyaha: 11, youth: 6, unions: 5, sinhalaRural: 7 },
      risk: 'Die Wirkung ist erst in fünfzehn Jahren messbar. Sie werden politisch nichts davon haben.',
      tags: ['Bildung', 'Gleichstellung']
    },

    /* =============== GESUNDHEIT =============== */
    {
      id: 'he_free_care', cat: 'health', sub: 'Grundsatz',
      title: 'Kostenlose Gesundheitsversorgung verfassungsfest machen',
      desc: 'Der freie Zugang zu staatlicher Gesundheitsversorgung wird als Staatsziel in die Verfassung geschrieben und gegen Sparauflagen abgesichert.',
      party: ['NPP', 'FSP', 'SJB'], need: 'twothirds', pc: 18, lag: 2,
      fiscal: {},
      eff: { health: 6, legitimacy: 6, socialProt: 5 },
      grp: { sinhalaRural: 11, unions: 9, youth: 6, malaiyaha: 7, intl: -5 },
      risk: 'Bindet künftige Regierungen und schränkt Ihren eigenen Spielraum bei Sparrunden ein.',
      tags: ['Gesundheit', 'Verfassung']
    },
    {
      id: 'he_medicine_supply', cat: 'health', sub: 'Versorgung',
      title: 'Arzneimittelversorgung sichern und lokale Produktion aufbauen',
      desc: 'Während der Krise fehlten in Krankenhäusern grundlegende Medikamente. Ein staatlicher Pufferbestand, Rahmenverträge mit indischen und bangladeschischen Herstellern und der Aufbau eigener Produktion für Basispräparate.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 9, lag: 5,
      fiscal: { exp: 42 }, oneoff: 30,
      eff: { health: 14, malnutrition: -3, privateSector: 3, reserves: -0.06 },
      grp: { sinhalaRural: 10, unions: 8, youth: 5, business: 4 },
      risk: 'Beschaffung im Gesundheitswesen ist einer der korruptionsanfälligsten Bereiche überhaupt.',
      tags: ['Gesundheit', 'Industrie']
    },
    {
      id: 'he_retain_doctors', cat: 'health', sub: 'Personal',
      title: 'Ärzte und Pflegekräfte im Land halten',
      desc: 'Seit 2022 haben Tausende Fachkräfte das Land verlassen. Bessere Bezahlung, verlässliche Dienstpläne, Facharztweiterbildung im Inland und Rückkehrprogramme für Ausgewanderte.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 12, lag: 4,
      fiscal: { exp: 64 },
      eff: { health: 15, brainDrain: -12, malnutrition: -3, education: 2 },
      grp: { unions: 14, sinhalaRural: 9, youth: 6, publicSector: 8, intl: -3 },
      risk: 'Auch mit besserer Bezahlung bleibt der Gehaltsunterschied zu Australien oder Großbritannien groß.',
      tags: ['Gesundheit', 'Abwanderung']
    },
    {
      id: 'he_nutrition', cat: 'health', sub: 'Ernährung',
      title: 'Nationales Programm gegen Mangelernährung',
      desc: 'Fast jedes sechste Kind kommt mit niedrigem Geburtsgewicht zur Welt. Mikronährstoffe für Schwangere, Zusatznahrung für Kleinkinder, Beratung durch Gesundheitshelferinnen und Anreicherung von Grundnahrungsmitteln.',
      party: ['NPP', 'SJB', 'CWC'], need: 'exec', pc: 5, lag: 4,
      fiscal: { exp: 34 },
      eff: { malnutrition: -18, health: 8, education: 4, poverty: -0.3 },
      grp: { malaiyaha: 12, sinhalaRural: 10, tamilNE: 9, farmers: 6, intl: 6 },
      risk: 'Kaum politisch umstritten und deshalb bei Haushaltskürzungen besonders gefährdet.',
      tags: ['Gesundheit', 'Ernährung']
    },
    {
      id: 'he_ckdu', cat: 'health', sub: 'Prävention',
      title: 'Chronische Nierenerkrankung in der Trockenzone bekämpfen',
      desc: 'In Anuradhapura, Polonnaruwa und Teilen von Uva erkranken auffällig viele Landarbeiter an einer Nierenerkrankung unbekannter Ursache. Sauberes Trinkwasser, Dialysestationen, Forschung und strengere Regeln für Agrochemikalien.',
      party: ['NPP', 'SJB', 'SLPP'], need: 'exec', pc: 5, lag: 5,
      fiscal: { exp: 24 }, oneoff: 20,
      eff: { health: 9, regionalBalance: 4, agriProd: -2, foodSec: 2 },
      grp: { farmers: 14, sinhalaRural: 12, intl: 4 },
      risk: 'Strengere Regeln für Pestizide treffen genau die Bauern, denen das Programm helfen soll.',
      tags: ['Gesundheit', 'Landwirtschaft']
    },
    {
      id: 'he_mental', cat: 'health', sub: 'Prävention',
      title: 'Psychische Gesundheit in die Grundversorgung integrieren',
      desc: 'Sri Lanka hat historisch eine der höchsten Suizidraten der Welt. Ausbildung von Hausärzten, dezentrale Beratungsstellen, Schulpsychologen und eine Notfallhotline in drei Sprachen.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 4, lag: 5,
      fiscal: { exp: 16 },
      eff: { health: 8, veteran: 5, internalSec: 3, brainDrain: -2, reconcile: 3 },
      grp: { youth: 9, unions: 5, tamilNE: 6, military: 5 },
      risk: 'Es fehlt an Fachpersonal. Der Aufbau dauert eine Generation.',
      tags: ['Gesundheit']
    },
    {
      id: 'he_ncd', cat: 'health', sub: 'Prävention',
      title: 'Vorsorge gegen Diabetes und Herzkrankheiten',
      desc: 'Zuckersteuer, Nährwertampel auf Verpackungen, Werbebeschränkungen für Kinder und flächendeckende Vorsorgeuntersuchungen. Nichtübertragbare Krankheiten verursachen den größten Teil der Krankheitslast.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 10, lag: 6,
      fiscal: { rev: 32, exp: 14 },
      eff: { health: 10, malnutrition: -3, inflation: 0.1 },
      grp: { business: -8, sinhalaUrban: 4, youth: 3, intl: 5 },
      risk: 'Die Lebensmittel- und Getränkeindustrie wird die Zuckersteuer massiv bekämpfen.',
      tags: ['Gesundheit', 'Steuern']
    },
    {
      id: 'he_rural_hospitals', cat: 'health', sub: 'Versorgung',
      title: 'Basiskrankenhäuser in ländlichen Gebieten ausbauen',
      desc: 'Ausstattung, Personal und Notfalltransport für Krankenhäuser in Monaragala, Mullaitivu, Nuwara Eliya und anderen unterversorgten Distrikten, damit nicht jeder ernste Fall nach Colombo oder Kandy muss.',
      party: ['NPP', 'SJB', 'CWC', 'ITAK'], need: 'exec', pc: 7, lag: 6,
      fiscal: { exp: 44 }, oneoff: 35,
      eff: { health: 11, regionalBalance: 8, trustHill: 7, trustTamil: 6, poverty: -0.3 },
      grp: { malaiyaha: 11, tamilNE: 10, sinhalaRural: 10, farmers: 7 },
      risk: 'Gebäude sind schnell gebaut, Fachärzte nicht. Ohne Personal bleiben es leere Hüllen.',
      tags: ['Gesundheit', 'Regional']
    },
    {
      id: 'he_insurance', cat: 'health', sub: 'Finanzierung',
      title: 'Ergänzende Krankenversicherung für Zusatzleistungen',
      desc: 'Eine beitragsfinanzierte Versicherung für Wahlleistungen und private Behandlung, ohne die kostenlose Grundversorgung anzutasten. Soll private Zuzahlungen kalkulierbar machen, die heute viele Haushalte in die Armut treiben.',
      party: ['NDF', 'SJB'], need: 'simple', pc: 14, lag: 6,
      fiscal: { rev: 26, exp: 12 },
      eff: { health: 5, poverty: -0.4, socialProt: 5, privateSector: 4 },
      grp: { sinhalaUrban: 6, business: 6, unions: -9, sinhalaRural: -4 },
      risk: 'Gewerkschaften und Ärzteverbände sehen darin den Einstieg in die Zweiklassenmedizin.',
      tags: ['Gesundheit', 'Soziales']
    },

    /* =============== SOZIALES =============== */
    {
      id: 'so_aswesuma_expand', cat: 'social', sub: 'Transfers',
      title: 'Aswesuma ausweiten und besser zuschneiden',
      desc: 'Rund ein Viertel der Bevölkerung lebt unter der Armutsgrenze, viele weitere knapp darüber. Ausweitung der Empfängerzahl, höhere Sätze und ein besseres Auswahlverfahren, das die vielen fehlerhaften Ablehnungen korrigiert.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 10, lag: 2,
      fiscal: { exp: 180 },
      eff: { poverty: -3.6, socialProt: 20, malnutrition: -6, inequality: -1.8 },
      grp: { sinhalaRural: 16, malaiyaha: 14, farmers: 12, tamilNE: 10, unions: 8, intl: -6, business: -4 },
      risk: 'Der IWF akzeptiert höhere Sozialausgaben nur, wenn sie treffsicher sind und gegenfinanziert werden.',
      tags: ['Soziales', 'Armut']
    },
    {
      id: 'so_aswesuma_target', cat: 'social', sub: 'Transfers',
      title: 'Treffsicherheit der Sozialtransfers verbessern',
      desc: 'Statt mehr Geld auszugeben, wird das Auswahlverfahren überarbeitet: Datenabgleich, unabhängige Beschwerdestelle, regelmäßige Neubewertung. Ein erheblicher Teil der Mittel erreicht heute nicht die Ärmsten.',
      party: ['NPP', 'NDF', 'SJB'], need: 'exec', pc: 6, lag: 3,
      fiscal: { exp: 8 },
      eff: { socialProt: 14, poverty: -1.4, corruption: 3, stateCap: 4, digitalGov: 3 },
      grp: { intl: 9, sinhalaRural: 5, malaiyaha: 5, business: 3 },
      risk: 'Jede Neubewertung nimmt auch Menschen Leistungen weg, die sie bisher bekommen haben. Das erzeugt Wut.',
      risks: ['revenue_authority'],
      tags: ['Soziales', 'Verwaltung']
    },
    {
      id: 'so_pension_universal', cat: 'social', sub: 'Alter',
      title: 'Grundrente für alle über 70',
      desc: 'Nur ein kleiner Teil der Älteren hat eine Rente, der Rest lebt von Familie oder gar nichts. Eine steuerfinanzierte Grundsicherung im Alter, unabhängig von früherer Beschäftigung.',
      party: ['SJB', 'NPP', 'FSP'], need: 'simple', pc: 12, lag: 3,
      fiscal: { exp: 145 },
      eff: { poverty: -2.4, socialProt: 15, health: 3, inequality: -1.2 },
      grp: { sinhalaRural: 16, malaiyaha: 12, farmers: 10, unions: 7, intl: -7 },
      risk: 'Dauerhafte Belastung, die mit der Alterung der Gesellschaft automatisch wächst.',
      tags: ['Soziales', 'Alter']
    },
    {
      id: 'so_childcare', cat: 'social', sub: 'Gleichstellung',
      title: 'Kinderbetreuung und sichere Wege zur Arbeit',
      desc: 'Nur rund 31 Prozent der Frauen sind erwerbstätig, während sie einen großen Teil der Hochschulabsolventen stellen. Betreuungsplätze, sichere Busverbindungen, verlängerter Mutterschutz mit Vaterschaftsanteil und Schutz vor Belästigung im Nahverkehr.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 9, lag: 6,
      fiscal: { exp: 52 },
      eff: { femaleLFP: 6.5, growth: 0.28, poverty: -0.8, education: 3, unemp: -0.2 },
      grp: { youth: 12, sinhalaUrban: 10, unions: 8, business: 7, malaiyaha: 6, sangha: -3 },
      risk: 'Wirtschaftlich eine der ertragreichsten Maßnahmen überhaupt und trotzdem chronisch unterfinanziert.',
      tags: ['Gleichstellung', 'Arbeitsmarkt']
    },
    {
      id: 'so_gbv', cat: 'social', sub: 'Gleichstellung',
      title: 'Gesetz gegen geschlechtsbezogene Gewalt schärfen',
      desc: 'Eigener Straftatbestand für Vergewaltigung in der Ehe, Schutzanordnungen, Frauenhäuser in allen Distrikten und geschulte Ansprechpersonen bei der Polizei.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 11, lag: 4,
      fiscal: { exp: 14 },
      eff: { ruleOfLaw: 5, femaleLFP: 1.1, health: 4, socialProt: 4, internalSec: 3 },
      grp: { youth: 9, sinhalaUrban: 8, unions: 5, sangha: -5, sinhalaRural: -3 },
      risk: 'Widerstand kommt oft weniger aus der Politik als aus Verwaltung und Justiz vor Ort.',
      risks: ['police_politicised'],
      tags: ['Gleichstellung', 'Recht']
    },
    {
      id: 'so_disability', cat: 'social', sub: 'Teilhabe',
      title: 'Rechte von Menschen mit Behinderung durchsetzen',
      desc: 'Barrierefreiheit in öffentlichen Gebäuden und im Verkehr, Beschäftigungsquote, angemessene Unterstützungsleistungen. Der Krieg hat zudem Zehntausende Menschen mit dauerhaften Verletzungen hinterlassen.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 7, lag: 5,
      fiscal: { exp: 20 },
      eff: { socialProt: 8, veteran: 7, legitimacy: 4, poverty: -0.3 },
      grp: { military: 7, tamilNE: 6, unions: 5, youth: 4, business: -3 },
      risk: 'Barrierefreiheit ist teuer und wird bei Bauprojekten regelmäßig zuerst gestrichen.',
      tags: ['Teilhabe', 'Soziales']
    },
    {
      id: 'so_housing_urban', cat: 'social', sub: 'Wohnen',
      title: 'Wohnungsbau für einkommensschwache Haushalte',
      desc: 'Sozialer Wohnungsbau in Colombo, Gampaha und den Provinzhauptstädten, verbunden mit einer Regelung für informelle Siedlungen statt Zwangsräumungen.',
      party: ['SJB', 'NPP', 'FSP'], need: 'simple', pc: 11, lag: 6,
      fiscal: { exp: 60 }, oneoff: 40,
      eff: { housing: 15, poverty: -0.8, health: 4, infra: 3 },
      grp: { sinhalaUrban: 10, unions: 8, muslim: 6, youth: 6, business: 3 },
      risk: 'Bodenpreise in Colombo machen jedes Programm teurer als geplant.',
      risks: ['no_land_registry'],
      tags: ['Wohnen', 'Soziales']
    },
    {
      id: 'so_migrant_workers', cat: 'social', sub: 'Migration',
      title: 'Arbeitsmigranten besser schützen',
      desc: 'Über eine Million Srilanker arbeiten im Ausland, vor allem am Golf, und ihre Überweisungen tragen die Zahlungsbilanz. Verbindliche Musterverträge, Vorabschulung, Konsularschutz und ein Notfallfonds bei Missbrauch.',
      party: ['NPP', 'SJB', 'SLMC'], need: 'exec', pc: 5, lag: 3,
      fiscal: { exp: 9 },
      eff: { remittances: 0.4, relGulf: 6, socialProt: 5, legitimacy: 3 },
      grp: { unions: 8, muslim: 7, malaiyaha: 6, sinhalaRural: 7, intl: 4 },
      risk: 'Zu strenge Auflagen können Zielländer dazu bringen, Arbeitskräfte anderswo anzuwerben.',
      tags: ['Migration', 'Devisen']
    },
    {
      id: 'so_diaspora_return', cat: 'social', sub: 'Migration',
      title: 'Rückkehrprogramm für ausgewanderte Fachkräfte',
      desc: 'Steuerliche Anreize, Anerkennung ausländischer Abschlüsse, Forschungsstipendien und Unterstützung bei der Wohnungssuche für Ärzte, Ingenieure und IT-Fachkräfte, die zurückkehren wollen.',
      party: ['SJB', 'NPP', 'NDF'], need: 'exec', pc: 6, lag: 6,
      fiscal: { rev: -8, exp: 14 },
      eff: { brainDrain: -9, skillsMatch: 6, health: 3, privateSector: 4, diaspora: 8 },
      grp: { diaspora: 12, business: 8, youth: 5, sinhalaUrban: 5, unions: -4 },
      risk: 'Rückkehr geschieht nur, wenn im Land Perspektiven bestehen. Anreize allein reichen nicht.',
      tags: ['Abwanderung', 'Diaspora']
    }
  ];
  SL.data.policies = (SL.data.policies || []).concat(P);
})();
