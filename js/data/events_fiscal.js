/* ============================================================
   EREIGNISSE  -  Ausweichreaktionen auf Steuerlast und Kürzungen

   Diese Ereignisse treten nur ein, wenn der Haushalt überdehnt ist:
   wenn Einnahmeposten weit über ihren Ausgangswert geschoben wurden
   oder Ausgabenposten tief darunter. Sie machen sichtbar, was die
   Ausweichkurve rechnerisch bereits abbildet.
   ============================================================ */
(function (D) {
  'use strict';
  var E = SL.engine, B = SL.data.baseline;

  /* Überlastung eines einzelnen Einnahmepostens abfragen */
  function strainOf(st, key) {
    var line = null;
    B.REVENUE.forEach(function (r) { if (r.k === key) line = r; });
    return line ? E.revStrainWeight(line, st.budget.rev[key]) : 0;
  }

  var P = [
    {
      id: 'ev_emigration_wave', cat: 'Abwanderung', weight: 13, repeatAfter: 5,
      cond: function (st) { return st.ind.brainDrain > 74 || strainOf(st, 'paye') > 0.55; },
      title: 'Auswanderungswelle bei Fachkräften',
      text: 'Die Passbehörde meldet Rekordandrang, die Wartezeit auf einen Termin liegt bei Monaten. Krankenhäuser verlieren Anästhesistinnen und Intensivpflegekräfte an den Golf, die Universitäten ihren wissenschaftlichen Nachwuchs nach Australien, die Softwarehäuser ihre erfahrenen Entwickler an Auftraggeber in Europa, für die sie von zu Hause aus arbeiten. Wer bleibt, rechnet vor, was nach Steuern übrig bleibt, und kommt zu einem ungünstigen Ergebnis.',
      options: [
        { t: 'Lohnsteuer für mittlere Einkommen zurücknehmen',
          d: 'Freibetrag anheben, mittlere Stufen abflachen. Kostet unmittelbar Einnahmen, hält aber Fachkräfte im Land.',
          eff: { brainDrain: -8, skillsMatch: 4, health: 3, taxCompl: 3 },
          grp: { sinhalaUrban: 9, youth: 8, publicSector: 7, intl: -4 }, fiscal: { rev: -48 }, pc: -6 },
        { t: 'Rückkehrprogramm auflegen',
          d: 'Steuerliche Anreize, Anerkennung ausländischer Abschlüsse, Wohnraum und Schulplätze für Rückkehrende.',
          eff: { brainDrain: -4, skillsMatch: 5, diaspora: 8, fdi: 0.12 },
          grp: { diaspora: 11, youth: 4, sinhalaUrban: 3 }, fiscal: { exp: 22 }, pc: -5 },
        { t: 'Bindungsfristen für staatlich Ausgebildete',
          d: 'Wer auf Staatskosten Medizin studiert hat, arbeitet fünf Jahre im Land oder erstattet die Ausbildungskosten.',
          eff: { brainDrain: -6, health: 2, legitimacy: -4, ruleOfLaw: -3 },
          grp: { youth: -12, sinhalaUrban: -7, publicSector: -5, sinhalaRural: 4, intl: -5 }, pc: -8 },
        { t: 'Als Devisenquelle hinnehmen',
          d: 'Die Überweisungen der Ausgewanderten tragen die Zahlungsbilanz. Kurzfristig hilft der Aderlass sogar.',
          eff: { brainDrain: 6, remittances: 0.5, skillsMatch: -5, health: -4, education: -3 },
          grp: { intl: -3, youth: -6, publicSector: -4 }, pc: 0 }
      ]
    },
    {
      id: 'ev_capital_flight', cat: 'Abwanderung', weight: 11, repeatAfter: 6,
      cond: function (st) { return E.budgetStrain(st).rev > 0.8 && st.ind.fdi < 1.5; },
      title: 'Unternehmen verlagern ihren Sitz',
      text: 'Drei größere Konzerne haben ihre Regionalzentrale nach Singapur verlegt, ein vierter kündigt es an. Offiziell heißt es, man wolle näher an den Kapitalmärkten sein. In den Gesprächen mit dem Investitionsamt fällt regelmäßig ein anderer Grund: die Höhe der Abgaben und vor allem die Unsicherheit darüber, wie sie im nächsten Haushalt aussehen werden.',
      options: [
        { t: 'Steuerliche Planungssicherheit gesetzlich zusagen',
          d: 'Keine rückwirkenden Änderungen, zwölf Monate Ankündigungsfrist für neue Belastungen.',
          eff: { fdi: 0.35, privateSector: 7, ruleOfLaw: 4, taxCompl: 4 },
          grp: { business: 10, intl: 6, unions: -4 }, pc: -5 },
        { t: 'Wegzugsbesteuerung einführen',
          d: 'Bei Sitzverlegung werden stille Reserven besteuert. Hält manche im Land und verärgert alle.',
          eff: { fdi: -0.25, privateSector: -5, taxCompl: 2 },
          grp: { business: -12, intl: -5, unions: 8, youth: 4 }, fiscal: { rev: 26 }, pc: -7 },
        { t: 'Körperschaftsteuer an Beschäftigung koppeln',
          d: 'Ermäßigter Satz für Unternehmen, die im Inland ausbilden und einstellen.',
          eff: { fdi: 0.3, privateSector: 8, unemp: -0.2 },
          grp: { business: 11, youth: 5, unions: -5, intl: 2 }, fiscal: { rev: -42 }, pc: -6 },
        { t: 'Abgang hinnehmen',
          d: 'Der Standort lebt nicht von Regionalzentralen, sondern von Produktion und Binnennachfrage.',
          eff: { fdi: -0.4, privateSector: -8, exports: -3 },
          grp: { business: -9, unions: 5, intl: -4 }, pc: 0 }
      ]
    },
    {
      id: 'ev_tax_revolt', cat: 'Abwanderung', weight: 12, repeatAfter: 5,
      cond: function (st) { return E.budgetStrain(st).rev > 1.2; },
      title: 'Steuerboykott und Flucht in die Schattenwirtschaft',
      text: 'Der Handelsverband ruft zu einem landesweiten Ladenschlusstag auf, die Ärztekammer klagt gegen die Vorauszahlungspflicht, und im Pettah-Markt wird spürbar häufiger bar und ohne Beleg abgerechnet. Das Finanzministerium meldet einen Einbruch bei den Voranmeldungen, der sich mit der Konjunktur allein nicht erklären lässt. Was beschlossen wurde, kommt in der Kasse nicht an.',
      options: [
        { t: 'Belastung zurücknehmen, Vollzug ausbauen',
          d: 'Sätze senken, dafür Betriebsprüfung und Registrierung verstärken. Der langsamere, aber verlässliche Weg.',
          eff: { taxCompl: 11, corruption: 3, privateSector: 5, stateCap: 4 },
          grp: { business: 8, sinhalaUrban: 4, unions: -3 }, fiscal: { rev: -55 }, pc: -7 },
        { t: 'Amnestie gegen Offenlegung',
          d: 'Straffreiheit bei Nacherklärung. Bringt schnell Geld und belohnt genau die Falschen.',
          eff: { taxCompl: -4, corruption: -3, ruleOfLaw: -4 },
          grp: { business: 6, unions: -6, youth: -5, intl: -4 }, fiscal: { rev: 60 }, pc: -5 },
        { t: 'Härter durchgreifen',
          d: 'Kontosperren, Betriebsschließungen und Strafverfahren gegen prominente Fälle.',
          eff: { taxCompl: 5, ruleOfLaw: -2, privateSector: -6, fdi: -0.2 },
          grp: { business: -13, sinhalaUrban: -5, unions: 5, intl: -3 }, pc: -9 },
        { t: 'Aussitzen',
          d: 'Der Protest wird sich legen, das war bisher immer so.',
          eff: { taxCompl: -9, corruption: -4, legitimacy: -5 },
          grp: { business: -4, intl: -4 }, pc: -2 }
      ]
    },
    {
      id: 'ev_service_collapse', cat: 'Innenpolitik', weight: 12, repeatAfter: 4,
      cond: function (st) { return E.budgetStrain(st).exp > 0.9; },
      title: 'Der Staat liefert nicht mehr',
      text: 'In drei Distrikten ist der Schulbetrieb wegen unbezahlter Rechnungen eingeschränkt, zwei Bezirkskrankenhäuser weisen Patienten ab, und die Müllabfuhr in Colombo streikt seit elf Tagen. Die Kürzungen der letzten Haushalte kommen dort an, wo sie sichtbar werden: nicht in den Ministerien, sondern am Schalter, im Klassenzimmer und in der Notaufnahme.',
      options: [
        { t: 'Grundversorgung wiederherstellen',
          d: 'Gesundheit, Bildung und kommunale Leistungen zurück auf den früheren Stand.',
          eff: { health: 7, education: 6, stateCap: 5, socialProt: 5 },
          grp: { sinhalaRural: 9, publicSector: 8, unions: 7, malaiyaha: 6, intl: -3 }, fiscal: { exp: 95 }, pc: -5 },
        { t: 'Gezielt die schlimmsten Lücken schließen',
          d: 'Ein Notfallfonds für die betroffenen Distrikte, im Übrigen bleibt es beim Sparkurs.',
          eff: { health: 3, education: 2, stateCap: 2, regionalBalance: 3 },
          grp: { sinhalaRural: 4, publicSector: 3, unions: 2 }, fiscal: { exp: 32 }, pc: -3 },
        { t: 'An private Anbieter vergeben',
          d: 'Wo der Staat nicht liefert, sollen Private einspringen, finanziert über Gebühren.',
          eff: { stateCap: -4, privateSector: 5, inequality: 1.4, health: -2 },
          grp: { business: 8, unions: -11, publicSector: -9, sinhalaRural: -6 }, pc: -6 },
        { t: 'Auf die Haushaltslage verweisen',
          d: 'Es ist kein Geld da, und das muss man den Leuten auch sagen können.',
          eff: { health: -5, education: -4, stateCap: -5, legitimacy: -6 },
          grp: { sinhalaRural: -10, publicSector: -9, unions: -8, intl: 3 }, pc: -2 }
      ]
    }
  ];

  D.EVENTS = (D.EVENTS || []).concat(P);
  D.BY_ID = D.BY_ID || {};
  D.EVENTS.forEach(function (e) { D.BY_ID[e.id] = e; });

})(SL.data.events = SL.data.events || {});
