/* =====================================================================
   CARRITO + PEDIDO POR WHATSAPP
   Compartido por hombre/ y mujer/: un solo carrito para maquillaje y ropa,
   guardado en localStorage para que no se pierda al recargar ni al pasar
   de una tienda a otra.

   - Los botones .btn-agregar / .btn-pedir de las tarjetas agregan el
     producto (leen data-nombre, data-precio, data-categoria, data-talla,
     data-img, data-icon).
   - La bolsa del header (#navBagBtn) abre el panel del carrito.
   - El panel tiene 3 pasos: productos → datos del cliente → enviado.
   ===================================================================== */
(function(){
  "use strict";

  const SB = window.SB;
  const KEY_CARRITO = "streetblush_carrito";
  const KEY_CLIENTE = "streetblush_cliente";
  const CATEGORIA_ROPA = "Ropa";
  const TALLAS_ROPA = ["S", "M", "L", "XL", "XXL"];

  /* ---------- Estado ---------- */
  // Cada línea: {nombre, precio, cantidad, categoria, talla, img, icon}
  let carrito = leer(KEY_CARRITO, []).filter(esLineaValida);
  let cliente = Object.assign({nombre:"", telefono:"", direccion:"", ciudad:"", notas:""}, leer(KEY_CLIENTE, {}));
  let paso = "items";           // "items" | "datos" | "enviado"
  let ultimoFoco = null;

  function leer(key, porDefecto){
    try{ return JSON.parse(localStorage.getItem(key)) ?? porDefecto; }
    catch(e){ return porDefecto; }
  }
  function guardar(key, valor){
    try{ localStorage.setItem(key, JSON.stringify(valor)); }catch(e){}
  }
  function esLineaValida(l){
    return l && typeof l.nombre === "string" && Number.isFinite(l.precio) && l.cantidad > 0;
  }
  const esRopa = (linea) => linea.categoria === CATEGORIA_ROPA;
  const mismaLinea = (a, b) => a.nombre === b.nombre && a.talla === b.talla;
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  /* ---------- Lógica del carrito ---------- */
  // cantidad y tallas son opcionales: la vista de producto manda la cantidad elegida,
  // y tallas guarda las opciones del producto para el selector de la bolsa.
  // media = {img, icon}: la foto o el icono que se ve en la bolsa
  function agregarAlCarrito(nombre, precio, categoria, talla, cantidad = 1, tallas = [], media = {}){
    cantidad = Math.max(1, parseInt(cantidad, 10) || 1);
    if (!nombre || !Number.isFinite(precio)) return;
    const nueva = {nombre, precio, cantidad, categoria: categoria || "", talla: talla || ""};
    if (tallas.length) nueva.tallas = tallas;
    if (media.img) nueva.img = media.img;
    if (media.icon) nueva.icon = media.icon;
    const existente = carrito.find(l => mismaLinea(l, nueva));
    if (existente){
      existente.cantidad += cantidad;
      if (!existente.img && nueva.img) existente.img = nueva.img;
      if (!existente.icon && nueva.icon) existente.icon = nueva.icon;
    }
    else carrito.push(nueva);
    persistir();
    renderCarrito();
    animarContador();
    mostrarToast(cantidad > 1 ? `${cantidad} × ${nombre}` : nombre);
  }

  function cambiarCantidad(i, delta){
    const linea = carrito[i];
    if (!linea) return;
    linea.cantidad += delta;
    if (linea.cantidad < 1) carrito.splice(i, 1);
    persistir();
    renderCarrito();
  }

  // Unidades de un producto en la bolsa, sumando todas sus tallas
  const cantidadDe = (nombre) => carrito.reduce((n, l) => n + (l.nombre === nombre ? l.cantidad : 0), 0);

  // Botón "−" de las tarjetas: resta una unidad de la última línea de ese producto
  function quitarUno(nombre){
    for (let i = carrito.length - 1; i >= 0; i--){
      if (carrito[i].nombre === nombre){ cambiarCantidad(i, -1); return; }
    }
  }

  function quitarLinea(i){
    carrito.splice(i, 1);
    persistir();
    renderCarrito();
  }

  // Cambiar la talla puede juntar dos líneas iguales (mismo producto y talla)
  function cambiarTalla(i, talla){
    const linea = carrito[i];
    if (!linea) return;
    const gemela = carrito.find((l, k) => k !== i && l.nombre === linea.nombre && l.talla === talla);
    if (gemela){
      gemela.cantidad += linea.cantidad;
      carrito.splice(i, 1);
    } else {
      linea.talla = talla;
    }
    persistir();
    renderCarrito();
  }

  function vaciarCarrito(){
    carrito = [];
    persistir();
    paso = "items";
    renderCarrito();
  }

  function calcularTotal(){
    return carrito.reduce((suma, l) => suma + l.precio * l.cantidad, 0);
  }

  const contarUnidades = () => carrito.reduce((n, l) => n + l.cantidad, 0);

  function persistir(){ guardar(KEY_CARRITO, carrito); }

  /* ---------- Mensaje y envío ---------- */
  function generarMensajeWhatsApp(){
    const lineas = carrito.map(l => {
      const detalle = esRopa(l) ? `Talla: ${l.talla || "por definir"}` : l.categoria;
      return `- ${l.nombre}${detalle ? ` (${detalle})` : ""} x ${l.cantidad} = ${SB.money(l.precio * l.cantidad)}`;
    });
    const partes = [
      "Hola, quiero hacer un pedido en Street Blush:",
      "",
      "🧾 DATOS DEL CLIENTE",
      `Nombre: ${cliente.nombre.trim()}`,
      `Teléfono: ${cliente.telefono.trim()}`,
      `Dirección: ${cliente.direccion.trim()}`,
      `Ciudad: ${cliente.ciudad.trim()}`,
      "",
      "🛍️ PEDIDO",
      ...lineas,
      "",
      `💰 TOTAL: ${SB.money(calcularTotal())}`
    ];
    if (cliente.notas.trim()) partes.push("", `📝 Notas: ${cliente.notas.trim()}`);
    return partes.join("\n");
  }

  // Devuelve {campo: mensaje} con los errores; vacío si todo está bien
  function validarCliente(){
    const errores = {};
    if (cliente.nombre.trim().length < 2) errores.nombre = "Escribe tu nombre.";
    const digitos = cliente.telefono.replace(/\D/g, "");
    if (!digitos) errores.telefono = "Escribe tu teléfono.";
    else if (digitos.length < 7 || digitos.length > 13) errores.telefono = "Revisa el número: debe tener entre 7 y 13 dígitos.";
    if (cliente.direccion.trim().length < 4) errores.direccion = "Escribe la dirección de entrega.";
    if (cliente.ciudad.trim().length < 2) errores.ciudad = "Escribe la ciudad o municipio.";
    return errores;
  }

  const lineasSinTalla = () => carrito.map((l, i) => i).filter(i => esRopa(carrito[i]) && !carrito[i].talla);

  function enviarPedido(){
    if (!carrito.length){ irAPaso("items"); return false; }
    if (lineasSinTalla().length){ irAPaso("items"); marcarTallasFaltantes(); return false; }

    leerFormulario();
    const errores = validarCliente();
    mostrarErrores(errores);
    if (Object.keys(errores).length){
      const primero = panel.querySelector('[aria-invalid="true"]');
      if (primero) primero.focus();
      return false;
    }

    guardar(KEY_CLIENTE, cliente);
    const url = `https://wa.me/${SB.WHATSAPP_NUMBER}?text=${encodeURIComponent(generarMensajeWhatsApp())}`;
    const ventana = window.open(url, "_blank");
    if (ventana) ventana.opener = null;
    else window.location.href = url;   // si el navegador bloqueó la pestaña nueva
    irAPaso("enviado");
    return true;
  }

  /* ---------- Interfaz: bolsa del header ---------- */
  const bagBtn = document.getElementById("navBagBtn");
  const contador = document.createElement("span");
  contador.className = "fav-count cart-count";
  contador.hidden = true;
  if (bagBtn) bagBtn.appendChild(contador);

  /* ---------- Interfaz: panel ---------- */
  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  const panel = document.createElement("aside");
  panel.className = "cart-panel";
  panel.id = "cartPanel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-labelledby", "cartTitle");
  panel.innerHTML = `
    <div class="cart-head">
      <div>
        <span class="label" id="cartStep">Tu pedido</span>
        <h2 class="cart-title" id="cartTitle">Bolsa</h2>
      </div>
      <button class="drawer-close" type="button" data-cart="cerrar" aria-label="Cerrar bolsa">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="cart-body" id="cartBody"></div>
    <div class="cart-foot" id="cartFoot"></div>`;
  document.body.append(overlay, panel);
  panel.inert = true;

  const body = panel.querySelector("#cartBody");
  const foot = panel.querySelector("#cartFoot");
  const titulo = panel.querySelector("#cartTitle");
  const antetitulo = panel.querySelector("#cartStep");
  const vista = document.querySelector(".store-view");

  function abrirCarrito(){
    if (panel.classList.contains("open")) return;
    if (SB.vistaProducto) SB.vistaProducto.cerrar(false);   // la bolsa reemplaza a la vista de producto
    ultimoFoco = document.activeElement;
    if (SB.closeDrawer) SB.closeDrawer(false);
    if (paso === "enviado" && carrito.length === 0) paso = "items";
    renderCarrito();
    panel.inert = false;
    if (vista) vista.inert = true;
    panel.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("drawer-open");
    if (bagBtn) bagBtn.setAttribute("aria-expanded", "true");
    setTimeout(() => panel.querySelector('[data-cart="cerrar"]').focus(), 60);
  }

  function cerrarCarrito(){
    if (!panel.classList.contains("open")) return;
    leerFormulario();
    panel.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("drawer-open");
    panel.inert = true;
    if (vista) vista.inert = false;
    if (bagBtn) bagBtn.setAttribute("aria-expanded", "false");
    if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus({preventScroll:true});
  }

  function irAPaso(nuevo){
    leerFormulario();
    paso = nuevo;
    renderCarrito();
    body.scrollTop = 0;
    const foco = paso === "datos" ? panel.querySelector("#cartNombre") : panel.querySelector('[data-cart="cerrar"]');
    if (foco && panel.classList.contains("open")) foco.focus({preventScroll:true});
  }

  function renderCarrito(){
    const unidades = contarUnidades();
    contador.textContent = String(unidades);
    contador.hidden = unidades === 0;
    if (bagBtn) bagBtn.setAttribute("aria-label", unidades ? `Ver bolsa (${unidades} ${unidades === 1 ? "producto" : "productos"})` : "Ver bolsa");

    // Avisa a las tarjetas del catálogo para que muestren la cantidad (js/tienda.js)
    document.dispatchEvent(new CustomEvent("sb:carrito"));

    if (paso !== "enviado" && !carrito.length) paso = "items";
    if (paso === "datos") renderDatos();
    else if (paso === "enviado") renderEnviado();
    else renderItems();
  }

  // Foto del producto, o su icono; las líneas guardadas antes se buscan en el catálogo
  function mediaLinea(l){
    const p = SB.catalogo && SB.catalogo.productos.find(x => x.name === l.nombre);
    const img = l.img || (p && p.imgs[0]);
    if (img) return `<img src="${esc(img)}" alt="" loading="lazy" decoding="async">`;
    const icon = l.icon || (p && p.icon);
    return (icon && SB.ICONS[icon]) || SB.BAG_ADD;
  }

  function renderItems(){
    antetitulo.textContent = "Tu pedido";
    titulo.textContent = "Bolsa";

    if (!carrito.length){
      body.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 8h12l1 12H5Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <p>Tu bolsa está vacía. Toca “Agregar” en un producto para sumarlo a tu pedido.</p>
        </div>`;
      foot.innerHTML = `<button class="btn btn-solid" type="button" data-cart="seguir">Ver catálogo</button>`;
      return;
    }

    body.innerHTML = `
      <ul class="cart-list">
        ${carrito.map((l, i) => `
          <li class="cart-item">
            <div class="cart-item-media">${mediaLinea(l)}</div>
            <div>
              <p class="cart-item-name">${esc(l.nombre)}</p>
              <p class="cart-item-meta">${esRopa(l) ? "Ropa" : esc(l.categoria)} · ${SB.money(l.precio)} c/u</p>
            </div>
            <p class="cart-item-price">${SB.money(l.precio * l.cantidad)}</p>
            <div class="cart-item-controls">
              <div class="cart-qty" role="group" aria-label="Cantidad de ${esc(l.nombre)}">
                <button type="button" data-cart="menos" data-i="${i}" aria-label="Quitar una unidad">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14" aria-hidden="true"><path d="M5 12h14"/></svg>
                </button>
                <output aria-live="polite">${l.cantidad}</output>
                <button type="button" data-cart="mas" data-i="${i}" aria-label="Agregar una unidad">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
              ${esRopa(l) ? tallaHTML(l, i) : ""}
              <button class="cart-remove" type="button" data-cart="quitar" data-i="${i}" aria-label="Quitar ${esc(l.nombre)} de la bolsa">Quitar</button>
            </div>
            ${esRopa(l) ? `<p class="cart-error" id="cartTallaError${i}" hidden>Elige la talla antes de continuar.</p>` : ""}
          </li>`).join("")}
      </ul>`;

    foot.innerHTML = `
      <div class="cart-total"><span>Total</span><strong>${SB.money(calcularTotal())}</strong></div>
      <button class="btn btn-rose" type="button" data-cart="continuar">Continuar con mis datos</button>
      <button class="cart-link" type="button" data-cart="seguir">Seguir comprando</button>`;
  }

  function tallaHTML(l, i){
    const opciones = Array.isArray(l.tallas) && l.tallas.length ? l.tallas : TALLAS_ROPA;
    // Productos de talla única (ej. gorras) llegan con la talla ya puesta
    if (opciones.length === 1 || (l.talla && !opciones.includes(l.talla))) return `<span class="cart-size-fixed">Talla ${esc(l.talla || opciones[0])}</span>`;
    return `
      <label class="cart-size">
        <span class="sr-only">Talla de ${esc(l.nombre)}</span>
        <select data-cart="talla" data-i="${i}" aria-describedby="cartTallaError${i}">
          <option value=""${l.talla ? "" : " selected"}>Talla</option>
          ${opciones.map(t => `<option value="${esc(t)}"${t === l.talla ? " selected" : ""}>${esc(t)}</option>`).join("")}
        </select>
      </label>`;
  }

  function marcarTallasFaltantes(){
    const faltantes = lineasSinTalla();
    faltantes.forEach(i => {
      const select = panel.querySelector(`select[data-i="${i}"]`);
      const error = panel.querySelector(`#cartTallaError${i}`);
      if (select) select.setAttribute("aria-invalid", "true");
      if (error) error.hidden = false;
    });
    const primero = panel.querySelector(`select[data-i="${faltantes[0]}"]`);
    if (primero) primero.focus();
  }

  const CAMPOS = [
    {id:"nombre", label:"Nombre", tipo:"text", auto:"name", req:true},
    {id:"telefono", label:"Teléfono", tipo:"tel", auto:"tel", req:true, modo:"tel"},
    {id:"direccion", label:"Dirección", tipo:"text", auto:"street-address", req:true},
    {id:"ciudad", label:"Ciudad o municipio", tipo:"text", auto:"address-level2", req:true},
    {id:"notas", label:"Notas (opcional)", area:true, placeholder:"Color, talla específica, indicaciones de entrega…"}
  ];

  function renderDatos(){
    antetitulo.textContent = "Paso 2 de 2";
    titulo.textContent = "Tus datos";
    const unidades = contarUnidades();
    body.innerHTML = `
      <div class="cart-summary">
        <span>${unidades} ${unidades === 1 ? "producto" : "productos"}</span>
        <strong>${SB.money(calcularTotal())}</strong>
      </div>
      <form class="cart-form" id="cartForm" novalidate>
        ${CAMPOS.map(c => {
          const idInput = "cart" + c.id.charAt(0).toUpperCase() + c.id.slice(1);
          const control = c.area
            ? `<textarea id="${idInput}" name="${c.id}" rows="3" placeholder="${c.placeholder}">${esc(cliente[c.id])}</textarea>`
            : `<input id="${idInput}" name="${c.id}" type="${c.tipo}" autocomplete="${c.auto}"${c.modo ? ` inputmode="${c.modo}"` : ""}${c.req ? " required" : ""} value="${esc(cliente[c.id])}" aria-describedby="${idInput}Error">`;
          return `
            <div class="cart-field">
              <label for="${idInput}">${c.label}</label>
              ${control}
              ${c.req ? `<p class="cart-error" id="${idInput}Error" hidden></p>` : ""}
            </div>`;
        }).join("")}
        <p class="cart-note">Envíos a toda Colombia. Confirmamos el costo del envío por WhatsApp.</p>
        <button type="submit" hidden></button>
      </form>`;
    foot.innerHTML = `
      <button class="btn btn-rose" type="button" data-cart="enviar">${SB.WA_ICON} Enviar pedido por WhatsApp</button>
      <button class="cart-link" type="button" data-cart="volver">Volver a la bolsa</button>`;
  }

  function renderEnviado(){
    antetitulo.textContent = "Último paso";
    titulo.textContent = "Pedido listo";
    body.innerHTML = `
      <div class="cart-empty cart-sent">
        ${SB.WA_ICON}
        <p><strong>Abrimos WhatsApp con tu pedido.</strong></p>
        <p>Solo falta que toques enviar en el chat. Si no se abrió, vuelve y toca “Enviar pedido” otra vez.</p>
      </div>`;
    foot.innerHTML = `
      <button class="btn btn-solid" type="button" data-cart="vaciar">Ya lo envié, vaciar bolsa</button>
      <button class="cart-link" type="button" data-cart="datos">Volver a mis datos</button>`;
  }

  function leerFormulario(){
    const form = panel.querySelector("#cartForm");
    if (!form) return;
    CAMPOS.forEach(c => { if (form.elements[c.id]) cliente[c.id] = form.elements[c.id].value; });
  }

  function mostrarErrores(errores){
    CAMPOS.filter(c => c.req).forEach(c => {
      const idInput = "cart" + c.id.charAt(0).toUpperCase() + c.id.slice(1);
      const input = panel.querySelector("#" + idInput);
      const error = panel.querySelector("#" + idInput + "Error");
      if (!input || !error) return;
      const msg = errores[c.id];
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      error.textContent = msg || "";
      error.hidden = !msg;
    });
  }

  /* ---------- Aviso al agregar ---------- */
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.setAttribute("role", "status");
  toast.innerHTML = `<span class="cart-toast-text"></span><button type="button" class="cart-toast-btn">Ver bolsa</button>`;
  document.body.appendChild(toast);
  let toastTimer = null;

  function animarContador(){
    contador.classList.remove("bump");
    void contador.offsetWidth;   // reinicia la animación si se agrega varias veces seguidas
    contador.classList.add("bump");
  }

  function mostrarToast(nombre){
    toast.querySelector(".cart-toast-text").textContent = `Agregaste ${nombre} a tu bolsa`;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }
  toast.querySelector(".cart-toast-btn").addEventListener("click", () => {
    toast.classList.remove("show");
    abrirCarrito();
  });

  /* ---------- Eventos ---------- */
  // Delegado: las tarjetas se vuelven a pintar al filtrar o marcar favoritos
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-pedir, .btn-agregar");
    if (!btn) return;
    e.preventDefault();
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio, 10);
    const categoria = btn.dataset.categoria || "";
    const talla = btn.dataset.talla || "";
    const tallas = btn.dataset.tallas ? btn.dataset.tallas.split("|") : [];
    agregarAlCarrito(nombre, precio, categoria, talla, 1, tallas, {img: btn.dataset.img, icon: btn.dataset.icon});
  });

  if (bagBtn){
    bagBtn.setAttribute("aria-haspopup", "dialog");
    bagBtn.setAttribute("aria-controls", "cartPanel");
    bagBtn.setAttribute("aria-expanded", "false");
    bagBtn.addEventListener("click", abrirCarrito);
  }
  overlay.addEventListener("click", cerrarCarrito);

  panel.addEventListener("click", (e) => {
    const el = e.target.closest("[data-cart]");
    if (!el || el.tagName === "SELECT") return;
    const i = Number(el.dataset.i);
    switch (el.dataset.cart){
      case "cerrar": cerrarCarrito(); break;
      case "seguir": {
        cerrarCarrito();
        const catalogo = document.getElementById("catalogo");
        if (catalogo) SB.scrollToEl(catalogo);
        break;
      }
      case "mas": cambiarCantidad(i, 1); break;
      case "menos": cambiarCantidad(i, -1); break;
      case "quitar": quitarLinea(i); break;
      case "continuar":
        if (lineasSinTalla().length) marcarTallasFaltantes();
        else irAPaso("datos");
        break;
      case "volver": irAPaso("items"); break;
      case "datos": irAPaso("datos"); break;
      case "enviar": enviarPedido(); break;
      case "vaciar": vaciarCarrito(); cerrarCarrito(); break;
    }
  });

  panel.addEventListener("change", (e) => {
    const select = e.target.closest('select[data-cart="talla"]');
    if (select) cambiarTalla(Number(select.dataset.i), select.value);
  });

  // Enter dentro del formulario = enviar
  panel.addEventListener("submit", (e) => { e.preventDefault(); enviarPedido(); });

  // Al corregir un campo con error, el aviso se quita
  panel.addEventListener("input", (e) => {
    const input = e.target.closest('[aria-invalid="true"]');
    if (!input || !input.name) return;
    leerFormulario();
    const errores = validarCliente();
    if (!errores[input.name]){
      input.setAttribute("aria-invalid", "false");
      const error = panel.querySelector("#" + input.id + "Error");
      if (error) error.hidden = true;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) cerrarCarrito();
  });

  // Si el carrito cambia en otra pestaña (la otra tienda abierta), se sincroniza
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY_CARRITO) return;
    carrito = leer(KEY_CARRITO, []).filter(esLineaValida);
    renderCarrito();
  });

  /* ---------- API pública ---------- */
  Object.assign(window, {agregarAlCarrito, renderCarrito, calcularTotal, generarMensajeWhatsApp, enviarPedido});
  Object.defineProperty(window, "carrito", {get: () => carrito, configurable: true});
  SB.carrito = {abrir: abrirCarrito, cerrar: cerrarCarrito, vaciar: vaciarCarrito, cantidadDe, quitarUno};

  renderCarrito();
})();
