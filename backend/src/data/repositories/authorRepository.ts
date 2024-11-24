// src/data/repositories/authorRepository.ts
import { AppDataSource } from "../../config/data-source";
import { Author} from "../entities/Author";

export const AuthorRepository = AppDataSource.getRepository(Author);

export const findMainAuthor = async (): Promise<Author| null> => {
    return await AuthorRepository.findOne({
        where: { autEst: "principal" }, // Asumiendo que `autEst` puede identificar la principal
    });
};

export const findAllAuthors = async (): Promise<Author[]> => {
    return await AuthorRepository.find();
};

export const searchAuthors = async (filters: any): Promise<Author[]> => {
    const queryBuilder = AuthorRepository.createQueryBuilder("aut");
    if (filters.nombre) {
        queryBuilder.andWhere("aut.autNom LIKE :nombre", { nombre: `%${filters.nombre}%` });
    } 
    return await queryBuilder.getMany();
};
/* search Author by code (autCod) */
export const searchAuthor = async (autCod: string): Promise<Author | null> => {
    return await AuthorRepository.findOne({
        where: { autCod: autCod }
    });
};

export const deleteAuthors  = async (): Promise<Author| null> => {
    return await AuthorRepository.findOne({
        where: { autCod: "id.toUpperCase()" }, // 
    });
};


