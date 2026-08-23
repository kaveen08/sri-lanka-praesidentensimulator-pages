/* ============================================================
   MASSNAHMEN  -  Erweiterungen aller Ressorts

   Ergänzt den Grundkatalog dort, wo er dünn war: Gesundheit,
   Soziales, Landwirtschaft, Energie, Digitales, Außenpolitik,
   Bildung und Wirtschaft hatten je weniger als vierzehn Optionen,
   was für eine Amtszeit von vierzehn Quartalen zu wenig Auswahl
   ist. Dazu Ergänzungen in den großen Ressorts, wo eine Position
   im politischen Spektrum fehlte.

   fiscal.rev / fiscal.exp in LKR Mrd. pro Jahr
   need: exec | simple | twothirds | referendum
   ============================================================ */
(function () {
  'use strict';
  var P = [

    /* =========================================================
       GESUNDHEIT
       ========================================================= */
    {
      id: 'he_primary_care', cat: 'health', sub: 'Versorgung',
      title: 'Hausarztsystem mit fester Einschreibung aufbauen',
      desc: 'Jeder Haushalt wird bei einer wohnortnahen Praxis eingeschrieben, die zuerst behandelt und nur bei Bedarf überweist. Sri Lankas Krankenhäuser sind überlaufen, weil jeder mit jedem Anliegen direkt in die Ambulanz geht. Ein funktionierender erster Kontakt entlastet die Häuser und findet chronische Krankheiten früher.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 20, lag: 5,
      fiscal: { exp: 58 },
      eff: { health: 14, malnutrition: -5, socialProt: 4, regionalBalance: 4, stateCap: 3 },
      grp: { sinhalaRural: 10, malaiyaha: 8, farmers: 7, tamilNE: 6, unions: 4, publicSector: 3 },
      risk: 'Ohne genügend Allgemeinmedizinerinnen und -mediziner in ländlichen Gebieten bleibt es ein Papiersystem. Und die großen Krankenhäuser geben Zuständigkeit und Budget nicht freiwillig ab.',
      tags: ['Gesundheit', 'Ländlicher Raum'], risks: ['no_local_capacity']
    },
    {
      id: 'he_generic_production', cat: 'health', sub: 'Versorgung',
      title: 'Einheimische Produktion von Basismedikamenten fördern',
      desc: 'Sri Lanka führt fast alle Medikamente ein und zahlt in Devisen, die es nicht hat. Ein staatlich gestütztes Produktionscluster für die dreißig wichtigsten Generika macht das Land bei den Grundversorgungsmitteln unabhängiger.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 18, lag: 6,
      fiscal: { exp: 46 },
      eff: { health: 9, reserves: 0.25, privateSector: 4, soeHealth: 3, skillsMatch: 3 },
      grp: { business: 5, sinhalaRural: 6, unions: 5, publicSector: 4, intl: -2 },
      risk: 'Arzneimittelproduktion braucht Qualitätsaufsicht, die es in dieser Form nicht gibt. Ein Skandal um verunreinigte Ware würde das Vertrauen in die kostenlose Versorgung insgesamt beschädigen.',
      tags: ['Gesundheit', 'Industrie']
    },
    {
      id: 'he_emergency_network', cat: 'health', sub: 'Versorgung',
      title: 'Landesweiter Rettungsdienst mit einheitlicher Notrufnummer',
      desc: 'Der von Indien finanzierte Rettungsdienst deckt inzwischen große Teile des Landes ab, aber nicht alle. Ein Ausbau mit eigener Finanzierung, einheitlicher Nummer und Anbindung an die Krankenhäuser macht daraus ein System.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 12, lag: 3,
      fiscal: { exp: 26 },
      eff: { health: 8, internalSec: 3, disasterPrep: 5, regionalBalance: 3, relIndia: 3 },
      grp: { sinhalaRural: 8, farmers: 6, tamilNE: 5, malaiyaha: 5, sinhalaUrban: 4 },
      risk: 'Ein Rettungswagen nützt wenig, wenn die Straße zum Krankenhaus zwei Stunden kostet. Ohne den Ausbau der ländlichen Häuser bleibt die Wirkung begrenzt.',
      tags: ['Gesundheit', 'Notfall']
    },
    {
      id: 'he_dialysis', cat: 'health', sub: 'CKDu',
      title: 'Dialysekapazität in der Trockenzone ausbauen',
      desc: 'Die chronische Nierenerkrankung unbekannter Ursache trifft Zehntausende Bauernfamilien in Anuradhapura, Polonnaruwa und Badulla. Wer eine Dialyse braucht, fährt oft mehrere Stunden. Dezentrale Stationen mit Heimdialyseprogramm verkürzen diese Wege.',
      party: ['NPP', 'SJB', 'SB'], need: 'simple', pc: 14, lag: 4,
      fiscal: { exp: 38 },
      eff: { health: 8, poverty: -0.5, regionalBalance: 4, socialProt: 4 },
      grp: { farmers: 14, sinhalaRural: 11, unions: 3 },
      risk: 'Dialyse behandelt die Folgen, nicht die Ursache. Ohne saubere Trinkwasserversorgung und eine Antwort auf die Agrochemikalien wächst die Zahl der Betroffenen weiter.',
      tags: ['Gesundheit', 'CKDu', 'Ländlicher Raum']
    },
    {
      id: 'he_tobacco_alcohol_prevention', fline: 'excise', cat: 'health', sub: 'Prävention',
      title: 'Ernsthafte Prävention bei Alkohol und Tabak',
      desc: 'Werbeverbot, Schockbilder, Verkaufsbeschränkungen und ein Entwöhnungsprogramm in den Betrieben. Der Staat verdient an beidem erheblich, und genau das ist seit Jahrzehnten das Argument gegen jede wirksame Prävention.',
      party: ['NPP', 'SB'], need: 'simple', pc: 15, lag: 4,
      fiscal: { rev: -32, exp: 12 },
      eff: { health: 9, malnutrition: -3, internalSec: 3, poverty: -0.3 },
      grp: { sangha: 11, sinhalaRural: 6, unions: 4, business: -7, publicSector: 2 },
      risk: 'Verbrauchsteuern auf Alkohol und Tabak sind eine der verlässlichsten Einnahmequellen des Staates. Weniger Konsum heißt weniger Aufkommen, und der Schwarzmarkt füllt einen Teil der Lücke.',
      tags: ['Gesundheit', 'Prävention']
    },

    /* =========================================================
       SOZIALES
       ========================================================= */
    {
      id: 'so_care_workers', cat: 'social', sub: 'Pflege',
      title: 'Pflegeberufe aufwerten und Altenpflege aufbauen',
      desc: 'Sri Lanka altert schneller als jedes andere südasiatische Land, hat aber kaum professionelle Altenpflege. Ausbildungsgänge, ein Berufsbild und eine öffentliche Finanzierung schaffen Versorgung und zugleich Arbeitsplätze, überwiegend für Frauen.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 17, lag: 5,
      fiscal: { exp: 52 },
      eff: { health: 7, socialProt: 8, femaleLFP: 4.5, skillsMatch: 4, unemp: -0.3, poverty: -0.6 },
      grp: { unions: 9, sinhalaRural: 7, publicSector: 6, malaiyaha: 5, youth: 4 },
      risk: 'Ausgebildete Pflegekräfte sind im Ausland gefragt. Ohne Bezahlung, die dem standhält, bildet Sri Lanka für den Golfraum und Italien aus.',
      tags: ['Soziales', 'Pflege', 'Frauen']
    },
    {
      id: 'so_informal_social_security', cat: 'social', sub: 'Sicherung',
      title: 'Soziale Sicherung für informell Beschäftigte',
      desc: 'Rund zwei Drittel der Erwerbstätigen arbeiten ohne Vertrag, ohne Rentenanspruch und ohne Absicherung bei Krankheit. Ein beitragsbasiertes System mit staatlichem Zuschuss, das über das Mobiltelefon läuft, erreicht sie zum ersten Mal.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 22, lag: 6,
      fiscal: { exp: 68 },
      eff: { socialProt: 12, poverty: -1.4, inequality: -1.5, taxCompl: 5, digitalGov: 4, femaleLFP: 2 },
      grp: { unions: 11, sinhalaRural: 9, farmers: 8, malaiyaha: 7, muslim: 5, business: -3 },
      risk: 'Wer nichts verdient, kann nichts einzahlen. Ohne spürbaren staatlichen Zuschuss bleibt das System bei denen, die ohnehin schon abgesichert sind.',
      tags: ['Soziales', 'Informeller Sektor'], risks: ['revenue_authority']
    },
    {
      id: 'so_child_benefit', cat: 'social', sub: 'Familie',
      title: 'Kindergeld für alle Haushalte unter der Mittelschicht',
      desc: 'Eine feste monatliche Zahlung je Kind, ohne die aufwendige Bedürftigkeitsprüfung, an der Aswesuma regelmäßig scheitert. Einfach zu verwalten, schwer zu missbrauchen, und es wirkt sofort gegen Mangelernährung.',
      party: ['SJB', 'NPP', 'FSP'], need: 'simple', pc: 19, lag: 3,
      fiscal: { exp: 96 },
      eff: { poverty: -2.2, malnutrition: -9, socialProt: 10, inequality: -1.8, education: 3 },
      grp: { sinhalaRural: 12, malaiyaha: 11, farmers: 9, tamilNE: 8, muslim: 7, unions: 6, intl: -7 },
      risk: 'Eine Leistung ohne Bedürftigkeitsprüfung ist teuer und beim Währungsfonds schwer zu verteidigen. Rechnen Sie mit einer Auseinandersetzung über den Primärsaldo.',
      tags: ['Soziales', 'Familie', 'Armut']
    },
    {
      id: 'so_domestic_workers', cat: 'social', sub: 'Arbeit',
      title: 'Hausangestellte dem Arbeitsrecht unterstellen',
      desc: 'Hunderttausende, fast ausschließlich Frauen, arbeiten in privaten Haushalten ohne geregelte Arbeitszeit, ohne Mindestlohn und ohne Kündigungsschutz. Eine Einbeziehung ins Arbeitsrecht ändert daran zunächst wenig, schafft aber überhaupt erst einen Anspruch.',
      party: ['NPP', 'FSP', 'SJB'], need: 'simple', pc: 13, lag: 4,
      fiscal: {},
      eff: { socialProt: 5, femaleLFP: 2.5, inequality: -0.8, ruleOfLaw: 3, casteEquity: 4 },
      grp: { unions: 9, malaiyaha: 8, youth: 4, sinhalaUrban: -5, business: -3 },
      risk: 'Durchsetzbar ist das kaum: Niemand kontrolliert Privathaushalte. Und die Mittelschicht, die diese Regierung mitgewählt hat, ist die Arbeitgeberin.',
      tags: ['Soziales', 'Frauen', 'Arbeitsrecht'], risks: ['court_backlog']
    },
    {
      id: 'so_disability_access', cat: 'social', sub: 'Teilhabe',
      title: 'Barrierefreiheit verbindlich vorschreiben',
      desc: 'Öffentliche Gebäude, Verkehrsmittel, Schulen und Behörden werden binnen fünf Jahren zugänglich gemacht. Sri Lanka hat aus dem Krieg und aus der hohen Zahl von Verkehrsunfällen eine große Zahl von Menschen mit Behinderung, für die der öffentliche Raum praktisch verschlossen ist.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 14, lag: 5,
      fiscal: { exp: 34 },
      eff: { socialProt: 6, infra: 4, veteran: 5, femaleLFP: 1.2, legitimacy: 3, housing: 3 },
      grp: { unions: 6, military: 5, youth: 5, tamilNE: 4, publicSector: 3, business: -4 },
      risk: 'Vorschriften ohne Kontrolle bleiben Papier. Und Umbauten kosten dort am meisten, wo die Gebäude am ältesten sind.',
      tags: ['Soziales', 'Teilhabe']
    },
    {
      id: 'so_youth_guarantee', cat: 'social', sub: 'Jugend',
      title: 'Jugendgarantie: Ausbildung, Arbeit oder Praktikum binnen vier Monaten',
      desc: 'Wer unter 25 ist und vier Monate ohne Beschäftigung, bekommt ein konkretes Angebot: Ausbildungsplatz, geförderte Anstellung oder Praktikum. Das europäische Modell, angepasst an einen Arbeitsmarkt, auf dem jeder fünfte junge Mensch keine Stelle findet.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 24, lag: 5,
      fiscal: { exp: 88 },
      eff: { youthUnemp: -6.5, unemp: -0.7, skillsMatch: 8, brainDrain: -6, education: 3, privateSector: 3 },
      grp: { youth: 16, unions: 7, sinhalaRural: 6, business: 5, malaiyaha: 4, intl: -4 },
      risk: 'Eine Garantie, die der Staat nicht einlösen kann, ist schlimmer als keine. Das Programm steht und fällt mit den Betrieben, die Plätze anbieten.',
      tags: ['Soziales', 'Jugend', 'Arbeit']
    },

    /* =========================================================
       LANDWIRTSCHAFT UND FISCHEREI
       ========================================================= */
    {
      id: 'ag_irrigation_rehab', cat: 'agri', sub: 'Bewässerung',
      title: 'Die alten Bewässerungssysteme instand setzen',
      desc: 'Sri Lankas Tankkaskaden sind zweitausend Jahre alt und funktionieren immer noch, wo sie gepflegt werden. Systematische Instandsetzung von Dämmen, Kanälen und Speichern ist die billigste Klimaanpassung, die das Land haben kann, und sie schafft Arbeit vor Ort.',
      party: ['NPP', 'SJB', 'SB'], need: 'simple', pc: 16, lag: 5,
      fiscal: { exp: 62 },
      eff: { agriProd: 12, climateRes: 9, foodSec: 7, infra: 5, regionalBalance: 5, poverty: -0.8, unemp: -0.25 },
      grp: { farmers: 16, sinhalaRural: 11, sangha: 4, tamilNE: 4 },
      risk: 'Die Zuständigkeit liegt zwischen Zentralregierung, Provinzen und Bauernverbänden verstreut. Ohne klare Verantwortung versickert das Geld in Teilprojekten.',
      tags: ['Landwirtschaft', 'Klima', 'Wasser'], risks: ['no_local_capacity']
    },
    {
      id: 'ag_crop_insurance', cat: 'agri', sub: 'Absicherung',
      title: 'Ernteversicherung mit Wetterindex',
      desc: 'Statt aufwendiger Schadensbegutachtung zahlt die Versicherung automatisch, wenn Niederschlagsdaten einen Schwellenwert unterschreiten. Nach Ditwah und den Dürren der letzten Jahre ist das der Unterschied zwischen einem schlechten Jahr und dem Verlust des Hofes.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 15, lag: 4,
      fiscal: { exp: 40 },
      eff: { agriProd: 6, climateRes: 8, foodSec: 5, poverty: -0.9, socialProt: 5, disasterPrep: 4 },
      grp: { farmers: 15, sinhalaRural: 9, tamilNE: 5, business: 3, intl: 4 },
      risk: 'Ein Index bildet nicht jeden Schaden ab. Wer trotz ausreichendem Regen alles verliert, bekommt nichts, und das Vertrauen in das ganze System hängt an solchen Fällen.',
      tags: ['Landwirtschaft', 'Klima', 'Versicherung']
    },
    {
      id: 'ag_farm_gate_prices', cat: 'agri', sub: 'Vermarktung',
      title: 'Zwischenhandel aufbrechen, Erzeugerpreise sichern',
      desc: 'Zwischen Feld und Markt liegen in Sri Lanka regelmäßig fünf Handelsstufen, von denen keine dem Erzeuger gehört. Erzeugergemeinschaften, ein digitaler Marktplatz und eine Mindestabnahme bei Grundnahrungsmitteln verkürzen die Kette.',
      party: ['NPP', 'FSP'], need: 'simple', pc: 18, lag: 4,
      fiscal: { exp: 44 },
      eff: { agriProd: 8, foodSec: 6, poverty: -1.0, inflation: -0.4, inequality: -0.8, digitalGov: 3 },
      grp: { farmers: 17, sinhalaRural: 9, unions: 4, business: -9, muslim: -4 },
      risk: 'Der Zwischenhandel ist gut organisiert, politisch vernetzt und in Teilen entlang ethnischer Linien strukturiert. Ein Frontalangriff darauf hat schon Regierungen Stimmen gekostet.',
      tags: ['Landwirtschaft', 'Handel']
    },
    {
      id: 'ag_seed_sovereignty', cat: 'agri', sub: 'Saatgut',
      title: 'Eigene Saatgutproduktion und Sortenbank aufbauen',
      desc: 'Sri Lanka führt einen großen Teil seines Saatguts ein und zahlt in Devisen. Eine staatliche Sortenbank mit traditionellen, trockenheitstoleranten Reissorten und eine eigene Vermehrung machen unabhängiger und klimafester zugleich.',
      party: ['NPP', 'FSP', 'SB'], need: 'simple', pc: 13, lag: 5,
      fiscal: { exp: 26 },
      eff: { agriProd: 7, climateRes: 6, foodSec: 6, reserves: 0.15, forest: 0.4 },
      grp: { farmers: 12, sinhalaRural: 7, sangha: 4, business: -3, intl: -2 },
      risk: 'Traditionelle Sorten sind widerstandsfähig und ertragsschwächer. Wer auf sie umstellt, ohne den Ertragsunterschied auszugleichen, bekommt eine schlechtere Ernte.',
      tags: ['Landwirtschaft', 'Klima', 'Souveränität']
    },
    {
      id: 'ag_aquaculture', cat: 'agri', sub: 'Fischerei',
      title: 'Aquakultur an der Ost- und Nordküste aufbauen',
      desc: 'Garnelen, Seegurken und Algen für den Export, mit Umweltauflagen, die die Mangroven schützen. Der Norden und Osten haben Küste, Arbeitskräfte und kaum Industrie. Nach dem Krieg ist wenig davon wieder in Gang gekommen.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 15, lag: 5,
      fiscal: { exp: 32 },
      eff: { exports: 0.5, regionalBalance: 7, unemp: -0.3, agriProd: 4, poverty: -0.5, forest: -0.3 },
      grp: { farmers: 9, tamilNE: 11, muslim: 7, business: 6, sinhalaRural: 3 },
      risk: 'Aquakultur ohne strenge Aufsicht zerstört Mangroven und Küstenschutz. Genau dort, wo Ditwah gezeigt hat, wie viel diese Mangroven wert sind.',
      tags: ['Fischerei', 'Norden & Osten', 'Export']
    },
    {
      id: 'ag_agri_extension', cat: 'agri', sub: 'Beratung',
      title: 'Landwirtschaftsberatung wiederaufbauen',
      desc: 'Der Beratungsdienst, der Bauern früher bei Sorten, Düngung und Schädlingen begleitet hat, ist über Jahrzehnte ausgedünnt worden. Die Düngerkrise von 2021 ist auch deshalb so eskaliert, weil niemand vor Ort erklären konnte, wie eine Umstellung überhaupt geht.',
      party: ['NPP', 'SJB'], need: 'exec', pc: 11, lag: 4,
      fiscal: { exp: 22 },
      eff: { agriProd: 9, foodSec: 4, stateCap: 4, skillsMatch: 3, climateRes: 3 },
      grp: { farmers: 13, sinhalaRural: 7, publicSector: 5, tamilNE: 3 },
      risk: 'Beratung wirkt erst nach Jahren und ist der erste Posten, der bei jeder Haushaltssperre wieder gestrichen wird.',
      tags: ['Landwirtschaft', 'Verwaltung']
    },

    /* =========================================================
       ENERGIE UND STAATSBETRIEBE
       ========================================================= */
    {
      id: 'en_storage', cat: 'energy', sub: 'Netz',
      title: 'Batteriespeicher und Pumpspeicher ausbauen',
      desc: 'Solar und Wind liefern, wann sie wollen. Ohne Speicher lässt sich der Anteil erneuerbarer Energien nicht mehr steigern, ohne das Netz zu gefährden. Batteriespeicher an den Umspannwerken und ein Pumpspeicherwerk im Hochland sind die Voraussetzung für alles Weitere.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 20, lag: 6,
      fiscal: { exp: 78 },
      eff: { energyRel: 12, renewables: 9, emissions: -1.4, infra: 5, soeHealth: 3, growth: 0.12 },
      grp: { business: 10, sinhalaUrban: 7, youth: 5, intl: 5, farmers: -3 },
      risk: 'Große Speicherprojekte sind kapitalintensiv und geben Anlass zu genau der Art von Beschaffung, an der sich in Sri Lanka regelmäßig Korruptionsvorwürfe entzünden.',
      tags: ['Energie', 'Klima'], risks: ['soe_opacity']
    },
    {
      id: 'en_efficiency', cat: 'energy', sub: 'Verbrauch',
      title: 'Verbindliche Effizienzstandards für Geräte und Gebäude',
      desc: 'Mindeststandards für Klimaanlagen, Kühlschränke und Beleuchtung, dazu eine Gebäudeverordnung für Neubauten. Die billigste Kilowattstunde ist die, die nicht gebraucht wird, und Sri Lanka führt jeden Liter Treibstoff ein.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 12, lag: 4,
      fiscal: { exp: 8 },
      eff: { energyRel: 6, emissions: -1.6, reserves: 0.2, soeHealth: 4, inflation: 0.15 },
      grp: { business: -4, sinhalaUrban: 4, youth: 5, intl: 6 },
      risk: 'Effizientere Geräte kosten in der Anschaffung mehr. Für Haushalte, die nach der Krise ohnehin nichts anschaffen, ändert die Vorschrift zunächst gar nichts.',
      tags: ['Energie', 'Klima']
    },
    {
      id: 'en_soe_holding', fline: 'nontax', cat: 'energy', sub: 'Staatsbetriebe',
      title: 'Staatsbetriebe in einer Holding mit klaren Eigentümerzielen bündeln',
      desc: 'Elektrizitätsbehörde, Erdölgesellschaft, Hafenbehörde, Fluggesellschaft und die übrigen Betriebe kommen unter ein professionelles Dach mit veröffentlichten Zielen, geprüften Abschlüssen und Vorständen nach Eignung statt nach Parteibuch. Das singapurische Modell, das der Währungsfonds seit Jahren empfiehlt.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 28, lag: 6,
      fiscal: { rev: 42 },
      eff: { soeHealth: 18, corruption: 8, stateCap: 6, imfCompl: 9, privateSector: 5, energyRel: 4 },
      grp: { intl: 13, business: 11, sinhalaUrban: 6, publicSector: -9, unions: -11 },
      risk: 'Die Gewerkschaften der Staatsbetriebe sind die streikfähigsten des Landes und lesen jede Bündelung als Vorstufe zur Privatisierung. Sie haben schon Regierungen zum Einlenken gezwungen.',
      tags: ['Staatsbetriebe', 'IWF'], risks: ['soe_opacity'], excl: ['en_privatise']
    },
    {
      id: 'en_prosumer', cat: 'energy', sub: 'Erneuerbare',
      title: 'Bürgerenergie: Dachsolar für Haushalte und Genossenschaften',
      desc: 'Netzanschluss binnen vierzehn Tagen, garantierte Einspeisevergütung und ein Kredit, der über die Stromrechnung getilgt wird. Wer keine eigene Dachfläche hat, kann sich an einer Genossenschaftsanlage beteiligen.',
      party: ['NPP', 'SJB', 'FSP'], need: 'exec', pc: 14, lag: 3,
      fiscal: { exp: 34 },
      eff: { renewables: 11, energyRel: 6, emissions: -1.2, privateSector: 4, regionalBalance: 3, soeHealth: -3 },
      grp: { sinhalaUrban: 9, business: 7, farmers: 6, youth: 6, unions: -3 },
      risk: 'Jede eingespeiste Kilowattstunde fehlt der Elektrizitätsbehörde im Absatz, während ihre Netzkosten gleich bleiben. Ohne Anpassung der Netzentgelte verlagert das Programm die Last auf die, die kein Dach haben.',
      tags: ['Energie', 'Klima', 'Beteiligung']
    },
    {
      id: 'en_offshore_wind', cat: 'energy', sub: 'Erneuerbare',
      title: 'Windenergie im Golf von Mannar erschließen',
      desc: 'Die Meerenge zwischen Mannar und Indien hat einige der besten Windbedingungen Südasiens. Der Ausbau ist technisch anspruchsvoll, kapitalintensiv und außenpolitisch heikel, weil die Netzanbindung über Indien führt.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 24, lag: 7,
      fiscal: { exp: 68 },
      eff: { renewables: 16, energyRel: 8, emissions: -2.4, fdi: 0.3, regionalBalance: 6, relIndia: 4, exports: 0.2 },
      grp: { business: 9, tamilNE: 7, intl: 7, youth: 5, farmers: -4, sangha: -3 },
      risk: 'Der Golf von Mannar ist ein Zugkorridor für Vögel und ein Meeresschutzgebiet. Und jedes Projekt mit indischer Beteiligung an dieser Küste wird innenpolitisch als Abhängigkeit ausgelegt.',
      tags: ['Energie', 'Klima', 'Norden']
    },

    /* =========================================================
       DIGITALISIERUNG
       ========================================================= */
    {
      id: 'di_open_data', cat: 'digital', sub: 'Transparenz',
      title: 'Offene Verwaltungsdaten als Regelfall',
      desc: 'Haushaltsvollzug, Beschaffungen, Baugenehmigungen, Umweltdaten und Statistiken werden maschinenlesbar veröffentlicht, sofern kein Grund dagegenspricht. Was öffentlich einsehbar ist, lässt sich schwerer verstecken.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 10, lag: 3,
      fiscal: { exp: 8 },
      eff: { corruption: 7, digitalGov: 8, stateCap: 4, pressFree: 5, legitimacy: 4, privateSector: 3 },
      grp: { youth: 11, sinhalaUrban: 8, business: 7, intl: 7, publicSector: -4 },
      risk: 'Veröffentlichte Daten machen zuerst die eigenen Versäumnisse sichtbar. Die ersten Schlagzeilen wird diese Regierung über sich selbst lesen.',
      tags: ['Digitales', 'Transparenz']
    },
    {
      id: 'di_gov_cloud', cat: 'digital', sub: 'Infrastruktur',
      title: 'Gemeinsame Verwaltungsplattform statt Insellösungen',
      desc: 'Jede Behörde betreibt ihr eigenes System, keines spricht mit dem anderen, und der Bürger bringt Papierkopien von einem Schalter zum nächsten. Eine gemeinsame Plattform mit einheitlicher Anmeldung, einem Dokumentenspeicher und dem Grundsatz, Daten nur einmal abzufragen.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 22, lag: 6,
      fiscal: { exp: 56 },
      eff: { digitalGov: 16, stateCap: 10, corruption: 6, taxCompl: 5, privateSector: 4, legitimacy: 3 },
      grp: { youth: 10, business: 10, sinhalaUrban: 8, intl: 5, publicSector: -6 },
      risk: 'Großprojekte dieser Art sind in Sri Lanka regelmäßig gescheitert, zuletzt beim Steuerverwaltungssystem. Ohne dauerhafte Zuständigkeit im Präsidialamt wiederholt sich das.',
      tags: ['Digitales', 'Verwaltung'], risks: ['revenue_authority']
    },
    {
      id: 'di_digital_skills', cat: 'digital', sub: 'Qualifikation',
      title: 'Digitale Grundqualifikation für alle Schulabgänger',
      desc: 'Ein verbindliches Modul in Datenverarbeitung, Onlinediensten und Medienkompetenz, dazu Fortbildung für Lehrkräfte. Ohne die Grundlage nutzt die beste Verwaltungsplattform nur denen, die ohnehin schon zurechtkommen.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 13, lag: 5,
      fiscal: { exp: 30 },
      eff: { digitalGov: 7, education: 6, skillsMatch: 9, youthUnemp: -2.2, femaleLFP: 1.8, privateSector: 3 },
      grp: { youth: 12, business: 7, sinhalaUrban: 5, malaiyaha: 4, tamilNE: 4 },
      risk: 'In Schulen ohne verlässlichen Strom und ohne Anschluss bleibt das Modul Theorie. Das Gefälle zwischen Colombo und dem Rest des Landes wächst dadurch eher.',
      tags: ['Digitales', 'Bildung']
    },
    {
      id: 'di_cyber_agency', cat: 'digital', sub: 'Sicherheit',
      title: 'Behörde für Informationssicherheit mit Durchgriffsrecht',
      desc: 'Verbindliche Mindeststandards für Behörden und kritische Infrastruktur, Meldepflicht bei Vorfällen und ein Notfallteam. Sri Lankas Verwaltungssysteme sind nach jedem unabhängigen Test schlecht geschützt.',
      party: ['NPP', 'NDF'], need: 'simple', pc: 14, lag: 4,
      fiscal: { exp: 18 },
      eff: { digitalGov: 8, stateCap: 5, internalSec: 5, privateSector: 3, corruption: 2 },
      grp: { business: 8, intl: 5, youth: 4, military: 4, publicSector: -3 },
      risk: 'Eine Sicherheitsbehörde mit Durchgriffsrecht lässt sich leicht zu einer Überwachungsbehörde ausbauen. Ohne Kontrolle durch das Parlament ist der Weg dorthin kurz.',
      tags: ['Digitales', 'Sicherheit']
    },
    {
      id: 'di_ai_strategy', fline: 'corp', cat: 'digital', sub: 'Wirtschaft',
      title: 'Dienstleistungsexport und Sprachtechnologie fördern',
      desc: 'Steuerliche Anreize für Softwarehäuser, ein Forschungsprogramm für Sinhala- und Tamil-Sprachtechnologie und Zugang zu Rechenkapazität für Hochschulen. Der Dienstleistungsexport ist die einzige Branche, in der Sri Lanka ohne Hafen und ohne Rohstoffe wettbewerbsfähig ist.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 16, lag: 5,
      fiscal: { exp: 26, rev: -14 },
      eff: { privateSector: 8, exports: 0.7, skillsMatch: 6, brainDrain: -5, digitalGov: 5, langAccess: 4, fdi: 0.2 },
      grp: { youth: 12, business: 11, sinhalaUrban: 8, diaspora: 5, tamilNE: 3 },
      risk: 'Steuerliche Anreize für eine Branche sind genau die Ausnahmen, die der Währungsfonds abgeschafft sehen will. Und wer hier ausgebildet wird, ist im Ausland besonders gefragt.',
      tags: ['Digitales', 'Wirtschaft', 'Export']
    },

    /* =========================================================
       AUSSENPOLITIK
       ========================================================= */
    {
      id: 'fo_labour_agreements', cat: 'foreign', sub: 'Migration',
      title: 'Verbindliche Abkommen für Arbeitsmigranten aushandeln',
      desc: 'Mit den Golfstaaten, Südkorea, Japan und Israel: Mindestlohn, Rückgabe des Reisepasses, Rechtsweg und konsularische Betreuung. Die Überweisungen der Arbeitsmigranten tragen die Zahlungsbilanz, ihre Arbeitsbedingungen sind seit Jahrzehnten bekannt und ungeregelt.',
      party: ['NPP', 'SJB', 'SLMC'], need: 'simple', pc: 17, lag: 5,
      fiscal: { exp: 14 },
      eff: { remittances: 0.7, socialProt: 6, femaleLFP: 2, relGulf: 5, diaspora: 5, legitimacy: 4, reserves: 0.2 },
      grp: { muslim: 9, sinhalaRural: 8, malaiyaha: 7, unions: 7, diaspora: 6, business: -2 },
      risk: 'Die Zielländer haben wenig Anlass einzulenken: Wenn Sri Lanka Bedingungen stellt, kommen die Arbeitskräfte aus Nepal oder Bangladesch. Zu hart verhandelt heißt weniger Entsendungen.',
      tags: ['Außenpolitik', 'Migration']
    },
    {
      id: 'fo_indian_ocean', cat: 'foreign', sub: 'Region',
      title: 'Sri Lanka als neutraler Knoten im Indischen Ozean positionieren',
      desc: 'Ein verbindliches Regelwerk für Militärbesuche, Forschungsschiffe und Überwachung, das für alle Staaten gleichermaßen gilt und veröffentlicht wird. Statt bei jedem chinesischen Schiff neu zu entscheiden und dabei Indien, China und die USA nacheinander zu verstimmen.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 19, lag: 4,
      fiscal: {},
      eff: { relIndia: 7, relChina: 5, relWest: 7, relJapan: 6, maritimeSec: 6, legitimacy: 5, fdi: 0.12 },
      grp: { business: 6, intl: 8, sinhalaUrban: 5, military: 3, sinhalaRural: -2 },
      risk: 'Ein veröffentlichtes Regelwerk nimmt Ihnen die Möglichkeit, im Einzelfall anders zu entscheiden. Genau das ist der Sinn, und genau das wird Sie irgendwann teuer zu stehen kommen.',
      tags: ['Außenpolitik', 'Blockfreiheit']
    },
    {
      id: 'fo_climate_diplomacy', cat: 'foreign', sub: 'Klima',
      title: 'Allianz der verwundbaren Küstenstaaten anführen',
      desc: 'Sri Lanka übernimmt eine Sprecherrolle für Staaten, die den Klimawandel als Erste bezahlen. Das kostet wenig, bringt internationale Sichtbarkeit und ist die Voraussetzung dafür, an Anpassungsfonds und Verlustausgleich überhaupt heranzukommen.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 9, lag: 3,
      fiscal: { exp: 6 },
      eff: { relWest: 5, relJapan: 4, climateRes: 4, disasterPrep: 3, legitimacy: 4, diaspora: 3 },
      grp: { intl: 8, youth: 7, farmers: 4, sinhalaUrban: 4 },
      risk: 'Sprecherrollen kosten Reisezeit und bringen Applaus. Ob daraus Geld wird, entscheidet sich woanders.',
      tags: ['Außenpolitik', 'Klima']
    },
    {
      id: 'fo_consular_reform', cat: 'foreign', sub: 'Diaspora',
      title: 'Auslandsvertretungen zu Dienstleistern umbauen',
      desc: 'Termine online, Bearbeitung binnen Tagen, Betreuung in Not, und Personal nach Eignung statt nach Parteibuch. Für Millionen Auslandssrilanker ist das Konsulat der einzige regelmäßige Kontakt mit ihrem Staat, und der Eindruck ist entsprechend.',
      party: ['NPP', 'SJB', 'NDF'], need: 'exec', pc: 11, lag: 3,
      fiscal: { exp: 16 },
      eff: { diaspora: 12, remittances: 0.3, digitalGov: 4, stateCap: 4, corruption: 3, legitimacy: 3 },
      grp: { diaspora: 15, muslim: 6, sinhalaRural: 5, tamilNE: 5, business: 4, publicSector: -4 },
      risk: 'Botschafterposten sind seit jeher Versorgungsposten für verdiente Parteifreunde. Wer daran rührt, verstimmt genau die Leute, deren Unterstützung er im Parlament braucht.',
      tags: ['Außenpolitik', 'Diaspora', 'Verwaltung']
    },
    {
      id: 'fo_debt_swap_health', cat: 'foreign', sub: 'Schulden',
      title: 'Schuldentausch gegen Investitionen in Gesundheit und Bildung',
      desc: 'Ein Teil der bilateralen Schulden wird erlassen, wenn Sri Lanka den Gegenwert nachweislich in Gesundheit, Bildung oder Klimaanpassung investiert. Das Modell existiert und wurde von mehreren Staaten genutzt.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 21, lag: 5,
      fiscal: { exp: 26 },
      eff: { debtGdpOneOff: -1.8, health: 6, education: 5, climateRes: 4, relWest: 4, relJapan: 4, imfCompl: 3 },
      grp: { intl: 7, youth: 6, sinhalaRural: 5, unions: 4, business: 3 },
      risk: 'Solche Vereinbarungen sind langwierig und decken nur einen kleinen Teil des Schuldenbergs ab. Und die Zweckbindung schränkt den Haushaltsspielraum weiter ein.',
      tags: ['Außenpolitik', 'Schulden']
    },

    /* =========================================================
       BILDUNG
       ========================================================= */
    {
      id: 'ed_teacher_training', cat: 'education', sub: 'Lehrkräfte',
      title: 'Lehrerausbildung und Fortbildung grundlegend erneuern',
      desc: 'Verbindliche Fortbildung, Mentoring für Berufsanfänger und ein Auswahlverfahren, das Eignung prüft statt Wartelisten abzuarbeiten. In Mathematik, Naturwissenschaften und Englisch fehlen landesweit Tausende qualifizierte Lehrkräfte, in ländlichen Schulen besonders.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 19, lag: 6,
      fiscal: { exp: 44 },
      eff: { education: 14, skillsMatch: 7, regionalBalance: 4, brainDrain: -3, stateCap: 3 },
      grp: { youth: 9, publicSector: 6, sinhalaRural: 7, malaiyaha: 6, tamilNE: 5, unions: -4 },
      risk: 'Eignungsprüfungen für Lehrkräfte treffen auf eine der bestorganisierten Gewerkschaften des Landes. Versetzungen nach Bedarf statt nach Dienstalter sind der eigentliche Streitpunkt.',
      tags: ['Bildung', 'Personal']
    },
    {
      id: 'ed_rural_schools', cat: 'education', sub: 'Schulnetz',
      title: 'Kleine Landschulen zusammenlegen und ordentlich ausstatten',
      desc: 'Sri Lanka hat über tausend Schulen mit weniger als fünfzig Kindern, oft ohne Fachlehrkräfte und ohne Labor. Zusammenlegung mit gesichertem Schulverkehr bringt bessere Ausstattung, kostet aber Wege und in jedem betroffenen Dorf den Ortsmittelpunkt.',
      party: ['NPP', 'NDF'], need: 'simple', pc: 17, lag: 6,
      fiscal: { exp: 38 },
      eff: { education: 11, skillsMatch: 5, regionalBalance: -3, stateCap: 3, infra: 3 },
      grp: { youth: 6, business: 4, sinhalaUrban: 5, sinhalaRural: -9, farmers: -7, malaiyaha: -5 },
      risk: 'Eine geschlossene Dorfschule ist in Sri Lanka ein Wahlkampfthema für die nächsten zehn Jahre. Ohne verlässlichen Schulbus wird aus der Reform ein Schulabbruchprogramm.',
      tags: ['Bildung', 'Ländlicher Raum'], req: ['tr_school_transport']
    },
    {
      id: 'ed_exam_reform', cat: 'education', sub: 'Prüfungen',
      title: 'Das Prüfungssystem entschärfen',
      desc: 'Die Prüfungen nach der fünften Klasse und die Hochschulzugangsprüfung entscheiden in Sri Lanka über ganze Lebensläufe und haben eine Nachhilfeindustrie hervorgebracht, die teurer ist als die Schule selbst. Mehrere Bewertungswege, Wiederholungsmöglichkeiten und weniger Gewicht auf einer einzigen Prüfung.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 16, lag: 6,
      fiscal: { exp: 18 },
      eff: { education: 9, skillsMatch: 6, malnutrition: -2, inequality: -1.2, socialProt: 3 },
      grp: { youth: 10, sinhalaRural: 7, malaiyaha: 6, tamilNE: 5, sinhalaUrban: -5, business: -3 },
      risk: 'Die Prüfung gilt als das letzte faire Verfahren im Land: Sie fragt nicht nach Herkunft. Wer daran rührt, muss erklären, warum das neue Verfahren nicht Beziehungen wieder ins Spiel bringt.',
      tags: ['Bildung', 'Chancengleichheit']
    },
    {
      id: 'ed_school_language', cat: 'education', sub: 'Sprache',
      title: 'Gemischtsprachige Schulen ausbauen',
      desc: 'Getrennte sinhalesische und tamilische Schulzweige haben dazu geführt, dass ganze Generationen aufwachsen, ohne einander je begegnet zu sein. Gemeinsame Standorte, gemeinsame Fächer und die jeweils andere Sprache als Pflichtfach ab der dritten Klasse.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 21, lag: 7,
      fiscal: { exp: 34 },
      eff: { langAccess: 13, reconcile: 10, education: 5, trustTamil: 6, trustMuslim: 5, trustHill: 5, casteEquity: 3, sinhalaPress: 5 },
      grp: { tamilNE: 11, muslim: 8, malaiyaha: 8, christian: 6, youth: 5, sangha: -8, sinhalaRural: -6 },
      risk: 'Beide Seiten misstrauen dem: Nationalisten sehen Verwässerung, tamilische Parteien fürchten die Assimilation ihrer Kinder. Ohne Zusicherungen an beide scheitert es an den Elternvertretungen.',
      tags: ['Bildung', 'Sprache', 'Versöhnung']
    },
    {
      id: 'ed_research_funding', cat: 'education', sub: 'Hochschule',
      title: 'Forschungsförderung mit Wettbewerbsverfahren',
      desc: 'Ein nationaler Forschungsfonds, der nach Begutachtung vergibt statt nach Hochschulzugehörigkeit. Sri Lankas Universitäten haben gute Leute und praktisch keine Forschungsmittel, weshalb die guten Leute gehen.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 13, lag: 5,
      fiscal: { exp: 28 },
      eff: { education: 7, skillsMatch: 6, brainDrain: -6, privateSector: 4, agriProd: 2, health: 2 },
      grp: { youth: 9, sinhalaUrban: 7, business: 5, publicSector: 4, diaspora: 4 },
      risk: 'Wettbewerbsverfahren bevorzugen die Hochschulen, die schon Kapazität haben. Ohne Aufbauförderung wächst der Abstand zwischen Colombo, Peradeniya und dem Rest.',
      tags: ['Bildung', 'Forschung']
    },

    /* =========================================================
       WIRTSCHAFT UND ARBEIT
       ========================================================= */
    {
      id: 'ec_competition_authority', cat: 'economy', sub: 'Wettbewerb',
      title: 'Wettbewerbsbehörde mit echten Befugnissen',
      desc: 'Bei Reis, Zement, Milchpulver, Gas und Baustoffen bestimmen wenige Anbieter den Preis. Eine Behörde mit Ermittlungsbefugnis, Bußgeldkompetenz und Fusionskontrolle wäre die erste ihrer Art im Land.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 20, lag: 5,
      fiscal: { exp: 14 },
      eff: { privateSector: 9, inflation: -0.7, corruption: 6, foodSec: 4, inequality: -0.8, ruleOfLaw: 4 },
      grp: { sinhalaRural: 9, unions: 7, youth: 6, sinhalaUrban: 6, business: -8, intl: 6 },
      risk: 'Die betroffenen Unternehmensgruppen finanzieren traditionell alle größeren Parteien. Eine Behörde mit Zähnen bekommt schnell einen Haushalt ohne Zähne.',
      tags: ['Wirtschaft', 'Wettbewerb'], risks: ['court_backlog']
    },
    {
      id: 'ec_bankruptcy_law', cat: 'economy', sub: 'Recht',
      title: 'Insolvenzrecht für Unternehmen und Privatpersonen',
      desc: 'Sri Lanka hat kein funktionierendes Verfahren, um überschuldete Betriebe zu sanieren oder abzuwickeln. Wer scheitert, bleibt ein Leben lang belastet, und Banken schreiben nichts ab. Nach der Krise hängen Zehntausende Kleinbetriebe in diesem Zustand fest.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 22, lag: 6,
      fiscal: {},
      eff: { privateSector: 11, ruleOfLaw: 6, growth: 0.2, unemp: -0.3, fdi: 0.15, poverty: -0.4 },
      grp: { business: 13, youth: 6, farmers: 6, sinhalaUrban: 5, intl: 7 },
      risk: 'Ein Insolvenzrecht ohne funktionierende Handelsgerichte ist eine Vorschrift ohne Verfahren. Und die Banken werden gegen jede Regel kämpfen, die sie zwingt, Verluste anzuerkennen.',
      tags: ['Wirtschaft', 'Recht'], risks: ['court_backlog']
    },
    {
      id: 'ec_womens_employment', cat: 'economy', sub: 'Arbeitsmarkt',
      title: 'Hürden für die Erwerbstätigkeit von Frauen abbauen',
      desc: 'Sichere Verkehrsverbindungen, betriebsnahe Kinderbetreuung, ein wirksames Verfahren gegen Belästigung am Arbeitsplatz und ein Ende der Beschränkungen für Nachtarbeit. Mit rund 31 Prozent hat Sri Lanka eine der niedrigsten Erwerbsquoten von Frauen in Südasien, bei besserer Bildung als die Männer.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 18, lag: 5,
      fiscal: { exp: 42 },
      eff: { femaleLFP: 8, growth: 0.3, unemp: -0.4, privateSector: 5, poverty: -0.8, socialProt: 4, inequality: -1.0 },
      grp: { youth: 9, business: 8, unions: 6, sinhalaUrban: 7, malaiyaha: 5, sangha: -4, sinhalaRural: -3 },
      risk: 'Die eigentliche Hürde ist nicht gesetzlich, sondern in den Haushalten. Vorschriften ändern daran wenig, wenn die Betreuungsarbeit weiterhin unverteilt bleibt.',
      tags: ['Wirtschaft', 'Frauen', 'Arbeit']
    },
    {
      id: 'ec_apparel_upgrade', cat: 'economy', sub: 'Industrie',
      title: 'Textilindustrie aus der Lohnfertigung herausführen',
      desc: 'Die Bekleidungsindustrie ist der größte Warenexporteur und hängt an fremden Entwürfen, fremden Marken und dem Zollvorteil GSP-Plus. Förderung von eigenem Design, eigener Stoffherstellung und Nachhaltigkeitszertifikaten verlagert Wertschöpfung ins Land.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 17, lag: 6,
      fiscal: { exp: 32 },
      eff: { exports: 1.1, privateSector: 6, skillsMatch: 5, femaleLFP: 2.5, fdi: 0.15, emissions: -0.4 },
      grp: { business: 11, unions: 6, youth: 5, sinhalaRural: 4, intl: 4 },
      risk: 'Der Aufstieg in der Wertschöpfungskette braucht ein Jahrzehnt und Designer, die es im Land kaum gibt. Bis dahin bleibt alles am Zollvorteil hängen.',
      tags: ['Wirtschaft', 'Export', 'Industrie']
    },
    {
      id: 'ec_regional_industry', fline: 'corp', cat: 'economy', sub: 'Regionen',
      title: 'Industrieansiedlung außerhalb des Großraums Colombo',
      desc: 'Erschlossene Gewerbeflächen mit Strom, Wasser und Anbindung in Jaffna, Batticaloa, Hambantota und Badulla, dazu eine befristete Investitionszulage. Über die Hälfte der Wirtschaftsleistung entsteht in und um Colombo, und jede Krise trifft das Land deshalb doppelt.',
      party: ['NPP', 'SJB', 'ITAK', 'CWC'], need: 'simple', pc: 21, lag: 6,
      fiscal: { exp: 62, rev: -12 },
      eff: { regionalBalance: 14, unemp: -0.5, privateSector: 5, fdi: 0.18, poverty: -0.9, infra: 5, inequality: -1.0 },
      grp: { tamilNE: 11, malaiyaha: 9, farmers: 7, business: 6, sinhalaRural: 6, youth: 5, sinhalaUrban: -3 },
      risk: 'Erschlossene Flächen ohne Nachfrage sind teure Brachen. Sri Lanka hat mehrere davon. Ohne Verkehrsanbindung und Fachkräfte vor Ort bleibt es beim Schild am Zaun.',
      tags: ['Wirtschaft', 'Regionen'], risks: ['no_local_capacity']
    },

    /* =========================================================
       VERKEHR
       ========================================================= */
    {
      id: 'tr_road_safety', cat: 'transport', sub: 'Sicherheit',
      title: 'Verkehrssicherheitsprogramm',
      desc: 'Über dreitausend Verkehrstote im Jahr, überwiegend Motorrad- und Dreiradfahrer. Geschwindigkeitskontrollen, Helmpflicht mit Durchsetzung, sichere Schulwege und eine Unfallstatistik, die diesen Namen verdient.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 12, lag: 4,
      fiscal: { exp: 22 },
      eff: { internalSec: 5, health: 6, infra: 4, ruleOfLaw: 3, corruption: -2 },
      grp: { sinhalaUrban: 7, youth: 5, farmers: 4, sinhalaRural: 4, business: -3 },
      risk: 'Verkehrskontrollen sind in Sri Lanka eine bekannte Einnahmequelle für die Polizei. Mehr Kontrollen ohne Reform der Polizei heißt zunächst mehr Gelegenheiten.',
      tags: ['Verkehr', 'Sicherheit'], risks: ['police_politicised']
    },
    {
      id: 'tr_port_capacity', cat: 'transport', sub: 'Häfen',
      title: 'Umschlagkapazität in Colombo und Trincomalee ausbauen',
      desc: 'Colombo ist einer der wichtigsten Umschlaghäfen der Region und arbeitet an der Kapazitätsgrenze. Trincomalee hat einen der besten Naturhäfen Asiens und liegt weitgehend brach. Ausbau beider, mit klarer Aufgabenteilung.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 20, lag: 7,
      fiscal: { exp: 74 },
      eff: { infra: 9, exports: 0.9, fdi: 0.25, regionalBalance: 6, privateSector: 5, maritimeSec: 3, growth: 0.2 },
      grp: { business: 12, tamilNE: 6, unions: -5, sinhalaRural: 3, intl: 4 },
      risk: 'Hafenprojekte ziehen geopolitische Aufmerksamkeit an. Wer in Trincomalee baut, wird von Indien, den USA und China zugleich gefragt, mit wem er das tut.',
      tags: ['Verkehr', 'Häfen', 'Export']
    },

    /* =========================================================
       KLIMA
       ========================================================= */
    {
      id: 'cl_mangroves', cat: 'climate', sub: 'Küstenschutz',
      title: 'Mangrovengürtel wiederherstellen',
      desc: 'Sri Lanka war das erste Land, das seine Mangroven gesetzlich unter Schutz gestellt hat. Durchgesetzt wurde das nie vollständig. Ditwah hat gezeigt, welche Küstenabschnitte mit intaktem Mangrovengürtel glimpflich davongekommen sind und welche nicht.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 13, lag: 5,
      fiscal: { exp: 24 },
      eff: { climateRes: 11, disasterPrep: 6, forest: 1.2, agriProd: 3, emissions: -0.5, foodSec: 3 },
      grp: { farmers: 9, tamilNE: 7, muslim: 6, sinhalaRural: 5, business: -5, intl: 6 },
      risk: 'Wo Mangroven standen, stehen heute Garnelenteiche und Hotels, die jemandem gehören. Die Wiederherstellung ist ein Enteignungsverfahren mit anderem Namen.',
      tags: ['Klima', 'Küste']
    },
    {
      id: 'cl_heat_plan', cat: 'climate', sub: 'Anpassung',
      title: 'Hitzeschutzplan für Städte und Arbeitsplätze',
      desc: 'Verbindliche Arbeitspausen bei Extremhitze, Trinkwasserstellen, Verschattung, Baumpflanzungen und angepasste Schulzeiten. Hitze ist in Sri Lanka die unterschätzteste Klimafolge, weil sie niemanden auf einmal tötet.',
      party: ['NPP', 'SJB', 'FSP'], need: 'simple', pc: 11, lag: 4,
      fiscal: { exp: 18 },
      eff: { climateRes: 7, health: 6, forest: 0.5, education: 2, agriProd: 2 },
      grp: { unions: 11, farmers: 8, malaiyaha: 8, sinhalaUrban: 5, business: -5 },
      risk: 'Arbeitspausen bei Hitze kosten die Bau- und Plantagenwirtschaft direkt Produktivität. Der Widerstand kommt von den Arbeitgebern, nicht von den Betroffenen.',
      tags: ['Klima', 'Gesundheit', 'Arbeit']
    },
    {
      id: 'cl_relocation', cat: 'climate', sub: 'Anpassung',
      title: 'Geordnete Umsiedlung aus den gefährdetsten Lagen',
      desc: 'Für Siedlungen, die bei jedem Monsun überschwemmt werden oder auf rutschgefährdetem Hang stehen: freiwillige Umsiedlung mit vollem Wertersatz, neuem Grundstück und Anschluss an Verkehr und Schule. Nach Ditwah ist die Liste solcher Orte bekannt.',
      party: ['NPP', 'SJB'], need: 'simple', pc: 23, lag: 7,
      fiscal: { exp: 86 },
      eff: { climateRes: 13, disasterPrep: 8, housing: 8, poverty: -0.6, regionalBalance: -2 },
      grp: { farmers: 6, sinhalaRural: 5, malaiyaha: 7, tamilNE: 5, business: -3, intl: 7 },
      risk: 'Umsiedlung ist in Sri Lanka historisch belastet: Sie war Instrument der Besiedlungspolitik und der Kriegführung. Selbst freiwillige Programme wecken diese Erinnerung, besonders im Norden und Osten.',
      tags: ['Klima', 'Wohnen'], risks: ['no_land_registry']
    },

    /* =========================================================
       JUSTIZ
       ========================================================= */
    {
      id: 'ju_victim_protection', cat: 'justice', sub: 'Verfahren',
      title: 'Zeugen- und Opferschutz mit eigener Stelle',
      desc: 'Ohne wirksamen Schutz sagt in Korruptions- und Gewaltverfahren niemand aus, der etwas zu verlieren hat. Eine eigenständige Stelle mit Unterbringung, Begleitung und Anonymisierung ist die Voraussetzung dafür, dass die übrigen Justizreformen überhaupt greifen.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 15, lag: 4,
      fiscal: { exp: 16 },
      eff: { ruleOfLaw: 8, corruption: 6, internalSec: 4, trustTamil: 4, trustMuslim: 4, legitimacy: 3 },
      grp: { youth: 8, tamilNE: 7, muslim: 7, sinhalaUrban: 6, intl: 6, publicSector: -3 },
      risk: 'Zeugenschutz nützt wenig, solange die Polizei selbst Teil des Problems ist. Die Stelle muss außerhalb der Polizeistruktur stehen, und genau das wird die Polizeiführung bekämpfen.',
      tags: ['Justiz', 'Schutz'], risks: ['police_politicised']
    },
    {
      id: 'ju_digital_court', cat: 'justice', sub: 'Verfahren',
      title: 'Gerichtsverfahren digitalisieren',
      desc: 'Elektronische Akte, Ladung per Nachricht, Videoverhandlung für einfache Sachen und maschinelle Protokollierung statt handschriftlicher Mitschrift. Ein erheblicher Teil des Verfahrensstaus entsteht daran, dass Akten nicht auffindbar sind und Termine platzen, weil jemand nicht geladen wurde.',
      party: ['NPP', 'NDF', 'SJB'], need: 'simple', pc: 18, lag: 5,
      fiscal: { exp: 30 },
      eff: { ruleOfLaw: 9, digitalGov: 7, stateCap: 5, corruption: 4, privateSector: 3, langAccess: 3 },
      grp: { business: 9, youth: 7, sinhalaUrban: 6, intl: 5, publicSector: -4 },
      risk: 'Die Anwaltschaft und ein Teil der Richterschaft halten am Papier fest, und zwar mit Argumenten, die sich schwer widerlegen lassen, solange der Strom ausfällt.',
      tags: ['Justiz', 'Digitales'], risks: ['court_backlog']
    },

    /* =========================================================
       STAATSFORM
       ========================================================= */
    {
      id: 'st_public_appointments', cat: 'state', sub: 'Verwaltung',
      title: 'Alle höheren Ämter öffentlich ausschreiben',
      desc: 'Behördenleitungen, Botschafterposten, Vorstände der Staatsbetriebe und Sekretäre der Ministerien werden ausgeschrieben, mit Anforderungsprofil und begründeter Auswahl. Das entzieht dem Präsidenten ein Machtmittel und dem System seinen wichtigsten Schmierstoff.',
      party: ['NPP', 'SJB', 'NDF'], need: 'simple', pc: 24, lag: 5,
      fiscal: { exp: 6 },
      eff: { corruption: 11, stateCap: 9, ruleOfLaw: 6, legitimacy: 7, soeHealth: 5, digitalGov: 2 },
      grp: { youth: 13, sinhalaUrban: 10, business: 8, intl: 9, publicSector: -8 },
      risk: 'Sie geben genau die Postenvergabe auf, mit der jede Regierung vor Ihnen ihre Mehrheit zusammengehalten hat. Rechnen Sie damit, dass Ihre eigene Fraktion das früher merkt als die Öffentlichkeit.',
      tags: ['Verfassung', 'Verwaltung', 'Korruption']
    },
    {
      id: 'st_citizen_assembly', cat: 'state', sub: 'Beteiligung',
      title: 'Bürgerräte zu Verfassungsfragen einsetzen',
      desc: 'Ausgeloste Bürgerinnen und Bürger aus allen Provinzen und Gemeinschaften beraten über die Fragen, an denen das Parlament seit vierzig Jahren scheitert: Devolution, Wahlsystem, Artikel 9. Das Ergebnis bindet niemanden und lässt sich schwer ignorieren.',
      party: ['NPP', 'SJB', 'FSP'], need: 'exec', pc: 14, lag: 4,
      fiscal: { exp: 12 },
      eff: { legitimacy: 9, reconcile: 7, pressFree: 4, trustTamil: 4, trustMuslim: 4, langAccess: 3, sinhalaPress: 3 },
      grp: { youth: 11, sinhalaUrban: 8, tamilNE: 6, muslim: 6, malaiyaha: 5, sangha: -5, sinhalaRural: -3 },
      risk: 'Ein Bürgerrat, dessen Empfehlungen anschließend im Parlament liegen bleiben, richtet mehr Schaden an als gar keiner. Wer ihn einsetzt, sollte wissen, was er mit dem Ergebnis vorhat.',
      tags: ['Verfassung', 'Beteiligung']
    },

    /* =========================================================
       IDENTITÄT
       ========================================================= */
    {
      id: 'id_missing_answers', cat: 'identity', sub: 'Aufarbeitung',
      title: 'Verbindliche Antworten zum Verbleib der Verschwundenen',
      desc: 'Zehntausende Familien warten seit über fünfzehn Jahren auf eine Auskunft. Ein Verfahren mit Fristen, Akteneinsicht, forensischer Untersuchung und einer Antwort in jedem Einzelfall, auch wenn die Antwort schwer zu ertragen ist. Ohne Amnestie und ohne Vorverurteilung.',
      party: ['NPP', 'ITAK', 'TNPF', 'SJB'], need: 'simple', pc: 30, lag: 7,
      fiscal: { exp: 26 },
      eff: { reconcile: 15, trustTamil: 16, ruleOfLaw: 6, legitimacy: 6, relWest: 6, diaspora: 8,
             sinhalaPress: 9, militaryMor: -8 },
      grp: { tamilNE: 20, diaspora: 14, muslim: 6, christian: 5, military: -14, sangha: -9, sinhalaRural: -8 },
      risk: 'Jede Antwort führt zu einer Frage nach Verantwortung, und ein Teil der Verantwortlichen trägt noch Uniform. Das ist der empfindlichste Punkt der srilankischen Politik, und Sie berühren ihn direkt.',
      tags: ['Versöhnung', 'Aufarbeitung', 'umstritten'], risks: ['no_prosecution_service']
    },
    {
      id: 'id_bilingual_service', cat: 'identity', sub: 'Sprache',
      title: 'Zweisprachigkeit als Einstellungsvoraussetzung im Staatsdienst',
      desc: 'Wer neu in den öffentlichen Dienst eintritt, weist Grundkenntnisse in beiden Amtssprachen nach; vorhandenes Personal bekommt bezahlte Sprachkurse. Die Verfassung schreibt Zweisprachigkeit seit 1987 vor, in der Praxis findet man in vielen Behörden niemanden, der Tamil spricht.',
      party: ['NPP', 'ITAK', 'SLMC', 'SJB'], need: 'simple', pc: 17, lag: 5,
      fiscal: { exp: 28 },
      eff: { langAccess: 15, reconcile: 7, trustTamil: 8, trustMuslim: 6, trustHill: 6, stateCap: 4, legitimacy: 3 },
      grp: { tamilNE: 13, malaiyaha: 10, muslim: 9, publicSector: -6, sinhalaRural: -5, sangha: -5 },
      risk: 'Sprachanforderungen im Staatsdienst gelten in sinhalesischen Wahlkreisen als Benachteiligung der eigenen Leute. Genau dieser Streit hat 1956 begonnen und nie ganz aufgehört.',
      tags: ['Sprache', 'Verwaltung', 'Versöhnung']
    },

    /* =========================================================
       PROVINZEN
       ========================================================= */
    {
      id: 'dv_local_own_revenue', fline: 'nontax', cat: 'devolution', sub: 'Finanzen',
      title: 'Kommunen eigene Einnahmen erschließen',
      desc: 'Grundsteuer, Gewerbeabgaben, Parkgebühren und Marktstandsgebühren bleiben vollständig vor Ort und werden mit einem digitalen Kataster erhoben. Eine Kommune, die eigenes Geld einnimmt, verhält sich anders als eine, die auf Colombo wartet.',
      party: ['NPP', 'SJB', 'ITAK', 'SLMC'], need: 'simple', pc: 19, lag: 6,
      fiscal: { rev: 38 },
      eff: { regionalBalance: 9, stateCap: 6, taxCompl: 6, corruption: 3, infra: 4, digitalGov: 3, legitimacy: 3 },
      grp: { tamilNE: 8, muslim: 6, malaiyaha: 6, business: -4, sinhalaRural: -3, intl: 6 },
      risk: 'Eigene Steuern heißt neue Steuern für Menschen, die bisher keine gezahlt haben. Und ohne Kataster und Grundbuch lässt sich eine Grundsteuer nicht erheben.',
      tags: ['Devolution', 'Finanzen'], risks: ['no_land_registry', 'no_local_capacity']
    },
    {
      id: 'dv_local_staff', cat: 'devolution', sub: 'Verwaltung',
      title: 'Fachpersonal für die Kommunen ausbilden und binden',
      desc: 'Ingenieurinnen, Planer, Buchhalter und Juristen für 339 Kommunalvertretungen, die überwiegend keine haben. Ausbildung, eine Zulage für ländliche Stellen und eine Laufbahn, die nicht in der Provinzhauptstadt endet.',
      party: ['NPP', 'SJB', 'ITAK'], need: 'simple', pc: 20, lag: 6,
      fiscal: { exp: 46 },
      eff: { stateCap: 11, regionalBalance: 8, infra: 5, corruption: 4, skillsMatch: 4, digitalGov: 3 },
      grp: { publicSector: 9, tamilNE: 7, malaiyaha: 6, farmers: 6, business: 5, sinhalaRural: 5 },
      risk: 'Wer ausgebildet ist, will nach Colombo. Ohne dauerhaft attraktive Bedingungen vor Ort bildet das Programm für die Hauptstadt aus.',
      tags: ['Devolution', 'Verwaltung', 'Personal']
    }
  ];

  SL.data.policies = (SL.data.policies || []).concat(P);
})();
