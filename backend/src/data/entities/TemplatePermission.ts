import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Author } from "./Author";


@Entity()
export class TemplatePermission {
  @PrimaryGeneratedColumn()
  id!: string;

  //nombrePantilla
  @Column({ type: "text" })
  temName!: string;

  @Column({ type: "boolean", default: false })
  temView!: boolean;

  @Column({ type: "boolean", default: false })
  temEdit!: boolean;

  /*@ManyToOne(() => Author, (author) => author.permissions)
  author!: Author;*/
}