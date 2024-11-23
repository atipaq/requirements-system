// backend/src/app/routes/index.ts
// Archivo para consolidar todas las rutas
import { Router } from 'express';
import authRouter from './auth';
import authorRouters from './author';
import organizationRoutes from './organization';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getLastOrganizationCode } from "../controllers/organizationController";
import { getLastAuthorCode } from '../controllers/authorController';

const router = Router();

router.use('/auth', authRouter);
router.use('/organizations', organizationRoutes);
router.get("/organizations/last", getLastOrganizationCode);

//Authors
router.use('/authors', authorRouters);
router.get("/authors/last", getLastAuthorCode );

export default router;
