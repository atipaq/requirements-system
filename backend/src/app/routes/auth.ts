// src/routes/authRoutes.ts
import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../config/data-source";
import { User } from '../../data/entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = Router();

// Definir una clave secreta para JWT (guárdala en variables de entorno en producción)
const JWT_SECRET = 'mi_clave_secreta';

// Ruta para login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Buscar el usuario en la base de datos
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Comparar la contraseña con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Crear un token JWT
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h' // El token expirará en 1 hora
        });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
