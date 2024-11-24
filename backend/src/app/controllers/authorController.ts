// src/app/controllers/authorController.ts
import { Request, Response } from "express";
import { findAllAuthors,searchAuthors, AuthorRepository, searchAuthor
} from "../../data/repositories/authorRepository";
import { error } from "console";

//############ Obtener la Lista de Autores #########
export const getAuthors = async (req: Request, res: Response) => {
    try {
        const organizations = await findAllAuthors();
        res.json(organizations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los autores" });
    }
};

//#############  Buscar un autor por su *nombre* ######
export const searchAuthorsHandler = async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const organizations = await searchAuthors(filters);
        res.json(organizations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al buscar los autores" });
    }
};

// ###########   search authon py AutCod ##########
export const searchAuthorByCode = async (req: Request, res: Response) => {
    try {
        const { autCod } = req.query;
        if (!autCod) {
            return res.status(400).json({ error: "El código de autor es requerido" });
        }

        const author = await searchAuthor(String(autCod));

        if (!author) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        res.json(author);
    } catch (error) {
        console.error("Error al buscar al autor por código:", error);
        res.status(500).json({ error: "Error al buscar al autor por código" });
    }
};


//############ Registrar autor ###########
export const registerAuthor = async (req: Request, res: Response) => {
    try {
        // Obtener el último código del Autor y calcular el siguiente
        const lastAuthor = await AuthorRepository.find({
            order: { autCod: "DESC" },
            take: 1,
        });

        const nextCode = lastAuthor.length
            ? `AUT-${(parseInt(lastAuthor[0].autCod.split("-")[1]) + 1)
                .toString()
                .padStart(3, "0")}`
            : "AUT-001";

        // Crear un nuevo registro con valores automáticos y datos recibidos
        const newAuthor = AuthorRepository.create({
            autCod: nextCode,
            autVer: req.body.autVer || 0.01, // Versión inicial
            autFecCrea: new Date(), // Fecha de creación actual
            autFecMod: new Date(), // Fecha de modificación actual
            autCodOrg: req.body.orgautcod || "AUT-00.00",// Autor predeterminado_cambiable
            autPan: req.body.orgautcod || "AUT-00.00", // Autor predeterminado_cambiable

            ...req.body, // Otros datos enviados desde el frontend
        });

        // Guardar en la base de datos
        await AuthorRepository.save(newAuthor);
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error("Error al registrar al autor:", error);
        res.status(500).json({ message: "Error al registrar al autor" });
    }
};

// ############ Asignacion de codigo unico (AUT-00X) al autor ###########
// Obtener el último código de autor
export const getLastAuthorCode = async (req: Request, res: Response) => {
    try {
        const lastOrganization = await AuthorRepository.find({
            order: { autCod: "DESC" },
            take: 1,
        });

        const nextCode = lastOrganization.length
            ? `AUT-${(parseInt(lastOrganization[0].autCod.split("-")[1]) + 1)
                .toString()
                .padStart(3, "0")}`
            : "AUT-001";

        res.status(200).json({ nextCode });
    } catch (error) {
        console.error("Error al obtener el último código del autor:", error);
        res.status(500).json({ message: "Error al obtener el último código del autor" });
    }
};
//Eliminar Autor
export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ID del autor a eliminar
        console.error("El ID es :", id);
        const aut = await AuthorRepository.findOne({ where: { autCod: id } });
        if (!aut) {
            return res.status(404).json({ error: "Autor no encontrado" });
        }

        // Eliminar directamente usando delete
        await AuthorRepository.delete(id);
        res.json({ message: "Autor eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar al autor:", error);
        res.status(500).json({ error: "Error al eliminar al autor" });
    }
};