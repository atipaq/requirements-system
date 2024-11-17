// backend/src/app/routes/auth/index.ts
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Usuario único
const ADMIN_USER = {
    username: 'admin',
    password: 'admin',
};

// Endpoint de inicio de sesión
router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Verificar credenciales
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        // Generar un token JWT
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

// Ruta de prueba para verificar autenticación
router.get('/verify', (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: 'Token is valid', user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

export default router;
