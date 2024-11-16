import express from 'express';
import bcrypt from "bcryptjs";
import { User } from "./data/entities/User";
import dotenv from 'dotenv';
import { AppDataSource } from "./config/data-source";
import cors from 'cors';
import authRouter from './app/routes/auth'; // Importamos el archivo de rutas para autenticación

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Express
const app = express();

// Configurar middleware
app.use(cors());  // Permite solicitudes desde diferentes dominios
app.use(express.json());  // Middleware para parsear el cuerpo de la solicitud como JSON

// Variables de configuración
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';  // Se usa una clave secreta para JWT, si no está definida, se usa un valor por defecto
const PORT = process.env.PORT || 3001;  // El puerto en el que se ejecutará el servidor, con un valor por defecto

// Inicializar la base de datos y configurar el servidor
AppDataSource.initialize()
  .then(async () => {
      console.log("Database connected!");  // Confirmamos que la base de datos está conectada

      // Obtener el repositorio de usuarios de la base de datos
      const userRepository = AppDataSource.getRepository(User);

      // Verificar si el usuario "admin" ya existe
      const existingUser = await userRepository.findOneBy({ username: "admin" });

      // Si no existe el usuario "admin", crearlo
      if (!existingUser) {
          // Encriptar la contraseña usando bcrypt
          const hashedPassword = await bcrypt.hash("admin", 10);

          // Crear un nuevo usuario con los datos predeterminados
          const defaultUser = userRepository.create({
              username: "admin",
              password: hashedPassword,
              firstName: "Requirement System",
              lastName: "ReqWizard",
              isActive: true,
          });

          // Guardar el usuario en la base de datos
          await userRepository.save(defaultUser);
          console.log("Default user created: admin / admin");  // Confirmar que el usuario se creó exitosamente
      }

      // Registrar las rutas de autenticación bajo el prefijo "/api/auth"
      app.use("/api/auth", authRouter);

      // Iniciar el servidor en el puerto configurado
      app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
      });
  })
  .catch((error) => {
      // En caso de error durante la inicialización de la base de datos, mostrar el error en consola
      console.error("Database initialization failed:", error);
  });