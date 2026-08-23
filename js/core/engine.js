/* ============================================================
   SIMULATIONSKERN
   Alle Indikatoren werden aus einem Grundwert plus Modifikatoren
   abgeleitet. Dadurch bleibt jede Wirkung nachvollziehbar und
   umkehrbar.
   ============================================================ */
(function (E) {
  'use strict';

  var U = SL.util, B = SL.data.baseline, G = SL.data.geo, M = SL.model, St = SL.state;
  var Gov = SL.data.governance || { MINISTRIES: [], INSTITUTIONS: [], MINISTRY_BY_KEY: {}, INSTITUTION_BY_KEY: {} };

  /* Indikatoren, die aus Formeln entstehen statt aus Aufsummierung */
  var FLOW = { growth: 1, inflation: 1, debtGdp: 1, reserves: 1, fx: 1, unemp: 1, youthUnemp: 1, poverty: 1 };

  /* ---------------------------------------------------------
     Katalogzugriff
     --------------------------------------------------------- */
  var byId = null;
  E.all = function () { return SL.data.policies || []; };
  E.byId = function (id) {
    if (!byId) { byId = {}; E.all().forEach(function (p) { byId[p.id] = p; }); }
    return byId[id];
  };

  /* ---------------------------------------------------------
     Haushaltsrechnung
     --------------------------------------------------------- */
  /** Alle Haushaltsposten sind in Preisen von 2026 gespeichert und
      wachsen automatisch mit dem nominalen BIP. Sonst würde die
      Einnahmenquote allein durch Inflation jedes Jahr wegbrechen. */
  E.scale = function (st) { return st.gdpN / B.META.gdpNominal; };

  E.budget = function (st) {
    var sc = E.scale(st);
    var rev = 0, exp = 0, revLines = {}, expLines = {};

    B.REVENUE.forEach(function (r) {
      /* Nicht der eingestellte Satz zählt, sondern was davon ankommt. */
      var v = E.revYield(st, r, st.budget.rev[r.k]) * sc;
      revLines[r.k] = v; rev += v;
    });
    B.SPENDING.forEach(function (e) {
      var v = (e.k === 'interest') ? E.interest(st) : st.budget.exp[e.k] * sc;
      expLines[e.k] = v; exp += v;
    });

    /* Wirkung beschlossener Maßnahmen */
    var pRev = 0, pExp = 0;
    for (var id in st.enacted) {
      var p = E.byId(id);
      if (!p || !p.fiscal) continue;
      var r = p.fiscal.rev || 0;
      /* Mehreinnahmen fallen nur an, soweit der Staat sie auch einziehen kann.
         Mindereinnahmen und Ausgaben entstehen dagegen in voller Höhe. */
      if (r > 0) r *= E.riskFactor(st, p);
      pRev += r * sc;
      pExp += (p.fiscal.exp || 0) * sc;
    }

    var totalRev = rev + pRev;
    var totalExp = exp + pExp;
    var interest = expLines.interest;
    var primaryExp = totalExp - interest;
    var primary = totalRev - primaryExp;
    var balance = totalRev - totalExp;

    return {
      revLines: revLines, expLines: expLines,
      baseRev: rev, baseExp: exp,
      policyRev: pRev, policyExp: pExp,
      totalRev: totalRev, totalExp: totalExp,
      interest: interest, primaryExp: primaryExp,
      primary: primary, balance: balance,
      revPct: totalRev / st.gdpN * 100,
      expPct: totalExp / st.gdpN * 100,
      primaryPct: primary / st.gdpN * 100,
      balancePct: balance / st.gdpN * 100
    };
  };

  /* ---------------------------------------------------------
     Zuordnung beschlossener Maßnahmen zu Haushaltsposten

     Eine Entscheidung im Bildungsressort schlägt im Bildungsetat
     auf, eine im Verteidigungsressort im Verteidigungsetat. Damit
     ist im Haushaltsplan sichtbar, was die Ressortpolitik mit den
     einzelnen Posten macht, statt nur mit der Gesamtsumme.

     `fline` an einer Maßnahme überschreibt die Zuordnung; ohne
     Angabe entscheidet das Ressort. Was sich nicht zuordnen lässt,
     wird als Sammelposten ausgewiesen statt stillschweigend
     untergebracht.
     --------------------------------------------------------- */
  var CAT_EXP_LINE = {
    education: 'education', health: 'health', military: 'defence',
    social: 'social', devolution: 'provinces', transport: 'capital',
    climate: 'capital', economy: 'capital', agri: 'subsidies',
    energy: 'subsidies', justice: 'police', state: 'ministries',
    identity: 'ministries', digital: 'ministries', foreign: 'ministries',
    budget: 'ministries'
  };

  /* Auf welchen Ausgabenposten wirkt ein Ressort? */
  E.expLineFor = function (cat) { return CAT_EXP_LINE[cat] || null; };

  E.policyLineDeltas = function (st) {
    var sc = E.scale(st);
    var out = { rev: {}, exp: {}, revOther: 0, expOther: 0, count: { rev: {}, exp: {} }, otherCount: 0 };
    for (var id in st.enacted) {
      var p = E.byId(id);
      if (!p || !p.fiscal) continue;

      var r = p.fiscal.rev || 0;
      if (r) {
        /* Mehreinnahmen nur, soweit einziehbar; Verzicht in voller Höhe. */
        var eff = (r > 0 ? r * E.riskFactor(st, p) : r) * sc;
        var rk = p.fline && st.budget.rev[p.fline] !== undefined ? p.fline : null;
        if (rk) { out.rev[rk] = (out.rev[rk] || 0) + eff; out.count.rev[rk] = (out.count.rev[rk] || 0) + 1; }
        else { out.revOther += eff; out.otherCount++; }
      }

      var x = p.fiscal.exp || 0;
      if (x) {
        var xk = (p.fline && st.budget.exp[p.fline] !== undefined) ? p.fline : CAT_EXP_LINE[p.cat];
        if (xk && st.budget.exp[xk] !== undefined) {
          out.exp[xk] = (out.exp[xk] || 0) + x * sc;
          out.count.exp[xk] = (out.count.exp[xk] || 0) + 1;
        } else { out.expOther += x * sc; out.otherCount++; }
      }
    }
    return out;
  };

  E.interest = function (st) {
    var rate = st.effRate * (1 + (72 - st.ind.imfCompl) / 260);
    rate = U.clamp(rate, 0.05, 0.17);
    return st.debt * rate;
  };

  E.primaryTarget = function (st) {
    return st.year <= 2026 ? B.IMF.primaryTarget2026 : B.IMF.primaryTargetLater;
  };

  /* ---------------------------------------------------------
     Wirkung der Haushaltsregler auf Indikatoren
     --------------------------------------------------------- */
  /* ---------------------------------------------------------
     Ausweichreaktion der Steuerpflichtigen

     Ein Steuersatz ist keine Einnahme. Wer den Hebel weit über den
     Ausgangswert schiebt, erntet nicht proportional mehr, sondern
     stößt auf Hinterziehung, Verlagerung ins Ausland, Schwarzhandel
     und Auswanderung. Das Mehraufkommen läuft deshalb gegen eine
     Obergrenze, die von der Leistungsfähigkeit der Steuerverwaltung
     abhängt: eine gut arbeitende Behörde hebt sie deutlich an.

     Senkungen wirken dagegen in voller Höhe. Wer auf Einnahmen
     verzichtet, bekommt den Verzicht ungemildert in die Bücher.
     --------------------------------------------------------- */
  E.adminFactor = function (st) {
    var f = 0.55 + U.clamp(st.ind.taxCompl, 0, 100) / 100 * 0.9;
    if (SL.data.risks.solved(st, 'revenue_authority')) f += 0.18;
    if (SL.data.risks.solved(st, 'customs_graft')) f += 0.08;
    /* Wer auswandert, zahlt hier keine Steuern mehr. Anhaltende
       Abwanderung verkleinert die Bemessungsgrundlage selbst und
       senkt damit die Obergrenze dessen, was überhaupt einzuholen ist. */
    f -= Math.max(0, st.ind.brainDrain - 68) / 100 * 0.85;
    return Math.max(0.25, f);
  };

  /* Was ein Einnahmeposten tatsächlich einbringt */
  E.revYield = function (st, line, value) {
    var d = value - line.base;
    if (d <= 0 || !line.elast) return value;
    var cap = line.base * line.elast * E.adminFactor(st);
    if (cap <= 0) return line.base;
    return line.base + cap * (1 - Math.exp(-d / cap));
  };

  /* Aufschlüsselung für die Haushaltsansicht */
  E.revDetail = function (st) {
    var out = {};
    B.REVENUE.forEach(function (line) {
      var v = st.budget.rev[line.k];
      var eff = E.revYield(st, line, v);
      out[line.k] = {
        nominal: v, effective: eff, lost: v - eff,
        raise: line.base ? (v - line.base) / line.base : 0,
        cap: line.elast ? line.base * (1 + line.elast * E.adminFactor(st)) : null
      };
    });
    return out;
  };

  /* Überlastung eines Einnahmepostens: Anteil der Erhöhung jenseits
     von 25 %, ab dem die strukturellen Schäden einsetzen. */
  function revStrainWeight(line, cur) {
    if (!line.strain || !line.base) return 0;
    var raise = (cur - line.base) / line.base;
    return Math.min(2.6, Math.max(0, raise - 0.25) * 2);
  }
  /* Unterversorgung eines Ausgabepostens: Anteil der Kürzung
     jenseits von 15 %. */
  function expCutWeight(line, cur) {
    if (!line.cutStrain || !line.base) return 0;
    var cut = (line.base - cur) / line.base;
    return Math.min(2.6, Math.max(0, cut - 0.15) * 2.6);
  }
  E.revStrainWeight = revStrainWeight;
  E.expCutWeight = expCutWeight;

  E.budgetEffects = function (st) {
    var out = {};
    var add = function (k, v) { if (!isFinite(v)) return; out[k] = (out[k] || 0) + v; };

    B.REVENUE.concat(B.SPENDING).forEach(function (line) {
      var cur = (st.budget.rev[line.k] !== undefined) ? st.budget.rev[line.k] : st.budget.exp[line.k];
      if (cur === undefined) return;
      var d = cur - line.base;
      if (line.eff) for (var k in line.eff) add(k, line.eff[k] * d);

      /* Schäden durch Überdehnung nach oben oder unten */
      var w = revStrainWeight(line, cur);
      if (w > 0) for (var s in line.strain) if (s !== 'streetPressureX') add(s, line.strain[s] * w);
      var c = expCutWeight(line, cur);
      if (c > 0) for (var t in line.cutStrain) if (t !== 'growth') add(t, line.cutStrain[t] * c);
    });
    return out;
  };

  /* Zusätzlicher Protestdruck aus überdehnten Verbrauchsteuern */
  E.budgetStreetStrain = function (st) {
    var p = 0;
    B.REVENUE.forEach(function (line) {
      if (!line.strain || !line.strain.streetPressureX) return;
      p += line.strain.streetPressureX * revStrainWeight(line, st.budget.rev[line.k]);
    });
    B.SPENDING.forEach(function (line) {
      p += expCutWeight(line, st.budget.exp[line.k]) * 3.2;
    });
    return p;
  };

  /* Wie stark ist der Haushalt insgesamt überdehnt? Für Warnungen und Ereignisse. */
  E.budgetStrain = function (st) {
    var rev = 0, exp = 0, lines = [];
    B.REVENUE.forEach(function (line) {
      var w = revStrainWeight(line, st.budget.rev[line.k]);
      if (w > 0) { rev += w; lines.push({ line: line, kind: 'rev', w: w }); }
    });
    B.SPENDING.forEach(function (line) {
      var c = expCutWeight(line, st.budget.exp[line.k]);
      if (c > 0) { exp += c; lines.push({ line: line, kind: 'exp', w: c }); }
    });
    lines.sort(function (a, b) { return b.w - a.w; });
    return { rev: rev, exp: exp, total: rev + exp, lines: lines };
  };

  E.budgetGroupEffects = function (st) {
    var out = {};
    var add = function (k, v) { out[k] = (out[k] || 0) + v; };
    B.REVENUE.concat(B.SPENDING).forEach(function (line) {
      var cur = (st.budget.rev[line.k] !== undefined) ? st.budget.rev[line.k] : st.budget.exp[line.k];
      if (cur === undefined) return;
      var d = cur - line.base;
      if (line.grp) for (var k in line.grp) add(k, line.grp[k] * d);
      /* Wer überdehnt oder kaputtspart, verliert die Betroffenen zusätzlich */
      var w = E.revStrainWeight(line, cur);
      if (w > 0) for (var g in line.strainGrp) add(g, line.strainGrp[g] * w);
      var c = E.expCutWeight(line, cur);
      if (c > 0) for (var h in line.cutGrp) add(h, line.cutGrp[h] * c);
    });
    return out;
  };

  /* ---------------------------------------------------------
     Wirkung der Kompetenzverteilung
     --------------------------------------------------------- */
  E.competenceEffects = function (st) {
    var out = {};
    G.COMPETENCES.forEach(function (c) {
      var lvl = st.competences[c.k];
      var e = c.eff && c.eff[lvl];
      if (!e) return;
      for (var k in e) out[k] = (out[k] || 0) + e[k] * 0.55;
    });
    var f = G.TRANSFER_FORMULAS.filter(function (x) { return x.k === st.transferFormula; })[0];
    if (f && f.eff) for (var k2 in f.eff) out[k2] = (out[k2] || 0) + f.eff[k2];
    return out;
  };

  /* ---------------------------------------------------------
     Indikatoren neu berechnen (Bestandsgrößen)
     --------------------------------------------------------- */
  /* Abnehmende Erträge auf Indexskalen von 0 bis 100.
     Zehn Maßnahmen im selben Feld bringen nicht das Zehnfache der ersten:
     Verwaltung, Personal und Aufmerksamkeit sind begrenzt. Ohne diese
     Dämpfung ließe sich etwa der Korruptionsindex auf 100 treiben. */
  var SAT_FROM = 22, SAT_SLOPE = 0.5;
  function saturate(x) {
    if (x > SAT_FROM) return SAT_FROM + (x - SAT_FROM) * SAT_SLOPE;
    if (x < -SAT_FROM) return -SAT_FROM + (x + SAT_FROM) * SAT_SLOPE;
    return x;
  }

  E.recomputeIndex = function (st) {
    var be = E.budgetEffects(st);
    var ce = E.competenceEffects(st);
    st._be = be; st._ce = ce;

    M.INDICATORS.forEach(function (meta) {
      var k = meta.k;
      if (FLOW[k]) return;
      var shift = (st.mods[k] || 0) + (st.drift[k] || 0) + (be[k] || 0) + (ce[k] || 0);
      /* Nur auf den 0-bis-100-Indizes dämpfen, nicht auf Prozentwerten,
         Devisenreserven oder Wechselkursen. */
      if (meta.fmt === 'idx' && meta.min === 0 && meta.max === 100) shift = saturate(shift);
      st.ind[k] = U.clamp((B.INDICATORS[k] || 0) + shift, meta.min, meta.max);
    });
  };

  /* ---------------------------------------------------------
     Modifikatoren anwenden
     --------------------------------------------------------- */
  E.applyMods = function (st, eff, scale) {
    if (!eff) return;
    scale = (scale === undefined) ? 1 : scale;
    for (var k in eff) {
      var v = eff[k] * scale;
      if (!isFinite(v)) continue;
      if (k === 'debtGdpOneOff') { st.debt += st.gdpN * v / 100; continue; }
      if (!M.IND_BY_KEY[k]) continue;           /* unbekannte Schlüssel ignorieren */
      st.mods[k] = (st.mods[k] || 0) + v;
    }
  };

  E.applyGroups = function (st, grp, scale) {
    if (!grp) return;
    scale = (scale === undefined) ? 1 : scale;
    for (var k in grp) {
      if (!M.GROUP_BY_KEY[k]) continue;
      st.approval[k] = U.clamp((st.approval[k] || 50) + grp[k] * scale, 0, 100);
    }
  };

  /* ---------------------------------------------------------
     Maßnahmen: Prüfung, Beschluss, Rücknahme
     --------------------------------------------------------- */
  E.status = function (st, p) {
    if (st.enacted[p.id]) {
      var rec = st.enacted[p.id];
      return rec.active ? 'enacted' : 'pending';
    }
    return 'open';
  };

  E.canEnact = function (st, p) {
    if (st.enacted[p.id]) return { ok: false, why: 'Bereits beschlossen.' };
    if (st.gameOver) return { ok: false, why: 'Amtszeit beendet.' };

    var need = M.NEEDS[p.need] || M.NEEDS.simple;
    var seatsNeeded = need.seats;
    if (p.need === 'exec' && st.presidentialPower < 60) seatsNeeded = 113;
    if (seatsNeeded > 0 && st.seatsGov < seatsNeeded) {
      return { ok: false, why: 'Keine Mehrheit: ' + st.seatsGov + ' von ' + seatsNeeded + ' benötigten Sitzen.' };
    }
    var cost = E.pcCost(st, p);
    if (st.pc < cost) return { ok: false, why: 'Politisches Kapital reicht nicht (' + Math.round(cost) + ' nötig).' };

    if (p.excl) {
      for (var i = 0; i < p.excl.length; i++) {
        if (st.enacted[p.excl[i]]) {
          var other = E.byId(p.excl[i]);
          return { ok: false, why: 'Unvereinbar mit „' + (other ? other.title : p.excl[i]) + '“.' };
        }
      }
    }
    if (p.req) {
      for (var j = 0; j < p.req.length; j++) {
        if (!st.enacted[p.req[j]]) {
          var r = E.byId(p.req[j]);
          return { ok: false, why: 'Setzt voraus: „' + (r ? r.title : p.req[j]) + '“.' };
        }
      }
    }
    return { ok: true };
  };

  E.pcCost = function (st, p) {
    var f = 1;
    if (st.presidentialPower < 100) f += (100 - st.presidentialPower) / 110;
    if (st.approvalOverall < 40) f += (40 - st.approvalOverall) / 90;
    f *= SL.data.risks.costMul(st, p);   /* offene strukturelle Hindernisse verteuern */
    return Math.round((p.pc || 0) * f);
  };

  /* Anteil der Wirkung, der bei offenen Hindernissen tatsächlich ankommt.
     Ein Umsetzungsstab im Präsidialamt und eine Vorrangentscheidung für
     die Voraussetzungen holen einen Teil der verlorenen Wirkung zurück. */
  E.riskFactor = function (st, p) {
    var f = SL.data.risks.factor(st, p);
    if (f >= 1) return f;
    if (st.flags.deliveryUnit) f += (1 - f) * 0.22;
    if (st.flags.riskPriority) f += (1 - f) * 0.18;
    return Math.min(1, f);
  };

  /* Zustimmung zu einer Volksabstimmung schätzen */
  E.referendumSupport = function (st, p) {
    var yes = 0, tot = 0;
    M.GROUPS.forEach(function (g) {
      if (!g.w) return;
      var lean = (p.grp && p.grp[g.k]) ? p.grp[g.k] : 0;
      var v = st.approval[g.k] + lean * 1.5;
      yes += g.w * v; tot += g.w;
    });
    var base = yes / tot;
    base -= (st.ind.sinhalaPress - 46) * 0.25;
    return U.clamp(base, 2, 98);
  };

  E.enact = function (st, p) {
    var chk = E.canEnact(st, p);
    if (!chk.ok) return { ok: false, why: chk.why };

    var cost = E.pcCost(st, p);
    st.pc -= cost;

    /* Volksabstimmung */
    if (p.need === 'referendum') {
      var support = E.referendumSupport(st, p);
      var roll = E.rand(st) * 100;
      if (roll > support) {
        st.approvalOverall -= 3;
        M.GROUPS.forEach(function (g) { st.approval[g.k] = U.clamp(st.approval[g.k] - 2.5, 0, 100); });
        st.mods.legitimacy = (st.mods.legitimacy || 0) - 5;
        St.log(st, 'bad', 'Volksabstimmung über „' + p.title + '“ gescheitert: ' +
          U.n0(support) + ' % geschätzte Zustimmung, das Ergebnis fiel dagegen aus.');
        return { ok: false, why: 'Die Volksabstimmung ist gescheitert.', referendum: { passed: false, support: support } };
      }
      St.log(st, 'good', 'Volksabstimmung über „' + p.title + '“ angenommen (' + U.n0(support) + ' % Zustimmung).');
    }

    var lag = Math.max(1, p.lag || 1);
    st.enacted[p.id] = { turn: st.turn, active: false, lag: lag, left: lag, applied: 0 };
    if (p.oneoff) st.oneoffQueue = (st.oneoffQueue || 0) + p.oneoff;

    /* Sofortige Sonderwirkungen */
    E.special(st, p);

    E.recordDecisionFinance(st, {
      sourceId: p.id, sourceType: 'policy', title: p.title,
      recurringRev: p.fiscal && p.fiscal.rev, recurringExp: p.fiscal && p.fiscal.exp,
      oneoffExp: p.oneoff || 0, active: true
    });

    E.queueConsequence(st, {
      kind: 'policy', sourceId: p.id, sourceTitle: p.title,
      decision: 'Maßnahme beschlossen', category: p.cat || '',
      dueTurn: st.turn + Math.max(1, Math.min(3, lag))
    });

    St.log(st, 'info', 'Beschlossen: ' + p.title + ' (' + (M.NEEDS[p.need] || M.NEEDS.simple).label + ', ' + cost + ' PK).');
    return { ok: true, cost: cost };
  };

  E.repeal = function (st, id) {
    var rec = st.enacted[id];
    if (!rec) return false;
    var p = E.byId(id);
    var done = (typeof rec.applied === 'number') ? rec.applied : (rec.lag - rec.left) / rec.lag;
    if (p) {
      E.applyMods(st, p.eff, -done);
      E.applyGroups(st, p.grp, -done * 0.6);
      E.reverseSpecial(st, p);
    }
    delete st.enacted[id];
    st.repealed[id] = st.turn;
    (st.decisionFinance || []).forEach(function (entry) {
      if (entry.sourceType === 'policy' && entry.sourceId === id && entry.active) entry.active = false;
    });
    st.pc -= Math.round((p ? p.pc : 10) * 0.4);
    St.log(st, 'warn', 'Zurückgenommen: ' + (p ? p.title : id) + '.');
    return true;
  };

  /* Besondere Wirkungen einzelner Maßnahmen */
  E.special = function (st, p) {
    switch (p.special) {
      case 'presidential_power_down':
        st.presidentialPower = 45;
        St.log(st, 'warn', 'Die Exekutivgewalt des Präsidenten ist beschnitten. Jede weitere Maßnahme kostet mehr politisches Kapital.');
        break;
      case 'presidential_power_up':
        st.presidentialPower = 135;
        st.streetPressure += 12;
        break;
      case 'anti_defection':
        st.flags.antiDefection = true;
        break;
      case 'constitution_process':
        st.flags.constitution = true;
        break;
      case 'pc_elections':
        st.flags.pcElections = true;
        st.eventQueue.push('ev_pc_election_result');
        break;
      case 'devolution_referendum':
        st.flags.devolutionReferendum = true;
        break;
      case 'term_limit_removed':
        st.flags.termLimitRemoved = true;
        st.termLimit = null;
        St.log(st, 'warn', 'Die Begrenzung auf zwei Amtszeiten ist aufgehoben. Künftige Wiederkandidaturen sind unbegrenzt möglich.');
        break;
      case 'term_limit_two':
        st.flags.termLimitRemoved = false;
        st.termLimit = 2;
        break;
    }
  };

  E.reverseSpecial = function (st, p) {
    switch (p.special) {
      case 'term_limit_removed':
        st.flags.termLimitRemoved = false;
        st.termLimit = 2;
        St.log(st, 'warn', 'Die Begrenzung auf zwei Amtszeiten gilt wieder.');
        break;
      case 'term_limit_two':
        /* Die Verfassungsgrundlage bleibt ohne Gegenreform bei zwei Perioden. */
        st.termLimit = st.flags.termLimitRemoved ? null : 2;
        break;
    }
  };

  /* ---------------------------------------------------------
     Zufall
     --------------------------------------------------------- */
  E.rand = function (st) {
    st.seed = (st.seed * 1103515245 + 12345) & 0x7fffffff;
    return st.seed / 0x7fffffff;
  };

  /* ---------------------------------------------------------
     Zustimmung
     --------------------------------------------------------- */
  var SENS = {
    sinhalaRural: { inflation: -1.00, poverty: -0.80, socialProt: 0.45, agriProd: 0.35, foodSec: 0.35, infra: 0.25, growth: 0.55 },
    sinhalaUrban: { inflation: -0.80, growth: 0.80, privateSector: 0.45, infra: 0.35, corruption: 0.45, digitalGov: 0.25, unemp: -0.5 },
    sangha: { sinhalaPress: -0.85, religFree: -0.25, internalSec: 0.30, legitimacy: 0.25 },
    tamilNE: { trustTamil: 1.30, reconcile: 0.55, langAccess: 0.35, regionalBalance: 0.25, poverty: -0.30 },
    malaiyaha: { trustHill: 1.30, casteEquity: 0.45, poverty: -0.55, housing: 0.40, health: 0.20 },
    muslim: { trustMuslim: 1.30, religFree: 0.55, internalSec: 0.30, ruleOfLaw: 0.25 },
    christian: { religFree: 0.85, ruleOfLaw: 0.50, internalSec: 0.30, legitimacy: 0.25 },
    youth: { youthUnemp: -0.85, brainDrain: -0.45, corruption: 0.65, pressFree: 0.40, education: 0.30, digitalGov: 0.25 },
    publicSector: { inflation: -0.70, stateCap: 0.30, legitimacy: 0.20 },
    business: { privateSector: 0.85, corruption: 0.45, energyRel: 0.40, ruleOfLaw: 0.40, growth: 0.55 },
    farmers: { agriProd: 0.85, foodSec: 0.40, inflation: -0.45, climateRes: 0.30, poverty: -0.35 },
    unions: { inflation: -0.85, socialProt: 0.50, unemp: -0.55, pressFree: 0.25 },
    military: { militaryMor: 1.20, militaryCap: 0.40, veteran: 0.40, internalSec: 0.25 },
    diaspora: { diaspora: 1.10, reconcile: 0.50, trustTamil: 0.40, pressFree: 0.25 },
    intl: { imfCompl: 1.10, corruption: 0.45, debtGdp: -0.40, relWest: 0.20, privateSector: 0.25 }
  };

  E.updateApproval = function (st) {
    var bge = E.budgetGroupEffects(st);
    M.GROUPS.forEach(function (g) {
      var s = SENS[g.k] || {};
      var delta = 0;
      for (var k in s) {
        var base = B.INDICATORS[k];
        if (base === undefined) continue;
        delta += s[k] * (st.ind[k] - base);
      }
      delta *= 0.045;                                    /* Dämpfung je Quartal */
      delta += (bge[g.k] || 0) * 0.018;                  /* Haushaltsentscheidungen */
      delta += (50 - st.approval[g.k]) * 0.012;          /* schwache Rückkehr zur Mitte */
      delta -= 0.38;                                     /* Amtsmüdigkeit: Regierungen nutzen sich ab */
      st.approval[g.k] = U.clamp(st.approval[g.k] + delta, 2, 98);
    });

    var num = 0, den = 0;
    M.GROUPS.forEach(function (g) { if (!g.w) return; num += g.w * st.approval[g.k]; den += g.w; });
    st.approvalOverall = num / den;
  };

  E.updateStreet = function (st) {
    var i = st.ind;
    var target = 24
      + 1.7 * (i.inflation - 6.5)
      + 0.9 * (i.poverty - 23.8)
      + 0.55 * (i.youthUnemp - 18.7)
      + 0.62 * (50 - st.approvalOverall)
      - 0.30 * (i.socialProt - 44)
      - 0.22 * (i.legitimacy - 48)
      + 0.25 * (i.sinhalaPress - 46)
      + E.budgetStreetStrain(st);
    target = U.clamp(target, 6, 100);
    /* Wut baut sich schnell auf und nur langsam ab */
    var speed = target > st.streetPressure ? 0.45 : 0.16;
    st.streetPressure = U.clamp(st.streetPressure + (target - st.streetPressure) * speed, 0, 100);
  };

  /* ---------------------------------------------------------
     Ein Quartal weiterrechnen
     --------------------------------------------------------- */
  E.nextTurn = function (st) {
    if (st.gameOver) return { gameOver: st.gameOver };
    var res = { messages: [], outcomes: [], event: null };
    /* Sammelt, was in diesem Quartal schiefgegangen ist. Daraus
       entstehen die offenen Missstände am Ende des Zuges. */
    var ctx = {};
    st._sbImfPassed = st.imf.reviewsPassed;

    /* 1. Umsetzungsfortschritt beschlossener Maßnahmen */
    for (var id in st.enacted) {
      var rec = st.enacted[id];
      if (rec.active) continue;
      var p = E.byId(id);
      if (!p) { rec.active = true; continue; }
      /* Offene strukturelle Hindernisse lassen nur einen Teil der Wirkung durch.
         Wer sie zwischendurch beseitigt, holt den Rest ab dem nächsten Quartal. */
      var rf = E.riskFactor(st, p);
      E.applyMods(st, p.eff, rf / rec.lag);
      E.applyGroups(st, p.grp, 0.6 / rec.lag);
      rec.applied = (rec.applied || 0) + rf / rec.lag;
      rec.left--;
      if (rec.left <= 0) {
        rec.active = true;
        var open = SL.data.risks.openFor(st, p);
        if (open.length) {
          St.log(st, 'warn', 'Umgesetzt, aber wirkungsarm: ' + p.title + '. Es fehlt weiterhin die Voraussetzung: '
            + open.map(function (r) { return r.short; }).join(', ') + '.');
        } else {
          St.log(st, 'good', 'Vollständig umgesetzt: ' + p.title + '.');
        }
      }
    }

    /* 1b. Beseitigte Hindernisse melden */
    st.riskSolved = st.riskSolved || {};
    SL.data.risks.RISKS.forEach(function (r) {
      var now = SL.data.risks.solved(st, r.k);
      if (now && !st.riskSolved[r.k]) {
        st.riskSolved[r.k] = true;
        var freed = E.all().filter(function (q) {
          return (q.risks || []).indexOf(r.k) >= 0 && st.enacted[q.id];
        }).length;
        St.log(st, 'good', 'Hindernis beseitigt: ' + r.label + '.'
          + (freed ? ' ' + freed + ' bereits beschlossene Maßnahmen wirken ab jetzt stärker.' : ''));
        res.messages.push({ kind: 'good', title: 'Hindernis beseitigt', text: r.label + '.' });
      } else if (!now) {
        st.riskSolved[r.k] = false;
      }
    });

    /* 2. Natürliche Entwicklung ohne Zutun, dazu der laufende Schaden
          aus allem, was ungelöst offen liegt */
    E.naturalDrift(st);
    E.setbackDrift(st);

    /* 3. Bestandsindikatoren */
    E.recomputeIndex(st);

    /* 4. Haushalt und Schuldendynamik */
    var bud = E.budget(st);
    var oneoff = st.oneoffQueue || 0; st.oneoffQueue = 0;
    var balanceQ = bud.balance / 4 - oneoff;

    /* 5. Wachstum */
    var capexPct = (st.budget.exp.capital + st.budget.exp.ditwah) * E.scale(st) / st.gdpN * 100;
    var i = st.ind;
    var g = 2.6
      + 0.20 * (capexPct - 2.03)
      + 0.38 * (i.fdi - 1.3)
      + 0.028 * (i.privateSector - 38)
      + 0.018 * (i.stateCap - 41)
      + 0.014 * (i.corruption - 35)
      + 0.013 * (i.infra - 44)
      + 0.012 * (i.skillsMatch - 31)
      + 0.010 * (i.energyRel - 52)
      + 0.009 * (i.education - 55)
      + 0.008 * (i.agriProd - 38)
      + 0.018 * (i.femaleLFP - 31.4)
      + 0.013 * (i.regionalBalance - 30)
      - 0.055 * Math.max(0, i.inflation - 8)
      - 0.035 * Math.max(0, i.debtGdp - 100)
      - 0.045 * Math.max(0, st.streetPressure - 45)
      - 0.030 * Math.max(0, i.brainDrain - 68)
      - (st.imf.programActive ? 0 : 0.9)
      + (st.mods.growth || 0)
      + (st.shockGrowth || 0);
    /* Abnehmende Erträge: über 4,5 % wird jeder weitere Punkt teuer erkauft */
    if (g > 4.5) g = 4.5 + (g - 4.5) * 0.42;
    st.shockGrowth = (st.shockGrowth || 0) * 0.5;
    i.growth = U.clamp(i.growth + (g - i.growth) * 0.5, -9, 9);

    /* 6. Wechselkurs und Reserven */
    var trancheThisTurn = st._tranche || 0; st._tranche = 0;
    var dRes = 0.25 * (
      0.35 * (i.exports - 13.6)
      + 0.50 * (i.remittances - 7.4)
      + 0.80 * (i.tourism - 2.6)
      + 0.90 * (i.fdi - 1.3)
      - 0.15 * Math.max(0, i.growth - 3)
    ) + 0.05 + trancheThisTurn + (st.mods.reserves || 0) * 0.12
      - (st.imf.programActive ? 0 : 0.32);
    i.reserves = U.clamp(i.reserves + dRes, 0, 20);

    var dFx = Math.max(0, (5.5 - i.reserves)) * 3.2
      + (i.inflation - 3) * 0.55
      - (i.fdi - 1.3) * 2.0
      + (st.mods.fx || 0) * 0.1;
    dFx = U.clamp(dFx, -12, 45);
    i.fx = U.clamp(i.fx + dFx, 150, 900);

    /* 7. Inflation */
    var deficitPct = -bud.balancePct;
    var infl = 3.5
      + 0.40 * deficitPct
      + 0.09 * (dFx / i.fx * 400)
      - 0.025 * (i.agriProd - 38)
      - 0.018 * (i.foodSec - 52)
      + (st.mods.inflation || 0)
      + (st.shockInfl || 0);
    st.shockInfl = (st.shockInfl || 0) * 0.5;
    i.inflation = U.clamp(i.inflation + (infl - i.inflation) * 0.5, -3, 60);

    /* 8. Schulden */
    st.debt += -balanceQ;
    st.debt += st.foreignDebtShare * st.debt * (dFx / i.fx);
    st.gdpN *= (1 + (i.growth + i.inflation) / 400);
    i.debtGdp = U.clamp(st.debt / st.gdpN * 100, 20, 200);

    /* 9. Arbeitsmarkt und Armut */
    var unempT = 4.1 - 0.25 * (i.growth - 3) - 0.018 * (i.privateSector - 38)
      - 0.010 * (i.skillsMatch - 31) + (st.mods.unemp || 0);
    i.unemp = U.clamp(i.unemp + (unempT - i.unemp) * 0.3, 1, 20);

    var yT = 18.7 + 3.2 * (i.unemp - 4.1) - 0.11 * (i.skillsMatch - 31)
      - 0.06 * (i.education - 55) + (st.mods.youthUnemp || 0);
    i.youthUnemp = U.clamp(i.youthUnemp + (yT - i.youthUnemp) * 0.3, 3, 48);

    st.prosperity = (st.prosperity || 100) * (1 + (i.growth - 0.6) / 400);
    var povT = 23.8
      - 0.32 * (st.prosperity - 100)
      - 0.070 * (i.socialProt - 44)
      + 0.40 * (i.inflation - 6.5)
      + 0.60 * (i.unemp - 4.1)
      + (st.mods.poverty || 0);
    i.poverty = U.clamp(i.poverty + (povT - i.poverty) * 0.26, 2, 60);

    /* 10. Gesellschaft */
    E.updateApproval(st);
    E.updateStreet(st);
    St.recomputeProvinces(st);

    /* 11. Politisches Kapital */
    var gain = 12 + (st.approvalOverall - 50) * 0.35 + (st.seatsGov - 113) * 0.06;
    gain *= (st.presidentialPower / 100);
    gain -= Math.max(0, st.streetPressure - 60) * 0.12;
    st.pc = U.clamp(st.pc + Math.max(2, gain), 0, 220);

    /* 12. Fraktionsdisziplin */
    E.checkDefections(st, res, ctx);

    /* 13. Zeit weiterschalten */
    var n = U.nextQ(st.year, st.q);
    st.year = n.year; st.q = n.q; st.turn++;

    /* 14. IWF-Überprüfung */
    E.imfReview(st, bud, res, ctx);

    /* 14b. Sichtbare Folgen, Ressortleistung und Sitzbewegungen */
    E.processConsequences(st, res);
    E.processGovernance(st, res);
    E.processParliament(st, res);
    E.recomputeIndex(st);

    /* 15. Krisen und Spielende */
    E.checkCrisis(st, res);

    /* 15b. Was in diesem Quartal schiefgelaufen ist, wird als offener
            Missstand vermerkt. Zu jedem gibt es Gegenmaßnahmen. */
    if (!st.gameOver) E.scanSetbacks(st, res, ctx);

    St.snapshot(st);

    /* 16. Ereignis auswählen */
    if (!st.gameOver && !res.election) st.pendingEvent = E.pickEvent(st);
    res.event = st.pendingEvent;
    return res;
  };

  /* ---------------------------------------------------------
     Natürliche Entwicklung
     --------------------------------------------------------- */
  E.naturalDrift = function (st) {
    var d = st.drift;
    var add = function (k, v) { d[k] = (d[k] || 0) + v; };

    /* Ohne Gegensteuern verschlechtern sich einige Bereiche */
    add('infra', -0.45);
    add('soeHealth', -0.40);
    add('brainDrain', st.ind.youthUnemp > 15 ? 0.55 : -0.25);
    add('climateRes', -0.30);
    add('forest', -0.05);
    add('malnutrition', st.ind.poverty > 22 ? 0.30 : -0.30);
    add('stateCap', -0.18);          /* Verwaltung verliert ohne Pflege an Substanz */
    add('corruption', -0.16);        /* Netzwerke bilden sich immer neu */
    add('legitimacy', -0.22);
    add('skillsMatch', -0.12);
    add('agriProd', -0.12);

    /* Nationalistischer Druck baut sich ab, wenn nichts passiert */
    var sp = (st.mods.sinhalaPress || 0);
    if (sp > 0) st.mods.sinhalaPress = sp * 0.94;

    /* Vertrauen erodiert, wenn keine sichtbaren Fortschritte kommen */
    if (!st.flags.pcElections) add('trustTamil', -0.18);
    if (st.streetPressure > 60) add('legitimacy', -0.5);
    if (st.approvalOverall > 55) add('legitimacy', 0.25);
  };

  /* ---------------------------------------------------------
     Fraktionsdisziplin
     --------------------------------------------------------- */
  E.checkDefections = function (st, res, ctx) {
    if (st.flags.antiDefection) return;
    var risk = 0;
    if (st.approvalOverall < 42) risk += (42 - st.approvalOverall) * 0.9;
    if (st.ind.sinhalaPress > 62) risk += (st.ind.sinhalaPress - 62) * 0.8;
    if (st.streetPressure > 65) risk += (st.streetPressure - 65) * 0.5;
    /* Durchgesetzte Fraktionsdisziplin hält die Hinterbänke zusammen */
    if (st.flags.partyDiscipline) risk *= 0.45;
    if (risk <= 0) return;
    if (E.rand(st) * 100 < risk) {
      var lost = 1 + Math.floor(E.rand(st) * 5);
      lost = -E.shiftSeats(st, -lost, 'Übertritte wegen mangelnder Fraktionsdisziplin');
      if (ctx) ctx.defected = true;
      St.log(st, 'bad', lost + ' Abgeordnete verlassen die Regierungsfraktion. Mehrheit jetzt ' + st.seatsGov + ' von 225.');
      res.messages.push({ kind: 'bad', title: 'Fraktion', text: lost + ' Abgeordnete sind übergelaufen.' });
    }
  };

  /* ---------------------------------------------------------
     IWF-Überprüfung
     --------------------------------------------------------- */
  E.imfReview = function (st, bud, res, ctx) {
    if (!st.imf.programActive) {
      /* Ohne Programm bricht auch die übrige Geberfinanzierung weg */
      st.drift.imfCompl = (st.drift.imfCompl || 0) - 1.0;
      return;
    }
    if (st.turn < st.imf.nextReviewTurn) return;
    st.imf.nextReviewTurn = st.turn + 2;

    var target = E.primaryTarget(st);
    var okPrimary = bud.primaryPct >= target - 0.45;
    var okRevenue = bud.revPct >= B.IMF.revenueFloor - 0.6;
    var okCompliance = st.ind.imfCompl >= 45;

    if (okPrimary && okRevenue && okCompliance) {
      st.imf.reviewsPassed++;
      st._tranche = B.IMF.trancheSize;
      st.mods.imfCompl = (st.mods.imfCompl || 0) + 3;
      St.log(st, 'good', 'IWF-Überprüfung bestanden. Tranche von ' + U.n2(B.IMF.trancheSize) + ' Mrd. USD freigegeben.');
      res.messages.push({ kind: 'good', title: 'IWF', text: 'Überprüfung bestanden, Tranche freigegeben.' });
    } else {
      st.imf.reviewsFailed++;
      if (ctx) ctx.imfFailed = true;
      st.mods.imfCompl = (st.mods.imfCompl || 0) - 12;
      st.mods.fdi = (st.mods.fdi || 0) - 0.12;
      var why = [];
      if (!okPrimary) why.push('Primärsaldo ' + U.n1(bud.primaryPct) + ' % statt ' + U.n1(target) + ' %');
      if (!okRevenue) why.push('Einnahmen ' + U.n1(bud.revPct) + ' % statt ' + U.n1(B.IMF.revenueFloor) + ' %');
      if (!okCompliance) why.push('Programmtreue unzureichend');
      St.log(st, 'bad', 'IWF-Überprüfung nicht bestanden: ' + why.join(', ') + '.');
      res.messages.push({ kind: 'bad', title: 'IWF', text: 'Überprüfung gescheitert: ' + why.join(', ') + '.' });
      if (st.imf.reviewsFailed >= 3 && st.imf.programActive) {
        st.imf.programActive = false;
        if (ctx) ctx.imfSuspended = true;
        st.mods.imfCompl = (st.mods.imfCompl || 0) - 25;
        st.mods.fdi = (st.mods.fdi || 0) - 0.5;
        st.mods.privateSector = (st.mods.privateSector || 0) - 8;
        st.shockGrowth = (st.shockGrowth || 0) - 2.2;
        st.effRate += 0.02;
        st.ind.reserves = Math.max(0, st.ind.reserves - 0.9);
        St.log(st, 'bad', 'Das IWF-Programm ist ausgesetzt. Weltbank, Asiatische Entwicklungsbank und bilaterale Geber frieren Auszahlungen ein, die Refinanzierungskosten steigen.');
        res.messages.push({ kind: 'bad', title: 'Programm ausgesetzt', text: 'Der IWF stoppt das Programm. Andere Geber ziehen nach.' });
      }
    }
  };

  /* ---------------------------------------------------------
     Krisen und Spielende
     --------------------------------------------------------- */
  E.checkCrisis = function (st, res) {
    var i = st.ind;

    if (i.reserves < 0.8) {
      st.gameOver = { kind: 'default', title: 'Zahlungsunfähigkeit',
        text: 'Die Devisenreserven sind aufgebraucht. Treibstoff, Medikamente und Gas können nicht mehr importiert werden. Sri Lanka steht erneut dort, wo es 2022 stand.' };
      return;
    }
    if (st.streetPressure > 88) {
      st.crisisCount++;
      if (st.crisisCount >= 2) {
        st.gameOver = { kind: 'uprising', title: 'Rücktritt unter dem Druck der Straße',
          text: 'Hunderttausende umstellen das Präsidialsekretariat. Wie 2022 wird der Amtssitz besetzt. Sie treten zurück.' };
        return;
      }
      St.log(st, 'bad', 'Die Lage auf der Straße ist außer Kontrolle. Ein weiteres Quartal wie dieses überstehen Sie nicht.');
      res.messages.push({ kind: 'bad', title: 'Warnung', text: 'Massenproteste eskalieren. Letzte Warnung.' });
    } else if (st.streetPressure < 70) {
      st.crisisCount = 0;
    }
    if (st.seatsGov < 90 && st.approvalOverall < 32) {
      st.gameOver = { kind: 'impeach', title: 'Amtsenthebung',
        text: 'Ohne parlamentarische Basis und ohne Rückhalt in der Bevölkerung setzt das Parlament ein Amtsenthebungsverfahren in Gang. Es endet erfolgreich.' };
      return;
    }
    /* Ende der aktuellen Amtszeit */
    var endYear = st.termEndYear || B.META.termEndYear;
    var endQuarter = st.termEndQuarter || B.META.termEndQuarter;
    if (st.year > endYear || (st.year === endYear && st.q > endQuarter)) {
      res.election = E.election(st);
    }
  };

  /* ---------------------------------------------------------
     Parlament, Entscheidungsketten und Regierungsapparat
     --------------------------------------------------------- */
  var CATEGORY_MINISTRY = {
    'budget': 'finance', 'economy': 'finance', 'digital': 'finance',
    'health': 'health', 'education': 'education', 'social': 'social', 'agri': 'agriculture',
    'transport': 'transport', 'energy': 'energy', 'justice': 'justice', 'state': 'justice',
    'identity': 'justice', 'climate': 'climate', 'foreign': 'foreign', 'devolution': 'justice',
    'Finanzen': 'finance', 'Wirtschaft': 'finance', 'Steuern': 'finance', 'Haushalt': 'finance',
    'Gesundheit': 'health', 'Bildung': 'education', 'Arbeit': 'social', 'Soziales': 'social',
    'Landwirtschaft': 'agriculture', 'Infrastruktur': 'transport', 'Verkehr': 'transport',
    'Energie': 'energy', 'Justiz': 'justice', 'Staat': 'justice', 'Verfassung': 'justice',
    'Umwelt': 'climate', 'Klima': 'climate', 'Katastrophe': 'climate',
    'Außenpolitik': 'foreign', 'Diplomatie': 'foreign'
  };

  function ministryKey(category) {
    var cat = String(category || '');
    for (var label in CATEGORY_MINISTRY) if (cat.indexOf(label) >= 0) return CATEGORY_MINISTRY[label];
    return 'finance';
  }

  function effectSummary(eff) {
    var out = [];
    for (var k in (eff || {})) {
      if (!eff[k]) continue;
      out.push({ k: k, v: eff[k] });
    }
    return out;
  }

  function financeParts(rev, exp) {
    rev = Number(rev) || 0; exp = Number(exp) || 0;
    return {
      plus: Math.max(0, rev) + Math.max(0, -exp),
      minus: Math.max(0, -rev) + Math.max(0, exp)
    };
  }

  E.recordDecisionFinance = function (st, item) {
    var recurring = financeParts(item.recurringRev, item.recurringExp);
    var once = financeParts(item.oneoffRev, item.oneoffExp);
    if (!recurring.plus && !recurring.minus && !once.plus && !once.minus) return null;
    st.decisionFinance = st.decisionFinance || [];
    var entry = {
      id: 'df_' + st.turn + '_' + st.decisionFinance.length + '_' + Math.floor(E.rand(st) * 100000),
      sourceId: item.sourceId, sourceType: item.sourceType,
      title: item.title, decision: item.decision || '', turn: st.turn,
      year: st.year, q: st.q, recurringPlus: recurring.plus, recurringMinus: recurring.minus,
      oneoffPlus: once.plus, oneoffMinus: once.minus, active: item.active !== false
    };
    st.decisionFinance.push(entry);
    return entry;
  };

  E.decisionFinanceSummary = function (st) {
    var scale = E.scale(st), recurringPlus = 0, recurringMinus = 0, oneoffPlus = 0, oneoffMinus = 0;
    (st.decisionFinance || []).forEach(function (entry) {
      if (entry.active !== false) {
        recurringPlus += (entry.recurringPlus || 0) * scale;
        recurringMinus += (entry.recurringMinus || 0) * scale;
      }
      oneoffPlus += entry.oneoffPlus || 0;
      oneoffMinus += entry.oneoffMinus || 0;
    });
    return {
      recurring: { plus: recurringPlus, minus: recurringMinus, total: recurringPlus - recurringMinus },
      oneoff: { plus: oneoffPlus, minus: oneoffMinus, total: oneoffPlus - oneoffMinus }
    };
  };

  E.queueConsequence = function (st, item) {
    st.consequenceQueue = st.consequenceQueue || [];
    item.id = item.id || ('cq_' + st.turn + '_' + st.consequenceQueue.length + '_' + Math.floor(E.rand(st) * 100000));
    st.consequenceQueue.push(item);
    return item;
  };

  E.shiftSeats = function (st, delta, reason) {
    if (!st.parliament || !st.parliament.seats) return 0;
    var parties = st.parliament.seats;
    var gov = parties.NPP;
    if (gov === undefined) return 0;
    var total = st.seatsTotal || 225;
    var wanted = Math.round(delta || 0), moved = 0, k, pickKey;
    if (wanted > 0) {
      while (moved < wanted && parties.NPP < total) {
        pickKey = null;
        for (k in parties) if (k !== 'NPP' && parties[k] > 0 && (!pickKey || parties[k] > parties[pickKey])) pickKey = k;
        if (!pickKey) break;
        parties[pickKey]--; parties.NPP++; moved++;
      }
    } else if (wanted < 0) {
      while (moved > wanted && parties.NPP > 0) {
        pickKey = parties.SJB !== undefined ? 'SJB' : 'OTH';
        if (parties[pickKey] === undefined) break;
        parties.NPP--; parties[pickKey]++; moved--;
      }
    }
    st.seatsGov = parties.NPP;
    st.parliament.history = st.parliament.history || [];
    if (moved) {
      st.parliament.history.unshift({ turn: st.turn, delta: moved, reason: reason || 'Sitzverschiebung', seats: st.seatsGov });
      st.parliament.history = st.parliament.history.slice(0, 24);
    }
    return moved;
  };

  E.canCourtSeats = function (st) {
    if (!st.parliament) return { ok: false, why: 'Keine Parlamentsdaten verfügbar.' };
    if (st.parliament.lastWhipTurn === st.turn) return { ok: false, why: 'In diesem Quartal wurden bereits Fraktionsgespräche geführt.' };
    if (st.seatsGov >= (st.seatsTotal || 225)) return { ok: false, why: 'Alle Sitze gehören bereits zur Regierungsfraktion.' };
    if (st.pc < 14) return { ok: false, why: 'Dafür werden 14 PK benötigt.' };
    return { ok: true };
  };

  E.courtSeats = function (st) {
    var can = E.canCourtSeats(st);
    if (!can.ok) return can;
    st.pc -= 14;
    st.parliament.lastWhipTurn = st.turn;
    var chance = U.clamp(0.24 + st.approvalOverall / 240 + st.ind.legitimacy / 500 - st.streetPressure / 600, 0.12, 0.78);
    if (E.rand(st) < chance) {
      var gained = E.shiftSeats(st, 1 + Math.floor(E.rand(st) * 4), 'Erfolgreiche Fraktionsgespräche');
      st.mods.legitimacy = (st.mods.legitimacy || 0) + 0.5;
      St.log(st, 'good', 'Fraktionsgespräche erfolgreich: ' + gained + ' Abgeordnete schließen sich der Regierung an.');
      return { ok: true, success: true, seats: gained, chance: chance };
    }
    st.mods.legitimacy = (st.mods.legitimacy || 0) - 0.8;
    St.log(st, 'warn', 'Die Fraktionsgespräche bleiben ohne Ergebnis.');
    return { ok: true, success: false, seats: 0, chance: chance };
  };

  E.canDismissMinister = function (st, key) {
    var c = st.cabinet && st.cabinet[key];
    if (!c) return { ok: false, why: 'Dieses Regierungsmitglied ist nicht im Kabinett.' };
    if (!(c.scandal || c.failures >= 2 || c.performance < 38)) return { ok: false, why: 'Für eine Entlassung liegt derzeit kein Leistungs- oder Integritätsgrund vor.' };
    if (st.pc < 6) return { ok: false, why: 'Für die Kabinettsumbildung werden 6 PK benötigt.' };
    return { ok: true };
  };

  E.dismissMinister = function (st, key) {
    var can = E.canDismissMinister(st, key);
    if (!can.ok) return can;
    var def = Gov.MINISTRY_BY_KEY[key], c = st.cabinet[key];
    var old = c.name, generation = (c.generation || 0) + 1;
    var replacements = (def && def.replacements) || [];
    c.name = replacements.length ? replacements[(generation - 1) % replacements.length] : 'Neubesetzung';
    c.generation = generation; c.performance = 52; c.successes = 0; c.failures = 0;
    c.scandal = null; c.appointedTurn = st.turn; c.lastOutcomeTurn = st.turn;
    st.pc -= 6;
    st.mods.legitimacy = (st.mods.legitimacy || 0) + 1.2;
    St.log(st, 'info', old + ' wird entlassen. ' + c.name + ' übernimmt ' + (def ? def.ministry : 'das Ressort') + '.');
    return { ok: true, oldName: old, newName: c.name };
  };

  function addGovernanceHistory(st, out) {
    st.governanceHistory = st.governanceHistory || [];
    st.governanceHistory.unshift(out);
    st.governanceHistory = st.governanceHistory.slice(0, 60);
  }

  E.processConsequences = function (st, res) {
    var keep = [];
    (st.consequenceQueue || []).forEach(function (item) {
      if (item.dueTurn > st.turn) { keep.push(item); return; }
      var def = Gov.MINISTRY_BY_KEY[ministryKey(item.category)], cab = def && st.cabinet && st.cabinet[def.k];
      var p = item.kind === 'policy' ? E.byId(item.sourceId) : null;
      var rf = p ? E.riskFactor(st, p) : 0.75;
      var chance = U.clamp(0.28 + rf * 0.35 + (st.ind.stateCap || 40) / 350 + (cab ? cab.performance : 50) / 500, 0.22, 0.9);
      var success = E.rand(st) < chance;
      var eff = success ? { stateCap: 0.6, legitimacy: 0.7 } : { stateCap: -0.9, legitimacy: -1.0 };
      if (p && p.eff) E.applyMods(st, p.eff, success ? 0.08 : -0.05);
      E.applyMods(st, eff, 1);
      if (cab) {
        cab.performance = U.clamp(cab.performance + (success ? 3 : -5), 0, 100);
        if (success) cab.successes++; else cab.failures++;
        cab.lastOutcomeTurn = st.turn;
      }
      var open = p ? SL.data.risks.openFor(st, p) : [];
      var outcome = {
        kind: success ? 'good' : 'bad', type: 'consequence', turn: st.turn,
        title: success ? 'Entscheidung zahlt sich aus' : 'Folgerisiko eingetreten',
        source: item.sourceTitle, actor: def ? def.ministry : '',
        text: success
          ? 'Die Entscheidung „' + item.sourceTitle + '“ zeigt im Verwaltungsalltag zusätzliche Wirkung.'
          : 'Bei „' + item.sourceTitle + '“ treten Umsetzungsprobleme auf' + (open.length ? ': ' + open.map(function (r) { return r.short; }).join(', ') : '.') ,
        effects: effectSummary(eff)
      };
      res.outcomes.push(outcome); addGovernanceHistory(st, outcome);
      St.log(st, success ? 'good' : 'bad', outcome.title + ': ' + outcome.text);
    });
    st.consequenceQueue = keep;
  };

  E.processGovernance = function (st, res) {
    if (!Gov.MINISTRIES.length) return;
    var useMinister = E.rand(st) < 0.7;
    var def, actor, success, eff, chance, scandal = false;
    if (useMinister) {
      def = Gov.MINISTRIES[Math.floor(E.rand(st) * Gov.MINISTRIES.length)];
      actor = st.cabinet[def.k];
      chance = U.clamp(0.2 + actor.performance / 140 + st.ind.stateCap / 500, 0.2, 0.86);
      success = E.rand(st) < chance;
      eff = success ? def.successEff : def.failEff;
      E.applyMods(st, eff, 1);
      actor.performance = U.clamp(actor.performance + (success ? 4 : -7), 0, 100);
      if (success) actor.successes++; else actor.failures++;
      actor.lastOutcomeTurn = st.turn;
      if (!success && E.rand(st) < U.clamp(0.08 + (45 - st.ind.corruption) / 180, 0.06, 0.28)) {
        scandal = true;
        actor.scandal = { turn: st.turn, title: 'Vergabe- und Aufsichtsskandal', text: 'Interne Unterlagen werfen Fragen zu Aufsicht und Vergabe im Ressort auf.' };
        actor.performance = U.clamp(actor.performance - 8, 0, 100);
        E.applyMods(st, { legitimacy: -1.8, corruption: -1.2 }, 1);
      }
    } else {
      def = Gov.INSTITUTIONS[Math.floor(E.rand(st) * Gov.INSTITUTIONS.length)];
      actor = st.institutions[def.k];
      chance = U.clamp(0.25 + actor.performance / 150 + st.ind.stateCap / 550, 0.22, 0.85);
      success = E.rand(st) < chance;
      eff = success ? def.successEff : def.failEff;
      E.applyMods(st, eff, 1);
      actor.performance = U.clamp(actor.performance + (success ? 3 : -6), 0, 100);
      if (success) actor.successes++; else actor.failures++;
      actor.lastOutcomeTurn = st.turn;
    }
    var label = def.ministry || def.name;
    var outcome = {
      kind: success ? 'good' : 'bad', type: useMinister ? 'ministry' : 'institution', turn: st.turn,
      title: scandal ? 'Skandal im ' + label : (success ? 'Erfolg: ' : 'Versagen: ') + label,
      source: useMinister ? actor.name : def.name, actor: label,
      text: scandal ? actor.scandal.text + ' Sie können das verantwortliche Kabinettsmitglied direkt entlassen.' : (success ? def.success : def.failure),
      effects: effectSummary(eff), ministerKey: useMinister ? def.k : null, scandal: scandal
    };
    res.outcomes.push(outcome); addGovernanceHistory(st, outcome);
    St.log(st, success ? 'good' : 'bad', outcome.title + ': ' + outcome.text);
  };

  E.processParliament = function (st, res) {
    var delta = 0, why = '';
    if (st.approvalOverall >= 58 && st.ind.legitimacy >= 52 && E.rand(st) < 0.22) {
      delta = 1 + Math.floor(E.rand(st) * 2); why = 'Übertritt nach sichtbaren Regierungserfolgen';
    } else if (st.approvalOverall < 38 && E.rand(st) < 0.28) {
      delta = -(1 + Math.floor(E.rand(st) * 3)); why = 'Abspaltung nach Vertrauensverlust';
    }
    delta = E.shiftSeats(st, delta, why);
    if (delta) res.outcomes.push({ kind: delta > 0 ? 'good' : 'bad', type: 'parliament', title: 'Sitzverteilung verändert', source: 'Parlament', actor: 'Regierungsfraktion', text: (delta > 0 ? delta + ' Abgeordnete wechseln zur Regierungsfraktion.' : (-delta) + ' Abgeordnete verlassen die Regierungsfraktion.'), seats: delta, effects: [] });
  };

  /* ---------------------------------------------------------
     Wahl am Ende der Amtszeit
     --------------------------------------------------------- */
  E.election = function (st) {
    st.termNumber = st.termNumber || 1;
    st.electionHistory = st.electionHistory || [];
    if (st.termLimit === undefined) st.termLimit = 2;
    var electionYear = st.termEndYear || st.year;

    if (st.termLimit !== null && st.termNumber >= st.termLimit) {
      var limited = {
        eligible: false, won: false, kind: 'term-limited',
        title: 'Amtszeitlimit erreicht', term: st.termNumber,
        text: 'Nach ' + st.termNumber + ' Amtszeiten dürfen Sie nicht erneut kandidieren. ' +
          'Die Amtszeit endet. Für eine weitere Kandidatur hätte die Begrenzung vorher aufgehoben werden müssen.'
      };
      st.electionHistory.push({
        year: electionYear, term: st.termNumber, eligible: false, won: false, vote: null
      });
      st.gameOver = limited;
      st.lastElection = limited;
      return limited;
    }

    var share = 0, tot = 0;
    M.GROUPS.forEach(function (g) {
      if (!g.w) return;
      share += g.w * st.approval[g.k]; tot += g.w;
    });
    var vote = share / tot;
    vote += (st.ind.growth - 3) * 1.2
      - (st.ind.inflation - 6.5) * 0.6
      - st.streetPressure * 0.08
      - 2.5
      - Math.min(8, Math.max(0, st.termNumber - 1) * 1.25); /* Langzeitmalus bleibt überwindbar */
    vote = U.clamp(vote, 5, 95);
    var won = vote >= 50;
    var nextTerm = st.termNumber + 1;
    var result = {
      eligible: true, won: won,
      kind: won ? 'reelected' : 'defeated',
      title: won ? 'Wiedergewählt' : 'Abgewählt', vote: vote,
      term: st.termNumber, wonTerm: won ? nextTerm : null,
      text: won
        ? 'Sie gewinnen die Präsidentschaftswahl mit geschätzten ' + U.n1(vote) +
          ' % und beginnen Ihre ' + nextTerm + '. Amtszeit.'
        : 'Sie verlieren die Präsidentschaftswahl mit geschätzten ' + U.n1(vote) + ' %. Ihre Regierungszeit endet.'
    };
    st.electionHistory.push({
      year: electionYear, term: st.termNumber, wonTerm: won ? nextTerm : null,
      eligible: true, won: won, vote: vote
    });
    st.lastElection = result;

    if (!won) {
      st.gameOver = result;
      return result;
    }

    st.termNumber = nextTerm;
    st.electionsWon = (st.electionsWon || 0) + 1;
    st.termStartYear = st.year;
    st.termStartQuarter = st.q;
    /* Eine volle Amtszeit umfasst 20 Quartale einschließlich des Startquartals. */
    var endIndex = st.year * 4 + (st.q - 1) + 19;
    st.termEndYear = Math.floor(endIndex / 4);
    st.termEndQuarter = (endIndex % 4) + 1;
    st.gameOver = null;
    st.pendingEvent = null;
    st.crisisCount = 0;
    st.pc = U.clamp(st.pc + 28, 0, 220);
    st.streetPressure = U.clamp(st.streetPressure * 0.72, 0, 100);
    st.mods.legitimacy = (st.mods.legitimacy || 0) + 3;
    var bump = U.clamp(2 + (vote - 50) * 0.18, 2, 6);
    M.GROUPS.forEach(function (g) {
      st.approval[g.k] = U.clamp(st.approval[g.k] + bump, 0, 100);
    });
    St.log(st, 'good', 'Präsidentschaftswahl gewonnen: ' + U.n1(vote) + ' %. Beginn der ' +
      st.termNumber + '. Amtszeit; nächste reguläre Wahl ' + st.termEndYear + '.');
    return result;
  };

  /* ---------------------------------------------------------
     RÜCKSCHLÄGE UND GEGENMASSNAHMEN

     Ein schlecht gelaufenes Quartal hinterlässt einen offenen
     Missstand statt nur einer Zeile im Protokoll. Solange er offen
     ist, richtet er weiter Schaden an. Der Spieler kann ihn mit
     einer von mehreren Sofortmaßnahmen beheben; die wirken ohne
     Umsetzungsfrist, kosten politisches Kapital und haben Folgen.
     --------------------------------------------------------- */

  /* Wie viele beschlossene Maßnahmen laufen wegen offener
     struktureller Hindernisse ins Leere? */
  E.countBlockedReforms = function (st) {
    var n = 0;
    for (var id in st.enacted) {
      if (!st.enacted[id].active) continue;
      var p = E.byId(id);
      if (!p) continue;
      if (SL.data.risks.openFor(st, p).length && E.riskFactor(st, p) < 0.7) n++;
    }
    return n;
  };

  /* Missstand unmittelbar öffnen, etwa als Folge einer
     Entscheidung in einem Ereignis. */
  E.openSetback = function (st, key) {
    var catalog = SL.data.setbacks;
    var meta = catalog && catalog.BY_KEY && catalog.BY_KEY[key];
    if (!meta || !st.setbacks || st.setbacks[key]) return false;
    st.setbacks[key] = { since: st.turn, sev: meta.sev || 2 };
    st.setbackSeen[key] = (st.setbackSeen[key] || 0) + 1;
    St.log(st, 'bad', meta.label + ': ' + meta.desc);
    return true;
  };

  E.openSetbacks = function (st) {
    var out = [], catalog = SL.data.setbacks;
    if (!catalog || !catalog.BY_KEY) return out;
    for (var k in (st.setbacks || {})) {
      var meta = catalog.BY_KEY[k];
      if (meta) out.push({ meta: meta, rec: st.setbacks[k] });
    }
    out.sort(function (a, b) { return (b.meta.sev - a.meta.sev) || (a.rec.since - b.rec.since); });
    return out;
  };

  /* Neue Missstände erkennen, erledigte streichen */
  E.scanSetbacks = function (st, res, ctx) {
    var catalog = SL.data.setbacks;
    if (!catalog || !Array.isArray(catalog.SETBACKS)) return;
    st.setbacks = st.setbacks || {};
    st.setbackSeen = st.setbackSeen || {};
    ctx = ctx || {};
    ctx.blockedReforms = E.countBlockedReforms(st);

    catalog.SETBACKS.forEach(function (s) {
      var open = !!st.setbacks[s.k];
      if (open) {
        /* Erledigt sich der Missstand von selbst? */
        var done = false;
        try { done = s.gone ? !!s.gone(st, ctx) : false; } catch (e) { done = false; }
        if (done) {
          delete st.setbacks[s.k];
          St.log(st, 'good', 'Behoben: ' + s.label + '.');
          res && res.messages.push({ kind: 'good', title: 'Missstand behoben', text: s.label + '.' });
        }
        return;
      }
      var hit = false;
      try { hit = s.when ? !!s.when(st, ctx) : false; } catch (e) { hit = false; }
      if (!hit) return;
      st.setbacks[s.k] = { since: st.turn, sev: s.sev || 2 };
      st.setbackSeen[s.k] = (st.setbackSeen[s.k] || 0) + 1;
      St.log(st, 'bad', s.label + ': ' + s.desc);
      res && res.messages.push({ kind: 'bad', title: s.label, text: 'Gegenmaßnahmen stehen unter „Sofortmaßnahmen“ bereit.' });
    });
  };

  /* Laufender Schaden aus offenen Missständen */
  E.setbackDrift = function (st) {
    E.openSetbacks(st).forEach(function (o) {
      if (!o.meta.drift) return;
      for (var k in o.meta.drift) {
        if (k === 'growth') { st.shockGrowth = (st.shockGrowth || 0) + o.meta.drift[k]; continue; }
        st.drift[k] = (st.drift[k] || 0) + o.meta.drift[k];
      }
    });
  };

  E.remedyKey = function (k, idx) { return k + ':' + idx; };

  E.remedyUsed = function (st, k, idx) {
    return !!(st.remediesUsed && st.remediesUsed[E.remedyKey(k, idx)]);
  };

  E.canRemedy = function (st, k, idx) {
    var catalog = SL.data.setbacks;
    var meta = catalog && catalog.BY_KEY && catalog.BY_KEY[k];
    if (!meta) return { ok: false, why: 'Unbekannter Missstand.' };
    if (!st.setbacks[k]) return { ok: false, why: 'Der Missstand besteht nicht mehr.' };
    var fix = meta.fix[idx];
    if (!fix) return { ok: false, why: 'Unbekannte Gegenmaßnahme.' };
    if (st.gameOver) return { ok: false, why: 'Amtszeit beendet.' };
    if (fix.once && E.remedyUsed(st, k, idx)) return { ok: false, why: 'Dieses Mittel steht nur einmal je Amtszeit zur Verfügung.' };
    if (st.pc < fix.pc) return { ok: false, why: 'Politisches Kapital reicht nicht (' + fix.pc + ' nötig).' };
    return { ok: true };
  };

  /* Gegenmaßnahme ergreifen. Wirkt sofort, ohne Umsetzungsfrist. */
  E.applyRemedy = function (st, k, idx) {
    var chk = E.canRemedy(st, k, idx);
    if (!chk.ok) return { ok: false, why: chk.why };
    var meta = SL.data.setbacks.BY_KEY[k], fix = meta.fix[idx];

    st.pc -= fix.pc;
    st.remediesUsed[E.remedyKey(k, idx)] = st.turn;

    /* Manche Mittel können scheitern. Dann bleibt der Missstand offen. */
    var failed = false;
    if (fix.chance !== undefined && E.rand(st) > fix.chance) failed = true;

    if (failed) {
      E.applyMods(st, fix.failEff, 1);
      E.recomputeIndex(st);
      St.log(st, 'bad', 'Gescheitert: ' + fix.t + '. ' + (fix.failNote || ''));
      return { ok: true, failed: true, note: fix.failNote || 'Die Maßnahme ist gescheitert.' };
    }

    E.applyMods(st, fix.eff, 1);
    E.applyGroups(st, fix.grp, 1);
    if (fix.fiscal) {
      /* Einmalige Haushaltswirkung im laufenden Quartal */
      if (fix.fiscal.exp) st.oneoffQueue = (st.oneoffQueue || 0) + fix.fiscal.exp;
      if (fix.fiscal.rev) st.oneoffQueue = (st.oneoffQueue || 0) - fix.fiscal.rev;
    }
    if (fix.budget) E.shiftBudget(st, fix.budget);
    E.remedySpecial(st, fix, k);
    E.recomputeIndex(st);
    E.updateApproval(st);

    /* Der Missstand gilt als behoben, sofern die Lage das hergibt. */
    delete st.setbacks[k];
    St.log(st, 'good', 'Sofortmaßnahme: ' + fix.t + ' (' + fix.pc + ' PK).');
    return { ok: true, failed: false };
  };

  /* Dauerhafte Verschiebung der Haushaltsregler.
     Eine Konsolidierung, die nur ein Quartal hält, ist keine.
     Der Spieler sieht die verschobenen Regler anschließend im
     Haushaltsplan und kann sie dort wieder anfassen.
       revScale / expScale  Faktor auf alle steuerbaren Posten
       lines                Faktor auf einzelne Posten
     Die Grenzen der Regler werden dabei eingehalten. */
  E.shiftBudget = function (st, spec) {
    var moved = [];
    function apply(line, store, factor) {
      if (!line || line.locked || !factor || factor === 1) return;
      var before = store[line.k];
      var v = U.clamp(before * factor, line.min, line.max);
      if (Math.abs(v - before) < 0.5) return;
      store[line.k] = v;
      moved.push(line.label + ' ' + U.sign((v - before) / line.base * 100, 0) + ' %');
    }
    B.REVENUE.forEach(function (r) {
      apply(r, st.budget.rev, (spec.lines && spec.lines[r.k]) || spec.revScale);
    });
    B.SPENDING.forEach(function (e) {
      apply(e, st.budget.exp, (spec.lines && spec.lines[e.k]) || spec.expScale);
    });
    if (moved.length) {
      St.log(st, 'info', 'Haushaltsposten angepasst: ' + moved.slice(0, 6).join(', ')
        + (moved.length > 6 ? ' und ' + (moved.length - 6) + ' weitere' : '') + '.');
    }
    return moved;
  };

  E.remedySpecial = function (st, fix, setbackKey) {
    switch (fix.special) {
      case 'calm_street':
        st.streetPressure = Math.max(0, st.streetPressure - 24); break;
      case 'calm_street_soft':
        st.streetPressure = Math.max(0, st.streetPressure - 12); break;
      case 'crackdown':
        st.streetPressure = Math.max(0, st.streetPressure - 32);
        st.drift.pressFree = (st.drift.pressFree || 0) - 5;
        st.flags.crackdown = true;
        break;
      case 'regain_seats':
        E.shiftSeats(st, 3 + Math.floor(E.rand(st) * 5), 'Sofortmaßnahme zur Stabilisierung der Fraktion');
        St.log(st, 'info', 'Die Fraktion zählt wieder ' + st.seatsGov + ' von 225 Abgeordneten.');
        break;
      case 'hold_seats':
        st.flags.partyDiscipline = true; break;
      case 'snap_election': {
        /* Die Machtfrage: das Ergebnis folgt der Zustimmung. */
        var swing = (st.approvalOverall - 46) * 1.6 + (E.rand(st) - 0.5) * 14;
        var seats = Math.round(U.clamp(113 + swing, 55, 200));
        var before = st.seatsGov;
        E.shiftSeats(st, seats - before, 'Vorgezogene Parlamentswahl');
        st.pc = U.clamp(st.pc + (seats > before ? 18 : -8), 0, 220);
        St.log(st, seats > before ? 'good' : 'bad',
          'Vorgezogene Parlamentswahl: die Regierungsfraktion kommt auf ' + seats + ' von 225 Sitzen (vorher ' + before + ').');
        break;
      }
      case 'approval_boost':
        M.GROUPS.forEach(function (g) { st.approval[g.k] = U.clamp(st.approval[g.k] + 3.5, 0, 100); });
        break;
      case 'imf_restart':
        st.imf.programActive = true;
        st.imf.reviewsFailed = 0;
        st.imf.nextReviewTurn = st.turn + 3;
        st.effRate = Math.max(0.06, st.effRate - 0.015);
        St.log(st, 'good', 'Ein neues Programm mit dem Währungsfonds steht. Die Geber nehmen ihre Auszahlungen wieder auf.');
        break;
      case 'lower_rate':
        st.effRate = Math.max(0.055, st.effRate - 0.008);
        st.flags.debtOffice = true;
        break;
      case 'trim_revenue':
        B.REVENUE.forEach(function (r) {
          if (!r.base || r.locked) return;
          var cap = r.base * 1.25;
          if (st.budget.rev[r.k] > cap) st.budget.rev[r.k] = cap;
        });
        St.log(st, 'info', 'Die überdehnten Sätze sind auf höchstens 25 % über dem Ausgangswert zurückgenommen.');
        break;
      case 'restore_spending':
        B.SPENDING.forEach(function (e) {
          if (!e.base || e.locked) return;
          var floor = e.base * 0.85;
          if (st.budget.exp[e.k] < floor) st.budget.exp[e.k] = floor;
        });
        St.log(st, 'info', 'Die Kürzungen sind auf höchstens 15 % unter dem Ausgangswert zurückgenommen.');
        break;
      case 'shift_cuts': {
        /* Der Sparbetrag bleibt, aber er wandert von der
           Grundversorgung in Verwaltung und Fuhrpark. */
        var freed = 0;
        ['health', 'education', 'social', 'provinces'].forEach(function (k) {
          var line = B.SPENDING.filter(function (x) { return x.k === k; })[0];
          if (!line) return;
          var floor = line.base * 0.85;
          if (st.budget.exp[k] < floor) { freed += floor - st.budget.exp[k]; st.budget.exp[k] = floor; }
        });
        var take = freed;
        ['ministries', 'defence'].forEach(function (k) {
          var line = B.SPENDING.filter(function (x) { return x.k === k; })[0];
          if (!line || take <= 0) return;
          var room = Math.max(0, st.budget.exp[k] - line.min);
          var cut = Math.min(room, take);
          st.budget.exp[k] -= cut; take -= cut;
        });
        St.log(st, 'info', 'Rund ' + U.n0(freed - take) + ' Mrd. sind aus Verwaltung und Verteidigung in die Grundversorgung umgeschichtet.');
        break;
      }
      case 'delivery_unit':
        st.flags.deliveryUnit = true;
        break;
      case 'risk_progress':
        st.flags.riskPriority = true;
        break;
    }
  };

  /* ---------------------------------------------------------
     Ereignisauswahl
     --------------------------------------------------------- */
  E.pickEvent = function (st) {
    var EV = SL.data.events.EVENTS;

    if (st.eventQueue && st.eventQueue.length) {
      var qid = st.eventQueue.shift();
      var qe = SL.data.events.BY_ID[qid];
      if (qe) return qe;
    }

    var pool = [];
    EV.forEach(function (e) {
      if (e.hidden) return;
      if (e.minQ && st.turn < e.minQ) return;
      var seen = st.eventSeen[e.id];
      if (seen !== undefined) {
        if (!e.repeatAfter) return;
        if (st.turn - seen < e.repeatAfter) return;
      }
      if (e.cond && !e.cond(st)) return;
      var w = e.weight || 3;
      for (var n = 0; n < w; n++) pool.push(e);
    });
    if (!pool.length) return null;
    if (E.rand(st) < 0.18) return null;                  /* manche Quartale bleiben ruhig */
    var pick = pool[Math.floor(E.rand(st) * pool.length)];
    st.eventSeen[pick.id] = st.turn;
    return pick;
  };

  E.resolveEvent = function (st, ev, optIndex) {
    var o = ev.options[optIndex];
    if (!o) return;
    E.applyMods(st, o.eff, 1);
    E.applyGroups(st, o.grp, 1);
    if (o.fiscal) {
      if (o.fiscal.rev) st.oneoffQueue = (st.oneoffQueue || 0) - o.fiscal.rev;
      if (o.fiscal.exp) st.oneoffQueue = (st.oneoffQueue || 0) + o.fiscal.exp;
    }
    if (o.pc) st.pc = U.clamp(st.pc + o.pc, 0, 220);

    E.recordDecisionFinance(st, {
      sourceId: ev.id, sourceType: 'event', title: ev.title, decision: o.t,
      oneoffRev: o.fiscal && o.fiscal.rev, oneoffExp: o.fiscal && o.fiscal.exp,
      active: false
    });

    switch (o.special) {
      case 'calm_street': st.streetPressure = Math.max(0, st.streetPressure - 22); break;
      case 'calm_street_soft': st.streetPressure = Math.max(0, st.streetPressure - 10); break;
      case 'crackdown': st.streetPressure = Math.max(0, st.streetPressure - 30); st.drift.pressFree = (st.drift.pressFree || 0) - 4; break;
      case 'keep_seats': break;
      case 'lose_seats': E.shiftSeats(st, -(4 + Math.floor(E.rand(st) * 7)), 'Folge der Entscheidung „' + o.t + '“'); break;
      case 'lose_seats_half': E.shiftSeats(st, -(2 + Math.floor(E.rand(st) * 4)), 'Folge der Entscheidung „' + o.t + '“'); break;
      case 'gain_seats':
        E.shiftSeats(st, 4 + Math.floor(E.rand(st) * 5), 'Folge der Entscheidung „' + o.t + '“');
        St.log(st, 'info', 'Die Regierungsfraktion zählt jetzt ' + st.seatsGov + ' von 225 Abgeordneten.');
        break;
      case 'coalition_rift': E.openSetback(st, 'coalition_rift'); break;
      case 'warn_only': st.shockGrowth = (st.shockGrowth || 0) - 0.6; st.drift.housing = (st.drift.housing || 0) - 5; break;
      /* Rechtzeitige Evakuierung: der Sturm kommt trotzdem, aber er
         kostet weniger. Und eine Verwaltung, die es einmal geübt hat,
         kann es beim nächsten Mal wieder. */
      case 'evacuate':
        st.drift.disasterPrep = (st.drift.disasterPrep || 0) + 4;
        st.drift.housing = (st.drift.housing || 0) + 2;
        st.shockGrowth = (st.shockGrowth || 0) + 0.35;
        St.log(st, 'good', 'Die Vorsorgeevakuierung hat gegriffen. Die Schäden bleiben deutlich unter dem, was ohne sie zu erwarten war.');
        break;
    }
    E.recomputeIndex(st);
    E.queueConsequence(st, {
      kind: 'event', sourceId: ev.id, sourceTitle: ev.title,
      decision: o.t, category: ev.cat || '', dueTurn: st.turn + 1
    });
    St.log(st, 'info', ev.title + ' – Entscheidung: ' + o.t);
    st.pendingEvent = null;
  };

  /* ---------------------------------------------------------
     Bewertung am Ende
     --------------------------------------------------------- */
  E.evaluate = function (st) {
    var i = st.ind;
    var parts = [
      { k: 'Wirtschaft', v: score(i.growth, 0, 7) * 0.4 + score(100 - i.debtGdp, -20, 45) * 0.35 + score(i.privateSector, 20, 80) * 0.25 },
      { k: 'Lebensstandard', v: score(35 - i.poverty, 0, 28) * 0.5 + score(20 - i.inflation, 5, 19) * 0.25 + score(i.socialProt, 20, 85) * 0.25 },
      { k: 'Arbeit & Zukunft', v: score(35 - i.youthUnemp, 0, 28) * 0.45 + score(i.skillsMatch, 15, 80) * 0.3 + score(100 - i.brainDrain, 20, 80) * 0.25 },
      { k: 'Staat & Recht', v: score(i.corruption, 20, 70) * 0.4 + score(i.stateCap, 20, 80) * 0.3 + score(i.ruleOfLaw, 20, 80) * 0.3 },
      { k: 'Zusammenhalt', v: score(i.reconcile, 10, 80) * 0.4 + score(i.trustTamil, 10, 80) * 0.25 + score(i.trustMuslim, 15, 80) * 0.175 + score(i.trustHill, 15, 80) * 0.175 },
      { k: 'Klima & Vorsorge', v: score(i.climateRes, 10, 80) * 0.4 + score(i.disasterPrep, 15, 85) * 0.3 + score(i.renewables, 25, 85) * 0.3 },
      { k: 'Region & Ausgleich', v: score(i.regionalBalance, 15, 80) * 0.6 + score(60 - i.inequality, 0, 30) * 0.4 }
    ];
    var total = parts.reduce(function (a, p) { return a + p.v; }, 0) / parts.length;
    return { parts: parts, total: total, grade: grade(total) };

    function score(v, lo, hi) { return U.clamp((v - lo) / (hi - lo) * 100, 0, 100); }
    function grade(t) {
      if (t >= 82) return { g: 'A', c: 'var(--green)', t: 'Historische Amtszeit' };
      if (t >= 70) return { g: 'B', c: 'var(--cy)', t: 'Deutlich besser hinterlassen als vorgefunden' };
      if (t >= 56) return { g: 'C', c: 'var(--amber)', t: 'Stabilisiert, aber nicht verwandelt' };
      if (t >= 42) return { g: 'D', c: 'var(--orange)', t: 'Verwaltet statt gestaltet' };
      return { g: 'E', c: 'var(--red)', t: 'Das Land steht schlechter da als zuvor' };
    }
  };

})(SL.engine = SL.engine || {});
