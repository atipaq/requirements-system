//backend/src/config/data-source.ts
import "reflect-metadata"
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: process.env.DATABASE_PATH || './data/database.sqlite',
    synchronize: true, // Usa migraciones en lugar de sincronización automática
    logging: false,
    entities: ['src/data/entities/**/*.ts'],
    migrations: ['src/data/migrations/**/*.ts'],
});