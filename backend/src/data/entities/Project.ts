// backend/src/data/entities/Project.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import { Organization } from "./Organization";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    code!: string;

    @Column()
    name!: string;

    @CreateDateColumn({ type: "datetime" }) // Automático en la creación
    creationDate!: Date;

    @UpdateDateColumn({ type: "datetime" }) // Automático en cada actualización
    modificationDate!: Date;

    @Column({nullable: true})
    status!: string;

    @Column({ nullable: true })
    comments!: string;

    @ManyToOne(() => Organization, (organization) => organization.projects)
    organization!: Organization;
    
    // Generar automáticamente el código antes de insertar el proyecto
    @BeforeInsert()
    generateCode() {
        this.code = `PROJ-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
    }
}