/* =====================================================================
   TIENDA DE HOMBRE — cabecera y pie compartidos.
   Se carga dos veces en cada página de hombre/:

     <script src="../js/hombre-shell.js" data-parte="cabecera"></script>
       justo después de <body>: barra de aviso, header con submenú,
       buscador, menú móvil y panel de cuenta.

     <script src="../js/hombre-shell.js" data-parte="pie"></script>
       antes de los demás scripts: newsletter, footer, popup y botón
       flotante de WhatsApp.

   El menú y el submenú se arman con las categorías de
   js/data/productos-hombre.js: si agregas una subcategoría allí,
   aparece sola en el menú, el menú móvil y el footer.
   ===================================================================== */
(function(){
  "use strict";

  const script = document.currentScript;
  const parte = script && script.dataset.parte;
  const tienda = window.SB_TIENDA || {categorias:[], productos:[]};
  const cats = tienda.categorias || [];

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const url = (c, s) => "coleccion.html?c=" + encodeURIComponent(c) + (s ? "&s=" + encodeURIComponent(s) : "");

  const ICON = {
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/></svg>',
    bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5.5 8h13l-1 12.5h-11Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3.5 7h17M3.5 12h17M3.5 17h17"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 20.5s-7-4.2-9.3-8.6C1 8.4 2.4 5 5.7 4.4 8.1 4 10 5.2 12 7.6 14 5.2 15.9 4 18.3 4.4 21.6 5 23 8.4 21.3 11.9 19 16.3 12 20.5 12 20.5Z"/></svg>',
    wa:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5L8.9 8.4c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A3 3 0 0 0 6 10.5c0 1.8 1.3 3.5 1.5 3.7s2.6 4 6.3 5.2c2.6.9 2.6.6 3 .5.6-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3Z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".9" fill="currentColor"/></svg>'
  };

  // Primer producto destacado de la categoría: foto del submenú
  const destacadoDe = (catId) => (tienda.productos || []).find(p => p.cat === catId && p.destacado && p.imgs && p.imgs.length)
    || (tienda.productos || []).find(p => p.cat === catId && p.imgs && p.imgs.length);

  function cabecera(){
    const megaHTML = (c) => {
      const destacado = destacadoDe(c.id);
      return `
        <div class="hb-mega" id="mega-${esc(c.id)}">
          <div class="wrap hb-mega-inner">
            <div class="hb-mega-links">
              <p class="hb-mega-title">${esc(c.nombre)}</p>
              <ul>
                <li><a href="${url(c.id)}">Ver todo</a></li>
                ${(c.sub || []).map(s => `<li><a href="${url(c.id, s.id)}">${esc(s.nombre)}</a></li>`).join("")}
              </ul>
            </div>
            ${c.img ? `
              <a class="hb-mega-tile" href="${url(c.id)}">
                <img src="${esc(c.img)}" alt="" loading="lazy" decoding="async">
                <span>Todo en ${esc(c.nombre.toLowerCase())}</span>
              </a>` : ""}
            ${destacado ? `
              <a class="hb-mega-tile" href="#producto/${encodeURIComponent(destacado.id)}">
                <img src="${esc(destacado.imgs[0])}" alt="" loading="lazy" decoding="async">
                <span>${esc(destacado.name)}</span>
              </a>` : ""}
          </div>
        </div>`;
    };

    const html = `
      <a class="skip-link" href="#main">Saltar al contenido</a>
      <div class="utility text-loop hb-announce" data-text-loop="Pedidos por WhatsApp ✦ Envíos a toda Colombia ✦ Nuevo drop disponible" data-speed="45" data-shape="line">
        <p>Pedidos por WhatsApp · Envíos a toda Colombia</p>
      </div>

      <header class="hb-header" id="hbHeader">
        <div class="wrap hb-bar">
          <button class="hb-icon hb-burger" id="hamburgerBtn" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="drawer">${ICON.menu}</button>

          <a class="hb-logo" href="index.html" aria-label="Street Blush Hombre, ir al inicio"><span class="brand-logo" role="img" aria-label="Street Blush"></span></a>

          <nav class="hb-nav" aria-label="Principal">
            <ul class="hb-nav-list">
              <li><a class="hb-nav-link" href="coleccion.html?c=novedades">Novedades</a></li>
              ${cats.map(c => `
                <li class="hb-nav-item${(c.sub || []).length ? " has-mega" : ""}">
                  <a class="hb-nav-link" href="${url(c.id)}">${esc(c.nombre)}</a>
                  ${(c.sub || []).length ? megaHTML(c) : ""}
                </li>`).join("")}
              <li><a class="hb-nav-link hb-nav-switch" href="../mujer/index.html">Maquillaje ${ICON.arrow}</a></li>
            </ul>
          </nav>

          <div class="hb-actions">
            <button class="hb-icon" id="navSearchBtn" type="button" aria-label="Buscar productos" aria-expanded="false" aria-controls="hbSearch">${ICON.search}</button>
            <div class="hb-account">
              <button class="hb-icon" id="hbAccountBtn" type="button" aria-label="Tu cuenta" aria-expanded="false" aria-controls="hbAccount">${ICON.user}</button>
              <div class="hb-popover" id="hbAccount" hidden>
                <p class="hb-popover-title">Tu cuenta</p>
                <p class="hb-popover-text">No necesitas registrarte. Tus favoritos y tus datos de envío se guardan en este dispositivo.</p>
                <ul class="hb-popover-links">
                  <li><a href="coleccion.html?fav=1">${ICON.heart}<span>Mis favoritos</span><span class="hb-fav-count" data-fav-count>0</span></a></li>
                  <li><a data-wa target="_blank" rel="noopener">${ICON.wa}<span>Consultar un pedido</span></a></li>
                  <li><a href="../mujer/index.html">${ICON.arrow}<span>Tienda de maquillaje</span></a></li>
                </ul>
              </div>
            </div>
            <button class="hb-icon bag-btn" id="navBagBtn" type="button" aria-label="Ver carrito">${ICON.bag}</button>
          </div>
        </div>

        <div class="hb-search" id="hbSearch" hidden>
          <div class="wrap hb-search-inner">
            <form class="hb-search-form" role="search" action="coleccion.html">
              ${ICON.search}
              <label class="sr-only" for="hbSearchInput">Buscar productos</label>
              <input type="search" id="hbSearchInput" name="q" placeholder="${esc(tienda.busqueda || "Buscar")}" autocomplete="off" enterkeyhint="search">
              <button class="hb-icon" type="button" data-search-close aria-label="Cerrar buscador">${ICON.close}</button>
            </form>
            <div class="hb-search-body" id="hbSearchBody" aria-live="polite"></div>
          </div>
        </div>
      </header>

      <div class="hb-overlay" id="drawerOverlay"></div>
      <aside class="hb-drawer" id="drawer" aria-label="Menú">
        <div class="hb-drawer-head">
          <span class="brand-logo" role="img" aria-label="Street Blush"></span>
          <button class="hb-icon" id="drawerClose" type="button" aria-label="Cerrar menú">${ICON.close}</button>
        </div>
        <nav class="hb-drawer-nav" aria-label="Menú móvil">
          <a class="hb-drawer-link" href="coleccion.html?c=novedades">Novedades</a>
          ${cats.map(c => (c.sub || []).length ? `
            <div class="hb-acc">
              <button class="hb-drawer-link hb-acc-btn" type="button" aria-expanded="false" aria-controls="acc-${esc(c.id)}">${esc(c.nombre)}${ICON.chevron}</button>
              <ul class="hb-acc-panel" id="acc-${esc(c.id)}" hidden>
                <li><a href="${url(c.id)}">Ver todo</a></li>
                ${c.sub.map(s => `<li><a href="${url(c.id, s.id)}">${esc(s.nombre)}</a></li>`).join("")}
              </ul>
            </div>` : `<a class="hb-drawer-link" href="${url(c.id)}">${esc(c.nombre)}</a>`).join("")}
          <a class="hb-drawer-link hb-nav-switch" href="../mujer/index.html">Maquillaje ${ICON.arrow}</a>
        </nav>
        <div class="hb-drawer-foot">
          <a class="hb-drawer-mini" href="coleccion.html?fav=1">${ICON.heart}Mis favoritos</a>
          <a class="hb-drawer-mini" href="../index.html">${ICON.arrow}Inicio de Street Blush</a>
          <a class="hb-btn hb-btn-dark" data-wa target="_blank" rel="noopener">${ICON.wa}Escribir por WhatsApp</a>
        </div>
      </aside>`;

    script.insertAdjacentHTML("beforebegin", html);
  }

  function pie(){
    const html = `
      <section class="hb-newsletter" aria-labelledby="newsTitle">
        <div class="wrap hb-newsletter-inner">
          <div>
            <h2 class="hb-newsletter-title" id="newsTitle">Entérate primero de cada drop</h2>
            <p>Déjanos tu correo y te avisamos cuando salga una tanda nueva, antes de que se agote.</p>
          </div>
          <form class="hb-news-form" data-newsletter novalidate>
            <label class="sr-only" for="newsEmail">Correo electrónico</label>
            <div class="hb-news-field">
              <input type="email" id="newsEmail" name="email" placeholder="tu@correo.com" autocomplete="email" required aria-describedby="newsHint">
              <button class="hb-btn hb-btn-dark" type="submit">Suscribirme</button>
            </div>
            <p class="hb-news-hint" id="newsHint" data-news-hint>Al suscribirte se abre WhatsApp con tu correo para confirmar.</p>
          </form>
        </div>
      </section>

      <footer class="hb-footer">
        <div class="wrap hb-footer-top">
          <div class="hb-footer-brand">
            <a href="index.html" aria-label="Street Blush Hombre, ir al inicio"><span class="brand-logo" role="img" aria-label="Street Blush"></span></a>
            <p>Streetwear y maquillaje urbano. Una sola marca, una sola actitud.</p>
            <div class="hb-social">
              <a href="https://instagram.com/streetblush" target="_blank" rel="noopener" aria-label="Instagram de Street Blush">${ICON.ig}</a>
              <a data-wa target="_blank" rel="noopener" aria-label="WhatsApp de Street Blush">${ICON.wa}</a>
            </div>
          </div>
          <div class="hb-footer-cols">
            <div class="hb-footer-col">
              <h2>Tienda</h2>
              <ul>
                <li><a href="coleccion.html?c=novedades">Novedades</a></li>
                ${cats.map(c => `<li><a href="${url(c.id)}">${esc(c.nombre)}</a></li>`).join("")}
                <li><a href="../mujer/index.html">Maquillaje</a></li>
              </ul>
            </div>
            <div class="hb-footer-col">
              <h2>Ayuda</h2>
              <ul>
                <li><a href="politicas.html#pedidos">Cómo pedir</a></li>
                <li><a href="politicas.html#envios">Envíos</a></li>
                <li><a href="politicas.html#devoluciones">Cambios y devoluciones</a></li>
                <li><a href="politicas.html#tallas">Guía de tallas</a></li>
              </ul>
            </div>
            <div class="hb-footer-col">
              <h2>Legal</h2>
              <ul>
                <li><a href="politicas.html#privacidad">Privacidad</a></li>
                <li><a href="politicas.html#terminos">Términos y condiciones</a></li>
              </ul>
            </div>
            <div class="hb-footer-col">
              <h2>Contacto</h2>
              <ul>
                <li><a data-wa target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a href="https://instagram.com/streetblush" target="_blank" rel="noopener">@streetblush</a></li>
                <li><span>Envíos a toda Colombia</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="wrap hb-footer-bottom">
          <span>© 2026 Street Blush. Hecho con actitud.</span>
          <a href="../index.html">Ir al inicio de Street Blush</a>
        </div>
      </footer>

      <div class="hb-popup" id="hbPopup" role="dialog" aria-modal="true" aria-labelledby="popupTitle" hidden>
        <div class="hb-popup-backdrop" data-popup-close></div>
        <div class="hb-popup-card">
          <button class="hb-icon hb-popup-close" type="button" data-popup-close aria-label="Cerrar">${ICON.close}</button>
          <img class="hb-popup-img" src="../assets/img/hombre/popup-drop.jpg" alt="" loading="lazy" decoding="async">
          <div class="hb-popup-body">
            <p class="hb-popup-brand"><span class="brand-logo" role="img" aria-label="Street Blush"></span></p>
            <h2 class="hb-popup-title" id="popupTitle">Entra primero al próximo drop</h2>
            <p>Las tandas son cortas. Déjanos tu correo y te avisamos el día que salen, antes que a todos.</p>
            <form class="hb-news-form" data-newsletter novalidate>
              <label class="sr-only" for="popupEmail">Correo electrónico</label>
              <input type="email" id="popupEmail" name="email" placeholder="tu@correo.com" autocomplete="email" required aria-describedby="popupHint">
              <button class="hb-btn hb-btn-dark hb-btn-block" type="submit">Avisarme</button>
              <p class="hb-news-hint" id="popupHint" data-news-hint>Se abre WhatsApp con tu correo para confirmar.</p>
            </form>
            <button class="hb-popup-skip" type="button" data-popup-close>Ahora no</button>
          </div>
        </div>
      </div>

      <a class="hb-float-wa" data-wa target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">${ICON.wa}</a>`;

    script.insertAdjacentHTML("beforebegin", html);
  }

  if (parte === "cabecera") cabecera();
  else if (parte === "pie") pie();
})();
