/* ============================================================
   ZUSTAND  -  Aufbau, Speichern, Laden
   ============================================================ */
(function (S) {
  'use strict';

  var U = SL.util, B = SL.data.baseline, G = SL.data.geo, M = SL.model;
  var Gov = SL.data.governance || { MINISTRIES: [], INSTITUTIONS: [] };
  var SAVE_KEY = 'lk_president_sim_v1';
  var SLOTS_KEY = 'lk_president_sim_slots_v2';
  var activeSlotId = null, activeSlotName = null;

  /* Das Kabinett startet mit unterschiedlich starken Häusern: ein
     Regierungsapparat ist nie gleichmäßig gut, und genau daran
     entscheidet sich, welches Ressort man im Auge behalten muss. */
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

      /* Regierungsapparat: Kabinett und nachgeordnete Institutionen
         arbeiten jedes Quartal für sich und liefern ab oder eben nicht. */
      cabinet: defaultCabinet(),
      institutions: defaultInstitutions(),
      governanceHistory: [],

      /* Offene Missstände aus schlecht gelaufenen Quartalen.
         k -> { since, sev }. Der Katalog steht in js/data/setbacks.js;
         gespeichert wird nur die Kennung, weil die Bedingungen
         Funktionen sind und JSON nicht überleben. */
      setbacks: {},
      setbackSeen: {},
      remediesUsed: {},

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
        + (ind.regionalBalance - 30) * 0.30
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

  /* Ein Spielstand aus einer älteren Fassung kennt neuere Felder nicht.
     Statt ihn abzulehnen, werden sie hier nachgetragen. */
  S.migrate = function (st) {
    if (!st.cabinet) st.cabinet = defaultCabinet();
    if (!st.institutions) st.institutions = defaultInstitutions();
    if (!Array.isArray(st.governanceHistory)) st.governanceHistory = [];
    /* Ein Ressort, das erst später hinzugekommen ist, fehlt im
       gespeicherten Kabinett und wird ergänzt. */
    Gov.MINISTRIES.forEach(function (m, idx) {
      if (!st.cabinet[m.k]) {
        st.cabinet[m.k] = {
          name: m.name, performance: 48 + (idx * 7 % 17), successes: 0, failures: 0,
          scandal: null, generation: 0, appointedTurn: st.turn || 0, lastOutcomeTurn: -99
        };
      }
    });
    Gov.INSTITUTIONS.forEach(function (i, idx) {
      if (!st.institutions[i.k]) {
        st.institutions[i.k] = { performance: 48 + (idx * 9 % 19), successes: 0, failures: 0, lastOutcomeTurn: -99 };
      }
    });
    return st;
  };

  /* =========================================================
     SPEICHERSTÄNDE

     Mehrere Amtszeiten stehen nebeneinander, jede unter einem
     eigenen Namen. Ein Spielstand aus einer Fassung ohne
     Speicherplätze wird beim ersten Zugriff als erster Platz
     übernommen, damit niemand seine laufende Amtszeit verliert.
     ========================================================= */
  function isoNow() { return new Date().toISOString(); }

  /* --- Ablage auf dem Server ---------------------------------
     Wird das Spiel lokal ueber serve.py ausgeliefert, liegen die
     Spielstaende zusaetzlich als Dateien neben dem Programm und
     ueberleben damit einen Browserwechsel. Auf einer oeffentlichen
     Seite gibt es keinen solchen Server: ein Browser laesst eine
     HTTPS-Seite ohnehin nicht mit einem Dienst auf dem eigenen
     Rechner sprechen. Dort bleibt es beim Browserspeicher, und das
     Spiel laeuft vollstaendig weiter -- nur eben geraetegebunden.
     ----------------------------------------------------------- */
  var hasBackend = (typeof location !== 'undefined' && location.protocol === 'http:' &&
    (location.hostname === 'localhost' || location.hostname === '127.0.0.1'));
  var API = '/api/saves';

  S.usesBackend = function () { return hasBackend; };

  function api(path, options) {
    if (!hasBackend || typeof fetch !== 'function') return Promise.reject(new Error('kein Server'));
    options = options || {};
    options.cache = 'no-store';
    return fetch(API + (path || ''), options).then(function (r) {
      return r.text().then(function (raw) { return { r: r, raw: raw }; });
    }, function (err) {
      /* Gar keine Antwort: hier ist kein Server. */
      hasBackend = false;
      throw err;
    }).then(function (o) {
      /* Erst den Status ansehen, dann den Rumpf lesen. Ein
         gewoehnlicher statischer Server antwortet auf diese Adresse
         mit einer HTML-Fehlerseite; wer die als JSON zu lesen
         versucht, bekommt einen Fehler, der nicht der eigentliche
         ist -- und merkt nie, dass es hier schlicht keine Ablage
         gibt. */
      if (!o.r.ok) {
        if (o.r.status === 404 || o.r.status === 405 || o.r.status === 501) hasBackend = false;
        var msg = 'Serverfehler ' + o.r.status;
        try { msg = (JSON.parse(o.raw) || {}).error || msg; } catch (e) {}
        throw new Error(msg);
      }
      try {
        return o.raw ? JSON.parse(o.raw) : {};
      } catch (e) {
        hasBackend = false;
        throw new Error('Die Antwort der Spielstandablage ist nicht lesbar.');
      }
    });
  }

  /* Fehlschlaege sind hier kein Grund, das Spiel anzuhalten: der
     Browserspeicher hat den Stand bereits. */
  function pushToBackend(id, name, st) {
    if (!hasBackend) return;
    api('/' + encodeURIComponent(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, save: st })
    })['catch'](function () {});
  }

  function dropFromBackend(id) {
    if (!hasBackend) return;
    api('/' + encodeURIComponent(id), { method: 'DELETE' })['catch'](function () {});
  }

  /* Holt Staende vom Server, die der Browser nicht kennt -- etwa nach
     einem Browserwechsel oder geloeschten Websitedaten. */
  S.syncFromBackend = function () {
    if (!hasBackend) return Promise.resolve({ added: 0 });
    return api('').then(function (data) {
      var slots = (data && data.slots) || [];
      var coll = readCollection();
      var known = {};
      coll.slots.forEach(function (s) { known[s.id] = s; });
      var missing = slots.filter(function (s) { return !known[s.slotId]; });
      if (!missing.length) return { added: 0 };
      return Promise.all(missing.map(function (s) {
        return api('/' + encodeURIComponent(s.slotId))['catch'](function () { return null; });
      })).then(function (full) {
        var coll2 = readCollection(), added = 0;
        full.forEach(function (rec, idx) {
          if (!rec || !rec.save) return;
          coll2.slots.push({
            id: missing[idx].slotId, name: rec.name || missing[idx].slotId,
            createdAt: rec.createdAt, savedAt: rec.savedAt, lastPlayedAt: rec.savedAt,
            save: rec.save
          });
          added++;
        });
        if (added) writeCollection(coll2);
        return { added: added };
      });
    })['catch'](function () { return { added: 0 }; });
  };

  function newSlotId() {
    return 'slot_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 0xffffff).toString(36);
  }

  function cleanSlotName(value, st) {
    var name = String(value || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    if (name) return name;
    return (st && st.playerName ? st.playerName : 'Spielstand')
      + ' · ' + (st ? U.qLabel(st.year, st.q) : 'ORACLE');
  }

  function readCollection() {
    var coll = null;
    try {
      var raw = localStorage.getItem(SLOTS_KEY);
      if (raw) coll = JSON.parse(raw);
    } catch (e) {}
    if (!coll || coll.version !== 2 || !Array.isArray(coll.slots)) {
      coll = { version: 2, activeSlotId: null, slots: [] };
      /* Übernahme eines Standes aus der Fassung ohne Speicherplätze. */
      try {
        var legacyRaw = localStorage.getItem(SAVE_KEY);
        if (legacyRaw) {
          var legacy = JSON.parse(legacyRaw);
          if (legacy && legacy.version === 1) {
            var stamp = isoNow();
            coll.slots.push({ id: 'legacy', name: cleanSlotName('', legacy),
              createdAt: stamp, savedAt: stamp, lastPlayedAt: stamp, save: legacy });
            coll.activeSlotId = 'legacy';
          }
        }
      } catch (e2) {}
    }
    coll.slots = coll.slots.filter(function (s) { return s && s.id && s.save; });
    if (!coll.slots.some(function (s) { return s.id === coll.activeSlotId; })) {
      coll.activeSlotId = coll.slots.length ? coll.slots[0].id : null;
    }
    return coll;
  }

  function writeCollection(coll) {
    try {
      localStorage.setItem(SLOTS_KEY, JSON.stringify(coll));
      return true;
    } catch (e) { return false; }
  }

  function summary(slot) {
    var s = slot.save || {};
    return {
      id: slot.id, name: slot.name, createdAt: slot.createdAt, savedAt: slot.savedAt,
      lastPlayedAt: slot.lastPlayedAt || slot.savedAt,
      year: s.year, q: s.q, turn: s.turn, playerName: s.playerName,
      approvalOverall: s.approvalOverall, pc: s.pc, gameOver: s.gameOver || null
    };
  }

  /* Der Zustand wird in den aktiven Platz geschrieben; gibt es noch
     keinen, entsteht er hier. */
  function writeSlot(st, meta) {
    meta = meta || {};
    var coll = readCollection();
    var id = meta.id || activeSlotId || coll.activeSlotId || newSlotId();
    var slot = coll.slots.filter(function (s) { return s.id === id; })[0];
    var now = meta.savedAt || isoNow();
    if (!slot) { slot = { id: id, createdAt: meta.createdAt || now }; coll.slots.push(slot); }
    slot.name = cleanSlotName(meta.name || slot.name || activeSlotName, st);
    slot.savedAt = now;
    slot.lastPlayedAt = meta.lastPlayedAt || now;
    slot.save = st;
    coll.activeSlotId = id;
    activeSlotId = id; activeSlotName = slot.name;
    var ok = writeCollection(coll);
    pushToBackend(id, slot.name, st);
    return ok ? summary(slot) : null;
  }

  /* Ein geladener Zustand kommt aus JSON und muss wieder
     spielfähig gemacht werden. */
  function revive(st) {
    if (!st || st.version !== 1) return null;
    /* Ereignisse enthalten Funktionen, die JSON nicht überlebt.
       Deshalb wird das offene Ereignis über seine Kennung neu verknüpft. */
    if (st.pendingEvent && st.pendingEvent.id) {
      st.pendingEvent = SL.data.events.BY_ID[st.pendingEvent.id] || null;
    }
    S.migrate(st);
    return st;
  }

  S.listSlots = function () {
    var coll = readCollection();
    return coll.slots.map(summary).sort(function (a, b) {
      return String(b.lastPlayedAt || '').localeCompare(String(a.lastPlayedAt || ''));
    });
  };

  S.activeSlot = function () {
    var coll = readCollection();
    var slot = coll.slots.filter(function (s) { return s.id === (activeSlotId || coll.activeSlotId); })[0];
    return slot ? summary(slot) : null;
  };

  S.beginSlot = function (st, name) {
    activeSlotId = newSlotId();
    activeSlotName = cleanSlotName(name, st);
    return writeSlot(st, { id: activeSlotId, name: activeSlotName });
  };

  S.loadSlot = function (id) {
    var coll = readCollection();
    var slot = coll.slots.filter(function (s) { return s.id === id; })[0];
    if (!slot) return null;
    var st = revive(slot.save);
    if (!st) return null;
    activeSlotId = slot.id; activeSlotName = slot.name;
    slot.lastPlayedAt = isoNow();
    coll.activeSlotId = slot.id;
    writeCollection(coll);
    return st;
  };

  S.renameSlot = function (id, name) {
    var coll = readCollection();
    var slot = coll.slots.filter(function (s) { return s.id === id; })[0];
    if (!slot) return false;
    slot.name = cleanSlotName(name, slot.save);
    if (slot.id === activeSlotId) activeSlotName = slot.name;
    return writeCollection(coll);
  };

  S.deleteSlot = function (id) {
    var coll = readCollection();
    var before = coll.slots.length;
    coll.slots = coll.slots.filter(function (s) { return s.id !== id; });
    if (coll.slots.length === before) return false;
    if (coll.activeSlotId === id) {
      coll.activeSlotId = coll.slots.length ? coll.slots[0].id : null;
    }
    if (activeSlotId === id) { activeSlotId = coll.activeSlotId; activeSlotName = null; }
    dropFromBackend(id);
    return writeCollection(coll);
  };

  /* --- Speichern und Laden: schreibt in den aktiven Platz --- */
  S.save = function (st) { return !!writeSlot(st); };

  S.load = function () {
    var coll = readCollection();
    var id = activeSlotId || coll.activeSlotId;
    return id ? S.loadSlot(id) : null;
  };

  S.hasSave = function () { return readCollection().slots.length > 0; };

  /* Beendet nur die laufende Amtszeit, ohne die anderen
     Speicherplätze anzutasten. */
  S.clearSave = function () {
    activeSlotId = null; activeSlotName = null;
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  };

})(SL.state = SL.state || {});
