/* =====================================================================
   ANIMACIONES de entrada al hacer scroll y cabecera al desplazarse.

   - [data-reveal]        : el elemento aparece al entrar en pantalla.
   - [data-reveal-group]  : aparecen sus hijos, uno detrás de otro.

   Se mira la posición de cada bloque al hacer scroll (no de cada hijo),
   así los hijos que estén fuera de una fila deslizable —las categorías
   en celular— también aparecen.

   Si el sistema pide menos animación, todo se muestra de una vez.
   La clase js-anim en <html> asegura que, sin JavaScript, el contenido
   siempre se vea.
   ===================================================================== */
(function(){
  "use strict";

  const root = document.documentElement;
  const bloques = [...document.querySelectorAll("[data-reveal], [data-reveal-group]")];
  if (!bloques.length) return;

  root.classList.add("js-anim");

  // Marca qué se va a animar: el bloque, o sus hijos en cascada
  bloques.forEach(bloque => {
    if (bloque.hasAttribute("data-reveal-group")){
      [...bloque.children].forEach((hijo, i) => {
        hijo.classList.add("reveal");
        hijo.style.setProperty("--d", i);
      });
    } else {
      bloque.classList.add("reveal");
    }
  });

  function mostrar(bloque){
    const objetivos = bloque.hasAttribute("data-reveal-group") ? [...bloque.children] : [bloque];
    objetivos.forEach(el => el.classList.add("is-in"));
  }

  if (window.SB.reduceMotion.matches){
    bloques.forEach(mostrar);
    return;
  }

  let pendientes = bloques;

  function revisar(){
    if (!pendientes.length) return;
    const limite = window.innerHeight * .92;
    pendientes = pendientes.filter(bloque => {
      const caja = bloque.getBoundingClientRect();
      if (caja.top > limite) return true;      // todavía no llega a pantalla
      mostrar(bloque);
      return false;
    });
    if (!pendientes.length){
      window.removeEventListener("scroll", revisar);
      window.removeEventListener("resize", revisar);
    }
  }

  // Son pocos bloques y al terminar se quitan los escuchas, así que medir
  // en cada evento no pesa y evita depender de requestAnimationFrame.
  window.addEventListener("scroll", revisar, {passive:true});
  window.addEventListener("resize", revisar);
  window.addEventListener("load", revisar);
  revisar();

  // Red de seguridad: si en 10 segundos no llegó ni un solo evento de
  // scroll (entornos raros donde no se disparan), se muestra todo. Así el
  // contenido nunca se queda invisible, aunque se pierda la animación.
  let huboScroll = false;
  window.addEventListener("scroll", () => { huboScroll = true; }, {passive:true, once:true});
  setTimeout(() => {
    if (huboScroll || !pendientes.length) return;
    pendientes.forEach(mostrar);
    pendientes = [];
    window.removeEventListener("scroll", revisar);
    window.removeEventListener("resize", revisar);
  }, 10000);

  // La cabecera se compacta y proyecta sombra al bajar
  const masthead = document.querySelector(".masthead");
  if (masthead){
    const marcar = () => masthead.classList.toggle("is-stuck", window.scrollY > 12);
    marcar();
    window.addEventListener("scroll", marcar, {passive:true});
  }
})();
