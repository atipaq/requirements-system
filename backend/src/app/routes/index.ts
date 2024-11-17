// backend/src/app/routes/index.ts
// Archivo para consolidar todas las rutas
import { Router } from 'express';
import authRouter from './auth';
import organizationRoutes from './organization';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/organizations', organizationRoutes);

export default router;
