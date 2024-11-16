// src/config/data-source.ts
import "reflect-metadata"
import { DataSource } from 'typeorm';
// Importar entidades o modelos


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './database.sqlite',
    synchronize: true, // Usa migraciones en lugar de sincronización automática
    logging: false,
    entities: ['src/data/entities/**/*.ts'],
    migrations: ['src/data/migrations/**/*.ts'],
});
