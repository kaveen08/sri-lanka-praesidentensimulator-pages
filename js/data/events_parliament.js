/* ============================================================
   EREIGNISSE  -  Parlament, Kabinett, Regierungsapparat

   Nicht jede Krise kommt von außen. Die meiste Zeit einer
   Präsidentschaft geht für das Regieren selbst drauf: Mehrheiten
   halten, Minister im Zaum, Ausschüsse bedienen, Gouverneure
   beruhigen, und die eigene Partei daran hindern, sich selbst
   zu zerlegen.

   special: 'coalition_rift' öffnet den gleichnamigen Missstand.
   ============================================================ */
(function (D) {
  'use strict';

  var I = function (s, k) { return s.ind[k]; };

  var P = [

    /* ---------------------------------------------------------
       Mehrheiten und Abstimmungen
       --------------------------------------------------------- */
    {
      id: 'ev_no_confidence', cat: 'Parlament', weight: 7, minQ: 3, repeatAfter: 6,
      cond: function (s) { return s.approvalOverall < 46 || s.seatsGov < 130; },
      title: 'Misstrauensantrag der Opposition',
      text: 'Die Opposition bringt einen Misstrauensantrag gegen die Regierung ein. Rechnerisch reicht es nicht, aber jeder Antrag ist eine Probeabstimmung: Wer fehlt, wer enthält sich, wer stimmt plötzlich anders. Die Hinterbänke zählen mit.',
      options: [
        { t: 'Die Abstimmung offen führen lassen',
          d: 'Namentliche Abstimmung ohne Fraktionszwang. Wer nicht mehr mitgeht, soll das öffentlich tun.',
          eff: { legitimacy: 6, pressFree: 4, ruleOfLaw: 3 },
          grp: { sinhalaUrban: 6, youth: 6, business: 3 }, pc: -3, special: 'lose_seats_half' },
        { t: 'Fraktionszwang und Anwesenheitspflicht',
          d: 'Jeder Abgeordnete der Regierungsfraktion erscheint und stimmt zu. Wer fehlt, verliert die Nominierung.',
          eff: { legitimacy: -3, pressFree: -2, stateCap: 2 },
          grp: { youth: -5, sinhalaUrban: -4, publicSector: 2 }, pc: -6, special: 'keep_seats' },
        { t: 'Vor der Abstimmung Zugeständnisse machen',
          d: 'Ein paar Vorhaben werden vertagt, ein paar Wahlkreise bekommen Zusagen. Der Antrag verläuft im Sande.',
          eff: { corruption: -4, legitimacy: -3, stateCap: -2 },
          grp: { sinhalaRural: 4, youth: -6, intl: -3 }, pc: -9, fiscal: { exp: 24 } },
        { t: 'Die Vertrauensfrage selbst stellen',
          d: 'Sie machen aus dem Antrag eine Abstimmung über Ihr gesamtes Programm. Alles oder nichts.',
          eff: { legitimacy: 8, stateCap: 4 },
          grp: { youth: 7, sinhalaUrban: 6, business: 4 }, pc: -12, special: 'lose_seats' }
      ]
    },
    {
      id: 'ev_budget_vote', cat: 'Parlament', weight: 8, minQ: 2, repeatAfter: 4,
      title: 'Haushaltsabstimmung im Parlament',
      text: 'Der Haushalt kommt in die zweite Lesung. Die eigenen Hinterbänke haben Änderungsanträge eingebracht: mehr für die Wahlkreise, weniger für die Verwaltung, und niemand will vor der Wahl über Steuererhöhungen abstimmen.',
      options: [
        { t: 'Am eingebrachten Entwurf festhalten',
          d: 'Keine Änderungsanträge. Der Haushalt geht durch, wie er geschrieben wurde, oder er geht nicht durch.',
          eff: { imfCompl: 8, stateCap: 4, legitimacy: 2 },
          grp: { intl: 9, business: 5, sinhalaRural: -5, publicSector: -4 }, pc: -8, special: 'lose_seats_half' },
        { t: 'Wahlkreismittel aufstocken',
          d: 'Jeder Wahlkreis bekommt einen Sockelbetrag für eigene Vorhaben. Das kauft Zustimmung und kostet Geld.',
          eff: { imfCompl: -5, corruption: -4, regionalBalance: 4, infra: 3 },
          grp: { sinhalaRural: 9, farmers: 6, tamilNE: 4, intl: -8 }, pc: -4, fiscal: { exp: 68 } },
        { t: 'Der Verwaltung mehr abverlangen',
          d: 'Die Änderungswünsche werden aus dem Ministerienbetrieb gegenfinanziert. Die Ressorts murren, die Abgeordneten sind zufrieden.',
          eff: { stateCap: -6, digitalGov: -3, regionalBalance: 3 },
          grp: { publicSector: -9, sinhalaRural: 5, business: 2 }, pc: -5 },
        { t: 'Den Haushalt in Teilen abstimmen lassen',
          d: 'Kapitel für Kapitel, mit wechselnden Mehrheiten. Langwierig, aber am Ende steht ein Haushalt mit breiterer Basis.',
          eff: { legitimacy: 6, ruleOfLaw: 3, stateCap: -2 },
          grp: { sinhalaUrban: 5, youth: 4, tamilNE: 4, muslim: 3 }, pc: -10 }
      ]
    },
    {
      id: 'ev_crossover_offer', cat: 'Parlament', weight: 6, minQ: 4, repeatAfter: 7,
      cond: function (s) { return s.seatsGov < 155 && !s.flags.antiDefection; },
      title: 'Überlaufangebot aus der Opposition',
      text: 'Sieben Abgeordnete der Opposition lassen durchblicken, dass sie zur Regierung wechseln würden. Der Preis steht nicht auf dem Papier, aber alle Beteiligten kennen ihn: zwei Staatssekretärsposten und ein Ausschussvorsitz. In Sri Lanka nennt man das seit Jahrzehnten schlicht crossover.',
      options: [
        { t: 'Das Angebot annehmen',
          d: 'Die Mehrheit ist wieder komfortabel. Und die Partei, die gegen genau diese Praxis angetreten ist, hat sie gerade fortgesetzt.',
          eff: { corruption: -8, legitimacy: -9, ruleOfLaw: -4, stateCap: 3 },
          grp: { youth: -13, sinhalaUrban: -10, intl: -6, publicSector: -3 }, pc: -6, special: 'gain_seats' },
        { t: 'Ablehnen und öffentlich machen',
          d: 'Sie legen das Angebot offen und erklären, warum Sie es ausschlagen. Die Mehrheit bleibt knapp, die Glaubwürdigkeit steigt.',
          eff: { legitimacy: 10, corruption: 5, pressFree: 4 },
          grp: { youth: 13, sinhalaUrban: 10, intl: 6, business: 3 }, pc: -2 },
        { t: 'Sachliche Zusammenarbeit anbieten, ohne Posten',
          d: 'Kein Wechsel, aber eine Verabredung über einzelne Gesetze. Wer mitstimmt, bekommt Einfluss auf den Inhalt statt ein Amt.',
          eff: { legitimacy: 7, ruleOfLaw: 4, stateCap: 2 },
          grp: { sinhalaUrban: 7, youth: 6, tamilNE: 4, business: 4 }, pc: -7 }
      ]
    },
    {
      id: 'ev_speaker_ruling', cat: 'Parlament', weight: 5, minQ: 3,
      title: 'Der Parlamentspräsident entscheidet gegen die Regierung',
      text: 'Der Speaker lässt einen Gesetzentwurf der Regierung nicht zur Abstimmung zu: Er sei nicht ordnungsgemäß eingebracht und berühre Zuständigkeiten der Provinzen. Verfassungsrechtlich ist die Sache umstritten, politisch ist sie eine Ohrfeige.',
      options: [
        { t: 'Die Entscheidung hinnehmen und neu einbringen',
          d: 'Der Entwurf wird formal korrekt neu eingebracht, mit Stellungnahme der Provinzen. Das kostet ein Quartal.',
          eff: { ruleOfLaw: 7, legitimacy: 5, regionalBalance: 3 },
          grp: { tamilNE: 6, sinhalaUrban: 5, youth: 4 }, pc: -5 },
        { t: 'Den Obersten Gerichtshof anrufen',
          d: 'Eine Klärung der Zuständigkeit von höchster Stelle. Das schafft Rechtssicherheit und dauert.',
          eff: { ruleOfLaw: 5, legitimacy: 3, stateCap: -2 },
          grp: { sinhalaUrban: 4, business: 3, tamilNE: 3 }, pc: -7 },
        { t: 'Den Speaker öffentlich angreifen',
          d: 'Sie werfen ihm vor, das Mandat der Regierung zu missachten. Die eigene Basis applaudiert, das Parlament nicht.',
          eff: { ruleOfLaw: -9, legitimacy: -7, pressFree: -3 },
          grp: { sinhalaRural: 4, youth: -7, sinhalaUrban: -7, intl: -4 }, pc: -3, special: 'lose_seats_half' }
      ]
    },
    {
      id: 'ev_opposition_boycott', cat: 'Parlament', weight: 5, minQ: 4, repeatAfter: 8,
      cond: function (s) { return I(s, 'pressFree') < 52 || s.streetPressure > 45; },
      title: 'Opposition boykottiert das Parlament',
      text: 'Die Opposition verlässt geschlossen den Saal und kündigt an, bis auf Weiteres nicht zurückzukehren. Begründung: Anträge würden nicht zugelassen, Fragestunden abgesetzt, Ausschüsse nicht einberufen. Ein Parlament ohne Opposition beschließt schneller und überzeugt weniger.',
      options: [
        { t: 'Auf die Opposition zugehen',
          d: 'Fragestunde, Ausschusstermine und Rederecht werden verbindlich zugesagt, notfalls in der Geschäftsordnung.',
          eff: { legitimacy: 8, pressFree: 6, ruleOfLaw: 4, stateCap: -2 },
          grp: { sinhalaUrban: 7, youth: 6, tamilNE: 4, muslim: 3 }, pc: -6 },
        { t: 'Ohne sie weiterarbeiten',
          d: 'Die Tagesordnung wird abgearbeitet. Beschlüsse ohne Opposition sind gültig, und sie halten selten lange.',
          eff: { legitimacy: -7, pressFree: -4, stateCap: 4 },
          grp: { youth: -8, sinhalaUrban: -6, intl: -4, publicSector: 2 }, pc: -1 },
        { t: 'Den Boykott zum Anlass für eine Reform nehmen',
          d: 'Rederecht, Ausschussvorsitze und ein Recht auf Untersuchungsausschüsse für die Minderheit, dauerhaft verankert.',
          eff: { legitimacy: 11, pressFree: 8, ruleOfLaw: 7, corruption: 4 },
          grp: { youth: 11, sinhalaUrban: 9, tamilNE: 6, muslim: 5, intl: 5 }, pc: -13 }
      ]
    },

    /* ---------------------------------------------------------
       Kabinett und Ministerien
       --------------------------------------------------------- */
    {
      id: 'ev_minister_scandal', cat: 'Regierung', weight: 7, minQ: 2, repeatAfter: 5,
      title: 'Vorwürfe gegen ein Kabinettsmitglied',
      text: 'Ein Rechercheteam legt Belege vor, dass ein Minister Aufträge an ein Unternehmen im Besitz seines Schwagers gelenkt hat. Die Summe ist nicht spektakulär, das Muster schon. Der Betroffene bestreitet alles und verweist auf seine Verdienste.',
      options: [
        { t: 'Sofortige Entlassung',
          d: 'Ohne Anhörung, ohne Übergangsfrist. Der Fall geht an die Antikorruptionsbehörde.',
          eff: { corruption: 9, ruleOfLaw: 6, legitimacy: 7, stateCap: -3 },
          grp: { youth: 12, sinhalaUrban: 10, intl: 8, business: 4 }, pc: -5 },
        { t: 'Beurlaubung bis zur Klärung',
          d: 'Der Minister ruht im Amt, während geprüft wird. Rechtsstaatlich sauber, öffentlich unbefriedigend.',
          eff: { corruption: 4, ruleOfLaw: 5, legitimacy: 2 },
          grp: { sinhalaUrban: 4, youth: 3, intl: 3 }, pc: -3 },
        { t: 'Hinter dem Minister stehen',
          d: 'Sie erklären die Vorwürfe für haltlos und den Zeitpunkt für verdächtig. Die Fraktion ist erleichtert, das Land nicht.',
          eff: { corruption: -9, legitimacy: -10, pressFree: -3 },
          grp: { youth: -12, sinhalaUrban: -10, intl: -7, publicSector: 3 }, pc: -2,
          special: 'coalition_rift' },
        { t: 'Ressortzuschnitt ändern statt Person austauschen',
          d: 'Das Vergabewesen wandert aus dem Ministerium in eine zentrale Stelle. Der Minister bleibt, die Gelegenheit verschwindet.',
          eff: { corruption: 6, stateCap: 4, digitalGov: 3, legitimacy: 2 },
          grp: { business: 7, intl: 5, youth: 4, publicSector: -4 }, pc: -8 }
      ]
    },
    {
      id: 'ev_cabinet_leak', cat: 'Regierung', weight: 6, minQ: 3, repeatAfter: 5,
      title: 'Kabinettsprotokoll in der Presse',
      text: 'Der Wortlaut einer Kabinettssitzung steht in der Sonntagszeitung, samt der Stelle, an der zwei Minister Ihr Vorhaben als unrealistisch bezeichnen. Das Papier kam aus dem Kabinett selbst.',
      options: [
        { t: 'Die Quelle suchen lassen',
          d: 'Eine interne Untersuchung mit Telefondaten und Zugriffsprotokollen. Sie werden jemanden finden, und alle anderen werden es merken.',
          eff: { pressFree: -7, stateCap: 2, legitimacy: -4 },
          grp: { youth: -7, sinhalaUrban: -5, publicSector: -6 }, pc: -5 },
        { t: 'Den Inhalt bestätigen und die Debatte führen',
          d: 'Sie erklären, im Kabinett werde gestritten, und das sei gut so. Der Streit wird öffentlich ausgetragen und entschieden.',
          eff: { legitimacy: 6, pressFree: 7, stateCap: -2 },
          grp: { sinhalaUrban: 7, youth: 6, business: 3 }, pc: -3 },
        { t: 'Die widersprechenden Minister ersetzen',
          d: 'Zwei Ressorts werden neu besetzt. Die Botschaft ist deutlich, der Preis ist Erfahrung.',
          eff: { stateCap: -5, legitimacy: -2, corruption: -2 },
          grp: { publicSector: -6, youth: -3 }, pc: -9, special: 'coalition_rift' },
        { t: 'Nichts sagen',
          d: 'Die Geschichte ist in zwei Wochen vergessen. Die Erkenntnis, dass aus dem Kabinett gelesen werden kann, bleibt.',
          eff: { stateCap: -3, legitimacy: -2 },
          grp: { publicSector: -2 }, pc: 0 }
      ]
    },
    {
      id: 'ev_secretary_resign', cat: 'Regierung', weight: 5, minQ: 3, repeatAfter: 6,
      cond: function (s) { return I(s, 'stateCap') < 46 || s.streetPressure > 50; },
      title: 'Ein Ministeriumssekretär tritt zurück',
      text: 'Der Sekretär eines Schlüsselministeriums legt sein Amt nieder und begründet das in einem Brief, der binnen Stunden kursiert: Weisungen ohne Deckung, Vorhaben ohne Finanzierung, Zusagen ohne Verwaltungsgrundlage. Er sei nicht bereit, dafür seinen Namen herzugeben.',
      options: [
        { t: 'Den Brief ernst nehmen',
          d: 'Jede Weisung bekommt künftig einen Vermerk über Finanzierung und Rechtsgrundlage. Das bremst und es hält.',
          eff: { stateCap: 8, ruleOfLaw: 5, corruption: 3, legitimacy: 4 },
          grp: { publicSector: 10, business: 5, intl: 4, sinhalaRural: -2 }, pc: -7 },
        { t: 'Schnell nachbesetzen und weitermachen',
          d: 'Ein Nachfolger aus dem eigenen Umfeld übernimmt. Die Arbeit läuft weiter, die Ursache bleibt.',
          eff: { stateCap: -4, corruption: -3, legitimacy: -3 },
          grp: { publicSector: -7, youth: -4, intl: -3 }, pc: -2 },
        { t: 'Den Rücktritt als Sabotage darstellen',
          d: 'Sie erklären, der alte Verwaltungsapparat wehre sich gegen Veränderung. Ein Teil des Landes glaubt das sofort.',
          eff: { stateCap: -8, legitimacy: -5, pressFree: -3 },
          grp: { publicSector: -12, sinhalaRural: 5, youth: -3, intl: -4 }, pc: -3,
          special: 'coalition_rift' }
      ]
    },
    {
      id: 'ev_coalition_ultimatum', cat: 'Regierung', weight: 6, minQ: 4, repeatAfter: 7,
      cond: function (s) { return s.approvalOverall < 50 || I(s, 'sinhalaPress') > 52; },
      title: 'Ultimatum aus den eigenen Reihen',
      text: 'Eine Gruppe von neunzehn Abgeordneten der Regierungsfraktion stellt Forderungen: kein weiterer Schritt bei der Devolution, keine Zusagen an den Menschenrechtsrat, und ein Ministerposten für ihren Sprecher. Andernfalls werde man das Abstimmungsverhalten überdenken.',
      options: [
        { t: 'Auf die Forderungen eingehen',
          d: 'Die Devolutionsvorhaben werden vertagt, der Sprecher bekommt sein Ressort. Die Mehrheit steht wieder.',
          eff: { reconcile: -7, trustTamil: -8, sinhalaPress: 5, corruption: -3, legitimacy: -4 },
          grp: { sinhalaRural: 7, sangha: 6, tamilNE: -12, diaspora: -7, youth: -5 }, pc: -5 },
        { t: 'Das Ultimatum zurückweisen',
          d: 'Sie erklären, die Richtlinien der Politik bestimme der Präsident, nicht eine Gruppe von neunzehn. Es kann teuer werden.',
          eff: { legitimacy: 7, reconcile: 4, trustTamil: 5, stateCap: 2 },
          grp: { tamilNE: 8, youth: 7, sinhalaUrban: 6, sinhalaRural: -4, sangha: -4 }, pc: -8, special: 'lose_seats' },
        { t: 'Verhandeln und beim Kern hart bleiben',
          d: 'Der Ministerposten ja, die inhaltlichen Forderungen nein. Ein klassischer Handel, an dem beide Seiten das Gesicht wahren.',
          eff: { corruption: -4, legitimacy: -1, stateCap: 1 },
          grp: { sinhalaRural: 3, youth: -3, intl: -2 }, pc: -7, special: 'lose_seats_half' },
        { t: 'Die Gruppe öffentlich stellen',
          d: 'Sie machen das Ultimatum samt Namen öffentlich. Erpressung verträgt kein Licht, Abgeordnete auch nicht.',
          eff: { legitimacy: 9, pressFree: 5, corruption: 4 },
          grp: { youth: 11, sinhalaUrban: 9, intl: 4, sinhalaRural: -5 }, pc: -6, special: 'lose_seats' }
      ]
    },

    /* ---------------------------------------------------------
       Ausschüsse, Kontrolle, Verwaltung
       --------------------------------------------------------- */
    {
      id: 'ev_cope_report', cat: 'Parlament', weight: 6, minQ: 3, repeatAfter: 5,
      title: 'Bericht des Rechnungsprüfungsausschusses',
      text: 'Der COPE-Ausschuss legt einen Bericht über die Staatsbetriebe vor. Er nennt Zahlen, Namen und Beträge: Beschaffungen ohne Ausschreibung, Verluste ohne Erklärung, Vorstände ohne Qualifikation. Solche Berichte gibt es seit Jahrzehnten, Folgen hatten sie selten.',
      options: [
        { t: 'Jede Feststellung mit Frist abarbeiten lassen',
          d: 'Für jeden Punkt eine zuständige Stelle, eine Frist und eine Rückmeldung ans Parlament. Der Ausschuss bekommt endlich Zähne.',
          eff: { corruption: 8, soeHealth: 9, stateCap: 5, legitimacy: 6 },
          grp: { intl: 9, youth: 8, business: 7, publicSector: -5 }, pc: -9 },
        { t: 'Die schwersten Fälle an die Staatsanwaltschaft',
          d: 'Drei Vorgänge gehen an die Ermittlungsbehörden, der Rest wird verwaltungsintern geklärt.',
          eff: { corruption: 6, ruleOfLaw: 5, soeHealth: 4 },
          grp: { youth: 7, intl: 5, sinhalaUrban: 5, publicSector: -4 }, pc: -6 },
        { t: 'Den Bericht zur Kenntnis nehmen',
          d: 'Er wird in die Bibliothek des Parlaments eingestellt, wie alle vorherigen auch.',
          eff: { corruption: -6, soeHealth: -4, legitimacy: -6 },
          grp: { youth: -9, intl: -6, sinhalaUrban: -6, publicSector: 3 }, pc: 0 },
        { t: 'Den Ausschuss angreifen',
          d: 'Sie werfen dem Vorsitzenden Profilierungssucht vor. Der nächste Bericht wird milder ausfallen, und niemand wird ihm glauben.',
          eff: { corruption: -8, legitimacy: -8, pressFree: -5, soeHealth: -3 },
          grp: { youth: -11, sinhalaUrban: -8, intl: -7 }, pc: -2 }
      ]
    },
    {
      id: 'ev_inquiry_demand', cat: 'Parlament', weight: 5, minQ: 5, repeatAfter: 8,
      title: 'Forderung nach einem Untersuchungsausschuss',
      text: 'Das Parlament soll einen Untersuchungsausschuss zu einer Beschaffung der Vorgängerregierung einsetzen. Der Vorgang ist alt, die Beteiligten sind teilweise noch im Amt, und einige davon sitzen inzwischen auf der Regierungsbank.',
      options: [
        { t: 'Den Ausschuss einsetzen, ohne Ansehen der Person',
          d: 'Alle Akten werden freigegeben, auch die, die der eigenen Seite unangenehm sind.',
          eff: { corruption: 9, ruleOfLaw: 7, legitimacy: 8, pressFree: 5 },
          grp: { youth: 13, sinhalaUrban: 10, intl: 7 }, pc: -8, special: 'lose_seats_half' },
        { t: 'Einen eng begrenzten Auftrag erteilen',
          d: 'Der Ausschuss darf prüfen, aber nur den Zeitraum bis 2024. Die Grenze ist offensichtlich und trotzdem wirksam.',
          eff: { corruption: 3, ruleOfLaw: 2, legitimacy: -3 },
          grp: { youth: -4, sinhalaUrban: -3, intl: -2 }, pc: -4 },
        { t: 'Auf laufende Ermittlungen verweisen',
          d: 'Ein Ausschuss würde die Arbeit der Behörden stören. Formal richtig, und alle wissen, warum es gesagt wird.',
          eff: { corruption: -5, legitimacy: -6, pressFree: -3 },
          grp: { youth: -9, sinhalaUrban: -7, intl: -4 }, pc: -2 }
      ]
    },
    {
      id: 'ev_governor_conflict', cat: 'Regierung', weight: 5, minQ: 4, repeatAfter: 6,
      cond: function (s) { return s.flags.pcElections || I(s, 'trustTamil') < 35; },
      title: 'Gouverneur blockiert den Provinzrat',
      text: 'Der von Ihnen ernannte Gouverneur der Nordprovinz verweigert die Zustimmung zu drei Beschlüssen des Provinzrats: Landvergabe, Schulverwaltung und ein Gedenkort. Der Provinzrat spricht von Ausschaltung, der Gouverneur von Rechtsaufsicht. Beide berufen sich auf denselben Verfassungszusatz.',
      options: [
        { t: 'Den Gouverneur zurückpfeifen',
          d: 'Die Beschlüsse werden ausgefertigt. Die Rechtsaufsicht ist keine Fachaufsicht, und das wird schriftlich festgehalten.',
          eff: { trustTamil: 11, regionalBalance: 6, reconcile: 6, ruleOfLaw: 4, sinhalaPress: 5 },
          grp: { tamilNE: 14, diaspora: 7, muslim: 4, sinhalaRural: -6, military: -5, sangha: -5 }, pc: -8 },
        { t: 'Den Gouverneur austauschen',
          d: 'Ein neuer Gouverneur, im Einvernehmen mit dem Provinzrat ausgewählt. Ein Präzedenzfall, den die anderen acht Provinzen bemerken werden.',
          eff: { trustTamil: 9, regionalBalance: 7, legitimacy: 4, sinhalaPress: 4 },
          grp: { tamilNE: 12, diaspora: 6, sinhalaRural: -5, sangha: -4 }, pc: -10 },
        { t: 'Den Gouverneur stützen',
          d: 'Sie erklären die Beschlüsse für rechtswidrig. Im Süden ist das populär, im Norden ist es die Bestätigung von allem.',
          eff: { trustTamil: -10, reconcile: -7, regionalBalance: -5, sinhalaPress: -3 },
          grp: { tamilNE: -13, diaspora: -8, sinhalaRural: 6, sangha: 5, military: 4 }, pc: -3 },
        { t: 'Ein Schlichtungsverfahren einrichten',
          d: 'Eine gemeinsame Kommission aus Zentralregierung und Provinzen klärt strittige Zuständigkeiten künftig vorab.',
          eff: { regionalBalance: 8, ruleOfLaw: 6, trustTamil: 5, stateCap: 4, reconcile: 3 },
          grp: { tamilNE: 9, muslim: 5, malaiyaha: 4, business: 3 }, pc: -11 }
      ]
    },
    {
      id: 'ev_public_service_strike', cat: 'Regierung', weight: 6, minQ: 2, repeatAfter: 5,
      cond: function (s) { return I(s, 'inflation') > 8 || s.budget.exp.wages < 1040; },
      title: 'Streik im öffentlichen Dienst',
      text: 'Die Gewerkschaften des öffentlichen Dienstes legen die Arbeit nieder. Reisepässe, Grundbuchauszüge, Führerscheine und Rentenanträge liegen still. Gefordert wird ein Inflationsausgleich, den der Haushalt nicht hergibt.',
      options: [
        { t: 'Einen Inflationsausgleich zusagen',
          d: 'Eine Anpassung in zwei Stufen, verbindlich zugesagt. Der Streik endet, der Haushaltsposten wächst dauerhaft.',
          eff: { stateCap: 6, brainDrain: -4, imfCompl: -5 },
          grp: { publicSector: 14, unions: 11, intl: -7, business: -3 }, pc: -5, fiscal: { exp: 72 } },
        { t: 'Eine Einmalzahlung anbieten',
          d: 'Kein dauerhafter Anspruch, aber Geld vor dem Neujahrsfest. Das reicht meistens für ein Jahr.',
          eff: { stateCap: 2, imfCompl: -2 },
          grp: { publicSector: 7, unions: 5, intl: -3 }, pc: -3, fiscal: { exp: 30 } },
        { t: 'Leistungsbezogene Anpassung statt Gießkanne',
          d: 'Mehr Geld nur dort, wo Fachkräfte fehlen und die Arbeit messbar mehr wird. Die Gewerkschaften sind dagegen, die Betroffenen dafür.',
          eff: { stateCap: 7, brainDrain: -5, corruption: 2, imfCompl: -1 },
          grp: { publicSector: 4, unions: -8, business: 5, intl: 2 }, pc: -9, fiscal: { exp: 34 } },
        { t: 'Den Streik für rechtswidrig erklären',
          d: 'Essenzielle Dienste werden per Verordnung unter Streikverbot gestellt. Es hat in Sri Lanka schon funktioniert, und es hat immer Folgen gehabt.',
          eff: { stateCap: -6, pressFree: -8, ruleOfLaw: -5, legitimacy: -6 },
          grp: { publicSector: -14, unions: -16, business: 4, intl: -3 }, pc: -6 }
      ]
    },
    {
      id: 'ev_commission_appointment', cat: 'Parlament', weight: 5, minQ: 3, repeatAfter: 6,
      title: 'Besetzung einer unabhängigen Kommission',
      text: 'Die Wahl-, die Polizei- und die Menschenrechtskommission sind neu zu besetzen. Der Verfassungsrat schlägt Namen vor, das Präsidialamt hat eigene Vorstellungen, und die Verfassung lässt beide Lesarten zu.',
      options: [
        { t: 'Den Vorschlägen des Verfassungsrats folgen',
          d: 'Ohne Änderung, ohne Verzögerung. Genau dafür wurde das Gremium geschaffen.',
          eff: { ruleOfLaw: 9, corruption: 6, legitimacy: 8, pressFree: 5, stateCap: 3 },
          grp: { youth: 11, sinhalaUrban: 9, intl: 8, tamilNE: 5, muslim: 5 }, pc: -6 },
        { t: 'Eigene Kandidaten durchsetzen',
          d: 'Verlässliche Leute an entscheidenden Stellen. Das ist bequem, und es ist genau das, was man der Vorgängerregierung vorgeworfen hat.',
          eff: { ruleOfLaw: -11, corruption: -8, legitimacy: -9, pressFree: -6, stateCap: 4 },
          grp: { youth: -13, sinhalaUrban: -11, intl: -9, tamilNE: -5 }, pc: -4 },
        { t: 'Die Besetzung offen ausschreiben',
          d: 'Anforderungsprofile, öffentliche Anhörung, begründete Auswahl. Aufwendig, und ein Präzedenzfall für alle künftigen Besetzungen.',
          eff: { ruleOfLaw: 11, corruption: 8, legitimacy: 9, stateCap: 5, digitalGov: 2 },
          grp: { youth: 13, sinhalaUrban: 11, intl: 9, business: 5, publicSector: -3 }, pc: -12 },
        { t: 'Die Entscheidung vertagen',
          d: 'Die Kommissionen arbeiten kommissarisch weiter, also kaum. Niemand muss sich festlegen.',
          eff: { ruleOfLaw: -5, corruption: -4, legitimacy: -5, stateCap: -3 },
          grp: { youth: -6, sinhalaUrban: -5, intl: -5 }, pc: -1 }
      ]
    },
    {
      id: 'ev_provincial_council_demand', cat: 'Parlament', weight: 5, minQ: 4, repeatAfter: 7,
      cond: function (s) { return !s.flags.pcElections; },
      title: 'Alle neun Provinzen fordern Wahltermine',
      text: 'Die Provinzräte sind seit Jahren nicht gewählt, verwaltet werden die Provinzen von Gouverneuren. Diesmal fordern nicht nur der Norden und der Osten einen Termin, sondern alle neun Provinzen, quer durch alle Parteien.',
      options: [
        { t: 'Einen verbindlichen Wahltermin nennen',
          d: 'Ein Datum im Gesetzblatt, mit Finanzierung im Haushalt. Danach gibt es kein Zurück mehr.',
          eff: { regionalBalance: 9, trustTamil: 9, legitimacy: 8, reconcile: 6, sinhalaPress: 4 },
          grp: { tamilNE: 13, malaiyaha: 8, muslim: 7, youth: 6, sinhalaRural: -4 }, pc: -12, fiscal: { exp: 22 } },
        { t: 'Erst das Wahlsystem klären',
          d: 'Über das Wahlrecht für die Provinzen wird seit 2017 gestritten. Die Klärung ist notwendig und ein bewährter Grund zu warten.',
          eff: { regionalBalance: -2, trustTamil: -4, legitimacy: -3 },
          grp: { tamilNE: -7, malaiyaha: -4, muslim: -3, sinhalaRural: 2 }, pc: -3 },
        { t: 'Die Provinzräte für verzichtbar erklären',
          d: 'Distriktsekretariate verwalten ohnehin, Provinzräte kosten nur. Im Süden findet das Anklang, im Norden ist es eine Kriegserklärung.',
          eff: { regionalBalance: -9, trustTamil: -12, reconcile: -9, legitimacy: -5, sinhalaPress: -4 },
          grp: { tamilNE: -16, diaspora: -9, malaiyaha: -7, muslim: -6, sinhalaRural: 6, sangha: 5 }, pc: -5 }
      ]
    },
    {
      id: 'ev_president_immunity', cat: 'Regierung', weight: 4, minQ: 6, repeatAfter: 9,
      title: 'Klage gegen den Präsidenten',
      text: 'Eine Bürgerrechtsorganisation reicht beim Obersten Gerichtshof eine Grundrechtsklage gegen eine Ihrer Anordnungen ein. Die Verfassung schützt den Präsidenten weitgehend vor Klagen, was seit Jahrzehnten kritisiert wird, auch von Ihrer eigenen Partei.',
      options: [
        { t: 'Auf die Immunität verzichten',
          d: 'Sie erklären, sich dem Verfahren zu stellen. Das hat vor Ihnen kein Präsident getan.',
          eff: { ruleOfLaw: 12, legitimacy: 11, pressFree: 6, corruption: 4 },
          grp: { youth: 14, sinhalaUrban: 12, intl: 8, tamilNE: 6, business: 4 }, pc: -9 },
        { t: 'Die Anordnung zurücknehmen, ohne das Verfahren zu führen',
          d: 'Die Klage wird gegenstandslos, die Rechtsfrage bleibt offen. Pragmatisch und ein wenig feige.',
          eff: { ruleOfLaw: 3, legitimacy: 2 },
          grp: { sinhalaUrban: 3, youth: 2 }, pc: -4 },
        { t: 'Sich auf die Immunität berufen',
          d: 'Formal einwandfrei. Und das genaue Gegenteil dessen, was im Wahlprogramm stand.',
          eff: { ruleOfLaw: -8, legitimacy: -9, pressFree: -4 },
          grp: { youth: -12, sinhalaUrban: -9, intl: -6 }, pc: -1 }
      ]
    },
    {
      id: 'ev_ministry_overlap', cat: 'Regierung', weight: 5, minQ: 2, repeatAfter: 6,
      cond: function (s) { return I(s, 'stateCap') < 50; },
      title: 'Zwei Ministerien, ein Zuständigkeitsstreit',
      text: 'Ein Investitionsvorhaben hängt seit fünf Monaten zwischen zwei Ministerien fest, die beide zuständig sind und beide nicht entscheiden wollen. Der Investor hat inzwischen in Vietnam angefragt. Das ist kein Einzelfall, sondern die Regel.',
      options: [
        { t: 'Zuständigkeiten im ganzen Kabinett neu schneiden',
          d: 'Eine Aufgabe, ein Ressort, schriftlich festgehalten. Aufwendig, und es räumt eine der teuersten Bremsen des Landes weg.',
          eff: { stateCap: 10, privateSector: 7, fdi: 0.2, corruption: 3, digitalGov: 3 },
          grp: { business: 12, intl: 6, youth: 4, publicSector: -6 }, pc: -11 },
        { t: 'Eine Entscheidungsstelle im Präsidialamt',
          d: 'Wo sich zwei Ressorts nicht einigen, entscheidet das Präsidialamt binnen 30 Tagen. Schnell, und es zentralisiert weiter.',
          eff: { stateCap: 6, privateSector: 5, fdi: 0.12, ruleOfLaw: -3 },
          grp: { business: 8, publicSector: -4, youth: -2 }, pc: -6 },
        { t: 'Diesen einen Fall entscheiden',
          d: 'Der Investor bekommt seine Genehmigung. Der nächste Fall wird wieder fünf Monate dauern.',
          eff: { privateSector: 2, fdi: 0.04 },
          grp: { business: 3 }, pc: -2 }
      ]
    },
    {
      id: 'ev_emergency_powers', cat: 'Regierung', weight: 4, minQ: 5, repeatAfter: 8,
      cond: function (s) { return s.streetPressure > 55 || I(s, 'internalSec') < 42; },
      title: 'Ruf nach Notstandsverordnungen',
      text: 'Aus dem Sicherheitsapparat und Teilen der Fraktion kommt der Vorschlag, die Notstandsvorschriften zu aktivieren. Sri Lanka hat den Ausnahmezustand über Jahrzehnte hinweg als Dauerzustand geführt, und jedes Mal war er als vorübergehend gedacht.',
      options: [
        { t: 'Ablehnen',
          d: 'Die bestehenden Gesetze reichen. Wer mehr Befugnisse fordert, soll begründen, welche Tat er damit verhindert hätte.',
          eff: { ruleOfLaw: 8, pressFree: 8, legitimacy: 6, internalSec: -2 },
          grp: { youth: 11, sinhalaUrban: 8, tamilNE: 7, muslim: 7, intl: 6, military: -5 }, pc: -5 },
        { t: 'Eng begrenzt und befristet erlassen',
          d: 'Vier Wochen, ein Bezirk, mit Berichtspflicht ans Parlament. Die Befristung steht im Text, und sie ist noch nie eingehalten worden.',
          eff: { internalSec: 6, pressFree: -5, ruleOfLaw: -4, legitimacy: -2 },
          grp: { military: 6, sinhalaRural: 4, youth: -6, tamilNE: -6, muslim: -6 }, pc: -4 },
        { t: 'Umfassend erlassen',
          d: 'Festnahmen ohne Haftbefehl, Versammlungsverbote, Zensurbefugnisse. Es wird ruhig werden.',
          eff: { internalSec: 11, pressFree: -16, ruleOfLaw: -13, legitimacy: -11, relWest: -7 },
          grp: { military: 11, sinhalaRural: 3, youth: -17, sinhalaUrban: -13, tamilNE: -12, muslim: -12, intl: -8 },
          pc: -6, special: 'crackdown' },
        { t: 'Stattdessen die Polizei reformieren',
          d: 'Nicht mehr Befugnisse, sondern bessere Ausbildung, Ausrüstung und Aufsicht. Dauert länger und hält länger.',
          eff: { internalSec: 7, ruleOfLaw: 6, corruption: 3, legitimacy: 4 },
          grp: { sinhalaUrban: 7, youth: 6, muslim: 5, tamilNE: 4, business: 4 }, pc: -10, fiscal: { exp: 26 } }
      ]
    },
    {
      id: 'ev_party_congress', cat: 'Regierung', weight: 4, minQ: 6, repeatAfter: 9,
      title: 'Parteitag der Regierungspartei',
      text: 'Der Parteitag steht an. Die Basis erwartet Rechenschaft über die Wahlversprechen, die Fraktion erwartet Rückendeckung, und beide erwarten Unterschiedliches. Was hier beschlossen wird, bindet Sie für den Rest der Amtszeit.',
      options: [
        { t: 'Die Wahlversprechen bekräftigen',
          d: 'Abschaffung der Exekutivpräsidentschaft, Korruptionsbekämpfung, Systemwechsel. Die Basis jubelt, die Fraktion rechnet.',
          eff: { legitimacy: 7, corruption: 4, reconcile: 2 },
          grp: { youth: 11, sinhalaUrban: 7, unions: 6, business: -4 }, pc: 8 },
        { t: 'Für Realismus werben',
          d: 'Sie erklären, was unter einem IWF-Programm möglich ist und was nicht. Ehrlich, und für einen Parteitag ungewöhnlich.',
          eff: { legitimacy: 5, imfCompl: 4, stateCap: 3 },
          grp: { business: 8, intl: 6, sinhalaUrban: 5, youth: -5, unions: -6 }, pc: 5 },
        { t: 'Den Kurs auf die Mitte öffnen',
          d: 'Die Partei soll über ihr angestammtes Milieu hinauswachsen. Das erweitert die Basis und verstimmt den Kern.',
          eff: { privateSector: 5, legitimacy: 2, fdi: 0.1 },
          grp: { business: 10, sinhalaUrban: 7, unions: -9, youth: -4 }, pc: 4 },
        { t: 'Den Parteitag ausfallen lassen',
          d: 'Terminschwierigkeiten. Es gibt gerade Wichtigeres, und ein Parteitag ist selten hilfreich, wenn die Umfragen schlecht sind.',
          eff: { legitimacy: -5, stateCap: 1 },
          grp: { youth: -7, unions: -5, publicSector: -3 }, pc: 2 }
      ]
    }
  ];

  D.EVENTS = (D.EVENTS || []).concat(P);
  D.BY_ID = D.BY_ID || {};
  D.EVENTS.forEach(function (e) { D.BY_ID[e.id] = e; });

})(SL.data.events = SL.data.events || {});
