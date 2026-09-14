/* Catálogo de la tienda de hombre.
   Productos de ejemplo — reemplaza nombres, precios y descripciones reales.
   - id: único en TODA la marca (lo usan los favoritos)
   - icon: una clave de SB.ICONS en js/global.js
   - drop: true para que aparezca en "New drop"
   - talla: solo para talla única (ej. "Única"); si no, el cliente la elige en la bolsa */
window.SB_TIENDA = {
  categoria: "Streetwear",
  tipo: "ropa",   // el carrito pide talla a los productos de esta tienda
  busqueda: "Buscar hoodies, gorras, cargos…",
  productos: [
    {id:"p7", name:"Hoodie Oversize Blacktop", price:98000, icon:"hoodie", desc:"Algodón grueso, corte oversize, capota doble.", drop:true},
    {id:"p8", name:"Gorra Crown Cap", price:45000, icon:"cap", desc:"Visera curva, bordado Street Blush en relieve.", talla:"Única"},
    {id:"p9", name:"Cargo Pants Alley", price:112000, icon:"cargo", desc:"Bolsillos laterales, corte relajado, tela resistente."},
    {id:"p10", name:"Bomber Nightcrawler", price:135000, icon:"bomber", desc:"Chaqueta bomber acolchada, forro interior suave.", drop:true},
    {id:"p11", name:"Joggers Concrete", price:85000, icon:"joggers", desc:"Puños ajustados, tiro cómodo, ideales para el diario."},
    {id:"p12", name:"Chaleco Grafiti Vest", price:79000, icon:"vest", desc:"Chaleco acolchado sin mangas, estilo urbano."}
  ]
};
