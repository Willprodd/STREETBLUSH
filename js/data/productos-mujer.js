/* =====================================================================
   CATÁLOGO DE LA TIENDA DE MAQUILLAJE
   Productos de ejemplo: reemplaza nombres, precios, textos y fotos reales.
   Guía completa: COMO-AGREGAR-PRODUCTOS.md (en la carpeta principal).

   CAMPOS DE CADA PRODUCTO
   Obligatorios
   - id      texto único en TODA la marca (ej. "m-labial-rojo"). No lo cambies
             después de publicar: lo usan los favoritos y el enlace del producto.
   - name    nombre visible.
   - price   precio en pesos, sin puntos ni signo (38000).
   Recomendados
   - cat     id de una categoría de la lista de abajo ("labios", "ojos"…).
   - desc    frase corta: sale en la tarjeta y arriba en la vista del producto.
   - img     foto principal, ruta desde mujer/index.html
             (ej. "../assets/img/productos/labial-bombshell.jpg"). Cuadrada, mínimo 1000 px.
   Opcionales
   - imgs    varias fotos ["../assets/…/1.jpg", "../assets/…/2.jpg"]; la primera es la principal.
   - detalle párrafo largo para la vista del producto.
   - caracteristicas  lista corta de datos: ["Acabado mate", "3,5 g"].
   - icon    dibujo que se muestra mientras no hay foto (clave de SB.ICONS en js/global.js).
   - drop    true para que aparezca en "New drop".

   PLANTILLA (copia, pega dentro de productos y rellena)
   {id:"", cat:"", name:"", price:0, img:"", desc:"", detalle:"", caracteristicas:[]},
   ===================================================================== */
window.SB_TIENDA = {
  categoria: "Maquillaje",
  busqueda: "¿Qué estás buscando?",
  // Círculos de "Elige una categoría". Usa img (ruta desde mujer/index.html) o icon.
  // La primera, con id "", es "ver todo".
  categorias: [
    {id:"", nombre:"Todo", img:"../assets/img/emblema.jpg"},
    {id:"labios", nombre:"Labios", img:"../assets/img/labios.jpg"},
    {id:"rubores", nombre:"Rubores", img:"../assets/img/rubor.jpg"},
    {id:"bases", nombre:"Bases", img:"../assets/img/base.jpg"},
    {id:"ojos", nombre:"Ojos", img:"../assets/img/ojos.jpg"}
  ],
  productos: [
    {
      id:"p1", cat:"labios", name:"Labial Mate Bombshell", price:38000, icon:"lipstick",
      desc:"Color intenso, acabado mate, larga duración.",
      detalle:"Un labial de pigmento alto que cubre en una sola pasada y se mantiene cómodo durante el día, sin resecar ni cuartearse.",
      caracteristicas:["Acabado mate", "Larga duración", "Aplicación en una pasada"]
    },
    {
      id:"p2", cat:"rubores", name:"Rubor en Polvo Flush", price:32000, icon:"compact", drop:true,
      desc:"Pigmento buildable para un flush natural.",
      detalle:"Polvo fino que se difumina fácil: una capa da un rubor suave y puedes construir más color sin que se vea manchado.",
      caracteristicas:["Pigmento buildable", "Textura sedosa", "Espejo en el empaque"]
    },
    {
      id:"p3", cat:"bases", name:"Base Líquida Second Skin", price:52000, icon:"bottle",
      desc:"Cobertura media-alta, efecto piel real.",
      detalle:"Unifica el tono y deja ver la textura natural de la piel. Se aplica con brocha, esponja o con los dedos.",
      caracteristicas:["Cobertura media-alta", "Acabado natural", "Frasco con dosificador"]
    },
    {
      id:"p4", cat:"ojos", name:"Delineador Blackout", price:24000, icon:"eyeliner",
      desc:"Punta precisa, negro intenso, no se corre.",
      detalle:"Punta de fieltro firme para trazos finos o gruesos. El negro seca rápido y resiste el roce durante el día.",
      caracteristicas:["Punta de precisión", "Negro intenso", "Secado rápido"]
    },
    {
      id:"p5", cat:"ojos", name:"Paleta Concrete Jungle", price:68000, icon:"palette", drop:true,
      desc:"12 tonos mate y shimmer para el día a la noche.",
      detalle:"Doce sombras pensadas para combinar entre sí: tonos neutros para el día y brillos para la noche.",
      caracteristicas:["12 tonos", "Mate y shimmer", "Espejo incluido"]
    },
    {
      id:"p6", cat:"ojos", name:"Máscara Volume Riot", price:29000, icon:"mascara",
      desc:"Volumen extremo sin grumos, resistente al agua.",
      detalle:"Cepillo de fibras que separa y carga cada pestaña. Fórmula resistente al agua que se retira con desmaquillante bifásico.",
      caracteristicas:["Volumen", "Resistente al agua", "Sin grumos"]
    }
  ]
};
