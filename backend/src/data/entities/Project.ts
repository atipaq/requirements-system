// backend/src/data/entities/Project.ts
import { Entity,PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import { Organization } from "./Organization";
import { ActaAceptacion } from "./ActaAceptacion";

@Entity()
export class Project {
    @PrimaryColumn({ unique: true })
    code!: string;

    @Column()
    name!: string;

    @CreateDateColumn({ type: "datetime" }) // Automático en la creación
    creationDate!: Date;

    @UpdateDateColumn({ type: "datetime" }) // Automático en cada actualización
    modificationDate!: Date;

    @Column()
    status!: string;

    @Column({ nullable: true })
    comments!: string;

    @ManyToOne(() => Organization, (organization) => organization.projects)
    organization!: Organization;

    @OneToMany(() => ActaAceptacion, (acta) => acta.project, { cascade: true })
    actas!: ActaAceptacion[];
    
    // Generar automáticamente el código antes de insertar el proyecto
    @BeforeInsert()
    generateCode() {
        this.code = `PROJ-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
    }
}