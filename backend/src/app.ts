// backend/app.ts
import express from 'express';
import cors from 'cors';
import authRouter from './app/routes/auth/index'
import dotenv from 'dotenv';
import routes from "./app/routes";

// Configurar variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());

// Registrar rutas
app.use('/api/auth', authRouter);
app.use("/api", routes); // Registrar las rutas principales bajo /api

// Exportar la instancia de la aplicación
export default app;
