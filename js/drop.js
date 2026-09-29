/* =====================================================================
   NEW DROP — cuenta regresiva del drop actual.
   Configura DROP_END con la fecha y hora en que cierra el drop.
   Formato: new Date(año, mes, día, hora, minuto, segundo)
   Los meses van de 0 a 11: enero = 0, octubre = 9.
   Al llegar a cero, el bloque muestra que el drop cerró y el ciclo
   reinicia en 7 días (útil mientras no se configure una fecha fija).
   ===================================================================== */
(function(){
  "use strict";

  // ======= CONFIG — fecha de cierre del drop actual =======
  const DROP_END = new Date(2026, 9, 30, 23, 59, 59); // 30 de octubre de 2026, 11:59 p. m.
  const DURACION_CICLO = 7 * 24 * 60 * 60 * 1000;     // 7 días en ms

  const bloque = document.getElementById("dropCountdown");
  if (!bloque) return;

  const celdas = {
    d: document.getElementById("dd-d"),
    h: document.getElementById("dd-h"),
    m: document.getElementById("dd-m"),
    s: document.getElementById("dd-s")
  };

  const dos = (n) => String(n).padStart(2, "0");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function pintar(restante){
    const totalSeg = Math.max(0, Math.floor(restante / 1000));
    if (celdas.d) celdas.d.textContent = dos(Math.floor(totalSeg / 86400));
    if (celdas.h) celdas.h.textContent = dos(Math.floor(totalSeg % 86400 / 3600));
    if (celdas.m) celdas.m.textContent = dos(Math.floor(totalSeg % 3600 / 60));
    if (celdas.s) celdas.s.textContent = dos(totalSeg % 60);
  }

  function destino(){
    const ahora = Date.now();
    let fin = DROP_END.getTime();
    // Si la fecha configurada ya pasó, el drop se cicla cada 7 días
    while (fin <= ahora) fin += DURACION_CICLO;
    return fin;
  }

  let fin = destino();

  function tick(){
    const restante = fin - Date.now();
    if (restante <= 0){
      fin = destino();
      pintar(fin - Date.now());
      return;
    }
    pintar(restante);
  }

  pintar(fin - Date.now());
  // Con "reducir movimiento" no hace falta el segundo a segundo
  setInterval(tick, reduceMotion.matches ? 60000 : 1000);
})();
