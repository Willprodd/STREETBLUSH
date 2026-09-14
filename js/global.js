/* =====================================================================
   GLOBAL — utilidades compartidas, menú móvil, sección actual en el nav
   y desplazamiento suave a las anclas internas (#catalogo, #contacto…).
   Se carga primero: define window.SB, que usan los demás scripts.
   ===================================================================== */
(function(){
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const SB = window.SB = {
    reduceMotion,
    wait: (ms) => new Promise(resolve => setTimeout(resolve, reduceMotion.matches ? 0 : ms)),
    money: (n) => "$" + n.toLocaleString("es-CO") + " COP",
    // Escapa texto antes de meterlo en HTML (nombres, descripciones y rutas de los productos)
    esc: (s) => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])),
    scrollToEl: (el) => el.scrollIntoView({behavior: reduceMotion.matches ? "auto" : "smooth"}),
    ICONS: {
      lipstick:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="9" y="2.5" width="6" height="4.5" rx="1"/><path d="M9.5 7h5l1.2 12.5a1.3 1.3 0 0 1-1.3 1.5h-4.8a1.3 1.3 0 0 1-1.3-1.5Z"/><path d="M9.7 10.5h4.6"/></svg>`,
      compact:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="13" r="8"/><circle cx="12" cy="13" r="3.3"/><path d="M8 5.5 12 3l4 2.5"/></svg>`,
      bottle:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="7" y="8" width="10" height="13" rx="2"/><rect x="9.5" y="3" width="5" height="5" rx="1"/><path d="M7 13h10"/></svg>`,
      eyeliner:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 19 17 6l2.5 2.5L6.5 21.5Z"/><path d="M15 8l3 3"/><circle cx="20" cy="4" r="1.4"/></svg>`,
      palette:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M8 5v14M13 5v14M18 5v14M3.5 10h17M3.5 14h17"/></svg>`,
      mascara:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="9" y="3" width="6" height="6" rx="1.4"/><path d="M12 9v6"/><ellipse cx="12" cy="18" rx="3.4" ry="2.4"/></svg>`,
      hoodie:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M7 5 4 8v4l3-1v9h10v-9l3 1V8l-3-3-3 2h-4Z"/><path d="M9 5a3 3 0 0 0 6 0"/></svg>`,
      cap:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 13a8 8 0 0 1 16 0"/><path d="M3 13h14l4 2-4 1H4Z"/><circle cx="12" cy="6.5" r="1"/></svg>`,
      cargo:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M7 3h10l.7 8-1.2 10H12l-1-8-1 8H6.5L5.3 11Z"/><rect x="6.3" y="12" width="3" height="3.2" rx=".5"/><rect x="14.7" y="12" width="3" height="3.2" rx=".5"/></svg>`,
      bomber:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 4 5 6.5v5L8 10v10h8V10l3 1.5v-5L16 4l-4 2-4-2Z"/><path d="M12 6v14"/></svg>`,
      joggers:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 3h8l.6 7-1.6 11h-2l-1-7-1 7h-2L6.4 10Z"/><path d="M6 6.5h12"/></svg>`,
      vest:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M9 3 6 5v15h5l1-9 1 9h5V5l-3-2-2 2h-2Z"/><path d="M12 3v17"/></svg>`
    },
    WA_ICON: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5L8.9 8.4c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A3 3 0 0 0 6 10.5c0 1.8 1.3 3.5 1.5 3.7s2.6 4 6.3 5.2c2.6.9 2.6.6 3 .5.6-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3Z"/></svg>`,
    BAG_ADD: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 8h12l1 12H5Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M12 11.5v5M9.5 14h5"/></svg>`,
    HEART: `<path d="M12 21s-7-4.3-9.5-8.8C.7 8.6 2 5 5.5 4.3 8 3.8 10 5 12 7.5 14 5 16 3.8 18.5 4.3 22 5 23.3 8.6 21.5 12.2 19 16.7 12 21 12 21Z"/>`,
    closeDrawer: () => {}
  };

  // ======= Menú móvil =======
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("drawerOverlay");
  const hamburger = document.getElementById("hamburgerBtn");
  if (drawer && overlay && hamburger){
    const openDrawer = () => {
      drawer.classList.add("open");
      overlay.classList.add("open");
      document.body.classList.add("drawer-open");
      hamburger.setAttribute("aria-expanded", "true");
      setTimeout(() => document.getElementById("drawerClose").focus(), 60);
    };
    SB.closeDrawer = (returnFocus) => {
      if (!drawer.classList.contains("open")) return;
      drawer.classList.remove("open");
      overlay.classList.remove("open");
      document.body.classList.remove("drawer-open");
      hamburger.setAttribute("aria-expanded", "false");
      if (returnFocus) hamburger.focus();
    };
    hamburger.addEventListener("click", openDrawer);
    document.getElementById("drawerClose").addEventListener("click", () => SB.closeDrawer(true));
    overlay.addEventListener("click", () => SB.closeDrawer(true));
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => SB.closeDrawer(false)));
    window.matchMedia("(min-width:961px)").addEventListener("change", (e) => { if (e.matches) SB.closeDrawer(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") SB.closeDrawer(true); });
  }

  // ======= Sección actual en el nav =======
  const spyLinks = [...document.querySelectorAll("[data-spy]")];
  if (spyLinks.length && "IntersectionObserver" in window){
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        spyLinks.forEach(a => a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, {rootMargin:"-45% 0px -50% 0px"});
    spyLinks.forEach(a => { const t = document.querySelector(a.getAttribute("href")); if (t) spy.observe(t); });
  }

  // ======= Anclas internas: desplazamiento suave y foco accesible =======
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    const href = a.getAttribute("href");
    const target = href.length > 1 && document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    SB.scrollToEl(target);
    if (target.hasAttribute("tabindex")) target.focus({preventScroll:true});
  });
})();
