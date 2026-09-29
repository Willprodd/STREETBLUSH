/* =====================================================================
   CATÁLOGO DE LA TIENDA DE HOMBRE (STREETWEAR)
   Guía completa: COMO-AGREGAR-PRODUCTOS.md (en la carpeta principal).

   Con este archivo se arman solos: el menú (y su submenú), las tabs,
   los grids, el buscador, la página de colección y la vista de producto.

   CAMPOS DE CADA PRODUCTO
   Obligatorios
   - id      texto único en TODA la marca (ej. "h-tee-oversize-carbon"). No lo cambies
             después de publicar: lo usan los favoritos y el enlace del producto.
   - name    nombre visible.
   - price   precio en pesos, sin puntos ni signo (89000).
   Recomendados
   - cat     id de una categoría de la lista de abajo ("camisetas", "pantalones"…).
   - sub     id de una subcategoría de esa categoría ("oversize", "jeans"…).
   - desc    frase corta: sale en la vista del producto y en la búsqueda.
   - imgs    fotos, ruta desde hombre/ (ej. "../assets/img/hombre/tee-1.jpg").
             La primera es la principal; la segunda aparece al pasar el mouse.
             Formato vertical 3:4 (por ejemplo 900 × 1200 px).
   Opcionales
   - color   color que se muestra debajo del nombre ("Carbón", "Índigo"…).
   - detalle párrafo largo para la vista del producto.
   - caracteristicas  lista corta de datos: ["240 g", "Corte oversize"].
   - tallas  tallas de este producto si no son las generales (ej. ["28","30","32"]).
   - talla   para talla única: talla:"Única" (no se le pide talla al cliente).
   - icon    dibujo que se muestra si no hay foto (clave de SB.ICONS en js/global.js).
   - drop    true para que aparezca en "New drop" y en Novedades.
   - destacado  true para que salga en "Destacados" del inicio.

   PLANTILLA (copia, pega dentro de productos y rellena)
   {id:"", cat:"", sub:"", name:"", price:0, color:"", imgs:[], desc:"", detalle:"", caracteristicas:[]},
   ===================================================================== */
(function(){
  const F = "../assets/img/hombre/";   // carpeta de fotos
  const JEANS = ["28", "30", "32", "34", "36"];

  window.SB_TIENDA = {
    categoria: "Streetwear",
    tipo: "ropa",                            // el carrito pide talla a los productos de esta tienda
    tallas: ["S", "M", "L", "XL"],
    busqueda: "Busca oversize, jeans, cargos…",
    etiquetaDrop: "New drop",

    // Menú, tabs y filtros. "img" es la foto del submenú y de la página de colección.
    categorias: [
      {id:"camisetas", nombre:"Camisetas", img:F + "campana-oversize-a.jpg", icon:"tee", sub:[
        {id:"oversize",   nombre:"Oversize"},
        {id:"boxy",       nombre:"Boxy"},
        {id:"estampadas", nombre:"Estampadas"},
        {id:"basicas",    nombre:"Básicas"}
      ]},
      {id:"pantalones", nombre:"Pantalones", img:F + "coleccion-jeans.jpg", icon:"cargo", sub:[
        {id:"jeans",   nombre:"Jeans"},
        {id:"cargos",  nombre:"Cargos"},
        {id:"joggers", nombre:"Joggers"}
      ]},
      {id:"buzos-chaquetas", nombre:"Buzos y chaquetas", img:F + "coleccion-buzos.jpg", icon:"hoodie", sub:[
        {id:"hoodies",   nombre:"Hoodies"},
        {id:"chaquetas", nombre:"Chaquetas"}
      ]},
      {id:"accesorios", nombre:"Accesorios", img:F + "coleccion-gorras.jpg", icon:"cap", sub:[
        {id:"gorras", nombre:"Gorras"}
      ]}
    ],

    productos: [
      /* ---------- Camisetas ---------- */
      {
        id:"h-tee-oversize-carbon", cat:"camisetas", sub:"oversize", name:"Tee Oversize Carbón", price:89000,
        color:"Carbón", icon:"tee", drop:true,
        imgs:[F + "tee-oversize-carbon-1.jpg", F + "tee-oversize-carbon-2.jpg"],
        desc:"Algodón de 240 g, hombro caído y largo extra.",
        detalle:"La camiseta que va con todo. Algodón peinado de 240 g con caída firme que no se transparenta, hombro caído, manga al codo y largo extra para el corte oversize. Cuello en rib de doble aguja que no se deforma con las lavadas.",
        caracteristicas:["Algodón peinado 240 g", "Corte oversize", "Hombro caído", "Cuello rib reforzado"]
      },
      {
        id:"h-tee-oversize-blush", cat:"camisetas", sub:"oversize", name:"Tee Oversize Blush", price:89000,
        color:"Rosa blush", icon:"tee", drop:true,
        imgs:[F + "tee-oversize-blush-1.jpg", F + "tee-oversize-blush-2.jpg"],
        desc:"El rosa de la casa en algodón pesado de 240 g.",
        detalle:"El tono insignia de Street Blush llevado a una oversize de algodón de 240 g. Teñido en prenda para un color suave y parejo, hombro caído y cuello en rib reforzado.",
        caracteristicas:["Algodón 240 g", "Teñido en prenda", "Corte oversize", "Cuello rib reforzado"]
      },
      {
        id:"h-tee-monogram", cat:"camisetas", sub:"estampadas", name:"Tee Monogram Heavy", price:89000,
        color:"Grafito", icon:"tee", drop:true,
        imgs:[F + "tee-monogram-1.jpg", F + "tee-monogram-2.jpg"],
        desc:"Algodón pima de 240 g con monograma SB en el pecho.",
        detalle:"Camiseta de algodón pima de 240 g con caída firme. Cuello redondo de doble aguja con cinta de refuerzo en la nuca. Estampado serigráfico del monograma SB con tinta a base de agua: al tacto no se siente plástico.",
        caracteristicas:["Algodón pima 240 g", "Serigrafía a base de agua", "Cuello doble reforzado", "Corte oversize"]
      },
      {
        id:"h-tee-boxy", cat:"camisetas", sub:"boxy", name:"Tee Boxy Ivory", price:84000,
        color:"Marfil", icon:"tee", destacado:true,
        imgs:[F + "tee-boxy-1.jpg", F + "tee-boxy-2.jpg"],
        desc:"Corte boxy, cuello ancho y tono marfil sin blanqueadores.",
        detalle:"Camiseta de corte boxy: más ancha que larga, con hombro caído y cuello ancho tipo rib. Tejido de 220 g en marfil natural, sin blanqueadores ópticos.",
        caracteristicas:["Corte boxy", "Cuello tipo rib", "220 g sin ópticos", "Hombro caído"]
      },
      {
        id:"h-tee-basica-noir", cat:"camisetas", sub:"basicas", name:"Tee Básica Noir", price:69000,
        color:"Negro", icon:"tee",
        imgs:[F + "tee-basica-noir-1.jpg", F + "tee-basica-noir-2.jpg"],
        desc:"La básica negra de corte regular que no se destiñe.",
        detalle:"Camiseta básica de corte regular en algodón de 200 g con teñido reactivo: el negro se mantiene profundo lavada tras lavada. Costuras laterales para que no se tuerza.",
        caracteristicas:["Algodón 200 g", "Corte regular", "Teñido reactivo", "Costuras laterales"]
      },
      {
        id:"h-tee-bloom", cat:"camisetas", sub:"estampadas", name:"Tee Bloom Bordada", price:99000,
        color:"Hueso", icon:"tee", destacado:true,
        imgs:[F + "tee-bloom-1.jpg", F + "tee-bloom-2.jpg"],
        desc:"Oversize hueso con bordado floral a color en el pecho.",
        detalle:"Oversize en algodón de 240 g color hueso con un bordado floral a varios colores en el pecho. El bordado lleva entretela por dentro para que no raspe ni se arrugue.",
        caracteristicas:["Bordado a color", "Algodón 240 g", "Corte oversize", "Entretela interior"]
      },
      {
        id:"h-tee-back-print", cat:"camisetas", sub:"estampadas", name:"Tee Back Print", price:94000,
        color:"Blanco", icon:"tee", destacado:true,
        imgs:[F + "tee-back-print-1.jpg", F + "tee-back-print-2.jpg"],
        desc:"Estampado grande en la espalda y logo pequeño adelante.",
        detalle:"Camiseta oversize con estampado a gran formato en la espalda y el logo pequeño en el pecho. Serigrafía a varias tintas sobre algodón de 240 g.",
        caracteristicas:["Estampado en espalda", "Serigrafía a varias tintas", "Algodón 240 g", "Corte oversize"]
      },

      /* ---------- Pantalones ---------- */
      {
        id:"h-jean-baggy-stone", cat:"pantalones", sub:"jeans", name:"Jean Baggy Stone", price:169000,
        color:"Azul claro", icon:"cargo", tallas:JEANS, drop:true,
        imgs:[F + "jean-baggy-stone-1.jpg", F + "jean-baggy-stone-2.jpg"],
        desc:"Baggy de tiro medio con lavado a la piedra.",
        detalle:"Jean baggy de tiro medio y pierna ancha que cae sobre el tenis. Denim rígido de 13 oz con lavado a la piedra: se ve usado desde el primer día y se suaviza con el tiempo.",
        caracteristicas:["Denim 13 oz", "Lavado a la piedra", "Tiro medio", "Pierna ancha"]
      },
      {
        id:"h-jean-wide-indigo", cat:"pantalones", sub:"jeans", name:"Jean Wide Índigo", price:179000,
        color:"Índigo", icon:"cargo", tallas:JEANS, destacado:true,
        imgs:[F + "jean-wide-indigo-1.jpg", F + "jean-wide-indigo-2.jpg"],
        desc:"Pierna ancha en índigo oscuro, silueta de los 90.",
        detalle:"Jean de pierna ancha inspirado en la silueta de los 90, en denim índigo oscuro de 13 oz. Remaches metálicos y bolsillos traseros amplios.",
        caracteristicas:["Denim 13 oz", "Índigo oscuro", "Pierna ancha", "Remaches metálicos"]
      },
      {
        id:"h-cargo-quartz", cat:"pantalones", sub:"cargos", name:"Cargo Quartz Ripstop", price:159000,
        color:"Oliva", icon:"cargo", drop:true,
        imgs:[F + "cargo-quartz-1.jpg", F + "cargo-quartz-2.jpg"],
        desc:"Ripstop técnico con bolsillos de cierre oculto.",
        detalle:"Pantalón cargo de ripstop técnico que no se arruga ni se deforma en la rodilla. Seis bolsillos, dos con cierre oculto. Cordón encubierto en la cintura y bota ajustable.",
        caracteristicas:["Ripstop técnico", "6 bolsillos", "Cordón encubierto", "Bota ajustable"]
      },
      {
        id:"h-cargo-hueso", cat:"pantalones", sub:"cargos", name:"Cargo Hueso Wide", price:149000,
        color:"Hueso", icon:"cargo", destacado:true,
        imgs:[F + "cargo-hueso-1.jpg"],
        desc:"Sarga gruesa en tono hueso, bota ancha.",
        detalle:"Cargo de bota ancha en sarga de algodón de 320 g con lavado enzimático para un tacto suave desde el primer uso. Bolsillos de parche ampliados.",
        caracteristicas:["Sarga 320 g", "Bota ancha", "Lavado enzimático", "Bolsillos de parche"]
      },
      {
        id:"h-cargo-loose", cat:"pantalones", sub:"cargos", name:"Cargo Loose Noir", price:155000,
        color:"Negro", icon:"cargo",
        imgs:[F + "cargo-loose-1.jpg"],
        desc:"Cargo suelto en negro con bolsillos al muslo.",
        detalle:"Cargo de corte suelto en sarga negra con bolsillos de fuelle al muslo y cintura con resorte trasero para que ajuste sin correa.",
        caracteristicas:["Sarga negra", "Corte suelto", "Bolsillos de fuelle", "Resorte trasero"]
      },
      {
        id:"h-jogger-sand", cat:"pantalones", sub:"joggers", name:"Jogger Sand Fleece", price:129000,
        color:"Arena", icon:"joggers",
        imgs:[F + "jogger-sand-1.jpg"],
        desc:"Felpa perchada, pierna recta y puño abierto.",
        detalle:"Jogger de felpa perchada de 380 g con pierna recta y puño abierto, para llevarlo largo sobre el tenis. Cordón plano y bolsillos laterales profundos.",
        caracteristicas:["Felpa 380 g", "Interior perchado", "Pierna recta", "Bolsillos profundos"]
      },

      /* ---------- Buzos y chaquetas ---------- */
      {
        id:"h-hoodie-noir", cat:"buzos-chaquetas", sub:"hoodies", name:"Hoodie Noir 480", price:189000,
        color:"Negro", icon:"hoodie", drop:true,
        imgs:[F + "hoodie-noir-2.jpg"],
        desc:"Felpa francesa de 480 g, corte oversize, interior perchado.",
        detalle:"Nuestro hoodie insignia. Felpa francesa de 480 g con interior perchado: abriga como una chaqueta. Capota doble forrada, bolsillo canguro con refuerzo y puños en rib que no se abren con el uso.",
        caracteristicas:["Felpa 480 g", "Capota doble forrada", "Interior perchado", "Corte oversize"]
      },
      {
        id:"h-hoodie-eyes", cat:"buzos-chaquetas", sub:"hoodies", name:"Hoodie Eyes Closed", price:199000,
        color:"Negro", icon:"hoodie",
        imgs:[F + "hoodie-eyes-1.jpg"],
        desc:"Estampado grande en la espalda sobre felpa de 420 g.",
        detalle:"Hoodie oversize de felpa de 420 g con estampado a gran formato en la espalda. Capota doble y bolsillo canguro.",
        caracteristicas:["Felpa 420 g", "Estampado en espalda", "Capota doble", "Corte oversize"]
      },
      {
        id:"h-hoodie-ladrillo", cat:"buzos-chaquetas", sub:"hoodies", name:"Hoodie Ladrillo", price:185000,
        color:"Rojo ladrillo", icon:"hoodie", destacado:true,
        imgs:[F + "hoodie-ladrillo-1.jpg"],
        desc:"Rojo ladrillo con logo bordado en el pecho.",
        detalle:"Hoodie de felpa de 420 g en rojo ladrillo con el logo bordado tono sobre tono en el pecho. Interior perchado y puños en rib.",
        caracteristicas:["Felpa 420 g", "Logo bordado", "Interior perchado", "Puños en rib"]
      },
      {
        id:"h-chaqueta-denim", cat:"buzos-chaquetas", sub:"chaquetas", name:"Chaqueta Denim Trucker", price:229000,
        color:"Azul medio", icon:"bomber", destacado:true,
        imgs:[F + "chaqueta-denim-1.jpg"],
        desc:"Trucker clásica en denim de 14 oz, corte un poco amplio.",
        detalle:"Chaqueta trucker en denim de 14 oz con corte un poco más amplio que el clásico, para llevarla sobre un hoodie. Botones metálicos grabados.",
        caracteristicas:["Denim 14 oz", "Botones grabados", "Corte amplio", "Bolsillos de pecho"]
      },
      {
        id:"h-chaqueta-noir", cat:"buzos-chaquetas", sub:"chaquetas", name:"Chaqueta Noir Signature", price:259000,
        color:"Negro", icon:"bomber", drop:true,
        imgs:[F + "chaqueta-noir-1.jpg", F + "chaqueta-noir-2.jpg"],
        desc:"Cuero vegano mate con forro satinado blush.",
        detalle:"La pieza más buscada del drop: chaqueta de cuero vegano mate con forro satinado en el rosa de la casa. Cierre metálico de doble cursor y bolsillo interno.",
        caracteristicas:["Cuero vegano mate", "Forro satinado blush", "Cierre de doble cursor", "Bolsillo interno"]
      },

      /* ---------- Accesorios ---------- */
      {
        id:"h-cap-emblem", cat:"accesorios", sub:"gorras", name:"Cap Emblem Onyx", price:69000,
        color:"Negro", icon:"cap", talla:"Única", destacado:true,
        imgs:[F + "cap-emblem-1.jpg", F + "cap-emblem-2.jpg"],
        desc:"Seis paneles, bordado 3D del emblema, cierre metálico.",
        detalle:"Gorra de seis paneles en sarga de algodón con visera precurvada y bordado 3D del emblema SB. Cierre metálico grabado y banda interior que absorbe el sudor.",
        caracteristicas:["Bordado 3D", "Cierre metálico grabado", "Banda absorbe-sudor", "Visera precurvada"]
      },
      {
        id:"h-cap-trucker", cat:"accesorios", sub:"gorras", name:"Trucker Mesh Onyx", price:59000,
        color:"Negro", icon:"cap", talla:"Única",
        imgs:[F + "cap-trucker-1.jpg"],
        desc:"Malla trasera, frente estructurado, parche de goma.",
        detalle:"Trucker de frente estructurado en sarga y malla trasera de alta ventilación. Parche de goma inyectada con el monograma y visera con borde reforzado.",
        caracteristicas:["Malla ventilada", "Parche de goma", "Frente estructurado", "Visera reforzada"]
      }
    ]
  };
})();
