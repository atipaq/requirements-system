// backend/src/app/routes/index.ts
// Archivo para consolidar todas las rutas
import { Router } from 'express';
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);

export default router;
