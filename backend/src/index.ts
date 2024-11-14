// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas base
app.use('/api', routes);

const PORT = process.env.PORT || 3001;

// Inicializar la base de datos y el servidor
createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });