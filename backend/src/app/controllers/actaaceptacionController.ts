import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { actaAceptacionRepository } from "../../data/repositories/actaaceptacionRepository";
import { ActaAceptacion } from "../../data/entities/ActaAceptacion";
import fs from "fs";

// Verificar si la carpeta existe, si no, crearla
const dirPath = path.join(__dirname, "../../uploads/actas");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("La carpeta 'actas' ha sido creada.");
}

// Configuración de Multer para manejar los archivos cargados
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dirPath); // Usamos la ruta que verificamos
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Obtener la extensión del archivo
        const filename = `acta-${Date.now()}${ext}`;
        cb(null, filename); // Generar el nombre del archivo
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limitar tamaño del archivo a 10MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /png|jpg|jpeg|pdf|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true); // El archivo tiene una extensión válida
        } else {
            cb(new Error("El archivo debe ser de tipo png, jpg, jpeg, pdf o docx"));
        }
    }
}).single("file"); // Campo en el formulario para el archivo es "file"

// Crear una nueva acta
export const createActa = async (req: Request, res: Response): Promise<void> => {
    // Usar Multer para procesar la carga del archivo
    upload(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                // Error de Multer (por ejemplo, límite de tamaño excedido)
                return res.status(400).json({ message: "Error al subir el archivo: " + err.message });
            } else {
                // Error de validación de archivo u otro
                return res.status(400).json({ message: err.message });
            }
        }

        // Validar que se haya cargado un archivo
        if (!req.file) {
            return res.status(400).json({ message: "No se ha cargado un archivo" });
        }

        // Generar automáticamente un código para el proyecto
        const actaceprocod = "PROJ-121"; // Ejemplo: código aleatorio de 4 dígitos
        const actacedir = `uploads/actas/${req.file.filename}`; // Ruta donde se guardó el archivo

        try {

            const newActa = actaAceptacionRepository.create({
                actacecod:"1",
                actaceprocod: actaceprocod,
                actacedir: actacedir,
            });
            // Guardar el acta en la base de datos
            await actaAceptacionRepository.save(newActa);

            return res.status(201).json({
                message: "Acta creada con éxito",
                acta: newActa
            });
        } catch (error) {
            console.error("Error al crear la acta:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    });
};

