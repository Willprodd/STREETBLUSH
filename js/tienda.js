/* =====================================================================
   TIENDA — render del catálogo, New drop, búsqueda y filtro de favoritos.
   Compartido por hombre/ y mujer/: los productos llegan en
   window.SB_TIENDA desde js/data/productos-*.js.
   ===================================================================== */
(function(){
  "use strict";

  const SB = window.SB;
  const tienda = window.SB_TIENDA;
  const products = tienda.productos;
  const favs = SB.favoritos;

  const categorias = tienda.categorias || [];
  const etiquetaDrop = tienda.etiquetaDrop || "New drop";

  let favOnly = false;
  let query = "";
  let cat = "";   // "" = todas las categorías

  const grid = document.getElementById("grid");
  const newDropGrid = document.getElementById("newDropGrid");
  const resultCount = document.getElementById("resultCount");
  const searchInput = document.getElementById("searchInput");
  const catalogo = document.getElementById("catalogo");
  const catList = document.getElementById("catList");     // opcional: círculos de categorías
  // El buscador puede estar en la cabecera (fuera del catálogo): entonces, al escribir, se baja al catálogo
  const searchOutside = !catalogo.contains(searchInput);

  function updateFavUI(){
    const badge = document.getElementById("favBadge");
    const n = products.filter(p => favs.has(p.id)).length;  // solo los de esta tienda
    badge.textContent = String(n);
    badge.hidden = n === 0;
    document.getElementById("favChip").setAttribute("aria-pressed", String(favOnly));
  }

  // enDrop: la tarjeta va dentro de la sección New drop, donde la etiqueta sobra
  function cardHTML(p, i, animate, enDrop){
    const fav = favs.has(p.id);
    const catInfo = p.cat && categorias.find(c => c.id === p.cat);
    return `
      <article class="card${animate ? " card-enter" : ""}" style="--i:${i}">
        <div class="card-art">
          ${p.drop && !enDrop ? `<span class="card-cat is-drop">${etiquetaDrop}</span>` : ""}
          <button class="fav-toggle" type="button" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${fav ? "Quitar de favoritos" : "Guardar en favoritos"}: ${p.name}">
            <svg viewBox="0 0 24 24" fill="${fav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" aria-hidden="true">${SB.HEART}</svg>
          </button>
          ${SB.ICONS[p.icon]}
        </div>
        <div class="card-body">
          <p class="card-kicker">${catInfo ? catInfo.nombre : tienda.categoria}</p>
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <div class="card-foot">
            <span class="price">${SB.money(p.price)}</span>
            <a class="buy-btn" href="${SB.waProductLink(p)}" target="_blank" rel="noopener" aria-label="Comprar ${p.name} por WhatsApp">
              ${SB.WA_ICON}
              <span class="text-rise-marquee" aria-hidden="true"><span class="rise-track"><span class="rise-row">Comprar</span><span class="rise-row rise-dup">Comprar</span></span></span>
            </a>
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
    if (favOnly) items = items.filter(p => favs.has(p.id));
    const q = query.trim().toLowerCase();
    if (q) items = items.filter(p => (p.name + " " + p.desc).toLowerCase().includes(q));
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
  document.getElementById("navBagBtn").addEventListener("click", () => {
    SB.scrollToEl(document.getElementById("contacto"));
  });

  searchInput.placeholder = tienda.busqueda;
  renderCategories();
  resetFilters();
  renderGrid(true);
  renderNewDrop(true);
})();
