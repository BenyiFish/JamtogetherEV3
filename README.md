Benjamin Inostroza Blamey

# JamTogether

JamTogether es una pagina construida con React y Vite que facilita la búsqueda y visualización de artistas y bandas. Es una interfaz orientada a mostrar artistas destacados. 
**Características principales**
- **Buscar artistas y bandas:** páginas dedicadas para localizar artistas y bandas con listados y tarjetas destacadas.
- **Autenticación básica:** páginas de `Login` y `Registro` (simulación de flujo de autenticación en frontend).
- **Páginas administradas:** una vista `Admin` para funciones administrativas (interfaz, no necesariamente backend).
- **Componentes reutilizables:** `Navbar`, `Footer`, `SideBarBuscarArtistas`, `SidebarBuscarBandas`, etc.

**Tecnologías**
- **Framework:** React (v19)
- **Bundler/Dev:** Vite
- **Routing:** React Router
- **HTTP:** Axios (para llamadas a APIs si se integra un backend)
- **Testing:** Vitest y Testing Library





**Estructura del proyecto (resumen relevante)**
- `src/pages/` : páginas principales (`Home`, `BuscarArtistas`, `BuscarBandas`, `Login`, `Registro`, `Admin`).
- `src/components/` : componentes reutilizables (`Navbar`, `Footer`, tarjetas destacadas, sidebars).
- `src/assets/` : imágenes y recursos estáticos.
- `src/styles/` : hojas de estilo CSS por componente/página.
- `tests/` : tests unitarios y de componentes (Vitest + Testing Library).

**Cómo funciona (flujo básico)**
- Al abrir la app, `Home` muestra contenido destacado (artistas/bandas).
- Desde `BuscarArtistas` o `BuscarBandas` el usuario puede explorar listados — los datos se consumen desde `src/data/data.js` o desde una API externa si se integra.
- Los formularios de `Login` y `Registro` permiten capturar credenciales; actualmente la lógica puede ser manejada en frontend y debería conectarse a un backend real para autenticación persistente.

**Notas para desarrolladores**
- Las rutas y la protección de rutas se encuentran en `src/components/ProteccionRuta.jsx`.
- Para integrar un backend, configure llamadas con `axios` desde los componentes o un servicio centralizado.
- Mantener estilos en `src/styles/` y componentes separados facilita el mantenimiento.

