/* =====================================================================
   WHATSAPP — número del negocio y armado de enlaces wa.me.
   Todo elemento con el atributo data-wa recibe el mensaje general.
   ===================================================================== */
(function(){
  "use strict";

  // ======= CONFIG — reemplaza con los datos reales del negocio =======
  const WHATSAPP_NUMBER = "573000000000"; // <-- EDITAR: número real en formato 57XXXXXXXXXX
  const GENERAL_MSG = "Hola Street Blush! Quiero saber más sobre sus productos.";

  const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  window.SB.waLink = waLink;
  window.SB.waProductLink = (p) => waLink("Hola Street Blush! Me interesa: " + p.name + " (" + window.SB.money(p.price) + ")");

  const general = waLink(GENERAL_MSG);
  document.querySelectorAll("[data-wa]").forEach(el => el.setAttribute("href", general));
})();
