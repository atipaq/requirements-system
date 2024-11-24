// backend/src/app/routes/index.ts
// Archivo para consolidar todas las rutas
import { Router } from 'express';
import authRouter from './auth';
import authorRouters from './author';
import organizationRoutes from './organization';
import { getLastOrganizationCode } from "../controllers/organizationController";
import { getLastAuthorCode } from '../controllers/authorController';
import projectRoutes from './project';
import actaRouter from './actaaceptacion';

const router = Router();

router.use('/auth', authRouter);
router.use('/organizations', organizationRoutes);
router.get("/organizations/last", getLastOrganizationCode);
router.use('/projects', projectRoutes);

//Authors
router.use('/authors', authorRouters);
router.get("/authors/last", getLastAuthorCode );

// Actas
router.use('/actas', actaRouter);

export default router;
