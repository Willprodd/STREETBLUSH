/* =====================================================================
   CARRUSEL del banner principal.
   Avanza solo y funciona con cualquier número de imágenes: con una sola,
   esconde las flechas y los puntos. Se pausa al pasar el mouse, al
   enfocar con el teclado y cuando la pestaña no está visible.
   Si el sistema pide menos animación, igual avanza, pero sin deslizar
   (el cambio es instantáneo, lo controla el CSS).
   ===================================================================== */
(function(){
  "use strict";

  const AUTOPLAY_MS = 5500;
  const SWIPE_MIN = 45;   // píxeles mínimos para contar como deslizamiento

  document.querySelectorAll("[data-carousel]").forEach(montar);

  function montar(root){
    const track = root.querySelector(".carousel-track");
    const slides = [...track.children];
    const dotsBox = root.querySelector(".carousel-dots");
    const prev = root.querySelector(".carousel-prev");
    const next = root.querySelector(".carousel-next");

    if (slides.length < 2){
      [prev, next, dotsBox].forEach(el => { if (el) el.hidden = true; });
      return;
    }

    let index = 0;
    let timer = null;

    const dots = slides.map((_, n) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel-dot";
      b.setAttribute("aria-label", `Ir al banner ${n + 1} de ${slides.length}`);
      b.addEventListener("click", () => { ir(n); reiniciar(); });
      dotsBox.appendChild(b);
      return b;
    });

    function ir(n){
      index = (n + slides.length) % slides.length;
      track.style.transform = `translateX(${-index * 100}%)`;
      slides.forEach((s, k) => {
        const oculto = k !== index;
        s.setAttribute("aria-hidden", String(oculto));
        const link = s.querySelector("a");
        if (link) link.tabIndex = oculto ? -1 : 0;
      });
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === index)));
    }

    function arrancar(){
      if (timer || document.hidden) return;
      timer = setInterval(() => ir(index + 1), AUTOPLAY_MS);
    }
    function parar(){ clearInterval(timer); timer = null; }
    function reiniciar(){ parar(); arrancar(); }

    prev.addEventListener("click", () => { ir(index - 1); reiniciar(); });
    next.addEventListener("click", () => { ir(index + 1); reiniciar(); });

    root.addEventListener("pointerenter", parar);
    root.addEventListener("pointerleave", arrancar);
    root.addEventListener("focusin", parar);
    root.addEventListener("focusout", (e) => { if (!root.contains(e.relatedTarget)) arrancar(); });
    document.addEventListener("visibilitychange", () => { document.hidden ? parar() : arrancar(); });

    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft"){ e.preventDefault(); ir(index - 1); reiniciar(); }
      if (e.key === "ArrowRight"){ e.preventDefault(); ir(index + 1); reiniciar(); }
    });

    // Deslizar con el dedo o el mouse
    let startX = null, movido = false;
    track.addEventListener("pointerdown", (e) => { startX = e.clientX; movido = false; });
    track.addEventListener("pointermove", (e) => { if (startX !== null && Math.abs(e.clientX - startX) > 10) movido = true; });
    track.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) < SWIPE_MIN) return;
      ir(index + (dx < 0 ? 1 : -1));
      reiniciar();
    });
    track.addEventListener("pointercancel", () => { startX = null; });
    // Tras deslizar, no abrir el enlace del banner
    track.addEventListener("click", (e) => { if (movido){ e.preventDefault(); movido = false; } }, true);

    ir(0);
    arrancar();
  }
})();
