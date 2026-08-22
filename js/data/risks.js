/* ============================================================
   STRUKTURELLE HINDERNISSE

   Manche Maßnahmen scheitern nicht am politischen Willen, sondern
   an fehlenden Voraussetzungen: es gibt keine zuständige Behörde,
   der Zoll ist käuflich, das Grundbuch ist unvollständig, die
   Gerichte sind verstopft.

   Jedes Hindernis dämpft die Wirkung der betroffenen Maßnahmen und
   verteuert sie. Es lässt sich durch bestimmte andere Maßnahmen
   beheben. Damit bekommt die Reihenfolge von Reformen Gewicht:
   erst die Voraussetzung schaffen, dann das Vorhaben umsetzen.
   ============================================================ */
(function (R) {
  'use strict';

  R.RISKS = [
    {
      k: 'revenue_authority',
      label: 'Die Steuerverwaltung ist nicht einzugsfähig',
      short: 'Steuerverwaltung schwach',
      desc: 'Das Inland Revenue Department arbeitet mit einem Verwaltungssystem, das seit Jahren nicht zuverlässig läuft, hat zu wenige Prüferinnen und Prüfer und erreicht große Teile der Wirtschaft gar nicht. Eine beschlossene Steuer ist damit noch keine eingenommene Steuer.',
      fix: ['bu_ramis_rebuild', 'bu_revenue_authority', 'di_tax_digital'],
      dampen: 0.42, costMul: 1.25
    },
    {
      k: 'customs_graft',
      label: 'Der Zoll ist hochkorrupt',
      short: 'Zoll korrupt',
      desc: 'Unterfakturierung, Warencodes gegen Bargeld, verschwundene Container. Der Zoll gilt seit Jahrzehnten als eine der lukrativsten Stellen im Staatsdienst. Jede Maßnahme, die auf Einfuhrabgaben oder Handelskontrolle setzt, verpufft zu großen Teilen.',
      fix: ['ju_customs_integrity', 'ju_single_window'],
      dampen: 0.45, costMul: 1.2
    },
    {
      k: 'no_asset_registry',
      label: 'Es gibt kein Vermögensregister',
      short: 'kein Vermögensregister',
      desc: 'Wer wie viel besitzt, weiß der Staat nicht. Immobilien, Anteile, Fahrzeuge und Auslandsvermögen liegen in getrennten, unvollständigen Verzeichnissen. Vermögens-, Erbschaft- und Grundsteuern lassen sich so nicht durchsetzen.',
      fix: ['bu_asset_register'],
      dampen: 0.35, costMul: 1.3
    },
    {
      k: 'no_land_registry',
      label: 'Das Grundbuch ist unvollständig',
      short: 'Grundbuch lückenhaft',
      desc: 'Das Titelregistrierungsprogramm Bim Saviya deckt nach über zwanzig Jahren nur einen Bruchteil der Grundstücke ab. Der Rest hängt an Urkundenketten, die vor Gericht regelmäßig zerfallen. Betrifft Landrückgabe, Grundsteuer, Wohnungsbau und Agrarkredite.',
      fix: ['ju_land_titles_complete'],
      dampen: 0.45, costMul: 1.2
    },
    {
      k: 'court_backlog',
      label: 'Die Gerichte sind verstopft',
      short: 'Gerichte überlastet',
      desc: 'Mehrere hunderttausend Verfahren sind anhängig, viele seit über zehn Jahren. Handschriftliche Protokolle, fehlende Dolmetscher, vertagte Termine. Solange das so bleibt, ist jedes neue Gesetz auf dem Papier stärker als in der Wirklichkeit.',
      fix: ['ju_court_backlog', 'ju_case_management', 'ju_court_capacity'],
      dampen: 0.5, costMul: 1.15
    },
    {
      k: 'no_prosecution_service',
      label: 'Es gibt keine unabhängige Anklagebehörde',
      short: 'keine eigene Anklagebehörde',
      desc: 'Das Generalstaatsanwaltsamt berät die Regierung und klagt zugleich an. Wenn die Regierung selbst der Beschuldigte ist, liegt der Interessenkonflikt offen zutage. Verfahren gegen Amtsträger versanden regelmäßig.',
      fix: ['ju_independent_dpp'],
      dampen: 0.4, costMul: 1.25
    },
    {
      k: 'weak_anticorruption',
      label: 'Die Antikorruptionskommission ist zu schwach',
      short: 'CIABOC unterbesetzt',
      desc: 'Die Kommission zur Untersuchung von Bestechungsvorwürfen hat nach dem Antikorruptionsgesetz von 2023 mehr Befugnisse als Personal. Ohne eigene Ermittler, Forensiker und ein Budget, das nicht jährlich neu erbettelt werden muss, bleibt sie eine Beschwerdestelle.',
      fix: ['ju_ciaboc_strengthen'],
      dampen: 0.45, costMul: 1.2
    },
    {
      k: 'no_transport_authority',
      label: 'Niemand plant den Verkehr im Zusammenhang',
      short: 'keine Verkehrsbehörde',
      desc: 'Bahn, staatliche Busse, private Busse, Provinzen und Kommunen planen nebeneinander her. Es gibt keinen gemeinsamen Fahrplan, kein gemeinsames Ticket und keine Stelle, die ein Netz entwerfen könnte.',
      fix: ['tr_transport_authority'],
      dampen: 0.45, costMul: 1.2
    },
    {
      k: 'rail_decay',
      label: 'Der Oberbau der Bahn ist verschlissen',
      short: 'Gleisnetz marode',
      desc: 'Große Teile des rund 1.500 km langen Netzes stammen aus der Kolonialzeit. Langsamfahrstellen, Signaltechnik aus den 1930er Jahren, Fahrzeuge ohne Ersatzteile. Neue Verbindungen auf altem Gleis bringen kaum Fahrzeitgewinn.',
      fix: ['tr_track_renewal'],
      dampen: 0.4, costMul: 1.25
    },
    {
      k: 'soe_opacity',
      label: 'Die Staatsbetriebe legen keine geprüften Zahlen vor',
      short: 'Staatsbetriebe undurchsichtig',
      desc: 'Bei mehreren großen Staatsunternehmen liegen testierte Jahresabschlüsse jahrelang nicht vor. Ohne belastbare Bilanz lässt sich weder sanieren noch verkaufen noch die Verlustübernahme begrenzen.',
      fix: ['ju_soe_audit'],
      dampen: 0.45, costMul: 1.2
    },
    {
      k: 'no_local_capacity',
      label: 'Den Kommunen fehlt das Fachpersonal',
      short: 'Kommunen ohne Fachkräfte',
      desc: 'Viele Pradeshiya Sabhas haben keinen eigenen Ingenieur, keine Buchhaltung nach Standard und keine Vergabestelle. Aufgaben nach unten zu verlagern verbessert dort nichts, wo niemand ist, der sie übernehmen könnte.',
      fix: ['dv_district_capacity', 'dv_local_audit'],
      dampen: 0.5, costMul: 1.15
    },
    {
      k: 'police_politicised',
      label: 'Die Polizei steht unter politischem Einfluss',
      short: 'Polizei politisiert',
      desc: 'Versetzungen und Beförderungen folgen häufig politischen statt fachlichen Erwägungen. Ermittlungen gegen Personen mit Verbindungen zur Regierungsseite kommen selten zum Abschluss.',
      fix: ['mil_police_reform', 'st_commissions'],
      dampen: 0.45, costMul: 1.2
    }
  ];

  R.BY_KEY = {};
  R.RISKS.forEach(function (r) { R.BY_KEY[r.k] = r; });

  /* Ein Hindernis gilt als behoben, sobald eine der behebenden
     Maßnahmen beschlossen und vollständig umgesetzt ist. */
  R.solved = function (st, key) {
    var r = R.BY_KEY[key];
    if (!r) return true;
    for (var i = 0; i < r.fix.length; i++) {
      var rec = st.enacted[r.fix[i]];
      if (rec && rec.active) return true;
    }
    return false;
  };

  /* Alle offenen Hindernisse einer Maßnahme */
  R.openFor = function (st, p) {
    if (!p.risks || !p.risks.length) return [];
    return p.risks.filter(function (k) { return !R.solved(st, k); })
      .map(function (k) { return R.BY_KEY[k]; })
      .filter(Boolean);
  };

  /* Wirkungsfaktor: mehrere offene Hindernisse multiplizieren sich,
     der Boden liegt bei 20 % der ursprünglichen Wirkung. */
  R.factor = function (st, p) {
    var open = R.openFor(st, p), f = 1;
    open.forEach(function (r) { f *= r.dampen; });
    return Math.max(0.2, f);
  };

  /* Aufschlag auf die politischen Kosten */
  R.costMul = function (st, p) {
    var open = R.openFor(st, p), m = 1;
    open.forEach(function (r) { m *= r.costMul; });
    return Math.min(1.8, m);
  };

})(SL.data.risks = SL.data.risks || {});
