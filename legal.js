/* ==========================================================
   BOCADILLO A40 · páginas legales
   Pinta el documento (body[data-doc]) en el idioma elegido a
   partir de legal-textos.js, rellena la ficha del titular, la
   tabla de cookies y el botón de configuración, y resalta en el
   índice la sección que se está leyendo. El castellano ya viene
   en el HTML para quien no tenga JavaScript.
   ========================================================== */
(() => {
'use strict';
const A = window.A40, D = window.A40_LEGAL;
if (!A || !D) return;
Object.assign(A.COMMON, {
  'lg.back': ['Volver a la web', 'Tornar a la web', 'Retour au site', 'Back to the site', 'رجع للموقع'],
  'lg.updated': ['Última actualización', 'Darrera actualització', 'Dernière mise à jour', 'Last updated', 'آخر تحديث'],
  'lg.toc': ['Índice', 'Índex', 'Sommaire', 'Contents', 'الفهرس'],
  'lg.docs': ['Documentos legales', 'Documents legals', 'Documents légaux', 'Legal documents', 'الوثائق القانونية'],
  'lg.pending': ['Pendiente de confirmar por el titular', 'Pendent de confirmar pel titular', 'En attente de confirmation par le titulaire', 'Pending confirmation by the owner', 'خاص صاحب المحل يأكدها'],
  'lg.h.legal': ['Titular (nombre o razón social)', 'Titular (nom o raó social)', 'Titulaire (nom ou raison sociale)', 'Owner (name or company name)', 'صاحب المحل (السمية القانونية)'],
  'lg.h.trade': ['Nombre comercial', 'Nom comercial', 'Nom commercial', 'Trading name', 'الاسم التجاري'],
  'lg.h.nif': ['NIF', 'NIF', 'NIF', 'Tax ID (NIF)', 'NIF'],
  'lg.h.address': ['Domicilio', 'Domicili', 'Adresse', 'Address', 'العنوان'],
  'lg.h.phone': ['Pedidos y WhatsApp', 'Comandes i WhatsApp', 'Commandes et WhatsApp', 'Orders and WhatsApp', 'الطلبيات و WhatsApp'],
  'lg.h.phone2': ['Teléfono del local', 'Telèfon del local', 'Téléphone du local', 'Shop phone', 'تيليفون المحل'],
  'lg.h.email': ['Correo electrónico', 'Correu electrònic', 'E-mail', 'Email', 'الإيميل'],
  'lg.h.activity': ['Actividad', 'Activitat', 'Activité', 'Activity', 'النشاط'],
  'lg.h.activityV': ['Bocadillería y comida para llevar halal', 'Entrepans i menjar per emportar halal', 'Sandwicherie et vente à emporter halal', 'Halal sandwich shop and takeaway', 'بوكاديو و ماكلة للدار حلال'],
  'lg.ar.note': ['', '', '', '', 'هاد الصفحة كاينة غير بالإسبانية، و هي النسخة اللي عندها القيمة القانونية.']
});
const T = A.t, H = D.holder, doc = document.body.dataset.doc;
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const card = () => `<dl class="legal__card">${[
  ['lg.h.legal', H.legal && esc(H.legal)],
  ['lg.h.trade', esc(H.trade)],
  ['lg.h.nif', H.nif && esc(H.nif)],
  ['lg.h.address', esc(H.address)],
  ['lg.h.phone', `<a href="tel:${H.tel}" dir="ltr">${H.phone}</a> · <a href="https://wa.me/${H.tel.replace('+', '')}" target="_blank" rel="noopener">WhatsApp</a>`],
  ['lg.h.phone2', `<a href="tel:${H.tel2}" dir="ltr">${H.phone2}</a>`],
  ['lg.h.email', H.email && `<a href="mailto:${H.email}">${esc(H.email)}</a>`],
  ['lg.h.activity', T('lg.h.activityV')]
].map(([k, v]) => `<dt>${T(k)}</dt><dd>${v || `<span class="pending">${T('lg.pending')}</span>`}</dd>`).join('')}</dl>`;

const fill = (html) => html
  .replace('{{holder}}', card())
  .replace('{{cookies}}', `<div data-cookie-table>${A.cookies ? A.cookies.table() : ''}</div>`)
  .replace('{{settings}}', `<button type="button" class="btn btn--gold" data-cookie-settings>${T('lg.settings')}</button>`);

let io = null;
const spy = () => {
  if (io) io.disconnect();
  const links = [...document.querySelectorAll('.legal__toc a')];
  const secs = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!secs.length || !('IntersectionObserver' in window)) return;
  const vis = new Set();
  io = new IntersectionObserver((en) => {
    en.forEach((e) => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)));
    const cur = secs.find((s) => vis.has(s));
    if (cur) links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur.id));
  }, { rootMargin: '-20% 0px -60% 0px' });
  secs.forEach((s) => io.observe(s));
};

const render = () => {
  const own = D[A.lang] && D[A.lang][doc];
  const L = own || D.es[doc];
  document.title = `${L.t} · Bocadillo A40 de Tánger`;
  $('.legal__title').innerHTML = L.h;
  $('.legal__lead').innerHTML = L.lead;
  ['.legal__title', '.legal__lead'].forEach((q) => { const el = $(q); el.lang = own ? '' : 'es'; el.dir = own ? '' : 'ltr'; });
  $('.legal__meta').textContent = `${T('lg.updated')}: ${A.L(D.updated)}`;
  const note = $('.legal__note');
  note.hidden = !!own; note.textContent = own ? '' : T('lg.ar.note');
  const art = $('.legal__doc'), toc = $('.legal__toc ol');
  art.lang = own ? '' : 'es'; art.dir = own ? '' : 'ltr';
  toc.lang = art.lang; toc.dir = art.dir;
  toc.innerHTML = L.s.map((s, i) => `<li><a href="#s${i + 1}">${s[0]}</a></li>`).join('');
  art.innerHTML = L.s.map((s, i) => `<section id="s${i + 1}"><h2><span class="n">${String(i + 1).padStart(2, '0')}</span>${s[0]}</h2>${fill(s[1])}</section>`).join('');
  spy();
};

A.on(render);
A.start();
})();
