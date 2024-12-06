// backend/src/app/routes/project/index.ts
import { Router } from "express";
import { createProject, deleteProject,updateProject,getProjectById } from "../../controllers/projectController";
import {getProjectsByOrganization, getProject } from "../../controllers/projectController"

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
// Ruta para actualizar un proyecto
router.get("/proyectos", getProject);
router.get("/buscar/:code", getProjectById)
router.put("/proyectos/:code", updateProject);

//router.get("/api/projects/:id", getProjectById);
//router.put("/api/projects/:id", updateProject);

router.delete("/:procod", deleteProject)
export default router;
