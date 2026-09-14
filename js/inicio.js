/* =====================================================================
   INICIO — pop-up de bienvenida (solo index.html).
   Se muestra en cada carga del inicio. Sin localStorage ni cookies.
   ===================================================================== */
(function(){
  "use strict";

  const SB = window.SB;
  const root = document.documentElement;
  const modal = document.getElementById("welcome");
  const panel = modal.querySelector(".welcome-panel");
  const sides = modal.querySelectorAll(".welcome-side");
  const homeView = document.querySelector(".home-view");
  const EXIT_MS = 520;     // salida del panel antes de ir a la tienda
  const CLOSE_MS = 420;    // cierre sin elegir
  let busy = false;

  function setHomeInert(on){ on ? homeView.setAttribute("inert", "") : homeView.removeAttribute("inert"); }

  function resetModal(){
    modal.classList.remove("is-leaving", "is-closing");
    sides.forEach(s => s.classList.remove("is-chosen"));
    busy = false;
  }

  function openWelcome(){
    resetModal();
    modal.hidden = true;       // ocultar y volver a mostrar reinicia las animaciones de entrada
    void modal.offsetWidth;
    modal.hidden = false;
    root.classList.add("welcome-open");
    setHomeInert(true);
    panel.focus({preventScroll:true});
  }

  function closeWelcome(){
    if (busy || modal.hidden) return;
    busy = true;
    modal.classList.add("is-closing");
    SB.wait(CLOSE_MS).then(() => {
      modal.hidden = true;
      resetModal();
      root.classList.remove("welcome-open");
      setHomeInert(false);
      document.getElementById("main").focus({preventScroll:true});
    });
  }

  sides.forEach(side => {
    side.addEventListener("click", (e) => {
      // Ctrl/Cmd/Shift + clic o clic central: abrir en otra pestaña sin animación
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (busy) return;
      busy = true;
      side.classList.add("is-chosen");
      modal.classList.add("is-leaving");
      SB.wait(EXIT_MS).then(() => { location.href = side.href; });
    });
    side.addEventListener("pointermove", (e) => {
      const r = side.getBoundingClientRect();
      side.style.setProperty("--mx", (e.clientX - r.left) + "px");
      side.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
  modal.querySelectorAll("[data-welcome-close]").forEach(el => el.addEventListener("click", closeWelcome));

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape"){ e.preventDefault(); closeWelcome(); return; }
    if (e.key !== "Tab") return;
    const focusables = [...panel.querySelectorAll("a[href], button:not([disabled])")];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)){
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  });

  // Volver con "atrás" desde una tienda (bfcache) muestra el pop-up otra vez
  window.addEventListener("pageshow", (e) => { if (e.persisted) openWelcome(); });

  panel.focus({preventScroll:true});
})();
