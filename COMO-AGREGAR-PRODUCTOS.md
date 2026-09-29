# Cómo agregar productos a Street Blush

Los productos no están en el HTML: cada tienda los lee de un archivo de datos.
Las tarjetas, la búsqueda, la vista de producto y el carrito se arman solos.

| Tienda | Archivo de productos | Fotos |
| --- | --- | --- |
| Maquillaje | `js/data/productos-mujer.js` | `assets/img/productos/` |
| Hombre | `js/data/productos-hombre.js` | `assets/img/hombre/` |

## 1. Sube la foto

1. Guarda la foto en `assets/img/productos/`.
2. Usa un nombre sin espacios, tildes ni mayúsculas: `labial-rojo-fuego.jpg`.
3. Mejor si es **cuadrada**, de **1000 × 1000 px** o más, y pesa menos de **300 KB**
   (puedes comprimirla gratis en squoosh.app).

## 2. Agrega el producto

Abre el archivo de la tienda y copia este bloque dentro de `productos: [ … ]`,
después del último producto (fíjate en la coma entre productos):

```js
{
  id:"m-labial-rojo-fuego",
  cat:"labios",
  name:"Labial Rojo Fuego",
  price:42000,
  img:"../assets/img/productos/labial-rojo-fuego.jpg",
  desc:"Rojo intenso con acabado satinado.",
  detalle:"Texto largo que se ve al abrir el producto.",
  caracteristicas:["Acabado satinado", "Larga duración", "3,5 g"]
},
```

| Campo | ¿Obligatorio? | Qué es |
| --- | --- | --- |
| `id` | Sí | Único en toda la marca. No lo cambies después: lo usan los favoritos y el enlace del producto. |
| `name` | Sí | Nombre visible. |
| `price` | Sí | Precio en pesos, sin puntos ni `$` (`42000`). |
| `cat` | Maquillaje | `labios`, `rubores`, `bases` u `ojos`. |
| `img` | Recomendado | Ruta de la foto principal. Sin foto se muestra un dibujo. |
| `imgs` | No | Varias fotos: `["../assets/img/productos/a.jpg", "../assets/img/productos/b.jpg"]`. |
| `desc` | Recomendado | Frase corta de la tarjeta. |
| `detalle` | No | Párrafo de la vista del producto. |
| `caracteristicas` | No | Lista corta de datos. |
| `drop` | No | `true` para mostrarlo en *New drop*. |
| `tallas` | Solo ropa | Si no usa las tallas generales: `["28","30","32"]`. |
| `talla` | Solo ropa | Talla única: `talla:"Única"`. |

## 3. Revisa

Abre la tienda y recarga. Si un producto no aparece, abre la consola del navegador
(F12 → Consola): ahí sale el aviso (falta el precio, id repetido, categoría que no existe…).

Cada producto tiene su propio enlace para compartir:
`mujer/index.html#producto/m-labial-rojo-fuego`.

## Tienda de hombre: lo que cambia

- Las fotos van en `assets/img/hombre/`, en formato **vertical 3:4** (por ejemplo 900 × 1200 px).
  Usa `imgs` con dos fotos: la segunda aparece al pasar el mouse por la tarjeta.
- Cada producto lleva `cat` (categoría) y `sub` (subcategoría). Con eso aparece solo en el menú,
  en las tabs del inicio y en la página de colección (`hombre/coleccion.html?c=camisetas&s=oversize`).
- `destacado:true` lo muestra en *Destacados* del inicio; `drop:true` en *New drop* y *Novedades*.
- `color` se muestra debajo del nombre en la tarjeta.

```js
{
  id:"h-tee-oversize-arena", cat:"camisetas", sub:"oversize",
  name:"Tee Oversize Arena", price:89000, color:"Arena",
  imgs:["../assets/img/hombre/tee-oversize-arena-1.jpg", "../assets/img/hombre/tee-oversize-arena-2.jpg"],
  desc:"Algodón de 240 g, hombro caído.",
  detalle:"Texto largo que se ve al abrir el producto.",
  caracteristicas:["Algodón 240 g", "Corte oversize"]
},
```

**Nueva subcategoría de hombre:** en `categorias` de `productos-hombre.js`, dentro del `sub` de su categoría,
agrega `{id:"manga-larga", nombre:"Manga larga"}` y usa `sub:"manga-larga"` en sus productos. El menú se actualiza solo.

Las tabs de *Encuentra tu estilo* se eligen en `hombre/index.html`, en `data-subs="oversize,jeans,cargos,hoodies,gorras"`.

Las fotos de hombre que hay ahora son de stock (Pexels) y son temporales: la lista está en `assets/img/hombre/CREDITOS.md`.

## Nueva categoría de maquillaje

En `categorias` de `productos-mujer.js` agrega
`{id:"cejas", nombre:"Cejas", img:"../assets/img/cejas.jpg"}` y usa `cat:"cejas"` en sus productos.

## Número de WhatsApp

Los pedidos llegan al número de `js/whatsapp.js` (`WHATSAPP_NUMBER`, formato `57XXXXXXXXXX`).
