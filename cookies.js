/* ==========================================================
   BOCADILLO A40 · aviso y configuración de cookies
   Lo usan la web y las páginas legales. Solo hay dos grupos:
   las necesarias (tu elección y el idioma que eliges, exentas
   de consentimiento) y el mapa de Google Maps, que no se carga
   hasta que se acepta. Textos en los 5 idiomas de la web.
   ========================================================== */
(() => {
'use strict';
const A = window.A40;
if (!A) return;
const KEY = 'a40-consent', AGE = 365 * 864e5;
const me = document.currentScript;
const root = (me && me.dataset.root) || '';

Object.assign(A.COMMON, {
  'ck.title': ['Cookies', 'Cookies', 'Cookies', 'Cookies', 'الكوكيز'],
  'ck.text': ['Usamos solo lo imprescindible para que la web funcione y recuerde tu idioma. El mapa de Google Maps solo se carga si lo aceptas, porque Google instala sus propias cookies.', 'Fem servir només l’imprescindible perquè la web funcioni i recordi el teu idioma. El mapa de Google Maps només es carrega si l’acceptes, perquè Google hi instal·la les seves cookies.', 'Nous n’utilisons que l’indispensable pour que le site fonctionne et se souvienne de votre langue. La carte Google Maps ne se charge que si vous l’acceptez, car Google y dépose ses propres cookies.', 'We only use what’s essential for the site to work and remember your language. The Google Maps map only loads if you accept it, because Google sets its own cookies.', 'كنستعملو غير داكشي الضروري باش الموقع يخدم و يعقل على اللغة ديالك. الخريطة ديال Google Maps ما كتبانش حتى توافق، حيت Google كيحط الكوكيز ديالو.'],
  'ck.more': ['Política de cookies', 'Política de cookies', 'Politique de cookies', 'Cookie policy', 'سياسة الكوكيز'],
  'ck.accept': ['Aceptar todo', 'Acceptar-ho tot', 'Tout accepter', 'Accept all', 'قبل كلشي'],
  'ck.reject': ['Rechazar', 'Rebutjar', 'Refuser', 'Reject', 'رفض'],
  'ck.save': ['Guardar mi elección', 'Desar la meva elecció', 'Enregistrer mon choix', 'Save my choice', 'سجل الاختيار ديالي'],
  'ck.show': ['Configurar', 'Configurar', 'Personnaliser', 'Customise', 'الإعدادات'],
  'ck.hide': ['Ocultar detalles', 'Amagar detalls', 'Masquer les détails', 'Hide details', 'خبي التفاصيل'],
  'ck.always': ['Siempre activas', 'Sempre actives', 'Toujours actifs', 'Always on', 'ديما خدامين'],
  'ck.list': ['Ver qué se guarda', 'Veure què es desa', 'Voir ce qui est enregistré', 'See what’s stored', 'شوف شنو كيتسجل'],
  'ck.c.nec': ['Necesarias', 'Necessàries', 'Nécessaires', 'Necessary', 'ضروريين'],
  'ck.c.nec.d': ['Guardan tu elección sobre las cookies y el idioma que eliges. Sin ellas la web no funciona bien.', 'Desen la teva elecció sobre les cookies i l’idioma que tries. Sense elles la web no funciona bé.', 'Elles enregistrent votre choix sur les cookies et la langue choisie. Sans elles, le site ne fonctionne pas correctement.', 'They store your cookie choice and the language you pick. The site doesn’t work properly without them.', 'كيسجلو الاختيار ديالك على الكوكيز و اللغة اللي ختاريتي. بلا بيهم الموقع ما يخدمش مزيان.'],
  'ck.c.maps': ['Mapa de Google Maps', 'Mapa de Google Maps', 'Carte Google Maps', 'Google Maps map', 'خريطة Google Maps'],
  'ck.c.maps.d': ['Muestra el mapa de la sección «Visítanos». Al cargarlo, Google instala sus cookies.', 'Mostra el mapa de la secció «Visita’ns». En carregar-lo, Google hi instal·la les seves cookies.', 'Affiche la carte de la section « Venez nous voir ». En la chargeant, Google dépose ses cookies.', 'Shows the map in the “Visit us” section. When it loads, Google sets its cookies.', 'كتوري الخريطة ف «زورونا». ملي كتشارجا، Google كيحط الكوكيز ديالو.'],
  'ck.th.name': ['Nombre', 'Nom', 'Nom', 'Name', 'السمية'],
  'ck.th.prov': ['Proveedor', 'Proveïdor', 'Fournisseur', 'Provider', 'المزود'],
  'ck.th.type': ['Tipo', 'Tipus', 'Type', 'Type', 'النوع'],
  'ck.th.exp': ['Duración', 'Durada', 'Durée', 'Duration', 'المدة'],
  'ck.th.purpose': ['Finalidad', 'Finalitat', 'Finalité', 'Purpose', 'علاش'],
  'ck.this': ['Esta web', 'Aquesta web', 'Ce site', 'This site', 'هاد الموقع'],
  'ck.ls': ['Almacenamiento local', 'Emmagatzematge local', 'Stockage local', 'Local storage', 'التخزين المحلي'],
  'ck.cookie': ['Cookie', 'Cookie', 'Cookie', 'Cookie', 'كوكي'],
  'ck.d12m': ['12 meses', '12 mesos', '12 mois', '12 months', '12 شهر'],
  'ck.dpersist': ['Hasta que lo borres', 'Fins que l’esborris', 'Jusqu’à sa suppression', 'Until you delete it', 'حتى تمسحو'],
  'ck.dgoogle': ['Las fija Google (hasta 13 meses)', 'Les fixa Google (fins a 13 mesos)', 'Fixée par Google (jusqu’à 13 mois)', 'Set by Google (up to 13 months)', 'Google اللي كيحددها (حتى 13 شهر)'],
  'ck.r.consent': ['Recordar tu elección sobre las cookies', 'Recordar la teva elecció sobre les cookies', 'Mémoriser votre choix sur les cookies', 'Remember your cookie choice', 'يعقل على الاختيار ديالك'],
  'ck.r.lang': ['Recordar el idioma que eliges', 'Recordar l’idioma que tries', 'Mémoriser la langue que vous choisissez', 'Remember the language you choose', 'يعقل على اللغة اللي ختاريتي'],
  'ck.r.google': ['Cargar el mapa y guardar las preferencias de Google', 'Carregar el mapa i desar les preferències de Google', 'Charger la carte et enregistrer les préférences de Google', 'Load the map and store Google’s preferences', 'يشارجي الخريطة و يسجل الإعدادات ديال Google'],
  'map.off.t': ['El mapa está desactivado', 'El mapa està desactivat', 'La carte est désactivée', 'The map is turned off', 'الخريطة مطفية'],
  'map.off.p': ['Para verlo aquí, acepta las cookies de Google Maps.', 'Per veure’l aquí, accepta les cookies de Google Maps.', 'Pour l’afficher ici, acceptez les cookies de Google Maps.', 'To see it here, accept the Google Maps cookies.', 'باش تشوفها هنا، قبل الكوكيز ديال Google Maps.'],
  'map.on': ['Mostrar el mapa', 'Mostrar el mapa', 'Afficher la carte', 'Show the map', 'بين الخريطة'],
  'map.open': ['Abrir en Google Maps', 'Obrir a Google Maps', 'Ouvrir dans Google Maps', 'Open in Google Maps', 'حل ف Google Maps'],
  'lg.aviso': ['Aviso legal', 'Avís legal', 'Mentions légales', 'Legal notice', 'الإشعار القانوني'],
  'lg.priv': ['Privacidad', 'Privacitat', 'Confidentialité', 'Privacy', 'الخصوصية'],
  'lg.cookies': ['Cookies', 'Cookies', 'Cookies', 'Cookies', 'الكوكيز'],
  'lg.a11y': ['Accesibilidad', 'Accessibilitat', 'Accessibilité', 'Accessibility', 'سهولة الولوج'],
  'lg.settings': ['Configuración de cookies', 'Configuració de cookies', 'Paramètres des cookies', 'Cookie settings', 'إعدادات الكوكيز'],
  'lg.nav': ['Información legal', 'Informació legal', 'Informations légales', 'Legal information', 'معلومات قانونية']
});
const T = A.t;

/* [nombre, proveedor, tipo, duración, finalidad] */
const CATS = [
  { k: 'nec', fixed: true, rows: [['a40-consent', 'this', 'ls', 'd12m', 'r.consent'], ['a40-lang', 'this', 'ls', 'dpersist', 'r.lang']] },
  { k: 'maps', f: 'maps', rows: [['NID, AEC, SOCS…', 'Google LLC · google.com', 'cookie', 'dgoogle', 'r.google']] }
];
const table = (cats) => `<div class="ck-table"><table><thead><tr><th>${T('ck.th.name')}</th><th>${T('ck.th.prov')}</th><th>${T('ck.th.type')}</th><th>${T('ck.th.exp')}</th><th>${T('ck.th.purpose')}</th></tr></thead><tbody>${
  cats.map((c) => c.rows.map((r) => `<tr><td><code dir="ltr">${r[0]}</code></td><td>${r[1] === 'this' ? T('ck.this') : r[1]}</td><td>${T('ck.' + r[2])}</td><td>${T('ck.' + r[3])}</td><td>${T('ck.' + r[4])}</td></tr>`).join('')).join('')
}</tbody></table></div>`;
const cookieTable = () => CATS.map((c) => `<h3>${T('ck.c.' + c.k)}</h3><p>${T('ck.c.' + c.k + '.d')}</p>${table([c])}`).join('');

const lget = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const lset = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } };
const read = () => { try { const v = JSON.parse(lget(KEY)); return v && Date.now() - v.t < AGE ? v : null; } catch (e) { return null; } };
let consent = read();

/* mapas: el iframe lleva data-consent-src y un aviso hermano .map-off */
const paintMaps = () => {
  const ok = !!(consent && consent.maps);
  document.documentElement.classList.toggle('maps-ok', ok);
  document.querySelectorAll('iframe[data-consent-src]').forEach((f) => {
    if (ok && !f.getAttribute('src')) f.src = f.dataset.consentSrc;
    if (!ok && f.getAttribute('src')) f.removeAttribute('src');
  });
  document.querySelectorAll('.map-off').forEach((box) => {
    box.innerHTML = `<p class="map-off__t">${T('map.off.t')}</p><p>${T('map.off.p')}</p><div class="map-off__b"><button type="button" class="btn btn--gold" data-map-on>${T('map.on')}</button><a class="btn btn--line" href="${box.dataset.open || 'https://www.google.com/maps'}" target="_blank" rel="noopener">${T('map.open')}</a></div>`;
  });
};

/* aviso */
const ck = document.createElement('div');
ck.className = 'ck'; ck.hidden = true;
ck.setAttribute('role', 'dialog'); ck.setAttribute('aria-labelledby', 'ck-t'); ck.setAttribute('aria-describedby', 'ck-p');
let details = false, draft = { maps: false }, lastFocus = null;
const paint = () => {
  ck.innerHTML = `<p class="ck__t" id="ck-t"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="11" r="1.2" fill="currentColor"/><circle cx="13" cy="15" r="1.2" fill="currentColor"/><circle cx="8" cy="16" r="1" fill="currentColor"/></svg>${T('ck.title')}</p>
    <p class="ck__p" id="ck-p">${T('ck.text')} <a href="${root}cookies/">${T('ck.more')}</a></p>
    <div class="ck__det"${details ? '' : ' hidden'}>${CATS.map((c) => `<div class="ck__cat"><div class="ck__row"><div><b>${T('ck.c.' + c.k)}</b><p>${T('ck.c.' + c.k + '.d')}</p></div>${c.fixed ? `<span class="ck__always">${T('ck.always')}</span>` : `<label class="sw"><input type="checkbox" data-ck-cat="${c.f}"${draft[c.f] ? ' checked' : ''}><span class="sw__ui" aria-hidden="true"></span><span class="sr">${T('ck.c.' + c.k)}</span></label>`}</div><details><summary>${T('ck.list')}</summary>${table([c])}</details></div>`).join('')}</div>
    <div class="ck__btns"><button type="button" class="btn btn--gold" data-ck="accept">${T('ck.accept')}</button><button type="button" class="btn btn--line" data-ck="reject">${T('ck.reject')}</button>${details ? `<button type="button" class="btn btn--line" data-ck="save">${T('ck.save')}</button>` : ''}<button type="button" class="ck__more" data-ck="toggle" aria-expanded="${details}">${T(details ? 'ck.hide' : 'ck.show')}</button></div>`;
};
const open = (withDetails, byUser) => {
  draft = { maps: !!(consent && consent.maps) };
  details = !!withDetails; paint();
  if (!ck.isConnected) document.body.append(ck);
  lastFocus = byUser ? document.activeElement : null;
  ck.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => ck.classList.add('is-in')));
  if (byUser) (ck.querySelector('[data-ck-cat]') || ck.querySelector('[data-ck="accept"]')).focus({ preventScroll: true });
};
const close = () => {
  ck.classList.remove('is-in');
  setTimeout(() => { if (!ck.classList.contains('is-in')) ck.hidden = true; }, 400);
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
};
const save = (v) => { consent = { maps: !!v.maps, t: Date.now(), v: 1 }; lset(KEY, JSON.stringify(consent)); paintMaps(); close(); };

ck.addEventListener('click', (e) => {
  const b = e.target.closest('[data-ck]'); if (!b) return;
  const a = b.dataset.ck;
  if (a === 'accept') save({ maps: true });
  else if (a === 'reject') save({ maps: false });
  else if (a === 'save') save(draft);
  else if (a === 'toggle') { details = !details; paint(); ck.querySelector('[data-ck="toggle"]').focus(); }
});
ck.addEventListener('change', (e) => { if (e.target.matches('[data-ck-cat]')) draft[e.target.dataset.ckCat] = e.target.checked; });
ck.addEventListener('keydown', (e) => { if (e.key === 'Escape' && consent) close(); });
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); open(true, true); }
  else if (e.target.closest('[data-map-on]')) save({ maps: true });
});

A.on(() => {
  paintMaps();
  if (!ck.hidden) paint();
  document.querySelectorAll('[data-cookie-table]').forEach((el) => { el.innerHTML = cookieTable(); });
});
A.cookies = { table: cookieTable, open: () => open(true, true) };

/* primera visita: el aviso sale cuando termina la entrada de la portada */
if (!consent) {
  const show = () => open(false, false);
  if (document.getElementById('intro') && !/[?&]static\b/.test(location.search) && !matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(show, 2600);
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
}
})();
