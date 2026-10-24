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
      desc:"Polvo suelto para fijar el maquillaje con acabado natural.",
      detalle:"Fija la base y el corrector sin dejar la piel pastosa. Presentación de viaje, ideal para retoques.",
      caracteristicas:["5 g", "Acabado natural"],
      variantes:[{talla:"Única", stock:4}]
    },
    {
      id:"m-polvo-suelto-10g", cat:"rostro", marca:"Montoc", name:"Polvo Suelto Soft Powder 10 g", price:36900, icon:"compact",
      desc:"Polvo suelto para fijar el maquillaje con acabado natural.",
      detalle:"Fija la base y el corrector sin dejar la piel pastosa. Presentación grande, para que no se acabe rápido.",
      caracteristicas:["10 g", "Acabado natural"],
      variantes:[{talla:"Única", stock:6}]
    },
    {
      id:"m-tinta-humide-skin", cat:"rostro", marca:"Montoc", name:"Tinta Humide Skin (Base)", price:61000, icon:"bottle",
      desc:"Base en tinta de cobertura buildable y acabado piel sana.",
      detalle:"Textura ligera que se funde con la piel y se puede construir de poca a mucha cobertura según lo que necesites.",
      caracteristicas:["Cobertura buildable", "Acabado piel sana", "8 tonos"],
      variantes:[
        {talla:"200", stock:2}, {talla:"250", stock:3}, {talla:"300", stock:4}, {talla:"350", stock:3},
        {talla:"400", stock:4}, {talla:"500", stock:3}, {talla:"550", stock:1}, {talla:"600", stock:1}
      ]
    },
    {
      id:"m-corrector-gel-humide", cat:"rostro", marca:"Montoc", name:"Corrector en Gel Humide", price:42900, icon:"bottle",
      desc:"Corrector en gel de alta cobertura que no se agrieta.",
      detalle:"Cubre ojeras e imperfecciones sin acumularse en las líneas de expresión. Acabado natural.",
      caracteristicas:["Alta cobertura", "No se agrieta"],
      variantes:[
        {talla:"#100 Sweet Porcelain", stock:2}, {talla:"#200 Yogurt Fit", stock:3}, {talla:"#300 Very Natural", stock:3},
        {talla:"#400 Light Cotton", stock:3}, {talla:"#500 Sand Creamy", stock:2}
      ]
    },
    {
      id:"m-contorno-liquido-humide", cat:"rostro", marca:"Montoc", name:"Contorno Líquido Humide", price:35000, icon:"bottle",
      desc:"Contorno líquido para marcar y esculpir el rostro.",
      detalle:"Se difumina fácil con brocha o esponja para un contorno natural, sin manchas ni efecto máscara.",
      caracteristicas:["Fácil de difuminar", "Acabado natural"],
      variantes:[{talla:"Toffe", stock:2}]
    },
    {
      id:"m-serum-blush-humide", cat:"rostro", marca:"Montoc", name:"Serum Blush Humide", price:32000, icon:"bottle",
      desc:"Rubor en serum para un flush de piel jugosa.",
      detalle:"Textura líquida que se funde al instante y deja un color translúcido, como si fuera tu propio rubor natural.",
      caracteristicas:["Efecto jugoso", "Buildable"],
      variantes:[{talla:"Sogno", stock:2}, {talla:"Sole", stock:2}, {talla:"Rouce", stock:2}, {talla:"Dolce", stock:1}]
    },
    {
      id:"m-iluminador-light-set", cat:"rostro", marca:"Montoc", name:"Iluminador Light Set", price:43900, icon:"compact",
      desc:"Iluminador en polvo para un brillo luminoso, no glitter.",
      detalle:"Pigmento fino que resalta los puntos altos del rostro con un brillo tipo piel, sin partículas gruesas.",
      caracteristicas:["Brillo tipo piel", "Sin glitter grueso"],
      variantes:[{talla:"02 Champagne", stock:2}, {talla:"03 Rose", stock:2}]
    },
    {
      id:"m-paleta-light-set", cat:"rostro", marca:"Montoc", name:"Paleta Light Set", price:59500, icon:"palette",
      desc:"Paleta de rostro para iluminar, contornear y dar color.",
      detalle:"Varios tonos en un solo empaque para completar la rutina de rostro en un solo paso.",
      caracteristicas:["Varios tonos en una paleta", "Espejo incluido"],
      variantes:[{talla:"Leticia", stock:2}]
    },
    {
      id:"m-dixy-fix-mini", cat:"rostro", marca:"Montoc", name:"Dixy Fix Sellante 10 ml", price:10900, icon:"bottle",
      desc:"Sellador en spray para fijar el maquillaje todo el día.",
      detalle:"Presentación mini, ideal para llevar en la cartera y retocar el fijado fuera de casa.",
      caracteristicas:["10 ml", "Fijación todo el día"],
      variantes:[{talla:"Única", stock:8}]
    },
    {
      id:"m-dixy-fix-30ml", cat:"rostro", marca:"Montoc", name:"Dixy Fix Sellante 30 ml", price:44900, icon:"bottle",
      desc:"Sellador en spray para fijar el maquillaje todo el día.",
      detalle:"Presentación grande para el día a día: sella el maquillaje y controla el brillo de la piel.",
      caracteristicas:["30 ml", "Fijación todo el día"],
      variantes:[{talla:"Única", stock:5}]
    },
    {
      id:"m-lippie-cheeks", cat:"labios", marca:"Montoc", name:"Lippie Cheeks", price:26900, icon:"lipstick",
      desc:"Labial multiuso para labios y mejillas.",
      detalle:"Un solo producto para dar color a labios y mejillas con el mismo tono, ideal para un look rápido.",
      caracteristicas:["Multiuso: labios y mejillas", "5 tonos"],
      variantes:[
        {talla:"#100 Gali", stock:2}, {talla:"#200 Mare", stock:2}, {talla:"#300 Salo", stock:2},
        {talla:"#400 Anto", stock:2}, {talla:"#500 Eva", stock:2}
      ]
    },
    {
      id:"m-lippie-balm", cat:"labios", marca:"Montoc", name:"Lippie Balm", price:17300, icon:"lipstick",
      desc:"Bálsamo labial con color y sabor.",
      detalle:"Hidrata mientras da un toque de color natural, en varios sabores para elegir.",
      caracteristicas:["Hidratante", "Con sabor"],
      etiquetaVariante:"Sabor",
      variantes:[
        {talla:"Durazno", stock:3}, {talla:"Cereza", stock:2}, {talla:"Fresa", stock:3},
        {talla:"Menta", stock:2}, {talla:"Coco", stock:2}, {talla:"Pitahaya", stock:2}
      ]
    },
    {
      id:"m-cora-lip", cat:"labios", marca:"Montoc", name:"Cora Lip", price:26900, icon:"lipstick",
      desc:"Labial líquido de larga duración.",
      detalle:"Color intenso que se mantiene puesto por horas sin resecar los labios.",
      caracteristicas:["Larga duración", "3 tonos"],
      variantes:[{talla:"Toxi", stock:2}, {talla:"Romanticon", stock:2}, {talla:"Pechiche", stock:2}]
    },
    {
      id:"m-lippie-booster", cat:"labios", marca:"Montoc", name:"Lippie Booster", price:22000, icon:"lipstick",
      desc:"Booster labial para dar volumen y brillo.",
      detalle:"Fórmula que aporta un ligero efecto plumping junto con un brillo jugoso.",
      caracteristicas:["Efecto plumping", "Brillo jugoso"],
      variantes:[{talla:"Zanahoria", stock:2}]
    },
    {
      id:"m-lapiz-labios", cat:"labios", marca:"Montoc", name:"Lápiz de Labios", price:14900, icon:"lipstick",
      desc:"Lápiz labial de trazo preciso para perfilar y rellenar.",
      detalle:"Textura cremosa que no jala los labios, ideal para definir el contorno antes del labial.",
      caracteristicas:["Trazo preciso", "Textura cremosa"],
      variantes:[{talla:"Dore 195", stock:2}, {talla:"Rouge 192", stock:2}, {talla:"Baies 193", stock:2}]
    },
    {
      id:"m-brow-fix-tint", cat:"cejas", marca:"Montoc", name:"Tinta para Cejas Brow Fix Tint", price:39400, icon:"eyeliner",
      desc:"Tinta para cejas de larga duración con acabado natural.",
      detalle:"Define y rellena las cejas con un efecto microblading, sin verse cargado.",
      caracteristicas:["Larga duración", "Efecto microblading"],
      variantes:[{talla:"02 Auburn", stock:1}, {talla:"03 Chestnut", stock:2}, {talla:"04 Medium Brown", stock:2}]
    },
    {
      id:"m-pinza-pestanas", cat:"accesorios", marca:"Montoc", name:"Pinza de Pestañas", price:6900, icon:"spark",
      desc:"Pinza para curvar las pestañas antes de la máscara.",
      detalle:"Curva las pestañas de forma pareja para un efecto de ojos más abiertos.",
      caracteristicas:["Curvatura pareja", "Uso diario"],
      variantes:[{talla:"Única", stock:4}]
    }
  ]
};
