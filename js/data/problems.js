/* ============================================================
   STRUKTURPROBLEME  -  das Lagebild, an dem die Amtszeit gemessen wird
   score(st) liefert 0..100, wobei 100 = gelöst.
   ============================================================ */
(function (P) {
  'use strict';
  var U = SL.util;
  var sc = function (v, bad, good) { return U.clamp((v - bad) / (good - bad) * 100, 0, 100); };

  P.PROBLEMS = [
    {
      k: 'debt', label: 'Staatsverschuldung und Verwundbarkeit', horizon: 'langfristig', sev: 3,
      desc: 'Rund 100 % des BIP. Hohe Zinslasten verdrängen Schulen, Krankenhäuser, Infrastruktur und Investitionen. Der IWF-Zielpfad sieht unter 95 % bis 2032 vor.',
      keys: ['debtGdp', 'reserves', 'imfCompl'],
      score: function (s) { return sc(100 - s.ind.debtGdp, -18, 22) * 0.5 + sc(s.ind.reserves, 2, 12) * 0.3 + sc(s.ind.imfCompl, 25, 90) * 0.2; }
    },
    {
      k: 'poverty', label: 'Armut und Lebenshaltungskosten', horizon: 'akut', sev: 3,
      desc: 'Etwa ein Viertel der Bevölkerung lebt unter der Armutsgrenze, ungefähr doppelt so viele wie vor der Krise. Sinkende Inflation heißt nicht, dass die Preise wieder fallen.',
      keys: ['poverty', 'inflation', 'socialProt'],
      score: function (s) { return sc(35 - s.ind.poverty, 2, 27) * 0.55 + sc(18 - s.ind.inflation, 4, 16) * 0.2 + sc(s.ind.socialProt, 20, 85) * 0.25; }
    },
    {
      k: 'jobs', label: 'Zu wenige gute Arbeitsplätze', horizon: 'strukturell', sev: 3,
      desc: 'Jugendarbeitslosigkeit von 18,7 %, bei jungen Frauen 21,6 %. In zehn Jahren treten rund eine Million junge Menschen in den formellen Arbeitsmarkt ein, bei bisherigen Trends entstehen etwa 300.000 Stellen.',
      keys: ['youthUnemp', 'privateSector', 'skillsMatch'],
      score: function (s) { return sc(35 - s.ind.youthUnemp, 3, 28) * 0.45 + sc(s.ind.privateSector, 20, 85) * 0.3 + sc(s.ind.skillsMatch, 15, 80) * 0.25; }
    },
    {
      k: 'corruption', label: 'Korruption und schwacher Staat', horizon: 'strukturell', sev: 3,
      desc: 'Im Korruptionswahrnehmungsindex 2025 bei 35 von 100 Punkten, Rang 107. Gefährlicher als einzelne Bestechung sind Patronage, politische Ernennungen und öffentliche Beschaffung.',
      keys: ['corruption', 'stateCap', 'ruleOfLaw'],
      score: function (s) { return sc(s.ind.corruption, 20, 75) * 0.45 + sc(s.ind.stateCap, 20, 80) * 0.3 + sc(s.ind.ruleOfLaw, 20, 80) * 0.25; }
    },
    {
      k: 'reconcile', label: 'Ethnische Versöhnung', horizon: 'seit Jahrzehnten', sev: 3,
      desc: 'Der Krieg endete 2009, der politische Konflikt nicht. Verschwundene, Land, Militärpräsenz, Antiterrorgesetz, Devolution, Sprache, Gedenken. Sri Lanka hat den Krieg beendet, aber noch keinen gemeinsamen Nachkriegsstaat geschaffen.',
      keys: ['reconcile', 'trustTamil', 'langAccess'],
      score: function (s) { return sc(s.ind.reconcile, 10, 80) * 0.4 + sc(s.ind.trustTamil, 10, 80) * 0.35 + sc(s.ind.langAccess, 15, 85) * 0.25; }
    },
    {
      k: 'minorities', label: 'Muslime und Malaiyaha-Tamilen', horizon: 'sozial', sev: 2,
      desc: 'Die Debatte wird oft auf Sinhala gegen Jaffna-Tamilen verkürzt. Malaiyaha-Tamilen im Plantagenhochland und Muslime im Osten haben eigene, ungelöste Probleme.',
      keys: ['trustMuslim', 'trustHill', 'casteEquity'],
      score: function (s) { return sc(s.ind.trustMuslim, 15, 85) * 0.35 + sc(s.ind.trustHill, 15, 85) * 0.35 + sc(s.ind.casteEquity, 20, 85) * 0.3; }
    },
    {
      k: 'education', label: 'Bildung passt nicht zum Arbeitsmarkt', horizon: 'langfristig', sev: 2,
      desc: 'Rund 25.000 bis 30.000 Hochschulabsolventen pro Jahr, während Unternehmen benötigte Fähigkeiten nicht finden. Arbeitslose Absolventen und Fachkräftemangel gleichzeitig.',
      keys: ['skillsMatch', 'education'],
      score: function (s) { return sc(s.ind.skillsMatch, 15, 80) * 0.55 + sc(s.ind.education, 30, 88) * 0.45; }
    },
    {
      k: 'soe', label: 'Staatsunternehmen und ineffizienter Staat', horizon: 'strukturell', sev: 2,
      desc: 'Politische Ernennungen, Überbesetzung, politisch niedrig gehaltene Preise, Verluste beim Steuerzahler. Der IWF fordert schnellere Reformen und kostendeckende Energiepreise.',
      keys: ['soeHealth', 'digitalGov', 'stateCap'],
      score: function (s) { return sc(s.ind.soeHealth, 15, 85) * 0.5 + sc(s.ind.digitalGov, 20, 85) * 0.25 + sc(s.ind.stateCap, 20, 80) * 0.25; }
    },
    {
      k: 'brain', label: 'Abwanderung von Fachkräften', horizon: 'zunehmend', sev: 2,
      desc: 'Gute Ausbildung, kein guter Job, niedriges Gehalt, Ausreise. Ärzte, Ingenieure, IT-Fachkräfte und Pflegepersonal gehen. Eine Frage der nationalen Zukunftsfähigkeit, nicht nur der Statistik.',
      keys: ['brainDrain', 'youthUnemp'],
      score: function (s) { return sc(100 - s.ind.brainDrain, 15, 80) * 0.65 + sc(35 - s.ind.youthUnemp, 3, 28) * 0.35; }
    },
    {
      k: 'women', label: 'Frauen wirtschaftlich untergenutzt', horizon: 'strukturell', sev: 2,
      desc: 'Erwerbsbeteiligung: Männer rund 68 %, Frauen rund 31 %, obwohl Frauen einen großen Teil der Hochschulabsolventen stellen. Kinderbetreuung, sichere Verkehrsmittel und Arbeitszeitmodelle entscheiden mit.',
      keys: ['femaleLFP'],
      score: function (s) { return sc(s.ind.femaleLFP, 28, 58) * 0.8 + sc(s.ind.socialProt, 20, 85) * 0.2; }
    },
    {
      k: 'private', label: 'Privatsektor und Investitionen zu schwach', horizon: 'strukturell', sev: 2,
      desc: 'Private und ausländische Investitionen liegen weit unter dem Potenzial. Ein Staat kann nicht dauerhaft Hunderttausende beschäftigen, nur damit sie beschäftigt sind.',
      keys: ['privateSector', 'fdi', 'exports'],
      score: function (s) { return sc(s.ind.privateSector, 20, 85) * 0.45 + sc(s.ind.fdi, 0.5, 4.5) * 0.3 + sc(s.ind.exports, 10, 26) * 0.25; }
    },
    {
      k: 'agri', label: 'Landwirtschaft zu wenig produktiv', horizon: 'strukturell', sev: 2,
      desc: 'Kleine Parzellen, alte Methoden, schlechte Lagerung, Zwischenhändler, Klimaabhängigkeit. Das Ziel ist nicht, dass alle wieder Bauern werden, sondern dass weniger Menschen mehr erzeugen und besser verdienen.',
      keys: ['agriProd', 'foodSec'],
      score: function (s) { return sc(s.ind.agriProd, 20, 85) * 0.6 + sc(s.ind.foodSec, 25, 90) * 0.4; }
    },
    {
      k: 'climate', label: 'Klima und Naturkatastrophen', horizon: 'langfristig', sev: 3,
      desc: 'Zyklon Ditwah verursachte im November 2025 rund 4,1 Mrd. USD Schaden, etwa 4 % des BIP. Ohne Anpassung könnten klimabedingte Verluste bis 2050 rund 3,5 % des BIP jährlich erreichen. Klima ist Wirtschaftspolitik.',
      keys: ['climateRes', 'disasterPrep', 'renewables'],
      score: function (s) { return sc(s.ind.climateRes, 10, 85) * 0.45 + sc(s.ind.disasterPrep, 15, 88) * 0.35 + sc(s.ind.renewables, 30, 85) * 0.2; }
    },
    {
      k: 'health', label: 'Gesundheit und Mangelernährung', horizon: 'sozial', sev: 2,
      desc: 'Die kostenlose Versorgung ist eine große Stärke, die Krise hat sie beschädigt. Fast jedes sechste Baby kommt mit niedrigem Geburtsgewicht zur Welt. Ein mangelernährtes Kind ist später weniger produktiv.',
      keys: ['health', 'malnutrition'],
      score: function (s) { return sc(s.ind.health, 30, 90) * 0.5 + sc(100 - s.ind.malnutrition, 30, 88) * 0.5; }
    },
    {
      k: 'regional', label: 'Regionale Ungleichheit', horizon: 'strukturell', sev: 2,
      desc: 'Colombo ist nicht Sri Lanka. Rund 40 % der Wirtschaftsleistung entstehen in der Westprovinz. Das Land bräuchte mehrere wirtschaftliche Zentren: Hambantota, Jaffna, Trincomalee, Kandy, Galle.',
      keys: ['regionalBalance', 'inequality'],
      score: function (s) { return sc(s.ind.regionalBalance, 15, 85) * 0.65 + sc(55 - s.ind.inequality, 0, 25) * 0.35; }
    },
    {
      k: 'tax', label: 'Steuerbasis zu schmal', horizon: 'strukturell', sev: 2,
      desc: 'Der Staat braucht mehr Einnahmen, kann aber eine Bevölkerung nach einer extremen Krise nicht beliebig stärker belasten. Der Ausweg ist eine breitere Basis, weniger Hinterziehung und eine digitalisierte Verwaltung.',
      keys: ['taxCompl'],
      score: function (s) {
        var bud = SL.engine.budget(s);
        return sc(s.ind.taxCompl, 20, 80) * 0.55 + sc(bud.revPct, 11, 20) * 0.45;
      }
    },
    {
      k: 'bureau', label: 'Bürokratie und langsamer Staat', horizon: 'strukturell', sev: 2,
      desc: 'Firmengründung, Landerwerb, Baugenehmigung, Import, Steuern: mehrere Behörden, unterschiedliche Regeln, viel Papier. Genau das hält Investitionen zurück.',
      keys: ['stateCap', 'digitalGov', 'privateSector'],
      score: function (s) { return sc(s.ind.stateCap, 20, 85) * 0.4 + sc(s.ind.digitalGov, 20, 88) * 0.35 + sc(s.ind.privateSector, 20, 85) * 0.25; }
    },
    {
      k: 'foreign', label: 'Außenpolitische Abhängigkeiten', horizon: 'dauerhaft', sev: 2,
      desc: 'Sri Lanka liegt zwischen Indien, China, westlichen Märkten, Japan und den Golfstaaten. Die Kunst besteht darin, mit allen zusammenzuarbeiten, ohne von einem abhängig zu werden.',
      keys: ['relIndia', 'relChina', 'relWest'],
      score: function (s) {
        var i = s.ind;
        var avg = (i.relIndia + i.relChina + i.relWest + i.relJapan + i.relGulf) / 5;
        var spread = Math.max(i.relIndia, i.relChina, i.relWest) - Math.min(i.relIndia, i.relChina, i.relWest);
        return U.clamp(sc(avg, 30, 85) * 0.7 + sc(50 - spread, 0, 45) * 0.3, 0, 100);
      }
    }
  ];

  P.status = function (v) {
    if (v >= 70) return { cls: 'g', label: 'auf gutem Weg' };
    if (v >= 50) return { cls: 'a', label: 'in Bewegung' };
    if (v >= 32) return { cls: 'a', label: 'kritisch' };
    return { cls: 'r', label: 'sehr kritisch' };
  };

})(SL.data.problems = SL.data.problems || {});
