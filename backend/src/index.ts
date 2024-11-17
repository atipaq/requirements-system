// backend/src/index.ts
import app from './app';
import { AppDataSource } from './config/data-source';
import { createDefaultUser } from './utils/defaultUser';
import { createDefaultOrganization } from "./utils/defaultOrganization";

const PORT = process.env.PORT || 5000;

// Inicializar la base de datos y arrancar el servidor
AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected!');

    // Crear el usuario "admin" predeterminado si no existe
    await createDefaultUser();

    // Crear organización principal predeterminada
    await createDefaultOrganization();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
  });