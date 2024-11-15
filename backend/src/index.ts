// src/index.ts
// Express
import express from 'express';
// Environment Variables
import dotenv from 'dotenv';
import { AppDataSource } from "./config/data-source";
import cors from 'cors';
import routes from './app/routes';
import authRouter from './app/routes/auth';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

// Rutas base

const PORT = process.env.PORT || 3001;

// Inicializar la base de datos y el servidor
// Inicializar la base de datos
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected!");

    app.use("/api/auth", authRouter); // Registrar rutas de autenticación

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
  });