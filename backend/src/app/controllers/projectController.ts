// backend/src/app/controllers/projectController.ts
import { Request, Response } from "express";
import { findAllProject, projectRepository } from "../../data/repositories/projectRepository";
import { AppDataSource } from "../../config/data-source";
import { Organization } from "../../data/entities/Organization";
//import { Project } from "../../data/entities/Project";
import { UpdateResult } from "typeorm";

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


export const getProject = async (req: Request, res: Response) => {
    try {
        const project = await findAllProject();
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los proyectos" });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    const { code } = req.params;  // Obtiene el código de organización de la URL
    try {
        // Aquí debes obtener los datos de la organización desde tu base de datos
        const project = await projectRepository.findOne({ where: { code } });
        if (project) {
            res.json(project);  // Devuelve los datos de la organización
        } else {
            res.status(404).json({ message: "Organización no encontrada" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los datos de la organización", error: err });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    const { code } = req.params;
    const updateData = req.body;

    try {
        // Verifica si el proyecto existe
        const existingProject = await projectRepository.findOne({ where: { code } });
        if (!existingProject) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }

        // Actualiza el proyecto
        const result: UpdateResult = await projectRepository.update(
            { code },
            { ...updateData, modificationDate: new Date() } // Actualiza la fecha de modificación
        );

        // Devuelve el proyecto actualizado
        const updatedProject = await projectRepository.findOne({ where: { code } });
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el proyecto", error: err });
    }
};

/*
// Controlador para actualizar un proyecto
export const updateProject = async (req: Request, res: Response) => {
    const { code } = req.params;
    const { name, status, comments} = req.body;

    try {
        const projectRepository = AppDataSource.getRepository(Project);
        const project = await projectRepository.findOneBy({ code: code });

        if (!project) {
            console.error(`Proyecto con ID ${code} no encontrado.`);
            return res.status(404).json({ message: `Proyecto con ID ${code} no encontrado` });
        }

        // Actualizar campos
        project.name = name || project.name;
        project.status = status || project.status;
        project.comments = comments || project.comments;
        project.modificationDate = new Date();

        // Guardar cambios
        await projectRepository.save(project);

        res.status(200).json({ message: "Proyecto actualizado correctamente", project });
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    const { code} = req.params;

    try {
        const projectRepository = AppDataSource.getRepository(Project);
        const project = await projectRepository.findOneBy({ code: code });

        if (!project) {
            console.error(`Proyecto con ID ${code} no encontrado.`);
            return res.status(404).json({ message: `Proyecto con ID ${code} no encontrado.` });
        }

        console.log("Proyecto encontrado:", project); // Log de depuración
        res.status(200).json(project);
    } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};*/

