# Prueba Técnica para FullStack Developer Nectia Software

### Pasos para levantar el proyecto

1. Clona el repositorio: `git clone https://github.com/carloshcova/nectia.git`

2. Ingresa a la carpeta: `cd nectia`

3. Instala todas las dependencias: `npm install`

4. Corre el monorepo desde el entorno de desarrollo: `npm run dev`
- se levanta el cliente (nectia-app-client): `Local: http://localhost:5173/`
- se levanta el servidor (nectia-app-services): `Server on port 3000`
- se conecta a la base de datos: `>>> DB is connected`

5. Ingresa a: `http://localhost:5173` y disfruta del producto :)

### Descripción

El proyecto está construido en un monorepo que contiene dos aplicaciones
- frontend (nectia-app-client): desarrollado en React.js
- backend (nectia-app-services): desarrollado en Node (express) y MongoDB para simular la base de datos
- Tiene una interfaz Login/Register que consume el servicio de autenticación de usuario usando JWT
- Tiene una interfaz Cars que consume el servicio CRUD de automóviles y lo renderiza en una tabla con funciones interactivas