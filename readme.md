📚 Documentación Técnica – Nik Store
🧾 Descripción General
Nik Store es una tienda online creada en HTML, CSS y JavaScript puro que consume productos desde la API pública https://fakestoreapi.com/products. Ofrece funcionalidades modernas como sistema de carrito, filtros, búsqueda, ordenamiento, animación de bienvenida y experiencia de usuario responsiva.

🗂️ Estructura de Archivos
css
Copiar
Editar
nik-store/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── fondo-nikstore.jpg
│   └── (otras imágenes o íconos)
⚙️ Funcionalidades Principales
1. Pantalla de Bienvenida Cinematográfica
Logo animado con efecto de resplandor infinito (glow).

Imagen de fondo (fondo-nikstore.jpg) con estilo oscuro.

Botón "Ingresar" con animación de entrada suave.

Al hacer clic en "Ingresar", desaparece y se muestra la tienda.

2. Consumo de API (https://fakestoreapi.com/products)
Uso de fetch() y async/await para obtener los productos.

Manejo de asincronía, errores y carga de datos dinámica.

3. Renderizado Dinámico de Productos
Cada producto se muestra como una tarjeta con:

Imagen.

Título.

Precio.

Categoría.

Selector de cantidad.

Botón "Agregar al carrito".

4. Sistema de Carrito de Compras
Se puede:

Agregar productos en cantidad.

Ver el total y el número de productos.

Eliminar productos.

Ver el carrito como una barra lateral deslizable.

Persistencia con localStorage: el carrito se mantiene al recargar la página.

5. Filtros, Búsqueda y Ordenamiento
Filtro por categoría (generado automáticamente).

Ordenar por precio ascendente o descendente.

Búsqueda por nombre del producto.

6. Estilos Responsivos y Accesibles
Diseño adaptado a pantallas pequeñas y grandes.

Botones accesibles y visibles.

Colores contrastantes.

Tipografía clara y legible.

🧩 Estructura del Código
HTML (index.html)
Contiene:

<div id="welcome-screen"> con animación de entrada.

<header> con filtros y buscador.

<section id="product-list"> para renderizado de productos.

<div id="cart"> como barra lateral para el carrito.

CSS (styles.css)
Contiene:

Estilos base (body, header, etc.).

Diseño de tarjetas (.product-card).

Estilos del carrito (.cart-sidebar, animaciones @keyframes).

Estilo del logo y botón de bienvenida (glow, fadeIn, etc.).

JavaScript (main.js)
Contiene:

fetchProducts() para obtener datos de la API.

renderProducts() para mostrar tarjetas.

addToCart(), removeFromCart() y saveCart() para manejar carrito.

updateCartDisplay() para renderizar el carrito.

Eventos para filtros, búsqueda, ordenar, abrir/cerrar carrito y bienvenida.

🧠 Decisiones de Diseño
Se eligió un diseño cinematográfico para destacar la marca Nik Store con animaciones suaves y un logo llamativo.

Se implementó una interfaz clara tipo single page application, sin recargas.

Se usaron elementos simples y nativos (no frameworks) para garantizar compatibilidad y comprensión.

Se priorizó la experiencia móvil con grid adaptable y botones accesibles.

🔐 Almacenamiento y Datos
Estructura del carrito (en localStorage):
js
Copiar
Editar
[
  { id: "1", qty: 2 },
  { id: "5", qty: 1 }
]
Los productos se obtienen de la API y no se almacenan localmente.
✅ Mejoras Futuras (Opcionales)
Agregar pasarela de pago ficticia.

Implementar paginación de productos.

Añadir sección de usuario/login.

Crear versión con React o Vue para comparación.

🧪 Requisitos para correr el proyecto
Tener una estructura de carpetas correcta.

Tener habilitado JS en el navegador.

No requiere servidor backend, todo es frontend.

🧑‍💻 Autor
Nicolás Riaño
Full Stack Developer – HTML, CSS, JS, Python
🚀 Proyecto Nik Store

