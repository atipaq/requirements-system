// src/app/controllers/organizationController.ts
import { Request, Response } from "express";
import { findMainOrganization, findAllOrganizations, searchOrganizations} from "../../data/repositories/organizationRepository";
import { OrganizationRepository } from "../../data/repositories/organizationRepository";
import { UpdateResult } from "typeorm";

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

export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        const { orgcod } = req.params;

        const project = await OrganizationRepository.findOne({ where: { orgcod: orgcod } });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        await OrganizationRepository.remove(project);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Failed to delete project" });
    }
};

export const getOrganizationById = async (req: Request, res: Response) => {
    const { orgcod } = req.params;  // Obtiene el código de organización de la URL
    try {
        // Aquí debes obtener los datos de la organización desde tu base de datos
        const organization = await OrganizationRepository.findOne({ where: { orgcod } });
        if (organization) {
            res.json(organization);  // Devuelve los datos de la organización
        } else {
            res.status(404).json({ message: "Organización no encontrada" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los datos de la organización", error: err });
    }
};

export const updateOrganization = async (req: Request, res: Response) => {
    const { orgcod } = req.params;  // Obtiene el código de organización de la URL
    const updateData = req.body;  // Obtiene los datos de la organización a actualizar del cuerpo de la solicitud

    try {
        // Actualiza los datos de la organización en la base de datos
        const result: UpdateResult = await OrganizationRepository.update({ orgcod }, updateData);

        // Si se ha actualizado al menos una fila
        if (result.affected && result.affected > 0) {
            const updatedOrganization = await OrganizationRepository.findOne({ where: { orgcod } });
            res.status(200).json(updatedOrganization);
        } else {
            res.status(404).json({ message: "Organización no encontrada" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar los datos de la organización", error: err });
    }
};