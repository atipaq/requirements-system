// src/app/routes/Author/index.ts
import { Router } from "express";
import { getMainOrganization, getOrganizations, searchOrganizationsHandler,deleteOrganization,getOrganizationById,updateOrganization } from "../../controllers/organizationController";
import { registerOrganization } from "../../controllers/organizationController";

const router = Router();

router.get("/principal", getMainOrganization);
router.get("/", getOrganizations);
router.get("/search", searchOrganizationsHandler);
router.post("/", registerOrganization);
router.delete("/:orgcod", deleteOrganization)
router.get("/buscar/:orgcod", getOrganizationById)
router.put("/:orgcod", updateOrganization);

export default router;