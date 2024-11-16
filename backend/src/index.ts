// backend/src/index.ts
import app from './app';
import { AppDataSource } from './config/data-source';
import { createDefaultUser } from './utils/defaultUser';

const PORT = process.env.PORT || 3001;

// Inicializar la base de datos y arrancar el servidor
AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected!');

    // Crear el usuario "admin" predeterminado si no existe
    await createDefaultUser();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
  });