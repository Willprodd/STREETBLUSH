/* =====================================================================
   CATÁLOGO DE LA TIENDA DE MAQUILLAJE — marca Montoc
   Guía completa: COMO-AGREGAR-PRODUCTOS.md (en la carpeta principal).

   CAMPOS DE CADA PRODUCTO
   Obligatorios
   - id      texto único en TODA la marca (ej. "m-labial-rojo"). No lo cambies
             después de publicar: lo usan los favoritos y el enlace del producto.
   - name    nombre visible.
   - price   precio en pesos, sin puntos ni signo (38000).
   Recomendados
   - cat     id de una categoría de la lista de abajo ("rostro", "labios"…).
   - marca   marca del producto (ej. "Montoc"). Si hay 2 o más marcas distintas
             entre los productos, aparece automáticamente un filtro por marca.
   - desc    frase corta: sale en la tarjeta y arriba en la vista del producto.
   - img     foto principal, ruta desde mujer/index.html
             (ej. "../assets/img/productos/labial-bombshell.jpg"). Cuadrada, mínimo 1000 px.
   Opcionales
   - imgs    varias fotos ["../assets/…/1.jpg", "../assets/…/2.jpg"]; la primera es la principal.
   - detalle párrafo largo para la vista del producto.
   - caracteristicas  lista corta de datos: ["Acabado mate", "3,5 g"].
   - icon    dibujo que se muestra mientras no hay foto (clave de SB.ICONS en js/global.js).
   - drop    true para que aparezca en "New drop".
   - variantes   lista de tonos/sabores con su stock: [{talla:"200", stock:2}, …].
                 Si el producto no tiene elección real (una sola presentación), igual
                 lleva un solo elemento para controlar el stock, ej. [{talla:"Única", stock:4}].
                 Con 1 o 2 unidades se muestra "Últimas unidades"; con 0, "Agotado" y
                 no se puede agregar esa variante al carrito.
   - etiquetaVariante   cómo se llama el selector de variantes ("Tono" por defecto,
                        "Sabor" para productos con sabor/aroma, etc.).

   PLANTILLA (copia, pega dentro de productos y rellena)
   {id:"", cat:"", marca:"Montoc", name:"", price:0, desc:"", detalle:"", caracteristicas:[], variantes:[{talla:"Única", stock:0}]},
   ===================================================================== */
window.SB_TIENDA = {
  categoria: "Maquillaje",
  busqueda: "¿Qué estás buscando?",
  // Círculos de "Elige una categoría". Usa img (ruta desde mujer/index.html) o icon.
  // La primera, con id "", es "ver todo".
  categorias: [
    {id:"", nombre:"Todo", img:"../assets/img/logo-todo.jpg"},
    {id:"rostro", nombre:"Rostro", icon:"bottle"},
    {id:"labios", nombre:"Labios", img:"../assets/img/labios.jpg"},
    {id:"cejas", nombre:"Cejas", icon:"eyeliner"},
    {id:"accesorios", nombre:"Accesorios", icon:"spark"}
  ],
  productos: [
    {
      id:"m-polvo-suelto-5g", cat:"rostro", marca:"Montoc", name:"Polvo Suelto Soft Powder 5 g", price:29400, icon:"compact",
      desc:"Polvo suelto traslúcido que se funde con la piel.",
      detalle:"Absorbe el exceso de grasa y deja un acabado suave y uniforme.",
      caracteristicas:["5 g", "Traslúcido", "Acabado suave y uniforme"],
      img:"../assets/img/productos/montoc/m-polvo-suelto.webp",
      variantes:[{talla:"Única", stock:4}]
    },
    {
      id:"m-polvo-suelto-10g", cat:"rostro", marca:"Montoc", name:"Polvo Suelto Soft Powder 10 g", price:36900, icon:"compact",
      desc:"Polvo suelto traslúcido que se funde con la piel.",
      detalle:"Absorbe el exceso de grasa y deja un acabado suave y uniforme.",
      caracteristicas:["10 g", "Traslúcido", "Acabado suave y uniforme"],
      img:"../assets/img/productos/montoc/m-polvo-suelto.webp",
      variantes:[{talla:"Única", stock:6}]
    },
    {
      id:"m-tinta-humide-skin", cat:"rostro", marca:"Montoc", name:"Tinta Humide Skin (Base)", price:61000, icon:"bottle",
      desc:"Base en tinta Humide Healthy Foundation para la piel.",
      detalle:"Disponible en 8 tonos.",
      caracteristicas:["8 tonos"],
      img:"../assets/img/productos/montoc/m-tinta-humide-skin.webp",
      imgs:["../assets/img/productos/montoc/m-tinta-humide-skin.webp", "../assets/img/productos/montoc/m-tinta-humide-skin-tonos.webp"],
      variantes:[
        {talla:"200", stock:2}, {talla:"250", stock:3}, {talla:"300", stock:4}, {talla:"350", stock:3},
        {talla:"400", stock:4}, {talla:"500", stock:3}, {talla:"550", stock:1}, {talla:"600", stock:1}
      ]
    },
    {
      id:"m-corrector-gel-humide", cat:"rostro", marca:"Montoc", name:"Corrector en Gel Humide", price:42900, icon:"bottle",
      desc:"Corrector en gel de cobertura media alta, hidratante.",
      detalle:"Ilumina y unifica el tono de piel. Vegano, sin parabenos ni talco.",
      caracteristicas:["Cobertura media alta", "Hidratante", "Vegano", "Sin parabenos ni talco"],
      img:"../assets/img/productos/montoc/m-corrector-gel-humide.webp",
      imgs:["../assets/img/productos/montoc/m-corrector-gel-humide.webp", "../assets/img/productos/montoc/m-corrector-gel-humide-tonos.webp"],
      variantes:[
        {talla:"#100 Sweet Porcelain", stock:2}, {talla:"#200 Yogurt Fit", stock:3}, {talla:"#300 Very Natural", stock:3},
        {talla:"#400 Light Cotton", stock:3}, {talla:"#500 Sand Creamy", stock:2}
      ]
    },
    {
      id:"m-contorno-liquido-humide", cat:"rostro", marca:"Montoc", name:"Contorno Líquido Humide", price:35000, icon:"bottle",
      desc:"Contorno líquido de alta pigmentación, fácil de difuminar.",
      detalle:"Adaptable a distintos tonos de piel.",
      caracteristicas:["Alta pigmentación", "Fácil de difuminar", "Adaptable a distintos tonos de piel"],
      img:"../assets/img/productos/montoc/m-contorno-liquido-humide.webp",
      variantes:[{talla:"Toffe", stock:2}]
    },
    {
      id:"m-serum-blush-humide", cat:"rostro", marca:"Montoc", name:"Serum Blush Humide", price:32000, icon:"bottle",
      desc:"Rubor en sérum que hidrata y da frescura.",
      detalle:"Se aplica con los dedos o con una brocha.",
      caracteristicas:["Hidratante", "Da frescura"],
      img:"../assets/img/productos/montoc/m-serum-blush-humide.webp",
      imgs:["../assets/img/productos/montoc/m-serum-blush-humide.webp", "../assets/img/productos/montoc/m-serum-blush-humide-tonos.webp"],
      variantes:[{talla:"Sogno", stock:2}, {talla:"Sole", stock:2}, {talla:"Rouce", stock:2}, {talla:"Dolce", stock:1}]
    },
    {
      id:"m-iluminador-light-set", cat:"rostro", marca:"Montoc", name:"Iluminador Light Set", price:43900, icon:"compact",
      desc:"Iluminador compacto en polvo, con espejo.",
      detalle:"Tonos que realzan la piel.",
      caracteristicas:["Polvo compacto", "Con espejo"],
      img:"../assets/img/productos/montoc/m-iluminador-light-set.webp",
      variantes:[{talla:"02 Champagne", stock:2}, {talla:"03 Rose", stock:2}]
    },
    {
      id:"m-paleta-light-set", cat:"rostro", marca:"Montoc", name:"Paleta Light Set", price:59500, icon:"palette",
      desc:"Paleta de 4 colores con bronceador, rubor e iluminador.",
      detalle:"Textura suave y fácil de aplicar.",
      caracteristicas:["4 colores", "Bronceador, rubor e iluminador", "Textura suave"],
      img:"../assets/img/productos/montoc/m-paleta-light-set.webp",
      variantes:[{talla:"Leticia", stock:2}]
    },
    {
      id:"m-dixy-fix-mini", cat:"rostro", marca:"Montoc", name:"Dixy Fix Sellante 10 ml", price:10900, icon:"bottle",
      desc:"Sellante de maquillaje ligero que hidrata y da un acabado natural.",
      detalle:"Fórmula sin parabenos. Presentación mini de 10 ml.",
      caracteristicas:["10 ml", "Ligero", "Hidratante", "Sin parabenos"],
      img:"../assets/img/productos/montoc/m-dixy-fix.webp",
      variantes:[{talla:"Única", stock:8}]
    },
    {
      id:"m-dixy-fix-30ml", cat:"rostro", marca:"Montoc", name:"Dixy Fix Sellante 30 ml", price:44900, icon:"bottle",
      desc:"Sellante de maquillaje ligero que hidrata y da un acabado natural.",
      detalle:"Fórmula sin parabenos. Presentación de 30 ml.",
      caracteristicas:["30 ml", "Ligero", "Hidratante", "Sin parabenos"],
      img:"../assets/img/productos/montoc/m-dixy-fix.webp",
      variantes:[{talla:"Única", stock:5}]
    },
    {
      id:"m-lippie-cheeks", cat:"labios", marca:"Montoc", name:"Lippie Cheeks", price:26900, icon:"lipstick",
      desc:"Tinta en gel para labios y mejillas, con ácido hialurónico.",
      detalle:"Disponible en 5 tonos.",
      caracteristicas:["Tinta en gel", "Con ácido hialurónico", "5 tonos"],
      img:"../assets/img/productos/montoc/m-lippie-cheeks.webp",
      imgs:["../assets/img/productos/montoc/m-lippie-cheeks.webp", "../assets/img/productos/montoc/m-lippie-cheeks-tonos.webp"],
      variantes:[
        {talla:"#100 Gali", stock:2}, {talla:"#200 Mare", stock:2}, {talla:"#300 Salo", stock:2},
        {talla:"#400 Anto", stock:2}, {talla:"#500 Eva", stock:2}
      ]
    },
    {
      id:"m-lippie-balm", cat:"labios", marca:"Montoc", name:"Lippie Balm", price:17300, icon:"lipstick",
      desc:"Bálsamo labial hidratante, de sabores y colores.",
      detalle:"Disponible en 6 sabores.",
      caracteristicas:["Hidratante", "Sabores y colores", "6 sabores"],
      img:"../assets/img/productos/montoc/m-lippie-balm.webp",
      etiquetaVariante:"Sabor",
      variantes:[
        {talla:"Durazno", stock:3}, {talla:"Cereza", stock:2}, {talla:"Fresa", stock:3},
        {talla:"Menta", stock:2}, {talla:"Coco", stock:2}, {talla:"Pitahaya", stock:2}
      ]
    },
    {
      id:"m-cora-lip", cat:"labios", marca:"Montoc", name:"Cora Lip", price:26900, icon:"lipstick",
      desc:"Labial hidratante con ácido hialurónico.",
      detalle:"Color vibrante y textura suave.",
      caracteristicas:["Hidratante", "Ácido hialurónico", "Color vibrante", "3 tonos"],
      img:"../assets/img/productos/montoc/m-cora-lip.webp",
      variantes:[{talla:"Toxi", stock:2}, {talla:"Romanticon", stock:2}, {talla:"Pechiche", stock:2}]
    },
    {
      id:"m-lippie-booster", cat:"labios", marca:"Montoc", name:"Lippie Booster", price:22000, icon:"lipstick",
      desc:"Hidratante labial que repara y nutre.",
      detalle:"Con efecto de color.",
      caracteristicas:["Repara y nutre", "Efecto de color"],
      img:"../assets/img/productos/montoc/m-lippie-booster.webp",
      variantes:[{talla:"Zanahoria", stock:2}]
    },
    {
      id:"m-lapiz-labios", cat:"labios", marca:"Montoc", name:"Lápiz de Labios", price:14900, icon:"lipstick",
      desc:"Delineador de labios en lápiz.",
      detalle:"Tonos rosados y rojizos.",
      caracteristicas:["Delineador en lápiz", "Tonos rosados y rojizos"],
      img:"../assets/img/productos/montoc/m-lapiz-labios.webp",
      imgs:["../assets/img/productos/montoc/m-lapiz-labios.webp", "../assets/img/productos/montoc/m-lapiz-labios-tonos.webp"],
      variantes:[{talla:"Dore 195", stock:2}, {talla:"Rouge 192", stock:2}, {talla:"Baies 193", stock:2}]
    },
    {
      id:"m-brow-fix-tint", cat:"cejas", marca:"Montoc", name:"Tinta para Cejas Brow Fix Tint", price:39400, icon:"eyeliner",
      desc:"Tinte fijador de cejas de larga duración.",
      detalle:"Define, rellena y mantiene el vello en su lugar.",
      caracteristicas:["Larga duración", "Define y rellena", "Fija el vello en su lugar"],
      img:"../assets/img/productos/montoc/m-brow-fix-tint.webp",
      variantes:[{talla:"02 Auburn", stock:1}, {talla:"03 Chestnut", stock:2}, {talla:"04 Medium Brown", stock:2}]
    },
    {
      id:"m-pinza-pestanas", cat:"accesorios", marca:"Montoc", name:"Pinza de Pestañas", price:6900, icon:"spark",
      desc:"Aplicador de pestañas postizas.",
      img:"../assets/img/productos/montoc/m-pinza-pestanas.webp",
      variantes:[{talla:"Única", stock:4}]
    }
  ]
};
