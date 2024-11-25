// backend/src/app/controllers/projectController.ts
import { Request, Response } from "express";
import { projectRepository } from "../../data/repositories/projectRepository";
import { AppDataSource } from "../../config/data-source";
import { Organization } from "../../data/entities/Organization";

export const createProject = async (req: Request, res: Response) => {
    try {
        console.log("Solicitud recibida:", req.body); // Log de la solicitud

        const { name, status, comments = "", organizationId } = req.body;

        /*const validStatues = ["Sin comenzar", "En progreso", "Concluido"];
        if(!validStatues.includes(status)){
            return res.status(400).json({ error: "Invalid status" });
        }  */ 
        
        // Buscar la organización relacionada
        const organizationRepository = AppDataSource.getRepository(Organization);
        const organization = await organizationRepository.findOneBy({ 
            orgcod: organizationId as string 
        });
        
        if (!organization) {
            console.log("Organización no encontrada");
            return res.status(404).json({ error: "Organization not found" });
        }

        console.log("Organización encontrada:", organization);

        // Crear el proyecto
        const project = projectRepository.create({
            name,
            status,
            comments,
            organization,
        });

        await projectRepository.save(project);
        console.log("Proyecto creado:", project);

        res.status(201).json(project);
    } catch (error) {
        console.error("Error creando proyecto:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
};

export const getProjectsByOrganization = async (req: Request, res: Response) => {
    try {
        const { orgcod } = req.query;

        if (!orgcod || typeof orgcod !== "string") {
            return res.status(400).json({ error: "Organization code is required and must be a string" });
        }

        // Busca proyectos relacionados con la organización especificada
        const projects = await projectRepository.find({
            where: { organization: { orgcod } },
            relations: ["organization"],
        });

        // Si no hay proyectos, responde con un 404
        if (!projects.length) {
            return res.status(404).json({ error: "No projects found for this organization" });
        }

        // Si hay proyectos, responde con ellos
        return res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({ error: "Error fetching projects" });
    }
};



export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { procod } = req.params;

        const project = await projectRepository.findOne({ where: { code: procod } });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        await projectRepository.remove(project);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Failed to delete project" });
    }
};
