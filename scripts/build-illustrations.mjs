/* Original local SVG study aids. Existing PNG artwork always takes precedence. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readWindowData } from './lib/content-files.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shapes = {
  school: '<path d="M16 76V32h64v44M10 32 48 12l38 20M40 76V56h16v20"/><path d="M26 42h8m28 0h8M26 54h8m28 0h8"/><circle cx="48" cy="32" r="7"/>',
  bank: '<path d="m10 32 38-20 38 20ZM14 78h68M20 38v34m18-34v34m20-34v34m18-34v34"/><circle cx="48" cy="24" r="3"/>',
  glove: '<path d="M28 78 18 54q-4-12 4-12l10 12V26q0-10 8-8v28-30q2-8 8-2v32-32q4-8 8 0v32-26q8-6 8 4v28q8-16 14-8l-8 26-12 12Z"/>',
  sandal: '<path d="M18 36q30-22 60 0v20q-30 16-60 0ZM28 62v14m38-14v14M30 36l18 14 18-14"/>',
  rice: '<path d="M16 46h64Q76 74 48 76 20 74 16 46Z"/><path d="M22 44q-6-14 8-16 0-16 18-12 18-4 18 12 14 2 8 16M35 78h26"/>',
  book: '<path d="M48 28Q28 16 12 26v50q18-10 36 0 18-10 36 0V26Q66 16 48 28v48M22 38l16-2m-16 12 16-2m20-10 16 2m-16 8 16 2"/>',
  bicycle: '<circle cx="24" cy="64" r="17"/><circle cx="74" cy="64" r="17"/><path d="m24 64 18-32 16 32H24l12-22h28l10 22-14-44h12M34 32h16"/>',
  coin: '<circle cx="48" cy="48" r="32"/><circle cx="48" cy="48" r="23"/><path d="m38 32 10 12 10-12M48 44v22M37 48h22M37 56h22"/>',
  elephant: '<path d="M14 70V40q0-20 24-20h22q22 0 22 22v26q0 14-14 10V50M24 68v12m28-12v12"/><path d="M54 28q-26-8-22 20t28 4"/><circle cx="69" cy="37" r="2"/>',
  dango: '<path d="m24 82 48-68"/><circle cx="36" cy="65" r="12"/><circle cx="50" cy="46" r="12"/><circle cx="64" cy="27" r="12"/>',
  nose: '<path d="M42 20 30 54q-4 14 18 10h14M54 76q-10 12 0 14 10-2 0-14"/><path d="M68 26q14 10 10 26"/>',
  moon: '<path d="M64 14a34 34 0 1 0 18 56A34 34 0 0 1 64 14Z"/><path d="m26 14 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/>',
  phone: '<path d="M18 16 34 30l-8 12q10 20 28 28l12-10 16 14q-10 20-28 10Q18 66 10 36 6 24 18 16Z"/>',
  acorn: '<path d="M26 40h44q2 38-22 44-24-6-22-44ZM22 40q0-26 26-26t26 26ZM48 14l8-10"/><path d="m30 28 8 8 10-12 10 12 8-8"/>',
  candy: '<path d="M30 30h36v36H30ZM30 34 10 22v50l20-10m36-28 20-12v50L66 62M40 30v36m16-36v36"/>',
  guitar: '<path d="m62 12 18 8-24 36q12 20-6 28-20 10-34-6-12-16 2-28 6-8 20-4Z"/><circle cx="40" cy="62" r="8"/><path d="m42 60 28-40"/>',
  game: '<path d="M28 30h40q12 0 18 32t-16 6L60 60H36l-12 10Q0 88 10 52q6-22 18-22Z"/><path d="M24 40v18m-9-9h18"/><circle cx="64" cy="44" r="3"/><circle cx="74" cy="52" r="3"/>',
  gorilla: '<path d="M18 46q-10-8-10 4t12 8M78 46q10-8 10 4T76 58M18 42q0-28 30-28t30 28v18q0 24-30 24T18 60Z"/><ellipse cx="48" cy="62" rx="22" ry="16"/><path d="M30 38h10m16 0h10M40 64h16"/>',
  lobster: '<path d="M48 74V32m-8 10h16m-16 12h16m-16 12h16M48 74 32 86h32ZM38 42 22 30m36 12 16-12M30 58 14 66m52-8 16 8"/><path d="M22 30Q2 30 14 12l8 10 8-12q10 18-8 20m52 0q20 0 8-18l-8 10-8-12q-10 18 8 20"/>',
  juice: '<path d="m28 22 4 60h32l4-60ZM24 22h48M52 50 60 8h18"/><circle cx="48" cy="58" r="10"/>',
  trousers: '<path d="M22 14h52l6 68H54l-6-40-6 40H16ZM24 28h48M48 14v28"/>',
  pudding: '<path d="M30 30h36l12 44q-30 12-60 0ZM30 30q18 12 36 0M14 82h68"/><path d="M34 22q-6-8 0-14m14 14q-6-8 0-14"/>',
  zombie: '<path d="M26 22h44v44H26ZM30 78l18-12 18 12M22 36H12m58 0h14M28 52l12 4m18-4 12-6"/><path d="M34 34h7m14 0h7M38 62h20"/>',
  dance: '<circle cx="50" cy="18" r="8"/><path d="m48 28-8 20-20-12m20 12 24 4 14-18M40 48 26 72h40L54 52M36 74l-8 14m28-14 12 14"/>',
  radio: '<rect x="12" y="30" width="72" height="50" rx="6"/><circle cx="34" cy="56" r="17"/><path d="M58 42h16M58 52h16M62 68h10M24 28 66 10"/>',
  store: '<path d="M14 30h68v50H14ZM8 30l10-18h60l10 18M28 44h12v14H28Zm28 0h12v14H56ZM40 80V66h16v14"/>',
  donut: '<circle cx="48" cy="48" r="33"/><circle cx="48" cy="48" r="12"/><path d="m28 30 6 4m26-8-2 8m12 18 6 2M50 70l2 7M24 56l6-2"/>',
  banana: '<path d="M24 18q0 46 56 38Q58 94 24 64 4 46 18 16ZM22 18l8-6M28 64q24 12 44 0"/>',
  bottle: '<path d="M38 12h20v20q16 12 16 24v26H22V56q0-12 16-24ZM38 22h20M26 50h44v22H26"/>',
  pig: '<path d="m24 30-6-20 24 10m30 10 6-20-24 10"/><ellipse cx="48" cy="50" rx="34" ry="30"/><ellipse cx="48" cy="60" rx="18" ry="12"/><path d="M40 60v2m16-2v2M30 40h2m30 0h2"/>',
  bento: '<rect x="12" y="20" width="72" height="60" rx="10"/><path d="M50 20v60M50 50h34"/><circle cx="31" cy="49" r="15"/><circle cx="31" cy="49" r="4"/><path d="m60 32 14 8m-14 24 14 4"/>',
  hat: '<path d="M26 54V34q0-20 22-20t22 20v20M12 54q36 16 72 0v16q-36 18-72 0ZM26 44h44"/>',
  eat: '<circle cx="48" cy="44" r="30"/><path d="M32 34h2m28 0h2M30 50q18 30 36 0ZM18 80h60M78 36l10 12-10 12"/>',
  sparkle: '<path d="m48 12 10 26 26 10-26 10-10 26-10-26-26-10 26-10ZM18 10v14m-7-7h14M78 72v14m-7-7h14"/>',
  paint: '<path d="M40 14h34v18H40ZM74 22h10v26H54v14M46 62h16v22H46ZM12 42h20v40H12ZM10 42h24"/>',
  sun: '<circle cx="48" cy="48" r="22"/><path d="M48 6v10m0 64v10M6 48h10m64 0h10M18 18l8 8m44 44 8 8M18 78l8-8m44-44 8-8"/>',
  bus: '<rect x="10" y="26" width="76" height="44" rx="8"/><path d="M16 32h64v20H16ZM60 32v38M30 32v20"/><circle cx="26" cy="72" r="8"/><circle cx="70" cy="72" r="8"/>',
  beer: '<path d="M22 30h42v50H22ZM64 40h14q14 20 0 30H64M34 40v30m16-30v30M22 30q-12-16 4-18 10-14 20-2 18-8 20 10v10Z"/>',
  grapes: '<path d="M48 24 58 8m-10 8q-26-16-26 6Z"/><circle cx="32" cy="38" r="12"/><circle cx="58" cy="38" r="12"/><circle cx="44" cy="56" r="12"/><circle cx="62" cy="60" r="10"/><circle cx="48" cy="76" r="10"/>',
  bed: '<path d="M12 34v48m72-48v48M12 56h72v18H12M20 56V38h56v18M26 42h18v14H26"/>',
  ball: '<circle cx="48" cy="48" r="34"/><path d="m48 34 14 10-5 16H39l-5-16ZM48 34V14m14 30 18-6M57 60l12 16M39 60 27 76M34 44l-18-6"/>',
  panda: '<circle cx="24" cy="26" r="12"/><circle cx="72" cy="26" r="12"/><ellipse cx="48" cy="52" rx="33" ry="30"/><ellipse cx="32" cy="48" rx="8" ry="12"/><ellipse cx="64" cy="48" rx="8" ry="12"/><path d="m42 64 6 5 6-5M40 74h16"/>',
  piano: '<rect x="10" y="24" width="76" height="52" rx="3"/><path d="M10 38h76M26 38v38m14-38v38m14-38v38m14-38v38M22 38v20m22-20v20m20-20v20"/>',
  pool: '<path d="M14 44h68v38H14ZM26 44V18q0-12 10-12m4 38V18q0-12 10-12M26 26h14m-14 10h14M18 58q10-10 20 0t20 0 20 0M18 72q10-10 20 0t20 0 20 0"/>',
  pen: '<path d="m20 76 6-22 42-42 16 16-42 42ZM26 54l16 16M60 20l16 16M20 76l-4 8 8-4"/>',
  fries: '<path d="m20 44 8 40h40l8-40ZM26 44V16h10v28m8 0V10h10v34m8 0V20h10v24"/><circle cx="48" cy="64" r="9"/>',
  person: '<circle cx="48" cy="24" r="12"/><path d="M24 82V58q0-18 24-18t24 18v24M34 60v22m28-22v22M72 52l12-26m0 0-8 6"/>',
  cucumber: '<path d="M18 74q-12-14 6-26l42-32q12-10 18 0 8 10-4 20L38 78q-10 10-20-4Z"/><path d="m30 52 4 4m12-18 4 4m12-18 4 4M42 64l4 4m12-18 4 4"/>',
  dinosaur: '<path d="M14 70q26 2 22-26V24q0-16 20-16h14v20H52v24q24-4 24 18M26 70v16m36-16v16M70 18h2M36 56l-12-6"/>',
  picture: '<path d="M12 18h72v64H12ZM20 70l20-28 14 16 10-12 14 24Z"/><circle cx="64" cy="32" r="7"/>',
  firetruck: '<path d="M10 36h48V24h20l10 24v24H10ZM58 36h20v16H58M10 26h38M16 18h32M20 18v18m14-18v18M18 50h30m-30 12h30"/><circle cx="26" cy="74" r="9"/><circle cx="72" cy="74" r="9"/>',
  bowl: '<ellipse cx="48" cy="36" rx="34" ry="12"/><path d="M14 36q4 36 34 40 30-4 34-40M34 78h28"/>',
  syringe: '<path d="m20 72 40-40 16 16-40 40ZM54 26l28 28M66 16l24 24M72 22 62 32M84 34 74 44M20 84l-12 8M42 54l8 8M34 62l8 8"/>',
  butterfly: '<path d="M48 38Q18-6 10 28q-4 20 24 24Q4 66 24 80q20 12 24-24 4 36 24 24 20-14-10-28 28-4 24-24Q78-6 48 38ZM48 38v28M42 20l6 18 6-18"/>',
  cat: '<path d="m18 38 2-28 24 18h8l24-18 2 28q18 44-30 46Q0 82 18 38Z"/><path d="M30 48h3m30 0h3m-24 12 6 4 6-4M48 64v8M8 56l20 6m40 0 20-6M8 72l20-2m40 0 20 2"/>',
  backpack: '<rect x="20" y="24" width="56" height="60" rx="14"/><path d="M34 24V12h28v12M20 44h56M30 60h36v16H30M10 42v30m76-30v30"/>',
  woman: '<circle cx="48" cy="24" r="12"/><path d="M26 32V22q0-22 22-16 22-6 22 16v10M38 42h20l16 32H22ZM38 76v12m20-12v12M30 50l-16 14m52-14 16 14"/>',
  hundred: '<path d="m14 38 10-8v40M12 80h72"/><ellipse cx="46" cy="50" rx="10" ry="20"/><ellipse cx="74" cy="50" rx="10" ry="20"/>',
  wind: '<path d="M8 34h52q22 0 16-16t-20 2M8 48h66q22 0 12 18-8 12-20 0M14 62h30q18 0 12 18-6 10-16 0"/>',
  leopard: '<path d="M20 34 12 16l24 8m40 10 8-18-24 8"/><ellipse cx="48" cy="52" rx="34" ry="29"/><path d="M30 44h4m28 0h4m-24 18 6 4 6-4M36 74h24"/><circle cx="26" cy="62" r="3"/><circle cx="72" cy="60" r="3"/><circle cx="42" cy="32" r="3"/><circle cx="58" cy="32" r="3"/>',
  cabbage: '<circle cx="48" cy="48" r="32"/><path d="M48 78Q10 48 28 24q22 6 20 54Q88 48 68 24 46 30 48 78M28 48l20 12 20-12"/>',
  cube: '<path d="m12 28 36-18 36 18v40L48 86 12 68ZM12 28l36 18 36-18M48 46v40"/>',
  eyes: '<ellipse cx="28" cy="48" rx="18" ry="24"/><ellipse cx="68" cy="48" rx="18" ry="24"/><ellipse cx="34" cy="48" rx="5" ry="10"/><ellipse cx="74" cy="48" rx="5" ry="10"/><path d="m12 14 8-6m56 0 8 6"/>',
  shower: '<path d="M18 86V24q0-18 22-18t22 20M44 32q18-18 36 0ZM48 44l-4 10m18-10v10m14-10 4 10M44 66l-4 10m22-10v10m18-10 4 10"/>',
  cream: '<path d="M18 66q0-28 30-28t30 28ZM18 66q30 24 60 0M26 42q-6-16 12-18 0-14 14-12 16 0 14 16 14 2 6 16"/>',
  shawl: '<path d="M32 14q16 12 32 0l18 54-18 12-16-32-16 32-18-12ZM28 28l40 28M22 46l48 20"/>',
  bell: '<path d="M18 68h60L68 54V34q0-22-20-22T28 34v20ZM40 78q8 14 16 0M48 6V2"/>',
  tulip: '<path d="M48 86V46M48 46q-30 0-26-32l16 10 10-14 10 14 16-10q4 32-26 32ZM48 76Q16 78 14 54q26 0 34 22Zm0-10q24 0 32-20-28 0-32 20Z"/>',
  chocolate: '<path d="M20 12h56v72H20ZM20 36h56M20 60h56M48 12v72M28 20h12v8H28m28 16h12v8H56"/>',
  skyline: '<path d="M10 84h76M14 84V42h18v42m4 0V20h22v64m8 0V34h16v50M46 20V6m-4 28h8m-8 12h8m-8 12h8M20 54h6m46-8h5"/>',
  pasta: '<ellipse cx="48" cy="66" rx="36" ry="16"/><path d="M18 66q8 28 60 0M28 54q-10-10 0-14t0-14m14 28q-10-10 0-14t0-14m14 28q-10-10 0-14t0-14m14 28q-10-10 0-14t0-14"/>',
  fuse: '<path d="M8 48h16m48 0h16M24 30h48v36H24ZM24 36h8v24h-8m48-24h-8v24h8M32 48q8-18 16 0t16 0"/>',
  pulse: '<path d="M8 50h20l10-24 14 48 12-32 8 8h16"/><path d="M18 22Q32 4 48 20 66 4 80 22"/>',
  badge: '<rect x="12" y="28" width="72" height="46" rx="6"/><path d="M38 28V16h20v12M42 44h30M42 56h24"/><circle cx="28" cy="44" r="6"/><path d="M18 62q10-16 20 0"/>',
  scissors: '<circle cx="24" cy="70" r="12"/><circle cx="72" cy="70" r="12"/><path d="m34 62 42-48M62 62 20 14"/><circle cx="48" cy="46" r="4"/>',
  dragon: '<path d="M16 74q40 22 42-14T34 34q-14-18 8-24l28 6-14 18q22 14 14 38-6 18-26 18M42 10 36 2m20 12 8-10M24 70 12 52l28 8M62 58l18-12"/>',
  suitcase: '<rect x="16" y="28" width="64" height="50" rx="7"/><path d="M34 28V14h28v14M30 28v50m36-50v50M28 80v8m40-8v8"/>',
  reverse: '<path d="M18 30h58L62 16m14 14L62 44M78 66H20l14-14M20 66l14 14"/>',
  milk: '<path d="M30 12h34l12 18v54H20V30ZM20 30h56M30 12l12 18v54M42 30l22-18M50 48h18v20H50"/>',
  boat: '<path d="M10 58h76L70 82H28ZM26 58V32h40v26M40 32V18h14v14M48 18V4M10 90q10-8 20 0t20 0 20 0 20 0"/>',
  potato: '<path d="M20 36q12-24 36-20 30 4 26 28-2 32-30 36Q4 90 12 58Z"/><path d="M32 32h2m22 0h2M26 58h2m32 2h2M44 70h2"/>',
  judo: '<path d="m32 14 16 16 16-16 24 32-16 12-8-12v40H32V46l-8 12L8 46ZM32 14l24 46M64 14 40 60M32 60h32M48 60l-8 24m8-24 10 22"/>',
  crown: '<path d="M20 70 12 24l24 18 12-28 12 28 24-18-8 46ZM22 80h52M24 58h48"/><circle cx="48" cy="50" r="4"/>',
  midnight: '<path d="M8 68h80M16 68a32 32 0 0 1 64 0M48 16v10M12 32l10 8m62-8-10 8M20 80h56"/><path d="m70 10 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/>',
  hospital: '<path d="M14 84V20h68v64ZM38 84V66h20v18M38 30h20v10H48v10H38V40H28V30h10M24 58h8m32 0h8"/>',
  rabbit: '<path d="M32 38Q8-4 28 4q16 4 14 30M54 34Q52-6 72 4q14 8-8 34"/><ellipse cx="48" cy="60" rx="30" ry="26"/><path d="M34 54h2m24 0h2m-18 12 4 4 4-4M20 84l-8 6m64-6 8 6"/>',
  map: '<path d="m10 24 26-10 26 10 24-10v60L62 84 36 74 10 84ZM36 14v60m26-50v60M22 38l5 5m22 8 6 5m18-8 5 5"/>',
  music: '<path d="M38 68V20l40-10v48M38 32l40-10"/><ellipse cx="26" cy="70" rx="12" ry="9"/><ellipse cx="66" cy="60" rx="12" ry="9"/>',
  sprout: '<path d="M48 84V44M48 58Q14 52 16 20q34 0 32 38ZM48 48Q50 12 82 12 84 46 48 48Z"/>',
  pan: '<ellipse cx="40" cy="56" rx="30" ry="22"/><path d="M68 48 88 26l6 6-24 24M16 52q24 16 48 0"/><ellipse cx="40" cy="52" rx="14" ry="10"/>',
  hug: '<circle cx="48" cy="28" r="16"/><path d="M26 80V58q0-18 22-18t22 18v22M14 42l12 26 36-12M82 42 70 68 34 56"/>',
  dumpling: '<path d="M12 64Q24 10 48 10t36 54Q48 86 12 64ZM12 64q36-26 72 0M26 38l8 12m6-26 4 20m12-20-4 20m18-6-8 12"/>',
  jam: '<path d="M24 24h48v12q6 8 6 20v28H18V56q0-12 6-20ZM22 14h52v10H22M24 50h48v22H24"/><path d="m42 60 6-6 6 6-6 8Z"/>',
  jewel: '<path d="m16 34 16-20h32l16 20-32 48ZM16 34h64M32 14l16 68 16-68M32 14l16 20 16-20"/>',
  run: '<circle cx="60" cy="16" r="9"/><path d="m52 30-18 20 22 8-8 24m-14-32-10 28H8m36-40-16-8-14 12m40-6 18 14 12-14"/>',
  buffet: '<path d="M10 68h76M20 62q0-32 28-32t28 32M48 30v-8m-8 0h16M10 82h76M18 8v32m-8-32v18m16-18v18M80 8v32"/>'
};
const groups = {
  school: 'gakkou nyuugaku', bank: 'ginkou', glove: 'gunte guroobu', sandal: 'geta', rice: 'gohan', book: 'zasshi zukan shukudai ryaku_k', bicycle: 'jitensha', coin: 'zeni', elephant: 'zou', dango: 'dango', nose: 'hanaji', moon: 'mikazuki mikazuki_k', phone: 'denwa', acorn: 'donguri', candy: 'gamu', guitar: 'gitaa', game: 'geemu', gorilla: 'gorira', lobster: 'zarigani', juice: 'juusu', trousers: 'zubon', pudding: 'zerii purin', zombie: 'zonbi', dance: 'dansu', radio: 'radio_dji', store: 'depaato', donut: 'doonatsu', banana: 'banana', bottle: 'bin', pig: 'buta', bento: 'bentou', hat: 'boushi', eat: 'pakupaku', sparkle: 'pikapika', paint: 'penki', sun: 'pokapoka', bus: 'basu', beer: 'biiru', grapes: 'budou', bed: 'beddo', ball: 'booru', panda: 'panda', piano: 'piano', pool: 'puuru', pen: 'pen', fries: 'poteto', person: 'kyaku', cucumber: 'kyuuri', dinosaur: 'kyouryuu', picture: 'shashin gyararii', firetruck: 'shoubousha', bowl: 'chawan', syringe: 'chuusha', butterfly: 'choucho', cat: 'nyanko nyaa myuu', backpack: 'ryukku', woman: 'nyoubou', hundred: 'hyaku hyakuten', wind: 'hyuuhyuu byuubyuu pyuupyuu pya pya_k', leopard: 'hyou hyou_k pyuuma', cabbage: 'kyabetsu', cube: 'kyuubu', eyes: 'kyorokyoro', shower: 'shawaa', cream: 'shuukuriimu', shawl: 'shooru', bell: 'chaimu', tulip: 'chuurippu', chocolate: 'chokoreeto', skyline: 'nyuuyooku', pasta: 'nyokki', fuse: 'hyuuzu', pulse: 'myaku', badge: 'myouji', scissors: 'ryaku', dragon: 'ryuu', suitcase: 'ryokou', reverse: 'gyaku', milk: 'gyuunyuu', boat: 'gyosen', potato: 'jagaimo', judo: 'juudou', crown: 'joou', midnight: 'byakuya byakuya_k', hospital: 'byouin byouin_k', rabbit: 'pyonpyon pyonpyon_k', map: 'myanmaa', music: 'myuujikku', sprout: 'myouga', pan: 'ryouri', hug: 'gyutto', dumpling: 'gyouza', jam: 'jamu', jewel: 'juerii', run: 'jogingu', buffet: 'byuffe'
};
const byKey = Object.fromEntries(Object.entries(groups).flatMap(([type, keys]) => keys.split(' ').map(key => [key, type])));
const escape = text => text.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
const entries = readWindowData(path.join(root, 'data/levels.js'), 'KANA_DATA').levels.flatMap(l => [...l.hira, ...l.kata]);
let count = 0;
for (const entry of entries) {
  if (fs.existsSync(path.join(root, 'img', entry.img + '.png'))) continue;
  const type = byKey[entry.img];
  if (!shapes[type]) throw Error('Missing illustration: ' + entry.img);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112" role="img" aria-labelledby="title"><title id="title">${escape(entry.w + '：' + entry.zh)}</title><rect width="112" height="112" rx="18" fill="#f7f4ec"/><g transform="translate(8 8)" fill="#e4edf7" stroke="#1f4788" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${shapes[type]}</g></svg>\n`;
  fs.writeFileSync(path.join(root, 'img', entry.img + '.svg'), svg); count++;
}
console.log(`Original SVG illustrations: ${count}`);
const manifest = Object.fromEntries(entries.map(entry => [entry.img, 'img/' + entry.img + (fs.existsSync(path.join(root, 'img', entry.img + '.png')) ? '.png' : '.svg')]));
fs.writeFileSync(path.join(root, 'data/illustrations.js'), '/* Generated by scripts/build-illustrations.mjs. */\nglobalThis.KANA_ILLUSTRATIONS = ' + JSON.stringify(manifest, null, 2) + ';\n');
