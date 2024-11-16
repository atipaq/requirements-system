import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../config/data-source";
import { User } from '../../data/entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Crear una instancia del router de Express
const router = Router();

// Definir la clave secreta para JWT desde las variables de entorno, o usar un valor por defecto
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Tipos de datos para las solicitudes y respuestas
// Define el cuerpo de la solicitud de login (username y password)
type LoginRequestBody = {
    username: string;
    password: string;
};

// Define la respuesta de login (mensaje y token opcional)
type LoginResponseBody = {
    message: string;
    token?: string;
};

// Handler para el login (maneja la lógica del login)
const loginHandler = async (
    req: Request<{}, LoginResponseBody, LoginRequestBody>, // Tipos para las solicitudes y respuestas
    res: Response // Respuesta de Express
): Promise<void> => {
    const { username, password } = req.body;

    // Validar que los campos 'username' y 'password' estén presentes
    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;  // Detener ejecución si los campos son vacíos
    }

    try {
        // Obtener el repositorio de usuarios
        const userRepository = AppDataSource.getRepository(User);

        // Buscar el usuario en la base de datos por nombre de usuario
        const user = await userRepository.findOneBy({ username });

        // Si no se encuentra el usuario, retornar un error
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña es incorrecta, retornar un error
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Si las credenciales son correctas, generar un token JWT
        const token = jwt.sign(
            { userId: user.id, username: user.username }, // Información del usuario que se incluirá en el token
            JWT_SECRET, // Clave secreta para firmar el token
            { expiresIn: '1h' } // El token expirará en 1 hora
        );

        // Enviar una respuesta con el mensaje de éxito y el token
        res.json({ message: "Login successful", token });

    } catch (error) {
        // Si ocurre un error en el proceso, devolver un error interno
        console.error("Login error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Definir la ruta POST '/login' que usa el handler de login
router.post('/login', loginHandler);

// Exportar el router para que se pueda utilizar en otras partes de la aplicación
export default router;
