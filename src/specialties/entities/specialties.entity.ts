import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, IsNull, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";


@Entity()
@Unique(["name"])
export class Specialties extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 100 })
    name: string;

    @CreateDateColumn()
    create_at : Date;

    @UpdateDateColumn()
    update_at : Date;

    @DeleteDateColumn()
    deleted_at : Date;

    
    @ManyToOne(() => User, (user) => user.specialties, {
    })
    user: User;

    

}
