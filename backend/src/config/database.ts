// src/config/database.ts
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true, // Set to false in production
    logging: true,
    entities: ['src/models/**/*.ts'],
    migrations: ['src/database/migrations/**/*.ts'],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
