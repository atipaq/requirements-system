// src/app/controllers/organizationController.ts
import { Request, Response } from "express";
import { findMainOrganization, findAllOrganizations, searchOrganizations } from "../../data/repositories/organizationRepository";
import { OrganizationRepository } from "../../data/repositories/organizationRepository";

export const getMainOrganization = async (req: Request, res: Response) => {
    try {
        const mainOrg = await OrganizationRepository.findOne({
            where: { orgest: "principal" }, // Ajusta según la lógica de tu base de datos
        });
        if (!mainOrg) {
            return res.status(404).json({ error: "No se encontró la organización principal" });
        }
        res.json(mainOrg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la organización principal" });
    }
};

export const getOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await findAllOrganizations();
        res.json(organizations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las organizaciones" });
    }
};

export const searchOrganizationsHandler = async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const organizations = await searchOrganizations(filters);
        res.json(organizations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al buscar organizaciones" });
    }
};

export const registerOrganization = async (req: Request, res: Response) => {
    try {
        // Obtener el último código de organización y calcular el siguiente
        const lastOrganization = await OrganizationRepository.find({
            order: { orgcod: "DESC" },
            take: 1,
        });

        const nextCode = lastOrganization.length
            ? `ORG-${(parseInt(lastOrganization[0].orgcod.split("-")[1]) + 1)
                  .toString()
                  .padStart(3, "0")}`
            : "ORG-001";

        // Crear un nuevo registro con valores automáticos y datos recibidos
        const newOrganization = OrganizationRepository.create({
            orgcod: nextCode,
            orgver: req.body.orgver || 0.01, // Versión inicial
            orgfeccrea: new Date(), // Fecha de creación actual
            orgfecmod: new Date(), // Fecha de modificación actual
            orgtiporgcod: "Contratante", // Tipo de organización predeterminado
            orgautcod: req.body.orgautcod || "AUT-00.00", // Autor predeterminado
            orgartcod: req.body.orgartcod || "ART-000",
            orgusuid: req.body.orgusuid || "ART-000",
            ...req.body, // Otros datos enviados desde el frontend
        });

        // Guardar en la base de datos
        await OrganizationRepository.save(newOrganization);

        res.status(201).json(newOrganization);
    } catch (error) {
        console.error("Error al registrar la organización:", error);
        res.status(500).json({ message: "Error al registrar la organización" });
    }
};

// Obtener el último código de organización
export const getLastOrganizationCode = async (req: Request, res: Response) => {
    try {
        const lastOrganization = await OrganizationRepository.find({
            order: { orgcod: "DESC" },
            take: 1,
        });

        const nextCode = lastOrganization.length
            ? `ORG-${(parseInt(lastOrganization[0].orgcod.split("-")[1]) + 1)
                  .toString()
                  .padStart(3, "0")}`
            : "ORG-001";

        res.status(200).json({ nextCode });
    } catch (error) {
        console.error("Error al obtener el último código de organización:", error);
        res.status(500).json({ message: "Error al obtener el último código de organización" });
    }
};
