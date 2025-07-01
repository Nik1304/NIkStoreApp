# 🛍️ Nik Store

## 📚 Documentación Técnica

### 🧾 Descripción General
**Nik Store** es una tienda online desarrollada en **HTML**, **CSS** y **JavaScript puro**, que consume productos desde la API pública [https://fakestoreapi.com/products](https://fakestoreapi.com/products).  
Ofrece funcionalidades modernas como:

- Sistema de carrito dinámico.
- Filtros y ordenamiento.
- Búsqueda interactiva.
- Pantalla de bienvenida con animación cinematográfica.
- Experiencia responsiva y amigable.

---

### 🗂️ Estructura de Archivos

``` 
nik-store/
│
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── main.js
├── assets/
│ ├── fondo-nikstore.jpg
│ └── (otras imágenes o íconos)
└── README.md
```


---

### ⚙️ Funcionalidades Principales

#### 1. 🖼️ Pantalla de Bienvenida Cinematográfica
- Logo animado con efecto `glow` infinito.
- Imagen de fondo (`fondo-nikstore.jpg`) con estilo visual impactante.
- Botón “Ingresar” con animación de entrada suave.
- Transición a la tienda al hacer clic.

#### 2. 🔄 Consumo de API
- Uso de `fetch()` con `async/await`.
- Datos extraídos desde: [https://fakestoreapi.com/products](https://fakestoreapi.com/products).
- Manejo de asincronía y carga dinámica.

#### 3. 🧱 Renderizado de Productos
Cada producto se representa con:
- Imagen.
- Título.
- Precio.
- Categoría.
- Selector de cantidad.
- Botón **Agregar al carrito**.

#### 4. 🛒 Sistema de Carrito de Compras
- Agregar productos por unidad o en cantidad.
- Ver cantidad total y monto acumulado.
- Eliminar productos del carrito.
- Carrito como barra lateral animada.
- Persistencia con `localStorage`.

#### 5. 🎯 Filtros, Búsqueda y Ordenamiento
- Filtro por categoría (generado automáticamente desde la API).
- Ordenamiento por precio ascendente/descendente.
- Búsqueda por nombre (en tiempo real).

#### 6. 💻 Estilos Responsivos y Accesibles
- Layout adaptable a pantallas móviles y escritorio.
- Botones grandes y visibles.
- Colores de alto contraste.
- Tipografía clara y moderna.

---

### 🧩 Estructura del Código

#### 📄 HTML (`index.html`)
- `#welcome-screen`: pantalla de entrada animada.
- `<header>`: filtros, buscador y acceso al carrito.
- `#product-list`: contenedor
