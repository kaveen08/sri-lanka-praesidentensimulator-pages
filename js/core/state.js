/* ============================================================
   ZUSTAND  -  Aufbau, Speichern, Laden
   ============================================================ */
(function (S) {
  'use strict';

  var U = SL.util, B = SL.data.baseline, G = SL.data.geo, M = SL.model;
  var SAVE_KEY = 'lk_president_sim_v1';
  var SAVE_META_KEY = SAVE_KEY + '_meta';
  var isLocalHost = location.protocol === 'http:' &&
    (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
  var API_ROOT = String(window.ORACLE_BACKEND_URL ||
    (isLocalHost ? location.origin + '/api' : 'http://127.0.0.1:8765/api')).replace(/\/$/, '');

  S.create = function (opts) {
    opts = opts || {};
    var st = {
      version: 1,
      seed: opts.seed || (Date.now() % 2147483647),
      year: B.META.startYear,
      q: B.META.startQuarter,
      turn: 0,
      difficulty: opts.difficulty || 'normal',
      playerName: opts.playerName || B.META.president,

      pc: 90,                       /* politisches Kapital */
      presidentialPower: 100,       /* sinkt, wenn die Exekutivpräsidentschaft beschnitten wird */
      seatsGov: B.META.seatsGov,
      seatsTotal: B.META.seatsTotal,

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
        funding: 0
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
      weights[p.k] = Math.max(0.1, w);
      sumW += weights[p.k];
    });

    G2.PROVINCES.forEach(function (p) {
      var ps = st.provinces[p.k];
      var share = weights[p.k] / sumW;
      ps.funding = totalTransfer * share;
      var perCapita = ps.funding / p.pop;                /* LKR Mrd. je Mio. Einwohner */
      var nationalPerCapita = totalTransfer / 22.2;

      var devTarget = 30
        + (ind.infra - 44) * 0.35
        + (ind.regionalBalanceProxy || 0)
        + (perCapita - nationalPerCapita) * 0.9
        - (p.poverty - 21) * 0.7
        + p.gdpShare * 0.45
        + (ind.growth - 3) * 1.2;
      ps.dev = U.clamp(ps.dev + (devTarget - ps.dev) * 0.14, 0, 100);

      var trustTarget = 50;
      if (p.k === 'NP') trustTarget = ind.trustTamil;
      else if (p.k === 'EP') trustTarget = (ind.trustTamil * 0.42 + ind.trustMuslim * 0.42 + ind.legitimacy * 0.16);
      else if (p.k === 'CP' || p.k === 'UV') trustTarget = (ind.trustHill * 0.5 + ind.legitimacy * 0.5);
      else trustTarget = ind.legitimacy * 0.7 + (100 - ind.sinhalaPress) * 0.3;
      ps.trust = U.clamp(ps.trust + (trustTarget - ps.trust) * 0.2, 0, 100);

      var unrestTarget = U.clamp(
        st.streetPressure * 0.6 + (60 - ps.trust) * 0.5 + (p.poverty - 20) * 0.6 - ps.dev * 0.12, 0, 100);
      ps.unrest = U.clamp(ps.unrest + (unrestTarget - ps.unrest) * 0.2, 0, 100);
    });
  };

  /* --- Speichern und Laden --- */
  function normalizeSave(st) {
    if (!st || st.version !== 1) return null;
    /* Ereignisse enthalten Funktionen, die JSON nicht überlebt.
       Deshalb wird das offene Ereignis über seine Kennung neu verknüpft. */
    if (st.pendingEvent && st.pendingEvent.id) {
      st.pendingEvent = SL.data.events.BY_ID[st.pendingEvent.id] || null;
    }
    return st;
  }

  function writeLocal(st, savedAt) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(st));
      localStorage.setItem(SAVE_META_KEY, savedAt || new Date().toISOString());
      return true;
    } catch (e) { return false; }
  }

  function apiFetch(path, options) {
    options = options || {};
    options.cache = 'no-store';
    options.mode = 'cors';
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

  S.saveLocal = function (st) { return writeLocal(st); };

  S.saveToBackend = function (st) {
    return apiFetch('/save', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ save: st })
    });
  };

  S.saveNow = function (st) {
    var local = S.saveLocal(st);
    return S.saveToBackend(st).then(function (result) {
      return { local: local, backend: true, savedAt: result.savedAt };
    }, function (error) {
      return { local: local, backend: false, error: error };
    });
  };

  /* Automatische Speicherpunkte blockieren den Spielablauf nicht. */
  S.save = function (st) {
    var local = S.saveLocal(st);
    S.saveToBackend(st).catch(function () {});
    return local;
  };

  S.load = function () {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return normalizeSave(JSON.parse(raw));
    } catch (e) { return null; }
  };

  S.loadFromBackend = function () {
    return apiFetch('/save').then(function (payload) {
      var state = normalizeSave(payload.save);
      if (!state) throw new Error('Backend enthält keinen gültigen Spielstand.');
      return { state: state, savedAt: payload.savedAt || null };
    });
  };

  S.loadAvailable = function () {
    var local = S.load();
    var localSavedAt = null;
    try { localSavedAt = localStorage.getItem(SAVE_META_KEY); } catch (e) {}
    return apiFetch('/health').then(function (health) {
      if (!health.saveExists) return { state: local, backend: true, source: local ? 'browser' : null };
      return S.loadFromBackend().then(function (remote) {
        var useRemote = !local || !localSavedAt || !remote.savedAt || remote.savedAt >= localSavedAt;
        if (useRemote) writeLocal(remote.state, remote.savedAt);
        return {
          state: useRemote ? remote.state : local,
          backend: true,
          source: useRemote ? 'backend' : 'browser'
        };
      });
    }, function () {
      return { state: local, backend: false, source: local ? 'browser' : null };
    });
  };

  S.hasSave = function () {
    try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
  };

  S.clearBackend = function () { return apiFetch('/save', { method: 'DELETE' }); };

  S.clearSave = function () {
    try {
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem(SAVE_META_KEY);
    } catch (e) {}
    S.clearBackend().catch(function () {});
  };

})(SL.state = SL.state || {});
