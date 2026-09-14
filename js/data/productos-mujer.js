/* Catálogo de la tienda de maquillaje.
   Productos de ejemplo — reemplaza nombres, precios y descripciones reales.
   - id: único en TODA la marca (lo usan los favoritos)
   - cat: id de una de las categorías de abajo
   - icon: una clave de SB.ICONS en js/global.js
   - drop: true para que aparezca en "New drop" */
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
    {id:"p1", cat:"labios", name:"Labial Mate Bombshell", price:38000, icon:"lipstick", desc:"Color intenso, acabado mate, larga duración."},
    {id:"p2", cat:"rubores", name:"Rubor en Polvo Flush", price:32000, icon:"compact", desc:"Pigmento buildable para un flush natural.", drop:true},
    {id:"p3", cat:"bases", name:"Base Líquida Second Skin", price:52000, icon:"bottle", desc:"Cobertura media-alta, efecto piel real."},
    {id:"p4", cat:"ojos", name:"Delineador Blackout", price:24000, icon:"eyeliner", desc:"Punta precisa, negro intenso, no se corre."},
    {id:"p5", cat:"ojos", name:"Paleta Concrete Jungle", price:68000, icon:"palette", desc:"12 tonos mate y shimmer para el día a la noche.", drop:true},
    {id:"p6", cat:"ojos", name:"Máscara Volume Riot", price:29000, icon:"mascara", desc:"Volumen extremo sin grumos, resistente al agua."}
  ]
};
