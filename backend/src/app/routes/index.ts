// backend/src/app/routes/index.ts
// Archivo para consolidar todas las rutas
import { Router } from 'express';
import authRouter from './auth';
import organizationRoutes from './organization';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getLastOrganizationCode } from "../controllers/organizationController";

const router = Router();

router.use('/auth', authRouter);
router.use('/organizations', organizationRoutes);
router.get("/organizations/last", getLastOrganizationCode);

export default router;
