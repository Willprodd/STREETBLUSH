/* =====================================================================
   TIENDA DE HOMBRE — catálogo e interacción.
   Lee los productos de window.SB_TIENDA (js/data/productos-hombre.js)
   y arma todo lo que depende de ellos:

   - Tarjetas de producto (foto que cambia al pasar el mouse, favoritos
     y "agregar rápido" con talla).
   - Grids   [data-grid="destacados" | "drop" | "cat:<id>" | "sub:<id>"]
   - Tabs    [data-tabs="categorias"] o [data-tabs="subs"][data-subs="oversize,jeans"]
   - Slideshows [data-slideshow] (el principal con autoplay).
   - Buscador, panel de cuenta, submenú, menú móvil, popup y newsletter.
   - Página de colección (#hbColeccion): filtros por URL
       coleccion.html?c=camisetas&s=oversize · ?c=novedades · ?q=jean · ?fav=1

   El carrito (js/carrito.js) y la vista de producto (js/producto.js)
   son los mismos de toda la marca.
   ===================================================================== */
(function(){
  "use strict";

  const SB = window.SB;
  const esc = SB.esc;
  const tienda = window.SB_TIENDA || {categorias:[], productos:[]};
  const favs = SB.favoritos;
  const cats = tienda.categorias || [];
  const etiquetaDrop = tienda.etiquetaDrop || "New drop";
  const reduce = SB.reduceMotion;

  /* ---------- Datos ---------- */
  const subInfo = (catId, subId) => {
    const c = cats.find(x => x.id === catId);
    return c && (c.sub || []).find(s => s.id === subId);
  };

  const products = (tienda.productos || []).filter((p, i, lista) => {
    const faltan = ["id", "name", "price"].filter(k => p[k] === undefined || p[k] === "");
    if (faltan.length){
      console.warn(`[Street Blush] El producto #${i + 1} no tiene ${faltan.join(", ")} y no se muestra.`, p);
      return false;
    }
    if (lista.findIndex(x => x.id === p.id) !== i){
      console.warn(`[Street Blush] El id "${p.id}" está repetido: solo se muestra el primero.`);
      return false;
    }
    if (p.cat && !cats.some(c => c.id === p.cat)) console.warn(`[Street Blush] "${p.name}" usa la categoría "${p.cat}", que no existe.`);
    else if (p.sub && !subInfo(p.cat, p.sub)) console.warn(`[Street Blush] "${p.name}" usa la subcategoría "${p.sub}", que no existe en "${p.cat}".`);
    return true;
  }).map(p => {
    const c = cats.find(x => x.id === p.cat);
    const s = subInfo(p.cat, p.sub);
    return {
      ...p,
      id: String(p.id),
      price: Number(p.price),
      desc: p.desc || "",
      detalle: p.detalle || "",
      color: p.color || "",
      caracteristicas: Array.isArray(p.caracteristicas) ? p.caracteristicas : [],
      imgs: (Array.isArray(p.imgs) && p.imgs.length ? p.imgs : [p.img]).filter(Boolean),
      icon: SB.ICONS[p.icon] ? p.icon : "tee",
      categoriaNombre: s ? s.nombre : (c ? c.nombre : tienda.categoria),
      catNombre: c ? c.nombre : "",
      categoriaCarrito: "Ropa",
      tallas: p.talla ? [p.talla] : (p.tallas || tienda.tallas || [])
    };
  });

  const buscar = (id) => products.find(p => p.id === id);
  const deCat = (id) => products.filter(p => p.cat === id);
  const deSub = (id) => products.filter(p => p.sub === id);
  const normal = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function coincide(p, q){
    const texto = normal([p.name, p.desc, p.color, p.categoriaNombre, p.catNombre, p.detalle].join(" "));
    return normal(q).split(/\s+/).filter(Boolean).every(t => texto.includes(t));
  }

  /* ---------- Tarjeta de producto ---------- */
  const HEART = (lleno) => `<svg viewBox="0 0 24 24" fill="${lleno ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 20.5s-7-4.2-9.3-8.6C1 8.4 2.4 5 5.7 4.4 8.1 4 10 5.2 12 7.6 14 5.2 15.9 4 18.3 4.4 21.6 5 23 8.4 21.3 11.9 19 16.3 12 20.5 12 20.5Z"/></svg>`;
  const PLUS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;

  function mediaHTML(p, clase){
    return p.imgs.length
      ? `<img class="${clase}" src="${esc(p.imgs[0])}" alt="" loading="lazy" decoding="async">`
      : SB.ICONS[p.icon];
  }

  const datosCarrito = (p, talla) => `data-nombre="${esc(p.name)}" data-precio="${p.price}" data-categoria="Ropa"
    data-talla="${esc(talla)}" data-tallas="${esc(p.tallas.join("|"))}" data-img="${esc(p.imgs[0] || "")}" data-icon="${esc(p.icon)}"`;

  function quickHTML(p){
    const unica = p.tallas.length <= 1;
    return `
      <div class="pc-quick" id="quick-${esc(p.id)}-${uid}">
        ${unica
          ? `<button class="pc-quick-one btn-agregar" type="button" ${datosCarrito(p, p.tallas[0] || "")} aria-label="Agregar ${esc(p.name)} al carrito">Agregar al carrito</button>`
          : `<p class="pc-quick-label">Agregar talla</p>
             <div class="pc-sizes">
               ${p.tallas.map(t => `<button class="pc-size btn-agregar" type="button" ${datosCarrito(p, t)} aria-label="Agregar ${esc(p.name)} talla ${esc(t)} al carrito">${esc(t)}</button>`).join("")}
             </div>`}
      </div>`;
  }

  let uid = 0;
  function cardHTML(p, i = 0){
    uid++;
    const fav = favs.has(p.id);
    const alt = p.imgs[1];
    return `
      <article class="pc${alt ? " has-alt" : ""}" data-producto="${esc(p.id)}" style="--i:${i}">
        <div class="pc-media">
          <a class="pc-media-link" href="#producto/${encodeURIComponent(p.id)}" tabindex="-1" aria-hidden="true">
            ${p.imgs.length
              ? `<img class="pc-img" src="${esc(p.imgs[0])}" alt="" loading="lazy" decoding="async">
                 ${alt ? `<img class="pc-img pc-img-alt" src="${esc(alt)}" alt="" loading="lazy" decoding="async">` : ""}`
              : `<span class="pc-icon">${SB.ICONS[p.icon]}</span>`}
          </a>
          ${p.drop ? `<span class="pc-badge">${esc(etiquetaDrop)}</span>` : ""}
          <button class="pc-fav" type="button" data-fav="${esc(p.id)}" aria-pressed="${fav}" aria-label="${fav ? "Quitar de favoritos" : "Guardar en favoritos"}: ${esc(p.name)}">${HEART(fav)}</button>
          <button class="pc-plus" type="button" aria-expanded="false" aria-controls="quick-${esc(p.id)}-${uid}" aria-label="Agregar rápido: ${esc(p.name)}">${PLUS}</button>
          ${quickHTML(p)}
        </div>
        <div class="pc-info">
          <h3 class="pc-name"><a class="card-open" href="#producto/${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3>
          <p class="pc-meta">${esc([p.categoriaNombre, p.color].filter(Boolean).join(" · "))}</p>
          <p class="pc-price">${SB.money(p.price)}</p>
        </div>
      </article>`;
  }

  const gridHTML = (lista) => lista.map((p, i) => cardHTML(p, i)).join("");

  /* ---------- Favoritos ---------- */
  function actualizarFavoritos(){
    const n = products.filter(p => favs.has(p.id)).length;
    document.querySelectorAll("[data-fav-count]").forEach(el => { el.textContent = String(n); el.hidden = n === 0; });
    document.querySelectorAll("[data-fav]").forEach(btn => {
      const p = buscar(btn.dataset.fav);
      if (!p) return;
      const fav = favs.has(p.id);
      btn.setAttribute("aria-pressed", String(fav));
      btn.setAttribute("aria-label", `${fav ? "Quitar de favoritos" : "Guardar en favoritos"}: ${p.name}`);
      btn.innerHTML = HEART(fav);
    });
  }

  document.addEventListener("click", (e) => {
    const favBtn = e.target.closest("[data-fav]");
    if (favBtn){
      favs.toggle(favBtn.dataset.fav);
      actualizarFavoritos();
      if (coleccion && estado.fav) pintarColeccion();
      return;
    }
    // "+" de la tarjeta: abre las tallas (en pantallas táctiles; con mouse aparecen al pasar)
    const plus = e.target.closest(".pc-plus");
    if (plus){
      const card = plus.closest(".pc");
      const abrir = !card.classList.contains("is-quick");
      cerrarQuicks(card);
      card.classList.toggle("is-quick", abrir);
      plus.setAttribute("aria-expanded", String(abrir));
      if (abrir){
        const primero = card.querySelector(".pc-quick button");
        if (primero) primero.focus({preventScroll:true});
      }
      return;
    }
    // Después de agregar, las tallas se esconden (js/carrito.js ya agregó el producto)
    const agregar = e.target.closest(".pc .btn-agregar");
    if (agregar){
      const card = agregar.closest(".pc");
      agregar.classList.add("is-added");
      setTimeout(() => {
        agregar.classList.remove("is-added");
        if (!card.classList.contains("is-quick")) return;
        const teniaFoco = card.querySelector(".pc-quick").contains(document.activeElement);
        cerrarQuicks();
        if (teniaFoco) card.querySelector(".pc-plus").focus({preventScroll:true});
      }, 650);
      return;
    }
    if (!e.target.closest(".pc-quick")) cerrarQuicks();
  });

  function cerrarQuicks(excepto){
    document.querySelectorAll(".pc.is-quick").forEach(c => {
      if (c === excepto) return;
      c.classList.remove("is-quick");
      c.querySelector(".pc-plus").setAttribute("aria-expanded", "false");
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const abierta = document.querySelector(".pc.is-quick");
    if (abierta){
      cerrarQuicks();
      abierta.querySelector(".pc-plus").focus();
    }
  });

  /* ---------- Grids ---------- */
  function listaPara(clave){
    if (clave === "destacados") return products.filter(p => p.destacado);
    if (clave === "drop") return products.filter(p => p.drop);
    if (clave.startsWith("cat:")) return deCat(clave.slice(4));
    if (clave.startsWith("sub:")) return deSub(clave.slice(4));
    return products;
  }
  document.querySelectorAll("[data-grid]").forEach(el => {
    const limite = Number(el.dataset.limit) || Infinity;
    el.innerHTML = gridHTML(listaPara(el.dataset.grid).slice(0, limite));
  });

  /* ---------- Tabs de colecciones ---------- */
  let tabsUid = 0;
  document.querySelectorAll("[data-tabs]").forEach(root => {
    const n = ++tabsUid;
    let tabs;
    if (root.dataset.tabs === "subs"){
      tabs = (root.dataset.subs || "").split(",").map(id => id.trim()).filter(Boolean).map(id => {
        const c = cats.find(x => (x.sub || []).some(s => s.id === id));
        const s = c && c.sub.find(x => x.id === id);
        return s && {id, nombre: s.nombre, lista: deSub(id), href: `coleccion.html?c=${c.id}&s=${id}`};
      }).filter(Boolean);
    } else {
      tabs = cats.map(c => ({id: c.id, nombre: c.nombre, lista: deCat(c.id), href: `coleccion.html?c=${c.id}`}));
    }
    // Lo del New drop va al final: esa sección ya lo muestra
    tabs = tabs.filter(t => t.lista.length).map(t => ({...t, lista: [...t.lista].sort((x, y) => !!x.drop - !!y.drop)}));
    if (!tabs.length){ root.hidden = true; return; }
    const limite = Number(root.dataset.limit) || 4;

    const lista = root.querySelector("[data-tablist]");
    const panel = root.querySelector("[data-tabpanel]");
    lista.setAttribute("role", "tablist");
    lista.innerHTML = tabs.map((t, i) => `
      <button class="hb-tab" type="button" role="tab" id="tab-${n}-${t.id}" aria-controls="tabpanel-${n}"
        aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(t.nombre)}</button>`).join("");
    panel.id = `tabpanel-${n}`;
    panel.setAttribute("role", "tabpanel");
    panel.tabIndex = -1;

    const botones = [...lista.querySelectorAll("[role=tab]")];
    function elegir(i, foco){
      const t = tabs[i];
      botones.forEach((b, k) => {
        b.setAttribute("aria-selected", String(k === i));
        b.tabIndex = k === i ? 0 : -1;
      });
      if (foco) botones[i].focus();
      panel.setAttribute("aria-labelledby", botones[i].id);
      panel.innerHTML = `
        <div class="hb-row">${gridHTML(t.lista.slice(0, limite))}</div>
        <a class="hb-link-more" href="${t.href}">Ver todo en ${esc(t.nombre.toLowerCase())}</a>`;
      panel.classList.remove("is-in");
      void panel.offsetWidth;
      panel.classList.add("is-in");
    }
    lista.addEventListener("click", (e) => {
      const b = e.target.closest("[role=tab]");
      if (b) elegir(botones.indexOf(b), false);
    });
    lista.addEventListener("keydown", (e) => {
      const i = botones.indexOf(document.activeElement);
      if (i < 0) return;
      let j = null;
      if (e.key === "ArrowRight") j = (i + 1) % botones.length;
      if (e.key === "ArrowLeft") j = (i - 1 + botones.length) % botones.length;
      if (e.key === "Home") j = 0;
      if (e.key === "End") j = botones.length - 1;
      if (j === null) return;
      e.preventDefault();
      elegir(j, true);
    });
    elegir(0, false);
  });

  /* ---------- Slideshows ---------- */
  document.querySelectorAll("[data-slideshow]").forEach(show => {
    const slides = [...show.querySelectorAll(".hb-slide")];
    if (slides.length < 2) return;
    const dots = show.querySelector("[data-dots]");
    const contador = show.querySelector("[data-counter]");
    const pausaBtn = show.querySelector("[data-pause]");
    const autoplay = Number(show.dataset.autoplay) || 0;
    let actual = 0;
    let timer = null;
    let pausadoPorUsuario = reduce.matches;
    let pausadoTemporal = false;

    if (dots){
      dots.innerHTML = slides.map((s, i) => `
        <button class="hb-dot" type="button" aria-label="Ver campaña ${i + 1} de ${slides.length}"><span class="hb-dot-fill"></span></button>`).join("");
    }
    const dotBtns = dots ? [...dots.children] : [];

    function ir(i){
      actual = (i + slides.length) % slides.length;
      slides.forEach((s, k) => {
        const activa = k === actual;
        s.classList.toggle("is-active", activa);
        s.setAttribute("aria-hidden", String(!activa));
        s.inert = !activa;
      });
      dotBtns.forEach((d, k) => {
        d.classList.toggle("is-active", k === actual);
        d.setAttribute("aria-current", k === actual ? "true" : "false");
      });
      if (contador) contador.textContent = `${actual + 1} / ${slides.length}`;
      reiniciar();
    }

    function reiniciar(){
      clearTimeout(timer);
      show.classList.remove("is-running");
      if (!autoplay || pausadoPorUsuario || pausadoTemporal) return;
      void show.offsetWidth;                         // reinicia la barra de progreso
      show.classList.add("is-running");
      timer = setTimeout(() => ir(actual + 1), autoplay);
    }

    show.style.setProperty("--autoplay", autoplay + "ms");
    show.querySelector("[data-prev]")?.addEventListener("click", () => ir(actual - 1));
    show.querySelector("[data-next]")?.addEventListener("click", () => ir(actual + 1));
    dotBtns.forEach((d, i) => d.addEventListener("click", () => ir(i)));

    if (pausaBtn){
      const pintarPausa = () => {
        pausaBtn.setAttribute("aria-pressed", String(pausadoPorUsuario));
        pausaBtn.setAttribute("aria-label", pausadoPorUsuario ? "Reproducir campañas" : "Pausar campañas");
        show.classList.toggle("is-paused", pausadoPorUsuario);
      };
      pausaBtn.addEventListener("click", () => { pausadoPorUsuario = !pausadoPorUsuario; pintarPausa(); reiniciar(); });
      pintarPausa();
    }
    if (autoplay){
      const pausar = (v) => { pausadoTemporal = v; reiniciar(); };
      show.addEventListener("mouseenter", () => pausar(true));
      show.addEventListener("mouseleave", () => pausar(false));
      show.addEventListener("focusin", () => pausar(true));
      show.addEventListener("focusout", (e) => { if (!show.contains(e.relatedTarget)) pausar(false); });
      document.addEventListener("visibilitychange", () => pausar(document.hidden));
    }

    // Deslizar con el dedo
    let x0 = null;
    show.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
    show.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 45) ir(actual + (dx < 0 ? 1 : -1));
    });
    show.addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea")) return;
      if (e.key === "ArrowRight") ir(actual + 1);
      if (e.key === "ArrowLeft") ir(actual - 1);
    });

    ir(0);
  });

  /* ---------- Cabecera fija: línea al hacer scroll ---------- */
  const header = document.getElementById("hbHeader");
  if (header){
    const marca = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", marca, {passive:true});
    marca();
  }

  /* ---------- Submenú: Escape lo cierra ---------- */
  document.querySelectorAll(".hb-nav-item.has-mega").forEach(item => {
    item.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      item.classList.add("is-closed");
      item.querySelector(".hb-nav-link").focus();
    });
    const abrir = () => item.classList.remove("is-closed");
    item.addEventListener("mouseleave", abrir);
    item.addEventListener("focusout", (e) => { if (!item.contains(e.relatedTarget)) abrir(); });
    // Al tocar un enlace del submenú se cierra de inmediato
    item.querySelector(".hb-mega")?.addEventListener("click", (e) => {
      if (e.target.closest("a")){ item.classList.add("is-closed"); document.activeElement.blur(); }
    });
  });

  /* ---------- Menú móvil: acordeón ---------- */
  document.querySelectorAll(".hb-acc-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const abrir = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(abrir));
      document.getElementById(btn.getAttribute("aria-controls")).hidden = !abrir;
    });
  });

  /* ---------- Panel de cuenta ---------- */
  const cuentaBtn = document.getElementById("hbAccountBtn");
  const cuenta = document.getElementById("hbAccount");
  function abrirCuenta(abrir){
    if (!cuenta) return;
    cuenta.hidden = !abrir;
    cuentaBtn.setAttribute("aria-expanded", String(abrir));
  }
  if (cuentaBtn){
    cuentaBtn.addEventListener("click", () => {
      abrirBuscador(false, false);
      abrirCuenta(cuenta.hidden);
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".hb-account")) abrirCuenta(false); });
    cuenta.addEventListener("keydown", (e) => { if (e.key === "Escape"){ abrirCuenta(false); cuentaBtn.focus(); } });
  }

  /* ---------- Buscador ---------- */
  const buscadorBtn = document.getElementById("navSearchBtn");
  const buscador = document.getElementById("hbSearch");
  const buscadorInput = document.getElementById("hbSearchInput");
  const buscadorBody = document.getElementById("hbSearchBody");
  const POPULARES = ["Oversize", "Jeans", "Cargo", "Hoodie", "Gorra"];

  function pintarBusqueda(){
    const q = buscadorInput.value.trim();
    if (!q){
      buscadorBody.innerHTML = `
        <p class="hb-search-label">Búsquedas populares</p>
        <div class="hb-chips">${POPULARES.map(t => `<button class="hb-chip" type="button" data-sugerencia="${esc(t)}">${esc(t)}</button>`).join("")}</div>`;
      return;
    }
    const res = products.filter(p => coincide(p, q));
    if (!res.length){
      buscadorBody.innerHTML = `<p class="hb-search-empty">No encontramos nada con “${esc(q)}”. Prueba con “oversize”, “jean” o “hoodie”.</p>`;
      return;
    }
    buscadorBody.innerHTML = `
      <p class="hb-search-label">${res.length === 1 ? "1 producto" : `${res.length} productos`}</p>
      <ul class="hb-search-results">
        ${res.slice(0, 6).map(p => `
          <li><a class="hb-result" href="#producto/${encodeURIComponent(p.id)}">
            <span class="hb-result-img">${p.imgs.length ? `<img src="${esc(p.imgs[0])}" alt="" decoding="async">` : SB.ICONS[p.icon]}</span>
            <span class="hb-result-text"><span class="hb-result-name">${esc(p.name)}</span><span class="hb-result-price">${SB.money(p.price)}</span></span>
          </a></li>`).join("")}
      </ul>
      <a class="hb-link-more" href="coleccion.html?q=${encodeURIComponent(q)}">Ver todos los resultados</a>`;
  }

  function abrirBuscador(abrir, devolverFoco = true){
    if (!buscador) return;
    if (abrir === !buscador.hidden) return;
    buscador.hidden = !abrir;
    buscadorBtn.setAttribute("aria-expanded", String(abrir));
    header.classList.toggle("is-searching", abrir);
    if (abrir){
      abrirCuenta(false);
      pintarBusqueda();
      buscadorInput.focus({preventScroll:true});
    } else if (devolverFoco) buscadorBtn.focus();
  }
  if (buscadorBtn && buscador){
    buscadorBtn.addEventListener("click", () => abrirBuscador(buscador.hidden));
    buscadorInput.addEventListener("input", pintarBusqueda);
    buscador.addEventListener("click", (e) => {
      const s = e.target.closest("[data-sugerencia]");
      if (s){ buscadorInput.value = s.dataset.sugerencia; pintarBusqueda(); buscadorInput.focus(); }
      if (e.target.closest("[data-search-close]")) abrirBuscador(false);
      if (e.target.closest(".hb-result")) abrirBuscador(false, false);
    });
    buscador.addEventListener("keydown", (e) => { if (e.key === "Escape") abrirBuscador(false); });
    document.addEventListener("click", (e) => {
      if (!buscador.hidden && !e.target.closest("#hbSearch, #navSearchBtn")) abrirBuscador(false, false);
    });
    // En la colección, buscar cambia el listado sin recargar
    buscador.querySelector("form").addEventListener("submit", (e) => {
      const q = buscadorInput.value.trim();
      if (!q){ e.preventDefault(); return; }
      if (coleccion){
        e.preventDefault();
        estado = {c:"", s:"", q, fav:false, orden:estado.orden};
        pintarColeccion(true);
        abrirBuscador(false, false);
        coleccion.focus({preventScroll:true});
      }
    });
  }

  /* ---------- Newsletter (sin servidor: se confirma por WhatsApp) ---------- */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  document.querySelectorAll("[data-newsletter]").forEach(form => {
    const input = form.querySelector("input[type=email]");
    const hint = form.querySelector("[data-news-hint]");
    const textoHint = hint.textContent;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const correo = input.value.trim();
      if (!EMAIL.test(correo)){
        input.setAttribute("aria-invalid", "true");
        hint.textContent = correo ? "Revisa el correo: parece que le falta algo (ej. tu@correo.com)." : "Escribe tu correo para avisarte.";
        hint.classList.add("is-error");
        input.focus();
        return;
      }
      input.setAttribute("aria-invalid", "false");
      hint.classList.remove("is-error");
      hint.classList.add("is-ok");
      hint.textContent = "¡Listo! Termina de confirmar en WhatsApp.";
      window.open(SB.waLink(`Hola Street Blush! Quiero recibir los avisos de nuevos drops en mi correo: ${correo}`), "_blank", "noopener");
      guardarPopup(180);
      if (form.closest("#hbPopup")) setTimeout(() => cerrarPopup(), 900);
      form.reset();
    });
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") !== "true") return;
      input.setAttribute("aria-invalid", "false");
      hint.classList.remove("is-error");
      hint.textContent = textoHint;
    });
  });

  /* ---------- Popup de bienvenida ---------- */
  const KEY_POPUP = "streetblush_popup_hombre";
  const popup = document.getElementById("hbPopup");
  let focoPopup = null;
  function guardarPopup(dias){
    try{ localStorage.setItem(KEY_POPUP, String(Date.now() + dias * 864e5)); }catch(e){}
  }
  function popupPendiente(){
    try{ return Date.now() > Number(localStorage.getItem(KEY_POPUP) || 0); }catch(e){ return false; }
  }
  function abrirPopup(){
    const ocupado = document.querySelector(".cart-panel.open, .pv.open, .hb-drawer.open") || location.hash.startsWith("#producto/");
    if (!popup || ocupado) return;
    focoPopup = document.activeElement;
    popup.hidden = false;
    requestAnimationFrame(() => popup.classList.add("open"));
    document.body.classList.add("drawer-open");
    setTimeout(() => popup.querySelector("input").focus({preventScroll:true}), 80);
  }
  function cerrarPopup(){
    if (!popup || popup.hidden) return;
    guardarPopup(7);
    popup.classList.remove("open");
    document.body.classList.remove("drawer-open");
    setTimeout(() => { popup.hidden = true; }, reduce.matches ? 0 : 320);
    if (focoPopup && document.contains(focoPopup)) focoPopup.focus({preventScroll:true});
  }
  if (popup){
    popup.addEventListener("click", (e) => { if (e.target.closest("[data-popup-close]")) cerrarPopup(); });
    popup.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarPopup();
      if (e.key !== "Tab") return;
      const focos = [...popup.querySelectorAll("button, input, a[href]")].filter(el => el.offsetParent);
      const primero = focos[0], ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero){ e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo){ e.preventDefault(); primero.focus(); }
    });
    if (popupPendiente() && document.body.dataset.popup !== "no") setTimeout(abrirPopup, 6000);
  }

  /* ---------- Página de colección ---------- */
  const coleccion = document.getElementById("hbColeccion");
  let estado = {c:"", s:"", q:"", fav:false, orden:"destacados"};

  function leerURL(){
    const u = new URLSearchParams(location.search);
    estado = {
      c: u.get("c") || "",
      s: u.get("s") || "",
      q: u.get("q") || "",
      fav: u.get("fav") === "1",
      orden: u.get("orden") || "destacados"
    };
    if (estado.c && estado.c !== "novedades" && !cats.some(c => c.id === estado.c)) estado.c = "";
    if (estado.s && !subInfo(estado.c, estado.s)) estado.s = "";
  }

  function escribirURL(){
    const u = new URLSearchParams();
    if (estado.c) u.set("c", estado.c);
    if (estado.s) u.set("s", estado.s);
    if (estado.q) u.set("q", estado.q);
    if (estado.fav) u.set("fav", "1");
    if (estado.orden !== "destacados") u.set("orden", estado.orden);
    const qs = u.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  const ORDENES = {
    destacados: (a, b) => (b.drop - a.drop) || (!!b.destacado - !!a.destacado),
    "precio-asc": (a, b) => a.price - b.price,
    "precio-desc": (a, b) => b.price - a.price,
    nombre: (a, b) => a.name.localeCompare(b.name, "es")
  };

  function pintarColeccion(cambioURL){
    const cat = cats.find(c => c.id === estado.c);
    let lista = products;
    let titulo = "Todo el streetwear";
    let intro = "Camisetas, pantalones, buzos, chaquetas y gorras. Elige tu talla y agrégalo al carrito.";
    let migas = [];

    if (estado.fav){
      lista = lista.filter(p => favs.has(p.id));
      titulo = "Mis favoritos";
      intro = "Lo que guardaste con el corazón. Se guarda en este dispositivo.";
    } else if (estado.q){
      lista = lista.filter(p => coincide(p, estado.q));
      titulo = `Resultados para “${estado.q}”`;
      intro = "";
    } else if (estado.c === "novedades"){
      lista = lista.filter(p => p.drop);
      titulo = "Novedades";
      intro = "Lo último en llegar. Las tandas son cortas: cuando se agota, no vuelve.";
    } else if (cat){
      lista = lista.filter(p => p.cat === cat.id);
      titulo = cat.nombre;
      intro = "";
      migas = [{txt: cat.nombre, href: estado.s ? `coleccion.html?c=${cat.id}` : ""}];
      if (estado.s){
        const s = subInfo(cat.id, estado.s);
        lista = lista.filter(p => p.sub === estado.s);
        titulo = s.nombre;
        migas.push({txt: s.nombre, href: ""});
      }
    }
    lista = [...lista].sort(ORDENES[estado.orden] || ORDENES.destacados);

    // Chips: subcategorías de la categoría, o las categorías cuando se ve todo
    let chips = "";
    if (cat && (cat.sub || []).length){
      chips = [{id:"", nombre:"Todo"}, ...cat.sub].map(s => `
        <button class="hb-chip" type="button" data-chip-s="${esc(s.id)}" aria-pressed="${s.id === estado.s}">${esc(s.nombre)}</button>`).join("");
    } else if (!estado.c && !estado.q && !estado.fav){
      chips = cats.map(c => `<a class="hb-chip" href="coleccion.html?c=${esc(c.id)}">${esc(c.nombre)}</a>`).join("");
    }

    coleccion.querySelector("[data-col-migas]").innerHTML = `
      <li><a href="index.html">Inicio</a></li>
      ${migas.length ? migas.map(m => `<li>${m.href ? `<a href="${m.href}">${esc(m.txt)}</a>` : `<span aria-current="page">${esc(m.txt)}</span>`}</li>`).join("")
        : `<li><span aria-current="page">${esc(titulo)}</span></li>`}`;
    coleccion.querySelector("[data-col-titulo]").textContent = titulo;
    const introEl = coleccion.querySelector("[data-col-intro]");
    introEl.textContent = intro;
    introEl.hidden = !intro;
    const chipsEl = coleccion.querySelector("[data-col-chips]");
    chipsEl.innerHTML = chips;
    chipsEl.hidden = !chips;
    coleccion.querySelector("[data-col-count]").textContent = lista.length === 1 ? "1 producto" : `${lista.length} productos`;
    coleccion.querySelector("[data-col-orden]").value = estado.orden;
    document.title = `${titulo} · Street Blush Hombre`;

    const grid = coleccion.querySelector("[data-col-grid]");
    if (!lista.length){
      grid.innerHTML = `
        <div class="hb-empty">
          <p>${estado.fav ? "Todavía no tienes favoritos. Toca el corazón de un producto para guardarlo aquí." : "No encontramos productos con ese filtro."}</p>
          <a class="hb-btn hb-btn-dark" href="coleccion.html">Ver todo el streetwear</a>
        </div>`;
    } else {
      grid.innerHTML = gridHTML(lista);
    }
    if (cambioURL) escribirURL();
  }

  if (coleccion){
    leerURL();
    coleccion.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-chip-s]");
      if (!chip) return;
      estado.s = chip.dataset.chipS;
      pintarColeccion(true);
    });
    coleccion.querySelector("[data-col-orden]").addEventListener("change", (e) => {
      estado.orden = e.target.value;
      pintarColeccion(true);
    });
    pintarColeccion(false);
    if (estado.q && buscadorInput) buscadorInput.value = estado.q;
  }

  /* ---------- Para la vista de producto (js/producto.js) ---------- */
  SB.catalogo = {
    productos: products,
    etiquetaDrop,
    buscar,
    mediaHTML,
    refrescar(){ actualizarFavoritos(); if (coleccion && estado.fav) pintarColeccion(); }
  };

  actualizarFavoritos();
})();
