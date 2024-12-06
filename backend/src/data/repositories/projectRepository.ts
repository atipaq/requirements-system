import { AppDataSource } from "../../config/data-source";
import { Project } from "../entities/Project";

export const projectRepository = AppDataSource.getRepository(Project);

export const findMainProject= async (): Promise<Project | null> => {
    return await projectRepository.findOne({
        where: { status: "principal" }, // Asumiendo que `orgest` puede identificar la principal
    });
};

export const findAllProject = async (): Promise<Project[]> => {
    return await projectRepository.find();
};