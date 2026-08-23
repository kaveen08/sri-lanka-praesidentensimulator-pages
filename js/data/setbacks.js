/* ============================================================
   RÜCKSCHLÄGE UND GEGENMASSNAHMEN

   Wenn ein Quartal schlecht ausgeht, bleibt das nicht als bloße
   Zahl im Protokoll stehen. Jede negative Folge wird als offener
   Missstand vermerkt, richtet solange sie offen ist weiter Schaden
   an, und lässt sich durch eine von mehreren Sofortmaßnahmen
   beheben. Sofortmaßnahmen wirken ohne Umsetzungsfrist, kosten
   politisches Kapital und haben Nebenwirkungen.

   when()  entscheidet, ob der Missstand neu entsteht
   gone()  entscheidet, ob er sich von selbst erledigt hat
   drift   laufender Schaden je Quartal, solange er offen ist
   fix     Gegenmaßnahmen; `once` bedeutet einmal je Amtszeit
   ============================================================ */
(function (D) {
  'use strict';

  D.SETBACKS = [

    /* ---------------------------------------------------------
       Finanzen und Programm
       --------------------------------------------------------- */
    {
      k: 'imf_failed', label: 'IWF-Überprüfung gescheitert', cat: 'Finanzen', sev: 3,
      desc: 'Die Programmüberprüfung ist negativ ausgegangen. Die Tranche bleibt aus, und andere Geber warten ab, was Colombo als Nächstes tut.',
      when: function (st, c) { return c.imfFailed; },
      gone: function (st) { return !st.imf.programActive || st.imf.reviewsPassed > (st._sbImfPassed || 0); },
      drift: { imfCompl: -1.2, fdi: -0.04 },
      fix: [
        { t: 'Nachtragshaushalt mit echter Konsolidierung',
          d: 'Ein korrigierter Haushalt mit belastbaren Zahlen wird dem Parlament vorgelegt. Der Fonds bekommt, was er sehen will, das Land bekommt einen härteren Herbst.',
          pc: 14, budget: { revScale: 1.055, expScale: 0.975 },
          eff: { imfCompl: 14, stateCap: 3, socialProt: -3, poverty: 0.5 },
          grp: { intl: 12, business: 5, unions: -6, publicSector: -5, sinhalaRural: -4 } },
        { t: 'Programmziele nachverhandeln',
          d: 'Sie reisen nach Washington und begründen die Abweichung mit den Ditwah-Folgen. Der Fonds hat in vergleichbaren Fällen schon Fristen verlängert.',
          pc: 20,
          eff: { imfCompl: 8, legitimacy: 2, relWest: 2 },
          grp: { intl: 4, sinhalaRural: 3, unions: 3 },
          chance: 0.62, failEff: { imfCompl: -6, relWest: -3 },
          failNote: 'Der Fonds bleibt hart. Die Abweichung sei hausgemacht, nicht wetterbedingt.' },
        { t: 'Einnahmeverwaltung sofort verstärken',
          d: 'Betriebsprüfung, Großzahlerstelle und Zollkontrolle werden mit zusätzlichem Personal und Priorität ausgestattet. Wirkt langsamer, aber ohne neue Belastung.',
          pc: 11, fiscal: { exp: 14 },
          eff: { taxCompl: 7, imfCompl: 6, corruption: 3, stateCap: 3 },
          grp: { intl: 6, business: -3 } },
        { t: 'Abweichung öffentlich verteidigen',
          d: 'Sie erklären, dass Sri Lanka nicht ein zweites Mal auf dem Rücken der Ärmsten konsolidiert. Innenpolitisch stark, außenpolitisch teuer.',
          pc: 6,
          eff: { imfCompl: -8, legitimacy: 4, socialProt: 2, relWest: -4 },
          grp: { sinhalaRural: 8, unions: 9, youth: 5, intl: -12, business: -5 } }
      ]
    },
    {
      k: 'imf_suspended', label: 'IWF-Programm ausgesetzt', cat: 'Finanzen', sev: 3,
      desc: 'Das Programm ist gestoppt. Weltbank und Asiatische Entwicklungsbank frieren Auszahlungen ein, die Refinanzierungskosten steigen, und die Ratingagenturen bereiten eine Herabstufung vor.',
      when: function (st, c) { return c.imfSuspended; },
      gone: function (st) { return st.imf.programActive; },
      drift: { imfCompl: -0.8, fdi: -0.06, privateSector: -0.6 },
      fix: [
        { t: 'Neues Programm aushandeln',
          d: 'Ein Neuanfang mit dem Fonds. Das kostet Zeit, Zugeständnisse und einen glaubwürdigen Haushalt, ist aber der einzige geordnete Weg zurück.',
          pc: 30, budget: { revScale: 1.07, expScale: 0.965 }, once: true,
          eff: { imfCompl: 26, socialProt: -5, poverty: 0.8, privateSector: 4 },
          grp: { intl: 16, business: 8, unions: -9, publicSector: -7, sinhalaRural: -6 },
          special: 'imf_restart',
          chance: 0.72, failEff: { imfCompl: -4 },
          failNote: 'Die Verhandlungen scheitern an den Vorbedingungen. Der Fonds will erst Vollzug sehen, dann reden.' },
        { t: 'Auf bilaterale Geber ausweichen',
          d: 'Indien, China und die Golfstaaten werden um Überbrückungslinien gebeten. Das Geld kommt schneller, aber nicht umsonst.',
          pc: 16,
          eff: { reserves: 0.9, relIndia: 4, relChina: 6, relWest: -5, debtGdpOneOff: 1.6 },
          grp: { business: 4, intl: -5 } },
        { t: 'Notfallhaushalt mit Ausgabensperre',
          d: 'Alle nicht vertraglich gebundenen Ausgaben werden eingefroren, bis die Zahlungsfähigkeit gesichert ist.',
          pc: 12, budget: { expScale: 0.90 },
          eff: { imfCompl: 6, stateCap: -6, infra: -4, socialProt: -6, poverty: 1.2 },
          grp: { intl: 7, publicSector: -12, unions: -10, sinhalaRural: -8, business: -4 } }
      ]
    },
    {
      k: 'reserves_low', label: 'Devisenreserven kritisch', cat: 'Finanzen', sev: 3,
      desc: 'Die Reserven decken kaum noch zwei Monate Einfuhren. Treibstoff, Medikamente und Kochgas sind die ersten Posten, an denen ein Land das merkt.',
      when: function (st) { return st.ind.reserves < 3.2; },
      gone: function (st) { return st.ind.reserves > 4.2; },
      drift: { fx: 4, privateSector: -0.8, energyRel: -0.6 },
      fix: [
        { t: 'Einfuhrbeschränkungen für nicht Lebensnotwendiges',
          d: 'Kraftfahrzeuge, Haushaltsgeräte und Luxusgüter werden erneut kontingentiert. Sri Lanka hat das 2020 schon einmal getan und weiß, wie teuer es wird.',
          pc: 10,
          eff: { reserves: 0.7, privateSector: -6, corruption: -4, inflation: 0.8 },
          grp: { business: -10, sinhalaUrban: -7, farmers: 3 } },
        { t: 'Währungsswap mit Indien oder China aktivieren',
          d: 'Eine bestehende Swap-Linie wird gezogen. Schnell verfügbar, verlängert aber die Abhängigkeit.',
          pc: 12,
          eff: { reserves: 1.2, relIndia: 3, relChina: 3, debtGdpOneOff: 0.9 },
          grp: { business: 6, intl: -2 } },
        { t: 'Devisenzuteilung nach Prioritäten',
          d: 'Die Zentralbank teilt Devisen zentral zu: erst Treibstoff und Medikamente, dann Vorprodukte, zuletzt alles andere.',
          pc: 8,
          eff: { reserves: 0.4, health: 4, energyRel: 4, privateSector: -5, corruption: -3 },
          grp: { sinhalaRural: 5, unions: 4, business: -8 } },
        { t: 'Rücküberweisungen über den offiziellen Kanal fördern',
          d: 'Bessere Kurse, niedrigere Gebühren und ein Ende der Behördenschikane für Angehörige von Arbeitsmigranten. Der Hawala-Markt lebt von der Bequemlichkeit.',
          pc: 9, fiscal: { exp: 8 },
          eff: { reserves: 0.5, remittances: 0.6, diaspora: 5, digitalGov: 2 },
          grp: { diaspora: 9, muslim: 5, sinhalaRural: 4 } }
      ]
    },
    {
      k: 'debt_spiral', label: 'Schuldenquote läuft davon', cat: 'Finanzen', sev: 2,
      desc: 'Die Schuldenquote steigt wieder, statt zu fallen. Bei diesem Pfad ist das Ziel von unter 95 Prozent bis 2032 nicht mehr zu halten.',
      when: function (st) { return st.ind.debtGdp > 108; },
      gone: function (st) { return st.ind.debtGdp < 103; },
      drift: { imfCompl: -0.5, privateSector: -0.4 },
      fix: [
        { t: 'Schuldenmanagementstelle einrichten',
          d: 'Eine eigene Stelle für Laufzeiten, Währungsmix und Refinanzierung, statt Entscheidungen über den Schreibtisch des Schatzamts laufen zu lassen.',
          pc: 12, fiscal: { exp: 6 }, once: true,
          eff: { imfCompl: 6, stateCap: 4, corruption: 2 },
          grp: { intl: 8, business: 5 },
          special: 'lower_rate' },
        { t: 'Inlandsschulden umschulden',
          d: 'Die Laufzeiten der Inlandsanleihen werden gestreckt. Banken und Pensionskassen tragen die Last, und sie werden es nicht vergessen.',
          pc: 16,
          eff: { debtGdpOneOff: -2.2, privateSector: -7, socialProt: -3 },
          grp: { business: -12, publicSector: -6, intl: 4 } },
        { t: 'Einnahmen dauerhaft anheben',
          d: 'Statt punktueller Maßnahmen wird die Bemessungsgrundlage verbreitert: weniger Ausnahmen, mehr erfasste Betriebe.',
          pc: 14, budget: { revScale: 1.06 },
          eff: { taxCompl: 5, imfCompl: 6, privateSector: -3 },
          grp: { intl: 8, business: -6, sinhalaUrban: -4 } }
      ]
    },
    {
      k: 'revenue_overstretch', label: 'Steuerlast überdehnt', cat: 'Finanzen', sev: 2,
      desc: 'Mindestens ein Einnahmeposten steht so weit über dem Ausgangswert, dass Ausweichen sich lohnt. Was auf dem Papier steht, kommt nicht in der Kasse an.',
      when: function (st) { return SL.engine.budgetStrain(st).rev > 0.7; },
      gone: function (st) { return SL.engine.budgetStrain(st).rev < 0.4; },
      drift: { taxCompl: -0.8, brainDrain: 0.5 },
      fix: [
        { t: 'Überdehnte Sätze auf ein tragbares Maß zurücknehmen',
          d: 'Alle Einnahmeposten werden automatisch auf höchstens 25 Prozent über dem Ausgangswert gesetzt. Das kostet nominal Einnahmen und bringt real kaum weniger.',
          pc: 8,
          eff: { taxCompl: 6, brainDrain: -4, privateSector: 5 },
          grp: { business: 8, sinhalaUrban: 7, youth: 5, intl: -3 },
          special: 'trim_revenue' },
        { t: 'Steueramnestie gegen vollständige Offenlegung',
          d: 'Wer Vermögen und Umsätze offenlegt, zahlt nach und bleibt straffrei. Ehrliche Steuerzahler halten das für eine Frechheit, und sie haben recht.',
          pc: 10, fiscal: { rev: 55 }, once: true,
          eff: { taxCompl: 8, corruption: -4, legitimacy: -3 },
          grp: { business: 7, intl: -3, youth: -5, publicSector: -4 } },
        { t: 'Vollzug statt Sätze',
          d: 'Die Sätze bleiben, aber der Vollzug wird ernsthaft: Betriebsprüfung, Kontenabgleich, Registerabgleich mit dem Grundbuch.',
          pc: 13, fiscal: { exp: 12 },
          eff: { taxCompl: 9, corruption: 4, stateCap: 3, privateSector: -2 },
          grp: { intl: 7, business: -5 } }
      ]
    },

    /* ---------------------------------------------------------
       Haushalt und Grundversorgung
       --------------------------------------------------------- */
    {
      k: 'service_gap', label: 'Grundversorgung fällt aus', cat: 'Haushalt', sev: 3,
      desc: 'Mindestens ein Ausgabenposten ist so tief gekürzt, dass Leistungen tatsächlich ausfallen. Wartelisten, geschlossene Stationen, ausgefallener Unterricht.',
      when: function (st) { return SL.engine.budgetStrain(st).exp > 0.7; },
      gone: function (st) { return SL.engine.budgetStrain(st).exp < 0.4; },
      drift: { legitimacy: -0.8, stateCap: -0.5 },
      fix: [
        { t: 'Kürzungen auf ein verkraftbares Maß zurücknehmen',
          d: 'Alle Ausgabenposten werden automatisch auf höchstens 15 Prozent unter dem Ausgangswert gesetzt. Das Loch im Haushalt bleibt, die Versorgung steht wieder.',
          pc: 9,
          eff: { stateCap: 5, legitimacy: 4, health: 3, education: 3 },
          grp: { publicSector: 9, unions: 8, sinhalaRural: 6, intl: -4 },
          special: 'restore_spending' },
        { t: 'Notfallfonds für die schlimmsten Lücken',
          d: 'Ein zweckgebundener Fonds, aus dem Distrikte mit akuten Ausfällen sofort Mittel abrufen können. Behebt nicht die Ursache, aber die schlimmsten Folgen.',
          pc: 7, fiscal: { exp: 45 },
          eff: { health: 4, education: 3, socialProt: 4, regionalBalance: 3 },
          grp: { sinhalaRural: 7, malaiyaha: 6, tamilNE: 5, publicSector: 4 } },
        { t: 'Kürzungen umschichten statt zurücknehmen',
          d: 'Der Sparbetrag bleibt, aber er trifft Ministerienbetrieb und Fuhrpark statt Krankenhäuser und Schulen.',
          pc: 12,
          eff: { health: 5, education: 4, stateCap: -4, corruption: 2 },
          grp: { sinhalaRural: 6, unions: 5, publicSector: -7 },
          special: 'shift_cuts' }
      ]
    },
    {
      k: 'inflation_spike', label: 'Inflation außer Kontrolle', cat: 'Haushalt', sev: 2,
      desc: 'Die Verbraucherpreise steigen deutlich über das Zielband der Zentralbank. In einem Land, in dem 2022 die Preise die Regierung gestürzt haben, ist das keine Randnotiz.',
      when: function (st) { return st.ind.inflation > 12; },
      gone: function (st) { return st.ind.inflation < 9; },
      drift: { poverty: 0.3, legitimacy: -0.4 },
      fix: [
        { t: 'Geldpolitik straffen lassen',
          d: 'Die Zentralbank hebt den Leitzins an. Das wirkt, aber es würgt gleichzeitig die Erholung ab.',
          pc: 8,
          eff: { inflation: -3.2, growth: -0.5, privateSector: -4, fx: -8 },
          grp: { business: -6, sinhalaUrban: 4, unions: -3, intl: 6 } },
        { t: 'Preisbeobachtung und Kartellverfolgung',
          d: 'Bei Reis, Kokosöl und Gas wird jede Preisspitze auf Absprachen geprüft. In Sri Lanka ist Verknappung oft organisiert.',
          pc: 9, fiscal: { exp: 6 },
          eff: { inflation: -1.2, foodSec: 5, corruption: 3, ruleOfLaw: 2 },
          grp: { sinhalaRural: 8, unions: 6, farmers: -3, business: -5 } },
        { t: 'Gezielte Preisstützung für Grundnahrungsmittel',
          d: 'Reis, Mehl und Milchpulver werden über die staatliche Handelsgesellschaft gestützt. Teuer, aber es hält die Straße ruhig.',
          pc: 7, fiscal: { exp: 62 },
          eff: { inflation: -1.4, poverty: -1.0, foodSec: 6, socialProt: 3 },
          grp: { sinhalaRural: 10, unions: 7, malaiyaha: 6, intl: -6, business: -3 } }
      ]
    },
    {
      k: 'poverty_rise', label: 'Armut nimmt wieder zu', cat: 'Haushalt', sev: 2,
      desc: 'Die Armutsquote steigt. Nach der Krise von 2022 hatte sich das Land gerade wieder herausgearbeitet.',
      when: function (st) { return st.ind.poverty > 27; },
      gone: function (st) { return st.ind.poverty < 24.5; },
      drift: { malnutrition: 0.5, legitimacy: -0.4 },
      fix: [
        { t: 'Aswesuma-Zahlungen sofort anheben',
          d: 'Die Transferhöhe wird an die Preisentwicklung angepasst und die Auszahlung vorgezogen.',
          pc: 8, budget: { lines: { social: 1.3 } },
          eff: { poverty: -1.6, socialProt: 9, malnutrition: -4, inequality: -0.8 },
          grp: { sinhalaRural: 11, malaiyaha: 10, farmers: 7, tamilNE: 6, intl: -4 } },
        { t: 'Aufnahmestopp bei Aswesuma aufheben',
          d: 'Wer die Kriterien erfüllt, kommt hinein, ohne auf einen frei werdenden Platz zu warten. Das erweitert den Kreis erheblich.',
          pc: 10, fiscal: { exp: 40 },
          eff: { poverty: -1.1, socialProt: 7, legitimacy: 3 },
          grp: { sinhalaRural: 8, malaiyaha: 8, tamilNE: 6, intl: -3 } },
        { t: 'Beschäftigungsprogramm im ländlichen Raum',
          d: 'Bewässerungskanäle, Feldwege und Schulgebäude werden in Eigenregie der Kommunen instandgesetzt, bezahlt nach Tagen.',
          pc: 11, fiscal: { exp: 48 },
          eff: { poverty: -1.2, unemp: -0.4, infra: 4, regionalBalance: 4, agriProd: 3 },
          grp: { sinhalaRural: 9, farmers: 9, malaiyaha: 5, unions: 4 } }
      ]
    },

    /* ---------------------------------------------------------
       Politik, Parlament, Straße
       --------------------------------------------------------- */
    {
      k: 'defection', label: 'Regierungsfraktion bröckelt', cat: 'Parlament', sev: 2,
      desc: 'Abgeordnete haben die Fraktion verlassen. Jeder weitere Abgang bringt die Mehrheit für Verfassungsänderungen und irgendwann die einfache Mehrheit in Gefahr.',
      when: function (st, c) { return c.defected; },
      gone: function (st) { return st.flags.antiDefection || st.seatsGov >= 150; },
      drift: { legitimacy: -0.3 },
      fix: [
        { t: 'Überläufer zurückholen',
          d: 'Ausschussvorsitze, Wahlkreismittel und ein Staatssekretärsposten. Es funktioniert in Sri Lanka fast immer, und es kostet immer dasselbe.',
          pc: 14,
          eff: { corruption: -5, legitimacy: -4, stateCap: -2 },
          grp: { youth: -8, sinhalaUrban: -6, intl: -4 },
          special: 'regain_seats' },
        { t: 'Fraktionsdisziplin über die Partei durchsetzen',
          d: 'Wer gegen die Linie stimmt, verliert die Nominierung für die nächste Wahl. Die Basis steht hinter Ihnen, die Hinterbänke murren.',
          pc: 10,
          eff: { legitimacy: 2, pressFree: -2 },
          grp: { publicSector: 3, youth: 2 },
          special: 'hold_seats' },
        { t: 'Mit der Opposition punktuell zusammenarbeiten',
          d: 'Statt die eigene Mehrheit zu kitten, werden einzelne Vorhaben mit wechselnden Mehrheiten beschlossen. Langsamer, aber ehrlicher.',
          pc: 9,
          eff: { legitimacy: 5, ruleOfLaw: 3, stateCap: -2 },
          grp: { sinhalaUrban: 6, youth: 5, business: 4, tamilNE: 3 } },
        { t: 'Vorgezogene Neuwahl des Parlaments erwägen',
          d: 'Sie stellen die Machtfrage. Bei guter Zustimmung ein Befreiungsschlag, bei schlechter ein Selbstmord auf Raten.',
          pc: 22, once: true,
          eff: { legitimacy: 4 },
          grp: { youth: 4, sinhalaUrban: 3 },
          special: 'snap_election' }
      ]
    },
    {
      k: 'street_crisis', label: 'Druck auf der Straße', cat: 'Gesellschaft', sev: 3,
      desc: 'Die Proteste wachsen und werden dauerhaft. In Sri Lanka ist das der Anfang eines Musters, das 2022 im Präsidialsekretariat endete.',
      when: function (st) { return st.streetPressure > 66; },
      gone: function (st) { return st.streetPressure < 52; },
      drift: { legitimacy: -1.0, privateSector: -0.5, tourism: -0.04 },
      fix: [
        { t: 'Vertreter der Proteste empfangen',
          d: 'Sie setzen sich mit Gewerkschaften, Studierendenverbänden und Berufsverbänden an einen Tisch und machen belastbare Zusagen.',
          pc: 10, fiscal: { exp: 30 },
          eff: { legitimacy: 6, socialProt: 4, pressFree: 3 },
          grp: { unions: 12, youth: 10, publicSector: 7, sinhalaUrban: 5, business: -4 },
          special: 'calm_street' },
        { t: 'Entlastungspaket für Haushalte',
          d: 'Ein befristeter Zuschuss auf Strom und Grundnahrungsmittel. Er löst kein Problem, aber er nimmt der Wut die Spitze.',
          pc: 8, fiscal: { exp: 75 },
          eff: { poverty: -1.0, socialProt: 6, inflation: -0.5 },
          grp: { sinhalaRural: 10, unions: 8, malaiyaha: 7, youth: 5, intl: -6 },
          special: 'calm_street_soft' },
        { t: 'Sichtbaren Korruptionsfall zu Ende bringen',
          d: 'Ein prominentes Verfahren wird ohne Rücksicht auf Parteibuch abgeschlossen. Nichts beruhigt die Straße so verlässlich wie ein Urteil.',
          pc: 13,
          eff: { corruption: 7, ruleOfLaw: 5, legitimacy: 6 },
          grp: { youth: 11, sinhalaUrban: 9, business: 5, publicSector: -4 },
          special: 'calm_street' },
        { t: 'Versammlungsrecht einschränken',
          d: 'Polizeiliche Sperrzonen um Regierungsgebäude, Auflagen für Kundgebungen. Kurzfristig wirksam, und dann kommt der Rückschlag.',
          pc: 7,
          eff: { pressFree: -12, legitimacy: -8, ruleOfLaw: -7, internalSec: 4, relWest: -5 },
          grp: { youth: -14, sinhalaUrban: -10, unions: -12, military: 6, intl: -6 },
          special: 'crackdown' }
      ]
    },
    {
      k: 'approval_slide', label: 'Rückhalt bricht weg', cat: 'Gesellschaft', sev: 2,
      desc: 'Die Zustimmung ist unter die Schwelle gefallen, ab der eine Regierung in Sri Lanka handlungsunfähig wird. Abgeordnete rechnen, Minister positionieren sich.',
      when: function (st) { return st.approvalOverall < 38; },
      gone: function (st) { return st.approvalOverall > 44; },
      drift: { legitimacy: -0.6 },
      fix: [
        { t: 'Kabinett umbilden',
          d: 'Die schwächsten Ressorts werden neu besetzt, ein paar Gesichter aus der Zivilgesellschaft kommen hinzu. Ein Neuanfang auf Zeit.',
          pc: 12, once: true,
          eff: { stateCap: 4, legitimacy: 5, corruption: 2 },
          grp: { sinhalaUrban: 7, youth: 6, business: 5, publicSector: -3 },
          special: 'approval_boost' },
        { t: 'Rechenschaftsbericht an die Nation',
          d: 'Eine Fernsehansprache, in der Sie offenlegen, was erreicht ist, was nicht, und warum. Ehrlichkeit wirkt selten sofort, aber sie wirkt.',
          pc: 6,
          eff: { legitimacy: 4, pressFree: 2 },
          grp: { sinhalaRural: 4, sinhalaUrban: 4, youth: 4, publicSector: 3 } },
        { t: 'Sichtbares Programm in den Wahlkreisen',
          d: 'Straßen, Wasseranschlüsse, Schuldächer. Nichts überzeugt so wie eine Baustelle, die fertig wird.',
          pc: 9, fiscal: { exp: 52 },
          eff: { infra: 5, regionalBalance: 4, housing: 4 },
          grp: { sinhalaRural: 9, farmers: 7, malaiyaha: 5, tamilNE: 4, intl: -3 } }
      ]
    },
    {
      k: 'coalition_rift', label: 'Riss in der Regierung', cat: 'Parlament', sev: 2,
      desc: 'In der Regierung wird offen widersprochen. Minister erklären in Interviews, was sie von Beschlüssen des Kabinetts halten, und es ist selten viel.',
      when: function (st, c) { return c.coalitionRift; },
      gone: function (st) { return false; },
      drift: { stateCap: -0.6, legitimacy: -0.5 },
      fix: [
        { t: 'Machtwort im Kabinett',
          d: 'Sie stellen klar, wer die Richtlinien bestimmt. Wer nicht mitzieht, geht.',
          pc: 10,
          eff: { stateCap: 5, legitimacy: 2, pressFree: -2 },
          grp: { publicSector: 3, business: 4, youth: -3 } },
        { t: 'Koalitionsausschuss einrichten',
          d: 'Ein ständiges Gremium, das Streit vor der Kabinettssitzung ausräumt statt danach in der Presse.',
          pc: 8, once: true,
          eff: { stateCap: 6, legitimacy: 4 },
          grp: { sinhalaUrban: 4, business: 4, publicSector: 4 } },
        { t: 'Den Streitpunkt aus dem Programm nehmen',
          d: 'Das strittige Vorhaben wird vertagt. Der Frieden ist wiederhergestellt, der Reformstau auch.',
          pc: 5,
          eff: { stateCap: 2, legitimacy: -3, reconcile: -2 },
          grp: { youth: -5, sinhalaUrban: -4, sinhalaRural: 3 } }
      ]
    },

    /* ---------------------------------------------------------
       Wirtschaft
       --------------------------------------------------------- */
    {
      k: 'growth_slump', label: 'Wirtschaft schrumpft', cat: 'Wirtschaft', sev: 2,
      desc: 'Das Wachstum ist unter null gefallen. Jedes Quartal Rezession kostet Steuereinnahmen, Arbeitsplätze und die Geduld der Wählerschaft.',
      when: function (st) { return st.ind.growth < 0.4; },
      gone: function (st) { return st.ind.growth > 1.8; },
      drift: { unemp: 0.15, privateSector: -0.5 },
      fix: [
        { t: 'Investitionsprogramm vorziehen',
          d: 'Geplante Bauvorhaben werden vorgezogen und beschleunigt vergeben. Das schafft sofort Nachfrage und später Infrastruktur.',
          pc: 10, fiscal: { exp: 85 },
          eff: { growth: 0.9, infra: 6, unemp: -0.4, privateSector: 4 },
          grp: { business: 9, unions: 7, sinhalaRural: 5, intl: -5 } },
        { t: 'Genehmigungsverfahren aussetzen und neu ordnen',
          d: 'Für Investitionen unterhalb einer Schwelle gilt bis auf Weiteres die Genehmigungsfiktion: Wer nach 30 Tagen nichts hört, darf bauen.',
          pc: 12,
          eff: { privateSector: 9, fdi: 0.25, corruption: 3, growth: 0.4 },
          grp: { business: 13, youth: 4, publicSector: -5 } },
        { t: 'Kreditlinie für kleine und mittlere Betriebe',
          d: 'Eine staatliche Bürgschaft für Betriebskredite unter 25 Mio. Rupien. Die Banken verleihen wieder, weil sie nicht mehr allein haften.',
          pc: 9, fiscal: { exp: 38 },
          eff: { privateSector: 7, unemp: -0.3, growth: 0.4, femaleLFP: 0.6 },
          grp: { business: 10, youth: 6, farmers: 5 } }
      ]
    },
    {
      k: 'brain_drain', label: 'Fachkräfte verlassen das Land', cat: 'Wirtschaft', sev: 2,
      desc: 'Ärztinnen, Ingenieure, Lehrkräfte und IT-Fachleute gehen. Wer geht, zahlt hier keine Steuern mehr, und die Lücke schließt sich nicht von selbst.',
      when: function (st) { return st.ind.brainDrain > 80; },
      gone: function (st) { return st.ind.brainDrain < 72; },
      drift: { skillsMatch: -0.5, health: -0.3, taxCompl: -0.3 },
      fix: [
        { t: 'Zulagen für Mangelberufe im Staatsdienst',
          d: 'Ärztinnen, Fachpflege, Lehrkräfte für Mathematik und Naturwissenschaften bekommen eine Zulage, die den Abstand zum Ausland verkleinert.',
          pc: 10, budget: { lines: { wages: 1.04, health: 1.05 } },
          eff: { brainDrain: -8, health: 5, education: 4, skillsMatch: 3 },
          grp: { publicSector: 12, unions: 8, youth: 5 } },
        { t: 'Steuerliche Belastung mittlerer Einkommen senken',
          d: 'Der Eingangssatz und die Progressionsstufen werden entzerrt. Genau die Gruppe, die geht, wird entlastet.',
          pc: 9, budget: { lines: { paye: 0.88 } },
          eff: { brainDrain: -10, taxCompl: 4, privateSector: 4 },
          grp: { sinhalaUrban: 12, youth: 9, publicSector: 6, intl: -6 } },
        { t: 'Rückkehrprogramm mit Anerkennung von Abschlüssen',
          d: 'Wer zurückkommt, bekommt Abschlüsse anerkannt, eine Anschubfinanzierung und Zugang zu Forschungsmitteln.',
          pc: 11, fiscal: { exp: 22 },
          eff: { brainDrain: -6, diaspora: 8, skillsMatch: 5, privateSector: 3 },
          grp: { diaspora: 12, youth: 6, business: 5 } }
      ]
    },
    {
      k: 'energy_crunch', label: 'Stromversorgung wackelt', cat: 'Wirtschaft', sev: 2,
      desc: 'Die Versorgung ist unzuverlässig geworden. Lastabwurf trifft zuerst die Industrie, dann die Krankenhäuser, dann die Stimmung.',
      when: function (st) { return st.ind.energyRel < 42; },
      gone: function (st) { return st.ind.energyRel > 50; },
      drift: { privateSector: -0.6, growth: -0.05 },
      fix: [
        { t: 'Notstromkapazität anmieten',
          d: 'Mietkraftwerke überbrücken die Lücke. Teuer je Kilowattstunde, aber sofort verfügbar.',
          pc: 7, fiscal: { exp: 58 },
          eff: { energyRel: 10, emissions: 1.2, soeHealth: -4 },
          grp: { business: 9, sinhalaUrban: 7, intl: -4 } },
        { t: 'Kostendeckende Tarife durchsetzen',
          d: 'Die Elektrizitätsbehörde darf endlich kostendeckend abrechnen. Damit hört das Ausbluten auf, und die Rechnungen steigen.',
          pc: 13, budget: { lines: { subsidies: 0.45 } },
          eff: { energyRel: 8, soeHealth: 12, imfCompl: 5, inflation: 0.6, poverty: 0.4 },
          grp: { intl: 10, business: 4, sinhalaRural: -9, unions: -7 } },
        { t: 'Dachsolar beschleunigt zulassen',
          d: 'Netzanschluss binnen 14 Tagen, garantierte Einspeisung, Kredit über die Stromrechnung. Verteilte Erzeugung entlastet das Netz.',
          pc: 10, fiscal: { exp: 26 },
          eff: { renewables: 7, energyRel: 5, emissions: -0.8, privateSector: 3 },
          grp: { business: 7, sinhalaUrban: 6, youth: 5, farmers: 4 } }
      ]
    },

    /* ---------------------------------------------------------
       Umsetzung und Zusammenhalt
       --------------------------------------------------------- */
    {
      k: 'blocked_reform', label: 'Reformen laufen ins Leere', cat: 'Verwaltung', sev: 2,
      desc: 'Beschlossene Vorhaben sind umgesetzt, wirken aber kaum, weil die Voraussetzung fehlt. Das Geld ist ausgegeben, das Ergebnis bleibt aus.',
      when: function (st, c) { return c.blockedReforms >= 3; },
      gone: function (st) { return SL.engine.countBlockedReforms(st) < 2; },
      drift: { stateCap: -0.4, legitimacy: -0.5 },
      fix: [
        { t: 'Umsetzungsstab im Präsidialamt',
          d: 'Eine Stelle mit Durchgriffsrecht, die für jedes beschlossene Vorhaben verfolgt, woran es hängt, und die Blockade meldet, bevor sie zum Bericht wird.',
          pc: 12, fiscal: { exp: 10 }, once: true,
          eff: { stateCap: 8, corruption: 3, digitalGov: 3, legitimacy: 3 },
          grp: { business: 6, publicSector: -3, intl: 5 },
          special: 'delivery_unit' },
        { t: 'Voraussetzungen mit Vorrang abarbeiten',
          d: 'Alle Mittel und Aufmerksamkeit gehen zunächst in die strukturellen Hindernisse: Register, Gerichte, Verwaltung. Andere Vorhaben warten.',
          pc: 14, fiscal: { exp: 30 },
          eff: { stateCap: 6, ruleOfLaw: 5, taxCompl: 4, corruption: 3 },
          grp: { intl: 7, business: 5, youth: 3 },
          special: 'risk_progress' },
        { t: 'Wirkungslose Vorhaben aussetzen',
          d: 'Was nicht wirkt, wird gestoppt, bis die Voraussetzung steht. Das spart Geld und gesteht ein Scheitern ein.',
          pc: 6,
          eff: { stateCap: 3, legitimacy: -4, imfCompl: 2 },
          grp: { intl: 4, youth: -5, publicSector: -3 } }
      ]
    },
    {
      k: 'communal_tension', label: 'Gemeinschaften driften auseinander', cat: 'Zusammenhalt', sev: 2,
      desc: 'Das Vertrauen der Minderheiten in die Zentralregierung ist eingebrochen, während der nationalistische Druck wächst. Diese Schere hat in Sri Lanka schon zweimal in Gewalt geendet.',
      when: function (st) {
        return (st.ind.trustTamil < 22 || st.ind.trustMuslim < 28) && st.ind.sinhalaPress > 58;
      },
      gone: function (st) { return st.ind.trustTamil > 30 && st.ind.sinhalaPress < 52; },
      drift: { reconcile: -0.6, internalSec: -0.4 },
      fix: [
        { t: 'Runder Tisch mit allen Gemeinschaften',
          d: 'Religionsvertreter, Parteien und Zivilgesellschaft an einem Tisch, mit einem Ergebnis, das alle unterschreiben müssen.',
          pc: 11,
          eff: { reconcile: 7, trustTamil: 6, trustMuslim: 6, religFree: 4, sinhalaPress: -4 },
          grp: { tamilNE: 9, muslim: 9, christian: 6, sangha: -4, sinhalaRural: -3 } },
        { t: 'Hetze konsequent verfolgen',
          d: 'Aufrufe zu Gewalt werden unabhängig von der Herkunft verfolgt. Das trifft laute Stimmen auf allen Seiten.',
          pc: 12,
          eff: { internalSec: 6, ruleOfLaw: 5, religFree: 5, sinhalaPress: -5, pressFree: -2 },
          grp: { muslim: 9, christian: 8, tamilNE: 6, sangha: -7, sinhalaRural: -5 } },
        { t: 'Sichtbare Zusage an den Norden und Osten',
          d: 'Landrückgabe, Aufklärung eines Verschwundenenfalls, ein Termin für Provinzratswahlen. Eine Zusage, die überprüfbar ist.',
          pc: 13, fiscal: { exp: 18 },
          eff: { trustTamil: 10, reconcile: 6, langAccess: 3, sinhalaPress: 4 },
          grp: { tamilNE: 14, diaspora: 8, muslim: 4, sinhalaRural: -6, military: -5, sangha: -5 } },
        { t: 'Sicherheitspräsenz erhöhen',
          d: 'Mehr Polizei und Militär in den gemischten Distrikten. Das verhindert Zwischenfälle und bestätigt jedes Misstrauen.',
          pc: 8,
          eff: { internalSec: 7, trustTamil: -5, trustMuslim: -4, reconcile: -4 },
          grp: { sinhalaRural: 6, military: 7, tamilNE: -9, muslim: -8 } }
      ]
    },
    {
      k: 'corruption_slide', label: 'Korruption greift wieder um sich', cat: 'Verwaltung', sev: 2,
      desc: 'Der Korruptionsindex fällt unter den Wert, mit dem die Amtszeit begonnen hat. Genau dagegen ist diese Regierung angetreten.',
      when: function (st) { return st.ind.corruption < 32; },
      gone: function (st) { return st.ind.corruption > 38; },
      drift: { legitimacy: -0.6, privateSector: -0.4 },
      fix: [
        { t: 'Vermögensverhältnisse der Regierung offenlegen',
          d: 'Kabinett, Staatssekretäre und Behördenspitzen legen Vermögen und Nebeneinkünfte offen, einsehbar für jeden.',
          pc: 10,
          eff: { corruption: 8, legitimacy: 6, ruleOfLaw: 4 },
          grp: { youth: 12, sinhalaUrban: 9, business: 5, publicSector: -6, intl: 8 } },
        { t: 'Beschaffung vollständig auf ein offenes Verfahren umstellen',
          d: 'Jede Vergabe über 50 Mio. Rupien läuft über eine öffentliche Plattform, mit Zuschlagsbegründung.',
          pc: 12, fiscal: { exp: 8 },
          eff: { corruption: 9, stateCap: 4, digitalGov: 4, privateSector: 4 },
          grp: { business: 10, youth: 8, intl: 7, publicSector: -5 } },
        { t: 'Ermittlungsbehörde personell aufstocken',
          d: 'Die Antikorruptionsbehörde bekommt Ermittler, Forensiker und ein eigenes Budget statt Abordnungen aus der Polizei.',
          pc: 11, fiscal: { exp: 12 },
          eff: { corruption: 7, ruleOfLaw: 5, stateCap: 3 },
          grp: { youth: 9, sinhalaUrban: 7, intl: 6, publicSector: -4 } }
      ]
    },
    {
      k: 'disaster_gap', label: 'Katastrophenschutz überfordert', cat: 'Klima', sev: 2,
      desc: 'Die Vorsorge liegt unter dem Stand, den Ditwah als notwendig gezeigt hat. Der nächste Monsun kommt bestimmt.',
      when: function (st) { return st.ind.disasterPrep < 30 || st.ind.climateRes < 26; },
      gone: function (st) { return st.ind.disasterPrep > 38 && st.ind.climateRes > 32; },
      drift: { housing: -0.4, agriProd: -0.3 },
      fix: [
        { t: 'Frühwarnung bis auf Dorfebene ausbauen',
          d: 'Pegel, Funk, Sirenen und ein Meldeweg, der auch nachts funktioniert. Die billigste Maßnahme mit der höchsten Wirkung.',
          pc: 8, fiscal: { exp: 20 },
          eff: { disasterPrep: 12, climateRes: 5, housing: 3 },
          grp: { farmers: 10, sinhalaRural: 8, tamilNE: 5, malaiyaha: 5 } },
        { t: 'Katastrophenschutzeinheiten in jedem Distrikt',
          d: 'Ausgerüstete und geübte Einheiten vor Ort, statt auf Militärhilfe aus Colombo zu warten.',
          pc: 11, fiscal: { exp: 34 },
          eff: { disasterPrep: 10, stateCap: 4, regionalBalance: 3, internalSec: 2 },
          grp: { sinhalaRural: 8, farmers: 7, tamilNE: 5, military: 3 } },
        { t: 'Bauverbot in den Überschwemmungsgebieten durchsetzen',
          d: 'Was im Rückhalteraum steht, wird nicht wieder aufgebaut. Rechtlich sauber, politisch bitter.',
          pc: 13, fiscal: { exp: 26 },
          eff: { climateRes: 10, housing: -3, ruleOfLaw: 4, forest: 1.2 },
          grp: { farmers: -8, sinhalaRural: -6, business: -4, youth: 5, intl: 6 } }
      ]
    }
  ];

  D.BY_KEY = {};
  D.SETBACKS.forEach(function (s) { D.BY_KEY[s.k] = s; });

})(SL.data.setbacks = SL.data.setbacks || {});
