// src/data/entities/Organization.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("organizacion")
export class Organization {
    @PrimaryColumn()
    orgcod!: string;

    @Column({ type: "real" })
    orgver!: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    orgfeccrea!: Date;

    @Column({ type: "real" })
    orgfecmod!: number;

    @Column({ type: "text" })
    orgnom!: string;

    @Column({ type: "text" })
    orgdir!: string;

    @Column({ type: "integer" })
    orgtel!: number;

    @Column({ type: "text" })
    orgrepleg!: string;

    @Column({ type: "integer" })
    orgtelrepleg!: number;

    @Column({ type: "integer" })
    orgruc!: number;

    @Column({ type: "text" })
    orgcontact!: string;

    @Column({ type: "text" })
    orgtelcon!: string;

    @Column({ type: "text" })
    orgtiporgcod!: string;

    @Column({ type: "text" })
    orgautcod!: string;

    @Column({ type: "text" })
    orgest!: string;

    @Column({ type: "text" })
    orgcom!: string;

    @Column({ type: "text" })
    orgartcod!: string;

    @Column({ type: "integer" })
    orgusuid!: number;
}
