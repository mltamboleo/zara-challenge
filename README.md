## Descripción

Proyecto [Next.js](https://nextjs.org/) creado a través de [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Aplicación React en TypeScript que muestra un listado inicial filtrable por texto con 50 personajes de Marvel y que permiten el acceso a su página de detalle con más información relevante (en caso de estar disponible).

Desde el listado o desde el detalle se puede asignar cada personaje a "Favoritos".

Para los estilos CSS se ha seguido la metodología BEM (http://getbem.com/).

## Instalación

1) Clonar repositorio en carpeta (marvel)
```bash
git clone git@github.com:mltamboleo/zara-challenge.git marvel
```

2) Desde la carpeta 'marvel' ejecutar el comando de instalación 
```bash
npm i
```

## Compilación

Desarrollo:

```bash
npm run dev
```

Producción:

```bash
npm run build
```

y luego

```bash
npm run start
```
## Ejecución

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Lint

```bash
npm run lint
```

## Tests

```bash
npm run tests
```

## Estructura

CARPETAS

```bash
public/
```
Contiene las imágenes utilizadas en el proyecto.

```bash
src/__tests__/
```
Aquí encontramos la implementación de tests JEST de ejemplo para todos los integrantes actuales del proyecto (componentes y páginas).

```bash
src/app/
```
Contiene las carpetas 'components', 'styles' y 'types', además de los siguientes archivos:

```bash
Context.tsx
```
Almacena las variables de estado comunes en la aplicación para gestionar los favoritos.

```bash
main.scss
```
Contiene las variables SAAS y CSS en las que se basa el design system de la aplicación a partir del Figma proporcionado.
Además define algunos estilos y animaciones comunes para toda la web.

```bash
src/app/components/
```
Aquí se encuentran los elementos visuales comunes a las dos secciones que forman el proyecto, cada uno en su carpeta correspondiente:

- Header: La cabecera que contiene el logo de Marvel y el acceso a Favoritos.
- FavButton: El botón en forma de corazón, utilizado en la vista inicial con el listado y en la página de detalle del personaje.

```bash
src/app/styles/
```
Los estilos de las páginas principales del proyecto (Home y Detalle del personaje).

```bash
src/app/types/
```
Tipos de las siguientes entidades del proyecto:

- Contexto.
- Datos necesarios del personaje obtenidos desde la API.
- Datos necesarios de los comics obtenidos desde la API.
- Propiedades del componente 'FavButton'.

```bash
src/app/domain/
```
Aquí encontramos las clases que definen los modelos (Personaje y Comics) con los que trabajaremos desde las páginas para mostrar la información requerida.

```bash
src/app/pages/
```
Contiene las carpetas 'api' y 'details', además de los siguientes archivos:

```bash
_app.tsx
```
Archivo principal de la aplicación que aplica la estructura y estilos generales del proyecto e inicializa el 'Context' de favoritos.

```bash
_document.tsx
```
Archivo que establece la estructura HTML del documento que contiene la aplicación, utilizado para añadir la fuente 'Roboto' tal como se establece en el Figma.

```bash
index.tsx
```
Página inicial que contiene el listado de 50 personajes obtenido desde la API.
Desde aquí se puede filtrar por texto o bien por si son o no favoritos.

```bash
src/app/pages/api/
```
Desde aquí se hacen las llamadas a la API de Marvel para obtener la información requerida en las vistas (Personajes y Comics relacionados).
Esta carpeta 'api' y sus archivos son accesibles por ruta desde los componentes y páginas (ejemplo):

api/getCharacters?limit=${limit}

```bash
src/app/pages/details/
```
Página de detalle del personaje que muestra su ficha y los primeros 20 comics donde aparece, ordenados por API a través del campo 'onSaleDate'.

```bash
.env
```
Archivo en la raíz del proyecto que almacena las claves para leer la API de Marvel.

## Observaciones
1) Únicamente existen dos vistas para el proyecto:

- Listado de personajes.
- Detalle.

En base a las instrucciones dadas para crear el proyecto, se ha considerado a 'Favoritos' como un filtro de la vista 'Listado de personajes', de manera que las búsquedas por texto establecidas en ese momento determinarán también su contenido. Estos favoritos asignados solamente persistirán entre las vistas, pero no serán permanentes, de manera que al refrescar la página se reinciará su valor a 0.

2) La búsqueda por texto se ha implementado por código, ya que la API sólo permite buscar personajes cuyo nombre empiece por cierto texto, pero no que lo contentga.

3) Al entrar en la vista de detalle desde el listado, se adjunta en la URL el correspondiente parámetro con la ID del personaje para filtrarlo por API.
Esta página de detalle es accesible directamente siempre que se adjunte una ID válida como parámetro (ejemplo):

http://localhost:3000/details/1010370

En caso de no hacerlo, se nos redirigirá automáticamente a la página inicial.

http://localhost:3000/details/123456

4) La ordenación cronológica de los comics se hace a través de la API con el parámetro 'orderBy=onsaleDate'.

5) Se han establecido fondos de color neutro y skeletons animados para las imágenes en caso de que tarden en cargar. También se ha utilizado el componente <Image> de Next JS para gestionar automáticamente la carga "lazy" de las imágenes.

6) El efecto 'hover' con el rellenado en rojo y el cambio de color del icono de favoritos en las miniaturas del listado principal se aplican solamente para la versión Desktop (a partir de 1500px de anchura).
