/* ============================================================
   ZUSTAND  -  Aufbau, Speichern, Laden
   ============================================================ */
(function (S) {
  'use strict';

  var U = SL.util, B = SL.data.baseline, G = SL.data.geo, M = SL.model;
  var Gov = SL.data.governance || { MINISTRIES: [], INSTITUTIONS: [] };
  var SAVE_KEY = 'lk_president_sim_v1';
  var SAVE_META_KEY = SAVE_KEY + '_meta';
  var SLOTS_KEY = 'lk_president_sim_slots_v2';
  var ACTIVE_SLOT_KEY = SLOTS_KEY + '_active';
  var activeSlotId = null, activeSlotName = null;
  var isLocalHost = location.protocol === 'http:' &&
    (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
  var isTailscaleHost = location.protocol === 'https:' &&
    /\.ts\.net$/i.test(location.hostname);

  function tailscaleBackendFromQuery() {
    try {
      var requested = new URLSearchParams(location.search || '').get('backend');
      if (!requested) return '';
      var parsed = new URL(requested);
      var cleanPath = parsed.pathname.replace(/\/$/, '');
      if (parsed.protocol !== 'https:' || !/\.ts\.net$/i.test(parsed.hostname) || cleanPath !== '/api') {
        return '';
      }
      return parsed.origin + '/api';
    } catch (e) { return ''; }
  }

  var API_ROOT = String(window.ORACLE_BACKEND_URL || tailscaleBackendFromQuery() ||
    ((isLocalHost || isTailscaleHost) ? location.origin + '/api' :
      'http://127.0.0.1:8765/api')).replace(/\/$/, '');
  var isRemoteTailscaleApi = !isTailscaleHost &&
    /^https:\/\/[^/]+\.ts\.net\/api$/i.test(API_ROOT);

  function defaultParliament(govSeats) {
    var seats = {};
    (SL.data.parties.PARTIES || []).forEach(function (p) { seats[p.k] = p.seats || 0; });
    var baselineGov = seats.NPP || B.META.seatsGov;
    var target = U.clamp(govSeats === undefined ? baselineGov : govSeats, 0, B.META.seatsTotal);
    var delta = target - baselineGov;
    seats.NPP = target;
    if (delta > 0) {
      ['SJB', 'NDF', 'SLPP', 'ITAK', 'SLMC', 'CWC', 'SB', 'TNPF', 'OTH'].forEach(function (k) {
        var take = Math.min(seats[k] || 0, delta);
        seats[k] = (seats[k] || 0) - take;
        delta -= take;
      });
    } else if (delta < 0) {
      seats.SJB = (seats.SJB || 0) - delta;
    }
    return {
      seats: seats, lastWhipTurn: -1, history: [],
      coalition: { partners: [], formedTurn: null }
    };
  }

  function defaultLocalAuthority() {
    return { fundingWeight: 1, staffing: 'normal', priority: 'balanced' };
  }

  function defaultCabinet() {
    var cabinet = {};
    Gov.MINISTRIES.forEach(function (m, idx) {
      cabinet[m.k] = {
        name: m.name, performance: 48 + (idx * 7 % 17), successes: 0, failures: 0,
        scandal: null, generation: 0, appointedTurn: 0, lastOutcomeTurn: -99
      };
    });
    return cabinet;
  }

  function defaultInstitutions() {
    var institutions = {};
    Gov.INSTITUTIONS.forEach(function (i, idx) {
      institutions[i.k] = { performance: 48 + (idx * 9 % 19), successes: 0, failures: 0, lastOutcomeTurn: -99 };
    });
    return institutions;
  }

  function financialParts(rev, exp) {
    rev = Number(rev) || 0; exp = Number(exp) || 0;
    return {
      plus: Math.max(0, rev) + Math.max(0, -exp),
      minus: Math.max(0, -rev) + Math.max(0, exp)
    };
  }

  function migrateDecisionFinance(st) {
    if (Array.isArray(st.decisionFinance)) return;
    st.decisionFinance = [];
    var policies = SL.data.policies || [], byId = {};
    policies.forEach(function (p) { byId[p.id] = p; });
    var seen = {};
    function add(id, active) {
      if (seen[id]) return; seen[id] = true;
      var p = byId[id];
      if (!p || (!p.fiscal && !p.oneoff)) return;
      var recurring = financialParts(p.fiscal && p.fiscal.rev, p.fiscal && p.fiscal.exp);
      var once = financialParts(0, p.oneoff || 0);
      var rec = st.enacted && st.enacted[id];
      st.decisionFinance.push({
        id: 'migrated_' + id, sourceId: id, sourceType: 'policy', title: p.title,
        turn: rec ? rec.turn : (st.repealed && st.repealed[id]) || 0,
        recurringPlus: recurring.plus, recurringMinus: recurring.minus,
        oneoffPlus: once.plus, oneoffMinus: once.minus, active: active
      });
    }
    Object.keys(st.enacted || {}).forEach(function (id) { add(id, true); });
    Object.keys(st.repealed || {}).forEach(function (id) { add(id, false); });
  }

  S.create = function (opts) {
    opts = opts || {};
    var st = {
      version: 1,
      seed: opts.seed || (Date.now() % 2147483647),
      year: B.META.startYear,
      q: B.META.startQuarter,
      turn: 0,
      termNumber: 1,
      termStartYear: B.META.startYear,
      termStartQuarter: B.META.startQuarter,
      termEndYear: B.META.termEndYear,
      termEndQuarter: B.META.termEndQuarter,
      termLimit: 2,                  /* null = keine Begrenzung */
      electionsWon: 0,
      electionHistory: [],
      difficulty: opts.difficulty || 'normal',
      playerName: opts.playerName || B.META.president,

      pc: 90,                       /* politisches Kapital */
      presidentialPower: 100,       /* sinkt, wenn die Exekutivpräsidentschaft beschnitten wird */
      seatsGov: B.META.seatsGov,
      seatsTotal: B.META.seatsTotal,
      parliament: defaultParliament(B.META.seatsGov),
      cabinet: defaultCabinet(),
      institutions: defaultInstitutions(),
      consequenceQueue: [],
      governanceHistory: [],
      decisionFinance: [],
      setbacks: {},
      setbackSeen: {},
      remediesUsed: {},

      gdpN: B.META.gdpNominal,      /* nominales BIP in LKR Mrd. */
      debt: B.META.gdpNominal * B.INDICATORS.debtGdp / 100,
      foreignDebtShare: 0.48,
      effRate: 0.079,

      ind: U.deepCopy(B.INDICATORS),
      mods: {},                     /* dauerhafte Wirkungen von Maßnahmen und Ereignissen */
      drift: {},                    /* natürliche Entwicklung ohne Zutun */
      approval: U.deepCopy(B.APPROVAL),
      approvalOverall: 47,
      streetPressure: 24,
      prosperity: 100,              /* Index des Pro-Kopf-Einkommens */
      oneoffQueue: 0,
      shockGrowth: 0,
      shockInfl: 0,

      budget: { rev: {}, exp: {} },
      enacted: {},                  /* id -> { turn, active } */
      pending: [],                  /* [{ id, left }] */
      repealed: {},

      competences: {},
      transferFormula: 'status',

      provinces: {},
      log: [],
      history: [],
      flags: {},
      eventSeen: {},
      eventQueue: [],
      pendingEvent: null,

      imf: { programActive: true, reviewsPassed: 4, reviewsFailed: 0, nextReviewTurn: 2, quartersLeft: B.META.imfProgramQuartersLeft },
      gameOver: null,
      crisisCount: 0
    };

    B.REVENUE.forEach(function (r) { st.budget.rev[r.k] = r.base; });
    B.SPENDING.forEach(function (e) { st.budget.exp[e.k] = e.base; });

    G.COMPETENCES.forEach(function (c) { st.competences[c.k] = c.current; });

    G.PROVINCES.forEach(function (p) {
      st.provinces[p.k] = {
        dev: Math.round(28 + p.gdpShare * 0.8 - p.poverty * 0.5 + 30),
        trust: p.k === 'NP' ? 26 : (p.k === 'EP' ? 34 : (p.k === 'CP' || p.k === 'UV' ? 38 : 48)),
        unrest: p.k === 'NP' ? 42 : (p.k === 'EP' ? 38 : 26),
        funding: 0,
        localAuthority: defaultLocalAuthority()
      };
    });

    S.recomputeProvinces(st);
    S.snapshot(st);
    return st;
  };

  /* --- Momentaufnahme fuer Verlaufskurven --- */
  S.snapshot = function (st) {
    var snap = { t: st.turn, y: st.year, q: st.q };
    ['growth', 'inflation', 'debtGdp', 'poverty', 'unemp', 'youthUnemp', 'reserves',
      'corruption', 'reconcile', 'climateRes', 'brainDrain', 'privateSector'].forEach(function (k) {
      snap[k] = U.round(st.ind[k], 2);
    });
    snap.approval = U.round(st.approvalOverall, 1);
    snap.street = U.round(st.streetPressure, 1);
    st.history.push(snap);
    if (st.history.length > 60) st.history.shift();
  };

  /* --- Protokolleintrag --- */
  S.log = function (st, kind, text) {
    st.log.unshift({ t: U.qLabel(st.year, st.q), kind: kind, text: text });
    if (st.log.length > 220) st.log.pop();
  };

  /* --- Provinzwerte aus nationalen Indikatoren ableiten --- */
  S.recomputeProvinces = function (st) {
    var G2 = SL.data.geo, ind = st.ind;
    var formula = G2.TRANSFER_FORMULAS.filter(function (f) { return f.k === st.transferFormula; })[0] || G2.TRANSFER_FORMULAS[0];
    var totalTransfer = st.budget.exp.provinces || 0;

    /* Gewichte bestimmen */
    var weights = {}, sumW = 0;
    G2.PROVINCES.forEach(function (p) {
      var w;
      if (!formula.weights) {
        w = p.gdpShare * 0.6 + p.pop * 3;           /* Fortschreibung: bisherige Verteilung */
      } else {
        w = (formula.weights.pop || 0) * p.pop * 4
          + (formula.weights.poverty || 0) * (p.poverty / 10) * p.pop * 2.4
          + (formula.weights.gdp || 0) * p.gdpShare * 0.9;
      }
      var ps = st.provinces[p.k];
      var local = ps.localAuthority || (ps.localAuthority = defaultLocalAuthority());
      var fundingWeight = [0.85, 1, 1.15].indexOf(Number(local.fundingWeight)) >= 0 ? Number(local.fundingWeight) : 1;
      weights[p.k] = Math.max(0.1, w * fundingWeight);
      sumW += weights[p.k];
    });

    G2.PROVINCES.forEach(function (p) {
      var ps = st.provinces[p.k];
      var local = ps.localAuthority || (ps.localAuthority = defaultLocalAuthority());
      var staffingFactor = local.staffing === 'low' ? 0.9 : (local.staffing === 'strong' ? 1.1 : 1);
      var priority = local.priority || 'balanced';
      var share = weights[p.k] / sumW;
      ps.funding = totalTransfer * share;
      var perCapita = ps.funding / p.pop * staffingFactor; /* wirksam je Mio. Einwohner */
      var nationalPerCapita = totalTransfer / 22.2;

      var devTarget = 30
        + (ind.infra - 44) * 0.35
        + (ind.regionalBalanceProxy || 0)
        + (perCapita - nationalPerCapita) * 0.9
        - (p.poverty - 21) * 0.7
        + p.gdpShare * 0.45
        + (ind.growth - 3) * 1.2;
      if (priority === 'development') devTarget += 4;
      else if (priority === 'cohesion') devTarget -= 1;
      ps.dev = U.clamp(ps.dev + (devTarget - ps.dev) * 0.14 * staffingFactor, 0, 100);

      var trustTarget = 50;
      if (p.k === 'NP') trustTarget = ind.trustTamil;
      else if (p.k === 'EP') trustTarget = (ind.trustTamil * 0.42 + ind.trustMuslim * 0.42 + ind.legitimacy * 0.16);
      else if (p.k === 'CP' || p.k === 'UV') trustTarget = (ind.trustHill * 0.5 + ind.legitimacy * 0.5);
      else trustTarget = ind.legitimacy * 0.7 + (100 - ind.sinhalaPress) * 0.3;
      if (priority === 'development') trustTarget -= 1;
      else if (priority === 'cohesion') trustTarget += 4;
      else if (priority === 'stability') trustTarget -= 2;
      ps.trust = U.clamp(ps.trust + (trustTarget - ps.trust) * 0.2 * staffingFactor, 0, 100);

      var unrestTarget = U.clamp(
        st.streetPressure * 0.6 + (60 - ps.trust) * 0.5 + (p.poverty - 20) * 0.6 - ps.dev * 0.12, 0, 100);
      if (priority === 'cohesion') unrestTarget -= 3;
      else if (priority === 'stability') unrestTarget -= 4;
      ps.unrest = U.clamp(ps.unrest + (unrestTarget - ps.unrest) * 0.2 * staffingFactor, 0, 100);
    });
  };

  /* --- Speichern und Laden --- */
  function normalizeSave(st) {
    if (!st || st.version !== 1) return null;
    st.flags = st.flags || {};
    st.termNumber = st.termNumber || 1;
    st.termStartYear = st.termStartYear || B.META.startYear;
    st.termStartQuarter = st.termStartQuarter || B.META.startQuarter;
    st.termEndYear = st.termEndYear || B.META.termEndYear;
    st.termEndQuarter = st.termEndQuarter || B.META.termEndQuarter;
    if (st.termLimit === undefined) st.termLimit = st.flags.termLimitRemoved ? null : 2;
    st.electionsWon = st.electionsWon || Math.max(0, st.termNumber - 1);
    if (!Array.isArray(st.electionHistory)) st.electionHistory = [];
    st.parliament = st.parliament || defaultParliament(st.seatsGov);
    st.parliament.seats = st.parliament.seats || defaultParliament(st.seatsGov).seats;
    st.parliament.history = Array.isArray(st.parliament.history) ? st.parliament.history : [];
    if (st.parliament.lastWhipTurn === undefined) st.parliament.lastWhipTurn = -1;
    st.parliament.coalition = st.parliament.coalition || { partners: [], formedTurn: null };
    st.parliament.coalition.partners = Array.isArray(st.parliament.coalition.partners)
      ? st.parliament.coalition.partners.filter(function (k) {
        return k !== 'NPP' && k !== 'OTH' && st.parliament.seats[k] > 0;
      }) : [];
    if (st.parliament.coalition.formedTurn === undefined) st.parliament.coalition.formedTurn = null;
    st.seatsGov = st.parliament.seats.NPP === undefined ? st.seatsGov : st.parliament.seats.NPP;
    if (st.enacted && st.enacted.st_anti_defection) st.flags.antiDefection = true;

    st.provinces = st.provinces || {};
    G.PROVINCES.forEach(function (p) {
      if (!st.provinces[p.k]) return;
      st.provinces[p.k].localAuthority = Object.assign(defaultLocalAuthority(), st.provinces[p.k].localAuthority || {});
    });

    var cabinetDefaults = defaultCabinet();
    st.cabinet = st.cabinet || {};
    Object.keys(cabinetDefaults).forEach(function (k) {
      st.cabinet[k] = Object.assign(cabinetDefaults[k], st.cabinet[k] || {});
    });
    var institutionDefaults = defaultInstitutions();
    st.institutions = st.institutions || {};
    Object.keys(institutionDefaults).forEach(function (k) {
      st.institutions[k] = Object.assign(institutionDefaults[k], st.institutions[k] || {});
    });
    st.consequenceQueue = Array.isArray(st.consequenceQueue) ? st.consequenceQueue : [];
    st.governanceHistory = Array.isArray(st.governanceHistory) ? st.governanceHistory : [];
    st.setbacks = st.setbacks || {};
    st.setbackSeen = st.setbackSeen || {};
    st.remediesUsed = st.remediesUsed || {};
    migrateDecisionFinance(st);

    /* Spielstände aus der früheren Ein-Amtszeit-Version endeten trotz
       Wiederwahlsieg. Sie werden automatisch in die zweite Amtszeit migriert. */
    if (st.gameOver && st.gameOver.kind === 'reelected') {
      var oldElection = st.gameOver;
      st.termNumber = Math.max(2, st.termNumber);
      st.electionsWon = Math.max(1, st.electionsWon);
      st.termStartYear = st.year;
      st.termStartQuarter = st.q;
      st.termEndYear = st.year + 4;
      st.termEndQuarter = 4;
      st.electionHistory.push({
        year: B.META.termEndYear, term: 1, wonTerm: 2, eligible: true,
        won: true, vote: oldElection.vote
      });
      st.gameOver = null;
      st.log = st.log || [];
      st.log.unshift({
        t: U.qLabel(st.year, st.q), kind: 'good',
        text: 'Älterer Spielstand migriert: Die gewonnene Wiederwahl führt jetzt in die zweite Amtszeit.'
      });
    }
    /* Ereignisse enthalten Funktionen, die JSON nicht überlebt.
       Deshalb wird das offene Ereignis über seine Kennung neu verknüpft. */
    if (st.pendingEvent && st.pendingEvent.id) {
      st.pendingEvent = SL.data.events.BY_ID[st.pendingEvent.id] || null;
    }
    return st;
  }

  function isoNow() { return new Date().toISOString(); }
  function newSlotId() { return 'slot_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 0xffffff).toString(36); }
  function cleanSlotName(value, st) {
    var name = String(value || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    if (name) return name;
    return (st && st.playerName ? st.playerName : 'Spielstand') + ' · ' + (st ? U.qLabel(st.year, st.q) : 'ORACLE');
  }

  function readLocalCollection() {
    var collection = null;
    try {
      var raw = localStorage.getItem(SLOTS_KEY);
      if (raw) collection = JSON.parse(raw);
    } catch (e) {}
    if (!collection || collection.version !== 2 || !Array.isArray(collection.slots)) {
      collection = { version: 2, activeSlotId: null, slots: [] };
      try {
        var legacyRaw = localStorage.getItem(SAVE_KEY);
        if (legacyRaw) {
          var legacyState = JSON.parse(legacyRaw);
          var legacyStamp = localStorage.getItem(SAVE_META_KEY) || isoNow();
          collection.slots.push({
            id: 'legacy', name: cleanSlotName('', legacyState), createdAt: legacyStamp,
            savedAt: legacyStamp, lastPlayedAt: legacyStamp, save: legacyState
          });
          collection.activeSlotId = 'legacy';
        }
      } catch (e2) {}
    }
    collection.slots = collection.slots.filter(function (slot) { return slot && slot.id && slot.save; });
    try { collection.activeSlotId = localStorage.getItem(ACTIVE_SLOT_KEY) || collection.activeSlotId; } catch (e3) {}
    if (!collection.slots.some(function (slot) { return slot.id === collection.activeSlotId; })) {
      collection.activeSlotId = collection.slots.length ? collection.slots[0].id : null;
    }
    return collection;
  }

  function writeLocalCollection(collection) {
    try {
      localStorage.setItem(SLOTS_KEY, JSON.stringify(collection));
      if (collection.activeSlotId) localStorage.setItem(ACTIVE_SLOT_KEY, collection.activeSlotId);
      else localStorage.removeItem(ACTIVE_SLOT_KEY);
      return true;
    } catch (e) { return false; }
  }

  function slotSummary(slot, source) {
    var st = slot.save || {};
    return {
      id: slot.id, name: slot.name, createdAt: slot.createdAt, savedAt: slot.savedAt,
      lastPlayedAt: slot.lastPlayedAt || slot.savedAt, year: slot.year || st.year,
      q: slot.q || st.q, turn: slot.turn === undefined ? st.turn : slot.turn,
      termNumber: slot.termNumber || st.termNumber, playerName: slot.playerName || st.playerName,
      source: source || slot.source || 'browser'
    };
  }

  function cacheLocalSlot(st, meta) {
    meta = meta || {};
    var collection = readLocalCollection();
    var id = meta.id || activeSlotId || collection.activeSlotId || newSlotId();
    var slot = collection.slots.filter(function (item) { return item.id === id; })[0];
    var now = meta.savedAt || isoNow();
    if (!slot) {
      slot = { id: id, createdAt: meta.createdAt || now };
      collection.slots.push(slot);
    }
    slot.name = cleanSlotName(meta.name || slot.name || activeSlotName, st);
    slot.savedAt = now;
    slot.lastPlayedAt = meta.lastPlayedAt || now;
    slot.save = st;
    collection.activeSlotId = id;
    activeSlotId = id; activeSlotName = slot.name;
    var ok = writeLocalCollection(collection);
    /* Alte Builds koennen den aktiven Slot weiterhin lesen. */
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(st));
      localStorage.setItem(SAVE_META_KEY, slot.savedAt);
    } catch (e) {}
    return ok;
  }

  function apiFetch(path, options) {
    options = options || {};
    options.cache = 'no-store';
    options.mode = 'cors';
    /* Öffentliche HTTPS-Seiten müssen moderne Browser ausdrücklich darauf
       hinweisen, dass das Ziel nur auf diesem Gerät (Loopback) liegt. */
    if (!isLocalHost && API_ROOT.indexOf('http://127.0.0.1') === 0) {
      options.targetAddressSpace = 'loopback';
    } else if (isRemoteTailscaleApi) {
      options.targetAddressSpace = 'local';
    }
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    if (controller) options.signal = controller.signal;
    var timeout = setTimeout(function () { if (controller) controller.abort(); }, 2400);
    return fetch(API_ROOT + path, options).then(function (response) {
      return response.text().then(function (raw) {
        clearTimeout(timeout);
        var data = raw ? JSON.parse(raw) : {};
        if (!response.ok) {
          var err = new Error(data.error || ('Backend-Fehler ' + response.status));
          err.status = response.status;
          throw err;
        }
        return data;
      });
    }, function (err) {
      clearTimeout(timeout);
      throw err;
    });
  }

  S.BACKEND_URL = API_ROOT;

  S.activeSlot = function () {
    var collection = readLocalCollection();
    var id = activeSlotId || collection.activeSlotId;
    var slot = collection.slots.filter(function (item) { return item.id === id; })[0];
    return slot ? slotSummary(slot, 'browser') : null;
  };

  S.beginSlot = function (st, name) {
    activeSlotId = newSlotId(); activeSlotName = cleanSlotName(name, st);
    cacheLocalSlot(st, { id: activeSlotId, name: activeSlotName });
    return S.activeSlot();
  };

  S.saveLocal = function (st) { return cacheLocalSlot(st); };

  S.saveToBackend = function (st) {
    if (!activeSlotId) S.beginSlot(st);
    return apiFetch('/saves/' + encodeURIComponent(activeSlotId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ save: st, name: activeSlotName })
    });
  };

  S.saveNow = function (st) {
    var local = S.saveLocal(st);
    return S.saveToBackend(st).then(function (result) {
      cacheLocalSlot(st, { id: result.slotId || activeSlotId, name: result.name || activeSlotName,
        savedAt: result.savedAt, lastPlayedAt: result.savedAt });
      return { local: local, backend: true, savedAt: result.savedAt };
    }, function (error) {
      return { local: local, backend: false, error: error };
    });
  };

  /* Automatische Speicherpunkte blockieren den Spielablauf nicht. */
  S.save = function (st) {
    var local = S.saveLocal(st);
    S.saveToBackend(st).then(function (result) {
      cacheLocalSlot(st, { id: result.slotId || activeSlotId, name: result.name || activeSlotName,
        savedAt: result.savedAt, lastPlayedAt: result.savedAt });
    }).catch(function () {});
    return local;
  };

  S.load = function () {
    var collection = readLocalCollection();
    var slot = collection.slots.filter(function (item) { return item.id === collection.activeSlotId; })[0];
    if (!slot) return null;
    activeSlotId = slot.id; activeSlotName = slot.name;
    return normalizeSave(slot.save);
  };

  S.loadFromBackend = function () {
    return apiFetch('/save').then(function (payload) {
      var state = normalizeSave(payload.save);
      if (!state) throw new Error('Backend enthält keinen gültigen Spielstand.');
      activeSlotId = payload.slotId || 'legacy'; activeSlotName = payload.name || cleanSlotName('', state);
      cacheLocalSlot(state, { id: activeSlotId, name: activeSlotName, savedAt: payload.savedAt,
        lastPlayedAt: payload.savedAt });
      return { state: state, savedAt: payload.savedAt || null, slotId: activeSlotId };
    });
  };

  S.loadAvailable = function () {
    var localCollection = readLocalCollection();
    var localSlots = localCollection.slots.map(function (slot) { return slotSummary(slot, 'browser'); });
    return apiFetch('/saves').then(function (remote) {
      var merged = {}, order = [];
      localSlots.forEach(function (slot) { merged[slot.id] = slot; order.push(slot.id); });
      (remote.slots || []).forEach(function (slot) {
        var local = merged[slot.id];
        var remoteTime = Date.parse(slot.savedAt || 0), localTime = local ? Date.parse(local.savedAt || 0) : 0;
        if (!local) order.push(slot.id);
        if (!local || remoteTime >= localTime) merged[slot.id] = Object.assign({}, slot, { source: 'backend' });
      });
      var active = remote.activeSlotId || localCollection.activeSlotId;
      return { slots: order.map(function (id) { return merged[id]; }), backend: true, activeSlotId: active };
    }, function () {
      return { slots: localSlots, backend: false, activeSlotId: localCollection.activeSlotId };
    });
  };

  S.loadSlot = function (slot) {
    var id = typeof slot === 'string' ? slot : slot.id;
    var source = typeof slot === 'string' ? 'backend' : slot.source;
    var localCollection = readLocalCollection();
    var local = localCollection.slots.filter(function (item) { return item.id === id; })[0];
    function useLocal() {
      if (!local) return Promise.reject(new Error('Spielstand ist nicht mehr vorhanden.'));
      var state = normalizeSave(local.save);
      activeSlotId = local.id; activeSlotName = local.name;
      cacheLocalSlot(state, { id: local.id, name: local.name, createdAt: local.createdAt });
      return Promise.resolve(state);
    }
    if (source !== 'backend') return useLocal();
    return apiFetch('/saves/' + encodeURIComponent(id)).then(function (remote) {
      var state = normalizeSave(remote.save);
      if (!state) throw new Error('Backend enthält keinen gültigen Spielstand.');
      activeSlotId = remote.id; activeSlotName = remote.name;
      cacheLocalSlot(state, remote);
      return state;
    }, function () { return useLocal(); });
  };

  S.renameSlot = function (id, name) {
    name = cleanSlotName(name);
    var collection = readLocalCollection();
    var slot = collection.slots.filter(function (item) { return item.id === id; })[0];
    if (slot) { slot.name = name; writeLocalCollection(collection); }
    if (activeSlotId === id || collection.activeSlotId === id) activeSlotName = name;
    return apiFetch('/saves/' + encodeURIComponent(id), {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name })
    }).then(function () { return { ok: true, backend: true }; }, function () { return { ok: !!slot, backend: false }; });
  };

  S.deleteSlot = function (id) {
    var collection = readLocalCollection();
    var existed = collection.slots.some(function (item) { return item.id === id; });
    var wasActive = activeSlotId === id || collection.activeSlotId === id;
    collection.slots = collection.slots.filter(function (item) { return item.id !== id; });
    if (collection.activeSlotId === id) collection.activeSlotId = collection.slots.length ? collection.slots[0].id : null;
    writeLocalCollection(collection);
    if (activeSlotId === id) { activeSlotId = null; activeSlotName = null; }
    return apiFetch('/saves/' + encodeURIComponent(id), { method: 'DELETE' }).then(function () {
      return { ok: true, backend: true, wasActive: wasActive };
    }, function () { return { ok: existed, backend: false, wasActive: wasActive }; });
  };

  S.hasSave = function () {
    return readLocalCollection().slots.length > 0;
  };

  S.clearBackend = function () { return activeSlotId ? apiFetch('/saves/' + encodeURIComponent(activeSlotId), { method: 'DELETE' }) : Promise.resolve({ ok: true }); };

  S.clearSave = function () {
    var id = activeSlotId || readLocalCollection().activeSlotId;
    if (id) S.deleteSlot(id).catch(function () {});
  };

})(SL.state = SL.state || {});
