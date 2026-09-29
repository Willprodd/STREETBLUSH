---
name: Street Blush Hombre
description: Tienda de streetwear de Street Blush; limpia, blanca y de catálogo, con la marca en el logo, el rosa y los títulos de campaña.
colors:
  ink: "#1c1e22"
  ink-soft: "#383b41"
  ink-black: "#000000"
  muted: "#5f636a"
  placeholder: "#6f7279"
  paper: "#ffffff"
  band: "#f5f5f3"
  tile: "#f1f1ef"
  hairline: "#e6e6e3"
  tile-line: "#e2e2df"
  input-stroke: "#cfcfcb"
  drop-night: "#121315"
  drop-tile: "#26282c"
  rose: "#9e2f55"
  rose-deep: "#6e1d3b"
  rose-light: "#d47a9a"
  blush: "#efdde4"
  error: "#b42318"
typography:
  campaign:
    fontFamily: "'Archivo Black', 'Arial Black', sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  campaign-page:
    fontFamily: "'Archivo Black', 'Arial Black', sans-serif"
    fontSize: "clamp(2rem, 5.2vw, 3.8rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Instrument Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Instrument Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "'Instrument Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Instrument Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 3.2vw, 2.5rem)"
  section: "clamp(3rem, 6vw, 5rem)"
  grid-row-gap: "clamp(1.75rem, 3vw, 2.5rem)"
  grid-col-gap: "clamp(0.6rem, 1.2vw, 1rem)"
  container: "1480px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "12px 25.6px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-black}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 25.6px"
    height: "48px"
  button-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 25.6px"
    height: "48px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6.4px 16px"
    height: "38px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tab:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7.2px 16.8px"
    height: "40px"
  tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  product-media:
    backgroundColor: "{colors.tile}"
    rounded: "{rounded.sm}"
  badge-new-drop:
    backgroundColor: "{colors.rose-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xs}"
    padding: "4.8px 8px"
  size-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    height: "34px"
    width: "40px"
  size-button-added:
    backgroundColor: "{colors.rose-deep}"
    textColor: "{colors.paper}"
  input-newsletter:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "50px"
---

# Design System: Street Blush Hombre

Scope: this file documents the **men's streetwear store only** (`hombre/index.html`, `hombre/coleccion.html`, `hombre/politicas.html`), painted by `css/tema-hombre.css` on top of the shared `css/global.css` and `css/componentes.css`, with markup from `js/hombre-shell.js` and `js/hombre.js`. The side cart (`js/carrito.js`), product view (`js/producto.js`) and size guide are shared components; this system is their men's-store skin.

**The makeup store (`mujer/`, `css/tema-mujer.css`) keeps its own incumbent world** and does not follow this file: pink-tinted paper (#fdf8fa family), Fraunces editorial italics and Manrope body. Do not restyle it from these tokens. What both stores share, and what must stay identical between them, is the brand constant set: the Street Blush logo and emblem, the rose hue (the makeup store uses #d63a73 / #a6265a; the men's store deliberately runs a darker, more sober wine-rose, #9e2f55 / #6e1d3b, requested by the owner so it reads more masculine), Archivo Black for campaign titles, and the NEW DROP section on a black ground with inverted colors and its countdown.

## Overview

**Creative North Star: "The Clean Rack"**

A standard fashion storefront executed at full fidelity: white ground, near-black type, big 3:4 garment photos on very light grey, black rectangular buttons with barely softened corners. The store does not try to look like a luxury lookbook or a dark streetwear zine; it looks like a well-run clothing shop, and the brand lives in a few fixed places instead of everywhere: the logo, the pink announcement strip, the Archivo Black campaign titles, and the black NEW DROP band.

Density is catalog density. Four-column product grids on desktop, two on mobile, horizontal hairlines between regions, soft grey bands (#f5f5f3) to separate help, newsletter and collection slides. Motion is quiet: crossfading slideshows with a slow photo settle, underline reveals on navigation, a second product photo on hover.

**Key Characteristics:**
- White ground, ink text, black primary actions; rose is a signal, never a surface.
- One sans (Instrument Sans) for everything except campaign titles.
- 3:4 photography on a light tile, 6px corners across photos, buttons, inputs and slides.
- Flat surfaces; shadows only on floating layers (menus, quick-add, popup, cart, WhatsApp button).
- The NEW DROP band is the one dark room in a white house.

## Colors

A neutral white-and-ink catalog palette with one dark wine-rose held back for signals. The rose is darker than the makeup store's on purpose: keep it deep and sober, never candy pink.

### Primary
- **Street Ink** (ink): body text, primary buttons, selected tabs and chips, cart counter, focus outlines. Hover on dark actions goes to pure black (ink-black).

### Secondary
- **Street Blush Rose Deep** (rose-deep): the announcement strip ground, NEW DROP badges on product cards and in the product view, the "added" state of size buttons and add-to-cart, hover color for text links, footer social hover, and the search field's focused underline.
- **Street Blush Rose** (rose): favorited heart, text selection, input caret.
- **Rose Light** (rose-light): countdown unit labels on the black drop band only, where rose-deep lacks contrast.
- **Blush** (blush): tiny pill backgrounds (favorites count, cart-sent icon, toast button hover). Never a section background in this store.

### Neutral
- **Paper White** (paper): page, header, footer, drawers, modals.
- **Soft Band** (band): full-width bands (size help, newsletter), collection slide copy panel, drawer footer, table heads, icon-button hover.
- **Photo Tile** (tile): the ground behind every product photo while it loads and under multiplied cut-outs.
- **Hairline** (hairline): every divider, chip/tab/size border, header border once scrolled, footer top rule, table rows.
- **Muted Slate** (muted): secondary text, product meta, uppercase labels (6:1 on white). **Ink Soft** (ink-soft) for long-form body in help and policies.
- **Drop Night** (drop-night) with **Drop Tile** (drop-tile): the NEW DROP band and the photo ground inside it.
- **Error Red** (error): invalid newsletter field and its message only.

### Named Rules
**The Rose Is A Signal Rule.** Rose appears only in the announcement strip, NEW DROP badges, active/added/favorited states, link hover, and selection/caret. Never as a button fill, never as a section background. If a screen shows rose on more than those signals, it is off-system.

**The One Dark Room Rule.** Drop Night is reserved for the NEW DROP band (and the hero behind its photos). No other section goes dark.

## Typography

**Display Font:** Archivo Black (with Arial Black)
**Body Font:** Instrument Sans, weights 400/500/600/700 (with Segoe UI, system-ui)

**Character:** A plain, contemporary grotesk does all the shop work; one heavy poster face shouts the campaign names.

### Hierarchy
- **Campaign** (Archivo Black 400, clamp(3rem, 7.4vw, 6rem), line-height 0.9): hero slide names ("NEW DROP", "OVERSIZE"), the drop band title (up to 5.4rem), collection slide names (up to 3.3rem), countdown digits. Set in capitals as written.
- **Campaign Page** (Archivo Black 400, clamp(2rem, 5.2vw, 3.8rem), 0.95, uppercase): collection and help page H1, welcome popup title.
- **Headline** (Instrument Sans 600, clamp(1.4rem, 2.2vw, 1.85rem), 1.15, -0.02em): every section heading ("Destacados", "Colecciones"), newsletter and policy H2s at slightly larger clamps, cart and product-view titles.
- **Title** (Instrument Sans 500, 0.95rem, 1.35): product names; prices at 600 with tabular numerals.
- **Body** (Instrument Sans 400, 1rem, 1.6): paragraphs, 34 to 60ch; policies at 1.7 line-height and 70ch.
- **Label** (Instrument Sans 600, 0.75rem, 0.08em, uppercase, muted): footer column heads, mega-menu column heads, search group labels, table heads, countdown caption. Labels name a group of controls or data; they never sit above a headline as a tagline.

### Named Rules
**The Campaign-Only Rule.** Archivo Black is for campaign and drop names, page H1s and the countdown digits. Section headings, product names, buttons and UI text are always Instrument Sans.

**The Numbers Line Up Rule.** Prices, counters, sizes and countdown use tabular numerals.

## Layout

Fluid container up to 1480px with a fluid gutter (clamp(1rem, 3.2vw, 2.5rem)). Sections breathe with clamp(3rem, 6vw, 5rem) top and bottom; the drop band gets more (up to 6rem). Section heads are a flex row: headline left, underlined "Ver todo" link or tab list right.

- **Header:** sticky, 68px (58px under 768px). Three-column grid: logo left, nav centered, icon actions right. Under 1100px the nav collapses to a left drawer and the logo centers.
- **Hero:** full-bleed, clamp(520px, 100svh − 102px, 880px) tall, two portrait photos side by side (one on mobile), copy anchored bottom-left, progress-bar indicators and pause bottom-right.
- **Product grid:** 4 columns, 3 under 1024px, 2 under 768px; tight column gap (0.6 to 1rem) and generous row gap (1.75 to 2.5rem). Tab rows become a horizontal snap scroller at 68% card width on mobile.
- **NEW DROP band:** sticky title column (0.75fr) beside a 3-column product grid (2fr); stacks under 1024px.
- **Two-column bands:** help and newsletter split 1fr / 1.1fr, stacking under 1024px. Collection slides split 7fr / 5fr image/copy.
- **Footer:** brand column plus four link columns (two on mobile), bottom row padded right to clear the floating WhatsApp button.

## Elevation & Depth

Flat by default. Depth comes from tonal bands (paper vs band vs tile) and hairlines. Shadows exist only on layers that float above the page, always soft, negative-spread and ink-tinted.

### Shadow Vocabulary
- **Menu drop** (`box-shadow: 0 30px 40px -30px rgba(28,30,34,.25)`): full-width mega menu.
- **Popover** (`box-shadow: 0 20px 40px -20px rgba(28,30,34,.3)`): account panel.
- **Quick-add lift** (`box-shadow: 0 10px 24px -14px rgba(28,30,34,.45)`): size tray over the card photo; the touch "+" button uses `0 4px 14px -6px`.
- **Floating action** (`box-shadow: 0 14px 30px -12px rgba(28,30,34,.6)`): WhatsApp button.
- **Dialog** (`box-shadow: 0 40px 90px -30px rgba(0,0,0,.45)`): welcome popup. Side cart uses `-30px 0 60px -30px rgba(28,30,34,.35)`.

### Named Rules
**The Only-What-Floats Rule.** Cards, buttons, bands and slides never carry a shadow. If it is in the document flow, it is flat.

## Shapes

Barely softened rectangles. 6px on photos, buttons, inputs, selects, collection slides, countdown cells and cart parts; 4px on small inner pieces (size buttons, badges, thumbnails, search result images); 10px on floating panels (popover, product view, size guide, welcome popup, empty state). Pills (999px) only for chips and tabs; circles for icon buttons (40 to 42px), favorite (36px) and the floating WhatsApp button (54px). Borders are 1px hairlines; the search field is an open underline (1.5px ink).

## Components

### Buttons
Rectangular, confident, no lift.
- **Shape:** gently cornered (6px), min-height 48px, 0.9rem weight 600.
- **Primary (dark):** ink fill, white text; hover pure black; press scales to 0.98. Used for every commit action, including the shared cart and product view in this store.
- **Light:** white fill, ink text, on photos (hero, dark band); hover inverts to ink.
- **Line:** 1px ink outline, transparent; hover fills ink.
- **Text link:** underlined, 1px, offset 5px, weight 600; hover rose-deep.
- **Round icon:** 40px circle, 92% white over photos or hairline outline on white.

### Chips and Tabs
- **Style:** pill, 1px hairline border, white; hover border goes ink.
- **State:** selected (aria-pressed / aria-selected) fills ink with white text. Tabs follow the ARIA tabs pattern (tablist, tab, tabpanel) and fade their cards in with a 50ms stagger.

### Product Card (signature)
- **Media:** 3:4, 6px radius, photo-tile ground, photo multiplied onto the tile (normal blend inside the drop band).
- **Hover (fine pointer):** second photo crossfades in, photo settles from 1.035 scale, and a white quick-add tray rises from the bottom with size buttons (40x34px, 4px) or a single "add" bar. Touch devices get a white "+" circle that opens the same tray and rotates to a close mark.
- **Badges:** NEW DROP badge top-left, rose-deep, 0.66rem uppercase; hidden inside the drop band. Favorite heart top-right in a 36px white circle, rose when pressed.
- **Info:** name (underline grows on hover), muted meta, price 600 tabular. Added sizes flash rose-deep.

### Inputs / Fields
- **Style:** 50px tall, 1px #cfcfcb stroke, 6px radius, white.
- **Focus:** border goes ink with a 3px ink halo at 8% opacity; the search field swaps its underline to rose-deep.
- **Error:** red border and red weight-500 hint.

### Navigation
Instrument Sans 0.93rem weight 500; hover draws a 1px underline from the left. Mega menu is a full-width white sheet with two link columns and 4:5 photo tiles. Mobile drawer slides from the left with hairline-separated rows and accordion sections, band-colored footer with the primary button.

### Slideshows
Hero and collections crossfade (0.8s / 0.6s). Active hero photo settles from 1.06 scale over 7.5s; copy rises with a short blur-in. Indicators are 2px progress bars that fill over the autoplay interval; a pause/play round button sits beside them. Collection slides have prev/next round buttons and a tabular counter.

### NEW DROP Band
Drop Night ground, white text, sticky Archivo Black title, countdown of translucent cells (6% white fill, 12% white border, 6px) with Archivo Black digits and rose-light unit labels. Focus outlines turn white here.

## Do's and Don'ts

### Do:
- **Do** keep the page white with ink text and use the ink button for every primary action, including the shared cart and product view.
- **Do** use 6px corners for photos, buttons and inputs; 4px for small inner parts; 10px only for floating panels.
- **Do** shoot or crop product photos 3:4 and give every card a second photo for the hover swap.
- **Do** set campaign and drop names in Archivo Black capitals; everything else in Instrument Sans.
- **Do** separate regions with 1px #e6e6e3 hairlines or the #f5f5f3 band, not shadows.
- **Do** keep the NEW DROP band black with inverted colors and its countdown.

### Don't:
- **Don't** use rose as a button fill or section background; it is limited to the strip, badges, and active/added/favorited/hover signals.
- **Don't** add a second dark section; the drop band is the only one.
- **Don't** put shadows on in-flow cards, buttons or bands.
- **Don't** put an uppercase label or tagline above a section headline or product title.
- **Don't** apply these tokens to the makeup store; it keeps its pink-tinted paper, Fraunces and Manrope.
