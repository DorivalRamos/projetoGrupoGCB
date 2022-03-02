import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, IsNull, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Specialties } from "../../specialties/entities/specialties.entity";


@Entity()
@Unique(['name','crm'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 100 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 8 })
    cep: string;

    @Column({ nullable: false, type: 'varchar', length: 7 })
    crm : string

    @CreateDateColumn()
    create_at : Date;

    @UpdateDateColumn()
    update_at : Date;

    @DeleteDateColumn()
    deleted_at : Date;

    
    @OneToMany(() => Specialties , specialties => specialties.user , {
        cascade: true,        
    })
    @JoinTable()
    specialties: Specialties[];
}
