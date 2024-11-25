import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";
import { Project } from "./Project";

@Entity()
export class ActaAceptacion {
    @PrimaryColumn()
    actacecod!: string; // Código del acta (clave primaria)

    @Column()
    actaceprocod!: string; // Código del proyecto al que pertenece (ahora será del tipo número, relacionado con el 'id' de Project)

    @Column()
    actacedir!: string; // Dirección del archivo
    
    @ManyToOne(() => Project, (project) => project.actas)
    @JoinColumn({ name: "actaceprocod", referencedColumnName: "code" }) // Establece la relación con el 'id' de 'Project'
    project!: Project; // Relación con el proyecto (muchos actas pueden pertenecer a un proyecto)

    // Generar el código del acta antes de insertarlo (por si necesitas lógica adicional en el futuro)
    @BeforeInsert()
    generateCode() {
        this.actacecod = `ACTA-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
    }
}
