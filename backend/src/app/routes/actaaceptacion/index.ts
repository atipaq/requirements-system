import { Router } from "express";
import { createActa } from "../../controllers/actaaceptacionController";

const router = Router();

// Ruta para crear una nueva acta
router.post("/", createActa);

// Exportar las rutas para usarlas en la aplicación principal
export default router;