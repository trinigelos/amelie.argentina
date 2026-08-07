# Web de Amelie — instrucciones

## Qué hay en esta carpeta

```
index.html      → versión en español (página principal)
it.html         → versión en italiano
style.css       → estilos compartidos por ambas páginas
cart.js         → lógica del carrito de pedido
ingredients.js  → lógica del modal de ingredientes (botón ⓘ)
images/         → solo torta-nuez.jpg (foto genérica, ver nota abajo)
img/            → tus fotos propias de cada producto (subilas vos)
README.md       → este archivo
```

Las dos páginas comparten exactamente el mismo diseño — si en el futuro querés cambiar un color o una fuente, editás `style.css` una sola vez y se actualiza en ambos idiomas.

## 1. Subí tus fotos a la carpeta `img/`

El código ya está esperando estos nombres de archivo exactos dentro de `img/`:

| Archivo | Producto |
|---|---|
| `img/alfajormardel.jpg` | Alfajor Mardel (y también la portada/hero) |
| `img/alfajorcitosmaicena.jpeg` | Alfajor de Maicena |
| `img/alfajorbrownie.jpeg` | Alfajor Brownie |
| `img/medialunas.jpeg` | Medialunas de Manteca |
| `img/lemonpie.jpg` | Lemon Pie Signature |
| `img/lemonpetite.jpg` | Lemon Pie Petit |
| `img/lemonmignon.jpg` | Lemon Pie Bite |
| `img/marquise.jpg` | Marquise Signature |
| `img/marquisebite.jpg` | Marquise Bite |
| `img/carrotcake.jpg` | Carrot Cake |

**Nota sobre Torta de Nuez**: todavía usa la foto genérica vieja (`images/torta-nuez.jpg`, que ya viene incluida). Cuando tengas tu propia foto, subila como `img/torta-nuez.jpg`, avisame y te actualizo esa línea del código (o hacelo vos: buscá `images/torta-nuez.jpg` en `index.html` e `it.html` y cambialo por `img/torta-nuez.jpg`).

**Cómo crear la carpeta `img/` en GitHub** (si te vuelve a pasar lo mismo que con `images/`):
1. "Add file" → "Create new file".
2. En el nombre escribí `img/.gitkeep` (la barra `/` crea la carpeta sola). Confirmá el commit.
3. Entrá a la carpeta `img/` que se creó, y ahí sí "Add file" → "Upload files" con tus 10 fotos.

## 2. Antes de subir: ya están completados 2 de 3 datos

Al principio de `index.html` **y** de `it.html`:

```js
const CONFIG = {
  whatsappNumber: "393509228970",
  instagramUrl: "https://www.instagram.com/amelie.argentina.a/",
  formspreeEndpoint: "https://formspree.io/f/XXXXXXXX" // ← esto todavía falta
};
```

Tu WhatsApp e Instagram ya están cargados en los dos idiomas. Solo falta el de Formspree (siguiente punto).

## 3. Subir a GitHub Pages (gratis)

1. Andá a [github.com](https://github.com) y creá una cuenta si no tenés.
2. Creá un repositorio nuevo. Nombre sugerido: `amelie-web` (público).
3. Subí todo el contenido de esta carpeta: `index.html`, `it.html`, `style.css`, `cart.js`, `ingredients.js`, la carpeta `images/` (con torta-nuez.jpg) y la carpeta `img/` con tus 10 fotos.
4. Andá a **Settings → Pages** (menú de la izquierda) dentro del repositorio.
5. En "Source" elegí la rama `main` y la carpeta `/ (root)`. Guardá.
6. Esperá 1-2 minutos. GitHub te va a dar un link tipo:
   `https://tu-usuario.github.io/amelie-web/`

Ese es el link que ponés en la bio de Instagram. Por defecto abre en español; arriba de la página hay un botón **ES / IT** para cambiar de idioma.

## 4. Configurar el email del pedido (Formspree)

Como esta web es un sitio estático (sin servidor propio), para que el email del cliente "te quede guardado a vos" hace falta un servicio gratuito intermediario. Usamos **Formspree**, no requiere programar nada:

1. Andá a [formspree.io](https://formspree.io) y creá una cuenta gratis con tu email.
2. Creá un formulario nuevo ("New Form"), ponele un nombre como "Pedidos Amelie".
3. Formspree te va a dar un link parecido a `https://formspree.io/f/abcd1234`.
4. Pegá ese link en `index.html` **y** en `it.html`, dentro de `CONFIG`:
   ```js
   formspreeEndpoint: "https://formspree.io/f/abcd1234"
   ```
5. Listo. Cuando alguien complete el email en el carrito y envíe el pedido, vas a recibir un correo con todos los datos (nombre, fecha, modalidad, dirección, mensaje y el detalle del pedido).

Si un cliente no completa el email (es opcional), el pedido igual se manda por WhatsApp normalmente — el email es solo un extra para que vos tengas un registro.

El plan gratis de Formspree permite 50 envíos por mes, que alcanza de sobra para empezar.

## 5. Cómo editar los ingredientes de un producto

Cada botón "ⓘ" tiene el texto de ingredientes escrito directo en su código, así:

```html
<button class="info-btn" data-ing-title="Alfajor Mardel" data-ing-text="Azúcar, harina, almidón de maíz, huevos, sal, ...">i</button>
```

Para cambiarlo, buscá el producto en `index.html` (o `it.html` para la versión italiana) y editá el texto dentro de `data-ing-text="..."`. No hace falta tocar nada más.

## 6. Qué tiene la web

- **Carrito de pedido**: cada producto tiene un botón "+ Agregar". El pedido se junta en un carrito flotante (abajo a la derecha) donde se puede ajustar cantidades, ver el total, y mandarlo todo de una sola vez por WhatsApp con un mensaje ya armado. El carrito no se abre solo al agregar — solo cuando tocás el botón flotante.
- **Formulario de datos**: antes de enviar, el carrito pide nombre y fecha de retiro/entrega (obligatorios — la fecha respeta el mínimo de 2 días, o 3 si hay medialunas en el pedido), modalidad (Retiro en Reggio Emilia / Retiro en Estación de Trenes Parma / Consulto envío a domicilio), dirección/zona, mensaje especial y email — todo queda incluido en el mensaje de WhatsApp, y si completan el email también te llega una copia a tu correo (ver punto 4).
- **Ingredientes**: cada producto tiene un botón "ⓘ" que muestra sus ingredientes en una ventana emergente.
- **Medialunas primero**: aparecen como la primera categoría del catálogo, destacadas, con foto propia.
- **Sección de envíos propia**: zona de entrega (Reggio Emilia, Parma y alrededores), formas de pago (efectivo o transferencia) y tiempos mínimos (2 días tortas/alfajores, 3 días medialunas).
- **Sección de Valorugby al final**: aclara que la entrega es todos los días, y que además hay un día fijo de partido con alfajores (que conviene reservar) y medialunas a pedido.
- **Selector de idioma** arriba de la página (ES / IT), mismo diseño en ambas versiones.
- Responsive: se ve bien en celular, que es donde la va a abrir la mayoría desde el link de la bio.
