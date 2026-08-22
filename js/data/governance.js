/* ============================================================
   REGIERUNGSAPPARAT  -  fiktives Kabinett und Institutionen
   Namen sind bewusst simuliert; Ämter und Wirkungsfelder bilden
   die politische Steuerung im Spiel ab.
   ============================================================ */
(function (G) {
  'use strict';

  G.MINISTRIES = [
    { k: 'finance', office: 'Finanzminister', ministry: 'Finanzen, Planung und wirtschaftliche Entwicklung',
      name: 'M. Jayasinghe', replacements: ['R. Karunaratne', 'D. Abeysekara', 'S. Gunawardena'],
      indicators: ['imfCompl', 'stateCap', 'corruption'],
      successEff: { imfCompl: 2.5, stateCap: 1.2 }, failEff: { imfCompl: -2.8, legitimacy: -1.2 },
      success: 'Das Finanzministerium schließt eine schwierige Haushaltsaufgabe früher als geplant ab.',
      failure: 'Fehlerhafte Prognosen und verspätete Erlasse bringen den Haushaltsvollzug durcheinander.' },
    { k: 'health', office: 'Gesundheitsministerin', ministry: 'Gesundheit und Arzneimittelversorgung',
      name: 'Dr. S. Perera', replacements: ['Dr. N. Wickramasinghe', 'Dr. A. Fernando', 'Dr. T. Mendis'],
      indicators: ['health', 'malnutrition', 'stateCap'],
      successEff: { health: 2.2, malnutrition: -0.4 }, failEff: { health: -2.4, legitimacy: -1.0 },
      success: 'Die Arzneimittelbeschaffung stabilisiert mehrere kritische Lieferketten.',
      failure: 'Beschaffungsfehler führen regional zu Engpässen bei wichtigen Medikamenten.' },
    { k: 'education', office: 'Bildungsminister', ministry: 'Bildung, Hochschulen und Berufsbildung',
      name: 'A. Weerasinghe', replacements: ['P. Ekanayake', 'L. Samarasinghe', 'J. Herath'],
      indicators: ['education', 'skillsMatch', 'stateCap'],
      successEff: { education: 1.8, skillsMatch: 1.5 }, failEff: { education: -1.8, skillsMatch: -1.1 },
      success: 'Lehrerstellen und Prüfungsabläufe werden erstmals landesweit fristgerecht koordiniert.',
      failure: 'Prüfungs- und Stellenplanung scheitern an widersprüchlichen Anweisungen des Ministeriums.' },
    { k: 'agriculture', office: 'Landwirtschaftsminister', ministry: 'Landwirtschaft, Bewässerung und Fischerei',
      name: 'K. Bandara', replacements: ['H. Rathnayake', 'M. Kumara', 'V. Pathirana'],
      indicators: ['agriProd', 'foodSec', 'stateCap'],
      successEff: { agriProd: 2.0, foodSec: 1.7 }, failEff: { agriProd: -2.2, foodSec: -1.7 },
      success: 'Saatgut, Dünger und Bewässerungspläne erreichen die Distrikte rechtzeitig.',
      failure: 'Eine verspätete Ausschreibung gefährdet die nächste Anbausaison.' },
    { k: 'transport', office: 'Verkehrsministerin', ministry: 'Verkehr, Bahn und öffentlicher Nahverkehr',
      name: 'R. Fernando', replacements: ['C. de Silva', 'N. Rodrigo', 'B. Alwis'],
      indicators: ['infra', 'regionalBalance', 'stateCap'],
      successEff: { infra: 1.8, regionalBalance: 1.1 }, failEff: { infra: -1.8, regionalBalance: -1.0 },
      success: 'Bahn und Busbetriebe beseitigen gemeinsam mehrere besonders schwere Engpässe.',
      failure: 'Koordinationsfehler legen wichtige Bahn- und Busverbindungen zeitweise lahm.' },
    { k: 'energy', office: 'Energieminister', ministry: 'Energie und Staatsbetriebe',
      name: 'P. Dissanayake', replacements: ['U. Jayawardena', 'G. Ranasinghe', 'S. Peiris'],
      indicators: ['energyRel', 'soeHealth', 'stateCap'],
      successEff: { energyRel: 2.2, soeHealth: 1.6 }, failEff: { energyRel: -2.5, soeHealth: -2.0 },
      success: 'Netzbetreiber und Kraftwerke bewältigen eine Lastspitze ohne Abschaltungen.',
      failure: 'Fehlende Wartungsplanung verursacht Stromausfälle und teure Noteinkäufe.' },
    { k: 'justice', office: 'Justizministerin', ministry: 'Justiz und institutionelle Integrität',
      name: 'N. Senanayake', replacements: ['F. Ilangasinghe', 'R. Seneviratne', 'K. Balasuriya'],
      indicators: ['ruleOfLaw', 'corruption', 'stateCap'],
      successEff: { ruleOfLaw: 1.8, corruption: 1.4 }, failEff: { ruleOfLaw: -2.0, corruption: -1.5 },
      success: 'Das Ministerium löst einen lange blockierten Gesetzgebungs- und Ernennungsstau.',
      failure: 'Akten verschwinden, Fristen verstreichen und wichtige Verfahren müssen neu begonnen werden.' },
    { k: 'social', office: 'Sozialminister', ministry: 'Soziales, Arbeit und Frauenförderung',
      name: 'T. Nadarajah', replacements: ['V. Tharmalingam', 'S. Mohamed', 'I. Cooray'],
      indicators: ['socialProt', 'femaleLFP', 'stateCap'],
      successEff: { socialProt: 2.0, femaleLFP: 0.5 }, failEff: { socialProt: -2.2, legitimacy: -0.9 },
      success: 'Eine Datenbereinigung bringt Sozialleistungen schneller zu berechtigten Haushalten.',
      failure: 'Fehlerhafte Listen schließen Tausende berechtigte Haushalte von Leistungen aus.' },
    { k: 'climate', office: 'Klima- und Umweltministerin', ministry: 'Umwelt und Katastrophenvorsorge',
      name: 'F. Rahman', replacements: ['M. Faleel', 'A. Wijetunga', 'S. Lokuge'],
      indicators: ['climateRes', 'disasterPrep', 'stateCap'],
      successEff: { climateRes: 1.8, disasterPrep: 2.1 }, failEff: { climateRes: -1.8, disasterPrep: -2.2 },
      success: 'Frühwarnzentren und Distrikte führen eine landesweite Krisenübung erfolgreich durch.',
      failure: 'Warnketten und Notfalllager erweisen sich bei einer Übung als lückenhaft.' },
    { k: 'foreign', office: 'Außenminister', ministry: 'Auswärtige Beziehungen und Diaspora',
      name: 'I. Wijesuriya', replacements: ['D. Amarasinghe', 'R. Muthukumar', 'P. Hameed'],
      indicators: ['relWest', 'relIndia', 'diaspora'],
      successEff: { relWest: 1.4, diaspora: 1.5 }, failEff: { relWest: -1.6, legitimacy: -0.7 },
      success: 'Eine diplomatische Initiative bringt mehrere Partner hinter eine gemeinsame Position.',
      failure: 'Widersprüchliche Botschaften aus Colombo beschädigen eine wichtige Verhandlungsrunde.' }
  ];

  G.INSTITUTIONS = [
    { k: 'centralBank', name: 'Zentralbank', indicators: ['inflation', 'fx', 'reserves'],
      successEff: { inflation: -0.25, reserves: 0.12 }, failEff: { inflation: 0.3, fx: 3 },
      success: 'Die Zentralbank stabilisiert Liquidität und Wechselkurs ohne größere Reserveverluste.',
      failure: 'Eine schlecht kommunizierte Intervention erzeugt zusätzliche Unruhe am Devisenmarkt.' },
    { k: 'auditor', name: 'Rechnungshof', indicators: ['corruption', 'stateCap'],
      successEff: { corruption: 1.8, stateCap: 0.8 }, failEff: { corruption: -1.3, legitimacy: -0.8 },
      success: 'Der Rechnungshof deckt ein überteuertes Beschaffungssystem auf und stoppt Zahlungen.',
      failure: 'Ein wichtiger Prüfbericht bleibt wegen lückenhafter Akten ohne Konsequenzen.' },
    { k: 'electionCommission', name: 'Wahlkommission', indicators: ['legitimacy', 'ruleOfLaw'],
      successEff: { legitimacy: 1.6, ruleOfLaw: 0.8 }, failEff: { legitimacy: -1.8, ruleOfLaw: -0.7 },
      success: 'Die Wahlkommission bereinigt Register und veröffentlicht nachvollziehbare Verfahrensdaten.',
      failure: 'Fehler in Registern und Terminplanung lösen parteiübergreifende Kritik aus.' },
    { k: 'disasterCentre', name: 'Katastrophenschutzzentrum', indicators: ['disasterPrep', 'climateRes'],
      successEff: { disasterPrep: 2.0, climateRes: 0.8 }, failEff: { disasterPrep: -2.1, legitimacy: -0.7 },
      success: 'Das Katastrophenschutzzentrum koordiniert Warnungen, Lager und Rettungsdienste reibungslos.',
      failure: 'Mehrere Distrikte erhalten Warnungen zu spät und melden fehlende Notvorräte.' },
    { k: 'publicService', name: 'Kommission für den öffentlichen Dienst', indicators: ['stateCap', 'corruption'],
      successEff: { stateCap: 1.8, corruption: 0.8 }, failEff: { stateCap: -1.9, corruption: -0.8 },
      success: 'Ein transparentes Auswahlverfahren besetzt kritische Fachstellen nach Leistung.',
      failure: 'Politische Interventionen blockieren Ernennungen und schwächen mehrere Behörden.' }
  ];

  G.MINISTRY_BY_KEY = {};
  G.MINISTRIES.forEach(function (m) { G.MINISTRY_BY_KEY[m.k] = m; });
  G.INSTITUTION_BY_KEY = {};
  G.INSTITUTIONS.forEach(function (i) { G.INSTITUTION_BY_KEY[i.k] = i; });

})(SL.data.governance = SL.data.governance || {});
