# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Compradores en Colombia que llegan desde Instagram o WhatsApp, casi siempre en el celular. En la tienda de hombre buscan streetwear (camisetas, pantalones y sus variantes: oversize, boxy, jeans, cargos, joggers) y en la de mujer maquillaje. Quieren ver la prenda, elegir talla y pedir sin crear cuenta.

## Product Purpose
Street Blush es una marca colombiana con dos tiendas: maquillaje (mujer/) y ropa streetwear (hombre/). El sitio muestra el catálogo, arma una bolsa y envía el pedido completo por WhatsApp, donde la marca coordina pago y envío. Éxito: que el cliente encuentre su prenda y mande el pedido con talla y datos correctos.

## Positioning
Una sola marca y una sola actitud para maquillaje urbano y streetwear, con trato directo: el pedido lo recibe la marca por WhatsApp, no un chatbot ni un marketplace.

## Operating Context
- Sitio estático (HTML, CSS y JS sin framework); cada tienda lee sus productos de `js/data/productos-*.js` (guía en COMO-AGREGAR-PRODUCTOS.md).
- Carrito compartido entre tiendas en localStorage; el pedido sale como mensaje de WhatsApp (`js/whatsapp.js`).
- Favoritos en localStorage; vista de producto por enlace `#producto/<id>`.
- No hay cuentas de usuario, pasarela de pago ni backend para correos.

## Capabilities and Constraints
- Ropa con tallas (S–XL por defecto, tallas propias por producto o talla única).
- Sección New drop con productos marcados `drop:true` y cuenta regresiva (`js/drop.js`).
- Sin backend: formularios como newsletter no pueden guardar datos en un servidor; cualquier registro debe ir por WhatsApp o quedar indicado como pendiente.
- Número de WhatsApp aún es un marcador (`573000000000`).

## Brand Commitments
- Nombre Street Blush, logo (`assets/img/logo.png`) y emblema (`assets/img/emblema.jpg`).
- Acento rosa de marca (#d63a73 y su tono profundo #a6265a en maquillaje). La tienda de hombre usa una versión más oscura y sobria, tono vino (#9e2f55 / #6e1d3b), para que se vea más masculina.
- Títulos de campaña en Archivo Black (confirmado para el rediseño de hombre).
- La sección New drop conserva su identidad: fondo negro, colores invertidos y cuenta regresiva.
- Al adaptar referencias visuales, se conservan las secciones propias de la marca que el usuario no pidió cambiar.

## Evidence on Hand
- Productos de hombre de ejemplo en `js/data/productos-hombre.js` (sin fotos reales todavía).
- Banners de maquillaje en `assets/img/banner-mujer-*.jpg`.
- No hay fotos reales de ropa: se usan fotos de stock temporales hasta que lleguen las propias.
- No hay testimonios, cifras, descuentos ni tiendas físicas confirmadas: no se inventan.

## Product Principles
- Pedir debe ser tan corto como elegir talla y tocar un botón.
- Móvil primero: la mayoría llega desde el celular.
- Nada de promesas que la marca no ha confirmado (descuentos, envío gratis, tiendas).
- Las dos tiendas se sienten de la misma marca aunque cada una tenga su propio mundo.
