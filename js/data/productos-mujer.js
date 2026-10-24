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
      detalle:"Tu aliado para un acabado mate y sin imperfecciones. Este polvo suelto traslúcido se funde con tu piel, absorbe el exceso de grasa y controla el brillo durante horas sin alterar el color de tu maquillaje. Su fórmula micro-pulverizada deja un efecto aterciopelado y no deja efecto blanco en fotos con flash.",
      caracteristicas:["Absorbe el exceso de grasa y controla el brillo durante horas", "Neutraliza rojeces y equilibra el tono", "Efecto aterciopelado, sin efecto blanco en fotos con flash", "Indicado para pieles grasas y mixtas", "Se adapta a cualquier tono de piel", "Disponible en 5 g y 10 g"],
      img:"../assets/img/productos/montoc/m-polvo-suelto.webp",
      variantes:[{talla:"Única", stock:4}]
    },
    {
      id:"m-polvo-suelto-10g", cat:"rostro", marca:"Montoc", name:"Polvo Suelto Soft Powder 10 g", price:36900, icon:"compact",
      desc:"Polvo suelto traslúcido que se funde con la piel.",
      detalle:"Tu aliado para un acabado mate y sin imperfecciones. Este polvo suelto traslúcido se funde con tu piel, absorbe el exceso de grasa y controla el brillo durante horas sin alterar el color de tu maquillaje. Su fórmula micro-pulverizada deja un efecto aterciopelado y no deja efecto blanco en fotos con flash.",
      caracteristicas:["Absorbe el exceso de grasa y controla el brillo durante horas", "Neutraliza rojeces y equilibra el tono", "Efecto aterciopelado, sin efecto blanco en fotos con flash", "Indicado para pieles grasas y mixtas", "Se adapta a cualquier tono de piel", "Disponible en 5 g y 10 g"],
      img:"../assets/img/productos/montoc/m-polvo-suelto.webp",
      variantes:[{talla:"Única", stock:6}]
    },
    {
      id:"m-tinta-humide-skin", cat:"rostro", marca:"Montoc", name:"Tinta Humide Skin (Base)", price:61000, icon:"bottle",
      desc:"Base en tinta Humide Healthy Foundation para la piel.",
      detalle:"Una base en tinta de la línea Humide Healthy Foundation para darle color y uniformidad a tu piel. Elige entre 8 tonos, del 200 al 600, el que mejor se parece al tuyo.",
      caracteristicas:["Base en tinta Humide Healthy Foundation", "8 tonos: 200, 250, 300, 350, 400, 500, 550 y 600", "Elige tu tono antes de comprar"],
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
      detalle:"Cubre ojeras, imperfecciones y rojeces sin resecar tu piel. Corrector en gel de cobertura media alta, hidratante, que ilumina y unifica con un acabado húmedo natural y resistente al sudor. Su fórmula, con 59% de agua, incluye macadamia, moringa y centella asiática, y es vegana, sin parabenos ni talco. Aplícalo con brocha plana o esponja húmeda y difumina con toques suaves.",
      caracteristicas:["Cobertura media alta para ojeras, imperfecciones y rojeces", "Hidrata y no reseca la piel", "Ilumina y unifica con acabado húmedo natural", "Resistente al sudor", "Con macadamia, moringa y centella asiática", "Vegano, sin parabenos y sin talco", "Apto para todo tipo de piel", "5 tonos para encontrar el tuyo"],
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
      detalle:"Dale profundidad y definición a tus rasgos. Contorno líquido ligero, de alta pigmentación y fácil de difuminar, que se adapta a distintos tonos de piel. De larga duración, te acompaña todo el día, y su tamaño compacto cabe en tu cosmetiquera.",
      caracteristicas:["Efecto de profundidad y definición", "Alta pigmentación", "Fácil de difuminar", "Se adapta a distintos tonos de piel", "Larga duración, todo el día", "Tamaño compacto"],
      img:"../assets/img/productos/montoc/m-contorno-liquido-humide.webp",
      variantes:[{talla:"Toffe", stock:2}]
    },
    {
      id:"m-serum-blush-humide", cat:"rostro", marca:"Montoc", name:"Serum Blush Humide", price:32000, icon:"bottle",
      desc:"Rubor en sérum que hidrata y da frescura.",
      detalle:"Mejillas frescas y con color natural. Rubor líquido en sérum que integra hidratación y frescura en cada aplicación y deja un acabado luminoso. Agita bien antes de usarlo, aplica una pequeña cantidad en las mejillas y difumina con los dedos o una brocha; suma capas para un color más intenso.",
      caracteristicas:["Hidrata y da frescura", "Alta pigmentación y acabado luminoso", "Intensidad construible: más capas, más color", "Se aplica con los dedos o con una brocha", "4 tonos: Sogno, Sole, Rouce y Dolce"],
      img:"../assets/img/productos/montoc/m-serum-blush-humide.webp",
      imgs:["../assets/img/productos/montoc/m-serum-blush-humide.webp", "../assets/img/productos/montoc/m-serum-blush-humide-tonos.webp"],
      variantes:[{talla:"Sogno", stock:2}, {talla:"Sole", stock:2}, {talla:"Rouce", stock:2}, {talla:"Dolce", stock:1}]
    },
    {
      id:"m-iluminador-light-set", cat:"rostro", marca:"Montoc", name:"Iluminador Light Set", price:43900, icon:"compact",
      desc:"Iluminador compacto en polvo, con espejo.",
      detalle:"Luz en tus mejores ángulos. Iluminador compacto en polvo, con espejo, de pigmentos perlados ultrarreflejantes que dan luminosidad instantánea con acabado natural. Su textura suave y sedosa se desliza con facilidad, no obstruye los poros y es perfecto para pieles de cualquier tipo. Aplícalo en pómulos, arco de la ceja, centro del rostro y punta de la nariz.",
      caracteristicas:["Pigmentos perlados ultrarreflejantes", "Acabado natural y luminoso", "Textura suave y sedosa", "No obstruye los poros", "Para pieles de cualquier tipo", "Compacto con espejo", "2 tonos: 02 Champagne y 03 Rose"],
      img:"../assets/img/productos/montoc/m-iluminador-light-set.webp",
      variantes:[{talla:"02 Champagne", stock:2}, {talla:"03 Rose", stock:2}]
    },
    {
      id:"m-paleta-light-set", cat:"rostro", marca:"Montoc", name:"Paleta Light Set", price:59500, icon:"palette",
      desc:"Paleta de 4 colores con bronceador, rubor e iluminador.",
      detalle:"Tu rostro completo en una sola paleta. Función 3 en 1: contorno, color e iluminación, con bronceador, rubor e iluminador de alta pigmentación y acabado duradero. Su textura suave se difumina fácil, es sin parabenos y cruelty-free, e ideal para viajes o retoques rápidos.",
      caracteristicas:["3 en 1: bronceador, rubor e iluminador", "Alta pigmentación y acabado duradero", "Textura suave y fácil de difuminar", "Sin parabenos y cruelty-free", "Ideal para viajes y retoques rápidos"],
      img:"../assets/img/productos/montoc/m-paleta-light-set.webp",
      variantes:[{talla:"Leticia", stock:2}]
    },
    {
      id:"m-dixy-fix-mini", cat:"rostro", marca:"Montoc", name:"Dixy Fix Sellante 10 ml", price:10900, icon:"bottle",
      desc:"Sellante de maquillaje ligero que hidrata y da un acabado natural.",
      detalle:"Sella tu maquillaje y mantén tu piel fresca. Bruma ultrafina que hidrata sin sensación pesada, absorbe el exceso de grasa para evitar el maquillaje acartonado y regula la temperatura para evitar rojeces. Da un acabado natural sin alterar los colores de tu maquillaje y prolonga tu look todo el día. Presentación mini de 10 ml para llevar en el bolso.",
      caracteristicas:["Hidrata sin sensación pesada", "Absorbe el exceso de grasa", "Mantiene la piel fresca y evita rojeces", "Acabado natural sin alterar los colores", "Prolonga tu look todo el día", "Sin parabenos"],
      img:"../assets/img/productos/montoc/m-dixy-fix-10ml.jpg",
      variantes:[{talla:"Única", stock:8}]
    },
    {
      id:"m-dixy-fix-30ml", cat:"rostro", marca:"Montoc", name:"Dixy Fix Sellante 30 ml", price:44900, icon:"bottle",
      desc:"Sellante de maquillaje ligero que hidrata y da un acabado natural.",
      detalle:"Sella tu maquillaje y mantén tu piel fresca. Bruma ultrafina que hidrata sin sensación pesada, absorbe el exceso de grasa para evitar el maquillaje acartonado y regula la temperatura para evitar rojeces. Da un acabado natural sin alterar los colores de tu maquillaje y prolonga tu look todo el día. Presentación de 30 ml.",
      caracteristicas:["Hidrata sin sensación pesada", "Absorbe el exceso de grasa", "Mantiene la piel fresca y evita rojeces", "Acabado natural sin alterar los colores", "Prolonga tu look todo el día", "Sin parabenos"],
      img:"../assets/img/productos/montoc/Dixy-Fix-x30ml-Montoc.webp",
      variantes:[{talla:"Única", stock:5}]
    },
    {
      id:"m-lippie-cheeks", cat:"labios", marca:"Montoc", name:"Lippie Cheeks", price:26900, icon:"lipstick",
      desc:"Tinta en gel para labios y mejillas, con ácido hialurónico.",
      detalle:"Un solo producto para tus labios y tus mejillas. Tinta en gel con ácido hialurónico que mantiene la zona hidratada y con frescura, con vitamina E en su fórmula. Se difumina fácil y puedes construir la intensidad, desde un toque sutil hasta un color más marcado, sin resecar. Funciona en piel mixta, grasa o normal.",
      caracteristicas:["Doble uso: labios y mejillas", "Con ácido hialurónico para hidratar y dar frescura", "Con vitamina E", "Intensidad construible, sin resecar", "Textura en gel que se difumina fácil", "5 tonos para elegir"],
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
      detalle:"Labios hidratados, con sabor y un toque luminoso. Su fórmula, enriquecida con óleos de origen vegetal, incluye extracto de macadamia que nutre y suaviza, cera de abejas que sella la humedad y manteca de cacao para una hidratación profunda. Realza el tono natural de tus labios y se funde al instante.",
      caracteristicas:["Hidratación profunda, durante todo el día", "Con macadamia, manteca de cacao y cera de abejas", "Brillo natural que realza el tono de tus labios", "6 sabores: durazno, cereza, fresa, menta, coco y pitahaya"],
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
      detalle:"Color vibrante y labios aterciopelados. Hidratante labial enriquecido con ácido hialurónico, que retiene la humedad y deja los labios radiantes y jugosos por horas. Hidrata, colorea y cuida en un solo paso.",
      caracteristicas:["Con ácido hialurónico que retiene la humedad", "Sensación de labios aterciopelados", "Color vibrante", "Hidrata, colorea y cuida", "3 tonos: Toxi, Romanticon y Pechiche"],
      img:"../assets/img/productos/montoc/m-cora-lip.webp",
      variantes:[{talla:"Toxi", stock:2}, {talla:"Romanticon", stock:2}, {talla:"Pechiche", stock:2}]
    },
    {
      id:"m-lippie-booster", cat:"labios", marca:"Montoc", name:"Lippie Booster", price:22000, icon:"lipstick",
      desc:"Hidratante labial que repara y nutre.",
      detalle:"Nutre, repara y le da color a tus labios. Con acerola (vitaminas A, B1, B2 y B3), tomate y zanahoria, ayuda a combatir la resequedad, unificar el tono y mantener los labios hidratados, con macadamia, manteca de cacao y cera de abejas. Su tinte natural se adapta al pH de cada persona.",
      caracteristicas:["Nutre y repara los labios", "Con acerola: vitaminas A, B1, B2 y B3", "Con tomate y zanahoria: ayudan a unificar el tono", "Con macadamia, manteca de cacao y cera de abejas", "Efecto de color que se adapta a cada persona"],
      img:"../assets/img/productos/montoc/m-lippie-booster.webp",
      variantes:[{talla:"Zanahoria", stock:2}]
    },
    {
      id:"m-lapiz-labios", cat:"labios", marca:"Montoc", name:"Lápiz de Labios", price:14900, icon:"lipstick",
      desc:"Delineador de labios en lápiz.",
      detalle:"Define tu sonrisa con precisión. Delineador de labios de fórmula ultra cremosa e impermeable, con fijadores de pigmento que ayudan a evitar manchas, corridas y desvanecimiento. Perfila desde el arco de cupido hacia las comisuras y rellena para que tu labial dure más.",
      caracteristicas:["Definición perfecta y labios con más volumen", "Evita manchas, corridas y desvanecimiento", "Textura ultra cremosa y resistente a la humedad", "Duración de todo el día", "Sin parabenos", "3 tonos: Dore 195, Rouge 192 y Baies 193"],
      img:"../assets/img/productos/montoc/m-lapiz-labios.webp",
      imgs:["../assets/img/productos/montoc/m-lapiz-labios.webp", "../assets/img/productos/montoc/m-lapiz-labios-tonos.webp"],
      variantes:[{talla:"Dore 195", stock:2}, {talla:"Rouge 192", stock:2}, {talla:"Baies 193", stock:2}]
    },
    {
      id:"m-brow-fix-tint", cat:"cejas", marca:"Montoc", name:"Tinta para Cejas Brow Fix Tint", price:39400, icon:"eyeliner",
      desc:"Tinte fijador de cejas de larga duración.",
      detalle:"Cejas definidas, rellenas y en su lugar. Tinte fijador de larga duración con textura ligera y flexible, que aporta color uniforme y mantiene el vello peinado y fijado durante varias horas (la duración puede variar según el tipo de piel y la rutina). Con pantenol, biotina y extracto de ginseng y arándano, es vegano, libre de parabenos y no testeado en animales. Sigue la forma natural de tus cejas, peina con el cepillo de silicona y aplica una segunda capa para más definición.",
      caracteristicas:["Larga duración, varias horas", "Define y rellena", "Fija el vello en su lugar", "Con pantenol, biotina y extractos de ginseng y arándano", "Vegano, sin parabenos y no testeado en animales", "3 tonos: 02 Auburn, 03 Chestnut y 04 Medium Brown"],
      img:"../assets/img/productos/montoc/m-brow-fix-tint.webp",
      variantes:[{talla:"02 Auburn", stock:1}, {talla:"03 Chestnut", stock:2}, {talla:"04 Medium Brown", stock:2}]
    },
    {
      id:"m-pinza-pestanas", cat:"accesorios", marca:"Montoc", name:"Pinza de Pestañas", price:6900, icon:"spark",
      desc:"Aplicador de pestañas postizas.",
      detalle:"Aplicador de pestañas postizas para colocarlas con más facilidad.",
      caracteristicas:["Aplicador de pestañas postizas"],
      img:"../assets/img/productos/montoc/m-pinza-pestanas.webp",
      variantes:[{talla:"Única", stock:4}]
    }
  ]
};
