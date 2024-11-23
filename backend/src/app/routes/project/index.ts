// backend/src/app/routes/project/index.ts
import { Router } from "express";
import { createProject } from "../../controllers/projectController";
import {getProjectsByOrganization} from "../../controllers/projectController"

const router = Router();

router.post("/", createProject);
router.get("/", getProjectsByOrganization); // Actualización lógica para más flexibilidad
router.get("/initial", (req, res) => {
    const initialData = {
        code: `PROJ-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
    };
    res.status(200).json(initialData);
});


export default router;
