/* ============================================================
   GEOGRAFIE  -  9 Provinzen, 25 Distrikte, Kommunalebene
   Die Provinzgeometrien basieren auf der amtlichen ADM1-Ebene
   des Sri Lanka NSDI und sind fuer die Bildschirmdarstellung vereinfacht.
   ============================================================ */
(function (G) {
  'use strict';

  /* Die Umrisse sind aus WGS84-Geokoordinaten projiziert:
     X = (Laenge - 79,60) * 78 + 12 ,  Y = (9,90 - Breite) * 79 + 10
     Das Sichtfeld ist damit 0 0 200 340. Punkt Pedro liegt oben,
     Dondra Head unten, Mannar und die Halbinsel Kalpitiya links. */
  G.VIEWBOX = '0 0 200 340';
  G.PROVINCES = [
    {
      k: 'WP', name: 'Westprovinz', capital: 'Colombo', pop: 6.10, gdpShare: 40,
      poverty: 8, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 82, tamil: 8, muslim: 9, other: 1 },
      note: 'Der wirtschaftliche Motor. Rund 40 % der Wirtschaftsleistung auf 6 % der Fläche. Genau darin liegt das regionale Ungleichgewicht.',
      path: 'M31.1 243.9L30.7 242.2L30.9 243.4L30.7 242.9L29.5 243.5L30 241.8L29.4 243.5L30.6 245L30 245.2L31 244.8L33.6 256.3L41.6 277.3L41.8 280.3L41.1 281L41.6 282.7L43 284.4L44.3 283.7L48.6 286.6L49.9 286.3L51.7 287.4L53.4 289.2L55.2 289L58 290.1L59.4 289.7L59.3 288.7L60.2 288.1L61.8 288.3L66.5 292.4L65.9 287L71.9 284.3L72.8 284.5L72.9 283.7L67 275.6L66.2 273.6L67.7 273L66.9 271.1L65.2 269.3L63.1 268.6L62.7 266.1L60.1 263.5L58.7 260.7L59.3 260.2L57.1 253.6L58.7 253.8L59 252.5L58.4 250.8L56.9 250.2L57.9 247.1L59.7 245.7L59.4 244L60.5 244.1L60.6 243.1L60.1 241L57.2 240.9L57.4 239.3L56 234.7L57.7 230.9L58.4 231.2L59.8 228.7L57.4 228.3L55.8 228.9L55.2 224.6L54.6 224.2L55.6 224.5L55.9 223.8L57.4 223.8L57.8 220.5L58.8 219.3L54.4 215.1L54.8 214.4L54 213.5L52.8 213L47.8 216.7L46.9 215.4L45.6 215.2L45.3 214L43.8 213.7L41.4 216L39.4 216.2L39.8 216.8L39 217.5L37.3 216.6L37.6 217.5L36.6 217.2L36 218.1L36.1 217L35.4 216.9L34.7 217.5L33.4 216.8L32.8 217.7L30.8 217.5L30.6 221.8L28.9 223L32.9 239L32.9 241.5L31.8 242.2L31.1 243.9ZM56 223L56.2 223.3L55.6 223.4L56 223ZM40.8 281.4L40.7 281.5L40.8 281.6L40.8 281.4ZM41.4 282.4L41.6 282.7L41.6 282.5L41.4 282.4Z',
      label: [44, 265], cap: [32.4, 244.8], color: '#22d3ee'
    },
    {
      k: 'CP', name: 'Zentralprovinz', capital: 'Kandy', pop: 2.80, gdpShare: 11,
      poverty: 22, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 64, tamil: 25, muslim: 10, other: 1 },
      note: 'Hochland, Tee, Universitäten. Heimat eines großen Teils der Malaiyaha-Tamilen und ihrer ungelösten Lohn- und Landfragen.',
      path: 'M102.4 159.7L102.1 159.2L98.2 160.8L96.4 163.6L94.5 163.3L94.2 166.9L92.5 168L93 168.9L91.7 169.3L91.7 170.2L90.1 171.5L88 170.4L87.2 172.1L84.2 173.8L82.4 173.8L81.9 175.1L82.1 177.2L83.6 178L85.1 180.7L85.1 183.1L86.1 183.4L86.4 186.1L85.8 187.4L88.3 191.3L87.6 192.2L88 193.7L86.6 194.5L86.3 196.6L88 198.9L88.2 201.2L86.5 203.6L85.4 203.6L86.6 206.1L83.6 206.4L83.7 208.3L83 208.6L79.2 206.6L80 208L78.4 210.5L79 211.4L76.1 211L76.5 213L80.8 216.7L80.5 217.9L82.3 218.6L83.7 220.1L83.2 222.4L86 225.8L84.7 225.8L84.8 227L83.1 227.3L82.3 229L77.1 230.3L77.1 231.8L78.7 231.6L80 234L78.9 236.5L79.6 237.7L76.8 240.1L77.9 241.9L76.8 246L82.2 248.2L81.8 249.2L83.1 251.2L81.4 253.4L82.3 254.2L81.1 255.2L84.3 257.4L85.5 256.7L94.1 258.7L94.8 257.9L101.4 258.3L103.7 256.6L104.9 257L105.9 255.8L107.8 255.4L108.5 254L106.8 252.7L108.5 251.7L107.2 250.1L107.6 249L106.5 248.6L106.7 247.6L103.8 245.8L107.7 245L108.4 242.6L110.6 240.8L113.1 241L115 239.8L115.8 236.2L118.5 232.9L117.4 231.1L118.6 229.4L117.3 228.1L118.3 227.8L118.3 226.5L116.8 223.5L119 223.5L119.7 222.3L121.8 222L122.5 220.7L119.4 210.4L119.8 207.8L118.8 206.4L119 193.9L119.7 189.6L120.9 187L120.3 182.2L115.6 183.1L112.2 182.6L111.7 185.3L109.8 184.7L109.7 183.7L108.5 185.3L106.3 186.1L102.6 184.2L103.4 184.4L103.6 183.3L102.7 181.1L102.6 176.5L103.2 175.7L105.3 175.6L107 166.1L108.1 163.7L109.7 163.1L107.4 162.5L106.7 161.5L105.6 161.9L105.6 163.4L104.5 163.1L103.9 162.7L103.9 160.4L102.4 159.7Z',
      label: [103, 190], cap: [92, 206], color: '#a78bfa'
    },
    {
      k: 'SP', name: 'Südprovinz', capital: 'Galle', pop: 2.60, gdpShare: 10,
      poverty: 20, council: 'seit 2019 ohne gewählten Rat',
      ethnic: { sinhala: 95, tamil: 2, muslim: 3, other: 0 },
      note: 'Tourismus, Fischerei, der Hafen Hambantota. Politisch traditionell entscheidend für nationale Mehrheiten.',
      path: 'M169.2 272.9L168.7 272.3L168 273.8L166.6 274.6L165.3 274.3L158.7 279L159.2 281.5L158.3 282.6L158.3 285.8L155.4 284.9L152.6 286L152 285.2L151 286.7L142.7 289.2L140.8 291.2L135.6 286L133.5 287.1L132.5 286.7L132 284.5L129.2 285.1L126.9 284.7L126.1 285.7L125.1 284.9L124.8 286.6L122.3 286.9L122 287.5L122.7 290.9L115.6 294.1L117.6 299.3L116.5 300L115.9 299.2L112 298.7L110 296.6L105.2 297.1L98.2 293.9L95.5 294L95.9 292.6L94.5 291.5L95.1 291.3L94.9 290.1L90.9 290.8L90.5 289.5L91.5 288.9L91.5 286.7L85.8 286.9L84.9 287.3L84.8 288.5L81.9 289L81.5 288.1L80 288.2L77.6 286.9L76.1 287.2L72.5 284.2L65.9 287L66.7 291.6L66.2 292.4L61.8 288.3L60.2 288.1L59.3 288.7L59.4 289.7L58 290.1L55.2 289L53.4 289.2L50 286.4L48.6 286.6L44.8 283.9L43.8 283.6L43.1 284.4L42.1 283.3L45.4 292L46.1 294.9L45.8 296.9L48.1 302.9L50.1 304.9L51 307.7L52.8 310.1L57.2 314L60.2 316.2L60.5 315.3L61.8 315.6L61.5 316.7L62.2 317.7L67.9 318.8L75.8 321.7L76.5 320.4L77.4 320.3L78.6 321L78.5 322.2L77.9 322.3L78.6 322.7L83.8 323.2L86.5 322.7L88.4 323.3L89.3 324.5L93.9 321.6L99.5 321.3L99.6 319.8L100.7 320.3L101.6 318.2L104.1 317.6L106.3 315.1L110.4 314.8L111.3 313.4L121.3 310.1L131.1 308.6L131.6 307.5L135.5 305.6L138.8 305.1L139.6 303.9L146.5 302.4L147.8 300.4L152.5 298.3L155.5 294.8L158.7 293.6L160.4 290.5L165.4 288.7L165.4 288L169.4 285.2L169.4 284L171.8 282.9L176.2 278.5L176.3 277.8L173.8 276.9L172.9 275.4L171 275.2L169.2 272.9ZM50.9 307.6L50.9 307.1L50.8 307.3L50.9 307.6ZM91 323.8L90.9 323.8L91 323.8Z',
      label: [111, 307], cap: [60, 314], color: '#34d399'
    },
    {
      k: 'NP', name: 'Nordprovinz', capital: 'Jaffna', pop: 1.15, gdpShare: 4,
      poverty: 32, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 3, tamil: 93, muslim: 3, other: 1 },
      note: 'Kern der ungelösten politischen Frage: Militärpräsenz, Landrückgabe, Verschwundene, Devolution. Zugleich mit Indien nur 50 km entfernt ein möglicher Handelsknoten.',
      path: 'M59.7 15.1L54.1 15.9L51.2 17.2L45.6 16.1L46 16.5L41.9 17.1L36.2 19.9L35.9 21.2L37 22.3L34.9 22.5L35.5 20.5L32.5 20.9L31.9 21.9L32.4 23.7L31.5 24.8L33.9 25.5L34.8 24.7L34.9 22.6L37 22.3L38.5 26.4L39.6 26.7L40.6 25.3L41.7 27L43 26.7L43.6 28.7L41.9 32.1L42 30.9L40.6 31.1L37.3 29L38 28.7L37.8 27.3L35.4 28.2L34.4 25.9L33.3 26.3L32.2 25.4L30.8 25.5L33 30.6L34.8 31.8L32.5 33.1L31.1 32.2L29.3 32.9L29.2 31.7L28.6 31.6L28.3 34.5L26.8 33.6L27.5 35.3L27.8 34.6L27.9 35.5L32 36.2L32.5 33.1L34.8 31.9L35.8 32.4L37.1 31.1L40.8 32.7L41.9 32L41.5 33.3L40.5 33L42.2 33.9L43.7 32.5L43.8 31.3L43 30.6L43.7 30.6L42.8 29.9L43.6 28.7L44.7 29.9L46.8 29.7L50.9 32.3L53.7 33L49.2 30.2L49.2 29L57.1 34.2L59.5 35L56.7 33.4L57.4 31.9L55.6 31.8L56.6 31.9L56.1 31.7L56.7 30.8L56 31.2L55.3 30.1L56.5 29.3L69.4 36.3L74.1 41.2L73.8 42.9L70.4 44.6L69.7 43.7L70.2 44.1L69.5 44L69.5 45.1L67.6 44.6L65 45.1L62.7 44.1L64.9 43.5L62.6 41.9L62.6 41.1L65.4 41.9L63.8 40.5L62.4 40.2L61.3 38.9L60.4 38.7L60.3 39.4L58.5 38.6L58.5 37.4L58.3 38.2L56.5 38.2L53.1 35.5L52.1 35.7L51.2 34.5L48.2 33.7L48 32.8L47.2 33.8L54.4 38.6L57.7 43L54.7 46.5L47.4 50.2L48.1 54.9L50.3 55.3L52.8 57.6L51.8 59.4L52.6 60.5L52.5 64.4L51.5 65.3L51 68.5L49.4 70.1L48.4 76.2L46.4 79.8L44.4 80.1L42.5 81.5L42.2 82.9L39.7 84.4L39.6 85.6L37.2 85.3L37.4 86.5L35.6 85.6L36.5 85.7L36.6 87.3L36.3 86L36.9 86.3L38 89.1L37.4 88.8L37.7 91.1L37 95.5L36.4 95.3L40 102.8L39.3 104.1L39 110.3L36.8 113.6L37 115.3L38.3 116.2L39.1 115.8L43.1 117L46.3 118.7L47.3 118.6L47.5 114.3L47.6 109.6L46.6 106.8L49.4 108.4L52.2 108.8L61.5 106.3L61.6 110.4L62.7 111.5L64.6 111.9L65.6 115.9L69.5 117L70.7 114.9L72.7 114.2L72.8 111L74.3 110L76.3 106.9L78.3 105.3L82.7 108.1L83.8 108L93.9 97.8L94 96.9L92 93.9L89.4 93.2L89.7 91.4L95 91.3L98.9 89L102.1 88.5L102.6 86.1L103.7 85.3L108.2 84.2L110.7 84.4L114 82.2L118.6 82.2L111.7 70.4L109 62.8L106.3 57.9L95.6 48L71.6 28.7L65.3 20.5L63 16L59.7 15.1ZM22.2 72.5L19.5 73.3L19.1 74L19.5 73.8L19.9 74.8L18.6 75.1L22.1 75.3L27.4 77.6L31.7 80.8L34.5 84.2L34.1 83.4L35 84.1L37.5 83L33.2 78.6L37.5 80.2L32.4 75.3L27 73.3L22.2 72.5ZM16.7 37.2L16 37.9L16.3 41.2L20.2 43.5L21.6 43.5L22.3 42.2L21.6 39.5L19.2 39.1L16.7 37.2ZM42.3 56.9L41.1 58.4L42.7 58.7L43.3 59.7L43.7 58.5L43 58.2L43.2 59.5L42.3 56.9ZM26.3 26.8L24.8 29.1L25.6 30.2L26.6 28.5L26.3 26.8ZM25.4 32L24.6 33.2L24.7 34.5L25.6 34.9L25.4 32ZM35.7 84.1L34.7 84.6L35.5 85.3L35.7 84.1ZM28.6 26.6L28.7 24.5L28.2 26.2L28.6 26.6ZM49 55.6L49.4 56.4L50.3 56.5L49 55.6Z',
      label: [77, 75], cap: [45, 29], color: '#f43f5e'
    },
    {
      k: 'EP', name: 'Ostprovinz', capital: 'Trincomalee', pop: 1.75, gdpShare: 6,
      poverty: 27, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 23, tamil: 39, muslim: 37, other: 1 },
      note: 'Die einzige Provinz ohne Bevölkerungsmehrheit. Jede Entscheidung über Zusammenlegung mit dem Norden trifft hier drei Gemeinschaften gleichzeitig.',
      path: 'M115.9 82.1L112.6 82.6L110.7 84.4L108.2 84.2L103.7 85.3L102.6 86.1L102.1 88.5L104.5 87.3L106.5 87.7L112.2 91.4L114.4 94.3L112.1 97.9L111.8 99.6L114.4 106.2L112.9 109.1L112.9 111L114.5 111.9L114.5 113.5L117 116.2L117.2 120L118.5 120.7L118.5 121.6L120.7 122L120.4 123.1L119.2 123.1L115.7 129.2L115.7 132.4L117.4 134.7L119.7 135.4L120.3 138.6L124.2 138.1L127.3 138.6L129.7 139.9L131.1 139.3L134.2 141.7L137 142.1L137 145.6L137.8 145.9L136.2 148.1L139.3 147.8L140.7 142.2L142.2 141.6L143.1 139.8L145.6 140.3L145.1 157.8L147.7 164.5L147.7 165.1L146.7 165.3L143.7 164.2L141 165.1L139.7 166.3L138.7 174.2L140 180.6L139.5 182L140 185.3L138.7 185.9L137.9 188.3L136.4 187.1L136 187.7L135 186.4L134.6 188.3L133.1 188.3L132.7 187.1L129.3 186.9L128.7 185L129.8 184.3L129.5 182.1L127.9 181.5L126.4 182.4L125.2 180.9L125.6 182L124.2 183.5L123.9 182.3L122.9 182.8L121.8 181.4L120.3 181.8L120.9 187L119.6 190L122.3 192.2L122.3 195.5L124.3 199.2L127.3 198.7L130.7 195.6L133.8 194.3L135.9 193.8L137.2 195L136.7 202L135.5 204.1L137 208.2L136.4 209.4L138.4 212.8L139.7 212L141.7 214.5L143.4 220L146.3 218.2L146.2 212.4L149.8 212L149.6 211L151.3 209.9L150.4 206.8L152.9 206.2L152.9 205L156.7 202.8L158.6 203.1L157.3 205.3L158.5 205.8L158.1 208L159.5 212.6L158.5 213.5L161.8 216.4L162.3 219.1L161.8 219.9L164.6 221.8L162 223.5L160.3 226.6L161.3 228.3L161.4 231L169.1 233.8L169.5 235.2L168.6 236.8L169.7 239.2L169.4 240.6L170.9 242.3L170.2 246.2L168.7 272.3L171 275.3L172.9 275.4L173.8 276.9L176.3 277.8L178.9 272.7L180.7 271L180.5 270.1L181.9 267L181.5 265.1L185.7 257.7L185.4 253.9L186.7 252L186.2 250.4L187.2 249.2L187 246.4L189.8 237.3L188.1 230.9L188.8 213.6L186.6 206.3L185.4 204.6L183.1 193.3L180.5 187.5L175.9 179.8L172 177.5L169.6 173.6L168.3 173.9L166.3 171.9L165.2 167.9L165.6 166.6L166.7 166.4L165.2 165.9L163.3 163.2L164.3 160.7L162.3 161.3L159.7 159.3L158.2 157L157 151.4L155.5 149.2L155.3 146L153.4 142.4L151.5 134L151.8 131.7L150.9 130.1L148.8 120.9L146.1 118.6L144.7 119.9L143.1 120L143.7 121.7L142.9 123.3L139.2 123.7L137.2 123L136.1 120.2L134.5 119.5L132.9 120L132 121.5L131.2 121.1L130.6 119.9L132.3 118.8L133.1 116.9L135.1 118.6L135.6 117.8L135.7 119.7L137.8 119.9L137 117.2L136.1 117.1L137.3 116.3L136.2 116.2L136.8 114.4L137 115.2L138.4 113.9L137.4 115.4L138.7 114.6L139.4 115.4L138.5 117.1L139.3 116.9L138.9 117.8L140.4 116.9L139.8 115L140.4 114.1L139.4 114.3L138.4 112L138.8 108.4L134.8 102.2L129.9 96.6L127.4 91.5L126.4 92.4L124.3 90.6L121.8 86L121 85.8L118.6 82.2L115.9 82.1ZM157.4 151.3L157.3 151.4L157.4 151.4L157.4 151.3Z',
      label: [159, 184], cap: [138, 115], color: '#fb923c'
    },
    {
      k: 'NW', name: 'Nordwestprovinz', capital: 'Kurunegala', pop: 2.50, gdpShare: 10,
      poverty: 19, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 85, tamil: 3, muslim: 11, other: 1 },
      note: 'Kokos, Reis, Garnelenzucht. Bevölkerungsreich und deshalb bei jeder Wahl ein Schwergewicht.',
      path: 'M38 116L36.9 115.3L36.6 116.7L33.1 117.7L32.6 124.3L31.4 125.3L30.9 126.8L31.2 132.4L30.1 134.5L30.2 137.1L28.9 138.9L28.4 141.3L26.8 141.7L28.4 142.4L27 142.1L29.1 143.8L29.1 147.2L30.2 148.2L30.3 149.8L29.2 150.3L28.7 152.3L27.6 153.5L26.8 153.3L27.6 154.1L27.1 154.5L26.8 153.9L27 154.7L30.3 158.7L30.1 159.8L29 160.6L29.5 162L23.8 160.9L22.6 158.9L23.3 157.4L23.1 155.8L24.1 155.1L22.2 153.3L22.6 151.6L22 149.2L22.8 148.7L23.6 145.7L22.7 144.2L24.2 142.3L25.2 142.9L24.9 141L25.8 139.5L25 139.3L22.2 142.1L22.8 140.3L24 140.5L24.8 138.9L24.2 138.5L23.7 139.2L24.4 138.2L23.9 137.6L25.1 136.3L24.3 136.2L26.4 131.3L26 130.3L26.8 129.8L25.6 130.3L22.5 141.6L19.2 143.6L20.2 147.8L20.3 155.6L24.2 168.7L27.3 182.8L27.6 188.9L27.4 190.7L26.5 191.2L26.7 196L30.8 217.5L32.8 217.7L33.4 216.8L34.7 217.5L35.4 216.9L36.1 217L36 218.1L36.6 217.2L37.6 217.5L37.3 216.6L39 217.5L39.8 216.8L39.4 216.2L41.4 216L43.8 213.7L45.3 214L45.6 215.2L46.9 215.4L47.8 216.7L52.9 213L54.8 214.3L54.4 215.1L57.6 218.5L59 218.7L64.9 214L67.9 213.7L68.2 213.1L69.6 213.7L70.5 212.3L69.9 211.3L71 210.9L70.3 208.5L73.8 207.8L75.3 208.8L75.5 210.9L78.8 211.5L78.4 210.5L80 208L79.2 206.6L83 208.6L83.7 208.3L83.6 206.4L86.6 206.1L85.4 203.6L86.5 203.6L88.2 201.2L88 198.9L87.2 198.5L86.3 195.5L87.1 193.8L88 193.7L87.6 192.2L88.3 191.3L85.8 187.4L86.4 186.1L86.1 183.4L85.1 183.1L85.1 180.7L83.6 178L82.1 177.2L82.3 174.6L80.9 174L79.8 171.9L80.6 169.5L79.4 167.3L79.1 164.4L78.2 163.7L77.1 164.4L75.8 164.1L76.4 163L75.6 159.6L75.9 156.6L74.8 155.7L73.8 156.3L72 155.6L67.3 150.8L64 151L62.9 149.6L52.7 145.8L49.3 142.5L48.1 142.8L46.1 141.4L45 142.3L43.2 142.1L41.2 133.4L39.4 130.9L39.7 128.9L41.7 128.5L42.3 126.8L44.7 124.9L46.6 120.7L45.8 118.5L43.3 117.1L38 116ZM26.7 116.9L25.7 120.4L26.5 123L28.1 124.9L28.4 128.2L28.3 124.7L26.9 123.4L26.1 121.1L26.7 116.9ZM28 133.3L27.6 133.1L28.3 134.9L28.8 134.6L28 133.3ZM26 145.1L25.7 144.9L24.1 146.4L26 145.1Z',
      label: [55, 178], cap: [71, 200], color: '#60a5fa'
    },
    {
      k: 'NC', name: 'Nordzentralprovinz', capital: 'Anuradhapura', pop: 1.40, gdpShare: 5,
      poverty: 22, council: 'seit 2018 ohne gewählten Rat',
      ethnic: { sinhala: 91, tamil: 2, muslim: 7, other: 0 },
      note: 'Trockenzone mit den historischen Bewässerungstanks und den buddhistischen Stätten. Chronische Nierenerkrankung unbekannter Ursache ist hier ein großes Gesundheitsproblem.',
      path: 'M105.1 87.5L98.9 89L95.3 91.2L89.7 91.4L89.4 93.2L92 93.9L94 96.9L93.9 97.8L83.8 108L82.7 108.1L78.3 105.3L76.3 106.9L74.3 110L72.8 111L72.7 114.2L70.7 114.9L69.5 117L65.6 115.9L64.6 111.9L62.7 111.5L61.6 110.4L61.5 106.3L52.2 108.8L49.4 108.4L46.6 106.8L47.6 109.6L47.3 118.6L45.8 118.5L46.6 120.7L45.7 123.3L44.4 125.3L42.3 126.8L41.7 128.5L39.7 128.9L39.5 130.9L41.2 133.4L43.2 142.1L45 142.3L46.1 141.4L48.1 142.8L49.3 142.5L52.7 145.8L62.9 149.6L64 151L67.3 150.8L72 155.6L73.8 156.3L74.8 155.7L75.9 156.6L75.6 159.6L76.4 163L75.8 164.1L77.1 164.4L78.2 163.7L79.1 164.4L79.4 167.3L80.6 169.5L79.8 171.9L81 174.1L82.3 174.6L82.4 173.8L84.2 173.8L87.2 172.1L88 170.4L90.1 171.5L91.7 170.2L91.7 169.3L93 168.9L92.5 168L94.2 166.9L94.5 163.3L96.4 163.6L98.2 160.8L102.1 159.2L103.9 160.4L103.9 162.7L104.5 163.1L105.6 163.4L105.6 161.9L106.7 161.5L107.4 162.5L109.7 163.1L108.1 163.7L107 166.1L105.3 175.6L103.2 175.7L102.6 176.5L102.7 181.1L103.6 183.3L103.4 184.4L102.5 184.2L103.4 185.1L105.9 185.5L106.3 186.1L108.5 185.3L109.7 183.7L109.8 184.7L111.7 185.3L112.2 182.6L115.9 183.1L119.6 182.5L121.7 181.4L122.9 182.8L124.1 182.4L124.2 183.5L125.6 182L125.3 180.9L126.4 182.4L127.9 181.5L129.5 182.1L129.8 184.3L128.7 185L129.3 186.9L132.7 187.1L133.1 188.3L134.6 188.3L135 186.4L137.8 188.4L138.7 185.9L140 185.3L139.5 182L140 180.6L138.7 174.2L139.7 166.3L141 165.1L143.7 164.2L145.1 165.1L147.7 165.1L147.3 162.5L145.1 157.8L145.7 140.4L143.6 139.4L143.1 139.8L142.2 141.6L140.7 142.2L139.3 147.8L137.2 148.4L136.2 148L137.8 145.9L137 145.6L137.3 143.2L136.6 141.8L134.2 141.7L131.1 139.3L129.7 139.9L127.3 138.6L124.2 138.1L120.2 138.5L119.7 135.4L117.4 134.7L115.5 131.1L115.7 129.2L117.7 125.5L119.3 123.1L120.4 123.1L120.7 122L118.5 121.6L118.5 120.7L117.2 120L117 116.2L114.5 113.5L114.5 111.9L112.9 111L112.9 109.1L114.4 106.2L111.8 99.6L112.1 97.9L114.4 94.3L111.3 90.6L105.1 87.5Z',
      label: [96, 151], cap: [75, 136], color: '#fbbf24'
    },
    {
      k: 'UV', name: 'Uva-Provinz', capital: 'Badulla', pop: 1.30, gdpShare: 5,
      poverty: 30, council: 'seit 2019 ohne gewählten Rat',
      ethnic: { sinhala: 72, tamil: 20, muslim: 7, other: 1 },
      note: 'Die ärmste Provinz nach Kopfeinkommen. Tee, Zuckerrohr, schlechte Verkehrsanbindung.',
      path: 'M119.8 190.3L119 194.1L118.8 206.4L119.8 207.8L119.4 210.4L122.5 220.7L121.8 222L119.7 222.3L119 223.5L116.8 223.5L118.3 226.5L118.3 227.8L117.3 228.1L118.6 229.4L117.4 231.1L118.5 232.9L115.8 236.2L115 239.8L113.1 241L110.6 240.8L108.4 242.6L107.7 245L106.5 245.6L104.2 245.3L103.7 245.9L106.7 247.6L106.5 248.6L107.6 249L107.2 250.1L108.5 251.5L106.8 252.6L107.3 253.7L108.5 253.9L108.2 254.9L106.3 255.6L106.7 258.5L107.7 258.1L108.5 259.3L110.1 259.5L109.7 261.3L106.7 262.5L107.9 265.3L110.1 266.2L114 264.6L114.8 263.1L115.6 263.8L114.4 265L113.6 267.7L111.5 269.8L111.6 271.2L111 271.3L110.3 273.8L110.7 274.5L107.9 279.4L108.8 281.8L109.1 287.6L110.9 290L113.7 290.9L113.9 292.7L115.4 294.8L117.1 293.1L118.6 293.1L119.1 292L119.8 292.5L122.7 290.9L122 287.5L122.3 286.9L124.8 286.6L125.1 284.9L126.1 285.7L126.9 284.7L129.2 285.1L132 284.5L132.5 286.7L133.5 287.1L135.6 286L140.8 291.2L142.7 289.2L151 286.7L152 285.2L152.6 286L155.4 284.9L158.3 285.8L158.3 282.6L159.2 281.5L158.7 279L162.1 277L162.9 275.7L163.9 275.7L165.4 274.3L166.6 274.6L168.6 272.9L170.2 246.2L171 242.4L169.4 240.6L169.7 239.2L168.6 236.8L169.5 235.2L169.1 233.8L161.4 231L161.3 228.3L160.3 226.6L162 223.5L164.6 221.8L161.8 219.9L162.3 219.1L161.8 216.4L158.5 213.5L159.5 212.6L158.1 208L158.5 205.8L157.3 205.3L158.5 203L156.7 202.8L152.9 205L152.9 206.2L150.4 206.8L151.3 209.9L149.6 211L149.8 212L146.2 212.4L146.3 218.2L143.4 220L141.7 214.5L139.7 212L138.4 212.8L136.4 209.4L137 208.2L135.5 204.1L136.7 202L137.2 195L135.9 193.8L133.8 194.3L130.7 195.6L127.3 198.7L124.3 199.2L122.3 195.5L122.3 192.2L119.8 190.3Z',
      label: [139, 257], cap: [126, 240], color: '#f472b6'
    },
    {
      k: 'SG', name: 'Sabaragamuwa', capital: 'Ratnapura', pop: 2.00, gdpShare: 7,
      poverty: 24, council: 'seit 2019 ohne gewählten Rat',
      ethnic: { sinhala: 86, tamil: 9, muslim: 5, other: 0 },
      note: 'Edelsteine, Kautschuk, Tee. Erdrutschgefährdet und bei jedem Monsun in den Katastrophenmeldungen.',
      path: 'M74 208.1L70.2 208.5L71 210.9L69.9 211.3L70.5 212.3L69.6 213.7L68.2 213.1L63.1 215.1L58.5 218.7L58.9 219.7L57.8 220.5L57.4 223.8L55.9 223.8L55.6 224.5L54.6 224.2L55.9 229.2L56.8 228.3L59.8 228.7L58.4 231.2L57.7 230.9L56 234.7L57.4 239.3L57.2 240.9L60.1 241L60.6 243.1L60.5 244.1L59.4 244L59.7 245.7L57.9 247.1L56.9 250.2L58.4 250.8L59 252.5L58.7 253.8L57.1 253.6L59.3 260.2L58.7 260.7L60.1 263.5L62.7 266.1L63.1 268.6L65.2 269.3L66.9 271.1L67.7 273L66.2 273.6L67 275.6L72.9 284.4L75.9 287.1L77.6 286.9L80 288.2L81.5 288.1L82.5 289L84.8 288.5L84.9 287.3L85.8 286.9L91.5 286.7L91.5 288.9L90.5 289.5L90.9 290.8L94.9 290.1L95.1 291.3L94.5 291.5L95.9 292.6L95.5 294L98.2 293.9L105.2 297.1L110 296.6L112 298.7L115.9 299.2L116.5 300L117.5 299.2L113.9 292.7L113.7 290.9L110.9 290L109.1 287.6L108.8 281.8L107.9 279.4L110.7 274.5L110.3 273.8L111 271.3L111.6 271.2L111.5 269.8L113.6 267.7L114.4 265L115.6 263.7L114.8 263.1L114 264.6L110.1 266.2L107.9 265.3L106.7 262.5L109.7 261.3L110.1 259.5L108.5 259.3L107.7 258.1L106.7 258.5L106.3 255.6L105 257L103.7 256.6L101.4 258.3L94.8 257.9L94.1 258.7L85.5 256.7L84.3 257.4L81.5 255.9L81.1 255L82.3 254.1L81.4 253.3L83.1 251.1L81.8 249.2L82.2 248.2L76.8 246L77.9 241.9L76.8 240.1L79.6 237.7L78.9 236.5L80 234L79 232.8L79.3 232.1L77.1 231.8L77 230.8L79.2 229.3L82.3 229L83.1 227.3L84.8 227L84.7 225.8L86 225.8L83.2 222.4L83.7 220.1L82.3 218.6L80.5 217.9L80.8 216.6L76.5 213L76.1 211L75.5 210.9L75.7 209.5L74 208.1ZM56 223L55.6 223.4L56.2 223.3L56 223Z',
      label: [88, 273], cap: [74, 264], color: '#a3e635'
    }
  ];
  G.PROV_BY_KEY = {};
  G.PROVINCES.forEach(function (p) { G.PROV_BY_KEY[p.k] = p; });

  /* --- 25 Distrikte --- */
  G.DISTRICTS = [
    { k: 'colombo',     name: 'Colombo',      prov: 'WP', pop: 2.42, note: 'Hauptstadtregion, Hafen, Finanzplatz.' },
    { k: 'gampaha',     name: 'Gampaha',      prov: 'WP', pop: 2.42, note: 'Industriegürtel, Flughafen Katunayake, Freihandelszonen.' },
    { k: 'kalutara',    name: 'Kalutara',     prov: 'WP', pop: 1.30, note: 'Kautschuk, Küstentourismus.' },
    { k: 'kandy',       name: 'Kandy',        prov: 'CP', pop: 1.47, note: 'Zahntempel, Universität Peradeniya, medizinisches Zentrum.' },
    { k: 'matale',      name: 'Matale',       prov: 'CP', pop: 0.51, note: 'Gewürze, Trockenzonenlandwirtschaft.' },
    { k: 'nuwaraeliya', name: 'Nuwara Eliya', prov: 'CP', pop: 0.75, note: 'Kernland der Malaiyaha-Tamilen und der Teeplantagen.' },
    { k: 'galle',       name: 'Galle',        prov: 'SP', pop: 1.10, note: 'Hafen, Tourismus, Fischerei.' },
    { k: 'matara',      name: 'Matara',       prov: 'SP', pop: 0.85, note: 'Tee, Fischerei, südlichster Punkt.' },
    { k: 'hambantota',  name: 'Hambantota',   prov: 'SP', pop: 0.68, note: 'Chinesisch betriebener Tiefwasserhafen, Industriezone, Salz.' },
    { k: 'jaffna',      name: 'Jaffna',       prov: 'NP', pop: 0.62, note: 'Kulturelles Zentrum der srilankischen Tamilen, starke Diaspora-Bindung.' },
    { k: 'kilinochchi', name: 'Kilinochchi',  prov: 'NP', pop: 0.13, note: 'Ehemaliges LTTE-Verwaltungszentrum, hohe Kriegsschäden.' },
    { k: 'mannar',      name: 'Mannar',       prov: 'NP', pop: 0.11, note: 'Fährverbindung nach Indien, Windkraftpotenzial, Massengräber.' },
    { k: 'vavuniya',    name: 'Vavuniya',     prov: 'NP', pop: 0.19, note: 'Verkehrsknoten zwischen Norden und Süden.' },
    { k: 'mullaitivu',  name: 'Mullaitivu',   prov: 'NP', pop: 0.10, note: 'Schauplatz der letzten Kriegsphase 2009, höchste Militärdichte.' },
    { k: 'trincomalee', name: 'Trincomalee',  prov: 'EP', pop: 0.44, note: 'Einer der besten Naturhäfen der Welt, Öltanklager, strategisch umkämpft.' },
    { k: 'batticaloa',  name: 'Batticaloa',   prov: 'EP', pop: 0.56, note: 'Lagunen, Fischerei, tamilisch geprägt.' },
    { k: 'ampara',      name: 'Ampara',       prov: 'EP', pop: 0.75, note: 'Dreigeteilt zwischen Muslimen, Tamilen und Sinhalesen, Reiskammer.' },
    { k: 'kurunegala',  name: 'Kurunegala',   prov: 'NW', pop: 1.75, note: 'Bevölkerungsreichster Distrikt außerhalb der Westprovinz.' },
    { k: 'puttalam',    name: 'Puttalam',     prov: 'NW', pop: 0.85, note: 'Salz, Garnelen, große muslimische Bevölkerung, Vertriebene von 1990.' },
    { k: 'anuradhapura',name: 'Anuradhapura', prov: 'NC', pop: 0.94, note: 'Antike Hauptstadt, Bewässerungslandwirtschaft, CKDu-Schwerpunkt.' },
    { k: 'polonnaruwa', name: 'Polonnaruwa',  prov: 'NC', pop: 0.45, note: 'Reisanbau, Welterbestätte.' },
    { k: 'badulla',     name: 'Badulla',      prov: 'UV', pop: 0.88, note: 'Tee, Bahnstrecke ins Hochland, hohe Armut.' },
    { k: 'monaragala',  name: 'Monaragala',   prov: 'UV', pop: 0.50, note: 'Ärmster Distrikt des Landes, Zuckerrohr, Mensch-Elefant-Konflikt.' },
    { k: 'ratnapura',   name: 'Ratnapura',    prov: 'SG', pop: 1.14, note: 'Edelsteine, Kautschuk, hohes Erdrutschrisiko.' },
    { k: 'kegalle',     name: 'Kegalle',      prov: 'SG', pop: 0.86, note: 'Kautschuk, Gewürze, dicht besiedeltes Hügelland.' }
  ];

  /* --- Kommunalebene (aggregiert) --- */
  G.LOCAL = {
    municipal: 29,   /* Municipal Councils */
    urban: 36,       /* Urban Councils */
    pradeshiya: 276, /* Pradeshiya Sabhas */
    total: 341,
    note: 'Kommunalwahlen fanden zuletzt im Mai 2025 statt. Die Kommunen haben Aufgaben, aber kaum eigene Einnahmen.'
  };

  /* --- Aufgabenbereiche fuer die Kompetenzmatrix --- */
  G.COMPETENCES = [
    { k: 'police', label: 'Polizei und öffentliche Ordnung', current: 'nation',
      d13: true, sensitive: true,
      note: 'Der 13. Verfassungszusatz sieht Provinzpolizeikräfte vor. Sie wurden nie eingerichtet. Für tamilische Parteien ist das der Kern der Devolutionsfrage, für nationalistische Kräfte eine rote Linie.',
      eff: { nation: { internalSec: 3, sinhalaPress: -4, trustTamil: -3 },
             province: { trustTamil: 14, reconcile: 8, sinhalaPress: 16, internalSec: -3, militaryMor: -6 },
             district: { trustTamil: 5, sinhalaPress: 6, internalSec: 1 },
             local: { internalSec: -6, corruption: -4, trustTamil: 3, sinhalaPress: 8 } } },
    { k: 'land', label: 'Landverwaltung und Landvergabe', current: 'nation',
      d13: true, sensitive: true,
      note: 'Formell devolviert, faktisch über die National Land Commission und Staatsbehörden zentral gesteuert. Landfragen im Norden und Osten sind seit Jahrzehnten Konfliktstoff.',
      eff: { nation: { sinhalaPress: -3, trustTamil: -5, reconcile: -3 },
             province: { trustTamil: 13, reconcile: 9, sinhalaPress: 14, agriProd: 2 },
             district: { trustTamil: 5, stateCap: 3, sinhalaPress: 5 },
             local: { corruption: -6, trustTamil: 4, sinhalaPress: 7 } } },
    { k: 'schoolPrimary', label: 'Grundschulen', current: 'province',
      note: 'Bereits weitgehend bei den Provinzen. Die Qualitätsunterschiede zwischen Colombo und dem Hochland sind trotzdem enorm.',
      eff: { nation: { education: 3, regionalBalance: 4, langAccess: -3 },
             province: { education: 2, langAccess: 4, trustTamil: 3 },
             district: { education: 1, stateCap: 2 },
             local: { education: -3, corruption: -3, legitimacy: 3 } } },
    { k: 'schoolSecondary', label: 'Weiterführende Schulen', current: 'nation',
      note: 'Nationale Schulen liegen beim Zentralstaat, Provinzschulen bei den Räten. Diese Zweiteilung zementiert Ungleichheit.',
      eff: { nation: { education: 4, regionalBalance: -3 },
             province: { education: 1, regionalBalance: 5, langAccess: 4 },
             district: { education: 2, regionalBalance: 3 },
             local: { education: -4, regionalBalance: 2 } } },
    { k: 'university', label: 'Hochschulen', current: 'nation',
      note: 'Zentral über die University Grants Commission. Zulassung nach Distriktquoten, was für sich schon eine Verteilungspolitik ist.',
      eff: { nation: { education: 4, skillsMatch: 2 },
             province: { education: -2, regionalBalance: 6, skillsMatch: 3 },
             district: { education: -4, regionalBalance: 4 },
             local: { education: -8, stateCap: -4 } } },
    { k: 'primaryHealth', label: 'Primärversorgung und Kliniken', current: 'province',
      note: 'Provinzsache. Personalmangel und Abwanderung von Pflegekräften treffen die Provinzen ungleich hart.',
      eff: { nation: { health: 2, regionalBalance: 3 },
             province: { health: 3, legitimacy: 3, trustTamil: 2 },
             district: { health: 2, stateCap: 2 },
             local: { health: -2, legitimacy: 4 } } },
    { k: 'hospitals', label: 'Krankenhäuser der Vollversorgung', current: 'nation',
      note: 'Teaching Hospitals zentral, Basiskrankenhäuser provinziell. Bei Ausrüstung und Medikamenten entscheidet Colombo.',
      eff: { nation: { health: 5, regionalBalance: -2 },
             province: { health: 1, regionalBalance: 5 },
             district: { health: -1, regionalBalance: 4 },
             local: { health: -7, stateCap: -4 } } },
    { k: 'roads', label: 'Straßen und Verkehrswege', current: 'nation',
      note: 'Fernstraßen national, Nebenstraßen provinziell und kommunal. Nach Ditwah ist die Zuständigkeitsfrage sehr praktisch geworden.',
      eff: { nation: { infra: 4, regionalBalance: -3 },
             province: { infra: 2, regionalBalance: 4 },
             district: { infra: 2, regionalBalance: 3, stateCap: 2 },
             local: { infra: -2, corruption: -4, legitimacy: 4 } } },
    { k: 'water', label: 'Wasser und Abwasser', current: 'nation',
      note: 'Das National Water Supply and Drainage Board ist zentral. Ländliche Versorgung hängt an Kommunen und Gemeinschaftsprojekten.',
      eff: { nation: { housing: 3, infra: 2 },
             province: { housing: 2, regionalBalance: 3 },
             district: { housing: 2, stateCap: 2 },
             local: { housing: 3, legitimacy: 4, corruption: -3 } } },
    { k: 'waste', label: 'Abfall und Stadtreinigung', current: 'local',
      note: 'Kommunale Aufgabe. Die Mülldeponie Meethotamulla stürzte 2017 ein und tötete Dutzende Menschen.',
      eff: { nation: { stateCap: -2, housing: 1 },
             province: { housing: 2 },
             district: { housing: 2 },
             local: { housing: 3, legitimacy: 3, corruption: -2 } } },
    { k: 'agriculture', label: 'Landwirtschaft und Bewässerung', current: 'province',
      note: 'Große Bewässerungssysteme national, kleinere provinziell. Die Trennung führt regelmäßig zu Zuständigkeitslücken.',
      eff: { nation: { agriProd: 3, foodSec: 3 },
             province: { agriProd: 3, farmersTrust: 0, regionalBalance: 3 },
             district: { agriProd: 2, stateCap: 2 },
             local: { agriProd: -1, legitimacy: 3 } } },
    { k: 'fisheries', label: 'Fischerei und Küstenschutz', current: 'nation',
      note: 'Konflikte mit indischen Trawlern in der Palkstraße machen daraus zugleich Außenpolitik.',
      eff: { nation: { maritimeSec: 4, relIndia: 2 },
             province: { maritimeSec: -2, trustTamil: 4, regionalBalance: 2 },
             district: { maritimeSec: -1, regionalBalance: 2 },
             local: { maritimeSec: -4, legitimacy: 3 } } },
    { k: 'business', label: 'Gewerbeaufsicht und Genehmigungen', current: 'nation',
      note: 'Ein Unternehmer braucht heute Genehmigungen von mehreren Ebenen gleichzeitig. Genau das schreckt Investoren ab.',
      eff: { nation: { privateSector: 3, corruption: 2 },
             province: { privateSector: 1, regionalBalance: 4 },
             district: { privateSector: 3, stateCap: 3 },
             local: { privateSector: -3, corruption: -5 } } },
    { k: 'disaster', label: 'Katastrophenschutz', current: 'nation',
      note: 'Das Disaster Management Centre ist zentral. Bei Ditwah zeigte sich, dass ohne lokale Kapazität die ersten 48 Stunden verloren gehen.',
      eff: { nation: { disasterPrep: 3, climateRes: 2 },
             province: { disasterPrep: 3, climateRes: 2 },
             district: { disasterPrep: 5, climateRes: 3, stateCap: 2 },
             local: { disasterPrep: 4, legitimacy: 4, climateRes: 2 } } },
    { k: 'taxation', label: 'Eigene Steuern und Abgaben', current: 'nation',
      d13: true,
      note: 'Provinzen dürfen laut Verfassung bestimmte Steuern erheben, tun es aber kaum. Ohne eigene Einnahmen bleibt Devolution eine leere Hülle.',
      eff: { nation: { taxCompl: 3, regionalBalance: -4 },
             province: { taxCompl: -2, regionalBalance: 6, trustTamil: 8, sinhalaPress: 9, stateCap: -2 },
             district: { taxCompl: -1, regionalBalance: 4 },
             local: { taxCompl: -4, corruption: -5, regionalBalance: 3, legitimacy: 3 } } },
    { k: 'housing', label: 'Wohnungsbau', current: 'nation',
      note: 'Nach Ditwah wurden bis zu 5 Mio. LKR pro zerstörtem Haus zugesagt. Die Abwicklung entscheidet über die Glaubwürdigkeit.',
      eff: { nation: { housing: 4, regionalBalance: -2 },
             province: { housing: 3, regionalBalance: 3 },
             district: { housing: 3, stateCap: 2 },
             local: { housing: 2, legitimacy: 5, corruption: -3 } } },
    { k: 'culture', label: 'Kultur, Sprache und Gedenken', current: 'nation',
      sensitive: true,
      note: 'Wer über Denkmäler, Gedenktage und Ortsnamen entscheidet, entscheidet über die Erzählung des Krieges.',
      eff: { nation: { sinhalaPress: -4, trustTamil: -6, reconcile: -4 },
             province: { trustTamil: 10, reconcile: 7, sinhalaPress: 11, langAccess: 5 },
             district: { trustTamil: 4, langAccess: 3, sinhalaPress: 4 },
             local: { trustTamil: 6, langAccess: 4, sinhalaPress: 6, legitimacy: 3 } } }
  ];

  /* --- Formeln fuer den Finanzausgleich --- */
  G.TRANSFER_FORMULAS = [
    { k: 'status', label: 'Fortschreibung wie bisher',
      desc: 'Jede Provinz erhält ungefähr das, was sie im Vorjahr bekam. Bequem, aber zementiert bestehende Ungleichheit.',
      eff: { regionalBalance: -2, stateCap: 1, sinhalaPress: 0 }, weights: null },
    { k: 'percapita', label: 'Reine Kopfpauschale',
      desc: 'Gleicher Betrag pro Kopf. Wirkt fair, benachteiligt aber dünn besiedelte und kriegszerstörte Gebiete mit hohen Stückkosten.',
      eff: { regionalBalance: 2, trustTamil: -2 }, weights: { pop: 1 } },
    { k: 'need', label: 'Bedarfsorientiert (Armut und Rückstand)',
      desc: 'Verteilung nach Armutsquote, Infrastrukturlücke und Kriegsschäden. Der Norden, der Osten und Uva gewinnen deutlich.',
      eff: { regionalBalance: 7, trustTamil: 7, trustHill: 6, sinhalaPress: 7 }, weights: { pop: 0.5, poverty: 1.4 } },
    { k: 'equalise', label: 'Finanzausgleich mit Mindestausstattung',
      desc: 'Jede Provinz erhält eine garantierte Grundausstattung pro Kopf, darüber hinaus wird nach Bedarf ausgeglichen. Vorbild sind föderale Ausgleichssysteme.',
      eff: { regionalBalance: 9, trustTamil: 8, trustHill: 7, sinhalaPress: 9, stateCap: 2 }, weights: { pop: 0.8, poverty: 1.0 } },
    { k: 'performance', label: 'Leistungsorientiert',
      desc: 'Mehr Geld für Provinzen, die Ziele erreichen und sauber abrechnen. Belohnt starke Verwaltungen und bestraft schwache doppelt.',
      eff: { regionalBalance: -4, stateCap: 6, corruption: 4, trustTamil: -4 }, weights: { pop: 0.7, gdp: 0.6 } }
  ];

})(SL.data.geo = SL.data.geo || {});
