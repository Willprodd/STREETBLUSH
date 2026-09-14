/* =====================================================================
   VISTA DE PRODUCTO
   Al tocar una tarjeta se abre una pantalla con la imagen grande, precio,
   descripción, detalles, talla (en ropa), cantidad y "Agregar al carrito".

   - Cada producto tiene su propio enlace: tienda.html#producto/<id>.
     Se puede compartir, y el botón "atrás" del celular la cierra.
   - Lee los productos ya normalizados de SB.catalogo (js/tienda.js) y
     agrega con agregarAlCarrito() (js/carrito.js).
   ===================================================================== */
(function(){
  "use strict";

  const SB = window.SB;
  const catalogo = SB.catalogo;
  if (!catalogo) return;

  const esc = SB.esc;
  const PREFIJO = "#producto/";
  const CANTIDAD_MAX = 20;

  let producto = null;
  let cantidad = 1;
  let talla = "";
  let imagen = 0;
  let ultimoFoco = null;
  let entradaEnHistorial = false;   // true si al abrir se sumó una entrada al historial
  let timerAgregado = null;

  /* ---------- Estructura ---------- */
  const overlay = document.createElement("div");
  overlay.className = "pv-overlay";
  const dialogo = document.createElement("div");
  dialogo.className = "pv";
  dialogo.id = "productView";
  dialogo.setAttribute("role", "dialog");
  dialogo.setAttribute("aria-modal", "true");
  dialogo.setAttribute("aria-labelledby", "pvTitle");
  dialogo.inert = true;
  document.body.append(overlay, dialogo);
  const vista = document.querySelector(".store-view");

  /* ---------- Abrir y cerrar ---------- */
  const idDelHash = () => location.hash.startsWith(PREFIJO) ? decodeURIComponent(location.hash.slice(PREFIJO.length)) : "";
  const estaAbierta = () => dialogo.classList.contains("open");

  function mostrar(id){
    const p = catalogo.buscar(id);
    if (!p) return false;
    if (SB.carrito) SB.carrito.cerrar();
    if (!estaAbierta()) ultimoFoco = document.activeElement;
    producto = p;
    cantidad = 1;
    talla = p.tallas.length === 1 ? p.tallas[0] : "";
    imagen = 0;
    render();
    dialogo.inert = false;
    if (vista) vista.inert = true;
    dialogo.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("drawer-open");
    dialogo.scrollTop = 0;                                   // celular: la pantalla completa se desplaza
    dialogo.querySelector(".pv-content").scrollTop = 0;      // computador: se desplaza la columna de texto
    setTimeout(() => dialogo.querySelector('[data-pv="cerrar"]').focus({preventScroll:true}), 60);
    return true;
  }

  function ocultar(devolverFoco){
    if (!estaAbierta()) return;
    dialogo.classList.remove("open");
    overlay.classList.remove("open");
    dialogo.inert = true;
    // Si la bolsa ya se está abriendo, ella maneja el bloqueo de la página
    if (!document.querySelector(".cart-panel.open")){
      document.body.classList.remove("drawer-open");
      if (vista) vista.inert = false;
    }
    if (devolverFoco && producto){
      // Las tarjetas se vuelven a pintar al marcar favoritos: se busca el enlace de nuevo
      const destino = document.contains(ultimoFoco) ? ultimoFoco
        : document.querySelector(`[data-producto="${CSS.escape(producto.id)}"] .card-open`);
      if (destino) destino.focus({preventScroll:true});
    }
  }

  // Cierra y quita #producto/… de la dirección
  function cerrar(devolverFoco = true){
    if (!estaAbierta()) return;
    ocultar(devolverFoco);
    if (!idDelHash()) return;
    if (entradaEnHistorial){
      entradaEnHistorial = false;
      history.back();                 // el hashchange que llega después ya la encuentra cerrada
    } else {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function sincronizarConHash(){
    const id = idDelHash();
    if (id){
      if (!mostrar(id)) history.replaceState(null, "", location.pathname + location.search);
    } else {
      entradaEnHistorial = false;
      ocultar(true);
    }
  }

  window.addEventListener("hashchange", () => {
    if (idDelHash()) entradaEnHistorial = true;
    sincronizarConHash();
  });

  /* ---------- Pintar ---------- */
  function render(){
    const p = producto;
    const fav = SB.favoritos.has(p.id);
    const varias = p.imgs.length > 1;

    dialogo.innerHTML = `
      <button class="pv-close" type="button" data-pv="cerrar" aria-label="Cerrar producto">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>

      <div class="pv-media">
        <div class="pv-main${p.imgs.length ? " has-img" : ""}">
          ${p.drop ? `<span class="card-cat is-drop">${esc(catalogo.etiquetaDrop)}</span>` : ""}
          ${p.imgs.length
            ? `<img id="pvImg" src="${esc(p.imgs[imagen])}" alt="${esc(p.name)}" decoding="async">`
            : SB.ICONS[p.icon]}
        </div>
        ${varias ? `
          <div class="pv-thumbs" role="group" aria-label="Fotos de ${esc(p.name)}">
            ${p.imgs.map((src, k) => `
              <button type="button" class="pv-thumb" data-pv="foto" data-k="${k}" aria-label="Ver foto ${k + 1}" aria-pressed="${k === imagen}">
                <img src="${esc(src)}" alt="" loading="lazy">
              </button>`).join("")}
          </div>` : ""}
      </div>

      <div class="pv-info">
        <div class="pv-content">
          <p class="card-kicker">${esc(p.categoriaNombre)}</p>
          <h2 class="pv-title" id="pvTitle">${esc(p.name)}</h2>
          <p class="pv-price">${SB.money(p.price)}</p>
          ${p.desc ? `<p class="pv-desc">${esc(p.desc)}</p>` : ""}

          ${tallasHTML(p)}

          ${p.detalle ? `
            <div class="pv-block">
              <h3 class="pv-label">Descripción</h3>
              <p>${esc(p.detalle)}</p>
            </div>` : ""}

          ${p.caracteristicas.length ? `
            <div class="pv-block">
              <h3 class="pv-label">Detalles</h3>
              <ul class="pv-features">${p.caracteristicas.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
            </div>` : ""}

        </div>

        <div class="pv-buy">
          <div class="pv-qty-row">
            <span class="pv-label" id="pvQtyLabel">Cantidad</span>
            <div class="cart-qty pv-qty" role="group" aria-labelledby="pvQtyLabel">
              <button type="button" data-pv="menos" aria-label="Quitar una unidad">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14" aria-hidden="true"><path d="M5 12h14"/></svg>
              </button>
              <output id="pvQty" aria-live="polite">${cantidad}</output>
              <button type="button" data-pv="mas" aria-label="Agregar una unidad">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
          </div>
          <button class="btn btn-rose pv-add" type="button" data-pv="agregar">
            ${SB.BAG_ADD}
            <span class="pv-add-text">Agregar al carrito · <span id="pvTotal">${SB.money(p.price * cantidad)}</span></span>
          </button>
          <div class="pv-extra">
            <button class="pv-fav" type="button" data-pv="fav" aria-pressed="${fav}">
              <svg viewBox="0 0 24 24" fill="${fav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" aria-hidden="true">${SB.HEART}</svg>
              <span>${fav ? "En favoritos" : "Guardar en favoritos"}</span>
            </button>
            <span class="pv-ship">Envíos a toda Colombia</span>
          </div>
        </div>
      </div>`;
    actualizarCantidad();
  }

  // Tallas justo debajo del precio (solo ropa)
  function tallasHTML(p){
    if (!p.tallas.length) return "";
    return `
      <fieldset class="pv-block pv-sizes">
        <legend class="pv-label">Talla: <span id="pvTallaActual">${esc(talla) || "elige una"}</span></legend>
        <div class="pv-size-list">
          ${p.tallas.map(t => `
            <label class="pv-size">
              <input type="radio" name="pvTalla" value="${esc(t)}"${t === talla ? " checked" : ""} aria-describedby="pvTallaError">
              <span>${esc(t)}</span>
            </label>`).join("")}
        </div>
        <p class="cart-error" id="pvTallaError" hidden>Elige una talla para agregarlo.</p>
      </fieldset>`;
  }

  function actualizarCantidad(){
    const qty = dialogo.querySelector("#pvQty");
    const total = dialogo.querySelector("#pvTotal");
    if (qty) qty.textContent = String(cantidad);
    if (total) total.textContent = SB.money(producto.price * cantidad);
    const menos = dialogo.querySelector('[data-pv="menos"]');
    const mas = dialogo.querySelector('[data-pv="mas"]');
    if (menos) menos.disabled = cantidad <= 1;
    if (mas) mas.disabled = cantidad >= CANTIDAD_MAX;
  }

  function agregar(){
    const p = producto;
    if (p.tallas.length && !talla){
      const error = dialogo.querySelector("#pvTallaError");
      if (error) error.hidden = false;
      const primera = dialogo.querySelector('input[name="pvTalla"]');
      if (primera){
        primera.closest(".pv-sizes").classList.add("is-invalid");
        primera.focus();
      }
      return;
    }
    window.agregarAlCarrito(p.name, p.price, p.categoriaCarrito, talla, cantidad, p.tallas);

    // Confirmación en el mismo botón; la cantidad vuelve a 1 para el siguiente
    const texto = dialogo.querySelector(".pv-add-text");
    const boton = dialogo.querySelector(".pv-add");
    boton.classList.add("is-added");
    texto.textContent = cantidad > 1 ? `${cantidad} agregados al carrito` : "Agregado al carrito";
    cantidad = 1;
    clearTimeout(timerAgregado);
    timerAgregado = setTimeout(() => {
      if (!estaAbierta() || producto !== p) return;
      boton.classList.remove("is-added");
      texto.innerHTML = `Agregar al carrito · <span id="pvTotal"></span>`;
      actualizarCantidad();
    }, 1600);
    actualizarCantidad();
  }

  /* ---------- Eventos ---------- */
  overlay.addEventListener("click", () => cerrar());

  dialogo.addEventListener("click", (e) => {
    const el = e.target.closest("[data-pv]");
    if (!el) return;
    switch (el.dataset.pv){
      case "cerrar": cerrar(); break;
      case "menos": cantidad = Math.max(1, cantidad - 1); actualizarCantidad(); break;
      case "mas": cantidad = Math.min(CANTIDAD_MAX, cantidad + 1); actualizarCantidad(); break;
      case "agregar": agregar(); break;
      case "foto": {
        imagen = Number(el.dataset.k);
        const img = dialogo.querySelector("#pvImg");
        if (img) img.src = producto.imgs[imagen];
        dialogo.querySelectorAll(".pv-thumb").forEach((b, k) => b.setAttribute("aria-pressed", String(k === imagen)));
        break;
      }
      case "fav": {
        SB.favoritos.toggle(producto.id);
        catalogo.refrescar();
        const fav = SB.favoritos.has(producto.id);
        el.setAttribute("aria-pressed", String(fav));
        el.querySelector("svg").setAttribute("fill", fav ? "currentColor" : "none");
        el.querySelector("span").textContent = fav ? "En favoritos" : "Guardar en favoritos";
        break;
      }
    }
  });

  dialogo.addEventListener("change", (e) => {
    if (e.target.name !== "pvTalla") return;
    talla = e.target.value;
    const actual = dialogo.querySelector("#pvTallaActual");
    if (actual) actual.textContent = talla;
    const error = dialogo.querySelector("#pvTallaError");
    if (error) error.hidden = true;
    dialogo.querySelector(".pv-sizes").classList.remove("is-invalid");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && estaAbierta()) cerrar();
  });

  SB.vistaProducto = {abrir: (id) => { location.hash = PREFIJO + encodeURIComponent(id); }, cerrar};

  // Si la página se abrió con un enlace directo a un producto
  if (idDelHash()) sincronizarConHash();
})();
