// src/app/routes/organization/index.ts
import { Router } from "express";
import { getMainOrganization, getOrganizations, searchOrganizationsHandler } from "../../controllers/organizationController";
import { registerOrganization } from "../../controllers/organizationController";

const router = Router();

router.get("/principal", getMainOrganization);
router.get("/", getOrganizations);
router.get("/search", searchOrganizationsHandler);
router.post("/", registerOrganization);

export default router;
