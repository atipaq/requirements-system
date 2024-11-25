import { AppDataSource } from "../../config/data-source";
import { ActaAceptacion } from "../entities/ActaAceptacion";

// Obtención del repositorio para la entidad 'ActaAceptacion'
export const actaAceptacionRepository = AppDataSource.getRepository(ActaAceptacion);
