# Requirements System

## Instrucciones para configurar y ejecutar el proyecto

### 1. Clonar el repositorio

```
git clone https://github.com/tu-usuario/requirements-system.git
```

```
cd requirements-system
```

### 2. Configuración del backend

```
cd backend
```

```
npm install
```

```
npm start
```

> El backend estará corriendo en http://localhost:3001 (o el puerto configurado en el archivo .env).

### 3. Configuración del backend

```
cd ../frontend
```

```
npm install
```

```
npm start
```

> El frontend estará corriendo en http://localhost:3000 (o el puerto configurado en el archivo .env).

### 4. Variables de entorno

Ambas carpetas (backend y frontend) utilizan archivos .env para la configuración de variables sensibles.

Backend .env:
Crea un archivo .env en la carpeta backend con el siguiente contenido:

```
PORT=3001
JWT_SECRET=my_super_secret_key
NODE_ENV=development
```

Frontend .env:
Crea un archivo .env en la carpeta frontend con el siguiente contenido:

```
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Estructura del Proyecto

- `src/`: Contiene el código fuente.
  - `src/data/`: Almacena entidades, migraciones y repositorios de la base de datos.
- `storage/`: Contiene el archivo de base de datos SQLite (`database.sqlite`).

### Notas para el equipo:

- La carpeta `storage/` es usada únicamente para almacenar la base de datos generada. No confundir con `src/data/`, que contiene el código fuente relacionado con la base de datos.
- La base de datos nunca debe subirse al repositorio. Está ignorada en `.gitignore`.
