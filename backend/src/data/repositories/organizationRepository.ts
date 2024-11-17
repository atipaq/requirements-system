// src/data/repositories/organizationRepository.ts
import { AppDataSource } from "../../config/data-source";
import { Organization } from "../entities/Organization";

export const OrganizationRepository = AppDataSource.getRepository(Organization);

export const findMainOrganization = async (): Promise<Organization | null> => {
    return await OrganizationRepository.findOne({
        where: { orgest: "principal" }, // Asumiendo que `orgest` puede identificar la principal
    });
};

export const findAllOrganizations = async (): Promise<Organization[]> => {
    return await OrganizationRepository.find();
};

export const searchOrganizations = async (filters: any): Promise<Organization[]> => {
    const queryBuilder = OrganizationRepository.createQueryBuilder("org");
    if (filters.nombre) {
        queryBuilder.andWhere("org.orgnom LIKE :nombre", { nombre: `%${filters.nombre}%` });
    }
    if (filters.year) {
        queryBuilder.andWhere("YEAR(org.orgfeccrea) = :year", { year: filters.year });
    }
    if (filters.month) {
        queryBuilder.andWhere("MONTH(org.orgfeccrea) = :month", { month: filters.month });
    }
    return await queryBuilder.getMany();
};
