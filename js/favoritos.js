/* =====================================================================
   FAVORITOS — se guardan en localStorage y se comparten entre las dos
   tiendas (cada producto tiene un id único).
   ===================================================================== */
(function(){
  "use strict";

  const KEY = "streetblush_favorites";
  let favorites = new Set();
  try{
    favorites = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  }catch(e){ favorites = new Set(); }

  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify([...favorites])); }catch(e){}
  }

  window.SB.favoritos = {
    has: (id) => favorites.has(id),
    toggle(id){
      if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
      save();
    }
  };
})();
