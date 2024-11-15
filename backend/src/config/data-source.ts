// src/config/data-source.ts
import "reflect-metadata"
import { DataSource } from 'typeorm';
import bcrypt from "bcryptjs";
// Importar entidades o modelos
import { User } from "../data/entities/User";


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './database.sqlite',
    synchronize: true, // Set to false in production
    logging: false,
    entities: ['src/data/entities/**/*.ts'],
    // migrations: ['src/database/migrations/**/*.ts'],
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");

        const userRepository = AppDataSource.getRepository(User);

        // Crear un usuario por defecto si no existe
        const existingUser = await userRepository.findOneBy({ username: "admin" });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("admin", 10); // Encriptar la contraseña
            const defaultUser = userRepository.create({
                username: "admin",
                password: hashedPassword, // Esto debe encriptarse en producción
                firstName: "Requirement System",
                lastName: "ReqWizard",
                isActive: true,
            });
            await userRepository.save(defaultUser);
            console.log("Default user created: admin / admin");
        } else {
            console.log("Default user already exists.");
        }
    })
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
    });

