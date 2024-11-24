// src/app/controllers/authorController.ts
import { Request, Response } from "express";
import { findAllAuthors,searchAuthors, AuthorRepository, searchAuthor
} from "../../data/repositories/authorRepository";
import { error } from "console";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

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
// Exportar a Excel
export const exportAuthorsToExcel = async (req: Request, res: Response) => {
    try{
        const authors = await findAllAuthors();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Authors");

        worksheet.columns = [
            {header: 'Codigo', key: 'autCod', width: 15},
            {header: 'Nombre', key: 'autNom', width: 30},
            {header: 'Fecha', key: 'autFecMod', width: 20},
            {header: 'Version', key: 'autVer', width: 10},
            {header: 'Rol', key: 'autRol', width: 15},
        ];
        //Agregar los datos de los autores
        authors.forEach(author => {
            worksheet.addRow({
                autCod: author.autCod,
                autNom: author.autNom,
                autFecMod: author.autFecMod,
                autVer: author.autVer,
                autRol: author.autRol,
            });
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=autores.xlsx');
        await workbook.xlsx.write(res);
        res.end();

    }catch(error){
        console.error("Error al exportar autores a Excel:", error);
        res.status(500).json({ error: "Error al exportar autores a Excel" });
    }   
};
// Exportar a PDF
export const exportAuthorsToPdf = async (req: Request, res: Response) => {
    try {
        // Obtener los datos de los autores desde la base de datos
        const authors = await findAllAuthors();

        // Crear un documento PDF
        const doc = new PDFDocument({
            size: 'A4',   // Tamaño de página A4
            margin: 30,   // Márgenes del documento
        });

        // Configurar el encabezado de la respuesta para el archivo PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=authors.pdf');

        // Iniciar el documento PDF
        doc.pipe(res);

        // Título del PDF
        doc.fontSize(18).text('Lista de Autores', { align: 'center' });
        doc.moveDown();

        // Crear la tabla con los datos de los autores
        const tableTop = doc.y;
        const table = {
            headers: ['Código', 'Nombre', 'Fecha Modificación', 'Versión', 'Rol'],
            rows: authors.map(aut => [
                aut.autCod,
                aut.autNom,
                aut.autFecMod.toISOString().split('T')[0],  // Formato YYYY-MM-DD
                aut.autVer,
                aut.autRol
            ])
        };

        const columnWidths = [80, 150, 100, 60, 80];
        const rowHeight = 20;
        const startY = tableTop;

        // Función para dibujar la tabla
        const drawTable = () => {
            let y = startY;

            // Dibuja los encabezados
            doc.fontSize(10).font('Helvetica-Bold');
            table.headers.forEach((header, index) => {
                const x = columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + 30;
                doc.text(header, x, y, { width: columnWidths[index], align: 'center' });
            });

            y += rowHeight;

            // Dibuja las filas de datos
            doc.font('Helvetica');
            table.rows.forEach(row => {
                row.forEach((cell, index) => {
                    const x = columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + 30;
                    doc.text(String(cell), x, y, { width: columnWidths[index], align: 'center' });
                });
                y += rowHeight;
            });
        };

        // Dibujar la tabla en el PDF
        drawTable();

        // Finalizar el PDF
        doc.end();
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'Error al generar el PDF' });
    }
};