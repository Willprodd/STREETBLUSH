/* =====================================================================
   SUPABASE — guarda pedidos y suscriptores en la base de datos, SIN
   bloquear ni condicionar la apertura de WhatsApp. Si esto falla o tarda,
   la venta no se pierde: js/carrito.js y js/hombre.js abren wa.me igual.

   Solo INSERT: las políticas de RLS en Supabase no permiten leer, editar
   ni borrar nada desde aquí, así que exponer esta key públicamente es
   seguro mientras esas políticas sigan siendo insert-only.
   ===================================================================== */
(function(){
  "use strict";

  // ======= CONFIG — reemplaza con los datos reales del proyecto =======
  const SUPABASE_URL = "https://uxymxdgenzdogjynzubl.supabase.co";
  const SUPABASE_KEY = "sb_publishable_vZsMu0e7c91GSqATA1Xwhw_qJTLTTMJ";

  const TIMEOUT_MS = 2500;
  const KEY_COLA = "streetblush_pendientes_supabase";
  const MAX_COLA = 20;
  const MAX_INTENTOS = 5;
  const MAX_ANTIGUEDAD_MS = 7 * 24 * 60 * 60 * 1000;

  function leerCola(){
    try{ return JSON.parse(localStorage.getItem(KEY_COLA)) || []; }
    catch(e){ return []; }
  }
  function guardarCola(cola){
    try{ localStorage.setItem(KEY_COLA, JSON.stringify(cola)); }catch(e){}
  }
  function encolar(tabla, filas){
    const cola = leerCola();
    cola.push({tabla, filas, intentos: 0, creado: Date.now()});
    guardarCola(cola.slice(-MAX_COLA));
  }

  // Publishable key: solo header "apikey". NUNCA además "Authorization: Bearer",
  // porque Supabase intenta leerlo como JWT y esta key no lo es (error "Invalid JWT").
  async function insertar(tabla, filas){
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try{
      const resp = await fetch(`${SUPABASE_URL}/rest/v1/${tabla}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(filas),
        signal: ctrl.signal
      });
      // 409 = la fila ya existía (reintento de un insert que sí se había guardado): no es un error real.
      if (resp.ok || resp.status === 409) return true;
      throw new Error("insert falló: " + resp.status);
    } finally { clearTimeout(t); }
  }

  function procesarCola(){
    const cola = leerCola();
    if (!cola.length) return;
    (async () => {
      const restante = [];
      for (const item of cola){
        const vencido = Date.now() - item.creado > MAX_ANTIGUEDAD_MS || item.intentos >= MAX_INTENTOS;
        if (vencido) continue;
        try{ await insertar(item.tabla, item.filas); }
        catch(e){ restante.push(Object.assign({}, item, {intentos: item.intentos + 1})); }
      }
      guardarCola(restante);
    })();
  }

  async function guardarPedido({tienda, cliente, carrito, total}){
    const pedido = {
      id: crypto.randomUUID(),
      tienda,
      cliente_nombre: cliente.nombre.trim(),
      cliente_telefono: cliente.telefono,
      cliente_direccion: cliente.direccion.trim(),
      cliente_ciudad: cliente.ciudad.trim(),
      cliente_notas: cliente.notas && cliente.notas.trim() ? cliente.notas.trim() : null,
      total,
      consintio_datos: !!cliente.consentimiento
    };
    const items = carrito.map(l => ({
      id: crypto.randomUUID(),
      pedido_id: pedido.id,
      producto_id: l.id || null,
      nombre: l.nombre,
      categoria: l.categoria || null,
      talla: l.talla || null,
      cantidad: l.cantidad,
      precio_unit: l.precio
    }));

    try{
      await insertar("pedidos", [pedido]);
    }catch(e){
      encolar("pedidos", [pedido]);
      encolar("pedido_items", items);
      throw e;
    }
    try{
      await insertar("pedido_items", items);
    }catch(e){
      encolar("pedido_items", items);
      throw e;
    }
    return true;
  }

  async function guardarSuscriptor({email, tienda}){
    const fila = {email, tienda, consintio: true};
    try{
      return await insertar("suscriptores", [fila]);
    }catch(e){
      encolar("suscriptores", [fila]);
      throw e;
    }
  }

  window.SB = window.SB || {};
  window.SB.db = { guardarPedido, guardarSuscriptor };

  procesarCola();
})();
