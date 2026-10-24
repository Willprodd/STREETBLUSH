/* =====================================================================
   TIENDA — render del catálogo, New drop, búsqueda y filtro de favoritos.
   Compartido por hombre/ y mujer/: los productos llegan en
   window.SB_TIENDA desde js/data/productos-*.js.
   ===================================================================== */
(function(){
  "use strict";

  const SB = window.SB;
  const esc = SB.esc;
  const tienda = window.SB_TIENDA;
  const favs = SB.favoritos;

  const categorias = tienda.categorias || [];
  const etiquetaDrop = tienda.etiquetaDrop || "New drop";
  const esRopa = tienda.tipo === "ropa";
  const products = normalizarProductos(tienda.productos || []);

  /* Revisa y completa los datos de js/data/productos-*.js, para que un producto
     nuevo con campos vacíos no rompa la página. Los errores salen en la consola. */
  function normalizarProductos(lista){
    const ids = new Set();
    return lista.filter((p, i) => {
      const faltan = ["id", "name", "price"].filter(k => p[k] === undefined || p[k] === "");
      if (faltan.length){
        console.warn(`[Street Blush] El producto #${i + 1} no tiene ${faltan.join(", ")} y no se muestra.`, p);
        return false;
      }
      if (ids.has(p.id)){
        console.warn(`[Street Blush] El id "${p.id}" está repetido: solo se muestra el primero.`);
        return false;
      }
      if (p.cat && !categorias.some(c => c.id === p.cat)){
        console.warn(`[Street Blush] "${p.name}" usa la categoría "${p.cat}", que no existe en categorias.`);
      }
      ids.add(p.id);
      return true;
    }).map(p => {
      const catInfo = p.cat ? categorias.find(c => c.id === p.cat) : null;
      const categoriaNombre = catInfo ? catInfo.nombre : tienda.categoria;
      // variantes: tonos/sabores con stock propio (maquillaje). Si no hay, se usa
      // el mecanismo de tallas de ropa tal cual existía antes.
      const stockPorTalla = Array.isArray(p.variantes) && p.variantes.length
        ? Object.fromEntries(p.variantes.map(v => [v.talla, v.stock]))
        : null;
      const tallas = stockPorTalla
        ? p.variantes.map(v => v.talla)
        : (esRopa ? (p.talla ? [p.talla] : (p.tallas || tienda.tallas || [])) : []);
      return {
        ...p,
        id: String(p.id),
        price: Number(p.price),
        desc: p.desc || "",
        detalle: p.detalle || "",
        caracteristicas: Array.isArray(p.caracteristicas) ? p.caracteristicas : [],
        imgs: (Array.isArray(p.imgs) && p.imgs.length ? p.imgs : [p.img]).filter(Boolean),
        icon: SB.ICONS[p.icon] ? p.icon : (esRopa ? "hoodie" : "lipstick"),
        categoriaNombre,
        marca: p.marca || "",
        varianteLabel: p.etiquetaVariante || "Tono",
        stockPorTalla,
        // "Ropa" hace que el carrito pida talla; en maquillaje viaja la categoría (Labios, Rubores…)
        categoriaCarrito: esRopa ? "Ropa" : categoriaNombre,
        tallas
      };
    });
  }

  // Suma el stock de todas las variantes de un producto (null si no se controla stock)
  function stockTotal(p){
    return p.stockPorTalla ? Object.values(p.stockPorTalla).reduce((a, b) => a + b, 0) : null;
  }

  let favOnly = false;
  let query = "";
  let cat = "";   // "" = todas las categorías
  let marca = ""; // "" = todas las marcas

  // Filtro de marca: solo tiene sentido mostrarlo si hay 2 o más marcas distintas
  const marcas = [...new Set(products.map(p => p.marca).filter(Boolean))].sort();

  const grid = document.getElementById("grid");
  const newDropGrid = document.getElementById("newDropGrid");
  const resultCount = document.getElementById("resultCount");
  const searchInput = document.getElementById("searchInput");
  const catalogo = document.getElementById("catalogo");
  const catList = document.getElementById("catList");     // opcional: círculos de categorías
  const shopTools = document.querySelector(".shop-tools");
  let marcaSelect = null;
  if (shopTools && marcas.length > 1){
    marcaSelect = document.createElement("select");
    marcaSelect.id = "marcaFilter";
    marcaSelect.className = "marca-filter";
    marcaSelect.setAttribute("aria-label", "Filtrar por marca");
    marcaSelect.innerHTML = `<option value="">Todas las marcas</option>${marcas.map(m => `<option value="${esc(m)}">${esc(m)}</option>`).join("")}`;
    shopTools.prepend(marcaSelect);
    marcaSelect.addEventListener("change", () => {
      marca = marcaSelect.value;
      renderGrid(true);
      SB.scrollToEl(catalogo);
    });
  }
  // El buscador puede estar en la cabecera (fuera del catálogo): entonces, al escribir, se baja al catálogo
  const searchOutside = !catalogo.contains(searchInput);

  function updateFavUI(){
    const badge = document.getElementById("favBadge");
    const n = products.filter(p => favs.has(p.id)).length;  // solo los de esta tienda
    badge.textContent = String(n);
    badge.hidden = n === 0;
    document.getElementById("favChip").setAttribute("aria-pressed", String(favOnly));
  }

  // Imagen principal del producto, o su icono mientras no tenga foto
  function mediaHTML(p, clase){
    return p.imgs.length
      ? `<img class="${clase}" src="${esc(p.imgs[0])}" alt="" loading="lazy" decoding="async">`
      : SB.ICONS[p.icon];
  }

  // Datos que lee js/carrito.js al agregar (id, nombre, precio, talla, foto o icono)
  const datosCarrito = (p) => `data-id="${esc(p.id)}" data-nombre="${esc(p.name)}" data-precio="${p.price}" data-categoria="${esc(p.categoriaCarrito)}"
        data-talla="${esc(p.tallas.length === 1 ? p.tallas[0] : "")}" data-tallas="${esc(p.tallas.join("|"))}"
        data-variante-label="${esc(p.varianteLabel)}"
        data-img="${esc(p.imgs[0] || "")}" data-icon="${esc(p.icon)}"`;

  const enCarrito = (p) => (SB.carrito ? SB.carrito.cantidadDe(p.name) : 0);

  // Sin stock controlado: null. Con stock: agotado si el total es 0.
  const agotado = (p) => p.stockPorTalla !== null && stockTotal(p) === 0;

  // Sin unidades en la bolsa: botón "Agregar". Con unidades: selector − cantidad +
  function agregarBtnHTML(p){
    if (agotado(p)){
      return `<button class="buy-btn" type="button" disabled aria-disabled="true">Agotado</button>`;
    }
    const n = enCarrito(p);
    if (n > 0){
      return `
        <div class="card-qty" role="group" aria-label="${esc(p.name)} en el carrito">
          <button class="card-qty-btn" type="button" data-card-qty="menos" data-nombre="${esc(p.name)}" aria-label="Quitar una unidad de ${esc(p.name)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14"/></svg>
          </button>
          <output aria-live="polite">${n}<span class="sr-only"> en el carrito</span></output>
          <button class="card-qty-btn btn-agregar" type="button" data-card-qty="mas" aria-label="Agregar otra unidad de ${esc(p.name)}"
            ${datosCarrito(p)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>`;
    }
    const texto = `Agregar<span class="buy-extra"> al carrito</span>`;
    return `
      <button class="buy-btn btn-agregar" type="button" data-card-qty="mas" aria-label="Agregar ${esc(p.name)} al carrito"
        ${datosCarrito(p)}>
        ${SB.BAG_ADD}
        <span class="text-rise-marquee" aria-hidden="true"><span class="rise-track"><span class="rise-row">${texto}</span><span class="rise-row rise-dup">${texto}</span></span></span>
      </button>`;
  }

  // Cuando cambia la bolsa, cada tarjeta actualiza su botón sin volver a pintar el catálogo
  function actualizarBotonesCarrito(){
    document.querySelectorAll(".card[data-producto] .card-buy").forEach(caja => {
      const p = products.find(x => x.id === caja.closest(".card").dataset.producto);
      if (!p) return;
      const n = String(enCarrito(p));
      if (caja.dataset.qty === n) return;
      const foco = caja.contains(document.activeElement) ? document.activeElement.dataset.cardQty : null;
      caja.dataset.qty = n;
      caja.innerHTML = agregarBtnHTML(p);
      if (foco){
        const destino = caja.querySelector(`[data-card-qty="${foco}"]`) || caja.querySelector("[data-card-qty]");
        if (destino) destino.focus({preventScroll:true});
      }
    });
  }

  // enDrop: la tarjeta va dentro de la sección New drop, donde la etiqueta sobra.
  // El nombre es un enlace que cubre la tarjeta y abre la vista del producto (js/producto.js).
  // Insignia de stock: "Agotado" si no queda nada, "Últimas unidades" si la única
  // variante (o la variante ya elegida) tiene 1 o 2. Con varias variantes sin elegir
  // aún, el aviso detallado se ve en la vista del producto.
  function stockBadgeHTML(p){
    if (p.stockPorTalla === null) return "";
    const total = stockTotal(p);
    if (total === 0) return `<span class="card-cat is-agotado">Agotado</span>`;
    if (p.tallas.length === 1 && total <= 2) return `<span class="card-cat is-ultimas">Últimas unidades</span>`;
    return "";
  }

  function cardHTML(p, i, animate, enDrop){
    const fav = favs.has(p.id);
    return `
      <article class="card${animate ? " card-enter" : ""}" style="--i:${i}" data-producto="${esc(p.id)}">
        <div class="card-art${p.imgs.length ? " has-img" : ""}">
          ${p.drop && !enDrop ? `<span class="card-cat is-drop">${esc(etiquetaDrop)}</span>` : stockBadgeHTML(p)}
          <button class="fav-toggle" type="button" data-fav="${esc(p.id)}" aria-pressed="${fav}" aria-label="${fav ? "Quitar de favoritos" : "Guardar en favoritos"}: ${esc(p.name)}">
            <svg viewBox="0 0 24 24" fill="${fav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" aria-hidden="true">${SB.HEART}</svg>
          </button>
          ${mediaHTML(p, "card-img")}
        </div>
        <div class="card-body">
          <p class="card-kicker">${esc(p.categoriaNombre)}</p>
          <h3><a class="card-open" href="#producto/${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3>
          <p class="desc">${esc(p.desc)}</p>
          <div class="card-foot">
            <span class="price">${SB.money(p.price)}</span>
            <div class="card-buy" data-qty="${enCarrito(p)}">${agregarBtnHTML(p)}</div>
          </div>
        </div>
      </article>`;
  }

  function attachCardHandlers(container){
    container.querySelectorAll("[data-fav]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.fav;
        favs.toggle(id);
        updateFavUI();
        renderGrid(false);
        renderNewDrop(false);
        const again = container.querySelector(`[data-fav="${id}"]`);
        if (again) again.focus({preventScroll:true});
      });
    });
  }

  function renderCategories(){
    if (!catList || !categorias.length) return;
    catList.innerHTML = categorias.map(c => `
      <li>
        <button class="cat-item" type="button" data-cat="${c.id}" aria-pressed="${c.id === cat}">
          <span class="cat-circle">${c.img ? `<img src="${c.img}" alt="" loading="lazy">` : SB.ICONS[c.icon]}</span>
          <span class="cat-name">${c.nombre}</span>
        </button>
      </li>`).join("");
  }

  function updateCategoryUI(){
    if (!catList) return;
    catList.querySelectorAll("[data-cat]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
  }

  function renderGrid(animate){
    let items = products;
    if (cat) items = items.filter(p => p.cat === cat);
    if (marca) items = items.filter(p => p.marca === marca);
    if (favOnly) items = items.filter(p => favs.has(p.id));
    const q = query.trim().toLowerCase();
    if (q) items = items.filter(p => [p.name, p.desc, p.categoriaNombre, p.detalle].join(" ").toLowerCase().includes(q));
    const catInfo = cat && categorias.find(c => c.id === cat);
    resultCount.textContent = (items.length === 1 ? "1 producto" : `${items.length} productos`) + (catInfo ? ` en ${catInfo.nombre}` : "");

    if (items.length === 0){
      grid.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <p>${favOnly && !q ? "Todavía no tienes favoritos en esta tienda. Toca el corazón de un producto para guardarlo." : "No encontramos productos con ese filtro. Prueba otra búsqueda o quita algún filtro."}</p>
          <button class="empty-reset" type="button" id="emptyReset">Ver todo el catálogo</button>
        </div>`;
      document.getElementById("emptyReset").addEventListener("click", () => { resetFilters(); renderGrid(true); });
      return;
    }
    grid.innerHTML = items.map((p, i) => cardHTML(p, i, animate)).join("");
    attachCardHandlers(grid);
  }

  function renderNewDrop(animate){
    newDropGrid.innerHTML = products.filter(p => p.drop).map((p, i) => cardHTML(p, i, animate, true)).join("");
    attachCardHandlers(newDropGrid);
  }

  function resetFilters(){
    favOnly = false;
    query = "";
    cat = "";
    marca = "";
    if (marcaSelect) marcaSelect.value = "";
    searchInput.value = "";
    updateFavUI();
    updateCategoryUI();
  }

  // Baja al catálogo solo si no se está viendo ya (el buscador de la cabecera sigue visible)
  function revealCatalog(){
    const r = catalogo.getBoundingClientRect();
    if (r.top > window.innerHeight * .6 || r.bottom < 120) SB.scrollToEl(catalogo);
  }

  document.getElementById("favChip").addEventListener("click", () => {
    favOnly = !favOnly;
    updateFavUI();
    renderGrid(true);
    SB.scrollToEl(catalogo);
  });

  searchInput.addEventListener("input", () => {
    query = searchInput.value;
    renderGrid(false);
    if (searchOutside && query.trim()) revealCatalog();
  });
  const searchForm = searchInput.closest("form");
  if (searchForm) searchForm.addEventListener("submit", (e) => { e.preventDefault(); SB.scrollToEl(catalogo); });

  if (catList){
    catList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      cat = (btn.dataset.cat === cat) ? "" : btn.dataset.cat;   // tocar la activa la quita
      query = "";                 // elegir categoría empieza de cero, sin la búsqueda anterior
      searchInput.value = "";
      updateCategoryUI();
      renderGrid(true);
      SB.scrollToEl(catalogo);
    });
  }

  const navSearchBtn = document.getElementById("navSearchBtn");
  const searchBar = document.getElementById("searchBar");   // buscador desplegable de la cabecera
  if (navSearchBtn && searchBar){
    const panel = searchBar.querySelector(".searchbar-inner");
    panel.inert = true;
    const abrirBuscador = (abrir) => {
      searchBar.classList.toggle("open", abrir);
      navSearchBtn.setAttribute("aria-expanded", String(abrir));
      panel.inert = !abrir;
      if (abrir) setTimeout(() => searchInput.focus({preventScroll:true}), 120);
      else navSearchBtn.focus();
    };
    navSearchBtn.addEventListener("click", () => abrirBuscador(!searchBar.classList.contains("open")));
    searchBar.addEventListener("keydown", (e) => { if (e.key === "Escape") abrirBuscador(false); });
  } else if (navSearchBtn){
    navSearchBtn.addEventListener("click", () => {
      SB.scrollToEl(catalogo);
      setTimeout(() => searchInput.focus({preventScroll:true}), 450);
    });
  }
  // La bolsa del header la maneja js/carrito.js
  document.addEventListener("sb:carrito", actualizarBotonesCarrito);
  document.addEventListener("click", (e) => {
    const menos = e.target.closest('[data-card-qty="menos"]');
    if (menos && SB.carrito) SB.carrito.quitarUno(menos.dataset.nombre);
  });

  // Para la vista de producto (js/producto.js)
  SB.catalogo = {
    productos: products,
    etiquetaDrop,
    buscar: (id) => products.find(p => p.id === id),
    mediaHTML,
    refrescar(){ updateFavUI(); renderGrid(false); renderNewDrop(false); }
  };

  searchInput.placeholder = tienda.busqueda;
  renderCategories();
  resetFilters();
  renderGrid(true);
  renderNewDrop(true);
})();
