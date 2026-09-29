/* =====================================================================
   TEXT LOOP — franja superior con el texto corriendo sobre una cinta
   ondulada (SVG + textPath). Versión sin React ni GSAP.

   Uso en el HTML:
     <div class="utility text-loop" data-text-loop="Texto ✦ Otro texto">
       <p>Texto de respaldo (lo leen los lectores de pantalla)</p>
     </div>

   Opciones con atributos data-* (todas opcionales):
     data-speed="60"        píxeles por segundo (0 = quieto)
     data-direction="reverse"
     data-shape="line"      cinta plana (por defecto: "wave", ondulada)
     data-separator="✦"
   El tamaño de la cinta y la letra se ajustan en CSS (.text-loop).
   ===================================================================== */
(function(){
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let uid = 0;

  // Onda que sobra por ambos lados para que el texto entre y salga sin cortes
  const wavePath = (w, cy, a) => {
    let d = `M -320 ${cy} Q -160 ${cy - a} 0 ${cy}`;
    for (let x = 320; x <= w + 640; x += 320) d += ` T ${x} ${cy}`;
    return d;
  };

  // Cinta plana: una recta que también sobra por los lados
  const linePath = (w, cy) => `M -320 ${cy} L ${w + 320} ${cy}`;

  const svgEl = (tag, attrs) => {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };

  function init(root){
    const fallback = root.querySelector("p");
    const text = root.dataset.textLoop || (fallback ? fallback.textContent : "");
    const separator = root.dataset.separator ?? "✦";
    const speed = Number(root.dataset.speed ?? 60);
    const reverse = root.dataset.direction === "reverse";
    const flat = root.dataset.shape === "line";
    const unit = text.toUpperCase() + (separator ? `  ${separator}  ` : "   ");
    const id = `text-loop-${++uid}`;

    const svg = svgEl("svg", {class:"text-loop-svg", "aria-hidden":"true", focusable:"false"});
    const path = svgEl("path", {id, class:"text-loop-ribbon", fill:"none"});
    const measure = svgEl("text", {class:"text-loop-text text-loop-measure"});
    measure.textContent = unit;
    const makeText = () => {
      const t = svgEl("text", {class:"text-loop-text", "dominant-baseline":"central", lengthAdjust:"spacing"});
      const tp = svgEl("textPath", {href:`#${id}`, startOffset:"0"});
      t.append(tp);
      return {t, tp};
    };
    const head = makeText(), tail = makeText();
    svg.append(path, measure, head.t, tail.t);
    root.append(svg);
    if (fallback) fallback.classList.add("sr-only");
    root.classList.add("is-ready");

    let length = 0, offset = 0, paused = false, last = 0, raf = 0;

    const apply = () => {
      head.tp.setAttribute("startOffset", offset);
      tail.tp.setAttribute("startOffset", offset >= 0 ? offset - length : offset + length);
    };

    const build = () => {
      const w = Math.round(root.clientWidth);
      const h = Math.round(root.clientHeight);
      if (!w || !h) return;
      const cs = getComputedStyle(root);
      const ribbon = parseFloat(cs.getPropertyValue("--loop-ribbon")) || 30;
      const room = Math.max(4, h / 2 - ribbon / 2 - 3);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      path.setAttribute("d", flat ? linePath(w, h / 2) : wavePath(w, h / 2, room * 2));
      path.setAttribute("stroke-width", ribbon);

      length = path.getTotalLength();
      const unitW = measure.getComputedTextLength();
      const reps = unitW > 0 ? Math.max(1, Math.round(length / unitW)) : 1;
      for (const {t, tp} of [head, tail]){
        tp.textContent = unit.repeat(reps);
        t.setAttribute("textLength", length);
      }
      offset = offset % length;
      apply();
    };

    const tick = (now) => {
      const dt = Math.min(64, now - (last || now)) / 1000;
      last = now;
      if (!paused && length){
        offset += (reverse ? -speed : speed) * dt;
        if (offset >= length) offset -= length;
        if (offset <= -length) offset += length;
        apply();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (!reduceMotion.matches && speed > 0) raf = requestAnimationFrame(tick);
    };

    root.addEventListener("pointerenter", () => { paused = true; });
    root.addEventListener("pointerleave", () => { paused = false; });
    reduceMotion.addEventListener?.("change", start);

    build();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build).catch(() => {});
    if ("ResizeObserver" in window) new ResizeObserver(build).observe(root);
    start();
  }

  document.querySelectorAll("[data-text-loop]").forEach(init);
})();
