// src/data/entities/Autor.ts
import { Entity, PrimaryColumn, Column,OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { TemplatePermission } from "./TemplatePermission";

@Entity()
export class Author {
    /**Primera Parte de la seccion */
    //Codigo Autor
    @PrimaryColumn()
    autCod!: string;

    //Codigo Version
    @Column({ type: "real" })
    autVer!: number;

    //Fecha Creacion
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    autFecCrea!: Date;

    //Fecha Modificacion
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    autFecMod!: Date;

    /**Segunda Parte de la seccion */
    //Apellido Paterno
    @Column({ type: "text" })
    autApePat!: string;

    //Apellido Materno
    @Column({ type: "text" })
    autApeMat!: string;

    //Nombre
    @Column({ type: "text", nullable: true })
    autNom!: string;

    //Alias
    @Column({ type: "text", unique: true })
    autAli!: string;

    //Rol
    @Column({ type: "text" })
    autRol!: string;

    //contraseña
    @Column()
    password!: string;

    //Telefono
    @Column({ type: "integer",unique: true })
    autTef!: number;

    //DNI
    @Column({ type: "integer",nullable: true, unique: true})
    autDNI!: number;

    /**Tercera parte de la seccion */
    //CodigoOrganizacion
    @Column()
    autCodOrg!: string;

    //Autor de Pantilla
    @Column()
    autPan!: string;

    @Column({ type: "text" })
    autEst!: string;

    /**Cuarta parte de la seccion */
    //Comentario
    @Column({ type: "text" })
    autCom!: string;

    /**Quinta parte de la seccion */
    /*@OneToMany(() => TemplatePermission, (permission) => permission.author)
    permissions!: TemplatePermission[];*/
}
