/* =====================================================================
   CATÁLOGO DE LA TIENDA DE HOMBRE (ROPA)
   Productos de ejemplo: reemplaza nombres, precios, textos y fotos reales.
   Guía completa: COMO-AGREGAR-PRODUCTOS.md (en la carpeta principal).

   CAMPOS DE CADA PRODUCTO
   Obligatorios
   - id      texto único en TODA la marca (ej. "h-hoodie-negro"). No lo cambies
             después de publicar: lo usan los favoritos y el enlace del producto.
   - name    nombre visible.
   - price   precio en pesos, sin puntos ni signo (98000).
   Recomendados
   - desc    frase corta: sale en la tarjeta y arriba en la vista del producto.
   - img     foto principal, ruta desde hombre/index.html
             (ej. "../assets/img/productos/hoodie-blacktop.jpg"). Cuadrada, mínimo 1000 px.
   Opcionales
   - imgs    varias fotos ["../assets/…/1.jpg", "../assets/…/2.jpg"]; la primera es la principal.
   - detalle párrafo largo para la vista del producto.
   - caracteristicas  lista corta de datos: ["100% algodón", "Corte oversize"].
   - tallas  tallas de este producto si no son las generales (ej. ["28","30","32","34"]).
   - talla   para talla única: talla:"Única" (no se le pide talla al cliente).
   - icon    dibujo que se muestra mientras no hay foto (clave de SB.ICONS en js/global.js).
   - drop    true para que aparezca en "New drop".

   PLANTILLA (copia, pega dentro de productos y rellena)
   {id:"", name:"", price:0, img:"", desc:"", detalle:"", caracteristicas:[]},
   ===================================================================== */
window.SB_TIENDA = {
  categoria: "Streetwear",
  tipo: "ropa",                            // el carrito pide talla a los productos de esta tienda
  tallas: ["S", "M", "L", "XL", "XXL"],   // tallas generales
  busqueda: "Buscar hoodies, gorras, cargos…",
  productos: [
    {
      id:"p7", name:"Hoodie Oversize Blacktop", price:98000, icon:"hoodie", drop:true,
      desc:"Algodón grueso, corte oversize, capota doble.",
      detalle:"Hoodie de algodón perchado con caída amplia. La capota doble mantiene la forma y el puño elástico no se estira con el uso.",
      caracteristicas:["Corte oversize", "Capota doble", "Bolsillo canguro"]
    },
    {
      id:"p8", name:"Gorra Crown Cap", price:45000, icon:"cap", talla:"Única",
      desc:"Visera curva, bordado Street Blush en relieve.",
      detalle:"Gorra de seis paneles con cierre ajustable atrás, para que calce en cualquier medida de cabeza.",
      caracteristicas:["Talla única ajustable", "Bordado en relieve", "Visera curva"]
    },
    {
      id:"p9", name:"Cargo Pants Alley", price:112000, icon:"cargo",
      desc:"Bolsillos laterales, corte relajado, tela resistente.",
      detalle:"Pantalón cargo de tela gruesa con bolsillos laterales amplios y bota recta. Pensado para el uso diario.",
      caracteristicas:["Corte relajado", "6 bolsillos", "Tela resistente"]
    },
    {
      id:"p10", name:"Bomber Nightcrawler", price:135000, icon:"bomber", drop:true,
      desc:"Chaqueta bomber acolchada, forro interior suave.",
      detalle:"Bomber con relleno ligero y forro suave. Puños y cintura en resorte tejido para cerrar el frío.",
      caracteristicas:["Acolchada", "Forro interior", "Cierre metálico"]
    },
    {
      id:"p11", name:"Joggers Concrete", price:85000, icon:"joggers",
      desc:"Puños ajustados, tiro cómodo, ideales para el diario.",
      detalle:"Jogger de felpa con cordón en la cintura y puño ajustado en el tobillo.",
      caracteristicas:["Cintura con cordón", "Puño ajustado", "Bolsillos laterales"]
    },
    {
      id:"p12", name:"Chaleco Grafiti Vest", price:79000, icon:"vest",
      desc:"Chaleco acolchado sin mangas, estilo urbano.",
      detalle:"Chaleco acolchado para usar sobre hoodie o camiseta. Cuello alto y bolsillos con cierre.",
      caracteristicas:["Sin mangas", "Cuello alto", "Bolsillos con cierre"]
    }
  ]
};
